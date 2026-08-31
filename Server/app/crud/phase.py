from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import Select, select
from sqlalchemy.orm import Session, selectinload

from app.crud.query_helpers import apply_in_filters, apply_range_filters
from app.crud.schemas import EventNested, PhaseCreate, PhaseResponse, PhaseUpdate
from db.client import get_transaction_session
from db.models import Phase

phase_router = APIRouter(prefix="/phase", tags=["phase"])


def _apply_phase_joins(
    query: Select[tuple[Phase]], join_foreign_table: list[str] | None
) -> Select[tuple[Phase]]:
    if join_foreign_table and "event" in join_foreign_table:
        query = query.options(selectinload(Phase.event))
    return query


def _build_phase_response(
    phase: Phase, join_foreign_table: list[str] | None
) -> PhaseResponse:
    phase_dict: dict[str, Any] = {
        "id": phase.id,
        "event_id": phase.event_id,
        "name": phase.name,
        "number_of_runs": phase.number_of_runs,
        "number_of_runs_for_score": phase.number_of_runs_for_score,
        "number_of_judges": phase.number_of_judges,
        "scoresheet": phase.scoresheet,
    }
    if join_foreign_table and "event" in join_foreign_table and phase.event:
        phase_dict["event_foreign"] = [EventNested.model_validate(phase.event)]
    return PhaseResponse(**phase_dict)


@phase_router.get("/{id}")
async def get_one_by_primary_key(
    id: UUID,
    db: Session = Depends(get_transaction_session),
    event_id____list: list[UUID] | None = Query(None, alias="event_id____list"),
    name____str: list[str] | None = Query(None, alias="name____str"),
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
) -> PhaseResponse:
    """Get one phase by primary key"""
    query = select(Phase).where(Phase.id == id)
    query = _apply_phase_joins(query, join_foreign_table)

    query = apply_in_filters(
        query,
        [
            (Phase.event_id, event_id____list),
            (Phase.name, name____str),
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
    phase = result.scalar_one_or_none()

    if not phase:
        raise HTTPException(status_code=404, detail="Phase not found")

    return _build_phase_response(phase, join_foreign_table)


@phase_router.patch("/{id}")
async def partial_update_one_by_primary_key(
    id: UUID,
    phase_update: PhaseUpdate,
    db: Session = Depends(get_transaction_session),
) -> PhaseResponse:
    """Partial update one phase by primary key"""
    query = select(Phase).where(Phase.id == id)

    result = db.execute(query)
    phase = result.scalar_one_or_none()

    if not phase:
        raise HTTPException(status_code=404, detail="Phase not found")

    # Update only provided fields
    update_data = phase_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(phase, field, value)

    db.commit()
    db.refresh(phase)
    return PhaseResponse.model_validate(phase)


@phase_router.post("/", status_code=201)
async def insert_many(
    phases: list[PhaseCreate],
    db: Session = Depends(get_transaction_session),
) -> list[PhaseResponse]:
    """Insert many phases"""
    db_phases = []

    for phase_data in phases:
        db_phase = Phase(**phase_data.model_dump(exclude_none=True))
        db.add(db_phase)
        db_phases.append(db_phase)

    db.commit()

    # Refresh to get generated IDs
    for phase in db_phases:
        db.refresh(phase)

    return [PhaseResponse.model_validate(phase) for phase in db_phases]
