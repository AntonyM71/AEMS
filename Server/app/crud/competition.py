from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import Select, select
from sqlalchemy.orm import Session, selectinload

from app.crud.query_helpers import apply_in_filters, apply_ordering
from app.crud.schemas import (
    CompetitionCreate,
    CompetitionNested,
    CompetitionResponse,
    CompetitionUpdate,
    EventResponse,
    PhaseNested,
)
from db.client import get_transaction_session
from db.models import Competition, Event

competition_router = APIRouter(prefix="/competition", tags=["competition"])


def _apply_event_joins(
    query: Select[tuple[Event]], join_foreign_table: list[str] | None
) -> Select[tuple[Event]]:
    if join_foreign_table:
        if "competition" in join_foreign_table:
            query = query.options(selectinload(Event.competition))
        if "phase" in join_foreign_table:
            query = query.options(selectinload(Event.phases))
    return query


def _build_event_response(
    event: Event, join_foreign_table: list[str] | None
) -> EventResponse:
    response_data: dict[str, Any] = {
        "id": event.id,
        "competition_id": event.competition_id,
        "name": event.name,
    }
    if join_foreign_table:
        if "competition" in join_foreign_table:
            response_data["competition_foreign"] = (
                [CompetitionNested.model_validate(event.competition)]
                if event.competition
                else []
            )
        if "phase" in join_foreign_table:
            response_data["phase_foreign"] = (
                [
                    PhaseNested.model_validate(phase)
                    for phase in getattr(event, "phases", [])
                ]
                if hasattr(event, "phases")
                else []
            )
    return EventResponse(**response_data)


@competition_router.get("/")
async def get_many(
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    limit: int | None = Query(None),
    offset: int | None = Query(None),
    order_by_columns: list[str] | None = Query(None),
    join_foreign_table: list[str] | None = Query(None),
) -> list[CompetitionResponse]:
    """Get many competitions"""
    query = select(Competition)

    query = apply_in_filters(
        query,
        [
            (Competition.id, id____list),
            (Competition.name, name____str),
            (Competition.name, name____list),
        ],
    )

    if join_foreign_table and "event" in join_foreign_table:
        query = query.options(selectinload(Competition.events))

    query = apply_ordering(query, order_by_columns, {"name": Competition.name})

    # This endpoint treats a zero offset/limit as "unset" (unlike the others).
    if offset:
        query = query.offset(offset)
    if limit:
        query = query.limit(limit)

    result = db.execute(query)
    competitions = result.scalars().all()

    return [CompetitionResponse.model_validate(comp) for comp in competitions]


@competition_router.post("/", status_code=201)
async def insert_many(
    competitions: list[CompetitionCreate],
    db: Session = Depends(get_transaction_session),
) -> list[CompetitionResponse]:
    """Insert many competitions"""
    db_competitions = []

    for comp_data in competitions:
        db_competition = Competition(**comp_data.model_dump(exclude_none=True))
        db.add(db_competition)
        db_competitions.append(db_competition)

    db.commit()

    # Refresh to get generated IDs
    for comp in db_competitions:
        db.refresh(comp)

    return [CompetitionResponse.model_validate(comp) for comp in db_competitions]


@competition_router.patch("/{id}")
async def partial_update_one_by_primary_key(
    id: UUID,
    competition_update: CompetitionUpdate,
    db: Session = Depends(get_transaction_session),
    # Query parameters from the OpenAPI spec
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
) -> CompetitionResponse:
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

    # Update the competition with provided fields
    if competition_update.name is not None:
        db_competition.name = competition_update.name

    db.commit()
    db.refresh(db_competition)
    return CompetitionResponse.model_validate(db_competition)


@competition_router.get("/{competition__pk__id}/event")
async def get_many_by_pk_from_event(
    competition__pk__id: UUID,
    db: Session = Depends(get_transaction_session),
    id____list: list[UUID] | None = Query(None, alias="id____list"),
    name____str: list[str] | None = Query(None, alias="name____str"),
    name____list: list[str] | None = Query(None, alias="name____list"),
    join_foreign_table: list[str] | None = Query(None),
) -> list[EventResponse]:
    """Get many events by competition primary key"""
    query = select(Event).where(Event.competition_id == competition__pk__id)

    query = apply_in_filters(
        query,
        [
            (Event.id, id____list),
            (Event.name, name____str),
            (Event.name, name____list),
        ],
    )
    query = _apply_event_joins(query, join_foreign_table)

    result = db.execute(query)
    events = result.scalars().all()

    return [_build_event_response(event, join_foreign_table) for event in events]
