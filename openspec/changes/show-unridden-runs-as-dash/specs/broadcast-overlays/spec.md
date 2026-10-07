## ADDED Requirements

### Requirement: Phase results show "-" for a run nobody has scored
The phase results table SHALL show, for each run in the phase, the run's score to two decimal places, "DNS" for a did-not-start run, or "-" for a run with no score yet. A run has no score yet when the phase scores list it with no judge scores and it is not locked, even though they give it a score of 0. A locked run with no judge scores was ridden without a scored move, so it SHALL show its score.

#### Scenario: Unridden third run
- **WHEN** a phase has 3 runs and an athlete has judge scores for runs 1 and 2 only
- **THEN** the athlete's run 3 cell shows "-", not "0.00"

#### Scenario: Ridden run that scored nothing
- **WHEN** the judges scored an athlete's run and its mean score is 0
- **THEN** that run's cell shows "0.00"

#### Scenario: Locked run with no scored moves
- **WHEN** the head judge locks an athlete's run that no judge recorded a move for
- **THEN** that run's cell shows "0.00"

## MODIFIED Requirements

### Requirement: The fallback phase results are a leaderboard that marks counting runs
In fallback mode, the phase results SHALL show a header with the event name, the phase name in a tile, and the run-format sentence, then one row per athlete in the order the phase scores return. Each row SHALL show the athlete's rank, first name, upper-cased last name and affiliation, one cell per run in the phase in run order, and the phase total. It SHALL NOT show the bib.

A run cell SHALL show the run's score to two decimal places, "DNS" for a did-not-start run, or "-" for a run with no score yet, as the phase results table does. The scored runs that count toward the total, the phase's number of scoring runs with the highest scores, SHALL be shown in bold. Every other run cell, including "DNS" and "-", SHALL be shown in a muted colour. When two runs tie for the last counting place, the earlier run SHALL count.

A page SHALL hold up to 8 rows; a phase with more athletes SHALL rotate through pages on the same interval as the broadcast table and show the current page and page count.

#### Scenario: Best two of three
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete scored 812.50, 1040.00 and 986.25
- **THEN** 1040.00 and 986.25 are bold, 812.50 is muted, and the total shows 2026.25

#### Scenario: A did-not-start run
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete scored 890.00 and 905.50 and did not start their third run
- **THEN** both scored runs are bold and "DNS" is muted

#### Scenario: Run not yet scored
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete has judge scores for their first run only
- **THEN** their second and third run cells each show a muted "-", and only the first run is bold
