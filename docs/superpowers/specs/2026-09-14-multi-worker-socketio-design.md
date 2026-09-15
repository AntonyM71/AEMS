# Multi-worker Socket.IO

**Date:** 2026-09-14
**Status:** Approved for planning
**Services:** `Server/`, `Webapp/`, `Timer/`, `e2e/`, CI

## Problem

AEMS Server runs Socket.IO in-process with FastAPI via
`AsyncServer(async_mode="asgi")` (`Server/app/common/socket_manager.py`,
`Server/main.py`). Today `docker-compose.yaml` runs it under a single Gunicorn
worker, so every broadcast reaches every client for the trivial reason that
there is only one process.

Running more than one worker is wanted for throughput. The naive change —
raising `-w 1` to `-w 4` — breaks real-time scoring in two independent ways,
and only one of them is fixed by adding Redis.

### Failure one: broadcasts do not cross processes

`sio.emit(...)` dispatches to the sockets held by the process that calls it.
With four workers, a score submitted through
`POST /addUpdateAthleteScore/...` (`Server/app/scoring/customScoringEndpoints.py`)
emits `current_scores` from whichever worker served that request, and only the
judges whose sockets happen to live on that same worker are notified. The rest
show stale scores with no error anywhere.

This is the failure a Redis client manager fixes: `AsyncRedisManager` publishes
each emit to a Redis channel that every worker subscribes to, so all four fan
the message out to their own clients.

### Failure two: the connection handshake is not worker-safe

Redis shares *messages* between workers. It does not share *Engine.IO session
state*. A `socket.io-client` created without a `transports` option — which is
every client in this repo, `Webapp/src/components/roles/headJudge/WebSocketConnections.ts`
and `Timer/src/timer.py` — defaults to `["polling", "websocket"]`. It opens
with HTTP long-polling, receives a session id from one worker, and then sends
follow-up polling requests and an upgrade request on *new TCP connections*.

Those land on whichever worker accepts first. Three times in four that worker
has never seen the session id, so Engine.IO answers
`400 {"code": 1, "message": "Session ID unknown"}`, the client tears down, and
reconnects into the same loop forever.

Nothing in the current topology can prevent this. `nginx.conf` has a single
upstream (`server server:8000`) and Gunicorn's workers share one listening
socket behind it, so the worker split is invisible to nginx — `ip_hash` or
cookie stickiness at the nginx layer would pin a client to the one server
container it was already going to reach, and change nothing about which worker
inside it answers.

## Design

### 1. WebSocket-only transport

Both clients pass `transports: ["websocket"]`, skipping the polling handshake
entirely. The client opens one long-lived TCP connection that stays on the
worker that accepted it for its whole life, so no session state ever needs to
be shared. Redis then carries broadcasts between workers, which is the job it
is actually suited to.

- `Webapp/src/components/roles/headJudge/WebSocketConnections.ts`: `socketConfig()`
  returns the options object so all four `io()` call sites inherit the setting
  from one place.
- `Timer/src/timer.py`: `sio_client.connect(..., transports=["websocket"])`.

`nginx.conf` already proxies upgrades correctly on both `/socket.io/` and
`/api/socket.io/` (`proxy_http_version 1.1`, `Upgrade`/`Connection` headers),
so no proxy change is required.

**Accepted cost:** the HTTP long-polling fallback is given up. AEMS runs on a
self-contained competition LAN behind its own nginx, with no corporate proxy
stripping WebSocket upgrades, so the fallback protects against nothing that can
occur in this deployment.

### 2. `REDIS_URL` becomes mandatory, with in-memory as an explicit choice

Today an absent `REDIS_URL` silently selects the in-memory client manager. That
is the right behaviour for a single process and a disaster for four, and
nothing about the variable's absence distinguishes the two cases. Make the
variable required and make in-memory something a configuration has to ask for
by name:

| `REDIS_URL` | Result |
|---|---|
| a `redis://` or `rediss://` URL | `AsyncRedisManager` |
| `memory` | in-memory manager, deliberately |
| unset or anything else | `ValueError` at startup |

This follows the existing precedent for a required variable,
`get_database_address()` in `Server/db/client.py`, which raises when
`CONNECTION_STRING` is missing. Adopt its shape too: a named function that
reads the environment and returns the manager, rather than the bare
module-level expression used today.

`pydantic-settings` is deliberately not introduced. It is not currently a
dependency, the repository reads every one of its environment variables with
plain `os.getenv`, and `get_database_address()` already establishes how a
required variable is handled here. One new package for one variable is not
worth the divergence.

The function form has a useful side effect. `Server/app/common/tests/test_socket_manager.py`
currently drives the module-level expression with `importlib.reload`, and never
restores it — leaving `sio` replaced by a `MagicMock` for the remainder of the
pytest session, which the suite survives today only because pytest imports every
test module during collection, before any test body runs. Testing a function
removes the need to reload the module at all.

The module's `logger`, defined and never used, is deleted while the file is
being rewritten.

### 3. Harden the Redis client manager

Two further sharp edges, now that `sio.emit` is a network call in the middle of
the score-save request handler.

- **Timeouts.** redis-py defaults `socket_connect_timeout` and `socket_timeout`
  to `None`. If Redis becomes unreachable in a way that drops packets rather
  than refusing them, `emit` blocks on TCP connect for the kernel's retry
  budget, retries once internally, then swallows the error — leaving a judge's
  tablet spinning for minutes on a score that was already saved. Pass
  `redis_options={"socket_connect_timeout": 2, "socket_timeout": 2}`.
- **URL validation.** A malformed `REDIS_URL` is not detected at construction.
  It first surfaces as a `ValueError` from inside `emit`, which is not a
  `RedisError` and so escapes the retry path, becoming an HTTP 500 *after* the
  score has been committed. The same error also breaks the background listener
  out of its loop permanently, so that worker stops receiving cross-worker
  events for the rest of its life. Rejecting any value that is neither the
  sentinel nor a recognised Redis scheme, per the table above, covers this.

### 4. `/health` reports Redis

`health_check` in `Server/main.py` runs only `SELECT 1`, so the container
reports healthy while the layer carrying every score, timer tick and run-status
update is dead. Add a Redis ping, guarded on `REDIS_URL` being set so local dev
and the test suite are unaffected.

`health_check` is a plain `def`, which FastAPI already runs in its threadpool,
so a synchronous `redis.Redis.from_url(url, socket_connect_timeout=2).ping()`
fits the existing concurrency model with no async plumbing — consistent with
the threadpool pattern established by the event-loop-blocking work.

### 5. Deployment configuration

Every context that starts the application now states its choice explicitly:

| Context | `REDIS_URL` |
|---|---|
| `docker-compose.yaml` | `redis://redis:6379/0` (already set) |
| `Server/Dockerfile` | `redis://redis:6379/0` |
| `.devcontainer/.env` | `redis://redis:6379/0` |
| `Server/conftest.py` (new) | `memory` |
| E2E CI job | `redis://localhost:6379/0` (already set) |
| Python CI job | inherits `memory` from `Server/conftest.py` |


- `docker-compose.yaml` and `Server/Dockerfile` both run `-w 4`. They currently
  disagree (4 against 8); a worker count that differs between the image and the
  compose file is a trap regardless of which number is right.
- `Server/Dockerfile` sets `ENV REDIS_URL redis://redis:6379/0`, matching the
  service name in `docker-compose.yaml`, so the image is not four workers
  waiting for someone to remember a variable. An image started without a
  reachable Redis then fails visibly rather than silently: the scheme
  validates, the connection does not, and `/health` reports it.
- `.devcontainer/.env` gets the same URL. The devcontainer already runs a Redis
  service that nothing uses, because no `REDIS_URL` is set for the app
  container; pointing at it costs one line and makes local development exercise
  the same code path as production, instead of the fallback.
- `Server/conftest.py` is added at the Server root, setting `REDIS_URL=memory`
  via `os.environ.setdefault` so it never overrides a real value. The existing
  `app/conftest.py` and `performance/conftest.py` are too deep to cover the
  root-level test modules. This keeps the Python CI job free of services, as it
  is today, while still making the in-memory choice explicit rather than
  implied by absence.
- `Server/pyproject.toml` pins `redis>=8.1,<9.0`, matching the version in
  `Server/uv.lock` and the repo's convention of bounding every constrained
  dependency.

## Verification

Two tests, because neither alone is sufficient. Both drive the real score path
(`POST /addUpdateAthleteScore/...` → `current_scores` on `/current_scores`)
rather than a synthetic probe, so they assert on traffic the application
actually serves. Both live in `e2e/`, which gains `socket.io-client` as a
devDependency — the same client library the webapp uses.

### Test A — cross-process delivery, deterministic

Backend A is the Gunicorn `-w 4` server on `:8000`. Backend B is a single
uvicorn worker on `:8001` sharing the same Redis. A client connects to each,
a score is posted to A, and B's client must receive `current_scores`.

B is guaranteed to be a different process from A, so this fails reliably — not
probabilistically — if the Redis fan-out breaks. It proves the mechanism.

### Test B — the real deployment shape

Six clients connect to the `-w 4` server, a score is posted, and all six must
receive `current_scores`.

This exercises Gunicorn's actual worker split, which Test A does not. It can in
principle pass by luck, but only if all six clients *and* the REST request land
on the same worker: roughly one run in four thousand.

### CI

The E2E job's backend step changes from single-process uvicorn to
`gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:socket_app`, plus the extra
`:8001` process for Test A. Redis is already wired into this job.

A deliberate side effect: the entire existing Playwright suite then runs against
a multi-worker backend, so any other single-process assumption in the
application surfaces as a CI failure rather than at a competition.

The job's teardown step is fixed at the same time. It currently chains
`docker stop postgres-e2e && docker rm postgres-e2e` ahead of the Redis
teardown, so a failure in the first line leaks the Redis container and its port
into the next pipeline run. This matters more once the job owns more processes.

The `performance/` job is **not** used for this. It runs
`TestClient(main.app)` in-process against a real database — no HTTP server, no
Gunicorn, no workers, and no Socket.IO client. It cannot observe cross-worker
behaviour without being rebuilt into something it is not.

## Rejected alternatives

**Real sticky sessions.** Run four separate server containers on four ports
behind an `ip_hash` nginx upstream, instead of one container with four Gunicorn
workers. This preserves the polling fallback, but it restructures compose,
nginx, the healthchecks, and the migration/seed step, which four containers
would otherwise race on. Far more moving parts for a fallback this deployment
cannot use.

**Split the two apps.** Run `socket_app` on one worker and the REST API on
several, as two processes. Socket.IO would never need stickiness and Redis
would become unnecessary, but it leaves two server processes to run, monitor and
healthcheck on a competition laptop, and gives the real-time path no
concurrency at all.

## Out of scope

- A startup log line naming which client manager was selected. With every
  context now stating its choice in configuration, the selection is no longer
  something that has to be discovered from logs.
- The CI Redis readiness loop, which exhausts its retries and exits zero,
  so the backend can start against a Redis that never came up.

## Success criteria

1. Four Gunicorn workers serve the webapp and timer with no reconnect loop and
   no `Session ID unknown` responses.
2. A score submitted by one judge reaches every connected judge, whichever
   worker served the submission.
3. Test A fails if the Redis client manager is removed.
4. Test B fails if the Redis client manager is removed.
5. An unreachable Redis fails a score submission in about two seconds rather
   than hanging, and is visible in `/health`.
6. An unset or malformed `REDIS_URL` fails at startup, not on the first score.
7. No configuration in the repository runs more than one worker against the
   in-memory client manager, and no configuration selects the in-memory manager
   without saying so.
8. The Python CI job still runs with no services.
