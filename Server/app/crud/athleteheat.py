from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import AthleteHeat


class AthleteHeatCreate(BaseModel):
    id: Optional[UUID] = None
    athlete_id: UUID
    heat_id: UUID
    phase_id: UUID
    last_phase_rank: Optional[int] = None


class AthleteHeatResponse(BaseModel):
    id: UUID
    athlete_id: UUID
    heat_id: UUID
    phase_id: UUID

    class Config:
        orm_mode = True


class AthleteHeatUpdate(BaseModel):
    athlete_id: Optional[UUID] = None
    heat_id: Optional[UUID] = None
    phase_id: Optional[UUID] = None
    last_phase_rank: Optional[int] = None


athleteheat_router = APIRouter(prefix="/athleteheat", tags=["athleteheat"])


@athleteheat_router.post("/", response_model=list[AthleteHeatResponse], status_code=201)
async def insert_many(
    athlete_heats: list[AthleteHeatCreate],
    db: Session = Depends(get_transaction_session),
) -> list[AthleteHeatResponse]:
    """Insert many athlete heats"""
    db_athlete_heats = []

    for athlete_heat_data in athlete_heats:
        db_athlete_heat = AthleteHeat(
            **athlete_heat_data.dict(exclude_none=True))
        db.add(db_athlete_heat)
        db_athlete_heats.append(db_athlete_heat)

    db.commit()

    # Refresh to get generated IDs
    for athlete_heat in db_athlete_heats:
        db.refresh(athlete_heat)

    return [
        AthleteHeatResponse.from_orm(athlete_heat) for athlete_heat in db_athlete_heats
    ]


@athleteheat_router.patch("/{id}", response_model=AthleteHeatResponse)
async def partial_update_one_by_primary_key(
    id: UUID,
    athlete_heat_update: AthleteHeatUpdate,
    db: Session = Depends(get_transaction_session),
    athlete_id____list: Optional[list[UUID]] = Query(
        None, alias="athlete_id____list"),
    heat_id____list: Optional[list[UUID]] = Query(
        None, alias="heat_id____list"),
    phase_id____list: Optional[list[UUID]] = Query(
        None, alias="phase_id____list"),
    bib____str: Optional[list[str]] = Query(None, alias="bib____str"),
    bib____list: Optional[list[str]] = Query(None, alias="bib____list"),
) -> AthleteHeatResponse:
    """Partial update one athlete heat by primary key"""
    query = select(AthleteHeat).where(AthleteHeat.id == id)

    # Apply additional filters if provided
    if athlete_id____list:
        query = query.where(AthleteHeat.athlete_id.in_(athlete_id____list))
    if heat_id____list:
        query = query.where(AthleteHeat.heat_id.in_(heat_id____list))
    if phase_id____list:
        query = query.where(AthleteHeat.phase_id.in_(phase_id____list))
    if bib____str:
        query = query.where(AthleteHeat.bib.in_(bib____str))
    if bib____list:
        query = query.where(AthleteHeat.bib.in_(bib____list))

    result = db.execute(query)
    db_athlete_heat = result.scalar_one_or_none()

    if not db_athlete_heat:
        raise HTTPException(status_code=404, detail="Athlete heat not found")

    # Update only provided fields
    update_data = athlete_heat_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_athlete_heat, field, value)

    db.commit()
    db.refresh(db_athlete_heat)
    return AthleteHeatResponse.from_orm(db_athlete_heat)
