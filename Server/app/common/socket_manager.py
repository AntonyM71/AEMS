import logging
import os

import socketio

logger = logging.getLogger("app.common.socket_manager")

_cors_origins_env = os.getenv("CORS_ALLOWED_ORIGINS", "")
socketio_cors_allowed_origins = [
    origin.strip()
    for origin in _cors_origins_env.split(",")
    if origin.strip()
]

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=socketio_cors_allowed_origins,
    logger=False,
    engineio_logger=False,
)
