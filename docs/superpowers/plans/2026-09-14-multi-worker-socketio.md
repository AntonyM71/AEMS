# Multi-worker Socket.IO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make AEMS Server correct under four Gunicorn workers, so every judge receives every broadcast regardless of which worker served the request, and prove it with tests that fail if the cross-worker path breaks.

**Architecture:** Socket.IO clients drop the HTTP long-polling handshake and connect over WebSocket only, so each connection pins to one worker for its life and no Engine.IO session state has to be shared. A Redis client manager fans emits out to every worker. `REDIS_URL` becomes a required variable with an explicit `memory` sentinel, so no configuration can select the in-memory manager by accident.

**Tech Stack:** python-socketio (`AsyncServer`, `AsyncRedisManager`), redis-py, FastAPI, Gunicorn + uvicorn workers, socket.io-client, Playwright, pytest, Jest.

**Spec:** `docs/superpowers/specs/2026-09-14-multi-worker-socketio-design.md`

## Global Constraints

- Ruff must pass on every changed Python file: `uv run ruff check .` and `uv run ruff format .` from `Server/` (and from `Timer/` for timer changes). Line length 88; enabled rule sets include ANN (annotations required), N, UP, B, EM (no string literals inside `raise`), TRY, PD, G.
- `uv run python -m pytest` from `Server/` must pass after every task. It runs with coverage and `--ignore=performance`.
- The frontend must pass `npm run precommit` (tsc + lint + prettier) from `Webapp/` after frontend changes.
- The Python CI job must keep running with **no services** — no Postgres, no Redis. Any change that requires a service in that job is wrong.
- Do not introduce `pydantic-settings`. Required environment variables follow `get_database_address()` in `Server/db/client.py`: a named function that raises `ValueError`.
- Comments are a last resort, and docstrings are one or two lines (`CLAUDE.md`). Do not restate what a name or type already says.
- Tasks are ordered so every commit leaves the tree working. Do not reorder them. In particular the transport change (Tasks 1-2) must land before CI switches to multiple workers (Task 6), or the existing Playwright suite will break.
- End every commit message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

## File Structure

| Task | Files |
|---|---|
| 1 | `Webapp/src/components/roles/headJudge/WebSocketConnections.ts`, `Webapp/src/components/roles/headJudge/__tests__/WebSocketConnections.test.ts` (create) |
| 2 | `Timer/src/timer.py`, `Timer/tests/conftest.py`, `Timer/tests/test_timer.py` |
| 3 | `Server/Dockerfile`, `.devcontainer/.env`, `Server/pyproject.toml`, `Server/uv.lock` |
| 4 | `Server/app/common/socket_manager.py`, `Server/app/common/tests/test_socket_manager.py`, `Server/conftest.py` (create) |
| 5 | `Server/main.py`, `Server/test_health.py` (create) |
| 6 | `azure-pipelines.yml` |
| 7 | `e2e/tests/helpers/testData.ts` (create), `e2e/tests/websocket.spec.ts`, `e2e/tests/multi-worker.spec.ts` (create), `e2e/package.json` |

No production module is split. `socket_manager.py` gains three small functions in place of one module-level expression; it stays a single file with one responsibility.

---

## Task 1: WebSocket-only transport in the webapp

`socket.io-client` defaults to `transports: ["polling", "websocket"]`. The polling handshake sends its follow-up requests on new TCP connections, which land on an arbitrary Gunicorn worker that has never seen the session id. Forcing WebSocket means one connection, one worker, for the life of the socket.

**Files:**
- Modify: `Webapp/src/components/roles/headJudge/WebSocketConnections.ts`
- Test: `Webapp/src/components/roles/headJudge/__tests__/WebSocketConnections.test.ts` (create)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: the four exported connectors keep their existing names and `(): Socket` signatures — `connectWebRunStatusSocket`, `connectTimerSocket`, `connectCurrentScoreStatusSocket`, `connectBroadcastControlSocket`. Only the options passed to `io()` change.

- [ ] **Step 1: Write the failing test**

Create `Webapp/src/components/roles/headJudge/__tests__/WebSocketConnections.test.ts`:

```ts
import { io } from "socket.io-client"

import {
	connectBroadcastControlSocket,
	connectCurrentScoreStatusSocket,
	connectTimerSocket,
	connectWebRunStatusSocket
} from "../WebSocketConnections"

// jest.mock is hoisted above the imports, so `io` above is already the mock.
jest.mock("socket.io-client", () => ({
	io: jest.fn(() => ({}))
}))

describe("WebSocketConnections", () => {
	beforeEach(() => {
		;(io as jest.Mock).mockClear()
	})

	const connectors = [
		["run status", connectWebRunStatusSocket, "/run_status"],
		["timer", connectTimerSocket, "/timer"],
		["current scores", connectCurrentScoreStatusSocket, "/current_scores"],
		["broadcast control", connectBroadcastControlSocket, "/broadcast_control"]
	] as const

	it.each(connectors)(
		"the %s socket connects over websocket only",
		(_name, connect, namespace) => {
			connect()

			const [url, options] = (io as jest.Mock).mock.calls[0]
			expect(url).toContain(namespace)
			expect(options.transports).toEqual(["websocket"])
		}
	)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run from `Webapp/`: `npx jest src/components/roles/headJudge/__tests__/WebSocketConnections.test.ts`

Expected: FAIL — `options.transports` is `undefined`, because `io()` is currently called with only `{ path, reconnection: true }`.

- [ ] **Step 3: Write the implementation**

Replace the top of `Webapp/src/components/roles/headJudge/WebSocketConnections.ts` (the import and `socketConfig`) with:

```ts
import {
	io,
	Socket,
	type ManagerOptions,
	type SocketOptions
} from "socket.io-client"

const socketConfig = (): {
	origin: string
	options: Partial<ManagerOptions & SocketOptions>
} => {
	const isProd = process.env.NEXT_PUBLIC_ENV === "prod"
	const path = isProd ? "/api/socket.io/" : "/socket.io/"
	const origin = isProd
		? window.location.origin
		: `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT ?? "8000"}`

	// The server runs several Gunicorn workers which do not share Engine.IO
	// session state, so a polling handshake would send its follow-up requests to
	// a worker that has never seen the session.
	return {
		origin,
		options: { path, reconnection: true, transports: ["websocket"] }
	}
}
```

Then change each of the four connectors to destructure and pass `options`. For example:

```ts
export const connectWebRunStatusSocket = (): Socket => {
	const { origin, options } = socketConfig()

	return io(`${origin}/run_status`, options)
}
```

Apply the identical change to `connectTimerSocket` (`/timer`), `connectCurrentScoreStatusSocket` (`/current_scores`) and `connectBroadcastControlSocket` (`/broadcast_control`). Do not change their names, return types, or namespaces.

- [ ] **Step 4: Run the test to verify it passes**

Run from `Webapp/`: `npx jest src/components/roles/headJudge/__tests__/WebSocketConnections.test.ts`

Expected: PASS, 4 tests.

- [ ] **Step 5: Check types and lint**

Run from `Webapp/`: `npm run precommit`

Expected: tsc reports no errors. If `transports` is rejected as `string[]`, the return type annotation on `socketConfig` is missing — it is what contextually types the array literal.

- [ ] **Step 6: Commit**

```bash
git add Webapp/src/components/roles/headJudge/WebSocketConnections.ts \
        Webapp/src/components/roles/headJudge/__tests__/WebSocketConnections.test.ts
git commit -m "webapp: connect Socket.IO over websocket only

Gunicorn workers do not share Engine.IO session state, so the default
polling handshake sends its follow-up requests to a worker that has never
seen the session id and gets a 400 back.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2: WebSocket-only transport in the timer

`socketio.SimpleClient` has the same polling-first default as the JavaScript client, so the physical timer box would hit the same reconnect loop.

**Files:**
- Modify: `Timer/src/timer.py:158-164` (the `sio_client.connect(...)` call)
- Modify: `Timer/tests/conftest.py:34-47` (`_FakeSimpleClient`)
- Test: `Timer/tests/test_timer.py`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `_FakeSimpleClient.last_connect_kwargs`, a class attribute of type `dict` holding the keyword arguments of the most recent `connect()` call.

- [ ] **Step 1: Record connect arguments in the test double**

In `Timer/tests/conftest.py`, change `_FakeSimpleClient` so the class records what it was connected with:

```python
class _FakeSimpleClient:
    """Minimal stand-in for socketio.SimpleClient."""

    last_connect_kwargs: ClassVar[dict] = {}

    def __init__(self) -> None:
        self.connected = True
        self._emitted: list = []

    def connect(self, *args, **kwargs) -> None:  # noqa: ANN002, ANN003
        _FakeSimpleClient.last_connect_kwargs = kwargs
```

Leave `emit`, `disconnect`, `__enter__` and `__exit__` exactly as they are. Add `from typing import ClassVar` to the imports at the top of the file.

- [ ] **Step 2: Write the failing test**

Append to `Timer/tests/test_timer.py`:

```python
class TestSocketIOTransport:
    def test_connects_over_websocket_only(
        self, monkeypatch: pytest.MonkeyPatch
    ) -> None:
        """Gunicorn workers do not share Engine.IO sessions, so polling breaks."""

        def stop_after_first_pass(_client: object) -> None:
            timer.socketio_running = False

        monkeypatch.setattr(
            timer, "process_message_queue_sync", stop_after_first_pass
        )
        timer.socketio_running = True

        timer.run_socketio_loop()

        assert conftest._FakeSimpleClient.last_connect_kwargs["transports"] == [
            "websocket"
        ]
```

Add `from tests import conftest` to the imports of `Timer/tests/test_timer.py` if it is not already there. The fixture at `Timer/tests/test_timer.py:27-42` already saves and restores `timer.socketio_running`, so setting it here does not leak into other tests.

- [ ] **Step 3: Run the test to verify it fails**

Run from `Timer/`: `uv run python -m pytest tests/test_timer.py::TestSocketIOTransport -v`

Expected: FAIL with `KeyError: 'transports'` — `connect()` is currently called without it.

- [ ] **Step 4: Write the implementation**

In `Timer/src/timer.py`, add the transport to the existing `connect` call:

```python
                sio_client.connect(
                    SIO_SERVER_URL,
                    namespace="/timer",
                    socketio_path=SIO_PATH,
                    wait_timeout=10,
                    transports=["websocket"],
                )
```

- [ ] **Step 5: Run the tests to verify they pass**

Run from `Timer/`: `uv run python -m pytest tests/ -v`

Expected: PASS, including the whole existing suite — the conftest change must not break any other test.

- [ ] **Step 6: Lint**

Run from `Timer/`: `uv run ruff check . && uv run ruff format --check .`

Expected: no findings.

- [ ] **Step 7: Commit**

```bash
git add Timer/src/timer.py Timer/tests/conftest.py Timer/tests/test_timer.py
git commit -m "timer: connect Socket.IO over websocket only

Matches the webapp. SimpleClient has the same polling-first default, so the
timer box would hit the same reconnect loop against multiple workers.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: Deployment configuration

Set the Redis URL everywhere the application is started, and pin the dependency. This lands **before** the code starts requiring the variable (Task 4) so no intermediate commit leaves a context broken.

**Files:**
- Modify: `Server/Dockerfile:24` (add an `ENV` line above the `CMD`)
- Modify: `.devcontainer/.env`
- Modify: `Server/pyproject.toml:57`
- Modify: `Server/uv.lock` (regenerated, not hand-edited)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `REDIS_URL` is set in the image, the devcontainer, and compose. Task 4 relies on this.

- [ ] **Step 1: Set REDIS_URL in the image**

In `Server/Dockerfile`, add this beside the other `ENV` lines near the top of the file:

```dockerfile
ENV REDIS_URL redis://redis:6379/0
```

The hostname matches the `redis` service in `docker-compose.yaml`. Compose also passes the same value explicitly and continues to.

- [ ] **Step 2: Verify the worker counts already agree**

Run: `grep -n "gunicorn -w" Server/Dockerfile docker-compose.yaml`

Expected: both lines read `-w 4`. If either does not, change it to `-w 4`. A worker count that differs between the image and the compose file is a trap regardless of which number is right.

- [ ] **Step 3: Point the devcontainer at its own Redis**

Append to `.devcontainer/.env`:

```
REDIS_URL=redis://redis:6379/0
```

`.devcontainer/docker-compose.yml` already runs a `redis:7-alpine` service on the `devcontainer` network that nothing currently uses. This makes local development exercise the same code path as production instead of the in-memory fallback.

- [ ] **Step 4: Pin redis**

In `Server/pyproject.toml`, change the dependency line to:

```toml
    "redis>=8.1,<9.0",
```

- [ ] **Step 5: Regenerate the lockfile**

Run from `Server/`:

```bash
uv lock
uv lock --locked
```

Expected: `uv lock --locked` resolves without reporting drift. CI fails the build if the lockfile and `pyproject.toml` disagree.

- [ ] **Step 6: Verify the test suite is unaffected**

Run from `Server/`: `uv run python -m pytest`

Expected: PASS. No code changed, so this is a regression check only.

- [ ] **Step 7: Commit**

```bash
git add Server/Dockerfile .devcontainer/.env Server/pyproject.toml Server/uv.lock
git commit -m "config: set REDIS_URL wherever the server is started

The image ran four workers with no Redis configured, which silently selects
the per-process in-memory manager. The devcontainer already ran a Redis
nothing pointed at. Pin redis to the 8.x the lockfile resolves.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: REDIS_URL becomes mandatory

An absent `REDIS_URL` currently selects the in-memory manager silently. That is correct for one process and a disaster for four, and nothing about the variable's absence distinguishes them. Make it required, with `memory` as the way a configuration asks for in-memory on purpose.

**Files:**
- Modify: `Server/app/common/socket_manager.py`
- Modify: `Server/app/common/tests/test_socket_manager.py` (replace its contents)
- Create: `Server/conftest.py`

**Interfaces:**
- Consumes: `REDIS_URL` set by Task 3 in the image, devcontainer and compose.
- Produces, all in `app.common.socket_manager`:
  - `IN_MEMORY: str` — the sentinel value, `"memory"`.
  - `get_client_manager() -> socketio.AsyncRedisManager | None` — returns `None` for the sentinel, raises `ValueError` for unset or unrecognised values.
  - `redis_is_reachable() -> bool` — `True` when Redis answers a ping, and `True` when the sentinel is configured. Task 5 consumes this.

- [ ] **Step 1: Write the failing tests**

Replace the entire contents of `Server/app/common/tests/test_socket_manager.py` with:

```python
"""Unit tests for how socket_manager reads REDIS_URL."""

import os
from unittest.mock import MagicMock, patch

import pytest
import socketio

from app.common.socket_manager import IN_MEMORY, get_client_manager, redis_is_reachable

REDIS_URL = "redis://localhost:6379/0"
TIMEOUTS = {"socket_connect_timeout": 2, "socket_timeout": 2}


def test_sentinel_selects_the_in_memory_manager() -> None:
    with patch.dict(os.environ, {"REDIS_URL": IN_MEMORY}):
        assert get_client_manager() is None


def test_redis_url_builds_a_manager_with_timeouts() -> None:
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch("socketio.AsyncRedisManager") as mock_manager,
    ):
        get_client_manager()

    mock_manager.assert_called_once_with(REDIS_URL, redis_options=TIMEOUTS)


def test_unset_redis_url_is_rejected() -> None:
    with patch.dict(os.environ):
        os.environ.pop("REDIS_URL", None)
        with pytest.raises(ValueError, match="REDIS_URL"):
            get_client_manager()


@pytest.mark.parametrize("value", ["", "localhost:6379", "http://localhost:6379"])
def test_malformed_redis_url_is_rejected(value: str) -> None:
    with patch.dict(os.environ, {"REDIS_URL": value}), pytest.raises(
        ValueError, match="REDIS_URL"
    ):
        get_client_manager()


def test_sentinel_is_always_reachable() -> None:
    with patch.dict(os.environ, {"REDIS_URL": IN_MEMORY}):
        assert redis_is_reachable() is True


def test_reachable_when_redis_answers() -> None:
    client = MagicMock()
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch("redis.Redis.from_url", return_value=client),
    ):
        assert redis_is_reachable() is True
    client.ping.assert_called_once_with()


def test_unreachable_when_redis_raises() -> None:
    import redis

    client = MagicMock()
    client.ping.side_effect = redis.RedisError("down")
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch("redis.Redis.from_url", return_value=client),
    ):
        assert redis_is_reachable() is False


def test_sio_is_a_real_async_server() -> None:
    from app.common import socket_manager

    assert isinstance(socket_manager.sio, socketio.AsyncServer)
```

Note what is gone: the old file drove the module-level expression with `importlib.reload` and never restored it, leaving `sio` as a `MagicMock` for the rest of the pytest session. Testing a function needs no reload. Do not reintroduce one.

- [ ] **Step 2: Run the tests to verify they fail**

Run from `Server/`: `uv run python -m pytest app/common/tests/test_socket_manager.py -v --no-cov`

Expected: collection fails with `ImportError: cannot import name 'IN_MEMORY'`.

- [ ] **Step 3: Write the implementation**

Replace the entire contents of `Server/app/common/socket_manager.py` with:

```python
import os

import redis
import socketio

IN_MEMORY = "memory"
_REDIS_SCHEMES = ("redis://", "rediss://", "unix://")
_TIMEOUT_SECONDS = 2

_cors_origins_env = os.getenv("CORS_ALLOWED_ORIGINS", "")
_parsed_origins = [
    origin.strip() for origin in _cors_origins_env.split(",") if origin.strip()
]
# Default to "*" when no explicit allowlist is configured so that
# development and E2E environments (where the frontend and backend run on
# different ports) can still establish Socket.IO connections.
socketio_cors_allowed_origins: list[str] | str = (
    _parsed_origins if _parsed_origins else "*"
)


def _configured_redis_url() -> str | None:
    """The Redis URL to use, or None when in-memory was asked for by name."""
    url = os.getenv("REDIS_URL")
    if url == IN_MEMORY:
        return None
    if not url or not url.startswith(_REDIS_SCHEMES):
        msg = (
            f"REDIS_URL must be a redis:// URL, or {IN_MEMORY!r} to select the "
            f"in-memory manager, which is only correct for a single worker. "
            f"Got: {url!r}"
        )
        raise ValueError(msg)
    return url


def get_client_manager() -> socketio.AsyncRedisManager | None:
    """None selects the in-memory manager, which does not share across workers."""
    url = _configured_redis_url()
    if url is None:
        return None
    # Without these, an unreachable Redis blocks emit for the kernel's TCP retry
    # budget, stalling the score submission the emit is part of.
    return socketio.AsyncRedisManager(
        url,
        redis_options={
            "socket_connect_timeout": _TIMEOUT_SECONDS,
            "socket_timeout": _TIMEOUT_SECONDS,
        },
    )


def redis_is_reachable() -> bool:
    """True when Redis answers, and when in-memory was configured deliberately."""
    url = _configured_redis_url()
    if url is None:
        return True
    try:
        redis.Redis.from_url(url, socket_connect_timeout=_TIMEOUT_SECONDS).ping()
    except redis.RedisError:
        return False
    return True


sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=socketio_cors_allowed_origins,
    client_manager=get_client_manager(),
    logger=False,
    engineio_logger=False,
)
```

The unused `logger` from the old file is deliberately gone. Do not add it back.

- [ ] **Step 4: Let the test suite ask for in-memory explicitly**

Create `Server/conftest.py`:

```python
import os

# socket_manager requires REDIS_URL. The unit suite runs with no services, so it
# names the in-memory manager rather than relying on the variable being absent.
# setdefault so a caller that does supply a real Redis still wins.
os.environ.setdefault("REDIS_URL", "memory")
```

This must live at the `Server/` root. The existing `app/conftest.py` and `performance/conftest.py` sit too deep to cover the root-level test modules (`test_blocking_route_handlers.py`, `test_custom_logging.py`), and pytest imports the root conftest before collecting any test module.

- [ ] **Step 5: Run the tests to verify they pass**

Run from `Server/`: `uv run python -m pytest app/common/tests/test_socket_manager.py -v --no-cov`

Expected: PASS, 8 tests.

- [ ] **Step 6: Run the whole suite**

Run from `Server/`: `uv run python -m pytest`

Expected: PASS — all 279 existing tests plus the new ones. If anything fails with `object MagicMock can't be used in 'await' expression`, a reload has been reintroduced somewhere.

- [ ] **Step 7: Lint**

Run from `Server/`: `uv run ruff check . && uv run ruff format --check .`

Expected: no findings.

- [ ] **Step 8: Commit**

```bash
git add Server/app/common/socket_manager.py \
        Server/app/common/tests/test_socket_manager.py \
        Server/conftest.py
git commit -m "socketio: require REDIS_URL, with an explicit in-memory sentinel

An absent REDIS_URL silently selected the per-process manager, which is
right for one worker and wrong for four, with nothing to tell them apart.
Follows get_database_address()'s shape for a required variable.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5: /health reports Redis

`/health` runs only `SELECT 1`, so the container reports healthy while the layer carrying every score, timer tick and run status is dead.

**Files:**
- Modify: `Server/main.py:141-151` (`health_check`)
- Test: `Server/test_health.py` (create)

**Interfaces:**
- Consumes: `redis_is_reachable() -> bool` from Task 4.
- Produces: `/health` returns `{"status": "healthy" | "unhealthy" | "unknown"}`, unchanged in shape.

- [ ] **Step 1: Write the failing test**

Create `Server/test_health.py`:

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

    assert response.json() == {"status": "unhealthy"}
```

- [ ] **Step 2: Run the test to verify it fails**

Run from `Server/`: `uv run python -m pytest test_health.py -v --no-cov`

Expected: both tests FAIL with `AttributeError: <module 'main'> does not have the attribute 'redis_is_reachable'` — `main` does not import it yet. Once Step 3 adds the import, the meaningful failure is `test_unhealthy_when_redis_is_unreachable` returning `{"status": "healthy"}`, because `health_check` does not consult Redis.

- [ ] **Step 3: Write the implementation**

In `Server/main.py`, add the import alongside the other `app.common` imports:

```python
from app.common.socket_manager import redis_is_reachable
```

Then replace the body of `health_check`:

```python
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

`health_check` is a plain `def`, so FastAPI already runs it in the threadpool and the synchronous Redis ping does not touch the event loop. Do not make it `async def`.

- [ ] **Step 4: Run the test to verify it passes**

Run from `Server/`: `uv run python -m pytest test_health.py -v --no-cov`

Expected: PASS, 2 tests.

- [ ] **Step 5: Run the whole suite and lint**

Run from `Server/`: `uv run python -m pytest && uv run ruff check . && uv run ruff format --check .`

Expected: PASS, no findings.

- [ ] **Step 6: Commit**

```bash
git add Server/main.py Server/test_health.py
git commit -m "health: report unhealthy when Redis is unreachable

The container reported healthy while judges had silently stopped receiving
each other's scores, and compose and nginx kept routing to it.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: CI runs the backend multi-worker

The E2E job is the only CI environment with a real server, a real frontend and a real browser. Switch its backend to four Gunicorn workers so the existing suite proves the application works multi-worker, and add the second process Task 7 needs.

**Files:**
- Modify: `azure-pipelines.yml:202-206` ("Start Backend"), `azure-pipelines.yml:251+` ("Stop Services" in the E2E job)

**Interfaces:**
- Consumes: the transports from Tasks 1-2, without which the existing Playwright tests break under four workers.
- Produces: a Gunicorn `-w 4` backend on `:8000` and a single-worker uvicorn backend on `:8001`, both against the same Redis. Task 7 connects to both.

- [ ] **Step 1: Replace the "Start Backend" step**

In `azure-pipelines.yml`, replace the `script:` body of the E2E job's "Start Backend" step with:

```yaml
      - script: |
          CONNECTION_STRING=postgresql://postgres:postgres@localhost:5432/postgres \
            REDIS_URL=redis://localhost:6379/0 \
            $(Build.SourcesDirectory)/Server/.venv/bin/gunicorn main:socket_app \
            -w 4 -k uvicorn.workers.UvicornWorker \
            -b 0.0.0.0:8000 --log-level warning &
          CONNECTION_STRING=postgresql://postgres:postgres@localhost:5432/postgres \
            REDIS_URL=redis://localhost:6379/0 \
            $(Build.SourcesDirectory)/Server/.venv/bin/uvicorn main:socket_app \
            --host 0.0.0.0 --port 8001 --log-level warning &
          for i in $(seq 1 30); do
            curl -sf http://localhost:8000/health && break || sleep 2
          done
          for i in $(seq 1 30); do
            curl -sf http://localhost:8001/health && break || sleep 2
          done
        displayName: "Start Backend"
        workingDirectory: $(Build.SourcesDirectory)/Server
```

The second process is deliberately a different process, not a different worker: Task 7's first test needs a guaranteed cross-process pair rather than a probable one.

- [ ] **Step 2: Fix the teardown so it cannot leak containers**

In the E2E job's "Stop Services" step, replace the chained stop/remove lines with:

```yaml
          docker rm -f postgres-e2e redis-e2e || true
```

`condition: always()` guarantees the step starts, not that a second line runs after a first one exits non-zero. The previous form leaked `redis-e2e` and its port into the next pipeline run whenever the Postgres teardown failed.

- [ ] **Step 3: Verify the pipeline file parses**

Run: `python -c "import yaml,sys; yaml.safe_load(open('azure-pipelines.yml')); print('ok')"`

Expected: `ok`.

- [ ] **Step 4: Verify locally that the existing suite passes multi-worker**

This is the step that proves Tasks 1-2 did their job. From the repository root:

```bash
docker run -d --name redis-local -p 6379:6379 redis:7-alpine
cd Server
CONNECTION_STRING=postgresql://postgres:postgres@db/postgres REDIS_URL=redis://localhost:6379/0 \
  .venv/bin/gunicorn main:socket_app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 &
cd ../e2e && npx playwright test
```

Expected: the existing suite passes. If sockets fail to connect at all, the transports change is missing or the frontend build predates it. Tear down with `docker rm -f redis-local` and stop the backend when finished.

- [ ] **Step 5: Commit**

```bash
git add azure-pipelines.yml
git commit -m "CI: run the E2E backend on four workers

Puts the whole Playwright suite on the deployment shape production uses, so
a single-process assumption fails in CI rather than at a competition. Adds
the second process the cross-worker tests need, and stops the teardown
leaking redis-e2e when the Postgres teardown fails.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: Cross-worker delivery tests

Two tests, because neither alone is enough. The first proves the Redis fan-out mechanism deterministically; the second proves Gunicorn's actual worker split is being crossed.

Both drive the real score path — `POST /addUpdateAthleteScore/...` emits `current_scores` on the `/current_scores` namespace — rather than a synthetic ping.

**Files:**
- Create: `e2e/tests/helpers/testData.ts`
- Modify: `e2e/tests/websocket.spec.ts` (move `setupTestData` out, import it back)
- Create: `e2e/tests/multi-worker.spec.ts`
- Modify: `e2e/package.json`

**Interfaces:**
- Consumes: the two backends from Task 6.
- Produces: `setupTestData(request: APIRequestContext): Promise<TestData>` exported from `e2e/tests/helpers/testData.ts`, where `TestData` is `{ competitionName: string; heatName: string; heatId: string; athleteId: string; phaseId: string; scoresheetId: string }`.

- [ ] **Step 1: Add the client library**

Run from `e2e/`: `npm install --save-dev socket.io-client`

This is the same library the webapp uses. Playwright's default `testMatch` only collects `*.spec.ts` / `*.test.ts`, so a `helpers/` directory inside `testDir` is not collected as tests.

- [ ] **Step 2: Extract the shared fixture builder**

Create `e2e/tests/helpers/testData.ts` containing the `TestData` interface and the `setupTestData` function, moved verbatim from `e2e/tests/websocket.spec.ts:9-97`. Export both. The file needs these imports:

```ts
import { expect, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "crypto"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
```

Then in `e2e/tests/websocket.spec.ts`, delete the moved interface and function and add:

```ts
import { setupTestData } from "./helpers/testData"
```

Leave every test body in `websocket.spec.ts` unchanged.

- [ ] **Step 3: Verify the extraction changed nothing**

Run from `e2e/` against a running stack: `npx playwright test websocket`

Expected: the existing websocket tests still pass. This step is a pure refactor; if it fails, the move was not verbatim.

- [ ] **Step 4: Write the failing tests**

Create `e2e/tests/multi-worker.spec.ts`:

```ts
import { test, expect, type APIRequestContext } from "@playwright/test"
import { io, type Socket } from "socket.io-client"
import { setupTestData, type TestData } from "./helpers/testData"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const SECOND_BACKEND_URL =
	process.env.SECOND_BACKEND_URL || "http://localhost:8001"

const CLIENT_COUNT = 6
const DELIVERY_TIMEOUT_MS = 15000

const connectToCurrentScores = async (origin: string): Promise<Socket> => {
	const socket = io(`${origin}/current_scores`, {
		path: "/socket.io/",
		transports: ["websocket"],
		reconnection: false
	})
	await new Promise<void>((resolve, reject) => {
		socket.once("connect", () => resolve())
		socket.once("connect_error", reject)
	})

	return socket
}

const nextCurrentScores = (socket: Socket): Promise<void> =>
	new Promise((resolve, reject) => {
		const timer = setTimeout(
			() =>
				reject(
					new Error(`no current_scores within ${DELIVERY_TIMEOUT_MS}ms`)
				),
			DELIVERY_TIMEOUT_MS
		)
		socket.once("current_scores", () => {
			clearTimeout(timer)
			resolve()
		})
	})

/**
 * Posts an empty score, which the webapp does when a judge clears all their moves.
 * The endpoint emits current_scores regardless, and these tests assert on delivery.
 */
const postEmptyScore = async (
	request: APIRequestContext,
	data: TestData
): Promise<void> => {
	const response = await request.post(
		`${BACKEND_URL}/addUpdateAthleteScore/${data.heatId}/${data.athleteId}/0/1?phase_id=${data.phaseId}`,
		{ data: { moves: [], bonuses: [] } }
	)
	expect(response.status()).toBe(200)
}

test.describe("cross-worker broadcast", () => {
	test("a score posted to one server reaches a client on another process", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const onPrimary = await connectToCurrentScores(BACKEND_URL)
		const onSecondary = await connectToCurrentScores(SECOND_BACKEND_URL)
		try {
			const delivered = nextCurrentScores(onSecondary)
			await postEmptyScore(request, data)
			await delivered
		} finally {
			onPrimary.close()
			onSecondary.close()
		}
	})

	test("a score reaches every client across all workers", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const sockets = await Promise.all(
			Array.from({ length: CLIENT_COUNT }, () =>
				connectToCurrentScores(BACKEND_URL)
			)
		)
		try {
			const delivered = sockets.map(nextCurrentScores)
			await postEmptyScore(request, data)
			await Promise.all(delivered)
		} finally {
			sockets.forEach((socket) => socket.close())
		}
	})
})
```

- [ ] **Step 5: Run the tests against a single-process backend to verify they fail**

Start one uvicorn worker with no Redis and nothing on `:8001`:

```bash
cd Server
CONNECTION_STRING=postgresql://postgres:postgres@db/postgres REDIS_URL=memory \
  .venv/bin/uvicorn main:socket_app --host 0.0.0.0 --port 8000 &
cd ../e2e && npx playwright test multi-worker
```

Expected: the first test FAILS — nothing is listening on `:8001`, so `connect_error` rejects. The second test PASSES, because one process trivially reaches all six clients. That asymmetry is the point: the second test only has teeth against multiple workers.

- [ ] **Step 6: Run the tests against the real shape to verify they pass**

```bash
docker run -d --name redis-local -p 6379:6379 redis:7-alpine
cd Server
CONNECTION_STRING=postgresql://postgres:postgres@db/postgres REDIS_URL=redis://localhost:6379/0 \
  .venv/bin/gunicorn main:socket_app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000 &
CONNECTION_STRING=postgresql://postgres:postgres@db/postgres REDIS_URL=redis://localhost:6379/0 \
  .venv/bin/uvicorn main:socket_app --host 0.0.0.0 --port 8001 &
cd ../e2e && npx playwright test multi-worker
```

Expected: both tests PASS.

- [ ] **Step 7: Prove the tests detect the bug**

Restart both backends with `REDIS_URL=memory` instead of the Redis URL, leaving everything else identical, and rerun `npx playwright test multi-worker`.

Expected: both tests FAIL — the first every time, the second on all but roughly one run in four thousand. If either passes, the test is not measuring what it claims and must be fixed before this task is complete.

Tear down with `docker rm -f redis-local` and stop both backends.

- [ ] **Step 8: Commit**

```bash
git add e2e/tests/helpers/testData.ts e2e/tests/websocket.spec.ts \
        e2e/tests/multi-worker.spec.ts e2e/package.json e2e/package-lock.json
git commit -m "e2e: prove broadcasts cross gunicorn workers

One test pins a guaranteed cross-process pair so the Redis fan-out is
verified deterministically; the other puts six clients on the four-worker
server so the real worker split is exercised.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Verification checklist

Against the spec's success criteria:

| # | Criterion | Covered by |
|---|---|---|
| 1 | Four workers serve webapp and timer with no reconnect loop | Tasks 1, 2; Task 6 Step 4 |
| 2 | A score reaches every judge whichever worker served it | Task 7 |
| 3 | Test A fails without the Redis manager | Task 7 Step 7 |
| 4 | Test B fails without the Redis manager | Task 7 Step 7 |
| 5 | Unreachable Redis fails fast and shows in `/health` | Tasks 4, 5 |
| 6 | Unset or malformed `REDIS_URL` fails at startup | Task 4 |
| 7 | No config runs multi-worker in-memory, none picks in-memory silently | Tasks 3, 4 |
| 8 | The Python CI job still runs with no services | Task 4 Step 4 |
