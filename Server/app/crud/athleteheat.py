from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.schemas import AthleteHeatCreate, AthleteHeatResponse, AthleteHeatUpdate
from db.client import get_transaction_session
from db.models import AthleteHeat

athleteheat_router = APIRouter(prefix="/athleteheat", tags=["athleteheat"])


@athleteheat_router.post("/", response_model=list[AthleteHeatResponse], status_code=201)
async def insert_many(
    athlete_heats: list[AthleteHeatCreate],
    db: Session = Depends(get_transaction_session),
) -> list[AthleteHeatResponse]:
    """Insert many athlete heats"""
    db_athlete_heats = []

    for athlete_heat_data in athlete_heats:
        db_athlete_heat = AthleteHeat(**athlete_heat_data.model_dump(exclude_none=True))
        db.add(db_athlete_heat)
        db_athlete_heats.append(db_athlete_heat)

    db.commit()

    # Refresh to get generated IDs
    for athlete_heat in db_athlete_heats:
        db.refresh(athlete_heat)

    return [
        AthleteHeatResponse.model_validate(athlete_heat) for athlete_heat in db_athlete_heats
    ]


@athleteheat_router.patch("/{id}", response_model=AthleteHeatResponse)
async def partial_update_one_by_primary_key(
    id: UUID,
    athlete_heat_update: AthleteHeatUpdate,
    db: Session = Depends(get_transaction_session),
    athlete_id____list: list[UUID] | None = Query(None, alias="athlete_id____list"),
    heat_id____list: list[UUID] | None = Query(None, alias="heat_id____list"),
    phase_id____list: list[UUID] | None = Query(None, alias="phase_id____list"),
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

    result = db.execute(query)
    db_athlete_heat = result.scalar_one_or_none()

    if not db_athlete_heat:
        raise HTTPException(status_code=404, detail="Athlete heat not found")

    # Update only provided fields
    update_data = athlete_heat_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_athlete_heat, field, value)

    db.commit()
    db.refresh(db_athlete_heat)
    return AthleteHeatResponse.model_validate(db_athlete_heat)
