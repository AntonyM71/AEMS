# Fix Multi-Worker Socket.IO Review Findings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the 10 confirmed findings from the `/code-review` of branch `copilot/implement-socketio-postgres-adapter` (the multi-worker Socket.IO/Redis branch), plus 2 Semgrep supply-chain findings on the same branch's CI config.

**Architecture:** No new architecture. `redis_is_reachable()` is redesigned to ping the live `AsyncRedisManager` connection `sio` already holds (`sio.manager.redis`) instead of a disconnected throwaway client, and `/health` starts returning real HTTP status codes. The rest of the tasks are small, independent fixes across CI config, the Timer dev tools, docs, and tests — each closes exactly the failure window its finding described, nothing more.

**Tech Stack:** FastAPI, python-socketio (`AsyncRedisManager`), redis-py (`redis.asyncio`), pytest / pytest-asyncio, Azure Pipelines YAML.

**Spec:** [docs/superpowers/plans/2026-09-14-multi-worker-socketio-design.md](../../../docs/superpowers/plans/2026-09-14-multi-worker-socketio-design.md) — the design this branch implements; these tasks fix places where the implementation fell short of it or introduced a new problem.

## Global Constraints

- Ruff line length 88; Server's `lint.select` includes `E, F, B, I, N, UP, YTT, ANN, FBT, EM, RUF, PD, TRY, G` (`Server/pyproject.toml`); Timer's is the same minus a few extras (`Timer/pyproject.toml`). `E402` (import not at top of file) is active in both — any import that must run after executable code needs a `# noqa: E402` or a deferred (in-function) import instead.
- `alembic upgrade head` must be run in `Server/` before backend tests (per CLAUDE.md) — assume this has already been done in the dev environment these tasks run in.
- Comments only for the *why*; no section-banner comments (CLAUDE.md, and finding 7 below is literally about this rule).
- Test commands: `cd Server && uv run python -m pytest <path> -v`; `cd Timer && uv run python -m pytest <path> -v`. Async tests use `@pytest.mark.asyncio` (pytest-asyncio strict mode — no `asyncio_mode` config override exists, so every async test needs the marker; see `Server/app/scoring/tests/test_customScoringEndpoints.py` for the existing pattern).
- Commit subject style observed in `git log`: `fix:`, `CI:`, `docs:`, `style:`, `health:`, `e2e:` prefixes — match one of these per task.
- **Task 8 depends on Task 1** (both edit `Server/test_health.py`); do Task 1 first. All other tasks are independent and can be done in any order.

---

### Task 1: Make `/health` check the live Redis connection and return a real status code

**Files:**
- Modify: `Server/app/common/socket_manager.py:52-65` (`redis_is_reachable`)
- Modify: `Server/main.py:141-151` (`health_check`)
- Modify: `Server/app/common/tests/test_socket_manager.py` (reachability tests)
- Modify: `Server/test_health.py` (status-code assertions)
- Modify: `Server/test_blocking_route_handlers.py` (`EXPLICITLY_OFFLOADED`)

**Note on `Server/test_blocking_route_handlers.py`:** this repo has an existing guard test (`test_no_route_runs_database_work_on_the_event_loop`) that fails any `async def` route resolving a DB session unless its blocking work is offloaded via `anyio.to_thread.run_sync` AND it's listed in that file's `EXPLICITLY_OFFLOADED` frozenset — see `POST /addUpdateAthleteScore/...` in `Server/app/scoring/customScoringEndpoints.py` for the established pattern (a plain `def` helper taking `db: Session`, called as `await anyio.to_thread.run_sync(helper, db, ...)`). Step 5 below follows that exact pattern and registers `/health` in the frozenset — do this from the start rather than discovering it via Step 8's full-suite run.

**Interfaces:**
- Produces: `async def redis_is_reachable() -> bool` in `app/common/socket_manager.py` (was `def ... -> bool`). Checks `sio.manager`: if it's not a `socketio.AsyncRedisManager` (in-memory mode), always `True`; if `manager.redis is None` (not connected yet), `False`; otherwise awaits `manager.redis.ping()`, returning `False` on `redis.RedisError`.
- Consumes: `sio` (module global already defined lower in the same file — fine, resolved at call time, same pattern the file already uses); `socketio.AsyncRedisManager` (already imported as `socketio` in this file); `fastapi.responses.JSONResponse` (already imported in `main.py:11`).

Findings fixed: #1 (`/health` always returns HTTP 200), #3 (`redis_is_reachable` can raise instead of returning `False`), #4 (health check pings an unrelated throwaway client, not the real broadcast connection).

- [ ] **Step 1: Replace the reachability tests in `Server/app/common/tests/test_socket_manager.py` with the new async behavior (this is the failing/red step — the current sync `redis_is_reachable` can't be awaited)**

Replace the file's content from the `test_sentinel_is_always_reachable` function onward (keep everything above it — the `get_client_manager` tests — unchanged) with:

```python
@pytest.mark.asyncio
async def test_in_memory_manager_is_always_reachable() -> None:
    with patch.object(socket_manager.sio, "manager", MagicMock()):
        assert await redis_is_reachable() is True


@pytest.mark.asyncio
async def test_reachable_when_the_live_redis_connection_answers() -> None:
    fake_manager = MagicMock(spec=socketio.AsyncRedisManager)
    fake_manager.redis = AsyncMock()
    with patch.object(socket_manager.sio, "manager", fake_manager):
        assert await redis_is_reachable() is True
    fake_manager.redis.ping.assert_awaited_once_with()


@pytest.mark.asyncio
async def test_unreachable_when_the_live_redis_connection_raises() -> None:
    fake_manager = MagicMock(spec=socketio.AsyncRedisManager)
    fake_manager.redis = AsyncMock()
    fake_manager.redis.ping.side_effect = redis.RedisError("down")
    with patch.object(socket_manager.sio, "manager", fake_manager):
        assert await redis_is_reachable() is False


@pytest.mark.asyncio
async def test_unreachable_while_the_manager_has_not_connected_yet() -> None:
    fake_manager = MagicMock(spec=socketio.AsyncRedisManager)
    fake_manager.redis = None
    with patch.object(socket_manager.sio, "manager", fake_manager):
        assert await redis_is_reachable() is False


def test_sio_is_a_real_async_server() -> None:
    assert isinstance(socket_manager.sio, socketio.AsyncServer)
```

And update the file's imports at the top to:

```python
"""Unit tests for how socket_manager reads REDIS_URL and reports reachability."""

import os
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
import redis
import socketio

from app.common import socket_manager
from app.common.socket_manager import IN_MEMORY, get_client_manager, redis_is_reachable

REDIS_URL = "redis://localhost:6379/0"
TIMEOUTS = {"socket_connect_timeout": 2, "socket_timeout": 2}
```

(The four `get_client_manager` tests below this stay exactly as they are today — only the imports and the reachability tests change.)

- [ ] **Step 2: Run the tests and confirm the new ones fail**

Run: `cd Server && uv run python -m pytest app/common/tests/test_socket_manager.py -v`
Expected: the 4 new `async def test_*` functions FAIL with `TypeError: object bool can't be used in 'await' expression` (current `redis_is_reachable` is still sync); the pre-existing `get_client_manager` tests still PASS.

- [ ] **Step 3: Redesign `redis_is_reachable()` in `Server/app/common/socket_manager.py`**

Replace:

```python
def redis_is_reachable() -> bool:
    """True when Redis answers, and when in-memory was configured deliberately."""
    url = _configured_redis_url()
    if url is None:
        return True
    try:
        redis.Redis.from_url(
            url,
            socket_connect_timeout=_TIMEOUT_SECONDS,
            socket_timeout=_TIMEOUT_SECONDS,
        ).ping()
    except redis.RedisError:
        return False
    return True
```

with:

```python
async def redis_is_reachable() -> bool:
    """True when the live Redis connection answers, or in-memory was chosen deliberately.

    Pings sio.manager's own connection rather than a fresh one, so this
    reflects the connection real broadcasts actually use.
    """
    manager = sio.manager
    if not isinstance(manager, socketio.AsyncRedisManager):
        return True
    if manager.redis is None:
        return False
    try:
        await manager.redis.ping()
    except redis.RedisError:
        return False
    return True
```

`_TIMEOUT_SECONDS` and `_configured_redis_url()` stay as they are — both are still used by `get_client_manager()`.

- [ ] **Step 4: Run the tests again and confirm they pass**

Run: `cd Server && uv run python -m pytest app/common/tests/test_socket_manager.py -v`
Expected: all tests PASS.

- [ ] **Step 5: Update `health_check` in `Server/main.py` to await the now-async check, return real status codes, and offload the DB call**

`health_check` becomes `async def` (needed to `await redis_is_reachable()`), and per the note above, an `async def` route resolving a DB session must offload its blocking DB work via `anyio.to_thread.run_sync` — mirroring `_persist_athlete_score` / `update_athlete_score` in `Server/app/scoring/customScoringEndpoints.py`.

Add to the top-level imports (alphabetical among the third-party imports, same spot `anyio.to_thread` sits in `customScoringEndpoints.py`):

```python
import anyio.to_thread
```

(goes right after the blank line following `from collections.abc import Awaitable, Callable`, before `import socketio as _socketio`)

Replace:

```python
@app.get("/health", tags=["health"])
def health_check(db: Session = Depends(get_transaction_session)) -> dict:
    try:
        result = db.execute(text("SELECT 1"))
        if result.scalar() != 1:
            return {"status": "unknown"}
    except SQLAlchemyError:
        return {"status": "unhealthy"}
    if not redis_is_reachable():
        return {"status": "unhealthy"}
    return {"status": "healthy"}
```

with:

```python
def _check_database(db: Session) -> str:
    """The DB portion of /health: "healthy", "unknown", or "unhealthy"."""
    try:
        result = db.execute(text("SELECT 1"))
    except SQLAlchemyError:
        return "unhealthy"
    return "healthy" if result.scalar() == 1 else "unknown"


@app.get("/health", tags=["health"])
async def health_check(db: Session = Depends(get_transaction_session)) -> JSONResponse:
    db_status = await anyio.to_thread.run_sync(_check_database, db)
    if db_status != "healthy":
        return JSONResponse(status_code=503, content={"status": db_status})
    if not await redis_is_reachable():
        return JSONResponse(status_code=503, content={"status": "unhealthy"})
    return JSONResponse(status_code=200, content={"status": "healthy"})
```

- [ ] **Step 5b: Register `/health` as an explicitly-offloaded route**

In `Server/test_blocking_route_handlers.py`, replace:

```python
# Handlers that are async def and take a database session, but hand the blocking
# work to a worker thread themselves with anyio.to_thread. They are correct, so
# they are not regressions. Their offloading is covered by the timing test in
# performance/test_event_loop_concurrency.py.
EXPLICITLY_OFFLOADED = frozenset(
    {
        "POST /addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}",
    }
)
```

with:

```python
# Handlers that are async def and take a database session, but hand the blocking
# work to a worker thread themselves with anyio.to_thread. They are correct, so
# they are not regressions. Where the offloaded work is heavy enough to time
# reliably, it is also covered by performance/test_event_loop_concurrency.py
# (/health's SELECT 1 isn't, which is exactly what this file exists for).
EXPLICITLY_OFFLOADED = frozenset(
    {
        "POST /addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}",
        "GET /health",
    }
)
```

- [ ] **Step 5c: Run the blocking-route guard test**

Run: `cd Server && uv run python -m pytest test_blocking_route_handlers.py -v`
Expected: PASS (with `/health` now offloaded and registered, the guard no longer flags it).

- [ ] **Step 6: Add status-code assertions to `Server/test_health.py`**

Replace the two test bodies:

```python
def test_healthy_when_database_and_redis_answer(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=True):
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_unhealthy_when_redis_is_unreachable(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=False):
        response = client.get("/health")

    assert response.status_code == 503
    assert response.json() == {"status": "unhealthy"}
```

(`patch("main.redis_is_reachable", return_value=True)` keeps working unchanged — `unittest.mock.patch` auto-detects that the target is now an async function and creates an `AsyncMock`, so `await main.redis_is_reachable()` resolves to `True`/`False` as before.)

- [ ] **Step 7: Run both test files together**

Run: `cd Server && uv run python -m pytest test_health.py app/common/tests/test_socket_manager.py -v`
Expected: all PASS.

- [ ] **Step 8: Run the full backend suite as a regression check**

Run: `cd Server && uv run python -m pytest -q`
Expected: all PASS (confirms nothing else called the old sync `redis_is_reachable` or depended on `/health`'s old dict-returning signature — a repo-wide grep during planning found only `main.py` and these two test files reference it).

- [ ] **Step 9: Commit**

```bash
git add Server/app/common/socket_manager.py Server/main.py Server/app/common/tests/test_socket_manager.py Server/test_health.py Server/test_blocking_route_handlers.py
git commit -m "$(cat <<'EOF'
fix: make /health check the live Redis connection and return a real status code

redis_is_reachable() now pings sio.manager's own connection instead of a
disconnected throwaway client, so /health reflects the connection real
broadcasts actually use. health_check() returns 503 for any non-healthy
status so docker-compose's `curl -f` healthcheck can actually detect it.

Making health_check async (needed to await redis_is_reachable()) means its
DB check must move off the event loop too, per this repo's existing
test_blocking_route_handlers.py guard -- offloaded via anyio.to_thread.run_sync,
the same pattern update_athlete_score already uses.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Let `buildOpenApiJson.py` run without a real REDIS_URL

**Files:**
- Modify: `Server/scripts/buildOpenApiJson.py`

**Interfaces:** none (self-contained script fix).

Finding fixed: #2 (eager import-time Redis construction crashes any non-pytest entrypoint).

- [ ] **Step 1: Reproduce the crash**

Run: `cd Server && env -u REDIS_URL uv run python -m scripts.buildOpenApiJson`
Expected: FAILS with `ValueError: REDIS_URL must be a redis:// URL, or 'memory' to select the in-memory manager...`

- [ ] **Step 2: Default REDIS_URL to the in-memory sentinel before importing `main`**

Replace the full content of `Server/scripts/buildOpenApiJson.py`:

```python
import json

from fastapi.openapi.utils import get_openapi
from starlette.routing import WebSocketRoute

from main import app

print(f"Total Routes: {len(app.routes)}")
http_routes = [r for r in app.routes if not isinstance(r, WebSocketRoute)]
print(f"HTTP Routes: {len(http_routes)}")


openapi_schema = get_openapi(
    title=app.title,
    version=app.version,
    openapi_version=app.openapi_version,
    description=app.description,
    routes=http_routes,
)


with open("../Common/openapi.json", "w") as f:
    json.dump(
        openapi_schema,
        f,
    )
```

with:

```python
import json
import os

from fastapi.openapi.utils import get_openapi
from starlette.routing import WebSocketRoute

# main -> app.common.socket_manager builds its Redis client manager at import
# time, so REDIS_URL must be set before `from main import app` runs. This
# script only reads app.routes for the OpenAPI schema, so the in-memory
# sentinel (also used by Server/conftest.py for the same reason) is correct
# even when no Redis is running.
os.environ.setdefault("REDIS_URL", "memory")

from main import app

print(f"Total Routes: {len(app.routes)}")
http_routes = [r for r in app.routes if not isinstance(r, WebSocketRoute)]
print(f"HTTP Routes: {len(http_routes)}")


openapi_schema = get_openapi(
    title=app.title,
    version=app.version,
    openapi_version=app.openapi_version,
    description=app.description,
    routes=http_routes,
)


with open("../Common/openapi.json", "w") as f:
    json.dump(
        openapi_schema,
        f,
    )
```

- [ ] **Step 3: Verify the fix**

Run: `cd Server && env -u REDIS_URL uv run python -m scripts.buildOpenApiJson`
Expected: succeeds, prints `Total Routes: ...` / `HTTP Routes: ...`, writes `Common/openapi.json`.

Then run: `cd Server && uv run ruff check scripts/buildOpenApiJson.py`
Expected: no errors. (Verified: ruff's E402 does not flag `from main import app` here even though it follows the `os.environ.setdefault(...)` call — no `# noqa` needed.)

Then check whether the regenerated schema actually changed (it shouldn't — no API surface changed, only this script's own preamble): `git diff --stat ../Common/openapi.json` from `Server/`. If it shows no diff, nothing further to do; if it shows a diff, run `git checkout -- Common/openapi.json` from the repo root to discard the incidental regeneration before committing.

- [ ] **Step 4: Commit**

```bash
git add Server/scripts/buildOpenApiJson.py
git commit -m "$(cat <<'EOF'
fix: let buildOpenApiJson.py run without a real REDIS_URL

main -> app.common.socket_manager validates REDIS_URL at import time, which
broke this script (and the documented buildApi.sh workflow) whenever it's
run outside pytest without Redis configured. The script only reads
app.routes, so default to the in-memory sentinel Server/conftest.py already
uses for the same reason.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Fail the CI "Start Redis" step when Redis never answers PING

**Files:**
- Modify: `azure-pipelines.yml:170-177`

**Interfaces:** none (CI script only).

Finding fixed: #5 (Redis readiness loop has no failure check).

- [ ] **Step 1: Reproduce the current silent-pass behavior locally**

Run:
```bash
bash -c '
for i in $(seq 1 3); do
  docker exec nonexistent-container-xyz redis-cli ping | grep -q PONG && break || sleep 1
done
echo "exit code: $?"
'
```
Expected: `exit code: 0` even though `docker exec` never succeeded — the loop's exit status is just `sleep`'s, not a real check.

- [ ] **Step 2: Add an explicit failure check to the "Start Redis" step**

Replace:

```yaml
      - script: |
          docker run -d --name redis-e2e \
            -p 6379:6379 \
            redis:7-alpine
          for i in $(seq 1 15); do
            docker exec redis-e2e redis-cli ping | grep -q PONG && break || sleep 1
          done
        displayName: "Start Redis"
```

with:

```yaml
      - script: |
          docker run -d --name redis-e2e \
            -p 6379:6379 \
            redis:7-alpine
          ready=false
          for i in $(seq 1 15); do
            docker exec redis-e2e redis-cli ping | grep -q PONG && ready=true && break
            sleep 1
          done
          if [ "$ready" != "true" ]; then
            echo "redis-e2e did not respond to PING within 15s" >&2
            exit 1
          fi
        displayName: "Start Redis"
```

- [ ] **Step 3: Verify the corrected loop actually fails**

Run:
```bash
bash -c '
ready=false
for i in $(seq 1 3); do
  docker exec nonexistent-container-xyz redis-cli ping | grep -q PONG && ready=true && break
  sleep 1
done
if [ "$ready" != "true" ]; then
  echo "redis-e2e did not respond to PING within 15s" >&2
  exit 1
fi
'
echo "exit code: $?"
```
Expected: prints the stderr message, `exit code: 1`.

- [ ] **Step 4: Commit**

```bash
git add azure-pipelines.yml
git commit -m "$(cat <<'EOF'
CI: fail the Start Redis step when Redis never answers PING

The retry loop had no failure check after it, so a Redis that never came up
still reported the step as green -- the real failure only surfaced two
steps later as a confusing Start Backend timeout.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Force `fake_timer.py` onto the websocket transport like `timer.py`

**Files:**
- Modify: `Timer/src/fake_timer.py:13`

**Interfaces:** none.

Finding fixed: #6 (`fake_timer.py` not updated alongside `timer.py`'s transport fix). This is a one-line kwarg addition to a manual dev script with no existing test coverage (`Timer/tests/test_timer.py` only imports `timer`, not `fake_timer`) — per YAGNI, no new test file is added for it; verification is the grep check below.

- [ ] **Step 1: Confirm the current mismatch**

Run: `grep -n "transports" /workspaces/AEMS/Timer/src/timer.py /workspaces/AEMS/Timer/src/fake_timer.py`
Expected: only `timer.py`'s `run_socketio_loop()` call shows `transports=["websocket"]`; `fake_timer.py` has no match.

- [ ] **Step 2: Add the same transport pin to `fake_timer.py`**

Replace:

```python
        sio.connect(SIO_SERVER_URL, namespace="/timer", socketio_path=SIO_PATH)
```

with:

```python
        sio.connect(
            SIO_SERVER_URL,
            namespace="/timer",
            socketio_path=SIO_PATH,
            transports=["websocket"],
        )
```

- [ ] **Step 3: Verify**

Run: `grep -n "transports" /workspaces/AEMS/Timer/src/timer.py /workspaces/AEMS/Timer/src/fake_timer.py`
Expected: both files' `.connect()` calls now pass `transports=["websocket"]`.

- [ ] **Step 4: Commit**

```bash
git add Timer/src/fake_timer.py
git commit -m "$(cat <<'EOF'
fix: force fake_timer.py onto the websocket transport like timer.py

fake_timer.py is the documented way to manually exercise the Socket.IO
server (docs/smg.md), but its polling-first handshake can still hit the
multi-worker 'Session ID unknown' reconnect bug this branch fixed for the
real timer client.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Remove the new section-banner comment in `test_timer.py`

**Files:**
- Modify: `Timer/tests/test_timer.py:443-450`

**Interfaces:** none.

Finding fixed: #7 (CLAUDE.md explicitly prohibits section-banner comments; this one was newly added by this branch). Only the banner *introduced by this branch* is removed — an identical, pre-existing banner earlier in the same file (around `TestStartSocketIOThread`, line 419) predates this PR and is out of scope.

- [ ] **Step 1: Remove the banner**

Replace:

```python
            mock_thread_cls.assert_not_called()


# ===========================================================================
# run_socketio_loop() transport
# ===========================================================================


class TestSocketIOTransport:
```

with:

```python
            mock_thread_cls.assert_not_called()


class TestSocketIOTransport:
```

- [ ] **Step 2: Confirm no lint regression (e.g. too-many-blank-lines)**

Run: `cd Timer && uv run ruff check tests/test_timer.py`
Expected: no errors.

- [ ] **Step 3: Confirm the tests still pass**

Run: `cd Timer && uv run python -m pytest tests/test_timer.py -v -k TestSocketIOTransport`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add Timer/tests/test_timer.py
git commit -m "$(cat <<'EOF'
style: drop the new section-banner comment in test_timer.py

CLAUDE.md explicitly asks for no section-banner comments; the class name
and docstring already say what the tests below it cover.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Correct ADR006's stale long-polling fallback claim

**Files:**
- Modify: `docs/decisions/ADR006-update-websockets-to-socketio.md:84`

**Interfaces:** none (docs only).

Finding fixed: #8 (ADR006 still describes an HTTP long-polling fallback this branch removed).

- [ ] **Step 1: Edit the stale bullet**

Replace:

```
- Socket.IO is not a pure WebSocket protocol; it uses its own framing on top of WebSocket (or HTTP long-polling as a fallback). Any non-Socket.IO WebSocket client connecting to the `/socket.io/` endpoint will not work.
```

with:

```
- Socket.IO is not a pure WebSocket protocol; it uses its own framing on top of WebSocket. Every client (Timer, browser, and the server's own `AsyncRedisManager`) is pinned to `transports=["websocket"]` with no HTTP long-polling fallback, because AEMS now runs multiple Gunicorn workers behind Redis and a polling handshake's follow-up requests can land on a worker that never saw the Engine.IO session. Any non-Socket.IO WebSocket client connecting to the `/socket.io/` endpoint will not work.
```

- [ ] **Step 2: Verify no other stale reference remains**

Run: `grep -n "long-polling" /workspaces/AEMS/docs/decisions/ADR006-update-websockets-to-socketio.md`
Expected: only the corrected sentence above matches; it no longer claims long-polling is available as a fallback.

- [ ] **Step 3: Commit**

```bash
git add docs/decisions/ADR006-update-websockets-to-socketio.md
git commit -m "$(cat <<'EOF'
docs: correct ADR006's stale long-polling fallback claim

This branch pins every Socket.IO client to transports=["websocket"] to fix
a multi-worker Engine.IO session bug, removing the long-polling fallback
ADR006 still described as available.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Surface real CI teardown failures instead of swallowing them

**Files:**
- Modify: `azure-pipelines.yml:261-263`

**Interfaces:** none.

Finding fixed: #9 (`docker rm -f postgres-e2e redis-e2e || true` swallows every teardown failure, not just the leaked-container case it replaced).

- [ ] **Step 1: Reproduce the masking behavior**

Run:
```bash
bash -c '
docker rm -f nonexistent-container-abc nonexistent-container-xyz || true
echo "exit code: $?"
'
```
Expected: `exit code: 0` even though both removals genuinely failed ("No such container").

- [ ] **Step 2: Make both removals independent, and only pass when both succeed**

Replace:

```yaml
      - script: |
          docker rm -f postgres-e2e redis-e2e || true
        displayName: "Stop Services"
        condition: always()
```

with:

```yaml
      - script: |
          status=0
          docker rm -f postgres-e2e || status=1
          docker rm -f redis-e2e || status=1
          exit $status
        displayName: "Stop Services"
        condition: always()
```

This keeps the original bug fixed (one container's removal failing no longer skips the other's — both `docker rm` lines always run) while no longer hiding a genuine failure behind `|| true`.

- [ ] **Step 3: Verify both failure and both-attempted behavior**

Run:
```bash
bash -c '
status=0
docker rm -f nonexistent-container-abc || status=1
docker rm -f nonexistent-container-xyz || status=1
exit $status
'
echo "exit code: $?"
```
Expected: both `docker rm` calls print "No such container" and the script exits `1` (both were still attempted — the second line is not skipped by the first's failure).

- [ ] **Step 4: Commit**

```bash
git add azure-pipelines.yml
git commit -m "$(cat <<'EOF'
CI: surface real teardown failures instead of swallowing them

`docker rm -f postgres-e2e redis-e2e || true` fixed the old leaked-container
bug (one failure skipping the other's removal) but silenced every teardown
failure along with it. Run both removals unconditionally and only pass the
step when both actually succeed.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Dedupe `test_health.py`'s DB-session fixture into `Server/conftest.py`

**Depends on Task 1** (edits the version of `Server/test_health.py` Task 1 produces).

**Files:**
- Modify: `Server/conftest.py`
- Modify: `Server/test_health.py`

**Interfaces:**
- Produces (in `Server/conftest.py`): `mock_db_session` fixture (`-> MagicMock`, pre-wired so `db.execute(...).scalar()` returns `1`) and `client` fixture (`-> Generator[TestClient]`, overrides `get_transaction_session` via `app.dependency_overrides`).
- Consumes: nothing new.

Finding fixed: #10. Note on scope: `Server/app/crud/tests/conftest.py` has its own `mock_db_session`/`test_client` fixture pair using the same `app.dependency_overrides` mechanism — that one is intentionally left alone here (it's used by many existing CRUD tests; touching it is a separate, higher-blast-radius change). `Server/app/conftest.py`'s *different* autouse `mock_db_session` fixture (which patches `db.client.get_transaction_session` as a context manager) does **not** apply here: `/health` uses `Depends(get_transaction_session)`, which FastAPI drives as a generator directly, not via `__enter__`/`__exit__`, so that fixture wouldn't actually mock this route's DB call. `Server/test_health.py` living at the `Server/` root (not under `app/`) means neither existing fixture is in scope for it anyway — hoisting a correctly-mechanismed pair into the already-new `Server/conftest.py` (an ancestor of both `test_health.py` and `app/crud/tests/`) is the smallest fix that actually removes the duplication for this file, without touching the CRUD tests' unrelated, already-passing fixtures (pytest fixture resolution lets a closer-scoped same-named fixture — which `app/crud/tests/conftest.py` and `app/conftest.py` already have — override this root one, so neither existing subtree changes behavior).

- [ ] **Step 1: Add the shared fixtures to `Server/conftest.py`**

Replace the full content of `Server/conftest.py`:

```python
import os

# socket_manager requires REDIS_URL; the unit suite runs with no services, so
# this names the sentinel explicitly. setdefault lets a real Redis still win.
os.environ.setdefault("REDIS_URL", "memory")
```

with:

```python
import os
from collections.abc import Generator
from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.client import get_transaction_session

# socket_manager requires REDIS_URL; the unit suite runs with no services, so
# this names the sentinel explicitly. setdefault lets a real Redis still win.
os.environ.setdefault("REDIS_URL", "memory")


@pytest.fixture
def mock_db_session() -> MagicMock:
    """A mocked DB session pre-wired to report a healthy `SELECT 1`."""
    session = MagicMock(spec=Session)
    session.execute.return_value.scalar.return_value = 1
    return session


@pytest.fixture
def client(mock_db_session: MagicMock) -> Generator[TestClient]:
    from main import app  # deferred: needs REDIS_URL set above, first

    app.dependency_overrides[get_transaction_session] = lambda: mock_db_session
    yield TestClient(app)
    app.dependency_overrides.clear()
```

(`from db.client import get_transaction_session` is safe at module level here — `db/client.py` doesn't import `main` or `app.common.socket_manager`, so it doesn't trigger the REDIS_URL check; only `from main import app` does, which is why that one stays deferred inside the fixture function.)

- [ ] **Step 2: Drop the now-duplicated fixture from `Server/test_health.py`**

Replace the full content of `Server/test_health.py` (this is the version Task 1 produced — with the 503 status-code assertions already in place):

```python
"""The /health endpoint must fail the container when Redis is gone.

Compose routes every broadcast through Redis, so a server that cannot reach it
is not serving judges even though its database answers.
"""

from collections.abc import Generator
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from db.client import get_transaction_session
from main import app


@pytest.fixture
def client() -> Generator[TestClient]:
    session = MagicMock()
    session.execute.return_value.scalar.return_value = 1
    app.dependency_overrides[get_transaction_session] = lambda: session
    yield TestClient(app)
    app.dependency_overrides.clear()


def test_healthy_when_database_and_redis_answer(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=True):
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_unhealthy_when_redis_is_unreachable(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=False):
        response = client.get("/health")

    assert response.status_code == 503
    assert response.json() == {"status": "unhealthy"}
```

with:

```python
"""The /health endpoint must fail the container when Redis is gone.

Compose routes every broadcast through Redis, so a server that cannot reach it
is not serving judges even though its database answers.
"""

from unittest.mock import patch

from fastapi.testclient import TestClient


def test_healthy_when_database_and_redis_answer(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=True):
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_unhealthy_when_redis_is_unreachable(client: TestClient) -> None:
    with patch("main.redis_is_reachable", return_value=False):
        response = client.get("/health")

    assert response.status_code == 503
    assert response.json() == {"status": "unhealthy"}
```

(`client` is now supplied by `Server/conftest.py` automatically — pytest fixture auto-discovery, no import needed.)

- [ ] **Step 3: Run the health tests**

Run: `cd Server && uv run python -m pytest test_health.py -v`
Expected: both tests PASS.

- [ ] **Step 4: Run the CRUD tests to confirm their own fixtures still take precedence**

Run: `cd Server && uv run python -m pytest app/crud/tests/ -v`
Expected: all PASS unchanged (their local `mock_db_session`/`test_client` fixtures in `app/crud/tests/conftest.py` shadow the new root-level ones by name).

- [ ] **Step 5: Run the full backend suite as a final regression check**

Run: `cd Server && uv run python -m pytest -q`
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add Server/conftest.py Server/test_health.py
git commit -m "$(cat <<'EOF'
test: share test_health.py's mocked-DB fixture via Server/conftest.py

test_health.py reimplemented the same app.dependency_overrides-based
mock-session pattern app/crud/tests/conftest.py already uses. Hoist it into
the new root Server/conftest.py, the closest common ancestor, without
touching the CRUD tests' own (differently-scoped) fixtures of the same name.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Run Playwright via its local binary instead of `npx`

**Files:**
- Modify: `azure-pipelines.yml:244` and `azure-pipelines.yml:249`

**Interfaces:** none.

Findings fixed: the two Semgrep findings on `azure-pipelines.yml:249` ("Define exact package version to avoid installing unverified releases" / "`npx` can install packages on-demand and run their lifecycle scripts") — and the identical `npx playwright install` call at line 244, which has the same shape. `npm ci` runs immediately before both calls in the same `e2e/` `workingDirectory`, so `node_modules/.bin/playwright` is guaranteed to exist; calling it directly removes `npx`'s on-demand-install ambiguity entirely (rather than pinning `npx playwright@<version>`, which would just add a second place — alongside `e2e/package-lock.json` — that has to be kept in sync by hand).

- [ ] **Step 1: Confirm both occurrences**

Run: `grep -n "npx " /workspaces/AEMS/azure-pipelines.yml`
Expected: two matches, at `Install Playwright` and `Run E2E Tests`.

- [ ] **Step 2: Replace both `npx playwright` calls with the local binary**

Replace:

```yaml
      - script: |
          npm ci
          npx playwright install --with-deps chromium
        displayName: "Install Playwright"
        workingDirectory: $(Build.SourcesDirectory)/e2e
```

with:

```yaml
      - script: |
          npm ci
          ./node_modules/.bin/playwright install --with-deps chromium
        displayName: "Install Playwright"
        workingDirectory: $(Build.SourcesDirectory)/e2e
```

Replace:

```yaml
      - script: |
          FRONTEND_URL=http://localhost:3000 BACKEND_URL=http://localhost:8000 SECOND_BACKEND_URL=http://localhost:8001 npx playwright test
        displayName: "Run E2E Tests"
        workingDirectory: $(Build.SourcesDirectory)/e2e
```

with:

```yaml
      - script: |
          FRONTEND_URL=http://localhost:3000 BACKEND_URL=http://localhost:8000 SECOND_BACKEND_URL=http://localhost:8001 ./node_modules/.bin/playwright test
        displayName: "Run E2E Tests"
        workingDirectory: $(Build.SourcesDirectory)/e2e
```

- [ ] **Step 3: Verify the local binary resolves and runs, matching what `npx` was doing**

Run:
```bash
cd e2e && npm ci && ./node_modules/.bin/playwright --version
```
Expected: prints a version string (matching the `playwright` version pinned in `e2e/package-lock.json`, e.g. `Version 1.58.2`) with no network install prompt.

- [ ] **Step 4: Commit**

```bash
git add azure-pipelines.yml
git commit -m "$(cat <<'EOF'
CI: run Playwright via its local binary instead of npx

npx can resolve and execute an on-demand package (with its install/lifecycle
scripts) if the local one is ever missing or shadowed. npm ci in the same
step already guarantees node_modules/.bin/playwright exists, so call it
directly and remove that ambiguity.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
