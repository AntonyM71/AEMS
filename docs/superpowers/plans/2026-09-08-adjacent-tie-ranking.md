# Adjacent Tie Ranking Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix `calculate_rank` so a tied group is placed by how many athletes actually finished ahead of it, not by a stale counter — and lock the behaviour down with a broad table of tie-shape tests.

**Architecture:** `calculate_rank` in [Server/app/scoring/scoring_logic.py](../../../Server/app/scoring/scoring_logic.py) walks athletes in descending `total_score` order and sets `.ranking` (and `.reason` for tied athletes). Today it keeps a mutable `rank` accumulator that is refreshed **only** in the solo branch (`max(assigned rankings) + 1`); the tie branch reuses whatever `rank` last held. When one tied group sits directly below another (no solo athlete between them) the second group is placed with `rank` still holding the value from *before* the first group, so it collides with — or outranks — the group above it (issue #410). The fix removes the accumulator: each iteration counts the athletes who **started and scored strictly higher**, and uses that count as the base for both branches. Within a tied group the existing `calculate_tied_rank` offset (0-based position after the ICF tie-breakers) is added on top.

**Tech Stack:** Python 3, Pydantic models, pytest (`uv run python -m pytest`, coverage on by default).

**Spec:** GitHub issue #410 — <https://github.com/AntonyM71/AEMS/issues/410>. Reporter's requirement: "any solution should include at least one test case asserting the correct behaviors for adjacent ties."

## Global Constraints

- **Ranking convention: standard competition ranking ("1,1,3").** A rank equals `1 + (number of athletes ahead)`, where "ahead" means a strictly higher `total_score`, or the same score but resolved ahead by a tie-breaker. After an unresolved 2-way tie for 1st, the next athlete is **3rd**, and there is a gap after every multi-way tie. This is a deliberate change from the current frozen behaviour (which made that athlete 2nd); exactly one existing test encodes the old convention and is updated in Task 1.
- Ruff line length 88; rule sets ANN, N, UP, B, EM, TRY, PD enabled. Every function needs type annotations.
- Run backend commands from [Server/](../../../Server/) with the venv active (`source .venv/bin/activate`); `alembic upgrade head` must already have run.
- **No API/schema change.** `calculate_rank` keeps its signature and return type; `AthleteScores` is untouched. Do **not** run `buildApi.sh`.
- Keep the change scoped to `calculate_rank` and the `TestAthleteRankCalculation` test class. Do **not** modify `calculate_tied_rank`, `build_tie_break_reason`, `_resolve_tie_order`, or `_tie_break_criteria` — they are correct and covered by `TestBuildTieBreakReason`.
- Out of scope: an athlete who did-not-start every run but shares an exact `total_score` with a tied group is still passed into `calculate_tied_rank`/`build_tie_break_reason` as a group member. That is pre-existing behaviour, not part of issue #410, and no test in this plan asserts on it.

---

## File Structure

- [Server/app/scoring/scoring_logic.py](../../../Server/app/scoring/scoring_logic.py) — `calculate_rank` (lines 379-403) rewritten in place. No new functions, no new files.
- [Server/app/scoring/tests/test_scoring_logic.py](../../../Server/app/scoring/tests/test_scoring_logic.py) — new test methods added to the existing `TestAthleteRankCalculation` class (currently ends at line 2260), and one existing method in that class updated. Reuses the module-level `_tied_athlete` helper (lines 28-56) and the already-imported names at lines 5-25.

---

## Task 1: Fix `calculate_rank` and cover the issue scenario

**Files:**
- Modify: `Server/app/scoring/scoring_logic.py:379-403`
- Test: `Server/app/scoring/tests/test_scoring_logic.py` — add one method to `TestAthleteRankCalculation` (after line 2260); update `test_it_returns_tied_ranks_for_an_actual_tie` (lines 2211-2239).

**Interfaces:**
- Consumes (defined in `scoring_logic.py`, already imported by the test file):
  - `_tied_athlete(athlete_id: str, run_means: list[float], highest_move: float, total_score: float = 50.0) -> AthleteScores` — test helper, `test_scoring_logic.py:28`. Builds an athlete with one `RunScores` per entry in `run_means` (each `mean_run_score` and per-run `highest_scoring_move` set to that value, `did_not_start=False`), a top-level `highest_scoring_move=highest_move`, and the given `total_score`.
  - `calculate_rank(athlete_scores: list[AthleteScores], bib_numbers: dict[UUID, str] | None = None) -> list[AthleteScores]` — sorts a copy of the input by `total_score` descending, mutates each `AthleteScores` in place (`.ranking`, and `.reason` when tied), returns the sorted list.
  - `calculate_tied_rank(athlete_id: UUID, athlete_scores: list[AthleteScores]) -> RankInfo` — returns `RankInfo(ranking=<int>, reason=<str>)` where `ranking` is the athlete's 0-based offset within the tied group after the ICF tie-breakers: its own sorted position when the tie-breakers separate it, or the group's minimum sorted position when it stays fully tied. Unchanged.
  - `build_tie_break_reason(athlete_id: UUID, tied_athletes: list[AthleteScores], bib_numbers: dict[UUID, str] | None) -> str` — human-readable explanation; falls back to `f"athlete {uuid}"` when a bib is missing. Unchanged.
  - `check_athlete_started_at_least_one_ride(athlete_info: AthleteScores) -> bool` — `scoring_logic.py:369`; `False` only when every run has `did_not_start=True`.
- Produces: `calculate_rank` with the same signature/return type. New behaviour — a group's base rank is `sum(1 for a in field if a.total_score > s.total_score and a started)`, so it is correct regardless of what sits directly above (a solo athlete, another tied group, or a non-starter).

- [ ] **Step 1: Write the failing test for the issue scenario**

Add this method to `TestAthleteRankCalculation` in `test_scoring_logic.py`, immediately after `test_it_does_not_crash_on_a_mixed_run_count_tie` (after line 2260):

```python
    def test_it_ranks_a_resolved_pair_above_a_lower_scoring_tied_pair(
        self,
    ) -> None:
        # Issue #410: Freddie & Paul (215.0, separated by their best run) must
        # sit at 1 and 2, and Brian & Ringo (200.0, fully tied) at 3 and 3 -
        # not above the higher-scoring pair as the stale rank counter did.
        freddie = "c7476320-6c48-11ee-b962-0242ac120001"
        paul = "c7476320-6c48-11ee-b962-0242ac120002"
        brian = "c7476320-6c48-11ee-b962-0242ac120003"
        ringo = "c7476320-6c48-11ee-b962-0242ac120004"
        scores = [
            _tied_athlete(freddie, [30.0, 10.0], highest_move=9.0, total_score=50.0),
            _tied_athlete(paul, [20.0, 20.0], highest_move=8.0, total_score=50.0),
            _tied_athlete(brian, [20.0], highest_move=7.0, total_score=40.0),
            _tied_athlete(ringo, [20.0], highest_move=7.0, total_score=40.0),
        ]
        bibs = {
            UUID(freddie): "1",
            UUID(paul): "2",
            UUID(brian): "3",
            UUID(ringo): "4",
        }

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert got[UUID(freddie)].ranking == 1
        assert got[UUID(paul)].ranking == 2
        assert got[UUID(brian)].ranking == 3
        assert got[UUID(ringo)].ranking == 3
        assert got[UUID(freddie)].reason == (
            "Tie resolved by highest scoring run: #1 (30.00), #2 (20.00)"
        )
        assert got[UUID(brian)].reason == (
            "Tie unresolved - athletes remain tied: #3, #4"
        )
```

- [ ] **Step 2: Run it to verify it fails**

Run: `uv run python -m pytest app/scoring/tests/test_scoring_logic.py::TestAthleteRankCalculation::test_it_ranks_a_resolved_pair_above_a_lower_scoring_tied_pair -v`
Expected: FAIL. `brian`/`ringo` come back as `ranking == 1` (the tie branch reused `rank == 0` from before Freddie & Paul's group), so `assert got[UUID(brian)].ranking == 3` fails.

- [ ] **Step 3: Rewrite `calculate_rank`**

Replace `calculate_rank` in `scoring_logic.py` (lines 379-403) with:

```python
def calculate_rank(
    athlete_scores: list[AthleteScores],
    bib_numbers: dict[UUID, str] | None = None,
) -> list[AthleteScores]:
    sorted_athletes_scores = sorted(
        athlete_scores, key=lambda x: x.total_score or 0, reverse=True
    )

    for s in sorted_athletes_scores:
        if not check_athlete_started_at_least_one_ride(s):
            continue

        athletes_with_same_score = [
            item for item in sorted_athletes_scores if item.total_score == s.total_score
        ]
        athletes_ranked_above = sum(
            1
            for a in sorted_athletes_scores
            if (a.total_score or 0) > (s.total_score or 0)
            and check_athlete_started_at_least_one_ride(a)
        )

        if len(athletes_with_same_score) == 1:
            s.ranking = athletes_ranked_above + 1
        else:
            rank_info = calculate_tied_rank(s.athlete_id, athletes_with_same_score)
            s.ranking = athletes_ranked_above + rank_info.ranking + 1
            s.reason = build_tie_break_reason(
                s.athlete_id, athletes_with_same_score, bib_numbers
            )

    return sorted_athletes_scores
```

What changed: the mutable `rank` variable is gone. `athletes_ranked_above` is recomputed for every athlete and counts only athletes who **started** and scored **strictly higher** — so a non-starter sitting above the field (`ranking is None`, or a high raw score they never actually posted) never inflates the base. Iteration is in descending score order, so every strictly-higher athlete has already been ranked. `calculate_tied_rank`'s 0-based offset is added for tied athletes, giving standard competition ranking with a gap after each multi-way tie.

- [ ] **Step 4: Run the new test to verify it passes**

Run: `uv run python -m pytest app/scoring/tests/test_scoring_logic.py::TestAthleteRankCalculation::test_it_ranks_a_resolved_pair_above_a_lower_scoring_tied_pair -v`
Expected: PASS.

- [ ] **Step 5: Update the one existing test that encodes the old convention**

In `test_it_returns_tied_ranks_for_an_actual_tie` (lines 2211-2239), `#3` and `#4` are fully tied for 1st and `#5` scored lower. Under standard competition ranking `#5` is now **3rd**, not 2nd. Change line 2233 from:

```python
        want[2].ranking = 2
```

to:

```python
        # #3 and #4 are tied for 1st, so the next athlete is 3rd (gap after the tie).
        want[2].ranking = 3
```

No other line in that test changes.

- [ ] **Step 6: Run the full scoring-logic module**

Run: `uv run python -m pytest app/scoring/tests/test_scoring_logic.py -v`
Expected: all PASS. The only ranking test whose expectation moved is `test_it_returns_tied_ranks_for_an_actual_tie` (updated in Step 5). `test_it_returns_simple_ranks_based_on_total_score`, `test_it_doesnt_give_a_rank_to_a_paddler_that_dns_all_rides`, `test_it_breaks_a_tie_with_highest_scoring_run`, the single-group tie tests, `test_it_does_not_crash_on_a_mixed_run_count_tie`, and every `TestBuildTieBreakReason` case are unchanged and still pass.

- [ ] **Step 7: Lint**

Run: `uv run ruff check app/scoring/scoring_logic.py app/scoring/tests/test_scoring_logic.py && uv run ruff format --check app/scoring/scoring_logic.py`
Expected: clean. If `ruff format` rewrites the generator expression, accept its formatting and re-run.

- [ ] **Step 8: Commit**

```bash
git add Server/app/scoring/scoring_logic.py Server/app/scoring/tests/test_scoring_logic.py
git commit -m "scoring: rank tied groups by athletes actually ahead of them

calculate_rank kept a mutable rank counter refreshed only for solo
athletes, so a tied group directly below another tied group was placed
with the counter from before the first group (issue #410). Count the
started, strictly-higher-scoring athletes fresh each iteration instead.

This adopts standard competition ranking: a gap follows every multi-way
tie, so the athlete after a 2-way tie for 1st is now 3rd, not 2nd.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 2: Broaden tie-shape coverage

Pure test additions on top of the Task 1 fix — every one of these passes once Task 1 is done; they exist to pin the behaviour against regressions. All go in `TestAthleteRankCalculation`, after the method added in Task 1.

**Files:**
- Test: `Server/app/scoring/tests/test_scoring_logic.py`

**Interfaces:**
- Consumes: `calculate_rank`, `_tied_athlete`, and (for the non-starter case) `AthleteScores`, `RunScores`, `JudgeScores`, `AthleteScoreInfo` — all already imported at `test_scoring_logic.py:5-25`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Add the adjacent-group rank tests**

```python
    def test_two_adjacent_fully_tied_pairs_each_get_a_gap(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [ranks[UUID(u)] for u in ids] == [1, 1, 3, 3]

    def test_a_tied_pair_above_a_resolved_pair(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [30.0, 10.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [ranks[UUID(u)] for u in ids] == [1, 1, 3, 4]

    def test_two_adjacent_resolved_pairs_number_sequentially(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [30.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [20.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [30.0, 10.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [ranks[UUID(u)] for u in ids] == [1, 2, 3, 4]

    def test_three_adjacent_tied_groups(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 7)]
        scores = [
            _tied_athlete(ids[0], [30.0, 30.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(ids[1], [30.0, 30.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(ids[2], [40.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[4], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[5], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [ranks[UUID(u)] for u in ids] == [1, 1, 3, 4, 5, 5]

    def test_a_solo_athlete_below_two_adjacent_tied_groups(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 6)]
        scores = [
            _tied_athlete(ids[0], [30.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [20.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[4], [30.0, 0.0], highest_move=10.0, total_score=30.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [ranks[UUID(u)] for u in ids] == [1, 2, 3, 3, 5]
```

- [ ] **Step 2: Add the mid-field, whole-field, and partial-resolution tests**

```python
    def test_a_gap_follows_an_unresolved_tie_that_is_not_for_first(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [30.0, 0.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(ids[1], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[3], [20.0, 0.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [ranks[UUID(u)] for u in ids] == [1, 2, 2, 4]

    def test_a_whole_field_that_stays_fully_tied_all_gets_rank_one(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 4)]
        scores = [
            _tied_athlete(u, [25.0, 25.0], highest_move=10.0, total_score=50.0)
            for u in ids
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [got[UUID(u)].ranking for u in ids] == [1, 1, 1]
        assert got[UUID(ids[0])].reason == (
            "Tie unresolved - athletes remain tied: #1, #2, #3"
        )

    def test_a_partially_resolved_group_of_three_below_a_solo(self) -> None:
        solo = "c7476320-6c48-11ee-b962-0242ac120001"
        clear = "c7476320-6c48-11ee-b962-0242ac120002"
        tied_a = "c7476320-6c48-11ee-b962-0242ac120003"
        tied_b = "c7476320-6c48-11ee-b962-0242ac120004"
        scores = [
            _tied_athlete(solo, [30.0, 0.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(clear, [40.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(tied_a, [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(tied_b, [25.0, 25.0], highest_move=10.0, total_score=50.0),
        ]
        bibs = {
            UUID(solo): "1",
            UUID(clear): "2",
            UUID(tied_a): "3",
            UUID(tied_b): "4",
        }

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert got[UUID(solo)].ranking == 1
        assert got[UUID(clear)].ranking == 2
        assert got[UUID(tied_a)].ranking == 3
        assert got[UUID(tied_b)].ranking == 3
        assert got[UUID(clear)].reason == (
            "Tie resolved by highest scoring run: #2 (40.00), #3 (25.00)"
        )
        assert got[UUID(tied_a)].reason == (
            "Tie unresolved - athletes remain tied: #3, #4"
        )
```

- [ ] **Step 3: Add the non-starter and no-bib tests**

```python
    def test_a_non_starter_with_the_top_score_does_not_push_down_a_tie(self) -> None:
        non_starter_id = "c7476320-6c48-11ee-b962-0242ac120009"
        id_1 = "c7476320-6c48-11ee-b962-0242ac120001"
        id_2 = "c7476320-6c48-11ee-b962-0242ac120002"
        non_starter = AthleteScores(
            athlete_id=UUID(non_starter_id),
            run_scores=[
                RunScores(
                    run_number=1,
                    judge_scores=[
                        JudgeScores(
                            judge_id="j",
                            score_info=AthleteScoreInfo(
                                score=99.0, highest_scoring_move=99.0
                            ),
                        )
                    ],
                    mean_run_score=99.0,
                    highest_scoring_move=99.0,
                    locked=False,
                    did_not_start=True,
                )
            ],
            highest_scoring_move=99.0,
            total_score=99.0,
        )
        scores = [
            non_starter,
            _tied_athlete(id_1, [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(id_2, [25.0, 25.0], highest_move=10.0, total_score=50.0),
        ]
        bibs = {UUID(non_starter_id): "9", UUID(id_1): "1", UUID(id_2): "2"}

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert got[UUID(non_starter_id)].ranking is None
        assert got[UUID(id_1)].ranking == 1
        assert got[UUID(id_2)].ranking == 1

    def test_the_reason_falls_back_to_athlete_id_when_no_bibs_are_given(self) -> None:
        id_1 = "c7476320-6c48-11ee-b962-0242ac120001"
        id_2 = "c7476320-6c48-11ee-b962-0242ac120002"
        scores = [
            _tied_athlete(id_1, [30.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(id_2, [25.0, 25.0], highest_move=10.0, total_score=50.0),
        ]

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=None)}

        assert got[UUID(id_1)].ranking == 1
        assert got[UUID(id_2)].ranking == 2
        assert got[UUID(id_1)].reason == (
            f"Tie resolved by highest scoring run: athlete {UUID(id_1)} (30.00), "
            f"athlete {UUID(id_2)} (25.00)"
        )
```

- [ ] **Step 4: Run the new tests**

Run: `uv run python -m pytest app/scoring/tests/test_scoring_logic.py::TestAthleteRankCalculation -v`
Expected: every method PASSES, including the ten added here and the one from Task 1.

Reference — the rank vectors these assert (order = the `ids`/athletes as written):

| Test | Shape | Expected ranks |
|---|---|---|
| `test_two_adjacent_fully_tied_pairs_each_get_a_gap` | tied@50, tied@40 | `1,1,3,3` |
| `test_a_tied_pair_above_a_resolved_pair` | tied@50, resolved@40 | `1,1,3,4` |
| `test_two_adjacent_resolved_pairs_number_sequentially` | resolved@50, resolved@40 | `1,2,3,4` |
| `test_three_adjacent_tied_groups` | tied@60, resolved@50, tied@40 | `1,1,3,4,5,5` |
| `test_a_solo_athlete_below_two_adjacent_tied_groups` | resolved@50, tied@40, solo@30 | `1,2,3,3,5` |
| `test_a_gap_follows_an_unresolved_tie_that_is_not_for_first` | solo@60, tied@50, solo@40 | `1,2,2,4` |
| `test_a_whole_field_that_stays_fully_tied_all_gets_rank_one` | tied@50 ×3 | `1,1,1` |
| `test_a_partially_resolved_group_of_three_below_a_solo` | solo@60, then @50 group (one clear, two tied) | `1,2,3,3` |
| `test_a_non_starter_with_the_top_score_does_not_push_down_a_tie` | DNS@99, tied@50 | `None,1,1` |
| `test_the_reason_falls_back_to_athlete_id_when_no_bibs_are_given` | resolved@50 | `1,2` |

- [ ] **Step 5: Lint and commit**

```bash
uv run ruff check app/scoring/tests/test_scoring_logic.py
git add Server/app/scoring/tests/test_scoring_logic.py
git commit -m "scoring test: cover adjacent, mid-field, and whole-field tie shapes

Pins standard competition ranking (gap after every multi-way tie) across
two and three adjacent tied groups, a solo athlete below stacked ties, a
partially resolved group of three, an all-tied field, and a top-scoring
non-starter that must not push a tie down.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Task 3: Verify the wider backend suite

**Files:** none modified.

**Interfaces:**
- Consumes: the fixed `calculate_rank` from Task 1.
- Produces: confidence that `customScoringEndpoints` (the only non-test caller, `Server/app/scoring/customScoringEndpoints.py:473`, which passes real bib numbers) still returns correct rankings.

- [ ] **Step 1: Run the scoring package tests**

Run: `uv run python -m pytest app/scoring/tests/ -v`
Expected: all PASS, including `test_customScoringEndpoints.py`.

- [ ] **Step 2: Run the full backend suite**

Run: `uv run python -m pytest`
Expected: all PASS — prior pass count, plus 11 new tests, minus 0 (the one changed test still passes with its updated expectation). If an unrelated test fails, confirm it also fails on `main` before treating it as a regression; if so, note it for a separate branch and do not fix it here.

- [ ] **Step 3: No commit** — nothing changed in this task.

---

## Self-Review

**1. Spec coverage:**
- Issue #410 core defect (a tied group placed above a higher-scoring group) → Task 1 Step 3 rewrite; asserted by `test_it_ranks_a_resolved_pair_above_a_lower_scoring_tied_pair` (Task 1) and every adjacent-group test in Task 2.
- Issue #410 explicit requirement ("at least one test case asserting the correct behaviors for adjacent ties") → Task 1 adds one; Task 2 adds ten.
- Issue's "some ties resolved by highest move, some unresolved" observation → `test_a_partially_resolved_group_of_three_below_a_solo` and `test_three_adjacent_tied_groups` mix resolved and unresolved groups and assert both the ranks and the `reason` strings.
- Convention change is explicit in Global Constraints and carried by the Task 1 Step 5 edit to `test_it_returns_tied_ranks_for_an_actual_tie`.

**2. Placeholder scan:** No TBD / "add error handling" / "write tests for the above". Every test body and the whole replacement function are inline; expected rank vectors are tabulated.

**3. Type consistency:** `athletes_ranked_above: int` (from `sum` over a generator of `1`s). `rank_info.ranking: int` (`RankInfo.ranking`). `s.ranking: int | None` on `AthleteScores` — assigned an `int`. `check_athlete_started_at_least_one_ride -> bool`. `_tied_athlete(str, list[float], float, float) -> AthleteScores` — all call sites match. `calculate_rank`'s signature and return type are unchanged, so `customScoringEndpoints.py:473` still type-checks. The non-starter test builds `AthleteScores` / `RunScores` / `JudgeScores` / `AthleteScoreInfo` with the same fields `_tied_athlete` uses.

**4. Behaviour cross-check (done against the current code, informs the expected values above):**
- The count-based fix, applied alone, leaves 47 of the 48 `test_scoring_logic.py` tests passing; the sole failure is `test_it_returns_tied_ranks_for_an_actual_tie` (old expectation `2`, new `3`), which Task 1 Step 5 updates.
- `test_it_returns_simple_ranks_based_on_total_score`, `test_it_doesnt_give_a_rank_to_a_paddler_that_dns_all_rides`, `test_it_breaks_a_tie_with_highest_scoring_run`, the single-group tie tests, and `test_it_does_not_crash_on_a_mixed_run_count_tie` are all unaffected (base is `0` for the top group, so `athletes_ranked_above + offset + 1` reduces to the old `0 + offset + 1`).

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-09-08-adjacent-tie-ranking.md`. Two execution options:

1. **Subagent-Driven (recommended)** - a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
