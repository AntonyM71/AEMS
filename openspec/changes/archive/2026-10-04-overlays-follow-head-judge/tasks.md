# Tasks

## 1. Server relay

- [x] 1.1 Add `head_judge_selection` (relay to all, sender included) and `request_head_judge_selection` (relay with `skip_sid`) handlers on `/head_judge_selection` in `Server/app/broadcastEndpoints.py`. Verify with new cases in `Server/app/tests/test_broadcast_endpoints.py` asserting the exact `sio.emit` call for each.
- [x] 1.2 Add a `request_broadcast_control` handler on `/broadcast_control` that relays with `skip_sid`. Verify with a test in the same file asserting `skip_sid="sender-sid"`.
- [x] 1.3 Run `uv run ruff check .` and `uv run python -m pytest app/tests/test_broadcast_endpoints.py` from `Server/` and confirm both pass.

## 2. Types and socket plumbing (Webapp)

- [x] 2.1 Add `followHeadJudge: boolean` to `OverlayControlState`, defaulting to `false` in `defaultOverlayControllerState` in `Interfaces.tsx`, and add the `HeadJudgePosition` type (design.md §2). Verify `npm run tsc` passes, and update any test asserting the default state.
- [x] 2.2 Add `connectHeadJudgeSelectionSocket` to `WebSocketConnections.ts` and its `__mocks__` counterpart, and add `"head_judge_selection"` as a `SocketChannel` in `src/mocks/socketHub.ts`. Verify `npm run tsc` passes.
- [x] 2.3 In `streamingApi.ts`, make `broadcastControlStream` emit `request_broadcast_control` on every socket `connect`. Add the `broadcastControlRequestStream`, `headJudgePositionStream` (emits `request_head_judge_selection` on connect), `headJudgeSelectionRequestStream`, and `emitHeadJudgePosition` endpoints (design.md §4). Verify with a test that a `request_broadcast_control` arriving on the hub increments the request counter.

## 3. Head judge publishes its position

- [x] 3.1 In `headJudge.tsx`, build a `HeadJudgePosition` and emit it on change and on each request, once a heat and athlete are selected (design.md §5). Verify with tests in `roles/headJudge/__tests__/headJudge.test.tsx` for the `judging-workflow` scenarios:
  - stepping to the next paddler emits that athlete;
  - changing run emits the new run;
  - changing phase alone emits nothing new;
  - an inbound `request_head_judge_selection` triggers a re-emit with no change.

## 4. Display pages switch source

- [x] 4.1 Add `useDisplayedOverlayState` in `components/broadcast/` (design.md §1, §4), and use it in place of `useBroadcastControlStreamQuery()` in `arena/arena.tsx` and `broadcast/overlay.tsx`. Verify with `arena/__tests__/arena.test.tsx` cases for each "Display pages follow the head judge's position when told to" scenario:
  - a followed paddler change shows on the arena with no controller emit;
  - the heat summary follows the head judge's heat;
  - phase results stay on the controller's phase;
  - in Manual, head judge changes are ignored;
  - with no position yet, the arena falls back to the broadcast_control athlete;
  - entering follow sends `request_head_judge_selection` and adopts the answer.
- [x] 4.2 Verify in `arena/__tests__/arena.test.tsx` that the arena's broadcast socket emits `request_broadcast_control` on connect. Using `socketHub.enableEcho`, verify that a controller in Follow mode and a head judge rendered with the arena make a remounted arena show the head judge's athlete.

## 5. Controller switch and state answering

- [x] 5.1 Add the Manual / Follow head judge toggle, the split picker layout with the `inert` container, the info `Alert` naming the followed athlete and run, and the followed heat in the heat-summary check to `broadcast/controller.tsx` (design.md §6). Verify with `broadcast/__tests__/controller.test.tsx`:
  - switching emits `followHeadJudge` true with the visibility flags unchanged;
  - the four followed pickers are inert, and event and phase are not;
  - the alert names the athlete and run from a published position;
  - switching back emits `followHeadJudge` false, removes the alert, and re-enables every picker.
- [x] 5.2 Make the controller re-emit its current state on each `request_broadcast_control`. Verify with a controller test that an inbound request produces one more `broadcast_control` emit carrying the current state, including `followHeadJudge`.

## 6. End-to-end and wrap-up

- [x] 6.1 Add `e2e/tests/followHeadJudge.spec.ts`, using a `Date.now()`-suffixed competition. It opens the controller and switches to Follow, opens the head judge page and the arena page, steps the head judge to the next paddler, and asserts that the arena shows that paddler's surname. It then reloads the arena and asserts that the surname is still shown. Verify `npm test` in `e2e/` passes against the running stack.
- [x] 6.2 Run `npm run precommit` and `npm test` in `Webapp/` and confirm both pass.
- [x] 6.3 Raise a follow-up GitHub issue for semi-automatic modals (for example, show the heat summary for N seconds when the head judge changes heat) that references #383 and this change. Verify the issue URL is recorded in the PR description.
