# Design

## Context

`ScoresheetMoves` in `Webapp/src/components/ScoresheetBuilder/ScoresheetBuilder.tsx` copies RTK Query data into local state: the moves, the bonuses, and the bonus-type order. It sends all of that in one request through `submitDataToDB`. The page component `ScoresheetBuilder` (in `ScoresheetBuilderPage.tsx`) owns `selectedScoresheet` and passes its setter to both `SelectScoresheet` and `AddScoresheet`. The Webapp uses the Next.js pages router.

Two observed details shape the comparison:
- Score fields store the raw input text: `EditMove` casts `event.target.value` to `number`, so an edited score is the string `"9"`, not the number `9`.
- A load-time `useEffect` rewrites bonus `display_order` from the bonus-type order, so local bonus state differs from the fetched data even before any user edit. A probe test confirmed that editing a bonus score does not mutate the cached RTK Query data. The comparison baseline therefore stays reliable.

## Goals / Non-Goals

**Non-Goals:**
- Guarding the browser Back/Forward buttons fully. Next's pages router fires `routeChangeStart` after the URL has already changed, so cancelling there leaves the URL out of step with the page.

## Decisions

- **Detect unsaved changes by comparing normalised snapshots of the cached server data and the local state.** One function turns either source into the same JSON string, built from:
  - the moves in display order, as `{id, name, direction, fl, rb}` with scores passed through `String()`;
  - the bonuses sorted by id, as `{id, move_id, name, score}` with the score passed through `String()`;
  - the bonus-type name order.

  `display_order` is left out because the move and bonus-type orders already capture it. `String()` rather than `Number()`: `Number("")` is `0`, which would hide an emptied field. `hasUnsavedChanges` compares both snapshots on each render.
  - *Alternative:* set a dirty flag in every edit handler. It's rejected because undoing an edit by hand would still show the warning, and every new handler would have to remember to set the flag.
  - *Consequence:* the warning clears after a save without extra code, because the post-save refetch updates the server data and the reload effects reseed local state.
- **`ScoresheetMoves` renders the warning and reports the flag upward through an `onUnsavedChangesChange` callback prop.** The page component owns the guards because the scoresheet switch happens there. The warning is an MUI `Alert` (`severity="warning"`) next to "Update Scoresheet". Both sit in a `position: sticky; bottom: 0` box, because a full scoresheet runs well past one screen and a warning at the end of the list would be out of sight while the operator edits the top rows.
- **The page owns three guards, all active only while edits are unsaved:**
  - a `beforeunload` listener that calls `preventDefault()` and sets `returnValue`;
  - a `router.events` `routeChangeStart` handler. If `window.confirm` is declined, it throws an error marked `cancelled: true` to abort. This is the established pages-router pattern, and Next logs a harmless "route change aborted" message in development.
  - a wrapped `setSelectedScoresheet` passed to both `SelectScoresheet` and `AddScoresheet`. It asks `window.confirm` before switching.
- **Use `window.confirm`, not an MUI dialog.** `routeChangeStart` has to decide synchronously, so an async dialog can't block it. The scoresheet switch uses the same prompt for consistency.

## Risks / Trade-offs

- [Back/Forward navigation is only partly guarded] → The visible warning still tells the operator to save. Revisit this if the app moves to the app router or operators report lost edits.
- [The route-abort throw rejects `router.push`, and `topLevelErrorHandler` turns unhandled rejections into a "Something Went Wrong" toast] → The thrown error carries `cancelled: true`, Next's own marker for a cancelled route, and the handler skips errors marked that way. The Next dev overlay still shows it in development only.
- [Creating a new scoresheet and then cancelling the switch leaves the new, empty sheet on the server] → It's harmless, and the operator can select it later.
