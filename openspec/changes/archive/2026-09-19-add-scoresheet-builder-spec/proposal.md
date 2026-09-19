# Proposal

## Why

A review of `openspec/specs/` found that all four existing capability specs (competition-domain, scoring, server-configuration, timer-configuration) describe backend/domain logic only. None describe the scoresheet-builder UI, even though it is the only way an operator defines which moves and bonuses exist and their point values before a phase can be scored. `openspec/specs/competition-domain/spec.md`'s "A phase configures its own run, judge, and scoring rules" requirement already refers to "the scoresheet used to score it," but nothing documents how that scoresheet is authored. This documents existing, already-shipped behavior — there is no new code to write.

## What Changes

- Add a `scoresheet-builder` capability spec covering: creating a scoresheet, adding/editing/reordering/deleting its moves, adding/editing/reordering/deleting bonus types across all of a scoresheet's moves, submitting edits to the server, and the server-side validation that rejects edits.
- No behavior changes to application code — this is a documentation-only change grounded in `Webapp/src/components/ScoresheetBuilder/` and its tests, and `Server/app/scoresheetEndpoints.py` and its tests.

## Capabilities

### New Capabilities
- `scoresheet-builder`: The UI and backend endpoint for authoring scoresheets — defining a scoresheet's moves (name, direction, F/L and R/B point values) and bonus types (name, per-move point value), reordering them, deleting them, and the server's protection against edits that would corrupt already-scored runs.

### Modified Capabilities
(none — this proposal only adds a new capability; it does not change any existing requirement)

## Impact

- Affected code: `Webapp/src/components/ScoresheetBuilder/*.tsx` (read-only, no edits), `Webapp/src/components/competition/ScoresheetSelector.tsx`, `Server/app/scoresheetEndpoints.py`, `Server/app/crud/scoresheet.py`, `Server/app/crud/availablemoves.py`, `Server/app/crud/availablebonuses.py`, `Server/scripts/seed_scoresheets.py`.
- No API, schema, or dependency changes. Planning-only change: `openspec/changes/add-scoresheet-builder-spec/` artifacts only.
