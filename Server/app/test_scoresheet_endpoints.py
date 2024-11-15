import uuid
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app  # Assuming your FastAPI app is in a file named main.py
from db.models import Base, AvailableMoves, AvailableBonuses
from db.client import get_transaction_session

# Setup test database
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/testdb"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override the dependency
def override_get_transaction_session():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_transaction_session] = override_get_transaction_session

client = TestClient(app)

def setup_module(module):
    Base.metadata.create_all(bind=engine)

def teardown_module(module):
    Base.metadata.drop_all(bind=engine)

def test_add_update_scoresheet_new():
    scoresheet_id = str(uuid.uuid4())
    payload = {
        "moves": [
            {
                "id": str(uuid.uuid4()),
                "sheet_id": scoresheet_id,
                "name": "Move 1",
                "fl_score": 5,
                "rb_score": 3,
                "direction": "LR"
            }
        ],
        "bonuses": [
            {
                "id": str(uuid.uuid4()),
                "sheet_id": scoresheet_id,
                "move_id": str(uuid.uuid4()),
                "name": "Bonus 1",
                "score": 2
            }
        ]
    }

    response = client.post(f"/addUpdateScoresheet/{scoresheet_id}", json=payload)
    assert response.status_code == 200

    # Verify data in the database
    with TestingSessionLocal() as session:
        moves = session.query(AvailableMoves).filter(AvailableMoves.sheet_id == scoresheet_id).all()
        bonuses = session.query(AvailableBonuses).filter(AvailableBonuses.sheet_id == scoresheet_id).all()

        assert len(moves) == 1
        assert moves[0].name == "Move 1"
        assert len(bonuses) == 1
        assert bonuses[0].name == "Bonus 1"

def test_add_update_scoresheet_existing():
    scoresheet_id = str(uuid.uuid4())
    
    # First, add some initial data
    initial_payload = {
        "moves": [
            {
                "id": str(uuid.uuid4()),
                "sheet_id": scoresheet_id,
                "name": "Initial Move",
                "fl_score": 5,
                "rb_score": 3,
                "direction": "LR"
            }
        ],
        "bonuses": [
            {
                "id": str(uuid.uuid4()),
                "sheet_id": scoresheet_id,
                "move_id": str(uuid.uuid4()),
                "name": "Initial Bonus",
                "score": 2
            }
        ]
    }
    client.post(f"/addUpdateScoresheet/{scoresheet_id}", json=initial_payload)

    # Now update with new data
    update_payload = {
        "moves": [
            {
                "id": str(uuid.uuid4()),
                "sheet_id": scoresheet_id,
                "name": "Updated Move",
                "fl_score": 7,
                "rb_score": 4,
                "direction": "FB"
            }
        ],
        "bonuses": [
            {
                "id": str(uuid.uuid4()),
                "sheet_id": scoresheet_id,
                "move_id": str(uuid.uuid4()),
                "name": "Updated Bonus",
                "score": 3
            }
        ]
    }

    response = client.post(f"/addUpdateScoresheet/{scoresheet_id}", json=update_payload)
    assert response.status_code == 200

    # Verify updated data in the database
    with TestingSessionLocal() as session:
        moves = session.query(AvailableMoves).filter(AvailableMoves.sheet_id == scoresheet_id).all()
        bonuses = session.query(AvailableBonuses).filter(AvailableBonuses.sheet_id == scoresheet_id).all()

        assert len(moves) == 1
        assert moves[0].name == "Updated Move"
        assert len(bonuses) == 1
        assert bonuses[0].name == "Updated Bonus"

def test_add_update_scoresheet_empty():
    scoresheet_id = str(uuid.uuid4())
    payload = {
        "moves": [],
        "bonuses": []
    }

    response = client.post(f"/addUpdateScoresheet/{scoresheet_id}", json=payload)
    assert response.status_code == 200

    # Verify no data in the database
    with TestingSessionLocal() as session:
        moves = session.query(AvailableMoves).filter(AvailableMoves.sheet_id == scoresheet_id).all()
        bonuses = session.query(AvailableBonuses).filter(AvailableBonuses.sheet_id == scoresheet_id).all()

        assert len(moves) == 0
        assert len(bonuses) == 0

def test_add_update_scoresheet_invalid_data():
    scoresheet_id = str(uuid.uuid4())
    payload = {
        "moves": [
            {
                "id": str(uuid.uuid4()),
                "sheet_id": scoresheet_id,
                "name": "Invalid Move",
                "fl_score": 5,
                "rb_score": 3,
                "direction": "INVALID"  # Invalid direction
            }
        ],
        "bonuses": []
    }

    response = client.post(f"/addUpdateScoresheet/{scoresheet_id}", json=payload)
    assert response.status_code == 422  # Unprocessable Entity

def test_add_update_scoresheet_nonexistent_id():
    non_existent_id = str(uuid.uuid4())
    payload = {
        "moves": [],
        "bonuses": []
    }

    response = client.post(f"/addUpdateScoresheet/{non_existent_id}", json=payload)
    assert response.status_code == 200  # Should still succeed as it's creating new entries

    # Verify no data in the database
    with TestingSessionLocal() as session:
        moves = session.query(AvailableMoves).filter(AvailableMoves.sheet_id == non_existent_id).all()
        bonuses = session.query(AvailableBonuses).filter(AvailableBonuses.sheet_id == non_existent_id).all()

        assert len(moves) == 0
        assert len(bonuses) == 0