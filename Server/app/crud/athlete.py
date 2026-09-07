from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.crud.schemas import AthleteCreate, AthleteResponse, AthleteUpdate
from db.client import get_transaction_session
from db.models import Athlete

athlete_router = APIRouter(prefix="/athlete", tags=["athlete"])


@athlete_router.post("/", status_code=201)
async def insert_many(
    athletes: list[AthleteCreate],
    db: Annotated[Session, Depends(get_transaction_session)],
) -> list[AthleteResponse]:
    """Insert many athletes"""
    db_athletes = []

    for athlete_data in athletes:
        db_athlete = Athlete(**athlete_data.model_dump(exclude_none=True))
        db.add(db_athlete)
        db_athletes.append(db_athlete)

    db.commit()

    # Refresh to get generated IDs
    for athlete in db_athletes:
        db.refresh(athlete)

    return [AthleteResponse.model_validate(athlete) for athlete in db_athletes]


@athlete_router.patch("/{id}")
async def partial_update_one_by_primary_key(
    id: UUID,
    athlete_update: AthleteUpdate,
    db: Annotated[Session, Depends(get_transaction_session)],
) -> AthleteResponse:
    """Partial update one athlete by primary key"""
    query = select(Athlete).where(Athlete.id == id)

    result = db.execute(query)
    db_athlete = result.scalar_one_or_none()

    if not db_athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")

    # Update only provided fields
    update_data = athlete_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_athlete, field, value)

    db.commit()
    db.refresh(db_athlete)
    return AthleteResponse.model_validate(db_athlete)
