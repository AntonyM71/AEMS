#!/bin/bash

set -e

sudo apt-get update

# Hardware‑level packages that must come from apt
sudo apt-get install -y python3-spidev
sudo apt-get install -y python3-gpiozero

# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create the environment using the system python with the gpio dependencies installed
uv venv --python /usr/bin/python3.11 .venv --clear

# Activate it
source .venv/bin/activate

# Sync dependencies from pyproject.toml
uv sync
