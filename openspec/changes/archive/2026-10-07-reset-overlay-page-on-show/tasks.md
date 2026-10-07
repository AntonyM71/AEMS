# Tasks

## 1. Tests

- [x] 1.1 In `PixiFrameSequenceOverlay.test.tsx`, add a test that wraps a multi-page child using `useRotatingPage` in an overlay with no frame source, using fake timers. It shows the overlay, advances to page 2, hides it, waits longer than the page interval, then shows it again and expects page 1. Check that it fails before the fix.
- [x] 1.2 Add a test that hides the overlay while it shows page 2 and expects page 2 to still be in the document straight after hiding. Check that it passes both before and after the fix.
- [x] 1.3 Add a test with a frame sequence whose intro lasts longer than the page interval. It expects page 1 when the content appears at the hold frame. Check that it fails before the fix.
- [x] 1.4 Add a fallback-mode test that makes the renderer fail with `failPixiInit()` and passes a `fallbackExitMs`. It advances to page 2, hides the overlay, and expects page 2 to stay in the document until the exit time has passed. It then shows the overlay again and expects page 1. Check that the page 1 assertion fails before the fix.

## 2. Fix

- [x] 2.1 In `PixiFrameSequenceOverlay.tsx`, count each change of `shouldShowChildren` from false to true, and key a `Fragment` around the rendered children / fallback content on that count. Verify by running the tests from 1.1 to 1.4, which should all pass.

## 3. Verify

- [x] 3.1 Run `npm test -- src/components/broadcast` and `npm run precommit` in `Webapp/`. Both should pass with no errors.
