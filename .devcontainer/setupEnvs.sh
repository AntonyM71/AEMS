echo "Installing sonarqube-cli..."
curl -o- https://raw.githubusercontent.com/SonarSource/sonarqube-cli/refs/heads/master/user-scripts/install.sh | bash
echo "Installing npm packages..."
(cd Webapp && npm install)
echo "Setting up Python virtual environment..."
(cd Server && uv venv --clear && uv sync --dev --active )
echo "Running Alembic migrations and seeding scoresheets..."
(cd Server && alembic upgrade head && python -m scripts.seed_scoresheets)
