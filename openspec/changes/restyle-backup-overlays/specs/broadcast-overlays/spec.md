# Spec Delta

## MODIFIED Requirements

### Requirement: Fullscreen overlays draw ICF-coloured fallback backdrops that contrast with their text
In fallback mode, the fullscreen broadcast overlays (event title, heat summary, phase results, athlete overview, run corner, competition overview) SHALL draw their own backdrops with plain page styling and no external assets. The backdrops SHALL use ICF colours with simple gradients. Every line of overlay text SHALL sit on a panel it contrasts with over any live video: white text on a dark ICF-blue panel, and dark-blue text on a light panel or on a box in the alternate colour.

#### Scenario: Scoreboard overlay in fallback mode
- **WHEN** the heat summary or phase results overlay is visible in fallback mode
- **THEN** its heading is drawn on a dark ICF-blue band, its page count (when it has more than one page) on a dark ICF-blue panel, and each athlete's name on a light panel unless they are the athlete on the water

#### Scenario: Heat summary in fallback mode
- **WHEN** the heat summary overlay is visible in fallback mode
- **THEN** the heat name is drawn on a dark ICF-blue band and the event and phase names on a light band beside it; each athlete's bib is drawn in a tile of the alternate colour, and their name and affiliation on a light band, or on a dark ICF-blue band for the athlete on the water

#### Scenario: Phase results in fallback mode
- **WHEN** the phase results overlay is visible in fallback mode
- **THEN** the event name is drawn on a dark ICF-blue band, the phase name in a tile of the alternate colour and the run format on a light band; each row's rank is drawn on a dark ICF-blue tile, its name, affiliation and run scores on a light panel, and its total in a box of the alternate colour

#### Scenario: Event title in fallback mode
- **WHEN** the event title overlay is visible in fallback mode
- **THEN** the competition name is drawn on a dark strip, the event name on a dark ICF-blue band, the phase name in a tile of the alternate colour, and the run format on a light band

#### Scenario: Lower third in fallback mode
- **WHEN** the athlete overview or run corner is visible in fallback mode
- **THEN** its name and event rows are drawn on a dark ICF-blue panel, its run or clock row on a light panel, and its bib tile and score box in the alternate colour

#### Scenario: Competition overview in fallback mode
- **WHEN** the competition overview is visible in fallback mode
- **THEN** the competition name is drawn on a dark ICF-blue band, the rail of events or heats on a light band, and the current entry in the alternate colour

## ADDED Requirements

### Requirement: Fallback layouts apply only in fallback mode
The event title, heat summary and phase results SHALL use the fallback layouts described in this spec only while their overlay is in fallback mode. When the overlay plays its graphics-pack frame sequence, and on the arena, they SHALL keep their existing layout and text.

#### Scenario: Graphics pack available
- **WHEN** the heat summary overlay is shown and its graphics-pack frames load
- **THEN** the heat's athletes are shown in the existing table registered to the artwork

#### Scenario: Arena
- **WHEN** the arena shows the phase results
- **THEN** they are shown in the existing table

#### Scenario: Graphics server returns mid-event
- **WHEN** an overlay that was in fallback mode leaves it on a later show because its graphics now load
- **THEN** it shows its existing layout over the frame sequence

### Requirement: Fallback text states the run format as a sentence
In fallback mode, the event title and phase results SHALL describe the phase's run format as one sentence built from its number of runs and number of scoring runs, with no "Runs :" or "Scoring runs :" labels:
- when every run counts: "<runs> runs, all count toward the total";
- when one run counts: "<runs> runs, the best one counts toward the total";
- otherwise: "<runs> runs, best <scoring runs> count toward the total".

A phase with a single run SHALL use "1 run" in place of "<runs> runs".

#### Scenario: Best two of three
- **WHEN** a phase has 3 runs and 2 scoring runs
- **THEN** the run format reads "3 runs, best 2 count toward the total"

#### Scenario: Every run counts
- **WHEN** a phase has 2 runs and 2 scoring runs
- **THEN** the run format reads "2 runs, all count toward the total"

#### Scenario: Best single run
- **WHEN** a phase has 3 runs and 1 scoring run
- **THEN** the run format reads "3 runs, the best one counts toward the total"

### Requirement: The fallback event title and competition overview stack down the left edge
In fallback mode, the competition overview and the event title SHALL be placed down the left edge of the frame, on the same left edge as the athlete overview lower third: the competition overview below the space reserved for the ICF logo, and the event title slate below the competition overview. None of the three, nor the lower third, SHALL overlap another.

From top to bottom, the slate SHALL show the competition name in a small strip; the event name as the largest text, with the phase name in a tile beside it; and the run-format sentence. It SHALL NOT show "Event :" or "Phase :" labels.

#### Scenario: Selected event and phase
- **WHEN** the event title is visible in fallback mode for the K1 Men semi-final of a 3-run phase with 2 scoring runs
- **THEN** it shows the competition name, "K1 Men" with "Semi-final" in the tile beside it, and "3 runs, best 2 count toward the total"

#### Scenario: Overview and title shown together
- **WHEN** the competition overview and the event title are both visible in fallback mode
- **THEN** the competition overview sits above the event title on the same left edge and neither overlaps the other

### Requirement: The fallback heat summary lists the heat's athletes in two columns
In fallback mode, the heat summary SHALL show a header with the heat name, and the event and phase names of the heat's own phase. Below it, the heat's athletes SHALL be shown as tiles in two columns, in the same bib order the heat list uses, filling the first column top to bottom before the second. Each tile SHALL show the athlete's bib, first name, upper-cased last name and affiliation. A page SHALL hold up to 10 athletes; a heat with more SHALL rotate through pages on the same interval as the broadcast table and show the current page and page count.

#### Scenario: Heat of eight
- **WHEN** the heat summary is visible in fallback mode for a heat of 8 athletes
- **THEN** the first column shows the 1st to 4th athletes, the second column the 5th to 8th, and no page count is shown

#### Scenario: Heat of twelve
- **WHEN** the heat summary is visible in fallback mode for a heat of 12 athletes
- **THEN** the first page shows the first 10 athletes with "Page 1/2", and after the page interval the last 2 with "Page 2/2"

### Requirement: The fallback heat summary marks the athlete on the water
In fallback mode, when the overlay's selected athlete is in the heat being shown, the heat summary SHALL draw that athlete's tile on a dark ICF-blue band labelled "On the water". No other tile SHALL carry the label.

#### Scenario: Selected athlete in this heat
- **WHEN** the selected athlete is in the heat and the heat summary is visible in fallback mode
- **THEN** only that athlete's tile is drawn on a dark ICF-blue band and labelled "On the water"

#### Scenario: No athlete selected
- **WHEN** no athlete is selected, or the selected athlete is in another heat
- **THEN** no tile is labelled "On the water"

### Requirement: The fallback phase results are a leaderboard that marks counting runs
In fallback mode, the phase results SHALL show a header with the event name, the phase name in a tile, and the run-format sentence, then one row per athlete in the order the phase scores return. Each row SHALL show the athlete's rank, first name, upper-cased last name and affiliation, one cell per run in the phase in run order, and the phase total. It SHALL NOT show the bib.

A run cell SHALL show the run's score to two decimal places, "DNS" for a did-not-start run, or "-" for a run with no score yet, as the existing table does. The scored runs that count toward the total, the phase's number of scoring runs with the highest scores, SHALL be shown in bold. Every other run cell, including "DNS" and "-", SHALL be shown in a muted colour. When two runs tie for the last counting place, the earlier run SHALL count.

A page SHALL hold up to 8 rows; a phase with more athletes SHALL rotate through pages on the same interval as the broadcast table and show the current page and page count.

#### Scenario: Best two of three
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete scored 812.50, 1040.00 and 986.25
- **THEN** 1040.00 and 986.25 are bold, 812.50 is muted, and the total shows 2026.25

#### Scenario: A did-not-start run
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete scored 890.00 and 905.50 and did not start their third run
- **THEN** both scored runs are bold and "DNS" is muted

#### Scenario: Run not yet scored
- **WHEN** an athlete has no score for their third run
- **THEN** that cell shows a muted "-"
