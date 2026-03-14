"""PostgreSQL LISTEN/NOTIFY based Socket.IO pub/sub manager for asyncio.

Uses asyncpg to implement a Socket.IO client manager backed by PostgreSQL's
built-in LISTEN/NOTIFY feature.  All worker processes share the same database
and therefore receive each other's Socket.IO broadcasts through the channel,
allowing multiple Gunicorn/uvicorn workers to serve the same real-time
namespace without losing messages.
"""

import asyncio
import logging
from collections.abc import AsyncGenerator
from typing import Any

try:
    import asyncpg
except ImportError:  # pragma: no cover
    asyncpg = None  # type: ignore[assignment]

from socketio.async_pubsub_manager import AsyncPubSubManager

logger = logging.getLogger("app.common.async_pg_manager")

_ASYNCPG_NOT_INSTALLED = (
    "asyncpg package is not installed (run 'pip install asyncpg' in your virtualenv)."
)

# Retry / keepalive tuning constants
_INITIAL_RETRY_SLEEP: int = 1
_MAX_RETRY_SLEEP: int = 60
_KEEPALIVE_TIMEOUT: int = 30


class AsyncPgManager(AsyncPubSubManager):
    """PostgreSQL LISTEN/NOTIFY based client manager for asyncio servers.

    Implements a PostgreSQL backend for Socket.IO event sharing across
    multiple processes using PostgreSQL's native LISTEN/NOTIFY feature.
    No extra infrastructure (Redis, RabbitMQ, …) is required beyond the
    existing PostgreSQL database.

    Usage::

        url = "postgresql://user:password@localhost/dbname"
        server = socketio.AsyncServer(
            client_manager=AsyncPgManager(url))

    :param url: PostgreSQL connection URL accepted by asyncpg
                (e.g. ``postgresql://user:pw@host:5432/db``).
    :param channel: The PostgreSQL NOTIFY channel name.  Must be identical
                    across all worker processes.
    :param write_only: When ``True`` only publishing is initialised (no
                       background listener task is started).
    :param logger: Optional custom logger.  Defaults to the server logger.
    """

    name = "asyncpg"

    def __init__(
        self,
        url: str,
        channel: str = "socketio",
        *,
        write_only: bool = False,
        logger: logging.Logger | None = None,
    ) -> None:
        if asyncpg is None:  # pragma: no cover
            raise RuntimeError(_ASYNCPG_NOT_INSTALLED)
        super().__init__(channel=channel, write_only=write_only, logger=logger)
        self.url = url
        self._publish_conn: asyncpg.Connection | None = None  # type: ignore[type-arg]

    async def _get_publish_conn(self) -> "asyncpg.Connection":  # type: ignore[type-arg]
        if self._publish_conn is None or self._publish_conn.is_closed():
            self._publish_conn = await asyncpg.connect(self.url)
        return self._publish_conn

    async def _publish(self, data: dict[str, Any]) -> None:  # type: ignore[override]
        payload = self.json.dumps(data)
        retry = True
        while True:
            try:
                conn = await self._get_publish_conn()
                await conn.execute(
                    "SELECT pg_notify($1, $2)",
                    self.channel,
                    payload,
                )
            except Exception as exc:
                if retry:
                    self._get_logger().error(
                        "Cannot publish to PostgreSQL (retrying): %s", exc
                    )
                    self._publish_conn = None
                    retry = False
                    await asyncio.sleep(_INITIAL_RETRY_SLEEP)
                else:
                    raise
            else:
                return

    async def _listen(self) -> AsyncGenerator[str]:  # type: ignore[override]
        """Async generator that yields serialised messages from the channel."""
        queue: asyncio.Queue[str] = asyncio.Queue()
        retry_sleep = _INITIAL_RETRY_SLEEP

        while True:
            listen_conn: asyncpg.Connection | None = None  # type: ignore[type-arg]
            try:
                listen_conn = await asyncpg.connect(self.url)

                async def _notification_handler(
                    conn: object,
                    pid: int,
                    channel: str,
                    payload: str,
                ) -> None:
                    await queue.put(payload)

                await listen_conn.add_listener(self.channel, _notification_handler)
                self._get_logger().info(
                    "PostgreSQL: listening on channel '%s'", self.channel
                )
                retry_sleep = _INITIAL_RETRY_SLEEP

                while True:
                    try:
                        message = await asyncio.wait_for(
                            queue.get(), timeout=_KEEPALIVE_TIMEOUT
                        )
                        yield message
                    except TimeoutError:
                        # Keepalive ping so the connection is not dropped by
                        # idle-connection timeouts on the database or proxy.
                        await listen_conn.execute("SELECT 1")

            except asyncio.CancelledError:
                if listen_conn and not listen_conn.is_closed():
                    await listen_conn.close()
                raise
            except Exception as exc:
                self._get_logger().error(
                    "PostgreSQL LISTEN error: %s — retrying in %s s", exc, retry_sleep
                )
                if listen_conn and not listen_conn.is_closed():
                    await listen_conn.close()
                await asyncio.sleep(retry_sleep)
                retry_sleep = min(retry_sleep * 2, _MAX_RETRY_SLEEP)
