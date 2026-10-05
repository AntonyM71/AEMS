# Spec Delta

## ADDED Requirements

### Requirement: The athlete overview lower third shows the athlete's runs and total
The broadcast overlay SHALL show an athlete overview lower third while `showAthleteOverview` is true. It SHALL be laid out as follows:
- the selected athlete's bib in a tile spanning both rows;
- a first row with the athlete's first name, upper-cased last name and affiliation as text;
- a second row with one cell for every run in the athlete's phase, in run order, each labelled "Run n" above its score, so the graphic keeps one width as runs are scored;
- the athlete's total, labelled "Total", at the end of the second row in a box of the alternate colour.

A run is final once the head judge locks it or marks it did-not-start. A run that is not final SHALL show "-" instead of its score, so a partly judged score never goes to air. A did-not-start run SHALL show "DNS" in a muted colour. The total SHALL be the sum of the athlete's best final run scores, up to the phase's number of scoring runs, with a did-not-start run counting as zero.

#### Scenario: Athlete with two locked runs
- **WHEN** the operator shows the athlete overview for an athlete in a phase with two scoring runs, whose locked runs scored 340.00 and 512.50
- **THEN** the lower third shows the athlete's bib, name and affiliation, a "Run 1" cell with 340.00 and a "Run 2" cell with 512.50, and 852.50 in the highlighted "Total" box

#### Scenario: A run still being judged
- **WHEN** one of the athlete's runs has scores but is not yet locked
- **THEN** that run's cell shows "-" and the run does not count towards the total

#### Scenario: Before any run is final
- **WHEN** the operator shows the athlete overview for an athlete in a three-run phase with no final runs
- **THEN** the lower third shows "Run 1", "Run 2" and "Run 3" cells, each with "-"

#### Scenario: A did-not-start run
- **WHEN** one of the athlete's runs is marked did-not-start
- **THEN** that run's cell shows "DNS"

#### Scenario: A newly locked run appears without a reload
- **WHEN** the head judge locks a run, or marks it did-not-start, while the athlete overview is visible
- **THEN** the run's score or "DNS" replaces its "-", and the updated total appears, as soon as the lock is broadcast, without the operator reloading or re-showing it

### Requirement: The run corner shows who is running, the time left and the live score
The broadcast overlay SHALL show a run corner in the lower right of the screen while `showLiveRunScore` is true. It SHALL have three rows:
1. the selected athlete's affiliation as text, then their name;
2. the seconds remaining in the run, a bar showing the fraction of the run left, and the live run score labelled "Live" in a box of the alternate colour;
3. the selected event's name, the selected heat's name, and the run counter as "Run x/y".

The time remaining, the bar and the live run score SHALL update as the timer and judges' scores change. The live run score SHALL show "DNS" for a did-not-start run. The bar SHALL measure the run against its full length: 60 seconds when more than 45 seconds remain at any point, otherwise 45 seconds, matching the Timer's two modes. The seconds and the bar SHALL turn the warning colour once 10 seconds or fewer remain, matching the Timer's 10-second warning buzz.

#### Scenario: Athlete mid-run
- **WHEN** the operator shows the live run score for an athlete on run 2 of 3 in "Heat 2" of "Men's K1" with 36 seconds left and a live score of 90.00
- **THEN** the run corner shows the athlete's affiliation and name, "36" with the bar at 36/45 full, "90.00" in the "Live" box, and "Men's K1", "Heat 2" and "Run 2/3"

#### Scenario: Timer counts down
- **WHEN** the timer stream reports a lower time remaining
- **THEN** the run corner's seconds and bar update to the new value

#### Scenario: Squirt-mode run
- **WHEN** the timer stream reports 52 seconds remaining
- **THEN** the bar measures the run against 60 seconds

#### Scenario: Final ten seconds
- **WHEN** 10 or fewer seconds remain
- **THEN** the seconds and the bar are drawn in the warning colour

### Requirement: The athlete overview and run corner use frame-sequence graphics with fallback backdrops
The athlete overview and run corner SHALL each be presented through a fullscreen frame-sequence overlay, with graphics-pack configs named `athleteOverview` and `runCorner` respectively. In fallback mode, each SHALL draw ICF-coloured backdrops with no external assets: the name rows and the run corner's event row on a dark ICF-blue panel, the overview's run row and the corner's clock row on a light panel, and the bib tile and the total and live-score boxes in the alternate colour.

#### Scenario: No graphics pack for the athlete overview
- **WHEN** the graphics server has no `athleteOverview` config and the operator shows the athlete overview
- **THEN** the lower third is shown over its fallback backdrop

## MODIFIED Requirements

### Requirement: Independent visibility toggles
The control state SHALL carry independent boolean flags (`showImageCard`, `showEventTitle`, `showHeatSummary`, `showPhaseResults`, `showLiveRunScore`, `showAthleteOverview`) that the operator can flip one at a time without affecting the others.

#### Scenario: Operator toggles a flag
- **WHEN** the operator clicks a visibility toggle button on the controller
- **THEN** only that flag's value is inverted in the emitted control state

### Requirement: Some toggles require a prerequisite selection
Toggling `showEventTitle`, `showHeatSummary`, or `showPhaseResults` on SHALL require, respectively, a selected event, heat, or phase. Toggling `showLiveRunScore` or `showAthleteOverview` on SHALL require a selected athlete. When the required selection is missing, the controller SHALL show an error message instead of changing the flag.

#### Scenario: Toggling heat summary without a selected heat
- **WHEN** the operator clicks "Show Heat Summary Modal" with no heat selected
- **THEN** the controller shows an error message and `showHeatSummary` is not changed

#### Scenario: Toggling the athlete overview without a selected athlete
- **WHEN** the operator clicks "Show Athlete Overview" with no athlete selected
- **THEN** the controller shows an error message and `showAthleteOverview` is not changed

### Requirement: Fullscreen overlays draw ICF-coloured fallback backdrops that contrast with their text
In fallback mode, the fullscreen broadcast overlays (event title, heat summary, phase results, athlete overview, run corner) SHALL draw their own backdrops with plain page styling and no external assets. The backdrops SHALL use ICF colours with simple gradients. White heading and footer text SHALL sit on a dark ICF-blue panel, and dark-blue table rows and run counts SHALL sit on a light panel, so every line of overlay text contrasts with the colour behind it over any live video.

#### Scenario: Scoreboard overlay in fallback mode
- **WHEN** the heat summary or phase results overlay is visible in fallback mode
- **THEN** its heading and page footer are drawn on a dark ICF-blue panel and its table header and rows on a light panel

#### Scenario: Event title in fallback mode
- **WHEN** the event title overlay is visible in fallback mode
- **THEN** the competition, event and phase names are drawn on a dark ICF-blue band and the run counts on a light band

#### Scenario: Lower third in fallback mode
- **WHEN** the athlete overview or run corner is visible in fallback mode
- **THEN** its name and event rows are drawn on a dark ICF-blue panel, its run or clock row on a light panel, and its bib tile and score box in the alternate colour
