import threading
import time

import RPi.GPIO as GPIO

# GPIO pin assignments
PIN_INPUT_START = 3
PIN_INPUT_CANCEL = 4
PIN_BUZZER = 17

# Timer and threading variables
timer_thread = None
timer_running = False


def start_timer() -> None:
    global timer_thread, timer_running
    if timer_running:  # Don't start a new timer if one is already running
        return
    timer_running = True

    def timer_task() -> None:
        global timer_running
        time.sleep(45)  # Wait for 45 seconds
        if timer_running:  # Check if timer wasn't canceled
            GPIO.output(PIN_BUZZER, GPIO.HIGH)  # Buzzer ON
            time.sleep(1)  # Buzzer for 1 second
            GPIO.output(PIN_BUZZER, GPIO.LOW)  # Buzzer OFF
        timer_running = False  # Reset the state

    # Start timer thread
    timer_thread = threading.Thread(target=timer_task)
    timer_thread.start()


def cancel_timer() -> None:
    global timer_running
    timer_running = False  # Set flag to cancel any running timer


# GPIO setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN_INPUT_START, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(PIN_INPUT_CANCEL, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(PIN_BUZZER, GPIO.OUT)
GPIO.output(PIN_BUZZER, GPIO.LOW)

try:
    while True:
        # Check if the start pin is HIGH
        if GPIO.input(PIN_INPUT_START) == GPIO.HIGH:
            start_timer()

        # Check if the cancel pin is HIGH
        if GPIO.input(PIN_INPUT_CANCEL) == GPIO.HIGH:
            cancel_timer()

        time.sleep(0.1)  # Avoid busy waiting

except KeyboardInterrupt:
    print("Exiting program")

finally:
    GPIO.cleanup()
