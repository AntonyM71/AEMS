# Spec Delta

## ADDED Requirements

### Requirement: The scribe screen warns when it is not on the head judge's heat, athlete or run
While the head judge has published a position, the scribe screen SHALL show a warning alert above the move
cards whenever the scribe's selected heat, athlete or run differs from it. The alert SHALL name the head judge's
athlete and run and the scribe's own, and SHALL offer a single action that moves the scribe to the head judge's
athlete and run. When the heat differs, the alert SHALL say so and the action SHALL switch the scribe to the head
judge's competition and heat. The alert SHALL NOT show when all three match, and SHALL NOT block move entry.

#### Scenario: Head judge is on a different run
- **WHEN** the head judge is on run 2 and the scribe is on run 1 of the same athlete
- **THEN** the scribe sees a warning naming the head judge's athlete and run 2 and their own run 1, and choosing "Go to head judge's run" moves the scribe to run 2 and clears the warning

#### Scenario: Head judge is on a different athlete
- **WHEN** the head judge is on another athlete in the scribe's heat
- **THEN** the scribe sees the same warning, and choosing "Go to head judge's run" selects that athlete and run

#### Scenario: Head judge is in a different heat
- **WHEN** the head judge's heat differs from the scribe's
- **THEN** the scribe sees "Head judge is scoring a different heat", and choosing "Switch heat" selects the head judge's competition and heat
