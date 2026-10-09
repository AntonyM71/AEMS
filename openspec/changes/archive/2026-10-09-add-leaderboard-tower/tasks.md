# Tasks

## 1. Shared final-run totals

- [x] 1.1 Move `lockedOrDnsRuns` and `bestRunsTotal` from `useAthleteRunScores.ts` into a shared module beside it, and import them back into the athlete overview; verify `npx jest src/components/broadcast/__tests__/AthleteOverview.test.tsx` still passes unchanged

## 2. Standings, layout and climb logic

- [x] 2.1 Add `useTowerStandings(phaseId)`, which returns the athletes with a final non-DNS run, ordered by final total (stable over the server's order), and each one's gap to the leader; verify with an MSW-backed test covering the spec's "Ranking on locked runs only", "An athlete with no final run", "An athlete whose only final run is did-not-start" and "Best two of three" scenarios
- [x] 2.2 Add the pure `towerLayout(count, { placesThrough, qualifierRows, maxRows })`, ported from the mock-up's `standingsHTML`; verify unit tests for "Ten places through", "Everyone currently through", "Places through not set", "Athletes below the bubble rotate", "Qualifiers rotate three at a time" and "Small field" pass
- [x] 2.3 Add the pure `climbPlan(before, after, athleteId)`; verify unit tests for a new athlete entering at the bottom, a second-run improvement, crossing the cut line (naming the athlete pushed out), and no plan when the place doesn't improve

## 3. Live updates

- [x] 3.1 Add `phaseRunStatusStream({ phaseId })` to `streamingApi.ts`, modelled on `athleteRunStatusStream` and filtering on `phase_id`, with the latest message and a count of socket connects in its cache value; verify with a test that drives the mock socket hub (`src/mocks/socketHub.ts`) that only messages for the phase update the message, and that a reconnect bumps the count
- [x] 3.2 Make `useTowerStandings` refetch phase scores 1 s after the last run-status message in a burst and on each reconnect, with no polling; verify MSW-backed tests with fake timers for "Run marked did-not-start", "Run unlocked", "Several locks at once" (one request), "Reconnecting after a missed lock" and "Nothing happening" (no requests over several minutes)

## 4. Control state and controller

- [x] 4.1 Add `showLeaderboardTower`, `towerStyle`, `towerPlacesThrough`, `towerQualifierRows` and `towerClimb` to `OverlayControlState` and `defaultOverlayControllerState`; verify `npm run tsc` passes and the "Subscribing before any operator action" test still reads the defaults
- [x] 4.2 Add the "Leaderboard tower" tile to the controller's right-hand column, gated on a selected phase; verify controller tests for "Toggling the leaderboard tower without a selected phase" and that clicking it inverts only `showLeaderboardTower`
- [x] 4.3 Add the style switch, "Places through" field, "Qualifiers above the bubble" select and "Climb on new scores" switch under the tile; verify controller tests for "Default tower settings", "Setting places through" (including an empty value giving `null`), and that changing a setting leaves every visibility flag unchanged

## 5. Tower card

- [x] 5.1 Build the tower card, pinned at the top right with the header, rows, cut line, bubble and rotating windows driven by `towerLayout` and `useRotatingPage`, and mount it in `overlay.tsx`; verify an Overlay test where 26 athletes and 10 places through show places 1–12, a "Top 10 through" label, and at most 18 rows
- [x] 5.2 Add the Timing tower and Waterline styles with shared row geometry; verify tests for "Waterline below the cut" (rows marked as going through or not) and "Switching style mid-rotation" (the window keeps its page)
- [x] 5.3 Slide the tower in and out from the right edge, fading when reduced motion is requested; verify the "Shown" scenario in a test and that the card unmounts after it is hidden
- [x] 5.4 Play queued climbs from `climbPlan` when a lock arrives with "Climb on new scores" on: a continuous window, a pulled row with a callout (full name, "Run n", run score), one place per step, the pushed-out athlete marked, a ~4 s hold, then back to the normal layout; skip climbs with the climb off or reduced motion requested, and cap the queue as in design.md; verify with fake timers that "A new athlete enters the bubble", "Improving on a second run", "Climb switched off", "Two locks in quick succession" and "Two locks within a second" behave as specified

## 6. Run corner

- [x] 6.1 Wrap `RunCornerModal` in a fixed full-viewport layer that slides left by the tower's width while `showLeaderboardTower` is true, without sliding when reduced motion is requested; verify a `RunCorner.test.tsx` case that the layer is shifted only while the tower is on, and check in the running overlay, with and without a graphics pack, that the run corner's artwork moves with its content and doesn't overlap the tower. Checked in fallback mode only, as an e2e assertion at 1920x1080 that the run corner sits wholly left of the tower (no graphics pack is available in this devcontainer); the shift is tested in `LeaderboardTower.test.tsx` rather than `RunCorner.test.tsx`, since it needs the whole overlay page

## 7. End to end and wrap-up

- [x] 7.1 Add a Playwright test that turns the tower on for a seeded phase, locks a run through the API, and sees the athlete appear on the tower with the right place and gap; verify `npm test` in `e2e/` passes against the running stack. `leaderboardTower.spec.ts` passes in Chromium and Firefox against a dev stack. The full suite did not pass there: the shared dev database holds 773 competitions and the competition list takes 13.5 s, so pages that wait on it time out; the websocket and follow-head-judge specs pass when run on their own
- [x] 7.2 Add the tower to `Webapp/src/components/broadcast/Components.md` (the feature list and a short card entry); verify the file renders
- [x] 7.3 Run `npm run precommit` in `Webapp/` and `npx openspec validate add-leaderboard-tower --strict`; verify both pass
