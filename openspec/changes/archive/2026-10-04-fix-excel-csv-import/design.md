# Design

## Context

`upload()` in `Server/app/competition_management/competition_management.py` branches on `file.filename.endswith(...)`. It calls `pd.read_csv(BytesIO(...))` or `pd.read_excel(..., sheet_name=None)` and passes the DataFrame to `validate_columns_and_data_types` in `create_competition_from_xlsx.py`. The validation errors (`MissingColumnError`, `ColumnTypeError`, `NoHeatInfoForNonRandomHeatError`) and `InvalidFileTypeError` are plain exceptions. The catch-all `@app.exception_handler(Exception)` in `Server/main.py` turns them into a 500 with a `message` body. `HTTPException` bypasses that handler.

Replication against the current code, using in-memory bytes through `pd.read_csv` and `validate_columns_and_data_types`:

| Input | Result today |
|---|---|
| LF, CRLF, CR-only, CRLF + UTF-8 BOM | parses correctly |
| CRLF, cp1252, `José` | `UnicodeDecodeError` |
| CRLF + trailing `,,,,` rows | `Heat` becomes `float64`, so `ColumnTypeError` |

In `UploadCsv.tsx`, the `.catch` calls `toast.error(error.message)`, which ignores the response body.

## Goals / Non-Goals

**Goals:**
- Have one function read uploaded bytes into a DataFrame for both formats, so CSV and XLSX share the empty-row handling.
- Turn file-content rejections into 422s carrying the existing exception messages.

**Non-Goals:**
- Changing the catch-all 500 handler for other endpoints.

## Decisions

**1. Add `read_start_list(filename: str, data: bytes) -> pd.DataFrame` in `create_competition_from_xlsx.py`.**
It owns the extension check (`filename.lower().endswith(...)`, raising `InvalidFileTypeError`, which moves into this module), the encoding fallback, the delimiter choice, and empty-row removal. `upload()` calls it and then validates as before. Keeping the function pure, with bytes in and a DataFrame out, lets the tests feed it in-memory bytes with no HTTP or database.

**2. Encoding: try `encoding="utf-8-sig"`, and on `UnicodeDecodeError` retry with `encoding="cp1252"`.**
`utf-8-sig` decodes plain UTF-8 and strips a BOM when one is present. cp1252 is what Excel's "CSV (Comma delimited)" writes on Windows and Mac. A cp1252 file almost never decodes cleanly as UTF-8, because accented bytes are invalid continuation bytes there, so trying UTF-8 first is safe.
- *Alternative considered:* `charset-normalizer` or `chardet` detection. Rejected because it adds a dependency to choose between two known encodings.

**3. Delimiter: use `;` when the header line contains `;` and no `,`, otherwise `,`.**
None of the expected column names contain either character, so the header alone settles it, with no guessing.
- *Alternative considered:* `sep=None` (`csv.Sniffer`). Rejected because it guesses from a sample and can pick the wrong separator on a one- or two-row file.

**4. Empty rows: `df.dropna(how="all")`, then cast `bib` and `Heat` to `int64` when they are float with no missing values.**
Dropping the rows leaves the column dtype at `float64`, because pandas has already inferred it, so the cast is needed to pass `is_integer_dtype`. The cast is limited to columns that are present, have no missing values, and hold only whole numbers. A genuinely missing `Heat` value or a value like `1.5` therefore still fails validation, as the spec requires.
- *Alternative considered:* `df.convert_dtypes()`. Rejected because it turns optional columns (`affiliation`, `last_phase_rank`) into `pd.NA`-backed dtypes, and `pd.NA` raises in boolean context in downstream code that currently receives `NaN`.

**5. Map rejections to 422 in `upload()`.**
Wrap the read and validate calls in `except (InvalidFileTypeError, MissingColumnError, ColumnTypeError, NoHeatInfoForNonRandomHeatError, pd.errors.ParserError, pd.errors.EmptyDataError) as e: raise HTTPException(422, detail=str(e)) from e`. The endpoint's documented 422 schema already includes the `{"detail": string}` shape, so the OpenAPI contract and `aemsApi.ts` are unchanged.
- *Alternative considered:* registering a FastAPI exception handler per error class. Rejected because these errors come from one endpoint, and handlers would hide that mapping in `main.py`.

**5a. Reword the column-content errors for operators.**
`validate_columns_and_data_types` used to report `Column 'Event' is not of type '<function is_string_dtype at 0x…>'`, which leaks a Python repr into the toast. It now checks each column for blanks first (`Column 'Event' has a blank value`), then for content (`Column 'bib' must contain only whole numbers`). A whitespace-only cell counts as blank, because empty-row handling turns whitespace into a missing value.

**6. Webapp: show `error.response?.data?.detail` when it is a string, otherwise keep `error.message`.**
Pydantic form-validation 422s carry `detail` as an array, so those keep falling back to the existing message.

**7. Tests use in-memory bytes only. No fixture files are committed.**
- Server unit tests on `read_start_list` are parametrized over byte strings built by a small helper (line ending, encoding, BOM, delimiter, trailing rows). The XLSX empty-row case writes a DataFrame with `to_excel` into a `BytesIO`.
- Endpoint tests reuse `_post` in `test_upload_endpoint.py`, with `process_competitors_df` mocked as the neighbouring tests already do. They check that a cp1252 upload returns 201 and that a missing-column upload returns 422 with the column named in `detail`.
- The webapp test follows the existing `UploadCsv.test.tsx` pattern: `jest.spyOn(axios, "post")` instead of MSW. MSW's XHR interceptor cannot handle a multipart FormData body under jsdom (`docs/webapp-test-known-issues.md` #5). The test rejects with an `AxiosError` carrying `response.data.detail` and asserts `toast.error` received that text.

## Risks / Trade-offs

- [A UTF-8 file containing bytes that are invalid in UTF-8 gets decoded as cp1252 and imports with garbled characters instead of failing] → Such a file is already corrupt. Garbled names are visible in the UI and fixable, which beats a 500.
- [Mac "CSV UTF-8" exports or Google Sheets exports in other encodings] → UTF-8 is covered. Anything else stays out of scope until someone reports it.
- [A header containing both `;` and `,` is treated as comma-separated] → Validation then rejects the file with a 422 that names a missing column, so the operator sees what's wrong.
- [Widening the `except` hides unexpected parser bugs as 422s] → Only named validation and pandas parse errors are caught. Everything else still reaches the 500 handler.
