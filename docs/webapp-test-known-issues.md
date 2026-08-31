# Webapp — known issues surfaced while strengthening tests

Findings from the frontend test-hardening work (making a green suite mean working
behaviour, per Kent C. Dodds). Each was deliberately left out of that change to
keep its diff reviewable, and each is recorded here with the evidence found at
the time of writing. Re-verify before acting, as line numbers drift.

## 1. `renderWithProviders` return type is a lie

`Webapp/src/testUtils.tsx` annotates the return as `{ store: EnhancedStore }`,
but it actually returns `{ store, ...render(...) }`. Destructured RTL queries
(`const { getByText } = renderWithProviders(...)`) therefore do not typecheck,
and every test is pushed through `screen`. Widening the annotation to
`ReturnType<typeof render> & { store }` was tried and TypeScript still drops the
bound query methods from the inferred object literal (an overload-resolution
quirk of `render` when `...renderOptions` is spread into its options). Left as
is; `screen` works everywhere.

- `Webapp/src/testUtils.tsx` — the `renderWithProviders` signature and return

## 2. `LiveRunScore` hardcodes lock/DNS and renders "NaN" before data

`SubscribedFinalScore` passes `locked={false}` and `did_not_start={false}` as
literals to `FinalScore`, so the broadcast/arena live-score card can never show
the locked styling or "DNS". With its initial empty `allJudgeScores`,
`calculateAverage([])` is `0 / 0`, so the card renders the string **`NaN`**
until the first score arrives. A test must never assert on that `NaN`.

- `Webapp/src/components/broadcast/Cards/LiveRunScore.tsx` — the `FinalScore` props and `allJudgeScores` initial state

## 3. `RunCard` splits its text across elements

`RunDetails` renders `Run:`, the run number, `/` and the total as four separate
`<Typography>` nodes, so `getByText("1 / 3")` cannot match. Scope a query to the
card and read the parts, or add a testid.

- `Webapp/src/components/broadcast/Cards/RunCard.tsx` — the nested `Stack` of `Typography`

## 4. `data-testid="final-score"` collides three ways

`FinalScore.tsx`, `roles/headJudge/LiveTimer.tsx` and
`arena/liveTimerArena.tsx` all use `data-testid="final-score"` (see also
`arena-known-issues.md` §5). Any page rendering a timer and a score has two
nodes with the id. Tests assert on **`final-score-value`** instead.

## 5. `UploadCsv` form handling

- `const formData = new FormData()` sits in the component body, recreated every
  render; `onSubmit` closes over one instance, so two submits without an
  intervening render append every field twice.
- `file` state initialises to `new Blob()`, which is truthy, so the `!file`
  term in the submit button's `disabled` expression never blocks — only an
  empty `fileName` shows the red outline.
- The success path calls the bare `toast(JSON.stringify(response.data))`, i.e.
  it dumps the raw server response at the user.
- There is no `helperText` anywhere — validation is a red outline only, nothing
  announced to a screen reader or assertable by text.
- MSW's XHR interceptor cannot parse the multipart request body axios sends
  under jsdom, so `UploadCsv.test.tsx` checks the boundary with a `jest.spyOn`
  on `axios.post`. A full round-trip test would have to be e2e, but the upload
  accordion on `/Admin` only renders when `NEXT_PUBLIC_SHOW_CSV_UPLOAD === "true"`
  at build time, so that e2e needs the flag enabled in the e2e stack first.

- `Webapp/src/components/competition/UploadCsv.tsx` — `UploadForm`

## 6. Scribe re-saves a judge's scores just for loading them — FIXED

**Fixed** on branch `improve-frontend-tests`. The load effect now sets a
`skipSubmitForHydration` ref before writing to the store, and the submit effect
consumes it once and returns, so the single change the load effect causes no
longer echoes back. `Scribe.test.tsx`'s `does not re-save the judge's scores
merely for loading them` test is now active. Switching paddler/run also no
longer re-saves the previous paddler's moves.

Residual: under React Strict Mode (dev only, not the production build or the
test env), the load effect's double-invoke could still let one echo through.
Fully closing that needs the larger "submit only from explicit user actions"
refactor — deferred.

The original bug: on mount Scribe loaded the judge's existing moves, wrote them
into the store, which tripped the `useEffect([scoredMoves, scoredBonuses])`
submit effect, which POSTed the just-loaded moves straight back. With two
scribe devices open for one judge, whichever loaded last re-saved stale data
over the other.

- `Webapp/src/components/roles/scribe/Scribe.tsx` — the load effect (`useEffect([moveAndBonusdata])`) and the submit effect (`useEffect([scoredMoves, scoredBonuses])`)

## 7. `PromotePhase` "at least one heat name" guard is unreachable

`submitForm` now `return`s after `toast.error("Please set at least one heat
name")`, but the Create Phase button is already `disabled` while
`newHeatNames.length === 0`, so that branch cannot run through the UI. The
`return` is defensive only — it matters if the `disabled` condition is ever
loosened. No test covers it.

- `Webapp/src/components/competition/PromotePhase.tsx` — `submitForm` and the Create Phase `disabled` expression

## 8. `PromotePhase` heat buttons mislabelled `aria-label="toggle password visibility"`

The add-heat and delete-heat `IconButton`s carry
`aria-label="toggle password visibility"` — the same MUI password-demo
copy-paste that `PhaseSelector` had (now fixed there). Rename to "Add heat" /
"Remove heat".

- `Webapp/src/components/competition/PromotePhase.tsx` — the two `IconButton` `aria-label`s

## 9. Three broadcast cards share one visibility flag

`AthleteInfoCard`, `RunCard` and `LiveRunScore` all gate their `Collapse` on
`overlayControlState.showLiveRunScore`, so the athlete card, the run card and
the live score appear and disappear together regardless of their own relevance.
Looks like a copy-paste — each probably wants its own flag.

- `Webapp/src/components/broadcast/Cards/AthleteInfoCard.tsx`, `RunCard.tsx`, `LiveRunScore.tsx` — the `Collapse in={...}` prop

## 10. `OverlayController` mount effects clobber each other

`controller.tsx` has six `useEffect`s that each do
`setOverlayControlState({ ...overlayControlState, [key]: value })` with a
non-functional update, all closing over the same render's `overlayControlState`.
On mount they all run against the initial default, so React keeps only the last
write (`selectedRun`) and `selectedCompetition` / `selectedEvent` /
`selectedPhase` / `selectedHeat` / `selectedAthlete` set from the store at mount
are dropped. It only recovers when the operator changes a field afterwards (one
effect re-runs in isolation). Rewrite as functional updates, or fold the sync
into one effect. `controller.test.tsx` works around it by dispatching the heat
change after mount.

- `Webapp/src/components/broadcast/controller.tsx` — the `useEffect` chain at lines ~65–86

## 11. `headJudge.test.tsx` store ids don't match the mock competition data

The shared `competitionsWithHeat` fixture uses `selectedCompetition: "comp-1"`
etc., while the global `/api/competition/` handler returns ids `1` and `2`, so
`SelectorDisplay` logs MUI "out-of-range value" console warnings. Cosmetic — the
head judge page only needs `selectedHeat` — but noisy.

- `Webapp/src/components/roles/headJudge/__tests__/headJudge.test.tsx` — the `competitionsWithHeat` fixture

## Code-review findings on the earlier test-hardening pass

A review of the earlier pass flagged ten places where a test could stay green
while the behaviour it names regressed. Six were closed on branch
`improve-frontend-tests` (the "Tier 2" strengthening); the other four are Tier 1
production-code concerns or judged not worth acting on.

### Closed in Tier 2

1. **Scribe `records a move`** — the "sent to the server" assertions
   (`scorePosts.length > 0`, `scorePosts[0].heatId`) were satisfied by the empty
   mount-time POST (#6), not the click. Now asserts a POST whose `moves` array
   carries `{move_id: "test-move-1", direction: "L"}`.
2. **arena / controller `Test Heat`** — `/api/heat/:id` returned a constant name
   for every id, so the assertion only proved *a* heat reached the modal. The
   tests now override the handler with an id-derived name and assert it.
3. **headJudge `only shows the run locked …`** — never asserted the click
   *emitted* a lock request. Now asserts `socketHub.emittedOn("run_status")`
   contains a `locked: true` payload with the run's identity.
4. **headJudge `refuses to set DNS while locked`** — asserted the toast fired
   but not that the write was blocked. Now asserts `emittedOn("run_status")` is
   empty (gated behind `openCount > 0`, so it is not vacuous).
5. **`NEXT_PUBLIC_SHOW_LOCK_RUN` module-scope leak** — moved into
   `beforeAll`/`afterAll` in `headJudge.test.tsx`.
6. **`Show ICF Logo` / `showImageCard` toggle** lost all coverage in the
   controller rewrite. New test asserts the click emits `showImageCard: false`
   (with a `showImageCard: true` precondition so it stays a state-*change*
   assertion).

Enabling infra: `socketHub.emittedOn(channel)` — a channel-level log of every
outbound `.emit(...)` across a channel's sockets.

### Not closed

- **`controller.test.tsx` selects the heat via `dispatch(updateSelectedHeat)`
  rather than the UI** — a deliberate workaround for the `controller.tsx`
  mount-effect clobber (#10). The proper fix is the Tier 1 component change;
  once #10 is fixed the test can drive the real heat selector.
- **Deleting the duplicate `FinalScore.test.tsx`** — the surviving
  `__tests__/FinalScore.test.tsx` (byte-identical) still covers DNS + averaging.
  The genuine gap is that nothing pins the empty-`allJudgeScores` render, which
  is the "NaN" defect in #2 above — track it there, not as a test finding.
- **`PhaseSelector` number inputs show `0` on clear** — `Number("")` is `0`. The
  change fixed a real string-comparison bug; the "0 vs blank" while editing is
  acceptable. No action.
- **New global handlers change default network behaviour** — audited: every
  existing suite that hits `getHeatInfo` / `run_status` /
  `getAthleteMovesAndBonuses` already provides its own `server.use` override, so
  the practical blast radius is nil. No action.