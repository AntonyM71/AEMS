import os
from collections.abc import Generator
from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

# app.config.Settings is now constructed eagerly when db.client is imported
# below, so these must be set first. setdefault lets a real value still win.
os.environ.setdefault("REDIS_URL", "memory")
os.environ.setdefault("CONNECTION_STRING", "postgresql://test:test@localhost/test")

from db.client import get_transaction_session


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
