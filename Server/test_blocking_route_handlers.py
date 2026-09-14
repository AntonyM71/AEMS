"""Catches route handlers that run their database work on the event loop.

FastAPI only moves a route handler to its threadpool when the handler is a plain
`def`. An `async def` handler that takes a database session therefore runs its
blocking queries on the event loop, where nothing else can run until it
finishes.

Needs no database and no timing, so it covers every route at once, including the
light endpoints that are too fast to time reliably.
"""

import inspect

from fastapi.dependencies.models import Dependant
from fastapi.routing import APIRoute

from db.client import get_transaction_session
from main import app

# Handlers that are async def and take a database session, but hand the blocking
# work to a worker thread themselves with anyio.to_thread. They are correct, so
# they are not regressions. Their offloading is covered by the timing test in
# performance/test_event_loop_concurrency.py.
EXPLICITLY_OFFLOADED = frozenset(
    {
        "POST /addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}",
    }
)


def _resolves_a_database_session(dependant: Dependant) -> bool:
    if dependant.call is get_transaction_session:
        return True
    return any(_resolves_a_database_session(sub) for sub in dependant.dependencies)


def _routes_doing_database_work_on_the_event_loop() -> set[str]:
    blocking = set()
    for route in app.routes:
        if not isinstance(route, APIRoute):
            continue
        if not inspect.iscoroutinefunction(route.endpoint):
            continue
        if not _resolves_a_database_session(route.dependant):
            continue
        blocking.update(
            f"{method} {route.path}" for method in route.methods - {"HEAD", "OPTIONS"}
        )
    return blocking


def test_no_route_runs_database_work_on_the_event_loop() -> None:
    blocking = _routes_doing_database_work_on_the_event_loop() - EXPLICITLY_OFFLOADED
    assert not blocking, (
        "these routes are async def and resolve a database session, so their "
        "queries run on the event loop and stall every other request until "
        f"they finish: {sorted(blocking)}. Drop the `async` so FastAPI runs the "
        "handler in its threadpool, or offload the blocking section with "
        "anyio.to_thread.run_sync if the handler genuinely needs to await "
        "something afterwards."
    )
