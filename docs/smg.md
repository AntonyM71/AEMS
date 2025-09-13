# Software Maintenance Guide

## Local Development

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

## System Architecture

> System architecture is discussed in [the architecture documentation](architecture.md)
> AEMS follows a modern containerized architecture:

### Key Development Commands

#### Installing Docker

These instructions are based on the official guide on [the Docker Website](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

1. Install Ubuntu, either on windows as a WSL instance from the microsoft store, or on a separate partition of your hard drive

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

3. Install docker and friends with:

```
sudo bash install_docker.sh
```

1. To help you manage your containers, you might want to use a tool like [Lazydocker](https://github.com/jesseduffield/lazydocker). Which you can install with:

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
