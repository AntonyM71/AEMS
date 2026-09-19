# Tasks

This change documents existing, already-shipped behavior. There is no code to write — these tasks verify the spec against the code and tests it claims to describe, and prepare it for archive.

## 1. Verify frontend requirements against existing tests

- [ ] 1.1 Check "A scoresheet is created by name" and "An existing scoresheet can be selected for editing" against `Webapp/src/components/ScoresheetBuilder/__tests__/AddScoresheet.test.tsx` and `__tests__/ScoresheetBuilderPage.test.tsx` — verified when every scenario maps to a passing test case
- [ ] 1.2 Check "A move defines a name, direction, and point values", "Moves and bonus scores are editable in place", and "A new move offers every current bonus type" against `__tests__/AddMove.test.tsx` and `__tests__/EditMove.test.tsx` — verified when every scenario maps to a passing test case
- [ ] 1.3 Check "Deleting a move requires a double click" and "Moves can be reordered" against `__tests__/EditDeleteMove.test.tsx` and `__tests__/ScoresheetBuilder.test.tsx` — verified when every scenario maps to a passing test case
- [ ] 1.4 Check "A bonus type applies across every move on the scoresheet" and "Bonus type columns can be reordered" against `__tests__/Header.test.tsx` — verified when every scenario maps to a passing test case
- [ ] 1.5 Check "Scoresheet edits are submitted together and persisted server-side" against `__tests__/ScoresheetBuilder.test.tsx` (the "successfully updates scoresheet" and "shows an error toast" cases) — verified when both success and failure scenarios map to passing test cases

## 2. Verify backend requirements against existing tests

- [ ] 2.1 Check "The server rejects deleting moves or bonuses already used in scored runs" and "The server restricts edits to moves and bonuses already used in scored runs" against `Server/app/crud/tests/test_scoresheet_endpoints.py` — verified when every scenario maps to a passing test case
- [ ] 2.2 Check "A scoresheet is created by name" and "An existing scoresheet can be selected for editing" (server side: create/list) against `Server/app/crud/tests/test_scoresheet.py` — verified when every scenario maps to a passing test case

## 3. Verify default-seeding requirement

- [ ] 3.1 Check "Default scoresheets are available without manual setup" against `Server/scripts/seed_scoresheets.py` and its invocation in `docker-compose.yaml` and `azure-pipelines.yml` — note in review that no dedicated automated test covers this script directly, so verification here is a manual code read, not a test run

## 4. Prepare for review and archive

- [ ] 4.1 Run `openspec validate --strict` (or `npx openspec validate --strict` from the repo root) against this change and fix any formatting issues it reports
- [ ] 4.2 Get human review of `specs/scoresheet-builder/spec.md` against the running app before archiving, since this spec establishes the baseline for a capability with no prior spec
