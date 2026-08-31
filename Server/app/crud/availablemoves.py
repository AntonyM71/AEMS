from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.query_helpers import (
    apply_in_filters,
    apply_ordering,
    apply_pagination,
    apply_range_filters,
)
from app.crud.schemas import AvailableMovesResponse
from db.client import get_transaction_session
from db.models import AvailableMoves

availablemoves_router = APIRouter(prefix="/availablemoves", tags=["availablemoves"])


@availablemoves_router.get("/")
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
    display_order____from: int | None = Query(None, alias="display_order____from"),
    display_order____to: int | None = Query(None, alias="display_order____to"),
    display_order____list: list[int] | None = Query(
        None, alias="display_order____list"
    ),
    display_order____list_____comparison_operator: str | None = Query(
        None, alias="display_order____list_____comparison_operator"
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

    query = apply_in_filters(
        query,
        [
            (AvailableMoves.id, id____list),
            (AvailableMoves.sheet_id, sheet_id____list),
            (AvailableMoves.name, name____str),
            (AvailableMoves.name, name____list),
            (AvailableMoves.fl_score, fl_score____list),
            (AvailableMoves.rb_score, rb_score____list),
            (AvailableMoves.direction, direction____str),
            (AvailableMoves.direction, direction____list),
            (AvailableMoves.display_order, display_order____list),
        ],
    )
    query = apply_range_filters(
        query,
        [
            (AvailableMoves.fl_score, fl_score____from, fl_score____to),
            (AvailableMoves.rb_score, rb_score____from, rb_score____to),
            (
                AvailableMoves.display_order,
                display_order____from,
                display_order____to,
            ),
        ],
    )
    query = apply_ordering(
        query,
        order_by_columns,
        {
            "name": AvailableMoves.name,
            "fl_score": AvailableMoves.fl_score,
            "rb_score": AvailableMoves.rb_score,
            "direction": AvailableMoves.direction,
            "display_order": AvailableMoves.display_order,
        },
        default=(AvailableMoves.display_order.asc(), AvailableMoves.id.asc()),
    )
    query = apply_pagination(query, limit, offset)

    result = db.execute(query)
    available_moves = result.scalars().all()

    return [AvailableMovesResponse.model_validate(move) for move in available_moves]
