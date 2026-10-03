# Design

## Context

See proposal.md, Why. Current state:

- `ScoredMove` calls `useGetManyAvailablemovesGetQuery({idList:[moveId]})` and `useGetManyAvailablebonusesGetQuery({moveIdList:[moveId]})`. RTK Query caches each entry by its endpoint and exact arguments, so these entries are separate from the scoresheet-level entries (`{sheetIdList:[scoresheet]}`) that the parent screens already fetch. Each scored move therefore makes its own requests, and each can fail on its own.
- Any result other than exactly one matching move renders "Unknown", whether the query is loading, has failed, or found nothing.
- `setupListeners` is never called, and no query opts in to `refetchOnReconnect`. A query that has failed stays failed until the page is refreshed. The `retry` wrapper in `emptyApi.ts` retries 5 times in prod and not at all elsewhere.
- Scoresheet-level data the parents already have:
  - Scribe: `Scribe.tsx` fetches moves by `sheetIdList` and passes them to `InfoBar` as `availableMoves`. `CurrentScoreCalculation` in `InfoBar.tsx` fetches bonuses by `sheetIdList`.
  - Head judge: `headJudge.tsx` and `JudgeCard.tsx` both fetch moves and bonuses by `sheetIdList`, so they share the same cache entries. `JudgeCard` renders a `Skeleton` until both queries succeed.

## Goals / Non-Goals

**Goals:**
- `ScoredMove` sends no requests of its own and renders from the data passed to it as props.
- "Unknown" means only that the move is not on the loaded scoresheet.
- Scoresheet reference data recovers by itself after a reconnect.

**Non-Goals:**
- Fetching the scribe's own scores again after a reconnect. That needs the server to return the `request_id` version so the client can reject older data, and it is tracked in #491.
- `refetchOnFocus`, and an app-wide `refetchOnReconnect` set in `emptyApi.ts`.

## Decisions

**1. `ScoredMove` takes `availableMoves: movesType[]` and `availableBonuses: AvailableBonusType[]` as props.**
It finds its move with `availableMoves.find(m => m.id === scoredMove.moveId)` and filters `availableBonuses` by `move_id`, sorted with `sortBonuses` as it is today. A scoresheet holds a few dozen items at most, so a linear lookup on each render is cheap and needs neither a `Map` nor `useMemo`.
- *Alternative:* keep the hooks in `ScoredMove` but switch their arguments to `{sheetIdList:[scoresheet]}` so they hit the shared cache entry. Rejected: `ScoredMove` would need the scoresheet ID as a prop instead, it would still subscribe once per scored move, and it would still mix loading with "not found".

**2. `ScoredMoveList` fetches bonuses with `useGetManyAvailablebonusesGetQuery({sheetIdList:[scoresheet]})` and receives moves from `InfoBar`.**
`CurrentScoreCalculation` already uses that same query, so they share one cache entry and this adds no network request. `InfoBar` passes down `availableMoves` and `paddlerInfo.scoresheet`, both of which it already receives. Until the bonuses query has data, `ScoredMoveList` renders a `Skeleton`, which follows the existing `isFetchingScoredMoves` pattern in `InfoBar`.
- *Alternative:* lift the bonuses query into `Scribe` and pass it down through `InfoBar`. Rejected: it widens `InfoBar`'s props and gains nothing, because the cache already deduplicates the request.

**3. `JudgeCard` passes `availableMoves.data` and `availableBonuses.data` through.**
Its existing `isSuccess` check already handles the loading state.

**4. Reconnect: `setupListeners(store.dispatch)` in `_app.tsx`, and `refetchOnReconnect: true` on each available-moves and available-bonuses hook.**
- `setupListeners` goes in `_app.tsx` beside the module-level `setupStore()`, not inside `setupStore`. Tests call `setupStore` once per test, and calling it there would add a set of window listeners each time. `setupListeners` already guards against there being no `window`, so server-side rendering is safe.
- RTK Query fetches an entry again if any of its subscriptions opted in, and that includes entries that have failed. The flag is still set on every reference-data hook, so recovery doesn't depend on which component happens to be mounted.
- *Alternative:* `refetchOnReconnect: true` in `emptyApi.ts`. Rejected because it also covers the scribe's scored-moves query. When that data comes back, the hydration effect in `Scribe.tsx` writes it to Redux and would overwrite moves scored during the outage that the server has not yet accepted.

**5. Testing the reconnect:** a test in `InfoBar.test.tsx` calls `setupListeners(store.dispatch)` on its own store. It makes MSW fail the first bonuses request, dispatches `window` `online`, and asserts that the bonus chips appear. The test can't import the call from `_app.tsx`, so it also checks that the hook options are set.

## Risks / Trade-offs

- [A new screen renders `ScoredMove` without passing the reference data] → The props are required, so TypeScript fails the build.
- [A reconnect causes a burst of fetches across all open tablets] → Only two small reference queries per screen are fetched again, on a local network.
- [If the bonuses fail and the reconnect never fires, for example a server outage while the Wi-Fi stays up, the list stays on the placeholder] → Same ceiling as today, but now a loading state instead of a misleading "Unknown". Retrying after a server-side error is out of scope.

## Migration Plan

Frontend only, with no data or API change. Roll back by reverting the commit.
