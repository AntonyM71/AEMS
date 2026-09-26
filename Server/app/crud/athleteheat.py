from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import delete, select, text, update
from sqlalchemy.orm import Session

from app.crud.schemas import AthleteHeatCreate, AthleteHeatResponse, AthleteHeatUpdate
from db.client import get_transaction_session
from db.models import AthleteHeat, Phase, RunStatus, ScoredBonuses, ScoredMoves

athleteheat_router = APIRouter(prefix="/athleteheat", tags=["athleteheat"])


def move_preserves_scores(
    source_scoresheet: UUID, destination_scoresheet: UUID, destination_is_occupied: bool  # noqa: FBT001
) -> bool:
    """A move keeps its scores only when the destination scores against the same
    scoresheet and holds no scores of its own for this athlete yet."""
    return source_scoresheet == destination_scoresheet and not destination_is_occupied


def _lock_destination(
    db: Session, heat_id: UUID, phase_id: UUID, athlete_id: UUID
) -> None:
    """Serialise concurrent moves into the same destination.

    An ordinary row lock can't do this: the dangerous case is exactly the one
    where the destination has no rows yet to lock. The advisory lock is
    transaction-scoped and releases automatically at commit or rollback.
    """
    key = f"{heat_id}:{phase_id}:{athlete_id}"
    db.execute(
        text("SELECT pg_advisory_xact_lock(hashtextextended(:key, 0))"), {"key": key}
    )


def _destination_is_occupied(
    db: Session, heat_id: UUID, phase_id: UUID, athlete_id: UUID
) -> bool:
    has_moves = db.execute(
        select(ScoredMoves.id)
        .where(ScoredMoves.heat_id == heat_id)
        .where(ScoredMoves.phase_id == phase_id)
        .where(ScoredMoves.athlete_id == athlete_id)
        .limit(1)
    ).first()
    if has_moves is not None:
        return True

    has_run_status = db.execute(
        select(RunStatus.id)
        .where(RunStatus.heat_id == heat_id)
        .where(RunStatus.phase_id == phase_id)
        .where(RunStatus.athlete_id == athlete_id)
        .limit(1)
    ).first()
    return has_run_status is not None


def _move_athlete_scores(
    db: Session,
    athlete_id: UUID,
    source_heat_id: UUID,
    source_phase_id: UUID,
    destination_heat_id: UUID,
    destination_phase_id: UUID,
) -> bool:
    """Re-point or delete an athlete's scores as part of a heat/phase move.

    Returns whether the scores were preserved.
    """
    _lock_destination(db, destination_heat_id, destination_phase_id, athlete_id)

    source_phase = db.query(Phase).filter(Phase.id == source_phase_id).one()
    destination_phase = db.query(Phase).filter(Phase.id == destination_phase_id).one()
    destination_occupied = _destination_is_occupied(
        db, destination_heat_id, destination_phase_id, athlete_id
    )
    preserve = move_preserves_scores(
        source_phase.scoresheet, destination_phase.scoresheet, destination_occupied
    )

    source_moves = (
        select(ScoredMoves.id)
        .where(ScoredMoves.heat_id == source_heat_id)
        .where(ScoredMoves.phase_id == source_phase_id)
        .where(ScoredMoves.athlete_id == athlete_id)
    )

    if preserve:
        db.execute(
            update(ScoredMoves)
            .where(ScoredMoves.id.in_(source_moves))
            .values(heat_id=destination_heat_id, phase_id=destination_phase_id)
        )
        db.execute(
            update(RunStatus)
            .where(RunStatus.heat_id == source_heat_id)
            .where(RunStatus.phase_id == source_phase_id)
            .where(RunStatus.athlete_id == athlete_id)
            .values(heat_id=destination_heat_id, phase_id=destination_phase_id)
        )
    else:
        db.execute(
            delete(ScoredBonuses).where(ScoredBonuses.move_id.in_(source_moves))
        )
        db.execute(
            delete(RunStatus)
            .where(RunStatus.heat_id == source_heat_id)
            .where(RunStatus.phase_id == source_phase_id)
            .where(RunStatus.athlete_id == athlete_id)
        )
        db.execute(delete(ScoredMoves).where(ScoredMoves.id.in_(source_moves)))

    return preserve


@athleteheat_router.post("/", status_code=201)
def insert_many(
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
        AthleteHeatResponse.model_validate(athlete_heat)
        for athlete_heat in db_athlete_heats
    ]


@athleteheat_router.patch("/{id}")
def partial_update_one_by_primary_key(
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

    source_heat_id = db_athlete_heat.heat_id
    source_phase_id = db_athlete_heat.phase_id
    athlete_id = db_athlete_heat.athlete_id

    # Update only provided fields
    update_data = athlete_heat_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_athlete_heat, field, value)

    destination_heat_id = db_athlete_heat.heat_id
    destination_phase_id = db_athlete_heat.phase_id

    scores_preserved = None
    if (source_heat_id, source_phase_id) != (destination_heat_id, destination_phase_id):
        scores_preserved = _move_athlete_scores(
            db,
            athlete_id=athlete_id,
            source_heat_id=source_heat_id,
            source_phase_id=source_phase_id,
            destination_heat_id=destination_heat_id,
            destination_phase_id=destination_phase_id,
        )

    db.commit()
    db.refresh(db_athlete_heat)
    return AthleteHeatResponse(
        id=db_athlete_heat.id,
        athlete_id=db_athlete_heat.athlete_id,
        heat_id=db_athlete_heat.heat_id,
        phase_id=db_athlete_heat.phase_id,
        scores_preserved=scores_preserved,
    )
