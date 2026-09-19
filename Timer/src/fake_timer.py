import random
import time

import socketio

from config import FakeTimerSettings

_settings = FakeTimerSettings()
SIO_SERVER_URL = str(_settings.socketio_url)
SIO_PATH = _settings.socketio_path


def main() -> None:
    with socketio.SimpleClient() as sio:
        sio.connect(
            SIO_SERVER_URL,
            namespace="/timer",
            socketio_path=SIO_PATH,
            transports=["websocket"],
        )
        print(f"Connected to {SIO_SERVER_URL}/timer")

        while True:
            message = {
                "status": "running",
                "time_remaining": random.randint(0, 60),
            }
            sio.emit("timer", message)
            print("Sent:", message)
            time.sleep(1)


if __name__ == "__main__":
    main()
