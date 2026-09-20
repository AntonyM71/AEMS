"""Covers the skip_sid distinction between the two broadcast namespaces:
/timer excludes the sender so it doesn't echo its own tick back to itself,
/broadcast_control includes it so every connected display (including the
sender) applies the same control command.
"""

from unittest.mock import AsyncMock, patch

import pytest

from app.broadcastEndpoints import on_broadcast_control, on_timer
from app.common.socket_manager import sio


@pytest.mark.asyncio
async def test_timer_rebroadcast_excludes_the_sender() -> None:
    with patch.object(sio, "emit", AsyncMock()) as mock_emit:
        await on_timer("sender-sid", {"seconds": 45})

    mock_emit.assert_awaited_once_with(
        "timer", {"seconds": 45}, namespace="/timer", skip_sid="sender-sid"
    )


@pytest.mark.asyncio
async def test_broadcast_control_rebroadcast_includes_the_sender() -> None:
    with patch.object(sio, "emit", AsyncMock()) as mock_emit:
        await on_broadcast_control("sender-sid", {"scene": "intro"})

    mock_emit.assert_awaited_once_with(
        "broadcast_control", {"scene": "intro"}, namespace="/broadcast_control"
    )
