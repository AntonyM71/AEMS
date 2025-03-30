import functools
import math
import operator
import random
from io import BytesIO
from typing import Annotated, Optional
from uuid import UUID, uuid4

import pandas as pd
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
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.competition_management.create_competition_from_xlsx import (
    process_competitors_df,
    validate_columns_and_data_types,
)
from app.scoring.customScoringEndpoints import (
    PhaseScoresResponse,
    calculate_phase_scores,
)
from app.scoring.scoring_logic import AthleteScoresWithAthleteInfo
from db.client import get_transaction_session
from db.models import AthleteHeat, Heat, Phase

competition_management_router = APIRouter(
    prefix="/competition_management", tags=["competition management"])


class InvalidFileTypeError(Exception):
    """Raised when the file type does not match what is expected"""


@competition_management_router.post("/upload")
def upload(
    competition_name: str = Form(...),
    scoresheet_name: str = Form(...),
    number_of_runs: int = Form(...),
    number_of_runs_for_score: int = Form(...),
    number_of_judges: int = Form(...),
    random_heats: bool = Form(...),  # noqa: FBT001
    number_of_random_heats: int = Form(...),
    file: UploadFile = File(...),  # noqa: B008
) -> Response:
    if file.filename.endswith(".xlsx"):
        sheets_dict = pd.read_excel(BytesIO(file.file.read()), sheet_name=None)
        competitors_df = pd.concat(sheets_dict.values(), ignore_index=True)
    elif file.filename.endswith(".csv"):
        competitors_df = pd.read_csv(BytesIO(file.file.read()))

    else:
        msg = f"File: {file.filename} must have suffix '.xlsx' or  '.csv'"
        raise InvalidFileTypeError(msg)
    validate_columns_and_data_types(competitors_df, random_heats=False)
    number_of_paddlers_added = process_competitors_df(
        competitors_df=competitors_df,
        competition_name=competition_name,
        scoresheet_name=scoresheet_name,
        number_of_runs=number_of_runs,
        number_of_runs_for_score=number_of_runs_for_score,
        number_of_judges=number_of_judges,
        random_heats=random_heats,
        number_of_random_heats=number_of_random_heats,
    )

    return JSONResponse(
        status_code=201,
        content=f"Succesfully made competition {competition_name} with {number_of_paddlers_added} athletes.",
    )


class NewPhaseInfo(BaseModel):
    new_heat_names: list[str]
    phase_id: str
    new_phase_name: str
    number_of_paddlers: int
    number_of_runs: Optional[int]
    number_of_runs_for_score: Optional[int]
    number_of_judges: Optional[int]


class AthleteIDandRank(BaseModel):
    athlete_id: UUID
    ranking: Optional[int]


@competition_management_router.post("/promote_phase", status_code=status.HTTP_200_OK)
async def promote_phase(
    request_body: Annotated[NewPhaseInfo, Body(embed=True, default=None)],
    db: Session = Depends(get_transaction_session),
) -> Response:
    with db.begin():
        if request_body.number_of_paddlers == 0:
            msg = "Cannot promote a phase for 0 paddlers"
            raise HTTPException(422, msg)
        phase_scores = calculate_phase_scores(
            phase_id=request_body.phase_id, db=db)

        top_paddlers = get_top_n_paddlers_for_phase(
            phase_scores=phase_scores,
            number_of_paddlers=request_body.number_of_paddlers,
        )

        new_heat_info = [
            {"name": h, "id": uuid4()} for h in request_body.new_heat_names
        ]

        assigned_paddlers = assign_paddlers_to_heat(
            heat_ids=[str(h["id"]) for h in new_heat_info],
            paddlers=[
                AthleteIDandRank(athlete_id=a.athlete_id, ranking=a.ranking)
                for a in top_paddlers
            ],
            random_allocation=False,
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

    return Response(status_code=201)


def get_top_n_paddlers_for_phase(
    number_of_paddlers: int, phase_scores: PhaseScoresResponse
) -> list[AthleteScoresWithAthleteInfo]:
    if len(phase_scores.scores) == 0:
        msg = "No Paddlers in target phase"
        raise HTTPException(422, msg)
    return [
        a for a in phase_scores.scores if a.ranking and a.ranking <= number_of_paddlers
    ]


def assign_paddlers_to_heat(
    paddlers: list[AthleteIDandRank],
    heat_ids: list[str],
    *,
    random_allocation: bool = True,
) -> dict[str, list[AthleteIDandRank]]:
    number_of_heats = len(heat_ids)

    paddler_heats = {h: [] for h in heat_ids}
    if random_allocation:
        random.shuffle(paddlers)
        for i, p in enumerate(paddlers):
            heat_index = i % number_of_heats
            paddler_heats[heat_ids[heat_index]].append(p)
    else:
        paddlers_sorted_by_reverse_rank = sorted(
            paddlers, key=lambda p: p.ranking, reverse=True
        )
        paddlers_per_heat = math.ceil(len(paddlers) / len(heat_ids))
        for i, p in enumerate(paddlers_sorted_by_reverse_rank):
            heat_index = math.floor(i / paddlers_per_heat)
            paddler_heats[heat_ids[heat_index]].append(p)
    return paddler_heats
