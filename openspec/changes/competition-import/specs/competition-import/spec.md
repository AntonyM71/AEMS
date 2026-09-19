# Spec Delta

## Purpose

Creates a competition's Events, Phases, Heats, Athletes, and heat placements by importing an uploaded XLSX/CSV roster, validating its columns first.

## ADDED Requirements

### Requirement: Mandatory columns are always required
The uploaded file SHALL contain `first_name`, `last_name`, `bib`, and `Event` columns regardless of heat allocation mode.

#### Scenario: A mandatory column is missing
- **WHEN** the uploaded file is missing one of `first_name`, `last_name`, `bib`, or `Event`
- **THEN** the import is rejected before any records are created

### Requirement: A Heat column is required only when heats aren't randomly allocated
The uploaded file SHALL contain a `Heat` column when random heat allocation is not requested. When random heat allocation is requested, no `Heat` column is required.

#### Scenario: No Heat column, random allocation disabled
- **WHEN** the file has no `Heat` column and random heat allocation is not requested
- **THEN** the import is rejected

#### Scenario: No Heat column, random allocation requested
- **WHEN** the file has no `Heat` column and random heat allocation is requested
- **THEN** column validation passes

### Requirement: Column data types are validated
`first_name`, `last_name`, and `Event` SHALL be string-typed columns; `bib` SHALL be an integer-typed column. When a `Heat` column is required, it SHALL be integer-typed.

#### Scenario: A column has the wrong data type
- **WHEN** `first_name`, `last_name`, `Event`, `bib`, or a required `Heat` column does not have its required data type
- **THEN** the import is rejected

### Requirement: The named scoresheet is resolved case-insensitively
The scoresheet named in the import request SHALL be matched against existing scoresheet names case-insensitively.

#### Scenario: No scoresheet matches the requested name
- **WHEN** no existing scoresheet's name matches the requested name, case-insensitively
- **THEN** the import fails and no competition is created

#### Scenario: A scoresheet matches the requested name
- **WHEN** an existing scoresheet's name matches the requested name, case-insensitively
- **THEN** that scoresheet is used for every Phase the import creates

### Requirement: One Event and one Phase are created per unique Event value
For each distinct value in the file's `Event` column, the import SHALL create one Event and one Phase named "Prelim" under it, configured with the request's run count, scoring-run count, judge count, and resolved scoresheet.

#### Scenario: A sheet lists multiple events
- **WHEN** the uploaded file's `Event` column contains more than one distinct value
- **THEN** one Event and one "Prelim" Phase is created for each distinct value

### Requirement: Heats come from the sheet's Heat values, or are generated for random allocation
When random heat allocation is not requested, the import SHALL create one Heat per distinct value in the file's `Heat` column. When random heat allocation is requested, the import SHALL instead create the requested number of sequentially-named heats, ignoring any `Heat` column.

#### Scenario: Explicit heats
- **WHEN** random heat allocation is not requested
- **THEN** the Heats created match the distinct values in the file's `Heat` column

#### Scenario: Random heats
- **WHEN** random heat allocation is requested with a given heat count
- **THEN** that many sequentially-named heats are created, independent of any `Heat` column in the file

### Requirement: Each row creates one Athlete
Every row in the uploaded file SHALL create one Athlete record, using that row's `first_name`, `last_name`, `bib`, and optional `affiliation`.

#### Scenario: A row is processed
- **WHEN** the import processes a row
- **THEN** one Athlete record is created from that row's name, bib, and affiliation

### Requirement: An Athlete is placed into a heat when its row's Event and Heat both resolve
When a row's `Event` value matches a Phase created for this import, and its heat (from the `Heat` column, or its round-robin assignment under random allocation) matches a Heat created for this import, the import SHALL link that row's Athlete to that heat and phase.

#### Scenario: Row resolves to a known event and heat
- **WHEN** a row's `Event` matches a created Phase and its heat matches a created Heat
- **THEN** the row's Athlete is linked to that heat and phase

### Requirement: Random heat allocation shuffles rows and assigns heats round-robin
When random heat allocation is requested, the import SHALL shuffle the uploaded rows before processing them, then assign each row's Athlete to a heat by cycling through the created heats in order.

#### Scenario: Random allocation assigns heats
- **WHEN** random heat allocation is requested
- **THEN** athletes are distributed across the created heats round-robin, in a shuffled row order

### Requirement: Rows with an unresolved Event or Heat are skipped without rolling back the Athlete
When a row's `Event` value does not match any Phase created for this import, or (in non-random mode) its `Heat` value does not match any Heat created for this import, the import SHALL NOT create a link between that row's Athlete and any heat or phase. The Athlete record already created for that row SHALL NOT be removed.

#### Scenario: Row's Event doesn't resolve
- **WHEN** a row's `Event` value has no matching Phase created for this import
- **THEN** that row's Athlete is created but not linked to any heat or phase

#### Scenario: Row's Heat doesn't resolve
- **WHEN** random heat allocation is not requested and a row's `Heat` value has no matching Heat created for this import
- **THEN** that row's Athlete is created but not linked to any heat or phase

### Requirement: The reported athlete count includes rows skipped for an unresolved Event or Heat
The number of athletes the import reports as created SHALL count every row whose Athlete record was created, including rows skipped for an unresolved Event or Heat.

#### Scenario: Some rows are skipped
- **WHEN** the import processes a file where at least one row's Event or Heat does not resolve
- **THEN** the reported athlete count includes those skipped rows

### Requirement: Upload's column validation does not honor the requested heat allocation mode
The `/competition_management/upload` endpoint SHALL validate the uploaded file's columns as though random heat allocation is disabled, regardless of the random-heat-allocation value actually submitted in the request.

#### Scenario: Random allocation requested without a Heat column
- **WHEN** an upload requests random heat allocation and the file has no `Heat` column
- **THEN** column validation rejects the file as missing heat information, even though random allocation was requested

### Requirement: The scoring-run count cannot exceed the run count
The upload endpoint SHALL reject a request whose scoring-run count exceeds its run count.

#### Scenario: Scoring-run count exceeds run count
- **WHEN** an upload request's scoring-run count is greater than its run count
- **THEN** the upload is rejected and no competition is created

### Requirement: Import validation failures surface as a generic server error
Errors raised while validating columns, resolving the scoresheet, or checking the file type SHALL surface as an HTTP 500 response describing the underlying exception, not a status code specific to the validation failure.

#### Scenario: A validation error occurs during upload
- **WHEN** column validation, scoresheet resolution, or file-type checking fails during an upload
- **THEN** the response is an HTTP 500 with a message describing the failure
