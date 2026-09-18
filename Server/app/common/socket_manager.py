import os

import redis
import socketio

IN_MEMORY = "memory"
_REDIS_SCHEMES = ("redis://", "rediss://", "unix://")
_TIMEOUT_SECONDS = 2

_cors_origins_env = os.getenv("CORS_ALLOWED_ORIGINS", "")
_parsed_origins = [
    origin.strip() for origin in _cors_origins_env.split(",") if origin.strip()
]
# Default to "*" so dev and E2E environments (frontend and backend on
# different ports) can still establish Socket.IO connections.
socketio_cors_allowed_origins: list[str] | str = (
    _parsed_origins if _parsed_origins else "*"
)


def _configured_redis_url() -> str | None:
    """The Redis URL to use, or None when in-memory was asked for by name."""
    url = os.getenv("REDIS_URL")
    if url == IN_MEMORY:
        return None
    if not url or not url.startswith(_REDIS_SCHEMES):
        msg = (
            f"REDIS_URL must be a redis:// URL, or {IN_MEMORY!r} to select the "
            f"in-memory manager, which is only correct for a single worker. "
            f"Got: {url!r}"
        )
        raise ValueError(msg)
    return url


def get_client_manager() -> socketio.AsyncRedisManager | None:
    """None selects the in-memory manager, which does not share across workers."""
    url = _configured_redis_url()
    if url is None:
        return None
    # Without these, an unreachable Redis blocks emit for the kernel's TCP retry
    # budget, stalling the score submission the emit is part of.
    return socketio.AsyncRedisManager(
        url,
        redis_options={
            "socket_connect_timeout": _TIMEOUT_SECONDS,
            "socket_timeout": _TIMEOUT_SECONDS,
        },
    )


async def redis_is_reachable() -> bool:
    """True when the live Redis connection answers, or in-memory was chosen deliberately.

    Pings sio.manager's own connection rather than a fresh one, so this
    reflects the connection real broadcasts actually use. python-socketio
    only opens that connection on the first Engine.IO connect though, so
    before that this falls back to a one-shot ping of its own.
    """
    manager = sio.manager
    if not isinstance(manager, socketio.AsyncRedisManager):
        return True
    if manager.redis is not None:
        try:
            await manager.redis.ping()
        except redis.RedisError:
            return False
        return True
    return await _fresh_ping()


async def _fresh_ping() -> bool:
    """A one-shot reachability check, for before the live connection exists."""
    client = redis.asyncio.Redis.from_url(
        _configured_redis_url(),
        socket_connect_timeout=_TIMEOUT_SECONDS,
        socket_timeout=_TIMEOUT_SECONDS,
    )
    try:
        await client.ping()
    except (redis.RedisError, ValueError):
        return False
    finally:
        await client.aclose()
    return True


sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=socketio_cors_allowed_origins,
    client_manager=get_client_manager(),
    logger=False,
    engineio_logger=False,
)
