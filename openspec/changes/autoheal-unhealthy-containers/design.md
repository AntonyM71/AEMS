# Design

## Healthcheck ownership

Each labelled service's healthcheck must fail only for that container's own fault:

| Service | Healthcheck | Restart fixes |
| --- | --- | --- |
| server | `curl -f http://localhost:8000/livez` | hung or crashed workers |
| frontend | `wget -qO- http://127.0.0.1:3000` | hung Next.js process |
| nginx | `curl -f http://localhost/nginx-health` (`return 200`) | hung nginx |
| db | `pg_isready` | hung Postgres |
| redis | `redis-cli ping` | frozen Redis |

`/livez` is an `async def` handler that returns immediately, so it runs on the worker's event loop and fails when that loop is blocked. Gunicorn runs four workers and the healthcheck reaches only one of them per probe, so a single hung worker may go unnoticed for a few probes.

## Autoheal

`willfarrell/autoheal:1.2.0` with `AUTOHEAL_CONTAINER_LABEL=autoheal` and the Docker socket mounted. It was tested against Docker Engine 29.8 (API 1.56). Default polling interval is 5 seconds. With the server's 30s × 3 healthcheck, a hung server restarts in about 90–120 seconds.

## Verification performed

On an isolated compose project (separate ports and volumes):
- Freezing Redis with SIGSTOP made `/health` return 503 while `/livez` stayed 200. Autoheal restarted Redis only, and `/health` returned to 200 without a server restart.
- Stopping all gunicorn processes with SIGSTOP made the server unhealthy. Autoheal restarted it and it came back healthy.
