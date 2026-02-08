import logging
import os
import types
from pathlib import Path
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from fpdf import FPDF
from sqlalchemy.orm import Session

from app.scoring.customScoringEndpoints import (
    calculate_phase_scores,
    get_heat_info_logic,
    get_heat_scores,
)
from db.client import get_transaction_session
from db.models import Competition, Event, Heat, Phase

pdf_router = APIRouter(tags=["pdf generation"])


def sanitize_filename(filename: str) -> str:
    """
    Sanitize a filename by removing or replacing invalid characters.
    
    Args:
        filename: The filename to sanitize
        
    Returns:
        A sanitized filename safe for use across different operating systems
    """
    # First strip leading/trailing whitespace and dots
    filename = filename.strip(". ")
    # Replace spaces with underscores
    filename = filename.replace(" ", "_")
    # Remove or replace characters that are problematic in filenames
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        filename = filename.replace(char, "_")
    return filename


def get_footer_text() -> str:
    return "Athlete Event Management System - Enquiries: kayak.freestyle.app@gmail.com"


def phase_pdf_header(
    pdf: FPDF,
    competition_metadata: Competition,
    event_metadata: Event,
    phase_metadata: Phase,
) -> None:
    def header(self: FPDF) -> None:
        pdf.set_font(size=24)
        pdf.cell(
            0,
            10,
            text=f"{competition_metadata.name},{event_metadata.name}, {phase_metadata.name} Scores",
            align="C",
            new_x="LMARGIN",
            new_y="NEXT",
        )
        pdf.set_font(size=12)
        pdf.cell(
            0,
            10,
            text=f"Competition: {competition_metadata.name}",
            align="L",
            new_x="LMARGIN",
        )
        pdf.cell(0, 10, text=f"Event: {event_metadata.name}", align="C")
        pdf.cell(
            0,
            10,
            text=f"Phase: {phase_metadata.name}",
            align="R",
            new_x="LMARGIN",
            new_y="NEXT",
        )

        pdf.cell(
            0,
            10,
            text=f"Number of Runs: {phase_metadata.number_of_runs}",
            align="L",
            new_x="LMARGIN",
        )
        pdf.cell(
            0,
            10,
            text=f"Number of Scoring Runs: {phase_metadata.number_of_runs_for_score}",
            align="C",
            new_x="LMARGIN",
        )
        pdf.cell(
            0,
            10,
            text="Bold scores confirmed by head judge, italic are not.",
            align="R",
            new_x="LMARGIN",
            new_y="NEXT",
        )

    # Apply the footer method to this PDF
    pdf.header = types.MethodType(header, pdf)


def setup_pdf_footer(
    pdf: FPDF, text: str | None = None, *, include_page_numbers: bool = True
) -> FPDF:
    """
    Configure a footer for all pages in a PDF document.

    Must be called right after creating the PDF, before adding any pages.

    Args:
        pdf: The FPDF object
        text: Footer text to display
        include_page_numbers: Whether to include page numbers

    Returns:
        The configured PDF object
    """
    # Prepare footer text
    footer_text = text if text is not None else get_footer_text()

    # Define footer function

    def footer(self: FPDF) -> None:
        # Position at 1.5 cm from bottom
        self.set_y(-15)

        # Save current font settings
        current_font = self.font_family
        current_style = self.font_style
        current_size = self.font_size

        if (
            "PYTEST_CURRENT_TEST" not in os.environ
            and hasattr(self, "font_family")
            and self.font_family == "helvetica-neue"
        ):
            self.set_font("helvetica-neue", "", 10)
        else:
            self.set_font("Helvetica", "", 10)

        self.cell(0, 5, footer_text, align="L")

        if include_page_numbers:
            self.cell(0, 5, f"Page {self.page_no()}/{{nb}}", align="R")

        # Restore original font
        self.set_font(current_font, current_style, current_size)

    # Apply the footer method to this PDF
    pdf.footer = types.MethodType(footer, pdf)

    # Set up alias for total pages
    pdf.alias_nb_pages(alias="{nb}")

    return pdf


@pdf_router.get("/phase_pdf/{phase_id}", status_code=status.HTTP_200_OK)
async def phase_pdf(
    phase_id: str,
    db: Session = Depends(get_transaction_session),
) -> Response:
    try:
        phase_scores = calculate_phase_scores(phase_id=phase_id, db=db)
        phase_metadata = db.query(Phase).filter(Phase.id == phase_id).one()
        event_metadata = (
            db.query(Event).filter(Event.id == phase_metadata.event_id).one()
        )
        competition_metadata = (
            db.query(Competition)
            .filter(Competition.id == event_metadata.competition_id)
            .one()
        )

        # Create a sample PDF file
        pdf = HelveticaNeuePDF(orientation="L", format="A4")
        phase_pdf_header(pdf, competition_metadata, event_metadata, phase_metadata)
        setup_pdf_footer(pdf, text=None, include_page_numbers=True)
        pdf.add_page()

        with pdf.table(
            col_widths=(1, 3, 3, 1, 3, *([2] * phase_metadata.number_of_runs), 2, 3)
        ) as table:
            header = table.row()
            header.cell("Rank")
            header.cell("First Name")
            header.cell("Last Name")
            header.cell("Bib")
            header.cell("Affiliation")

            for i in range(phase_metadata.number_of_runs):
                header.cell(f"Run {i + 1}")
            header.cell("Total Score")
            header.cell("Notes")

            for athlete in phase_scores.scores:
                row = table.row()
                row.cell(str(athlete.ranking) if athlete.ranking else "-")

                row.cell(athlete.first_name)
                row.cell(athlete.last_name)
                row.cell(str(athlete.bib_number))
                row.cell(athlete.affiliation or "")
                runs_confirmed = []
                for i in range(phase_metadata.number_of_runs):
                    runs_confirmed.append(
                        True
                        if i < len(athlete.run_scores) and athlete.run_scores[i].locked
                        else False
                    )
                    pdf.set_font(
                        style="B"
                        if i < len(athlete.run_scores) and athlete.run_scores[i].locked
                        else "I"
                    )
                    row.cell(
                        "0"
                        if i >= len(athlete.run_scores)
                        else "DNS"
                        if athlete.run_scores[i].did_not_start
                        else str(athlete.run_scores[i].mean_run_score)
                    )
                pdf.set_font(style="B" if all(runs_confirmed) else "I")

                row.cell(f"{athlete.total_score:.2f}" if athlete.total_score else "0")
                pdf.set_font("")
                row.cell(athlete.reason if athlete.reason else "")

        # Prepare the filename and headers
        filename = sanitize_filename(
            f"{competition_metadata.name}_{event_metadata.name}_{phase_metadata.name}.pdf"
        )
        headers = {"Content-Disposition": f"attachment; filename={filename}"}

        # Return the file as a response
        return Response(
            content=bytes(pdf.output()), media_type="application/pdf", headers=headers
        )

    except Exception as e:
        logging.exception("Error Creating PDF")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e


@pdf_router.get("/heat_pdf", status_code=status.HTTP_200_OK)
async def heat_pdf(
    heat_ids: list[str] = Query(None),
    db: Session = Depends(get_transaction_session),
) -> Response:
    try:
        pdf = HelveticaNeuePDF(orientation="L", format="A4")
        setup_pdf_footer(pdf, None, include_page_numbers=True)
        if not heat_ids:
            return Response(
                status_code=404, content="Please provide a list of Heat IDs"
            )
        heat_info_list = (
            db.query(Heat).where(Heat.id.in_(heat_ids)).order_by(Heat.name.asc()).all()
        )
        if not heat_info_list or len(heat_info_list) != len(heat_ids):
            return Response(
                status_code=404,
                content="Could not find any heat Info corresponding to provided IDs",
            )
        for heat_info in heat_info_list:
            heat_athlete_info = get_heat_info_logic(heat_id=heat_info.id, db=db)

            competition_metadata = (
                db.query(Competition)
                .filter(Competition.id == heat_info.competition_id)
                .one()
            )

            pdf.add_page()
            pdf.set_font(size=24)
            pdf.cell(
                0,
                10,
                text=f"Competition: {competition_metadata.name}",
                align="C",
                new_x="LMARGIN",
                new_y="NEXT",
            )
            pdf.set_font(size=20)
            pdf.cell(
                0,
                10,
                text=f"Heat: {heat_info.name}",
                align="C",
                new_x="LMARGIN",
                new_y="NEXT",
            )
            pdf.set_font(size=12)

            with pdf.table(col_widths=(3, 3, 3, 1, 3, 3)) as table:
                header = table.row()
                header.cell("First Name")
                header.cell("Last Name")
                header.cell("Event Name")
                header.cell("Bib")
                header.cell("Affiliation")

                header.cell("Previous Round Rank")

                for athlete in heat_athlete_info:
                    row = table.row()

                    row.cell(athlete.first_name)
                    row.cell(athlete.last_name)
                    row.cell(athlete.event_name)
                    row.cell(str(athlete.bib))
                    row.cell(athlete.affiliation or "")
                    row.cell(
                        str(athlete.last_phase_rank) if athlete.last_phase_rank else ""
                    )

        # Prepare the filename and headers
        heat_names = "_".join([h.name for h in heat_info_list])
        filename = sanitize_filename(
            f"{competition_metadata.name}_{heat_names}.pdf"
        )
        headers = {"Content-Disposition": f"attachment; filename={filename}"}

        # Return the file as a response
        return Response(
            content=bytes(pdf.output()), media_type="application/pdf", headers=headers
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e


@pdf_router.get("/heat_results_pdf", status_code=status.HTTP_200_OK)
async def heat_results_pdf(
    heat_id: str = Query(None),
    db: Session = Depends(get_transaction_session),
) -> Response:
    try:
        pdf = HelveticaNeuePDF(orientation="L", format="A4")
        setup_pdf_footer(pdf, None, include_page_numbers=True)
        if not heat_id:
            return Response(
                status_code=404, content="Please provide a list of Heat IDs"
            )
        heat_scores = await get_heat_scores(heat_id=heat_id, db=db)

        heat_info = db.query(Heat).filter(Heat.id == heat_id).one()

        max_runs = max([len(a.run_scores) for a in heat_scores.scores])
        competition = (
            db.query(Competition)
            .filter(Competition.id == heat_info.competition_id)
            .one()
        )
        pdf.add_page()
        pdf.set_font(size=24)
        pdf.cell(0, 10, text="Heat Results", align="C", new_x="LMARGIN", new_y="NEXT")
        pdf.set_font(size=20)
        pdf.cell(
            0,
            10,
            text=f"{competition.name}",
            align="L",
            new_x="LMARGIN",
        )

        pdf.cell(
            0,
            10,
            text=f"Heat: {heat_info.name}",
            align="R",
            new_x="LMARGIN",
            new_y="NEXT",
        )
        pdf.set_font(size=12)

        with pdf.table(col_widths=(3, 3, 1, 3, *([2] * max_runs))) as table:
            header = table.row()
            header.cell("First Name")
            header.cell("Last Name")
            header.cell("Bib")
            header.cell("Affiliation")

            for i in range(max_runs):
                header.cell(f"Run: {i + 1}")

            for athlete in heat_scores.scores:
                row = table.row()

                row.cell(athlete.first_name)
                row.cell(athlete.last_name)
                row.cell(str(athlete.bib_number))
                row.cell(athlete.affiliation or "")

                for i in range(max_runs):
                    if i < len(athlete.run_scores):
                        pdf.set_font(style="B" if athlete.run_scores[i].locked else "I")
                    row.cell(
                        ""
                        if i >= len(athlete.run_scores)
                        else "DNS"
                        if athlete.run_scores[i].did_not_start
                        else str(athlete.run_scores[i].mean_run_score)
                    )
                pdf.set_font(style="")
        # Prepare the filename and headers
        filename = sanitize_filename(
            f"{competition.name}_{heat_info.name}_results.pdf"
        )
        headers = {"Content-Disposition": f"attachment; filename={filename}"}

        # Return the file as a response
        return Response(
            content=bytes(pdf.output()), media_type="application/pdf", headers=headers
        )

    except Exception as e:
        logging.exception("Error Creating PDF")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e


font_directory = Path("./fonts/")


class HelveticaNeuePDF(FPDF):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.add_fonts()

    def add_fonts(self) -> None:
        if "PYTEST_CURRENT_TEST" not in os.environ:
            self.add_font(
                "helvetica-neue",
                style="",
                fname=Path(font_directory, "HelveticaNeueLight.otf").as_posix(),
            )
            self.add_font(
                "helvetica-neue",
                style="B",
                fname=Path(font_directory, "HelveticaNeueMedium.otf").as_posix(),
            )
            self.add_font(
                "helvetica-neue",
                style="I",
                fname=Path(font_directory, "HelveticaNeueLightItalic.otf").as_posix(),
            )
            self.add_font(
                "helvetica-neue",
                style="BI",
                fname=Path(font_directory, "HelveticaNeueMediumItalic.otf").as_posix(),
            )
            self.set_font(family="helvetica-neue", style="", size=12)
        else:
            self.set_font(family="Helvetica", style="", size=12)
