# Tasks

This change documents existing, shipped behavior — there is no application code to write. These tasks are for the human reviewer to verify the spec delta (`specs/competition-management/spec.md`) accurately reflects the code and tests it cites, before archiving.

## 1. Verify navigation and creation requirements against the webapp

- [ ] 1.1 Confirm "A competition must be selected..." and "Operators can create a competition by name" against `Webapp/src/components/competition/CompetitionSelector.tsx` and `__tests__/CompetitionSelector.test.tsx`; run `npm test -- CompetitionSelector` from `Webapp/`
- [ ] 1.2 Confirm the event/phase selection-scoping scenarios against `EventSelector.tsx`/`PhaseSelector.tsx` and their `__tests__`; run `npm test -- EventSelector PhaseSelector` from `Webapp/`
- [ ] 1.3 Confirm "Operators add events, phases, and heats... inline" and "...edit an existing phase's or heat's details in place" against `PhaseSelector.tsx`/`HeatSelector.tsx` and their `__tests__`; run `npm test -- HeatSelector` from `Webapp/`
- [ ] 1.4 Confirm "Selecting a heat resets the active paddler and run" against `HeatSelector.tsx`'s `onSelect` and the "displays heats in select dropdown and allows selection" test

## 2. Verify start-list upload requirements against the server

- [ ] 2.1 Confirm "Operators can bulk-create a competition from an uploaded start list" and the required-columns/file-type scenarios against `Server/app/competition_management/create_competition_from_xlsx.py`; run `uv run python -m pytest app/competition_management/tests/test_create_competition_from_xlsx.py` from `Server/`
- [ ] 2.2 Confirm the run/scoring-run validation scenarios (upload, phase update) against `Server/app/competition_management/tests/test_upload_endpoint.py` and `Server/app/crud/tests/test_phase.py`; run `uv run python -m pytest app/competition_management/tests/test_upload_endpoint.py app/crud/tests/test_phase.py` from `Server/`
- [ ] 2.3 Confirm the random-heat-allocation scenario against `test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet_and_random_heats` and the `TestMakeRandomHeats` cases

## 3. Verify athlete management requirements

- [ ] 3.1 Confirm "Operators add athletes to a heat and assign them to a phase" against `Webapp/src/components/competition/HeatSummaryTable.tsx` (`AddAthletesToHeat`) and `__tests__/HeatSummaryTable.test.tsx`; run `npm test -- HeatSummaryTable` from `Webapp/`
- [ ] 3.2 Confirm "Moving an athlete to a different heat or phase clears their previously scored moves" against `AddAthletesToHeat`'s `deleteOldMoves` call — note the only end-to-end test of this (`shows warning and deletes moves when moving athlete to different heat`) is currently `it.skip`'d; decide whether to un-skip it before relying on this scenario as tested

## 4. Verify PDF report requirements

- [ ] 4.1 Confirm the phase-results PDF requirement against `Server/app/competition_management/pdfEndpoints.py` (`phase_pdf`) and `Webapp/src/components/competition/PhaseScoretable.tsx`; run `uv run python -m pytest app/competition_management/tests/test_pdfEndpoints.py -k phase_pdf` from `Server/`
- [ ] 4.2 Confirm the heat-draw and heat-results PDF requirements against `heat_pdf`/`heat_results_pdf` and `HeatSummaryTable.tsx`/`MakeHeatPDFs.tsx`; run `uv run python -m pytest app/competition_management/tests/test_pdfEndpoints.py -k heat_pdf` from `Server/`
- [ ] 4.3 Note `MakeHeatPDFs.tsx` (multi-heat checkbox selection) has no dedicated frontend test of its own — decide whether that's an acceptable gap or worth adding a test before/alongside archiving this spec

## 5. Verify phase-promotion requirements

- [ ] 5.1 Confirm "Promoting a phase advances the top-ranked athletes..." and the tie scenario against `Server/app/competition_management/competition_management.py` (`promote_phase`, `get_top_n_paddlers_for_phase`, `assign_paddlers_to_heat`) and `Server/app/competition_management/tests/test_competition_management.py`; run `uv run python -m pytest app/competition_management/tests/test_competition_management.py app/competition_management/tests/test_promote_phase_endpoint.py` from `Server/`
- [ ] 5.2 Confirm the promote-phase webapp scenarios against `Webapp/src/components/competition/PromotePhase.tsx` and `__tests__/PromotePhase.test.tsx`; run `npm test -- PromotePhase` from `Webapp/`
- [ ] 5.3 Note there is no full DB-integration test of `POST /competition_management/promote_phase`'s happy path (only its 422 validation-contract tests, plus unit tests of its two helper functions) — decide whether that's an acceptable gap
- [ ] 5.4 Note the "0 paddlers" and "no ranked athletes in source phase" 422 rejections in `promote_phase`/`get_top_n_paddlers_for_phase` are visible in code but not covered by a test — decide whether to add one before relying on this scenario as tested

## 6. Verify results-table requirements

- [ ] 6.1 Confirm the DNS and locked/unlocked styling scenarios against `Webapp/src/components/competition/HeatScoreTable.tsx` and `__tests__/HeatScoreTable.test.tsx`; run `npm test -- HeatScoreTable` from `Webapp/`
- [ ] 6.2 Confirm the judge-scores toggle scenario against the same test file and `PhaseScoretable.tsx`/`__tests__/PhaseScoretable.test.tsx`

## 7. Finalize

- [ ] 7.1 Address or explicitly accept each gap noted in sections 3–5 above
- [ ] 7.2 Confirm no `Webapp/` or `Server/` source files were changed by this proposal (`git status` shows only `openspec/` changes)
- [ ] 7.3 Once reviewed, archive the change to merge the delta into `openspec/specs/competition-management/spec.md` (not performed as part of this proposal)
