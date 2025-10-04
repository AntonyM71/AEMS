from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import AvailableBonuses


class AvailableBonusesResponse(BaseModel):
    id: UUID
    sheet_id: UUID
    move_id: UUID
    name: str
    score: int  # Integer, not float - matches models.py
    display_order: Optional[int] = None

    class Config:
        orm_mode = True


availablebonuses_router = APIRouter(
    prefix="/availablebonuses", tags=["availablebonuses"]
)


@availablebonuses_router.get("/", response_model=list[AvailableBonusesResponse])
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    id____list_____comparison_operator: Optional[str] = Query(
        None, alias="id____list_____comparison_operator"
    ),
    sheet_id____list: Optional[list[UUID]] = Query(None, alias="sheet_id____list"),
    sheet_id____list_____comparison_operator: Optional[str] = Query(
        None, alias="sheet_id____list_____comparison_operator"
    ),
    move_id____list: Optional[list[UUID]] = Query(None, alias="move_id____list"),
    move_id____list_____comparison_operator: Optional[str] = Query(
        None, alias="move_id____list_____comparison_operator"
    ),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____str_____comparison_operator: Optional[str] = Query(
        None, alias="name____str_____comparison_operator"
    ),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    name____list_____comparison_operator: Optional[str] = Query(
        None, alias="name____list_____comparison_operator"
    ),
    score____from: Optional[int] = Query(None, alias="score____from"),
    score____to: Optional[int] = Query(None, alias="score____to"),
    score____list: Optional[list[int]] = Query(None, alias="score____list"),
    score____list_____comparison_operator: Optional[str] = Query(
        None, alias="score____list_____comparison_operator"
    ),
    display_order____from: Optional[int] = Query(None, alias="display_order____from"),
    display_order____to: Optional[int] = Query(None, alias="display_order____to"),
    display_order____list: Optional[list[int]] = Query(
        None, alias="display_order____list"
    ),
    display_order____list_____comparison_operator: Optional[str] = Query(
        None, alias="display_order____list_____comparison_operator"
    ),
    limit: Optional[int] = Query(None),
    offset: Optional[int] = Query(None),
    order_by_columns: Optional[list[str]] = Query(None),
):
    """Get many available bonuses"""
    query = select(AvailableBonuses)

    # Apply filters
    if id____list:
        query = query.where(AvailableBonuses.id.in_(id____list))

    if sheet_id____list:
        query = query.where(AvailableBonuses.sheet_id.in_(sheet_id____list))

    if move_id____list:
        query = query.where(AvailableBonuses.move_id.in_(move_id____list))

    if name____str:
        query = query.where(AvailableBonuses.name.in_(name____str))

    if name____list:
        query = query.where(AvailableBonuses.name.in_(name____list))

    if score____from is not None:
        query = query.where(AvailableBonuses.score >= score____from)
    if score____to is not None:
        query = query.where(AvailableBonuses.score <= score____to)
    if score____list:
        query = query.where(AvailableBonuses.score.in_(score____list))

    if display_order____from is not None:
        query = query.where(AvailableBonuses.display_order >= display_order____from)
    if display_order____to is not None:
        query = query.where(AvailableBonuses.display_order <= display_order____to)
    if display_order____list:
        query = query.where(AvailableBonuses.display_order.in_(display_order____list))

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "name" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableBonuses.name.desc())
                else:
                    query = query.order_by(AvailableBonuses.name.asc())
            elif "score" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableBonuses.score.desc())
                else:
                    query = query.order_by(AvailableBonuses.score.asc())
            elif "display_order" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableBonuses.display_order.desc())
                else:
                    query = query.order_by(AvailableBonuses.display_order.asc())
            elif "sheet_id" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableBonuses.sheet_id.desc())
                else:
                    query = query.order_by(AvailableBonuses.sheet_id.asc())
            elif "move_id" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(AvailableBonuses.move_id.desc())
                else:
                    query = query.order_by(AvailableBonuses.move_id.asc())

    # Apply pagination
    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)

    result = db.execute(query)
    available_bonuses = result.scalars().all()

    return [AvailableBonusesResponse.from_orm(bonus) for bonus in available_bonuses]
