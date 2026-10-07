# Design

## Context

`PixiFrameSequenceOverlay` already works out a `shouldShowChildren` flag: `isVisible && (isFallback || !isAnimationActive)`. The content wrapper's opacity follows this flag. The content itself stays mounted at all times, so the `setInterval` in `useRotatingPage` keeps running while the content is transparent.

## Goals / Non-Goals

**Goals:**
- Fix the bug once, in the overlay, so every rotating card behind it gets the fix.

**Non-Goals:**
- Changing `useRotatingPage` or any card component.

## Decisions

**Key the content on a show counter.** Hold a `showCount` that goes up when `shouldShowChildren` changes from false to true. Track the previous value in state and update it during render (React's "adjust state when a prop changes" pattern), so the remount lands in the same render that starts the fade-in, with no extra frame on a stale page. Wrap the rendered `children` / `fallbackContent` in a `Fragment` keyed on `showCount`. React then remounts the subtree on every show, and every `useRotatingPage` inside starts again at page 0.

- *Alternative: key on `shouldShowChildren` itself.* Rejected. The content would also remount on hide, so it would jump to page 1 during the fade-out, and during the fallback exit hold, where the content stays fully visible.
- *Alternative: pass visibility into `useRotatingPage` to pause and reset it.* Rejected. Every card would need a visibility prop threaded down from the overlay (`PhaseLeaderboard`, `HeatStartGrid`, `BasicTable` and its two wrappers). That's a much bigger diff for the same result anyone can see.

## Risks / Trade-offs

- [Remounting throws away any other local state in the wrapped content on each show] → That's the behaviour the issue wants. The content is display-only and reads its data from RTK Query's cache, so remounting it sends no new network request.
- [The rotation timer still runs while the content is hidden] → It costs one cheap state update every few seconds, and nobody sees it because the next show throws the state away.
