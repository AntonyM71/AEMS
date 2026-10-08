# competition-management Specification

## Purpose
The operator-facing workflow for setting up and running a competition: creating it, populating it with events, phases, heats and athletes, navigating that hierarchy, promoting athletes between phases, and generating PDF reports. Builds on the data model in [competition-domain](../competition-domain/spec.md) and the ranking calculations in [scoring](../scoring/spec.md), which this spec links to rather than restates.

## Requirements

### Requirement: A competition must be selected before its events, phases, or heats can be selected
The webapp SHALL require a competition to be selected before its events can be selected, and an event to be selected before its phases can be selected.

#### Scenario: No competition selected
- **WHEN** no competition is selected
- **THEN** the event selector renders nothing

#### Scenario: No event selected
- **WHEN** a competition is selected but no event is selected
- **THEN** the phase selector renders nothing

#### Scenario: Changing the selected competition or event clears narrower selections
- **WHEN** an operator selects a different competition
- **THEN** the previously selected event, phase, and heat are cleared

#### Scenario: Changing the selected event clears narrower selections
- **WHEN** an operator selects a different event
- **THEN** the previously selected phase and heat are cleared

### Requirement: Operators can create a competition by name
The webapp SHALL let an operator create a new, empty competition by entering a name.

#### Scenario: Submitting a name creates the competition
- **WHEN** an operator enters a competition name and presses Enter
- **THEN** the competition is created and appears in the competition list

#### Scenario: Submitting without a name is rejected
- **WHEN** an operator presses Enter with no competition name entered
- **THEN** an error message is shown and no competition is created

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

### Requirement: Start-list upload can randomly allocate athletes across generated heats
The webapp SHALL let an operator select random heat allocation and specify how many heats to generate, in which case the server SHALL create that many heats and distribute the uploaded athletes across them instead of reading a `Heat` column.

#### Scenario: Random allocation distributes athletes across the requested number of heats
- **WHEN** an operator uploads a start list with random heat allocation selected and a target number of heats
- **THEN** the server creates that many heats and assigns every uploaded athlete to one of them, without requiring a `Heat` column

### Requirement: A phase's scoring-run count cannot exceed its total run count
Whether a phase is created or edited directly, created via a start-list upload, or created by promoting athletes from another phase, the number of runs that count toward an athlete's score SHALL NOT exceed the phase's total number of runs.

#### Scenario: The webapp blocks an invalid phase form
- **WHEN** an operator creating or editing a phase sets the number of scoring runs higher than the number of runs
- **THEN** a warning is shown and the submit button is disabled until the values are corrected

#### Scenario: The server rejects an invalid phase update
- **WHEN** a phase is updated so that `number_of_runs_for_score` exceeds `number_of_runs`
- **THEN** the server responds with a 422 validation error and the phase is not updated

#### Scenario: The server rejects an invalid start-list upload
- **WHEN** a start-list upload specifies `number_of_runs_for_score` greater than `number_of_runs`
- **THEN** the upload is rejected with a 422 validation error

### Requirement: The Add/Edit Phase form requires a name, event, judge count, run count, and scoresheet before it can be submitted
On the Admin page, where the Add/Edit Phase form is shown, the webapp SHALL keep the "Add Phase"/"Update Phase" button disabled until the operator has entered a non-empty phase name, selected an event, set a judge count greater than zero, set a run count greater than zero, and selected a scoresheet. This is in addition to the scoring-run-count rule above.

#### Scenario: An incomplete phase form cannot be submitted
- **GIVEN** an operator is on the Admin page, adding or editing a phase
- **WHEN** the name, event, judge count, run count, or scoresheet field is empty or zero
- **THEN** the "Add Phase"/"Update Phase" button stays disabled

### Requirement: Operators add events, phases, and heats to a competition inline
The webapp SHALL let an operator add a new event, a new phase (with its run count, scoring-run count, judge count, and scoresheet), or a new heat, from within the corresponding selector, without navigating away. These inline "Add" controls SHALL be shown only on the Admin page. The Judging, Head Judge, Scribe, and heat-PDF-generation pages SHALL show the same selectors without any inline add control.

#### Scenario: A newly added phase becomes selectable
- **GIVEN** an operator is on the Admin page
- **WHEN** they submit the "Add Phase" form with a name and scoresheet
- **THEN** the new phase is created and appears as an option in the phase selector

#### Scenario: A newly added heat is created and the form resets
- **GIVEN** an operator is on the Admin page
- **WHEN** they submit the "Add Heat" form with a name
- **THEN** the new heat is created, the heat list is refreshed, and the name field is cleared

#### Scenario: No add controls outside the Admin page
- **GIVEN** an operator is on the Judging, Head Judge, Scribe, or heat-PDF-generation page
- **WHEN** they view a competition, event, phase, or heat selector
- **THEN** no inline "Add" form is shown for that selector

### Requirement: Operators edit an existing phase's or heat's details in place
The webapp SHALL let an operator reopen the currently selected phase's or heat's details in an edit dialog, change its fields, and save the change. The edit control SHALL be shown only on the Admin page. The Judging, Head Judge, Scribe, and heat-PDF-generation pages SHALL show the phase or heat selector without an edit control.

#### Scenario: Editing a phase's name updates the selector
- **GIVEN** an operator is on the Admin page
- **WHEN** they open the edit dialog for the selected phase, change its name, and submit
- **THEN** the phase selector shows the updated name

#### Scenario: Editing a heat's name updates it
- **GIVEN** an operator is on the Admin page
- **WHEN** they open the edit dialog for the selected heat, change its name, and submit
- **THEN** the server receives the update and the heat is renamed

#### Scenario: No edit control outside the Admin page
- **GIVEN** an operator is on the Judging, Head Judge, Scribe, or heat-PDF-generation page
- **WHEN** a phase or heat is selected
- **THEN** no edit control is shown for it

### Requirement: Operators add athletes to a heat and assign them to a phase
The webapp SHALL let an operator create an athlete and, in the same submission, link that athlete to the currently selected heat and a chosen phase.

#### Scenario: Submitting a complete athlete form creates the athlete
- **WHEN** an operator fills in an athlete's first name, last name, bib number, and phase, and submits the "Add Athlete" form
- **THEN** the athlete is created and linked to the selected heat and the chosen phase

#### Scenario: Submitting an incomplete athlete form is rejected
- **WHEN** an operator submits the "Add Athlete" form with a required field missing
- **THEN** an error message is shown and no athlete is created

### Requirement: Moving an athlete to a different heat or phase clears their previously scored moves
When editing an athlete moves them to a different heat or a different phase than they were previously in, the webapp SHALL delete that athlete's previously scored moves for their old heat, after warning the operator that this will happen.

#### Scenario: Editing an athlete's heat or phase warns before saving
- **WHEN** an operator opens the edit dialog for an athlete already assigned to a heat and phase
- **THEN** a warning is shown that moving the athlete will delete their previously scored moves for that heat

### Requirement: Selecting a heat resets the active paddler and run used for scoring
The webapp SHALL reset the currently selected paddler and run to the first of each whenever the operator selects a different heat.

#### Scenario: Selecting a new heat resets paddler and run
- **WHEN** an operator selects a different heat from the heat selector
- **THEN** the selected paddler and selected run both reset to the first position

### Requirement: Operators can download a PDF of a phase's results
The webapp SHALL let an operator download a PDF, generated by the server, listing every athlete in the selected phase with their rank, per-run scores, total score, and tie-break reason.

#### Scenario: Downloading a phase results PDF
- **WHEN** an operator selects a phase and requests its results PDF
- **THEN** the server returns a PDF containing the rank, run scores, total score, and reason for every athlete in the phase

### Requirement: Operators can download a PDF heat draw for one or more heats
The webapp SHALL let an operator select one or more heats and download a PDF listing each selected heat's competitors (name, event, bib, affiliation, and prior-phase rank).

#### Scenario: Downloading a draw for multiple heats
- **WHEN** an operator selects several heats and requests a heat summary PDF
- **THEN** the server returns a single PDF with one page per selected heat, and names the file after the number of heats included

### Requirement: Operators can download a PDF of a single heat's run-by-run results
The webapp SHALL let an operator download a PDF of a single heat's athletes with their score for each run.

#### Scenario: Downloading a heat's results PDF
- **WHEN** an operator selects a heat and requests its results PDF
- **THEN** the server returns a PDF containing every athlete's per-run scores for that heat

### Requirement: Promoting a phase advances the top-ranked athletes into a newly created phase and heats
The webapp SHALL let an operator, from a selected phase, name a new phase and one or more new heats, and choose how many athletes to promote. The server SHALL calculate the source phase's rankings, take the top N ranked athletes, create the new phase (in the same event) and heats, and assign the promoted athletes to the new heats by rank, recording each athlete's rank from the source phase.

#### Scenario: Promoting a phase creates a new phase and heat and submits the request
- **WHEN** an operator names a new phase, adds at least one new heat name, and submits with a source phase selected
- **THEN** the server is sent the new phase name, the new heat names, and the source phase id, and a new phase is created

#### Scenario: Athletes tied at the promotion cutoff all advance
- **WHEN** two or more athletes share the same rank at the cutoff position for the number of athletes being promoted
- **THEN** all athletes sharing that rank are promoted, even though this exceeds the requested count

#### Scenario: Promotion fails without a name and a heat
- **WHEN** an operator has not entered a new phase name or added at least one new heat
- **THEN** the "Create Phase" action is disabled

#### Scenario: A failed promotion shows an error and does not report success
- **WHEN** the server rejects a promote-phase request
- **THEN** the webapp shows an error message and no success message

### Requirement: Promotion is rejected for zero athletes or a source phase with no ranked athletes
The server SHALL reject a promote-phase request that asks to promote zero athletes, and SHALL reject promotion from a phase that has no ranked athletes.

#### Scenario: Promoting zero athletes is rejected
- **WHEN** a promote-phase request specifies zero athletes to promote
- **THEN** the server responds with a 422 validation error

### Requirement: Heat and phase result tables show run-by-run score detail
The webapp SHALL show, for every athlete in a heat or phase results table, their score for each run, with did-not-start runs shown as "DNS" and locked (head-judge-confirmed) scores styled differently from unlocked ones. An operator SHALL be able to toggle the table to additionally show each judge's individual score per run.

#### Scenario: A did-not-start run is shown as DNS
- **WHEN** an athlete's run is marked did-not-start
- **THEN** that run's cell in the results table shows "DNS" instead of a score

#### Scenario: Toggling judge scores reveals per-judge detail
- **WHEN** an operator turns on "Show Judge Scores" in a heat results table
- **THEN** each judge's individual score for each run is shown alongside the run's mean score

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
