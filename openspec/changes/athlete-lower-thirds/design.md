# Design

## Context

See proposal.md for the motivation and the two reference graphics. These are the relevant parts of today's code.

**Logic components already exist, with presentation mixed in.**
- `SubscribedFinalScore` computes the live run score by averaging judges' scores from the moves/bonuses stream, using the run-status stream for locked and did-not-start. It then renders a labelled `FinalScore` panel ("Score: 90.00").
- `LiveTimerLogic` renders the time remaining from the timer stream as bare text.
- `RunDetails` works out the number of runs from heat info and renders "Run: 2/3" inside a `Paper`.
- `AthleteInfo` renders name, bib and affiliation in a fixed grid.
- The arena composes all four, and that is their only live use.

**The pre-Pixi overlay wrappers are dead code.** `AthleteInfoCard`, `LiveRunScoreSpace`, `RunCard`, `LiveTimerSpace` and `AthleteCardWithAnimation` wrap the components above in `Collapse` or Pixi. No page has mounted them since the overlay moved to always-mounted Pixi wrappers.

**Fullscreen overlay pattern.** Each fullscreen overlay is a small modal that puts a card inside `FullscreenPixiOverlay` with a `configName`. Examples are `HeatListModal` and `EventTitleModal`. The card's on-screen geometry comes from overlay-theme `defaultProps` slots declared in `themeAugmentation.ts`, read with `useThemeProps`. Fallback mode adds `.AemsOverlay-fallback`, and `overlayFallbackSx` styles named panel classes beneath it. It also wipes those panels in and out via the shared `panels()` selector list.

**Data available without backend changes:**
- per-run mean scores and did-not-start and locked state, per athlete, from `GET /getPhaseScores/{phaseId}`. Its `total_score` counts unlocked runs, and `GET /getHeatScores/{heatId}` returns a total of 0;
- the live score and time remaining, from the existing Socket.IO streams;
- event and heat names, from the by-id queries;
- the selected athlete (`id`, `first_name`, `last_name`, `bib`, `affiliation`, `scoresheet`), heat, event and run, already in the relayed `OverlayControlState`.

ADR011, added in this change, records the rule this design follows: data logic in components and hooks, framing in wrappers, and per-screen geometry from the theme.

## Goals / Non-Goals

**Goals:**
- Two new overlays assembled from shared logic, with no duplicated scoring or stream handling.
- Both work with no graphics pack, through the fallback backdrops.
- The arena renders exactly as before.

**Non-Goals:**
- Flags. Affiliation stays text, and a follow-up issue covers an IOC-to-ISO lookup and flag assets.
- The "q" (qualified) marker in the ICF overview, and "heat x of y" numbering. The data models neither.
- Pushing heat-score updates to clients. Polling is enough for a lower third.

## Decisions

**Extract hooks where two screens need the same data in different markup (ADR011).**
- `useLiveRunScore(overlayControlState)` returns `{ allJudgeScores, locked, didNotStart }`. It is lifted unchanged out of `SubscribedFinalScore`.
  - `SubscribedFinalScore` becomes the hook plus `FinalScore`, so the arena is unchanged.
  - The run corner uses the hook plus `FinalScoreLogic`, which is the bare value.
- `useRunCount(overlayControlState)` returns the number of runs. `RunDetails` and the run corner both call it.
- `useAthleteRunScores(heatId, athleteId)` returns `{ runs, total }` for the overview.
  - It finds the athlete's phase and scoring-run count from heat info, then reads `getPhaseScores`.
  - It keeps only final runs: locked, or marked DNS. A partly judged run never reaches air, however early the operator shows the overview.
  - `runs` has one `{ runNumber, label }` entry for every run in the phase (the athlete's run count from heat info). `label` is the mean score to 2 dp, "DNS", or "-" until the run is final. Fixed-width cells and a fixed-width total box keep the graphic one width as runs are locked.
  - `total` is the best N final runs, with DNS as 0 and N being the phase's scoring runs. It is computed in the browser because the server's phase total also counts unlocked runs, and the heat-scores endpoint returns no total at all (it doesn't pass the scoring-run count). This repeats the server's one-line "sum of the best N" rule, with a comment pointing at it.
  - It refetches the moment a lock or DNS for that athlete arrives on the `run_status` socket, through a new listen-only `athleteRunStatusStream`. The server saves the status before broadcasting it, so the refetch always sees it. A 30 s poll remains only as a backstop for messages missed while the socket reconnects. (Five-second polling alone made locks visibly slow on air.)
  - Alternative considered: *one live-score component per run*, so a run shows the instant it is locked. Rejected for now. It needs a component per run, plus plumbing to gather their values for the total, and two socket subscriptions per run, all to show scores we hide until locked anyway.
- The run corner reads `useTimerStreamQuery` directly instead of reusing `LiveTimerLogic`, because the ride bar needs the number, not rendered text. `LiveTimerLogic` stays for the head judge and arena.
- Alternatives considered:
  - *Reuse `AthleteInfo` and `RunDetails` markup in the new cards.* Rejected: their fixed grid and `Paper` don't fit a lower-third row. ADR011 says to share the logic, not the markup.
  - *Add an athlete-scores endpoint, or a locked-only total on the server.* Rejected for now: phase scores already carry each run's score and lock state, so only the total is computed in the browser.

**Two new presentation cards and two modals, following the existing fullscreen pattern.** The layouts are the "B" variants chosen from the mockups (https://claude.ai/artifact/Bc9yF2Tg9X75qBs8SgEGV8). Their markup and fallback CSS port from that page.
- `AthleteOverview` is a grid:
  - a `.AemsAthleteOverview-bib` tile spanning both rows, with the bib large and a small "Bib" label;
  - a `.AemsAthleteOverview-name` row, with the name and an affiliation pill;
  - a `.AemsAthleteOverview-runs` row of cells, each a small "Run n" label over its score, with DNS muted;
  - a `.AemsAthleteOverview-total` box, labelled "Total".
- `RunCorner` has three rows:
  - `.AemsRunCorner-name`: affiliation pill and name;
  - `.AemsRunCorner-clock`: seconds remaining with a small "s", a ride bar beneath them, and a `.AemsRunCorner-score` box labelled "Live";
  - `.AemsRunCorner-event`: event name, then "Heat name · Run x/y".
- Labels are sentence case with slight tracking, never all caps, so they don't fight the theme's upper-case headings.
- Both read their position from new overlay-theme slots `AemsAthleteOverview` and `AemsRunCorner`, which take a `rootSx` (declared in `themeAugmentation.ts`). The overlay theme anchors the overview bottom-left, at 96 px in and 84 px up on a 1920×1080 frame. It anchors the corner bottom-right, at 72 px in and 72 px up. With a graphics pack, these register the text to the artwork. In fallback they place the panels.
- `AthleteOverviewModal` and `RunCornerModal` wrap the cards in `FullscreenPixiOverlay` with `configName` `athleteOverview`/`runCorner`, mirroring `HeatListModal`. `overlay.tsx` mounts both, with visibility from `showAthleteOverview` and `showLiveRunScore`.
- The cards take `overlayControlState` as a prop, as `PhaseResultsModal` does, rather than reading Redux selectors, so a card always shows the athlete and run the operator pushed.

**The ride bar infers the run length from the Timer's two modes.** The timer stream carries only `time_remaining` and `status`. The Timer runs 45 s in float mode and 60 s in squirt mode, and in either mode it broadcasts once per second from the start.
- The run corner keeps a `rideLengthSeconds` that starts at 45. It becomes 60 when any `time_remaining` above 45 arrives, and resets to 45 whenever the status leaves `running`.
- The bar is a CSS `transform: scaleX(remaining / rideLength)` with a 1 s linear transition, so it drains smoothly between the once-a-second updates.
- At 10 s or fewer, the seconds and the bar take the overlay theme's warning colour (`palette.primary`, orange). This matches the Timer's 10-second warning buzz.
- Mark with `ponytail:`: inferring from the two known durations. Add the total duration to the timer payload if a third mode ever exists.
- Alternative considered: *add `total_duration` to the Timer's broadcast.* Rejected for now. It changes the Raspberry Pi service and its spec for a value the overlay can infer exactly from the two modes.

**Fallback styling extends `overlayFallbackSx`.**
- New panel classes go into the `panels()` list, so they get the same slanted wipe and text fade.
- Name rows (`-name`) and the corner's event row (`-event`) use the navy gradient with white text.
- The overview's run row (`-runs`) and the corner's clock row (`-clock`) use the light gradient with navy text.
- The bib tile (`-bib`) and the score boxes (`-total`, `-score`) are the "alternate colour". They use an ICF light-blue background with navy text at a larger size. Navy on light blue is about 4.9:1, which meets WCAG AA for large text. White on light blue is about 3:1, so white text is not used.
- The affiliation pill is a navy outline with navy text on the light row, and white text on the navy row.
- The existing exit time already covers the longest exit, so no new stagger is added.

**Controller and control state.**
- `OverlayControlState` gains `showAthleteOverview` and loses `showTimer`. `defaultOverlayControllerState` changes to match, with the new flag false.
- The controller adds a "Show Athlete Overview" button and removes "Show Timer".
- Both "Show Live Run Score" and "Show Athlete Overview" check that an athlete is selected first, using the existing prerequisite-error path.
- The server relays the payload opaquely, so no backend change is needed. An overlay page still open from the old build simply ignores the new key.

**Delete the dead wrappers.** These go:
- `AthleteInfoCard`'s default export, keeping the named `AthleteInfo` the arena uses;
- `LiveRunScoreSpace`;
- `RunCard`'s default export, keeping `RunDetails`;
- the `LiveTimer.tsx` card file;
- `AthleteCardWithAnimation`, with its `Components.md` example reference updated.

## Risks / Trade-offs

- **[Risk] Positions are guessed until real packs exist.** Without `athleteOverview`/`runCorner` artwork, the theme positions are guesses. → Mitigation: they live in one theme slot each, so a pack author adjusts two values. The fallback look doesn't depend on them beyond placement.
- **[Trade-off] An extra socket.** The overview opens its own `run_status` listener. → It is listen-only and closes when the overview's data is no longer used.
- **[Risk] A long name or many runs overflow the row.** Long names, or five or more run cells, widen the overview. → The grid grows to the right, the name truncates with an ellipsis past 900 px, and one test covers a five-run athlete.
- **[Risk] Breaking control state.** Removing `showTimer` breaks any external tool that sets it. → None is known. The arena never read it.
