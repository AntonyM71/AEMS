# Proposal

## Why

During live scoring, a scored move can show the literal text "Unknown" instead of its name. After a network blip it stays that way until the page is refreshed, and judges have called the scribe screen unusable when this happens (#396). The cause: each scored move sends its own request for move and bonus data, and nothing fetches that data again after a failure.

## What Changes

- A scored move gets its move name and available bonuses from the scoresheet data its screen already loads. It no longer sends a request of its own for each scored move.
- A scored move shows "Unknown" only when the scoresheet data has loaded and does not contain that move. While the data is still loading, the screen shows a loading placeholder instead.
- When the browser regains its network connection, the scribe and head judge screens fetch the scoresheet's moves and bonuses again. A failed load then recovers without a page refresh.
- Frontend only. No API or schema change.

### Non-goals

- Fetching the scribe's own scored moves again after a reconnect. Doing that safely needs the server to return its per-run `request_id` version so that the client can reject data older than what it holds. That is write-path work and is tracked in #491.
- Turning on reconnect or window-focus fetching for every query in the app.
- Cache invalidation tags, and changes to retry counts.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `judging-workflow`: adds requirements for how scored moves show their name and bonuses (from the scoresheet, with "Unknown" only for a move that is really missing), and for fetching scoresheet data again after a reconnect.

## Impact

- `Webapp/src/components/roles/scribe/InfoBar/ScoredMove.tsx`: drops its own queries and takes the scoresheet's moves and bonuses as props.
- `Webapp/src/components/roles/scribe/InfoBar.tsx` (`ScoredMoveList`) and `Webapp/src/components/roles/headJudge/JudgeCard.tsx`: pass the scoresheet data down.
- `Webapp/src/pages/_app.tsx`: wires RTK Query's online/offline listeners to the store.
- The available-moves and available-bonuses hooks in Scribe, InfoBar, JudgeCard and headJudge: opt in to fetching again on reconnect.
- Tests: `ScoredMove.test.tsx` and `InfoBar.test.tsx`.
- Network: fewer requests, because the per-move requests go away.
