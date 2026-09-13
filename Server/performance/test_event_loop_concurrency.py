"""Does the event-loop-blocking fix actually stop these requests serializing?

Unlike test_key_endpoint_performance.py, this fires requests concurrently
(asyncio.gather over httpx.ASGITransport, in-process) so a blocking handler
and a non-blocking one actually look different. Assertions compare a solo
call's time against a concurrent batch's time rather than an absolute
threshold, so they stay meaningful without CI-derived numbers. Some fail
until the phase covering that endpoint lands — that's the intended signal,
not a flaky test.

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

# Concurrent batch must beat this fraction of N fully-serial calls; 1.0 is
# fully serial, ~1/N is fully parallel. 0.5 has headroom without being loose.
MAX_SERIAL_FRACTION = 0.5

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


async def _measure_solo(call: ClientCall) -> float:
    async with httpx.AsyncClient(
        transport=httpx.ASGITransport(app=app), base_url="http://testserver"
    ) as client:
        start = time.perf_counter()
        response = await call(client)
        elapsed = time.perf_counter() - start
    assert response.status_code < 400, (
        f"solo reference call failed: {response.status_code}"
    )
    return elapsed


def _assert_not_serialized(
    concurrent_elapsed: float, solo_elapsed: float, n: int
) -> None:
    serial_estimate = solo_elapsed * n
    ceiling = serial_estimate * MAX_SERIAL_FRACTION
    assert concurrent_elapsed < ceiling, (
        f"{n} concurrent requests took {concurrent_elapsed:.3f}s -- expected "
        f"under {ceiling:.3f}s ({MAX_SERIAL_FRACTION:.0%} of {n} fully-serial "
        f"calls at {solo_elapsed:.3f}s each = {serial_estimate:.3f}s), "
        "suggesting they serialized on the event loop instead of running "
        "concurrently"
    )


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
    """10 identical PDF requests wouldn't show this fix: fpdf2/font-subsetting
    is CPU-bound, so N threads doing that work contend on the GIL regardless.
    One PDF alongside real traffic is the scenario that actually matters."""
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
    # Fails until Phase 2 fixes update_athlete_score -- it still blocks the
    # loop itself today, so submissions take about as long as the PDF.
    assert submissions_elapsed < pdf_elapsed * MAX_SERIAL_FRACTION, (
        f"{len(athlete_ids)} concurrent score submissions took "
        f"{submissions_elapsed:.3f}s while the PDF was generating (took "
        f"{pdf_elapsed:.3f}s total) -- expected them to finish in well under "
        f"{MAX_SERIAL_FRACTION:.0%} of that "
        f"({pdf_elapsed * MAX_SERIAL_FRACTION:.3f}s)"
    )


@pytest.mark.asyncio
async def test_score_calculation_concurrency(canned_phase: CannedPhase) -> None:
    """Fails until Phase 2 (Task 4) converts get_phase_scores off the event loop."""
    url = f"/getPhaseScores/{canned_phase.phase_id}"
    solo_elapsed = await _measure_solo(lambda client: client.get(url))

    calls = [(lambda client: client.get(url)) for _ in range(CONCURRENT_REQUESTS)]
    responses, elapsed = await _fire_concurrently(calls)

    _report("score_calculation", elapsed, CONCURRENT_REQUESTS)
    assert all(r.status_code == 200 for r in responses)
    _assert_not_serialized(elapsed, solo_elapsed, CONCURRENT_REQUESTS)


@pytest.mark.asyncio
async def test_score_submission_concurrency(canned_phase: CannedPhase) -> None:
    """A different athlete per submission -- tests cross-request blocking, not
    DB write contention on one row. Fails until Phase 2 (Task 6) fixes this."""
    judge_id = canned_phase.judge_ids[0]
    athlete_ids = canned_phase.athlete_ids[:CONCURRENT_REQUESTS]
    reference_athlete_id = canned_phase.athlete_ids[-1]

    solo_elapsed = await _measure_solo(
        _make_score_submission_call(canned_phase, reference_athlete_id, judge_id)
    )

    calls = [
        _make_score_submission_call(canned_phase, athlete_id, judge_id)
        for athlete_id in athlete_ids
    ]
    responses, elapsed = await _fire_concurrently(calls)

    _report("score_submission", elapsed, len(athlete_ids))
    assert all(r.status_code == 200 for r in responses)
    _assert_not_serialized(elapsed, solo_elapsed, len(athlete_ids))


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
    """No _assert_not_serialized: upload() is already non-blocking, but its
    pandas parsing is CPU-bound enough (~0.7 concurrent/solo ratio measured)
    that no fix would make a ratio assertion here reliably pass."""
    csv_bytes = _generate_competitors_csv(UPLOAD_ATHLETE_COUNT)
    calls = [
        _make_upload_call(existing_scoresheet_name, csv_bytes)
        for _ in range(CONCURRENT_REQUESTS)
    ]

    responses, elapsed = await _fire_concurrently(calls)

    _report("csv_upload", elapsed, CONCURRENT_REQUESTS)
    assert all(r.status_code == 201 for r in responses)
