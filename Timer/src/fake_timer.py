import asyncio
import json
import random

import websockets

WS_SERVER_URL = "ws://localhost:8001/timer"


async def send_messages(websocket):
    while True:
        message = {
            "status": "running",
            "time_remaining": random.randint(0, 60)
        }
        await websocket.send(json.dumps(message))
        print("Sent:", message)
        await asyncio.sleep(1)


async def receive_messages(websocket):
    while True:
        try:
            response = await websocket.recv()
            print("Received:", response)
        except websockets.ConnectionClosed:
            print("Connection closed by server.")
            break


async def main():
    async with websockets.connect(WS_SERVER_URL) as websocket:
        send_task = asyncio.create_task(send_messages(websocket))
        receive_task = asyncio.create_task(receive_messages(websocket))
        await asyncio.gather(send_task, receive_task)

if __name__ == "__main__":
    asyncio.run(main())
