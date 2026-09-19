# Tasks

This change documents existing, shipped behavior. There is no code to write — the tasks below are verification and review, so the spec delta can be merged with confidence that it matches what actually runs.

## 1. Verify requirements against existing tests

- [ ] 1.1 Confirm each control-state/toggle/relay requirement against `Webapp/src/components/broadcast/__tests__/controller.test.tsx` and verify `npm test -- controller.test.tsx` (run from `Webapp/`) passes
- [ ] 1.2 Confirm the arena-rendering requirements against `Webapp/src/components/arena/__tests__/arena.test.tsx` and verify `npm test -- arena.test.tsx` passes
- [ ] 1.3 Confirm the sliding-container requirements against `SlidingModal.test.tsx` and `SlidingWrapper.test.tsx` and verify both pass
- [ ] 1.4 Confirm the table pagination requirement against `Cards/BasicBroadcastTable.test.tsx` and verify it passes
- [ ] 1.5 Confirm the theme-driven card geometry requirement against `overlayCardStyling.test.tsx` (and `Webapp/src/components/arena/__tests__/arenaCardStyling.test.tsx`) and verify both pass

## 2. Verify requirements grounded only in code (no test coverage today)

- [ ] 2.1 Manually trace the Pixi intro/hold/outro playback requirements against `PixiFrameSequenceOverlay.tsx` line by line, since no test file exercises this component; flag any divergence found
- [ ] 2.2 Manually trace the config-driven frame-source resolution requirement against `PixiFrameSequenceOverlay.tsx`'s `configName` fetch logic and the GraphicsServer's `/componentInfo/{name}` contract in `GraphicsServer/README.md`
- [ ] 2.3 Manually trace the `broadcast_control` sender-inclusive relay requirement against `Server/app/broadcastEndpoints.py`

## 3. Human review of findings surfaced during drafting

- [ ] 3.1 Confirm with a maintainer whether `showImageCard`, `showLiveRunScore`, and `showTimer` are intentionally unconnected to any rendered gate on the shipped `/Broadcast/Overlay` and `/Arena` pages today (the spec deliberately does not claim they gate anything, since no current code path consults them for visibility)
- [ ] 3.2 Confirm whether `SlidingWrapper`, `SlidingImageCard` (`Cards/ICFLogo.tsx`), and `AthleteCardWithAnimation.tsx` are intended to remain unused/example code or should be wired up; the spec covers `SlidingWrapper`'s tested behavior but does not claim it is integrated into a live page

## 4. Finalize

- [ ] 4.1 Run `openspec validate broadcast-overlays --strict` from the repo root and resolve any reported issues
- [ ] 4.2 Hand off to a maintainer for review before `openspec archive broadcast-overlays` merges the delta into `openspec/specs/broadcast-overlays/spec.md`
