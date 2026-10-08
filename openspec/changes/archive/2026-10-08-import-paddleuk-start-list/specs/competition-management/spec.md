# Spec Delta

## MODIFIED Requirements

### Requirement: Operators can bulk-create a competition from an uploaded start list
The webapp SHALL let an operator upload a CSV or XLSX file of competitors together with a competition name, scoresheet, and run/judge configuration. The server SHALL accept two start-list layouts: the AEMS layout described here, and a Paddle UK entry export (see "Start-list upload accepts Paddle UK entry exports"). It SHALL tell them apart from the file's headers, without the operator choosing. For an AEMS-layout file, the server SHALL turn the upload into a competition, one event and one "Prelim" phase per unique `Event` value in the file, one heat per unique `Heat` value (or per randomly-generated heat, see below), and one athlete per row, linked to a heat and phase via an athlete-heat entry.

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
For an AEMS-layout upload, the server SHALL require the `first_name`, `last_name`, `bib`, and `Event` columns, and SHALL additionally require a `Heat` column unless random heat allocation is selected. A Paddle UK upload SHALL be validated as described in "Start-list upload accepts Paddle UK entry exports" instead. When the server rejects an upload because of the file's contents, it SHALL respond with a 422 whose `detail` explains the problem in words an operator can act on, and the webapp SHALL show that explanation in its upload error message.

#### Scenario: A mandatory column is missing
- **WHEN** an AEMS-layout file is missing `first_name`, `last_name`, `bib`, or `Event`
- **THEN** the upload is rejected with a 422 response whose `detail` names the missing column

#### Scenario: No Heat column and random allocation is not selected
- **WHEN** an AEMS-layout file has no `Heat` column and random heat allocation is not selected
- **THEN** the upload is rejected with a 422 response whose `detail` says heat information is missing

#### Scenario: A column has the wrong type
- **WHEN** an AEMS-layout file has a non-numeric `bib` or `Heat` value, or an athlete row with no `Heat`, while random heat allocation is not selected
- **THEN** the upload is rejected with a 422 response whose `detail` names the offending column

#### Scenario: A name or Event cell is blank
- **WHEN** an AEMS-layout athlete row's `first_name`, `last_name`, or `Event` cell is empty or holds only whitespace
- **THEN** the upload is rejected with a 422 response whose `detail` names the column and says it has a blank value

#### Scenario: The webapp shows why an upload was rejected
- **WHEN** the server rejects an upload with a 422 response carrying a text `detail`
- **THEN** the webapp's error message shows that `detail` text instead of a generic HTTP status message

## ADDED Requirements

### Requirement: Start-list upload accepts Paddle UK entry exports
The server SHALL treat an uploaded CSV or XLSX file as a Paddle UK entry export when its headers include `Heat number Cat 1`. Headers are compared case-insensitively, ignoring surrounding whitespace. In such a file:

- Each row SHALL be one athlete, taking `First Name`, `Last Name`, and `Bib number`. The server SHALL ignore the other personal columns (ticket type, dates of birth, age, gender, age category).
- Every column whose header starts with `K1`, `C1`, `Squirt`, or `OC1` SHALL be an event column, and that prefix is the event's boat type. An athlete is entered in an event when that cell holds `YES`, compared case-insensitively; any other value, including blank, means not entered.
- The server SHALL create one event, named by its column header, with one "Prelim" phase, for each event column in which at least one athlete is entered.
- Every column whose header starts with `Heat` SHALL be a heat column. Each non-blank heat cell names a heat. Heats are shared across the competition, so one heat SHALL be created per distinct heat name, as with the AEMS layout.
- Each athlete SHALL be created once, with an athlete-heat entry for every event they are paired into.
- Required columns, and blank or non-numeric values in them, SHALL be rejected with a 422 as for the AEMS layout. The `detail` names the Paddle UK column.

#### Scenario: A Paddle UK export is recognised and imported without any form change
- **WHEN** an operator uploads a Paddle UK entry export through the normal start-list upload, with random heat allocation off
- **THEN** the upload succeeds, creating one event and Prelim phase for each event column with at least one `YES`, named by its header, plus one heat per distinct heat name, and the response's message counts one athlete per row

#### Scenario: A single-event athlete goes into their heat
- **WHEN** a Paddle UK row has `YES` only under `K1 Men (Senior)` and `9` under `Heat number Cat 1`
- **THEN** the athlete is placed in heat `9` within the `K1 Men (Senior)` Prelim phase

#### Scenario: A multi-event athlete is one athlete in several phases
- **WHEN** a Paddle UK row for Charlie Brackpool, bib 6, has `YES` under `K1 Men (Senior)` and `Squirt Men`, `SQH2` under `Heat number Cat 1`, and `10` under `Heat Cat 2`
- **THEN** exactly one athlete record is created for Charlie Brackpool with bib 6, placed in heat `SQH2` within the `Squirt Men` Prelim phase and in heat `10` within the `K1 Men (Senior)` Prelim phase

#### Scenario: A required Paddle UK column is missing
- **WHEN** a Paddle UK export has no `First Name`, `Last Name`, or `Bib number` column
- **THEN** the upload is rejected with a 422 response whose `detail` names the missing column

#### Scenario: A Paddle UK bib is not a whole number
- **WHEN** an athlete row in a Paddle UK export has a blank or non-numeric `Bib number`
- **THEN** the upload is rejected with a 422 response whose `detail` names `Bib number`

### Requirement: Paddle UK heats are paired to events by boat-type prefix and running order
A Paddle UK export lists each athlete's heats in running order, which is Squirt, then C1, then OC1, then K1, whatever the order of the event columns. For each Paddle UK athlete, the server SHALL rank the athlete's entered events by that running order, keeping column order between events of the same boat type, and pair heat cells with them as follows:

1. A heat whose name starts with `K1H`, `C1H`, `SQH`, or `OCH`, compared case-insensitively, belongs to boat type K1, C1, Squirt, or OC1 respectively. It SHALL pair with the athlete's first-ranked, not-yet-paired event of that boat type.
2. After every prefixed heat is paired, each heat with no recognised prefix, in heat-column order, SHALL pair with the athlete's first-ranked, not-yet-paired event.
3. A heat with no event left to pair with SHALL NOT be paired. An entered event left without a heat SHALL NOT be created for that athlete.

Every entry that is not paired SHALL be reported in the upload response's `skipped_rows`, with the athlete's name, bib, and a reason naming the heat or event. The rest of the file SHALL still be imported.

#### Scenario: Prefixed heats pair regardless of column order
- **WHEN** an athlete is entered in `C1 Men` and `Squirt Men` with `SQH1` under `Heat number Cat 1` and `C1H3` under `Heat Cat 2`
- **THEN** the athlete is placed in `SQH1` for `Squirt Men` and `C1H3` for `C1 Men`

#### Scenario: Prefixes are matched case-insensitively
- **WHEN** an athlete is entered only in `Squirt Women` with `sqh1` as their heat
- **THEN** the athlete is placed in heat `sqh1` within the `Squirt Women` Prelim phase

#### Scenario: A prefixed heat with no matching event is skipped
- **WHEN** an athlete is entered only in `K1 Men (Senior)` and has `SQH2` as their only heat
- **THEN** no athlete-heat entry is created for that heat, and `skipped_rows` contains that athlete with a reason naming `SQH2`

#### Scenario: Unprefixed heats follow running order, not column order
- **WHEN** an athlete is entered in `K1 Women (Senior)`, `C1 Women` and `OC1` with `1`, `5` and `14` as their heats, none prefixed
- **THEN** the athlete is placed in heat `1` for `C1 Women`, heat `5` for `OC1`, and heat `14` for `K1 Women (Senior)`, and nothing is skipped

#### Scenario: Unprefixed heats fill the events a prefixed heat left
- **WHEN** an athlete is entered in `K1 Men (Senior)` and `C1 Men` with `K1H11` under `Heat number Cat 1` and `3` under `Heat Cat 2`
- **THEN** the athlete is placed in heat `K1H11` for `K1 Men (Senior)` and heat `3` for `C1 Men`

#### Scenario: An athlete with fewer heats than events loses the latest-running event
- **WHEN** an athlete is entered in `K1 Men (Senior)` and `C1 Men` with only `3` as their heat
- **THEN** the athlete is placed in heat `3` for `C1 Men`, and `skipped_rows` contains that athlete with a reason naming `K1 Men (Senior)`

#### Scenario: A heat with no event left is skipped
- **WHEN** an athlete is entered only in `OC1` with `5` and `8` as their heats
- **THEN** the athlete is placed in heat `5` for `OC1`, and `skipped_rows` contains that athlete with a reason naming heat `8`

#### Scenario: An entered event with no heat is skipped
- **WHEN** an athlete is entered in `OC1` and has no heat cell filled in
- **THEN** the athlete is not placed in the `OC1` phase, and `skipped_rows` contains that athlete with a reason naming `OC1`

#### Scenario: An athlete with no entered events is skipped
- **WHEN** a Paddle UK row has no `YES` under any event column
- **THEN** no athlete is created for that row, and `skipped_rows` contains it with a reason saying it has no events

### Requirement: Random heat allocation applies to Paddle UK entries
When random heat allocation is selected for a Paddle UK upload, the server SHALL ignore the heat columns, create the requested number of heats, and place every entered athlete-event in one of them. Heat pairing SHALL NOT be attempted, so no entry is skipped for a missing or unmatched heat.

#### Scenario: Random allocation covers every entered event
- **WHEN** an operator uploads a Paddle UK export with random heat allocation selected and 3 heats, where one athlete is entered in two events and has no heat cells filled in
- **THEN** the server creates 3 heats, and that athlete has an athlete-heat entry in each of their two events' Prelim phases, each in one of the generated heats
