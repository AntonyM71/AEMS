# Proposal

## Why

`competition-domain/spec.md` documents the run-count invariant (`number_of_runs_for_score` cannot exceed `number_of_runs`) only for Phase creation. The same invariant is independently enforced when a Phase is updated (`PATCH /phase/{id}`), against the merged state of the existing Phase and the update — but that isn't in the spec, so a reader would assume the invariant is creation-only.

## What Changes

- Document that updating a Phase re-validates the run-count invariant against the merged (existing + updated) state, in both directions — raising `number_of_runs_for_score` above the existing `number_of_runs`, and lowering `number_of_runs` below the existing `number_of_runs_for_score`, are both rejected.
- Document that an update cannot null out `number_of_runs` or `number_of_runs_for_score`.
- No code changes — this backfills spec coverage for behavior that already exists and is already tested.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `competition-domain`: adds the Phase-update run-count invariant alongside the existing creation-time invariant.

## Impact

Documentation only. Grounded in `Server/app/crud/phase.py` (`partial_update_one_by_primary_key`) and `Server/app/crud/tests/test_phase.py`. No application code, migrations, or APIs change.
