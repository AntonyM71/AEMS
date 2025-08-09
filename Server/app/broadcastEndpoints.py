import logging
import time

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.concurrency import run_until_first_complete
from starlette.websockets import WebSocketState

from app.common.websocket_handler import ws_receiver, ws_sender

broadcast_router = APIRouter(tags=["broadcast"])


@broadcast_router.websocket("/timer")
async def timer_websocket(websocket: WebSocket) -> None:
    channel = "timer"
    logging.info("WebSocket /timer: accepting connection")
    await websocket.accept()
    logging.info("WebSocket /timer: connection accepted")
    last_message_time = time.time()
    try:
        # Run both tasks until they complete or error
        await run_until_first_complete(
            (
                ws_receiver,
                {
                    "websocket": websocket,
                    "side_effect": None,
                    "channel": channel,

                },
            ),
            (
                ws_sender,
                {
                    "websocket": websocket,
                    "channel": channel,

                },
            ),
        )
    except WebSocketDisconnect as e:
        logging.info(
            "Timer WebSocket disconnected with code %s :%s", e.code, e)
        logging.info(
            "WebSocket /timer: disconnect reason: %s, code: %s",
            getattr(e, "reason", None),
            getattr(e, "code", None),
        )
    except Exception as e:
        msg = f"Timer WebSocket error: {e}"
        logging.exception(msg)
    finally:
        # Log the time since last message
        now = time.time()
        logging.info(
            "WebSocket /timer: entering finally block, client_state=%s, last_message_time=%.2f, now=%.2f, delta=%.2f",
            websocket.client_state,
            last_message_time,
            now,
            now - last_message_time,
        )
        if websocket.client_state == WebSocketState.CONNECTED:
            await websocket.close()
        logging.info("WebSocket /timer: connection closed")


@broadcast_router.websocket("/broadcast_control")
async def broadcast_control_websocket(websocket: WebSocket) -> None:
    channel = "broadcast_control"
    logging.info("WebSocket /broadcast_control: accepting connection")
    await websocket.accept()
    logging.info("WebSocket /broadcast_control: connection accepted")
    try:
        await run_until_first_complete(
            (
                ws_receiver,
                {"websocket": websocket, "side_effect": None, "channel": channel},
            ),
            (ws_sender, {"websocket": websocket, "channel": channel}),
        )
    except WebSocketDisconnect as e:
        logging.info(
            "Broadcast control WebSocket disconnected with code %s :%s", e.code, e
        )
        logging.info(
            "WebSocket /broadcast_control: disconnect reason: %s, code: %s",
            getattr(e, "reason", None),
            getattr(e, "code", None),
        )
        if websocket.client_state == WebSocketState.CONNECTED:
            await websocket.close()
    except Exception as e:
        msg = f"Broadcast control WebSocket error: {e}"
        logging.exception(msg)
    finally:
        logging.info(
            "WebSocket /broadcast_control: entering finally block, client_state=%s",
            websocket.client_state,
        )
        if websocket.client_state == WebSocketState.CONNECTED:
            await websocket.close()
        logging.info("WebSocket /broadcast_control: connection closed")
