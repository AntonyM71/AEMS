# Spec Delta

## ADDED Requirements

### Requirement: An invalid run blocks scribe scoring
The scribe screen SHALL disable move entry and show an error when the selected run does not exist for the current athlete (the selected run number exceeds that athlete's own run count), and SHALL NOT submit scores while on that invalid run.

#### Scenario: Selected run exceeds the athlete's run count
- **WHEN** the selected run number is greater than the current athlete's number of runs
- **THEN** the scribe screen shows an error naming the athlete and their run count, move controls are disabled, and no score submission is sent
