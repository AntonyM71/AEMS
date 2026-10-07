# Proposal

## Why

Phase results show a run that hasn't been ridden as `0.00` instead of `-` (issue #532), which viewers and commentators read as a ridden run that scored nothing. When a phase has a run count, the server returns an entry for every run in the phase, so an unridden run arrives with a mean score of 0 and no judge scores. Both the phase results table and the fallback leaderboard only showed `-` when the entry was missing entirely. The leaderboard also bolded such a run as counting toward the total when the athlete had fewer scored runs than the phase's scoring runs.

## What Changes

- A run with no judge scores that isn't locked shows `-` in the phase results table and the fallback leaderboard. Did-not-start still shows `DNS`, and a run whose judges scored 0 still shows `0.00`. The server only reports judge scores for recorded moves, so a locked run with no moves (ridden, nothing scored) shows `0.00`.
- The fallback leaderboard never counts a run without a score toward the total, so it never bolds one.
- The server response is unchanged; unlocked but scored runs still show their score, as before, matching the server's total.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `broadcast-overlays`: the phase results table gains a run-cell requirement, and the leaderboard requirement defines "no score yet" as a run no judge has scored.

## Impact

- **Webapp:** `Webapp/src/components/broadcast/Cards/runFormat.ts` gains a shared `runLabel`, used by `PhaseResultsTable.tsx` and `PhaseLeaderboard.tsx`; `countingRunNumbers` skips runs without a score.
- **Server:** none. `aemsApi.ts` does not need regenerating.
