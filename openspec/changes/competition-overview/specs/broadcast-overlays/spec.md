# Spec Delta

## ADDED Requirements

### Requirement: The competition overview shows the competition's events or heats with the current one marked
The broadcast overlay SHALL show a competition overview while `showCompetitionOverview` is true. It SHALL show the selected competition's name with "Events" or "Heats" beneath it, matching `competitionOverviewList`. Below that, it SHALL show a rail of that competition's events or heats as a single row of named steps, in name order with numbers compared numerically, so "Heat 2" comes before "Heat 10". The step for the selected event or heat SHALL be bold and in the alternate colour, and steps before it SHALL be muted. When no event or heat in the list is selected, no step SHALL be marked.

#### Scenario: Listing events
- **WHEN** `competitionOverviewList` is "events" and the competition has the events "Men's K1", "Women's K1" and "Men's C1", with "Women's K1" selected
- **THEN** the overview shows the competition name, "Events", and the rail "Men's C1", "Men's K1", "Women's K1", with "Women's K1" marked as current and the two before it muted

#### Scenario: Listing heats in number order
- **WHEN** `competitionOverviewList` is "heats" and the competition has heats "Heat 1", "Heat 2" and "Heat 10", with "Heat 2" selected
- **THEN** the rail shows "Heat 1", "Heat 2", "Heat 10" in that order, with "Heat 2" marked as current

### Requirement: Long competition overview lists show a window around the current entry
When the competition overview's list has more than 8 entries, the rail SHALL show 8 consecutive entries chosen to keep the current entry in view with entries either side of it where the list allows, and SHALL end with a note giving the range shown and the total, such as "4–11 of 12". With 8 or fewer entries, it SHALL show them all and no note.

#### Scenario: Current heat in the middle of a long list
- **WHEN** the list has 12 heats and "Heat 7" is selected
- **THEN** the rail shows "Heat 4" to "Heat 11" and the note "4–11 of 12"

#### Scenario: Current heat near the end
- **WHEN** the list has 12 heats and "Heat 12" is selected
- **THEN** the rail shows "Heat 5" to "Heat 12" and the note "5–12 of 12"

### Requirement: The competition overview uses frame-sequence graphics with a fallback backdrop
The competition overview SHALL be presented through a fullscreen frame-sequence overlay with the graphics-pack config `competitionOverview`, and in fallback mode SHALL draw its own ICF-coloured backdrop with no external assets.

#### Scenario: No graphics pack for the competition overview
- **WHEN** the graphics server has no `competitionOverview` config and the operator shows the competition overview
- **THEN** the overview is shown over its fallback backdrop

### Requirement: The operator chooses what the competition overview lists
The control state SHALL carry `competitionOverviewList`, either "events" or "heats", defaulting to "events". The controller SHALL let the operator switch it, and SHALL relay the choice with the rest of the control state.

#### Scenario: Switching to heats
- **WHEN** the operator chooses "Heats" for the competition overview in the controller
- **THEN** the emitted control state carries `competitionOverviewList` "heats" and the overlay's rail lists the competition's heats

## MODIFIED Requirements

### Requirement: Independent visibility toggles
The control state SHALL carry independent boolean flags (`showImageCard`, `showEventTitle`, `showHeatSummary`, `showPhaseResults`, `showLiveRunScore`, `showAthleteOverview`, `showCompetitionOverview`) that the operator can flip one at a time without affecting the others.

#### Scenario: Operator toggles a flag
- **WHEN** the operator clicks a visibility toggle button on the controller
- **THEN** only that flag's value is inverted in the emitted control state

### Requirement: Some toggles require a prerequisite selection
Toggling `showEventTitle`, `showHeatSummary`, or `showPhaseResults` on SHALL require, respectively, a selected event, heat, or phase. Toggling `showLiveRunScore` or `showAthleteOverview` on SHALL require a selected athlete. Toggling `showCompetitionOverview` on SHALL require a selected competition. When the required selection is missing, the controller SHALL show an error message instead of changing the flag.

#### Scenario: Toggling heat summary without a selected heat
- **WHEN** the operator clicks "Show Heat Summary Modal" with no heat selected
- **THEN** the controller shows an error message and `showHeatSummary` is not changed

#### Scenario: Toggling the athlete overview without a selected athlete
- **WHEN** the operator clicks "Show Athlete Overview" with no athlete selected
- **THEN** the controller shows an error message and `showAthleteOverview` is not changed

#### Scenario: Toggling the competition overview without a selected competition
- **WHEN** the operator clicks "Show Competition Overview" with no competition selected
- **THEN** the controller shows an error message and `showCompetitionOverview` is not changed

### Requirement: Fullscreen overlays draw ICF-coloured fallback backdrops that contrast with their text
In fallback mode, the fullscreen broadcast overlays (event title, heat summary, phase results, athlete overview, run corner, competition overview) SHALL draw their own backdrops with plain page styling and no external assets. The backdrops SHALL use ICF colours with simple gradients. White heading and footer text SHALL sit on a dark ICF-blue panel, and dark-blue table rows and run counts SHALL sit on a light panel, so every line of overlay text contrasts with the colour behind it over any live video.

#### Scenario: Scoreboard overlay in fallback mode
- **WHEN** the heat summary or phase results overlay is visible in fallback mode
- **THEN** its heading and page footer are drawn on a dark ICF-blue panel and its table header and rows on a light panel

#### Scenario: Event title in fallback mode
- **WHEN** the event title overlay is visible in fallback mode
- **THEN** the competition, event and phase names are drawn on a dark ICF-blue band and the run counts on a light band

#### Scenario: Lower third in fallback mode
- **WHEN** the athlete overview or run corner is visible in fallback mode
- **THEN** its name and event rows are drawn on a dark ICF-blue panel, its run or clock row on a light panel, and its bib tile and score box in the alternate colour

#### Scenario: Competition overview in fallback mode
- **WHEN** the competition overview is visible in fallback mode
- **THEN** the competition name is drawn on a dark ICF-blue band, the rail of events or heats on a light band, and the current entry in the alternate colour
