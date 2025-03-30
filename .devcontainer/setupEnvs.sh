echo "Installing npm packages..."
(cd Webapp && npm install)
echo "Setting up Python virtual environment..."
(cd Server && uv venv && uv sync --dev --active)
echo "Running Alembic migrations and seeding scoresheets..."
(cd Server && alembic upgrade head && python -m scripts.seed_scoresheets)
