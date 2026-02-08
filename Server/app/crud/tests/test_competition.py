"""
Unit tests for competition CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import Competition


@pytest.fixture
def mock_competition_data() -> dict[str, Any]:
    """Create mock competition data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "name": "Test Competition",
    }


@pytest.fixture
def mock_competition(mock_competition_data: dict[str, Any]) -> Competition:
    """Create a mock Competition database object"""
    competition = MagicMock(spec=Competition)
    for key, value in mock_competition_data.items():
        setattr(competition, key, value)
    competition.events = []
    return competition


def test_get_many_competitions_no_filters(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test GET /competition/ without filters returns all competitions"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_competition]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/competition/")

    # Verify exact response
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Test Competition",
        "event_foreign": None,
    }

    # Verify database calls
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1


def test_get_many_competitions_with_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test GET /competition/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_competition]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    filter_id = str(mock_competition.id)
    response = test_client.get(f"/competition/?id____list={filter_id}")

    # Verify exact response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the SQLAlchemy query has the correct filter parameters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Inspect query using compiled params (simpler than literal_binds)
    compiled = query.compile()
    
    # Check that the filter_id is in query parameters (flatten lists)
    param_values = []
    for v in compiled.params.values():
        if isinstance(v, list):
            param_values.extend(v)
        else:
            param_values.append(v)
    
    # UUID might be stored as UUID object or string
    assert any(str(val) == filter_id for val in param_values), f"Expected {filter_id} in query params, got {compiled.params}"
    
    # Verify query structure uses correct column
    query_str = str(query)
    assert ("Competition" in query_str and ".id" in query_str) or ("competition" in query_str and ".id" in query_str)


def test_get_many_competitions_with_name_str_filter(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test GET /competition/ with name____str filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_competition]
    mock_db_session.execute.return_value = mock_result

    # Make request with name____str filter
    response = test_client.get(f"/competition/?name____str={mock_competition.name}")

    # Verify exact response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the SQLAlchemy query has the correct filter parameters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Inspect query using compiled params (simpler than literal_binds)
    compiled = query.compile()
    
    # Check that the filter value is in query parameters (flatten lists)
    param_values = []
    for v in compiled.params.values():
        if isinstance(v, list):
            param_values.extend(v)
        else:
            param_values.append(v)
    
    filter_name = mock_competition.name
    assert filter_name in param_values, f"Expected {filter_name} in query params, got {compiled.params}"
    
    # Verify query structure uses correct column
    query_str = str(query)
    assert "name" in query_str


def test_get_many_competitions_with_name_list_filter(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test GET /competition/ with name____list filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_competition]
    mock_db_session.execute.return_value = mock_result

    # Make request with name____list filter
    response = test_client.get("/competition/?name____list=Test Competition&name____list=Other")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_many_competitions_with_pagination(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test GET /competition/ with pagination"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_competition]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/competition/?limit=10&offset=0")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_many_competitions_with_ordering(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test GET /competition/ with ordering"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_competition]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/competition/?order_by_columns=name_asc")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_many_competitions_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /competition/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/competition/")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == []

    # Verify database calls
    assert mock_db_session.execute.called


def test_post_insert_many_competitions(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /competition/ to insert many competitions"""
    # Create a function to add an ID when add() is called
    def mock_add(competition):
        competition.id = UUID("22222222-2222-2222-2222-222222222222")
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    competition_data = [{"name": "New Competition"}]
    response = test_client.post("/competition/", json=competition_data)

    # Verify exact response
    assert response.status_code == 201
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "22222222-2222-2222-2222-222222222222",
        "name": "New Competition",
        "event_foreign": None,
    }

    # Verify database operations were called
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1
    
    # Verify the add() was called with Competition object with ALL correct attributes
    add_call_args = mock_db_session.add.call_args
    added_competition = add_call_args[0][0]
    assert added_competition.name == "New Competition"


def test_patch_update_competition_by_id(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test PATCH /competition/{id} to update a competition"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_competition
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request to update competition
    competition_id = str(mock_competition.id)
    update_name = "Updated Competition"
    response = test_client.patch(f"/competition/{competition_id}", json=update_name)

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {
        "id": "11111111-1111-1111-1111-111111111111",
        "name": "Test Competition",  # Mock doesn't actually update
        "event_foreign": None,
    }

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.refresh.called


def test_patch_update_competition_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test PATCH /competition/{id} when competition doesn't exist"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request to update non-existent competition
    competition_id = "99999999-9999-9999-9999-999999999999"
    response = test_client.patch(f"/competition/{competition_id}", json="Updated Name")

    # Verify exact response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Competition not found"

    # Verify commit was not called
    assert not mock_db_session.commit.called


def test_patch_update_competition_with_filters(
    test_client: TestClient, mock_db_session: Session, mock_competition: Competition
) -> None:
    """Test PATCH /competition/{id} with additional query filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_competition
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request with additional filters
    competition_id = str(mock_competition.id)
    response = test_client.patch(
        f"/competition/{competition_id}?name____str=Test Competition",
        json="Updated Name"
    )

    # Verify exact response
    assert response.status_code == 200

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called
