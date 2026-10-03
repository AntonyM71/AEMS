# Tasks

## 1. SelectorPanel error state

- [x] 1.1 Replace `SelectorPanel`'s bare `<h4>` error branch with an MUI `Alert` (`severity="error"`) containing the failure message and a retry action wired to the existing `refetch` prop, and verify `HeatSelector.test.tsx`'s existing behavior (via SelectorPanel) still renders correctly for non-error states

## 2. CompetitionSelector's local error short-circuit

- [x] 2.1 Update `CompetitionSelector`'s local `if (error)` branch (added ahead of `SelectorPanel` to fix error/loading check order) to render the same `Alert` + retry treatment as `SelectorPanel`, and verify `CompetitionSelector.test.tsx`'s "shows error message when the request fails" test still passes with the retry button present

## 3. Error-state test coverage

- [x] 3.1 Add an error-state test to `EventSelector.test.tsx` (mock a failed `/api/event` request) asserting the error message and retry button render, following the pattern in `CompetitionSelector.test.tsx`
- [x] 3.2 Add an error-state test to `HeatSelector.test.tsx` (mock a failed `/api/heat` request) asserting the error message and retry button render
- [x] 3.3 Add an error-state test to `PhaseSelector.test.tsx` (mock a failed phase-list request) asserting the error message and retry button render
- [x] 3.4 Add a test asserting that clicking the retry button re-issues the failed request (e.g. on `CompetitionSelector`, using an MSW handler that fails once then succeeds, verifying the selector recovers after retry)

## 4. Verification

- [x] 4.1 Run `npm test` in `Webapp/` and confirm all selector test suites pass
- [x] 4.2 Run `npm run tsc` in `Webapp/` and confirm no type errors
