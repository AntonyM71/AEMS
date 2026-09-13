"""Exploratory diagnostic: do these endpoints block each other?

Not part of the tracked performance suite (test_key_endpoint_performance.py)
and carries no speed assertions — this is a demonstration/diagnostic tool for
the event-loop-blocking bug, not something to set regression thresholds on.

test_key_endpoint_performance.py only ever times ONE call at a time —
pytest-benchmark's `rounds` repeat serially, so a fully-blocking handler and
a fully-async one look identical there. This file fires several requests at
once with asyncio.gather against the real ASGI app (in-process over
httpx.ASGITransport, no subprocess needed) so they genuinely share one event
loop the way concurrent requests would in production — which is what the
single-worker blocking-handler bug in
docs/superpowers/plans/2026-09-13-fix-blocking-event-loop-handlers.md is
about. See also scripts/bench_event_loop.py for the same idea against a
real running server.

These just print the observed req/s and assert correctness (status codes) —
that's it.

Same DB/scoresheet requirements as test_key_endpoint_performance.py.
"""

import asyncio
import time
from collections.abc import Awaitable, Callable
from io import BytesIO
from uuid import uuid4

import httpx
import pytest

from db.canned_data import CannedPhase
from main import app
from performance.test_key_endpoint_performance import (
    UPLOAD_ATHLETE_COUNT,
    _generate_competitors_csv,
)

CONCURRENT_REQUESTS = 10

ClientCall = Callable[[httpx.AsyncClient], Awaitable[httpx.Response]]


async def _fire_concurrently(
    calls: list[ClientCall],
) -> tuple[list[httpx.Response], float]:
    async with httpx.AsyncClient(
        transport=httpx.ASGITransport(app=app), base_url="http://testserver"
    ) as client:
        start = time.perf_counter()
        responses = await asyncio.gather(*(call(client) for call in calls))
        elapsed = time.perf_counter() - start
    return responses, elapsed


def _report(name: str, elapsed: float, n: int) -> None:
    print(
        f"\n{name}: {n} concurrent requests in {elapsed:.3f}s -> {n / elapsed:.1f} req/s"
    )


def _make_score_submission_call(
    canned_phase: CannedPhase, athlete_id: str, judge_id: str
) -> ClientCall:
    payload = {
        "moves": [
            {"id": str(uuid4()), "move_id": canned_phase.move_ids[0], "direction": "F"}
        ],
        "bonuses": [],
    }

    async def call(client: httpx.AsyncClient) -> httpx.Response:
        return await client.post(
            f"/addUpdateAthleteScore/{canned_phase.heat_id}/{athlete_id}/0/{judge_id}",
            params={"phase_id": canned_phase.phase_id},
            json=payload,
        )

    return call


@pytest.mark.asyncio
async def test_pdf_generation_does_not_block_score_submission(
    canned_phase: CannedPhase,
) -> None:
    """The realistic scenario: a director generates one PDF while judges keep
    submitting scores in the background. Firing 10 identical PDF requests at
    once (the old version of this test) isn't realistic and is also
    GIL-bound — fpdf2/font-subsetting is CPU-bound pure Python, so N threads
    all doing that work don't parallelize with EACH OTHER regardless of the
    event-loop fix. What the fix actually buys is this: unrelated light
    requests no longer queue up behind the one heavy one."""
    pdf_url = f"/phase_pdf/{canned_phase.phase_id}"
    judge_id = canned_phase.judge_ids[0]
    athlete_ids = canned_phase.athlete_ids[:CONCURRENT_REQUESTS]

    async with httpx.AsyncClient(
        transport=httpx.ASGITransport(app=app), base_url="http://testserver"
    ) as client:
        start = time.perf_counter()
        pdf_task = asyncio.create_task(client.get(pdf_url))
        await asyncio.sleep(0)  # let the PDF request actually start first

        async def submit(athlete_id: str) -> httpx.Response:
            call = _make_score_submission_call(canned_phase, athlete_id, judge_id)
            response = await call(client)
            print(f"  score submission completed at {time.perf_counter() - start:.3f}s")
            return response

        submission_responses = await asyncio.gather(
            *(submit(athlete_id) for athlete_id in athlete_ids)
        )
        submissions_elapsed = time.perf_counter() - start
        pdf_response = await pdf_task
        pdf_elapsed = time.perf_counter() - start

    print(
        f"\npdf_vs_score_submission: PDF took {pdf_elapsed:.3f}s total; "
        f"{len(athlete_ids)} concurrent score submissions all finished by "
        f"{submissions_elapsed:.3f}s"
    )
    assert pdf_response.status_code == 200
    assert all(r.status_code == 200 for r in submission_responses)


@pytest.mark.asyncio
async def test_score_calculation_concurrency(canned_phase: CannedPhase) -> None:
    url = f"/getPhaseScores/{canned_phase.phase_id}"
    calls = [(lambda client: client.get(url)) for _ in range(CONCURRENT_REQUESTS)]

    responses, elapsed = await _fire_concurrently(calls)

    _report("score_calculation", elapsed, CONCURRENT_REQUESTS)
    assert all(r.status_code == 200 for r in responses)


@pytest.mark.asyncio
async def test_score_submission_concurrency(canned_phase: CannedPhase) -> None:
    """A different athlete per concurrent submission — this tests whether one
    judge's submission blocks another's, not DB write contention on one row."""
    judge_id = canned_phase.judge_ids[0]
    athlete_ids = canned_phase.athlete_ids[:CONCURRENT_REQUESTS]
    calls = [
        _make_score_submission_call(canned_phase, athlete_id, judge_id)
        for athlete_id in athlete_ids
    ]

    responses, elapsed = await _fire_concurrently(calls)

    _report("score_submission", elapsed, len(athlete_ids))
    assert all(r.status_code == 200 for r in responses)


def _make_upload_call(scoresheet_name: str, csv_bytes: bytes) -> ClientCall:
    async def call(client: httpx.AsyncClient) -> httpx.Response:
        return await client.post(
            "/competition_management/upload",
            data={
                "competition_name": f"Bench Competition {uuid4()}",
                "scoresheet_name": scoresheet_name,
                "number_of_runs": "3",
                "number_of_runs_for_score": "2",
                "number_of_judges": "3",
                "random_heats": "false",
                "number_of_random_heats": "0",
            },
            files={"file": ("competitors.csv", BytesIO(csv_bytes), "text/csv")},
        )

    return call


@pytest.mark.asyncio
async def test_csv_upload_concurrency(existing_scoresheet_name: str) -> None:
    csv_bytes = _generate_competitors_csv(UPLOAD_ATHLETE_COUNT)
    calls = [
        _make_upload_call(existing_scoresheet_name, csv_bytes)
        for _ in range(CONCURRENT_REQUESTS)
    ]

    responses, elapsed = await _fire_concurrently(calls)

    _report("csv_upload", elapsed, CONCURRENT_REQUESTS)
    assert all(r.status_code == 201 for r in responses)
