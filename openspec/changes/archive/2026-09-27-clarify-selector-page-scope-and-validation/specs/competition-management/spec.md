# Spec Delta

## MODIFIED Requirements

### Requirement: A competition must be selected before its events, phases, or heats can be selected
The webapp SHALL require a competition to be selected before its events can be selected, and an event to be selected before its phases can be selected.

#### Scenario: No competition selected
- **WHEN** no competition is selected
- **THEN** the event selector renders nothing

#### Scenario: No event selected
- **WHEN** a competition is selected but no event is selected
- **THEN** the phase selector renders nothing

#### Scenario: Changing the selected competition or event clears narrower selections
- **WHEN** an operator selects a different competition
- **THEN** the previously selected event, phase, and heat are cleared

#### Scenario: Changing the selected event clears narrower selections
- **WHEN** an operator selects a different event
- **THEN** the previously selected phase and heat are cleared

### Requirement: Operators add events, phases, and heats to a competition inline
The webapp SHALL let an operator add a new event, a new phase (with its run count, scoring-run count, judge count, and scoresheet), or a new heat, from within the corresponding selector, without navigating away. These inline "Add" controls SHALL be shown only on the Admin page. The Judging, Head Judge, Scribe, and heat-PDF-generation pages SHALL show the same selectors without any inline add control.

#### Scenario: A newly added phase becomes selectable
- **GIVEN** an operator is on the Admin page
- **WHEN** they submit the "Add Phase" form with a name and scoresheet
- **THEN** the new phase is created and appears as an option in the phase selector

#### Scenario: A newly added heat is created and the form resets
- **GIVEN** an operator is on the Admin page
- **WHEN** they submit the "Add Heat" form with a name
- **THEN** the new heat is created, the heat list is refreshed, and the name field is cleared

#### Scenario: No add controls outside the Admin page
- **GIVEN** an operator is on the Judging, Head Judge, Scribe, or heat-PDF-generation page
- **WHEN** they view a competition, event, phase, or heat selector
- **THEN** no inline "Add" form is shown for that selector

### Requirement: Operators edit an existing phase's or heat's details in place
The webapp SHALL let an operator reopen the currently selected phase's or heat's details in an edit dialog, change its fields, and save the change. The edit control SHALL be shown only on the Admin page. The Judging, Head Judge, Scribe, and heat-PDF-generation pages SHALL show the phase or heat selector without an edit control.

#### Scenario: Editing a phase's name updates the selector
- **GIVEN** an operator is on the Admin page
- **WHEN** they open the edit dialog for the selected phase, change its name, and submit
- **THEN** the phase selector shows the updated name

#### Scenario: Editing a heat's name updates it
- **GIVEN** an operator is on the Admin page
- **WHEN** they open the edit dialog for the selected heat, change its name, and submit
- **THEN** the server receives the update and the heat is renamed

#### Scenario: No edit control outside the Admin page
- **GIVEN** an operator is on the Judging, Head Judge, Scribe, or heat-PDF-generation page
- **WHEN** a phase or heat is selected
- **THEN** no edit control is shown for it

## ADDED Requirements

### Requirement: The Add/Edit Phase form requires a name, event, judge count, run count, and scoresheet before it can be submitted
On the Admin page, where the Add/Edit Phase form is shown, the webapp SHALL keep the "Add Phase"/"Update Phase" button disabled until the operator has entered a non-empty phase name, selected an event, set a judge count greater than zero, set a run count greater than zero, and selected a scoresheet. This is in addition to the scoring-run-count rule in "A phase's scoring-run count cannot exceed its total run count".

#### Scenario: An incomplete phase form cannot be submitted
- **GIVEN** an operator is on the Admin page, adding or editing a phase
- **WHEN** the name, event, judge count, run count, or scoresheet field is empty or zero
- **THEN** the "Add Phase"/"Update Phase" button stays disabled
