from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from db.client import get_transaction_session
from db.models import Phase


class PhaseCreate(BaseModel):
    id: Optional[UUID] = None
    event_id: UUID
    name: str
    number_of_runs: int = 3
    number_of_runs_for_score: int = 2
    number_of_judges: int = 3
    scoresheet: UUID


class PhaseResponse(BaseModel):
    id: UUID
    event_id: UUID
    name: str
    number_of_runs: int
    number_of_runs_for_score: int
    number_of_judges: int
    scoresheet: UUID

    class Config:
        orm_mode = True


class PhaseUpdate(BaseModel):
    event_id: Optional[UUID] = None
    name: Optional[str] = None
    number_of_runs: Optional[int] = None
    number_of_runs_for_score: Optional[int] = None
    number_of_judges: Optional[int] = None
    scoresheet: Optional[UUID] = None


phase_router = APIRouter(prefix="/phase", tags=["phase"])


@phase_router.get("/{id}", response_model=PhaseResponse)
async def get_one_by_primary_key(
    id: UUID,
    db: Session = Depends(get_transaction_session),
    event_id____list: Optional[list[UUID]] = Query(None, alias="event_id____list"),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    number_of_runs____from: Optional[int] = Query(None, alias="number_of_runs____from"),
    number_of_runs____to: Optional[int] = Query(None, alias="number_of_runs____to"),
    number_of_runs____list: Optional[list[int]] = Query(
        None, alias="number_of_runs____list"
    ),
    number_of_runs_for_score____from: Optional[int] = Query(
        None, alias="number_of_runs_for_score____from"
    ),
    number_of_runs_for_score____to: Optional[int] = Query(
        None, alias="number_of_runs_for_score____to"
    ),
    number_of_runs_for_score____list: Optional[list[int]] = Query(
        None, alias="number_of_runs_for_score____list"
    ),
    number_of_judges____from: Optional[int] = Query(
        None, alias="number_of_judges____from"
    ),
    number_of_judges____to: Optional[int] = Query(None, alias="number_of_judges____to"),
    number_of_judges____list: Optional[list[int]] = Query(
        None, alias="number_of_judges____list"
    ),
    scoresheet____list: Optional[list[UUID]] = Query(None, alias="scoresheet____list"),
    join_foreign_table: Optional[list[str]] = Query(None),
):
    """Get one phase by primary key"""
    query = select(Phase).where(Phase.id == id)

    # Apply additional filters if provided
    if event_id____list:
        query = query.where(Phase.event_id.in_(event_id____list))
    if name____str:
        query = query.where(Phase.name.in_(name____str))
    if name____list:
        query = query.where(Phase.name.in_(name____list))
    if number_of_runs____from is not None:
        query = query.where(Phase.number_of_runs >= number_of_runs____from)
    if number_of_runs____to is not None:
        query = query.where(Phase.number_of_runs <= number_of_runs____to)
    if number_of_runs____list:
        query = query.where(Phase.number_of_runs.in_(number_of_runs____list))
    if number_of_runs_for_score____from is not None:
        query = query.where(
            Phase.number_of_runs_for_score >= number_of_runs_for_score____from
        )
    if number_of_runs_for_score____to is not None:
        query = query.where(
            Phase.number_of_runs_for_score <= number_of_runs_for_score____to
        )
    if number_of_runs_for_score____list:
        query = query.where(
            Phase.number_of_runs_for_score.in_(number_of_runs_for_score____list)
        )
    if number_of_judges____from is not None:
        query = query.where(Phase.number_of_judges >= number_of_judges____from)
    if number_of_judges____to is not None:
        query = query.where(Phase.number_of_judges <= number_of_judges____to)
    if number_of_judges____list:
        query = query.where(Phase.number_of_judges.in_(number_of_judges____list))
    if scoresheet____list:
        query = query.where(Phase.scoresheet.in_(scoresheet____list))

    # Apply joins if requested
    if join_foreign_table:
        if "event" in join_foreign_table:
            query = query.options(selectinload(Phase.event))
        if "athleteheat" in join_foreign_table:
            query = query.options(selectinload(Phase.athletes))

    result = db.execute(query)
    phase = result.scalar_one_or_none()

    if not phase:
        raise HTTPException(status_code=404, detail="Phase not found")

    return PhaseResponse.from_orm(phase)


@phase_router.patch("/{id}", response_model=PhaseResponse)
async def partial_update_one_by_primary_key(
    id: UUID,
    phase_update: PhaseUpdate,
    db: Session = Depends(get_transaction_session),
    event_id____list: Optional[list[UUID]] = Query(None, alias="event_id____list"),
    name____str: Optional[list[str]] = Query(None, alias="name____str"),
    name____list: Optional[list[str]] = Query(None, alias="name____list"),
    number_of_runs____from: Optional[int] = Query(None, alias="number_of_runs____from"),
    number_of_runs____to: Optional[int] = Query(None, alias="number_of_runs____to"),
    number_of_runs____list: Optional[list[int]] = Query(
        None, alias="number_of_runs____list"
    ),
    number_of_runs_for_score____from: Optional[int] = Query(
        None, alias="number_of_runs_for_score____from"
    ),
    number_of_runs_for_score____to: Optional[int] = Query(
        None, alias="number_of_runs_for_score____to"
    ),
    number_of_runs_for_score____list: Optional[list[int]] = Query(
        None, alias="number_of_runs_for_score____list"
    ),
    number_of_judges____from: Optional[int] = Query(
        None, alias="number_of_judges____from"
    ),
    number_of_judges____to: Optional[int] = Query(None, alias="number_of_judges____to"),
    number_of_judges____list: Optional[list[int]] = Query(
        None, alias="number_of_judges____list"
    ),
    scoresheet____list: Optional[list[UUID]] = Query(None, alias="scoresheet____list"),
):
    """Partial update one phase by primary key"""
    query = select(Phase).where(Phase.id == id)

    # Apply additional filters if provided
    if event_id____list:
        query = query.where(Phase.event_id.in_(event_id____list))
    if name____str:
        query = query.where(Phase.name.in_(name____str))
    if name____list:
        query = query.where(Phase.name.in_(name____list))
    if number_of_runs____from is not None:
        query = query.where(Phase.number_of_runs >= number_of_runs____from)
    if number_of_runs____to is not None:
        query = query.where(Phase.number_of_runs <= number_of_runs____to)
    if number_of_runs____list:
        query = query.where(Phase.number_of_runs.in_(number_of_runs____list))
    if number_of_runs_for_score____from is not None:
        query = query.where(
            Phase.number_of_runs_for_score >= number_of_runs_for_score____from
        )
    if number_of_runs_for_score____to is not None:
        query = query.where(
            Phase.number_of_runs_for_score <= number_of_runs_for_score____to
        )
    if number_of_runs_for_score____list:
        query = query.where(
            Phase.number_of_runs_for_score.in_(number_of_runs_for_score____list)
        )
    if number_of_judges____from is not None:
        query = query.where(Phase.number_of_judges >= number_of_judges____from)
    if number_of_judges____to is not None:
        query = query.where(Phase.number_of_judges <= number_of_judges____to)
    if number_of_judges____list:
        query = query.where(Phase.number_of_judges.in_(number_of_judges____list))
    if scoresheet____list:
        query = query.where(Phase.scoresheet.in_(scoresheet____list))

    result = db.execute(query)
    phase = result.scalar_one_or_none()

    if not phase:
        raise HTTPException(status_code=404, detail="Phase not found")

    # Update only provided fields
    update_data = phase_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(phase, field, value)

    db.commit()
    db.refresh(phase)
    return PhaseResponse.from_orm(phase)


@phase_router.post("/", response_model=list[PhaseResponse], status_code=201)
async def insert_many(
    phases: list[PhaseCreate],
    db: Session = Depends(get_transaction_session),
):
    """Insert many phases"""
    db_phases = []

    for phase_data in phases:
        db_phase = Phase(**phase_data.dict(exclude_none=True))
        db.add(db_phase)
        db_phases.append(db_phase)

    db.commit()

    # Refresh to get generated IDs
    for phase in db_phases:
        db.refresh(phase)

    return [PhaseResponse.from_orm(phase) for phase in db_phases]
