# Spec Delta

## Purpose

Lets an operator control what's shown on the on-venue screen and the TV/CG broadcast overlay from a single control panel.

## ADDED Requirements

### Requirement: Toggling a display option broadcasts the operator's full current state
Toggling any display option in the control panel SHALL broadcast the operator's complete current selection - every display option and every current competition/event/phase/heat/athlete/run selection - to every connected viewer.

#### Scenario: An operator toggles a display option
- **WHEN** an operator toggles a display option in the control panel
- **THEN** every connected viewer receives the operator's complete current state, not just the toggled option

### Requirement: A toggle that depends on an unmade selection is blocked
Toggling the event-title, heat-summary, or phase-results display options SHALL be blocked, with an on-screen message, when their respective required selection (an event, a heat, or a phase) has not been made.

#### Scenario: Toggling event title with no event selected
- **WHEN** an operator toggles the event-title option with no event selected
- **THEN** the toggle is blocked and an on-screen message is shown

#### Scenario: Toggling heat summary with no heat selected
- **WHEN** an operator toggles the heat-summary option with no heat selected
- **THEN** the toggle is blocked and an on-screen message is shown

#### Scenario: Toggling phase results with no phase selected
- **WHEN** an operator toggles the phase-results option with no phase selected
- **THEN** the toggle is blocked and an on-screen message is shown

### Requirement: The venue screen always shows the live timer
The on-venue screen SHALL always show the live timer, regardless of any display option.

#### Scenario: Viewing the venue screen
- **WHEN** the venue screen is displayed
- **THEN** the live timer is shown

### Requirement: The venue screen's current-athlete details follow the live-run-score option
The venue screen's current athlete info, run details, and live run score SHALL be shown when the live-run-score option is on, and hidden when it is off.

#### Scenario: The live-run-score option is on
- **WHEN** the live-run-score option is on
- **THEN** the venue screen shows the current athlete's info, run details, and live run score

#### Scenario: The live-run-score option is off
- **WHEN** the live-run-score option is off
- **THEN** the venue screen hides the current athlete's info, run details, and live run score

### Requirement: The venue screen shows a fullscreen takeover for event title, heat summary, or phase results
When the event-title, heat-summary, or phase-results option is on, the venue screen SHALL show that content as a fullscreen takeover.

#### Scenario: The heat-summary option is on
- **WHEN** the heat-summary option is on
- **THEN** the venue screen shows the heat summary as a fullscreen takeover

### Requirement: Only three of the six display options currently affect the broadcast overlay
Toggling the event-title, heat-summary, or phase-results options SHALL change what is shown on the broadcast (TV/CG) overlay. Toggling the ICF-logo, live-run-score, or timer options SHALL NOT have any visible effect on the broadcast overlay.

#### Scenario: Toggling a wired option
- **WHEN** the event-title, heat-summary, or phase-results option is toggled
- **THEN** the broadcast overlay's display changes accordingly

#### Scenario: Toggling an unwired option
- **WHEN** the ICF-logo, live-run-score, or timer option is toggled
- **THEN** the broadcast overlay's display does not change

### Requirement: A broadcast overlay element plays as an animated frame sequence
An element shown on the broadcast overlay SHALL play as a full-screen animated sequence of frames - an intro, a held frame, and an outro - rather than appearing or disappearing instantly.

#### Scenario: An overlay element becomes visible
- **WHEN** an overlay element's option is turned on
- **THEN** the element plays its animated frame sequence rather than appearing instantly

### Requirement: An overlay element's intro plays up to its hold frame
When an overlay element becomes visible, it SHALL play its intro by advancing frame by frame from its first frame up to its hold frame, then remain on its hold frame until its option is turned off.

#### Scenario: An element's intro completes
- **WHEN** an overlay element's intro reaches its hold frame
- **THEN** the element's content is displayed and the element remains on its hold frame

### Requirement: Turning off a held overlay element plays its outro
When a held overlay element's option is turned off, it SHALL play its outro by advancing frame by frame from its hold frame to its last frame.

#### Scenario: A held element's option is turned off
- **WHEN** a held overlay element's option is turned off
- **THEN** the element plays its outro from its hold frame to its last frame

### Requirement: Turning off an overlay element mid-intro lets the intro finish before the outro plays
When an overlay element's option is turned off while its intro is still playing, the intro SHALL finish reaching the hold frame before the outro plays.

#### Scenario: An element's option is turned off during its intro
- **WHEN** an overlay element's option is turned off while its intro is still advancing toward the hold frame
- **THEN** the intro continues to the hold frame, then the outro plays

### Requirement: An overlay element's content disappears as soon as its option is turned off
An overlay element's displayed content SHALL stop being shown as soon as its option is turned off, even before its outro animation has finished playing.

#### Scenario: An element's option is turned off while held
- **WHEN** a held overlay element's option is turned off
- **THEN** its content stops being shown immediately, while its outro animation is still playing

### Requirement: An overlay element with no room for an outro simply stops being rendered
When an overlay element's hold frame is also its last frame, turning its option off SHALL stop it being rendered without playing an outro animation.

#### Scenario: The hold frame is the last frame
- **WHEN** a held overlay element whose hold frame is its last frame has its option turned off
- **THEN** it stops being rendered without an outro animation

### Requirement: Turning an overlay element back on after its outro replays the intro
An overlay element whose outro has finished playing SHALL, when its option is turned back on, play its intro again from the first frame.

#### Scenario: Re-enabling a finished element
- **WHEN** an overlay element's option is turned back on after its outro has finished
- **THEN** the element plays its intro again from the first frame

### Requirement: A broadcast overlay element with no loadable frame sequence renders nothing
When an overlay element's frame sequence cannot be loaded, the broadcast overlay SHALL render nothing for that element rather than showing an error.

#### Scenario: A frame sequence fails to load
- **WHEN** an overlay element's frame sequence cannot be loaded
- **THEN** the broadcast overlay shows nothing for that element and does not display an error

### Requirement: The live timer reflects the most recently received value
Wherever the live timer is displayed, it SHALL show the most recently received timer value.

#### Scenario: A new timer value is received
- **WHEN** a new timer value is received
- **THEN** the displayed timer updates to that value
