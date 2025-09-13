# Software Maintenance Guide

## Local Development

1. Install prerequisites:

   - Git
   - Docker
   - VSCode with Dev Containers extension (recommended)
   - Python 3.10+ and uv (if not using devcontainer)
   - Node.js 16+ (if not using devcontainer)

2. Clone and setup:

   ```bash
   git clone [repository-url]
   cd AEMS
   # Open in VSCode and accept dev container prompt
   ```

3. Start services:

   ```bash
   # Start backend
   cd Server
   uv venv && source .venv/bin/activate  # If not using devcontainer
   uv sync                                # Install dependencies
   alembic upgrade head                   # Apply database migrations
   uvicorn main:app --reload             # Start development server

   # Start frontend (in new terminal)
   cd Webapp
   npm install                            # Install dependencies
   npm start                             # Start development server
   ```

## System Architecture

> System architecture is discussed in [the architecture documentation](architecture.md)

AEMS follows a modern containerized architecture with:
- FastAPI backend with WebSocket support
- React frontend with real-time updates
- PostgreSQL database with SQLAlchemy ORM
- Nginx reverse proxy for production
- Docker containers for all services

## API Documentation

The backend exposes a Swagger/OpenAPI UI for interactive API exploration and testing.
- Access at: `http://localhost:8000/docs`
- The OpenAPI schema is also available at `http://localhost:8000/openapi.json`

## Testing Strategy

We use intent-driven tests (testing user behavior, not implementation details) for new features.

### Current Testing

- **Frontend**: React Testing Library (RTL), Jest
- **Backend**: Pytest with coverage reporting
- **Timer**: Python unittest/pytest

Test scripts and instructions are documented in each service's README.

### Manual Testing Checklist

Key user journeys to test manually:

1. **Competition Setup**
   - Upload CSV data
   - Create competition structure
   - Assign roles to devices

2. **Scoring Workflow**
   - Judge score entry
   - Real-time score updates
   - Score validation and correction
   - Head judge review and approval

3. **Network Resilience**
   - Disconnect/reconnect during scoring
   - Verify data synchronization
   - Test WebSocket reconnection

4. **PDF Generation**
   - Generate heat results
   - Generate phase results
   - Regenerate after score corrections

### Future Integration Testing

We plan to implement automated integration tests using Microsoft Playwright and Docker to:
- Test complete user workflows end-to-end
- Validate WebSocket behavior under network stress
- Ensure data consistency across multiple devices
- Test PDF generation and export functionality

This will reduce manual testing burden and catch regressions earlier.

## Error Handling & Logging

Top-level error handlers are in place for both frontend and backend.
Please add logging for new features and error cases to improve maintainability.

### Logging Guidelines
- Use structured logging (JSON format)
- Include correlation IDs for request tracking
- Log at appropriate levels (DEBUG, INFO, WARN, ERROR)
- Include context for troubleshooting

## Performance Considerations

AEMS is designed for local competition environments with:
- **Concurrent Users**: ~5 active judges/scribes
- **Expected Load**: ~10 requests per second
- **Database**: PostgreSQL easily handles our scale
- **Network**: Standard WiFi sufficient for local deployments

### Key Development Commands

#### Installing Docker

These instructions are based on the official guide on [the Docker Website](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

1. Install Ubuntu, either on windows as a WSL instance from the microsoft store, or on a separate partition of your hard drive

2. Run the following commands to register the docker repository on `apt`

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

3. Install docker and friends with:

```bash
sudo bash install_docker.sh
```

4. To help you manage your containers, you might want to use a tool like [Lazydocker](https://github.com/jesseduffield/lazydocker). Which you can install with:

```bash
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash
```

#### Backend (Server/)

```bash
uv venv && source .venv/bin/activate  # Create and activate virtual environment
uv sync                                # Install dependencies
alembic upgrade head                   # Update database schema
python -m scripts.seed_scoresheets     # Seed initial data
python -m scripts.buildOpenApiJson     # Update API specs
uvicorn main:app --reload             # Start development server
uv run python -m pytest               # Run tests
ruff check . && ruff format .         # Lint and format code
```

#### Frontend (Webapp/)

```bash
npm install              # Install dependencies
npm start               # Development server
npm test                # Run tests
npm test -- --coverage  # Run tests with coverage
npm run build           # Production build
npm run lint            # Check linting
npm run lintfix         # Fix linting issues
npm run prettierfix     # Format code
```

#### Timer (Timer/)

```bash
uv venv && source .venv/bin/activate  # Create and activate virtual environment
uv sync                                # Install dependencies
python timer.py                        # Run timer application
python fake_timer.py                   # Test WebSocket client
```

## Deployment

### Development
```bash
# Start all services
docker compose -f docker-compose.yaml up --build
```

### Production
- Follow [Server Setup Guide](deployment/server_setup_guide.md) for complete deployment
- Ensure network topology per [Network Topology Guide](deployment/network-topology.md)
- Configure static IP and offline network as documented

## User Guides

For competition officials and end users:
- [Competition Workflow Guide](user-guides/competition-workflow.md)

## Contributing Guidelines

1. Follow existing code style (enforced by linters)
2. Add tests for new features
3. Update documentation for new functionality
4. Test network resilience for real-time features
5. Ensure WebSocket reconnection works properly
6. Test on touch devices when possible

## Troubleshooting

### Common Development Issues

1. **Database connection errors**: Ensure PostgreSQL is running and migrations applied
2. **WebSocket connection failed**: Check CORS settings and port configuration
3. **Build failures**: Verify all dependencies installed and virtual environment activated
4. **Tests failing**: Ensure test database is set up and seeded properly

### Network Issues in Competition

1. **Device can't connect**: Check WiFi credentials and signal strength
2. **Scores not updating**: Verify WebSocket connection status in UI
3. **Connection drops**: Ensure devices have adequate power
4. **Slow performance**: Check router placement and network interference

See [WebSocket Resilience Guide](websocket-resilience.md) for detailed network troubleshooting.