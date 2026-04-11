import logging
import os

import socketio

logger = logging.getLogger("app.common.socket_manager")

_cors_origins_env = os.getenv("CORS_ALLOWED_ORIGINS", "")
_parsed_origins = [
    origin.strip() for origin in _cors_origins_env.split(",") if origin.strip()
]
# Default to "*" when no explicit allowlist is configured so that
# development and E2E environments (where the frontend and backend run on
# different ports) can still establish Socket.IO connections.
socketio_cors_allowed_origins: list[str] | str = (
    _parsed_origins if _parsed_origins else "*"
)

# When a REDIS_URL is available, use the Redis pub/sub adapter so that
# Socket.IO messages are shared across all worker processes.  Fall back to
# the default in-memory manager for local development and testing where no
# Redis server is configured.
_redis_url = os.getenv("REDIS_URL")
_client_manager = socketio.AsyncRedisManager(_redis_url) if _redis_url else None

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=socketio_cors_allowed_origins,
    client_manager=_client_manager,
    logger=False,
    engineio_logger=False,
)
