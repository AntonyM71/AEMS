# Copilot Coding Agent Onboarding Instructions for AEMS Repository

## What This Repo Is

AEMS is a multi-service freestyle kayaking competition system. The main code areas are:

- [Server/](../Server) for FastAPI, SQLAlchemy, Alembic, and backend scoring/data logic
- [Webapp/](../Webapp) for the Next.js/React frontend
- [Timer/](../Timer) for Raspberry Pi timer hardware
- [Common/](../Common) for shared OpenAPI output
- [docs/](../docs) for architecture, deployment, and decision records

## What To Read First

Prefer linking to the existing docs instead of restating them here:

- [README.md](../README.md) for the repo-level overview
- [Server/README.md](../Server/README.md) for backend setup and backend-specific commands
- [Webapp/README.md](../Webapp/README.md) for frontend setup and UI conventions
- [Timer/README.md](../Timer/README.md) for timer hardware setup
- [docs/server_setup_guide.md](../docs/deployment/server_setup_guide.md) for networked deployment
- [docs/smg.md](../docs/smg.md) for broader maintenance guidance

## Working Rules

- Use the devcontainer when possible.
- In [Server/](../Server), use `uv`; activate the virtual environment before running `uv sync`.
- Run `alembic upgrade head` before backend tests or starting the server.
- In [Webapp/](../Webapp), install with `npm install` unless the task explicitly requires a clean CI-style install.
- Check pinned versions in `pyproject.toml` and `package.json` before upgrading dependencies.
- If a task touches backend API shapes, regenerate the client instead of editing generated files by hand.

## Validation Defaults

- Backend: `uv run python -m pytest`, `uv run ruff check .`, `uv run ruff format .`
- Frontend: `npm run tsc`, `npm run lint`, `npm test`, `npm run build`
- Timer: `uv run ruff check src/` and `uv run python -m pytest`
- Docker/local integration: `docker compose -f docker-compose.yaml up`
- CI behavior is defined in [azure-pipelines.yml](../azure-pipelines.yml)

## Generated Files And Boundaries

- Never edit [Webapp/src/redux/services/aemsApi.ts](../Webapp/src/redux/services/aemsApi.ts) directly.
- Regenerate it by running [buildApi.sh](../buildApi.sh) after backend API changes.
- The OpenAPI source is written to [Common/openapi.json](../Common/openapi.json).
- Change backend endpoints in [Server/app/](../Server/app) and then regenerate the client.

## Good Editing Heuristics

- Keep changes scoped to the owning service: backend in [Server/](../Server), frontend in [Webapp/](../Webapp), hardware in [Timer/](../Timer), shared schema in [Common/](../Common).
- Prefer existing patterns in nearby files over inventing new abstractions.
- Add or update tests when behavior changes.
- Use [docs/decisions/](../docs/decisions) for architecture context instead of repeating that history here.

## If Things Break

- Check that dependencies are installed and migrations are applied.
- If frontend codegen looks stale, rerun [buildApi.sh](../buildApi.sh).
- If deployment or networking is involved, refer to [docs/deployment/](../docs/deployment).
- For recurring friction, use `/chronicle improve` to refine these instructions over time.
