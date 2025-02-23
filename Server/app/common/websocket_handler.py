import os
from collections.abc import Callable
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


broadcast = Broadcast(os.environ.get("CONNECTION_STRING"))


async def ws_receiver(websocket: WebSocket,  channel: str, side_effect:  Optional[Callable[[str], None]]) -> None:
    async for message in websocket.iter_text():

        await publisher(message=message, channel=channel, side_effect=side_effect)


async def publisher(message: str, channel: str, side_effect:  Optional[Callable[[str], None]] = None):
    await broadcast.publish(channel=channel, message=message)
    if side_effect:
        side_effect(message)


async def ws_sender(websocket: WebSocket, channel: str) -> None:
    async with broadcast.subscribe(channel=channel) as subscriber:
        async for event in subscriber:
            await websocket.send_text(event.message)
