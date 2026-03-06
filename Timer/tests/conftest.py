"""
Pytest configuration that mocks hardware-specific dependencies (RPi.GPIO, TM1637)
before any test imports timer.py.  Injecting into sys.modules at module level
ensures the mocks are in place before conftest is even fully loaded.
"""

import sys
from unittest.mock import MagicMock

# ---------------------------------------------------------------------------
# 1. Mock RPi.GPIO
# ---------------------------------------------------------------------------
gpio_mock = MagicMock()
gpio_mock.BCM = 11
gpio_mock.BOARD = 10
gpio_mock.IN = 1
gpio_mock.OUT = 0
gpio_mock.HIGH = 1
gpio_mock.LOW = 0
gpio_mock.PUD_DOWN = 21
gpio_mock.PUD_UP = 22
# Default: mode switch pin returns LOW (float mode)
gpio_mock.input.return_value = gpio_mock.LOW

sys.modules["RPi"] = MagicMock(GPIO=gpio_mock)
sys.modules["RPi.GPIO"] = gpio_mock

# ---------------------------------------------------------------------------
# 2. Mock socketio (imported by timer.py for Socket.IO communication)
# ---------------------------------------------------------------------------
socketio_mock = MagicMock()


class _FakeSimpleClient:
    """Minimal stand-in for socketio.SimpleClient."""

    def __init__(self) -> None:
        self.connected = True
        self._emitted: list = []

    def connect(self, *args, **kwargs) -> None:  # noqa: ANN002, ANN003
        pass

    def emit(self, event: str, data: object) -> None:
        self._emitted.append((event, data))

    def disconnect(self) -> None:
        self.connected = False

    def __enter__(self):  # noqa: ANN204
        return self

    def __exit__(self, *args) -> None:  # noqa: ANN002
        pass


socketio_mock.SimpleClient = _FakeSimpleClient
sys.modules["socketio"] = socketio_mock

# ---------------------------------------------------------------------------
# 3. Mock custom_logging (imported from the Server path in timer.py)
# ---------------------------------------------------------------------------
custom_logging_mock = MagicMock()
custom_logging_mock.setup_logging = MagicMock()
sys.modules["custom_logging"] = custom_logging_mock

# ---------------------------------------------------------------------------
# 4. Mock tm1637  (also uses RPi.GPIO at module level)
# ---------------------------------------------------------------------------


class MockTM1637Decimal:
    """Minimal stand-in for TM1637Decimal that returns real bytearrays."""

    def __init__(self, clk: int = 0, dio: int = 0, brightness: int = 7) -> None:
        pass

    def encode_string(self, string: str) -> bytearray:
        return bytearray(len(string.replace(".", "")))

    def write(self, segments: bytearray, pos: int = 0) -> None:
        pass


tm1637_module_mock = MagicMock()
tm1637_module_mock.TM1637Decimal = MockTM1637Decimal
sys.modules["tm1637"] = tm1637_module_mock
