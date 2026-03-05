import logging

from fastapi import APIRouter

from app.common.socket_manager import sio

broadcast_router = APIRouter(tags=["broadcast"])


@sio.on("timer", namespace="/timer")
async def on_timer(sid: str, data: dict) -> None:
    logging.info("Socket.IO /timer: received message from %s", sid)
    await sio.emit("timer", data, namespace="/timer", skip_sid=sid)


@sio.on("connect", namespace="/timer")
async def on_timer_connect(sid: str, environ: dict) -> None:
    logging.info("Socket.IO /timer: client connected: %s", sid)


@sio.on("disconnect", namespace="/timer")
async def on_timer_disconnect(sid: str) -> None:
    logging.info("Socket.IO /timer: client disconnected: %s", sid)


@sio.on("broadcast_control", namespace="/broadcast_control")
async def on_broadcast_control(sid: str, data: dict) -> None:
    logging.info("Socket.IO /broadcast_control: received message from %s", sid)
    await sio.emit("broadcast_control", data, namespace="/broadcast_control")


@sio.on("connect", namespace="/broadcast_control")
async def on_broadcast_control_connect(sid: str, environ: dict) -> None:
    logging.info("Socket.IO /broadcast_control: client connected: %s", sid)


@sio.on("disconnect", namespace="/broadcast_control")
async def on_broadcast_control_disconnect(sid: str) -> None:
    logging.info("Socket.IO /broadcast_control: client disconnected: %s", sid)
