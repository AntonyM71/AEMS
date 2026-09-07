# Explainable tie-break messages

**Date:** 2026-09-07
**Status:** Approved for planning
**Service:** `Server/` (scoring engine)

## Problem

When the scoring engine breaks a tie between athletes, the only explanation it
produces is a flat string: `TieBreak: Resolved by Tiebreak Engine` or
`TieBreak: Fully Tied`. This string surfaces in the phase score table's "Notes"
column and in the phase-scores PDF. A Head Judge needs to explain to competitors
*why* they finished in a given position, and the current message carries none of
the pertinent information — which tie-breaker applied, and what each athlete's
value was for it.

### Desired output

Human-readable sentences naming the deciding tie-breaker and the compared values,
identifying athletes by bib number:

- `Tie resolved by highest scoring run: #12 (85.00), #7 (80.00)`
- `Tie resolved by 2nd highest scoring run: #12 (72.50), #7 (70.00)`
- `Tie resolved by highest scoring move: #5 (150.00), #9 (80.00)`
- `Tie unresolved — athletes remain tied: #12, #7`

## Background: the ICF tie-break rules

For heats, semi-finals, and finals the tie-breakers are applied in this
precedence order:

1. Highest scoring run
2. 2nd highest scoring run
3. 3rd highest scoring run
4. Highest scoring move including bonuses performed on one of the runs of the
   event phase (move judged by at least one IJCFR)

If a tie still remains after step 4, the athletes stay tied. In heats and
semi-finals that means all tied athletes in the last qualifying places progress;
in finals the shared rank is kept for the final result.

The ICF qualifier "3rd highest scoring run (non-attainable features only)" needs
no explicit feature-type modelling in AEMS: a phase is configured with a 3rd run
only when it is held on a non-attainable feature. Walking each athlete's per-run
scores in descending order for as many runs as the phase has therefore already
encodes the "non-attainable features only" restriction. The effective precedence
the engine must implement is: **each run's score in descending order (for
however many runs the phase has), then the highest scoring move including
bonuses.**

## Current implementation

- `Server/app/scoring/scoring_logic.py`
  - `AthleteScores.reason: str | None` — where the explanation is stored.
  - `RankInfo(BaseModel)` — `ranking: int`, `reason: str | None`.
  - `calculate_rank(athlete_scores: list[AthleteScores]) -> list[AthleteScores]`
    — sorts by `total_score` desc, assigns ranks, and for any group sharing a
    `total_score` calls `calculate_tied_rank`, then stores
    `s.reason = f"TieBreak: {rank_info.reason}"`.
  - `calculate_tied_rank(athlete_id, athlete_scores) -> RankInfo` — sorts the
    tied group by `highest_scoring_move` then by each run (worst run first, best
    run last, so the best run ends up most significant), then either returns
    `reason="Fully Tied"` with the shared minimum index, or
    `reason="Resolved by Tiebreak Engine"` with this athlete's index.
  - `get_nth_highest_score(index)` — helper returning an athlete's n-th best
    `mean_run_score` (0 on `IndexError`).
  - `athlete_is_fully_tied` / `athletes_with_this_exact_score_after_tiebreak` —
    detect athletes who match on `total_score`, `highest_scoring_move`, and every
    ranked run score.
- Sole production caller: `calculate_phase_scores` in
  `Server/app/scoring/customScoringEndpoints.py` — calls `calculate_rank`, then
  merges athlete name/bib info in afterwards. The `athletes` DB query already has
  each athlete's `bib` in scope at that point.
- Consumers of `reason` (string only, no structure needed):
  - `Webapp/src/components/competition/PhaseScoretable.tsx` — "Notes" column.
  - `Server/app/competition_management/pdfEndpoints.py` — a PDF table cell.
- `Webapp/src/pages/index.tsx` changelog text and `Webapp/src/__tests__/index.test.tsx`
  currently state the tie-break engine gives no detailed breakdown.

## Design

### 1. Deciding-criterion detection in `calculate_tied_rank`

`calculate_tied_rank` is already called once per athlete with the full group that
shares that athlete's `total_score`. Replace the "sort by everything, return an
index" approach with a per-athlete walk of the tie-breakers in precedence order:

1. Build the ordered list of criteria for the phase:
   - one criterion per run position `n` (n = 0, 1, 2, …), value =
     `get_nth_highest_score(n)(athlete)` — the athlete's n-th best
     `mean_run_score`. `number_of_runs` is `max(len(a.run_scores) for a in group)`,
     matching the current code.
   - a final criterion "highest scoring move", value = `athlete.highest_scoring_move`.
2. Track the "still tied" set: athletes whose values have equalled this athlete's
   on every criterion so far (starts as the whole group).
3. For each criterion in order: if this athlete's value differs from any athlete
   in the still-tied set, this criterion is **this athlete's** decider — record it
   and the still-tied set as it stood entering this criterion, then stop.
   Otherwise drop from the still-tied set anyone whose value now differs and
   continue.
4. If no criterion ever separates this athlete from the still-tied set, this
   athlete is unresolved.

This makes the message accurate for 3+ way ties: if the highest run splits one
athlete off but the other two need the 2nd-highest run, the first athlete's
message names "highest scoring run" and the other two name "2nd highest scoring
run", each listing only the athletes involved in that step.

Ranking within the tied block: for a resolved athlete, `ranking` = the count of
athletes in the group who rank strictly ahead once the criteria are applied in
order (equivalent to the current index result). For an unresolved athlete, keep
today's behaviour — the shared minimum index of the mutually-unresolved
sub-group, so they share a rank. The deciding-criterion walk and the ranking
computation use the same ordered criteria and the same `get_nth_highest_score`
helper, so they stay consistent.

`RankInfo` gains no new public fields — `reason` stays a plain string. The walk's
result is formatted into that string before returning.

### 2. Message formatting

A small helper formats the `RankInfo.reason` string:

- Run criterion at position `n`: `"highest scoring run"` for n = 0, otherwise
  `f"{ordinal(n + 1)} highest scoring run"` (`2nd`, `3rd`, `4th`, …).
- Move criterion: `"highest scoring move"`.
- Value list: the tied athletes that entered the deciding criterion, ordered by
  that criterion's value descending, rendered as `#{bib} ({value:.2f})`,
  comma-separated.
- Resolved: `f"Tie resolved by {criterion}: {value_list}"`.
- Unresolved: `f"Tie unresolved — athletes remain tied: {bib_list}"` where
  `bib_list` is `#{bib}` comma-separated.

`calculate_rank` stores `rank_info.reason` directly on `s.reason` — the
`"TieBreak: "` prefix is removed.

### 3. Bib numbers reach the engine

- `calculate_rank(athlete_scores, bib_numbers: dict[UUID, int] | None = None)`.
- `calculate_tied_rank(athlete_id, athlete_scores, bib_numbers)` — same map.
- `calculate_phase_scores` builds `{a.id: a.bib for a in athletes}` and passes it.
- Fallback when a bib is missing from the map (or the map is `None`):
  `f"athlete {str(athlete_id)[:8]}"` in place of `#{bib}`.

### 4. Frontend copy

Update `Webapp/src/pages/index.tsx` changelog entry and the matching assertion in
`Webapp/src/__tests__/index.test.tsx` to state that tie-breaks now include a
breakdown. No rendering changes — the richer string flows through the existing
"Notes" column unchanged.

## Testing

Backend (`Server/app/scoring/tests/test_scoring_logic.py`):

- Update the existing tie tests
  (`test_it_breaks_a_tie_with_highest_scoring_run`,
  `test_it_breaks_a_tie_with_dropped_run_run`,
  `test_it_breaks_a_tie_with_three_paddlers_using_highest_scoring_run`,
  `test_it_breaks_a_tie_with_three_paddlers_using_highest_scoring_move`,
  `test_it_breaks_a_tie_with_three_paddlers_using_highest_scored_move`,
  `test_it_returns_tied_ranks_for_an_actual_tie`) to pass a `bib_numbers` map and
  assert the new `reason` sentences. Rankings asserted in these tests must not
  change.
- Add focused tests:
  - tie decided on the highest run → `"Tie resolved by highest scoring run: …"`
    with correct bibs and 2-dp values.
  - tie decided on the 2nd highest run → `"2nd highest scoring run"`.
  - tie decided on the 3rd highest run → `"3rd highest scoring run"`.
  - tie decided on the highest scoring move → `"Tie resolved by highest scoring move: …"`.
  - fully unresolved tie → `"Tie unresolved — athletes remain tied: …"`.
  - `bib_numbers=None` → fallback `athlete <uuid8>` label, tie still resolved.
- An integration-style assertion through `calculate_phase_scores` (or the
  `get_phase_scores` endpoint, following the pattern in
  `Server/app/scoring/tests/`) that a real tie produces a bib-bearing sentence in
  `reason`, if a fixture with tied athletes is reasonable to set up.

Frontend (`Webapp/`):

- `Webapp/src/__tests__/index.test.tsx` assertion updated to the new changelog copy.

## Out of scope

- Structured tie-break data in the API schema / `aemsApi.ts` regeneration.
- Any new frontend UI for tie-break display beyond the existing Notes column.
- Athlete names in messages (bib numbers only, per decision).
- Changes to how ranks themselves are computed.

## Precedence audit note

The rewritten walk evaluates every run position the phase defines before the
highest-scoring-move criterion. For the 2- and 3-run phases used in freestyle
kayaking this matches ICF precedence exactly (including the implicit
"non-attainable features only" for the 3rd run). For a hypothetical phase with 4+
runs, run positions beyond the 3rd would be compared before the move criterion,
which is a reasonable extension of the ICF ladder rather than a defined rule. No
code change is proposed for this; it is recorded here for awareness.
