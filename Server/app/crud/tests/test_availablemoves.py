"""
Unit tests for availablemoves CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import AvailableMoves


@pytest.fixture
def mock_available_moves_data() -> dict[str, Any]:
    """Create mock available moves data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "sheet_id": UUID("22222222-2222-2222-2222-222222222222"),
        "name": "Test Move",
        "fl_score": 100,
        "rb_score": 50,
        "direction": "U",
    }


@pytest.fixture
def mock_available_moves(
    mock_available_moves_data: dict[str, Any]
) -> AvailableMoves:
    """Create a mock AvailableMoves database object"""
    moves = MagicMock(spec=AvailableMoves)
    for key, value in mock_available_moves_data.items():
        setattr(moves, key, value)
    return moves


def test_get_many_available_moves_no_filters(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ without filters returns all available moves"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/availablemoves/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "11111111-1111-1111-1111-111111111111",
        "sheet_id": "22222222-2222-2222-2222-222222222222",
        "name": "Test Move",
        "fl_score": 100,
        "rb_score": 50,
        "direction": "U",
    }

    # Verify SQLAlchemy execute was called
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    
    # Verify the query structure
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "SELECT" in query_str
    assert "availableMoves" in query_str or "available_moves" in query_str


def test_get_many_available_moves_with_id_filter(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    filter_id = str(mock_available_moves.id)
    response = test_client.get(f"/availablemoves/?id____list={filter_id}")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the SQLAlchemy query has the correct filter parameters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Inspect the query's whereclause directly (no compilation needed)
    whereclause = query.whereclause
    
    # Verify the correct column is being filtered
    assert str(whereclause.left).endswith(".id"), f"Expected filtering on .id column, got {whereclause.left}"
    
    # Verify the actual filter value is correct
    filter_values = whereclause.right.value
    assert any(str(val) == filter_id for val in filter_values), f"Expected {filter_id} in filter values, got {filter_values}"


def test_get_many_available_moves_with_sheet_id_filter(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ with sheet_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request with sheet_id filter
    filter_sheet_id = str(mock_available_moves.sheet_id)
    response = test_client.get(f"/availablemoves/?sheet_id____list={filter_sheet_id}")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the SQLAlchemy query has the correct filter parameters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Inspect the query's whereclause directly (no compilation needed)
    whereclause = query.whereclause
    
    # Verify the correct column is being filtered
    assert str(whereclause.left).endswith(".sheet_id"), f"Expected filtering on .sheet_id column, got {whereclause.left}"
    
    # Verify the actual filter value is correct
    filter_values = whereclause.right.value
    assert any(str(val) == filter_sheet_id for val in filter_values), f"Expected {filter_sheet_id} in filter values, got {filter_values}"


def test_get_many_available_moves_with_fl_score_range(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ with fl_score range filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request with fl_score range
    response = test_client.get("/availablemoves/?fl_score____from=50&fl_score____to=150")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the SQLAlchemy query has the correct filter parameters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Inspect the query's whereclause directly (no compilation needed)
    whereclause = query.whereclause
    
    # For range filters, we may have compound clauses
    # Find the fl_score filter in the clause(s)
    found_fl_score_filter = False
    
    # Check if it's a single clause or compound
    if hasattr(whereclause, 'clauses'):
        for clause in whereclause.clauses:
            if str(clause.left).endswith(".fl_score"):
                found_fl_score_filter = True
                break
    else:
        if str(whereclause.left).endswith(".fl_score"):
            found_fl_score_filter = True
    
    assert found_fl_score_filter, "Expected to find fl_score filter in WHERE clause"


def test_get_many_available_moves_with_rb_score_range(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ with rb_score range filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request with rb_score range
    response = test_client.get("/availablemoves/?rb_score____from=40&rb_score____to=60")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the SQLAlchemy query has the correct filter parameters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Inspect the query's whereclause directly (no compilation needed)
    whereclause = query.whereclause
    
    # For range filters, we may have compound clauses
    # Find the rb_score filter in the clause(s)
    found_rb_score_filter = False
    
    # Check if it's a single clause or compound
    if hasattr(whereclause, 'clauses'):
        for clause in whereclause.clauses:
            if str(clause.left).endswith(".rb_score"):
                found_rb_score_filter = True
                break
    else:
        if str(whereclause.left).endswith(".rb_score"):
            found_rb_score_filter = True
    
    assert found_rb_score_filter, "Expected to find rb_score filter in WHERE clause"


def test_get_many_available_moves_with_direction_filter(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ with direction filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request with direction filter
    response = test_client.get("/availablemoves/?direction____str=U")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the SQLAlchemy query has the correct filter parameters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Inspect the query's whereclause directly (no compilation needed)
    whereclause = query.whereclause
    
    # Verify the correct column is being filtered
    assert str(whereclause.left).endswith(".direction"), f"Expected filtering on .direction column, got {whereclause.left}"
    
    # Verify the actual filter value is correct
    filter_direction = "U"
    filter_values = whereclause.right.value
    assert filter_direction in filter_values, f"Expected {filter_direction} in filter values, got {filter_values}"


def test_get_many_available_moves_with_pagination(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ with pagination"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/availablemoves/?limit=10&offset=0")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_available_moves_with_ordering(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_moves: AvailableMoves,
) -> None:
    """Test GET /availablemoves/ with ordering"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_moves]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/availablemoves/?order_by_columns=fl_score_desc")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_available_moves_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /availablemoves/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/availablemoves/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert data == []

    # Verify execute was called
    assert mock_db_session.execute.called
