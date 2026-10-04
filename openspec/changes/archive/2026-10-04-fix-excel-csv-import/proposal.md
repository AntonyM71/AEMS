# Proposal

## Why

Operators report that start lists saved as CSV from Microsoft Excel fail to upload (issue #258, first reported as an LF vs CRLF line-ending problem). Replicating it showed that line endings (LF, CRLF, CR-only) and Excel's UTF-8 byte-order mark already parse correctly. The real failures are elsewhere:

- Excel's default "CSV (Comma delimited)" format is Windows-1252 encoded, so any accented name (e.g. `José`) makes the upload crash.
- Excel often writes trailing rows of bare commas (`,,,,`) for cells it considers "used". These turn `Heat` and `bib` into decimal columns, and the upload is rejected for a type mismatch the operator cannot see in their file.
- Excel in comma-decimal locales (e.g. Germany, France) separates fields with `;` instead of `,`, so the server finds none of the expected columns.
- A `.CSV` or `.XLSX` extension in upper case is rejected.

Every one of these failures, along with missing-column and wrong-type errors, reaches the webapp as a generic 500. The toast then reads "Request failed with status code 500", which tells the operator nothing about how to fix the file.

## What Changes

- Start-list CSVs encoded as UTF-8 (with or without a byte-order mark) or Windows-1252 both import with names intact.
- Semicolon-separated CSVs import the same as comma-separated ones.
- Rows that are empty in every column are ignored in CSV and XLSX uploads, and the remaining whole-number columns stay whole numbers.
- The `.csv` / `.xlsx` extension check ignores case.
- An upload rejected because of the file's contents (wrong extension, missing column, wrong column type, missing heat information, unparseable file) returns a 422 with a human-readable reason instead of a 500.
- The webapp's upload error toast shows the server's reason when the server supplies one.

Out of scope: other encodings such as UTF-16.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `competition-management`: the start-list upload requirements now cover Excel-saved CSVs (encodings, field separators, empty rows, case-insensitive extension), and rejections now carry a readable reason that the webapp displays.

## Impact

- **Server:** `Server/app/competition_management/competition_management.py` (upload endpoint) and `create_competition_from_xlsx.py` (file reading and validation). The `/competition_management/upload` 422 response gains a string-`detail` case that the endpoint's documented 422 schema already allows, so `aemsApi.ts` does not need regenerating.
- **Webapp:** `Webapp/src/components/competition/UploadCsv.tsx` error handling.
- **Dependencies:** none new.
