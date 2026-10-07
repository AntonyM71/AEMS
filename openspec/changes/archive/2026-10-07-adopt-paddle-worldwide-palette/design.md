# Design

## Context

Colour lives in four places in the Webapp:

- `components/broadcast/overlayTheme.tsx`: the overlay's MUI theme. It exports `icfLightBlue`, `icfDarkBlue` and `icfWhite`, and sets the table cell rule (`#1976d2`), the text colours and the theme primary and secondary colours. The run corner's 10-second warning reads `primary.main`.
- `components/broadcast/overlayFallback.ts`: the fallback backdrops. It defines local `icfNavyLift`, `icfNavyDeep`, `icfMist` and `icfTint`, and uses inline `#49b3e6`, `#7a8aa3` and several `rgba()` values built from the ICF blues.
- `components/arena/arenaTheme.tsx` and `components/arena/arena.tsx`: a `#181818` background, `#222` panels, and grey `rgba(40, 40, 40, …)` washes on the table header and footer.
- `pages/_app.tsx`: the app-wide theme. Primary is `#f77b00`/`#fd9d50`, secondary is `#08a7fd`/`#4db7fe`, and each has a light-mode and a dark-mode value.

`components/broadcast/Cards/RunCorner.tsx` also draws its timer track in `rgba(12, 40, 80, 0.15)`.

The colour values come from the Paddle Worldwide brand guidelines ("Brand system: Colour overview", p. 15), not from the image in #531. Screenshotting shifted the image's colours: it shows orange as `#FF4F1E`, but the official value is `#FF5A00`.

## Goals / Non-Goals

**Goals:**
- Match mockup A1 exactly: https://claude.ai/artifact/L2UkxZRa5kA2oe44Waaex1
- Name each colour constant after the brand colour or tint it holds.

**Non-Goals:**
- Layout, type, spacing or motion changes.
- Component style overrides made only to fix contrast. Fixing orange-on-white text (see Risks) would mean restyling outlined and text buttons, which is outside a palette change.
- Error, info, success and warning colours in the app theme. The brand palette has no red, and these must stay distinct from orange.
- The broadcast controller's on-air red. It copies a camera's on-air light and is not a brand colour.
- Graphics-pack artwork, which lives outside this repo.

## Decisions

### Colour constants

These are exported from `overlayTheme.tsx` in place of the `icf*` constants:

| New | Value | Replaces |
|---|---|---|
| `pwOrange` | `#FF5A00` | `icfLightBlue` |
| `pwBlack` | `#000000` | `icfDarkBlue` |
| `pwWhite` | `#FFFFFF` | `icfWhite` |
| `pwBrightBlue` | `#00DCFF` | the theme's secondary `#008a73` |

These are local to `overlayFallback.ts`:

| New | Value | Replaces |
|---|---|---|
| `pwBlack75` | `#404040` | `icfNavyLift` |
| `pwBlack50` | `#808080` | the muted text `#7a8aa3` |
| `pwBlack25` | `#BFBFBF` | `icfTint` on dividers, the affiliation pill on dark bands, deep-strip text and run borders |
| `pwOrange75` | `#FF8340` | `#49b3e6`, the light end of the alternate-box gradient |
| `pwOrange25` | `#FFD6BF` | `icfTint` on the table header |
| `pwPaleGrey` | `#F2F2F2` | `icfMist`, the darker end of the light-panel gradients |

`icfNavyDeep` becomes `pwBlack`.

Names follow the guidelines' own naming: a colour, plus its tint percentage where there is one. The user asked for names after the colours rather than after their roles.

`pwPaleGrey` is the only value that is not one of the guidelines' 75/50/25% tints. Light panels need a gradient end that is near white, and Black 25% is too dark for that. The guidelines allow tints "provided accessibility and contrast are always considered".

### Other values in the overlay

- The `icfTint` split: the table header uses Orange 25%, and everything else uses Black 25%. This matches the mockup, where the orange header ties the white table to the orange highlights.
- `rgba()` values built from ICF blues keep their alpha but take the new colour:
  - `rgba(28, 154, 215, 0)` becomes `rgba(255, 90, 0, 0)`.
  - `rgba(12, 40, 80, 0)` becomes `rgba(0, 0, 0, 0)`.
  - `rgba(227, 238, 247, 0)` becomes `rgba(242, 242, 242, 0)`.
  - The card shadow `rgba(4, 14, 30, 0.45)` becomes `rgba(0, 0, 0, 0.45)`.
  - The run corner track becomes `rgba(0, 0, 0, 0.15)`.
- The "On the water" label is `pwBrightBlue`. In the overlay, Bright Blue is the only secondary colour, which keeps within the guidelines' "one dark and one lighter secondary" rule.
- The overlay table cell rule changes from `#1976d2` to `pwBlack25`. The mockup's alternatives used Bright Blue rules (A2 and A3), but A1 keeps the details neutral.
- Overlay theme: `primary.main` is `pwOrange`, so the run corner warning turns orange, and `secondary.main` is `pwBrightBlue`. `text.secondary` and the typography colours follow `pwBlack`.
- Fix or delete comments that name the old colours, such as "The blue rule under each row" and the Windows Vista comments on the overlay palette.

### Arena

| Element | Now | New |
|---|---|---|
| `background.default`, backdrop and page body | `#181818` | `#000000` |
| `background.paper` and `MuiPaper` | `#222` | `#404040` |
| Table header gradient's dark end | `rgba(40, 40, 40, 0.5)` | `rgba(0, 0, 0, 0.45)` |
| Table footer | `rgba(40, 40, 40, 0.6)` | `rgba(0, 0, 0, 0.45)` |

Text stays white. The arena takes no orange. The user chose a plain black-and-white arena over A's Dark Blue panels. Black is also off on an LED wall, which gives the most contrast. The comment in `arena.tsx` that names `#181818` is updated to match.

### App theme

- **Primary:** `#FF5A00` in both modes, with `contrastText: "#000"`.
  - Black on orange is 6.7:1.
  - MUI's default contrast threshold of 3 would pick white, at 3.1:1.
  - Orange on the dark-mode background is 6.0:1, so dark mode no longer needs a lighter variant.
- **Secondary:** Dark Blue `#00145A` in light mode, which gives 16.8:1 for white text on it and for it as text on white. Bright Blue `#00DCFF` in dark mode, at 11.3:1 on `#121212`. Dark Blue would be unreadable on the dark background.
- **Rejected alternatives:**
  - Bright Blue in light mode: it is too pale as text on white.
  - Black as secondary: it is indistinguishable from body text.

### Options weighed

The mockups compared five directions, all at https://claude.ai/artifact/L2UkxZRa5kA2oe44Waaex1:

- Navy-led, black-and-orange-led, and teal-led directions (first round).
- A2, Bright Blue details.
- A3, Dark Blue bands with Bright Blue panels.

The first-round navy-led and teal-led directions were dropped once the guidelines showed orange and black lead the palette. The user chose A1.

## Risks / Trade-offs

- [Graphics packs drawn in ICF blue now carry black text, grey row lines and orange warnings] → Redraw packs in the new palette. The packs are outside this repo, so the proposal records this as a follow-up.
- [Orange text on white, in outlined and text buttons, links and active tabs, is 3.1:1, which passes only for large text] → This is still better than today's 2.7:1. Restyling those components is a non-goal, so record it as a follow-up if it matters.
- [The orange run-corner warning sits on the light clock row at 3.1:1] → The clock digits are large, bold type, where 3:1 is the WCAG threshold.
- [Muted scores in Black 50% on white are 3.95:1] → They are muted on purpose and remain readable. This is the same role and roughly the same contrast as today's `#7a8aa3`.

## Migration Plan

This is a frontend-only deploy. Roll back by reverting the commit.
