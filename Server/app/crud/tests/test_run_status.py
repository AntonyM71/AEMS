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

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == str(mock_run_status.id)
    assert data[0]["heat_id"] == str(mock_run_status.heat_id)
    assert data[0]["run_number"] == mock_run_status.run_number
    assert data[0]["phase_id"] == str(mock_run_status.phase_id)
    assert data[0]["athlete_id"] == str(mock_run_status.athlete_id)
    assert data[0]["locked"] == mock_run_status.locked
    assert data[0]["did_not_start"] == mock_run_status.did_not_start

    # Verify SQLAlchemy execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    response = test_client.get(
        f"/run_status/?id____list={str(mock_run_status.id)}"
    )

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == str(mock_run_status.id)

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_many_run_statuses_with_heat_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_run_status: RunStatus
) -> None:
    """Test GET /run_status/ with heat_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_run_status]
    mock_db_session.execute.return_value = mock_result

    # Make request with heat_id filter
    response = test_client.get(
        f"/run_status/?heat_id____list={str(mock_run_status.heat_id)}"
    )

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["heat_id"] == str(mock_run_status.heat_id)

    # Verify execute was called
    assert mock_db_session.execute.called


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

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["run_number"] == mock_run_status.run_number

    # Verify execute was called
    assert mock_db_session.execute.called


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
    assert len(data) == 0

    # Verify execute was called
    assert mock_db_session.execute.called
