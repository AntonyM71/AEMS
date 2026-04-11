import uuid
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.competition_management.pdfEndpoints import (
    heat_pdf,
    heat_results_pdf,
    phase_pdf,
    sanitize_filename,
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
    mock_phase: MagicMock,
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

        assert response.status_code == 200, (
            f"phase_pdf should return HTTP 200, got {response.status_code}"
        )
        assert response.media_type == "application/pdf", (
            f"phase_pdf should return application/pdf, got {response.media_type}"
        )
        expected_filename = "Test_Competition_Test_Event_Test_Phase.pdf"
        assert (
            response.headers["Content-Disposition"]
            == f"attachment; filename={expected_filename}"
        ), (
            f"Content-Disposition should be 'attachment; filename={expected_filename}', "
            f"got {response.headers['Content-Disposition']!r}"
        )


@pytest.mark.asyncio
async def test_phase_pdf_db_error(
    mock_db_session: Session, sample_phase_id: str
) -> None:
    mock_db_session.query.return_value.filter.return_value.one.side_effect = Exception(
        "Database error"
    )

    with pytest.raises(HTTPException) as exc_info:
        await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)

    assert exc_info.value.status_code == 500, (
        f"phase_pdf DB error should raise HTTP 500, got {exc_info.value.status_code}"
    )


@pytest.mark.asyncio
async def test_heat_pdf_success(
    mock_db_session: Session, mock_competition: MagicMock
) -> None:
    # Create a heat ID and mock heat with matching ID
    heat_id = str(uuid.uuid4())
    mock_heat = MagicMock(spec=Heat)
    mock_heat.id = heat_id
    mock_heat.name = "Test Heat"
    mock_heat.competition_id = mock_competition.id

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

        assert response.status_code == 200, (
            f"heat_pdf should return HTTP 200, got {response.status_code}"
        )
        assert response.media_type == "application/pdf", (
            f"heat_pdf should return application/pdf, got {response.media_type}"
        )
        expected_filename = "Test_Competition_Test_Heat.pdf"
        assert (
            response.headers["Content-Disposition"]
            == f"attachment; filename={expected_filename}"
        ), (
            f"Content-Disposition should be 'attachment; filename={expected_filename}', "
            f"got {response.headers['Content-Disposition']!r}"
        )


@pytest.mark.asyncio
async def test_heat_pdf_no_ids() -> None:
    response = await heat_pdf(heat_ids=[], db=MagicMock())
    assert response.status_code == 404, (
        f"heat_pdf with no IDs should return HTTP 404, got {response.status_code}"
    )
    assert b"Please provide a list of Heat IDs" == response.body, (
        f"heat_pdf with no IDs should explain the error, got {response.body!r}"
    )


@pytest.mark.asyncio
async def test_heat_pdf_not_found(
    mock_db_session: Session, sample_heat_ids: list[str]
) -> None:
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.return_value = []

    response = await heat_pdf(heat_ids=sample_heat_ids, db=mock_db_session)
    assert response.status_code == 404, (
        f"heat_pdf with unknown IDs should return HTTP 404, got {response.status_code}"
    )
    assert b"Could not find any heat Info" in response.body, (
        f"heat_pdf with unknown IDs should describe the error, got {response.body!r}"
    )


@pytest.mark.asyncio
async def test_heat_pdf_multiple_heats(
    mock_db_session: Session, mock_competition: MagicMock
) -> None:
    """Test heat PDF with multiple heats uses count-based filename"""
    # Create multiple heat IDs and mock heats
    heat_ids = [str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4())]
    mock_heats = []
    for i, heat_id in enumerate(heat_ids):
        mock_heat = MagicMock(spec=Heat)
        mock_heat.id = heat_id
        mock_heat.name = f"Heat {i + 1}"
        mock_heat.competition_id = mock_competition.id
        mock_heats.append(mock_heat)

    # Mock database queries
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.return_value = mock_heats
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

        response = await heat_pdf(heat_ids=heat_ids, db=mock_db_session)

        assert response.status_code == 200, (
            f"heat_pdf with multiple heats should return HTTP 200, got {response.status_code}"
        )
        assert response.media_type == "application/pdf", (
            f"heat_pdf should return application/pdf, got {response.media_type}"
        )
        expected_filename = "Test_Competition_3_Heats.pdf"
        assert (
            response.headers["Content-Disposition"]
            == f"attachment; filename={expected_filename}"
        ), (
            f"3-heat PDF should use count-based filename '{expected_filename}', "
            f"got {response.headers['Content-Disposition']!r}"
        )


@pytest.mark.asyncio
async def test_heat_results_pdf_success(
    mock_db_session: Session, mock_competition: MagicMock, mock_heat: MagicMock
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

        assert response.status_code == 200, (
            f"heat_results_pdf should return HTTP 200, got {response.status_code}"
        )
        assert response.media_type == "application/pdf", (
            f"heat_results_pdf should return application/pdf, got {response.media_type}"
        )
        assert "Test_Heat" in response.headers["Content-Disposition"], (
            f"Content-Disposition should include the heat name 'Test_Heat', "
            f"got {response.headers['Content-Disposition']!r}"
        )
        assert "results.pdf" in response.headers["Content-Disposition"], (
            f"Content-Disposition should include 'results.pdf', "
            f"got {response.headers['Content-Disposition']!r}"
        )


@pytest.mark.asyncio
async def test_heat_results_pdf_no_id() -> None:
    response = await heat_results_pdf(heat_id="", db=MagicMock())
    assert response.status_code == 404, (
        f"heat_results_pdf with no ID should return HTTP 404, got {response.status_code}"
    )
    assert b"Please provide a list of Heat IDs" == response.body, (
        f"heat_results_pdf with no ID should explain the error, got {response.body!r}"
    )


@pytest.mark.asyncio
async def test_heat_results_pdf_error(mock_db_session: Session) -> None:
    heat_id = str(uuid.uuid4())
    mock_db_session.query.return_value.filter.return_value.one.side_effect = Exception(
        "Database error"
    )

    with pytest.raises(HTTPException) as exc_info:
        await heat_results_pdf(heat_id=heat_id, db=mock_db_session)

    assert exc_info.value.status_code == 500, (
        f"heat_results_pdf DB error should raise HTTP 500, got {exc_info.value.status_code}"
    )


@pytest.mark.asyncio
async def test_pdf_content_structure(
    mock_db_session: Session,
    sample_phase_id: str,
    mock_competition: MagicMock,
    mock_event: MagicMock,
    mock_phase: MagicMock,
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

        assert response.status_code == 200, (
            f"phase_pdf should return HTTP 200, got {response.status_code}"
        )
        assert response.media_type == "application/pdf", (
            f"phase_pdf should return application/pdf, got {response.media_type}"
        )
        assert b"%PDF-" in pdf_content, (
            "Response body should start with the PDF magic number (%PDF-)"
        )


def test_sanitize_filename() -> None:
    """Test filename sanitization with various inputs"""
    assert sanitize_filename("Test Competition Name") == "Test_Competition_Name", (
        'Spaces should be converted to underscores: "Test Competition Name" -> "Test_Competition_Name"'
    )

    assert sanitize_filename("Test<>Competition") == "Test__Competition", (
        'Angle brackets should be replaced with underscores: "Test<>Competition" -> "Test__Competition"'
    )
    assert sanitize_filename('Test"File/Name') == "Test_File_Name", (
        'Quotes and slashes should be replaced with underscores: \'Test"File/Name\' -> "Test_File_Name"'
    )
    assert sanitize_filename("Test:File|Name") == "Test_File_Name", (
        'Colons and pipes should be replaced with underscores: "Test:File|Name" -> "Test_File_Name"'
    )

    assert sanitize_filename("Test<>:/\\|?*File") == "Test________File", (
        'All invalid characters should each become an underscore: "Test<>:/\\|?*File" -> "Test________File"'
    )

    assert sanitize_filename("  Test File  ") == "Test_File", (
        'Leading/trailing spaces should be stripped: "  Test File  " -> "Test_File"'
    )
    assert sanitize_filename("...Test File...") == "Test_File", (
        'Leading/trailing dots should be stripped: "...Test File..." -> "Test_File"'
    )

    assert sanitize_filename("Test Event 2024 - Phase 1") == "Test_Event_2024_-_Phase_1", (
        'Hyphens and digits should be preserved: "Test Event 2024 - Phase 1" -> "Test_Event_2024_-_Phase_1"'
    )

    assert sanitize_filename("Test\r\nFile") == "TestFile", (
        r'CR+LF should be stripped (header injection prevention): "Test\r\nFile" -> "TestFile"'
    )
    assert sanitize_filename("Test\nFile") == "TestFile", (
        r'LF should be stripped: "Test\nFile" -> "TestFile"'
    )
    assert sanitize_filename("Test\rFile") == "TestFile", (
        r'CR should be stripped: "Test\rFile" -> "TestFile"'
    )
    assert sanitize_filename("Test\x00File") == "TestFile", (
        r'NUL (0x00) should be stripped: "Test\x00File" -> "TestFile"'
    )
    assert sanitize_filename("Test\x1fFile") == "TestFile", (
        r'Control char 0x1F should be stripped: "Test\x1fFile" -> "TestFile"'
    )
    assert sanitize_filename("Test\x7fFile") == "TestFile", (
        r'DEL (0x7F) should be stripped: "Test\x7fFile" -> "TestFile"'
    )
    assert (
        sanitize_filename("Valid\r\nContent-Type: text/html\r\nName")
        == "ValidContent-Type__text_htmlName"
    ), (
        "CR/LF header-injection payload should have control chars stripped and "
        "remaining special chars replaced with underscores"
    )

    assert sanitize_filename("Test;Filename") == "Test_Filename", (
        'Semicolon (Content-Disposition parameter separator) should become underscore: '
        '"Test;Filename" -> "Test_Filename"'
    )
    assert sanitize_filename("heat; type=injection") == "heat__type=injection", (
        'Semicolons and surrounding spaces should become underscores: '
        '"heat; type=injection" -> "heat__type=injection"'
    )
    assert sanitize_filename("Test,Filename") == "Test_Filename", (
        'Comma (HTTP header-value separator) should become underscore: '
        '"Test,Filename" -> "Test_Filename"'
    )
    assert sanitize_filename("CompA,CompB") == "CompA_CompB", (
        'Comma between competition names should become underscore: '
        '"CompA,CompB" -> "CompA_CompB"'
    )
    assert sanitize_filename("heat;a,b") == "heat_a_b", (
        'Both semicolon and comma should become underscores: "heat;a,b" -> "heat_a_b"'
    )


@pytest.mark.asyncio
async def test_phase_pdf_dns_athlete(
    mock_db_session: Session,
    sample_phase_id: str,
    mock_competition: MagicMock,
    mock_event: MagicMock,
    mock_phase: MagicMock,
) -> None:
    """Test that a DNS athlete's data is passed to build_phase_pdf_content"""
    mock_db_session.query.return_value.filter.return_value.one = MagicMock(
        side_effect=[mock_phase, mock_event, mock_competition]
    )

    dns_athlete = AthleteScoresWithAthleteInfo(
        athlete_id=uuid.uuid4(),
        first_name="Jane",
        last_name="Smith",
        bib_number=7,
        run_scores=[
            RunScores(
                run_number=1,
                judge_scores=[],
                mean_run_score=0.0,
                highest_scoring_move=0.0,
                locked=False,
                did_not_start=True,
            )
        ],
        highest_scoring_move=0.0,
        total_score=None,
        ranking=None,
        reason="DNS",
        last_phase_rank=None,
    )

    with (
        patch(
            "app.competition_management.pdfEndpoints.calculate_phase_scores"
        ) as mock_calc,
        patch(
            "app.competition_management.pdfEndpoints.build_phase_pdf_content"
        ) as mock_build,
    ):
        mock_calc.return_value.phase_id = sample_phase_id
        mock_calc.return_value.scores = [dns_athlete]

        response = await phase_pdf(phase_id=sample_phase_id, db=mock_db_session)

        assert response.status_code == 200, (
            f"phase_pdf with DNS athlete should return HTTP 200, got {response.status_code}"
        )
        assert response.media_type == "application/pdf", (
            f"phase_pdf should return application/pdf, got {response.media_type}"
        )

        mock_build.assert_called_once()
        _, call_args, _ = mock_build.mock_calls[0]
        phase_scores_arg = call_args[2]  # third positional arg: phase_scores
        assert len(phase_scores_arg.scores) == 1, (
            f"build_phase_pdf_content should receive exactly 1 athlete, "
            f"got {len(phase_scores_arg.scores)}"
        )
        assert phase_scores_arg.scores[0].reason == "DNS", (
            f"DNS athlete reason should be 'DNS', got {phase_scores_arg.scores[0].reason!r}"
        )
        assert phase_scores_arg.scores[0].run_scores[0].did_not_start is True, (
            "DNS athlete's first run should have did_not_start=True"
        )


@pytest.mark.asyncio
async def test_heat_pdf_exception(
    mock_db_session: Session,
) -> None:
    """Test heat_pdf raises HTTPException when an unexpected error occurs"""
    heat_id = str(uuid.uuid4())
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.side_effect = Exception(
        "Database error"
    )

    with pytest.raises(HTTPException) as exc_info:
        await heat_pdf(heat_ids=[heat_id], db=mock_db_session)

    assert exc_info.value.status_code == 500, (
        f"heat_pdf DB error should raise HTTP 500, got {exc_info.value.status_code}"
    )
