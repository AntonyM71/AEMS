# Proposal

## Why

When the graphics server is unreachable, the overlay draws CSS backdrops instead of the pack artwork. The athlete overview and run corner backdrops read well on air because they are built from distinct parts: a bib tile, a name band, run cells and a score box. The event title, heat summary and phase results backdrops are a heading band over a plain table or a second band. Every value has the same weight, the "Event :" / "Phase :" prefixes read like a form, and nothing shows which runs count toward a total or who is on the water. Mockups of the chosen designs: https://claude.ai/artifact/GTgzaYTgUE1iZg6toYDaDb

## What Changes

- **Event title (fallback only):** a "title slate" on the left edge, below the competition overview, which also moves up in fallback mode so the ICF logo, competition overview and event title form one column. A small competition strip sits above a large event name, with the phase in an alternate-colour tile beside it and the run format as a sentence underneath (for example "3 runs, best 2 count toward the total"). The "Event :", "Phase :", "Runs :" and "Scoring runs :" labels go.
- **Heat summary (fallback only):** a header with the heat name and the heat's event and phase, then the heat's athletes as tiles in two columns, read top to bottom then left to right. Each tile has a bib tile, the name, and an affiliation pill. The selected athlete, when they are in this heat, is marked "On the water". Ten athletes fit on a page; larger heats rotate pages on the same interval as today.
- **Phase results (fallback only):** a leaderboard. A header shows the event name, the phase in an alternate-colour tile, and the run-format sentence. Each row has the rank in a dark tile, the name with an affiliation pill, one cell per run, and the total in an alternate-colour box. Runs that count toward the total are bold and the rest are muted. The bib column goes.
- Pack-art mode and the arena keep their current layouts and text.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `broadcast-overlays`: the fallback backdrop requirement changes for the event title, heat summary and phase results, and new requirements describe what each of those three fallback layouts shows.

## Impact

- Webapp only: the broadcast overlay's event title, heat summary and phase results cards, the fullscreen overlay wrapper, and the fallback styles. No server or API change; every value shown already comes from existing endpoints.
- The arena and graphics-pack overlays render the same cards today, so the new layouts must be limited to fallback mode.
- Existing tests that read the fallback table text (Overlay, FullscreenPixiOverlay, overlayCardStyling) will need updating.
