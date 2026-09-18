# Spec Delta

## ADDED Requirements

### Requirement: A phase's run count stands in for its ICF feature type in tie-breaks
The ICF tie-break ladder is: highest scoring run, 2nd highest scoring run, 3rd highest scoring run (non-attainable features only), then highest scoring move. AEMS SHALL NOT model feature type explicitly; instead, tie-break precedence walks every run position the phase actually has, in descending order, before falling back to highest scoring move. A phase is configured with a 3rd run only when it is held on a non-attainable feature, so this walk reproduces the ICF ladder exactly for the 2- and 3-run phases freestyle kayaking uses.

#### Scenario: Two-run phase
- **WHEN** a tie is broken in a phase configured with 2 runs
- **THEN** precedence is highest scoring run, then 2nd highest scoring run, then highest scoring move

#### Scenario: Three-run phase on a non-attainable feature
- **WHEN** a tie is broken in a phase configured with 3 runs
- **THEN** precedence is highest scoring run, 2nd highest scoring run, 3rd highest scoring run, then highest scoring move
