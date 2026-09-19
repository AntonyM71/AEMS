# Tasks

This change documents existing, shipped Timer behavior — there is no code to write. Tasks are verification and review steps a human should complete before archiving.

## 1. Verify the spec against code and tests

- [ ] 1.1 Read `Timer/src/timer.py` alongside `openspec/changes/timer-operation/specs/timer-operation/spec.md` requirement by requirement and confirm each scenario matches the current implementation (mode-switch duration selection, two-phase countdown timing, buzzer sequencing, display updates, Socket.IO queuing/emit/reconnect)
- [ ] 1.2 From `Timer/`, run `uv run python -m pytest` and confirm the tests backing this spec still pass: `TestGetTotalDuration`, `TestUpdateBuzzer`, `TestSendTimerUpdate`, `TestRunTimerPhase`, `TestBuzz`, `TestStartCancelTimer`, `TestProcessMessageQueueSync`, `TestStartSocketIOThread`, `TestSocketIOTransport`
- [ ] 1.3 Confirm with the Timer maintainer whether the `"started"` value in `StatusLiteral`/`get_short_status` is intentionally unused (no call site currently sends it) or a missing call site, and adjust the spec or file a follow-up accordingly

## 2. Review

- [ ] 2.1 Human review of `proposal.md` and `specs/timer-operation/spec.md` for accuracy, and confirm no overlap with `openspec/specs/timer-configuration/spec.md` (configuration validation stays out of scope here)
- [ ] 2.2 Confirm the spec describes only what the Timer app emits/does, with no Webapp-side (arena-display) requirements, since that is a separate capability

## 3. Merge

- [ ] 3.1 Once reviewed and approved, archive this change (`/opsx:archive` or `openspec archive timer-operation`) to create `openspec/specs/timer-operation/spec.md`
