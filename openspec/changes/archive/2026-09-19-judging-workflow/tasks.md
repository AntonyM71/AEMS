# Tasks

This change documents shipped behavior; there is no code to write. Each task below verifies a spec requirement against the actual code/tests it was grounded in, so a reviewer can confirm the spec is accurate before it is archived into `openspec/specs/`.

## 1. Role selection (JudgingPage)

- [ ] 1.1 Verify "judging page offers one entry point per judge slot" against `Webapp/src/components/roles/JudgingPage.tsx` (`judgeNumberArray`/`maxJudges`) and `Webapp/src/components/roles/__tests__/JudgingPage.test.tsx`; run `npm test -- JudgingPage` in `Webapp/` and confirm it passes.
- [ ] 1.2 Verify "role entry points are disabled when the heat has no paddlers" against the same test file's "no-paddlers-warning" and disabled-button assertions.

## 2. Scribe scoring workflow

- [ ] 2.1 Verify move recording and auto-submit-on-change against `Webapp/src/components/roles/scribe/Scribe.tsx` and `Webapp/src/components/roles/scribe/__tests__/Scribe.test.tsx`; run `npm test -- Scribe.test` and confirm it passes.
- [ ] 2.2 Verify "loading previously recorded moves does not re-submit" against the `skipSubmitForHydration` ref in `Scribe.tsx` and the corresponding Scribe.test.tsx case.
- [ ] 2.3 Verify "a locked run blocks scribe scoring" against `Scribe.tsx`'s `runStatus?.locked` checks and `MoveCard.tsx`'s `disabled={props.isRunLocked}`.
- [ ] 2.4 Verify double-click-to-delete and bonus-clearing-on-remove against `Webapp/src/components/roles/scribe/InfoBar/ScoredMove.tsx` and `Webapp/src/components/roles/scribe/InfoBar/__tests__/ScoredMove.test.tsx`; run `npm test -- ScoredMove.test`.
- [ ] 2.5 Verify bonus toggle-on/toggle-off and zero-score-disables-chip against `Webapp/src/components/roles/scribe/BonusChip.tsx` and `Webapp/src/components/roles/scribe/tests/BonusChip.test.tsx`; run `npm test -- BonusChip.test`.
- [ ] 2.6 Verify paddler/run wraparound (stepping past the last paddler advances the run) against `Webapp/src/components/roles/scribe/InfoBar/PaddlerSelector.tsx` and `Webapp/src/components/roles/scribe/InfoBar/__tests__/PaddlerSelector.test.tsx`.

## 3. Head judge aggregation and run control

- [ ] 3.1 Verify per-judge live move/bonus display and mean-score calculation against `Webapp/src/components/roles/headJudge/headJudge.tsx` and `Webapp/src/components/roles/headJudge/__tests__/headJudge.test.tsx`; run `npm test -- headJudge.test`.
- [ ] 3.2 Verify DNS display ("DNS" instead of a number) against `Webapp/src/components/roles/headJudge/FinalScore.tsx` and `__tests__/FinalScore.test.tsx`.
- [ ] 3.3 Verify lock-run control only reflects server-confirmed state (no optimistic flip) against the `headJudge.test.tsx` case "only shows the run locked once the server confirms it, not on click".
- [ ] 3.4 Verify DNS-blocked-while-locked behavior (toast error, no emit) against the `headJudge.test.tsx` case "refuses to set DNS while the run is locked".

## 4. Backend endpoints and real-time channels

- [ ] 4.1 Verify `/addUpdateAthleteScore` persists and broadcasts on `/current_scores` against `Server/app/scoring/customScoringEndpoints.py::update_athlete_score` and `Server/app/scoring/tests/test_customScoringEndpoints.py::test_update_athlete_score_persists_and_broadcasts`; run `uv run python -m pytest app/scoring/tests/test_customScoringEndpoints.py` in `Server/`.
- [ ] 4.2 Verify a locked run rejects score submission against `_persist_athlete_score`'s `UpdatingLockedRunError` path and `check_run_is_locked`'s unit tests. No end-to-end test currently exercises the rejected-submission HTTP response directly — note this gap for the reviewer rather than asserting more than the code shows.
- [ ] 4.3 Verify `/run_status` persists and broadcasts to every subscriber against `on_run_status` in `customScoringEndpoints.py` and `test_on_run_status_persists_and_broadcasts`.
- [ ] 4.4 Verify WebSocket-only transport for `/run_status` and `/current_scores` against `Webapp/src/components/roles/headJudge/WebSocketConnections.ts` and `__tests__/WebSocketConnections.test.ts`.

## 5. Cross-capability consistency

- [ ] 5.1 Confirm this spec links to, rather than restates, `openspec/specs/scoring/spec.md` for scoring math (move/bonus point values, run averaging, ranking, tie-breaks).
- [ ] 5.2 Run `openspec validate judging-workflow --strict` and confirm it passes.
