from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import Select, select
from sqlalchemy.orm import Session, selectinload

from app.crud.query_helpers import (
    apply_in_filters,
    apply_ordering,
    apply_pagination,
    apply_range_filters,
)
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

_EVENT_SORTABLE = {"name": Event.name, "competition_id": Event.competition_id}


def _apply_event_joins(
    query: Select[tuple[Event]], join_foreign_table: list[str] | None
) -> Select[tuple[Event]]:
    if join_foreign_table:
        if "phase" in join_foreign_table:
            query = query.options(selectinload(Event.phases))
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Event.competition))
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


@event_router.get("/")
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    competition_id____list: list[UUID] | None = Query(
        None, alias="competition_id____list"
    ),
    name____list: list[str] | None = Query(None, alias="name____list"),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
    join_foreign_table: list[str] | None = Query(None),
) -> list[EventResponse]:
    """Get many events"""
    query = select(Event)
    query = _apply_event_joins(query, join_foreign_table)
    query = apply_in_filters(
        query,
        [
            (Event.id, id____list),
            (Event.competition_id, competition_id____list),
            (Event.name, name____list),
        ],
    )
    query = apply_ordering(query, order_by_columns, _EVENT_SORTABLE)
    query = apply_pagination(query, limit, offset)

    result = db.execute(query)
    events = result.scalars().all()

    return [
        EventResponse(**_build_event_dict(event, join_foreign_table))
        for event in events
    ]


@event_router.get("/{id}")
async def get_one_by_primary_key(
    id: UUID,
    db: Session = Depends(get_transaction_session),
    join_foreign_table: list[str] | None = Query(None, alias="join_foreign_table"),
) -> EventResponse:
    """Get one event by id, optionally joining foreign tables"""
    query = select(Event).where(Event.id == id)
    query = _apply_event_joins(query, join_foreign_table)

    result = db.execute(query)
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    return EventResponse(**_build_event_dict(event, join_foreign_table))


@event_router.post("/", status_code=201)
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


@event_router.get("/{event_pk_id}/phase")
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

    if join_foreign_table and "event" in join_foreign_table:
        query = query.options(selectinload(Phase.event))

    if name____str:
        query = query.where(Phase.name == name____str)

    query = apply_in_filters(
        query,
        [
            (Phase.id, id____list),
            (Phase.name, name____list),
            (Phase.number_of_runs, number_of_runs____list),
            (Phase.number_of_runs_for_score, number_of_runs_for_score____list),
            (Phase.number_of_judges, number_of_judges____list),
            (Phase.scoresheet, scoresheet____list),
        ],
    )
    query = apply_range_filters(
        query,
        [
            (Phase.number_of_runs, number_of_runs____from, number_of_runs____to),
            (
                Phase.number_of_runs_for_score,
                number_of_runs_for_score____from,
                number_of_runs_for_score____to,
            ),
            (
                Phase.number_of_judges,
                number_of_judges____from,
                number_of_judges____to,
            ),
        ],
    )

    result = db.execute(query)
    phases = result.scalars().all()

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
