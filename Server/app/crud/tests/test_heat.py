"""
Unit tests for heat CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""
from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import Heat


@pytest.fixture
def mock_heat_data() -> dict[str, Any]:
    """Create mock heat data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "competition_id": UUID("22222222-2222-2222-2222-222222222222"),
        "name": "Heat 1",
    }


@pytest.fixture
def mock_heat(mock_heat_data: dict[str, Any]) -> Heat:
    """Create a mock Heat database object"""
    heat = MagicMock(spec=Heat)
    for key, value in mock_heat_data.items():
        setattr(heat, key, value)
    # Mock the competition and athletes relationships
    heat.competition = None
    heat.athletes = []
    return heat


def test_get_many_heats_no_filters(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ without filters returns all heats"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/heat/")

    # Verify exact response
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/json"
    
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "11111111-1111-1111-1111-111111111111",
        "competition_id": "22222222-2222-2222-2222-222222222222",
        "name": "Heat 1",
    }

    # Verify database calls
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1


def test_get_many_heats_with_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    filter_id = str(mock_heat.id)
    response = test_client.get(f"/heat/?id____list={filter_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == filter_id

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the query contains the id filter with the correct value
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "WHERE" in query_str
    assert ".id IN" in query_str
    # Verify the actual UUID is in the query
    assert filter_id in query_str or filter_id.replace("-", "") in query_str


def test_get_many_heats_with_competition_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ with competition_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request with competition_id filter
    filter_competition_id = str(mock_heat.competition_id)
    response = test_client.get(f"/heat/?competition_id____list={filter_competition_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["competition_id"] == filter_competition_id

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the query contains competition_id filter with correct value
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "competition_id IN" in query_str
    # Verify the actual UUID is in the query
    assert filter_competition_id in query_str or filter_competition_id.replace("-", "") in query_str


def test_get_many_heats_with_name_str_filter(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ with name____str filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request with name____str filter
    filter_name = mock_heat.name
    response = test_client.get(f"/heat/?name____str={filter_name}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == filter_name

    # Verify database calls
    assert mock_db_session.execute.called
    
    # Verify the query contains name filter with correct value
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    query_str = str(query)
    assert "name IN" in query_str
    # Verify the actual name is in the query
    assert filter_name in query_str


def test_get_many_heats_with_name_list_filter(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ with name____list filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request with name____list filter
    response = test_client.get("/heat/?name____list=Heat 1&name____list=Heat 2")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Heat 1"

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_many_heats_with_pagination(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ with pagination"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/heat/?limit=10&offset=0")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_many_heats_with_ordering_name_asc(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ with name ascending order"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/heat/?order_by_columns=name_asc")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_many_heats_with_ordering_name_desc(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/ with name descending order"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_heat]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get("/heat/?order_by_columns=name_desc")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_many_heats_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /heat/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/heat/")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == []

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_one_heat_by_id(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/{id} returns specific heat"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_heat
    mock_db_session.execute.return_value = mock_result

    # Make request
    heat_id = str(mock_heat.id)
    response = test_client.get(f"/heat/{heat_id}")

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data == {
        "id": "11111111-1111-1111-1111-111111111111",
        "competition_id": "22222222-2222-2222-2222-222222222222",
        "name": "Heat 1",
    }

    # Verify database calls
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1


def test_get_one_heat_by_id_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /heat/{id} returns 404 when heat not found"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request
    heat_id = "99999999-9999-9999-9999-999999999999"
    response = test_client.get(f"/heat/{heat_id}")

    # Verify exact response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Heat not found"

    # Verify database calls
    assert mock_db_session.execute.called


def test_get_one_heat_with_filters(
    test_client: TestClient, mock_db_session: Session, mock_heat: Heat
) -> None:
    """Test GET /heat/{id} with additional filters"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_heat
    mock_db_session.execute.return_value = mock_result

    # Make request with additional filters
    heat_id = str(mock_heat.id)
    response = test_client.get(
        f"/heat/{heat_id}?competition_id____list={str(mock_heat.competition_id)}"
    )

    # Verify exact response
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == heat_id

    # Verify database calls
    assert mock_db_session.execute.called


def test_post_insert_many_heats(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /heat/ to insert many heats"""
    # Create a function to add an ID when add() is called
    def mock_add(heat):
        heat.id = UUID("33333333-3333-3333-3333-333333333333")
        return None
    
    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    heat_data = [
        {
            "competition_id": "22222222-2222-2222-2222-222222222222",
            "name": "New Heat",
        }
    ]
    response = test_client.post("/heat/", json=heat_data)

    # Verify exact response
    assert response.status_code == 201
    data = response.json()
    assert len(data) == 1
    assert data[0] == {
        "id": "33333333-3333-3333-3333-333333333333",
        "competition_id": "22222222-2222-2222-2222-222222222222",
        "name": "New Heat",
    }

    # Verify database operations were called
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1
    
    # Verify the add() was called with Heat object with ALL correct attributes
    add_call_args = mock_db_session.add.call_args
    added_heat = add_call_args[0][0]
    assert str(added_heat.competition_id) == "22222222-2222-2222-2222-222222222222"
    assert added_heat.name == "New Heat"
