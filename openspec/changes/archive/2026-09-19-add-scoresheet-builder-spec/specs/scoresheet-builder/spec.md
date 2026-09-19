# Spec Delta

## Purpose
Lets an operator author a scoresheet — the moves, their directions and F/L and R/B point values, and the bonus types available on it — before a phase is assigned it for scoring.

## ADDED Requirements

### Requirement: A scoresheet is created by name
An operator SHALL be able to create a new scoresheet by entering a name and pressing Enter. A blank name SHALL be rejected without creating a scoresheet.

#### Scenario: Valid name submitted
- **WHEN** an operator types a scoresheet name and presses Enter
- **THEN** a new scoresheet is created with that name, becomes the selected scoresheet, and the name field clears

#### Scenario: Blank name submitted
- **WHEN** an operator presses Enter with no name entered
- **THEN** an error is shown and no scoresheet is created

### Requirement: An existing scoresheet can be selected for editing
An operator SHALL be able to select any existing scoresheet from a list, which loads that scoresheet's moves and bonuses for editing. Before a scoresheet is selected, the builder SHALL show a prompt to select or create one instead of a moves/bonuses editor.

#### Scenario: No scoresheet selected
- **WHEN** the scoresheet builder is opened with no scoresheet selected
- **THEN** it shows a message prompting the operator to select or create a scoresheet

#### Scenario: Scoresheet selected
- **WHEN** an operator selects an existing scoresheet
- **THEN** that scoresheet's moves and bonuses are loaded and displayed for editing

### Requirement: A move defines a name, direction, and point values
A move on a scoresheet SHALL have a name, a direction (`LR`, `FB`, or `S`), an F/L point value, and an R/B point value. A move with direction `S` (single) SHALL have its R/B value fixed at zero and its R/B field disabled, since a single-direction move is never scored in reverse. A move SHALL NOT be added to the scoresheet without a name.

#### Scenario: Adding a move without a name
- **WHEN** an operator tries to add a move with no name entered
- **THEN** an error is shown and the move is not added

#### Scenario: Switching a move to single direction
- **WHEN** an operator sets a move's direction to Single
- **THEN** its R/B value is reset to zero and the R/B field becomes disabled

#### Scenario: Switching a move away from single direction
- **WHEN** an operator changes a move's direction from Single to L/R or F/B
- **THEN** its R/B field becomes enabled again

### Requirement: Moves and bonus scores are editable in place
An operator SHALL be able to edit an existing move's name, direction, F/L value, and R/B value, and an existing bonus's score, directly in the scoresheet editor, without a separate add step.

#### Scenario: Editing a move's name
- **WHEN** an operator changes an existing move's name field
- **THEN** the move's name is updated to the new value

#### Scenario: Editing a bonus score on a move
- **WHEN** an operator changes a bonus's score field on a move
- **THEN** that move's score for that bonus is updated to the new value

### Requirement: Deleting a move requires a double click
A move SHALL only be removed from the scoresheet on a double click of its delete button. A single click SHALL show a warning and SHALL NOT remove the move. Deleting a move SHALL also remove that move's own bonus entries.

#### Scenario: Single click does not delete
- **WHEN** an operator single-clicks a move's delete button
- **THEN** a "Double Click to delete" warning is shown and the move remains

#### Scenario: Double click deletes
- **WHEN** an operator double-clicks a move's delete button
- **THEN** the move and its bonus entries are removed from the scoresheet

### Requirement: Moves can be reordered
An operator SHALL be able to move a move up or down relative to the other moves on the scoresheet. The topmost move's "move up" control and the bottommost move's "move down" control SHALL be disabled. A reorder SHALL temporarily highlight both swapped moves, and the highlight SHALL clear after a short delay.

#### Scenario: Moving a move down
- **WHEN** an operator moves a move down
- **THEN** it swaps position with the move below it, and both swapped moves are highlighted until the highlight clears

#### Scenario: Boundary controls are disabled
- **WHEN** the scoresheet's moves are displayed
- **THEN** the first move's "move up" control and the last move's "move down" control are disabled

### Requirement: A bonus type applies across every move on the scoresheet
A bonus type SHALL be a named column shared by every move on the scoresheet, not a property of a single move. Adding a bonus type SHALL add a zero-value entry for it to every existing move. Deleting a bonus type SHALL remove it, and its per-move entries, from every move. A bonus type name SHALL be unique on the scoresheet and non-blank.

#### Scenario: Adding a new bonus type
- **WHEN** an operator adds a new bonus type by name
- **THEN** it appears as a column, and every existing move gets a zero-value entry for it

#### Scenario: Deleting a bonus type
- **WHEN** an operator deletes a bonus type
- **THEN** it and every move's entry for it are removed from the scoresheet

#### Scenario: Duplicate bonus type name rejected
- **WHEN** an operator tries to add a bonus type whose name already exists on the scoresheet
- **THEN** an error is shown and the bonus type is not added

#### Scenario: Blank bonus type name rejected
- **WHEN** an operator tries to add a bonus type with no name entered
- **THEN** an error is shown and the bonus type is not added

### Requirement: Bonus type columns can be reordered
An operator SHALL be able to move a bonus type's column left or right relative to the scoresheet's other bonus types. Attempting to move the leftmost bonus type further left, or the rightmost bonus type further right, SHALL show an error and SHALL NOT change the order.

#### Scenario: Reordering a bonus type
- **WHEN** an operator moves a bonus type one position to the right
- **THEN** it swaps display order with the bonus type currently to its right

#### Scenario: Reordering past the boundary
- **WHEN** an operator tries to move the leftmost bonus type left, or the rightmost bonus type right
- **THEN** an error is shown and the bonus type order is unchanged

### Requirement: A new move offers every current bonus type
The form for adding a new move to a scoresheet SHALL offer a score field, defaulting to zero, for each bonus type currently defined on the scoresheet, including a bonus type added while the new-move form is still being filled in. Submitting a new move SHALL leave the scoresheet's existing moves unchanged and reset the form to add another.

#### Scenario: Adding a move alongside existing moves
- **WHEN** an operator submits a valid new move
- **THEN** it is added as its own row, the existing moves are unchanged, and the form resets to empty

### Requirement: Scoresheet edits are submitted together and persisted server-side
An operator SHALL submit a scoresheet's moves and bonuses together via an "Update Scoresheet" action. On success, the operator SHALL see a success notification and the editor SHALL reload the persisted moves and bonuses. On failure, the operator SHALL see an error notification and no success notification.

#### Scenario: Successful update
- **WHEN** an operator submits scoresheet edits and the server accepts them
- **THEN** a success notification is shown and the editor reloads the persisted moves and bonuses

#### Scenario: Failed update
- **WHEN** an operator submits scoresheet edits and the server rejects them
- **THEN** an error notification is shown and no success notification appears

### Requirement: The server rejects deleting moves or bonuses already used in scored runs
When a scoresheet update omits a move or bonus that has already been scored on a run, the server SHALL reject the entire update with an error, and SHALL NOT apply any of the submitted changes.

#### Scenario: Attempting to delete a referenced move or bonus
- **WHEN** a scoresheet update is submitted that omits a move or bonus already used in a scored run
- **THEN** the server rejects the update and makes no changes

### Requirement: The server restricts edits to moves and bonuses already used in scored runs
For a move or bonus that has already been scored on a run, a scoresheet update SHALL only be allowed to change its display order. Any other field change on an already-scored move or bonus SHALL be rejected, and moving an existing move or bonus to a different scoresheet (or, for a bonus, a different move) SHALL be rejected.

#### Scenario: Changing display order of a referenced item
- **WHEN** a scoresheet update changes only the display order of a move or bonus already used in a scored run
- **THEN** the update is accepted and applied

#### Scenario: Changing a scored value on a referenced item
- **WHEN** a scoresheet update changes the name, score, or direction of a move or bonus already used in a scored run
- **THEN** the server rejects the update

#### Scenario: Reassigning an existing move or bonus to a different parent
- **WHEN** a scoresheet update changes an existing move's scoresheet, or an existing bonus's owning move
- **THEN** the server rejects the update

### Requirement: Default scoresheets are available without manual setup
The server SHALL seed its configured default scoresheets, with their moves and bonuses, on startup and in CI setup, skipping any scoresheet whose name already exists. An operator SHALL NOT need to author a scoresheet from scratch before scoring can begin.

#### Scenario: Starting the server for the first time
- **WHEN** the server starts against a database with no scoresheets
- **THEN** the configured default scoresheets, moves, and bonuses are created

#### Scenario: Restarting the server
- **WHEN** the server starts and a default scoresheet's name already exists
- **THEN** that scoresheet is left unchanged and not duplicated
