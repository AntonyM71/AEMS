"""Unit tests for how socket_manager reads REDIS_URL and reports reachability."""

import os
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
import redis
import socketio

from app.common import socket_manager
from app.common.socket_manager import IN_MEMORY, get_client_manager, redis_is_reachable

REDIS_URL = "redis://localhost:6379/0"
TIMEOUTS = {"socket_connect_timeout": 2, "socket_timeout": 2}


def test_sentinel_selects_the_in_memory_manager() -> None:
    with patch.dict(os.environ, {"REDIS_URL": IN_MEMORY}):
        assert get_client_manager() is None


def test_redis_url_builds_a_manager_with_timeouts() -> None:
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch("socketio.AsyncRedisManager") as mock_manager,
    ):
        get_client_manager()

    mock_manager.assert_called_once_with(REDIS_URL, redis_options=TIMEOUTS)


def test_unset_redis_url_is_rejected() -> None:
    with patch.dict(os.environ):
        os.environ.pop("REDIS_URL", None)
        with pytest.raises(ValueError, match="REDIS_URL"):
            get_client_manager()


@pytest.mark.parametrize("value", ["", "localhost:6379", "http://localhost:6379"])
def test_malformed_redis_url_is_rejected(value: str) -> None:
    with (
        patch.dict(os.environ, {"REDIS_URL": value}),
        pytest.raises(ValueError, match="REDIS_URL"),
    ):
        get_client_manager()


@pytest.mark.asyncio
async def test_in_memory_manager_is_always_reachable() -> None:
    with patch.object(socket_manager.sio, "manager", MagicMock()):
        assert await redis_is_reachable() is True


@pytest.mark.asyncio
async def test_reachable_when_the_live_redis_connection_answers() -> None:
    fake_manager = MagicMock(spec=socketio.AsyncRedisManager)
    fake_manager.redis = AsyncMock()
    with patch.object(socket_manager.sio, "manager", fake_manager):
        assert await redis_is_reachable() is True
    fake_manager.redis.ping.assert_awaited_once_with()


@pytest.mark.asyncio
async def test_unreachable_when_the_live_redis_connection_raises() -> None:
    fake_manager = MagicMock(spec=socketio.AsyncRedisManager)
    fake_manager.redis = AsyncMock()
    fake_manager.redis.ping.side_effect = redis.RedisError("down")
    with patch.object(socket_manager.sio, "manager", fake_manager):
        assert await redis_is_reachable() is False


@pytest.mark.asyncio
async def test_reachable_before_the_manager_has_connected_when_redis_answers() -> None:
    fake_manager = MagicMock(spec=socketio.AsyncRedisManager)
    fake_manager.redis = None
    fake_client = AsyncMock()
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch.object(socket_manager.sio, "manager", fake_manager),
        patch("redis.asyncio.Redis.from_url", return_value=fake_client),
    ):
        assert await redis_is_reachable() is True
    fake_client.ping.assert_awaited_once_with()
    fake_client.aclose.assert_awaited_once_with()


@pytest.mark.asyncio
async def test_unreachable_before_the_manager_has_connected_when_redis_is_down() -> (
    None
):
    fake_manager = MagicMock(spec=socketio.AsyncRedisManager)
    fake_manager.redis = None
    fake_client = AsyncMock()
    fake_client.ping.side_effect = redis.RedisError("down")
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch.object(socket_manager.sio, "manager", fake_manager),
        patch("redis.asyncio.Redis.from_url", return_value=fake_client),
    ):
        assert await redis_is_reachable() is False


def test_sio_is_a_real_async_server() -> None:
    assert isinstance(socket_manager.sio, socketio.AsyncServer)
