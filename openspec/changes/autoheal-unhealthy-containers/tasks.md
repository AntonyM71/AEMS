# Tasks

## 1. Server liveness

- [x] 1.1 Add `/livez` to `Server/main.py` and a test that it answers 200 while Redis is unreachable

## 2. Compose and nginx

- [x] 2.1 Point the server healthcheck at `/livez` and the nginx healthcheck at a local `/nginx-health` location
- [x] 2.2 Add a frontend healthcheck using `127.0.0.1`, and fix the same `localhost` check in the CI override
- [x] 2.3 Add the pinned `autoheal` sidecar and label the five services `autoheal=true`

## 3. Docs

- [x] 3.1 Add ADR012
- [x] 3.2 Document pre-pulling, `docker compose ps`, and a symptom-to-restart table in the deployment guide

## 4. Verification

- [x] 4.1 Run the health and socket manager tests
- [x] 4.2 On an isolated stack, freeze Redis and confirm only Redis restarts, then hang the server and confirm it restarts
- [x] 4.3 Run `buildApi.sh` so `Common/openapi.json` and the generated client include `/livez`
