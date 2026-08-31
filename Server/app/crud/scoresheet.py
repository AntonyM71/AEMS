from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.query_helpers import (
    apply_in_filters,
    apply_ordering,
    apply_pagination,
)
from app.crud.schemas import ScoreSheetCreate, ScoreSheetResponse
from db.client import get_transaction_session
from db.models import ScoreSheet

scoresheet_router = APIRouter(prefix="/scoresheet", tags=["scoresheet"])


@scoresheet_router.get("/")
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
) -> list[ScoreSheetResponse]:
    """Get many scoresheets"""
    query = select(ScoreSheet)

    query = apply_in_filters(
        query,
        [
            (ScoreSheet.id, id____list),
            (ScoreSheet.name, name____str),
            (ScoreSheet.name, name____list),
        ],
    )
    query = apply_ordering(query, order_by_columns, {"name": ScoreSheet.name})
    query = apply_pagination(query, limit, offset)

    result = db.execute(query)
    scoresheets = result.scalars().all()

    return [ScoreSheetResponse.model_validate(scoresheet) for scoresheet in scoresheets]


@scoresheet_router.post("/", status_code=201)
async def insert_many(
    scoresheets: list[ScoreSheetCreate],
    db: Session = Depends(get_transaction_session),
) -> list[ScoreSheetResponse]:
    """Insert many scoresheets"""
    db_scoresheets = []

    for scoresheet_data in scoresheets:
        db_scoresheet = ScoreSheet(**scoresheet_data.model_dump(exclude_none=True))
        db.add(db_scoresheet)
        db_scoresheets.append(db_scoresheet)

    db.commit()

    # Refresh to get generated IDs
    for scoresheet in db_scoresheets:
        db.refresh(scoresheet)

    return [
        ScoreSheetResponse.model_validate(scoresheet) for scoresheet in db_scoresheets
    ]
