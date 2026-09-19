import os
from unittest.mock import patch

import pytest
from pydantic import ValidationError

from app.config import Settings

REQUIRED_ENV = {"REDIS_URL": "memory", "CONNECTION_STRING": "postgresql://x"}


def test_defaults_when_only_required_vars_set() -> None:
    with patch.dict(os.environ, REQUIRED_ENV, clear=True):
        settings = Settings()

    assert settings.port == 3000
    assert settings.log_json_format is False
    assert settings.log_level == "INFO"
    assert settings.cors_allowed_origins == ""


@pytest.mark.parametrize("value", ["memory", "redis://localhost:6379/0"])
def test_valid_redis_url_values_are_accepted(value: str) -> None:
    with patch.dict(os.environ, {**REQUIRED_ENV, "REDIS_URL": value}, clear=True):
        assert Settings().redis_url == value


@pytest.mark.parametrize("value", ["", "localhost:6379", "http://localhost:6379"])
def test_malformed_redis_url_is_rejected(value: str) -> None:
    env = {**REQUIRED_ENV, "REDIS_URL": value}
    with (
        patch.dict(os.environ, env, clear=True),
        pytest.raises(ValidationError, match="redis_url"),
    ):
        Settings()


def test_missing_redis_url_is_rejected() -> None:
    env = {k: v for k, v in REQUIRED_ENV.items() if k != "REDIS_URL"}
    with (
        patch.dict(os.environ, env, clear=True),
        pytest.raises(ValidationError, match="redis_url"),
    ):
        Settings()


def test_missing_connection_string_is_rejected() -> None:
    env = {k: v for k, v in REQUIRED_ENV.items() if k != "CONNECTION_STRING"}
    with (
        patch.dict(os.environ, env, clear=True),
        pytest.raises(ValidationError, match="connection_string"),
    ):
        Settings()
