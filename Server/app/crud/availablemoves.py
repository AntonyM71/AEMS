from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.schemas import AvailableMovesResponse
from db.client import get_transaction_session
from db.models import AvailableMoves

availablemoves_router = APIRouter(prefix="/availablemoves", tags=["availablemoves"])


@availablemoves_router.get("/", response_model=list[AvailableMovesResponse])
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    id____list_____comparison_operator: str | None = Query(
        None, alias="id____list_____comparison_operator"
    ),
    sheet_id____list: list[UUID] | None = Query(None, alias="sheet_id____list"),
    sheet_id____list_____comparison_operator: str | None = Query(
        None, alias="sheet_id____list_____comparison_operator"
    ),
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____str_____comparison_operator: str | None = Query(
        None, alias="name____str_____comparison_operator"
    ),
    name____list: list[str] | None = Query(None, alias="name____list"),
    name____list_____comparison_operator: str | None = Query(
        None, alias="name____list_____comparison_operator"
    ),
    fl_score____from: int | None = Query(None, alias="fl_score____from"),
    fl_score____to: int | None = Query(None, alias="fl_score____to"),
    fl_score____list: list[int] | None = Query(None, alias="fl_score____list"),
    fl_score____list_____comparison_operator: str | None = Query(
        None, alias="fl_score____list_____comparison_operator"
    ),
    rb_score____from: int | None = Query(None, alias="rb_score____from"),
    rb_score____to: int | None = Query(None, alias="rb_score____to"),
    rb_score____list: list[int] | None = Query(None, alias="rb_score____list"),
    rb_score____list_____comparison_operator: str | None = Query(
        None, alias="rb_score____list_____comparison_operator"
    ),
    direction____str: list[str] | None = Query(None, alias="direction____str"),
    direction____str_____comparison_operator: str | None = Query(
        None, alias="direction____str_____comparison_operator"
    ),
    direction____list: list[str] | None = Query(None, alias="direction____list"),
    direction____list_____comparison_operator: str | None = Query(
        None, alias="direction____list_____comparison_operator"
    ),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
) -> list[AvailableMovesResponse]:
    """Get many available moves"""
    query = select(AvailableMoves)

    # Apply filters
    if id____list:
        query = query.where(AvailableMoves.id.in_(id____list))

    if sheet_id____list:
        query = query.where(AvailableMoves.sheet_id.in_(sheet_id____list))

    if name____str:
        query = query.where(AvailableMoves.name.in_(name____str))

    if name____list:
        query = query.where(AvailableMoves.name.in_(name____list))

    if fl_score____from is not None:
        query = query.where(AvailableMoves.fl_score >= fl_score____from)
    if fl_score____to is not None:
        query = query.where(AvailableMoves.fl_score <= fl_score____to)
    if fl_score____list:
        query = query.where(AvailableMoves.fl_score.in_(fl_score____list))

    if rb_score____from is not None:
        query = query.where(AvailableMoves.rb_score >= rb_score____from)
    if rb_score____to is not None:
        query = query.where(AvailableMoves.rb_score <= rb_score____to)
    if rb_score____list:
        query = query.where(AvailableMoves.rb_score.in_(rb_score____list))

    if direction____str:
        query = query.where(AvailableMoves.direction.in_(direction____str))

    if direction____list:
        query = query.where(AvailableMoves.direction.in_(direction____list))

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "name" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableMoves.name.desc())
                else:
                    query = query.order_by(AvailableMoves.name.asc())
            elif "fl_score" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableMoves.fl_score.desc())
                else:
                    query = query.order_by(AvailableMoves.fl_score.asc())
            elif "rb_score" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableMoves.rb_score.desc())
                else:
                    query = query.order_by(AvailableMoves.rb_score.asc())
            elif "direction" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableMoves.direction.desc())
                else:
                    query = query.order_by(AvailableMoves.direction.asc())

    # Apply pagination
    if offset is not None:
        query = query.offset(offset)
    if limit is not None:
        query = query.limit(limit)

    result = db.execute(query)
    available_moves = result.scalars().all()

    return [AvailableMovesResponse.model_validate(move) for move in available_moves]
