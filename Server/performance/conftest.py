import time
from collections.abc import Generator
from itertools import count
from uuid import UUID

import pytest
from sqlalchemy.orm import Session

from db.canned_data import CannedPhase, ensure_canned_phase
from db.client import transaction_session_context_manager
from db.models import ScoreSheet

_uuid7_counter = count()


def next_uuid7() -> str:
    ts_hex = f"{int(time.time() * 1000):012x}"
    tail_hex = f"{next(_uuid7_counter):018x}"[-18:]

    return str(
        UUID(f"{ts_hex[:8]}-{ts_hex[8:]}-7{tail_hex[:3]}-a{tail_hex[3:6]}-{tail_hex[6:]}")
    )


@pytest.fixture
def db_session() -> Generator[Session]:
    """A real database session — this suite never mocks db.client, unlike Server/app/*/tests/."""
    with transaction_session_context_manager() as db:
        yield db


@pytest.fixture
def canned_phase(db_session: Session) -> CannedPhase:
    return ensure_canned_phase(db_session)


@pytest.fixture
def existing_scoresheet_name(db_session: Session) -> str:
    """An already-seeded scoresheet name (from `python -m scripts.seed_scoresheets`)."""
    scoresheet = (
        db_session.query(ScoreSheet)
        .filter(ScoreSheet.name != "Bench Scoresheet")
        .first()
    )
    if scoresheet is None:
        msg = "No scoresheet seeded — run `python -m scripts.seed_scoresheets` first"
        raise RuntimeError(msg)
    return scoresheet.name
