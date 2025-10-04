from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import ScoreSheet


class ScoreSheetCreate(BaseModel):
    id: Optional[UUID] = None
    name: str


class ScoreSheetResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True


scoresheet_router = APIRouter(prefix="/scoresheet", tags=["scoresheet"])


@scoresheet_router.get("/", response_model=list[ScoreSheetResponse])
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    id____list_____comparison_operator: Optional[str] = Query(
        None, alias="id____list_____comparison_operator"
    ),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____str_____comparison_operator: Optional[str] = Query(
        None, alias="name____str_____comparison_operator"
    ),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    name____list_____comparison_operator: Optional[str] = Query(
        None, alias="name____list_____comparison_operator"
    ),
    limit: Optional[int] = Query(None),
    offset: Optional[int] = Query(None),
    order_by_columns: Optional[list[str]] = Query(None),
):
    """Get many scoresheets"""
    query = select(ScoreSheet)

    # Apply filters
    if id____list:
        query = query.where(ScoreSheet.id.in_(id____list))

    if name____str:
        query = query.where(ScoreSheet.name.in_(name____str))

    if name____list:
        query = query.where(ScoreSheet.name.in_(name____list))

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "name" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(ScoreSheet.name.desc())
                else:
                    query = query.order_by(ScoreSheet.name.asc())

    # Apply pagination
    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)

    result = db.execute(query)
    scoresheets = result.scalars().all()

    return [ScoreSheetResponse.from_orm(scoresheet) for scoresheet in scoresheets]


@scoresheet_router.post("/", response_model=list[ScoreSheetResponse], status_code=201)
async def insert_many(
    scoresheets: list[ScoreSheetCreate],
    db: Session = Depends(get_transaction_session),
):
    """Insert many scoresheets"""
    db_scoresheets = []

    for scoresheet_data in scoresheets:
        db_scoresheet = ScoreSheet(**scoresheet_data.dict(exclude_none=True))
        db.add(db_scoresheet)
        db_scoresheets.append(db_scoresheet)

    db.commit()

    # Refresh to get generated IDs
    for scoresheet in db_scoresheets:
        db.refresh(scoresheet)

    return [ScoreSheetResponse.from_orm(scoresheet) for scoresheet in db_scoresheets]
