# Proposal

## Why

Issue #434: in a three-way tie, the tie-break reason for the top-placed athlete only names the one adjacent rival, dropping any other athlete who was equally tied at that same criterion. Example: `#1 (60.00), #2 (50.00)` when #3 also scored 50.00 and was equally part of that comparison. A Head Judge needs the full breakdown to defend a placement if a competitor challenges it.

## What Changes

- `build_tie_break_reason` (`Server/app/scoring/scoring_logic.py`) reports every athlete still tied with this athlete going into the deciding criterion, not just the immediately adjacent rival — even when the group's values at that criterion happen to already be pairwise distinct, so the full field context is always visible for a challenge.
- The direction logic that picks *which* criterion decides a given athlete's placement (compare to the rival above, except the top athlete who compares below) is unchanged — only the reported group at that criterion widens.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `scoring`: the "Resolved ties report a human-readable reason" requirement's scenario changes from naming two athletes to naming every athlete in the peer group at the deciding criterion.

## Impact

`Server/app/scoring/scoring_logic.py` (`build_tie_break_reason`), its tests in `Server/app/scoring/tests/test_scoring_logic.py`. No API schema change — `reason` is still a plain string. No frontend change (the richer string flows through the existing "Notes" column unchanged, same as the original explainable-tiebreak-messages work).
