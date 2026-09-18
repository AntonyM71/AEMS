import os
from collections.abc import Generator
from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.client import get_transaction_session

# socket_manager requires REDIS_URL; the unit suite runs with no services, so
# this names the sentinel explicitly. setdefault lets a real Redis still win.
os.environ.setdefault("REDIS_URL", "memory")


@pytest.fixture
def mock_db_session() -> MagicMock:
    """A mocked DB session pre-wired to report a healthy `SELECT 1`."""
    session = MagicMock(spec=Session)
    session.execute.return_value.scalar.return_value = 1
    return session


@pytest.fixture
def client(mock_db_session: MagicMock) -> Generator[TestClient]:
    from main import app  # deferred: needs REDIS_URL set above, first

    app.dependency_overrides[get_transaction_session] = lambda: mock_db_session
    yield TestClient(app)
    app.dependency_overrides.clear()
