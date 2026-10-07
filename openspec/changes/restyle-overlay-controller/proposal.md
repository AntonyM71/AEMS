# Proposal

## Why

The overlay controller showed each graphic as a "Show … Modal" button coloured red when off and green when on. That made red, the colour of an error, the normal resting state. The on/off state was carried by colour alone, which colour-blind operators can't read, and "Modal" is implementation jargon. The restyle (already on the `restyle-overlay-controller` branch) renames the toggles after the graphic they control and shows each one's state in words. The baseline spec still names the old buttons and says nothing about showing state.

## What Changes

- The visibility toggles are named after their graphic: "ICF logo", "Event title", "Competition overview", "Heat summary", "Phase results", "Athlete overview", "Live run score".
- Each toggle shows whether its graphic is on air, with visible text ("On air" or "Off") and a pressed state that assistive technology can read, not colour alone.
- Layout only, no spec change: the toggles are arranged to match where each graphic appears on the broadcast screen, and in Follow head judge mode the pickers stay in the same places as in Manual mode, with the followed ones disabled.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `broadcast-overlays`: the prerequisite-selection and arena-sync scenarios use the new toggle names, and a new requirement says each toggle shows whether its graphic is on air.

## Impact

- `Webapp/src/components/broadcast/controller.tsx` and its tests: already implemented in commit dbc26fc.
- e2e: no impact. Playwright only uses the "Follow head judge" button, which keeps its name.
- No API, socket payload or server change. The `broadcast_control` state is unchanged.
