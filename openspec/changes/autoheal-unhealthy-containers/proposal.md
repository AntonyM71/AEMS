# Proposal

## Why

Issue #545: the production compose stack defines healthchecks, but Docker Engine never acts on them. `restart: always` restarts a container only when its process exits. A hung server or a frozen Redis stays `unhealthy` until someone runs `docker compose ps`. A Redis outage is silent in the UI: score submissions still succeed while every live update stops. The server's container healthcheck also tests Redis, so restarting the server on that signal would not fix anything. See [ADR012](../../../docs/decisions/ADR012-restart-unhealthy-containers-with-autoheal.md).

## What Changes

- Add an `autoheal` sidecar to `docker-compose.yaml` that restarts unhealthy containers labelled `autoheal=true`. Label `server`, `frontend`, `nginx`, `db` and `redis`.
- Add a `/livez` liveness endpoint to the Server that does not touch the database or Redis, and point the server's container healthcheck at it. `/health` keeps reporting dependencies.
- Point nginx's healthcheck at a location nginx answers itself (`/nginx-health`), not at the proxied frontend.
- Give the `frontend` service a healthcheck in production, not only in the CI override, using `127.0.0.1` because busybox `wget` resolves `localhost` to IPv6 and Next.js listens on IPv4 only.
- Document in the deployment guide how to pre-pull images, what `docker compose ps` should show, and which service to restart for each symptom.

## Non-goals

- The webapp health banner (the issue's first option). It is still worth doing as a separate change.

## Capabilities

### New Capabilities

- `service-health`: liveness versus dependency health, and automatic restart of unhealthy services.

## Impact

- `Server/main.py`, `Server/test_health.py`: new `/livez` endpoint and test.
- `docker-compose.yaml`, `docker-compose.ci.override.yaml`, `nginx.conf`.
- `docs/deployment/server_setup_guide.md`, `docs/decisions/ADR012-restart-unhealthy-containers-with-autoheal.md`.
- `Common/openapi.json` and the generated client gain `/livez` on the next `buildApi.sh` run. The webapp doesn't call it.
