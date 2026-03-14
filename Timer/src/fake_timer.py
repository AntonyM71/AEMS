import os
import random
import time

import socketio

SIO_SERVER_URL = os.environ.get("SOCKETIO_URL", "http://localhost:8000")
SIO_PATH = os.environ.get("SOCKETIO_PATH", "/socket.io/")


def main() -> None:
    with socketio.SimpleClient() as sio:
        sio.connect(SIO_SERVER_URL, namespace="/timer", socketio_path=SIO_PATH)
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
