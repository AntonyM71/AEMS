# Spec Delta

## ADDED Requirements

### Requirement: A locked run with no scored moves is a locked zero run
When an athlete has no scored moves in a phase, the phase scores SHALL include a zero-score run for every one of the athlete's run statuses that is locked or marked did-not-start. A locked run that is not did-not-start SHALL report a score of zero with `locked` true and `did_not_start` false. The athlete SHALL receive no rank until they have scored moves, and SHALL be treated as did-not-start only when every one of their run statuses is did-not-start. An athlete whose only statuses are unlocked and not did-not-start has no runs in the payload.

#### Scenario: Locked run with nothing scored
- **WHEN** the head judge locks an athlete's run 1 and the athlete has no scored moves in the phase
- **THEN** the phase scores include run 1 for that athlete with a score of zero, `locked` true and `did_not_start` false
- **AND** the athlete is not treated as did-not-start

#### Scenario: Locked zero run beside a did-not-start run
- **WHEN** an athlete with no scored moves has run 1 locked and run 2 marked did-not-start
- **THEN** the phase scores include both runs, run 1 as a locked zero and run 2 as did-not-start
- **AND** the athlete is not treated as did-not-start

#### Scenario: Run still in progress
- **WHEN** an athlete with no scored moves has a run status that is neither locked nor did-not-start
- **THEN** that run is not included in the phase scores
