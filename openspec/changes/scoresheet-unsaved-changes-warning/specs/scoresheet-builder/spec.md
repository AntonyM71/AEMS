# Spec Delta

## ADDED Requirements

### Requirement: Unsaved scoresheet edits are flagged
The scoresheet builder SHALL show an "unsaved changes" warning whenever its moves, bonuses, or bonus-type order differ from the saved scoresheet. The warning SHALL clear when the edits are saved successfully or are undone by hand, and SHALL remain when a save fails. A freshly loaded scoresheet SHALL NOT show the warning.

#### Scenario: Freshly loaded scoresheet
- **WHEN** an operator selects a scoresheet and its moves and bonuses load
- **THEN** no unsaved changes warning is shown

#### Scenario: Editing the scoresheet
- **WHEN** an operator edits a move on the loaded scoresheet
- **THEN** an unsaved changes warning is shown

#### Scenario: Undoing an edit by hand
- **WHEN** an operator changes a value and then changes it back to its saved value
- **THEN** the unsaved changes warning is no longer shown

#### Scenario: Saving successfully
- **WHEN** an operator with unsaved edits submits them and the server accepts them
- **THEN** the unsaved changes warning is no longer shown

#### Scenario: Save fails
- **WHEN** an operator with unsaved edits submits them and the server rejects them
- **THEN** the unsaved changes warning is still shown

### Requirement: Leaving a scoresheet with unsaved edits asks for confirmation
While the scoresheet builder has unsaved edits, the operator SHALL be asked to confirm before reloading or closing the page, navigating to another page in the app, or switching to or creating another scoresheet. Cancelling SHALL keep the operator on the current scoresheet with its edits intact. With no unsaved edits, none of these SHALL ask for confirmation.

#### Scenario: Reloading with unsaved edits
- **WHEN** an operator with unsaved scoresheet edits reloads or closes the page
- **THEN** the browser asks the operator to confirm leaving the page

#### Scenario: Navigating away with unsaved edits
- **WHEN** an operator with unsaved scoresheet edits follows a link to another page in the app
- **THEN** they are asked to confirm, and cancelling keeps them on the scoresheet builder with their edits intact

#### Scenario: Switching scoresheet with unsaved edits
- **WHEN** an operator with unsaved edits selects or creates a different scoresheet
- **THEN** they are asked to confirm, and cancelling keeps the current scoresheet and its edits

#### Scenario: Leaving with no unsaved edits
- **WHEN** an operator with no unsaved edits reloads the page, navigates away, or switches scoresheet
- **THEN** no confirmation is asked
