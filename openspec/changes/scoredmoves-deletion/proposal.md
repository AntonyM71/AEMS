# Proposal

## Why

`DELETE /scoredmoves/` bulk-deletes scored moves by filter, and deliberately requires at least one filter to guard against wiping every scored move in the database. That guard, and the filtering behavior around it, isn't documented anywhere in `openspec/specs/`.

## What Changes

- Document that a bulk scored-moves deletion requires at least one of `heat_id`/`athlete_id` filters, rejecting an unfiltered request before touching the database.
- Document that when both filters are given, only scored moves matching both are deleted.
- Document the reported deleted count.
- No code changes — this backfills a spec for behavior that already exists and is already tested.

## Capabilities

### New Capabilities
- `scoredmoves-deletion`: The guard and filtering rules for bulk-deleting scored moves.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/crud/scoredmoves.py` and `Server/app/crud/tests/test_scoredmoves.py`. No application code, migrations, or APIs change.
