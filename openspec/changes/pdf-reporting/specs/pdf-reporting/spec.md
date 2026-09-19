# Spec Delta

## Purpose

Generates the phase-scores, heat draw/start-list, and heat-results PDF reports used to run and post competitions.

## ADDED Requirements

### Requirement: A phase-scores report tables every athlete with per-run scores
The phase-scores report SHALL include, for every athlete in the phase, their rank, name, bib, affiliation, a score for each of the phase's runs, their total score, and their tie-break reason when one exists.

#### Scenario: Generating a phase-scores report
- **WHEN** a phase-scores report is requested for a phase
- **THEN** the report tables every athlete in that phase with their rank, name, bib, affiliation, per-run scores, total score, and tie-break reason if present

### Requirement: A phase-scores report distinguishes confirmed from unconfirmed run scores
Each run score in the phase-scores report SHALL be styled bold when that run is locked (confirmed) and italic when it is not.

#### Scenario: A run is locked
- **WHEN** an athlete's run score is locked
- **THEN** that run's score is styled bold in the report

#### Scenario: A run is not locked
- **WHEN** an athlete's run score is not locked
- **THEN** that run's score is styled italic in the report

### Requirement: A phase-scores report shows a did-not-start run as "DNS"
A run marked did-not-start SHALL display as "DNS" in the phase-scores report, in place of a numeric score.

#### Scenario: An athlete did not start a run
- **WHEN** an athlete's run is marked did-not-start
- **THEN** that run's cell in the report reads "DNS"

### Requirement: A phase-scores report's total score is styled bold only when every shown run is confirmed
An athlete's total score in the phase-scores report SHALL be styled bold only when all of that athlete's run scores shown in the report are locked; otherwise it SHALL be styled italic.

#### Scenario: Every shown run is locked
- **WHEN** all of an athlete's run scores shown in the report are locked
- **THEN** that athlete's total score is styled bold

#### Scenario: At least one shown run is not locked
- **WHEN** at least one of an athlete's run scores shown in the report is not locked
- **THEN** that athlete's total score is styled italic

### Requirement: A heat draw/start-list report has one page per requested heat
The heat draw/start-list report SHALL include one page per requested heat, listing every athlete in that heat with their name, event, bib, affiliation, and prior-phase rank.

#### Scenario: Requesting a draw/start-list report
- **WHEN** a heat draw/start-list report is requested for one or more heats
- **THEN** the report includes one page per requested heat, each listing its athletes' name, event, bib, affiliation, and prior-phase rank

### Requirement: A heat draw/start-list report's filename reflects how many heats it covers
When the heat draw/start-list report covers exactly one heat, its filename SHALL include that heat's name. When it covers more than one heat, its filename SHALL state the heat count instead of naming every heat.

#### Scenario: A single-heat report
- **WHEN** a heat draw/start-list report is requested for exactly one heat
- **THEN** its filename includes that heat's name

#### Scenario: A multi-heat report
- **WHEN** a heat draw/start-list report is requested for more than one heat
- **THEN** its filename states the number of heats rather than naming each one

### Requirement: A heat-results report tables every athlete's scores across the heat's longest run history
The heat-results report SHALL table every athlete in the heat with a score for each run up to the greatest number of runs any athlete in that heat has, using the same locked/unlocked and did-not-start rendering as the phase-scores report.

#### Scenario: Athletes with differing numbers of runs
- **WHEN** a heat-results report is requested for a heat where athletes have differing numbers of runs
- **THEN** the report's run columns extend to the greatest number of runs any athlete in that heat has

### Requirement: Every report's filename is sanitized before being used in the download response
A report's filename SHALL have control characters, and characters that would act as a filename or Content-Disposition-header delimiter, replaced or removed before being used in the response.

#### Scenario: A name contains characters unsafe for a filename or header
- **WHEN** a report's filename is built from a competition, event, phase, or heat name containing spaces, control characters, or characters such as `;`, `,`, `/`, or `:`
- **THEN** those characters are replaced or removed in the filename used for the download

### Requirement: A report request with no resolvable heat is rejected before any PDF is generated
A heat-based report request that names no heat, or names only heat ids that don't resolve to an existing heat, SHALL be rejected with a 404 response, and no PDF SHALL be generated.

#### Scenario: No heat is named
- **WHEN** a heat-based report is requested without naming any heat
- **THEN** the request is rejected with a 404 response and no PDF is generated

#### Scenario: A named heat doesn't exist
- **WHEN** a heat draw/start-list report names one or more heat ids that don't all resolve to existing heats
- **THEN** the request is rejected with a 404 response and no PDF is generated

### Requirement: An unexpected failure while generating a report surfaces as a server error
A failure while generating any of the three reports, other than an unresolvable heat, SHALL surface as an HTTP 500 response describing the underlying error.

#### Scenario: Report generation fails unexpectedly
- **WHEN** an unexpected error occurs while generating a phase-scores, heat draw/start-list, or heat-results report
- **THEN** the response is an HTTP 500 describing the error, and no PDF is returned
