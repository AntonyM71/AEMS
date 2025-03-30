"""Timer module for controlling physical competition timer and sending WebSocket updates."""

import asyncio
import json
import logging
import os
import queue
import threading
import time
from typing import Any, Optional

import RPi.GPIO as GPIO
import websockets

logging.basicConfig(level=logging.WARN)
# GPIO setup
GPIO.setmode(GPIO.BCM)

# GPIO pin assignments
PIN_INPUT_START = 4
PIN_INPUT_CANCEL = 5
PIN_BUZZER = 27
PIN_RUNNING_LIGHT = 14
PIN_READY_LIGHT = 6

GPIO.setup(PIN_INPUT_START, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(PIN_INPUT_CANCEL, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

GPIO.setup(PIN_BUZZER, GPIO.OUT)
GPIO.output(PIN_BUZZER, GPIO.LOW)

GPIO.setup(PIN_READY_LIGHT, GPIO.OUT)
GPIO.output(PIN_READY_LIGHT, GPIO.HIGH)

GPIO.setup(PIN_RUNNING_LIGHT, GPIO.OUT)
GPIO.output(PIN_RUNNING_LIGHT, GPIO.LOW)


# Environment variable configuration
# Set to "0", "false", or "no" to disable WebSocket functionality
ENABLE_WEBSOCKET = os.environ.get("ENABLE_WEBSOCKET", "true").lower() not in (
    "0",
    "false",
    "no",
)

# Timer and threading variables
timer_thread = None
timer_running = False
websocket_thread = None
message_queue = queue.Queue()  # Thread-safe queue for WebSocket messages
websocket_running = True  # Flag to control the WebSocket thread

# Server configuration - change this to match your server address
WS_SERVER_URL = os.environ.get("WEBSOCKET_URL", "ws://192.168.0.28:81/api/timer")


# WebSocket communication functions broken down into smaller parts
async def check_connection(websocket: Any) -> bool:
    """Check if a websocket connection is active using ping/pong"""
    if websocket is None:
        return False

    try:
        # Try a ping to check if connection is alive
        pong = await websocket.ping()
        await asyncio.wait_for(pong, timeout=1.0)
    except Exception:
        return False
    else:
        return True


async def connect_to_websocket() -> Any:
    """Establish a new WebSocket connection"""
    try:
        websocket = await websockets.connect(WS_SERVER_URL)
        logging.info("Connected to WebSocket server at %s", WS_SERVER_URL)
    except Exception as e:
        logging.info("Error connecting to WebSocket server: %s", e)
        return None
    else:
        return websocket


async def process_message_queue(websocket: Any) -> None:
    """Process pending messages from the queue"""
    if websocket is None:
        return

    try:
        # Non-blocking check for messages
        message = message_queue.get(block=False)
        # Send the message
        await websocket.send(message)
        message_queue.task_done()
    except queue.Empty:
        # No messages to process
        pass


async def cleanup_websocket(websocket: Any) -> None:
    """Clean up the websocket connection"""
    if websocket is not None:
        try:
            await websocket.close()
            logging.info("WebSocket connection closed")
        except Exception as e:
            logging.info("Error closing WebSocket: %s", e)


async def run_websocket_loop() -> None:
    """Main websocket communication loop"""
    global websocket_running
    websocket = None

    while websocket_running:
        try:
            # Manage connection state
            connection_active = await check_connection(websocket)

            if not connection_active:
                websocket = await connect_to_websocket()
                if websocket is None:
                    # Connection failed, wait before retry
                    await asyncio.sleep(2)
                    continue

            # Process any pending messages
            await process_message_queue(websocket)

            # Short sleep to avoid tight loop
            await asyncio.sleep(0.1)

        except Exception as e:
            logging.info("Error in WebSocket thread: %s", e)
            websocket = None  # Reset so we reconnect
            await asyncio.sleep(1)  # Wait before retrying

    # Clean up when loop exits
    await cleanup_websocket(websocket)


def websocket_worker() -> None:
    """Worker thread that maintains a WebSocket connection and sends messages from the queue"""
    logging.info("Starting WebSocket communication thread")
    asyncio.run(run_websocket_loop())


def start_websocket_thread() -> None:
    """Start the WebSocket communication thread"""
    global websocket_thread, websocket_running

    if websocket_thread is None or not websocket_thread.is_alive():
        websocket_running = True
        websocket_thread = threading.Thread(target=websocket_worker, daemon=True)
        websocket_thread.start()


def send_timer_update(status: str, time_remaining: Optional[float] = None) -> None:
    """
    Queue a timer status update to be sent by the WebSocket thread.
    Non-blocking and safe to call from the timer thread.

    Args:
        status (str): Status of the timer ("started", "running", "finished", "cancelled")
        time_remaining (float, optional): Remaining time in seconds
    """
    # Skip if WebSocket functionality is disabled
    if not ENABLE_WEBSOCKET:
        return

    try:
        data = {"status": status}
        if time_remaining is not None:
            # Convert to string to ensure proper JSON serialization
            data["time_remaining"] = str(time_remaining)

        payload = json.dumps(data)
        message_queue.put(payload)
    except Exception as e:
        logging.info("Error queuing timer update: %s", e)


def set_running_light_on() -> None:
    GPIO.output(PIN_RUNNING_LIGHT, GPIO.HIGH)


def set_running_light_off() -> None:
    GPIO.output(PIN_RUNNING_LIGHT, GPIO.LOW)


def buzz(pitch: float = 100, duration: float = 1.0) -> None:
    period = 1.0 / pitch
    p2 = period / 2
    cycles = int(duration * pitch)
    for _ in range(cycles):
        GPIO.output(PIN_BUZZER, GPIO.HIGH)

        time.sleep(p2)
        GPIO.output(PIN_BUZZER, GPIO.LOW)

        time.sleep(p2)


def double_buzz(duration: float = 0.33, gap: float = 0.33) -> None:
    buzz(duration=duration)
    time.sleep(gap)
    buzz(duration=duration)


# Timer phase management functions
def run_timer_phase(
    duration: float, elapsed_time: float, last_whole_second: int, total_duration: float
) -> tuple[float, int, bool]:
    """
    Run a single phase of the timer

    Args:
        duration: Length of this phase in seconds
        elapsed_time: Current elapsed time since timer started
        last_whole_second: Last whole second that was announced
        total_duration: Total duration of all timer phases combined

    Returns:
        tuple: (updated elapsed_time, updated last_whole_second, whether phase completed)
    """
    global timer_running

    phase_elapsed = 0
    while timer_running and phase_elapsed < duration:
        time.sleep(0.1)  # Short sleep interval
        phase_elapsed += 0.1
        elapsed_time += 0.1

        # Send update on each whole second
        current_second = int(elapsed_time)
        if current_second > last_whole_second:
            last_whole_second = current_second
            time_remaining = total_duration - elapsed_time
            send_timer_update("running", time_remaining)

    # Return if we completed normally or were cancelled
    return elapsed_time, last_whole_second, timer_running


def timer_task() -> None:
    """Timer task function that runs in its own thread"""
    global timer_running

    # Setup initial timer state
    set_running_light_on()
    elapsed_time = 0
    last_whole_second = 0

    # Timer phase durations
    total_duration_1 = 35  # First phase duration
    total_duration_2 = 9  # Second phase duration
    sec10_buzz_duration = 1
    total_duration = total_duration_1 + total_duration_2 + sec10_buzz_duration

    # Run first phase
    elapsed_time, last_whole_second, phase1_completed = run_timer_phase(
        total_duration_1, elapsed_time, last_whole_second, total_duration
    )

    # Signal end of first phase if not cancelled
    if phase1_completed:
        print(elapsed_time)
        buzz(duration=sec10_buzz_duration)
        elapsed_time = (
            elapsed_time + sec10_buzz_duration
        )  # Update time for buzz duration
        # Run second phase
        elapsed_time, last_whole_second, phase2_completed = run_timer_phase(
            total_duration_2, elapsed_time, last_whole_second, total_duration
        )

        # Signal end of second phase if not cancelled
        if phase2_completed:
            # Notify when timer finishes
            send_timer_update("finished", 0)
            double_buzz()

    # Clean up timer state
    set_running_light_off()
    timer_running = False  # Reset the state


def start_timer() -> None:
    """Start the timer if it's not already running"""
    global timer_thread, timer_running

    if timer_running:  # Don't start a new timer if one is already running
        return

    timer_running = True

    # Notify when timer starts
    send_timer_update("started", 45)  # 34 + 10 = 44 seconds total (rounded up)

    # Start timer thread
    timer_thread = threading.Thread(target=timer_task)
    timer_thread.start()


def cancel_timer() -> None:
    """Cancel a running timer if one is active"""
    global timer_running
    if timer_running:
        timer_running = False  # Set flag to cancel any running timer
        set_running_light_off()
        # Notify when timer is cancelled
        send_timer_update("cancelled", 0)


# Main program loop
if __name__ == "__main__":
    try:
        # Start the WebSocket communication thread if enabled
        if ENABLE_WEBSOCKET:
            logging.info(
                "WebSocket functionality is ENABLED - connecting to %s", WS_SERVER_URL
            )
            start_websocket_thread()
        else:
            logging.info(
                "WebSocket functionality is DISABLED - timer will run in standalone mode"
            )

        while True:
            # Check if the start pin is HIGH
            if GPIO.input(PIN_INPUT_START) == GPIO.HIGH:
                start_timer()

            # Check if the cancel pin is HIGH
            if GPIO.input(PIN_INPUT_CANCEL) == GPIO.HIGH:
                cancel_timer()

            time.sleep(0.1)  # Avoid busy waiting

    except KeyboardInterrupt:
        logging.info("Exiting program")

    finally:
        # Signal the WebSocket thread to stop if it was started
        if ENABLE_WEBSOCKET:
            websocket_running = False
            if websocket_thread and websocket_thread.is_alive():
                # Wait for the thread to finish
                websocket_thread.join(timeout=1.0)

        GPIO.cleanup()
