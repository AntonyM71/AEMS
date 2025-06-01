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
        self.subscribers: dict[str, list[WebSocket]] = {}
        logger.info("worker.initialized", pid=os.getpid(),
                    worker_class=os.environ.get("WORKER_CLASS", "unknown"))

    async def connect(self, websocket: WebSocket, channel: str) -> None:
        await websocket.accept()
        if channel not in self.subscribers:
            self.subscribers[channel] = []
        self.subscribers[channel].append(websocket)

    def disconnect(self, websocket: WebSocket, channel: str) -> None:
        if channel in self.subscribers and websocket in self.subscribers[channel]:
            self.subscribers[channel].remove(websocket)
            logger.info("connection.removed", channel=channel,
                        total_connections=len(self.subscribers[channel]))
            if not self.subscribers[channel]:
                del self.subscribers[channel]

    async def broadcast(self, message: str, channel: str) -> None:
        if channel not in self.subscribers:
            return
        dead = []
        for connection in self.subscribers[channel]:
            try:
                await connection.send_text(message)
            except Exception as e:
                logger.exception("broadcast.failed",
                                 error=str(e), channel=channel)
                dead.append(connection)

        # Clean up dead connections
        for conn in dead:
            self.disconnect(conn, channel)


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
                logger.info("pubsub.pub_connection.connecting")
                self._pub_conn = await asyncpg.connect(self.dsn)
                logger.info(
                    "pubsub.pub_connection.connected",
                )
            if not self._sub_conn:
                logger.info("pubsub.sub_connection.connecting")
                self._sub_conn = await asyncpg.connect(self.dsn)
                logger.info(
                    "pubsub.sub_connection.connected",
                )
        except asyncpg.PostgresConnectionError as e:
            logger.error("pubsub.connection.failed", error=str(e))
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
            logger.error("pubsub.close.failed", error=str(e))
            raise

    async def publish(self, channel: str, message: str) -> None:
        if not self._pub_conn:
            await self.connect()
        assert self._pub_conn is not None

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
            logger.info(
                "websocket.raw_message",
                channel=channel,
                message_type=raw_message.get("type"),
                message=raw_message,
                source={
                    "client": websocket.client.host,
                    "port": websocket.client.port,
                    "headers": dict(websocket.headers),
                    "asgi_scope": {
                        k: v
                        for k, v in websocket.scope.items()
                        if isinstance(v, str | int | bool)
                    },
                },
            )
            if raw_message["type"] == "websocket.receive":
                message = raw_message.get("text", "")
                await publisher(
                    message=message, channel=channel, side_effect=side_effect
                )
            elif raw_message["type"] == "websocket.disconnect":
                logger.info(
                    "websocket.disconnect_request",
                    channel=channel,
                    code=raw_message.get("code"),
                    reason=raw_message.get("reason"),
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
                    )
                    return

                if fetch_data_with_message:
                    payload = await fetch_data_with_message(payload)
                await connection_manager.broadcast(message=payload, channel=channel)
            except Exception as e:
                logger.exception(
                    "sender.message_failed",
                    channel=channel,
                    error=str(e),
                    client_state=websocket.client_state,
                    application_state=websocket.application_state,
                )
                raise

        prev_state = websocket.client_state
        async with pubsub.subscribe(channel=channel, callback=handle_message):
            logger.info(
                "connections.state",
                channel=channel,
                websocket_state=websocket.client_state,
                pg_connected=True,
            )
            # Monitor connection state
            while True:
                if websocket.client_state != prev_state:
                    logger.warning(
                        "sender.state_changed",
                        channel=channel,
                        previous_state=prev_state,
                        current_state=websocket.client_state,
                    )
                    prev_state = websocket.client_state
                    if websocket.client_state.value != 1:  # Not CONNECTED
                        raise Exception(
                            f"WebSocket disconnected: {websocket.client_state}"
                        )
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
