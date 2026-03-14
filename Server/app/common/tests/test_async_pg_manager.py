"""Unit tests for AsyncPgManager — the PostgreSQL LISTEN/NOTIFY Socket.IO
client manager.

All asyncpg network calls are replaced with AsyncMock / MagicMock so that the
tests run without a real database.
"""

import asyncio
import json
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from app.common.async_pg_manager import (
    _INITIAL_RETRY_SLEEP,
    _MAX_RETRY_SLEEP,
    AsyncPgManager,
)


def _make_conn(*, closed: bool = False) -> AsyncMock:
    """Return an AsyncMock connection whose is_closed() is synchronous.

    The real asyncpg.Connection.is_closed() is synchronous; using MagicMock
    avoids "coroutine never awaited" warnings in tests.
    """
    conn = AsyncMock()
    conn.is_closed = MagicMock(return_value=closed)
    return conn


@pytest.fixture
def manager() -> AsyncPgManager:
    """Return a fresh AsyncPgManager with a dummy URL."""
    return AsyncPgManager("postgresql://user:pw@localhost/db")


# ---------------------------------------------------------------------------
# __init__
# ---------------------------------------------------------------------------


def test_init_sets_url(manager: AsyncPgManager) -> None:
    assert manager.url == "postgresql://user:pw@localhost/db"


def test_init_default_channel(manager: AsyncPgManager) -> None:
    assert manager.channel == "socketio"


def test_init_custom_channel() -> None:
    m = AsyncPgManager("postgresql://x/y", channel="myapp")
    assert m.channel == "myapp"


def test_init_publish_conn_is_none(manager: AsyncPgManager) -> None:
    assert manager._publish_conn is None


# ---------------------------------------------------------------------------
# _get_publish_conn
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_get_publish_conn_creates_connection(manager: AsyncPgManager) -> None:
    mock_conn = _make_conn()
    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        new=AsyncMock(return_value=mock_conn),
    ) as mock_connect:
        conn = await manager._get_publish_conn()
        mock_connect.assert_awaited_once_with(manager.url)
        assert conn is mock_conn
        assert manager._publish_conn is mock_conn


@pytest.mark.asyncio
async def test_get_publish_conn_reuses_open_connection(manager: AsyncPgManager) -> None:
    mock_conn = _make_conn()
    manager._publish_conn = mock_conn
    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        new=AsyncMock(),
    ) as mock_connect:
        conn = await manager._get_publish_conn()
        mock_connect.assert_not_awaited()
        assert conn is mock_conn


@pytest.mark.asyncio
async def test_get_publish_conn_reconnects_when_closed(manager: AsyncPgManager) -> None:
    old_conn = _make_conn(closed=True)
    manager._publish_conn = old_conn
    new_conn = _make_conn()
    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        new=AsyncMock(return_value=new_conn),
    ) as mock_connect:
        conn = await manager._get_publish_conn()
        mock_connect.assert_awaited_once()
        assert conn is new_conn


# ---------------------------------------------------------------------------
# _publish
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_publish_executes_pg_notify(manager: AsyncPgManager) -> None:
    mock_conn = _make_conn()
    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        new=AsyncMock(return_value=mock_conn),
    ):
        data = {"method": "emit", "event": "score_update"}
        await manager._publish(data)
        mock_conn.execute.assert_awaited_once()
        call_args = mock_conn.execute.await_args
        assert call_args.args[0] == "SELECT pg_notify($1, $2)"
        assert call_args.args[1] == manager.channel
        # Payload should be valid JSON containing the original data
        payload = json.loads(call_args.args[2])
        assert payload == data


@pytest.mark.asyncio
async def test_publish_retries_once_on_failure(manager: AsyncPgManager) -> None:
    """On first failure the connection is reset and a second attempt is made."""
    call_count = 0

    async def connect_side_effect(url: str) -> AsyncMock:
        nonlocal call_count
        call_count += 1
        conn = _make_conn()
        if call_count == 1:
            conn.execute.side_effect = OSError("connection lost")
        return conn

    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        side_effect=connect_side_effect,
    ):
        with patch("asyncio.sleep", new=AsyncMock()) as mock_sleep:
            await manager._publish({"method": "emit"})
            mock_sleep.assert_awaited_once_with(_INITIAL_RETRY_SLEEP)
    assert call_count == 2


@pytest.mark.asyncio
async def test_publish_raises_after_two_failures(manager: AsyncPgManager) -> None:
    """If the retry also fails, the exception propagates."""
    mock_conn = _make_conn()
    mock_conn.execute.side_effect = OSError("persistent failure")

    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        new=AsyncMock(return_value=mock_conn),
    ):
        with patch("asyncio.sleep", new=AsyncMock()):
            with pytest.raises(OSError, match="persistent failure"):
                await manager._publish({"method": "emit"})


# ---------------------------------------------------------------------------
# _listen
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_listen_yields_messages(manager: AsyncPgManager) -> None:
    """Messages put into the queue by the notification handler are yielded."""
    payloads = ['{"method":"emit","event":"a"}', '{"method":"emit","event":"b"}']
    captured: list[str] = []

    async def fake_add_listener(channel: str, handler: object) -> None:
        for p in payloads:
            await handler(None, 0, channel, p)  # type: ignore[call-arg]

    mock_conn = _make_conn()
    mock_conn.add_listener = fake_add_listener

    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        new=AsyncMock(return_value=mock_conn),
    ):
        gen = manager._listen()
        for _ in payloads:
            captured.append(await gen.__anext__())
        await gen.aclose()

    assert captured == payloads


@pytest.mark.asyncio
async def test_listen_keepalive_ping_on_timeout(manager: AsyncPgManager) -> None:
    """When queue.get times out, the keepalive SELECT 1 is executed."""
    message_to_yield = '{"method":"emit","event":"x"}'
    step = 0

    original_wait_for = asyncio.wait_for

    async def patched_wait_for(coro: object, timeout: float) -> object:
        nonlocal step
        step += 1
        if step == 1:
            coro.close()  # type: ignore[union-attr]
            raise TimeoutError
        return await original_wait_for(coro, timeout=5)  # type: ignore[arg-type]

    async def fake_add_listener(channel: str, handler: object) -> None:
        async def _delayed() -> None:
            await asyncio.sleep(0)
            await handler(None, 0, channel, message_to_yield)  # type: ignore[call-arg]

        _ = asyncio.ensure_future(_delayed())  # noqa: RUF006 — event loop holds the ref

    mock_conn = _make_conn()
    mock_conn.add_listener = fake_add_listener

    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        new=AsyncMock(return_value=mock_conn),
    ):
        with patch("asyncio.wait_for", side_effect=patched_wait_for):
            gen = manager._listen()
            msg = await gen.__anext__()
            await gen.aclose()

    assert msg == message_to_yield
    mock_conn.execute.assert_awaited_with("SELECT 1")


@pytest.mark.asyncio
async def test_listen_reconnects_after_connection_error(
    manager: AsyncPgManager,
) -> None:
    """After a connection error the generator sleeps and reconnects."""
    connect_calls: list[int] = []
    message_to_yield = '{"method":"emit","event":"reconnected"}'

    async def fake_add_listener_ok(channel: str, handler: object) -> None:
        await handler(None, 0, channel, message_to_yield)  # type: ignore[call-arg]

    async def connect_side_effect(url: str) -> AsyncMock:
        connect_calls.append(1)
        conn = _make_conn()
        if len(connect_calls) == 1:
            conn.add_listener = AsyncMock(side_effect=OSError("db gone"))
        else:
            conn.add_listener = fake_add_listener_ok
        return conn

    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        side_effect=connect_side_effect,
    ):
        with patch("asyncio.sleep", new=AsyncMock()):
            gen = manager._listen()
            msg = await gen.__anext__()
            await gen.aclose()

    assert msg == message_to_yield
    assert len(connect_calls) == 2


@pytest.mark.asyncio
async def test_listen_exponential_backoff_caps_at_max(manager: AsyncPgManager) -> None:
    """Retry sleep doubles each time and is capped at _MAX_RETRY_SLEEP."""
    attempts = 0
    sleep_times: list[float] = []

    async def connect_side_effect(url: str) -> AsyncMock:
        nonlocal attempts
        attempts += 1
        conn = _make_conn()
        if attempts < 10:
            conn.add_listener = AsyncMock(side_effect=OSError("fail"))
        else:

            async def _deliver(channel: str, handler: object) -> None:
                await handler(None, 0, channel, '{"method":"emit"}')  # type: ignore[call-arg]

            conn.add_listener = _deliver
        return conn

    async def fake_sleep(seconds: float) -> None:
        sleep_times.append(seconds)

    with patch(
        "app.common.async_pg_manager.asyncpg.connect",
        side_effect=connect_side_effect,
    ):
        with patch("asyncio.sleep", side_effect=fake_sleep):
            gen = manager._listen()
            await gen.__anext__()
            await gen.aclose()

    # Verify exponential growth and cap
    assert sleep_times[0] == _INITIAL_RETRY_SLEEP
    for i in range(1, len(sleep_times)):
        assert sleep_times[i] <= _MAX_RETRY_SLEEP
    assert _MAX_RETRY_SLEEP in sleep_times
