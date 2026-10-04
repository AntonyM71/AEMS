# Proposal

## Why

At small competitions that use only the arena screens, someone has to keep stepping the overlay controller through athletes and runs to match what the head judge is scoring. That is a lot of effort for no editorial value (GitHub issue #383). The head judge already steps through the heat in the order the screens should follow, but nothing outside the head judge's own browser can see that position today, so the screens cannot follow it.

## What Changes

- The head judge screen publishes where it is (competition, heat, athlete, run) on a new real-time channel whenever any of those changes. It republishes on request so that late joiners catch up. Event and phase are not published: a heat belongs to a competition, not a phase, so the head judge's event and phase pickers say nothing about who is on the water.
- The overlay controller gains a **Manual / Follow head judge** switch, carried to the display pages as a new `followHeadJudge` flag in the broadcast control state.
  - In Follow mode, the controller's competition, heat, paddler, and run pickers are disabled. An info alert says they are following the head judge and shows the head judge's current athlete and run.
  - Event and phase stay with the operator in both modes, so they still choose which event title and phase results to show.
  - The visibility toggles (logo, timer, live score, modals) stay manual in both modes.
- The arena and broadcast overlay pages read the competition, heat, athlete, and run from the head judge's channel when `followHeadJudge` is set, and from the broadcast control state otherwise. Everything else on them still comes from the broadcast control state.
- A display page asks for the current control state when it connects or reconnects, and an open controller answers. Today a reloaded display shows the default state until someone next touches the controller. That gap matters more once the controller sits idle in a tab, and a reloaded display would otherwise not know it should be following.
- The new channel is a general "where is the head judge?" signal, so a later change can warn a scribe who is not on the head judge's athlete or run without new server work.

**Non-goals:**
- Semi-automatic modals, such as showing the heat summary for a few seconds when the head judge changes heat. These belong in a separate issue.
- The scribe "not on the head judge's page" indicator.
- Follow mode without a controller ever opened. The `followHeadJudge` flag comes from the controller, and a reloaded display needs an open controller to answer its request for it.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `judging-workflow`:
  - Adds a requirement that the head judge screen publishes its position in real time and answers requests for it.
  - Extends the WebSocket-only transport requirement to the new channel.
- `broadcast-overlays`:
  - Adds the controller's Manual / Follow head judge switch.
  - Adds the requirement that display pages take the followed fields from the head judge's channel.
  - Adds the requirement that display pages recover the current control state when they connect, and that the controller answers.
  - Adds `followHeadJudge` (false) to the default control state.

## Impact

- **Server:** [Server/app/broadcastEndpoints.py](../../../Server/app/broadcastEndpoints.py) gets a new `/head_judge_selection` Socket.IO namespace and a request event on it, plus a state-request event on `/broadcast_control`. The server stays a stateless relay: no database or REST API changes, so the generated `aemsApi.ts` does not change.
- **Webapp:**
  - `streamingApi.ts` and `WebSocketConnections.ts`: new streams and emitters.
  - `Interfaces.tsx`: `followHeadJudge` added to `OverlayControlState` and its default.
  - `headJudge.tsx`: publishes its position.
  - `broadcast/controller.tsx`: the mode switch, the disabled pickers and alert, and answering state requests.
  - `arena/arena.tsx` and `broadcast/overlay.tsx`: read their state through a new hook that applies the head judge's position when following.
  - `mocks/socketHub.ts` and the `WebSocketConnections` manual mock: the new channel.
- **Tests:** a server relay unit test, Webapp tests for the controller, head judge, and arena, and one e2e flow.
- **Deployment:** none. Multi-worker deployments already relay Socket.IO across workers through the existing Redis client manager.
