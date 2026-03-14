import logging
import os

import socketio

from app.common.async_pg_manager import AsyncPgManager

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

# When a DATABASE_URL / CONNECTION_STRING is available, use the PostgreSQL
# LISTEN/NOTIFY adapter so that Socket.IO messages are shared across all
# worker processes.  Fall back to the default in-memory manager for local
# development and testing where no database is configured.
_db_url = os.getenv("CONNECTION_STRING")
_client_manager = AsyncPgManager(_db_url) if _db_url else None

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=socketio_cors_allowed_origins,
    client_manager=_client_manager,
    logger=False,
    engineio_logger=False,
)
