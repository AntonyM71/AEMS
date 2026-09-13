# Follow-up: validate run counts on the competition upload endpoint

Found while investigating tie-ranking followup item 2 (mixed-run-count ties).

## The gap

`POST /competition_management/upload` (`Server/app/competition_management/competition_management.py`)
takes `number_of_runs` and `number_of_runs_for_score` as raw `Form(...)` int
params and passes them straight through to `process_competitors_df` →
`create_competition_from_xlsx.py`, which builds `Phase` rows directly with
SQLAlchemy. It never goes through `PhaseCreate`/`PhaseUpdate`, so it doesn't
get the `Field(gt=0)` + cross-field validation added for those schemas in the
item-2 fix (`fix/tie-ranking-float-tolerance`).

A `number_of_runs=0` (or `number_of_runs_for_score > number_of_runs`) upload
would create a misconfigured phase the same way a raw `PATCH /phase/{id}`
could before that fix — and `number_of_runs=0` is what lets
`organise_moves_by_athlete_run_judge` fall back to per-athlete run counts,
which is the mechanism behind the mixed-run-count tie bug.

The webapp's `UploadCsv.tsx` already disables its submit button while
`!numberOfRuns`, so this isn't reachable through normal webapp use — only via
a direct call to the upload endpoint (or a future regression in that guard).

## Why it wasn't folded into the item-2 fix

Different code path (`Form(...)` params, not a Pydantic schema client code
already validates), and `/competition_management/upload` has no existing test
coverage at all — fixing it well means writing that coverage first, which is
a bigger, separately-scoped piece of work.

## Suggested fix, when picked up

- Add `gt=0` to both `Form(...)` declarations in
  `competition_management.py::upload`.
- Add the same `number_of_runs_for_score <= number_of_runs` check before
  calling `process_competitors_df`, returning a 422 on violation.
- Needs a first test file for this endpoint (none exists today) — at minimum:
  a valid upload succeeds, `number_of_runs=0` is rejected, and
  `number_of_runs_for_score > number_of_runs` is rejected.
