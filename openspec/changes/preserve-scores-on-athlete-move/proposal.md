# Proposal

## Why

Moving a paddler into the right heat throws away everything they have already scored, even
when the new heat scores them against the same scoresheet.

Scored moves are keyed by heat and phase, not by the athlete-heat entry that says where the
athlete belongs. Editing an athlete's heat or phase therefore updates that entry and leaves
the moves pointing at where the athlete used to be, orphaned and invisible. The webapp covers
this by deleting them outright, and warns the operator that it will.

The common reason to move a paddler is that they were entered in the wrong heat of the same
event — the scoresheet, and so every move id already recorded against them, stays valid. There
is no reason to destroy those scores, and at a live event the operator's only recourse is to
have every judge re-score the runs from memory or from paper.

Three further problems sit in the same flow:

- The webapp deletes the moves in a **separate request** from the one that moves the athlete.
  If the delete fails or the tablet drops off the venue network between the two, the athlete
  has moved and the scores are still sitting on the old heat, where nothing will ever show or
  clean them up.
- That delete removes `scoredMoves` rows **only**. The matching `scoredBonuses` rows reference
  them by `move_id` and are left behind as orphans, as are the athlete's `runStatus` rows —
  so a run's locked and did-not-start flags survive a move that erases the scores they
  describe.
- The delete is scoped by heat and athlete but **not** by phase. No supported flow currently
  puts one athlete in two phases of a single heat, so this is latent rather than live, but
  nothing in the schema prevents it either — `athleteheat` carries no constraint against it.

A fourth, unrelated bug sits in the same edit dialog and the same request: the dialog never
loads an athlete's existing `last_phase_rank`, so every edit — including a bib-only correction
that moves nobody — sends `last_phase_rank: null` and wipes whatever rank a prior promotion
recorded for them. It has nothing to do with scores, but it is the same PATCH call this change
already rewrites, so it is fixed alongside rather than filed separately.

## What Changes

- Move the decision into the server's `PATCH /athleteheat/{id}`, which is the single point
  where an athlete changes heat or phase. It compares the old and new phase's scoresheet and,
  in the same transaction that moves the athlete, either re-points that athlete's scores at
  the new heat and phase or deletes them.
- Re-point rather than copy: the `scoredMoves` rows keep their ids, so the `scoredBonuses`
  that reference them travel with them for free. `runStatus` rows move alongside, so a locked
  or did-not-start run stays locked or did-not-start.
- Delete `scoredBonuses` and `runStatus` too on the path that does discard scores, instead of
  leaving them orphaned, and scope every query by phase as well as heat and athlete.
- Decline to re-point when the destination already holds scores or run statuses for that
  athlete, keeping what is already there and discarding what was carried. Two sets of moves
  for one run and judge would otherwise be summed into a single inflated score.
- Report which of the two happened in the response, so the webapp states what it did rather
  than re-deriving the rule on the client.
- Warn the operator accurately before they save: the edit dialog already knows each phase's
  scoresheet, so it can say whether this particular move keeps the scores or clears them.
- Remove `DELETE /scoredmoves`. This flow was its only consumer, and an offline venue server
  is better off without an unauthenticated bulk-delete of scoring data.
- Thread the athlete's current `last_phase_rank` into the edit dialog, so it is preserved by
  default instead of reset to null on every edit.

Moves belonging to runs the destination phase does not have — run 3 carried into a two-run
phase — are preserved rather than trimmed. Rankings, the phase results PDF and promotion all
read runs from the phase's configured run count and never see them, so results are unaffected,
and the scores survive if the athlete is moved back or the phase's run count is raised later.
The one visible effect is an extra, otherwise-empty run column in that heat's results table and
arena display; `design.md` records why that is preferred to deleting the runs irreversibly.

## Capabilities

### Modified Capabilities

- `competition-management`: replaces the requirement that moving an athlete clears their
  scored moves with one that preserves them when the destination phase scores against the same
  scoresheet, and clears them only when it does not. Adds requirements that the move and the
  fate of its scores are applied as one atomic operation, that bonuses and run statuses follow
  the scores rather than being orphaned, that a destination already holding scores is not
  overwritten, that the operator is warned which of the two outcomes their pending edit will
  have, and that editing an athlete preserves their previously recorded phase rank unless the
  edit changes it.

## Impact

- **Server**: `app/crud/athleteheat.py` gains the move logic; `app/crud/schemas.py` gains an
  outcome field on `AthleteHeatResponse`; `app/crud/scoredmoves.py` and its tests are deleted
  and its router unregistered from `main.py`.
- **Webapp**: `HeatSummaryTable.tsx` drops its `deleteOldMoves` call and its unconditional
  warning, gaining a helper that compares the two phases' scoresheets to warn accurately, a
  toast that reports the server's outcome, and an athlete's existing `last_phase_rank` threaded
  through `EditAthleteDialog` so it survives an edit that doesn't change it.
- **API contract**: an endpoint is removed and a response schema gains a field, so
  `buildApi.sh` must run again and regenerate `Common/openapi.json`.
- **Database**: no schema change and no migration. Only row contents move.
- **Scoring**: the calculations are untouched. What changes is which heat and phase the rows
  they read are attached to.
