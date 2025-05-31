import asyncio
import os
from collections.abc import AsyncIterator, Awaitable, Callable
from contextlib import asynccontextmanager
from typing import Optional

import asyncpg
import structlog
from fastapi import WebSocket

logger = structlog.get_logger()


class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info("connection.added", total=len(self.active_connections))

    def disconnect(self, websocket: WebSocket) -> None:
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            logger.info("connection.removed",
                        total=len(self.active_connections))

    async def broadcast(self, message: str) -> None:
        dead = []
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.exception("broadcast.failed", error=str(e))
                dead.append(connection)

        # Clean up dead connections
        for conn in dead:
            self.disconnect(conn)


class PgPubSub:
    def __init__(self, dsn: str) -> None:
        self.dsn = dsn
        self._pub_conn: Optional[asyncpg.Connection] = None
        self._sub_conn: Optional[asyncpg.Connection] = None

    async def connect(self) -> None:
        if not self._pub_conn:
            self._pub_conn = await asyncpg.connect(self.dsn)
        if not self._sub_conn:
            self._sub_conn = await asyncpg.connect(self.dsn)

    async def close(self) -> None:
        if self._pub_conn:
            await self._pub_conn.close()
            self._pub_conn = None
        if self._sub_conn:
            await self._sub_conn.close()
            self._sub_conn = None

    async def publish(self, channel: str, message: str) -> None:
        if not self._pub_conn:
            logger.info("publish.connecting", channel=channel)
            await self.connect()
        assert self._pub_conn is not None
        logger.info("publish.notify", channel=channel, message=message)
        await self._pub_conn.execute("SELECT pg_notify($1, $2)", channel, message)

    @asynccontextmanager
    async def subscribe(self, channel: str, callback: Callable[[str], Awaitable[None]]) -> AsyncIterator["PgPubSub"]:
        if not self._sub_conn:
            logger.info("subscribe.connecting", channel=channel)
            await self.connect()
        assert self._sub_conn is not None

        async def notification_handler(conn: asyncpg.Connection, pid: int, notify_channel: str, payload: str) -> None:
            if notify_channel == channel:  # Only process messages for this channel
                logger.info("notify.received",
                            channel=channel, payload=payload)
                await callback(payload)

        try:
            logger.info("subscribe.start", channel=channel)
            await self._sub_conn.add_listener(channel, notification_handler)
            yield self
        finally:
            logger.info("subscribe.cleanup", channel=channel)
            if self._sub_conn:
                await self._sub_conn.remove_listener(channel, notification_handler)

    async def _notify_callback(self, payload: str) -> None:
        """Callback to be overridden by subscribers"""
        pass

    async def _on_notify(self, _: asyncpg.Connection, __: int, channel: str, payload: str) -> None:
        logger.info("notify.received", channel=channel, payload=payload)
        await self._notify_callback(payload)


# Initialize pubsub
DSN_ERROR = "CONNECTION_STRING environment variable must be set"
dsn = os.environ.get("CONNECTION_STRING")
if not dsn:
    raise ValueError(DSN_ERROR)

connection_manager = ConnectionManager()
pubsub = PgPubSub(dsn)


async def publisher(
    message: str, channel: str, side_effect: Optional[Callable[[str], None]] = None
) -> None:
    await pubsub.publish(channel=channel, message=message)
    if side_effect:
        side_effect(message)


async def ws_receiver(
    websocket: WebSocket,
    channel: str,
    side_effect: Optional[Callable[[str], None]] = None
) -> None:
    logger.info("receiver.start", channel=channel)
    while True:
        try:
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
                    "asgi_scope": {k: v for k, v in websocket.scope.items() if isinstance(v, str | int | bool)}
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
            logger.exception(
                "websocket.state_at_disconnect",
                channel=channel,
                client_state=websocket.client_state,
                application_state=websocket.application_state,
                error_type=type(e).__name__,
                error_full=repr(e),
                error_str=str(e)
            )
            raise


async def ws_sender(
    websocket: WebSocket,
    channel: str,
    fetch_data_with_message: Optional[Callable[[str], Awaitable[str]]] = None,
) -> None:
    logger.info("sender.start", channel=channel)
    try:
        async def handle_message(payload: str) -> None:
            try:
                if fetch_data_with_message:
                    payload = await fetch_data_with_message(payload)
                await websocket.send_text(payload)
            except Exception as e:
                logger.exception("sender.message_failed", error=str(e))

        async with pubsub.subscribe(channel=channel, callback=handle_message):
            logger.info(
                "connections.state",
                channel=channel,
                websocket_state=websocket.client_state,
                pg_connected=True
            )
            # Keep connection alive
            while True:
                await asyncio.sleep(1)
    except Exception as e:
        # Log the state when sender fails
        logger.exception(
            "sender.state_at_failure",
            channel=channel,
            websocket_state=websocket.client_state,
            error_type=type(e).__name__,
            error_full=repr(e)
        )
        raise
