"""Performance regression suite for the request types most exposed to
event-loop blocking: score calculations, PDF generation, score submission
(needs immediate feedback for judges), and CSV competition upload. Excludes
lightweight, non-time-critical CRUD (e.g. adding a heat/phase by hand).

Runs against a REAL database — unlike Server/app/*/tests/, nothing here
mocks db.client, so timings reflect actual query cost. Requires a migrated
dev/CI database and seeded scoresheets:

    alembic upgrade head
    python -m scripts.seed_scoresheets
    uv run python -m pytest performance/ --benchmark-only

Never point this at a database with real competition data: the upload test
creates a new competition on every one of its BENCHMARK_ROUNDS.
"""

from io import BytesIO
from uuid import uuid4

from fastapi.testclient import TestClient
from pytest_benchmark.fixture import BenchmarkFixture

from db.canned_data import CannedPhase
from main import app

BENCHMARK_ROUNDS = 10
UPLOAD_ATHLETE_COUNT = 60

client = TestClient(app)


def test_score_calculation_performance(
    benchmark: BenchmarkFixture, canned_phase: CannedPhase
) -> None:
    """calculate_phase_scores: aggregates every judge's moves/bonuses for every
    athlete in the phase — the read path behind live results and PDFs alike."""
    response = benchmark.pedantic(
        lambda: client.get(f"/getPhaseScores/{canned_phase.phase_id}"),
        rounds=BENCHMARK_ROUNDS,
    )
    assert response.status_code == 200
    assert len(response.json()["scores"]) == len(canned_phase.athlete_ids)


def test_pdf_generation_performance(
    benchmark: BenchmarkFixture, canned_phase: CannedPhase
) -> None:
    """phase_pdf: runs the same score calculation, then builds an fpdf2
    document with one row per athlete — the slowest endpoint identified."""
    response = benchmark.pedantic(
        lambda: client.get(f"/phase_pdf/{canned_phase.phase_id}"),
        rounds=BENCHMARK_ROUNDS,
    )
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"


def test_score_submission_performance(
    benchmark: BenchmarkFixture, canned_phase: CannedPhase
) -> None:
    """update_athlete_score: judges need this to return promptly — it's on the
    same event loop as PDF/score-read traffic, so it stalls behind them too."""
    athlete_id = canned_phase.athlete_ids[0]
    judge_id = canned_phase.judge_ids[0]
    move_ids = [uuid4() for _ in canned_phase.move_ids]

    def submit_score() -> object:
        payload = {
            "moves": [
                {
                    "id": str(move_id),
                    "move_id": available_move_id,
                    "direction": "F",
                }
                for move_id, available_move_id in zip(
                    move_ids, canned_phase.move_ids, strict=True
                )
            ],
            "bonuses": [
                {
                    "id": str(uuid4()),
                    "bonus_id": canned_phase.bonus_ids[0],
                    "move_id": str(move_ids[0]),
                }
            ],
        }
        return client.post(
            f"/addUpdateAthleteScore/{canned_phase.heat_id}/{athlete_id}/0/{judge_id}",
            params={"phase_id": canned_phase.phase_id},
            json=payload,
        )

    response = benchmark.pedantic(submit_score, rounds=BENCHMARK_ROUNDS)
    assert response.status_code == 200


def _generate_competitors_csv(athlete_count: int) -> bytes:
    rows = ["first_name,last_name,bib,Event,Heat"]
    rows += [
        f"Bench,Athlete{i},{i},Senior Elite K1M,{i % 4 + 1}"
        for i in range(athlete_count)
    ]
    return "\n".join(rows).encode()


def test_csv_upload_performance(
    benchmark: BenchmarkFixture, existing_scoresheet_name: str
) -> None:
    """upload: parses the CSV/XLSX with pandas and writes every athlete/heat
    row inline in one blocking request — run once per competition, but for a
    lot of athletes at once, and it's what a director is staring at."""
    csv_bytes = _generate_competitors_csv(UPLOAD_ATHLETE_COUNT)

    def upload_competition() -> object:
        return client.post(
            "/competition_management/upload",
            data={
                "competition_name": f"Bench Competition {uuid4()}",
                "scoresheet_name": existing_scoresheet_name,
                "number_of_runs": "3",
                "number_of_runs_for_score": "2",
                "number_of_judges": "3",
                "random_heats": "false",
                "number_of_random_heats": "0",
            },
            files={
                "file": ("competitors.csv", BytesIO(csv_bytes), "text/csv"),
            },
        )

    response = benchmark.pedantic(upload_competition, rounds=BENCHMARK_ROUNDS)
    assert response.status_code == 201
