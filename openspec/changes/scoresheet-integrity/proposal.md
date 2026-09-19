# Proposal

## Why

`POST /addUpdateScoresheet/{scoresheet_id}` bulk-upserts a scoresheet's available moves and bonuses, and enforces several referential-integrity rules so scored runs never end up referencing a deleted or silently-redefined move or bonus. None of that is in `openspec/specs/`, even though it's well-tested and load-bearing for score-data consistency.

## What Changes

- Document that removing a move or bonus already used in a scored run is rejected, and that rejection blocks the whole update (nothing on the scoresheet changes).
- Document that an existing move or bonus cannot be reparented to a different scoresheet (or, for bonuses, a different move).
- Document that a move or bonus already used in a scored run can only have its display order changed going forward; any other field change is rejected.
- Document that everything else (new items, edits to unreferenced items, removal of unreferenced items) is freely upserted/removed.
- No code changes — this backfills a spec for behavior that already exists and is already tested.

## Capabilities

### New Capabilities
- `scoresheet-integrity`: Referential-integrity rules enforced when a scoresheet's available moves and bonuses are bulk added, updated, or removed.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/scoresheetEndpoints.py` and `Server/app/crud/tests/test_scoresheet_endpoints.py`. No application code, migrations, or APIs change.
