# Copilot Coding Agent Onboarding Instructions for AEMS Repository

## High-Level Overview

AEMS (Athlete and Event Management System) is a multi-component system for managing freestyle kayaking competitions. It supports real-time scoring, multi-judge workflows, PDF/CSV import/export, and is designed for both local and networked deployments. The system is containerized using Docker and consists of:

- **Backend**: Python FastAPI (Server/)
- **Frontend**: React/Next.js (Webapp/)
- **Timer**: Python (Timer/) for Raspberry Pi hardware integration
- **Common**: Shared OpenAPI definitions (Common/)
- **Documentation**: Architecture, setup, and decisions (docs/)

**Languages/Frameworks**: Python 3.10+, FastAPI, SQLAlchemy, Alembic, React, TypeScript, Redux Toolkit, Material-UI, Jest, RTK Query, Docker, Nginx.

**Repo Size**: Large, multi-service, with extensive documentation and scripts.

## Build, Test, and Validation Instructions

### General Principles

- **Always use the devcontainer for local development if possible.**
- **Always run `npm install` in Webapp/ and `uv sync` in Server/ before building or testing.**
- **Always apply database migrations (`alembic upgrade head`) before running backend tests or starting the server.**
- **Lint and format code before submitting changes.**
- **Trust these instructions unless you encounter errors; only search for additional info if these steps fail.**

### Backend (Server/)

- **Python Version**: 3.10.x (do not use newer; some dependencies are pinned)
- **Dependency Management**: Use [uv](https://docs.astral.sh/uv/) (preferred) or pip
- **Install dependencies**:
  ```bash
  uv venv
  source .venv/bin/activate
  uv sync
  ```
- **Database Setup**:
  ```bash
  alembic upgrade head
  ```
- **Run Server**:
  ```bash
  uvicorn main:app --reload
  ```
- **Run Tests**:
  ```bash
  uv run python -m pytest
  ```
- **Lint/Format**:
  ```bash
  ruff check .
  ruff format .
  ```
- **Code Coverage**: Pytest with coverage is configured in `pyproject.toml`.
- **Migrations**: Use Alembic (`alembic revision --autogenerate -m "msg"`)
- **Seed Data**: `python -m scripts.seed_scoresheets`

### Frontend (Webapp/)

- **Node Version**: 16+
- **Install dependencies**:
  ```bash
  npm install
  ```
- **Run Dev Server**:
  ```bash
  npm start
  ```
- **Run Tests**:
  ```bash
  npm test
  npm test -- --coverage
  ```
- **Build**:
  ```bash
  npm run build
  ```
- **Lint/Format**:
  ```bash
  npm run lint
  npm run lintfix
  npm run prettierfix
  ```

### Timer (Timer/)

- **Install dependencies**:
  ```bash
  uv venv
  source .venv/bin/activate
  uv sync
  ```
- **Run Timer**:
  ```bash
  python timer.py
  ```
- **Test WebSocket Client**:
  ```bash
  python fake_timer.py
  ```

### Docker/Production

- **Start all services**:
  ```bash
  docker compose -f docker-compose.yaml up
  ```
- **Rebuild**:
  ```bash
  docker compose -f docker-compose.yaml up --build
  ```
- **Access**: Frontend at `http://localhost:80`, Backend at `http://localhost:8000`

### CI/CD & Validation

- **Azure Pipelines**: Runs on push to `main`. Validates Python and Node builds, runs tests, and publishes results. See `azure-pipelines.yml` for details.
- **Linting and formatting are enforced in CI.**
- **Test results must pass for merge.**

## Project Layout & Key Files

- **Repo Root**: `README.md`, `docker-compose.yaml`, `nginx.conf`, `azure-pipelines.yml`, `sonar-project.properties`
- **Server/**: Backend code, `main.py`, `pyproject.toml`, `environment.yml`, `alembic.ini`, `db/`, `app/`, `scripts/`, `test_custom_logging.py`
- **Webapp/**: Frontend code, `package.json`, `eslint.config.mjs`, `jest.config.js`, `src/`, `test/`
- **Timer/**: Raspberry Pi timer, `pyproject.toml`, `timer.py`, `install_timer.sh`, `README.md`
- **Common/**: `openapi.json` (shared API schema)
- **docs/**: `architecture.md`, `server_setup_guide.md`, `decisions/ADR*.md`, diagrams

## Additional Notes

- **Always check for pinned versions in `pyproject.toml` and `package.json` before upgrading dependencies.**
- **If you encounter build/test failures, verify that all dependencies are installed and migrations are applied.**
- **For hardware integration (Timer/), see `Hardware.md` for setup.**
- **For network setup, see `docs/server_setup_guide.md`.**
- **For architectural decisions, see `docs/decisions/ADR*.md`.**

## Agent Guidance

- **Trust these instructions for build, test, and validation. Only search if steps fail or information is missing.**
- **Prioritize changes in Server/ for backend, Webapp/ for frontend, Timer/ for hardware, and Common/ for shared API.**
- **Lint, format, and test before submitting changes.**
- **Document any errors and workarounds in PRs.**
