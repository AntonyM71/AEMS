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


@sio.on("request_broadcast_control", namespace="/broadcast_control")
async def on_request_broadcast_control(sid: str) -> None:
    # Unlike the state relays, skip the sender so it never answers its own request.
    await sio.emit(
        "request_broadcast_control", namespace="/broadcast_control", skip_sid=sid
    )


@sio.on("connect", namespace="/broadcast_control")
async def on_broadcast_control_connect(sid: str, environ: dict) -> None:
    logging.info("Socket.IO /broadcast_control: client connected: %s", sid)


@sio.on("disconnect", namespace="/broadcast_control")
async def on_broadcast_control_disconnect(sid: str) -> None:
    logging.info("Socket.IO /broadcast_control: client disconnected: %s", sid)


@sio.on("head_judge_selection", namespace="/head_judge_selection")
async def on_head_judge_selection(sid: str, data: dict) -> None:
    logging.info("Socket.IO /head_judge_selection: received message from %s", sid)
    await sio.emit("head_judge_selection", data, namespace="/head_judge_selection")


@sio.on("request_head_judge_selection", namespace="/head_judge_selection")
async def on_request_head_judge_selection(sid: str) -> None:
    # Unlike the state relays, skip the sender so it never answers its own request.
    await sio.emit(
        "request_head_judge_selection",
        namespace="/head_judge_selection",
        skip_sid=sid,
    )
