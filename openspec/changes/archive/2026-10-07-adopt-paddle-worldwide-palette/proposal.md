# Proposal

## Why

The ICF is now Paddle Worldwide, and it has a new brand palette (#531). Our broadcast overlays, arena screens and webapp buttons still use ICF blues and our own orange. The brand guidelines say the palette is led by orange and black, and an application should use no more than one dark and one lighter secondary colour. Mockups of the options considered, with A1 chosen: https://claude.ai/artifact/L2UkxZRa5kA2oe44Waaex1

## What Changes

- **Broadcast overlays (fallback backdrops and overlay theme):** black bands take the place of dark ICF blue, and orange takes the place of the light-blue "alternate colour" boxes and accent stripes, with black text on orange. Light panels become white. Bright Blue is the one lighter secondary colour and appears only on the "On the water" label. Muted scores, dividers and the table header use the brand's approved tints of black and orange. The run corner's 10-second warning turns orange.
- **Arena screens:** plain black and white: a black background, dark grey (Black 75%) panels and white text.
- **Webapp buttons and controls:** the main colour becomes Paddle Worldwide orange with black text, in light and dark mode. The secondary colour becomes Dark Blue in light mode and Bright Blue in dark mode. The error and info colours stay as they are.
- The overlay's colour constants are renamed after their new colours (for example `icfDarkBlue` becomes `pwBlack`).
- Layout, type and motion do not change.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `broadcast-overlays`: the fallback backdrop requirements name Paddle Worldwide colours (black bands, orange alternate colour) instead of ICF colours, and the "On the water" heat summary tile is described as a black band.
- `arena-display`: the arena's dark panels are specified as dark grey on a black background with white text.

## Impact

- Webapp only: the overlay theme, the fallback backdrop styles, the run corner's timer track, the arena theme and page background, and the app-wide theme. No server, API or Timer change.
- The graphics-pack artwork lives outside this repo. Packs drawn in ICF colours will clash with the new text colours and row lines until they are redrawn in the Paddle Worldwide palette.
- Tests that assert the old colours (FullscreenPixiOverlay, overlayCardStyling, arenaCardStyling) need updating.
- Text in orange on white, such as outlined buttons and links, reaches 3.1:1. That is better than today's 2.7:1, but it still passes only for large text.
