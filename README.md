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

3. Install a container runtime, such as [rancher desktop](https://rancherdesktop.io/)
4. Install an editor, such as [VSCode](https://code.visualstudio.com/download) and click `Clone git repository...` and enter the repository details from github.
5. Once the repo is cloned, open it, and it should prompt you to install the devcontainers extension, and to build and run the repository in a dev container.
6. Congratulations, your environment is set up.

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
