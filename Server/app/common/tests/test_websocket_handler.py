
import pytest
from fastapi import WebSocket

from app.common.websocket_handler import ConnectionManager


class MockWebSocket(WebSocket):
    def __init__(self) -> None:
        self.accepted: bool = False
        self.sent_messages: list[str] = []
        self.subprotocol: str | None = None

    async def accept(self, subprotocol: str | None = None) -> None:
        self.accepted = True
        self.subprotocol = subprotocol

    async def send_text(self, data: str) -> None:
        self.sent_messages.append(data)


@pytest.fixture
def connection_manager() -> ConnectionManager:
    return ConnectionManager()


@pytest.fixture
def websocket() -> MockWebSocket:
    return MockWebSocket()


@pytest.mark.asyncio
async def test_connect(connection_manager: ConnectionManager, websocket: MockWebSocket) -> None:
    await connection_manager.connect(websocket)
    assert websocket.accepted
    assert websocket in connection_manager.active_connections


@pytest.mark.asyncio
async def test_disconnect(connection_manager: ConnectionManager, websocket: MockWebSocket) -> None:
    await connection_manager.connect(websocket)
    connection_manager.disconnect(websocket)
    assert websocket not in connection_manager.active_connections


@pytest.mark.asyncio
async def test_broadcast(connection_manager: ConnectionManager, websocket: MockWebSocket) -> None:
    await connection_manager.connect(websocket)
    message = "Hello, World!"
    await connection_manager.broadcast(message)
    assert message in websocket.sent_messages
