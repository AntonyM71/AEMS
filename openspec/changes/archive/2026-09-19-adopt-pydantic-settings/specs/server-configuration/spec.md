# Spec Delta

## Purpose

Server-wide startup configuration: declaring, validating, and loading environment-derived settings so a missing or invalid value fails fast with a clear error instead of surfacing later as a runtime failure.

## ADDED Requirements

### Requirement: Fail-fast configuration validation
The system SHALL validate all environment-derived configuration when the Server process starts, and SHALL refuse to start if a required value is missing or invalid.

#### Scenario: Missing CONNECTION_STRING at startup
- **WHEN** the Server process starts without a `CONNECTION_STRING` environment variable set
- **THEN** the process SHALL fail to start and report a validation error naming `CONNECTION_STRING`, rather than starting successfully and only failing later on the first database request

#### Scenario: Missing REDIS_URL at startup
- **WHEN** the Server process starts without a `REDIS_URL` environment variable set
- **THEN** the process SHALL fail to start and report a validation error naming `REDIS_URL`, matching today's behavior (`REDIS_URL` is a required variable per [ADR008](../../../../../docs/decisions/ADR008-scale-socketio-across-workers-with-redis.md))

#### Scenario: Malformed REDIS_URL at startup
- **WHEN** `REDIS_URL` is set to a value that is not `memory` and does not start with `redis://`, `rediss://`, or `unix://`
- **THEN** the process SHALL fail to start and report a validation error naming `REDIS_URL`

### Requirement: Alembic migrations validate configuration before running
Alembic commands SHALL use the same configuration validation as the running Server, so a missing `CONNECTION_STRING` fails with a clear error before Alembic attempts to reach a database.

#### Scenario: Missing CONNECTION_STRING for a migration
- **WHEN** `CONNECTION_STRING` is unset and an operator runs `alembic upgrade head`
- **THEN** Alembic SHALL fail immediately with a validation error naming `CONNECTION_STRING`, instead of proceeding with an empty connection string

### Requirement: Configuration defaults preserved
When an optional environment variable is not set, the system SHALL fall back to its existing default: `PORT` defaults to `3000`, `LOG_JSON_FORMAT` defaults to `false`, `LOG_LEVEL` defaults to `INFO`, and `CORS_ALLOWED_ORIGINS` defaults to allowing all origins (`*`).

#### Scenario: No optional variables set
- **WHEN** the Server starts with only the required `CONNECTION_STRING` and `REDIS_URL` set
- **THEN** it SHALL start successfully using port `3000`, plain-text logging at `INFO` level, and CORS origins of `*`

### Requirement: Pre-startup environment overrides still take effect
A caller that sets an environment variable before the Server's configuration is loaded (for example a test fixture or codegen script setting `REDIS_URL`) SHALL have that value take effect, so existing test suites and tooling are unaffected by centralizing configuration loading.

#### Scenario: conftest forces in-memory Redis
- **WHEN** `Server/conftest.py` sets `REDIS_URL` to `memory` before the application's configuration is loaded
- **THEN** the Server SHALL use the in-memory Socket.IO manager for that process, matching current behavior
