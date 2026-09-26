# Proposal

## Why

A heat's paddlers can have different run counts (e.g. one athlete scored for 2 runs, another for 3, within the same heat), so the run selector's wrap boundary is deliberately the heat-wide max. That means a scribe can navigate to a run number that doesn't exist for the currently displayed athlete. Today `Runselector.tsx` shows that run number in red, but nothing stops the scribe from tapping move buttons and having those scores auto-submitted against a run/athlete combination that isn't real — silently creating scores for a run the athlete was never scheduled for.

## What Changes

- The scribe screen now shows an error Alert naming the athlete and their run count when the currently selected run doesn't exist for that athlete (selected run number exceeds the athlete's own `number_of_runs`).
- Move-entry buttons are disabled while on such an invalid run, reusing the same `isRunLocked` disabling mechanism already used for a head-judge-locked run.
- The scribe screen's auto-submit-scores effect skips submission while on an invalid run, so no score is persisted for that run/athlete combination.
- The out-of-range check (`isRunOutOfRangeForAthlete`) is extracted into a shared helper in `InfoBar.tsx`, reused by both the new Scribe.tsx block and the pre-existing red-text display in `Runselector.tsx` (that red-text display itself is unchanged).

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `judging-workflow`: adds a requirement that the scribe screen blocks move entry and score submission when the selected run doesn't exist for the current athlete, mirroring the existing "A locked run blocks scribe scoring" requirement.

## Impact

- `Webapp/src/components/roles/scribe/Scribe.tsx`: computes `isRunOutOfRange`, renders the error Alert, disables `MoveCard`/`InfoBar` move entry, and gates the auto-submit effect.
- `Webapp/src/components/roles/scribe/InfoBar.tsx`: adds the shared `isRunOutOfRangeForAthlete` helper.
- `Webapp/src/components/roles/scribe/InfoBar/Runselector.tsx`: uses the shared helper instead of its inline comparison (no behavior change).
- `Webapp/src/components/roles/scribe/__tests__/Scribe.test.tsx`: new regression test for the blocked/disabled state.
- Implementation and tests are already complete and passing (`npx jest src/components/roles`, `npx tsc --noEmit`, `npx eslint`); this proposal documents that already-shipped behavior in the spec, per CLAUDE.md's OpenSpec requirement.
