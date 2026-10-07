# Design

## Context

`FullscreenPixiOverlay` wraps each card in `PixiFrameSequenceOverlay`. That wrapper adds the `AemsOverlay-fallback` class to its content wrapper when graphics fail, and `overlayFallbackSx` (in `overlayFallback.ts`) restyles the card's existing DOM through that class. This works for the lower thirds because their DOM already has the right parts. The event title, heat summary and phase results render `EventTitle`, `HeatSummaryTable` and `PhaseScoreTable`. Those are shared with the arena and the pack-art overlay, and two of them are a `BasicTable`, so CSS alone can't give them the new layouts.

ADR011 sets the pattern for this: data lives in logic components or hooks, wrappers own framing, and a shared component doesn't branch per screen.

Data available without API changes:
- Heat info (`/getHeatInfo/{heatId}`), sorted by bib on the server: bib, names, affiliation, `phase_id`, `event_name`, run counts.
- Heat phases (`/getHeatInfo/{heatId}/phase`): the phase name for the heat header.
- Phase, event, competition and phase scores: already queried by the existing cards.

## Goals / Non-Goals

**Goals:**
- Fallback-only layouts for the three overlays, matching the mockup.
- Data rules (which runs count, run-format text, paging) are written once and unit-tested.

**Non-Goals:**
- Any change to the pack-art layout, `overlayTheme` geometry or the arena.
- Fixing the existing table's run lookup by array position (see Risks).

## Decisions

### 1. The wrapper takes separate fallback content

`PixiFrameSequenceOverlay` and `FullscreenPixiOverlay` gain an optional `fallbackContent` prop. In fallback mode the wrapper renders `fallbackContent` when it is given, and `children` otherwise. The modal wrappers (`EventTitleModal`, `HeatListModal`, `PhaseResultsModal`) pass the new component as `fallbackContent` and keep the existing card as `children`.

- *Alternative: render both layouts and hide one with CSS.* This doubles the DOM and every query result, and puts duplicate text in tests and on screen readers.
- *Alternative: expose `isFallback` through context and branch inside the cards.* ADR011 rules this out, and the arena would carry a branch it never uses.

When the overlay retries and leaves fallback mode, it switches back to `children` on its own, which meets the "graphics server returns" scenario.

### 2. Extract data hooks, add three fallback components

Following ADR011, each existing card's queries move into a hook that both the card and its fallback component call:

| Hook | Returns | Used by |
|---|---|---|
| `useEventTitle()` | competition, event and phase names; runs and scoring runs | `EventTitle`, `EventTitleSlate` |
| `useHeatStartList(heatId)` | athletes in bib order; heat, event and phase names | `HeatSummaryTable`, `HeatStartGrid` |
| `usePhaseLeaderboard(overlayControlState)` | rows with rank, names, affiliation, per-run cells and total; event and phase names; run counts. Keeps the refetch on `showPhaseResults`. | `PhaseScoreTable`, `PhaseLeaderboard` |

Each hook lives in its existing card's file and is exported from it. The three fallback components go in new files under `Cards/`. They are only ever rendered in fallback mode, so they set their own fixed 1920×1080 positions with `sx`, the same way the lower thirds' `rootSx` values do, and need no theme `defaultProps`.

### 3. Pure helpers for the rules in the spec

- `runFormatText(runs, scoringRuns)` produces the run-format sentence.
- `countingRunNumbers(runScores, scoringRuns)` returns the run numbers in bold. It looks runs up by `run_number`, excludes did-not-start runs, sorts by score descending, breaks ties by the lower run number, and takes `scoringRuns`.

Both go in a new `Cards/runFormat.ts` with a unit test. `countingRunNumbers` matches the server's sum of the highest `mean_run_score` values (`scoring_logic.py`). A did-not-start run scores 0, so it only ever fills a counting place an athlete has no scored run for; showing it muted rather than bold is the readable choice.

### 4. Reuse the table's paging

Extract `BasicTable`'s page state and interval into `useRotatingPage(items, pageLimit, pageChangeSeconds)`. It returns `{ pageItems, currentPage, totalPages }`. `BasicTable` and both fallback lists call it. The fallback lists use 10 per page for the heat and 8 for the leaderboard, a 5-second interval to match today, and show `Page n/m` only when there is more than one page.

### 5. Styling and motion

The fallback components don't use `.AemsTableCard-root`, which would wrap them in the old navy card. Their parts get new `AemsEventSlate-*`, `AemsHeatGrid-*` and `AemsLeaderboard-*` classes. The palette constants and the wipe panel list in `overlayFallback.ts` are extended to include these parts, so they get the same slanted wipe, text fade and reduced-motion behaviour. Rows set `--i` inline, and the stylesheet adds `calc(var(--i) * 70ms)` to their wipe delay, so they wipe in one after another. `OVERLAY_FALLBACK_EXIT_MS` is raised if the longest staggered exit outlasts it.

### 6. The athlete on the water

`HeatListModal` gains an `overlayControlState` prop, which `overlay.tsx` already holds, and passes `selectedAthlete?.id` to `HeatStartGrid`. A tile is marked when its `athlete_id` matches.

## Risks / Trade-offs

- [The existing `PhaseScoreTable` reads `run_scores[rn - 1]` by position, not by `run_number`] → The leaderboard looks runs up by `run_number`. The table keeps its current behaviour (out of scope) and is noted as a follow-up.
- [jsdom resolves styles by source order, not specificity, so colour assertions can be unreliable (see `FullscreenPixiOverlay.test.tsx`)] → Tests assert on text, structure and class names; colours are only asserted where the existing test already does it reliably (light panel background).
- [Fixed pixel positions assume a 1920×1080 output] → The lower thirds already make the same assumption.
- [The heat list is in bib order, not start order] → The spec says bib order. Start order would need a server change and is out of scope.
