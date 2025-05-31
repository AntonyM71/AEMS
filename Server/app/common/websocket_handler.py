import asyncio
import logging
import os
from collections.abc import Awaitable, Callable
from typing import Optional

from broadcaster import Broadcast
from fastapi import WebSocket


class ConnectionManager:
    # From https://fastapi.tiangolo.com/advanced/websockets/#handling-disconnections-and-multiple-clients
    def __init__(self) -> None:
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket) -> None:
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str) -> None:
        for connection in self.active_connections:
            await connection.send_text(message)


broadcast_cache_location = os.environ.get(
    "CONNECTION_STRING", default="memory://"
)  # fall back to memeory if postgress conection is not available.
broadcast = Broadcast(os.environ.get("CONNECTION_STRING", default="memory://"))


async def ws_receiver(
    websocket: WebSocket, channel: str, side_effect: Optional[Callable[[str], None]]
) -> None:
    while True:  # Keep the receiver alive indefinitely
        try:
            async for message in websocket.iter_text():
                await publisher(message=message, channel=channel, side_effect=side_effect)
        except Exception as e:
            logging.exception(f"Receiver error on channel {channel}: {e}")
            await asyncio.sleep(1)  # Brief pause before retry
            continue  # Keep the receiver alive even after errors


async def publisher(
    message: str, channel: str, side_effect: Optional[Callable[[str], None]] = None
) -> None:
    await broadcast.publish(channel=channel, message=message)
    if side_effect:
        side_effect(message)


async def ws_sender(
    websocket: WebSocket,
    channel: str,
    fetch_data_with_message: Optional[Callable[[str], Awaitable[str]]] = None,
) -> None:
    while True:  # Keep trying to maintain subscription
        try:
            async with broadcast.subscribe(channel=channel) as subscriber:
                async for event in subscriber:
                    if fetch_data_with_message:
                        data = await fetch_data_with_message(event.message)
                        await websocket.send_text(str(data))
                    else:
                        await websocket.send_text(event.message)
        except Exception:
            logging.exception(f"Sender error on channel {channel}: {e}")
            raise
