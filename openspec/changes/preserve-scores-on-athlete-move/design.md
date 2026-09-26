# Design

## Where the decision lives

`PATCH /athleteheat/{id}` is the only way an athlete changes heat or phase. The webapp's edit
dialog is its only caller, `create_competition_from_xlsx` and the promote-phase endpoint both
create fresh athlete-heat rows rather than moving existing ones, and nothing else in the
repository patches one.

Putting the logic there means the scores are handled in the same transaction and the same
request that moves the athlete, and any future caller of that endpoint inherits the behaviour
without knowing it exists.

## What identifies the scores to move

A `scoredMoves` row carries `heat_id`, `phase_id`, `athlete_id`, `run_number`, `judge_id` and
`move_id`. The rows belonging to the athlete being moved are those matching the athlete-heat
row's **current** `heat_id`, `phase_id` and `athlete_id`, read before the update is applied.

`runStatus` shares that key and is filtered identically. `scoredBonuses` carries no heat or
phase of its own — it reaches them through `move_id` — so re-pointing a `scoredMoves` row
without changing its id carries its bonuses along with no further work.

Today's client-side delete filters on heat and athlete only. Adding `phase_id` is defensive
rather than a fix for anything reachable today: no supported flow gives one athlete two phases
within one heat. The XLSX importer and the "Add Athlete" form both mint a fresh `athlete_id`
per entry, so one person entered in two events becomes two `Athlete` rows, and `promote_phase`
does reuse an athlete's id across phases but always creates new heats to place them in. Since
`athleteheat` has no constraint against the state and `POST /athleteheat/` will accept
hand-written rows, filtering on the full key costs nothing and removes the question.

## When the scores survive

`move_id` references `availableMoves`, and each available move belongs to exactly one
scoresheet. If the destination phase scores against a different scoresheet, every preserved
move would reference a move that phase does not offer — the scores would be unreadable and
would corrupt the destination's results. So the scoresheet must match.

The destination must also be free. `scoredMoves` has no unique constraint on
(heat, phase, athlete, run, judge), so re-pointing into a destination that already holds that
athlete's scores would leave two sets of rows for one judge's run.
`organise_moves_by_athlete_run_judge` groups by `judge_id`, so both sets land in one
`JudgeMoves.scored_moves` list and `calculate_run_score` sums them into a single inflated
score — silent corruption, in the path that decides results. `runStatus` fails louder: its
unique constraint on (heat_id, phase_id, athlete_id, run_number) raises an `IntegrityError`.

Checking `runStatus` as well as `scoredMoves` matters because a destination can hold a
did-not-start status with no moves behind it.

The check is deliberately coarse: any `scoredMoves` or `runStatus` row for that athlete in the
destination blocks the whole preserve, even if the source's runs and the destination's occupied
runs don't actually overlap. Reconciling per run would let more moves preserve their scores, but
turns a single, always-safe rule into one that has to reason about partial overlap — not
justified for how rarely a destination already holds a stray row for the exact athlete being
moved into it.

Preserve, then, exactly when:

- the destination phase's scoresheet equals the source phase's, **and**
- the destination holds no `scoredMoves` and no `runStatus` rows for that athlete.

Otherwise delete the source rows, as today. Both branches are expressible as a pure predicate,
which is where the case coverage goes:

```python
def move_preserves_scores(
    source_scoresheet: UUID, destination_scoresheet: UUID, destination_is_occupied: bool
) -> bool:
    return source_scoresheet == destination_scoresheet and not destination_is_occupied
```

When neither `heat_id` nor `phase_id` actually changes — an operator correcting a bib number —
nothing happens to the scores at all, and the endpoint behaves exactly as it does today.

## Statement order inside the transaction

The re-pointing branch runs three statements against the rows identified by the **old** key,
before the athlete-heat row itself is updated:

1. `UPDATE "scoredMoves" SET heat_id = :new_heat, phase_id = :new_phase WHERE ...`
2. `UPDATE "runStatus" SET heat_id = :new_heat, phase_id = :new_phase WHERE ...`
3. update the `AthleteHeat` row

The discarding branch deletes instead, children first: `scoredBonuses` (selected through the
matching `scoredMoves` ids), then `runStatus`, then `scoredMoves`.

The endpoint already runs inside `get_transaction_session`, so a failure anywhere rolls the
whole thing back and the athlete has not moved. That is the point of doing this server-side:
the current two-request client sequence has no such guarantee.

## Runs the destination phase does not have

An athlete moved into a phase with fewer runs keeps moves whose `run_number` is beyond that
phase's `number_of_runs`.

`calculate_phase_scores` passes `number_of_runs` into `organise_moves_by_athlete_run_judge`,
which builds its runs from `range(0, number_of_runs)`. Those moves are never read, so
rankings, tie-breaks, the phase results PDF, the broadcast phase table and promotion are all
provably unaffected.

`calculate_heat_scores_response` does not pass it, so runs fall back to whichever
`run_number`s exist in that athlete's own rows, and `HeatScoreTable` sizes its columns from
the longest `run_scores` array in the heat. One athlete carrying an out-of-range run therefore
adds an empty run column to that heat's results table and arena display.

That cosmetic artifact is preferred to trimming the runs, because trimming is irreversible and
this flow exists to undo mistakes: an athlete moved into the wrong phase and moved straight
back out should come back whole. The artifact requires a move into a phase with *fewer* runs
**and** scores already recorded in the runs being dropped, which also implies a move between
ICF feature types.

Clamping the heat path's run count is deliberately **not** in scope. A heat can hold athletes
from phases with different run counts, so it has no single correct value, and changing it
would alter the display of every such heat for a problem this change only brushes against.

## Serialising concurrent moves into the same destination

Checking the destination is free and then re-pointing rows into it is check-then-act. This only
matters when one athlete has scores reachable through two different `athleteheat` rows at once,
which `promote_phase` produces on purpose: it creates a new `athleteheat` row for a promoted
athlete in the new phase's heat and leaves their old row, and old scores, sitting in the phase
they were promoted from. If an operator later edits both of that athlete's entries — one open
in each of two browser tabs, say — into the same destination heat and phase at nearly the same
instant, both transactions could read the destination as empty before either commits, and both
proceed. That reproduces the exact inflated-score corruption the occupancy check exists to
prevent, just reached by a race instead of a single request.

An ordinary row lock cannot close this: `SELECT ... FOR UPDATE` only locks rows that already
exist, and the dangerous case is exactly the one where the destination has none yet to lock.
The endpoint takes a Postgres advisory lock instead, keyed on the destination
`(heat_id, phase_id, athlete_id)`, before checking occupancy:

```sql
SELECT pg_advisory_xact_lock(hashtextextended(:destination_key, 0))
```

`pg_advisory_xact_lock` blocks until it can acquire the key and releases automatically at
commit or rollback, so a second move into the same destination simply waits for the first
transaction to finish — no lock to remember to release, and no lock held past the request.

This closes the two-operators-same-destination race. It does **not** close a race between this
endpoint and a judge's scribe screen submitting a score for the athlete's *old* heat while the
move is in flight: `_persist_athlete_score` resolves the `scoredMoves` ids it means to delete
in a subquery keyed on `(heat_id, athlete_id, run_number, judge_id)` before deleting by those
ids, so a submission already past that subquery when our transaction commits would delete rows
by id after they have been re-pointed to the new heat, rather than seeing the new heat at all.
Closing that properly means teaching the scoring endpoint about a move in flight — most
naturally by extending the `RunUpdate` watermark ADR010 already introduced for submission
ordering — which is its own change, not a lock this one can add cheaply.

This is accepted as a limitation rather than built out: a judge scoring mid-move is submitting
a deliberate, live edit, and whichever heat that edit ends up attached to is the outcome wanted
— there is no "correct" side of the race to defend here, unlike the destination-occupancy race,
which has an unambiguously wrong outcome (two judges' scores summed into one). The window also
requires an operator to save a move at the exact instant a judge has an in-flight submission
against that athlete's current heat, which the move's own warning dialog already narrows by
making it a single deliberate action rather than a background sync.

## Reporting the outcome

`AthleteHeatResponse` gains `scores_preserved: bool | None` — `true` when the scores were
re-pointed, `false` when they were discarded, `null` when the athlete did not move or the
response is from `POST /athleteheat/`, where nothing was moved.

The webapp could compute the same answer; it already holds every phase's scoresheet. Having
the server report what it did keeps one source of truth for the rule, so the toast cannot
disagree with what the database now contains — the client's copy of the phase list may be
stale, the server's read is inside the transaction.

The client-side comparison still earns its place, but for a different job: warning the
operator *before* they commit, while the server can only report afterward.

## Alternatives considered

**A dedicated `POST /moveAthlete` endpoint.** Names the operation instead of hiding it inside
a CRUD patch, which reads better. Rejected because it leaves `PATCH /athleteheat/{id}` able to
move an athlete badly — the destructive path stays reachable and a future caller has to know
to avoid it. One correct path beats two paths and a convention.

**Leaving the decision in the webapp.** Smallest diff: the existing `deleteOldMoves` call
becomes conditional on the two scoresheets matching. Rejected because it preserves everything
wrong with the current flow — two requests with no transaction around them, the orphaned
bonuses and run statuses, the missing phase filter — and adds a scoring rule to the client
that the server does not enforce.

**Copying the scored moves to new rows rather than re-pointing them.** Would leave an audit
trail of where the scores came from. Rejected as unasked-for: it needs every `scoredBonuses`
row rewritten to reference the new move ids, and the old rows would linger against a heat the
athlete is no longer in, which is the orphaning this change exists to stop.

**Refusing a move that would discard scores, and requiring the operator to confirm.** Rejected
as a worse version of what already exists: the dialog warns before saving, and a mid-event
operator who has decided to move a paddler should not have to fight a second dialog.

## Fixing `last_phase_rank` alongside the move

`AddAthletesToHeat` initialises `lastPhaseRank` state to `undefined` unconditionally, and
`EditAthleteDialog` never passes an athlete's existing rank down to it, so every edit submits
`last_phase_rank: Number(undefined)` — `NaN`, which serialises to `null`. The `PATCH` endpoint
takes any key present in the request body as an explicit change, so this nulls out whatever a
prior promotion recorded, on every edit, including one that changes nothing about the athlete's
heat or phase.

This is unrelated to score preservation, but it sits in the same edit dialog and the same
request this change already rewrites, so it is fixed the same way the rest of the dialog
already works: `athleteFirstName`, `athleteLastName` and `bibNumber` all initialise their state
from the corresponding prop, so re-submitting an untouched field round-trips its existing value
rather than clearing it. `lastPhaseRank` gets the same treatment — initialised from a new
`last_phase_rank` prop, itself read out of the row data `HeatAthleteTable` already holds
(`HeatInfoResponse` already returns the field; it is just never read into `rowData` or
forwarded through `EditAthleteDialog`).

## Out of scope

`AthleteHeatUpdate` also permits changing `athlete_id`, which would reassign the entry to a
different person and leave the original athlete's scores behind. The webapp never sends a
changed `athlete_id`, and "which athlete this entry is for" is not a move in the sense this
change is about. The move logic keys off the athlete-heat row's existing `athlete_id` and
ignores the possibility.
