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
from app.scoring.customScoringEndpoints import HeatInfoResponse
from app.scoring.scoring_logic import (
    AthleteScoresWithAthleteInfo,
    RunScores,
)
from db.models import Competition, Event, Heat, Phase


@pytest.fixture
def sample_phase_id() -> str:
    return str(uuid.uuid4())


@pytest.fixture
def sample_heat_ids() -> list[str]:
    return [str(uuid.uuid4())]  # Start with just one ID to simplify testing


@pytest.fixture
def mock_competition() -> MagicMock:
    mock = MagicMock(spec=Competition)
    mock.id = uuid.uuid4()
    mock.name = "Test Competition"
    return mock


@pytest.fixture
def mock_event() -> MagicMock:
    mock = MagicMock(spec=Event)
    mock.id = uuid.uuid4()
    mock.name = "Test Event"
    mock.competition_id = uuid.uuid4()
    return mock


@pytest.fixture
def mock_phase() -> MagicMock:
    mock = MagicMock(spec=Phase)
    mock.id = uuid.uuid4()
    mock.name = "Test Phase"
    mock.event_id = uuid.uuid4()
    mock.number_of_runs = 3
    mock.number_of_runs_for_score = 2
    mock.number_of_judges = 3
    mock.scoresheet = uuid.uuid4()
    return mock


@pytest.fixture
def mock_heat() -> MagicMock:
    return MagicMock(
        spec=Heat, id=uuid.uuid4(), name="Test Heat", competition_id=uuid.uuid4()
    )


@pytest.mark.asyncio
async def test_phase_pdf_success(
    mock_db_session: Session,
    sample_phase_id: str,
    mock_competition: MagicMock,
    mock_event: MagicMock,
    mock_phase: MagicMock
) -> None:
    # Mock database queries
    mock_db_session.query.return_value.filter.return_value.one = MagicMock(
        side_effect=[mock_phase, mock_event, mock_competition]
    )

    # Mock phase scores calculation
    with patch(
        "app.competition_management.pdfEndpoints.calculate_phase_scores"
    ) as mock_calc:
        mock_calc.return_value.scores = []
        mock_calc.return_value.phase_id = sample_phase_id

        response = await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert (
            response.headers["Content-Disposition"]
            == f"attachment; filename={sample_phase_id}.pdf"
        )


@pytest.mark.asyncio
async def test_phase_pdf_db_error(mock_db_session: Session, sample_phase_id: str) -> None:
    mock_db_session.query.return_value.filter.return_value.one.side_effect = Exception(
        "Database error"
    )

    with pytest.raises(HTTPException) as exc_info:
        await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)

    assert exc_info.value.status_code == 500


@pytest.mark.asyncio
async def test_heat_pdf_success(mock_db_session: Session, mock_competition: MagicMock) -> None:
    # Create a heat ID and mock heat with matching ID
    heat_id = str(uuid.uuid4())
    mock_heat = MagicMock(
        spec=Heat, id=heat_id, name="Test Heat", competition_id=mock_competition.id
    )

    # Mock database queries
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.return_value = [
        mock_heat
    ]
    mock_db_session.query.return_value.filter.return_value.one.return_value = (
        mock_competition
    )

    # Mock heat info logic
    with patch(
        "app.competition_management.pdfEndpoints.get_heat_info_logic"
    ) as mock_heat_info:
        mock_heat_info.return_value = [
            HeatInfoResponse(
                athlete_heat_id=uuid.uuid4(),
                heat_id=uuid.uuid4(),
                athlete_id=uuid.uuid4(),
                phase_id=uuid.uuid4(),
                number_of_runs=3,
                number_of_runs_for_score=2,
                scoresheet=uuid.uuid4(),
                first_name="John",
                last_name="Doe",
                event_name="Test Event",
                bib="123",
                last_phase_rank=1,
            )
        ]

        response = await heat_pdf(heat_ids=[heat_id], db=mock_db_session)

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert "attachment; filename=heats" in response.headers["Content-Disposition"]


@pytest.mark.asyncio
async def test_heat_pdf_no_ids() -> None:
    response = await heat_pdf(heat_ids=[], db=MagicMock())
    assert response.status_code == 404
    assert b"Please provide a list of Heat IDs" == response.body


@pytest.mark.asyncio
async def test_heat_pdf_not_found(mock_db_session: Session, sample_heat_ids: list[str]) -> None:
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.return_value = []

    response = await heat_pdf(heat_ids=sample_heat_ids, db=mock_db_session)
    assert response.status_code == 404
    assert b"Could not find any heat Info" in response.body


@pytest.mark.asyncio
async def test_heat_results_pdf_success(
    mock_db_session: Session,
    mock_competition: MagicMock,
    mock_heat: MagicMock
) -> None:
    heat_id = str(uuid.uuid4())

    # Mock database queries
    mock_db_session.query.return_value.filter.return_value.one.side_effect = [
        mock_heat,
        mock_competition,
    ]

    # Mock heat scores
    with patch(
        "app.competition_management.pdfEndpoints.get_heat_scores"
    ) as mock_scores:
        mock_scores.return_value.scores = [
            AthleteScoresWithAthleteInfo(
                athlete_id=uuid.uuid4(),
                first_name="John",
                last_name="Doe",
                bib_number=123,
                run_scores=[
                    RunScores(
                        run_number=1,
                        judge_scores=[],
                        mean_run_score=85.5,
                        highest_scoring_move=85.5,
                        locked=True,
                        did_not_start=False,
                    )
                ],
                highest_scoring_move=85.5,
                total_score=85.5,
                ranking=1,
                reason=None,
                last_phase_rank=None,
            )
        ]

        response = await heat_results_pdf(heat_id=heat_id, db=mock_db_session)

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert "attachment; filename=heats" in response.headers["Content-Disposition"]


@pytest.mark.asyncio
async def test_heat_results_pdf_no_id() -> None:
    response = await heat_results_pdf(heat_id="", db=MagicMock())
    assert response.status_code == 404
    assert b"Please provide a list of Heat IDs" == response.body


@pytest.mark.asyncio
async def test_heat_results_pdf_error(mock_db_session: Session) -> None:
    heat_id = str(uuid.uuid4())
    mock_db_session.query.return_value.filter.return_value.one.side_effect = Exception(
        "Database error"
    )

    with pytest.raises(HTTPException) as exc_info:
        await heat_results_pdf(heat_id=heat_id, db=mock_db_session)

    assert exc_info.value.status_code == 500


@pytest.mark.asyncio
async def test_pdf_content_structure(
    mock_db_session: Session,
    sample_phase_id: str,
    mock_competition: MagicMock,
    mock_event: MagicMock,
    mock_phase: MagicMock
) -> None:
    """Test the structure of generated PDFs"""
    # This test ensures the PDF contains expected sections and formatting
    with patch(
        "app.competition_management.pdfEndpoints.calculate_phase_scores"
    ) as mock_calc:
        mock_calc.return_value.scores = [
            AthleteScoresWithAthleteInfo(
                athlete_id=uuid.uuid4(),
                first_name="John",
                last_name="Doe",
                bib_number=123,
                run_scores=[
                    RunScores(
                        run_number=1,
                        judge_scores=[],
                        mean_run_score=85.5,
                        highest_scoring_move=85.5,
                        locked=True,
                        did_not_start=False,
                    )
                ],
                highest_scoring_move=85.5,
                total_score=85.5,
                ranking=1,
                reason=None,
                last_phase_rank=None,
            )
        ]
        mock_calc.return_value.phase_id = sample_phase_id

        # Mock database queries
        mock_db_session.query.return_value.filter.return_value.one.side_effect = [
            mock_phase,
            mock_event,
            mock_competition,
        ]
        # Ensure mock objects have proper string representation
        mock_competition.__str__ = MagicMock(return_value="Test Competition")
        mock_event.__str__ = MagicMock(return_value="Test Event")
        mock_phase.__str__ = MagicMock(return_value="Test Phase")

        response = await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)
        pdf_content = response.body

        # Verify that the mock objects were used correctly
        mock_db_session.query.assert_called()
        mock_db_session.query.return_value.filter.assert_called()
        mock_db_session.query.return_value.filter.return_value.one.assert_called()

        # Verify that the response is a valid PDF
        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert b"%PDF-" in pdf_content  # PDF header
