# Proposal

## Why

A multi-page broadcast overlay (phase results, heat summary, start list) doesn't always open on page 1. It can open on any page, which looks random on air (#537). The overlay keeps its content mounted while hidden, and during its intro animation, and only fades it to transparent. The page rotation timer keeps running the whole time, so the overlay opens on whatever page the timer has reached.

## What Changes

- Each time an overlay's content is shown, its content starts again from scratch, so a rotating table opens on page 1.
- Any page the rotation reached while the overlay was hidden, or while its intro played, is thrown away when the content appears.
- Hiding an overlay leaves its content alone, so the content doesn't jump back to page 1 while it fades out.
- Frontend only. No API or schema change.

### Non-goals

- Changing the page size or the page interval.
- Stopping the rotation timer while the content is hidden. Starting the content again when it is shown is enough to meet the issue's acceptance, because nobody sees a page that turns while the content is hidden.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `broadcast-overlays`: adds a requirement that wrapped overlay content starts again from scratch, so it opens on its first page, every time it is shown.

## Impact

- `Webapp/src/components/broadcast/PixiFrameSequenceOverlay.tsx`: remounts its wrapped content, or fallback content, each time that content is shown.
- Affected overlays, with no code change to any of them: `PhaseLeaderboard`, `HeatStartGrid`, and `BasicTable` (via `PhaseScoreTable` / `HeatSummaryTable`). All three use `useRotatingPage`.
- Tests: `Webapp/src/components/broadcast/__tests__/PixiFrameSequenceOverlay.test.tsx`.
