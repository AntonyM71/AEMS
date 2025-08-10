import asyncio
import logging
import os
from collections.abc import Awaitable, Callable
from typing import Optional

from broadcaster import Broadcast
from fastapi import WebSocket, WebSocketDisconnect
from websockets import ConnectionClosedOK

broadcast_cache_location = os.environ.get(
    "CONNECTION_STRING", default="memory://"
)  # fall back to memeory if postgress conection is not available.
broadcast = Broadcast(os.environ.get("CONNECTION_STRING", default="memory://"))


async def ws_receiver(
    websocket: WebSocket, channel: str, side_effect: Optional[Callable[[str], None]]
) -> None:
    async for message in websocket.iter_text():
        await publisher(message=message, channel=channel, side_effect=side_effect)


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
    logger = logging.getLogger("app.common.websocket_handler")
    try:
        msg = f"Starting broadcast subscription for channel: {channel}"
        logger.info(msg)
        async with broadcast.subscribe(channel=channel) as subscriber:
            msg = f"Subscribed to broadcast channel: {channel}"
            logger.info(msg)
            async for event in subscriber:
                try:
                    if fetch_data_with_message:
                        data = await fetch_data_with_message(event.message)
                        await websocket.send_text(str(data))
                    else:
                        await websocket.send_text(event.message)
                except asyncio.CancelledError as e:
                    msg = f"WebSocket handler cancelled: {e}"
                    logger.info(msg)
                    await websocket.close()
                    raise
                except (WebSocketDisconnect, ConnectionClosedOK) as e:
                    msg = f"WebSocket closed normally: {e}"
                    logger.info(msg)
                    await websocket.close()
                    break

    except Exception as e:
        msg = (
            f"Broadcast subscription failed or disconnected for channel {channel}: {e}"
        )
        logger.exception(
            msg,
        )
    finally:
        msg = f"Broadcast subscription closed for channel: {channel}"
        logger.info(msg)
