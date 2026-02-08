"""
Unit tests for phase CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import Phase


@pytest.fixture
def mock_phase_data() -> dict[str, Any]:
    """Create mock phase data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "event_id": UUID("22222222-2222-2222-2222-222222222222"),
        "name": "Qualification",
        "number_of_runs": 2,
        "number_of_runs_for_score": 2,
        "number_of_judges": 5,
        "scoresheet": UUID("33333333-3333-3333-3333-333333333333"),
    }


@pytest.fixture
def mock_phase(mock_phase_data: dict[str, Any]) -> Phase:
    """Create a mock Phase database object"""
    phase = MagicMock(spec=Phase)
    for key, value in mock_phase_data.items():
        setattr(phase, key, value)
    phase.event = None
    return phase


def test_get_one_phase_by_id(
    test_client: TestClient, mock_db_session: Session, mock_phase: Phase
) -> None:
    """Test GET /phase/{id} returns specific phase"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_phase
    mock_db_session.execute.return_value = mock_result

    # Make request
    phase_id = str(mock_phase.id)
    response = test_client.get(f"/phase/{phase_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {
        "id": "11111111-1111-1111-1111-111111111111",
        "event_id": "22222222-2222-2222-2222-222222222222",
        "name": "Qualification",
        "number_of_runs": 2,
        "number_of_runs_for_score": 2,
        "number_of_judges": 5,
        "scoresheet": "33333333-3333-3333-3333-333333333333",
        "event_foreign": None,
    }

    # Verify database calls
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    
    # Verify query filters by ID
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause
    assert whereclause is not None
    assert str(whereclause.left).endswith(".id")
    assert whereclause.operator.__name__ == "eq"


def test_get_one_phase_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /phase/{id} returns 404 when phase not found"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request
    phase_id = "99999999-9999-9999-9999-999999999999"
    response = test_client.get(f"/phase/{phase_id}")

    # Verify exact response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Phase not found"

    assert mock_db_session.execute.called


def test_get_one_phase_with_event_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_phase: Phase
) -> None:
    """Test GET /phase/{id} with event_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_phase
    mock_db_session.execute.return_value = mock_result

    # Make request with filter
    phase_id = str(mock_phase.id)
    filter_event_id = str(mock_phase.event_id)
    response = test_client.get(f"/phase/{phase_id}?event_id____list={filter_event_id}")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    
    # Verify the whereclause properties without compiling
    whereclause = query.whereclause
    
    # For get_one with filters, we have compound clauses (id AND event_id)
    # whereclause is a BooleanClauseList containing multiple filter clauses
    
    # Find the event_id filter in the compound clause
    found_event_id_filter = False
    for clause in whereclause.clauses:
        if str(clause.left).endswith(".event_id"):
            found_event_id_filter = True
            # Assert we're using the correct operator (in_op for IN filters)
            assert clause.operator.__name__ == "in_op", f"Expected in_op operator, got {clause.operator.__name__}"
            # Assert the actual filter value matches what we sent in the request
            filter_values = clause.right.value
            assert any(str(val) == filter_event_id for val in filter_values), f"Expected {filter_event_id} in filter values, got {filter_values}"
            break
    
    assert found_event_id_filter, "Expected to find event_id filter in compound WHERE clause"


def test_get_one_phase_with_number_of_runs_range(
    test_client: TestClient, mock_db_session: Session, mock_phase: Phase
) -> None:
    """Test GET /phase/{id} with number_of_runs range filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_phase
    mock_db_session.execute.return_value = mock_result

    # Make request with range filter
    phase_id = str(mock_phase.id)
    response = test_client.get(
        f"/phase/{phase_id}?number_of_runs____from=1&number_of_runs____to=3"
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
    
    # For get_one with range filters, we have compound clauses (id AND number_of_runs range)
    # whereclause is a BooleanClauseList containing multiple filter clauses
    
    # Find the number_of_runs filter in the compound clause
    found_number_of_runs_from = False
    found_number_of_runs_to = False
    for clause in whereclause.clauses:
        if str(clause.left).endswith(".number_of_runs"):
            # Check for >= (ge) operator for number_of_runs____from
            if clause.operator.__name__ == "ge":
                found_number_of_runs_from = True
                # Assert the actual filter value matches what we sent in the request (1)
                assert clause.right.value == 1, f"Expected 1 for number_of_runs____from, got {clause.right.value}"
            # Check for <= (le) operator for number_of_runs____to
            elif clause.operator.__name__ == "le":
                found_number_of_runs_to = True
                # Assert the actual filter value matches what we sent in the request (3)
                assert clause.right.value == 3, f"Expected 3 for number_of_runs____to, got {clause.right.value}"
    
    assert found_number_of_runs_from, "Expected to find number_of_runs____from (>=) filter in compound WHERE clause"
    assert found_number_of_runs_to, "Expected to find number_of_runs____to (<=) filter in compound WHERE clause"


def test_get_one_phase_with_number_of_judges_filter(
    test_client: TestClient, mock_db_session: Session, mock_phase: Phase
) -> None:
    """Test GET /phase/{id} with number_of_judges filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_phase
    mock_db_session.execute.return_value = mock_result

    # Make request with filter
    phase_id = str(mock_phase.id)
    response = test_client.get(
        f"/phase/{phase_id}?number_of_judges____list=5&number_of_judges____list=7"
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
    
    # For get_one with filters, we have compound clauses (id AND number_of_judges)
    # whereclause is a BooleanClauseList containing multiple filter clauses
    
    # Find the number_of_judges filter in the compound clause
    found_number_of_judges_filter = False
    for clause in whereclause.clauses:
        if str(clause.left).endswith(".number_of_judges"):
            found_number_of_judges_filter = True
            # Assert we're using the correct operator (in_op for IN filters)
            assert clause.operator.__name__ == "in_op", f"Expected in_op operator, got {clause.operator.__name__}"
            # Assert the actual filter value matches what we sent in the request
            filter_values = clause.right.value
            # Should contain 5 or 7 (the list filter values)
            assert 5 in filter_values or 7 in filter_values, f"Expected filter values in list, got {filter_values}"
            break
    
    assert found_number_of_judges_filter, "Expected to find number_of_judges filter in compound WHERE clause"


def test_post_insert_many_phases(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /phase/ to insert many phases"""
    # Mock ID generation
    def mock_add(phase):  # noqa: ANN202, ANN001
        phase.id = UUID("44444444-4444-4444-4444-444444444444")
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    phase_data = [
        {
            "event_id": "22222222-2222-2222-2222-222222222222",
            "name": "New Phase",
            "number_of_runs": 3,
            "number_of_runs_for_score": 2,
            "number_of_judges": 7,
            "scoresheet": "33333333-3333-3333-3333-333333333333",
        }
    ]
    response = test_client.post("/phase/", json=phase_data)

    # Verify exact response
    assert response.status_code == 201
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "44444444-4444-4444-4444-444444444444",
        "event_id": "22222222-2222-2222-2222-222222222222",
        "name": "New Phase",
        "number_of_runs": 3,
        "number_of_runs_for_score": 2,
        "number_of_judges": 7,
        "scoresheet": "33333333-3333-3333-3333-333333333333",
        "event_foreign": None,
    }

    # Verify database operations
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1
    
    # Verify the add() was called with Phase object with ALL correct attributes
    add_call_args = mock_db_session.add.call_args
    added_phase = add_call_args[0][0]
    assert str(added_phase.event_id) == "22222222-2222-2222-2222-222222222222"
    assert added_phase.name == "New Phase"
    assert added_phase.number_of_runs == 3
    assert added_phase.number_of_runs_for_score == 2
    assert added_phase.number_of_judges == 7
    assert str(added_phase.scoresheet) == "33333333-3333-3333-3333-333333333333"


def test_patch_update_phase_by_id(
    test_client: TestClient, mock_db_session: Session, mock_phase: Phase
) -> None:
    """Test PATCH /phase/{id} to update a phase"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_phase
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request to update phase
    phase_id = str(mock_phase.id)
    update_data = {"name": "Updated Phase"}
    response = test_client.patch(f"/phase/{phase_id}", json=update_data)

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == phase_id

    # Verify database operations
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.refresh.called
    
    # Verify query filters by ID
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause
    assert whereclause is not None
    assert str(whereclause.left).endswith(".id")
    assert whereclause.operator.__name__ == "eq"


def test_patch_update_phase_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test PATCH /phase/{id} when phase doesn't exist"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request to update non-existent phase
    phase_id = "99999999-9999-9999-9999-999999999999"
    update_data = {"name": "Updated"}
    response = test_client.patch(f"/phase/{phase_id}", json=update_data)

    # Verify exact response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Phase not found"

    # Verify commit was not called
    assert not mock_db_session.commit.called
