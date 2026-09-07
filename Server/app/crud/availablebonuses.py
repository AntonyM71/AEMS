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
from app.crud.schemas import AvailableBonusesResponse
from db.client import get_transaction_session
from db.models import AvailableBonuses

availablebonuses_router = APIRouter(
    prefix="/availablebonuses", tags=["availablebonuses"]
)


@availablebonuses_router.get("/")
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    sheet_id____list: list[UUID] | None = Query(None, alias="sheet_id____list"),
    move_id____list: list[UUID] | None = Query(None, alias="move_id____list"),
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    score____from: int | None = Query(None, alias="score____from"),
    score____to: int | None = Query(None, alias="score____to"),
    score____list: list[int] | None = Query(None, alias="score____list"),
    display_order____from: int | None = Query(None, alias="display_order____from"),
    display_order____to: int | None = Query(None, alias="display_order____to"),
    display_order____list: list[int] | None = Query(
        None, alias="display_order____list"
    ),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
) -> list[AvailableBonusesResponse]:
    """Get many available bonuses"""
    query = select(AvailableBonuses)

    query = apply_in_filters(
        query,
        [
            (AvailableBonuses.id, id____list),
            (AvailableBonuses.sheet_id, sheet_id____list),
            (AvailableBonuses.move_id, move_id____list),
            (AvailableBonuses.name, name____str),
            (AvailableBonuses.name, name____list),
            (AvailableBonuses.score, score____list),
            (AvailableBonuses.display_order, display_order____list),
        ],
    )
    query = apply_range_filters(
        query,
        [
            (AvailableBonuses.score, score____from, score____to),
            (
                AvailableBonuses.display_order,
                display_order____from,
                display_order____to,
            ),
        ],
    )
    query = apply_ordering(
        query,
        order_by_columns,
        {
            "name": AvailableBonuses.name,
            "score": AvailableBonuses.score,
            "display_order": AvailableBonuses.display_order,
            "sheet_id": AvailableBonuses.sheet_id,
            "move_id": AvailableBonuses.move_id,
        },
    )
    query = apply_pagination(query, limit, offset)

    result = db.execute(query)
    available_bonuses = result.scalars().all()

    return [
        AvailableBonusesResponse.model_validate(bonus) for bonus in available_bonuses
    ]
