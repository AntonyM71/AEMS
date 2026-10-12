import functools
import math
import operator
import random
from enum import StrEnum
from io import BytesIO
from typing import Annotated
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
from fpdf import FPDF
from PIL import Image
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.competition_management.create_competition_from_xlsx import (
    ColumnTypeError,
    InvalidFileTypeError,
    MissingColumnError,
    NoHeatInfoForNonRandomHeatError,
    is_paddleuk_export,
    paddleuk_to_start_list,
    process_competitors_df,
    read_start_list,
    validate_columns_and_data_types,
)
from app.scoring.customScoringEndpoints import (
    PhaseScoresResponse,
    calculate_phase_scores,
)
from app.scoring.scoring_logic import AthleteScoresWithAthleteInfo
from db.client import get_transaction_session
from db.models import AthleteHeat, Competition, CompetitionImage, Heat, Phase

competition_management_router = APIRouter(
    prefix="/competition_management", tags=["competition management"]
)


@competition_management_router.post(
    "/upload",
    responses={
        422: {
            "description": (
                "Validation error. Includes number_of_runs and "
                "number_of_runs_for_score must be positive, with "
                "number_of_runs_for_score no greater than number_of_runs."
            ),
            "content": {
                "application/json": {
                    "schema": {
                        "anyOf": [
                            {"$ref": "#/components/schemas/HTTPValidationError"},
                            {
                                "type": "object",
                                "properties": {"detail": {"type": "string"}},
                                "required": ["detail"],
                            },
                        ]
                    }
                }
            },
        },
    },
)
def upload(
    competition_name: str = Form(...),
    scoresheet_name: str = Form(...),
    number_of_runs: int = Form(..., gt=0),
    number_of_runs_for_score: int = Form(..., gt=0),
    number_of_judges: int = Form(...),
    random_heats: bool = Form(...),  # noqa: FBT001
    number_of_random_heats: int = Form(...),
    file: UploadFile = File(...),  # noqa: B008
) -> Response:
    if number_of_runs_for_score > number_of_runs:
        msg = "number_of_runs_for_score cannot exceed number_of_runs"
        raise HTTPException(status_code=422, detail=msg)
    try:
        competitors_df = read_start_list(file.filename, file.file.read())
        if is_paddleuk_export(competitors_df):
            competitors_df, conversion_skips = paddleuk_to_start_list(
                competitors_df, random_heats=random_heats
            )
        else:
            validate_columns_and_data_types(competitors_df, random_heats=random_heats)
            conversion_skips = []
    except (
        InvalidFileTypeError,
        MissingColumnError,
        ColumnTypeError,
        NoHeatInfoForNonRandomHeatError,
        pd.errors.ParserError,
        pd.errors.EmptyDataError,
    ) as e:
        raise HTTPException(status_code=422, detail=str(e)) from e
    number_of_paddlers_added, skipped_rows = process_competitors_df(
        competitors_df=competitors_df,
        competition_name=competition_name,
        scoresheet_name=scoresheet_name,
        number_of_runs=number_of_runs,
        number_of_runs_for_score=number_of_runs_for_score,
        number_of_judges=number_of_judges,
        random_heats=random_heats,
        number_of_random_heats=number_of_random_heats,
    )

    content: dict[str, object] = {
        "message": f"Succesfully made competition {competition_name} with {number_of_paddlers_added} athletes.",
        "skipped_rows": conversion_skips + skipped_rows,
    }
    return JSONResponse(status_code=201, content=content)


class ImageKind(StrEnum):
    LOGO = "logo"
    SIGNATURE = "signature"


MAX_IMAGE_BYTES = 10 * 1024 * 1024
IMAGE_CONTENT_TYPES = {"PNG": "image/png", "JPEG": "image/jpeg"}


def embeddable_image_content_type(content: bytes) -> str | None:
    """The image's content type, or None unless it is a PNG or JPEG fpdf2 can embed.

    Trial-embedding catches images Pillow opens but fpdf2 rejects, so a bad
    upload fails here rather than breaking every PDF for the competition.
    """
    try:
        with Image.open(BytesIO(content)) as image:
            content_type = IMAGE_CONTENT_TYPES.get(image.format or "")
        if content_type:
            pdf = FPDF()
            pdf.add_page()
            pdf.image(BytesIO(content), w=10)
    except Exception:
        return None
    return content_type


def get_competition_image(
    db: Session, competition_id: UUID, kind: ImageKind
) -> bytes | None:
    image = db.get(CompetitionImage, (competition_id, kind.value))
    return image.content if image else None


@competition_management_router.put(
    "/competition/{competition_id}/image/{kind}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def upload_competition_image(
    competition_id: UUID,
    kind: ImageKind,
    file: Annotated[UploadFile, File()],
    db: Session = Depends(get_transaction_session),
) -> None:
    """Store a PNG or JPEG of at most 10 MB, replacing any image of this kind."""
    if db.get(Competition, competition_id) is None:
        msg = "Competition not found"
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=msg)
    content = file.file.read(MAX_IMAGE_BYTES + 1)
    if len(content) > MAX_IMAGE_BYTES:
        msg = "Images must be 10 MB or smaller"
        raise HTTPException(status_code=status.HTTP_413_CONTENT_TOO_LARGE, detail=msg)
    content_type = embeddable_image_content_type(content)
    if content_type is None:
        msg = "Images must be PNG or JPEG"
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail=msg
        )
    db.merge(
        CompetitionImage(
            competition_id=competition_id,
            kind=kind.value,
            content=content,
            content_type=content_type,
        )
    )
    db.commit()


@competition_management_router.get(
    "/competition/{competition_id}/image/{kind}",
    response_class=Response,
    responses={200: {"content": {"image/png": {}, "image/jpeg": {}}}},
)
def get_competition_image_endpoint(
    competition_id: UUID,
    kind: ImageKind,
    db: Session = Depends(get_transaction_session),
) -> Response:
    image = db.get(CompetitionImage, (competition_id, kind.value))
    if image is None:
        msg = "No image stored"
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=msg)
    return Response(content=image.content, media_type=image.content_type)


@competition_management_router.delete(
    "/competition/{competition_id}/image/{kind}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_competition_image(
    competition_id: UUID,
    kind: ImageKind,
    db: Session = Depends(get_transaction_session),
) -> None:
    image = db.get(CompetitionImage, (competition_id, kind.value))
    if image is not None:
        db.delete(image)
        db.commit()


class NewPhaseInfo(BaseModel):
    new_heat_names: list[str]
    phase_id: str
    new_phase_name: str
    number_of_paddlers: int
    number_of_runs: int | None = None
    number_of_runs_for_score: int | None = None
    number_of_judges: int | None = None


class AthleteIDandRank(BaseModel):
    athlete_id: UUID
    ranking: int | None = None


@competition_management_router.post("/promote_phase", status_code=status.HTTP_200_OK)
def promote_phase(
    request_body: Annotated[NewPhaseInfo, Body(embed=True)],
    db: Session = Depends(get_transaction_session),
) -> Response:
    with db.begin():
        if request_body.number_of_paddlers == 0:
            msg = "Cannot promote a phase for 0 paddlers"
            raise HTTPException(422, msg)
        phase_scores = calculate_phase_scores(phase_id=request_body.phase_id, db=db)

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
            db.query(Phase).filter(Phase.id == request_body.phase_id).one_or_none()
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
