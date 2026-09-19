# judging-workflow Specification

## Purpose

Defines the judge/scribe scoring UI workflow — role selection, per-judge move and bonus entry, live cross-judge aggregation on the head judge's screen, run locking, and DNS marking — that produces the data the `scoring` capability turns into results. See `openspec/specs/scoring/spec.md` for how moves, bonuses, and run statuses are turned into scores; this spec does not restate that math.

## Requirements

### Requirement: The judging page offers one entry point per judge slot plus head judge and commentator roles
The judging page SHALL show one "Scribe N" entry point per judge configured on the selected heat's phase(s) (using the highest `number_of_judges` across those phases, minimum 1), plus one "Head Judge" entry point and one "Commentator" entry point.

#### Scenario: Phase configured for multiple judges
- **WHEN** a heat's phase has `number_of_judges` set to a value greater than 1
- **THEN** the judging page shows that many "Scribe N" buttons, numbered from 1

#### Scenario: No phase data yet
- **WHEN** a heat is selected but its phase data has not loaded
- **THEN** the judging page shows at least one "Scribe" entry point

### Requirement: Role entry points are disabled when the heat has no paddlers
The judging page SHALL disable every role entry point (scribe, head judge, commentator) and show a warning when the selected heat has no athletes entered.

#### Scenario: Heat with no paddlers
- **WHEN** the selected heat has zero athletes
- **THEN** a "Cannot Judge a heat with no paddlers" warning is shown and the scribe, head judge, and commentator buttons are all disabled

#### Scenario: Heat with paddlers
- **WHEN** the selected heat has at least one athlete
- **THEN** the warning is not shown and the role entry points are enabled

### Requirement: A scribe records moves for the current athlete's run
The scribe screen SHALL present one control per move on the current athlete's scoresheet, and tapping a direction on a move SHALL add a scored move for that judge, athlete, and run.

#### Scenario: A judge taps a move's direction
- **WHEN** a scribe taps a direction button on a move card
- **THEN** a new scored move is added to that judge's list for the current athlete and run, using that move and direction

### Requirement: Scored moves and bonuses submit to the server automatically
The scribe screen SHALL submit the judge's current scored moves and bonuses to the server whenever they change locally, without a separate save action, replacing what the server previously held for that heat/athlete/run/judge.

#### Scenario: A move is added
- **WHEN** a scribe adds a scored move
- **THEN** a request carrying that judge's full current move list for the heat, athlete, and run reaches the server

#### Scenario: Previously recorded moves are loaded on open
- **WHEN** the scribe screen loads a judge's previously recorded moves from the server on mount
- **THEN** that load does not itself trigger a submission back to the server

### Requirement: A locked run blocks scribe scoring
The scribe screen SHALL disable move entry and show a notice when the current athlete's run is locked, and SHALL NOT submit scores while it is locked.

#### Scenario: Run is locked
- **WHEN** the current athlete's run status is locked
- **THEN** the scribe screen shows "Run has been locked by head judge", move controls are disabled, and no score submission is sent

### Requirement: Removing a scored move requires a double click and clears its bonuses
A scored move SHALL only be removed on a double click of its remove control; a single click SHALL show a warning instead. Removing a scored move SHALL also remove any bonuses scored on it.

#### Scenario: Single click on remove
- **WHEN** a judge single-clicks a scored move's remove control
- **THEN** a "Double Click to delete" warning is shown and the move is not removed

#### Scenario: Double click on remove
- **WHEN** a judge double-clicks a scored move's remove control
- **THEN** the scored move and every bonus scored on it are removed

#### Scenario: Actions disabled
- **WHEN** chip actions are disabled for a scored move (e.g. on the head judge's read-only display, or while the run is locked)
- **THEN** no remove control is shown for that move

### Requirement: A bonus is scored by tapping its chip and toggles off on a second tap
Tapping an available bonus's chip on a scored move SHALL score that bonus on that move; tapping an already-scored bonus's chip SHALL remove it. A bonus whose configured score is zero SHALL be shown disabled and cannot be toggled.

#### Scenario: Scoring a bonus
- **WHEN** a judge taps an unscored bonus's chip on a move
- **THEN** that bonus is added, linked to that move

#### Scenario: Un-scoring a bonus
- **WHEN** a judge taps an already-scored bonus's chip on a move
- **THEN** that bonus is removed from that move

#### Scenario: Zero-value bonus
- **WHEN** a bonus's configured score is 0
- **THEN** its chip is shown disabled and does not respond to taps

### Requirement: Judges step through the heat's paddlers and runs, wrapping at the ends
The paddler selector SHALL step to the next or previous athlete in the heat, wrapping from the last athlete back to the first and vice versa; wrapping past the last athlete to the first SHALL also advance to the next run.

#### Scenario: Stepping past the last paddler
- **WHEN** a judge steps to the next paddler from the last paddler in the heat
- **THEN** the selection wraps to the first paddler and the selected run advances by one

### Requirement: The head judge screen shows each judge's live moves, bonuses, and mean score
The head judge screen SHALL display every configured judge's currently scored moves and bonuses for the selected athlete and run, updating live as each judge scores, and SHALL show the athlete's score as the mean of the judges' individual totals — or "DNS" when the run is marked did-not-start.

#### Scenario: One judge scores
- **WHEN** a single judge scores a move on the current athlete's run
- **THEN** the head judge screen shows that judge's move and displays the score as that judge's total

#### Scenario: A second judge scores
- **WHEN** a second judge then scores a different move on the same run
- **THEN** the head judge screen keeps each judge's moves in a separate list and displays the score as the mean of both judges' totals

#### Scenario: A judge re-scores
- **WHEN** a judge who already has scored moves for this run sends an updated set
- **THEN** the head judge screen replaces that judge's prior moves with the new set rather than adding to them

#### Scenario: Run marked did-not-start
- **WHEN** the current athlete's run is marked did-not-start
- **THEN** the head judge screen shows "DNS" instead of a numeric score

### Requirement: The head judge can lock a run, and the control reflects only server-confirmed state
The head judge screen SHALL offer a control to lock or unlock the current athlete's run, and that control's displayed state SHALL change only once the server confirms the new run status, not immediately on click.

#### Scenario: Head judge locks a run
- **WHEN** the head judge clicks "Lock Run"
- **THEN** a lock request for that heat/athlete/run is sent, the button still reads "Lock Run" until the server confirms, and it changes to "Unlock Run" once the server broadcasts the confirmed locked status

### Requirement: The head judge can mark a run did-not-start, but not while it is locked
The head judge screen SHALL offer a control to toggle did-not-start for the current athlete's run, and SHALL refuse to change did-not-start while the run is locked, showing an error instead.

#### Scenario: Setting DNS while locked
- **WHEN** the head judge attempts to set DNS on a run that is currently locked
- **THEN** an error "Please unlock run before setting DNS" is shown, the run's DNS state is not changed, and no run status update is sent

#### Scenario: Setting DNS while unlocked
- **WHEN** the head judge attempts to set DNS on a run that is not locked
- **THEN** a did-not-start update for that heat/athlete/run is sent

### Requirement: Run status changes broadcast to every subscriber in real time
Emitting a run status change (lock state or did-not-start) over the `/run_status` Socket.IO namespace SHALL persist it and broadcast the confirmed value to every subscriber on that namespace, including scribe screens for the same run.

#### Scenario: Head judge locks a run while a scribe has it open
- **WHEN** the head judge locks a run
- **THEN** the scribe screen for that same athlete/run receives the update and shows the run as locked

### Requirement: Score submissions broadcast to the head judge in real time
Submitting a judge's scored moves and bonuses SHALL cause the server to broadcast that judge's updated moves and bonuses, for that heat/athlete/run, over the `/current_scores` Socket.IO namespace.

#### Scenario: A scribe submits a score
- **WHEN** a scribe's scored moves and bonuses are persisted
- **THEN** the server broadcasts that judge's updated moves and bonuses on `/current_scores`, scoped to that heat, athlete, and run

### Requirement: A locked run's score submissions are rejected by the server
The server SHALL reject a score submission for a heat/athlete/run whose run status is locked, independent of any client-side restriction.

#### Scenario: Submission targets a locked run
- **WHEN** a score submission request targets a heat/athlete/run whose run status is locked
- **THEN** the server does not persist the submitted moves or bonuses and returns an error

### Requirement: Real-time judging channels connect over WebSocket transport only
The `/run_status` and `/current_scores` Socket.IO connections SHALL be established using the WebSocket transport only, without falling back to HTTP long-polling.

#### Scenario: Opening a run-status or current-scores connection
- **WHEN** the frontend opens a connection to `/run_status` or `/current_scores`
- **THEN** the connection is configured with `transports: ["websocket"]` and no other transport
