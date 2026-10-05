# Tasks

## 1. Data hook (ADR011)

- [x] 1.1 Add `sortByName` (numeric-aware `localeCompare`) and `windowAround(count, currentIndex, size = 8)`. Test them directly:
  - "Heat 2" sorts before "Heat 10";
  - 12 entries with index 6 gives [3, 11), and with index 11 gives [4, 12);
  - 5 entries give [0, 5);
  - no current entry gives [0, 8).
- [x] 1.2 Add `useCompetitionOverview(overlayControlState)`, returning `{ competitionName, heading, steps, windowNote }`. It queries only the event list or the heat list for the selected competition. Verify through the card tests in 2.2.

## 2. Card, theme and overlay

- [x] 2.1 Rename `AemsLowerThirdThemeProps` to `AemsPositionedThemeProps`, add an `AemsCompetitionOverview` slot to `themeAugmentation.ts`, and add its position (left 120 px, top 56%) to `overlayTheme.tsx`. Verify `npm run tsc`.
- [x] 2.2 Add the `CompetitionOverview` card (the mockup's order rail), with heading, rail, steps (`-current`, `-past`) and window-note classes. Test with `renderWithProviders` + MSW:
  - events mode shows the competition name, "Events" and the events in name order, with the selected one marked current and those before it marked past;
  - heats mode lists heats in number order;
  - 12 heats with "Heat 7" selected shows "Heat 4"–"Heat 11" and "4–11 of 12".
- [x] 2.3 Add `CompetitionOverviewModal` (`configName="competitionOverview"`) and mount it in `overlay.tsx` on `showCompetitionOverview`. Extend `Overlay.test.tsx` to check it is visible only when that flag is relayed.

## 3. Fallback backdrop

- [x] 3.1 Extend `overlayFallbackSx`:
  - the heading gets the navy title band;
  - the rail gets the light band;
  - `-current` gets the alternate light blue with navy text;
  - `-past` gets the muted colour;
  - the heading and rail join the wipe list, with the rail 90 ms behind.

  Extend `FullscreenPixiOverlay.test.tsx` to render the overview with the graphics server down and assert the rail's solid light background.

## 4. Controller and control state

- [x] 4.1 Add `showCompetitionOverview` (default false) and `competitionOverviewList` (default "events") to `OverlayControlState` and `defaultOverlayControllerState`. Verify `npm run tsc`.
- [x] 4.2 In the controller, add a "Show Competition Overview" button that requires a selected competition, and an exclusive Events / Heats `ToggleButtonGroup`. Test:
  - toggling with no competition shows the error and leaves the flag unchanged;
  - choosing "Heats" emits `competitionOverviewList` "heats".

## 5. Docs and verification

- [x] 5.1 Add the competition overview to the feature list in `Components.md`.
- [x] 5.2 Run `npm run precommit` and `npm test` in `Webapp/`, and confirm both pass.
- [ ] 5.3 With the local stack running and no graphics server, show the competition overview from the controller in both Events and Heats modes, including a competition with more than 8 heats and one with long event names. Confirm it matches the mockup and the window follows the selected heat.
