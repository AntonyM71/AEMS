# Design

## Context

See proposal.md - Why. Today's env var reads, for reference:

| Var | Read in | Validated? | When |
|---|---|---|---|
| `PORT` | `main.py:40` | no | n/a |
| `LOG_JSON_FORMAT` | `main.py:45` | bool cast via `TypeAdapter(bool)` | n/a |
| `LOG_LEVEL` | `main.py:47` | no | n/a |
| `CORS_ALLOWED_ORIGINS` | `app/common/socket_manager.py:10` | no | n/a |
| `REDIS_URL` | `app/common/socket_manager.py:23` | scheme check, raises `ValueError` | import time (module-level `sio = socketio.AsyncServer(...)`) |
| `CONNECTION_STRING` | `db/client.py:11-18` (`load_dotenv` + `os.environ.get`) | non-empty check, raises `ValueError` | first DB session request (lazy) |
| `CONNECTION_STRING` | `alembic/env.py:34` (`os.environ.get(...) or ""`) | none - empty string passed through | Alembic run |

`REDIS_URL=memory` is force-set by `Server/conftest.py` and `Server/scripts/buildOpenApiJson.py` via `os.environ.setdefault(...)` before the app is imported, so tests and OpenAPI codegen never hit a real Redis.

Timer's env var reads, for reference:

| Var | Read in | Default | Validated? |
|---|---|---|---|
| `SOCKETIO_URL` | `Timer/src/timer.py:101-102` | `http://192.168.0.28:81` (production venue LAN address) | no |
| `SOCKETIO_URL` | `Timer/src/fake_timer.py:7` | `http://localhost:8000` (local dev, no real hardware) | no |
| `SOCKETIO_PATH` | `Timer/src/timer.py:103`, `Timer/src/fake_timer.py:8` | `/socket.io/` | no |
| `ENABLE_WEBSOCKET` | `Timer/src/timer.py:82-86` | `true` (enabled); only `"0"`/`"false"`/`"no"` disable it, any other value is silently treated as enabled | no |

`Timer/src/timer.py` performs GPIO hardware initialization (`tm = TM1637Decimal(...)`, line 77) before it reads any of these env vars — the countdown display and buzzer are wired up independent of network configuration. `ENABLE_WEBSOCKET=false` is an existing, deliberately supported mode: the device is designed to run the physical timer standalone without a network connection.

## Goals / Non-Goals

**Goals:**
- One place per service that declares its env vars, with the same validation rules already enforced today where they exist (`REDIS_URL` scheme, non-empty `CONNECTION_STRING`).
- Validation runs once, at process startup, for the Server ASGI app, Alembic, and Timer — not lazily on first use.
- Zero behavior change for a correctly configured environment (Docker Compose, CI, `Server/.env.test` already set valid values).
- Timer's offline-first design is preserved: an invalid network-related value is logged clearly, but never stops the physical countdown/buzzer from running (see proposal.md - What Changes).

**Non-Goals:**
- No change to Webapp configuration handling (proposal.md - Impact).
- No new environment variables or config surface beyond what's read today, for either service.
- No change to `docker-compose.yaml` / `azure-pipelines.yml` — they already supply valid values.
- No change to Timer's GPIO/hardware initialization order.

## Decisions

**Single `Settings` class via `pydantic_settings.BaseSettings`, in `Server/app/config.py`.**
Alternative considered: keep validation logic split per-module (status quo) but just swap `os.getenv` calls for a shared dataclass with manual validation. Rejected — that reimplements what `pydantic-settings` already gives for free (env parsing, type coercion, clear aggregated error messages for the standard library `logging`/CLI use case), and issue #430 asks specifically for `pydantic-settings`.

**A module-level `settings = Settings()` singleton, imported wherever config is needed.**
Alternative considered: FastAPI's `Depends`-based settings injection (a `get_settings()` dependency, cached with `lru_cache`). Rejected for this change — `Depends` injection is for values only needed inside request handlers; here `REDIS_URL` and `CONNECTION_STRING` are needed at import time (to build the Socket.IO server and, per this proposal, to validate DB config eagerly), before any request/dependency graph exists. A module-level singleton constructed on import matches how `socket_manager.py` already does eager validation today.

**Custom validators for `REDIS_URL` and `CONNECTION_STRING`, not just `str`/`AnyUrl` typing.**
`AnyUrl` alone would accept `redis://...` but also anything else URL-shaped, and wouldn't accept the literal `memory` sentinel. A `field_validator` reproduces the exact scheme/`memory` check `socket_manager.py` has today, so behavior doesn't change. `redis_url` is a required field (no default), matching today's behavior where an unset `REDIS_URL` also fails (`test_unset_redis_url_is_rejected`, [ADR008](../../../docs/decisions/ADR008-scale-socketio-across-workers-with-redis.md)); Pydantic's built-in "field required" error covers that case, and the `field_validator` covers a malformed value. `CONNECTION_STRING` similarly keeps a non-empty check via `min_length=1`.

**Alembic (`alembic/env.py`) imports the same `Settings` instance instead of its own `os.environ.get(...) or ""`.**
This is what makes the `alembic upgrade head` fail-fast scenario work (spec: "Alembic migrations validate configuration before running") — today it's the one place that actively swallows a missing value.

**`REDIS_URL=memory` and `CONNECTION_STRING=<dummy>` pre-set by `conftest.py`/`buildOpenApiJson.py`, ordered before the first import that constructs `Settings`.**
Because `Settings()` reads from the real process environment at construction time (default `pydantic-settings` behavior, no `.env` override needed for these vars), `conftest.py` and `buildOpenApiJson.py` call `os.environ.setdefault(...)` for both vars *before* importing `db.client`/`main` — this is called out in the spec as "Pre-startup environment overrides still take effect" to make that constraint explicit and testable. This needed fixing during implementation: `Settings` construction moved from lazy (first DB query) to eager (module import of `db/client.py`), so `Server/conftest.py`'s pre-existing `REDIS_URL` setdefault — previously safe anywhere in the file — had to move before its own `from db.client import get_transaction_session` import, and a matching `CONNECTION_STRING` setdefault had to be added (previously `db/client.py` never needed a real value to just be imported).

**CI (`azure-pipelines.yml`) exports `REDIS_URL` for its `alembic upgrade head` / `scripts.seed_scoresheets` steps, rather than making those DB-only tools tolerate a missing `REDIS_URL`.**
Alternative considered: give `db/client.py`/`alembic/env.py` their own settings model requiring only `CONNECTION_STRING`, decoupled from `REDIS_URL`, so DB-only tools never need Redis config at all. Rejected — CI's E2E job already starts a real Redis and already uses `REDIS_URL` later in the same job for the backend (it just wasn't threading that value through to its earlier DB-setup step); its PerformanceTests job never touches Redis at all, so it gets the existing `memory` sentinel, consistent with every other Redis-less context in this codebase. Fixing the two CI steps to supply the `REDIS_URL` they either already have on hand or don't need for real is a smaller, more honest change than adding a second settings model, and it means CI now exercises the same single `Settings` object as production instead of a DB-only stand-in that could drift from it.

**Keep `load_dotenv(".env")` for local dev, called once before `Settings()` is constructed.**
`pydantic-settings` can load `.env` itself via `model_config = SettingsConfigDict(env_file=".env")`, which replaces the manual `load_dotenv(".env")` calls in `db/client.py` and `alembic/env.py`. Using the built-in mechanism (rather than keeping `python-dotenv` calls alongside `Settings`) avoids two competing sources of `.env` loading.

**Timer: two settings classes, not one shared default.**
`TimerSettings(BaseSettings)` in `Timer/src/config.py` declares `socketio_url: str = "http://192.168.0.28:81"`, `socketio_path: str = "/socket.io/"`, `enable_websocket: bool = True` — matching `timer.py`'s current defaults. `fake_timer.py` uses a `FakeTimerSettings(TimerSettings)` subclass that only overrides the `socketio_url` field default to `"http://localhost:8000"`. Alternative considered: a single class with the default injected via constructor kwargs at each entry point. Rejected — `pydantic-settings` gives constructor kwargs priority over environment variables, which would make a script-supplied "default" silently override a real `SOCKETIO_URL` env var; a field-level default on a subclass avoids that precedence trap entirely and keeps `SOCKETIO_URL` always winning when set, exactly like today.

**Use pydantic's built-in `bool` and `AnyUrl` coercion instead of hand-rolled checks.**
`enable_websocket: bool` already accepts pydantic's standard string tokens (`"true"/"false"/"1"/"0"/"yes"/"no"/"on"/"off"`, case-insensitive) and raises `ValidationError` on anything else — a strict superset of today's accepted values, so no currently-valid value stops working. `socketio_url: pydantic.AnyUrl` (or `HttpUrl`) rejects a malformed URL the same way `AnyUrl` rejects any invalid URL. Both replace what would otherwise be custom validators, per the project's existing `pydantic>=2.0,<3.0` dependency.

**Timer catches `ValidationError` at startup and degrades instead of propagating it.**
Per the confirmed design direction (Server hard-fails, Timer degrades), `timer.py` wraps `TimerSettings()` construction in a `try/except ValidationError`: on failure it logs the error (which names the offending field via Pydantic's error detail) and proceeds with WebSocket connectivity disabled — the same code path already used when `ENABLE_WEBSOCKET=false` is explicitly set. This is a startup-time check, not a per-field fallback: a bad `SOCKETIO_URL` disables WebSocket entirely for that run, it does not try to salvage a partially-valid config. `fake_timer.py`, which has no physical hardware to keep running, is not expected to degrade — an invalid value there SHALL still raise (there is nothing useful to fall back to; it exists purely to test the WebSocket connection).

## Risks / Trade-offs

- **Alembic now fails harder on a missing `CONNECTION_STRING`** (the one intentional behavior change, called out as **BREAKING** in proposal.md) → Mitigation: this only affects an already-broken invocation (no working setup relies on an empty connection string succeeding), and the new error is strictly more informative than today's downstream SQLAlchemy/Postgres error.
- **Eager `Settings()` construction at import time means any test or script that imports `db/client.py` or `main.py` without `CONNECTION_STRING`/`REDIS_URL` set will now fail at import instead of at first query** → Confirmed during implementation: CI's main "Python Build & Test" job runs `uv run python -m pytest` with neither var set, relying entirely on `Server/conftest.py`; `Server/conftest.py`'s pre-existing `REDIS_URL` setdefault ran *after* its own `db.client` import, and had no `CONNECTION_STRING` setdefault at all, so both had to be fixed (moved earlier, and added) — see "REDIS_URL=memory and CONNECTION_STRING=<dummy>..." above.
- **`python-dotenv`'s `load_dotenv` and `pydantic-settings`'s own `env_file` loading could disagree on precedence if both remain** → Mitigation: remove the manual `load_dotenv` calls once `Settings` owns `.env` loading, so there's one source of truth.
- **Timer's `ENABLE_WEBSOCKET` typo handling changes from "silently enabled" to "logged and disabled"** (BREAKING, per proposal.md - What Changes) → Mitigation: the new behavior is strictly safer for a device that already supports running without WebSocket — a typo now produces a visible log line and a known-good fallback state, instead of an unnoticed wrong state.
- **Catching `ValidationError` in `timer.py` could itself mask a real bug if written too broadly** (e.g. accidentally swallowing an unrelated exception) → Mitigation: catch `pydantic.ValidationError` specifically, not a bare `except Exception`.

## Migration Plan

1. Add `pydantic-settings` to `Server/pyproject.toml`, run `uv sync` / `uv lock`.
2. Add `Server/app/config.py` with the `Settings` model and module-level `settings` instance, covering all six variables and their existing validation/defaults.
3. Update `db/client.py` to read `settings.connection_string` instead of `get_database_address()`, removing the lazy `ValueError` check (Pydantic now raises at construction).
4. Update `alembic/env.py` to import `settings` instead of `os.environ.get("CONNECTION_STRING") or ""`.
5. Update `main.py` (`PORT`, `LOG_JSON_FORMAT`, `LOG_LEVEL`) and `app/common/socket_manager.py` (`CORS_ALLOWED_ORIGINS`, `REDIS_URL`) to read from `settings`.
6. Update `Server/app/common/tests/test_socket_manager.py` (and any other test patching these env vars) to construct a `Settings` instance from patched env vars rather than relying on module-level `os.environ` reads, keeping assertions equivalent.
7. Run the full Server test suite (`uv run python -m pytest`) plus `alembic upgrade head` locally to confirm no regression against `Server/.env.test` and Docker Compose configuration.
8. Add `pydantic-settings` to `Timer/pyproject.toml`, run `uv sync` from `Timer/`.
9. Add `Timer/src/config.py` with `TimerSettings` and `FakeTimerSettings`.
10. Update `Timer/src/timer.py` to construct `TimerSettings()` inside a `try/except ValidationError`, logging and disabling WebSocket connectivity on failure; update `Timer/src/fake_timer.py` to construct `FakeTimerSettings()` directly (letting a `ValidationError` propagate).
11. Update `Timer/tests/test_timer.py` as needed so its existing `ENABLE_WEBSOCKET` monkeypatches still exercise the same behavior through `TimerSettings`.
12. Run the Timer test suite (`uv run python -m pytest` from `Timer/`) to confirm no regression.

No rollback complexity beyond a normal revert — no data migration or persisted state is involved.
