import re
import uuid
import zlib
from datetime import date
from io import BytesIO
from unittest.mock import MagicMock, patch

import pytest
from PIL import Image
from sqlalchemy.orm import Session

from app.competition_management.pdfEndpoints import (
    heat_pdf,
    heat_results_pdf,
    phase_pdf,
)
from app.scoring.customScoringEndpoints import HeatInfoResponse
from app.scoring.scoring_logic import AthleteScoresWithAthleteInfo, RunScores
from db.models import Competition, CompetitionImage, Event, Heat, Phase

PT_PER_MM = 72 / 25.4
A4_LANDSCAPE_MM = (297, 210)
MARGIN_MM = 10
IMAGE_PLACEMENT = re.compile(
    rb"q ([\d.]+) [\d.]+ [\d.]+ ([\d.]+) ([\d.]+) ([\d.]+) cm /I\d+ Do Q"
)


def make_png(size: tuple[int, int] = (40, 20)) -> bytes:
    buffer = BytesIO()
    Image.new("RGB", size, "red").save(buffer, format="PNG")
    return buffer.getvalue()


def page_contents(pdf: bytes) -> list[bytes]:
    """Each page's decompressed content stream, in page order."""
    contents = []
    for raw in re.findall(rb"stream\n(.*?)\nendstream", pdf, re.DOTALL):
        try:
            content = zlib.decompress(raw)
        except zlib.error:
            continue
        if b" Tj" in content:
            contents.append(content)
    return contents


def image_placements_mm(page: bytes) -> list[tuple[float, float, float, float]]:
    """(left, top, width, height) of each image on the page, in mm from top left."""
    placements = []
    for match in IMAGE_PLACEMENT.finditer(page):
        width, height, x, y = (float(value) / PT_PER_MM for value in match.groups())
        placements.append((x, A4_LANDSCAPE_MM[1] - y - height, width, height))
    return placements


def assert_logo_top_right(page: bytes) -> None:
    left, top, width, height = image_placements_mm(page)[0]
    assert left + width == pytest.approx(A4_LANDSCAPE_MM[0] - MARGIN_MM, abs=0.1)
    assert top == pytest.approx(MARGIN_MM + 1.25, abs=0.1)
    assert height == pytest.approx(7.5, abs=0.1)


def athlete(bib: int) -> AthleteScoresWithAthleteInfo:
    return AthleteScoresWithAthleteInfo(
        athlete_id=uuid.uuid4(),
        first_name="Athlete",
        last_name=str(bib),
        bib_number=bib,
        run_scores=[
            RunScores(
                run_number=1,
                judge_scores=[],
                mean_run_score=50.0,
                highest_scoring_move=50.0,
                locked=False,
                did_not_start=False,
            )
        ],
        highest_scoring_move=50.0,
        total_score=50.0,
        ranking=bib,
        reason=None,
        last_phase_rank=None,
    )


@pytest.fixture
def competition() -> MagicMock:
    return MagicMock(spec=Competition, id=uuid.uuid4(), name="Test Competition")


@pytest.fixture
def stored_images() -> dict[str, bytes]:
    return {}


@pytest.fixture
def db(
    mock_db_session: MagicMock,
    competition: MagicMock,
    stored_images: dict[str, bytes],
) -> Session:
    def get(model: type, key: tuple[uuid.UUID, str]) -> CompetitionImage | None:
        competition_id, kind = key
        if competition_id != competition.id or kind not in stored_images:
            return None
        return CompetitionImage(content=stored_images[kind], content_type="image/png")

    mock_db_session.get.side_effect = get
    return mock_db_session


def render_phase_pdf(
    db: MagicMock, competition: MagicMock, athletes: int = 1, **kwargs: bool
) -> bytes:
    event = MagicMock(spec=Event, id=uuid.uuid4(), competition_id=competition.id)
    event.name = "Test Event"
    phase = MagicMock(
        spec=Phase, id=uuid.uuid4(), number_of_runs=3, number_of_runs_for_score=2
    )
    phase.name = "Test Phase"
    db.query.return_value.filter.return_value.one.side_effect = [
        phase,
        event,
        competition,
    ]
    with patch(
        "app.competition_management.pdfEndpoints.calculate_phase_scores"
    ) as scores:
        scores.return_value.scores = [athlete(bib) for bib in range(1, athletes + 1)]
        return phase_pdf(phase_id=str(phase.id), db=db, **kwargs).body


def render_heat_draw_pdf(db: MagicMock, competition: MagicMock, heats: int) -> bytes:
    heat_rows = [
        MagicMock(spec=Heat, id=uuid.uuid4(), competition_id=competition.id)
        for _ in range(heats)
    ]
    for number, heat in enumerate(heat_rows, start=1):
        heat.name = f"Heat {number}"
    db.query.return_value.where.return_value.order_by.return_value.all.return_value = (
        heat_rows
    )
    db.query.return_value.filter.return_value.one.side_effect = None
    db.query.return_value.filter.return_value.one.return_value = competition
    entrant = HeatInfoResponse(
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
    with patch(
        "app.competition_management.pdfEndpoints.get_heat_info_logic",
        return_value=[entrant],
    ):
        return heat_pdf(heat_ids=[str(h.id) for h in heat_rows], db=db).body


def render_heat_results_pdf(db: MagicMock, competition: MagicMock) -> bytes:
    heat = MagicMock(spec=Heat, id=uuid.uuid4(), competition_id=competition.id)
    heat.name = "Heat 1"
    db.query.return_value.filter.return_value.one.side_effect = [heat, competition]
    with patch(
        "app.competition_management.pdfEndpoints.calculate_heat_scores_response"
    ) as scores:
        scores.return_value.scores = [athlete(1)]
        return heat_results_pdf(heat_id=str(heat.id), db=db).body


def test_every_page_of_a_phase_pdf_shows_the_logo_top_right(
    db: MagicMock, competition: MagicMock, stored_images: dict[str, bytes]
) -> None:
    stored_images["logo"] = make_png()

    pages = page_contents(render_phase_pdf(db, competition, athletes=60))

    assert len(pages) >= 2
    for page in pages:
        assert_logo_top_right(page)


def test_every_page_of_a_heat_draw_shows_the_logo_top_right(
    db: MagicMock, competition: MagicMock, stored_images: dict[str, bytes]
) -> None:
    stored_images["logo"] = make_png()

    pages = page_contents(render_heat_draw_pdf(db, competition, heats=2))

    assert len(pages) == 2
    for page in pages:
        assert_logo_top_right(page)


def test_a_heat_results_pdf_shows_the_logo_top_right(
    db: MagicMock, competition: MagicMock, stored_images: dict[str, bytes]
) -> None:
    stored_images["logo"] = make_png()

    (page,) = page_contents(render_heat_results_pdf(db, competition))

    assert_logo_top_right(page)


def test_a_very_wide_logo_is_capped_at_60_mm(
    db: MagicMock, competition: MagicMock, stored_images: dict[str, bytes]
) -> None:
    stored_images["logo"] = make_png(size=(1000, 10))

    (page,) = page_contents(render_heat_results_pdf(db, competition))

    left, _, width, height = image_placements_mm(page)[0]
    assert width == pytest.approx(60, abs=0.1)
    assert height < 7.5
    assert left + width == pytest.approx(A4_LANDSCAPE_MM[0] - MARGIN_MM, abs=0.1)


def test_pdfs_without_a_logo_contain_no_image(
    db: MagicMock, competition: MagicMock
) -> None:
    for pdf in (
        render_phase_pdf(db, competition),
        render_heat_draw_pdf(db, competition, heats=2),
        render_heat_results_pdf(db, competition),
    ):
        assert b"/Subtype /Image" not in pdf


TEXT_AT = re.compile(rb"BT ([-\d.]+) ([-\d.]+) Td \((.*?)\) Tj ET")


def text_tops_mm(page: bytes) -> dict[str, float]:
    """Each text run on the page, mapped to its baseline in mm from the top."""
    return {
        text.decode(): A4_LANDSCAPE_MM[1] - float(y) / PT_PER_MM
        for _, y, text in TEXT_AT.findall(page)
    }


def today_label() -> str:
    today = date.today()
    return f"{today.day} {today:%b %Y}"


def test_a_signed_pdf_ends_with_the_stored_signature(
    db: MagicMock, competition: MagicMock, stored_images: dict[str, bytes]
) -> None:
    stored_images["signature"] = make_png(size=(80, 20))

    last_page = page_contents(render_phase_pdf(db, competition, signed=True))[-1]

    texts = text_tops_mm(last_page)
    (signature,) = image_placements_mm(last_page)
    _, signature_top, _, signature_height = signature
    assert "Head Judge" in texts
    assert today_label() in texts
    assert signature_top + signature_height < texts["Head Judge"]


def test_a_signed_pdf_without_a_stored_signature_leaves_a_line_to_sign(
    db: MagicMock, competition: MagicMock
) -> None:
    pdf = render_phase_pdf(db, competition, signed=True)

    texts = text_tops_mm(page_contents(pdf)[-1])
    assert "Head Judge" in texts
    assert today_label() in texts
    assert b"/Subtype /Image" not in pdf


def test_an_unsigned_pdf_has_no_signature_block(
    db: MagicMock, competition: MagicMock, stored_images: dict[str, bytes]
) -> None:
    stored_images["signature"] = make_png()

    pdf = render_phase_pdf(db, competition)

    assert b"/Subtype /Image" not in pdf
    for page in page_contents(pdf):
        assert "Head Judge" not in text_tops_mm(page)


def test_signing_does_not_wait_for_the_head_judge_to_confirm_runs(
    db: MagicMock, competition: MagicMock
) -> None:
    unconfirmed_phase = render_phase_pdf(db, competition, athletes=3, signed=True)

    assert "Head Judge" in text_tops_mm(page_contents(unconfirmed_phase)[-1])


@pytest.mark.parametrize("athletes", range(15, 30))
def test_the_signature_block_is_never_split_across_pages(
    db: MagicMock,
    competition: MagicMock,
    stored_images: dict[str, bytes],
    athletes: int,
) -> None:
    stored_images["signature"] = make_png(size=(80, 20))

    last_page = page_contents(
        render_phase_pdf(db, competition, athletes=athletes, signed=True)
    )[-1]

    texts = text_tops_mm(last_page)
    assert len(image_placements_mm(last_page)) == 1
    assert texts["Head Judge"] < A4_LANDSCAPE_MM[1] - 15


def test_a_long_title_shrinks_to_stay_clear_of_the_logo(
    db: MagicMock, competition: MagicMock, stored_images: dict[str, bytes]
) -> None:
    competition.name = "British Freestyle Kayak Championships 2026 " * 2
    stored_images["logo"] = make_png()

    page = page_contents(render_phase_pdf(db, competition))[0]

    _, _, logo_width, _ = image_placements_mm(page)[0]
    title_left_mm = next(
        float(x) / PT_PER_MM
        for x, _, text in TEXT_AT.findall(page)
        if text.endswith(b"Scores")
    )
    assert title_left_mm >= MARGIN_MM + logo_width
