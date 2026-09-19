# Tasks

## 1. Dependency setup

- [x] 1.1 Add `pydantic-settings` to `Server/pyproject.toml` and run `uv sync`; verify `uv.lock` picks up `pydantic-settings` and `uv run python -c "import pydantic_settings"` succeeds
- [x] 1.2 Confirm `pydantic>=2.0,<3.0` in `Server/pyproject.toml` still resolves alongside `pydantic-settings` with no conflict (`uv sync` exits 0)

## 2. Settings module

- [x] 2.1 Create `Server/app/config.py` with a `Settings(BaseSettings)` model declaring `port` (default `3000`), `log_json_format` (default `False`), `log_level` (default `"INFO"`), `cors_allowed_origins` (default `""`), `redis_url` (required, no default), `connection_string` (required, `min_length=1`), with `model_config = SettingsConfigDict(env_file=".env")`
- [x] 2.2 Add a `field_validator` on `redis_url` requiring `"memory"` or a `redis://`/`rediss://`/`unix://` prefix, matching `app/common/socket_manager.py`'s current check; verify with a unit test asserting a bad scheme raises `pydantic.ValidationError`
- [x] 2.3 Instantiate a module-level `settings = Settings()` in `config.py` and verify importing the module with `CONNECTION_STRING` unset raises `pydantic.ValidationError` naming `connection_string`

## 3. Wire up call sites

- [x] 3.1 Update `Server/main.py` to read `PORT`, `LOG_JSON_FORMAT`, `LOG_LEVEL` from `settings` instead of `os.environ`/`os.getenv`; verify the server still starts locally with `uvicorn main:socket_app --reload` and logs at the configured level
- [x] 3.2 Update `Server/app/common/socket_manager.py` to read `CORS_ALLOWED_ORIGINS` and `REDIS_URL` from `settings`, removing its own `os.getenv`/scheme-check code now duplicated in `config.py`; verify `Server/app/common/tests/test_socket_manager.py` still passes
- [x] 3.3 Update `Server/db/client.py` to use `settings.connection_string` in place of `get_database_address()`, removing the lazy `ValueError` check and the module's own `load_dotenv(".env")` call; verify `uv run python -m pytest Server/app/competition_management` (or another DB-touching suite) still passes
- [x] 3.4 Update `Server/alembic/env.py` to import `settings` in place of `os.environ.get("CONNECTION_STRING") or ""` and its own `load_dotenv(".env")` call; verify `alembic upgrade head` still succeeds against `Server/.env.test`'s `CONNECTION_STRING`

## 4. Fail-fast behavior

- [x] 4.1 Verify unsetting `CONNECTION_STRING` and running `alembic upgrade head` fails immediately with a `pydantic.ValidationError` naming `connection_string`, not a later SQLAlchemy/Postgres error (spec: Alembic migrations validate configuration before running)
- [x] 4.2 Verify starting the app (`uvicorn main:socket_app`) with `CONNECTION_STRING` unset fails at import/startup with a `pydantic.ValidationError`, not on the first request (spec: Fail-fast configuration validation)
- [x] 4.3 Verify starting the app with `REDIS_URL` set to an invalid value (e.g. `http://example.com`) fails at import/startup with a `pydantic.ValidationError` naming `redis_url`
- [x] 4.4 Verify starting the app with `REDIS_URL` unset fails at import/startup with a `pydantic.ValidationError` naming `redis_url`, matching today's `test_unset_redis_url_is_rejected` behavior (spec: Missing REDIS_URL at startup)

## 5. Test and tooling compatibility

- [x] 5.1 Confirm `Server/conftest.py`'s `os.environ.setdefault("REDIS_URL", "memory")` still forces the in-memory Socket.IO manager under the new `Settings`-based loading; verify by running the full suite (`uv run python -m pytest`) and confirming no test attempts a real Redis connection
- [x] 5.2 Confirm `Server/scripts/buildOpenApiJson.py` still runs unchanged with its `REDIS_URL=memory` override; verify `python -m scripts.buildOpenApiJson` (or the project's existing invocation via `buildApi.sh`) succeeds
- [x] 5.3 Update `Server/app/common/tests/test_socket_manager.py`'s `patch.dict(os.environ, ...)` cases as needed so they exercise `Settings` construction directly where they assert on `REDIS_URL`/`CORS_ALLOWED_ORIGINS` validation; verify the full file passes

## 6. Server verification

- [x] 6.1 Run `uv run python -m pytest` (full Server suite) and `uv run ruff check .` from `Server/` and confirm both pass
- [x] 6.2 Run `docker compose -f docker-compose.yaml up` locally (or verify against `azure-pipelines.yml`'s env vars) and confirm the server starts cleanly with the existing `CONNECTION_STRING`/`REDIS_URL` values, showing no regression for a correctly configured environment

## 7. Timer dependency setup

- [x] 7.1 Add `pydantic-settings` to `Timer/pyproject.toml` and run `uv sync` from `Timer/`; verify `uv run python -c "import pydantic_settings"` succeeds

## 8. Timer settings module

- [x] 8.1 Create `Timer/src/config.py` with `TimerSettings(BaseSettings)` declaring `socketio_url: str = "http://192.168.0.28:81"`, `socketio_path: str = "/socket.io/"`, `enable_websocket: bool = True`; verify a unit test constructing it with no env vars set matches these defaults
- [x] 8.2 Add `FakeTimerSettings(TimerSettings)` overriding only `socketio_url`'s default to `"http://localhost:8000"`; verify a unit test confirms the overridden default while `SOCKETIO_URL` env var still takes precedence when set
- [x] 8.3 Verify `enable_websocket` rejects an unrecognized string (e.g. `"flase"`) with `pydantic.ValidationError`, and accepts `"0"`/`"false"`/`"no"`/`"1"`/`"true"`/`"yes"` (case-insensitive) as today
- [x] 8.4 Verify `socketio_url` rejects a malformed URL (e.g. `"not-a-url"`) with `pydantic.ValidationError`

## 9. Wire up Timer call sites

- [x] 9.1 Update `Timer/src/timer.py` to construct `TimerSettings()` inside a `try/except pydantic.ValidationError`, logging the error and falling back to WebSocket disabled on failure, using validated values otherwise; verify with a test that an invalid `ENABLE_WEBSOCKET`/`SOCKETIO_URL` logs an error and leaves the countdown/buzzer functions callable (no crash)
- [x] 9.2 Update `Timer/src/fake_timer.py` to construct `FakeTimerSettings()` directly (an invalid value raises, since the script has no hardware fallback); verify by passing an invalid `SOCKETIO_URL` and confirming it raises `pydantic.ValidationError` before attempting to connect

## 10. Timer test compatibility

- [x] 10.1 Update `Timer/tests/test_timer.py`'s `ENABLE_WEBSOCKET` cases (currently `monkeypatch.setattr(timer, "ENABLE_WEBSOCKET", ...)`) to patch through `TimerSettings`/environment variables as needed so they still exercise the real startup path; verify the full file passes
- [x] 10.2 Run `uv run python -m pytest` (full Timer suite) and `uv run ruff check .` from `Timer/` and confirm both pass
