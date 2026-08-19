# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and other AI coding agents (GitHub Copilot, OpenAI Codex, etc.) when working with code in this repository. It is also referenced as `agents.md`. For GitHub Copilot-specific onboarding instructions, see [.github/copilot-instructions.md](.github/copilot-instructions.md).

## What AEMS Is

AEMS (Athlete and Event Management System) is a multi-service competition management system for freestyle kayaking events. It provides multi-judge scoring, real-time results, PDF report generation, hardware timing integration, and broadcast/arena display overlays. It is designed to run **offline on a local network** (no internet dependency) at competition venues.

## Monorepo Layout

Each top-level directory is an independently-owned service. Keep changes scoped to the owning service.

- [Server/](Server/) — FastAPI + SQLAlchemy + Alembic backend. All scoring, competition data, PDF generation, and Socket.IO live here. Python, managed with `uv`.
- [Webapp/](Webapp/) — Next.js + TypeScript frontend (Redux Toolkit, RTK Query, Material-UI, Pixi.js, socket.io-client).
- [Timer/](Timer/) — Python app for a Raspberry Pi timing box (GPIO-driven 45-second timer + buzzer). Managed with `uv`.
- [GraphicsServer/](GraphicsServer/) — Static Nginx server that hosts broadcast overlay "graphics packs" (per-component JSON + PNG frame sequences). No application code.
- [Common/](Common/) — Shared build output; contains the generated `openapi.json` (the contract between Server and Webapp).
- [e2e/](e2e/) — Playwright end-to-end tests spanning the running stack.
- [docs/](docs/) — arc42 architecture doc, ADRs ([docs/decisions/](docs/decisions/)), deployment guides, user guides. Read ADRs for the *why* behind non-obvious decisions.

## The API Codegen Contract (important)

The frontend's API client is **generated** from the backend's OpenAPI schema. Do not edit it by hand.

- **Never edit** [Webapp/src/redux/services/aemsApi.ts](Webapp/src/redux/services/aemsApi.ts) — it is generated.
- When you change backend endpoints/schemas in [Server/app/](Server/app/), regenerate the client by running [buildApi.sh](buildApi.sh) from the repo root. This writes the OpenAPI schema to `Common/openapi.json`, runs `@rtk-query/codegen-openapi`, then strips `| any` types and Prettier-formats the result.

## Common Commands

### Server (run from [Server/](Server/))
```bash
uv venv && source .venv/bin/activate && uv sync   # first-time setup
alembic upgrade head                              # apply migrations (REQUIRED before tests or running)
uvicorn main:app --reload                         # run dev server (http://localhost:8000, docs at /docs)
uv run python -m pytest                           # run all backend tests
uv run python -m pytest path/to/test.py::test_fn # run a single test
uv run ruff check .                               # lint
uv run ruff format .                              # format
alembic revision --autogenerate -m "message"      # create a migration after model changes
python -m scripts.seed_scoresheets               # seed default scoresheets
```
`alembic upgrade head` **must** be run before backend tests or starting the server. Ruff line length is 88; enabled rule sets include ANN (type annotations required), N (naming), UP, B, EM, TRY, PD. `pytest` runs with coverage by default (`--cov`).

### Webapp (run from [Webapp/](Webapp/))
```bash
npm install
npm start                    # next dev (http://localhost:3000)
npm run build                # next build
npm test                     # jest
npm test -- path/to/file     # run a single test file
npx jest -t "test name"      # run tests matching a name
npm run tsc                  # type-check
npm run lint / npm run lintfix
npm run prettierfix
npm run precommit            # tsc + lintfix + prettierfix (run before committing frontend changes)
```

### e2e (run from [e2e/](e2e/))
```bash
npm test                     # playwright test (requires the stack running)
npm run test:report          # open the last Playwright report
```

### Full stack via Docker (from repo root)
Both compose files below attach to an external `aems_shared` Docker network (used to reach the broadcast graphics server). Create it once per machine before the first run:
```bash
docker network create aems_shared
```
```bash
docker compose -f docker-compose.yaml up          # server + frontend + nginx + postgres
```
The server container runs `alembic upgrade head && seed_scoresheets && gunicorn ...` on start. Nginx is exposed on port 81, frontend 3000, server 8000, postgres 5432.

### Graphics overlay server (from repo root)
```bash
export GRAPHICS_PACK_DIR=/absolute/path/to/active-pack
docker compose -f docker-compose.graphics.yaml up --build   # serves on http://localhost:82
```

## Testing Philosophy

Prefer integration-style tests that assert outcomes that matter to users, over tests that only check internals or that code runs without crashing.

- ✅ Assert that a score calculation returns the correct value for a specific set of moves and bonuses
- ✅ Assert that creating a competition via the API persists it so it can be read back
- ✅ Assert that clicking a move card updates the Redux store with the correct move and direction
- ❌ Avoid asserting only that a response has status `200` without checking the body
- ❌ Avoid asserting only that a component renders without crashing
- ❌ Avoid asserting on internal implementation details

Unit tests are appropriate for: common utilities, key business logic (scoring algorithms, bonus deduplication), and logic too slow or complex to cover through integration tests.

- **Backend** ([Server/](Server/)): test files live in `Server/app/*/tests/`; use `fastapi.testclient.TestClient` with fixtures from `conftest.py`, and assert on response bodies, not just status codes. See `Server/app/scoring/tests/test_scoring_logic.py` and `Server/app/competition_management/tests/test_competition_management.py` for good examples.
- **Frontend** ([Webapp/](Webapp/)): use `renderWithProviders` from `src/testUtils.tsx`, and **MSW** via `src/mocks/server.ts` for API mocking — do **not** mock `aemsApi.ts` directly. Simulate user interactions and assert on visible outcomes. See `Webapp/src/components/competition/__tests__/CompetitionSelector.test.tsx` and `Webapp/src/utils/scoringUtils.spec.ts`.
- **E2E** ([e2e/](e2e/)): use Playwright against a real running stack, no mocking. Test complete user workflows (create data → verify it persists → use it in the UI) with a unique identifier (e.g., `Date.now()`) in test data names to avoid collisions.

## Architecture Notes

- **Real-time:** The backend uses **Socket.IO** (`python-socketio`, ASGI) mounted alongside FastAPI — the app is served as `main:socket_app`, not `main:app`, in production. The frontend uses `socket.io-client`. (Migrated from raw WebSockets per ADR006.) Server-authoritative state with resilient reconnection; the socket manager defaults CORS to `*` when `CORS_ALLOWED_ORIGINS` is unset.
- **Backend structure:** [Server/main.py](Server/main.py) wires together routers. CRUD endpoints for each entity live in [Server/app/crud/](Server/app/crud/) (athlete, heat, phase, competition, event, scoredmoves, scoresheet, etc.). Higher-level logic is grouped: [Server/app/scoring/](Server/app/scoring/) (scoring_logic + custom scoring endpoints), [Server/app/competition_management/](Server/app/competition_management/) (incl. `create_competition_from_xlsx.py` and PDF endpoints), [Server/app/broadcastEndpoints.py](Server/app/broadcastEndpoints.py), [Server/app/scoresheetEndpoints.py](Server/app/scoresheetEndpoints.py). SQLAlchemy models are in [Server/db/models.py](Server/db/models.py); DB session/engine in [Server/db/client.py](Server/db/client.py) (lazy init, reads `CONNECTION_STRING`).
- **Competition domain model:** Competition → Events → Phases → Heats → Athletes (via athleteheat), with runs, scored moves, and bonuses. Scoring aggregates multiple judges' scored moves per athlete/run. PDFs are generated with `fpdf2`; competitions can be created from uploaded XLSX/CSV.
- **Frontend structure:** Role-based components under [Webapp/src/components/](Webapp/src/components/) (`competition/`, `judging/`, `roles/`, `ScoresheetBuilder/`). State via Redux Toolkit; API access via RTK Query services in [Webapp/src/redux/](Webapp/src/redux/). Touch-optimized for tablets.
- **Broadcast overlays:** Overlays render PNG frame sequences (intro → hold frame → outro) via a **Pixi.js/WebGL** React wrapper (`@pixi/react`, `pixi.js`), composing React overlay content above the animated background. Frame packs are served statically by GraphicsServer/Nginx, kept separate from the open-source code so licensed graphics assets stay out of the repo. See ADR005 (WebGL + Nginx) and ADR006 (Pixi React wrapper).

## Working Rules

- Use the devcontainer ([.devcontainer/](.devcontainer/)) when possible.
- Check pinned versions in `pyproject.toml` / `package.json` before upgrading dependencies.
- Prefer existing patterns in nearby files over inventing new abstractions; add or update tests when behavior changes.
- CI behavior is defined in [azure-pipelines.yml](azure-pipelines.yml).
- Record significant architecture decisions as new ADRs in [docs/decisions/](docs/decisions/).
