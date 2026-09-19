# Proposal

## Why

`openspec/specs/` currently documents `scoring` and `competition-domain`, but the XLSX/CSV upload pipeline that actually creates every competition — `Server/app/competition_management/create_competition_from_xlsx.py` plus the `upload()` endpoint — has no spec. It's a large, heavily-tested surface (column/dtype validation, scoresheet resolution, and the Competition/Event/Phase/Heat/Athlete creation it drives) that every other capability implicitly depends on. Backfilling it now gives future proposals something concrete to extend, the same motivation as the original `scoring`/`competition-domain` baseline.

## What Changes

- Document the competition-import pipeline's current behavior as a baseline spec: required columns and dtypes, the `random_heats` toggle's effect on column requirements, scoresheet name resolution, and how Competition/Event/Phase/Heat/Athlete/AthleteHeat records get created from the sheet.
- Document two known defects as today's actual behavior (not the intended/fixed behavior — see GitHub issues filed separately): the upload endpoint validates columns as if `random_heats` is always `False` regardless of the request, and a row whose `Event` or `Heat` doesn't resolve leaves an orphaned `Athlete` row with no `AthleteHeat` link.
- No code changes — this backfills a spec for behavior that already exists and is already tested.

## Capabilities

### New Capabilities
- `competition-import`: How a competition's Events, Phases, Heats, Athletes, and AthleteHeat links get created from an uploaded XLSX/CSV roster, including column validation, scoresheet resolution, and random vs. explicit heat assignment.

### Modified Capabilities
(none)

## Impact

Documentation only. Grounded in `Server/app/competition_management/create_competition_from_xlsx.py`, the `upload()` endpoint in `Server/app/competition_management/competition_management.py`, and `Server/app/competition_management/tests/test_create_competition_from_xlsx.py` + `test_upload_endpoint.py`. No application code, migrations, or APIs change. PDF generation (`pdfEndpoints.py`) and phase promotion (`promote_phase`) are separate, out of scope here.
