# Architectural Decision Record: Keep Blocking Work Off the Shared ASGI Event Loop

## Context:

AEMS Server runs as a single Gunicorn worker process in which `python-socketio`'s `AsyncServer(async_mode="asgi")` is mounted alongside FastAPI on the same event loop (`Server/app/common/socket_manager.py`, `Server/main.py`). The database layer (`Server/db/client.py`) is a fully synchronous SQLAlchemy `create_engine`/`sessionmaker`, and PDF generation uses `fpdf2`, also synchronous. Any route or Socket.IO handler written as `async def` that calls into either one runs that blocking work directly on the shared event loop thread — stalling every other request and every Socket.IO broadcast (timer ticks, run-status updates, current scores) for as long as the query or PDF render takes.

## Decision:

Every handler is assigned one of two mechanisms depending on whether it needs to `await` anything after its blocking work:

- **Mechanism A** — the handler does *only* blocking work (a DB query, a PDF render) with nothing to await afterwards: write it as a plain `def`, not `async def`. FastAPI already runs plain `def` route handlers in its threadpool automatically; this required no new pattern; `upload()` (`Server/app/competition_management/competition_management.py`) already did this before the rest of the codebase was audited to match.
- **Mechanism B** — the handler must stay `async def` because it awaits something after the blocking section (most commonly `sio.emit`, e.g. `update_athlete_score`): keep it `async def`, but move only the blocking portion into a helper function and run that helper via `await anyio.to_thread.run_sync(helper, ...)`. `anyio` was already a direct dependency, so this introduced no new package.

A regression guard, `Server/test_blocking_route_handlers.py`, asserts that no route is `async def` while resolving a database session — since FastAPI only threadpools plain `def` handlers, an `async def` route touching the DB directly on the event loop is always a bug. The check needs no database and no timing, so it covers every route on every CI run. `update_athlete_score` is the one documented exception (Mechanism B: legitimately async because it awaits an emit, with its own blocking work already offloaded).

## Rationale:

Splitting on "does it need to await afterwards" rather than converting every handler to Mechanism B keeps the change mechanical and low-risk: a handler that never awaits anything gains nothing from staying `async def`, and dropping `async` is a smaller diff than threading every DB call through `anyio.to_thread.run_sync`. Only the handlers that actually need to interleave with the event loop (an emit after a save) pay for the thread-offload machinery.

A static, DB-free regression test was chosen over a timing-based one (e.g. asserting a concurrent request doesn't stall) because it is deterministic — it fails exactly when a handler's signature and body combination reintroduces the bug, with no flakiness budget and no infrastructure to run.

## Consequences:

### Positive:

- Unrelated HTTP requests and Socket.IO broadcasts are no longer delayed behind a slow query or PDF render on the same worker.
- The fix generalizes: any new route or handler follows one of two known mechanisms rather than requiring a bespoke decision each time.
- `Server/test_blocking_route_handlers.py` fails CI immediately if new code reintroduces a blocking `async def` handler, rather than surfacing as an intermittent production stall.

### Negative:

- Contributors must know which mechanism applies before writing a new handler; the wrong choice (plain `def` when something must be awaited afterwards, or vice versa) either loses concurrency or reintroduces the original bug, and only the "async def touching the DB" half of that mistake is currently caught by the guard test.
- Mechanism B adds a small amount of indirection (a helper function plus a `run_sync` call) for handlers that need it.

## Implementation:

See `Server/test_blocking_route_handlers.py` for the enforced invariant and its one documented exception. Handlers converted under this decision span `Server/app/crud/`, `Server/app/scoring/customScoringEndpoints.py`, and `Server/app/competition_management/` (PDF endpoints).

## Review:

Revisit if the Server ever moves to an async database driver (e.g. `asyncpg`/SQLAlchemy async engine) — at that point Mechanism A's plain-`def`-to-threadpool pattern would no longer be the right default, and the guard test's premise (any DB-touching `async def` route is a bug) would need to be inverted.
