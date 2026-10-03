# Tasks

## 1. ScoredMove reads scoresheet data from props

- [x] 1.1 Update `ScoredMove.test.tsx` to pass `availableMoves` and `availableBonuses` as props and drop its `/api/availablemoves` MSW overrides. Add one test where the move is in the list (name, direction and bonus chips render) and one where it is not ("Unknown" renders). Run `npm test -- ScoredMove` from Webapp/ and verify the tests fail.
- [x] 1.2 In `ScoredMove.tsx`, remove both RTK Query hooks. Add the required `availableMoves` and `availableBonuses` props, find the move with `.find`, and filter and sort its bonuses with `sortBonuses`. Verify `npm test -- ScoredMove` passes.

## 2. Parents pass the data down

- [x] 2.1 In `InfoBar.tsx`, pass `availableMoves` and `paddlerInfo.scoresheet` to `ScoredMoveList`. In `ScoredMoveList`, fetch bonuses with `{sheetIdList:[scoresheet]}` and render a `Skeleton` until that data arrives. Then pass both lists to each `ScoredMove`. Add a test in `InfoBar.test.tsx` that a scored move shows its name and bonus chip, and that "Unknown" does not appear while the bonuses are still loading. Verify `npm test -- InfoBar` passes.
- [x] 2.2 In `JudgeCard.tsx`, pass `availableMoves.data` and `availableBonuses.data` to each `ScoredMove`. Verify `npm test -- headJudge` passes and shows the move names.

## 3. Fetch reference data again on reconnect

- [x] 3.1 Add `setupListeners(store.dispatch)` in `src/pages/_app.tsx` after `setupStore()`. Verify `npm run build` succeeds, which also checks server-side rendering.
- [x] 3.2 Add `refetchOnReconnect: true` to the available-moves and available-bonuses hooks in `Scribe.tsx`, `InfoBar.tsx` (both `CurrentScoreCalculation` and `ScoredMoveList`), `JudgeCard.tsx` and `headJudge.tsx`. Leave the scribe's scored-moves query unchanged. Verify with `grep -n refetchOnReconnect src` that only these hooks have the flag.
- [x] 3.3 Add a test in `InfoBar.test.tsx`: wire `setupListeners` to the test store, make MSW fail the first `/api/availablebonuses` request, dispatch a `window` `online` event, and assert that the bonus chip appears. Verify `npm test -- InfoBar` passes.

## 4. Verify

- [x] 4.1 Run `npm run precommit` and `npm test` from Webapp/ and verify both pass with no type, lint or test failures.
