"""
Tests for the AEMS timer module.

Hardware dependencies (RPi.GPIO, TM1637) are mocked in conftest.py so these
tests can run on any platform (including CI runners without Raspberry Pi
hardware).
"""

import queue
from collections.abc import Generator
from unittest.mock import MagicMock, patch

import pytest

# conftest.py has already injected all the necessary sys.modules mocks.
import timer


# ---------------------------------------------------------------------------
# Helper: restore timer global state between tests
# ---------------------------------------------------------------------------
@pytest.fixture(autouse=True)
def reset_timer_state() -> Generator:
    """Reset module-level timer globals before each test."""
    original_running = timer.timer_running
    original_thread = timer.timer_thread
    original_sio_running = timer.socketio_running
    original_sio_thread = timer.socketio_thread

    # Drain the message queue so tests don't affect each other
    while not timer.message_queue.empty():
        try:
            timer.message_queue.get_nowait()
        except queue.Empty:
            break

    yield

    # Restore
    timer.timer_running = original_running
    timer.timer_thread = original_thread
    timer.socketio_running = original_sio_running
    timer.socketio_thread = original_sio_thread

    # Drain again after test
    while not timer.message_queue.empty():
        try:
            timer.message_queue.get_nowait()
        except queue.Empty:
            break


# ===========================================================================
# swap()
# ===========================================================================


class TestSwap:
    def test_length_3_swaps_first_and_third(self) -> None:
        segs = bytearray([1, 2, 3])
        result = timer.swap(segs)
        assert list(result) == [3, 2, 1]

    def test_length_4_pads_and_swaps_pairs(self) -> None:
        segs = bytearray([1, 2, 3, 4])
        result = timer.swap(segs)
        # After extend: [1,2,3,4,0,0]
        # Swap [0]↔[2]: [3,2,1,4,0,0]
        # Swap [3]↔[5]: [3,2,1,0,0,4]
        assert list(result) == [3, 2, 1, 0, 0, 4]

    def test_length_5_pads_and_swaps_pairs(self) -> None:
        segs = bytearray([1, 2, 3, 4, 5])
        result = timer.swap(segs)
        # After extend: [1,2,3,4,5,0]
        # Swap [0]↔[2]: [3,2,1,4,5,0]
        # Swap [3]↔[5]: [3,2,1,0,5,4]
        assert list(result) == [3, 2, 1, 0, 5, 4]

    def test_length_6_swaps_both_pairs_without_padding(self) -> None:
        segs = bytearray([1, 2, 3, 4, 5, 6])
        result = timer.swap(segs)
        # Swap [0]↔[2]: [3,2,1,4,5,6]
        # Swap [3]↔[5]: [3,2,1,6,5,4]
        assert list(result) == [3, 2, 1, 6, 5, 4]

    def test_returns_same_bytearray_object(self) -> None:
        segs = bytearray([10, 20, 30])
        result = timer.swap(segs)
        assert result is segs


# ===========================================================================
# get_short_status()
# ===========================================================================


class TestGetShortStatus:
    @pytest.mark.parametrize(
        "status,expected",
        [
            ("started", "STA"),
            ("running", "RUN"),
            ("finished", "FIN"),
            ("cancelled", "CAN"),
        ],
    )
    def test_known_statuses(self, status: timer.StatusLiteral, expected: str) -> None:
        assert timer.get_short_status(status) == expected

    def test_unknown_status_returns_unk(self) -> None:
        # Intentionally passing an invalid status to test the fallback "UNK" path.
        assert timer.get_short_status(
            "bogus") == "UNK"  # type: ignore[arg-type]


# ===========================================================================
# QueueItem dataclass
# ===========================================================================


class TestQueueItem:
    def test_creation(self) -> None:
        item = timer.QueueItem(status="running", time_remaining=30)
        assert item.status == "running"
        assert item.time_remaining == 30

    def test_ordering(self) -> None:
        a = timer.QueueItem(status="running", time_remaining=10)
        b = timer.QueueItem(status="running", time_remaining=20)
        assert a < b


# ===========================================================================
# get_total_duration()
# ===========================================================================


class TestGetTotalDuration:
    def test_returns_squirt_time_when_switch_high(self) -> None:
        import sys

        gpio = sys.modules["RPi.GPIO"]
        gpio.input.return_value = gpio.HIGH

        result = timer.get_total_duration()
        assert result == timer.squirt_time

    def test_returns_float_time_when_switch_low(self) -> None:
        import sys

        gpio = sys.modules["RPi.GPIO"]
        gpio.input.return_value = gpio.LOW

        result = timer.get_total_duration()
        assert result == timer.float_time

    def test_float_time_is_less_than_squirt_time(self) -> None:
        assert timer.float_time < timer.squirt_time


# ===========================================================================
# update_buzzer()
# ===========================================================================


class TestUpdateBuzzer:
    def test_manual_buzz_activates_buzzer(self) -> None:
        import sys

        gpio = sys.modules["RPi.GPIO"]
        timer.update_buzzer(manual_buzz=True, timer_buzz=False)
        gpio.output.assert_called_with(timer.PIN_BUZZER, gpio.HIGH)

    def test_timer_buzz_activates_buzzer(self) -> None:
        import sys

        gpio = sys.modules["RPi.GPIO"]
        timer.update_buzzer(manual_buzz=False, timer_buzz=True)
        gpio.output.assert_called_with(timer.PIN_BUZZER, gpio.HIGH)

    def test_both_buzzes_activates_buzzer(self) -> None:
        import sys

        gpio = sys.modules["RPi.GPIO"]
        timer.update_buzzer(manual_buzz=True, timer_buzz=True)
        gpio.output.assert_called_with(timer.PIN_BUZZER, gpio.HIGH)

    def test_no_buzz_deactivates_buzzer(self) -> None:
        import sys

        gpio = sys.modules["RPi.GPIO"]
        timer.update_buzzer(manual_buzz=False, timer_buzz=False)
        gpio.output.assert_called_with(timer.PIN_BUZZER, gpio.LOW)


# ===========================================================================
# send_timer_update()
# ===========================================================================


class TestSendTimerUpdate:
    def test_queues_message_when_socketio_enabled(self) -> None:
        timer.ENABLE_WEBSOCKET = True
        timer.send_timer_update("running", 30.0)
        assert not timer.message_queue.empty()
        item = timer.message_queue.get_nowait()
        assert item.status == "running"
        assert item.time_remaining == 30

    def test_skips_queue_when_socketio_disabled(self) -> None:
        timer.ENABLE_WEBSOCKET = False
        timer.send_timer_update("running", 30.0)
        assert timer.message_queue.empty()

    def test_time_remaining_none_uses_zero(self) -> None:
        timer.ENABLE_WEBSOCKET = True
        timer.send_timer_update("finished", None)
        item = timer.message_queue.get_nowait()
        assert item.time_remaining == 0

    def test_status_queued_correctly(self) -> None:
        timer.ENABLE_WEBSOCKET = True
        statuses: tuple[timer.StatusLiteral, ...] = (
            "started",
            "running",
            "finished",
            "cancelled",
        )
        for status in statuses:
            timer.send_timer_update(status, 5)
            item = timer.message_queue.get_nowait()
            assert item.status == status


# ===========================================================================
# start_timer() / cancel_timer()
# ===========================================================================


class TestStartCancelTimer:
    def test_start_timer_sets_running_true(self) -> None:
        timer.timer_running = False
        with patch("timer.threading.Thread") as mock_thread_cls:
            mock_thread = MagicMock()
            mock_thread_cls.return_value = mock_thread
            timer.start_timer()
            assert timer.timer_running is True
            mock_thread.start.assert_called_once()

    def test_start_timer_does_nothing_if_already_running(self) -> None:
        timer.timer_running = True
        with patch("timer.threading.Thread") as mock_thread_cls:
            timer.start_timer()
            mock_thread_cls.assert_not_called()

    def test_cancel_timer_clears_running_flag(self) -> None:
        timer.timer_running = True
        with patch("timer.send_timer_update") as mock_update:
            timer.cancel_timer()
            assert timer.timer_running is False
            mock_update.assert_called_once_with("cancelled", 0)

    def test_cancel_timer_does_nothing_if_not_running(self) -> None:
        timer.timer_running = False
        with patch("timer.send_timer_update") as mock_update:
            timer.cancel_timer()
            mock_update.assert_not_called()


# ===========================================================================
# run_timer_phase()
# ===========================================================================


class TestRunTimerPhase:
    @patch("timer.send_timer_update")
    @patch("timer.time.sleep")
    def test_phase_completes_when_timer_running(
        self, mock_sleep: MagicMock, mock_update: MagicMock
    ) -> None:
        timer.timer_running = True
        elapsed, _last_sec, completed = timer.run_timer_phase(
            duration=0.1,
            elapsed_time=0.0,
            last_whole_second=0,
            total_duration=45.0,
        )
        assert completed is True
        assert elapsed > 0.0
        mock_update.assert_called()

    @patch("timer.send_timer_update")
    @patch("timer.time.sleep")
    def test_phase_exits_immediately_when_cancelled(
        self, mock_sleep: MagicMock, mock_update: MagicMock
    ) -> None:
        timer.timer_running = False
        elapsed, last_sec, completed = timer.run_timer_phase(
            duration=10.0,
            elapsed_time=5.0,
            last_whole_second=5,
            total_duration=45.0,
        )
        assert completed is False
        assert elapsed == 5.0  # unchanged
        assert last_sec == 5  # unchanged
        mock_sleep.assert_not_called()

    @patch("timer.send_timer_update")
    @patch("timer.time.sleep")
    def test_sends_update_at_each_whole_second(
        self, mock_sleep: MagicMock, mock_update: MagicMock
    ) -> None:
        """Running two full seconds should trigger two 'running' updates
        (plus the initial one at phase start)."""
        timer.timer_running = True
        # duration=2.0 with SLEEP_INTERVAL=0.05 means 40 loop iterations
        _elapsed, last_sec, completed = timer.run_timer_phase(
            duration=2.0,
            elapsed_time=0.0,
            last_whole_second=0,
            total_duration=45.0,
        )
        assert completed is True
        assert last_sec == 2
        # At minimum: 1 initial + 2 per-second updates
        assert mock_update.call_count >= 3


# ===========================================================================
# buzz() / double_buzz()
# ===========================================================================


class TestBuzz:
    @patch("timer.time.sleep")
    def test_buzz_sets_timer_buzzing_true_then_false(
        self, mock_sleep: MagicMock
    ) -> None:
        states: list[bool] = []

        def capture_sleep(_: float) -> None:
            states.append(timer.timer_buzzing)

        mock_sleep.side_effect = capture_sleep
        timer.buzz(duration=0.5)
        assert states[0] is True  # buzzing during sleep
        assert timer.timer_buzzing is False  # cleared after

    @patch("timer.time.sleep")
    def test_double_buzz_calls_buzz_twice(self, mock_sleep: MagicMock) -> None:
        with patch("timer.buzz") as mock_buzz:
            timer.double_buzz(duration=0.33, gap=0.33)
            assert mock_buzz.call_count == 2
            mock_buzz.assert_any_call(duration=0.33)


# ===========================================================================
# process_message_queue_sync()
# ===========================================================================


class TestProcessMessageQueueSync:
    def test_emits_queued_message(self) -> None:
        sio_client = MagicMock()
        item = timer.QueueItem(status="running", time_remaining=25)
        timer.message_queue.put(item)

        timer.process_message_queue_sync(sio_client)

        sio_client.emit.assert_called_once_with(
            "timer", {"status": "running", "time_remaining": 25})

    def test_does_nothing_when_queue_is_empty(self) -> None:
        sio_client = MagicMock()
        timer.process_message_queue_sync(sio_client)
        sio_client.emit.assert_not_called()

    def test_requeues_message_on_emit_error(self) -> None:
        sio_client = MagicMock()
        sio_client.emit.side_effect = Exception("connection lost")
        item = timer.QueueItem(status="running", time_remaining=10)
        timer.message_queue.put(item)

        with pytest.raises(Exception, match="connection lost"):
            timer.process_message_queue_sync(sio_client)

        # Message should have been put back
        assert not timer.message_queue.empty()
        requeued = timer.message_queue.get_nowait()
        assert requeued.status == "running"


# ===========================================================================
# start_socketio_thread()
# ===========================================================================


class TestStartSocketIOThread:
    def test_starts_thread_when_none(self) -> None:
        timer.socketio_thread = None
        with patch("timer.threading.Thread") as mock_thread_cls:
            mock_thread = MagicMock()
            mock_thread.is_alive.return_value = False
            mock_thread_cls.return_value = mock_thread
            timer.start_socketio_thread()
            mock_thread.start.assert_called_once()

    def test_does_not_start_second_thread_when_alive(self) -> None:
        mock_thread = MagicMock()
        mock_thread.is_alive.return_value = True
        timer.socketio_thread = mock_thread
        with patch("timer.threading.Thread") as mock_thread_cls:
            timer.start_socketio_thread()
            mock_thread_cls.assert_not_called()
