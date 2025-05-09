# AEMS (Athlete and Event Management System)

## Overview

AEMS is a comprehensive system designed for managing freestyle kayaking competitions. It supports both small local events and full-scale ICF-style competitions with multiple judges.

### Key Features

- Multi-judge scoring system
- Real-time score tracking and updates
- PDF generation for results
- CSV import for competition setup
- Support for both local and networked deployments
- Touchscreen-optimized interface

## System Requirements

### Minimal Setup (Local Events)

- Touchscreen laptop with Docker runtime
- Modern web browser
- SSD recommended for better performance

### Full ICF-Style Setup

- Server machine (touchscreen laptop recommended)
- 3-4 11" tablets or touchscreen laptops for scribes
- Wireless router for network connectivity
- Power supplies/banks for all devices
- Docker runtime on server machine

## Quick Start

### Local Development

1. Install prerequisites:

   - Git
   - Docker
   - VSCode with Dev Containers extension

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
   alembic upgrade head
   uvicorn main:app

   # Start frontend (in new terminal)
   cd Webapp
   npm start
   ```

### Production Deployment

1. Start the application:

   ```bash
   docker compose -f docker-compose.yaml up
   ```

2. Access the interface at `http://localhost:80`

For rebuilding with latest code:

```bash
docker compose -f docker-compose.yaml up --build
```

## System Architecture

AEMS follows a modern containerized architecture:

- Frontend: React/Next.js application
- Backend: Python FastAPI service
- Database: PostgreSQL
- Reverse Proxy: Nginx

Key components are containerized using Docker for consistent deployment across environments.

## User Roles

- **Competition Admin**: Manages events, uploads participant data
- **Head Judge**: Reviews and oversees scoring
- **Judge**: Inputs scores for athletes
- **Athlete**: Views results and PDF outputs

## Development Guide

### Project Structure

```
AEMS/
├── Server/           # Python FastAPI backend
├── Webapp/          # React frontend
├── Common/          # Shared API definitions
├── docs/            # Documentation and diagrams
└── docker-compose.yaml
```

### Key Development Commands

#### Installing Docker

These instructions are based on the official guide on [the Docker Website](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

1. Install Ubuntu, either on windows as a WSL instance from the microsoft store, or on a seperate partition of your hard drive

2. Run the following commands to register the docker repository on `apt`

```
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

3. Install docker and freinds with:

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4. Start docker with `sudo service docker start`

> To set docker to un automatically on system startup, we can enable systemd by adding the following code to /etc/wsl.conf
>
> ```
> [boot]
> systemd=true
> ```
>
> And then running:
>
> ```
> sudo groupadd docker
> sudo usermod -aG docker $USER
> sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
> sudo chmod g+rwx "$HOME/.docker" -R
> sudo systemctl enable docker.service
> sudo systemctl enable containerd.service
> ```

5. To help you manage your containers, you might want to use a tool like [Lazydocker](https://github.com/jesseduffield/lazydocker). Which you can install with:

```
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash
```

#### Backend (Server/)

```bash
alembic upgrade head     # Update database schema
python -m scripts.seed_scoresheets  # Seed initial data
python -m scripts.buildOpenApiJson  # Update API specs
```

#### Frontend (Webapp/)

```bash
npm start    # Development server
npm test     # Run tests
npm run build # Production build
```

## Support and Contact

For technical support or custom implementations:

- Email: kayak.freestyle.app@gmail.com
- Available for on-site setup and event support

## Mobile Apps

Companion scoring apps available for informal competitions:

- [Google Play](https://play.google.com/store/apps/details?id=com.kayakfreestyle.kayakfreestyleapp)
- [Apple Store](https://apps.apple.com/sk/app/kayak-freestyle-app/id1627445855)

## Contributing

See [Server/README.md](Server/README.md) and [Webapp/README.md](Webapp/README.md) for detailed development setup instructions.
