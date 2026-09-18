# Proposal

## Why

AEMS just adopted OpenSpec for spec-driven development, but `openspec/specs/` starts empty. The two most foundational, already-built capabilities — the scoring engine and the competition domain model — are referenced throughout CLAUDE.md's Architecture Notes and everything else that gets specced later (bonuses, tiebreaks, broadcast overlays, PDF reports) builds on them. Writing them down now gives future proposals something concrete to extend instead of restating basics each time.

## What Changes

- Document the scoring engine's current behavior as a baseline spec: per-move scoring by direction, bonus deduplication, best-of-N run totals, DNS handling, and ICF-style tie-breaking with an explainable reason string.
- Document the competition domain model's current behavior as a baseline spec: the Competition → Event → Phase → Heat → Athlete hierarchy, per-phase run/judge configuration, and run status (locked/DNS).
- No code changes — this backfills specs for behavior that already exists and is already tested.

## Capabilities

### New Capabilities
- `scoring`: How an athlete's runs are scored from judges' scored moves and bonuses, aggregated into a run total, a competition total, and a rank (with ties broken and explained).
- `competition-domain`: The structural hierarchy and configuration that scoring and everything else operates on — competitions, events, phases, heats, athletes, and run status.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/scoring/scoring_logic.py` + `Server/app/scoring/tests/test_scoring_logic.py`, and `Server/db/models.py` (Competition, Event, Phase, Heat, AthleteHeat, Athlete, RunStatus). No application code, migrations, or APIs change.
