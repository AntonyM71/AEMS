# Spec Delta

## ADDED Requirements

### Requirement: Updating a phase re-validates the run-count invariant against its merged state
When a Phase is updated, its `number_of_runs` and `number_of_runs_for_score` SHALL NOT be null after the update, and `number_of_runs_for_score` SHALL NOT exceed `number_of_runs`, checked against the Phase's state after the update is merged onto its existing values.

#### Scenario: Raising the scoring-run count alone above the existing run count
- **WHEN** an update raises `number_of_runs_for_score` above the Phase's existing `number_of_runs`, without changing `number_of_runs`
- **THEN** the update is rejected

#### Scenario: Lowering the run count alone below the existing scoring-run count
- **WHEN** an update lowers `number_of_runs` below the Phase's existing `number_of_runs_for_score`, without changing `number_of_runs_for_score`
- **THEN** the update is rejected

#### Scenario: Explicitly nulling a run count
- **WHEN** an update explicitly sets `number_of_runs` or `number_of_runs_for_score` to null
- **THEN** the update is rejected

#### Scenario: A consistent run-count change
- **WHEN** an update changes `number_of_runs` and/or `number_of_runs_for_score` to a combination where the scoring-run count does not exceed the run count
- **THEN** the update succeeds
