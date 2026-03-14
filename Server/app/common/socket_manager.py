import logging
import os

import socketio

logger = logging.getLogger("app.common.socket_manager")

_cors_origins_env = os.getenv("CORS_ALLOWED_ORIGINS", "")
_parsed_origins = [
    origin.strip()
    for origin in _cors_origins_env.split(",")
    if origin.strip()
]
# Default to "*" when no explicit allowlist is configured so that
# development and E2E environments (where the frontend and backend run on
# different ports) can still establish Socket.IO connections.
socketio_cors_allowed_origins: list[str] | str = _parsed_origins if _parsed_origins else "*"

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=socketio_cors_allowed_origins,
    logger=False,
    engineio_logger=False,
)
