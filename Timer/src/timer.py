import threading
import time
import os
from pathlib import Path
import RPi.GPIO as GPIO
# GPIO setup
GPIO.setmode(GPIO.BCM)

# GPIO pin assignments
PIN_INPUT_START = 4
PIN_INPUT_CANCEL = 5
PIN_BUZZER = 27
PIN_RUNNING_LIGHT = 14
PIN_READY_LIGHT =6

GPIO.setup(PIN_INPUT_START, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(PIN_INPUT_CANCEL, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

GPIO.setup(PIN_BUZZER, GPIO.OUT)
GPIO.output(PIN_BUZZER, GPIO.LOW)

GPIO.setup(PIN_READY_LIGHT, GPIO.OUT)
GPIO.output(PIN_READY_LIGHT, GPIO.HIGH)

GPIO.setup(PIN_RUNNING_LIGHT, GPIO.OUT)
GPIO.output(PIN_RUNNING_LIGHT, GPIO.LOW)


# Timer and threading variables
timer_thread = None
timer_running = False

def set_running_light_on():
    GPIO.output(PIN_RUNNING_LIGHT, GPIO.HIGH)

def set_running_light_off():
    GPIO.output(PIN_RUNNING_LIGHT, GPIO.LOW)



def buzz(pitch=100, duration = 1):
    period = 1.0 / pitch
    p2 = period / 2
    cycles = int(duration * pitch)
    for i in range(0, cycles):
        GPIO.output(PIN_BUZZER, GPIO.HIGH)

        time.sleep(p2)
        GPIO.output(PIN_BUZZER, GPIO.LOW)

        time.sleep(p2)

def double_buzz(duration = 0.33, gap = 0.33):
    buzz(duration= duration)
    time.sleep(gap)
    buzz(duration= duration)

def start_timer() -> None:
    global timer_thread, timer_running
    if timer_running:  # Don't start a new timer if one is already running
        return
    timer_running = True


    def timer_task() -> None:
        global timer_running
        set_running_light_on()
        elapsed_time = 0
        total_duration_1 = 34  # First phase duration
        total_duration_2 = 10 # Second phase duration

        while timer_running and elapsed_time < total_duration_1:
            time.sleep(0.1)  # Short sleep interval
            elapsed_time += 0.1

        if timer_running:
            buzz(duration=1)

        elapsed_time = 0
        while timer_running and elapsed_time < total_duration_2:
            time.sleep(0.1)
            elapsed_time += 0.1

        if timer_running:
            double_buzz()

        set_running_light_off()
        timer_running = False  # Reset the state
    # Start timer thread
    timer_thread = threading.Thread(target=timer_task)
    timer_thread.start()

def cancel_timer() -> None:
    global timer_running
    timer_running = False  # Set flag to cancel any running timer
    set_running_light_off()




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
