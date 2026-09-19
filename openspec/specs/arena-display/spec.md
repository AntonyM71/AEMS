# arena-display Specification

## Purpose
Shows the current athlete, heat, and a live countdown on the arena's venue monitor, updated in real time over Socket.IO, with heat/phase/event summaries a broadcast operator can push onto the screen on demand.

## Requirements

### Requirement: Live countdown timer tracks the timer stream
The arena display SHALL show the most recently received `time_remaining` value from the `timer` Socket.IO stream, rounded to the nearest whole second, and SHALL NOT base what it displays on any other field of that event.

#### Scenario: No timer event received yet
- **WHEN** the arena display has not yet received a `timer` event
- **THEN** the countdown shows 0

#### Scenario: A timer update replaces the displayed value
- **WHEN** a `timer` event arrives carrying `time_remaining`
- **THEN** the countdown updates to that value, replacing whatever was shown before

#### Scenario: The displayed value reflects only the time-remaining field
- **WHEN** a `timer` event arrives with a `time_remaining` value (the Timer app also sends a `started`/`running`/`finished`/`cancelled` status in the same event)
- **THEN** the arena shows only the rounded `time_remaining` number; there is no separate visual state for the status

### Requirement: Broadcast operator selects the shown athlete
The arena display SHALL show the athlete the broadcast operator has selected via the `broadcast_control` Socket.IO stream, independent of which modal (if any) is currently shown.

#### Scenario: Operator selects an athlete
- **WHEN** the broadcast operator pushes a `broadcast_control` update selecting an athlete
- **THEN** the arena shows that athlete's surname in uppercase

#### Scenario: Athlete display persists across modal changes
- **WHEN** the broadcast operator hides a modal (e.g. turns off the heat summary) without changing the selected athlete
- **THEN** the selected athlete remains shown

### Requirement: Heat summary is a full-screen modal toggled by the broadcast operator
The arena display SHALL show the heat summary as a full-screen sliding modal when the broadcast operator's `showHeatSummary` flag is true, displaying the detail of the heat the operator has selected, and SHALL hide it when the flag is false.

#### Scenario: Operator turns on the heat summary
- **WHEN** the broadcast operator selects a heat and sets `showHeatSummary` true
- **THEN** a full-screen modal appears showing that heat's own detail

#### Scenario: Operator turns off the heat summary
- **WHEN** the broadcast operator sets `showHeatSummary` false
- **THEN** the heat summary modal is no longer shown

### Requirement: Phase results and event title are also full-screen sliding modals
The arena display SHALL show the phase results table as a full-screen sliding modal when `showPhaseResults` is true, and the event title as a full-screen sliding modal when `showEventTitle` is true.

#### Scenario: Operator turns on phase results
- **WHEN** the broadcast operator sets `showPhaseResults` true
- **THEN** the phase results table appears as a full-screen modal

#### Scenario: Operator turns on the event title
- **WHEN** the broadcast operator sets `showEventTitle` true
- **THEN** the event title appears as a full-screen modal

### Requirement: Final score reflects run status, including did-not-start
The arena display SHALL show the selected athlete's live final score, defaulting to 0.00 before any run status is known, and SHALL show "DNS" once the `run_status` stream marks that run as did-not-start.

#### Scenario: No run status received yet
- **WHEN** the arena display has not yet received a `run_status` event for the selected athlete's run
- **THEN** the final score shows 0.00

#### Scenario: Run marked did-not-start
- **WHEN** a `run_status` event marks the selected athlete's run as `did_not_start`
- **THEN** the final score shows "DNS" instead of a numeric value

### Requirement: Arena theme renders self-contained dark panels
The arena display SHALL render its cards as opaque dark panels on a solid background, distinct from the broadcast overlay's transparent frame that composites the same cards over animated artwork.

#### Scenario: Card renders as an opaque dark panel
- **WHEN** a card (e.g. the heat summary) renders on the arena
- **THEN** it has a solid dark background rather than a transparent overlay panel

#### Scenario: Layout uses normal in-flow positioning
- **WHEN** a card's heading or divider renders on the arena
- **THEN** it lays out in normal document flow, not the overlay's absolutely-positioned frame chrome

#### Scenario: Tables size to their own content
- **WHEN** a table (e.g. phase results) renders on the arena
- **THEN** it sizes to its own content, without the overlay's fixed frame row heights, border rules, or blank padding rows
