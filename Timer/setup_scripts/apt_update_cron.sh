#!/bin/bash

# Define the cron job you want to add
CRON_JOB="0 2 * * 0 sudo apt update && sudo apt upgrade -y"

# Check if the cron job already exists
(crontab -l 2>/dev/null | grep -Fxq "$CRON_JOB") && {
    echo "The cron job is already present."
    exit 0
}

# Add the cron job
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Cron job added successfully."
