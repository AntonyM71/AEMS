import functools
import operator
import random
from typing import Annotated, Optional
from uuid import uuid4

from fastapi import (
    APIRouter,
    Body,
    Depends,
    File,
    Form,
    HTTPException,
    Response,
    UploadFile,
    status,
)
from pydantic import BaseModel
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
    return upload_competiton_from_csv(competition_name=competition_name, file=file)


class NewPhaseInfo(BaseModel):
    new_heat_names: list[str]
    phase_id: str
    new_phase_name: str
    number_of_paddlers: int
    number_of_runs: Optional[int]
    number_of_runs_for_score: Optional[int]
    number_of_judges: Optional[int]


@competition_management_router.post("/promote_phase", status_code=status.HTTP_200_OK)
async def promote_phase(
    request_body: Annotated[NewPhaseInfo, Body(embed=True, default=None)],
    db: Session = Depends(get_transaction_session),
) -> Response:
    with db.begin():
        if request_body.number_of_paddlers == 0:
            msg = "Cannot promote a phase for 0 paddlers"
            raise HTTPException(422, msg)

        top_paddlers = get_top_n_paddlers_for_phase(
            phase_id=request_body.phase_id,
            number_of_paddlers=request_body.number_of_paddlers,
            db=db,
        )

        new_heat_info = [
            {"name": h, "id": uuid4()} for h in request_body.new_heat_names
        ]

        assigned_paddlers = assign_paddlers_to_heat(
            heat_ids=[str(h["id"]) for h in new_heat_info], paddlers=top_paddlers
        )

        new_phase_id = uuid4()

        current_phase_details = (
            db.query(Phase).filter(
                Phase.id == request_body.phase_id).one_or_none()
        )

        db.add(
            Phase(
                **{
                    "id": new_phase_id,
                    "event_id": current_phase_details.event_id,
                    "name": request_body.new_phase_name,
                    "number_of_runs": request_body.number_of_runs
                    if request_body.number_of_runs
                    else current_phase_details.number_of_runs,
                    "number_of_runs_for_score": request_body.number_of_runs_for_score
                    if request_body.number_of_runs_for_score
                    else current_phase_details.number_of_runs_for_score,
                    "number_of_judges": request_body.number_of_judges
                    if request_body.number_of_judges
                    else current_phase_details.number_of_judges,
                    "scoresheet": current_phase_details.scoresheet,
                }
            )
        )
        db.bulk_save_objects(
            [
                Heat(
                    **{
                        "id": h["id"],
                        "competition_id": current_phase_details.event.competition_id,
                        "name": h["name"],
                    }
                )
                for h in new_heat_info
            ]
        )
        db.bulk_save_objects(
            functools.reduce(
                operator.iconcat,
                [
                    [
                        AthleteHeat(
                            **{
                                "id": uuid4(),
                                "heat_id": heat_id,
                                "athlete_id": a.athlete_id,
                                "phase_id": new_phase_id,
                                "last_phase_rank": a.ranking,
                            }
                        )
                        for a in athlete_list
                    ]
                    for (heat_id, athlete_list) in assigned_paddlers.items()
                ],
            )
        )

    return Response(status_code=200)


def get_top_n_paddlers_for_phase(
    number_of_paddlers: int, phase_id: str, db: Session
) -> list[AthleteScoresWithAthleteInfo]:
    phase_scores = calculate_phase_scores(phase_id=phase_id, db=db)
    if len(phase_scores.scores) == 0:
        msg = "No Paddlers in target phase"
        raise HTTPException(422, msg)
    return [
        a for a in phase_scores.scores if a.ranking and a.ranking <= number_of_paddlers
    ]


def assign_paddlers_to_heat(
    paddlers: list[AthleteScoresWithAthleteInfo], heat_ids: list[str]
) -> dict[str, list[AthleteScoresWithAthleteInfo]]:
    number_of_heats = len(heat_ids)
    random.shuffle(paddlers)
    paddler_heats = {h: [] for h in heat_ids}
    for i, p in enumerate(paddlers):
        heat_index = i % number_of_heats
        paddler_heats[heat_ids[heat_index]].append(p)
    return paddler_heats
