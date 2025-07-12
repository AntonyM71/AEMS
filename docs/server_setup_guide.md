# Server Setup Guide

Welcome to the Server Setup Guide! This document will walk you through the steps required to set up your server environment. The guide includes instructions for installing Windows Subsystem for Linux (WSL), configuring WSL networking settings, and assigning a static IP address to your server.

Let's get started!

> If you don't need to use the laptop for anything else, you might want to consider using a install of a linux distribution such as Ubuntu

## Installing WSL on Windows

1. Open PowerShell as Administrator

   - Press Windows + X
   - Select "Windows PowerShell (Admin)" or "Windows Terminal (Admin)"

2. Install WSL by running:

   ```powershell
   wsl --install
   ```

   This command installs Ubuntu by default and enables required Windows features.

3. Restart your computer to complete the installation

4. After restart, Ubuntu will automatically start
   - Create a UNIX username and password when prompted
   - These credentials are separate from your Windows account

> Note: For manual installation or different Linux distributions:
>
> - Use `wsl --list --online` to see available distributions
> - Install specific distros with `wsl --install -d <DistroName>`

For troubleshooting:

- Ensure Windows 10 version 2004+ or Windows 11
- Run `wsl --update` for latest features
- Check Microsoft Store for updates

## Configure WSL Network Mode

To expose your web server over the network, you need to set WSL to use mirrored networking mode:

1. Open PowerShell as Administrator

2. Stop the WSL service:

   ```powershell
   wsl --shutdown
   ```

3. Configure WSL to use mirrored networking:

   ```powershell
   netsh winsock reset
   netsh int ip reset all
   netsh winhttp reset proxy
   ipconfig /flushdns
   wsl --set-default-version 2
   ```

4. Edit or create the WSL configuration file:

   ```powershell
   notepad "$env:USERPROFILE/.wslconfig"
   ```

   Add these lines:

   ```
   [wsl2]
   networkingMode=mirrored
   ```

5. Restart WSL to apply changes:
   ```powershell
   wsl --shutdown
   wsl
   ```

Your WSL instance should now be accessible from other devices on your network.

## Setting Up a Static IP Address

To ensure your server maintains the same IP address (192.168.0.28), you'll need to configure your router to assign a static IP based on your device's MAC address:

1. Find your device's MAC address:

   - Open WSL terminal
   - Run `ip addr show eth0`
   - Look for "link/ether" followed by six pairs of numbers/letters

2. Access your router's admin panel:

   - Open web browser
   - Enter router's IP (typically 192.168.0.1 or 192.168.1.1)
   - Login with admin credentials

3. Configure DHCP reservation:
   - Look for "DHCP Settings" or "Address Reservation"
   - Add new reservation entry
   - Enter your device's MAC address
   - Set IP address to 192.168.0.28
   - Save changes and restart router if prompted

> Note: Router interfaces vary by manufacturer. Consult your router's manual for specific steps.

## Setting Up the Timing Box (Raspberry Pi)

To configure the timing box, you'll need to:

1. Download and install Raspberry Pi Imager

   - Visit [raspberrypi.com/software](https://www.raspberrypi.com/software/)
   - Download and install for your operating system

2. Configure the SD card:

   - Launch Raspberry Pi Imager
   - Click "Choose OS" > "Raspberry Pi OS (32-bit)"
   - Click "Choose Storage" and select your SD card
   - Click the settings icon (gear) to:
     - Set hostname (e.g., "timingbox")
     - Enable SSH
     - Set username and password
     - Configure WiFi credentials
   - Click "Write" and wait for completion

3. Configure static IP for the Pi:

   - Follow the "Setting Up a Static IP Address" section above
   - Use the Pi's MAC address (visible in router's DHCP clients list)
   - Assign desired static IP address

4. SSH into the Raspberry Pi:

   ```bash
   ssh username@raspberry-pi-ip
   ```

5. Run the setup script:
   ```bash
   cd Timer
   chmod +x setup_pi.sh
   ./setup_pi.sh
   ```

The timing box should now be configured and ready for use.

If the server is not set up on 192.168.0.28, then the evnironment variable `ENV123` can be set using

```bash

```
