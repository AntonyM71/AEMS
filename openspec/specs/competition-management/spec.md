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

### Requirement: Operators can create a competition by name
The webapp SHALL let an operator create a new, empty competition by entering a name.

#### Scenario: Submitting a name creates the competition
- **WHEN** an operator enters a competition name and presses Enter
- **THEN** the competition is created and appears in the competition list

#### Scenario: Submitting without a name is rejected
- **WHEN** an operator presses Enter with no competition name entered
- **THEN** an error message is shown and no competition is created

### Requirement: Operators can bulk-create a competition from an uploaded start list
The webapp SHALL let an operator upload a CSV or XLSX file of competitors together with a competition name, scoresheet, and run/judge configuration. The server SHALL turn this into a competition, one event and one "Prelim" phase per unique `Event` value in the file, one heat per unique `Heat` value (or per randomly-generated heat, see below), and one athlete — linked to a heat and phase via an athlete-heat entry — per row.

#### Scenario: A valid upload creates the full competition structure
- **WHEN** an operator uploads a CSV or XLSX file with columns for `first_name`, `last_name`, `bib`, `Event`, and `Heat`, along with a competition name and scoresheet
- **THEN** the server creates the competition, one event and Prelim phase per unique Event value, one heat per unique Heat value, and one athlete entry per row assigned to its event's phase and its heat

#### Scenario: The uploaded file must be a CSV or XLSX file
- **WHEN** an operator uploads a file whose name does not end in `.csv` or `.xlsx`
- **THEN** the upload is rejected

### Requirement: Start-list upload validates required columns before processing
The server SHALL require the `first_name`, `last_name`, `bib`, and `Event` columns in every upload, and SHALL additionally require a `Heat` column unless random heat allocation is selected.

#### Scenario: A mandatory column is missing
- **WHEN** an uploaded file is missing `first_name`, `last_name`, `bib`, or `Event`
- **THEN** the upload is rejected

#### Scenario: No Heat column and random allocation is not selected
- **WHEN** an uploaded file has no `Heat` column and random heat allocation is not selected
- **THEN** the upload is rejected

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

### Requirement: Operators add events, phases, and heats to a competition inline
The webapp SHALL let an operator add a new event, a new phase (with its run count, scoring-run count, judge count, and scoresheet), or a new heat, from within the corresponding selector, without navigating away.

#### Scenario: A newly added phase becomes selectable
- **WHEN** an operator submits the "Add Phase" form with a name and scoresheet
- **THEN** the new phase is created and appears as an option in the phase selector

#### Scenario: A newly added heat is created and the form resets
- **WHEN** an operator submits the "Add Heat" form with a name
- **THEN** the new heat is created, the heat list is refreshed, and the name field is cleared

### Requirement: Operators edit an existing phase's or heat's details in place
The webapp SHALL let an operator reopen the currently selected phase's or heat's details in an edit dialog, change its fields, and save the change.

#### Scenario: Editing a phase's name updates the selector
- **WHEN** an operator opens the edit dialog for the selected phase, changes its name, and submits
- **THEN** the phase selector shows the updated name

#### Scenario: Editing a heat's name updates it
- **WHEN** an operator opens the edit dialog for the selected heat, changes its name, and submits
- **THEN** the server receives the update and the heat is renamed

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
