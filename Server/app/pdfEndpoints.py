from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from fpdf import FPDF
from sqlalchemy.orm import Session

from app.customScoringEndpoints import (
    calculate_phase_scores,
    get_heat_info_logic,
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
            new_y="NEXT",
        )

        with pdf.table() as table:
            header = table.row()
            header.cell("Rank")
            header.cell("First Name")
            header.cell("Last Name")
            header.cell("Bib")
            for i in range(phase_metadata.number_of_runs):
                header.cell(f"Run {i+1}")
            header.cell("Total Score")
            header.cell("Notes")

            for athlete in phase_scores.scores:
                row = table.row()
                row.cell(str(athlete.ranking) if athlete.ranking else "-")

                row.cell(athlete.first_name)
                row.cell(athlete.last_name)
                row.cell(str(athlete.bib_number))
                for i in range(phase_metadata.number_of_runs):
                    try:
                        row.cell(f"{athlete.run_scores[i].mean_run_score:.2f}")
                    except IndexError:
                        row.cell("0")
                row.cell(
                    f"{athlete.total_score:.2f}" if athlete.total_score else "0")
                row.cell(athlete.reason if athlete.reason else "")

        # Prepare the filename and headers
        filename = f"{phase_scores.phase_id!s}.pdf"
        headers = {"Content-Disposition": f"attachment; filename={filename}"}

        # Return the file as a response
        return Response(
            content=bytes(pdf.output()), media_type="application/pdf", headers=headers
        )

    except Exception as e:
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
            return Response(status_code=404, content="Please provide a list of Heat IDs")
        for heat_id in heat_ids:
            heat_athlete_info = get_heat_info_logic(heat_id=heat_id, db=db)
            heat_info = db.query(Heat).where(
                Heat.id == heat_id).one_or_none()
            # Create a sample PDF file

            pdf.add_page()
            pdf.set_font("Helvetica", size=24)
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
                header.cell("Bib")
                header.cell("Previous Round Rank")

                for athlete in heat_athlete_info:
                    row = table.row()

                    row.cell(athlete.first_name)
                    row.cell(athlete.last_name)
                    row.cell(str(athlete.bib))
                    row.cell(str(athlete.last_phase_rank)
                             if athlete.last_phase_rank else "")

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
