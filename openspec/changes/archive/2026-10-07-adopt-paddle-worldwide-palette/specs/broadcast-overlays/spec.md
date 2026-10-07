## RENAMED Requirements

- FROM: `### Requirement: Fullscreen overlays draw ICF-coloured fallback backdrops that contrast with their text`
- TO: `### Requirement: Fullscreen overlays draw Paddle Worldwide-coloured fallback backdrops that contrast with their text`

## MODIFIED Requirements

### Requirement: Fullscreen overlays draw Paddle Worldwide-coloured fallback backdrops that contrast with their text
In fallback mode, the fullscreen broadcast overlays (event title, heat summary, phase results, athlete overview, run corner, competition overview) SHALL draw their own backdrops with plain page styling and no external assets. The backdrops SHALL use the Paddle Worldwide primary colours, orange and black, with simple gradients and the brand's tints. The alternate colour SHALL be Paddle Worldwide orange. Every line of overlay text SHALL sit on a panel it contrasts with over any live video: white text on a black panel, and black text on a light panel or on a box in the alternate colour.

#### Scenario: Scoreboard overlay in fallback mode
- **WHEN** the heat summary or phase results overlay is visible in fallback mode
- **THEN** its heading is drawn on a black band, its page count (when it has more than one page) on a black panel, and each athlete's name on a light panel unless they are the athlete on the water

#### Scenario: Heat summary in fallback mode
- **WHEN** the heat summary overlay is visible in fallback mode
- **THEN** the heat name is drawn on a black band and the event and phase names on a light band beside it; each athlete's bib is drawn in a tile of the alternate colour, and their name and affiliation on a light band, or on a black band for the athlete on the water

#### Scenario: Phase results in fallback mode
- **WHEN** the phase results overlay is visible in fallback mode
- **THEN** the event name is drawn on a black band, the phase name in a tile of the alternate colour and the run format on a light band; each row's rank is drawn on a black tile, its name, affiliation and run scores on a light panel, and its total in a box of the alternate colour

#### Scenario: Event title in fallback mode
- **WHEN** the event title overlay is visible in fallback mode
- **THEN** the competition name is drawn on a dark strip, the event name on a black band, the phase name in a tile of the alternate colour, and the run format on a light band

#### Scenario: Lower third in fallback mode
- **WHEN** the athlete overview or run corner is visible in fallback mode
- **THEN** its name and event rows are drawn on a black panel, its run or clock row on a light panel, and its bib tile and score box in the alternate colour

#### Scenario: Competition overview in fallback mode
- **WHEN** the competition overview is visible in fallback mode
- **THEN** the competition name is drawn on a black band, the rail of events or heats on a light band, and the current entry in the alternate colour

#### Scenario: Text on the alternate colour
- **WHEN** a bib tile, phase tile, total or live-score box is drawn in the alternate colour
- **THEN** its text is black, not white

### Requirement: The fallback heat summary marks the athlete on the water
In fallback mode, when the overlay's selected athlete is in the heat being shown, the heat summary SHALL draw that athlete's tile on a black band labelled "On the water", with the label in Paddle Worldwide Bright Blue. No other tile SHALL carry the label.

#### Scenario: Selected athlete in this heat
- **WHEN** the selected athlete is in the heat and the heat summary is visible in fallback mode
- **THEN** only that athlete's tile is drawn on a black band and labelled "On the water" in Bright Blue

#### Scenario: No athlete selected
- **WHEN** no athlete is selected, or the selected athlete is in another heat
- **THEN** no tile is labelled "On the water"

### Requirement: The competition overview uses frame-sequence graphics with a fallback backdrop
The competition overview SHALL be presented through a fullscreen frame-sequence overlay with the graphics-pack config `competitionOverview`, and in fallback mode SHALL draw its own Paddle Worldwide-coloured backdrop with no external assets.

#### Scenario: No graphics pack for the competition overview
- **WHEN** the graphics server has no `competitionOverview` config and the operator shows the competition overview
- **THEN** the overview is shown over its fallback backdrop

### Requirement: The athlete overview and run corner use frame-sequence graphics with fallback backdrops
The athlete overview and run corner SHALL each be presented through a fullscreen frame-sequence overlay, with graphics-pack configs named `athleteOverview` and `runCorner` respectively. In fallback mode, each SHALL draw Paddle Worldwide-coloured backdrops with no external assets: the name rows and the run corner's event row on a black panel, the overview's run row and the corner's clock row on a light panel, and the bib tile and the total and live-score boxes in the alternate colour.

#### Scenario: No graphics pack for the athlete overview
- **WHEN** the graphics server has no `athleteOverview` config and the operator shows the athlete overview
- **THEN** the lower third is shown over its fallback backdrop
