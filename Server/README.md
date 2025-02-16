# AEMS Server

## Overview

The AEMS Server is a Python FastAPI application that provides the backend services for the Athlete and Event Management System. It handles competition management, scoring logic, and data persistence.

## Technology Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migration Tool**: Alembic
- **API Documentation**: OpenAPI/Swagger
- **Python Version**: >3.10.0

## Getting Started

### Prerequisites

- Python 3.10+
- PostgreSQL

### Development Setup

We recommend using the devcontainer, but to work locally, we support [uv](https://docs.astral.sh/uv/) for python package management (though pip should work), and Node/NPM for javascript

1. If you are not using the DevContainer - Install dependencies from pyproject.toml:

   ```bash
   // Run from from /Server
   uv venv                                // create virtual environment
   source .venv/bin/activate              // activate venv
   uv sync                                // install packages in virtual environment
   ```

2. Set up the database:

   ```bash
   alembic upgrade head
   ```

3. Start the development server:

   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

## Project Structure

```
Server/
├── alembic/          # Database migrations
├── app/              # Application code
│   ├── common/       # Shared utilities
│   ├── competition_management/
│   ├── scoring/      # Scoring logic
│   └── tests/        # Test suites
├── db/               # Database models
├── scripts/          # Utility scripts
└── data/            # Seed data
```

## Code Quality

The project uses ruff for linting and formatting. Configuration is in pyproject.toml.

### Lint Code

```bash
# Check for linting issues
ruff check .

# Fix auto-fixable issues
ruff check --fix .
```

### Format Code

```bash
# Check formatting
ruff format . --check

# Apply formatting
ruff format .
```

Ruff is configured with:

- Line length: 88 characters
- Double quotes for strings
- Space indentation
- Enabled rule sets: E, F, B, I, N, UP, YTT, ANN, etc.

## Database Management

### Create a New Migration

When making database schema changes:

```bash
alembic revision --autogenerate -m "Description of changes"
```

### Apply Migrations

```bash
alembic upgrade head    # Update to latest
alembic downgrade -1    # Rollback one version
```

## Data Seeding

### Seed Default Scoresheets

```bash
python -m scripts.seed_scoresheets
```

### Import Competition Data

```bash
python -m scripts.seed_competition_data_from_xlsx path/to/data.xlsx
```

## API Documentation

### Generate OpenAPI Spec

```bash
python -m scripts.buildOpenApiJson
```

The spec will be generated in `Common/openapi.json`

## Testing

Run the test suite:

```bash
pytest
```

Coverage report is automatically included (configured in pyproject.toml)

## Key Components

### WebSocket Handler

- Manages real-time updates for scoring and competition status
- Located in `app/common/websocket_handler.py`

### Scoring Logic

- Core scoring calculations and validation
- Located in `app/scoring/scoring_logic.py`

### Competition Management

- Event, heat, and phase management
- CSV import functionality
- Located in `app/competition_management/`

## Error Handling

The application uses custom exception handlers for:

- Invalid competition states
- Scoring validation errors
- Data import issues

See `interfaces.py` for error definitions.

## Logging

Custom logging configuration in `custom_logging.py`:

- Structured JSON logs using structlog
- Rich console output in development
- Log correlation IDs for request tracking

## Production Deployment

The server is containerized using Docker. See root `docker-compose.yaml` for production configuration.

## Contributing

1. Follow Python code style (enforced by ruff)
2. Add tests for new features
3. Update migrations for database changes
4. Document API changes in OpenAPI spec
