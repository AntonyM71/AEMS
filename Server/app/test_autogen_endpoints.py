import pytest
from fastapi.testclient import TestClient
from main import app  # Assuming your FastAPI app is in a file named main.py

client = TestClient(app)

@pytest.fixture
def sample_competition():
    return {"name": "Sample Competition", "date": "2023-07-01"}

@pytest.fixture
def sample_event():
    return {"name": "Sample Event", "competition_id": 1}

@pytest.fixture
def sample_phase():
    return {"name": "Sample Phase", "event_id": 1}

@pytest.fixture
def sample_heat():
    return {"name": "Sample Heat", "phase_id": 1}

@pytest.fixture
def sample_athlete():
    return {"name": "John Doe", "country": "USA"}

@pytest.fixture
def sample_scoresheet():
    return {"heat_id": 1, "athlete_id": 1, "total_score": 85.5}

@pytest.fixture
def sample_availablemoves():
    return {"name": "Sample Move", "points": 10}

@pytest.fixture
def sample_availablebonuses():
    return {"name": "Sample Bonus", "points": 5}

@pytest.fixture
def sample_scoredmoves():
    return {"scoresheet_id": 1, "availablemoves_id": 1}

@pytest.fixture
def sample_scoredbonuses():
    return {"scoresheet_id": 1, "availablebonuses_id": 1}

@pytest.fixture
def sample_athleteheat():
    return {"athlete_id": 1, "heat_id": 1}

def test_crud_operations(sample_data, endpoint):
    # Create
    response = client.post(f"/{endpoint}", json=sample_data)
    assert response.status_code == 201
    created_id = response.json()["id"]

    # Read
    response = client.get(f"/{endpoint}/{created_id}")
    assert response.status_code == 200
    assert response.json()["id"] == created_id

    # Update
    updated_data = {**sample_data, "name": f"Updated {sample_data['name']}"}
    response = client.put(f"/{endpoint}/{created_id}", json=updated_data)
    assert response.status_code == 200
    assert response.json()["name"] == updated_data["name"]

    # Delete
    response = client.delete(f"/{endpoint}/{created_id}")
    assert response.status_code == 200

    # Verify deletion
    response = client.get(f"/{endpoint}/{created_id}")
    assert response.status_code == 404

def test_competition_crud(sample_competition):
    test_crud_operations(sample_competition, "competition")

def test_event_crud(sample_event):
    test_crud_operations(sample_event, "event")

def test_phase_crud(sample_phase):
    test_crud_operations(sample_phase, "phase")

def test_heat_crud(sample_heat):
    test_crud_operations(sample_heat, "heat")

def test_athlete_crud(sample_athlete):
    test_crud_operations(sample_athlete, "athlete")

def test_scoresheet_crud(sample_scoresheet):
    test_crud_operations(sample_scoresheet, "scoresheet")

def test_availablemoves_crud(sample_availablemoves):
    test_crud_operations(sample_availablemoves, "availablemoves")

def test_availablebonuses_crud(sample_availablebonuses):
    test_crud_operations(sample_availablebonuses, "availablebonuses")

def test_scoredmoves_crud(sample_scoredmoves):
    test_crud_operations(sample_scoredmoves, "scoredmoves")

def test_scoredbonuses_crud(sample_scoredbonuses):
    test_crud_operations(sample_scoredbonuses, "scoredbonuses")

def test_athleteheat_crud(sample_athleteheat):
    test_crud_operations(sample_athleteheat, "athleteheat")