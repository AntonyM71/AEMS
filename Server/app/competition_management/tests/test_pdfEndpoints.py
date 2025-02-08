import os
import uuid
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.competition_management.pdfEndpoints import (
    heat_pdf,
    heat_results_pdf,
    phase_pdf,
)
from db.models import Competition, Event, Heat, Phase

# Set test environment
os.environ["CONNECTION_STRING"] = "postgresql://test:test@localhost:5432/test_db"


@pytest.fixture(autouse=True)
def mock_db_session():
    """Mock database session for all tests"""
    with patch("app.competition_management.pdfEndpoints.get_transaction_session") as mock_session:
        db = MagicMock(spec=Session)
        mock_session.return_value.__enter__.return_value = db
        mock_session.return_value.__exit__.return_value = None
        yield db


@pytest.fixture
def sample_phase_id():
    return str(uuid.uuid4())


@pytest.fixture
def sample_heat_ids():
    return [str(uuid.uuid4()) for _ in range(2)]


@pytest.fixture
def mock_competition():
    return MagicMock(
        spec=Competition,
        id=uuid.uuid4(),
        name="Test Competition"
    )


@pytest.fixture
def mock_event():
    return MagicMock(
        spec=Event,
        id=uuid.uuid4(),
        name="Test Event",
        competition_id=uuid.uuid4()
    )


@pytest.fixture
def mock_phase():
    return MagicMock(
        spec=Phase,
        id=uuid.uuid4(),
        name="Test Phase",
        event_id=uuid.uuid4(),
        number_of_runs=3,
        number_of_runs_for_score=2,
        number_of_judges=3,
        scoresheet=uuid.uuid4()
    )


@pytest.fixture
def mock_heat():
    return MagicMock(
        spec=Heat,
        id=uuid.uuid4(),
        name="Test Heat",
        competition_id=uuid.uuid4()
    )


@pytest.mark.asyncio
async def test_phase_pdf_success(mock_db_session, sample_phase_id, mock_competition, mock_event, mock_phase):
    # Mock database queries
    mock_db_session.query.return_value.filter.return_value.one.side_effect = [
        mock_phase,
        mock_event,
        mock_competition,
    ]

    # Mock phase scores calculation
    with patch("app.competition_management.pdfEndpoints.calculate_phase_scores") as mock_calc:
        mock_calc.return_value.scores = []
        mock_calc.return_value.phase_id = sample_phase_id

        response = await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert response.headers["Content-Disposition"] == f"attachment; filename={sample_phase_id}.pdf"


@pytest.mark.asyncio
async def test_phase_pdf_db_error(mock_db_session, sample_phase_id):
    mock_db_session.query.return_value.filter.return_value.one.side_effect = Exception("Database error")

    with pytest.raises(HTTPException) as exc_info:
        await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)

    assert exc_info.value.status_code == 500


@pytest.mark.asyncio
async def test_heat_pdf_success(mock_db_session, sample_heat_ids, mock_competition, mock_heat):
    # Mock database queries
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.return_value = [mock_heat]
    mock_db_session.query.return_value.filter.return_value.one.return_value = mock_competition

    # Mock heat info logic
    with patch("app.competition_management.pdfEndpoints.get_heat_info_logic") as mock_heat_info:
        mock_heat_info.return_value = [{
            "first_name": "John",
            "last_name": "Doe",
            "event_name": "Test Event",
            "bib": "123",
            "last_phase_rank": 1
        }]

        response = await heat_pdf(heat_ids=sample_heat_ids, db=mock_db_session)

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert "attachment; filename=heats" in response.headers["Content-Disposition"]


@pytest.mark.asyncio
async def test_heat_pdf_no_ids():
    response = await heat_pdf(heat_ids=[], db=MagicMock())
    assert response.status_code == 404
    assert b"Please provide a list of Heat IDs" == response.body


@pytest.mark.asyncio
async def test_heat_pdf_not_found(mock_db_session, sample_heat_ids):
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.return_value = []

    response = await heat_pdf(heat_ids=sample_heat_ids, db=mock_db_session)
    assert response.status_code == 404
    assert b"Could not find any heat Info" in response.body


@pytest.mark.asyncio
async def test_heat_results_pdf_success(mock_db_session, mock_competition, mock_heat):
    heat_id = str(uuid.uuid4())

    # Mock database queries
    mock_db_session.query.return_value.filter.return_value.one.side_effect = [
        mock_heat,
        mock_competition
    ]

    # Mock heat scores
    with patch("app.competition_management.pdfEndpoints.get_heat_scores") as mock_scores:
        mock_scores.return_value.scores = [{
            "first_name": "John",
            "last_name": "Doe",
            "bib_number": "123",
            "run_scores": [{
                "locked": True,
                "did_not_start": False,
                "mean_run_score": 85.5
            }]
        }]

        response = await heat_results_pdf(heat_id=heat_id, db=mock_db_session)

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert "attachment; filename=heats" in response.headers["Content-Disposition"]


@pytest.mark.asyncio
async def test_heat_results_pdf_no_id():
    response = await heat_results_pdf(heat_id="", db=MagicMock())
    assert response.status_code == 404
    assert b"Please provide a list of Heat IDs" == response.body


@pytest.mark.asyncio
async def test_heat_results_pdf_error(mock_db_session):
    heat_id = str(uuid.uuid4())
    mock_db_session.query.return_value.filter.return_value.one.side_effect = Exception("Database error")

    with pytest.raises(HTTPException) as exc_info:
        await heat_results_pdf(heat_id=heat_id, db=mock_db_session)

    assert exc_info.value.status_code == 500


@pytest.mark.asyncio
async def test_pdf_content_structure(mock_db_session, sample_phase_id, mock_competition, mock_event, mock_phase):
    """Test the structure of generated PDFs"""
    # This test ensures the PDF contains expected sections and formatting
    with patch("app.competition_management.pdfEndpoints.calculate_phase_scores") as mock_calc:
        mock_calc.return_value.scores = [{
            "ranking": 1,
            "first_name": "John",
            "last_name": "Doe",
            "bib_number": 123,
            "run_scores": [{
                "locked": True,
                "did_not_start": False,
                "mean_run_score": 85.5
            }],
            "total_score": 85.5,
            "reason": None
        }]
        mock_calc.return_value.phase_id = sample_phase_id

        # Mock database queries
        mock_db_session.query.return_value.filter.return_value.one.side_effect = [
            mock_phase,
            mock_event,
            mock_competition,
        ]

        response = await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)
        pdf_content = response.body

        # Basic PDF structure checks
        assert b"%PDF-" in pdf_content  # PDF header
        assert b"Test Competition" in pdf_content  # Competition name
        assert b"Test Event" in pdf_content  # Event name
        assert b"Test Phase" in pdf_content  # Phase name
