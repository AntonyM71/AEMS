# Tasks

## 1. Shared out-of-range helper

- [x] 1.1 Extract `isRunOutOfRangeForAthlete` into `Webapp/src/components/roles/scribe/InfoBar.tsx` and use it from `Runselector.tsx`'s existing red-text display, verified by the existing `RunSelector.test.tsx` suite still passing

## 2. Block scoring on an invalid run

- [x] 2.1 In `Webapp/src/components/roles/scribe/Scribe.tsx`, compute `isRunOutOfRange` for the current athlete/selected run and gate the auto-submit-scores effect on it
- [x] 2.2 Show an error Alert naming the athlete and their run count when `isRunOutOfRange` is true
- [x] 2.3 Disable `MoveCard` and `InfoBar` move entry while `isRunOutOfRange` is true, reusing the existing `isRunLocked` prop

## 3. Verification

- [x] 3.1 Add a regression test in `Webapp/src/components/roles/scribe/__tests__/Scribe.test.tsx` ("blocks scoring and shows a notice when the selected run doesn't exist for the athlete") asserting the error text, disabled move buttons, and that no score is posted
- [x] 3.2 `npx tsc --noEmit`, `npx eslint`, and `npx jest src/components/roles` (65 tests) all pass
