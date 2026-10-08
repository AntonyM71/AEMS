# Proposal

## Why

Paddle UK entry lists (e.g. "GB Freestyle Team Selections 2026") arrive as wide exports: one row per athlete, a `YES`/`NO` column per event, and heat assignments in `Heat number Cat 1` … `Heat Cat 4`. Today an operator has to rebuild that list by hand into AEMS's long format (one row per athlete-event with `first_name`, `last_name`, `bib`, `Event`, `Heat`) before uploading. That is slow and error-prone at the venue, and the heat cells don't follow event-column order (an athlete in K1 Men and Squirt Men can have `SQH2` in Cat 1 and `10` in Cat 2), so a straight copy goes wrong.

## What Changes

- The start-list upload recognises a Paddle UK entry export from its `Heat number Cat 1` header and imports it directly. The upload form and API stay the same.
- Each event column whose header starts with a boat type (`K1`, `C1`, `Squirt`, `OC1`) becomes an event, named by its header, when at least one athlete has `YES` in it.
- Heats are paired to events by boat-type prefix, compared case-insensitively: `K1H`, `C1H`, `SQH` and `OCH` pair with the athlete's one `YES` event of that boat type. Heats with no prefix (e.g. `10`) fill the athlete's remaining `YES` events in race running order (Squirt, C1, OC1, K1), because that's the order the export lists them in.
- Each Paddle UK row creates **one** athlete, placed via athlete-heat entries in every event it pairs with. The AEMS long format keeps creating one athlete per row.
- An athlete-event that can't be paired (no heat, a heat with no event left for it, or no `YES` events at all) is reported in the upload's existing `skipped_rows` response with a reason. The rest of the file still imports.
- Random heat allocation still works for Paddle UK files: the heat columns are ignored and every `YES` entry goes into a generated heat.
- The upload page's help text says Paddle UK entry exports are accepted as they are.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `competition-management`: the start-list upload requirements change. A second accepted file layout (Paddle UK) is added, and the column-validation and structure-creation rules are scoped to the AEMS layout.

## Impact

- **Server**: `Server/app/competition_management/create_competition_from_xlsx.py` gains Paddle UK detection and conversion, and `process_competitors_df` gains one athlete per source row across multiple events. The `/competition_management/upload` endpoint dispatches by detected format. The request and response schemas don't change, so `aemsApi.ts` doesn't need regenerating.
- **Webapp**: help-text change only in `Webapp/src/components/competition/UploadCsv.tsx`.
- **Tests**: new backend tests using an anonymised Paddle UK fixture. Existing AEMS-format tests must keep passing unchanged.
- No new dependencies and no migrations.
