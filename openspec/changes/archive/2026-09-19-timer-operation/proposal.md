# Proposal

## Why

`openspec/specs/timer-configuration/spec.md` only covers how the Timer app validates its environment-variable configuration at startup. It says nothing about what the physical timer actually does once it is running: the GPIO-driven countdown, buzzer sequencing, TM1637 display updates, and Socket.IO status broadcasting. That runtime behavior is real, tested (`Timer/tests/test_timer.py`), shipped code with no spec of record. This proposal documents it as its own capability, separate from configuration, so it isn't lost or re-derived from source every time someone touches `Timer/src/timer.py`.

## What Changes

- Add a new `timer-operation` capability documenting existing, shipped Timer runtime behavior:
  - The countdown's two timed phases (main phase, then a 10-second end-warning phase) and the mode-switch-selected total duration (45s "float" / 60s "squirt").
  - Buzzer sequencing: a short buzz at the 10-second mark, a double buzz on completion, and manual-buzz-button override, all independent of Socket.IO connectivity.
  - TM1637 seven-segment display updates: a `READY` splash at startup, and a live `<STATUS>-<seconds>` readout on every timer update regardless of whether WebSocket broadcasting is enabled.
  - Socket.IO status broadcasting: `started`/`running`/`finished`/`cancelled` status events queued and emitted on the `/timer` namespace, skipped entirely when WebSocket connectivity is disabled.
  - Automatic Socket.IO reconnection: the connection loop retries after a 2-second backoff on any connection error, and re-queued messages survive a dropped connection.
  - Start/cancel button debouncing via a single `timer_running` flag (a second start while running is a no-op; cancel while not running is a no-op).
- No code changes. This documents existing behavior only.

## Capabilities

### New Capabilities
- `timer-operation`: The Timer app's runtime behavior once started with valid (or degraded) config — GPIO countdown timing, buzzer sequencing, TM1637 display updates, and Socket.IO status broadcasting/reconnection to the rest of the system.

### Modified Capabilities
(none — `timer-configuration` is unchanged; this proposal only links to it)

## Impact

- Documentation only: adds `openspec/specs/timer-operation/spec.md` (via this change's delta spec). No changes to `Timer/`, `Webapp/`, or `Server/` source.
- Grounded in `Timer/src/timer.py` and `Timer/tests/test_timer.py` (plus `Timer/src/fake_timer.py` for the `/timer` namespace contract).
