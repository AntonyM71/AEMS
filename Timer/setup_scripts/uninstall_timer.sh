#!/bin/bash

# Variables
SERVICE_NAME="timer.service"
SERVICE_PATH="/etc/systemd/system/$SERVICE_NAME"

# Stop the service if it's running
echo "Stopping $SERVICE_NAME..."
sudo systemctl stop $SERVICE_NAME

# Disable the service from starting at boot
echo "Disabling $SERVICE_NAME..."
sudo systemctl disable $SERVICE_NAME

# Remove the service file
if [ -f "$SERVICE_PATH" ]; then
    echo "Removing $SERVICE_NAME file..."
    sudo rm $SERVICE_PATH
else
    echo "$SERVICE_NAME file does not exist. Skipping removal."
fi

# Reload systemd to recognize the changes
echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

# Confirm uninstallation
echo "Uninstallation of $SERVICE_NAME complete!"
