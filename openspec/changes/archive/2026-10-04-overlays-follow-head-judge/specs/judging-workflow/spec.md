# Spec Delta

## ADDED Requirements

### Requirement: The head judge screen publishes its current position in real time
The head judge screen SHALL publish its current position over the `/head_judge_selection` Socket.IO namespace whenever any part of that position changes. The position is the selected competition, heat, athlete, and run number; the screen does not publish its event or phase selection. The screen SHALL also publish its position again whenever any client on that namespace requests it. The server SHALL relay each published position to every client connected to that namespace.

#### Scenario: Head judge moves to the next paddler
- **WHEN** the head judge steps to the next paddler in the heat
- **THEN** a position naming that paddler's athlete, together with the head judge's current competition, heat, and run, is published on `/head_judge_selection`

#### Scenario: Head judge changes run
- **WHEN** the head judge changes the selected run
- **THEN** a position carrying the new run number is published on `/head_judge_selection`

#### Scenario: Head judge changes phase only
- **WHEN** the head judge changes their selected phase without changing heat, paddler, or run
- **THEN** no new position is published

#### Scenario: A late joiner asks for the current position
- **WHEN** a client connects to `/head_judge_selection` and requests the current position while a head judge screen is open
- **THEN** the head judge screen publishes its current position again, without waiting for it to change

#### Scenario: Server relays a published position
- **WHEN** a client publishes a position on `/head_judge_selection`
- **THEN** every client connected to that namespace receives it

## MODIFIED Requirements

### Requirement: Real-time judging channels connect over WebSocket transport only
The `/run_status`, `/current_scores`, and `/head_judge_selection` Socket.IO connections SHALL be established using the WebSocket transport only, without falling back to HTTP long-polling.

#### Scenario: Opening a run-status or current-scores connection
- **WHEN** the frontend opens a connection to `/run_status` or `/current_scores`
- **THEN** the connection is configured with `transports: ["websocket"]` and no other transport

#### Scenario: Opening a head-judge-selection connection
- **WHEN** the frontend opens a connection to `/head_judge_selection`
- **THEN** the connection is configured with `transports: ["websocket"]` and no other transport
