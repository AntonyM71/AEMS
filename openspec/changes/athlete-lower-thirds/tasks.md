# Tasks

## 1. Shared data hooks (ADR011)

- [x] 1.1 Extract `useLiveRunScore(overlayControlState)` from `SubscribedFinalScore`, returning `{ allJudgeScores, locked, didNotStart }`, and rebuild `SubscribedFinalScore` on it. Verify the existing arena tests and the overlay DNS test still pass unchanged.
- [x] 1.2 Extract `useRunCount(overlayControlState)` from `RunDetails` and rebuild `RunDetails` on it. Verify the arena tests still pass.
- [x] 1.3 Add `useAthleteRunScores(heatId, athleteId)`, which reads the athlete's phase from heat info, reads `getPhaseScores`, refetching on each lock or DNS for that athlete from the `run_status` socket (with a 30 s backstop poll), and returns `{ runs: { runNumber, label }[], total }`. It returns a cell for every run in the phase, labelled to 2 dp or "DNS" once locked or DNS, else "-". The total is the best N of those runs, where N is the phase's scoring runs (the server's totals count unlocked runs, or are missing).  Test it via MSW with a fixture of locked, DNS and unlocked runs and a deliberately wrong server total, asserting the headers for every run, the labels, that an unlocked run shows "-", and the computed total.

## 2. Athlete overview overlay

- [x] 2.1 Add `AemsAthleteOverview` and `AemsRunCorner` theme slots, each with `rootSx`, to `themeAugmentation.ts`. Add their overlay positions to `overlayTheme.tsx`. Verify `npm run tsc`.
- [x] 2.2 Add the `AthleteOverview` card (mockup variant B), with a bib tile, a name row with an affiliation pill, run cells ("Run n" over the score, DNS muted) and a "Total" box, using the `AemsAthleteOverview-*` classes. Test with `renderWithProviders` + MSW that it shows the bib, name, affiliation, each run cell and the total, and that a five-run athlete's cells all render.
- [x] 2.3 Add `AthleteOverviewModal` (`FullscreenPixiOverlay`, `configName="athleteOverview"`) and mount it in `overlay.tsx` on `showAthleteOverview`. Verify by test that the overview's content is shown when the relayed state has `showAthleteOverview` true.

## 3. Run corner overlay

- [x] 3.1 Add the `RunCorner` card (mockup variant B), using the `AemsRunCorner-*` classes. It has three rows:
  - name: affiliation pill and name;
  - clock: seconds from the timer stream, the ride bar, and a "Live" score box via `useLiveRunScore` + `FinalScoreLogic`;
  - event: event name, heat name and "Run x/y" via `useRunCount`.

  Test with `renderWithProviders` + MSW and the socket hub mock that it shows the name, seconds, live score, event, heat and "Run 2/3", and "DNS" for a did-not-start run.
- [x] 3.2 Add the ride-bar logic: a ride length of 45 s that becomes 60 s once more than 45 s remain and resets when the status leaves `running`; the bar scaled to remaining / ride length; the warning colour at 10 s or fewer. Mark it `ponytail:`. Test via the timer stream that 36 s shows the bar at 36/45, that 52 s switches it to a 60 s scale, and that 9 s applies the warning state.
- [x] 3.3 Add `RunCornerModal` (`configName="runCorner"`) and mount it in `overlay.tsx` on `showLiveRunScore`. Verify by test.

## 4. Fallback backdrops

- [x] 4.1 Extend `overlayFallbackSx` with the new panel classes, porting them from the mockup:
  - the `-name` and `-event` rows get the navy gradient;
  - the `-runs` and `-clock` rows get the light gradient;
  - the `-bib`, `-total` and `-score` boxes get ICF light blue with navy text;
  - the affiliation pill is styled.

  Add the panels to the `panels()` wipe list. Extend `FullscreenPixiOverlay.test.tsx` to render the athlete overview with the graphics server down, and assert the run row's solid light background.

## 5. Controller and control state

- [x] 5.1 Add `showAthleteOverview` and remove `showTimer` in `OverlayControlState` and `defaultOverlayControllerState`. Verify `npm run tsc` and the default-state tests.
- [x] 5.2 In the controller:
  - add a "Show Athlete Overview" button;
  - remove "Show Timer";
  - make both "Show Live Run Score" and "Show Athlete Overview" require a selected athlete through the existing error path.

  Test that toggling the overview with no athlete selected shows the error and leaves the flag unchanged, and that with an athlete selected it flips only that flag.

## 6. Clean-up and docs

- [x] 6.1 Delete the dead wrappers:
  - `AthleteInfoCard`'s default export (keep `AthleteInfo`);
  - `LiveRunScoreSpace`;
  - `RunCard`'s default export (keep `RunDetails`);
  - the `LiveTimer.tsx` card;
  - `AthleteCardWithAnimation`.

  Update `Components.md`'s example reference and add the two new overlays to its list. Verify `npm run tsc` and that the full suite passes.
- [x] 6.2 Raise a GitHub issue for affiliation flags. It should cover an IOC-to-ISO lookup, bundled SVG flags with a text fallback for clubs, and the note that emoji flags don't render on Windows/OBS. Link it from this change's proposal.
- [x] 6.3 Confirm ADR011 is listed in `docs/architecture.md`'s decisions section, if that section lists ADRs.

## 8. Review follow-ups

- [x] 8.1 Scope each selection-keyed query in the overlay data hooks and cards to `currentData`, so a previous selection's runs, names and scores never show against a new one. Test by switching heat or event while the new request is pending, and confirm the old content disappears.
- [x] 8.2 Phase scores report a locked run with no scored moves as a locked zero run (`scoring` spec delta), so the overview shows "0.00". Test at the server with `assemble_phase_scores`, and in the overview with a locked zero run.
- [x] 8.3 Let an already-active graphic toggle be turned off without a selected athlete; only turning it on requires one.

## 7. Verification

- [x] 7.1 Run `npm run precommit` and `npm test` in `Webapp/`, and confirm both pass.
- [ ] 7.2 With the local stack running and no graphics server, show the athlete overview and run corner from the controller. Confirm:
  - the panels and transitions;
  - a run locked mid-show appearing immediately, and an unlocked run staying hidden;
  - the timer counting down in the corner, the bar draining, and the switch to orange at 10 s.

  Compare against the mockup's B variants.
