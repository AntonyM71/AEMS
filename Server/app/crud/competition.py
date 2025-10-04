from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from db.client import get_transaction_session
from db.models import Competition, Event


class CompetitionCreate(BaseModel):
    id: Optional[UUID] = None
    name: str


class CompetitionResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True


class CompetitionUpdate(BaseModel):
    name: Optional[str] = None


class CompetitionWithEvents(CompetitionResponse):
    events: list[dict] = []


competition_router = APIRouter(
    prefix="/competition", tags=["competition"])


@competition_router.get("/", response_model=list[CompetitionResponse])
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    limit: Optional[int] = Query(None),
    offset: Optional[int] = Query(None),
    order_by_columns: Optional[list[str]] = Query(None),
    join_foreign_table: Optional[list[str]] = Query(None),
):
    """Get many competitions"""
    query = select(Competition)

    # Apply filters
    if id____list:
        query = query.where(Competition.id.in_(id____list))

    if name____str:
        # Simple string matching - in real implementation you'd handle matching patterns
        query = query.where(Competition.name.in_(name____str))

    if name____list:
        query = query.where(Competition.name.in_(name____list))

    # Apply joins if requested
    if join_foreign_table and "event" in join_foreign_table:
        query = query.options(selectinload(Competition.events))

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "name" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(Competition.name.desc())
                else:
                    query = query.order_by(Competition.name.asc())

    # Apply pagination
    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)

    result = db.execute(query)
    competitions = result.scalars().all()

    return [CompetitionResponse.from_orm(comp) for comp in competitions]


@competition_router.post("/", response_model=list[CompetitionResponse], status_code=201)
async def insert_many(
    competitions: list[CompetitionCreate],
    db: Session = Depends(get_transaction_session),
):
    """Insert many competitions"""
    db_competitions = []

    for comp_data in competitions:
        db_competition = Competition(**comp_data.dict(exclude_none=True))
        db.add(db_competition)
        db_competitions.append(db_competition)

    db.commit()

    # Refresh to get generated IDs
    for comp in db_competitions:
        db.refresh(comp)

    return [CompetitionResponse.from_orm(comp) for comp in db_competitions]


@competition_router.patch("/{id}", response_model=CompetitionResponse)
async def partial_update_one_by_primary_key(
    id: UUID,
    name: str,  # Based on the OpenAPI spec, this is just a string, not an object
    db: Session = Depends(get_transaction_session),
    # Query parameters from the OpenAPI spec
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
):
    """Partial update one competition by primary key"""
    query = select(Competition).where(Competition.id == id)

    # Apply additional filters if provided
    if name____str:
        query = query.where(Competition.name.in_(name____str))
    if name____list:
        query = query.where(Competition.name.in_(name____list))

    result = db.execute(query)
    db_competition = result.scalar_one_or_none()

    if not db_competition:
        raise HTTPException(status_code=404, detail="Competition not found")

    # Update the name
    db_competition.name = name

    db.commit()
    db.refresh(db_competition)
    return CompetitionResponse.from_orm(db_competition)


@competition_router.get("/{competition__pk__id}/event", response_model=list[dict])
async def get_many_by_pk_from_event(
    competition__pk__id: UUID,
    db: Session = Depends(get_transaction_session),
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    join_foreign_table: Optional[list[str]] = Query(None),
):
    """Get many events by competition primary key"""
    query = select(Event).where(Event.competition_id == competition__pk__id)

    # Apply filters
    if id____list:
        query = query.where(Event.id.in_(id____list))
    if name____str:
        query = query.where(Event.name.in_(name____str))
    if name____list:
        query = query.where(Event.name.in_(name____list))

    # Apply joins if requested
    if join_foreign_table:
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Event.competition))
        if "phase" in join_foreign_table:
            query = query.options(selectinload(Event.phases))

    result = db.execute(query)
    events = result.scalars().all()

    return [
        {
            "id": str(event.id),
            "competition_id": str(event.competition_id),
            "name": event.name
        }
        for event in events
    ]
