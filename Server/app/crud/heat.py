from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import Select, select
from sqlalchemy.orm import Session, selectinload

from app.crud.query_helpers import (
    apply_in_filters,
    apply_ordering,
    apply_pagination,
)
from app.crud.schemas import (
    AthleteHeatNested,
    CompetitionNested,
    HeatCreate,
    HeatResponse,
    HeatUpdate,
)
from db.client import get_transaction_session
from db.models import Heat

heat_router = APIRouter(prefix="/heat", tags=["heat"])

_HEAT_SORTABLE = {"name": Heat.name, "competition_id": Heat.competition_id}


def _apply_heat_joins(
    query: Select[tuple[Heat]], join_foreign_table: list[str] | None
) -> Select[tuple[Heat]]:
    if join_foreign_table:
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Heat.competition))
        if "athleteheat" in join_foreign_table:
            query = query.options(selectinload(Heat.athletes))
    return query


def _build_heat_response(
    heat: Heat, join_foreign_table: list[str] | None
) -> HeatResponse:
    response_data: dict[str, Any] = {
        "id": heat.id,
        "competition_id": heat.competition_id,
        "name": heat.name,
    }
    if join_foreign_table:
        if "competition" in join_foreign_table and heat.competition:
            response_data["competition_foreign"] = [
                CompetitionNested.model_validate(heat.competition)
            ]
        if "athleteheat" in join_foreign_table and hasattr(heat, "athletes"):
            response_data["athleteheat_foreign"] = [
                AthleteHeatNested.model_validate(ah) for ah in heat.athletes
            ]
    return HeatResponse(**response_data)


@heat_router.get("/")
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    competition_id____list: list[UUID] | None = Query(
        None, alias="competition_id____list"
    ),
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
    join_foreign_table: list[str] | None = Query(None),
) -> list[HeatResponse]:
    """Get many heats"""
    query = select(Heat)

    query = apply_in_filters(
        query,
        [
            (Heat.id, id____list),
            (Heat.competition_id, competition_id____list),
            (Heat.name, name____str),
            (Heat.name, name____list),
        ],
    )
    query = _apply_heat_joins(query, join_foreign_table)
    query = apply_ordering(query, order_by_columns, _HEAT_SORTABLE)
    query = apply_pagination(query, limit, offset)

    result = db.execute(query)
    heats = result.scalars().all()

    return [_build_heat_response(heat, join_foreign_table) for heat in heats]


@heat_router.get("/{id}")
async def get_one_by_primary_key(
    id: UUID,
    db: Session = Depends(get_transaction_session),
    competition_id____list: list[UUID] | None = Query(
        None, alias="competition_id____list"
    ),
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    join_foreign_table: list[str] | None = Query(None),
) -> HeatResponse:
    """Get one heat by primary key"""
    query = select(Heat).where(Heat.id == id)

    query = apply_in_filters(
        query,
        [
            (Heat.competition_id, competition_id____list),
            (Heat.name, name____str),
            (Heat.name, name____list),
        ],
    )
    query = _apply_heat_joins(query, join_foreign_table)

    result = db.execute(query)
    heat = result.scalar_one_or_none()

    if not heat:
        raise HTTPException(status_code=404, detail="Heat not found")

    return _build_heat_response(heat, join_foreign_table)


@heat_router.patch("/{id}")
async def partial_update_one_by_primary_key(
    id: UUID,
    heat_update: HeatUpdate,
    db: Session = Depends(get_transaction_session),
) -> HeatResponse:
    """Partial update one heat by primary key"""
    query = select(Heat).where(Heat.id == id)

    result = db.execute(query)
    heat = result.scalar_one_or_none()

    if not heat:
        raise HTTPException(status_code=404, detail="Heat not found")

    # Update only provided fields
    update_data = heat_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(heat, field, value)

    db.commit()
    db.refresh(heat)
    return HeatResponse.from_orm(heat)


@heat_router.post("/", status_code=201)
async def insert_many(
    heats: list[HeatCreate],
    db: Session = Depends(get_transaction_session),
) -> list[HeatResponse]:
    """Insert many heats"""
    db_heats = []

    for heat_data in heats:
        db_heat = Heat(**heat_data.model_dump(exclude_none=True))
        db.add(db_heat)
        db_heats.append(db_heat)

    db.commit()

    # Refresh to get generated IDs
    for heat in db_heats:
        db.refresh(heat)

    return [HeatResponse.model_validate(heat) for heat in db_heats]
