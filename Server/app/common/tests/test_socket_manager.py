"""Unit tests for socket_manager — verifies that the Redis client manager is
wired correctly based on the REDIS_URL environment variable.
"""

import importlib
import os
import types
from unittest.mock import MagicMock, patch

import socketio


def _reload_socket_manager() -> types.ModuleType:
    """Reload app.common.socket_manager so env-var changes take effect."""
    import app.common.socket_manager as sm

    importlib.reload(sm)
    return sm


def test_no_redis_url_uses_in_memory_manager() -> None:
    """Without REDIS_URL, client_manager should be None (in-memory)."""
    env = {k: v for k, v in os.environ.items() if k != "REDIS_URL"}
    with patch.dict(os.environ, env, clear=True):
        sm = _reload_socket_manager()
    assert sm._client_manager is None
    assert isinstance(sm.sio, socketio.AsyncServer)


def test_redis_url_creates_async_redis_manager() -> None:
    """When REDIS_URL is set, an AsyncRedisManager should be created."""
    mock_manager = MagicMock(spec=socketio.AsyncRedisManager)
    with patch.dict(os.environ, {"REDIS_URL": "redis://localhost:6379/0"}):
        with patch("socketio.AsyncRedisManager", return_value=mock_manager) as mock_cls:
            sm = _reload_socket_manager()
            mock_cls.assert_called_once_with("redis://localhost:6379/0")
    assert sm._client_manager is mock_manager


def test_sio_uses_client_manager_when_redis_url_set() -> None:
    """The AsyncServer should receive the Redis client manager."""
    mock_manager = MagicMock(spec=socketio.AsyncRedisManager)
    with patch.dict(os.environ, {"REDIS_URL": "redis://localhost:6379/0"}):
        with patch("socketio.AsyncRedisManager", return_value=mock_manager):
            with patch("socketio.AsyncServer") as mock_server_cls:
                _reload_socket_manager()
                call_kwargs = mock_server_cls.call_args.kwargs
                assert call_kwargs.get("client_manager") is mock_manager
