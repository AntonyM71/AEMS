# Tasks

## 1. Broadcast overlay

- [x] 1.1 In `overlayTheme.tsx`, replace `icfLightBlue`/`icfDarkBlue`/`icfWhite` with `pwOrange`/`pwBlack`/`pwWhite`, add `pwBrightBlue`, set primary to `pwOrange` and secondary to `pwBrightBlue`, change the table cell rule to `#BFBFBF`, and fix the comments that name the old colours; verify with `grep -rn icf Webapp/src` that no `icf*` colour name remains outside tests
- [x] 1.2 In `overlayFallback.ts`, swap the local constants and inline colours for the `pw*` names and values in design.md (including the `icfTint` split and the `rgba()` replacements); verify with `grep -nE "rgba\((12, 40, 80|28, 154, 215|227, 238, 247|4, 14, 30)|#49b3e6|#7a8aa3" Webapp/src` that nothing is left
- [x] 1.3 Change the run corner timer track in `RunCorner.tsx` to `rgba(0, 0, 0, 0.15)`; verify `RunCorner` tests pass

## 2. Arena

- [x] 2.1 In `arenaTheme.tsx` and `arena.tsx`, change the background to `#000000`, the panels to `#404040` and the header and footer washes to `rgba(0, 0, 0, 0.45)`, and update the `arena.tsx` comment that names `#181818`; verify the arena tests pass

## 3. App theme

- [x] 3.1 In `_app.tsx`, set primary to `#FF5A00` in both modes with `contrastText: "#000"`, and secondary to `#00145A` (light) and `#00DCFF` (dark); verify in `npm start` that a contained primary button has black text in light and dark mode

## 4. Tests and checks

- [x] 4.1 Update `FullscreenPixiOverlay.test.tsx` to import `pwWhite`, and add an assertion that a fallback alternate-colour box (such as the athlete overview total) has an orange background with black text; update the `rgb(12, 40, 80)` and `#1976d2` expectations in `overlayCardStyling.test.tsx` and `arenaCardStyling.test.tsx` to the new values; verify `npm test` passes in `Webapp/`
- [x] 4.2 Run `npm run precommit` in `Webapp/` (tsc, lint, prettier) and fix any issues
- [x] 4.3 With the graphics server stopped, show the athlete overview, run corner, heat summary, phase results, event title and competition overview, and open the arena screen; compare each against mockup A1 (https://claude.ai/artifact/L2UkxZRa5kA2oe44Waaex1)
