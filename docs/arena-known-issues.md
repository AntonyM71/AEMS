# Arena screen — known issues

Findings from the investigation behind [issue #376](https://github.com/AntonyM71/AEMS/issues/376)
(restoring the `/Arena` styling after the Pixi merge, `c723269`). None of these
caused the #376 regression, so they were deliberately left out of that fix to
keep its diff reviewable. They are recorded here so they are not lost.

Each is listed with the evidence found at the time of writing; re-verify before
acting, as line numbers drift.

## 1. Panels render an empty card while data loads

`PhaseScoreTable` returns an empty fragment when `!data || !scoreData`, and
`HeatSummaryTable`'s `BasicTable` returns one for an empty heat. Before #376 the
arena's wrapper `Box` rendered regardless, so a loading or empty phase showed a
bare `#222` bar roughly 32px tall with a drop shadow and nothing in it.

The full-screen `SlidingModal` restored in #376 makes this less visible, but the
underlying gap remains: there is no explicit loading or empty state. Consider
rendering a "waiting for scores" placeholder rather than an empty card.

- `Webapp/src/components/broadcast/Cards/PhaseResultsTable.tsx` — the
  `!isVisible || !data || !scoreData` early return
- `Webapp/src/components/broadcast/Cards/BasicBroadcastTable.tsx` — the
  `!data || data.length === 0` early return

## 2. `Grid2` has a hard `height: 100vh` inside a `100vh` scroller

`arena.tsx`'s live grid (athlete / timer / run / score) is a `Grid2 container`
with `sx={{ height: "100vh" }}`, nested inside `_app.tsx`'s `.content` div, which
is itself the page's only scroller (`overflow-y: auto` inside a `.container`
pinned to `100vh`).

At 720p, or when a long uppercase athlete name wraps to a third line at the
theme's 8rem `h1`, the grid's flex lines overflow their fixed height. Because an
arena display is unattended, nobody scrolls — the bottom card is simply cut off
and unreachable. `flex: 1` with `minHeight: 0` inside the existing grid row would
be more robust than a hard viewport height.

- `Webapp/src/components/arena/arena.tsx` — the `Grid2 container` `sx`
- `Webapp/src/pages/_app.css` — `.container` / `.content`

## 3. `arenaTheme`'s `MuiGrid` override never applies

The theme overrides the `MuiGrid` slot with `height: 100%`, `width: 100%` and
`boxShadow: none`. In MUI 6, `Grid2` registers its theme slot as **`MuiGrid2`**,
not `MuiGrid`, and nothing on the arena imports the legacy `Grid`. The block
therefore styles nothing, while reading as though it governs the arena layout.

Either retarget it to `MuiGrid2` (after checking the layout still behaves — it
currently relies on `alignItems="stretch"` plus each card's own
`height: "100%"`) or delete it.

- `Webapp/src/components/arena/arenaTheme.tsx` — the `MuiGrid` block
- `node_modules/@mui/material/Grid2/Grid2.js` — `name: "MuiGrid2"`

## 4. Three competing `body` rules, resolved by insertion order

`/Arena` emits three `body` rules at identical specificity: `_app.tsx`'s
`CssBaseline` (app theme), `arena.tsx`'s `CssBaseline` (dark theme), and
`arena.tsx`'s `GlobalStyles`. Which one wins depends purely on the order emotion
inserts them.

In practice `GlobalStyles` wins the background and the arena `CssBaseline` wins
the font — so the document base font on the arena is `2rem / 600`. The
`GlobalStyles` background is also redundant with the arena `CssBaseline`, and its
`height: 100%` is a no-op because `html` has no height. It is fragile rather than
broken; worth collapsing to a single deliberate rule.

- `Webapp/src/components/arena/arena.tsx` — the `GlobalStyles` block
- `Webapp/src/pages/_app.tsx` — the app-level `CssBaseline`

## 5. Duplicate `data-testid="final-score"`

Both the arena's timer card and the shared final-score card carry
`data-testid="final-score"`, so two nodes on `/Arena` share the id. A
`getByTestId("final-score")` query on a full-page render would throw. A third
copy sits in `Cards/LiveTimer.tsx`, which is not currently rendered anywhere
(see "Shared-card theme refactor — follow-up work", item R5).

- `Webapp/src/components/arena/liveTimerArena.tsx`
- `Webapp/src/components/roles/headJudge/FinalScore.tsx`
- `Webapp/src/components/broadcast/Cards/LiveTimer.tsx` (unrendered)

## 6. `Container` gutters are never disabled on the arena

`_app.tsx` always wraps the page in `<Container maxWidth={false}>`, which applies
a 24px horizontal gutter at desktop widths even when `noLayout` is set. The arena
is a full-bleed display screen and never uses that width.

- `Webapp/src/pages/_app.tsx` — the `Container` wrapper
- `Webapp/src/pages/Arena.tsx` — `ArenaPage.noLayout = true`

## Fixed by #376 (recorded for context)

These were real and are already resolved by removing the Pixi wrapper from the
arena, but are noted because they may resurface if the arena is ever pointed at
`FullscreenPixiOverlay` again:

- **The overlay swallowed every click on the arena.** `FullscreenPixiOverlay`
  renders a `position: fixed`, `inset: 0`, `z-index: 1400` div that is always
  mounted regardless of `isVisible`. Its two *inner* divs set
  `pointer-events: none`; the root does not.
- **A live WebGL context ran for frames that could never load.**
  `PixiFrameSequenceOverlay` initialises its Pixi `Application` on mount with `[]`
  deps, independent of the config fetch, and `next.config.js` only rewrites
  `/componentInfo/*` to the graphics server in development — so in production the
  fetch 404s, logs a `console.error` on every mount, and the canvas plus ticker
  run forever with an empty texture.

# Shared-card theme refactor — follow-up work

The broadcast Cards (`Webapp/src/components/broadcast/Cards/`) are rendered by
two surfaces with very different geometry: the `/Broadcast` overlay, where each
card lines up with Pixi background artwork, and the `/Arena` venue screen, which
has no artwork. A refactor is moving that geometry out of the components and
into each surface's MUI theme (`overlayTheme.tsx` / `arenaTheme.tsx`), read via
`useThemeProps` against the slots declared in
`Webapp/src/components/broadcast/themeAugmentation.ts`. Four components are
converted — `BasicBroadcastTable`, `EventTitle`, `HeatSummaryTable`,
`PhaseResultsTable` — with paired characterization tests
(`broadcast/__tests__/overlayCardStyling.test.tsx`,
`arena/__tests__/arenaCardStyling.test.tsx`).

The refactor is a pure restructure: the overlay must render identically before
and after, since it cannot be run without a licensed graphics pack (ADR005).
The items below are what is left.

## R1. Accepted deviations from pre-refactor overlay rendering

Two rendered values on the overlay changed and were deliberately kept, rather
than restored, because in both cases the old value was an accident of the
component structure rather than a chosen design:

- **Table footer text is now 20px bold.** It previously rendered at 24px /
  weight 500, because the footer text sat in a `<Typography>` with no `variant`
  or `fontSize`, so it fell through to the theme's `body1` and the cell's own
  `fontSize: 20` / `fontWeight: bold` never reached it. The code's evident
  intent was 20px bold, which the theme (`overlayTheme.tsx`, `MuiTableFooter`)
  now applies directly.
- **The phase-results footer row is 91px, not 93px.** The old height was
  `rowHeight (61) + footerPadding`, and phase results passed `32` where the heat
  summary passed `30`. The theme now uses a single `91` for both. This is a 2px
  difference on one row and was judged not worth threading a per-card footer
  height back through the theme.

Everything else on the overlay was verified unchanged, including a fix pass that
restored three values the first cut of the refactor had altered: body-row text
weight (`MuiTableCell` now sets `fontWeight: 500`), the `EventTitle` run-count
group position (a themed `stackSpacing: 0` stops the `Stack` sibling margin from
nudging the absolutely-positioned group), and `EventTitle` overflow
(`overflow: visible` on `.AemsEventTitle-root`, since a `Paper` otherwise clips
where the old `Box` did not).

## R2. Three shared cards still hardcode their presentation

`AthleteInfo` (`Cards/AthleteInfoCard.tsx`), `RunDetails` (`Cards/RunCard.tsx`)
and `SubscribedFinalScore` (`Cards/LiveRunScore.tsx`) are the whole persistent
live grid of the arena screen and are used by both surfaces, but none has been
converted. Evidence at time of writing:

- All three wrap themselves in `Paper sx={{ padding: "0.5em", height: "100%" }}`.
  An inline `sx` beats `styleOverrides`, so neither theme's `MuiPaper` padding
  reaches them — `arenaTheme.tsx`'s `padding: "1em"` is silently dead for these
  cards.
- `arena.tsx` passes `textSize="h1"` to all three at the call site, which is the
  presentation branching the theme slots exist to remove.
- `AthleteInfoCard.tsx` hardcodes a `Grid2 size={9}` / `size={3}` column split,
  which is broadcast lower-third geometry, not arena geometry.
- `SubscribedFinalScore`'s card chrome actually lives in
  `Webapp/src/components/roles/headJudge/FinalScore.tsx` (`Paper sx={{ padding:
  "0.5em", height: "100%" }}` plus `data-testid="final-score"`), which is
  outside `broadcast/` and shared with the judging screens, so it cannot be
  themed through an `Aems*` slot without touching a third surface.

Intended approach, matching the converted four: write paired characterization
tests first, then add `AemsAthleteInfo`, `AemsRunDetails` and `AemsLiveRunScore`
slots to `themeAugmentation.ts`.

## R3. `liveTimerArena.tsx` re-implements card chrome inline

`Webapp/src/components/arena/liveTimerArena.tsx` builds its own
`Paper sx={{ padding: "0.5em", height: "100%", width: "100%" }}` wrapper and is
a near-duplicate of `Cards/LiveTimer.tsx` (which the overlay no longer renders).
Consolidating the two into one themed card is a natural extension of R2.

## R4. `EventTitle` overlay positioning depends on a general theme rule

`EventTitle` resolves its `left: 27%` / `top: 53%` percentages against a
full-viewport containing block created by `overlayTheme.tsx`'s
`MuiPaper.root { position: relative }` plus
`&.AemsEventTitle-root { width: 100%; height: 100% }`. Moving that
`position: relative` onto a card-specific class would silently revert the title
to positioning against `<body>`. `overlayCardStyling.test.tsx` pins the rendered
result but not this dependency.

## R5. Non-Pixi overlay cards are half-migrated — do not delete them

`overlay.tsx` renders only three of the controller's six toggles.
`showImageCard` (which defaults to `true`), `showLiveRunScore` and `showTimer`
have working buttons on `/Broadcast/Controller` that currently render nothing,
because the components behind them are not mounted anywhere:

- `Cards/ICFLogo.tsx` (`SlidingImageCard`, via `SlidingWrapper.tsx`) —
  `showImageCard`
- the `Collapse`-wrapped default exports of `AthleteInfoCard.tsx`,
  `RunCard.tsx` and `LiveRunScore.tsx` — `showLiveRunScore`
- `Cards/LiveTimer.tsx` — `showTimer` (this is the third node carrying
  `data-testid="final-score"`, see item 5 above)

These read as dead code but are the unmigrated half of the "always-mounted
Pixi-driven visibility" work noted in `overlay.tsx`. Only
`Cards/AthleteCardWithAnimation.tsx` is genuinely disposable — it is
self-documented as an example and referenced by nothing.

## R6. `SlidingModal.tsx` latent issues

Restored byte-for-byte from pre-Pixi history and currently used only by
`arena.tsx`. Carried over unfixed:

- Its props interface is named `SlidingWrapperProps`, colliding with the
  unrelated `SlidingWrapper.tsx`.
- `transform: translate(-50%, -50%)` combined with `top` / `left` at
  `(100 - size) / 2` is arithmetically inconsistent; it only lands correctly
  because MUI `Slide` overwrites the child transform at rest.
- `"& > *": { width: "calc(100% - 2em)" }` is presentation living in the wrapper
  rather than a theme.

## R7. Test-coverage gaps around the refactored area

- `<Arena />` itself has no test; `arenaCardStyling.test.tsx` renders the cards
  directly, so the `SlidingModal` wiring in `arena.tsx` is unverified.
- `overlay.tsx` has no test, so nothing catches the `EventTitleModal` /
  `HeatListModal` / `PhaseResultsModal` render path regressing.
- `useSyncOverlaySelectionState.ts` has no test.

## R8. Lint warnings introduced by the refactor

`npm run lint` reports 0 errors; three warnings are from this work:

- `Cards/EventTitle.tsx` — arrow function complexity 14 (limit 10), from the
  `useThemeProps` destructuring plus the three RTK Query calls and null guard.
  Extract a local data hook.
- `Cards/PhaseResultsTable.tsx` — complexity 11, same shape.
- `broadcast/__tests__/overlayCardStyling.test.tsx:161` — unused
  `eslint-disable` directive.

## R9. Repo-hygiene items noticed alongside this work

- **The dev-server docs are wrong about Socket.IO.** `Server/README.md:44`,
  `CLAUDE.md:34`, `docs/smg.md:29` and `:166`, and
  `.github/copilot-instructions.md:43` all say `uvicorn main:app`, which serves
  FastAPI without Socket.IO mounted (`Server/main.py:163` only wraps it into
  `socket_app`). `GET /socket.io/` then 404s and the broadcast controller
  cannot connect. Should be `uvicorn main:socket_app --reload`.
- **`Webapp/tsconfig.tsbuildinfo` is tracked** despite being gitignored in three
  places (`Webapp/.gitignore:25`, `.gitignore:242`, `.gitignore:332`). Needs
  `git rm --cached`.
- The branch also carries unrelated `.claude/settings.json` and
  `.devcontainer/` changes that should land as their own commit.
