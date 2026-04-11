#!/usr/bin/env bash

# Determine the directory this script is in
TIMER_DIRECTORY="$(cd "$(dirname "$0")/.." && pwd)"

SERVICE_NAME="timer.service"
SERVICE_PATH="/etc/systemd/system/$SERVICE_NAME"
PYTHON_SCRIPT_PATH="$TIMER_DIRECTORY/src/timer.py"
PYTHON_BIN="$TIMER_DIRECTORY/.venv/bin/python"

echo "Running from $TIMER_DIRECTORY"

# Create the service file
echo "Creating $SERVICE_NAME..."
sudo bash -c "cat > $SERVICE_PATH" <<EOL
[Unit]
Description=AEMS Timer Service
After=network.target

[Service]
WorkingDirectory=$TIMER_DIRECTORY
ExecStart=$PYTHON_BIN $PYTHON_SCRIPT_PATH
Restart=always
RestartSec=5
User=$(whoami)
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOL

# Reload systemd to recognize the new service
echo "Reloading systemd daemon..."
sudo systemctl daemon-reload

# Enable the service to start at boot
echo "Enabling $SERVICE_NAME to start at boot..."
sudo systemctl enable $SERVICE_NAME

# Start the service
echo "Starting $SERVICE_NAME..."
sudo systemctl start $SERVICE_NAME

# Check the status
echo "Checking status of $SERVICE_NAME..."
sudo systemctl status $SERVICE_NAME
