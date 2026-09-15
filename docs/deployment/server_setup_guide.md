# Server Setup Guide

This guide covers installing Windows Subsystem for Linux (WSL), configuring its networking, and assigning your server a static IP address.

> If you don't need the laptop for anything else, consider installing a Linux distribution such as Ubuntu directly instead.

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

## Running the Server Code

The AEMS Nginx container connects to an external Docker network named `aems_shared` (used to reach the broadcast graphics server, whether or not that stack is running). Create it once on the host machine before the first run:

```bash
docker network create aems_shared
```

If the network already exists, Docker will report that it is already present.

With the server machine and network settings correctly configured, we can run the server with:

```bash
docker compose -f docker-compose.yaml up --build
```

If you also want to run the broadcast graphics stack, follow [Running AEMS With the Graphics Server](/docs/deployment/aems-with-graphics-server.md).

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
   bash install_timer.sh
   ```

This registers the timer as a systemd service (`timer.service`) that starts on boot.

The timing box should now be configured and ready for use.

If the server is not at 192.168.0.28, set the `SOCKETIO_URL` environment variable to point the timer at the right address, then reload and restart the service:

```bash
sudo systemctl edit timer.service
```

Add:

```ini
[Service]
Environment=SOCKETIO_URL=http://<server-ip>:81
```

Then apply it:

```bash
sudo systemctl daemon-reload
sudo systemctl restart timer.service
```
