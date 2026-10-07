# Tasks

## 1. Shared rules and paging

- [x] 1.1 Add `Cards/runFormat.ts` with `runFormatText` and `countingRunNumbers`, plus `runFormat.spec.ts` covering every scenario in "Fallback text states the run format as a sentence" and "marks counting runs" (best 2 of 3, DNS, unscored run, tie goes to the earlier run); verify with `npm test -- runFormat`
- [x] 1.2 Extract `useRotatingPage` from `BasicTable` and switch `BasicTable` to it; verify `BasicBroadcastTable.test.tsx` passes unchanged

## 2. Data hooks (ADR011)

- [x] 2.1 Move `EventTitle`'s queries into an exported `useEventTitle` hook; verify the existing EventTitle and `overlayCardStyling` tests pass unchanged
- [x] 2.2 Move `HeatSummaryTable`'s queries into an exported `useHeatStartList(heatId)` that also returns the heat's event name and phase name; verify `HeatSummaryTable.test.tsx` passes unchanged
- [x] 2.3 Move `PhaseScoreTable`'s queries and its refetch on `showPhaseResults` into an exported `usePhaseLeaderboard`; verify `PhaseResultsTable.test.tsx` passes unchanged

## 3. Fallback content in the wrapper

- [x] 3.1 Add an optional `fallbackContent` prop to `PixiFrameSequenceOverlay` and `FullscreenPixiOverlay`, rendered instead of `children` only in fallback mode; add tests to `PixiFrameSequenceOverlay.test.tsx` showing `fallbackContent` in fallback mode, `children` when frames load, and `children` again after a retry leaves fallback mode

## 4. Fallback layouts

- [x] 4.1 Add `EventTitleSlate` and pass it as `EventTitleModal`'s `fallbackContent`; test that in fallback mode it shows the competition name, the event name, the phase name and the run-format sentence, with no "Event :" or "Phase :" text
- [x] 4.2 Add `HeatStartGrid`, pass `overlayControlState` into `HeatListModal` from `overlay.tsx`, and use the grid as its `fallbackContent`; test the header names, the column order for 8 athletes, paging for 12 ("Page 1/2" then "Page 2/2" after the interval), and that "On the water" appears only on the selected athlete's tile and never for an athlete from another heat
- [x] 4.3 Add `PhaseLeaderboard` and pass it as `PhaseResultsModal`'s `fallbackContent`; test that a row shows rank, name, affiliation, run cells and total with no bib, that counting runs are bold and the others muted, and that more than 8 athletes rotate pages
- [x] 4.4 Extend `overlayFallback.ts` with the new panels (palette and staggered wipe, using `--i` per row), and raise `OVERLAY_FALLBACK_EXIT_MS` if the longest staggered exit needs it; verify the reduced-motion rule still covers the new panels

## 5. Existing tests and checks

- [x] 5.1 Update the heat-summary case in `FullscreenPixiOverlay.test.tsx` and any `Overlay.test.tsx` lookups that relied on the fallback table; verify `npm test` passes in `Webapp/`
- [x] 5.2 Check the arena and pack-art overlays are unchanged: `overlayCardStyling.test.tsx` and the arena tests pass without edits
- [x] 5.3 Run `npm run precommit` in `Webapp/` (tsc, lint, prettier) and fix any issues
- [x] 5.4 With the graphics server stopped, show each of the three overlays from the controller at 1920×1080 and compare against the mockup (https://claude.ai/artifact/GTgzaYTgUE1iZg6toYDaDb), including the entrance and exit wipe
