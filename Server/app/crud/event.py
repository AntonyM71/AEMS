from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import ColumnElement, select
from sqlalchemy.orm import Session, selectinload
from sqlalchemy.sql import Select

from app.crud.schemas import (
    CompetitionNested,
    EventCreateRequest,
    EventResponse,
    PhaseNested,
    PhaseResponse,
)
from db.client import get_transaction_session
from db.models import Event, Phase

event_router = APIRouter(prefix="/event", tags=["event"])


def _apply_string_filter(
    query: Select[Any],
    column: ColumnElement[Any],
    value____list: list[str] | None,
    value____str: str | None,
    value____str_____matching_pattern: str | None,
) -> Select[Any]:
    """Apply a string list/exact/pattern filter shared across event queries."""
    if value____list:
        query = query.where(column.in_(value____list))

    if value____str:
        if value____str_____matching_pattern == "case_insensitive":
            query = query.where(column.ilike(f"%{value____str}%"))
        elif value____str_____matching_pattern == "case_sensitive":
            query = query.where(column.like(f"%{value____str}%"))
        else:
            query = query.where(column == value____str)

    return query


def _apply_event_ordering(
    query: Select[Any], order_by_columns: list[str] | None
) -> Select[Any]:
    """Apply ordering for Event queries by name or competition_id."""
    if not order_by_columns:
        return query

    for order_col in order_by_columns:
        order_col_lower = order_col.lower()
        if "name" in order_col_lower:
            column = Event.name
        elif "competition_id" in order_col_lower:
            column = Event.competition_id
        else:
            continue

        query = query.order_by(
            column.desc() if "desc" in order_col_lower else column.asc()
        )

    return query


def _apply_pagination(
    query: Select[Any], offset: int | None, limit: int | None
) -> Select[Any]:
    """Apply offset/limit pagination to a query."""
    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)
    return query


def _build_event_dict(
    event: Event, join_foreign_table: list[str] | None
) -> dict[str, Any]:
    """Build the response dict for an Event, including requested foreign keys."""
    event_dict: dict[str, Any] = {
        "id": event.id,
        "competition_id": event.competition_id,
        "name": event.name,
    }

    if join_foreign_table:
        if "competition" in join_foreign_table and event.competition:
            event_dict["competition_foreign"] = [
                CompetitionNested.model_validate(event.competition)
            ]
        if "phase" in join_foreign_table and event.phases:
            event_dict["phase_foreign"] = [
                PhaseNested.model_validate(p) for p in event.phases
            ]

    return event_dict


def _apply_range_and_list_filter(
    query: Select[Any],
    column: ColumnElement[Any],
    value____from: int | None,
    value____to: int | None,
    value____list: list[int] | None,
) -> Select[Any]:
    """Apply from/to/list numeric filters shared across phase queries."""
    if value____from is not None:
        query = query.where(column >= value____from)

    if value____to is not None:
        query = query.where(column <= value____to)

    if value____list:
        query = query.where(column.in_(value____list))

    return query


@event_router.get("/", response_model=list[EventResponse])
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    id____list_____comparison_operator: str | None = Query(
        None, alias="id____list_____comparison_operator"
    ),
    competition_id____list: list[UUID] | None = Query(
        None, alias="competition_id____list"
    ),
    competition_id____list_____comparison_operator: str | None = Query(
        None, alias="competition_id____list_____comparison_operator"
    ),
    name____list: list[str] | None = Query(None, alias="name____list"),
    name____list_____comparison_operator: str | None = Query(
        None, alias="name____list_____comparison_operator"
    ),
    name____str: str | None = Query(None, alias="name____str"),
    name____str_____matching_pattern: str | None = Query(
        None, alias="name____str_____matching_pattern"
    ),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
    join_foreign_table: list[str] | None = Query(None),
) -> list[EventResponse]:
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

    query = _apply_string_filter(
        query, Event.name, name____list, name____str, name____str_____matching_pattern
    )

    query = _apply_event_ordering(query, order_by_columns)
    query = _apply_pagination(query, offset, limit)

    result = db.execute(query)
    events = result.scalars().all()

    # Convert to response format with _foreign suffix
    response_data = [
        EventResponse(**_build_event_dict(event, join_foreign_table))
        for event in events
    ]

    return response_data


@event_router.get("/{id}", response_model=EventResponse)
async def get_one_by_primary_key(
    id: UUID,
    db: Session = Depends(get_transaction_session),
    competition_id____list: list[UUID] | None = Query(
        None, alias="competition_id____list"
    ),
    name____str: str | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    join_foreign_table: list[str] | None = Query(None, alias="join_foreign_table"),
) -> EventResponse:
    """Get one event by id with optional filtering and foreign keys"""
    query = select(Event).where(Event.id == id)

    # Apply joins if requested
    if join_foreign_table:
        if "phase" in join_foreign_table:
            query = query.options(selectinload(Event.phases))
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Event.competition))

    # Apply additional filters if provided
    if competition_id____list:
        query = query.where(Event.competition_id.in_(competition_id____list))

    if name____list:
        query = query.where(Event.name.in_(name____list))

    if name____str:
        query = query.where(Event.name == name____str)

    result = db.execute(query)
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    return EventResponse(**_build_event_dict(event, join_foreign_table))


@event_router.get("/get_many_with_foreign_tree/", response_model=list[EventResponse])
async def get_many_with_foreign_tree(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    id____list_____comparison_operator: str | None = Query(
        None, alias="id____list_____comparison_operator"
    ),
    competition_id____list: list[UUID] | None = Query(
        None, alias="competition_id____list"
    ),
    competition_id____list_____comparison_operator: str | None = Query(
        None, alias="competition_id____list_____comparison_operator"
    ),
    name____list: list[str] | None = Query(None, alias="name____list"),
    name____list_____comparison_operator: str | None = Query(
        None, alias="name____list_____comparison_operator"
    ),
    name____str: str | None = Query(None, alias="name____str"),
    name____str_____matching_pattern: str | None = Query(
        None, alias="name____str_____matching_pattern"
    ),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
) -> list[EventResponse]:
    """Get many events with competition foreign key"""
    query = select(Event).options(selectinload(Event.competition))

    # Apply filters
    if id____list:
        query = query.where(Event.id.in_(id____list))

    if competition_id____list:
        query = query.where(Event.competition_id.in_(competition_id____list))

    query = _apply_string_filter(
        query, Event.name, name____list, name____str, name____str_____matching_pattern
    )

    query = _apply_event_ordering(query, order_by_columns)
    query = _apply_pagination(query, offset, limit)

    result = db.execute(query)
    events = result.scalars().all()

    # Convert to response format with competition_foreign as list
    response_data = [
        EventResponse(**_build_event_dict(event, ["competition"])) for event in events
    ]

    return response_data


@event_router.post("/", response_model=list[EventResponse], status_code=201)
async def insert_many(
    events: list[EventCreateRequest],
    db: Session = Depends(get_transaction_session),
) -> list[EventResponse]:
    """Insert many events"""
    db_events = []

    for event_data in events:
        db_event = Event(**event_data.model_dump(exclude_none=True))
        db.add(db_event)
        db_events.append(db_event)

    db.commit()

    # Refresh to get generated IDs
    for event in db_events:
        db.refresh(event)

    return [EventResponse.model_validate(event) for event in db_events]


@event_router.get("/{event_pk_id}/phase", response_model=list[PhaseResponse])
async def get_many_by_pk_from_phase(
    event_pk_id: UUID,
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    name____str: str | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    number_of_runs____from: int | None = Query(None, alias="number_of_runs____from"),
    number_of_runs____to: int | None = Query(None, alias="number_of_runs____to"),
    number_of_runs____list: list[int] | None = Query(
        None, alias="number_of_runs____list"
    ),
    number_of_runs_for_score____from: int | None = Query(
        None, alias="number_of_runs_for_score____from"
    ),
    number_of_runs_for_score____to: int | None = Query(
        None, alias="number_of_runs_for_score____to"
    ),
    number_of_runs_for_score____list: list[int] | None = Query(
        None, alias="number_of_runs_for_score____list"
    ),
    number_of_judges____from: int | None = Query(
        None, alias="number_of_judges____from"
    ),
    number_of_judges____to: int | None = Query(None, alias="number_of_judges____to"),
    number_of_judges____list: list[int] | None = Query(
        None, alias="number_of_judges____list"
    ),
    scoresheet____list: list[UUID] | None = Query(None, alias="scoresheet____list"),
    join_foreign_table: list[str] | None = Query(None, alias="join_foreign_table"),
) -> list[PhaseResponse]:
    """Get all phases for a specific event"""
    query = select(Phase).where(Phase.event_id == event_pk_id)

    # Apply joins if requested
    if join_foreign_table:
        if "event" in join_foreign_table:
            query = query.options(selectinload(Phase.event))

    # Apply additional filters
    if id____list:
        query = query.where(Phase.id.in_(id____list))

    if name____str:
        query = query.where(Phase.name == name____str)

    if name____list:
        query = query.where(Phase.name.in_(name____list))

    query = _apply_range_and_list_filter(
        query,
        Phase.number_of_runs,
        number_of_runs____from,
        number_of_runs____to,
        number_of_runs____list,
    )

    query = _apply_range_and_list_filter(
        query,
        Phase.number_of_runs_for_score,
        number_of_runs_for_score____from,
        number_of_runs_for_score____to,
        number_of_runs_for_score____list,
    )

    query = _apply_range_and_list_filter(
        query,
        Phase.number_of_judges,
        number_of_judges____from,
        number_of_judges____to,
        number_of_judges____list,
    )

    if scoresheet____list:
        query = query.where(Phase.scoresheet.in_(scoresheet____list))

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

        response_data.append(PhaseResponse(**phase_dict))

    return response_data
