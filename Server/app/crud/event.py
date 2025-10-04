from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from db.client import get_transaction_session
from db.models import Event, Phase


class CompetitionNested(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True


class PhaseNested(BaseModel):
    id: UUID
    event_id: UUID
    name: str
    number_of_runs: int
    number_of_runs_for_score: int
    number_of_judges: int
    scoresheet: UUID

    class Config:
        orm_mode = True


class EventResponse(BaseModel):
    id: UUID
    competition_id: UUID
    name: str
    competition_foreign: Optional[list[CompetitionNested]] = None
    phase_foreign: Optional[list[PhaseNested]] = None

    class Config:
        orm_mode = True


class EventCreateRequest(BaseModel):
    id: Optional[UUID] = None
    competition_id: UUID
    name: str


event_router = APIRouter(prefix="/event", tags=["event"])


@event_router.get("/", response_model=list[EventResponse])
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    id____list_____comparison_operator: Optional[str] = Query(
        None, alias="id____list_____comparison_operator"
    ),
    competition_id____list: Optional[list[UUID]] = Query(
        None, alias="competition_id____list"
    ),
    competition_id____list_____comparison_operator: Optional[str] = Query(
        None, alias="competition_id____list_____comparison_operator"
    ),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    name____list_____comparison_operator: Optional[str] = Query(
        None, alias="name____list_____comparison_operator"
    ),
    name____str: Optional[str] = Query(None, alias="name____str"),
    name____str_____matching_pattern: Optional[str] = Query(
        None, alias="name____str_____matching_pattern"
    ),
    limit: Optional[int] = Query(None),
    offset: Optional[int] = Query(None),
    order_by_columns: Optional[list[str]] = Query(None),
    join_foreign_table: Optional[list[str]] = Query(None),
):
    """Get many events"""
    query = select(Event)

    # Apply joins if requested
    if join_foreign_table:
        if "phase" in join_foreign_table:
            query = query.options(selectinload(Event.phases))
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Event.competition))

    # Apply filters
    if id____list:
        query = query.where(Event.id.in_(id____list))

    if competition_id____list:
        query = query.where(Event.competition_id.in_(competition_id____list))

    if name____list:
        query = query.where(Event.name.in_(name____list))

    if name____str:
        if name____str_____matching_pattern == "case_insensitive":
            query = query.where(Event.name.ilike(f"%{name____str}%"))
        elif name____str_____matching_pattern == "case_sensitive":
            query = query.where(Event.name.like(f"%{name____str}%"))
        else:
            query = query.where(Event.name == name____str)

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "name" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(Event.name.desc())
                else:
                    query = query.order_by(Event.name.asc())
            elif "competition_id" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(Event.competition_id.desc())
                else:
                    query = query.order_by(Event.competition_id.asc())

    # Apply pagination
    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)

    result = db.execute(query)
    events = result.scalars().all()

    # Convert to response format with _foreign suffix
    response_data = []
    for event in events:
        event_dict = {
            "id": event.id,
            "competition_id": event.competition_id,
            "name": event.name,
        }

        # Add foreign relationships as lists (matching autogen behavior)
        if join_foreign_table:
            if "competition" in join_foreign_table and event.competition:
                event_dict["competition_foreign"] = [
                    CompetitionNested.from_orm(event.competition)
                ]
            if "phase" in join_foreign_table and event.phases:
                event_dict["phase_foreign"] = [
                    PhaseNested.from_orm(p) for p in event.phases
                ]

        response_data.append(EventResponse(**event_dict))

    return response_data


@event_router.get("/{id}", response_model=EventResponse)
async def get_one(
    id: UUID,
    db: Session = Depends(get_transaction_session),
):
    """Get one event by id with phases"""
    query = select(Event).where(Event.id == id).options(selectinload(Event.phases))

    result = db.execute(query)
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    event_dict = {
        "id": event.id,
        "competition_id": event.competition_id,
        "name": event.name,
        "phase_foreign": [PhaseNested.from_orm(p) for p in event.phases]
        if event.phases
        else None,
    }

    return EventResponse(**event_dict)


@event_router.get("/get_many_with_foreign_tree", response_model=list[EventResponse])
async def get_many_with_foreign_tree(
    db: Session = Depends(get_transaction_session),
    id____list: Optional[list[UUID]] = Query(None, alias="id____list"),
    id____list_____comparison_operator: Optional[str] = Query(
        None, alias="id____list_____comparison_operator"
    ),
    competition_id____list: Optional[list[UUID]] = Query(
        None, alias="competition_id____list"
    ),
    competition_id____list_____comparison_operator: Optional[str] = Query(
        None, alias="competition_id____list_____comparison_operator"
    ),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    name____list_____comparison_operator: Optional[str] = Query(
        None, alias="name____list_____comparison_operator"
    ),
    name____str: Optional[str] = Query(None, alias="name____str"),
    name____str_____matching_pattern: Optional[str] = Query(
        None, alias="name____str_____matching_pattern"
    ),
    limit: Optional[int] = Query(None),
    offset: Optional[int] = Query(None),
    order_by_columns: Optional[list[str]] = Query(None),
):
    """Get many events with competition foreign key"""
    query = select(Event).options(selectinload(Event.competition))

    # Apply filters
    if id____list:
        query = query.where(Event.id.in_(id____list))

    if competition_id____list:
        query = query.where(Event.competition_id.in_(competition_id____list))

    if name____list:
        query = query.where(Event.name.in_(name____list))

    if name____str:
        if name____str_____matching_pattern == "case_insensitive":
            query = query.where(Event.name.ilike(f"%{name____str}%"))
        elif name____str_____matching_pattern == "case_sensitive":
            query = query.where(Event.name.like(f"%{name____str}%"))
        else:
            query = query.where(Event.name == name____str)

    # Apply ordering
    if order_by_columns:
        for order_col in order_by_columns:
            if "name" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(Event.name.desc())
                else:
                    query = query.order_by(Event.name.asc())
            elif "competition_id" in order_col.lower():
                if "desc" in order_col.lower():
                    query = query.order_by(Event.competition_id.desc())
                else:
                    query = query.order_by(Event.competition_id.asc())

    # Apply pagination
    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)

    result = db.execute(query)
    events = result.scalars().all()

    # Convert to response format with competition_foreign as list
    response_data = []
    for event in events:
        event_dict = {
            "id": event.id,
            "competition_id": event.competition_id,
            "name": event.name,
            "competition_foreign": [CompetitionNested.from_orm(event.competition)]
            if event.competition
            else None,
        }
        response_data.append(EventResponse(**event_dict))

    return response_data


@event_router.post("/", response_model=list[EventResponse], status_code=201)
async def insert_many(
    events: list[EventCreateRequest],
    db: Session = Depends(get_transaction_session),
):
    """Insert many events"""
    db_events = []

    for event_data in events:
        db_event = Event(**event_data.dict(exclude_none=True))
        db.add(db_event)
        db_events.append(db_event)

    db.commit()

    # Refresh to get generated IDs
    for event in db_events:
        db.refresh(event)

    return [EventResponse.from_orm(event) for event in db_events]


@event_router.get("/{id}/phase", response_model=list)
async def get_phases_by_event_id(
    id: UUID,
    db: Session = Depends(get_transaction_session),
    join_foreign_table: Optional[list[str]] = Query(None),
):
    """Get all phases for a specific event"""
    # Query phases by event_id
    query = select(Phase).where(Phase.event_id == id)

    # Apply joins if requested
    if join_foreign_table and "event" in join_foreign_table:
        query = query.options(selectinload(Phase.event))

    result = db.execute(query)
    phases = result.scalars().all()

    # Convert to response format
    response_data = []
    for phase in phases:
        phase_dict = {
            "id": phase.id,
            "event_id": phase.event_id,
            "name": phase.name,
            "number_of_runs": phase.number_of_runs,
            "number_of_runs_for_score": phase.number_of_runs_for_score,
            "number_of_judges": phase.number_of_judges,
            "scoresheet": phase.scoresheet,
        }

        # Add event foreign relationship if requested
        if join_foreign_table and "event" in join_foreign_table and phase.event:
            phase_dict["event_foreign"] = [
                {
                    "id": phase.event.id,
                    "competition_id": phase.event.competition_id,
                    "name": phase.event.name,
                }
            ]

        response_data.append(phase_dict)

    return response_data
