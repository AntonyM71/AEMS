## MODIFIED Requirements

### Requirement: Independent visibility toggles
The control state SHALL carry independent boolean flags (`showImageCard`, `showEventTitle`, `showHeatSummary`, `showPhaseResults`, `showLiveRunScore`, `showAthleteOverview`, `showCompetitionOverview`, `showLeaderboardTower`) that the operator can flip one at a time without affecting the others.

#### Scenario: Operator toggles a flag
- **WHEN** the operator clicks a visibility toggle button on the controller
- **THEN** only that flag's value is inverted in the emitted control state

### Requirement: Some toggles require a prerequisite selection
Toggling `showEventTitle`, `showHeatSummary`, `showPhaseResults` or `showLeaderboardTower` on SHALL require, respectively, a selected event, heat, phase, or phase. Toggling `showLiveRunScore` or `showAthleteOverview` on SHALL require a selected athlete. Toggling `showCompetitionOverview` on SHALL require a selected competition. When the required selection is missing, the controller SHALL show an error message instead of changing the flag. Turning a flag that is already on off SHALL NOT require a selection.

#### Scenario: Toggling heat summary without a selected heat
- **WHEN** the operator clicks "Heat summary" with no heat selected
- **THEN** the controller shows an error message and `showHeatSummary` is not changed

#### Scenario: Toggling the athlete overview without a selected athlete
- **WHEN** the operator clicks "Athlete overview" with no athlete selected
- **THEN** the controller shows an error message and `showAthleteOverview` is not changed

#### Scenario: Toggling the competition overview without a selected competition
- **WHEN** the operator clicks "Competition overview" with no competition selected
- **THEN** the controller shows an error message and `showCompetitionOverview` is not changed

#### Scenario: Toggling the leaderboard tower without a selected phase
- **WHEN** the operator clicks "Leaderboard tower" with no phase selected
- **THEN** the controller shows an error message and `showLeaderboardTower` is not changed

#### Scenario: Turning a graphic off without its selection
- **WHEN** a graphic is on and its required selection is no longer present
- **THEN** clicking its toggle turns it off without an error message

## ADDED Requirements

### Requirement: The controller sets up the leaderboard tower
The overlay controller SHALL show a "Leaderboard tower" toggle on the right of its broadcast screen layout, where the tower appears on the programme output. Beside it, the controller SHALL offer these tower settings and carry them in the emitted broadcast_control state:
- a style switch between "Timing tower" and "Waterline", defaulting to "Timing tower";
- a "Places through" field taking a whole number of 1 or more, empty by default, meaning no cut line;
- a "Qualifiers above the bubble" choice of "Show all that fit", "Cycle 2 at a time", "Cycle 3 at a time" or "Cycle 4 at a time", defaulting to "Show all that fit";
- a "Climb on new scores" switch, on by default.

Changing a tower setting SHALL NOT change any visibility flag. A setting changed while the tower is on air SHALL take effect on the overlay without the operator turning the tower off and on.

#### Scenario: Default tower settings
- **WHEN** the controller mounts
- **THEN** the emitted control state has the Timing tower style, no places through, show all qualifiers that fit, and the climb on

#### Scenario: Switching style on air
- **WHEN** the tower is on air in the Timing tower style and the operator switches to "Waterline"
- **THEN** the emitted control state has the Waterline style, `showLeaderboardTower` is still true, and the overlay redraws the tower as a waterline

#### Scenario: Setting places through
- **WHEN** the operator enters 10 in "Places through"
- **THEN** the emitted control state carries 10 places through and the tower draws its cut line below 10th place

### Requirement: The leaderboard tower ranks the selected phase on final runs
While `showLeaderboardTower` is true, the broadcast overlay SHALL show a leaderboard tower for the phase selected on the controller. In Follow head judge mode, it SHALL still use the controller's phase, as phase results do.

A run SHALL count once the head judge locks it or marks it did-not-start, as in the athlete overview. An athlete's total SHALL be the sum of their best final run scores, up to the phase's number of scoring runs, with a did-not-start run counting as zero. The tower SHALL list only athletes with at least one final run that isn't did-not-start. It SHALL order them by total, highest first. Athletes with equal totals SHALL be listed in the order of the server's phase results. Places SHALL run 1, 2, 3 and so on down the list.

The tower SHALL have a header with the event name, the phase name, and the number of athletes listed over the number entered in the phase, as "26/32". Each row SHALL show the place, the athlete's bib, their upper-cased surname, and their gap to the leader. The gap SHALL be the athlete's total minus the leader's, with a minus sign and two decimal places, as "−44.33". The leader's row SHALL show "Leader" in place of a gap.

The arena SHALL NOT show the tower.

#### Scenario: Ranking on locked runs only
- **WHEN** athlete A has a locked run scoring 900.00, and athlete B has a locked run scoring 850.00 and an unlocked run with 950.00 so far
- **THEN** the tower lists A in 1st with "Leader" and B in 2nd with "−50.00"

#### Scenario: An athlete with no final run
- **WHEN** an athlete in the phase has only a run still being judged
- **THEN** the athlete is not on the tower and the header count does not include them

#### Scenario: An athlete whose only final run is did-not-start
- **WHEN** an athlete's only final run is marked did-not-start
- **THEN** the athlete is not on the tower

#### Scenario: Best two of three
- **WHEN** a phase counts the best 2 of 3 runs and an athlete's locked runs scored 300.00, 500.00 and 400.00
- **THEN** the athlete's total on the tower is 900.00

#### Scenario: Follow head judge mode
- **WHEN** the controller is in Follow head judge mode and the head judge moves to a heat in a different phase
- **THEN** the tower keeps showing the phase selected on the controller

### Requirement: The leaderboard tower runs down the right edge of the frame
The tower SHALL be a narrow column against the right edge of the frame, starting at the top. It SHALL show at most 18 athlete rows, so that it stays within the frame's title-safe height. Its labels and the climb's callout SHALL extend to its left, into the frame.

The tower SHALL slide in from the right edge when shown and out when hidden. When reduced motion is requested, it SHALL fade instead.

#### Scenario: Shown
- **WHEN** the operator turns the leaderboard tower on
- **THEN** the tower slides in from the right edge of the frame

#### Scenario: Large field
- **WHEN** 26 athletes are on the board
- **THEN** the tower shows at most 18 athlete rows at once

### Requirement: The leaderboard tower pins the medal places and the qualifying bubble
The tower SHALL always show places 1, 2 and 3, each marked with gold, silver and bronze respectively.

When places through is set to N, the tower SHALL draw a cut line between place N and place N+1, labelled "Top N through". It SHALL always show the bubble: places N−1, N, N+1 and N+2, where they exist and are not already among the medal places. Athletes below the cut line SHALL be drawn as not going through. When N is at least the number of athletes on the board, the cut line SHALL sit below the last athlete.

When places through is not set, the tower SHALL draw no cut line and pin no bubble.

#### Scenario: Ten places through
- **WHEN** places through is 10 and 26 athletes are on the board
- **THEN** places 1–3 and places 9–12 are always shown, with a line labelled "Top 10 through" between 10th and 11th

#### Scenario: Everyone currently through
- **WHEN** places through is 10 and 7 athletes are on the board
- **THEN** all 7 are shown and the cut line sits below 7th place

#### Scenario: Places through not set
- **WHEN** places through is empty
- **THEN** the tower draws no cut line

### Requirement: Leaderboard tower rows that don't fit rotate through a window
When every athlete on the board fits in 18 rows and the operator has chosen "Show all that fit", the tower SHALL show every athlete with nothing rotating.

Otherwise, the medal places and the bubble SHALL stay fixed. Two groups SHALL share the remaining rows: the athletes between the medal places and the bubble, and the athletes below the bubble. The group between SHALL get as many rows as fit, while leaving up to three rows for the group below. The group below SHALL get the rest. When the operator chooses "Cycle n at a time", the group between SHALL get no more than n rows, even when more would fit. A group with more athletes than rows SHALL rotate through them in its window, advancing every 5 seconds and wrapping back to the start after the last. A visible break SHALL separate a rotating window from the rows next to it.

#### Scenario: Athletes below the bubble rotate
- **WHEN** places through is 10, 26 athletes are on the board, and the operator has chosen "Show all that fit"
- **THEN** places 1–12 are shown in full, and places 13–26 rotate through a 6-row window below them

#### Scenario: Qualifiers rotate three at a time
- **WHEN** places through is 10 and the operator chooses "Cycle 3 at a time"
- **THEN** places 4–8 rotate through a 3-row window between the medal places and the bubble

#### Scenario: Small field
- **WHEN** 12 athletes are on the board and the operator has chosen "Show all that fit"
- **THEN** all 12 are shown and nothing rotates

### Requirement: The leaderboard tower has a Timing tower style and a Waterline style
In the Timing tower style, the tower SHALL be a dark panel with light text, the medal colours on the edge of the top three rows, and the cut line drawn in the primary colour.

In the Waterline style, the tower SHALL draw the athletes going through on white with dark text, and the athletes below the cut line on a translucent dark blue. The cut line SHALL be drawn as a moving wave in the alternate colour, still when reduced motion is requested.

Both styles SHALL give each row the same size and place, so switching style SHALL NOT restart a rotating window.

#### Scenario: Waterline below the cut
- **WHEN** the tower is in the Waterline style with 10 places through
- **THEN** places 1–10 are on white and places 11 and below are on translucent dark blue, below a wave labelled "Top 10 through"

#### Scenario: Switching style mid-rotation
- **WHEN** a window is showing its second set of rows and the operator switches style
- **THEN** the window keeps showing its second set of rows in the new style

### Requirement: The leaderboard tower climbs a newly scored athlete up the board
While the tower is on air and "Climb on new scores" is on, a climb SHALL play when the head judge locks a run for an athlete in the tower's phase that moves that athlete up the board. This includes an athlete appearing on the board for the first time. During a climb, the tower SHALL:
1. show one continuous run of places around the athlete, in place of the pinned and rotating layout;
2. highlight the athlete's row at their old place, or below the last athlete if they are new to the board;
3. pull the row inwards, with a callout beside it showing the athlete's full name, "Run n" for the locked run, and that run's score;
4. move the row up one place at a time to its new place, slowing down for the last few places, while the window follows the row;
5. move each athlete it passes down one place, updating their place and gap;
6. if the athlete moves from below the cut line to above it, mark the athlete pushed below the line;
7. after the row reaches its new place, return it to the column, hold the view for about 4 seconds, and then go back to the normal layout with the athlete's row marked briefly.

A lock that does not move the athlete up SHALL update the tower in place with no climb. So SHALL a did-not-start, a run being unlocked, any lock while "Climb on new scores" is off, and any lock while reduced motion is requested. A lock that arrives during a climb SHALL play its own climb, if it earns one, after the current climb finishes. When one reload of the scores covers several locks, only the last of them SHALL climb; the others SHALL update in place.

#### Scenario: A new athlete enters the bubble
- **WHEN** places through is 10, 26 athletes are on the board, and the head judge locks the first run of an athlete not yet on the board, scoring enough for 9th
- **THEN** the athlete's row starts below 26th place and climbs one place at a time to 9th, with a callout showing their full name, "Run 1" and the run's score
- **AND** the athlete who was 10th, and so moves to 11th, is marked as pushed below the line

#### Scenario: Improving on a second run
- **WHEN** an athlete in 15th locks a second run that lifts their total to 4th
- **THEN** their row climbs from 15th to 4th, and the callout shows "Run 2" and that run's score

#### Scenario: A lock that doesn't move the athlete up
- **WHEN** the head judge locks a run that leaves the athlete's total unchanged
- **THEN** the tower plays no climb

#### Scenario: Climb switched off
- **WHEN** "Climb on new scores" is off and the head judge locks a run that moves an athlete from 15th to 4th
- **THEN** the tower redraws with the athlete in 4th and plays no climb

#### Scenario: Two locks in quick succession
- **WHEN** a run that moves its athlete up is locked while another athlete's climb is still playing
- **THEN** the second climb starts after the first has finished

#### Scenario: Two locks within a second
- **WHEN** the head judge locks two runs that each move their athlete up, within one second of each other
- **THEN** only the athlete whose run was locked second climbs, and the other athlete appears in their new place

### Requirement: The leaderboard tower updates as runs become final
The tower SHALL update when a lock, did-not-start or unlock is broadcast for any athlete in its phase, without the operator reloading the page or re-showing the tower. Broadcasts that arrive within about a second of each other SHALL be handled with one reload of the phase's scores. The tower SHALL also reload the scores each time its connection for run broadcasts is re-established, so that a broadcast missed while it was disconnected is still caught. It SHALL NOT otherwise reload the scores on a timer.

#### Scenario: Run marked did-not-start
- **WHEN** the head judge marks an athlete's run did-not-start while the tower is on air
- **THEN** the tower redraws with that run counting as zero, without a reload

#### Scenario: Run unlocked
- **WHEN** the head judge unlocks a run that was on the tower
- **THEN** the tower redraws without that run's score, without a reload

#### Scenario: Several locks at once
- **WHEN** the head judge locks three runs in the tower's phase within one second
- **THEN** the tower reloads the phase's scores once and redraws with all three

#### Scenario: Reconnecting after a missed lock
- **WHEN** the overlay's connection drops, a run is locked while it is down, and the connection comes back
- **THEN** the tower reloads the phase's scores and shows the locked run

#### Scenario: Nothing happening
- **WHEN** the tower is the only graphic on air, and no run in its phase is locked, unlocked or marked did-not-start for several minutes
- **THEN** the tower makes no requests for the phase's scores

### Requirement: The run corner moves inwards while the leaderboard tower is on air
While `showLeaderboardTower` is true, the run corner SHALL sit to the left of the tower, together with its artwork, so that the two do not overlap. When the tower goes off air, the run corner SHALL move back to its usual place in the lower right. The run corner SHALL slide between the two places; when reduced motion is requested, it SHALL move without sliding.

#### Scenario: Tower and run corner on air together
- **WHEN** the live run score and the leaderboard tower are both on air
- **THEN** the run corner sits to the left of the tower and neither overlaps the other

#### Scenario: Tower taken off air
- **WHEN** the operator turns the leaderboard tower off while the live run score is on air
- **THEN** the run corner slides back to the lower right
