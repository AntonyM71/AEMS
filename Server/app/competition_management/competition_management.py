

import functools
import operator
import random
from typing import Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, Query, Response, UploadFile, status
from sqlalchemy.orm import Session

from app.competition_management.ingestUpload import upload_competiton_from_csv
from app.scoring.customScoringEndpoints import (
    calculate_phase_scores,
)
from app.scoring.scoring_logic import AthleteScoresWithAthleteInfo
from db.client import get_transaction_session
from db.models import AthleteHeat, Heat, Phase

competition_management_router = APIRouter(prefix="/competition_management")


@competition_management_router.post("/upload")
def upload(competition_name: str = Form(...), file: UploadFile = File(...)) -> list:

    return upload_competiton_from_csv(
        competition_name=competition_name, file=file)


@competition_management_router.post("/promote_phase", status_code=status.HTTP_200_OK)
async def promote_phase(
    new_heat_names: list[str] = Query(None),
    phase_id: str = Query(None),
    new_phase_name: str = Query(None),
    number_of_paddlers: int = Query(None),
    number_of_runs: Optional[int] = Query(None),
    number_of_runs_for_score: Optional[int] = Query(None),
    number_of_judges: Optional[int] = Query(None),
    db: Session = Depends(get_transaction_session),
) -> Response:
    with db.begin():
        top_paddlers = get_top_n_paddlers_for_phase(
            phase_id=phase_id,
            number_of_paddlers=number_of_paddlers,
            db=db)
        print(phase_id)
        new_heat_info = [{"name": h, "id": uuid4()} for h in new_heat_names]

        assigned_paddlers = assign_paddlers_to_heat(
            heat_ids=[str(h['id']) for h in new_heat_info], paddlers=top_paddlers)
        new_phase_id = uuid4()

        current_phase_details = db.query(Phase).filter(
            Phase.id == phase_id).one_or_none()
        print(current_phase_details)
        db.add(Phase(**{
            "id": new_phase_id,
            "event_id": current_phase_details.event_id,
            "name": new_phase_name,
            "number_of_runs": number_of_runs if number_of_runs else current_phase_details.number_of_runs,
            "number_of_runs_for_score": number_of_runs_for_score if number_of_runs_for_score else current_phase_details.number_of_runs_for_score,
            "number_of_judges": number_of_judges if number_of_judges else current_phase_details.number_of_judges,
            "scoresheet": current_phase_details.scoresheet
        }))
        db.bulk_save_objects(
            [Heat(**{"id": h['id'], "competition_id": current_phase_details.event.competition_id, "name": h['name']}) for h in new_heat_info])
        db.bulk_save_objects(functools.reduce(operator.iconcat, [[AthleteHeat(**{"id": uuid4(),
                                                                                 "heat_id": heat_id,
                                                                                 "athlete_id": a.athlete_id,
                                                                                 "phase_id": new_phase_id,
                                                                                 "last_phase_rank": a.ranking}
                                                                              )
                             for a in athlete_list] for (heat_id, athlete_list) in assigned_paddlers.items()]))
        #  event=relationship("Event", back_populates="phases")
        #  name=Column(String, nullable=False)
        #  number_of_runs=Column(Integer, nullable=False, default=3)
        #  number_of_runs_for_score=Column(
        #      Integer, nullable=False, default=2)
        #  number_of_judges=Column(
        #      Integer, nullable=False, default=3)
        #  scoresheet=Column(UUID(as_uuid=True), ForeignKey("scoreSheet.id"), nullable=False)))()

    return (Response(status_code=200, content="Successfuly created new phase"))


def get_top_n_paddlers_for_phase(number_of_paddlers: int, phase_id: str, db: Session) -> list[AthleteScoresWithAthleteInfo]:
    phase_scores = calculate_phase_scores(phase_id=phase_id, db=db)
    return [a for a in phase_scores.scores if a.ranking and a.ranking <= number_of_paddlers]


def assign_paddlers_to_heat(paddlers: list[AthleteScoresWithAthleteInfo], heat_ids: list[str]) -> dict[str, list[AthleteScoresWithAthleteInfo]]:
    number_of_heats = len(heat_ids)
    random.shuffle(paddlers)
    paddler_heats = {h: [] for h in heat_ids}
    for i, p in enumerate(paddlers):

        heat_index = i % number_of_heats
        paddler_heats[heat_ids[heat_index]].append(p)
    return paddler_heats
