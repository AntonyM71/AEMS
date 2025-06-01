import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.concurrency import run_until_first_complete

from app.common.websocket_handler import ws_receiver, ws_sender

broadcast_router = APIRouter(tags=["broadcast"])


@broadcast_router.websocket("/timer")
async def timer_websocket(websocket: WebSocket) -> None:
    channel = "timer"
    await websocket.accept()
    try:
        # Run both tasks until they complete or error
        await run_until_first_complete(
            (ws_receiver, {"websocket": websocket,
             "side_effect": None, "channel": channel}),
            (ws_sender, {"websocket": websocket, "channel": channel}),
        )
    except WebSocketDisconnect as e:
        logging.info(
            "Timer WebSocket disconnected normally with code %s :%s", e.code, e)
    except Exception:
        logging.exception("Timer WebSocket error")
    finally:
        await websocket.close()


@broadcast_router.websocket("/broadcast_control")
async def broadcast_control_websocket(websocket: WebSocket) -> None:
    channel = "broadcast_control"
    await websocket.accept()
    try:
        await run_until_first_complete(
            (ws_receiver, {"websocket": websocket,
             "side_effect": None, "channel": channel}),
            (ws_sender, {"websocket": websocket, "channel": channel}),
        )
    except WebSocketDisconnect as e:
        if e.code != 1001:  # 1001 is a "happy" disconnect
            logging.exception("Error with Current Score Websocket")

        await websocket.close()
