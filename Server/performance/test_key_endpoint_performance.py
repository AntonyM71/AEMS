"""Serial-latency regression suite for the request types most exposed to
event-loop blocking: score calculations, PDF generation, score submission
(needs immediate feedback for judges), and CSV competition upload. Excludes
lightweight, non-time-critical CRUD (e.g. adding a heat/phase by hand).

This only ever times ONE call at a time — see test_event_loop_concurrency.py
for whether these endpoints block each other under concurrent load, which is
the actual bug docs/superpowers/plans/2026-09-13-fix-blocking-event-loop-handlers.md
is about.

Runs against a REAL database — unlike Server/app/*/tests/, nothing here
mocks db.client, so timings reflect actual query cost. Requires a migrated
dev/CI database and seeded scoresheets:

    alembic upgrade head
    python -m scripts.seed_scoresheets
    uv run python -m pytest performance/

Never point this at a database with real competition data: the upload test
creates a new competition on every one of its BENCHMARK_ROUNDS.
"""

import time
from io import BytesIO
from itertools import count
from uuid import UUID, uuid4

from fastapi.testclient import TestClient
from pytest_benchmark.fixture import BenchmarkFixture

from db.canned_data import CannedPhase
from main import app

BENCHMARK_ROUNDS = 10
UPLOAD_ATHLETE_COUNT = 60

_uuid7_counter = count()


def _next_uuid7() -> str:
    ts_hex = f"{int(time.time() * 1000):012x}"
    tail_hex = f"{next(_uuid7_counter):018x}"[-18:]

    return str(
        UUID(
            f"{ts_hex[:8]}-{ts_hex[8:]}-7{tail_hex[:3]}-a{tail_hex[3:6]}-{tail_hex[6:]}"
        )
    )


# Mean-latency ceilings, in seconds -- "did this regress badly" gates, not
# tight tracking (that's what benchmark-results.json is for).
#
# Set from three real Azure Pipelines runs of this suite, not local dev
# numbers, which run on different hardware. The third run is the first taken
# after the event-loop-blocking fix landed:
#   score_submission:   14.6ms, 10.7ms, 10.0ms mean
#   score_calculation:  65.9ms, 44.1ms, 52.1ms mean (noisy: max hit 110-144ms)
#   csv_upload:         68.8ms, 62.8ms, 67.2ms mean
#   pdf_generation:    123.2ms, 76.3ms, 76.5ms mean
#
# Serial latency is deliberately unchanged by that fix: moving a handler to a
# worker thread stops it blocking other requests, it does not make the request
# itself faster. So these numbers reproduce the earlier ones, which is the
# evidence the refactor added no overhead.
#
# Threshold = 2.5x the worst mean of the three, rounded up. The previous gate
# left five to six times headroom and would only have caught a catastrophic
# regression.
#
# Not 2x, which these numbers alone would support: the same code is about
# twice as slow on a devcontainer as on the CI agent (pdf_generation means
# 133-147ms locally against 76-123ms in CI), and CI agent speed itself varies
# by around 1.6x between runs. 2x left only 1.6x headroom on the slower
# machine, and a gate that fails on a slow agent gets ignored rather than
# investigated. 2.5x keeps roughly 2x margin on the slowest hardware measured.
MEAN_THRESHOLD_SECONDS = {
    "score_submission": 0.04,
    "score_calculation": 0.17,
    "csv_upload": 0.18,
    "pdf_generation": 0.31,
}

client = TestClient(app)


def _assert_mean_within(benchmark: BenchmarkFixture, name: str) -> None:
    mean = benchmark.stats.stats.mean
    threshold = MEAN_THRESHOLD_SECONDS[name]
    assert mean < threshold, (
        f"{name} mean latency {mean * 1000:.1f}ms exceeded the "
        f"{threshold * 1000:.0f}ms regression ceiling"
    )


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
    _assert_mean_within(benchmark, "score_calculation")


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
    _assert_mean_within(benchmark, "pdf_generation")


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
            "request_id": _next_uuid7(),
        }
        return client.post(
            f"/addUpdateAthleteScore/{canned_phase.heat_id}/{athlete_id}/0/{judge_id}",
            params={"phase_id": canned_phase.phase_id},
            json=payload,
        )

    response = benchmark.pedantic(submit_score, rounds=BENCHMARK_ROUNDS)
    assert response.status_code == 200
    _assert_mean_within(benchmark, "score_submission")


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
    _assert_mean_within(benchmark, "csv_upload")
