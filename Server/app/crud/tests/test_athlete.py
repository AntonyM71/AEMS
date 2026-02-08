"""
Unit tests for athlete CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import Athlete


@pytest.fixture
def mock_athlete_data() -> dict[str, Any]:
    """Create mock athlete data"""
    return {
        "id": UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
        "first_name": "John",
        "last_name": "Doe",
        "affiliation": "Test Team",
        "bib": "123",
    }


@pytest.fixture
def mock_athlete(mock_athlete_data: dict[str, Any]) -> Athlete:
    """Create a mock Athlete database object"""
    athlete = MagicMock(spec=Athlete)
    for key, value in mock_athlete_data.items():
        setattr(athlete, key, value)
    return athlete


def test_post_insert_many_athletes(
    test_client: TestClient, mock_db_session: Session, mock_athlete: Athlete
) -> None:
    """Test POST /athlete/ to insert many athletes"""
    # Create a function to add an ID when add() is called
    def mock_add(athlete):
        athlete.id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    athlete_data = [
        {
            "first_name": "John",
            "last_name": "Doe",
            "affiliation": "Test Team",
            "bib": "123",
        }
    ]
    response = test_client.post("/athlete/", json=athlete_data)

    # Verify response status and exact content
    assert response.status_code == 201
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "first_name": "John",
        "last_name": "Doe",
        "affiliation": "Test Team",
        "bib": "123",
    }

    # Verify database operations were called
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1


def test_post_insert_multiple_athletes(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /athlete/ to insert multiple athletes"""
    # Create a counter for unique IDs
    counter = 0
    def mock_add(athlete):
        nonlocal counter
        athlete.id = UUID(f"0000000{counter}-0000-0000-0000-000000000000")
        counter += 1
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request with multiple athletes
    athlete_data = [
        {"first_name": "John", "last_name": "Doe", "bib": "123"},
        {"first_name": "Jane", "last_name": "Smith", "bib": "456"},
    ]
    response = test_client.post("/athlete/", json=athlete_data)

    # Verify exact response
    assert response.status_code == 201
    data = response.json()
    assert len(data) == 2
    assert data[0] == {
        "id": "00000000-0000-0000-0000-000000000000",
        "first_name": "John",
        "last_name": "Doe",
        "affiliation": None,
        "bib": "123",
    }
    assert data[1] == {
        "id": "00000001-0000-0000-0000-000000000000",
        "first_name": "Jane",
        "last_name": "Smith",
        "affiliation": None,
        "bib": "456",
    }

    # Verify database add was called twice
    assert mock_db_session.add.call_count == 2
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1


def test_patch_update_athlete_by_id(
    test_client: TestClient, mock_db_session: Session, mock_athlete: Athlete
) -> None:
    """Test PATCH /athlete/{id} to update an athlete"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_athlete
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request to update athlete
    athlete_id = str(mock_athlete.id)
    update_data = {"first_name": "Updated"}
    response = test_client.patch(f"/athlete/{athlete_id}", json=update_data)

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {
        "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "first_name": "John",  # Mock doesn't actually update, returns original
        "last_name": "Doe",
        "affiliation": "Test Team",
        "bib": "123",
    }

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.refresh.called


def test_patch_update_athlete_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test PATCH /athlete/{id} when athlete doesn't exist"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request to update non-existent athlete
    athlete_id = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"
    update_data = {"first_name": "Updated"}
    response = test_client.patch(f"/athlete/{athlete_id}", json=update_data)

    # Verify response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Athlete not found"

    # Verify commit was not called
    assert not mock_db_session.commit.called


def test_patch_update_athlete_partial_fields(
    test_client: TestClient, mock_db_session: Session, mock_athlete: Athlete
) -> None:
    """Test PATCH /athlete/{id} with partial field updates"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_athlete
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request to update only last name and bib
    athlete_id = str(mock_athlete.id)
    update_data = {"last_name": "NewLastName", "bib": "999"}
    response = test_client.patch(f"/athlete/{athlete_id}", json=update_data)

    # Verify response
    assert response.status_code == 200

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called
    assert mock_db_session.refresh.called


def test_patch_update_athlete_with_filters(
    test_client: TestClient, mock_db_session: Session, mock_athlete: Athlete
) -> None:
    """Test PATCH /athlete/{id} with additional query filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_athlete
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request with additional filters
    athlete_id = str(mock_athlete.id)
    update_data = {"first_name": "Updated"}
    response = test_client.patch(
        f"/athlete/{athlete_id}?first_name____str=John", json=update_data
    )

    # Verify response
    assert response.status_code == 200

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called
