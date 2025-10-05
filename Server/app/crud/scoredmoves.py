from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import delete
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import ScoredMoves


class ScoredMovesResponse(BaseModel):
    id: UUID
    athleteheat_id: UUID
    run_number: int
    judge: int
    move_id: UUID
    score: float

    class Config:
        orm_mode = True


scoredmoves_router = APIRouter(prefix="/scoredmoves", tags=["scoredmoves"])


@scoredmoves_router.delete("/", response_model=dict)
async def delete_many(
    db: Session = Depends(get_transaction_session),
    heat_id____list: Optional[list[UUID]] = Query(
        None, alias="heat_id____list"),
    athlete_id____list: Optional[list[UUID]] = Query(
        None, alias="athlete_id____list"),
) -> dict:
    """Delete many scored moves by heat_id and athlete_id"""
    query = delete(ScoredMoves)

    # Filter by heat_id directly
    if heat_id____list:
        query = query.where(ScoredMoves.heat_id.in_(heat_id____list))

    # Filter by athlete_id directly
    if athlete_id____list:
        query = query.where(ScoredMoves.athlete_id.in_(athlete_id____list))

    result = db.execute(query)
    deleted_count = result.rowcount

    db.commit()

    return {"deleted_count": deleted_count}
