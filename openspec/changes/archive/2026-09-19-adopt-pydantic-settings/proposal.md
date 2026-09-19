# Proposal

## Why

The Server currently reads its environment variables ad hoc — `os.environ`/`os.getenv` calls are scattered across `main.py`, `app/common/socket_manager.py`, `db/client.py`, and `alembic/env.py` — with inconsistent and sometimes silent failure behavior. `REDIS_URL` is validated at import time and crashes startup immediately if malformed, but `CONNECTION_STRING` is only checked lazily on the first database-touching request, and `alembic/env.py` swallows a missing `CONNECTION_STRING` into an empty string rather than erroring. A misconfigured environment surfaces late, inconsistently, and sometimes as an opaque downstream error instead of a clear one at startup (issue #430).

The Timer app (a separate `uv`-managed Python package for the Raspberry Pi timing box) has the same problem: `Timer/src/timer.py` and `Timer/src/fake_timer.py` read `SOCKETIO_URL`, `SOCKETIO_PATH`, and `ENABLE_WEBSOCKET` via bare `os.environ.get` with no validation, so a typo is silently misinterpreted rather than reported. Unlike the Server, though, Timer already has a supported offline-only mode (`ENABLE_WEBSOCKET=false` disables WebSocket connectivity entirely) so its GPIO-driven countdown and buzzer keep working without a network connection — any configuration validation added here must preserve that.

## What Changes

- Add `pydantic-settings` as a Server dependency (pydantic v2 is already in use, so no major version bump is required).
- Introduce a single `Settings` module that declares every environment variable the Server reads today: `PORT`, `LOG_JSON_FORMAT`, `LOG_LEVEL`, `CORS_ALLOWED_ORIGINS`, `REDIS_URL`, `CONNECTION_STRING`.
- Validate `REDIS_URL` (must be `memory` or a `redis://`/`rediss://`/`unix://` URL) and `CONNECTION_STRING` (must be non-empty) as part of `Settings` construction, preserving today's validation rules.
- Load `Settings` once at process startup so a missing or malformed value fails fast with a single clear error, instead of surfacing later from whichever code path happens to touch it first.
- **BREAKING**: `alembic upgrade`/`downgrade` will now fail immediately with a validation error if `CONNECTION_STRING` is unset or empty, instead of passing an empty string through to SQLAlchemy and failing later with a less direct error.
- Update `main.py`, `app/common/socket_manager.py`, `db/client.py`, and `alembic/env.py` to read from the shared `Settings` object instead of calling `os.environ`/`os.getenv` directly.
- Preserve existing defaults (`PORT=3000`, `LOG_JSON_FORMAT=False`, `LOG_LEVEL=INFO`, `CORS_ALLOWED_ORIGINS` empty → `"*"`) so correctly configured deployments (Docker Compose, CI) are unaffected. `REDIS_URL` remains a required variable per [ADR008](../../../docs/decisions/ADR008-scale-socketio-across-workers-with-redis.md) — unset or malformed values fail startup exactly as they do today (`test_unset_redis_url_is_rejected`), now via a `pydantic.ValidationError` naming `REDIS_URL` instead of a bare `ValueError`.
- Add `pydantic-settings` as a separate Timer dependency (`Timer/pyproject.toml`) and introduce a `Timer/src/config.py` settings model covering `SOCKETIO_URL`, `SOCKETIO_PATH`, `ENABLE_WEBSOCKET`.
- Unlike the Server, Timer SHALL NOT refuse to start on an invalid value: it SHALL log a clear validation error naming the invalid variable and continue running with WebSocket connectivity disabled, so the physical countdown/buzzer stays operational even with a broken network configuration.
- **BREAKING**: today, any `ENABLE_WEBSOCKET` value other than `"0"`/`"false"`/`"no"` is silently treated as enabled (a typo like `"flase"` enables WebSocket without warning). After this change, an unrecognized value is treated as invalid, logged, and WebSocket connectivity is disabled instead of silently enabled.
- Update `Timer/src/timer.py` and `Timer/src/fake_timer.py` to read from a Timer settings object instead of calling `os.environ.get` directly.

## Capabilities

### New Capabilities
- `server-configuration`: Server-wide startup configuration — declaring, validating, and loading environment variables via `pydantic-settings`, and failing fast with a clear error when a required value is missing or malformed.
- `timer-configuration`: Timer app startup configuration — declaring and validating environment variables via `pydantic-settings`, logging a clear error for an invalid value while keeping the physical timer/buzzer hardware operational.

### Modified Capabilities
(none — no existing spec covers environment/configuration loading)

## Impact

- `Server/pyproject.toml`, `Server/uv.lock` — new `pydantic-settings` dependency.
- New `Server/app/config.py` (or equivalent) — the `Settings` model.
- `Server/main.py` — `PORT`, `LOG_JSON_FORMAT`, `LOG_LEVEL` reads.
- `Server/app/common/socket_manager.py` — `CORS_ALLOWED_ORIGINS`, `REDIS_URL` reads.
- `Server/db/client.py` — `CONNECTION_STRING` read, currently lazy via `get_database_address()`.
- `Server/alembic/env.py` — `CONNECTION_STRING` read, currently swallows a missing value.
- `Server/app/common/tests/test_socket_manager.py` — existing `REDIS_URL` tests via `patch.dict(os.environ, ...)`; must keep passing against the new `Settings`-based loading.
- `Server/conftest.py`, `Server/scripts/buildOpenApiJson.py` — `os.environ.setdefault("REDIS_URL", "memory")`/`os.environ.setdefault("CONNECTION_STRING", ...)`, which must run before anything imports `db.client` or `app.config` (both now construct `Settings` eagerly at import time, not just at first use).
- `azure-pipelines.yml` — its `alembic upgrade head` / `scripts.seed_scoresheets` invocations only ever exported `CONNECTION_STRING`, never `REDIS_URL` (harmless while both reads were lazy/independent); centralizing into one eagerly-constructed `Settings` object means these now need `REDIS_URL` too. The PerformanceTests job's DB setup step gets `REDIS_URL=memory` (no Redis runs in that job); the E2E job's DB setup step gets `REDIS_URL=redis://localhost:6379/0`, reusing the Redis container that job already starts and later passes to the backend. No change to `docker-compose.yaml` or `Server/.env.test` — they already set `CONNECTION_STRING` and `REDIS_URL` to valid values, and the devcontainer already runs a real Redis (`.devcontainer/docker-compose.yml`, `REDIS_URL=redis://redis:6379/0` in `.devcontainer/.env`) rather than the `memory` sentinel, so local dev exercises the same Redis-backed code path as production.
- `Timer/pyproject.toml` — new `pydantic-settings` dependency.
- New `Timer/src/config.py` — the Timer settings model(s).
- `Timer/src/timer.py` — `SOCKETIO_URL`, `SOCKETIO_PATH`, `ENABLE_WEBSOCKET` reads.
- `Timer/src/fake_timer.py` — `SOCKETIO_URL`, `SOCKETIO_PATH` reads; uses a different `SOCKETIO_URL` default (`http://localhost:8000`) than `timer.py` (`http://192.168.0.28:81`).
- `Timer/tests/test_timer.py` — existing `ENABLE_WEBSOCKET` tests monkeypatch the module attribute directly; must keep passing.
