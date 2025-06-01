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

    def disconnect(self, websocket: WebSocket) -> None:
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str) -> None:
        for connection in self.active_connections:
            await connection.send_text(message)


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
            await self.connect()
        assert self._pub_conn is not None
        await self._pub_conn.execute("SELECT pg_notify($1, $2)", channel, message)

    @asynccontextmanager
    async def subscribe(self, channel: str) -> AsyncIterator["PgPubSub"]:
        if not self._sub_conn:
            await self.connect()
        assert self._sub_conn is not None
        try:
            await self._sub_conn.add_listener(channel, self._on_notify)
            yield self
        finally:
            if self._sub_conn:
                await self._sub_conn.remove_listener(channel, self._on_notify)

    async def _on_notify(
        self, connection: asyncpg.Connection, pid: int, channel: str, payload: str
    ) -> None:
        await self._notify_callback(payload)

    async def _notify_callback(self, payload: str) -> None:
        pass


# Initialize pubsub
DSN_ERROR = "CONNECTION_STRING environment variable must be set"
dsn = os.environ.get("CONNECTION_STRING")
if not dsn:
    raise ValueError(DSN_ERROR)

connection_manager = ConnectionManager()
pubsub = PgPubSub(dsn)
