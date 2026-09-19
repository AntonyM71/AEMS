# Proposal

## Why

A capability review found that all 4 existing OpenSpec specs (`competition-domain`, `scoring`, `server-configuration`, `timer-configuration`) describe backend/domain logic only. None describe the judge/scribe scoring UI workflow that produces the moves and bonuses `scoring` turns into results, even though that workflow is fully built, tested, and in daily use at events. Without a spec for it, there is no documented contract for how judges enter scores, how the head judge aggregates and locks a run, or how the real-time channels between them behave — so changes to that UI have nothing to check themselves against.

## What Changes

- Document the existing judge/scribe scoring workflow as a new `judging-workflow` capability spec: role selection from the judging page, a scribe entering moves/bonuses for their assigned judge slot, live aggregation and display on the head judge's screen, run locking, and did-not-start (DNS) marking.
- Document the real-time mechanics that make the workflow work: the `/current_scores` and `/run_status` Socket.IO namespaces, and how the frontend reuses or opens sockets to emit and receive on them.
- No application code changes. This is a documentation-only change capturing shipped behavior; scoring math itself is out of scope and is covered by the existing `scoring` spec, which this spec links to rather than restates.

## Capabilities

### New Capabilities
- `judging-workflow`: The judge/scribe/head-judge scoring UI workflow — role selection, per-judge move/bonus entry, live cross-judge score aggregation, run locking, and DNS marking, including the Socket.IO channels that carry updates between scribes and the head judge.

### Modified Capabilities
(none — this proposal only adds a new capability; it does not change any requirement in `competition-domain`, `scoring`, `server-configuration`, or `timer-configuration`)

## Impact

- Affected code: none (documentation only). The spec describes existing behavior in `Webapp/src/components/roles/JudgingPage.tsx`, `Webapp/src/components/roles/headJudge/`, `Webapp/src/components/roles/scribe/`, `Webapp/src/redux/services/streamingApi.ts`, `Server/app/scoring/customScoringEndpoints.py`, `Server/app/crud/run_status.py`, and `Server/app/common/socket_manager.py`.
- No API, schema, or dependency changes.
