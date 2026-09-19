import redis
import socketio

from app.config import IN_MEMORY, Settings, settings

_TIMEOUT_SECONDS = 2

_parsed_origins = [
    origin.strip()
    for origin in settings.cors_allowed_origins.split(",")
    if origin.strip()
]
# Default to "*" so dev and E2E environments (frontend and backend on
# different ports) can still establish Socket.IO connections.
socketio_cors_allowed_origins: list[str] | str = (
    _parsed_origins if _parsed_origins else "*"
)


def get_client_manager(settings: Settings) -> socketio.AsyncRedisManager | None:
    """None selects the in-memory manager, which does not share across workers."""
    if settings.redis_url == IN_MEMORY:
        return None
    # Without these, an unreachable Redis blocks emit for the kernel's TCP retry
    # budget, stalling the score submission the emit is part of.
    return socketio.AsyncRedisManager(
        settings.redis_url,
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
        settings.redis_url,
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
    client_manager=get_client_manager(settings),
    logger=False,
    engineio_logger=False,
)
