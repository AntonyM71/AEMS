## MODIFIED Requirements

### Requirement: Some toggles require a prerequisite selection
Toggling `showEventTitle`, `showHeatSummary`, or `showPhaseResults` on SHALL require, respectively, a selected event, heat, or phase. Toggling `showLiveRunScore` or `showAthleteOverview` on SHALL require a selected athlete. Toggling `showCompetitionOverview` on SHALL require a selected competition. When the required selection is missing, the controller SHALL show an error message instead of changing the flag. Turning a flag that is already on off SHALL NOT require a selection.

#### Scenario: Toggling heat summary without a selected heat
- **WHEN** the operator clicks "Heat summary" with no heat selected
- **THEN** the controller shows an error message and `showHeatSummary` is not changed

#### Scenario: Toggling the athlete overview without a selected athlete
- **WHEN** the operator clicks "Athlete overview" with no athlete selected
- **THEN** the controller shows an error message and `showAthleteOverview` is not changed

#### Scenario: Toggling the competition overview without a selected competition
- **WHEN** the operator clicks "Competition overview" with no competition selected
- **THEN** the controller shows an error message and `showCompetitionOverview` is not changed

#### Scenario: Turning a graphic off without its selection
- **WHEN** a graphic is on and its required selection is no longer present
- **THEN** clicking its toggle turns it off without an error message

### Requirement: The overlay and the arena both gate the same modals from the same relayed state
The fullscreen broadcast overlay page and the arena venue-screen page SHALL each show or hide their heat-summary, phase-results, and event-title displays according to the `showHeatSummary`, `showPhaseResults`, and `showEventTitle` flags of the same control state relayed from the server, independent of which page the operator's controller instance is paired with.

#### Scenario: Operator toggles heat summary on the controller
- **WHEN** the operator selects a heat and turns on "Heat summary"
- **THEN** the arena page, subscribed to the same broadcast_control stream, displays that heat's summary

#### Scenario: Operator toggles heat summary off
- **WHEN** the operator turns "Heat summary" back off
- **THEN** the heat summary is no longer displayed on the arena page

## ADDED Requirements

### Requirement: Each visibility toggle shows whether its graphic is on air
Each visibility toggle on the controller SHALL show, in visible text and in a pressed state that assistive technology can read, whether its graphic is currently on. The state SHALL NOT be conveyed by colour alone.

#### Scenario: A graphic that is on
- **WHEN** the controller's state has the ICF logo on, as it does by default
- **THEN** the "ICF logo" toggle reads "On air" and is reported as pressed

#### Scenario: Turning a graphic off
- **WHEN** the operator clicks the "ICF logo" toggle while the logo is on
- **THEN** the toggle reads "Off", is reported as not pressed, and the emitted control state has `showImageCard` false
