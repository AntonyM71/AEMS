import asyncio
import os
from collections.abc import Awaitable, Callable
from typing import Optional

import structlog
from broadcaster import Broadcast
from fastapi import WebSocket

logger = structlog.get_logger()


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
    logger.info("receiver.start", channel=channel)
    while True:
        try:
            async for message in websocket.iter_text():
                logger.debug("receiver.message",
                             channel=channel, message=message)
                await publisher(message=message, channel=channel, side_effect=side_effect)
        except Exception as e:
            if "disconnect message has been received" in str(e):
                logger.info("receiver.disconnect",
                            channel=channel, error=str(e))
                break
            logger.exception("receiver.error", channel=channel, error=str(e))
            await asyncio.sleep(1)


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
    logger.info("sender.start", channel=channel)
    while True:  # Keep trying to maintain subscription
        try:
            logger.debug("sender.subscribing", channel=channel)
            async with broadcast.subscribe(channel=channel) as subscriber:
                logger.debug("sender.subscribed", channel=channel)
                async for event in subscriber:
                    logger.debug("sender.event",
                                 channel=channel,
                                 event_message=event.message)
                    if fetch_data_with_message:
                        data = await fetch_data_with_message(event.message)
                        await websocket.send_text(str(data))
                    else:
                        await websocket.send_text(event.message)
        except Exception as e:
            logger.exception(
                "sender.error",
                channel=channel,
                error_type=type(e).__name__,
                error_str=str(e)
            )
            raise
