from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import Athlete


class AthleteCreate(BaseModel):
    id: Optional[UUID] = None
    first_name: str
    last_name: str
    affiliation: Optional[str] = None
    bib: str


class AthleteResponse(BaseModel):
    id: UUID
    first_name: str
    last_name: str
    affiliation: Optional[str] = None
    bib: str

    class Config:
        orm_mode = True


class AthleteUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    affiliation: Optional[str] = None
    bib: Optional[str] = None


athlete_router = APIRouter(prefix="/athlete", tags=["athlete"])


@athlete_router.post("/", response_model=list[AthleteResponse], status_code=201)
async def insert_many(
    athletes: list[AthleteCreate],
    db: Session = Depends(get_transaction_session),
) -> list[AthleteResponse]:
    """Insert many athletes"""
    db_athletes = []

    for athlete_data in athletes:
        db_athlete = Athlete(**athlete_data.dict(exclude_none=True))
        db.add(db_athlete)
        db_athletes.append(db_athlete)

    db.commit()

    # Refresh to get generated IDs
    for athlete in db_athletes:
        db.refresh(athlete)

    return [AthleteResponse.from_orm(athlete) for athlete in db_athletes]


@athlete_router.patch("/{id}", response_model=AthleteResponse)
async def partial_update_one_by_primary_key(
    id: UUID,
    athlete_update: AthleteUpdate,
    db: Session = Depends(get_transaction_session),
    first_name____str: Optional[list[str]] = Query(
        None, alias="first_name____str"),
    first_name____list: Optional[list[str]] = Query(
        None, alias="first_name____list"),
    last_name____str: Optional[list[str]] = Query(
        None, alias="last_name____str"),
    last_name____list: Optional[list[str]] = Query(
        None, alias="last_name____list"),
    affiliation____str: Optional[list[str]] = Query(
        None, alias="affiliation____str"),
    affiliation____list: Optional[list[str]] = Query(
        None, alias="affiliation____list"),
    bib____str: Optional[list[str]] = Query(None, alias="bib____str"),
    bib____list: Optional[list[str]] = Query(None, alias="bib____list"),
) -> AthleteResponse:
    """Partial update one athlete by primary key"""
    query = select(Athlete).where(Athlete.id == id)

    # Apply additional filters if provided
    if first_name____str:
        query = query.where(Athlete.first_name.in_(first_name____str))
    if first_name____list:
        query = query.where(Athlete.first_name.in_(first_name____list))
    if last_name____str:
        query = query.where(Athlete.last_name.in_(last_name____str))
    if last_name____list:
        query = query.where(Athlete.last_name.in_(last_name____list))
    if affiliation____str:
        query = query.where(Athlete.affiliation.in_(affiliation____str))
    if affiliation____list:
        query = query.where(Athlete.affiliation.in_(affiliation____list))
    if bib____str:
        query = query.where(Athlete.bib.in_(bib____str))
    if bib____list:
        query = query.where(Athlete.bib.in_(bib____list))

    result = db.execute(query)
    db_athlete = result.scalar_one_or_none()

    if not db_athlete:
        raise HTTPException(status_code=404, detail="Athlete not found")

    # Update only provided fields
    update_data = athlete_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_athlete, field, value)

    db.commit()
    db.refresh(db_athlete)
    return AthleteResponse.from_orm(db_athlete)
