# Tasks

Test fixtures use the Paddle UK header row from the sample export, with made-up athlete names; real entrants' names stay out of the repo. Run backend tests from `Server/` after `alembic upgrade head`.

## 1. Paddle UK conversion (Server)

- [x] 1.1 Write failing tests in `Server/app/competition_management/tests/test_paddleuk_start_list.py`, built from inline CSV bytes through `read_start_list` so dtype inference matches real uploads. Cover: detection (true for the Paddle UK header, false for the AEMS header, with case and whitespace variations); a single-event athlete; the Charlie case (`K1 Men (Senior)` + `Squirt Men`, `SQH2` in Cat 1, `10` in Cat 2 → two rows sharing one `athlete_key`, paired correctly); prefixed heats in reverse column order; a lower-case prefix; each skip reason (unmatched prefix, ambiguous unprefixed heat, entered event with no heat, no entered events); `Heat Cat 2` read as float rendering as `10` and not `10.0`; missing `First Name`/`Last Name`/`Bib number` → `MissingColumnError` naming it; blank or non-numeric bib → `ColumnTypeError` naming `Bib number`; `random_heats=True` → one row per entered event, no `Heat` column, nothing skipped for heats. Verify they fail.
- [x] 1.2 Implement `is_paddleuk_export` and `paddleuk_to_start_list` in `create_competition_from_xlsx.py`, with the boat-type maps as module constants and the pairing algorithm from design.md. Verify that `uv run python -m pytest app/competition_management/tests/test_paddleuk_start_list.py` passes and `uv run ruff check . && uv run ruff format --check .` is clean.

## 2. One athlete across several phases (Server)

- [x] 2.1 Add a test to `test_create_competition_from_xlsx.py` using the existing `adapters` fixture: two rows with the same `athlete_key` in different events → exactly one `post_athlete` call and two `post_athlete_heat` calls with the same `athlete_id` and different `phase_id`s, and `paddler_count == 1`. Verify it fails.
- [x] 2.2 Make `process_competitors_df` create an athlete once per `athlete_key`, falling back to the row index when the column is absent, and count athletes created. Verify that the new test and the whole existing `test_create_competition_from_xlsx.py` pass unchanged.

## 3. Upload endpoint dispatch (Server)

- [x] 3.1 Add tests to `test_upload_endpoint.py`: a Paddle UK CSV upload returns 201 with `skipped_rows` containing the conversion skips (e.g. an athlete with no events); a Paddle UK CSV missing `Bib number` returns 422 with a `detail` naming it; a Paddle UK file with random heats and no heat cells returns 201. Verify they fail.
- [x] 3.2 Branch on `is_paddleuk_export` in the `upload` endpoint as in design.md, and merge conversion skips ahead of `process_competitors_df`'s skips. Verify that the full `uv run python -m pytest app/competition_management` passes, and that `buildApi.sh` would make no diff to `Common/openapi.json` (no request or response schema change).

## 4. Webapp help text

- [x] 4.1 Add a line to the info `Alert` in `Webapp/src/components/competition/UploadCsv.tsx`: Paddle UK entry exports can be uploaded as they are, with heats prefixed `K1H`, `C1H`, `SQH` or `OCH` to pair them with events. Verify with `npm run precommit` from `Webapp/` and `npm test -- UploadCsv` (if a test exists for the component, extend it to assert the text is shown).

## 5. End-to-end check

- [x] 5.1 With the stack running, upload an anonymised copy of the real "GB Freestyle Team Selections 2026" export through the Admin upload page. Verify that one event per used category column appears, Charlie-style multi-category athletes appear once in each of their event phases, and any skipped rows listed in the UI match the file's genuinely ambiguous entries.
