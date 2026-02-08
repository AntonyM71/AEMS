"""
Unit tests for availablebonuses CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import AvailableBonuses


@pytest.fixture
def mock_available_bonuses_data() -> dict[str, Any]:
    """Create mock available bonuses data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "sheet_id": UUID("22222222-2222-2222-2222-222222222222"),
        "move_id": UUID("33333333-3333-3333-3333-333333333333"),
        "name": "Test Bonus",
        "score": 10,
        "display_order": 1,
    }


@pytest.fixture
def mock_available_bonuses(
    mock_available_bonuses_data: dict[str, Any]
) -> AvailableBonuses:
    """Create a mock AvailableBonuses database object"""
    bonus = MagicMock(spec=AvailableBonuses)
    for key, value in mock_available_bonuses_data.items():
        setattr(bonus, key, value)
    return bonus


def test_get_many_available_bonuses_no_filters(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_bonuses: AvailableBonuses,
) -> None:
    """Test GET /availablebonuses/ without filters returns all available bonuses"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_bonuses]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/availablebonuses/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == str(mock_available_bonuses.id)
    assert data[0]["sheet_id"] == str(mock_available_bonuses.sheet_id)
    assert data[0]["move_id"] == str(mock_available_bonuses.move_id)
    assert data[0]["name"] == mock_available_bonuses.name
    assert data[0]["score"] == mock_available_bonuses.score
    assert data[0]["display_order"] == mock_available_bonuses.display_order

    # Verify SQLAlchemy execute was called
    assert mock_db_session.execute.called


def test_get_many_available_bonuses_with_id_filter(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_bonuses: AvailableBonuses,
) -> None:
    """Test GET /availablebonuses/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_bonuses]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    filter_id = str(mock_available_bonuses.id)
    response = test_client.get(f"/availablebonuses/?id____list={filter_id}")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == str(mock_available_bonuses.id)

    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Verify the whereclause properties without compiling
    whereclause = query.whereclause
    
    # Assert we're filtering on the correct column
    assert str(whereclause.left).endswith(".id"), f"Expected filtering on .id column, got {whereclause.left}"
    
    # Assert we're using the correct operator (in_op for IN filters)
    assert whereclause.operator.__name__ == "in_op", f"Expected in_op operator, got {whereclause.operator.__name__}"
    
    # Assert the actual filter value matches what we sent in the request
    filter_values = whereclause.right.value
    assert any(str(val) == filter_id for val in filter_values), f"Expected {filter_id} in filter values, got {filter_values}"


def test_get_many_available_bonuses_with_sheet_id_filter(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_bonuses: AvailableBonuses,
) -> None:
    """Test GET /availablebonuses/ with sheet_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_bonuses]
    mock_db_session.execute.return_value = mock_result

    # Make request with sheet_id filter
    filter_sheet_id = str(mock_available_bonuses.sheet_id)
    response = test_client.get(f"/availablebonuses/?sheet_id____list={filter_sheet_id}")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["sheet_id"] == str(mock_available_bonuses.sheet_id)

    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Verify the whereclause properties without compiling
    whereclause = query.whereclause
    
    # Assert we're filtering on the correct column
    assert str(whereclause.left).endswith(".sheet_id"), f"Expected filtering on .sheet_id column, got {whereclause.left}"
    
    # Assert we're using the correct operator (in_op for IN filters)
    assert whereclause.operator.__name__ == "in_op", f"Expected in_op operator, got {whereclause.operator.__name__}"
    
    # Assert the actual filter value matches what we sent in the request
    filter_values = whereclause.right.value
    assert any(str(val) == filter_sheet_id for val in filter_values), f"Expected {filter_sheet_id} in filter values, got {filter_values}"


def test_get_many_available_bonuses_with_score_range(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_bonuses: AvailableBonuses,
) -> None:
    """Test GET /availablebonuses/ with score range filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_bonuses]
    mock_db_session.execute.return_value = mock_result

    # Make request with score range
    response = test_client.get("/availablebonuses/?score____from=5&score____to=15")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["score"] == mock_available_bonuses.score

    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Verify the whereclause properties without compiling
    whereclause = query.whereclause
    
    # For range filters, we have compound clauses
    # Find the score filter in the clause(s)
    found_score_from = False
    found_score_to = False
    
    # Check if it's a single clause or compound
    if hasattr(whereclause, 'clauses'):
        for clause in whereclause.clauses:
            if str(clause.left).endswith(".score"):
                # Check for >= (ge) operator for score____from
                if clause.operator.__name__ == "ge":
                    found_score_from = True
                    # Assert the actual filter value matches what we sent in the request (5)
                    assert clause.right.value == 5, f"Expected 5 for score____from, got {clause.right.value}"
                # Check for <= (le) operator for score____to
                elif clause.operator.__name__ == "le":
                    found_score_to = True
                    # Assert the actual filter value matches what we sent in the request (15)
                    assert clause.right.value == 15, f"Expected 15 for score____to, got {clause.right.value}"
    else:
        if str(whereclause.left).endswith(".score"):
            found_score_from = True
    
    assert found_score_from, "Expected to find score____from (>=) filter in WHERE clause"
    assert found_score_to, "Expected to find score____to (<=) filter in WHERE clause"


def test_get_many_available_bonuses_with_pagination(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_bonuses: AvailableBonuses,
) -> None:
    """Test GET /availablebonuses/ with limit and offset"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_bonuses]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/availablebonuses/?limit=10&offset=0")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_available_bonuses_with_ordering(
    test_client: TestClient,
    mock_db_session: Session,
    mock_available_bonuses: AvailableBonuses,
) -> None:
    """Test GET /availablebonuses/ with ordering"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_available_bonuses]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/availablebonuses/?order_by_columns=score_desc")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_available_bonuses_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /availablebonuses/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/availablebonuses/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 0

    # Verify execute was called
    assert mock_db_session.execute.called
