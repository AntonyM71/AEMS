# Proposal

## Why

Between runs, broadcasters want a graphic that sets the scene: which competition this is, what's on the programme, and where we are in it. The overlay can show a single event's title, but nothing shows the competition's events or heats, or which one is happening now.

## What Changes

- New **Competition Overview** fullscreen overlay, in the event title's style. It is the "order rail" chosen from the mockups (https://claude.ai/artifact/Kq7e9fbfxuAUE9vPCnGFqf):
  - a navy band with the competition name, and "Events" or "Heats" beneath it;
  - beneath that, a light rail of the competition's events or heats as a row of steps;
  - the current event or heat is bold, in the light-blue alternate colour, and entries before it are greyed;
  - a list longer than 8 shows a window of 8 that keeps the current entry in view, with a "4–11 of 12" note at the end of the rail.
- It uses the existing frame-sequence wrapper with a `competitionOverview` graphics-pack config. With no graphics server, it draws ICF-coloured CSS fallback backdrops like the other overlays.
- **Controller:**
  - a new "Show Competition Overview" toggle, which requires a selected competition;
  - an Events / Heats choice for what the rail lists.
- **Control state:**
  - new flag `showCompetitionOverview`;
  - new field `competitionOverviewList` (`"events"` or `"heats"`, default `"events"`).

## Capabilities

### New Capabilities

### Modified Capabilities

- `broadcast-overlays`:
  - adds requirements for the competition overview's content, the window and its fallback backdrop;
  - adds `showCompetitionOverview` to the visibility flags and gives it a competition prerequisite;
  - adds the list choice to the control state.

## Impact

- **Webapp broadcast:**
  - a new card and modal;
  - an overlay-theme slot for the overview's position;
  - new panel styles in `overlayFallback.ts`;
  - the overlay page mounts the modal;
  - the controller gets the toggle and the Events / Heats choice;
  - `OverlayControlState` and its default state change.
- **Data:** the existing event and heat list queries for the selected competition. No backend or API changes.
- **Graphics packs:** one new optional component config, `competitionOverview`.
- **Ordering:** events and heats carry only a name, so the rail sorts names with numbers read as numbers ("Heat 2" before "Heat 10").
- **Depends on `athlete-lower-thirds`:** this builds on that change, which is not yet archived and also modifies the visibility-flag requirement. Archive it first.
