# Spec Delta

## MODIFIED Requirements

### Requirement: New subscribers see a default control state before the first broadcast
A client subscribing to the broadcast control stream before any `broadcast_control` message has arrived SHALL receive a default state (`showImageCard` true, every other visibility flag false, `followHeadJudge` false, all selections empty, `selectedRun` 0) rather than an empty or undefined value.

#### Scenario: Subscribing before any operator action
- **WHEN** a client subscribes to the broadcast control stream and no message has yet been relayed
- **THEN** it reads the default overlay control state

## ADDED Requirements

### Requirement: The controller offers a Follow head judge mode
The overlay controller SHALL offer a switch between Manual mode and Follow head judge mode, with Manual as the default, and SHALL carry the chosen mode in the emitted broadcast_control state as `followHeadJudge`.

In Follow head judge mode, the controller SHALL:
- disable its competition, heat, paddler, and run pickers, leaving the event and phase pickers usable;
- show an info message saying those pickers are disabled because the displays are following the head judge, naming the head judge's current athlete and run once known.

Switching mode SHALL NOT change any visibility flag.

#### Scenario: Switching to Follow
- **WHEN** the operator switches the controller to Follow head judge mode
- **THEN** the controller emits a broadcast_control state with `followHeadJudge` true and its visibility flags unchanged, and the competition, heat, paddler, and run pickers cannot be used while the event and phase pickers can

#### Scenario: The info message names the followed athlete
- **WHEN** the controller is in Follow head judge mode and the head judge is on an athlete's second run
- **THEN** the info message names that athlete and run 2

#### Scenario: Switching back to Manual
- **WHEN** the operator switches the controller from Follow head judge mode back to Manual
- **THEN** the controller emits a broadcast_control state with `followHeadJudge` false, the info message disappears, and every picker is usable again

### Requirement: Display pages follow the head judge's position when told to
When the most recent broadcast_control state has `followHeadJudge` true, the arena and broadcast overlay pages SHALL take the competition, heat, athlete, and run they display from the most recent position published on `/head_judge_selection`. They SHALL take everything else, including the event, phase, and visibility flags, from the broadcast_control state.

Until a head judge position has been received, they SHALL use the broadcast_control state's own selection. When `followHeadJudge` is false, they SHALL ignore the head judge's position entirely.

On entering follow, a display page SHALL request the head judge's current position, so that it does not wait for the head judge's next change.

#### Scenario: Head judge steps to the next paddler while followed
- **WHEN** `followHeadJudge` is true and the head judge steps to the next paddler
- **THEN** the arena page shows that paddler's surname, without the controller emitting anything

#### Scenario: Heat summary follows the head judge's heat
- **WHEN** `followHeadJudge` is true, `showHeatSummary` is true, and the head judge moves to a different heat
- **THEN** the arena's heat summary shows the head judge's new heat

#### Scenario: Phase results stay with the operator
- **WHEN** `followHeadJudge` is true and `showPhaseResults` is true
- **THEN** the arena's phase results show the phase selected on the controller, regardless of the head judge's selection

#### Scenario: Head judge changes paddler while in Manual mode
- **WHEN** `followHeadJudge` is false and the head judge steps to a different paddler
- **THEN** the arena page keeps showing the athlete from the broadcast_control state

#### Scenario: Follow switched on with no head judge position yet
- **WHEN** `followHeadJudge` becomes true and no head judge screen is open
- **THEN** the arena page keeps showing the broadcast_control state's athlete

#### Scenario: Follow switched on while a head judge is already on an athlete
- **WHEN** a head judge screen is open on an athlete and `followHeadJudge` becomes true
- **THEN** the arena page requests the head judge's position and shows that athlete, without the head judge changing anything

### Requirement: Display pages recover the current control state on connect
Every client that subscribes to the broadcast control stream SHALL request the current control state each time its `/broadcast_control` connection is established, including after a reconnect. An open overlay controller SHALL answer each request by emitting its current broadcast_control state again. With no controller open, the requester SHALL keep the default control state.

#### Scenario: Arena page reloads while the controller sits idle in Follow mode
- **WHEN** the controller is idle in Follow head judge mode, a head judge screen is on an athlete, and the arena page is reloaded
- **THEN** the arena page recovers `followHeadJudge` from the controller, requests the head judge's position, and shows the head judge's athlete

#### Scenario: Arena page reloads while the controller sits idle in Manual mode
- **WHEN** the controller has an athlete selected in Manual mode and is idle, and the arena page is reloaded
- **THEN** the arena page shows that athlete once it reconnects, without anyone touching the controller

#### Scenario: No controller is open
- **WHEN** a display page connects and requests the control state, and no controller is open
- **THEN** the display page keeps showing the default control state
