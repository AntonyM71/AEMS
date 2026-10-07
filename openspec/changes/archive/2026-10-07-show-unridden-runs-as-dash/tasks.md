# Tasks

## 1. Webapp

- [x] 1.1 Add a `PhaseResultsTable` test with a 3-run phase whose runs score 85.50, 0 (judged), 0 (no judge scores) and 0 (locked, no judge scores), asserting the row shows `85.50`, `0.00`, `-` and `0.00`. Verify it fails.
- [x] 1.2 Give the fallback leaderboard fixture's scored runs a judge score and pad one athlete with unridden runs, and add an unridden run to the `countingRunNumbers` "only scored runs" spec.
- [x] 1.3 Add `runLabel` to `runFormat.ts`, use it in `PhaseResultsTable.tsx` and `PhaseLeaderboard.tsx`, and make `countingRunNumbers` skip unlocked runs with no judge scores. Verify the tests pass and fail again with the counting filter reverted.
- [x] 1.4 Run `npm run precommit` in `Webapp/` and verify it is clean.
