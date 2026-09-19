# Spec Delta

## Purpose

Lets an admin create and edit Competitions, Athletes, and Heats one at a time, as the manual counterpart to the bulk XLSX competition-import path.

## ADDED Requirements

### Requirement: Creating a competition requires a name entered in the UI
The competition-creation form SHALL require a non-empty name before submitting, rejecting an empty submission with an on-screen error instead of creating a competition.

#### Scenario: Submitting without a name
- **WHEN** the competition-creation form is submitted with no name entered
- **THEN** an error is shown and no competition is created

### Requirement: A newly created competition appears without a manual refresh
After a competition is created, it SHALL appear in the competition selector without the user needing to take a further action to refresh it.

#### Scenario: A competition is created
- **WHEN** a competition is successfully created
- **THEN** it appears in the competition selector without a manual refresh

### Requirement: A competition cannot be edited once created
The UI SHALL NOT provide a way to edit an existing competition's details after creation.

#### Scenario: Attempting to find an edit option
- **WHEN** an admin views an existing competition
- **THEN** no option to edit its details is presented

### Requirement: Creating or editing an athlete requires a first name, last name, and bib number entered in the UI
The athlete create/edit form SHALL require a first name, last name, and bib number before submitting, rejecting an incomplete submission with an on-screen error instead of creating or updating the athlete.

#### Scenario: Submitting with a required field missing
- **WHEN** the athlete create/edit form is submitted without a first name, last name, or bib number
- **THEN** an error is shown and no athlete is created or updated

### Requirement: An athlete is always created together with their placement in a heat and phase
Creating an athlete SHALL always also create their placement into a specific heat and phase; the UI SHALL NOT offer a way to create an athlete without also placing them in a heat and phase.

#### Scenario: Creating a new athlete
- **WHEN** a new athlete is created through the roster UI
- **THEN** they are simultaneously placed into the selected heat and phase

### Requirement: Moving an athlete to a different heat or phase while editing deletes their previously scored moves
When editing an athlete changes their heat or phase, the edit form SHALL delete that athlete's previously scored moves in the heat and phase they are leaving, and SHALL display a warning describing this before the change is submitted.

#### Scenario: Editing an athlete without changing heat or phase
- **WHEN** an athlete's details are edited without changing their heat or phase
- **THEN** their previously scored moves are not deleted

#### Scenario: Editing an athlete to a different heat or phase
- **WHEN** an athlete's heat or phase is changed while editing
- **THEN** their previously scored moves in the heat and phase they are leaving are deleted, and a warning about this is shown on the edit form

### Requirement: The last-phase-rank field is only available when explicitly enabled
The athlete create/edit form SHALL only expose a field for setting the athlete's last-phase rank when that capability has been explicitly enabled by configuration; otherwise the field SHALL NOT be shown.

#### Scenario: The capability is not enabled
- **WHEN** the last-phase-rank capability is not enabled by configuration
- **THEN** the athlete create/edit form does not show a field for it

### Requirement: A successful athlete create or edit resets the form and closes an edit dialog
After an athlete is successfully created or updated, the name and affiliation fields SHALL be cleared and the bib number field SHALL advance to the next number. When the edit was performed in a dialog, the dialog SHALL close.

#### Scenario: Creating an athlete
- **WHEN** a new athlete is successfully created
- **THEN** the name and affiliation fields are cleared and the bib number field advances to the next number

#### Scenario: Editing an athlete in a dialog
- **WHEN** an athlete is successfully edited through the edit dialog
- **THEN** the dialog closes

### Requirement: Creating or editing a heat requires a heat name
The heat create/edit form SHALL disable its submit action until a heat name has been entered.

#### Scenario: No heat name entered
- **WHEN** the heat create/edit form has no heat name entered
- **THEN** its submit action is disabled

### Requirement: A heat can be reassigned to a different competition while editing
Editing a heat SHALL allow changing which competition it belongs to, defaulting to the heat's current competition.

#### Scenario: Changing a heat's competition
- **WHEN** a heat is edited with a different competition selected
- **THEN** the heat is updated to belong to that competition

### Requirement: Creating or updating a heat refreshes the heat list
After a heat is created or updated, the heat list SHALL refresh to reflect the change. When updating, the heat's own detail view SHALL also refresh.

#### Scenario: A heat is created or updated
- **WHEN** a heat is successfully created or updated
- **THEN** the heat list refreshes to reflect the change

### Requirement: A heat edit dialog does not close automatically after a successful update
Successfully updating a heat through the edit dialog SHALL NOT close that dialog; it SHALL remain open until closed by the user.

#### Scenario: Successfully updating a heat
- **WHEN** a heat is successfully updated through the edit dialog
- **THEN** the dialog remains open

### Requirement: The API does not enforce the UI's required-field rules
Creating a Competition, Athlete, or Heat through the API SHALL NOT reject an empty string for a name, first name, last name, or bib number field; those fields being non-empty is enforced only by the web UI, not the API itself.

#### Scenario: An empty required field is submitted directly to the API
- **WHEN** a competition, athlete, or heat is created through the API with an empty string for a field the UI treats as required
- **THEN** the API accepts the request

### Requirement: Updating a nonexistent competition, athlete, or heat is rejected
Updating a Competition, Athlete, or Heat whose id does not exist SHALL be rejected, and SHALL NOT create a new record.

#### Scenario: Updating an id that doesn't exist
- **WHEN** an update is requested for a Competition, Athlete, or Heat id that doesn't exist
- **THEN** the request is rejected and no record is created

### Requirement: A failed create or edit is shown as an error
A failed attempt to create or edit a Competition, Athlete, or Heat SHALL be surfaced to the user as an error, rather than failing silently.

#### Scenario: A create or edit request fails
- **WHEN** a create or edit request for a Competition, Athlete, or Heat fails
- **THEN** an error is shown to the user
