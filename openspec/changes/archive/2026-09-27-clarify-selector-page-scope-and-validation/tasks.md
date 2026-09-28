# Tasks

## 1. Validate the spec delta

- [x] 1.1 Run `openspec validate clarify-selector-page-scope-and-validation --strict` and verify it reports no errors
- [x] 1.2 Re-read `Webapp/src/pages/Admin.tsx`, `Webapp/src/components/roles/JudgingPage.tsx`, `Webapp/src/components/roles/headJudge/headJudge.tsx`, `Webapp/src/components/roles/scribe/InfoBar.tsx`, and `Webapp/src/components/competition/MakeHeatPDFs.tsx` and confirm each still passes `showDetailed` exactly as described in the delta (Admin: `true`; the other four: `false`), so the new page-scoped requirements still match shipped behavior
- [x] 1.3 Re-read `Webapp/src/components/competition/PhaseSelector.tsx`'s `AddPhase` `disableSubmit` condition and confirm it still requires name, event, judge count > 0, run count > 0, and scoresheet, so the new validation requirement still matches shipped behavior

## 2. Archive

- [x] 2.1 Run `/opsx:archive` to merge this delta into `openspec/specs/competition-management/spec.md`
