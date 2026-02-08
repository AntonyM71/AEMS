"""
Unit tests for athleteheat CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import AthleteHeat


@pytest.fixture
def mock_athlete_heat_data() -> dict[str, Any]:
    """Create mock athlete heat data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "athlete_id": UUID("22222222-2222-2222-2222-222222222222"),
        "heat_id": UUID("33333333-3333-3333-3333-333333333333"),
        "phase_id": UUID("44444444-4444-4444-4444-444444444444"),
    }


@pytest.fixture
def mock_athlete_heat(mock_athlete_heat_data: dict[str, Any]) -> AthleteHeat:
    """Create a mock AthleteHeat database object"""
    athlete_heat = MagicMock(spec=AthleteHeat)
    for key, value in mock_athlete_heat_data.items():
        setattr(athlete_heat, key, value)
    return athlete_heat


def test_post_insert_many_athlete_heats(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /athleteheat/ to insert many athlete heats"""
    # Create a function to add an ID when add() is called
    def mock_add(athlete_heat):
        athlete_heat.id = UUID("11111111-1111-1111-1111-111111111111")
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    athlete_heat_data = [
        {
            "athlete_id": "22222222-2222-2222-2222-222222222222",
            "heat_id": "33333333-3333-3333-3333-333333333333",
            "phase_id": "44444444-4444-4444-4444-444444444444",
        }
    ]
    response = test_client.post("/athleteheat/", json=athlete_heat_data)

    # Verify exact response
    assert response.status_code == 201

    # Verify database operations were called
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1
    
    # Verify the add() was called with AthleteHeat object with ALL correct attributes
    add_call_args = mock_db_session.add.call_args
    added_athlete_heat = add_call_args[0][0]
    assert str(added_athlete_heat.athlete_id) == "22222222-2222-2222-2222-222222222222"
    assert str(added_athlete_heat.heat_id) == "33333333-3333-3333-3333-333333333333"
    assert str(added_athlete_heat.phase_id) == "44444444-4444-4444-4444-444444444444"


def test_post_insert_multiple_athlete_heats(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /athleteheat/ to insert multiple athlete heats"""
    # Create a counter for unique IDs
    counter = 0
    def mock_add(athlete_heat):
        nonlocal counter
        athlete_heat.id = UUID(f"1111111{counter}-1111-1111-1111-111111111111")
        counter += 1
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request with multiple athlete heats
    athlete_heat_data = [
        {
            "athlete_id": "22222222-2222-2222-2222-222222222222",
            "heat_id": "33333333-3333-3333-3333-333333333333",
            "phase_id": "44444444-4444-4444-4444-444444444444",
        },
        {
            "athlete_id": "22222222-2222-2222-2222-222222222223",
            "heat_id": "33333333-3333-3333-3333-333333333333",
            "phase_id": "44444444-4444-4444-4444-444444444444",
        },
    ]
    response = test_client.post("/athleteheat/", json=athlete_heat_data)

    # Verify exact response
    assert response.status_code == 201

    # Verify database add was called twice
    assert mock_db_session.add.call_count == 2
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1


def test_patch_update_athlete_heat_by_id(
    test_client: TestClient, mock_db_session: Session, mock_athlete_heat: AthleteHeat
) -> None:
    """Test PATCH /athleteheat/{id} to update an athlete heat"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_athlete_heat
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request to update athlete heat
    athlete_heat_id = str(mock_athlete_heat.id)
    update_data = {"athlete_id": "99999999-9999-9999-9999-999999999999"}
    response = test_client.patch(f"/athleteheat/{athlete_heat_id}", json=update_data)

    # Verify exact response
    assert response.status_code == 200

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.refresh.called


def test_patch_update_athlete_heat_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test PATCH /athleteheat/{id} when athlete heat doesn't exist"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request to update non-existent athlete heat
    athlete_heat_id = "99999999-9999-9999-9999-999999999999"
    update_data = {"athlete_id": "88888888-8888-8888-8888-888888888888"}
    response = test_client.patch(f"/athleteheat/{athlete_heat_id}", json=update_data)

    # Verify exact response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Athlete heat not found"

    # Verify commit was not called
    assert not mock_db_session.commit.called


def test_patch_update_athlete_heat_with_filters(
    test_client: TestClient, mock_db_session: Session, mock_athlete_heat: AthleteHeat
) -> None:
    """Test PATCH /athleteheat/{id} with additional query filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_athlete_heat
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request with additional filters
    athlete_heat_id = str(mock_athlete_heat.id)
    update_data = {"phase_id": "55555555-5555-5555-5555-555555555555"}
    response = test_client.patch(
        f"/athleteheat/{athlete_heat_id}?heat_id____list={str(mock_athlete_heat.heat_id)}",
        json=update_data
    )

    # Verify exact response
    assert response.status_code == 200

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called
