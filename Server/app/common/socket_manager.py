import logging

import socketio

logger = logging.getLogger("app.common.socket_manager")

sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=False,
    engineio_logger=False,
)
