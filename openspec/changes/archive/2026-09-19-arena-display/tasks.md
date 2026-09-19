# Tasks

This change documents existing, already-shipped behavior. There is no code to write — these are verification and review tasks, not implementation.

## 1. Verify the spec against source

- [ ] 1.1 Confirm each requirement in `specs/arena-display/spec.md` cites source that still matches current `Webapp/src/components/arena/arena.tsx`, `liveTimerArena.tsx`, `arenaTheme.tsx`, and `Webapp/src/components/roles/headJudge/LiveTimer.tsx`
- [ ] 1.2 Run the arena and live-timer Jest suites and confirm every cited scenario passes: from `Webapp/`, `npm test -- src/components/arena` and `npm test -- src/components/roles/headJudge/__tests__/LiveTimer.test.tsx`

## 2. Resolve reviewer follow-ups

- [ ] 2.1 Confirm whether the arena display's disregard of the timer event's `status` field (started/running/finished/cancelled) is intentional, since no existing test emits a `timer` event with a `status` field to prove it — add a test if the behavior should be locked in
- [ ] 2.2 Confirm whether toggling `showPhaseResults`/`showEventTitle` through the `Arena` component (not just direct-rendering `PhaseScoreTable`/`EventTitle`) deserves an `arena.test.tsx` case matching the existing heat-summary toggle test, since that path is currently grounded in code reading rather than a dedicated test

## 3. Merge into the canonical spec

- [ ] 3.1 Human reviewer reads `openspec/changes/arena-display/specs/arena-display/spec.md` against the code and approves it
- [ ] 3.2 Once approved, archive the change (`openspec archive arena-display` / `/opsx:archive`) to merge the delta into `openspec/specs/arena-display/spec.md`
