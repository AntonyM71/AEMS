# Proposal

## Why

When the competition/event/phase/heat selectors fail to load their data (server error, network drop), the operator is shown a dead-end message with no way to recover except reloading the whole page — losing any in-progress navigation state. Every selector already holds a working `refetch` function (used today only to power the manual refresh icon in the loaded/empty states), so a retry affordance in the error state is a small, low-risk addition. This was surfaced while restoring a check-order regression in `CompetitionSelector`'s error handling, which also revealed that error states here have no test coverage at all.

## What Changes

- The four selectors (Competition, Event, Phase, Heat) show a retry button alongside the "Failed to get data from the server" message when their request fails, instead of a dead-end message.
- The error message renders as an MUI `Alert` (`severity="error"`) instead of a bare `<h4>`, for visual consistency with error styling elsewhere and to carry the retry action.
- Add error-state tests for EventSelector, HeatSelector, and PhaseSelector (CompetitionSelector already has one).

## Capabilities

### Modified Capabilities

- `competition-management`: adds a requirement that a selector whose data request fails shows an error message and a retry action, for each of the competition/event/phase/heat selectors.

## Impact

- `Webapp/src/components/competition/SelectorPanel.tsx` — shared error-state branch (used by all four selectors).
- `Webapp/src/components/competition/CompetitionSelector.tsx` — has its own local error short-circuit above `SelectorPanel`, added when a check-order regression was fixed; needs the same retry treatment.
- `Webapp/src/components/competition/__tests__/{EventSelector,HeatSelector,PhaseSelector}.test.tsx` — new error-state tests.
- No backend or API changes.
