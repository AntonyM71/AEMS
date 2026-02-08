"""
Unit tests for run_status CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import RunStatus


@pytest.fixture
def mock_run_status_data() -> dict[str, Any]:
    """Create mock run status data"""
    return {
        "id": UUID("12345678-1234-1234-1234-123456789012"),
        "heat_id": UUID("22345678-1234-1234-1234-123456789012"),
        "run_number": 1,
        "phase_id": UUID("32345678-1234-1234-1234-123456789012"),
        "athlete_id": UUID("42345678-1234-1234-1234-123456789012"),
        "locked": False,
        "did_not_start": False,
    }


@pytest.fixture
def mock_run_status(mock_run_status_data: dict[str, Any]) -> RunStatus:
    """Create a mock RunStatus database object"""
    run_status = MagicMock(spec=RunStatus)
    for key, value in mock_run_status_data.items():
        setattr(run_status, key, value)
    return run_status


def test_get_many_run_statuses_no_filters(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ without filters returns all run statuses"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/run_status/")

    # Verify response status and content type
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    
    # Verify exact response structure and values
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "12345678-1234-1234-1234-123456789012",
        "heat_id": "22345678-1234-1234-1234-123456789012",
        "run_number": 1,
        "phase_id": "32345678-1234-1234-1234-123456789012",
        "athlete_id": "42345678-1234-1234-1234-123456789012",
        "locked": False,
        "did_not_start": False,
    }

    # Verify SQLAlchemy execute was called with correct query
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    
    # Verify the query structure passed to execute
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]  # First positional argument
    
    # Convert query to string to inspect it
    query_str = str(query)
    assert "SELECT" in query_str
    assert "runStatus" in query_str or "run_status" in query_str
    # No WHERE clause should be present for no filters
    assert "WHERE" not in query_str or query_str.count("WHERE") == 0


def test_get_many_run_statuses_with_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    filter_id = str(mock_run_status.id)
    response = test_client.get(f"/run_status/?id____list={filter_id}")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "12345678-1234-1234-1234-123456789012",
        "heat_id": "22345678-1234-1234-1234-123456789012",
        "run_number": 1,
        "phase_id": "32345678-1234-1234-1234-123456789012",
        "athlete_id": "42345678-1234-1234-1234-123456789012",
        "locked": False,
        "did_not_start": False,
    }

    # Verify execute was called
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    
    # Verify the query contains the id filter with the correct value
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "WHERE" in query_str
    assert "runStatus.id IN" in query_str or "run_status.id IN" in query_str
    # Verify the actual UUID is in the query
    assert filter_id in query_str or filter_id.replace("-", "") in query_str


def test_get_many_run_statuses_with_heat_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with heat_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with heat_id filter
    filter_heat_id = str(mock_run_status.heat_id)
    response = test_client.get(f"/run_status/?heat_id____list={filter_heat_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "12345678-1234-1234-1234-123456789012",
        "heat_id": "22345678-1234-1234-1234-123456789012",
        "run_number": 1,
        "phase_id": "32345678-1234-1234-1234-123456789012",
        "athlete_id": "42345678-1234-1234-1234-123456789012",
        "locked": False,
        "did_not_start": False,
    }

    # Verify execute was called
    assert mock_db_session.execute.called
    
    # Verify the query contains heat_id filter with correct value
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "WHERE" in query_str
    assert "heat_id IN" in query_str
    # Verify the actual heat_id UUID is in the query
    assert filter_heat_id in query_str or filter_heat_id.replace("-", "") in query_str


def test_get_many_run_statuses_with_run_number_range(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with run_number range filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with run_number range
    response = test_client.get(
        "/run_status/?run_number____from=1&run_number____to=5"
    )

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "12345678-1234-1234-1234-123456789012",
        "heat_id": "22345678-1234-1234-1234-123456789012",
        "run_number": 1,
        "phase_id": "32345678-1234-1234-1234-123456789012",
        "athlete_id": "42345678-1234-1234-1234-123456789012",
        "locked": False,
        "did_not_start": False,
    }

    # Verify execute was called
    assert mock_db_session.execute.called
    
    # Verify the query contains range filters (>= and <=)
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "WHERE" in query_str
    # Should have both >= and <= conditions for run_number
    assert "run_number >=" in query_str.lower() or ">=" in query_str
    assert "run_number <=" in query_str.lower() or "<=" in query_str


def test_get_many_run_statuses_with_pagination(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with limit and offset"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/run_status/?limit=10&offset=0")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_ordering(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with ordering"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/run_status/?order_by_columns=run_number_desc")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /run_status/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/run_status/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert data == []

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_phase_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with phase_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with phase_id filter
    response = test_client.get(
        f"/run_status/?phase_id____list={str(mock_run_status.phase_id)}"
    )

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["phase_id"] == str(mock_run_status.phase_id)

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_athlete_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with athlete_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with athlete_id filter
    response = test_client.get(
        f"/run_status/?athlete_id____list={str(mock_run_status.athlete_id)}"
    )

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["athlete_id"] == str(mock_run_status.athlete_id)

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_locked_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with locked filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with locked filter
    response = test_client.get("/run_status/?locked____list=false")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["locked"] is False

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_did_not_start_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with did_not_start filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with did_not_start filter
    response = test_client.get("/run_status/?did_not_start____list=false")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["did_not_start"] is False

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_run_number_list_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with run_number list filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with run_number list filter
    response = test_client.get("/run_status/?run_number____list=1&run_number____list=2")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["run_number"] == 1

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_multiple_filters(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with multiple filters combined"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with multiple filters
    response = test_client.get(
        f"/run_status/?heat_id____list={str(mock_run_status.heat_id)}"
        f"&phase_id____list={str(mock_run_status.phase_id)}"
        "&locked____list=false"
    )

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "12345678-1234-1234-1234-123456789012",
        "heat_id": "22345678-1234-1234-1234-123456789012",
        "run_number": 1,
        "phase_id": "32345678-1234-1234-1234-123456789012",
        "athlete_id": "42345678-1234-1234-1234-123456789012",
        "locked": False,
        "did_not_start": False,
    }

    # Verify execute was called
    assert mock_db_session.execute.called
