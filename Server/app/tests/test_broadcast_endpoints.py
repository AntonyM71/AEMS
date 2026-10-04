"""Covers the skip_sid distinction between the broadcast relays: state
messages (/broadcast_control, /head_judge_selection) include the sender so every
client applies the same state, while /timer ticks and the request_* events
exclude it so a client never echoes or answers itself.
"""

from unittest.mock import AsyncMock, patch

import pytest

from app.broadcastEndpoints import (
    on_broadcast_control,
    on_head_judge_selection,
    on_request_broadcast_control,
    on_request_head_judge_selection,
    on_timer,
)
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


@pytest.mark.asyncio
async def test_broadcast_control_request_excludes_the_sender() -> None:
    with patch.object(sio, "emit", AsyncMock()) as mock_emit:
        await on_request_broadcast_control("sender-sid")

    mock_emit.assert_awaited_once_with(
        "request_broadcast_control",
        namespace="/broadcast_control",
        skip_sid="sender-sid",
    )


@pytest.mark.asyncio
async def test_head_judge_selection_rebroadcast_includes_the_sender() -> None:
    position = {"heatId": "h1", "runNumber": 2}
    with patch.object(sio, "emit", AsyncMock()) as mock_emit:
        await on_head_judge_selection("sender-sid", position)

    mock_emit.assert_awaited_once_with(
        "head_judge_selection", position, namespace="/head_judge_selection"
    )


@pytest.mark.asyncio
async def test_head_judge_selection_request_excludes_the_sender() -> None:
    with patch.object(sio, "emit", AsyncMock()) as mock_emit:
        await on_request_head_judge_selection("sender-sid")

    mock_emit.assert_awaited_once_with(
        "request_head_judge_selection",
        namespace="/head_judge_selection",
        skip_sid="sender-sid",
    )
