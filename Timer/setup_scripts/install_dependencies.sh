#!/bin/bash

# Ensure that pip is using the latest version
echo "Upgrading pip to the latest version..."
pip install --upgrade pip

# Check for pyproject.toml
PYPROJECT_FILE="pyproject.toml"
if [ ! -f "$PYPROJECT_FILE" ]; then
    echo "Error: $PYPROJECT_FILE not found in the current directory."
    exit 1
fi

# Install dependencies using pip from pyproject.toml
echo "Installing dependencies from $PYPROJECT_FILE..."
pip install .

# Check if the installation was successful
if [ $? -eq 0 ]; then
    echo "Dependencies installed successfully."
else
    echo "Error: Failed to install some dependencies."
    exit 1
fi
