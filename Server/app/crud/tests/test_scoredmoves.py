"""
Unit tests for scoredmoves CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""

from unittest.mock import MagicMock

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session


def test_delete_many_scored_moves_by_heat_id(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test DELETE /scoredmoves/ by heat_id"""
    # Mock the database delete execution
    mock_result = MagicMock()
    mock_result.rowcount = 5
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None

    # Make request with heat_id filter
    heat_id = "11111111-1111-1111-1111-111111111111"
    response = test_client.delete(f"/scoredmoves/?heat_id____list={heat_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {"deleted_count": 5}

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1


def test_delete_many_scored_moves_by_athlete_id(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test DELETE /scoredmoves/ by athlete_id"""
    # Mock the database delete execution
    mock_result = MagicMock()
    mock_result.rowcount = 3
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None

    # Make request with athlete_id filter
    athlete_id = "22222222-2222-2222-2222-222222222222"
    response = test_client.delete(f"/scoredmoves/?athlete_id____list={athlete_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {"deleted_count": 3}

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called


def test_delete_many_scored_moves_by_both_filters(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test DELETE /scoredmoves/ with both heat_id and athlete_id"""
    # Mock the database delete execution
    mock_result = MagicMock()
    mock_result.rowcount = 1
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None

    # Make request with both filters
    heat_id = "11111111-1111-1111-1111-111111111111"
    athlete_id = "22222222-2222-2222-2222-222222222222"
    response = test_client.delete(
        f"/scoredmoves/?heat_id____list={heat_id}&athlete_id____list={athlete_id}"
    )

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {"deleted_count": 1}

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called


def test_delete_many_scored_moves_multiple_heat_ids(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test DELETE /scoredmoves/ with multiple heat_ids"""
    # Mock the database delete execution
    mock_result = MagicMock()
    mock_result.rowcount = 10
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None

    # Make request with multiple heat_id values
    heat_id_1 = "11111111-1111-1111-1111-111111111111"
    heat_id_2 = "33333333-3333-3333-3333-333333333333"
    response = test_client.delete(
        f"/scoredmoves/?heat_id____list={heat_id_1}&heat_id____list={heat_id_2}"
    )

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {"deleted_count": 10}

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called


def test_delete_many_scored_moves_no_filters_error(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test DELETE /scoredmoves/ without filters returns 400 error"""
    # Make request without any filters
    response = test_client.delete("/scoredmoves/")

    # Verify exact error response
    assert response.status_code == 400
    data = response.json()
    assert (
        data["detail"]
        == "At least one filter (heat_id____list or athlete_id____list) must be provided"
    )

    # Verify database operations were NOT called
    assert not mock_db_session.execute.called
    assert not mock_db_session.commit.called


def test_delete_many_scored_moves_zero_deleted(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test DELETE /scoredmoves/ when no records match"""
    # Mock the database delete execution with zero deletions
    mock_result = MagicMock()
    mock_result.rowcount = 0
    mock_db_session.execute.return_value = mock_result
    mock_db_session.commit.return_value = None

    # Make request
    heat_id = "99999999-9999-9999-9999-999999999999"
    response = test_client.delete(f"/scoredmoves/?heat_id____list={heat_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {"deleted_count": 0}

    # Verify database operations were called
    assert mock_db_session.execute.called
    assert mock_db_session.commit.called
