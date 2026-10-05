# Proposal

## Why

Broadcast productions need two athlete graphics that ICF events already use, and the overlay can't show either today:
- an **athlete overview** lower third: name, bib, affiliation, each run's score and the total;
- a **run corner** in the lower right: who is on the water, the time left in the run, the live score, and which event and heat it is.

The data components for most of this already exist and drive the arena screen. The overlay stopped mounting them when it moved to Pixi frame-sequence wrappers.

## What Changes

- New **Athlete Overview** fullscreen overlay (mockup variant B): the bib in a tile spanning both rows; the name and affiliation on the first row; a labelled cell per run on the second row; and a larger "Total" box in the alternate colour.
- New **Run Corner** fullscreen overlay, in the lower right (mockup variant B):
  - first row: affiliation and name;
  - second row: the seconds remaining over a bar that drains across the 45 s or 60 s ride (turning orange for the last 10 s), and the live run score in a "Live" box;
  - third row: the event name, the heat name and "Run x/y".
- Both use the existing frame-sequence wrapper (`athleteOverview` and `runCorner` graphics-pack configs). With no graphics server they draw ICF-coloured CSS fallback backdrops, extending the existing fallback styles.
- Affiliation is shown as a text pill where the reference graphics show a flag. Flags are out of scope, tracked in #511.
- **Controller:**
  - **BREAKING (control state):** "Show Live Run Score" now drives the run corner, which includes the timer.
  - New "Show Athlete Overview" toggle.
  - Both toggles require a selected athlete.
  - The "Show Timer" toggle and the `showTimer` flag are removed.
- The unused presentation wrappers from before the Pixi migration are deleted. These are the collapse-wrapped athlete, run, live-score and timer cards, and the unmounted `AthleteCardWithAnimation` example.
- The live-score data logic moves into a hook, so the arena's labelled score panel and the run corner's bare score share one implementation.
- Mockups: https://claude.ai/artifact/Bc9yF2Tg9X75qBs8SgEGV8 (variant B of each chosen).
- ADR011 records the existing pattern: data logic components inside presentation wrappers, with per-screen geometry from the theme.

## Capabilities

### New Capabilities

### Modified Capabilities

- `broadcast-overlays`:
  - adds requirements for the athlete overview and run corner overlays, including their content, data and fallback backdrops;
  - adds an athlete prerequisite to their toggles;
  - changes the visibility-flag set (adds `showAthleteOverview`, removes `showTimer`);
  - updates the default control state to match.

## Impact

- **Webapp broadcast:**
  - new card components for the two overlays;
  - new layout settings for both overlays in the overlay theme;
  - new panel styles in `overlayFallback.ts`;
  - the overlay page mounts both overlays;
  - the controller gets a new toggle, prerequisite checks, and loses "Show Timer";
  - `OverlayControlState` and its default state change;
  - dead wrapper cards are deleted.
- **Shared logic:** `SubscribedFinalScore` is refactored onto a `useLiveRunScore` hook. The arena's output is unchanged.
- **Data:** each run's score and lock state come from the existing phase-scores endpoint, refetched on an interval. Only locked runs are shown, and the total over them is computed in the browser. The live score and timer come from the existing Socket.IO streams. No backend or API changes; the server relays control state as an opaque payload.
- **Graphics packs:** two new optional component configs, `athleteOverview` and `runCorner`. The GraphicsServer needs no change.
- **Docs:** ADR011, plus a follow-up GitHub issue for flags (#511).
- **Dependency:** this branch stacks on PR #507 (fallback overlays), which should merge first.
