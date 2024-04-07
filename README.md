# AEMS

## Contributing

### Building dev environment

This application uses a dev container, to make it straightfoward to get started.

1. Download [git](https://git-scm.com/download)
2. Set git username and email from a terminal

```terminal
git config --global user.name "Your Name"
git config --global user.email "your.email@address"
```

3. Install a container runtime (See [Installing Docker](#installing-docker))
4. Install an editor, such as [VSCode](https://code.visualstudio.com/download) and click `Clone git repository...` and enter the repository details from github.
5. Once the repo is cloned, open it, and it should prompt you to install the devcontainers extension, and to build and run the repository in a dev container.
6. Congratulations, your environment is set up.

### Installing Docker

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

5. To help you manage your containers, you might want to use a tool like [Lazydocker](https://github.com/jesseduffield/lazydocker). Which you can install with:

```
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash
```

### Running the services

#### Webapp

```
cd Webapp \\ navigate to the webapp folder
npm start  \\ run the webapp in development mode
```

More instructions for running linting and tests can be found in [the Webapp README](./Webapp/README.md)

#### Server

```
cd Server \\ Navigate to the server directory
alembic upgrade head \\ Upgrade the database to the latest version
uvicorn api:app \\ run the backend service
```

More instructions for running linting and tests can be found in [the Server README](./Server/README.md)

## Deploying to Local Production

### Requirements

A machine running a docker runtime

### Run Docker Compose

```
docker-compose -f docker-compose.yaml  up
```

### Rebuild Docker compose based on latest code

This may take a few minutes

```
docker-compose -f docker-compose.yaml  up --build
```

### Set the docker compose to run automatically on startup

This will run the docker in deamon mode, which will continue running indefinetely, without depending on a specific terminal being open. The service should start whenever docker is running.

```
docker compose -f docker-compose.yaml up -d
```
