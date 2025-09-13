#!/bin/bash
# Installs Docker Engine on Ubuntu 24.04 (Noble)

set -e

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root (use sudo)"
  exit 1
fi

# Fix curl dependency issue by forcing package resolution
echo "Fixing broken package dependencies..."
sudo apt-get update
sudo dpkg --configure -a
sudo apt-get install -f
sudo apt-get autoremove
sudo apt-get autoclean

# Force remove and reinstall curl packages to fix version mismatch
echo "Forcing curl package resolution..."
sudo apt-get remove --purge curl libcurl4t64
sudo apt-get update
sudo apt-get install curl

# Add Docker's official GPG key:
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add user to docker group and start Docker service
if [ "$SUDO_USER" ]; then
    sudo usermod -aG docker $SUDO_USER
    echo "Added $SUDO_USER to docker group."
fi
sudo systemctl enable docker
sudo systemctl start docker

echo "Docker installation completed! Please log out and back in for group changes to take effect."