# Spec Delta

## ADDED Requirements

### Requirement: The Server reports liveness separately from dependency health
The Server SHALL expose `/livez`, which answers 200 whenever the worker is responsive regardless of database or Redis state, and `/health`, which answers 503 when the database or Redis is unreachable.

#### Scenario: Redis unreachable
- **WHEN** Redis is unreachable and both endpoints are requested
- **THEN** `/health` returns 503 with status `unhealthy`, and `/livez` returns 200 with status `alive`

### Requirement: Unhealthy services restart automatically
In the production compose stack, the server, frontend, nginx, database and Redis services SHALL each be restarted automatically when their own container healthcheck fails. A service's healthcheck SHALL NOT fail only because a different service is down.

#### Scenario: Redis freezes
- **WHEN** Redis stops answering
- **THEN** Redis is restarted, and the server is not restarted

#### Scenario: Server hangs
- **WHEN** the server stops answering requests
- **THEN** the server container is restarted

#### Scenario: Frontend is down
- **WHEN** the frontend stops answering
- **THEN** nginx's healthcheck still passes, and the frontend is the container restarted
