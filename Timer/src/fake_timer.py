import itertools
import time
from collections.abc import Iterator

import socketio

from config import FakeTimerSettings

_settings = FakeTimerSettings()
SIO_SERVER_URL = str(_settings.socketio_url)
SIO_PATH = _settings.socketio_path

RIDE_DURATIONS_S = (60, 45)
PAUSE_BETWEEN_RIDES_S = 5


def ride_messages(duration: int) -> Iterator[dict]:
    for time_remaining in range(duration, 0, -1):
        yield {"status": "running", "time_remaining": time_remaining}
    yield {"status": "finished", "time_remaining": 0}


def main() -> None:
    with socketio.SimpleClient() as sio:
        sio.connect(
            SIO_SERVER_URL,
            namespace="/timer",
            socketio_path=SIO_PATH,
            transports=["websocket"],
        )
        print(f"Connected to {SIO_SERVER_URL}/timer")

        for duration in itertools.cycle(RIDE_DURATIONS_S):
            for message in ride_messages(duration):
                sio.emit("timer", message)
                print("Sent:", message)
                time.sleep(1)
            time.sleep(PAUSE_BETWEEN_RIDES_S)


if __name__ == "__main__":
    main()
