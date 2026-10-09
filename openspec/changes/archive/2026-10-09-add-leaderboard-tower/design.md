# Design

## Context

- **Overlay layout.** The broadcast overlay (`overlay.tsx`) mounts one card per graphic, each reading the relayed `OverlayControlState` through `useDisplayedOverlayState`. Every existing graphic is wrapped in `FullscreenPixiOverlay`: a full-viewport frame sequence whose artwork is registered to fixed spots in the 1920×1080 frame, with a CSS fallback. The run corner is pinned at `right: 72, bottom: 72` by the overlay theme's `AemsRunCorner.rootSx`. The left edge is taken by the ICF logo, the competition overview, the event title and the athlete overview lower third, which is why the tower goes on the right.
- **Scores.** The phase scores endpoint (`/getPhaseScores/{phaseId}`) returns every athlete in the phase with their `run_scores`, each flagged `locked` / `did_not_start`. Its `total_score` and `ranking` also count runs still being judged. The athlete overview already works around this on the client: `useAthleteRunScores.ts` keeps only locked or DNS runs (`lockedOrDnsRuns`) and sums the best N of them (`bestRunsTotal`). Both helpers are private to that file today.
- **Cost of a reload.** The phase scores endpoint stores nothing: every call reloads all of the phase's scored moves and bonuses and recalculates every athlete. That is about 68 ms for 12 athletes, 259 ms for 30 and 1 s for 60 (3 runs, 3 judges), on one of the server's 4 workers. The tower stays on air far longer than any other graphic, so it must reload only when something has changed. #559 tracks fixing the slow grouping that causes this.
- **Live updates.** The server relays every `run_status` message (`heat_id`, `phase_id`, `athlete_id`, `run_number`, `locked`, `did_not_start`) on `/run_status` after saving it. `streamingApi.ts` has `athleteRunStatusStream`, which filters that socket to one athlete in one heat. Nothing yet listens to a whole phase.
- **Prior design work.** The interactive mock-up (link in the proposal) is the working reference for the layout rules and the climb choreography; its script is plain JS and can be ported directly.

## Goals / Non-Goals

**Goals:**
- Keep the layout rules (pinning, bubble, rotation windows) and the climb plan as pure functions, so they can be unit-tested without rendering.
- Use one shared definition of "final run total" for the athlete overview and the tower.
- Add no new dependency, server endpoint or database column.

**Non-Goals:**
- Graphics-pack artwork for the tower. It draws its own backdrop.
- Showing the tower on the arena.
- Storing places through anywhere other than the control state (#558).
- Replacing the server's in-progress totals with locked-only totals. That would fix phase results too, but it is a separate change.

## Decisions

### Rank on the client from final runs
Move `lockedOrDnsRuns` and `bestRunsTotal` out of `useAthleteRunScores.ts` into a shared module next to it (e.g. `Cards/finalRuns.ts`), and use them from both the athlete overview and a new `useTowerStandings(phaseId)` hook. The hook returns the athletes on the board, ordered by final total. Ties keep the server's order: sort with a stable sort over the server's list.

*Alternative:* a server endpoint that ranks on locked runs only. That is cleaner, but it means a server change, codegen and a second ranking rule beside `calculate_rank`. The client already does this for the athlete overview, so doing it again keeps the two graphics consistent.

### Layout and climb as pure functions
- `towerLayout(count, { placesThrough, qualifierRows, maxRows: 18 })` returns the ordered sections: medals, between, bubble, below. Each section has its place indices and the number of rows it gets. A section with fewer rows than places rotates. The mock-up's `standingsHTML` already implements these rules, including the "leave up to three rows for the group below" rule and the 18-row cut-off.
- `climbPlan(before, after, athleteId)` returns the start index (old place, or one past the end for a new athlete), the end index, and whether the climb crosses the cut line. It returns nothing when there is no climb. The component works through the plan one step at a time.

Unit tests cover both functions against the spec scenarios. The components only render what the functions return.

### Phase-wide run-status stream
Add `phaseRunStatusStream({ phaseId })` to `streamingApi.ts`, modelled on `athleteRunStatusStream` but filtering on `phase_id`. Its cache value holds two things:
- the latest message;
- a count of socket `connect` events, which fire on the first connection and on every reconnection.

`useTowerStandings` subscribes to phase scores with no polling interval. It refetches when either part of that cache value changes. A burst of messages is coalesced: the refetch runs 1 s after the last message in a burst.

*Alternative:* a 30 s backstop poll, as in `useAthleteRunScores`. Rejected: the tower can stay on air for a whole session, so the poll would recalculate a large phase twice a minute when nothing has changed. A missed message can only happen while the socket is down, and the reconnect refetch covers that.

RTK Query shares one cache entry per phase. When the athlete overview is on air for the same phase, its 30 s poll refreshes the tower too, and adds no extra load.

The tower keeps the previous standings in a ref. When a refetch lands, it takes the last message in the burst with `locked && !did_not_start` and runs `climbPlan(previous, current, message.athlete_id)`. It queues any plan it gets and plays the queue one climb at a time. Every other change redraws in place.

### Control state fields
Add the following to `OverlayControlState` and `defaultOverlayControllerState`:

| Field | Type | Default |
|---|---|---|
| `showLeaderboardTower` | `boolean` | `false` |
| `towerStyle` | `"timing" \| "waterline"` | `"timing"` |
| `towerPlacesThrough` | `number \| null` | `null` |
| `towerQualifierRows` | `number \| null` | `null`, meaning "Show all that fit" |
| `towerClimb` | `boolean` | `true` |

`useDisplayedOverlayState` passes them through untouched. The tower reads them with defaults (`?? defaultOverlayControllerState.x`), so a state relayed by a controller that predates this change still renders.

### Rendering: MUI and CSS transitions, not Pixi
The tower is a `Box` pinned at `top: 64, right: 64`, 320 px wide, in the overlay's 1920×1080 coordinates. Its rows are 44 px high. The two styles are one component switching `sx` on `towerStyle`; both keep the same row geometry, so a rotating window keeps its page when the style changes.
- **Show and hide:** MUI `Slide` (direction `left`), or `Fade` when `prefers-reduced-motion` matches.
- **Rotating windows:** reuse `useRotatingPage` with a 5 s interval. A short last page leaves the window's remaining rows empty, so the tower's height doesn't jump.
- **The climb:** while it plays, render the whole standings as absolutely positioned rows inside a clipped window, and move rows and the window with `transform` transitions. The step lengths come from the mock-up: about 230 ms per place far from the target, 340 ms within 5 places, 620 ms within 2, and 900 ms for the last step. Cancel the sequence when the tower is hidden or unmounts.
- **Fonts and colours:** `brandFontFamily` / `dataFontFamily` and the overlay palette. That is `pwOrange` for the Timing tower cut line and the climbing row, and `pwBrightBlue` for the waterline. Gold, silver and bronze are new constants beside the palette.

*Alternative:* wrap the tower in `FullscreenPixiOverlay` like the other graphics. Rejected, because the tower's height follows the field size and a fixed frame sequence can't.

### Moving the run corner
Wrap `RunCornerModal` in a `Box` with `position: fixed; inset: 0`. Give it `transform: translateX(-shift)`, with a transition, while `showLeaderboardTower` is true. Moving the whole fixed layer moves the Pixi canvas and its artwork together with the content. The wrapper has to be fixed and full-viewport itself: a transformed ancestor becomes the containing block of the `position: fixed` canvas, so a zero-size wrapper would collapse it.

Work the shift out from the tower's constants rather than hard-coding it. The run corner's right edge has to clear the tower's left edge (`1920 − 64 − 320`) with a gap.

### Controller
- Add a "Leaderboard tower" `GraphicTile` in the right-hand column of the broadcast screen grid, below the "Phase results" tile. It is gated on `selectedPhase`, like phase results.
- Under the tile, add:
  - a `ToggleButtonGroup` for style, following the competition overview's Events/Heats switch;
  - a number `TextField` for places through, where an empty or invalid value gives `null`;
  - a `Select` for qualifier rows;
  - a `Switch` for the climb.

## Risks / Trade-offs

- [Client-side ties may not match the server's tie-break once in-progress runs differ] → Ties fall back to the server's order. Equal locked totals are rare, and the tower corrects itself once the runs are locked.
- [A burst of locks, such as a head judge locking a whole heat, queues many climbs, each up to ~8 s] → Drop queued climbs older than the newest standings once the queue holds more than 3, and redraw in place instead.
- [The run status socket delivers a message before the refetch sees the save] → The server saves before broadcasting, which `useAthleteRunScores` already relies on, and the 1 s coalescing delay adds margin.
- [Each reload of a large phase holds a server worker for about a second, and judges' submissions on that worker wait] → The tower reloads only on run broadcasts (coalesced) and on reconnect, never on a timer. Each open overlay page reloads once per burst, so keep to one overlay page per broadcast output. #559 removes the quadratic cost at its source.
- [The run corner moving mid-run could distract viewers] → It only moves when the operator toggles the tower, never on its own.

## Migration Plan

This is frontend only, with no data migration. Rollback is reverting the commit. Overlays that receive a control state without the new fields fall back to the defaults.
