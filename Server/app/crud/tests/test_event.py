"""
Unit tests for event CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import Event


@pytest.fixture
def mock_event_data() -> dict[str, Any]:
    """Create mock event data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "competition_id": UUID("22222222-2222-2222-2222-222222222222"),
        "name": "Test Event",
    }


@pytest.fixture
def mock_event(mock_event_data: dict[str, Any]) -> Event:
    """Create a mock Event database object"""
    event = MagicMock(spec=Event)
    for key, value in mock_event_data.items():
        setattr(event, key, value)
    event.competition = None
    event.phases = []
    return event


def test_get_many_events_no_filters(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ without filters returns all events"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/event/")

    # Verify exact response
    assert response.status_code == 200

    # Verify SQLAlchemy call
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    
    # Verify no WHERE clause for no filters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    assert query.whereclause is None


def test_get_many_events_with_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    filter_id = str(mock_event.id)
    response = test_client.get(f"/event/?id____list={filter_id}")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
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


def test_get_many_events_with_competition_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with competition_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with competition_id filter
    filter_competition_id = str(mock_event.competition_id)
    response = test_client.get(f"/event/?competition_id____list={filter_competition_id}")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Verify the whereclause properties without compiling
    whereclause = query.whereclause
    
    # Assert we're filtering on the correct column
    assert str(whereclause.left).endswith(".competition_id"), f"Expected filtering on .competition_id column, got {whereclause.left}"
    
    # Assert we're using the correct operator (in_op for IN filters)
    assert whereclause.operator.__name__ == "in_op", f"Expected in_op operator, got {whereclause.operator.__name__}"
    
    # Assert the actual filter value matches what we sent in the request
    filter_values = whereclause.right.value
    assert any(str(val) == filter_competition_id for val in filter_values), f"Expected {filter_competition_id} in filter values, got {filter_values}"


def test_get_many_events_with_name_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with name filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with name filter
    response = test_client.get("/event/?name____str=Test Event")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Verify the whereclause properties without compiling
    whereclause = query.whereclause
    
    # Assert we're filtering on the correct column
    assert str(whereclause.left).endswith(".name"), f"Expected filtering on .name column, got {whereclause.left}"
    
    # Assert we're using the correct operator (eq for == filters)
    assert whereclause.operator.__name__ == "eq", f"Expected eq operator, got {whereclause.operator.__name__}"
    
    # Assert the actual filter value matches what we sent in the request
    filter_name = "Test Event"
    assert whereclause.right.value == filter_name, f"Expected {filter_name} in filter value, got {whereclause.right.value}"


def test_get_many_events_with_pagination(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with pagination"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/event/?limit=10&offset=0")

    # Verify response
    assert response.status_code == 200

    assert mock_db_session.execute.called


def test_get_many_events_with_ordering(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with ordering"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/event/?order_by_columns=name_asc")

    # Verify response
    assert response.status_code == 200

    assert mock_db_session.execute.called


def test_get_many_events_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /event/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/event/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert data == []

    assert mock_db_session.execute.called


def test_get_one_event_by_id(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{id} returns specific event"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_event
    mock_db_session.execute.return_value = mock_result

    # Make request
    event_id = str(mock_event.id)
    response = test_client.get(f"/event/{event_id}")

    # Verify exact response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify query filters by ID
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause
    assert whereclause is not None
    assert str(whereclause.left).endswith(".id")
    assert whereclause.operator.__name__ == "eq"


def test_get_one_event_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /event/{id} returns 404 when event not found"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request
    event_id = "99999999-9999-9999-9999-999999999999"
    response = test_client.get(f"/event/{event_id}")

    # Verify exact response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Event not found"

    assert mock_db_session.execute.called


def test_get_one_event_with_competition_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{id} with competition_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_event
    mock_db_session.execute.return_value = mock_result

    # Make request with filter
    event_id = str(mock_event.id)
    response = test_client.get(
        f"/event/{event_id}?competition_id____list={mock_event.competition_id!s}"
    )

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Verify the whereclause properties without compiling
    whereclause = query.whereclause
    
    # For get_one with filters, we have compound clauses (id AND competition_id)
    # whereclause is a BooleanClauseList containing multiple filter clauses
    filter_competition_id = str(mock_event.competition_id)
    
    # Find the competition_id filter in the compound clause
    found_competition_id_filter = False
    for clause in whereclause.clauses:
        if str(clause.left).endswith(".competition_id"):
            found_competition_id_filter = True
            # Assert we're using the correct operator (in_op for IN filters)
            assert clause.operator.__name__ == "in_op", f"Expected in_op operator, got {clause.operator.__name__}"
            # Assert the actual filter value matches what we sent in the request
            filter_values = clause.right.value
            assert any(str(val) == filter_competition_id for val in filter_values), f"Expected {filter_competition_id} in filter values, got {filter_values}"
            break
    
    assert found_competition_id_filter, "Expected to find competition_id filter in compound WHERE clause"


def test_get_many_with_foreign_tree(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/get_many_with_foreign_tree/"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/event/get_many_with_foreign_tree/")

    # Verify response
    assert response.status_code == 200

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_event_phases(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{event_pk_id}/phase"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    event_id = str(mock_event.id)
    response = test_client.get(f"/event/{event_id}/phase")

    # Verify response
    assert response.status_code == 200

    # Verify execute was called
    assert mock_db_session.execute.called


def test_post_insert_many_events(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /event/ to insert many events"""
    # Mock ID generation
    def mock_add(event):  # noqa: ANN202, ANN001
        event.id = UUID("33333333-3333-3333-3333-333333333333")
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    event_data = [
        {
            "competition_id": "22222222-2222-2222-2222-222222222222",
            "name": "New Event",
        }
    ]
    response = test_client.post("/event/", json=event_data)

    # Verify exact response
    assert response.status_code == 201

    # Verify database operations
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1
    
    # Verify the add() was called with Event object with ALL correct attributes
    add_call_args = mock_db_session.add.call_args
    added_event = add_call_args[0][0]
    assert added_event.name == "New Event"
    assert str(added_event.competition_id) == "22222222-2222-2222-2222-222222222222"
