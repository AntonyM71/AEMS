import logging
from datetime import datetime

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

pdf_router = APIRouter()


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
        pdf = FPDF(orientation="L", format="A4")
        pdf.add_page()
        pdf.set_font("Helvetica", size=24)
        pdf.cell(
            0,
            10,
            text=f"{competition_metadata.name},{event_metadata.name}, {phase_metadata.name} Scores",
            align="C",
            new_x="LMARGIN",
            new_y="NEXT",
        )
        pdf.set_font("Helvetica", size=12)
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
        with pdf.table() as table:
            header = table.row()
            header.cell("Rank")
            header.cell("First Name")
            header.cell("Last Name")
            header.cell("Bib")
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
        filename = f"{phase_scores.phase_id!s}.pdf"
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
        pdf = FPDF(orientation="L", format="A4")
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
            pdf.set_font("Helvetica", size=24)
            pdf.cell(
                0,
                10,
                text=f"Competition: {competition_metadata.name}",
                align="C",
                new_x="LMARGIN",
                new_y="NEXT",
            )
            pdf.set_font("Helvetica", size=20)
            pdf.cell(
                0,
                10,
                text=f"Heat: {heat_info.name}",
                align="C",
                new_x="LMARGIN",
                new_y="NEXT",
            )
            pdf.set_font("Helvetica", size=12)

            with pdf.table() as table:
                header = table.row()
                header.cell("First Name")
                header.cell("Last Name")
                header.cell("Event Name")
                header.cell("Bib")
                header.cell("Previous Round Rank")

                for athlete in heat_athlete_info:
                    row = table.row()

                    row.cell(athlete.first_name)
                    row.cell(athlete.last_name)
                    row.cell(athlete.event_name)
                    row.cell(str(athlete.bib))
                    row.cell(
                        str(athlete.last_phase_rank) if athlete.last_phase_rank else ""
                    )

        # Prepare the filename and headers
        filename = f"heats{datetime.now().isoformat()}.pdf"
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
        pdf = FPDF(orientation="L", format="A4")
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
        pdf.set_font("Helvetica", size=24)
        pdf.cell(0, 10, text="Heat Results", align="C", new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Helvetica", size=20)
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
        pdf.set_font("Helvetica", size=12)

        with pdf.table() as table:
            header = table.row()
            header.cell("First Name")
            header.cell("Last Name")
            header.cell("Bib")
            for i in range(max_runs):
                header.cell(f"Run: {i + 1}")

            for athlete in heat_scores.scores:
                row = table.row()

                row.cell(athlete.first_name)
                row.cell(athlete.last_name)

                row.cell(str(athlete.bib_number))
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
        filename = f"heats{datetime.now().isoformat()}.pdf"
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
