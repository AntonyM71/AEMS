"""Timer module for controlling physical competition timer and sending WebSocket updates."""

import asyncio
import json
import logging
import os
import queue
import threading
import time
from dataclasses import asdict, dataclass
from typing import Any, Literal, Optional

import RPi.GPIO as GPIO
import websockets

from tm1637 import TM1637Decimal
import sys
sys.path.append('/home/aems/AEMS/Server')  # Add Server to sys.path if needed

from custom_logging import setup_logging


setup_logging(json_logs=True, log_level="INFO", log_name="timer")
# GPIO setup
GPIO.setmode(GPIO.BCM)

# GPIO pin assignments
PIN_INPUT_START = 4
PIN_INPUT_CANCEL = 5
PIN_BUZZER = 15
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

CLK = 8
DIO = 7


SLEEP_INTERVAL = 0.05


def swap(segs: bytearray) -> bytearray:
    length = len(segs)
    if length == 4 or length == 5:
        segs.extend(bytearray([0] * (6 - length)))
    segs[0], segs[2] = segs[2], segs[0]
    if length >= 4:
        segs[3], segs[5] = segs[5], segs[3]
    return segs


tm = TM1637Decimal(clk=CLK, dio=DIO)
tm.write(swap(tm.encode_string('READY')))

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
WS_SERVER_URL = os.environ.get(
    "WEBSOCKET_URL", "ws://192.168.0.28:81/api/timer")

StatusLiteral = Literal["started", "running", "finished", "cancelled"]


def get_short_status(status: StatusLiteral) -> str:
    """Returns a three-letter abbreviation for the given status."""
    status_map = {
        "started": "STA",
        "running": "RUN",
        "finished": "FIN",
        "cancelled": "CAN"
    }
    return status_map.get(status, "UNK")  # "UNK" for unknown statuses


@dataclass(order=True)
class QueueItem:
    status: StatusLiteral
    time_remaining: int

async def send_heartbeat(websocket):
    """Keep the WebSocket connection alive manually"""
    while True:
        try:
            # logging.info("Sending heartbeat ping to WebSocket server")
            # await websocket.ping()  # Custom ping message

            response = await websocket.recv()  # Try receiving pong
            logging.debug(f"Received WebSocket message: {response}")

            # await asyncio.sleep(10)  # Send every 10 seconds
        except websockets.exceptions.ConnectionClosedError:
            break  # Exit when disconnected



async def process_message_queue(websocket: Any) -> None:
    """Process pending messages from the queue"""
    if websocket is None:
        return

    message: QueueItem | None = None
    try:
        # Non-blocking check for messages
        message = message_queue.get(block=False)
        # Send the message
        if message is not None:
            await websocket.send(json.dumps(asdict(message)))

            message_queue.task_done()
    except queue.Empty:
        # No messages to process
        pass
    except Exception:
        logging.exception(
            "Error processing item from queue - Message: %s", message)
        if message is not None:
            message_queue.put(message)
        raise  # Re-raise the exception


async def cleanup_websocket(websocket: Any) -> None:
    """Clean up the websocket connection"""
    if websocket is not None:
        try:
            await websocket.close()
            logging.info("WebSocket connection closed")
        except Exception as e:
            logging.info("Error closing WebSocket: %s", e)


# ...existing code...
async def run_websocket_loop() -> None:
    """Main websocket communication loop"""
    global websocket_running

    while websocket_running:
        connection_start = time.time()
        try:
            async with websockets.connect(WS_SERVER_URL,
                                             ping_interval=30,
                                             ping_timeout=10) as websocket:
                logging.warning(
                    "Connected to WebSocket server at %s", WS_SERVER_URL)
                heartbeat_task = asyncio.create_task(send_heartbeat(websocket))


                while websocket_running:
                    try:
                        await process_message_queue(websocket)
                        await asyncio.sleep(SLEEP_INTERVAL)
                    except Exception:
                        logging.exception("Error in message processing loop after %d seconds",
                                          int(time.time() - connection_start))
                        raise

                heartbeat_task.cancel()

        except websockets.ConnectionClosed as e:
            logging.warning("Connection closed after %d seconds with code %s: %s",
                            int(time.time() - connection_start), e.code, e.reason)
            await asyncio.sleep(2)
        except Exception:
            logging.exception("Unexpected WebSocket error: %s")
            await asyncio.sleep(2)



def websocket_worker() -> None:
    """Worker thread that maintains a WebSocket connection and sends messages from the queue"""
    logging.info("Starting WebSocket communication thread")

    # Create a new event loop for this thread
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    try:
        loop.run_until_complete(run_websocket_loop())
    finally:
        loop.close()  # Proper cleanup


def start_websocket_thread() -> None:
    """Start the WebSocket communication thread"""
    global websocket_thread, websocket_running

    if websocket_thread is None or not websocket_thread.is_alive():
        websocket_running = True
        websocket_thread = threading.Thread(
            target=websocket_worker, daemon=True)
        websocket_thread.start()


def send_timer_update(status: StatusLiteral, time_remaining: Optional[float] = None) -> None:
    """
    Queue a timer status update to be sent by the WebSocket thread.
    Non-blocking and safe to call from the timer thread.

    Args:
        status (str): Status of the timer ("started", "running", "finished", "cancelled")
        time_remaining (float, optional): Remaining time in seconds
    """
    # Skip if WebSocket functionality is disabled
    display_time = int(time_remaining) if time_remaining is not None else 0
    tm.write(swap(tm.encode_string(
        f'{get_short_status(status)}-{display_time:02}')))
    if not ENABLE_WEBSOCKET:
        return

    try:

        payload = QueueItem(status=status,
                            time_remaining=int(
                                time_remaining) if time_remaining else 0
                            )

        message_queue.put(payload)
    except Exception as e:
        logging.info("Error queuing timer update: %s", e)


def set_running_light_on() -> None:
    GPIO.output(PIN_RUNNING_LIGHT, GPIO.HIGH)


def set_running_light_off() -> None:
    GPIO.output(PIN_RUNNING_LIGHT, GPIO.LOW)


def buzz(duration: float = 1.0) -> None:

    GPIO.output(PIN_BUZZER, GPIO.HIGH)

    time.sleep(duration)
    GPIO.output(PIN_BUZZER, GPIO.LOW)


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
        time.sleep(SLEEP_INTERVAL)  # Short sleep interval
        phase_elapsed += SLEEP_INTERVAL
        elapsed_time += SLEEP_INTERVAL

        # Send update on each whole second
        current_second = int(elapsed_time)
        if current_second > last_whole_second:
            last_whole_second = current_second
            time_remaining = total_duration - elapsed_time
            send_timer_update("running", round(time_remaining))

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
    sec10_buzz_duration = 0.33
    total_duration_2 = 10 - sec10_buzz_duration  # Second phase duration

    total_duration = round(
        total_duration_1 + total_duration_2 + sec10_buzz_duration)
    # Run first phase
    elapsed_time, last_whole_second, phase1_completed = run_timer_phase(
        total_duration_1, elapsed_time, last_whole_second, total_duration
    )

    # Signal end of first phase if not cancelled
    if phase1_completed:

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

            time.sleep(SLEEP_INTERVAL)  # Avoid busy waiting

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
        logging.info("GPIO cleanup complete. Exiting.")
