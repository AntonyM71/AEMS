# Design

## Context

Every broadcast overlay goes through `PixiFrameSequenceOverlay`. The component has two stacked layers, each with its own opacity transition: a Pixi canvas container (`SEQUENCE_FADE_MS`) and a children container (`CONTENT_FADE_MS`). Playback is a phase machine: `loading → intro → hold → outro → done`. The three fullscreen overlays (event title, heat summary, phase results) reach it through `FullscreenPixiOverlay`. The only other consumer is `AthleteCardWithAnimation`, an example that no page mounts.

It handles graphics failures as follows today:

- **Config fetch fails or is non-OK:** the error is logged and `remoteConfig` becomes null. That leaves no frame URLs, so the phase goes to `done` and the children show over a transparent canvas.
- **Frame load fails:** `Promise.allSettled` discards rejections. The next step, `Texture.from(url)`, then resolves textures that were never cached, so the intro and outro play blank.
- **`app.init()` throws:** nothing catches it. `isAppReady` never becomes true, so the phase stays `loading` and the children never show at all.

`overlayTheme` colours text in two tones, because each tone sits on a different part of the artwork. Headings and the table footer use white `text.primary` over dark bands. Table header and rows, and the event title's run counts, use `icfDarkBlue` over light scoreboard panels. Every card background is transparent, because the artwork normally supplies one. A single wash behind everything therefore can't work: dark-blue rows on a dark wash, or white headings on a light one, would be unreadable.

The look of the backdrops was prototyped in a standalone preview (https://claude.ai/artifact/GaqqaaEHQiSb2eMNg1vVuq). It used the cards' real MUI class names and the overlay theme's base styles, so its CSS carries over directly.

## Goals / Non-Goals

**Goals:**
- Readable overlay content with no GraphicsServer, styled in ICF colours, with smooth transitions in and out.
- Recover on the next show once the GraphicsServer comes back.

**Non-Goals:**
- Health-checking the GraphicsServer. The fetches that already happen are the probe.
- Changing the artwork-registered layout outside fallback mode, or touching the arena.
- Styling `AthleteCardWithAnimation`'s fallback. No page mounts it, so it gets the generic show/hide only.
- Retrying while an overlay stays visible, or retrying after a Pixi init failure.

## Decisions

**Fallback detection lives in `PixiFrameSequenceOverlay`; the backdrop styling lives in `FullscreenPixiOverlay`.** The failure signals (fetch result, `allSettled` results, `init` exception) are only visible inside the generic wrapper, so it owns the `isFallback` state. The name is `isFallback`, not `useFallback`, so it doesn't read as a hook.

The backdrops, though, depend on the cards' layout, which is overlay-specific. So the generic wrapper only exposes a styling hook, and the overlay-specific wrapper styles through it:
- In fallback mode, the children container gets the class `AemsOverlay-fallback` and a `data-visible` attribute.
- `FullscreenPixiOverlay` wraps the generic component in a `Box`, whose `sx` (`overlayFallbackSx`, from a new `overlayFallback.ts` beside `overlayTheme.tsx`) targets descendants of that hook.

Alternatives considered:
- *Hard-code the styles in the generic wrapper.* Rejected: it would teach a reusable animation component about specific card class names.
- *Spread the rules across `overlayTheme`'s `styleOverrides`.* Rejected: the event title's bands are plain `Box`es with no themed component to hang an override on. One file is easier to find and delete.

**Failure triggers:**
- the config `catch` block, excluding aborts;
- any `rejected` entry in the `allSettled` results;
- a `try/catch` around `app.init()`.

Fallback triggers on any rejected frame, not only when all of them fail, because a partly loaded sequence still flashes blank frames. Fallback forces the phase to `done`, so the existing `shouldShowChildren = isVisible && !isAnimationActive` gives the right child visibility.

**Backdrops are two-tone and follow the text, not the screen.** They style the existing card elements in place, so they always hug the real content, whatever its length or page size. Colours are the three already in `overlayTheme` (`icfDarkBlue` `rgb(12,40,80)`, `icfLightBlue` `rgb(28,154,215)`, `icfWhite` `#f8f9fc`) plus three tints derived from them. `overlayFallback.ts` imports the constants, which means exporting them from `overlayTheme.tsx`.

| Element | Text on it | Fallback background |
|---|---|---|
| Scoreboard card (`.AemsTableCard-root`) | White heading, white page footer | Diagonal navy gradient (`#143f75 → #0c2850 → #071830`), with a 5px light-blue bar along the top that fades out to the right |
| Table header (`.MuiTableHead-root`) | Bold dark blue | Light-blue tint gradient (`#cfe6f5 → #e3eef7`) |
| Table body (`.MuiTableBody-root`) | Dark blue | White to mist (`#fff → #f8f9fc → #e3eef7`), under the theme's existing blue row rules |
| Event title heading group | White | Navy band that fades to transparent past the text, with an 8px light-blue edge on the left |
| Event title run counts | Dark blue | Light band that fades to transparent the same way, with the same edge |

Every text/background pair passes WCAG AA by a wide margin: white on `#0c2850` is about 14:1, and `#0c2850` on `#cfe6f5` is about 11:1. Light blue is used only for accents, never behind text, because white on it is only about 3:1. In fallback mode, the artwork-clearance spacer (`.MuiDivider-root`, 85px and 23px) shrinks to 4px. The card gets a little inner padding, and the first table column gets 20px of left padding so names don't touch the panel edge. The event title's two groups need class names (`AemsEventTitle-heading`, `AemsEventTitle-runs`) added in `EventTitle.tsx`. They are a no-op on the arena.

**Transitions are a slanted wipe plus a text fade, all in CSS.** Panels animate `clip-path` between two four-point polygons that share a constant 8% slant, so the leading edge is angled the whole way across. The polygon overhangs the box so the card's drop shadow isn't clipped. The text (each panel's direct children) animates `opacity`. `data-visible` drives the sequence:

| | Start | Middle | End |
|---|---|---|---|
| Show | Wipe starts (420ms, `cubic-bezier(0.22, 0.8, 0.24, 1)`) | Text fades in from 260ms (260ms) | Done ≈ 520ms |
| Hide | Text fades out (160ms) | Wipe reverses, right to left (420ms, after a 140ms delay) | Done = 560ms, or 640ms with the event title's stagger |

On the event title, the run-count band follows the heading band 90ms later on show and 80ms later on hide. That stagger is the one orchestrated moment. Under `prefers-reduced-motion: reduce`, the clip path is removed and each panel just fades for 200ms.

Alternatives considered:
- *MUI `Slide`/`Fade`, or `SlidingModal` as the arena uses.* Rejected because they portal, take focus, or unmount children. The overlay depends on always-mounted, stacked layers.
- *Animating `transform`.* Rejected: sliding a panel in from off-screen, rather than wiping it, moves the text with it, which reads as busier on air.

**The exit time is shared through a prop.** `overlayFallback.ts` exports `OVERLAY_FALLBACK_EXIT_MS = 640`, computed from the same delay, stagger and duration constants the CSS uses (the longest exit, the event title's run-count band). `FullscreenPixiOverlay` passes it to the generic wrapper as an optional `fallbackExitMs` prop. In fallback mode the generic wrapper then:
- holds the children container at opacity 1 during the exit, then hides it instantly at `fallbackExitMs` (`transition: opacity 0ms linear {fallbackExitMs}ms` on hide). Without this, the container's own fade would dim the wipe;
- calls `onExitComplete` from a `setTimeout(fallbackExitMs)` that is cleared on cleanup;
- when `fallbackExitMs` is not given, keeps its normal `CONTENT_FADE_MS` fade and fires the timer at `CONTENT_FADE_MS`.

`transitionend` was rejected because jsdom never fires it, which would make the behaviour untestable, and because it doesn't fire when nothing actually transitions.

**Retry with a request counter.** A `configAttempt` number joins the config effect's dependency list and increments when `isVisible` rises while `isFallback` is true. A successful frame load clears `isFallback` and runs the existing `startIntro()` path if the overlay is still visible. A Pixi init failure leaves `isAppReady` false, so a retried config can never reach frame loading and the overlay correctly stays in fallback mode. That is acceptable, because a renderer failure does not fix itself during a page's lifetime.

## Risks / Trade-offs

- **[Risk] The styles are coupled to class names.** `overlayFallbackSx` targets MUI class names (`MuiTableHead-root`, `MuiTableBody-root`, `MuiDivider-root`) and the cards' own `Aems*` classes. A card refactor could silently drop its backdrop. → Mitigation: the fallback tests render a real card (`HeatSummaryTable`) and assert its table body has a non-transparent background in fallback mode.
- **[Risk] Recovery mid-show.** A retry that succeeds while the overlay is visible starts the intro, so the content blinks out briefly and returns over the artwork. → Accepted: it happens once, at the start of a show. It matches how a first load already behaves.
- **[Trade-off] Section backgrounds on the table.** The table-body gradient relies on the browser painting a row-group background as one box. Chromium and Firefox both do; the overlay runs in a Chromium-based browser source. → Accepted.
- **[Risk] Mock change in tests.** The existing tests mock `Assets.load` to always resolve. Frame-failure tests need a per-test rejecting mock, and these changes must not alter the existing tests' default behaviour.
