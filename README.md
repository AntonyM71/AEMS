# AEMS

## Introduction

The Athlete and Event Management System (AEMS) is designed for running freeestyle kayaking competitions, it can either be ran locally, on a touchscreen laptop for small events, or configured with a laptop, router and 11" tablets to provide a full multi-judge, ICF style system.

If you have a relatvely technical/softwarey person, they should have a good chance of getting the system running; and we aim to make these instructions better as time goes on. Alternatively, if you're willing to cover the cost of my time and reasonable expenses, I'm happy to come to you and help set it up on your hardware, act as technical support for your event or even write a custom ingest script for your CSV file format; please contact me at kayak.freestyle.app@gmail.com.

For simple events, you can run with just a Touchscreen Laptop, check out [deploying to local production](#deploying-to-local-production) to get started.

For running an ICF style competition, we recommend the following setup:

- Laptop (idally touchscreen and with an SSD) to run as a server
- 3/4 11" Tablets or touchscreen laptops, to act as machines for each scribe
- Wireless router to connect the tablets to the server
- Chargers, power banks, etc, depending on your electricity situation.

In addition to deployin the app on the server machine [deploying to local production](#deploying-to-local-production), for multiple devices you'll need to do some network configuration, we're aiming to provide some documentation for this in the near future.

I also have a simple scoring app, available on [Google Play](https://play.google.com/store/apps/details?id=com.kayakfreestyle.kayakfreestyleapp&pcampaignid=web_share) and the [Apple Store](https://apps.apple.com/sk/app/kayak-freestyle-app/id1627445855), these are great for small informal competitions, or athletes to use when designing their rides.

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
6. To give yourself permissions to manipulate the repo directly from your Linux distribution, run:

```
cd ../
sudo chown -R your_unix_username AEMS
```

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
uvicorn main:app \\ run the backend service
```

More instructions for running linting and tests can be found in [the Server README](./Server/README.md)

## Deploying to Local Production

### Requirements

A machine running a docker runtime

### Run Docker Compose

```
docker compose -f docker-compose.yaml  up
```

### Rebuild Docker compose based on latest code

This may take a few minutes

```
docker compose -f docker-compose.yaml  up --build
```

The user interface should now be available on `http://localhost:80` on the machine running the container.

### Set the docker compose to run automatically on startup

This will run the docker in deamon mode, which will continue running indefinetely, without depending on a specific terminal being open. The service should start whenever docker is running.

```
TBC: maybe look at this? https://stackoverflow.com/questions/43671482/how-to-run-docker-compose-up-d-at-system-start-up
```
