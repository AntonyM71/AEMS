# Proposal

## Why

An operator controls what's shown on two live displays - an on-venue "Arena" screen and a TV/CG broadcast overlay - via a single control panel broadcasting one shared state over Socket.IO. This is a real, actively-developed feature (per `Webapp/src/components/broadcast/Components.md`'s own backlog) with non-trivial behavior - a Pixi.js intro/hold/outro animation engine, a control panel with guard rails, and a broadcast overlay that's mid-migration and doesn't yet honor half its own toggles - none of which is in `openspec/specs/`. The backend Socket.IO relay it rides on (`broadcastEndpoints.py`) is trivial by itself; the feature it drives is not.

## What Changes

- Document the control panel: toggling a display option re-broadcasts the operator's full current state to every connected viewer, and toggles that depend on a selection (event/heat/phase) are blocked with an on-screen message when that selection hasn't been made.
- Document the venue ("Arena") screen: the live timer is always shown; current-athlete details follow the live-run-score toggle; event title, heat summary, and phase results appear as fullscreen takeovers when toggled on.
- Document the broadcast (TV/CG) overlay's Pixi.js frame-sequence engine: how an element's intro/hold/outro animation plays, what happens when a toggle flips mid-animation, and graceful handling of a frame sequence that fails to load.
- Document, as current behavior rather than a gap to silently paper over, that only 3 of the 6 broadcast display options (event title, heat summary, phase results) currently have any visible effect on the broadcast overlay - the other 3 (ICF logo, live run score, timer) exist in the control panel and get broadcast, but their overlay-side components were left disconnected during an in-progress migration to the Pixi engine.
- Document that the live timer display reflects the most recently received timer value.
- No code changes - this backfills a spec for behavior that already exists (aside from the Pixi engine's own test-coverage gap, tracked separately).

## Capabilities

### New Capabilities
- `broadcast-overlay-control`: How an operator controls what's shown on the venue screen and the TV/CG broadcast overlay, spanning the Webapp control panel, both display surfaces, and the Pixi.js animation engine the broadcast overlay uses.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Webapp/src/components/broadcast/` (`controller.tsx`, `overlay.tsx`, `PixiFrameSequenceOverlay.tsx`, `FullscreenPixiOverlay.tsx`, `Cards/*`, `useSyncOverlaySelectionState.ts`), `Webapp/src/components/arena/arena.tsx`, `Webapp/src/redux/services/streamingApi.ts`, `Webapp/src/components/roles/headJudge/LiveTimer.tsx`, and their `__tests__`. No application code, migrations, or APIs change.
