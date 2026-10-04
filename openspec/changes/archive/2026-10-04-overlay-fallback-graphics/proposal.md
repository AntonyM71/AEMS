# Proposal

## Why

The broadcast overlay's backgrounds are PNG frame sequences served by the GraphicsServer, a separate, optional compose stack (nginx deliberately keeps running when it is down). When it is unavailable, every overlay silently degrades: a failed config fetch leaves the cards' white text floating over transparent video with no backdrop, and a config that loads but whose frames fail still "plays" an intro and outro of blank frames. Venues run offline and the graphics pack is licensed separately from the repo, so "no graphics server" is a normal configuration, not an edge case (GitHub #502).

## What Changes

- A `PixiFrameSequenceOverlay` whose graphics cannot be loaded — config fetch fails or returns non-OK, any frame fails to load, or the Pixi application fails to initialise — switches to a fallback mode instead of playing missing or blank frames.
- In fallback mode, the fullscreen overlays (event title, heat summary, phase results) draw their own backdrops with plain CSS, in ICF colours with simple gradients and no external assets. They are two-tone to match the text: a dark ICF-blue panel behind the white headings and footer, and a light panel behind the dark-blue table rows and run counts.
- The backdrops wipe in and out with a slanted reveal, and the text fades in after the panel and out before it; with reduced motion they just fade. `onExitComplete` still fires once the exit finishes.
- An overlay in fallback mode retries its config fetch each time it becomes visible, so a graphics server that comes up mid-event is picked up on the next show without a page reload.
- An overlay given no frame source at all, neither a `configName` nor local props, keeps today's behaviour. It shows its children directly without entering fallback mode, because that is a deliberate configuration rather than a failure.

## Capabilities

### New Capabilities

### Modified Capabilities

- `broadcast-overlays`: adds requirements that a frame-sequence overlay whose graphics are unavailable enters fallback mode, reports `onExitComplete`, and retries its config on each show; that the fullscreen overlays draw ICF-coloured two-tone backdrops in fallback mode; and that those backdrops transition in and out, as fades under reduced motion. It also clarifies that wrapped content is hidden only while a *real* frame sequence is loading or animating.

## Impact

- `Webapp/src/components/broadcast/PixiFrameSequenceOverlay.tsx`: failure detection (config fetch, frame `allSettled` results, Pixi `init`), the fallback render branch, and the retry on show.
- `Webapp/src/components/broadcast/__tests__/PixiFrameSequenceOverlay.test.tsx`: new tests using MSW for `/componentInfo/*` failures and the existing `pixi.js` mock for frame and init failures.
- New `Webapp/src/components/broadcast/overlayFallback.ts`: the backdrop styles and exit timing, applied by `FullscreenPixiOverlay.tsx`. `overlayTheme.tsx` exports its ICF colour constants.
- `Cards/EventTitle.tsx`: two class names so the title's bands can be styled. This is a no-op on the arena.
- The three fullscreen overlays get the backdrops with no changes of their own. `AthleteCardWithAnimation`, an example no page mounts, gets fallback mode without backdrop styling.
- The look was prototyped in a preview artifact: https://claude.ai/artifact/GaqqaaEHQiSb2eMNg1vVuq
- No backend, API, GraphicsServer, nginx, or new dependency changes. The arena page does not use Pixi and is unaffected.
