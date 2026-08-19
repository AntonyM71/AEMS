# Holds the SonarQube CLI's file-backed keychain (see SONARQUBE_CLI_KEYCHAIN_FILE
# in the Dockerfile). Created here, not at build time, because /workspaces is a
# bind mount that only exists once the container is running.
mkdir -p /workspaces/.sonar

echo "Installing npm packages..."
(cd Webapp && npm install)
echo "Setting up Python virtual environment..."
(cd Server && uv venv --clear && uv sync --dev --active )
echo "Running Alembic migrations and seeding scoresheets..."
(cd Server && alembic upgrade head && python -m scripts.seed_scoresheets)
