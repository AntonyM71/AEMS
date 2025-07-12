

# Set timer to run automatically

# Variables
CURRENT_DIRECTORY=$(pwd)
SERVICE_NAME="timer.service"
SERVICE_PATH="/etc/systemd/system/$SERVICE_NAME"
PYTHON_SCRIPT_PATH="$CURRENT_DIRECTORY/src/timer.py"

echo "Running from $CURRENT_DIRECTORY"


# Create the service file
echo "Creating $SERVICE_NAME..."
sudo bash -c "cat > $SERVICE_PATH" <<EOL
[Unit]
Description=Run Python Script Indefinitely
After=network.target

[Service]
ExecStart=/usr/bin/python3 $PYTHON_SCRIPT_PATH
Restart=always
RestartSec=5
WorkingDirectory=$CURRENT_DIRECTORY
User=$(whoami)

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
