# Proposal

## Why

`POST /competition_management/promote_phase` advances an existing phase's top-ranked athletes into a newly-created phase and set of heats — a core competition-progression workflow with several non-obvious rules (rank-based selection, tie handling, heat distribution, config inheritance) that isn't in `openspec/specs/`.

## What Changes

- Document that promotion requires a positive paddler count and a source phase with at least one scored entry.
- Document that only athletes ranked at or within the requested count are promoted, and that a tie at the cutoff rank promotes every tied athlete, not just enough to reach the requested count.
- Document that promoted athletes are distributed into the new heats ordered by rank, from the lowest-ranked group to the highest.
- Document that the new phase inherits its run count, scoring-run count, judge count, and scoresheet from the source phase, except that run/scoring-run/judge counts can be overridden by the request.
- Document that new heats belong to the source phase's competition, and that the request body must be wrapped under a `request_body` key.
- No code changes — this backfills a spec for behavior that already exists and is already tested (aside from the integration-test gap filed separately as a GitHub issue).

## Capabilities

### New Capabilities
- `phase-promotion`: How a phase's top-ranked athletes advance into a newly-created phase and heats.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/competition_management/competition_management.py` (`promote_phase`, `get_top_n_paddlers_for_phase`, `assign_paddlers_to_heat`) and `Server/app/competition_management/tests/test_competition_management.py` + `test_promote_phase_endpoint.py`. No application code, migrations, or APIs change.
