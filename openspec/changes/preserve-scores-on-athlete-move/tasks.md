# Tasks

Group 1 lands and passes before anything changes, so the behaviour being replaced is visible
in history and the new behaviour has something to be measured against. Groups 2 and 3 are the
server change, group 4 removes the endpoint it makes dead, group 5 is the webapp, and group 6
holds the coverage that only a running stack can give.

## 1. Baseline today's behaviour, before changing anything

- [x] 1.1 Extend `setupTestData` in `e2e/tests/helpers/testData.ts` to also return `eventId`
      and `athleteHeatId`, both of which it already generates and discards. Every existing
      caller keeps working, since this only widens the returned object. Also widened with
      `competitionId` (same situation — generated and discarded) since 1.2 needs it to create
      a second heat in the same competition
- [x] 1.2 Add `e2e/tests/moveAthlete.spec.ts`: seed an athlete, submit a scored move for them,
      `PATCH /athleteheat/{id}` to a second heat in the same phase, and read the scores back
      from both heats. Assert today's behaviour — the scores are still attached to the *old*
      heat and the athlete now has none. This test is rewritten in 6.1; its job now is to pin
      down what actually happens today
- [x] 1.3 Run it against unchanged code and confirm it passes, then commit it on its own.
      Verified: passes (617ms) against unmodified server code; committed as c213d5a

## 2. The move decision

- [x] 2.1 Add `move_preserves_scores(source_scoresheet, destination_scoresheet,
      destination_is_occupied)` to `Server/app/crud/athleteheat.py`, returning `True` only when
      the scoresheets match and the destination is free
- [x] 2.2 Cover it in `Server/app/crud/tests/test_athleteheat.py` across all four combinations
      of matching/differing scoresheet and occupied/free destination. This is the decision
      logic; the SQL that acts on it is covered by group 6, not by a mocked session.
      Verified: 9/9 pass (`uv run python -m pytest app/crud/tests/test_athleteheat.py`)

## 3. Applying the move server-side

- [x] 3.1 In `partial_update_one_by_primary_key`, read the athlete-heat row's current
      `heat_id`, `phase_id` and `athlete_id` before applying the update, and work out the
      destination heat and phase from the request body, falling back to the current values for
      whichever field the body omits
- [x] 3.2 Return early with no score handling when neither the heat nor the phase changes,
      leaving the endpoint's behaviour identical to today for a name or bib correction
- [x] 3.3 Load the source and destination phases' `scoresheet`, and test the destination for
      existing `scoredMoves` or `runStatus` rows for that athlete. Both checks are needed — a
      destination can hold a did-not-start status with no moves behind it
- [x] 3.4 On the preserving branch, `UPDATE` the athlete's `scoredMoves` and `runStatus` rows
      from the old heat and phase to the new ones, filtering on heat, phase and athlete. The
      `scoredMoves` ids are unchanged, so `scoredBonuses` follow without being touched
- [x] 3.5 On the discarding branch, delete `scoredBonuses` whose `move_id` is among the
      matching `scoredMoves`, then that athlete's `runStatus` rows, then the `scoredMoves`
      themselves — children first, all filtered on heat, phase and athlete
- [x] 3.6 Verify both branches run inside the endpoint's existing transaction, so a failure
      rolls back the athlete-heat update too. Do not add a second `commit`. Confirmed: no
      `with db.begin()` or extra `commit()` added; the single existing `db.commit()` at the end
      covers the move statements too
- [x] 3.7 Before the occupancy check in 3.3, execute
      `SELECT pg_advisory_xact_lock(hashtextextended(:key, 0))` keyed on the destination
      `heat_id`, `phase_id` and `athlete_id`, so a second move targeting the same destination
      blocks until this transaction commits or rolls back rather than racing its occupancy
      check. No unlock call — the lock is transaction-scoped. Proven in 6.6: with the lock
      temporarily removed and the window artificially widened (a 0.5s sleep inserted after the
      occupancy check), the concurrent-move test failed with both requests reporting
      `scores_preserved: true`; with the lock restored and the same widened window still in
      place, it passed reliably — the lock closes the window regardless of timing, not just
      under lucky scheduling
- [x] 3.8 Add `scores_preserved: bool | None` to `AthleteHeatResponse` in
      `Server/app/crud/schemas.py` and set it from the branch taken, leaving it `None` when no
      move happened and on `POST /athleteheat/`. Verified `POST /athleteheat/`'s existing tests
      still pass unmodified — Pydantic's `from_attributes` falls back to the field's `None`
      default when the ORM object has no such attribute

## 4. Remove the endpoint this makes dead

- [x] 4.1 Delete `Server/app/crud/scoredmoves.py` and `Server/app/crud/tests/test_scoredmoves.py`,
      and unregister `scoredmoves_router` from `Server/main.py`
- [x] 4.2 Confirm nothing else references it — at the time of writing its only consumers are
      `HeatSummaryTable.tsx` and the MSW handler in its test file, both removed in group 5.
      Verified: grep finds it only in `aemsApi.ts` (regenerated next) and that test file
- [x] 4.3 Run `./buildApi.sh` from the repo root to regenerate `Common/openapi.json` and
      `Webapp/src/redux/services/aemsApi.ts`, picking up both the removed endpoint and the new
      response field. Verified: `DeleteManyScoredmoves*` gone from `aemsApi.ts`,
      `scores_preserved?: boolean | null` present; full server suite still 328/328

## 5. Webapp

- [x] 5.1 Remove the `useDeleteManyScoredmovesDeleteMutation` import, the `deleteOldMoves`
      binding, and the conditional delete block from
      `Webapp/src/components/competition/HeatSummaryTable.tsx`
- [x] 5.2 Add a named helper — not an inline ternary — that takes the phase list already loaded
      in `AddAthletesToHeat` and reports whether moving from the athlete's current phase to the
      selected one keeps their scores, by comparing the two phases' `scoresheet` values.
      Implemented as `willPreserveScoresOnMove`
- [x] 5.3 Drive the existing `Alert` from that helper: a warning that the scores will be
      deleted when the scoresheets differ, and an informational note that they will be kept
      when they match
- [x] 5.4 Report the server's `scores_preserved` in the toast for the athlete-heat update, so
      the operator is told what actually happened rather than what was predicted. Implemented
      as `describeScoresOutcome`
- [x] 5.5 Add `last_phase_rank` to the `rowData` state type in `HeatAthleteTable` (the row
      already carries it via `HeatInfoResponse`, just unread), pass it as a `last_phase_rank`
      prop through `EditAthleteDialog` into `AddAthletesToHeat`, and initialise the
      `lastPhaseRank` state from that prop instead of `undefined` — the same pattern already
      used for `athleteFirstName` and `bibNumber`
- [x] 5.6 Update `Webapp/src/components/competition/__tests__/HeatSummaryTable.test.tsx`:
      remove the `http.delete("/api/scoredmoves")` handler and its assertion, add cases
      asserting the warning text an operator sees for a same-scoresheet move and for a
      different-scoresheet move, and add a case asserting that editing an athlete with an
      existing `last_phase_rank` and changing only their bib number submits that same rank
      rather than `null`. The old single test's own premise needed updating too: it only
      changed heat (not phase), which under the new logic always preserves scores (scoresheet
      depends on phase, not heat) — so it now expects the info message, not the old
      unconditional warning, split into three focused tests instead of one. Verified: 13/13
      pass in this file, 267/268 in the full webapp suite (the one unrelated failure,
      Scribe.test.tsx, passes cleanly in isolation — flaky under full-suite parallel load, not
      a regression; confirmed by diff scope, this file's diff touches nothing Scribe.tsx uses)
- [x] 5.7 Run `npm run precommit` in `Webapp/`. Ran scoped `eslint --fix` and `prettier -w` on
      just the two changed files instead of the repo-wide `precommit`: a stale `node_modules`
      (package.json already required `uuid@^14.0.2` from the prior `fix-score-write-races`
      change, never reinstalled) meant `npm install` was needed first to get a clean `tsc`, and
      that install shifted formatting-tool versions enough that the full `precommit` reformatted
      ~23 unrelated files repo-wide — reverted all of those, keeping only the two files this
      task actually touches. `tsc` and the full webapp suite were still run unscoped (read-only,
      safe); only the fix-formatting step was scoped

## 6. End-to-end coverage against a real database

This is where the re-pointing itself is proven. The server tests in group 2 use mocked
sessions and cannot show that rows actually moved.

- [x] 6.1 Rewrite `e2e/tests/moveAthlete.spec.ts` from 1.2 to assert the new behaviour: after
      the move, the athlete's scores read back against the new heat with the same values, and
      nothing remains against the old one
- [x] 6.2 Add a case moving an athlete into a phase that uses a different scoresheet, asserting
      the scores are gone from both heats. This needs a second scoresheet — seed one, or create
      a phase against a different seeded sheet. Used the already-seeded `icf_2026` sheet rather
      than seeding a new one
- [x] 6.3 Add a case covering a locked and a did-not-start run surviving a same-scoresheet move.
      Split into two tests rather than one: a genuinely did-not-start run has no scored moves
      behind it, and `getHeatScores`'s athlete list is built from `scoredMoves` (pre-existing,
      unrelated to this change), so a DNS-only athlete never appears in that response — the
      locked case (which has a move) is read back through `getHeatScores` as planned, the DNS
      case through `run_status` directly, with a comment explaining why
- [x] 6.4 Add a case moving an athlete into a heat and phase where they already have scores,
      asserting the destination's scores are unchanged and the athlete's run scores are the
      destination's alone. First attempt used a *different* athlete already scoring in the
      destination heat, which is the ordinary multi-competitor case and correctly preserved
      (caught the test's own wrong premise, not a code bug) — the real "occupied" scenario needs
      the *same* athlete already holding scores there via a second `athleteheat` entry, rewritten
      accordingly
- [x] 6.5 Add a case asserting no orphans survive a discarding move: the bonuses and run
      statuses for the cleared moves are gone, not just the moves
- [x] 6.6 Add a case proving the advisory lock from 3.7: promote an athlete (so they hold two
      `athleteheat` entries), give both entries scores, then fire two `PATCH` requests
      concurrently (`Promise.all`) targeting the same empty destination heat and phase, one
      request per entry. Assert the destination ends up with exactly one entry's scores, not
      both merged. Real network timing alone didn't reliably reproduce the race (5/5 passed even
      with the lock removed), so the window was temporarily widened with a 0.5s sleep after the
      occupancy check to force it — confirmed it then fails without 3.7 (both requests reported
      `scores_preserved: true`) and passes reliably with 3.7 restored, even with the window still
      widened. The sleep was removed afterward; see 3.7's note
- [x] 6.7 Run the full e2e suite against a running stack and confirm `promotePhase.spec.ts` and
      `scoreSubmission.spec.ts` still pass. Verified: both pass, along with 15 other tests
      (moveAthlete, runStatusUpsert, crud, health, app). Two failures are pre-existing and
      structurally unrelated to this change — `multi-worker.spec.ts` needs a second backend
      process on port 8001 plus real Redis pub-sub (this session ran one server with
      `REDIS_URL=memory`), and two `websocket.spec.ts` cases time out waiting for a live UI
      update following a judge-score broadcast, in code this change's diff never touches
      (`customScoringEndpoints.py`, `scoring_logic.py`, the Scribe/HeadJudge components) —
      reported here by name rather than silently set aside, per this session's own verification
      discipline, though not re-verified against a from-scratch `main` checkout

## 7. Finish

- [x] 7.1 Run `uv run ruff check .` and `uv run python -m pytest` in `Server/`. Caught one real
      `ruff check` finding (a missing `# noqa: FBT001` on the new test's boolean parameter,
      matching the one already needed on `expected`), fixed. `ruff format --check` also flagged
      the two files this change touches plus four unrelated ones with pre-existing drift; ran
      `ruff format` scoped to just the two files this change owns, same reasoning as 5.7's
      scoped prettier pass. Verified: `ruff check` clean, 328/328 tests pass
- [x] 7.2 Confirm no Alembic migration was generated — this change moves rows, it does not
      alter the schema. Verified: `Server/alembic/versions/` has no untracked files and its last
      commit predates this branch
- [x] 7.3 Code review on PR #485 surfaced that `_move_athlete_scores` never checks
      `RunStatus.locked`, with no spec or design text saying whether that's intentional.
      Confirmed with the author it's deliberate (an admin move corrects where an athlete's
      entry lives, not what a judge scored, so the lock that protects the latter has no bearing
      on the former) and made it explicit: added "A locked run does not block moving the
      athlete" to the spec delta and a matching section to `design.md`. No code change — the
      already-shipped behaviour (proven by the existing `moveAthlete.spec.ts` locked-run case)
      was correct; only the documentation was missing
