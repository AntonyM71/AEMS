# Timer Application

## Overview

This is a Python-based timer application designed to run on a Raspberry Pi. The application uses GPIO pins to perform the following tasks:

- Start a 45-second timer when a specific pin (GPIO 4, BCM numbering) goes HIGH.
- Cancel any running timers when another pin (GPIO 5) goes HIGH.
- Output a 1-second buzzer signal on GPIO 15 when the timer completes.

## Hardware Requirements

The required hardware and wiring details are provided in the `Hardware.md` file. Please refer to it for proper setup before running the application.

Timer is tested on Raspberry Pi 4 and Pi 5 (4GB RAM or more recommended).

## Prerequisites

### Software:

- Raspberry Pi with Python 3 installed.
- The `RPi.GPIO` library for GPIO pin management.
- [uv](https://docs.astral.sh/uv/) for Python package management on the Raspberry Pi.

### Installation

1. Clone or copy the project files to your Raspberry Pi:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies using `uv`:
   ```bash
   uv venv                          # Create virtual environment
   source .venv/bin/activate        # Activate the virtual environment
   uv sync                          # Install dependencies from pyproject.toml
   ```

## Usage

1. Wire up the Raspberry Pi according to the instructions in `Hardware.md`.

2. Start the application:

   ```bash
   python src/timer.py
   ```

3. The application will:
   - Monitor GPIO 4 to start a 45-second timer.
   - Monitor GPIO 5 to cancel an ongoing timer.
   - Activate a buzzer connected to GPIO 15 for 1 second when the timer completes.

## `fake_timer.py` — Socket.IO Timer Test Client

This script simulates a timer device for testing Socket.IO communication with the AEMS backend.

**Features:**

- Connects to the backend Socket.IO server (default: `http://localhost:8000`, `/timer` namespace). Override with the `SOCKETIO_URL` environment variable.
- Periodically sends JSON messages containing a random `time_remaining` value and a fixed `status` field (`"running"`), mimicking timer updates.
- Useful for testing and debugging backend Socket.IO handling logic without requiring real hardware.

**Usage:**

```bash
python src/fake_timer.py
```
