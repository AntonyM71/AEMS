import logging

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.concurrency import run_until_first_complete

from app.common.websocket_handler import ws_receiver, ws_sender

broadcast_router = APIRouter(tags=["broadcast"])


@broadcast_router.websocket("/timer")
async def runstatus_websocket(websocket: WebSocket) -> None:
    channel = "timer"
    await websocket.accept()
    try:
        await run_until_first_complete(
            (
                ws_receiver,
                {
                    "websocket": websocket,
                    "side_effect": None,
                    "channel": channel,
                },
            ),
            (ws_sender, {"websocket": websocket, "channel": channel}),
        )
    except WebSocketDisconnect as e:
        if e.code != 1001:  # 1001 is a "happy" disconnect
            logging.exception("Error with Current Score Websocket")

        await websocket.close()
