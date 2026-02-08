from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

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


@heat_router.get("/", response_model=list[HeatResponse])
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    competition_id____list: Optional[list[UUID]] = Query(
        None, alias="competition_id____list"
    ),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    limit: Optional[int] = Query(None),
    offset: Optional[int] = Query(None),
    order_by_columns: Optional[list[str]] = Query(None),
    join_foreign_table: Optional[list[str]] = Query(None),
) -> list[HeatResponse]:
    """Get many heats"""
    query = select(Heat)

    # Apply filters
    if id____list:
        query = query.where(Heat.id.in_(id____list))

    if competition_id____list:
        query = query.where(Heat.competition_id.in_(competition_id____list))

    if name____str:
        query = query.where(Heat.name.in_(name____str))

    if name____list:
        query = query.where(Heat.name.in_(name____list))

    # Apply joins if requested
    if join_foreign_table:
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Heat.competition))
        if "athleteheat" in join_foreign_table:
            query = query.options(selectinload(Heat.athletes))

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "name" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(Heat.name.desc())
                else:
                    query = query.order_by(Heat.name.asc())
            elif "competition_id" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(Heat.competition_id.desc())
                else:
                    query = query.order_by(Heat.competition_id.asc())

    # Apply pagination
    if offset is not None:
        query = query.offset(offset)
    if limit is not None:
        query = query.limit(limit)

    result = db.execute(query)
    heats = result.scalars().all()

    heat_responses = []
    for heat in heats:
        response_data = {
            "id": heat.id,
            "competition_id": heat.competition_id,
            "name": heat.name,
        }
        if join_foreign_table:
            if "competition" in join_foreign_table and heat.competition:
                response_data["competition_foreign"] = [
                    CompetitionNested.from_orm(heat.competition)
                ]
            if "athleteheat" in join_foreign_table and hasattr(heat, "athletes"):
                response_data["athleteheat_foreign"] = [
                    AthleteHeatNested.from_orm(ah) for ah in heat.athletes
                ]
        heat_responses.append(HeatResponse(**response_data))

    return heat_responses


@heat_router.get("/{id}", response_model=HeatResponse)
async def get_one_by_primary_key(
    id: UUID,
    db: Session = Depends(get_transaction_session),
    competition_id____list: Optional[list[UUID]] = Query(
        None, alias="competition_id____list"
    ),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    join_foreign_table: Optional[list[str]] = Query(None),
) -> HeatResponse:
    """Get one heat by primary key"""
    query = select(Heat).where(Heat.id == id)

    # Apply additional filters if provided
    if competition_id____list:
        query = query.where(Heat.competition_id.in_(competition_id____list))
    if name____str:
        query = query.where(Heat.name.in_(name____str))
    if name____list:
        query = query.where(Heat.name.in_(name____list))

    # Apply joins if requested
    if join_foreign_table:
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Heat.competition))
        if "athleteheat" in join_foreign_table:
            query = query.options(selectinload(Heat.athletes))

    result = db.execute(query)
    heat = result.scalar_one_or_none()

    if not heat:
        raise HTTPException(status_code=404, detail="Heat not found")

    response_data = {
        "id": heat.id,
        "competition_id": heat.competition_id,
        "name": heat.name,
    }
    if join_foreign_table:
        if "competition" in join_foreign_table and heat.competition:
            response_data["competition_foreign"] = [
                CompetitionNested.from_orm(heat.competition)
            ]
        if "athleteheat" in join_foreign_table and hasattr(heat, "athletes"):
            response_data["athleteheat_foreign"] = [
                AthleteHeatNested.from_orm(ah) for ah in heat.athletes
            ]

    return HeatResponse(**response_data)


@heat_router.patch("/{id}", response_model=HeatResponse)
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
    update_data = heat_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(heat, field, value)

    db.commit()
    db.refresh(heat)
    return HeatResponse.from_orm(heat)


@heat_router.post("/", response_model=list[HeatResponse], status_code=201)
async def insert_many(
    heats: list[HeatCreate],
    db: Session = Depends(get_transaction_session),
) -> list[HeatResponse]:
    """Insert many heats"""
    db_heats = []

    for heat_data in heats:
        db_heat = Heat(**heat_data.dict(exclude_none=True))
        db.add(db_heat)
        db_heats.append(db_heat)

    db.commit()

    # Refresh to get generated IDs
    for heat in db_heats:
        db.refresh(heat)

    return [HeatResponse.from_orm(heat) for heat in db_heats]
