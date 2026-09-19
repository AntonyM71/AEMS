# Proposal

## Why

Competitions, Athletes, and Heats can be created and edited one at a time through admin UI on `Webapp/src/pages/Admin.tsx` (separate from the bulk `competition-import` XLSX path), backed by plain CRUD endpoints in `Server/app/crud/`. Neither side of this feature is in `openspec/specs/`, and per this repo's convention a spec should cover a feature across services rather than being split by service alone.

## What Changes

- Document what each entity's create/edit UI requires before allowing submit, and how that differs from what the underlying API itself accepts.
- Document that Competition has no edit UI today - only create.
- Document that editing an Athlete's heat or phase deletes their previously scored moves in the heat/phase they're leaving, and that the edit form warns about this.
- Document the post-submit UI behavior differences across the three entities (form reset/refetch/dialog-close behavior isn't identical between them).
- Document that updating a nonexistent Competition, Athlete, or Heat is rejected rather than creating one.
- No code changes - this backfills a spec for behavior that already exists and is already tested (aside from one skipped test, tracked separately as a GitHub issue).

## Capabilities

### New Capabilities
- `competition-roster-editing`: Manual, one-at-a-time creation and editing of Competitions, Athletes, and Heats, across the Webapp admin UI and the Server CRUD endpoints it calls.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/crud/competition.py`, `athlete.py`, `heat.py`, `athleteheat.py`, and `Server/app/crud/schemas.py`; and `Webapp/src/components/competition/CompetitionSelector.tsx`, `HeatSummaryTable.tsx`, `HeatSelector.tsx`, and their `__tests__`. No application code, migrations, or APIs change.
