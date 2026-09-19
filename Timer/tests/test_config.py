import os
from unittest.mock import patch

import pytest
from pydantic import ValidationError

from config import FakeTimerSettings, TimerSettings


def test_defaults_when_no_env_vars_set() -> None:
    with patch.dict(os.environ, {}, clear=True):
        settings = TimerSettings()

    assert str(settings.socketio_url) == "http://192.168.0.28:81/"
    assert settings.socketio_path == "/socket.io/"
    assert settings.enable_websocket is True


def test_fake_timer_settings_overrides_socketio_url_default() -> None:
    with patch.dict(os.environ, {}, clear=True):
        settings = FakeTimerSettings()

    assert str(settings.socketio_url) == "http://localhost:8000/"


def test_fake_timer_settings_env_var_still_wins_over_default() -> None:
    with patch.dict(os.environ, {"SOCKETIO_URL": "http://example.com:9000"}, clear=True):
        settings = FakeTimerSettings()

    assert str(settings.socketio_url) == "http://example.com:9000/"


@pytest.mark.parametrize("value", ["0", "false", "no", "off"])
def test_enable_websocket_accepts_recognized_falsy_values(value: str) -> None:
    with patch.dict(os.environ, {"ENABLE_WEBSOCKET": value}, clear=True):
        assert TimerSettings().enable_websocket is False


@pytest.mark.parametrize("value", ["1", "true", "yes", "on"])
def test_enable_websocket_accepts_recognized_truthy_values(value: str) -> None:
    with patch.dict(os.environ, {"ENABLE_WEBSOCKET": value}, clear=True):
        assert TimerSettings().enable_websocket is True


def test_enable_websocket_rejects_unrecognized_value() -> None:
    with (
        patch.dict(os.environ, {"ENABLE_WEBSOCKET": "flase"}, clear=True),
        pytest.raises(ValidationError, match="enable_websocket"),
    ):
        TimerSettings()


def test_socketio_url_rejects_malformed_value() -> None:
    with (
        patch.dict(os.environ, {"SOCKETIO_URL": "not-a-url"}, clear=True),
        pytest.raises(ValidationError, match="socketio_url"),
    ):
        TimerSettings()
