import uuid
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.competition_management.pdfEndpoints import (
    HelveticaNeuePDF,
    build_heat_pdf_page,
    build_heat_results_pdf_content,
    build_phase_pdf_content,
    create_pdf_response,
    get_footer_text,
    heat_pdf,
    heat_results_pdf,
    phase_pdf,
    phase_pdf_header,
    sanitize_filename,
    setup_pdf_footer,
)
from app.scoring.customScoringEndpoints import (
    HeatInfoResponse,
    HeatScoresResponse,
    PhaseScoresResponse,
)
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

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        expected_filename = "Test_Competition_Test_Event_Test_Phase.pdf"
        assert (
            response.headers["Content-Disposition"]
            == f"attachment; filename={expected_filename}"
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

    assert exc_info.value.status_code == 500


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

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        expected_filename = "Test_Competition_Test_Heat.pdf"
        assert (
            response.headers["Content-Disposition"]
            == f"attachment; filename={expected_filename}"
        )


@pytest.mark.asyncio
async def test_heat_pdf_no_ids() -> None:
    response = await heat_pdf(heat_ids=[], db=MagicMock())
    assert response.status_code == 404
    assert b"Please provide a list of Heat IDs" == response.body


@pytest.mark.asyncio
async def test_heat_pdf_not_found(
    mock_db_session: Session, sample_heat_ids: list[str]
) -> None:
    mock_db_session.query.return_value.where.return_value.order_by.return_value.all.return_value = []

    response = await heat_pdf(heat_ids=sample_heat_ids, db=mock_db_session)
    assert response.status_code == 404
    assert b"Could not find any heat Info" in response.body


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

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        # With 3 heats, should use count-based filename
        expected_filename = "Test_Competition_3_Heats.pdf"
        assert (
            response.headers["Content-Disposition"]
            == f"attachment; filename={expected_filename}"
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

        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        # Heat names should be in the filename
        assert "Test_Heat" in response.headers["Content-Disposition"]
        assert "results.pdf" in response.headers["Content-Disposition"]


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

        # Verify that the response is a valid PDF
        assert response.status_code == 200
        assert response.media_type == "application/pdf"
        assert b"%PDF-" in pdf_content  # PDF header


def test_sanitize_filename() -> None:
    """Test filename sanitization with various inputs"""
    # Test spaces are converted to underscores
    assert sanitize_filename("Test Competition Name") == "Test_Competition_Name"

    # Test invalid characters are replaced with underscores
    assert sanitize_filename("Test<>Competition") == "Test__Competition"
    assert sanitize_filename('Test"File/Name') == "Test_File_Name"
    assert sanitize_filename("Test:File|Name") == "Test_File_Name"

    # Test multiple special characters
    assert sanitize_filename("Test<>:/\\|?*File") == "Test________File"

    # Test leading/trailing dots and spaces are removed
    assert sanitize_filename("  Test File  ") == "Test_File"
    assert sanitize_filename("...Test File...") == "Test_File"

    # Test mixed characters
    assert sanitize_filename("Test Event 2024 - Phase 1") == "Test_Event_2024_-_Phase_1"


def test_get_footer_text() -> None:
    """Test footer text content"""
    footer = get_footer_text()
    assert "Athlete Event Management System" in footer
    assert "kayak.freestyle.app@gmail.com" in footer


def test_setup_pdf_footer_custom_text() -> None:
    """Test setup_pdf_footer with custom text"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    result = setup_pdf_footer(pdf, text="Custom Footer Text")
    assert result is pdf  # Returns the same PDF instance
    # The footer should be callable via the bound method
    assert callable(pdf.footer)


def test_setup_pdf_footer_default_text() -> None:
    """Test setup_pdf_footer uses default footer text when none provided"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    result = setup_pdf_footer(pdf)
    assert result is pdf


def test_setup_pdf_footer_no_page_numbers() -> None:
    """Test setup_pdf_footer without page numbers"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    result = setup_pdf_footer(pdf, include_page_numbers=False)
    assert result is pdf


def test_phase_pdf_header() -> None:
    """Test phase_pdf_header configures header on the PDF"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")

    mock_competition = MagicMock(spec=Competition)
    mock_competition.name = "Test Competition"
    mock_event = MagicMock(spec=Event)
    mock_event.name = "Test Event"
    mock_phase = MagicMock(spec=Phase)
    mock_phase.name = "Test Phase"
    mock_phase.number_of_runs = 3
    mock_phase.number_of_runs_for_score = 2

    phase_pdf_header(pdf, mock_competition, mock_event, mock_phase)

    # After setting the header, it should be callable
    assert callable(pdf.header)


def test_create_pdf_response() -> None:
    """Test create_pdf_response returns a valid PDF response"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    setup_pdf_footer(pdf)
    pdf.add_page()

    response = create_pdf_response(pdf, "Test File Name.pdf")

    assert response.status_code == 200
    assert response.media_type == "application/pdf"
    assert b"%PDF-" in response.body
    # Filename should be sanitized (spaces to underscores)
    assert "Test_File_Name.pdf" in response.headers["Content-Disposition"]


def test_create_pdf_response_sanitizes_filename() -> None:
    """Test that create_pdf_response sanitizes special characters in filename"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    setup_pdf_footer(pdf)
    pdf.add_page()

    response = create_pdf_response(pdf, "File<Name>:Test.pdf")

    assert "File_Name__Test.pdf" in response.headers["Content-Disposition"]


def test_build_phase_pdf_content(
    mock_phase: MagicMock,
) -> None:
    """Test build_phase_pdf_content populates the PDF"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    setup_pdf_footer(pdf)

    phase_scores = PhaseScoresResponse(
        phase_id=str(uuid.uuid4()),
        scores=[
            AthleteScoresWithAthleteInfo(
                athlete_id=uuid.uuid4(),
                first_name="John",
                last_name="Doe",
                bib_number=42,
                run_scores=[
                    RunScores(
                        run_number=1,
                        judge_scores=[],
                        mean_run_score=90.0,
                        highest_scoring_move=90.0,
                        locked=True,
                        did_not_start=False,
                    )
                ],
                highest_scoring_move=90.0,
                total_score=90.0,
                ranking=1,
                reason=None,
                last_phase_rank=None,
            )
        ],
    )

    build_phase_pdf_content(pdf, mock_phase, phase_scores)

    pdf_bytes = bytes(pdf.output())
    assert b"%PDF-" in pdf_bytes


def test_build_phase_pdf_content_dns_run(
    mock_phase: MagicMock,
) -> None:
    """Test build_phase_pdf_content handles DNS runs"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    setup_pdf_footer(pdf)

    phase_scores = PhaseScoresResponse(
        phase_id=str(uuid.uuid4()),
        scores=[
            AthleteScoresWithAthleteInfo(
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
        ],
    )

    build_phase_pdf_content(pdf, mock_phase, phase_scores)

    pdf_bytes = bytes(pdf.output())
    assert b"%PDF-" in pdf_bytes


def test_build_heat_pdf_page() -> None:
    """Test build_heat_pdf_page adds a page to the PDF"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    setup_pdf_footer(pdf)

    mock_heat = MagicMock(spec=Heat)
    mock_heat.id = uuid.uuid4()
    mock_heat.name = "Heat A"
    mock_heat.competition_id = uuid.uuid4()

    mock_competition = MagicMock(spec=Competition)
    mock_competition.name = "Test Competition"

    athletes = [
        HeatInfoResponse(
            athlete_heat_id=uuid.uuid4(),
            heat_id=uuid.uuid4(),
            athlete_id=uuid.uuid4(),
            phase_id=uuid.uuid4(),
            number_of_runs=3,
            number_of_runs_for_score=2,
            scoresheet=uuid.uuid4(),
            first_name="Alice",
            last_name="Jones",
            event_name="Freestyle",
            bib="5",
            last_phase_rank=2,
            affiliation="Team A",
        )
    ]

    build_heat_pdf_page(pdf, mock_heat, mock_competition, athletes)

    pdf_bytes = bytes(pdf.output())
    assert b"%PDF-" in pdf_bytes


def test_build_heat_results_pdf_content() -> None:
    """Test build_heat_results_pdf_content adds results to PDF"""
    pdf = HelveticaNeuePDF(orientation="L", format="A4")
    setup_pdf_footer(pdf)

    mock_heat = MagicMock(spec=Heat)
    mock_heat.id = uuid.uuid4()
    mock_heat.name = "Final Heat"

    mock_competition = MagicMock(spec=Competition)
    mock_competition.name = "Test Competition"

    heat_scores = HeatScoresResponse(
        heat_id=str(uuid.uuid4()),
        scores=[
            AthleteScoresWithAthleteInfo(
                athlete_id=uuid.uuid4(),
                first_name="Bob",
                last_name="Brown",
                bib_number=10,
                run_scores=[
                    RunScores(
                        run_number=1,
                        judge_scores=[],
                        mean_run_score=75.0,
                        highest_scoring_move=75.0,
                        locked=True,
                        did_not_start=False,
                    )
                ],
                highest_scoring_move=75.0,
                total_score=75.0,
                ranking=1,
                reason=None,
                last_phase_rank=None,
            )
        ],
    )

    build_heat_results_pdf_content(pdf, mock_competition, mock_heat, heat_scores, 1)

    pdf_bytes = bytes(pdf.output())
    assert b"%PDF-" in pdf_bytes


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

    assert exc_info.value.status_code == 500
