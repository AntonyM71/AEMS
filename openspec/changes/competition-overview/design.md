# Design

## Context

See proposal.md for the motivation and the chosen mockup ("order rail", https://claude.ai/artifact/Kq7e9fbfxuAUE9vPCnGFqf). This change builds on `athlete-lower-thirds`, and reuses these pieces from it:
- the fullscreen modal pattern: a card inside `FullscreenPixiOverlay` with a `configName`;
- theme-slot positioning through a `rootSx` read with `useThemeProps`;
- the `overlayFallbackSx` panel lists, which give new panels the slanted wipe and text fade for free;
- the controller's prerequisite path (`toast.error` when a selection is missing).

ADR011 applies: data logic goes in a hook, presentation in the card, and position in the theme.

**Data available without backend changes:**
- the competition's name: `useGetManyCompetitionGetQuery({ idList })`, as `EventTitle` uses it;
- its events: `useGetManyEventGetQuery({ competitionIdList })`;
- its heats: `useGetManyHeatGetQuery({ competitionIdList })`, as `HeatSelector` uses it.

Events and heats have only `id`, `competition_id` and `name`. There is no running-order field, and the API returns them in no guaranteed order. The selected event and heat are already in the relayed `OverlayControlState`.

## Goals / Non-Goals

**Goals:**
- One graphic that lists either the competition's events or its heats, chosen in the controller, with the current entry marked.
- A stable, readable rail at any list length, using the 8-entry window.

**Non-Goals:**
- A true running order for events or heats. That needs an order column, which is a schema change for another day. Sorting names with numbers read as numbers ("Heat 2" before "Heat 10") covers the usual names.
- Listing phases.
- Showing which entries are finished. "Before the current one" is the only progress signal, shown by muting.

## Decisions

**A `useCompetitionOverview(overlayControlState)` hook owns the data (ADR011).** It returns `{ competitionName, heading, steps, windowNote }`.
- `heading` is "Events" or "Heats".
- `steps` is `{ id, name, isCurrent, isPast }[]`, already windowed.
- `windowNote` is "4–11 of 12", or `undefined` when nothing is hidden.
- It queries only the list it needs, events or heats, so switching lists in the controller costs one request.
- Its sorting and windowing are two small pure functions, so they can be tested directly:
  - `sortByName` uses `localeCompare` with `{ numeric: true, sensitivity: "base" }`.
  - `windowAround(count, currentIndex, size = 8)` returns `[start, end)`. The current entry sits fourth of eight, clamped to the list's ends: start = min(max(current − 3, 0), count − 8).
  - With no current entry, the window starts at the beginning and no step is marked.

**The card is the order rail, positioned by the theme.** `CompetitionOverview` renders:
- a `.AemsCompetitionOverview-heading` block, with the competition name at the event title's heading size and "Events" or "Heats" beneath it;
- a `.AemsCompetitionOverview-rail` row of `.AemsCompetitionOverview-step` items;
- a trailing `.AemsCompetitionOverview-window` note.

The current step gets the `-current` modifier and is bold. Earlier steps get `-past`.

The position comes from a new `AemsCompetitionOverview` theme slot, which takes `rootSx`. The overlay theme anchors it 120 px from the left and 56% down a 1920×1080 frame. That is left of the event title's 27% indent, so eight long event names fit on one row, as the mockup showed.

`AemsLowerThirdThemeProps` becomes `AemsPositionedThemeProps`, since it now positions more than lower thirds.

`CompetitionOverviewModal` wraps the card in `FullscreenPixiOverlay` with `configName="competitionOverview"`, and `overlay.tsx` mounts it on `showCompetitionOverview`.

**Fallback styling extends `overlayFallbackSx`.**
- The heading uses the event title's heading band: a navy gradient that fades out to the right, with the light-blue left edge.
- The rail uses the light band.
- `-current` takes the alternate light blue with navy text.
- `-past` takes the muted colour already used for DNS.
- The heading and rail join the `panels()` wipe list. The rail follows 90 ms behind, like the event title's second band.

**Controller and control state.**
- `OverlayControlState` gains `showCompetitionOverview: boolean` (default false) and `competitionOverviewList: "events" | "heats"` (default "events").
- The controller adds a "Show Competition Overview" button, which needs a selected competition, through the existing error path.
- Beside it, an MUI `ToggleButtonGroup` ("Events" / "Heats", exclusive, never empty) sets the list.
- The server relays the control state as an opaque payload, so there is no backend change.

## Risks / Trade-offs

- **[Trade-off] Name order isn't running order.** Events sort alphabetically, so "Junior Men's K1" comes before "Men's K1". → Accepted. The data has no order, and the operator can name events to sort sensibly. A real order column is the upgrade.
- **[Risk] Very long names.** A single 40-character event name could push eight steps past the frame edge. → The steps don't shrink, but the window caps the count at 8. The live check in tasks includes a long-name competition, and if it overflows we can lower the window size for events.
- **[Risk] Archive order.** This change modifies the same visibility-flag requirement as `athlete-lower-thirds`, and its delta is written on top of that change's version. → Archive `athlete-lower-thirds` first. This is noted in the proposal.
