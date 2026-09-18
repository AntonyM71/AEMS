# Architectural Decision Record: Scale Socket.IO Across Workers With Redis

## Context:

AEMS Server ran Socket.IO in-process with FastAPI (`Server/app/common/socket_manager.py`) under a single Gunicorn worker. Every broadcast reached every client only because there was a single process to receive it. Raising the worker count for throughput (`-w 1` to `-w 4`) broke real-time scoring in two independent ways:

1. **Broadcasts don't cross processes.** `sio.emit(...)` only reaches sockets held by the process that calls it. A score submitted through `POST /addUpdateAthleteScore/...` would only notify judges whose sockets happened to be on the same worker that served the request — the rest saw stale scores with no error.
2. **The connection handshake isn't worker-safe.** A `socket.io-client` with the default `transports: ["polling", "websocket"]` opens over HTTP long-polling, gets a session id from one worker, then sends follow-up requests on new TCP connections that can land on a different worker. That worker has never seen the session id, so Engine.IO answers `400 Session ID unknown` and the client reconnects forever. Nginx's single upstream can't fix this: the worker split is invisible below it, so `ip_hash`/cookie stickiness at the nginx layer changes nothing about which worker inside a container answers.

## Options Considered:

### 1. Real sticky sessions across separate containers

Run four separate server containers on four ports behind an `ip_hash` nginx upstream instead of one container with four Gunicorn workers. This would preserve the HTTP long-polling fallback, but restructures `docker-compose.yaml`, `nginx.conf`, health checks, and the migration/seed step (which four containers would otherwise race on) — a lot of new moving parts to keep a fallback this LAN-only deployment cannot use anyway.

### 2. Split the Socket.IO app and the REST API into separate processes

Run `socket_app` on one worker and the REST API on several. Socket.IO would never need stickiness and Redis would be unnecessary, but it leaves two server processes to run, monitor, and health-check on a competition laptop, and gives the real-time path no concurrency at all.

### 3. WebSocket-only transport + Redis-backed client manager (Chosen Option)

Drop the HTTP long-polling handshake entirely (`transports: ["websocket"]` on every client: `Webapp/src/components/roles/headJudge/WebSocketConnections.ts`, `Timer/src/timer.py`). A WebSocket connection stays on the worker that accepted it for its whole life, so no Engine.IO session state ever needs to be shared. `socketio.AsyncRedisManager` then fans each `emit` out to every worker via a Redis pub/sub channel — the job Redis is actually suited to.

## Decision:

Adopt option 3. `REDIS_URL` becomes a required environment variable read by `Server/app/common/socket_manager.py`, with an explicit contract:

| `REDIS_URL` | Result |
|---|---|
| a `redis://`, `rediss://`, or `unix://` URL | `AsyncRedisManager` |
| `memory` | in-memory manager, deliberately (single-worker only) |
| unset or anything else | `ValueError` at startup |

An absent variable no longer silently selects the in-memory manager (correct for one worker, silently wrong for four) — every context that starts the app now states its choice explicitly (`docker-compose.yaml`, `Server/Dockerfile`, `.devcontainer/.env` all set `redis://redis:6379/0`; test config sets `memory`).

`AsyncRedisManager` is constructed with `socket_connect_timeout`/`socket_timeout` of 2 seconds, so an unreachable Redis fails a score submission in about two seconds instead of blocking on the kernel's TCP retry budget. `/health` (`Server/main.py`) pings the live Redis connection and returns a real failing status code when it's down, instead of only checking Postgres.

## Consequences:

### Positive:

- Throughput scales with Gunicorn worker count; a score submitted by one judge reliably reaches every connected judge regardless of which worker served the request.
- Misconfiguration fails fast and loudly: an unset or malformed `REDIS_URL` fails at startup, not on the first score; an unreachable Redis is visible in `/health` and fails a save in ~2 seconds rather than hanging.
- No configuration in the repository can run more than one worker against the in-memory manager, or select the in-memory manager without saying so.

### Negative:

- The HTTP long-polling fallback is given up for every Socket.IO client (see ADR006's Negative consequences). AEMS runs on a self-contained competition LAN behind its own nginx, so this protects against nothing that can occur in this deployment, but it does mean a non-Socket.IO WebSocket client cannot connect.
- Redis becomes a required operational dependency everywhere the app runs with more than one worker (`docker-compose.yaml`, the devcontainer, CI's E2E job) — one more service to keep healthy at a competition venue.
- Gunicorn worker count must match between `docker-compose.yaml` and `Server/Dockerfile`; the two disagreeing (as they briefly did during implementation) silently reduces the concurrency the fix was meant to add.

## Implementation:

See `Server/app/common/socket_manager.py` (`get_client_manager`, `redis_is_reachable`), `Server/main.py` (`/health`), and the E2E suite's two cross-worker tests: one connecting a second single-process backend to prove Redis fan-out deterministically, one driving the real four-worker deployment shape with six clients.

## Review:

Revisit if AEMS ever needs to scale beyond a single competition-venue host (Redis pub/sub does not span multiple hosts' worth of Gunicorn processes without a shared Redis instance reachable from all of them), or if Redis operational overhead proves not worth it for the throughput gained.
