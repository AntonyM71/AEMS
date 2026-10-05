# Tasks

## 1. Failure tests first

- [x] 1.1 In `PixiFrameSequenceOverlay.test.tsx`, add a test where MSW returns 500 for `/componentInfo/:name`. With `isVisible`, assert the children container reaches opacity 1 and carries the `AemsOverlay-fallback` class with `data-visible="true"`. Confirm the test fails before the implementation.
- [x] 1.2 Add a test where MSW returns a network error (`HttpResponse.error()`) for the config, asserting the same outcome, and confirm it fails first.
- [x] 1.3 Add a test where the config loads but the `Assets.load` mock rejects one URL for that test only, using `mockImplementationOnce` or similar so the other tests keep the always-resolve default. Assert the overlay is in fallback mode and `Texture.from` is never called. Confirm it fails first.
- [x] 1.4 Add a test where the `Application` mock's `init` rejects. Assert the children become visible in fallback mode while `isVisible` is true, which fails today because the phase is stuck at `loading`.
- [x] 1.5 Add a test that renders a fallback overlay visible with `fallbackExitMs={640}` and then re-renders it with `isVisible={false}`. Using fake timers, assert `data-visible="false"`, that `onExitComplete` has not been called at 600ms, and that it has been called exactly once at 640ms.
- [x] 1.6 Add the same test without `fallbackExitMs`, asserting `onExitComplete` fires once after `CONTENT_FADE_MS`.
- [x] 1.7 Add a retry test with an MSW handler that fails the first config request and succeeds after that. Show, hide, then show the overlay again, and assert that a second config request was made and `Texture.from` was called for the returned frames, so the overlay left fallback mode.
- [x] 1.8 Add a test where no `configName` and no frame props are given and `isVisible` is true. Assert the children are visible and the container has no `AemsOverlay-fallback` class, which locks in the unchanged no-source behaviour.

## 2. Fallback mode in `PixiFrameSequenceOverlay.tsx`

- [x] 2.1 Add `isFallback` state and set it from three places: the config fetch `catch` (skipping aborts), any `rejected` entry in the frame `allSettled` results, and a new `try/catch` around `app.init()`. In fallback, force the phase to `done`. Verify with tests 1.1–1.4.
- [x] 2.2 In fallback, add the `AemsOverlay-fallback` class and a `data-visible` attribute to the children container. Verify with tests 1.1 and 1.8.
- [x] 2.3 Add the optional `fallbackExitMs` prop. In fallback, hold the children container at opacity 1 during exit and hide it at `fallbackExitMs`; with no prop, keep the `CONTENT_FADE_MS` fade. Schedule `onExitComplete` at `fallbackExitMs ?? CONTENT_FADE_MS` and clear the timer on cleanup. Verify with tests 1.5 and 1.6.
- [x] 2.4 Add a `configAttempt` counter to the config effect's dependencies, incremented on each false→true change of `isVisible` while in fallback. Clear `isFallback` after a fully successful frame load. Verify with test 1.7.
- [x] 2.5 Add a row for `fallbackExitMs` to the props table in `Components.md`. Run the full existing `PixiFrameSequenceOverlay.test.tsx` suite and confirm the intro, hold, outro and config-driven tests still pass unchanged.

## 3. ICF fallback backdrops

- [x] 3.1 Export `icfLightBlue`, `icfDarkBlue` and `icfWhite` from `overlayTheme.tsx`, and confirm `npm run tsc` passes.
- [x] 3.2 Create `Webapp/src/components/broadcast/overlayFallback.ts`, exporting `overlayFallbackSx` and `OVERLAY_FALLBACK_EXIT_MS`. Port the fallback block from the preview artifact: the two-tone panels, the slanted `clip-path` wipe, the text fades, the event title stagger and the reduced-motion rules. Scope every selector under `& .AemsOverlay-fallback`, and derive the exit constant from the same timing constants the `sx` uses. Verify with the tests in 3.5.
- [x] 3.3 Wrap `FullscreenPixiOverlay`'s `PixiFrameSequenceOverlay` in a `Box sx={overlayFallbackSx}` and pass `fallbackExitMs={OVERLAY_FALLBACK_EXIT_MS}`. Confirm the existing overlay tests still pass.
- [x] 3.4 Add `className="AemsEventTitle-heading"` and `className="AemsEventTitle-runs"` to the two groups in `EventTitle.tsx`, and confirm the arena's event title tests still pass.
- [x] 3.5 Add a test file for `FullscreenPixiOverlay`. Render `HeatSummaryTable` inside it, under `overlayTheme` with MSW data and a failing `/componentInfo/startList`. Assert that the overlay is `data-visible="true"` and the table body has the solid ICF white background each light panel carries under its gradient. jsdom drops gradient values and resolves styles by source order rather than specificity, so the navy card is left to the manual check in 4.2. This catches a card refactor that silently drops its backdrop.

## 4. Verification

- [x] 4.1 Run `npm run precommit` in `Webapp/` (tsc + lintfix + prettierfix) and `npm test`, and confirm both pass.
- [x] 4.2 With the stack running and the graphics compose stack stopped, toggle the event title, heat summary and phase results from the controller. Confirm each wipes in with readable two-tone panels matching the preview artifact and wipes out cleanly. Repeat with the OS reduced-motion setting on and confirm the transitions are fades.
- [x] 4.3 Start the graphics compose stack without reloading the overlay page, toggle an overlay off and on again, and confirm its frame sequence now plays.
