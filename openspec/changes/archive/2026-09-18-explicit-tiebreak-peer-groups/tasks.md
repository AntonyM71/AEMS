# Tasks

## 1. Widen the tie-break reason to the full peer group

- [x] 1.1 Update `build_tie_break_reason` in `Server/app/scoring/scoring_logic.py` to report the whole still-tied peer group at the deciding criterion, keeping the existing rival-direction logic that picks which criterion decides
- [x] 1.2 Update existing tests in `Server/app/scoring/tests/test_scoring_logic.py` whose expected reason strings only name two athletes where a third was actually still tied going into that criterion (7 tests affected, verified against actual output rather than hand-traced)
- [x] 1.3 Confirm a test reproduces issue #434's exact shape directly (`test_fully_tied_pair_below_a_cleared_athlete_is_told_it_is_unresolved` already covers a clear leader above two athletes tied with each other; updated and commented with the issue reference rather than duplicating it)
- [x] 1.4 Run `uv run python -m pytest` (291 passed) and `uv run ruff check .` / `uv run ruff format .` from `Server/`

## 2. Fix findings from review

- [x] 2.1 Fix the peer group being sorted by the deciding criterion's value alone, which let two athletes tied at that value keep the caller's arbitrary input order instead of their true finish order; correct the 3 affected test expectations
- [x] 2.2 Rename `_scores_match` to `_floats_match` and use it for every float comparison in `build_tie_break_reason`, so a genuine tie can't be missed by raw equality (verified no realistic failure case exists for these specific values, added as defense-in-depth)
- [x] 2.3 Re-run `uv run python -m pytest` (291 passed) and `uv run ruff check .` / `uv run ruff format .` after both fixes
