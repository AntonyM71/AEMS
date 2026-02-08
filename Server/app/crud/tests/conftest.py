"""
Fixtures for CRUD tests
"""
from collections.abc import Generator
from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.client import get_transaction_session


@pytest.fixture
def mock_db_session() -> MagicMock:
    """Create a mock database session"""
    return MagicMock(spec=Session)


@pytest.fixture
def test_client(mock_db_session: MagicMock) -> Generator[TestClient, None, None]:
    """Create a test client with mocked database session"""
    from main import app
    
    # Override the database dependency
    def override_get_db():  # noqa: ANN202
        yield mock_db_session
    
    app.dependency_overrides[get_transaction_session] = override_get_db
    
    yield TestClient(app)
    
    # Clean up
    app.dependency_overrides.clear()
