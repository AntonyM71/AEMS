"""
Unit tests for scoresheet CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import ScoreSheet


@pytest.fixture
def mock_scoresheet_data() -> dict[str, Any]:
    """Create mock scoresheet data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "name": "Test ScoreSheet",
    }


@pytest.fixture
def mock_scoresheet(mock_scoresheet_data: dict[str, Any]) -> ScoreSheet:
    """Create a mock ScoreSheet database object"""
    scoresheet = MagicMock(spec=ScoreSheet)
    for key, value in mock_scoresheet_data.items():
        setattr(scoresheet, key, value)
    return scoresheet


def test_get_many_scoresheets_no_filters(
    test_client: TestClient, mock_db_session: Session, mock_scoresheet: ScoreSheet
) -> None:
    """Test GET /scoresheet/ without filters returns all scoresheets"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_scoresheet]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/scoresheet/")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Test ScoreSheet",
    }

    # Verify SQLAlchemy call
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    
    # Verify query structure
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "SELECT" in query_str
    assert "scoreSheet" in query_str or "score_sheet" in query_str


def test_get_many_scoresheets_with_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_scoresheet: ScoreSheet
) -> None:
    """Test GET /scoresheet/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_scoresheet]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    response = test_client.get(f"/scoresheet/?id____list={str(mock_scoresheet.id)}")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == str(mock_scoresheet.id)

    # Verify query has ID filter
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "WHERE" in query_str
    assert ".id IN" in query_str


def test_get_many_scoresheets_with_name_filter(
    test_client: TestClient, mock_db_session: Session, mock_scoresheet: ScoreSheet
) -> None:
    """Test GET /scoresheet/ with name filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_scoresheet]
    mock_db_session.execute.return_value = mock_result

    # Make request with name filter
    response = test_client.get("/scoresheet/?name____str=Test ScoreSheet")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Test ScoreSheet"

    # Verify query has name filter
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "name IN" in query_str


def test_get_many_scoresheets_with_pagination(
    test_client: TestClient, mock_db_session: Session, mock_scoresheet: ScoreSheet
) -> None:
    """Test GET /scoresheet/ with pagination"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_scoresheet]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/scoresheet/?limit=10&offset=0")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    assert mock_db_session.execute.called


def test_get_many_scoresheets_with_ordering(
    test_client: TestClient, mock_db_session: Session, mock_scoresheet: ScoreSheet
) -> None:
    """Test GET /scoresheet/ with ordering"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_scoresheet]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/scoresheet/?order_by_columns=name_asc")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    assert mock_db_session.execute.called


def test_get_many_scoresheets_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /scoresheet/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/scoresheet/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert data == []

    assert mock_db_session.execute.called


def test_post_insert_many_scoresheets(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /scoresheet/ to insert many scoresheets"""
    # Mock ID generation
    def mock_add(scoresheet):
        scoresheet.id = UUID("22222222-2222-2222-2222-222222222222")
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    scoresheet_data = [{"name": "New ScoreSheet"}]
    response = test_client.post("/scoresheet/", json=scoresheet_data)

    # Verify exact response
    assert response.status_code == 201
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "22222222-2222-2222-2222-222222222222",
        "name": "New ScoreSheet",
    }

    # Verify database operations
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    
    # Verify the add() was called with ScoreSheet object with correct name
    add_call_args = mock_db_session.add.call_args
    added_scoresheet = add_call_args[0][0]
    assert added_scoresheet.name == "New ScoreSheet"
