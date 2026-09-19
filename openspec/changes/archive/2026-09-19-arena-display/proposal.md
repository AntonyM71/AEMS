# Proposal

## Why

AEMS has four existing capability specs, and all four describe backend/domain logic only (`competition-domain`, `scoring`, `server-configuration`, `timer-configuration`) — none describe a user-facing UI workflow. The arena display (`Webapp/src/components/arena/`) is a shipped, tested screen that venue staff run on an arena monitor throughout every heat, but nothing in `openspec/specs/` documents what it shows or how it stays live. This proposal backfills a spec for that existing behavior so it has the same documented contract as the backend capabilities.

## What Changes

- Document the arena display as a new capability: a fixed, always-on-screen layout (athlete info, run details, live countdown timer, final score) plus full-screen sliding modals (heat summary, phase results, event title) that a broadcast operator toggles remotely.
- Document how the display stays live: it subscribes to the `broadcast_control` Socket.IO stream for what to show, the `timer` stream for the countdown, and the `run_status` stream for did-not-start (DNS) state on the shown athlete's run.
- Document the venue-scale dark theme (opaque background, oversized white type) that distinguishes the arena from the broadcast overlay, which composes the same underlying cards on a transparent background over Pixi.js artwork.
- No code changes — this documents existing, already-tested behavior.

## Capabilities

### New Capabilities
- `arena-display`: The athlete/venue-facing arena screen — what it always shows, what the broadcast operator can toggle on/off, and how it receives live updates over Socket.IO.

### Modified Capabilities
(none)

## Impact

- Affected code: none (documentation only). Referenced source: `Webapp/src/components/arena/arena.tsx`, `liveTimerArena.tsx`, `arenaTheme.tsx`, `Webapp/src/components/roles/headJudge/LiveTimer.tsx`, `Webapp/src/redux/services/streamingApi.ts`, `Webapp/src/components/broadcast/Cards/*`, `Webapp/src/components/broadcast/SlidingModal.tsx`, `Webapp/src/components/broadcast/useSyncOverlaySelectionState.ts`.
- Out of scope: the Timer hardware's own countdown/buzzer logic (covered separately by the in-flight `timer-operation` change) and the broadcast overlay's Pixi.js compositing (a separate capability).
