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
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    id____list_____comparison_operator: Optional[str] = Query(
        None, alias="id____list_____comparison_operator"
    ),
    athleteheat_id____list: Optional[list[UUID]] = Query(
        None, alias="athleteheat_id____list"
    ),
    athleteheat_id____list_____comparison_operator: Optional[str] = Query(
        None, alias="athleteheat_id____list_____comparison_operator"
    ),
    run_number____from: Optional[int] = Query(None, alias="run_number____from"),
    run_number____to: Optional[int] = Query(None, alias="run_number____to"),
    run_number____list: Optional[list[int]] = Query(None, alias="run_number____list"),
    run_number____list_____comparison_operator: Optional[str] = Query(
        None, alias="run_number____list_____comparison_operator"
    ),
    judge____from: Optional[int] = Query(None, alias="judge____from"),
    judge____to: Optional[int] = Query(None, alias="judge____to"),
    judge____list: Optional[list[int]] = Query(None, alias="judge____list"),
    judge____list_____comparison_operator: Optional[str] = Query(
        None, alias="judge____list_____comparison_operator"
    ),
    move_id____list: Optional[list[UUID]] = Query(None, alias="move_id____list"),
    move_id____list_____comparison_operator: Optional[str] = Query(
        None, alias="move_id____list_____comparison_operator"
    ),
    score____from: Optional[float] = Query(None, alias="score____from"),
    score____to: Optional[float] = Query(None, alias="score____to"),
    score____list: Optional[list[float]] = Query(None, alias="score____list"),
    score____list_____comparison_operator: Optional[str] = Query(
        None, alias="score____list_____comparison_operator"
    ),
):
    """Delete many scored moves"""
    query = delete(ScoredMoves)

    # Apply filters
    if id____list:
        query = query.where(ScoredMoves.id.in_(id____list))

    if athleteheat_id____list:
        query = query.where(ScoredMoves.athleteheat_id.in_(athleteheat_id____list))

    if run_number____from is not None:
        query = query.where(ScoredMoves.run_number >= run_number____from)
    if run_number____to is not None:
        query = query.where(ScoredMoves.run_number <= run_number____to)
    if run_number____list:
        query = query.where(ScoredMoves.run_number.in_(run_number____list))

    if judge____from is not None:
        query = query.where(ScoredMoves.judge >= judge____from)
    if judge____to is not None:
        query = query.where(ScoredMoves.judge <= judge____to)
    if judge____list:
        query = query.where(ScoredMoves.judge.in_(judge____list))

    if move_id____list:
        query = query.where(ScoredMoves.move_id.in_(move_id____list))

    if score____from is not None:
        query = query.where(ScoredMoves.score >= score____from)
    if score____to is not None:
        query = query.where(ScoredMoves.score <= score____to)
    if score____list:
        query = query.where(ScoredMoves.score.in_(score____list))

    result = db.execute(query)
    deleted_count = result.rowcount

    db.commit()

    return {"deleted_count": deleted_count}
