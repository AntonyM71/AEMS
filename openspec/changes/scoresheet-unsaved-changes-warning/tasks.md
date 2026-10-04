# Tasks

## 1. Detect and show unsaved changes

- [x] 1.1 In `ScoresheetMoves`, compute `hasUnsavedChanges` by comparing normalised snapshots of the RTK Query data and the local state, render a warning `Alert` while it is true, and report it through an optional `onUnsavedChangesChange` prop. Verify with tests in `ScoresheetBuilder.test.tsx`: no warning after load, a warning after editing a move name, a warning after a bonus-column reorder, no warning after the edit is typed back to its saved value, no warning after a successful save, and the warning kept after a failed save.

## 2. Guard leaving the scoresheet

- [x] 2.1 In the page component `ScoresheetBuilder`, track the reported flag. Wrap `setSelectedScoresheet` with a `window.confirm` check for `SelectScoresheet` and `AddScoresheet`. Verify with tests in `ScoresheetBuilderPage.test.tsx`: with unsaved edits, cancelling a switch keeps the current sheet and its edits, confirming switches, and with no edits the switch asks nothing.
- [x] 2.2 While edits are unsaved, register a `beforeunload` listener and a `router.events` `routeChangeStart` guard. Verify with tests: dispatching `beforeunload` is blocked only when there are unsaved edits, and a declined confirm on `routeChangeStart` aborts the route change (tests emit `routeChangeStart` on the real `next/router` singleton).

## 3. Verification

- [x] 3.1 Run `npm test`, `npm run tsc`, and `npm run lint` in `Webapp/` and confirm all pass.
