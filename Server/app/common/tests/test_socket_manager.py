"""Unit tests for how socket_manager reads REDIS_URL."""

import os
from unittest.mock import MagicMock, patch

import pytest
import socketio

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


def test_sentinel_is_always_reachable() -> None:
    with patch.dict(os.environ, {"REDIS_URL": IN_MEMORY}):
        assert redis_is_reachable() is True


def test_reachable_when_redis_answers() -> None:
    client = MagicMock()
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch("redis.Redis.from_url", return_value=client),
    ):
        assert redis_is_reachable() is True
    client.ping.assert_called_once_with()


def test_unreachable_when_redis_raises() -> None:
    import redis

    client = MagicMock()
    client.ping.side_effect = redis.RedisError("down")
    with (
        patch.dict(os.environ, {"REDIS_URL": REDIS_URL}),
        patch("redis.Redis.from_url", return_value=client),
    ):
        assert redis_is_reachable() is False


def test_sio_is_a_real_async_server() -> None:
    from app.common import socket_manager

    assert isinstance(socket_manager.sio, socketio.AsyncServer)
