# Tasks

## 1. Server: read start lists robustly

- [x] 1.1 Write failing parametrized tests for `read_start_list` in `Server/app/competition_management/tests/test_create_competition_from_xlsx.py`, building the CSV bytes in memory: LF, CR-only, CRLF + BOM (regression guards that already pass), cp1252 with `José`, semicolon separators + CRLF + cp1252 `José`, CRLF with trailing `,,,,` rows, an XLSX with trailing empty rows written to `BytesIO`, and `.CSV` upper-case extension. Assert `first_name` values and that `Heat`/`bib` are integer dtype. Verify that `uv run python -m pytest -k read_start_list` fails for the expected reasons.
- [x] 1.2 Add a test that a start list with one athlete missing `Heat` still fails `validate_columns_and_data_types` after `read_start_list`, and verify it passes once 1.3 is done.
- [x] 1.3 Implement `read_start_list` in `create_competition_from_xlsx.py` (case-insensitive extension check, `utf-8-sig` then `cp1252`, use `;` when the header line has `;` and no `,`, drop all-empty rows, cast gap-free whole-number `bib`/`Heat` to int) and move `InvalidFileTypeError` there. Verify the 1.1 and 1.2 tests pass.

## 2. Server: readable 422s from the upload endpoint

- [x] 2.1 Add endpoint tests to `test_upload_endpoint.py` using `_post` with `process_competitors_df` mocked: a cp1252 CSV returns 201, a CSV missing `first_name` returns 422 with `first_name` in `detail`, and a `.txt` file returns 422. Verify they fail first.
- [x] 2.2 Make `upload()` call `read_start_list` and map `InvalidFileTypeError`, `MissingColumnError`, `ColumnTypeError`, `NoHeatInfoForNonRandomHeatError`, `pd.errors.ParserError` and `pd.errors.EmptyDataError` to `HTTPException(422, detail=str(e))`. Verify the 2.1 tests and the full suite pass with `uv run python -m pytest`.
- [x] 2.3 Run `uv run ruff check .` and `uv run ruff format .` in `Server/` and verify they are clean. Run `./buildApi.sh` and verify `Webapp/src/redux/services/aemsApi.ts` has no diff.

## 3. Webapp: show the server's reason

- [x] 3.1 Add a test to `UploadCsv.test.tsx` that rejects `axios.post` with an `AxiosError` whose `response.data.detail` is `"Column 'first_name' is missing from the file"`, and asserts `toast.error` is called with that text. Verify it fails.
- [x] 3.2 Update the `.catch` in `UploadCsv.tsx` to show `error.response?.data?.detail` when it is a string, falling back to `error.message`. Verify the 3.1 test passes and `npm run precommit` is clean.

## 4. Close out

- [x] 4.1 Upload a cp1252 CSV with CRLF endings and trailing empty rows through the running stack. Verify the competition is created with accented names intact, then upload a file missing a column and verify the toast names that column.
