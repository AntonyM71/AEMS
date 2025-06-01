import asyncio
import os
import resource
import time
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
        logger.info("worker.initialized", pid=os.getpid(),
                    worker_class=os.environ.get("WORKER_CLASS", "unknown"))

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info("connection.added",
                    total=len(self.active_connections),
                    pid=os.getpid(),
                    memory_usage=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)

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
        self._last_message_time: float = 0.0
        self._message_count: int = 0
        self._active_subscriptions: dict[str, set[int]] = {}

    async def connect(self) -> None:
        try:
            if not self._pub_conn:

                self._pub_conn = await asyncpg.connect(self.dsn)
                logger.info(
                    "pubsub.pub_connection.connected",
                )
            if not self._sub_conn:

                self._sub_conn = await asyncpg.connect(self.dsn)
                logger.info(
                    "pubsub.sub_connection.connected",
                )
        except asyncpg.PostgresConnectionError as e:
            logger.exception("pubsub.connection.failed", error=str(e))
            raise

    async def close(self) -> None:
        try:
            if self._pub_conn:
                logger.info(
                    "pubsub.pub_connection.closing", pid=self._pub_conn.get_server_pid()
                )
                await self._pub_conn.close()
                self._pub_conn = None
            if self._sub_conn:
                logger.info(
                    "pubsub.sub_connection.closing", pid=self._sub_conn.get_server_pid()
                )
                await self._sub_conn.close()
                self._sub_conn = None
        except Exception as e:
            logger.exception("pubsub.close.failed", error=str(e))
            raise

    async def publish(self, channel: str, message: str) -> None:
        if not self._pub_conn:
            logger.info("publish.connecting", channel=channel)
            await self.connect()
        assert self._pub_conn is not None

        current_time = time.time()
        time_since_last = current_time - self._last_message_time
        self._message_count += 1

        self._last_message_time = current_time

        await self._pub_conn.execute("SELECT pg_notify($1, $2)", channel, message)

    @asynccontextmanager
    async def subscribe(
        self, channel: str, callback: Callable[[str], Awaitable[None]]
    ) -> AsyncIterator["PgPubSub"]:
        if not self._sub_conn:
            logger.info("subscribe.connecting", channel=channel)
            await self.connect()
        assert self._sub_conn is not None

        async def notification_handler(
            conn: asyncpg.Connection, pid: int, notify_channel: str, payload: str
        ) -> None:
            if notify_channel == channel:

                try:
                    await callback(payload)
                except Exception as e:
                    logger.exception(
                        "notify.callback_failed",
                        channel=channel,
                        error=str(e),
                        connection_state=self._sub_conn.is_closed()
                        if self._sub_conn
                        else "no_connection",
                    )

        try:
            if self._sub_conn.is_closed():
                logger.error("subscribe.connection_closed", channel=channel)
                await self.connect()
            conn_id = id(self._sub_conn)
            if channel not in self._active_subscriptions:
                self._active_subscriptions[channel] = set()
            self._active_subscriptions[channel].add(conn_id)

            logger.info("subscribe.start",
                        channel=channel,
                        connection_id=conn_id,
                        active_subscriptions=len(self._active_subscriptions[channel]))

            await self._sub_conn.add_listener(channel, notification_handler)
            yield self
        except Exception as e:
            logger.exception(
                "subscribe.failed",
                channel=channel,
                error=str(e),
                connection_state=self._sub_conn.is_closed()
                if self._sub_conn
                else "no_connection",
            )
            raise
        finally:
            if self._sub_conn and not self._sub_conn.is_closed():
                await self._sub_conn.remove_listener(channel, notification_handler)
                logger.info("subscribe.cleanup.success", channel=channel)
            else:
                logger.error(
                    "subscribe.cleanup.connection_closed", channel=channel)

    async def _notify_callback(self, payload: str) -> None:
        """Callback to be overridden by subscribers"""
        pass

    async def _on_notify(
        self, _: asyncpg.Connection, __: int, channel: str, payload: str
    ) -> None:
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
    side_effect: Optional[Callable[[str], None]] = None,
) -> None:
    logger.info("receiver.start", channel=channel)
    while True:
        try:
            raw_message = await websocket._receive()
            if raw_message["type"] == "websocket.receive":
                message = raw_message.get("text", "")
                await publisher(
                    message=message, channel=channel, side_effect=side_effect
                )

        except Exception as e:
            logger.exception(
                "websocket.state_at_disconnect",
                channel=channel,
                client_state=websocket.client_state,
                application_state=websocket.application_state,
                error_type=type(e).__name__,
                error_full=repr(e),
                error_str=str(e),
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
                if websocket.client_state.value != 1:  # Not CONNECTED
                    logger.error(
                        "sender.websocket_state_invalid",
                        channel=channel,
                        client_state=websocket.client_state,
                        application_state=websocket.application_state,
                    )
                    return

                if fetch_data_with_message:
                    payload = await fetch_data_with_message(payload)
                await websocket.send_text(payload)
            except Exception as e:
                logger.exception(
                    "sender.message_failed",
                    channel=channel,
                    error=str(e),
                    client_state=websocket.client_state,
                    application_state=websocket.application_state,
                )
                raise

        async with pubsub.subscribe(channel, handle_message):
            while True:
                await asyncio.sleep(1)
    except Exception as e:
        # Log the state when sender fails
        logger.exception(
            "sender.state_at_failure",
            channel=channel,
            websocket_state=websocket.client_state,
            error_type=type(e).__name__,
            error_full=repr(e),
        )
        raise
