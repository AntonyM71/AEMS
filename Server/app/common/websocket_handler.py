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


async def publisher(
    message: str, channel: str, side_effect: Optional[Callable[[str], None]] = None
) -> None:
    await broadcast.publish(channel=channel, message=message)
    if side_effect:
        side_effect(message)


async def ws_receiver(
    websocket: WebSocket, channel: str, side_effect: Optional[Callable[[str], None]]
) -> None:
    logger.info("receiver.start", channel=channel)
    while True:
        try:
            # Log the raw ASGI message before we process it
            raw_message = await websocket._receive()
            logger.info(
                "websocket.raw_message",
                channel=channel,
                message_type=raw_message.get("type"),
                message=raw_message,
                source={
                    "client": websocket.client.host,
                    "port": websocket.client.port,
                    "headers": dict(websocket.headers),
                    "asgi_scope": {k: v for k, v in websocket.scope.items() if isinstance(v, (str, int, bool))}
                }
            )
            if raw_message["type"] == "websocket.receive":
                message = raw_message.get("text", "")
                await publisher(message=message, channel=channel, side_effect=side_effect)
            elif raw_message["type"] == "websocket.disconnect":
                logger.info(
                    "websocket.disconnect_request",
                    channel=channel,
                    code=raw_message.get("code"),
                    reason=raw_message.get("reason")
                )
                break
        except Exception as e:
            # Log the EXACT state when disconnect happens
            logger.exception(
                "websocket.state_at_disconnect",
                channel=channel,
                client_state=websocket.client_state,
                application_state=websocket.application_state,
                error_type=type(e).__name__,
                error_full=repr(e),
                error_str=str(e)
            )
            raise  # Let the error propagate so we can see the full chain


async def ws_sender(
    websocket: WebSocket,
    channel: str,
    fetch_data_with_message: Optional[Callable[[str], Awaitable[str]]] = None,
) -> None:
    logger.info("sender.start", channel=channel)
    while True:
        try:
            async with broadcast.subscribe(channel=channel) as subscriber:
                # Log the exact state of both connections
                logger.info(
                    "connections.state",
                    channel=channel,
                    websocket_state=websocket.client_state,
                    broadcast_connected=subscriber
                )
                async for event in subscriber:
                    await websocket.send_text(event.message)
        except Exception as e:
            # Log the state when sender fails
            logger.error(
                "sender.state_at_failure",
                channel=channel,
                websocket_state=websocket.client_state,
                error_type=type(e).__name__,
                error_full=repr(e)
            )
            raise
