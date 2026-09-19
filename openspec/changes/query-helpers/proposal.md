# Proposal

## Why

`Server/app/crud/query_helpers.py` is the shared filtering, ordering, and pagination engine every list endpoint (athlete, heat, phase, event, etc.) is built on, but it isn't in `openspec/specs/`. It's also only exercised indirectly through individual endpoints' own tests — no test targets it directly (tracked separately as a GitHub issue) — which makes writing its contract down now more valuable, not less.

## What Changes

- Document the substring-match ordering rule: the first `sortable` key that substring-matches a requested order-by string wins, `desc` anywhere in that string selects descending order, and a string matching no key leaves that request's ordering unapplied.
- Document that a missing/empty `values` list skips an IN-filter for that column entirely.
- Document that range filter bounds and pagination bounds apply whenever they are not `None`, so `0` is a real, applied bound in both cases.
- No code changes — this backfills a spec for behavior that already exists and is already exercised indirectly by every list endpoint's tests (e.g. `test_event.py`'s ordering tests).

## Capabilities

### New Capabilities
- `query-helpers`: The shared filtering, ordering, and pagination rules used by every CRUD list endpoint.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/crud/query_helpers.py` (which already carries detailed docstrings for each rule) and its indirect exercise in `Server/app/crud/tests/test_event.py`. No application code, migrations, or APIs change.
