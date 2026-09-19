# Spec Delta

## Purpose

Timer app startup configuration: declaring and validating environment-derived settings via pydantic-settings, logging a clear error for an invalid value while keeping the physical timer/buzzer hardware operational.

## ADDED Requirements

### Requirement: Timer validates configuration without stopping the hardware
The Timer application SHALL validate its environment-derived configuration when it starts. WHEN a value is present but invalid, the Timer SHALL log a validation error naming the invalid variable and continue running with WebSocket connectivity disabled, so the GPIO-driven countdown timer and buzzer remain operational regardless of network configuration.

#### Scenario: Malformed SOCKETIO_URL at startup
- **WHEN** `SOCKETIO_URL` is set to a value that is not a valid URL
- **THEN** the Timer SHALL log a validation error naming `SOCKETIO_URL`, disable WebSocket connectivity, and continue running the countdown timer and buzzer

#### Scenario: Unrecognized ENABLE_WEBSOCKET value at startup
- **WHEN** `ENABLE_WEBSOCKET` is set to a value that is not a recognized boolean (e.g. `"true"`/`"false"`/`"1"`/`"0"`/`"yes"`/`"no"`, case-insensitive)
- **THEN** the Timer SHALL log a validation error naming `ENABLE_WEBSOCKET`, disable WebSocket connectivity, and continue running the countdown timer and buzzer

### Requirement: Timer configuration defaults preserved
When Timer environment variables are not set, defaults SHALL match current behavior: `SOCKETIO_URL` defaults to the production venue address, `SOCKETIO_PATH` defaults to `/socket.io/`, and `ENABLE_WEBSOCKET` defaults to enabled.

#### Scenario: No optional variables set
- **WHEN** the Timer starts with no environment variables set
- **THEN** it SHALL use its built-in default `SOCKETIO_URL`, `/socket.io/` as `SOCKETIO_PATH`, and WebSocket connectivity enabled

### Requirement: Explicitly disabling WebSocket connectivity is unaffected
Setting `ENABLE_WEBSOCKET` to a recognized "false" value SHALL continue to disable WebSocket connectivity while the countdown timer and buzzer keep running, exactly as today.

#### Scenario: WebSocket explicitly disabled
- **WHEN** `ENABLE_WEBSOCKET` is set to `"false"` (or `"0"`/`"no"`)
- **THEN** the Timer SHALL run the countdown timer and buzzer with WebSocket connectivity disabled, and SHALL NOT log a validation error
