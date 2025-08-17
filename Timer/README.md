# Timer Application

## Overview

This is a Python-based timer application designed to run on a Raspberry Pi. The application uses GPIO pins to perform the following tasks:

- Start a 45-second timer when a specific pin (Pin 3) goes HIGH.
- Cancel any running timers when another pin (Pin 4) goes HIGH.
- Output a 1-second buzzer signal when the timer completes.

## Hardware Requirements

The required hardware and wiring details are provided in the `Hardware.md` file. Please refer to it for proper setup before running the application.

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
   python timer.py
   ```

3. The application will:
   - Monitor GPIO Pin 3 to start a 45-second timer.
   - Monitor GPIO Pin 4 to cancel an ongoing timer.
   - Activate a buzzer connected to GPIO Pin 17 for 1 second when the timer completes.

## `fake_timer.py` — WebSocket Timer Test Client

This script simulates a timer device for testing WebSocket communication with the AEMS backend.

**Features:**

- Connects to the backend WebSocket endpoint (default: `ws://localhost:8001/timer`).
- Periodically sends JSON messages containing a random `time_remaining` value and a fixed `status` field (`"running"`), mimicking timer updates.
- Concurrently listens for and prints any messages received from the server.
- Useful for testing and debugging backend WebSocket handling logic without requiring real hardware.

**Usage:**

```bash
python fake_timer.py
```
