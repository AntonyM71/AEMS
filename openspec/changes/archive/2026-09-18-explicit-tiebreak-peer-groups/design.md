# Design

## Context

`build_tie_break_reason` already computes a `rival` per athlete (the neighbor immediately above in finish order, or below for the top athlete) and walks the ICF criteria in precedence order to find the first one where the athlete's value differs from that rival's. Today it reports only `{this_athlete, rival}` at that criterion. See proposal.md for the motivation.

## Goals / Non-Goals

**Goals:**
- Name every athlete who was still tied with this athlete going into the deciding criterion, so a judge has the full picture for that criterion.
- Preserve the existing rival-direction logic exactly (which criterion decides, and the "why not one place higher/lower" framing) — only the reported set at that criterion changes.

**Non-Goals:**
- Changing how numeric ranks are assigned (`calculate_tied_rank` is untouched).
- Changing the "fully tied, unresolved" message (already lists every athlete that applies to).

## Decisions

**Report the whole surviving peer group unconditionally, not just athletes sharing a value.** Two variants were considered:

- Narrower: only widen the list when 2+ athletes in the peer group actually share a value at the deciding criterion (keep today's pairwise message when all values are distinct).
- Chosen: always report the full peer group at the deciding criterion, even when every value in it happens to be distinct.

The narrower variant is a strict subset of the chosen one — they agree whenever a value is genuinely shared, which includes issue #434's example. They differ only when the peer group's values are pairwise distinct (e.g. a three-way split entirely by one run, 35/30/25): the narrower variant leaves the existing two-athlete message unchanged, while the chosen approach shows all three. The chosen approach was picked because it gives a Head Judge the complete field context for that criterion every time, which is easier to defend against a challenge than a message whose completeness silently depends on whether a tie happened to exist.

**Peer group = narrowed by earlier, higher-precedence criteria only.** Athletes already separated from this athlete by an earlier criterion (e.g. a clear leader on the highest scoring run) are excluded from a later criterion's group — including them would misrepresent who was actually being compared at that point. This is why `_resolve_tie_order`'s stable, precedence-ordered sort matters: it's what makes "narrow the group criterion by criterion" and "compare to the adjacent rival" agree on the same deciding criterion.

**Athletes within the reported group are ordered by true finish order, not input order.** Found in review: the first implementation sorted the peer group by the deciding criterion's value alone. Two athletes tied at that exact value (separated only by a *later* criterion) then kept whatever relative order the caller happened to pass them in — an unordered DB query — so the message could list a worse-placed athlete ahead of a better-placed one. Fixed by reading the display order from `resolved_order` (already sorted by every criterion, not just the deciding one) filtered down to the peer group, instead of re-sorting the group on a single criterion. This matters directly for the goal above: a judge citing a message with athletes out of finish order undermines the "defend the placement" purpose of naming them at all.

**Criterion-value comparisons use two-decimal-place tolerance, not raw float equality.** `_scores_match` (renamed `_floats_match`, since it's no longer total-score-specific) is now used for every equality check in `build_tie_break_reason`, matching the precision scores are already reported to (`.2f`). Checked whether this is a real risk for the specific values compared here (`mean_run_score`, `highest_scoring_move`): unlike `total_score` (a sum of several independently-rounded means, which is where the codebase's documented ULP drift actually occurs), these values come from a single rounding of an exact-integer division or from `max()` of exact integers, and IEEE-754 division is correctly-rounded — verified empirically that mathematically-equal quotients from different sums/counts (e.g. 25/3, 50/6, 100/12) produce bit-identical floats. So this specific drift can't occur for these values today. Added anyway as cheap, defense-in-depth insurance against a future change to how these values are computed (e.g. if a run mean ever became a sum of sub-scores rather than a single division).

## Risks / Trade-offs

- Messages get longer for large tied groups (more athletes named per message). Freestyle kayak heats are small (typically ≤6 athletes per heat), so this is not a practical readability concern.
- Two currently-passing tests assert the pre-fix two-athlete message for a case where values are pairwise distinct; those assertions are being updated as part of this change, not left as regressions.
- Three additional currently-passing tests had their expected athlete *order* corrected during review (see the ordering decision above) — they were originally written against the pre-fix, input-order-dependent output.
