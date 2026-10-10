# Proposal

## Why

Viewers can only see the standings when the operator puts the fullscreen phase results on air, which covers the action. Broadcasters of F1 and NASCAR keep a narrow timing tower on screen the whole time, showing who leads and who is on the edge of qualifying. Charlie has asked for the same for freestyle. He also wants a Top Gear-style moment when the head judge locks a score: the athlete's row climbs the board, place by place, to where the score puts them. The design was settled in a clickable mock-up (https://claude.ai/artifact/PwNosArcBGMSEkq7ehvwwx).

## What Changes

- A new "Leaderboard tower" graphic on the broadcast overlay. It is a narrow, full-height standings tower down the right edge of the frame for the operator's selected phase. Each row shows a place, bib, surname and the gap to the leader.
- The tower ranks athletes on locked and did-not-start runs only, the same rule the athlete overview lower third follows. A score that is still being judged never goes to air.
- The tower always shows the medal places (1–3). When the operator sets how many places go through, it also shows the qualifying bubble: the two places either side of a cut line labelled "Top N through". The rows between and below these rotate through a window when they don't fit. The operator can also make the qualifiers between the medal places and the bubble rotate 2, 3 or 4 at a time.
- When the head judge locks a run that moves an athlete up the standings, the tower climbs that athlete's row from their old place to their new one. If they pass the cut line, the athlete they push out is marked. The operator can turn the climb off.
- The operator switches between two styles. "Timing tower" is a dark panel with an orange cut line. "Waterline" puts the qualifiers on white above a moving waterline, with everyone below it drawn under water.
- The run corner moves inwards while the tower is on air, so the two never overlap.
- The overlay controller gets a "Leaderboard tower" toggle, which needs a selected phase, and the tower's settings: style, places through, qualifier rotation, and climb on/off.

For now, the operator types in how many places go through. Storing that number on the event and prefilling the Promote phase page from it is tracked in #558.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `broadcast-overlays`:
  - The visibility toggles gain `showLeaderboardTower`.
  - The prerequisite-selection requirement adds the tower, which needs a selected phase.
  - New requirements cover:
    - the tower's ranking, layout, bubble, rotation and styles;
    - its controller settings;
    - the climb;
    - live updates;
    - the run corner moving inwards.

  This change modifies the same two requirements as `restyle-overlay-controller`. Its deltas are written against that change's toggle names, so archive `restyle-overlay-controller` first.

## Impact

- Webapp:
  - a new tower card under `Webapp/src/components/broadcast/Cards/`, mounted in `overlay.tsx`;
  - the controller (`controller.tsx`) gets a new tile and its settings;
  - `OverlayControlState` and its default gain new fields;
  - a new run-status stream for a whole phase in `streamingApi.ts`;
  - the run corner gets a shift while the tower is on air;
  - the best-final-runs total is moved out of `useAthleteRunScores.ts`, so the athlete overview and the tower use the same code.
- No server, API, database or codegen change. The tower reads the existing phase scores endpoint and the existing `run_status` and `broadcast_control` sockets.
- Server load: the endpoint recalculates the whole phase on every call, which takes about 1 s for a 60-athlete phase. The tower reloads only when a run in its phase changes or its connection comes back, never on a timer. #559 tracks making that recalculation fast, and it should land before the tower is used on large prelims.
- The arena is unaffected: the tower only appears on the broadcast overlay.
- The graphics packs are unaffected. The tower draws its own backdrop, because its height changes with the size of the field and a fixed frame sequence can't follow it.
- e2e: a Playwright test that locks a run and sees the tower update.
