#!/bin/bash

# Usage: bash add_wifi_network.sh <network_name> <network_password>

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <network_name> <network_password>"
    exit 1
fi

NETWORK_NAME="$1"
NETWORK_PASSWORD="$2"

run_or_exit sudo nmcli connection add type wifi ifname wlan0 con-name "$NETWORK_NAME" ssid "$NETWORK_NAME"
run_or_exit sudo nmcli connection modify "$NETWORK_NAME" wifi-sec.key-mgmt wpa-psk
run_or_exit sudo nmcli connection modify "$NETWORK_NAME" wifi-sec.psk "$NETWORK_PASSWORD"
run_or_exit sudo nmcli connection modify "$NETWORK_NAME" ipv4.method auto
run_or_exit sudo nmcli connection modify "$NETWORK_NAME" connection.autoconnect yes
