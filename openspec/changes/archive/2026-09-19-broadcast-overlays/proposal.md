# Proposal

## Why

AEMS has a shipped broadcast/arena overlay feature (`Webapp/src/components/broadcast/`, `Server/app/broadcastEndpoints.py`) with its own control UI, Socket.IO channel, and Pixi.js-rendered frame-sequence animations, but it has never had an OpenSpec capability. A review of the four existing specs found all of them describe backend/domain logic only — none document any user-facing UI workflow, and this feature in particular has substantial behavior (operator control state, animation lifecycle, dual-surface rendering) with no spec of record. This proposal documents that existing, shipped behavior as a new capability so it is covered going forward.

## What Changes

- Add a new `broadcast-overlays` capability spec describing:
  - The operator control UI (`controller.tsx`) and the state it drives (`OverlayControlState`): selection fields (competition/event/phase/heat/athlete/run) and visibility toggles.
  - Server-side relay of that control state over the Socket.IO `/broadcast_control` namespace (`Server/app/broadcastEndpoints.py`), including that it echoes to all connected clients, including the sender.
  - The two consuming surfaces that both subscribe to the same relayed state: the fullscreen `/Broadcast/Overlay` page (Pixi-composited over animated frame-sequence backgrounds) and the `/Arena` venue-screen page (the same Card components over a plain dark theme via sliding modals, no Pixi).
  - The `PixiFrameSequenceOverlay` intro/hold/outro playback lifecycle and its config-driven frame resolution against the GraphicsServer's `/componentInfo/{name}` contract.
  - Theming: a single set of Card components rendered under two different MUI themes (`overlayTheme`/`arenaTheme`) via the `AemsBasicTable`/`AemsHeatSummary`/`AemsPhaseResults`/`AemsEventTitle` theme-prop slots, so the same components produce frame-registered layout on the overlay and content-flow layout on the arena.
  - Redux sync: `useSyncOverlaySelectionState` pushing the relayed selection fields into the local competition/scoring Redux state so other components (e.g. scoresheet data fetches) pick up the operator's selection.
- No application code changes — this is a documentation-only change capturing existing behavior.

## Capabilities

### New Capabilities
- `broadcast-overlays`: Operator-controlled broadcast/arena overlay rendering — the control UI and its relayed state, the Pixi frame-sequence intro/hold/outro animation lifecycle, and the two surfaces (fullscreen broadcast overlay, arena venue screen) that render the same Card components against that state under different themes.

### Modified Capabilities
(none)

## Impact

- Affected code (read-only, no edits): `Webapp/src/components/broadcast/**`, `Webapp/src/components/arena/**`, `Webapp/src/pages/Broadcast/**`, `Webapp/src/pages/Arena.tsx`, `Webapp/src/redux/services/streamingApi.ts` (broadcast_control stream/mutation), `Webapp/src/components/Interfaces.tsx` (`OverlayControlState`), `Server/app/broadcastEndpoints.py`.
- Related ADRs (linked, not restated): `docs/decisions/ADR005-use-webgl-and-nginx-for-overlays.md`, `docs/decisions/ADR007-use-pixi-react-frame-sequence-wrapper-for-overlay-composition.md`.
- `GraphicsServer/` is referenced only as the contract the overlay fetches against (`/componentInfo/{name}`, `/assets/...`); it remains out of scope as its own capability since it is a static asset host with no application logic.
