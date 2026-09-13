"""Canned phase data with realistic scored moves and bonuses.

Shared by scripts/bench_event_loop.py and the performance test suite
(Server/performance/) so both exercise the real scoring path instead of an
empty phase. Writes real rows via the given session — point this only at a
dev or CI database, never one with real competition data.
"""

import random
from dataclasses import dataclass
from uuid import UUID, uuid4

from sqlalchemy.orm import Session

from db.models import (
    Athlete,
    AthleteHeat,
    AvailableBonuses,
    AvailableMoves,
    Competition,
    Event,
    Heat,
    Phase,
    ScoredBonuses,
    ScoredMoves,
    ScoreSheet,
)

ATHLETE_COUNT = 20
MOVES_PER_ATHLETE = 30
BONUSES_PER_ATHLETE = (1, 3)
MOVE_NAMES = ["Cartwheel", "Loop", "Space Godzilla", "Blunt", "McNasty"]
BONUS_NAMES = ["Huge", "Clean", "Link"]
DIRECTIONS = ["L", "R", "F", "B", "S"]
JUDGE_IDS = ["bench-judge-1", "bench-judge-2", "bench-judge-3"]
NUMBER_OF_RUNS = 3
PHASE_NAME = "Bench Phase"
# Fixed, reserved id -- not a name -- so this can never mistake a real phase for
# ours (a real Phase.id is a random uuid4 and would essentially never collide).
BENCH_PHASE_ID = UUID("00000000-0000-4000-8000-0000000eb0c4")


@dataclass
class CannedPhase:
    phase_id: str
    heat_id: str
    athlete_ids: list[str]
    judge_ids: list[str]
    move_ids: list[str]
    bonus_ids: list[str]
    number_of_runs: int


def _existing_canned_phase(db: Session, phase: Phase) -> CannedPhase:
    athlete_heats = db.query(AthleteHeat).filter(AthleteHeat.phase_id == phase.id).all()
    available_moves = (
        db.query(AvailableMoves)
        .filter(AvailableMoves.sheet_id == phase.scoresheet)
        .all()
    )
    available_bonuses = (
        db.query(AvailableBonuses)
        .filter(AvailableBonuses.sheet_id == phase.scoresheet)
        .all()
    )
    return CannedPhase(
        phase_id=str(phase.id),
        heat_id=str(athlete_heats[0].heat_id),
        athlete_ids=[str(ah.athlete_id) for ah in athlete_heats],
        judge_ids=JUDGE_IDS,
        move_ids=[str(m.id) for m in available_moves],
        bonus_ids=[str(b.id) for b in available_bonuses],
        number_of_runs=phase.number_of_runs,
    )


def ensure_canned_phase(db: Session) -> CannedPhase:
    """Reuse the bench phase a previous call created, or create one.

    Matches on the fixed BENCH_PHASE_ID rather than Phase.name or "any
    existing phase" — a name could coincidentally match a real phase in a
    dev/CI database, and reusing that would delete and overwrite its real
    scores. A pinned id can't coincidentally collide.
    """
    existing_phase = db.query(Phase).filter(Phase.id == BENCH_PHASE_ID).first()
    if existing_phase is not None:
        return _existing_canned_phase(db, existing_phase)

    competition = Competition(id=uuid4(), name="Bench Competition")
    event = Event(id=uuid4(), competition_id=competition.id, name="Bench Event")
    scoresheet = ScoreSheet(id=uuid4(), name="Bench Scoresheet")
    phase = Phase(
        id=BENCH_PHASE_ID,
        event_id=event.id,
        name=PHASE_NAME,
        scoresheet=scoresheet.id,
        number_of_runs=NUMBER_OF_RUNS,
        number_of_runs_for_score=2,
        number_of_judges=len(JUDGE_IDS),
    )
    heat = Heat(id=uuid4(), competition_id=competition.id, name="Bench Heat")
    db.add_all([competition, event, scoresheet, phase, heat])
    db.flush()  # scoresheet must exist before available_moves/bonuses reference it

    available_moves = [
        AvailableMoves(
            id=uuid4(),
            sheet_id=scoresheet.id,
            name=name,
            fl_score=random.randint(10, 90),
            rb_score=random.randint(10, 90),
            direction="LR",
        )
        for name in MOVE_NAMES
    ]
    available_bonuses = [
        AvailableBonuses(
            id=uuid4(),
            sheet_id=scoresheet.id,
            move_id=available_moves[0].id,
            name=name,
            score=random.randint(1, 20),
        )
        for name in BONUS_NAMES
    ]
    db.add_all([*available_moves, *available_bonuses])
    db.flush()  # available_moves/bonuses must exist before scored_moves/bonuses reference them

    athlete_ids: list[str] = []
    for i in range(ATHLETE_COUNT):
        athlete = Athlete(
            id=uuid4(), first_name="Bench", last_name=f"Athlete {i}", bib=str(i)
        )
        db.add(athlete)
        db.flush()  # athlete must exist before athlete_heat/scored_moves reference it
        athlete_ids.append(str(athlete.id))
        db.add(
            AthleteHeat(
                id=uuid4(), heat_id=heat.id, athlete_id=athlete.id, phase_id=phase.id
            )
        )

        athlete_moves = [
            ScoredMoves(
                id=uuid4(),
                move_id=random.choice(available_moves).id,
                heat_id=heat.id,
                run_number=random.randint(0, NUMBER_OF_RUNS - 1),
                phase_id=phase.id,
                judge_id=random.choice(JUDGE_IDS),
                athlete_id=athlete.id,
                direction=random.choice(DIRECTIONS),
            )
            for _ in range(MOVES_PER_ATHLETE)
        ]
        db.add_all(athlete_moves)
        db.flush()  # scored_moves must exist before scored_bonuses reference them

        bonus_count = random.randint(*BONUSES_PER_ATHLETE)
        for move in random.sample(athlete_moves, k=bonus_count):
            db.add(
                ScoredBonuses(
                    id=uuid4(),
                    bonus_id=random.choice(available_bonuses).id,
                    move_id=move.id,
                    judge_id=move.judge_id,
                )
            )

    db.commit()
    return CannedPhase(
        phase_id=str(phase.id),
        heat_id=str(heat.id),
        athlete_ids=athlete_ids,
        judge_ids=JUDGE_IDS,
        move_ids=[str(m.id) for m in available_moves],
        bonus_ids=[str(b.id) for b in available_bonuses],
        number_of_runs=NUMBER_OF_RUNS,
    )
