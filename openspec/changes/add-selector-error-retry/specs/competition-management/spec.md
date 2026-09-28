# Spec Delta

## ADDED Requirements

### Requirement: A selector that fails to load its data shows an error message and a retry action
When the competition, event, phase, or heat selector's request for its list of options fails, the webapp SHALL show an error message and a retry action that re-issues the request, instead of leaving the selector in a dead end.

#### Scenario: Competition selector request fails
- **WHEN** the request for the list of competitions fails
- **THEN** the competition selector shows an error message and a retry button

#### Scenario: Event selector request fails
- **WHEN** a competition is selected but the request for its events fails
- **THEN** the event selector shows an error message and a retry button

#### Scenario: Phase selector request fails
- **WHEN** an event is selected but the request for its phases fails
- **THEN** the phase selector shows an error message and a retry button

#### Scenario: Heat selector request fails
- **WHEN** a competition is selected but the request for its heats fails
- **THEN** the heat selector shows an error message and a retry button

#### Scenario: Retrying re-issues the request
- **WHEN** an operator selects the retry action on a selector showing an error
- **THEN** the webapp re-issues the failed request for that selector's options
