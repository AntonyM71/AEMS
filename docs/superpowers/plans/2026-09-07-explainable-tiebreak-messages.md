# Explainable Tie-Break Messages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat `TieBreak: Resolved by Tiebreak Engine` note with a sentence naming the deciding ICF tie-breaker and each athlete's bib number and value.

**Architecture:** A per-athlete walk of the tie-breakers in ICF precedence order (each run's score descending, then highest scoring move) finds the first criterion where the tied athletes differ and formats a human-readable `reason` string. Bib numbers are threaded into `calculate_rank` from its one production caller. The existing ranking computation in `calculate_tied_rank` is left untouched so ranks cannot change; only the `reason` string is new.

**Tech Stack:** Python 3 / Pydantic (Server), pytest; Next.js / TypeScript / Jest (Webapp).

**Spec:** [docs/superpowers/specs/2026-09-07-explainable-tiebreak-messages-design.md](../specs/2026-09-07-explainable-tiebreak-messages-design.md)

## Global Constraints

- Ruff line length 88; full type annotations required (ANN), naming rules (N). Run `uv run ruff check .` and `uv run ruff format .` from `Server/` before committing backend changes.
- `alembic upgrade head` must have been run before backend tests (no migrations in this plan, but tests need the schema).
- Backend tests run with coverage by default (`uv run python -m pytest`).
- `reason` stays a plain `str` — no API schema change, no `aemsApi.ts` regeneration.
- Athletes are identified in messages by bib number only, rendered `#{bib}`. Bibs are stored as strings (`Athlete.bib` is a `String` column).
- Message formats, exact:
  - Resolved: `Tie resolved by {criterion}: {label} ({value}), {label} ({value})[, ...]`
  - Unresolved: `Tie unresolved - athletes remain tied: {label}, {label}[, ...]`
  - `{criterion}` is `highest scoring run` (best run), `2nd highest scoring run`, `3rd highest scoring run`, … or `highest scoring move`.
  - `{label}` is `#{bib}` when a bib is known, otherwise `athlete {athlete_id}` (full UUID).
  - `{value}` is formatted with exactly 2 decimal places (`f"{value:.2f}"`).
  - In a resolved message the athletes are ordered by the deciding criterion's value, descending.
- The dash in the unresolved message is a plain ASCII hyphen (`-`).
- Frontend copy changes go only to `Webapp/src/pages/index.tsx` and its test. No rendering/component changes — the richer string flows through the existing "Notes" column unchanged.

---

### Task 1: Tie-break reason string in the scoring engine

**Files:**
- Modify: `Server/app/scoring/scoring_logic.py` (add helpers after `get_nth_highest_score` near line 486; change `calculate_rank` signature and its tied branch near lines 379-398)
- Modify: `Server/app/scoring/customScoringEndpoints.py:473` (pass a bib map into `calculate_rank`)
- Test: `Server/app/scoring/tests/test_scoring_logic.py` (revive one dead test, update 4 tie tests, add 7 new tests)

**Interfaces:**
- Consumes: existing `AthleteScores` (`athlete_id: UUID`, `run_scores: list[RunScores]`, `highest_scoring_move: float`, `total_score: float | None`, `ranking: int | None`, `reason: str | None`); existing module-level `get_nth_highest_score(index: int) -> Callable[[AthleteScores], float]`.
- Produces:
  - `calculate_rank(athlete_scores: list[AthleteScores], bib_numbers: dict[UUID, str] | None = None) -> list[AthleteScores]` — new optional second parameter; behaviour identical when omitted except for the `reason` string wording.
  - `build_tie_break_reason(athlete_id: UUID, tied_athletes: list[AthleteScores], bib_numbers: dict[UUID, str] | None) -> str` — module-level, used by `calculate_rank`. Compares each athlete against the rival ranked immediately adjacent in the resolved tie order (helper `_resolve_tie_order`).

---

- [ ] **Step 1: Write failing tests for the new helper**

Add these to `Server/app/scoring/tests/test_scoring_logic.py`. Add `build_tie_break_reason` to the existing import from `app.scoring.scoring_logic`, and add `UUID` usage (already imported).

Put this builder helper at module level (top of the file, after the imports):

```python
def _tied_athlete(
    athlete_id: str,
    run_means: list[float],
    highest_move: float,
    total_score: float = 50.0,
) -> AthleteScores:
    return AthleteScores(
        athlete_id=UUID(athlete_id),
        run_scores=[
            RunScores(
                run_number=i + 1,
                judge_scores=[
                    JudgeScores(
                        judge_id="j",
                        score_info=AthleteScoreInfo(
                            score=mean, highest_scoring_move=mean
                        ),
                    )
                ],
                mean_run_score=mean,
                highest_scoring_move=mean,
                locked=False,
                did_not_start=False,
            )
            for i, mean in enumerate(run_means)
        ],
        highest_scoring_move=highest_move,
        total_score=total_score,
    )
```

Then add a test class:

```python
A = "c7476320-6c48-11ee-b962-0242ac120001"
B = "c7476320-6c48-11ee-b962-0242ac120002"


class TestBuildTieBreakReason:
    def test_it_names_the_highest_scoring_run(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=10.0),
            _tied_athlete(B, [25.0, 25.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by highest scoring run: #7 (30.00), #12 (25.00)"
        )

    def test_it_names_the_second_highest_scoring_run(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0, 10.0], highest_move=10.0),
            _tied_athlete(B, [30.0, 18.0, 12.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by 2nd highest scoring run: #7 (20.00), #12 (18.00)"
        )

    def test_it_names_the_third_highest_scoring_run(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0, 10.0], highest_move=10.0),
            _tied_athlete(B, [30.0, 20.0, 8.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by 3rd highest scoring run: #7 (10.00), #12 (8.00)"
        )

    def test_it_names_the_highest_scoring_move(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=25.0),
            _tied_athlete(B, [30.0, 20.0], highest_move=15.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by highest scoring move: #7 (25.00), #12 (15.00)"
        )

    def test_it_reports_an_unresolved_tie(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=10.0),
            _tied_athlete(B, [30.0, 20.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie unresolved - athletes remain tied: #7, #12"
        )

    def test_it_falls_back_to_athlete_id_when_no_bib(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=10.0),
            _tied_athlete(B, [25.0, 25.0], highest_move=10.0),
        ]

        assert build_tie_break_reason(UUID(A), tied, None) == (
            f"Tie resolved by highest scoring run: athlete {UUID(A)} (30.00), "
            f"athlete {UUID(B)} (25.00)"
        )

    def test_it_compares_each_athlete_against_its_adjacent_rival(self) -> None:
        C = "c7476320-6c48-11ee-b962-0242ac120003"
        D = "c7476320-6c48-11ee-b962-0242ac120005"
        tied = [
            _tied_athlete(D, [35.0, 15.0], highest_move=10.0),
            _tied_athlete(A, [25.0, 25.0], highest_move=20.0),
            _tied_athlete(C, [25.0, 25.0], highest_move=12.0),
        ]
        bibs = {UUID(D): "5", UUID(A): "4", UUID(C): "3"}
        reasons = {
            aid: build_tie_break_reason(aid, tied, bibs)
            for aid in (UUID(D), UUID(A), UUID(C))
        }

        assert reasons[UUID(D)] == (
            "Tie resolved by highest scoring run: #5 (35.00), #4 (25.00)"
        )
        assert reasons[UUID(A)] == (
            "Tie resolved by highest scoring run: #5 (35.00), #4 (25.00)"
        )
        assert reasons[UUID(C)] == (
            "Tie resolved by highest scoring move: #4 (20.00), #3 (12.00)"
        )
```

`D` (best run 35) is cleared from `A` by run 0; `A` and `C` tie on both runs and
are separated only by highest scoring move, so `C`'s message names the move.

- [ ] **Step 2: Run the new tests to verify they fail**

Run: `cd Server && uv run python -m pytest app/scoring/tests/test_scoring_logic.py::TestBuildTieBreakReason -v`
Expected: FAIL — `ImportError` / `cannot import name 'build_tie_break_reason'`.

- [ ] **Step 3: Implement the helpers**

In `Server/app/scoring/scoring_logic.py`, add after `get_nth_highest_score` (the last function, ~line 486):

```python
def _ordinal(number: int) -> str:
    if 10 <= number % 100 <= 20:
        suffix = "th"
    else:
        suffix = {1: "st", 2: "nd", 3: "rd"}.get(number % 10, "th")
    return f"{number}{suffix}"


def _run_criterion_label(position: int) -> str:
    if position == 0:
        return "highest scoring run"
    return f"{_ordinal(position + 1)} highest scoring run"


def _athlete_label(athlete_id: UUID, bib_numbers: dict[UUID, str] | None) -> str:
    if bib_numbers and athlete_id in bib_numbers:
        return f"#{bib_numbers[athlete_id]}"
    return f"athlete {athlete_id}"


def _tie_break_criteria(
    number_of_runs: int,
) -> list[tuple[str, Callable[[AthleteScores], float]]]:
    criteria: list[tuple[str, Callable[[AthleteScores], float]]] = [
        (_run_criterion_label(position), get_nth_highest_score(position))
        for position in range(number_of_runs)
    ]
    criteria.append(("highest scoring move", lambda a: a.highest_scoring_move))
    return criteria


def _resolve_tie_order(
    tied_athletes: list[AthleteScores],
    criteria: list[tuple[str, Callable[[AthleteScores], float]]],
) -> list[AthleteScores]:
    ordered = list(tied_athletes)
    for _criterion, value_of in reversed(criteria):
        ordered.sort(key=value_of, reverse=True)
    return ordered


def build_tie_break_reason(
    athlete_id: UUID,
    tied_athletes: list[AthleteScores],
    bib_numbers: dict[UUID, str] | None,
) -> str:
    number_of_runs = max(len(a.run_scores) for a in tied_athletes)
    criteria = _tie_break_criteria(number_of_runs)
    resolved_order = _resolve_tie_order(tied_athletes, criteria)
    position = next(
        i for i, a in enumerate(resolved_order) if a.athlete_id == athlete_id
    )
    this_athlete = resolved_order[position]
    rival = (
        resolved_order[position - 1]
        if position > 0
        else resolved_order[position + 1]
    )

    for criterion, value_of in criteria:
        if value_of(this_athlete) != value_of(rival):
            pair = sorted([this_athlete, rival], key=value_of, reverse=True)
            compared = ", ".join(
                f"{_athlete_label(a.athlete_id, bib_numbers)} ({value_of(a):.2f})"
                for a in pair
            )
            return f"Tie resolved by {criterion}: {compared}"

    tied_with = [
        a
        for a in tied_athletes
        if all(value_of(a) == value_of(this_athlete) for _c, value_of in criteria)
    ]
    remaining = ", ".join(
        _athlete_label(a.athlete_id, bib_numbers) for a in tied_with
    )
    return f"Tie unresolved - athletes remain tied: {remaining}"
```

`_resolve_tie_order` applies `reversed(criteria)` as stable descending sorts —
the same sequence `calculate_tied_rank` uses (move, then last run, …, then first
run), so the resolved order matches the ranks it assigns. Each athlete's message
compares them only against `rival`, the athlete ranked immediately adjacent
(above, or below when this athlete tops the tied block).

- [ ] **Step 4: Run the new tests to verify they pass**

Run: `cd Server && uv run python -m pytest app/scoring/tests/test_scoring_logic.py::TestBuildTieBreakReason -v`
Expected: PASS (6 passed).

- [ ] **Step 5: Wire the reason into `calculate_rank` and add the `bib_numbers` parameter**

In `Server/app/scoring/scoring_logic.py`, change the signature and the tied branch of `calculate_rank`:

```python
def calculate_rank(
    athlete_scores: list[AthleteScores],
    bib_numbers: dict[UUID, str] | None = None,
) -> list[AthleteScores]:
```

Replace the tied branch (currently `s.reason = f"TieBreak: {rank_info.reason}"`) so it reads:

```python
            else:
                rank_info = calculate_tied_rank(s.athlete_id, athletes_with_same_score)
                s.ranking = rank + rank_info.ranking + 1
                s.reason = build_tie_break_reason(
                    s.athlete_id, athletes_with_same_score, bib_numbers
                )
```

Leave `calculate_tied_rank`, `RankInfo`, `athletes_with_this_exact_score_after_tiebreak`, and `athlete_is_fully_tied` unchanged — `rank_info.ranking` still drives the rank; only `rank_info.reason` is now unused.

- [ ] **Step 6: Revive the dead tie test and update the 4 real tie tests**

`test_it_breaks_a_tie_with_highest_scoring_run` (around line 2108) currently builds a list literal and asserts nothing. Make it a real test: assign the list to `scores`, build the `want` list (mirror the other tie tests' structure), call `got = calculate_rank(scores, bib_numbers={UUID("c7476320-6c48-11ee-b962-0242ac120003"): "3", UUID("c7476320-6c48-11ee-b962-0242ac120004"): "4"})`, and `assert got == want`. Athlete `...003` has runs `[25, 25]`, `...004` has runs `[30, 20]`, both `total_score=50`, both `highest_scoring_move` equal. Expected `reason` for **both** athletes: `"Tie resolved by highest scoring run: #4 (30.00), #3 (25.00)"`. Expected `ranking`: `...004` = 1, `...003` = 2.

For the other four tie tests, add a `bib_numbers` argument to the `calculate_rank(scores)` call and update every `reason=` field in the `want` list. Use bib `"3"` for athlete id ending `...120003`, `"4"` for `...120004`, `"5"` for `...120005` (whatever ids the test uses — map each to the last digit as a string). In a 3-athlete test each athlete may now get a **different** `reason` (each compares against its own adjacent rival) — set them per-athlete in the `want` list. Determine each by running the test and reading the produced value from the assertion diff, then verify by hand that it:
  - names the criterion — the highest-precedence run/move where **this athlete and its adjacent rival** first differ (run 0 = `highest scoring run`),
  - lists exactly this athlete and that rival, ordered by that criterion's value, descending,
  - shows each value to 2 decimal places,
  - uses `#{bib}` labels.

  - `test_it_breaks_a_tie_with_dropped_run_run` (2 athletes): tie on runs 0 and 1 (both `25`), differ on run 2 (`10` vs `5`) → both `"Tie resolved by 3rd highest scoring run: #4 (10.00), #3 (5.00)"`.
  - `test_it_breaks_a_tie_with_three_paddlers_using_highest_scoring_run`: adjacent pairs differ on run 0 → each athlete `"Tie resolved by highest scoring run: ..."` naming its own pair.
  - `test_it_breaks_a_tie_with_three_paddlers_using_highest_scoring_move` and `test_it_breaks_a_tie_with_three_paddlers_using_highest_scored_move`: the athlete cleared by the top run gets `"...highest scoring run..."`; the pair separated only by the move gets `"Tie resolved by highest scoring move: ..."` (the test names finally match the behaviour).
  - `test_it_returns_tied_ranks_for_an_actual_tie`: the two fully-tied athletes get `"Tie unresolved - athletes remain tied: #{bib}, #{bib}"` (order: the order they appear in `athletes_with_same_score`, which is the order they appear in the input `scores` list). The third, non-tied athlete keeps `reason=None`.

  Rankings asserted in these tests **must not change** — if any `ranking` value changes, stop and report it as a plan defect.

- [ ] **Step 7: Update the production caller**

In `Server/app/scoring/customScoringEndpoints.py`, at line 473, change:

```python
    athlete_scores_with_rank = calculate_rank(athlete_scores)
```

to:

```python
    athlete_scores_with_rank = calculate_rank(
        athlete_scores, bib_numbers={a.id: a.bib for a in athletes}
    )
```

`athletes` is the `list[Athlete]` already queried earlier in `calculate_phase_scores`; `Athlete.id` is a `UUID`, `Athlete.bib` is a `str`.

- [ ] **Step 8: Run the full scoring test suite**

Run: `cd Server && uv run python -m pytest app/scoring/tests/ -v`
Expected: PASS (all tests, including the revived and updated tie tests).

- [ ] **Step 9: Lint and format**

Run: `cd Server && uv run ruff check . && uv run ruff format --check .`
Expected: no errors. If `ruff format --check` reports files, run `uv run ruff format .` and re-run the tests.

- [ ] **Step 10: Commit**

```bash
git add Server/app/scoring/scoring_logic.py Server/app/scoring/customScoringEndpoints.py Server/app/scoring/tests/test_scoring_logic.py
git commit -m "$(cat <<'EOF'
scoring: explain tie-breaks with the deciding criterion and bib values

Replace "Resolved by Tiebreak Engine" with a sentence naming which ICF
tie-breaker separated the athletes and each athlete's bib and value, e.g.
"Tie resolved by highest scoring run: #12 (85.00), #7 (80.00)". Bib
numbers are threaded into calculate_rank from calculate_phase_scores.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

**Note on scope:** `calculate_phase_scores` / `get_phase_scores` has no existing endpoint-level unit test and needs a full DB fixture (phase + heats + athletes + scored moves) to exercise. The bib-map plumbing is covered at the `calculate_rank` boundary by `TestBuildTieBreakReason` and the updated tie tests. Adding a DB-backed endpoint test is out of scope for this plan; the caller change is a one-line dict comprehension verified by reading.

---

### Task 2: Update the frontend "Gotchas" copy

**Files:**
- Modify: `Webapp/src/pages/index.tsx:9-13`
- Test: `Webapp/src/__tests__/index.test.tsx:17-21`

**Interfaces:**
- Consumes: nothing from Task 1 (independent copy change).
- Produces: nothing.

- [ ] **Step 1: Update the test assertion to expect the new copy**

In `Webapp/src/__tests__/index.test.tsx`, replace the second bullet assertion:

```tsx
		expect(
			screen.getByText(
				/Tiebreak engine doesn't give a detailled breakdown/
			)
		).toBeInTheDocument()
```

with:

```tsx
		expect(
			screen.getByText(/Tiebreaks now show which criterion decided/)
		).toBeInTheDocument()
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd Webapp && npx jest src/__tests__/index.test.tsx`
Expected: FAIL — `Unable to find an element with the text: /Tiebreaks now show which criterion decided/`.

- [ ] **Step 3: Update the copy**

In `Webapp/src/pages/index.tsx`, replace the second `<ul>` block:

```tsx
			<ul>
				- Tiebreaks now show which criterion decided the result and
				the athletes' bib numbers and values, e.g. "Tie resolved by
				highest scoring run: #12 (85.00), #7 (80.00)". A complete tie
				shows "Tie unresolved - athletes remain tied".
			</ul>
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd Webapp && npx jest src/__tests__/index.test.tsx`
Expected: PASS.

- [ ] **Step 5: Type-check and lint**

Run: `cd Webapp && npm run tsc && npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add Webapp/src/pages/index.tsx Webapp/src/__tests__/index.test.tsx
git commit -m "$(cat <<'EOF'
webapp: update tie-break gotcha note for the new explainable messages

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

**1. Spec coverage:**
- "Deciding-criterion detection … compare against the adjacent rival" → Task 1 Step 3, `build_tie_break_reason` + `_resolve_tie_order`; locked by `test_it_compares_each_athlete_against_its_adjacent_rival`.
- "Message formatting" (criterion labels, ordinals, `#{bib}`, `:.2f`, ordering) → Task 1 Step 3 + Global Constraints + `TestBuildTieBreakReason`.
- "Bib numbers reach the engine" (`calculate_rank` param, caller, fallback) → Task 1 Steps 5, 7 + fallback test.
- "Drop the `TieBreak:` prefix" → Task 1 Step 5.
- `"Fully Tied"` → `"Tie unresolved - athletes remain tied: …"` → Task 1 Step 3 + Step 6 + unresolved test.
- "Frontend copy" → Task 2.
- Ranking unchanged → Task 1 Step 5 leaves `calculate_tied_rank` untouched; Step 6 asserts rankings don't move.
- Precedence audit note → no code; recorded in the spec.

**2. Placeholder scan:** No TBD/TODO. All code steps carry full code. Existing-test `reason` values in Step 6 are derived by running the deterministic implementation and hand-verified against an explicit checklist — the criterion and format for each are stated.

**3. Type consistency:** `build_tie_break_reason(athlete_id: UUID, tied_athletes: list[AthleteScores], bib_numbers: dict[UUID, str] | None)` — same name/signature in the helper definition (Task 1 Step 3), the `calculate_rank` call site (Step 5), and the tests (Step 1). `_resolve_tie_order(tied_athletes, criteria)` where `criteria` is the `list[tuple[str, Callable[[AthleteScores], float]]]` returned by `_tie_break_criteria`. `calculate_rank`'s new `bib_numbers: dict[UUID, str] | None = None` matches the caller passing `{a.id: a.bib for a in athletes}` (`UUID` → `str`). `get_nth_highest_score(position)` used as documented.
