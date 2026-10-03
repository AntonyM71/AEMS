# Spec Delta

## ADDED Requirements

### Requirement: A scored move shows its name and bonuses from the athlete's scoresheet
On the scribe screen and the head judge screen, each scored move SHALL show the name of its move and that move's available bonuses, taken from the moves and bonuses of the current athlete's scoresheet. A scored move SHALL show "Unknown" only when the scoresheet's moves have loaded and do not include that move. While the scoresheet's moves or bonuses are still loading, the screen SHALL show a loading placeholder instead of "Unknown".

#### Scenario: A scored move on the athlete's scoresheet shows its name
- **WHEN** a scribe scores a move from the current athlete's scoresheet
- **THEN** the scored move list shows that move's name and direction, with a chip for each bonus available on that move

#### Scenario: Scoresheet data still loading
- **WHEN** the scored move list is shown before the scoresheet's moves or bonuses have loaded
- **THEN** a loading placeholder is shown and no scored move shows "Unknown"

#### Scenario: A scored move not on the scoresheet
- **WHEN** the scoresheet's moves have loaded and a scored move refers to a move that is not among them
- **THEN** that scored move shows "Unknown"

#### Scenario: Head judge view of a judge's scored moves
- **WHEN** the head judge views a judge's scored moves for the selected athlete and run
- **THEN** each scored move shows its move name and bonuses from the athlete's scoresheet

### Requirement: Scoresheet moves and bonuses load again after a network reconnect
When the browser regains its network connection, the scribe screen and the head judge screen SHALL fetch the current scoresheet's moves and bonuses again, so that data that failed to load during the outage appears without a page refresh. A reconnect SHALL NOT fetch the scribe's own scored moves and bonuses again. Doing so could overwrite moves scored during the outage that the server has not yet accepted.

#### Scenario: Scoresheet data recovers after a failed load
- **WHEN** loading the scoresheet's bonuses fails during a network outage and the browser then comes back online
- **THEN** the bonuses load again and the scored move list shows them without a page refresh

#### Scenario: The scribe's own scores are not fetched again on reconnect
- **WHEN** the browser comes back online while a scribe has scored moves on screen
- **THEN** those scored moves are not replaced with data fetched from the server because of the reconnect
