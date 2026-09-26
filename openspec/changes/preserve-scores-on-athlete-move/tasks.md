# Tasks

Group 1 lands and passes before anything changes, so the behaviour being replaced is visible
in history and the new behaviour has something to be measured against. Groups 2 and 3 are the
server change, group 4 removes the endpoint it makes dead, group 5 is the webapp, and group 6
holds the coverage that only a running stack can give.

## 1. Baseline today's behaviour, before changing anything

- [ ] 1.1 Extend `setupTestData` in `e2e/tests/helpers/testData.ts` to also return `eventId`
      and `athleteHeatId`, both of which it already generates and discards. Every existing
      caller keeps working, since this only widens the returned object
- [ ] 1.2 Add `e2e/tests/moveAthlete.spec.ts`: seed an athlete, submit a scored move for them,
      `PATCH /athleteheat/{id}` to a second heat in the same phase, and read the scores back
      from both heats. Assert today's behaviour — the scores are still attached to the *old*
      heat and the athlete now has none. This test is rewritten in 6.1; its job now is to pin
      down what actually happens today
- [ ] 1.3 Run it against unchanged code and confirm it passes, then commit it on its own

## 2. The move decision

- [ ] 2.1 Add `move_preserves_scores(source_scoresheet, destination_scoresheet,
      destination_is_occupied)` to `Server/app/crud/athleteheat.py`, returning `True` only when
      the scoresheets match and the destination is free
- [ ] 2.2 Cover it in `Server/app/crud/tests/test_athleteheat.py` across all four combinations
      of matching/differing scoresheet and occupied/free destination. This is the decision
      logic; the SQL that acts on it is covered by group 6, not by a mocked session

## 3. Applying the move server-side

- [ ] 3.1 In `partial_update_one_by_primary_key`, read the athlete-heat row's current
      `heat_id`, `phase_id` and `athlete_id` before applying the update, and work out the
      destination heat and phase from the request body, falling back to the current values for
      whichever field the body omits
- [ ] 3.2 Return early with no score handling when neither the heat nor the phase changes,
      leaving the endpoint's behaviour identical to today for a name or bib correction
- [ ] 3.3 Load the source and destination phases' `scoresheet`, and test the destination for
      existing `scoredMoves` or `runStatus` rows for that athlete. Both checks are needed — a
      destination can hold a did-not-start status with no moves behind it
- [ ] 3.4 On the preserving branch, `UPDATE` the athlete's `scoredMoves` and `runStatus` rows
      from the old heat and phase to the new ones, filtering on heat, phase and athlete. The
      `scoredMoves` ids are unchanged, so `scoredBonuses` follow without being touched
- [ ] 3.5 On the discarding branch, delete `scoredBonuses` whose `move_id` is among the
      matching `scoredMoves`, then that athlete's `runStatus` rows, then the `scoredMoves`
      themselves — children first, all filtered on heat, phase and athlete
- [ ] 3.6 Verify both branches run inside the endpoint's existing transaction, so a failure
      rolls back the athlete-heat update too. Do not add a second `commit`
- [ ] 3.7 Before the occupancy check in 3.3, execute
      `SELECT pg_advisory_xact_lock(hashtextextended(:key, 0))` keyed on the destination
      `heat_id`, `phase_id` and `athlete_id`, so a second move targeting the same destination
      blocks until this transaction commits or rolls back rather than racing its occupancy
      check. No unlock call — the lock is transaction-scoped
- [ ] 3.8 Add `scores_preserved: bool | None` to `AthleteHeatResponse` in
      `Server/app/crud/schemas.py` and set it from the branch taken, leaving it `None` when no
      move happened and on `POST /athleteheat/`

## 4. Remove the endpoint this makes dead

- [ ] 4.1 Delete `Server/app/crud/scoredmoves.py` and `Server/app/crud/tests/test_scoredmoves.py`,
      and unregister `scoredmoves_router` from `Server/main.py`
- [ ] 4.2 Confirm nothing else references it — at the time of writing its only consumers are
      `HeatSummaryTable.tsx` and the MSW handler in its test file, both removed in group 5
- [ ] 4.3 Run `./buildApi.sh` from the repo root to regenerate `Common/openapi.json` and
      `Webapp/src/redux/services/aemsApi.ts`, picking up both the removed endpoint and the new
      response field

## 5. Webapp

- [ ] 5.1 Remove the `useDeleteManyScoredmovesDeleteMutation` import, the `deleteOldMoves`
      binding, and the conditional delete block from
      `Webapp/src/components/competition/HeatSummaryTable.tsx`
- [ ] 5.2 Add a named helper — not an inline ternary — that takes the phase list already loaded
      in `AddAthletesToHeat` and reports whether moving from the athlete's current phase to the
      selected one keeps their scores, by comparing the two phases' `scoresheet` values
- [ ] 5.3 Drive the existing `Alert` from that helper: a warning that the scores will be
      deleted when the scoresheets differ, and an informational note that they will be kept
      when they match
- [ ] 5.4 Report the server's `scores_preserved` in the toast for the athlete-heat update, so
      the operator is told what actually happened rather than what was predicted
- [ ] 5.5 Add `last_phase_rank` to the `rowData` state type in `HeatAthleteTable` (the row
      already carries it via `HeatInfoResponse`, just unread), pass it as a `last_phase_rank`
      prop through `EditAthleteDialog` into `AddAthletesToHeat`, and initialise the
      `lastPhaseRank` state from that prop instead of `undefined` — the same pattern already
      used for `athleteFirstName` and `bibNumber`
- [ ] 5.6 Update `Webapp/src/components/competition/__tests__/HeatSummaryTable.test.tsx`:
      remove the `http.delete("/api/scoredmoves")` handler and its assertion, add cases
      asserting the warning text an operator sees for a same-scoresheet move and for a
      different-scoresheet move, and add a case asserting that editing an athlete with an
      existing `last_phase_rank` and changing only their bib number submits that same rank
      rather than `null`
- [ ] 5.7 Run `npm run precommit` in `Webapp/`

## 6. End-to-end coverage against a real database

This is where the re-pointing itself is proven. The server tests in group 2 use mocked
sessions and cannot show that rows actually moved.

- [ ] 6.1 Rewrite `e2e/tests/moveAthlete.spec.ts` from 1.2 to assert the new behaviour: after
      the move, the athlete's scores read back against the new heat with the same values, and
      nothing remains against the old one
- [ ] 6.2 Add a case moving an athlete into a phase that uses a different scoresheet, asserting
      the scores are gone from both heats. This needs a second scoresheet — seed one, or create
      a phase against a different seeded sheet
- [ ] 6.3 Add a case covering a locked and a did-not-start run surviving a same-scoresheet
      move, read back through the heat scores response
- [ ] 6.4 Add a case moving an athlete into a heat and phase where they already have scores,
      asserting the destination's scores are unchanged and the athlete's run scores are the
      destination's alone — the inflated-score failure this guard exists to prevent
- [ ] 6.5 Add a case asserting no orphans survive a discarding move: the bonuses and run
      statuses for the cleared moves are gone, not just the moves
- [ ] 6.6 Add a case proving the advisory lock from 3.7: promote an athlete (so they hold two
      `athleteheat` entries), give both entries scores, then fire two `PATCH` requests
      concurrently (`Promise.all`) targeting the same empty destination heat and phase, one
      request per entry. Assert the destination ends up with exactly one entry's scores, not
      both merged, and that this fails without 3.7 — run it once against the endpoint with 3.7
      commented out or reverted to confirm it actually catches the race before trusting it green
- [ ] 6.7 Run the full e2e suite against a running stack and confirm `promotePhase.spec.ts` and
      `scoreSubmission.spec.ts` still pass

## 7. Finish

- [ ] 7.1 Run `uv run ruff check .` and `uv run python -m pytest` in `Server/`
- [ ] 7.2 Confirm no Alembic migration was generated — this change moves rows, it does not
      alter the schema
