"""Guards the event-loop fix: a heavy request must not stall other requests.

For each heavy endpoint, fire it alongside one light request and check the light
one did not have to wait. If a handler does its blocking work on the event loop
rather than in FastAPI's threadpool, nothing else can run until it finishes, so
the light request is dragged out to finish alongside the heavy one.

The light request is a judge loading an athlete's existing scores. It is real
traffic, and it is light enough that its share of a heavy request's duration is
a meaningful signal.

Same DB and scoresheet requirements as test_key_endpoint_performance.py.
"""

import asyncio
import statistics
import time
from itertools import count
from typing import Any
from uuid import UUID, uuid4

import httpx
import pytest

from db.canned_data import CannedPhase
from main import app

_uuid7_counter = count()


def _next_uuid7() -> str:
    ts_hex = f"{int(time.time() * 1000):012x}"
    tail_hex = f"{next(_uuid7_counter):018x}"[-18:]

    return str(
        UUID(f"{ts_hex[:8]}-{ts_hex[8:]}-7{tail_hex[:3]}-a{tail_hex[3:6]}-{tail_hex[6:]}")
    )


# A blocked event loop pins this fraction at 1.0, because the light request
# cannot finish ahead of the heavy one it is stuck behind. That holds on any
# hardware, so only the passing side varies. Measured over 40 runs the score
# calculations, the tightest cases, sit at a median of 0.35 with a p90 of 0.37.
MAX_HEAVY_FRACTION = 0.80

# Occasional runs spike towards 0.72 from scheduling noise. Taking the median of
# a few attempts removes that tail without weakening what is being asserted.
REPEATS = 3

Request = tuple[str, str, dict[str, Any]]


def _submission_payload(
    canned_phase: CannedPhase, move_count: int, bonus_count: int
) -> dict[str, Any]:
    moves = [
        {
            "id": str(uuid4()),
            "move_id": canned_phase.move_ids[i % len(canned_phase.move_ids)],
            "direction": "F",
        }
        for i in range(move_count)
    ]
    bonuses = [
        {
            "id": str(uuid4()),
            "bonus_id": canned_phase.bonus_ids[i % len(canned_phase.bonus_ids)],
            "move_id": moves[i]["id"],
        }
        for i in range(min(bonus_count, move_count))
    ]
    return {
        "moves": moves,
        "bonuses": bonuses,
        "request_id": _next_uuid7(),
    }


def _probe_request(canned_phase: CannedPhase) -> Request:
    """A judge opening an athlete's existing scores."""
    athlete_id = canned_phase.athlete_ids[1]
    return (
        "GET",
        f"/getAthleteMovesAndBonuses/{canned_phase.heat_id}/{athlete_id}/0",
        {"params": {"judge_id": canned_phase.judge_ids[0]}},
    )


def _heavy_request(name: str, canned_phase: CannedPhase) -> Request:
    heat_id = canned_phase.heat_id
    phase_id = canned_phase.phase_id
    if name == "phase_pdf":
        return ("GET", f"/phase_pdf/{phase_id}", {})
    if name == "heat_pdf":
        return ("GET", "/heat_pdf", {"params": {"heat_ids": [heat_id]}})
    if name == "heat_results_pdf":
        return ("GET", "/heat_results_pdf", {"params": {"heat_id": heat_id}})
    if name == "get_phase_scores":
        return ("GET", f"/getPhaseScores/{phase_id}", {})
    if name == "get_heat_scores":
        return ("GET", f"/getHeatScores/{heat_id}", {})
    if name == "score_submission":
        # A full run's worth of moves, not one. A single-move submission is so
        # short that the probe is most of its duration and the signal vanishes.
        athlete_id = canned_phase.athlete_ids[0]
        judge_id = canned_phase.judge_ids[0]
        return (
            "POST",
            f"/addUpdateAthleteScore/{heat_id}/{athlete_id}/0/{judge_id}",
            {
                "params": {"phase_id": phase_id},
                "json": _submission_payload(canned_phase, move_count=20, bonus_count=8),
            },
        )
    msg = f"unknown heavy endpoint: {name}"
    raise ValueError(msg)


async def _probe_fraction_of(
    client: httpx.AsyncClient, heavy: Request, probe: Request
) -> float:
    """What fraction of the heavy request's duration the probe took to finish."""
    heavy_method, heavy_url, heavy_kwargs = heavy
    probe_method, probe_url, probe_kwargs = probe

    # Both timings come from this one mark. Reading the clock after an await
    # would leave the heavy request's blocking window outside the measurement
    # and hide exactly what this test exists to catch.
    start = time.perf_counter()
    heavy_task = asyncio.create_task(
        client.request(heavy_method, heavy_url, **heavy_kwargs)
    )
    # create_task only schedules the heavy request, it does not start it.
    # Without this yield the probe reaches the server first and the heavy
    # request is not yet in flight.
    await asyncio.sleep(0)
    probe_response = await client.request(probe_method, probe_url, **probe_kwargs)
    probe_finished_at = time.perf_counter() - start
    heavy_response = await heavy_task
    heavy_finished_at = time.perf_counter() - start

    assert heavy_response.status_code == 200, (
        f"{heavy_url} returned {heavy_response.status_code}"
    )
    assert probe_response.status_code == 200, (
        f"{probe_url} returned {probe_response.status_code}"
    )
    return probe_finished_at / heavy_finished_at


@pytest.mark.parametrize(
    "heavy_endpoint",
    [
        "phase_pdf",
        "heat_pdf",
        "heat_results_pdf",
        "get_phase_scores",
        "get_heat_scores",
        "score_submission",
    ],
)
@pytest.mark.asyncio
async def test_heavy_endpoint_does_not_delay_other_requests(
    heavy_endpoint: str, canned_phase: CannedPhase, monkeypatch: pytest.MonkeyPatch
) -> None:
    # pdfEndpoints skips real font loading under pytest, which halves a PDF's
    # cost and with it the margin these assertions depend on.
    monkeypatch.delenv("PYTEST_CURRENT_TEST", raising=False)

    probe = _probe_request(canned_phase)

    async with httpx.AsyncClient(
        transport=httpx.ASGITransport(app=app), base_url="http://testserver"
    ) as client:
        fractions = [
            await _probe_fraction_of(
                client, _heavy_request(heavy_endpoint, canned_phase), probe
            )
            for _ in range(REPEATS)
        ]

    fraction = statistics.median(fractions)
    print(f"\n{heavy_endpoint}: probe finished at {fraction:.0%} of the heavy request")
    assert fraction < MAX_HEAVY_FRACTION, (
        f"while {heavy_endpoint} was running, a light request took "
        f"{fraction:.0%} of its duration to complete. Anything near 100% means "
        "the light request waited for it, so blocking work is running on the "
        "event loop instead of in FastAPI's threadpool. A handler that only "
        "does blocking work should be a plain def, not an async def."
    )
