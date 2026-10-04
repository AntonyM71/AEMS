## MODIFIED Requirements

### Requirement: Operators can bulk-create a competition from an uploaded start list
The webapp SHALL let an operator upload a CSV or XLSX file of competitors together with a competition name, scoresheet, and run/judge configuration. The server SHALL turn this into a competition, one event and one "Prelim" phase per unique `Event` value in the file, one heat per unique `Heat` value (or per randomly-generated heat, see below), and one athlete — linked to a heat and phase via an athlete-heat entry — per row.

The server SHALL accept CSV files as Microsoft Excel saves them: LF, CRLF, or CR line endings; comma or semicolon field separators; UTF-8 with or without a byte-order mark; or Windows-1252. The server SHALL ignore rows that are empty in every column, in both CSV and XLSX files.

#### Scenario: A valid upload creates the full competition structure
- **WHEN** an operator uploads a CSV or XLSX file with columns for `first_name`, `last_name`, `bib`, `Event`, and `Heat`, along with a competition name and scoresheet
- **THEN** the server creates the competition, one event and Prelim phase per unique Event value, one heat per unique Heat value, and one athlete entry per row assigned to its event's phase and its heat

#### Scenario: The uploaded file must be a CSV or XLSX file
- **WHEN** an operator uploads a file whose name does not end in `.csv` or `.xlsx`, compared case-insensitively
- **THEN** the upload is rejected with a 422 response naming the accepted file types

#### Scenario: Excel CSV line endings and byte-order mark are accepted
- **WHEN** an operator uploads a CSV with LF, CRLF, or CR-only line endings, with or without a UTF-8 byte-order mark
- **THEN** the server reads the same column names and athlete rows as from a plain LF, UTF-8 file

#### Scenario: Semicolon-separated CSVs are accepted
- **WHEN** an operator uploads a CSV whose fields are separated by `;`, as Excel writes it in comma-decimal locales
- **THEN** the server reads the same columns and athlete rows as from the comma-separated equivalent

#### Scenario: A Windows-1252 CSV keeps accented names intact
- **WHEN** an operator uploads a CSV saved by Excel as "CSV (Comma delimited)" containing an athlete named `José`
- **THEN** the upload succeeds and the athlete is created with the first name `José`

#### Scenario: Empty trailing rows are ignored
- **WHEN** an operator uploads a CSV or XLSX start list followed by rows that are empty in every column
- **THEN** the upload succeeds, no athlete is created for the empty rows, and `Heat` and `bib` are still treated as whole numbers

### Requirement: Start-list upload validates required columns before processing
The server SHALL require the `first_name`, `last_name`, `bib`, and `Event` columns in every upload, and SHALL additionally require a `Heat` column unless random heat allocation is selected. When the server rejects an upload because of the file's contents, it SHALL respond with a 422 whose `detail` explains the problem in words an operator can act on, and the webapp SHALL show that explanation in its upload error message.

#### Scenario: A mandatory column is missing
- **WHEN** an uploaded file is missing `first_name`, `last_name`, `bib`, or `Event`
- **THEN** the upload is rejected with a 422 response whose `detail` names the missing column

#### Scenario: No Heat column and random allocation is not selected
- **WHEN** an uploaded file has no `Heat` column and random heat allocation is not selected
- **THEN** the upload is rejected with a 422 response whose `detail` says heat information is missing

#### Scenario: A column has the wrong type
- **WHEN** an uploaded file has a non-numeric `bib` or `Heat` value, or an athlete row with no `Heat`, while random heat allocation is not selected
- **THEN** the upload is rejected with a 422 response whose `detail` names the offending column

#### Scenario: A name or Event cell is blank
- **WHEN** an athlete row's `first_name`, `last_name`, or `Event` cell is empty or holds only whitespace
- **THEN** the upload is rejected with a 422 response whose `detail` names the column and says it has a blank value

#### Scenario: The webapp shows why an upload was rejected
- **WHEN** the server rejects an upload with a 422 response carrying a text `detail`
- **THEN** the webapp's error message shows that `detail` text instead of a generic HTTP status message
