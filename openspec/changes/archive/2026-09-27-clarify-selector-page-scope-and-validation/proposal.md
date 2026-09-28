# Proposal

## Why

A code review of the SelectorPanel refactor (PR #489) found that `competition-management/spec.md` under-documents behavior the webapp already ships: it doesn't say which pages can add/edit events, phases, and heats versus which pages are select-only, and it documents only one of several validation rules that gate the Add/Edit Phase form. It also has an internal defect — a scenario title promises coverage of both competition and event selection changes, but the body only covers the competition case. This proposal brings the spec in line with existing, already-shipped behavior; it does not change any behavior.

## What Changes

- Document that inline add/edit controls for events, phases, and heats are shown only on the Admin page; the Judging, Head Judge, Scribe, and heat-PDF-generation pages render the same selectors in a select-only mode with no add/edit controls.
- Make explicit every validation rule that gates the Add/Edit Phase form's submit button (name, event, judge count, run count, scoresheet), not just the scoring-run-count rule already documented.
- Add the missing "selecting a different event clears phase and heat" scenario, completing a scenario whose title already promised it.
- Reformat the affected scenarios as Given/When/Then, since page/role context (which page you're on) now determines the outcome, and the spec's existing When/Then style has no way to state that precondition.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `competition-management`: adds page-scoped Given clauses to the add/edit-inline and edit-in-place requirements; adds the full Add/Edit Phase validation rule set to the scoring-run-count requirement; completes the competition/event cascade scenario.

## Impact

- Spec-only change: `openspec/specs/competition-management/spec.md`.
- No code changes. The behavior described already exists in `Webapp/src/pages/Admin.tsx`, `Webapp/src/components/roles/JudgingPage.tsx`, `Webapp/src/components/roles/headJudge/headJudge.tsx`, `Webapp/src/components/roles/scribe/InfoBar.tsx`, `Webapp/src/components/competition/MakeHeatPDFs.tsx`, and `Webapp/src/components/competition/{PhaseSelector,EventSelector}.tsx`.
