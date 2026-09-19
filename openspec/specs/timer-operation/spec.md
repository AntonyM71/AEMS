# timer-operation Specification

## Purpose

Defines the Timer app's runtime behavior once it is running with valid (or degraded) configuration: the GPIO-driven countdown, buzzer sequencing, TM1637 display updates, and Socket.IO status broadcasting to the rest of the system. Configuration loading and validation are covered separately by `openspec/specs/timer-configuration/spec.md`.

## Requirements

### Requirement: Countdown duration is selected by the mode switch
The Timer SHALL select the total countdown duration by reading the mode switch GPIO pin when a countdown starts: 60 seconds ("squirt" mode) when the pin reads HIGH, 45 seconds ("float" mode) when it reads LOW.

#### Scenario: Mode switch set to squirt
- **WHEN** the mode switch pin reads HIGH at the start of a countdown
- **THEN** the countdown's total duration is 60 seconds

#### Scenario: Mode switch set to float
- **WHEN** the mode switch pin reads LOW at the start of a countdown
- **THEN** the countdown's total duration is 45 seconds

### Requirement: The countdown ends with a short warning buzz followed by a final double buzz
The countdown SHALL run its total duration in two phases: a first phase lasting until 10 seconds remain, then a ~0.33-second buzz marking the 10-second point, then a second phase covering the remaining time. WHEN the second phase completes without cancellation, the Timer SHALL broadcast a "finished" status and sound two ~0.33-second buzzes separated by a ~0.33-second gap.

#### Scenario: Countdown reaches the 10-second mark
- **WHEN** the first phase of a countdown completes without cancellation
- **THEN** the Timer buzzes for approximately 0.33 seconds before continuing the countdown

#### Scenario: Countdown completes
- **WHEN** the second phase of a countdown completes without cancellation
- **THEN** the Timer broadcasts a "finished" status with 0 seconds remaining and sounds a double buzz

### Requirement: A running countdown reports time remaining on every whole second
While a countdown phase is running, the Timer SHALL broadcast a "running" status at the start of the phase and again every time the elapsed time crosses a new whole second, each carrying the seconds remaining until the countdown's total duration.

#### Scenario: Two seconds elapse during a phase
- **WHEN** a countdown phase runs for two full seconds without cancellation
- **THEN** the Timer broadcasts at least one "running" status at phase start and one for each whole second reached, each with the correctly decreasing time remaining

### Requirement: Cancelling a running countdown stops it before its next tick
Cancelling a countdown SHALL only take effect on a countdown that is currently running. WHEN a countdown is cancelled, the Timer SHALL stop the countdown before its next tick, turn off the running-state light, and broadcast a "cancelled" status with 0 seconds remaining.

#### Scenario: Cancel mid-phase
- **WHEN** a countdown is cancelled while a phase is in progress
- **THEN** that phase exits immediately without sleeping or advancing its elapsed time further, and completes with an incomplete-phase result

#### Scenario: Cancel while running
- **WHEN** a countdown is cancelled while it is running
- **THEN** the Timer broadcasts a "cancelled" status with 0 seconds remaining and turns off the running-state light

#### Scenario: Cancel with nothing running
- **WHEN** cancel is triggered while no countdown is running
- **THEN** the Timer does nothing and broadcasts no status update

### Requirement: Starting a countdown is a no-op while one is already running
The Timer SHALL NOT start a second countdown while one is already in progress.

#### Scenario: Start requested while already running
- **WHEN** a start is triggered while a countdown is already running
- **THEN** the Timer does not start a new countdown thread and the existing countdown continues unaffected

### Requirement: The buzzer sounds automatically during the countdown and can be manually overridden
The physical buzzer output SHALL be active whenever the countdown's automatic buzz sequence is sounding, the manual buzz control is engaged, or both; it SHALL be inactive when neither is active. This behavior does not depend on Socket.IO/WebSocket connectivity.

#### Scenario: Automatic buzz only
- **WHEN** the countdown's buzz sequence is sounding and the manual buzz control is not engaged
- **THEN** the buzzer output is active

#### Scenario: Manual buzz only
- **WHEN** the manual buzz control is engaged and the countdown's buzz sequence is not sounding
- **THEN** the buzzer output is active

#### Scenario: Neither active
- **WHEN** the countdown's buzz sequence is not sounding and the manual buzz control is not engaged
- **THEN** the buzzer output is inactive

### Requirement: The seven-segment display always reflects the latest timer state
The TM1637 display SHALL show `READY` before any countdown has started. On every timer status update, the display SHALL show a three-letter status abbreviation (`STA`, `RUN`, `FIN`, `CAN`, or `UNK` for an unrecognized status) followed by the whole seconds remaining, and this update SHALL happen whether or not Socket.IO/WebSocket connectivity is enabled.

#### Scenario: Display before first countdown
- **WHEN** the Timer has started and no countdown has run yet
- **THEN** the display shows `READY`

#### Scenario: Display updates with WebSocket disabled
- **WHEN** a timer status update occurs while WebSocket connectivity is disabled
- **THEN** the display still updates to the status abbreviation and seconds remaining

### Requirement: Timer status broadcasts are non-blocking and skipped when WebSocket connectivity is disabled
A timer status update SHALL be queued for asynchronous delivery over Socket.IO rather than sent synchronously from the countdown thread, so a slow or dead network connection cannot delay the countdown or buzzer. WHEN WebSocket connectivity is disabled, no status update SHALL be queued for delivery. See `openspec/specs/timer-configuration/spec.md` for how WebSocket connectivity is enabled or disabled.

#### Scenario: Status update with WebSocket enabled
- **WHEN** a timer status update occurs while WebSocket connectivity is enabled
- **THEN** the status and seconds remaining are queued for delivery by the Socket.IO worker

#### Scenario: Status update with WebSocket disabled
- **WHEN** a timer status update occurs while WebSocket connectivity is disabled
- **THEN** nothing is queued for delivery over Socket.IO

### Requirement: Socket.IO status updates are delivered on the /timer namespace over WebSocket transport only
When WebSocket connectivity is enabled, the Timer SHALL connect to the configured Socket.IO server on the `/timer` namespace using WebSocket transport exclusively (no HTTP long-polling fallback), and SHALL emit each queued status update as a `timer` event on that connection.

#### Scenario: Connecting to the server
- **WHEN** the Timer establishes its Socket.IO connection
- **THEN** it connects on the `/timer` namespace with only the WebSocket transport enabled

#### Scenario: Delivering a queued update
- **WHEN** a status update is queued and the Socket.IO connection is active
- **THEN** the Timer emits it as a `timer` event carrying the status and seconds remaining

### Requirement: A failed delivery re-queues the update instead of dropping it
WHEN emitting a queued status update over Socket.IO fails, the Timer SHALL put that update back on the queue so it is retried rather than lost.

#### Scenario: Emit raises an error
- **WHEN** emitting a queued status update raises an error
- **THEN** the update is placed back on the queue for a later delivery attempt

### Requirement: The Socket.IO connection reconnects automatically after being dropped
WHEN the Socket.IO connection fails or is lost, the Timer SHALL wait approximately 2 seconds and then attempt to reconnect, repeating for as long as the Socket.IO worker is running.

#### Scenario: Connection drops during operation
- **WHEN** the Socket.IO connection is lost or a connection attempt fails
- **THEN** the Timer waits approximately 2 seconds and attempts to reconnect
