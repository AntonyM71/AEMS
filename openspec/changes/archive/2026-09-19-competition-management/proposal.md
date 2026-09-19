# Proposal

## Why

AEMS's OpenSpec specs (`competition-domain`, `scoring`, `server-configuration`, `timer-configuration`) describe backend/domain logic only. None of them describe the operator-facing workflow an organizer actually uses to set up and run a competition — creating it, loading a start list, navigating the competition/event/phase/heat hierarchy, promoting athletes between rounds, and producing PDF reports. That workflow is already fully built and tested (`Webapp/src/components/competition/`, `Server/app/competition_management/`) but undocumented, so there is no spec to check it against or extend from when it next changes.

## What Changes

- Add a `competition-management` capability documenting the existing, shipped operator workflow: creating a competition manually or via XLSX/CSV upload, navigating competition -> event -> phase -> heat with inline create/edit, adding and editing athletes within a heat, promoting top-ranked athletes from one phase into a new phase and heats, and generating phase/heat PDF reports.
- No application code changes — this is documentation of existing behavior only.

## Capabilities

### New Capabilities
- `competition-management`: The operator-facing workflow for setting up and running a competition — creating a competition (including bulk creation from an uploaded XLSX/CSV start list), navigating the competition/event/phase/heat hierarchy with inline create-and-edit forms, managing athlete entries within a heat, promoting ranked athletes into a new phase with newly created heats, and generating PDF reports (phase results, heat draw, heat results). Links to `competition-domain` for the underlying data model and to `scoring` for the ranking/scoring math it displays and acts on, rather than restating either.

### Modified Capabilities
(none)

## Impact

- Documentation only: adds `openspec/specs/competition-management/spec.md` once archived. No changes to `Webapp/` or `Server/` source.
- Affected code surveyed to ground the spec (read-only): `Webapp/src/components/competition/*.tsx` and `Webapp/src/components/competition/__tests__/`; `Server/app/competition_management/*.py` and `Server/app/competition_management/tests/`; the `Server/app/crud/` endpoints for competition, event, phase, heat, athlete, athleteheat, and scoredmoves that this UI drives.
