# Spec Delta

## ADDED Requirements

### Requirement: A locked run with no scored moves is a locked zero run
When an athlete has no scored moves in a phase, the phase scores SHALL include a zero-score run for every one of the athlete's run statuses that is locked or marked did-not-start. A locked run that is not did-not-start SHALL report a score of zero with `locked` true and `did_not_start` false. The athlete SHALL receive no rank until they have scored moves, and SHALL be treated as did-not-start only when every run in the phase is marked did-not-start. Each run is reported from its own status, regardless of the athlete's other runs. Whether the athlete started is decided separately, across all of the phase's runs.

#### Scenario: Locked run with nothing scored
- **WHEN** the head judge locks an athlete's run 1 and the athlete has no scored moves in the phase
- **THEN** the phase scores include run 1 for that athlete with a score of zero, `locked` true and `did_not_start` false
- **AND** the athlete is not treated as did-not-start

#### Scenario: Locked zero run beside a did-not-start run
- **WHEN** an athlete with no scored moves has run 1 locked and run 2 marked did-not-start
- **THEN** the phase scores include both runs, run 1 as a locked zero and run 2 as did-not-start
- **AND** the athlete is not treated as did-not-start

#### Scenario: Did-not-start run beside a run still in progress
- **WHEN** an athlete with no scored moves has run 1 marked did-not-start and run 2 neither locked nor did-not-start
- **THEN** the phase scores include run 1 as did-not-start and omit run 2
- **AND** the athlete is not treated as did-not-start

#### Scenario: Did-not-start run before a locked run
- **WHEN** an athlete with no scored moves has run 1 marked did-not-start and then run 2 is locked
- **THEN** run 1 is still reported as did-not-start alongside the locked zero run 2

#### Scenario: Did-not-start on one run of a multi-run phase
- **WHEN** an athlete with no scored moves is marked did-not-start on run 1 of a two-run phase and has no status for run 2
- **THEN** the athlete is not treated as did-not-start, because run 2 may still be ridden

#### Scenario: Run still in progress
- **WHEN** an athlete with no scored moves has a run status that is neither locked nor did-not-start
- **THEN** that run is not included in the phase scores
