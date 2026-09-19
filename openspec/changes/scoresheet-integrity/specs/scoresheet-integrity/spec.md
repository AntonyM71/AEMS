# Spec Delta

## Purpose

Enforces referential integrity when a scoresheet's available moves and bonuses are bulk added, updated, or removed, so scored runs never end up referencing a deleted or redefined move or bonus.

## ADDED Requirements

### Requirement: A move or bonus referenced by a scored run cannot be removed
Removing a move or bonus that has been scored on at least one run SHALL be rejected. Rejecting a removal SHALL leave every move and bonus on the scoresheet unchanged, including any other additions, updates, or removals submitted in the same update.

#### Scenario: Removing a scored move or bonus
- **WHEN** an update to a scoresheet omits a move or bonus that has been scored on at least one run
- **THEN** the update is rejected and nothing on the scoresheet is changed

### Requirement: A move or bonus's parent cannot be changed
An existing move's scoresheet SHALL NOT be changed by an update. An existing bonus's scoresheet and the move it belongs to SHALL NOT be changed by an update.

#### Scenario: Reparenting an existing move
- **WHEN** an update to a scoresheet changes an existing move's scoresheet to a different one
- **THEN** the update is rejected

#### Scenario: Reparenting an existing bonus
- **WHEN** an update to a scoresheet changes an existing bonus's scoresheet, or the move it belongs to
- **THEN** the update is rejected

### Requirement: A move or bonus referenced by a scored run can only have its display order changed
When a move or bonus that has been scored on at least one run remains in the update, only its display order SHALL be changeable; a change to any other field SHALL be rejected.

#### Scenario: Changing a scored move's definition
- **WHEN** an update changes a field other than display order on a move or bonus that has been scored on at least one run
- **THEN** the update is rejected and nothing on the scoresheet is changed

#### Scenario: Changing a scored move's display order
- **WHEN** an update changes only the display order of a move or bonus that has been scored on at least one run
- **THEN** the update succeeds

### Requirement: Moves and bonuses not referenced by a scored run are freely upserted or removed
A move or bonus in the update whose id matches one already on the scoresheet, and that is not referenced by a scored run, SHALL have its fields updated to the submitted values. A move or bonus in the update whose id doesn't match an existing one SHALL be created. An existing move or bonus omitted from the update, and not referenced by any scored run, SHALL be removed.

#### Scenario: Updating an existing, unreferenced move or bonus
- **WHEN** an update includes a move or bonus whose id matches one already on the scoresheet, and it is not referenced by a scored run
- **THEN** its fields are updated to the submitted values

#### Scenario: Adding a new move or bonus
- **WHEN** an update includes a move or bonus whose id doesn't match any existing one on the scoresheet
- **THEN** it is created

#### Scenario: Removing an unreferenced move or bonus
- **WHEN** an update omits a move or bonus that was on the scoresheet and is not referenced by any scored run
- **THEN** it is removed
