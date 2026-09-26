# Spec Delta

The requirement that a move clears an athlete's scores is not modified in place but replaced:
its name states the outcome that is being inverted, so it is removed and a requirement carrying
the new outcome is added in its place.

## REMOVED Requirements

### Requirement: Moving an athlete to a different heat or phase clears their previously scored moves
Replaced by "Moving an athlete to a different heat or phase preserves their scores where the
scoresheet allows it". Deleting an athlete's scores is no longer the outcome of every move,
only of a move to a phase scored against a different scoresheet.

## ADDED Requirements

### Requirement: Moving an athlete to a different heat or phase preserves their scores where the scoresheet allows it
When editing an athlete moves them to a different heat or a different phase, the server SHALL
carry that athlete's previously scored moves, their bonuses, and their run statuses over to
the new heat and phase when the destination phase scores against the same scoresheet as the
phase they are leaving. When the destination phase uses a different scoresheet, the server
SHALL delete them instead, because every recorded move belongs to a scoresheet the destination
does not offer.

Scored moves belonging to runs the destination phase does not have SHALL be preserved rather
than deleted; phase results ignore them, and they become readable again if the athlete returns
or the phase's run count grows.

An edit that changes neither the athlete's heat nor their phase SHALL leave their scores
untouched.

#### Scenario: Moving to a heat scored against the same scoresheet keeps the scores
- **WHEN** an operator moves an athlete who has scored moves into a different heat whose phase
  uses the same scoresheet
- **THEN** that athlete's scored moves, bonuses, and run statuses are readable against the new
  heat and phase, with the same scores as before the move, and nothing remains against the old
  heat

#### Scenario: Moving to a phase scored against a different scoresheet clears the scores
- **WHEN** an operator moves an athlete who has scored moves into a phase that uses a
  different scoresheet
- **THEN** that athlete's scored moves, bonuses, and run statuses for the phase they left are
  deleted, and they have no scores in the phase they joined

#### Scenario: A locked or did-not-start run stays locked or did-not-start
- **WHEN** an athlete with a locked run and a did-not-start run is moved to a heat whose phase
  uses the same scoresheet
- **THEN** those runs are still reported as locked and did-not-start against the new heat and
  phase

#### Scenario: Moving an athlete leaves their scores in other phases untouched
- **WHEN** an athlete who has been promoted has scored moves in an earlier phase, and is moved
  between heats in their current phase
- **THEN** their scores in the earlier phase are untouched

#### Scenario: Correcting an athlete's details without moving them keeps their scores
- **WHEN** an operator edits an athlete's name or bib number without changing their heat or
  phase
- **THEN** that athlete's scored moves are unchanged and remain against the same heat and phase

#### Scenario: The operator is warned which outcome their pending edit will have
- **WHEN** an operator opens the edit dialog for an athlete already assigned to a heat and
  phase
- **THEN** they are told whether moving that athlete to the currently selected phase will keep
  their previously scored moves or delete them

### Requirement: Moving an athlete and settling their scores is one atomic operation
The server SHALL apply the athlete's new heat and phase and the fate of their scores together,
such that a failure in either leaves the athlete where they were with their scores intact. The
webapp SHALL NOT settle those scores in a request of its own.

#### Scenario: A failure during the move leaves nothing half-applied
- **WHEN** settling an athlete's scores fails while moving them
- **THEN** the athlete remains assigned to their original heat and phase and their scores
  remain readable there

#### Scenario: The move reports what became of the scores
- **WHEN** the server moves an athlete to a different heat or phase
- **THEN** its response states whether the athlete's scores were preserved or deleted, and the
  webapp tells the operator which happened

### Requirement: A locked run does not block moving the athlete
The server SHALL move an athlete's heat or phase, and settle their scores accordingly, regardless of whether any of their runs are locked. This differs from a judge's own score submission, which the server rejects outright for a locked run: a move is an operator correcting where an athlete belongs, not an edit to what a judge scored, and an operator who needs to move a paddler out of a heat cannot be blocked by a lock the paddler's own presence there created.

#### Scenario: Moving an athlete with a locked run succeeds
- **WHEN** an operator moves an athlete who has a locked run to a different heat or phase
- **THEN** the move succeeds, and if the destination phase uses the same scoresheet that run's scores and its locked status both carry over unchanged

### Requirement: An athlete is not moved into scores that already exist for them
The server SHALL NOT carry an athlete's scores into a heat and phase that already holds scored
moves or run statuses for that same athlete. It SHALL keep what is already recorded there and
delete what would have been carried, since two sets of moves for one run and judge would be
counted as a single, inflated score.

#### Scenario: The destination already holds scores for this athlete
- **WHEN** an athlete is moved into a heat and phase where that athlete already has scored
  moves
- **THEN** the scores already recorded there are unchanged, the scores from the heat they left
  are deleted rather than added to them, and the athlete's run scores are those of the
  destination alone

#### Scenario: The destination holds a run status but no moves
- **WHEN** an athlete is moved into a heat and phase where that athlete already has a
  did-not-start run status but no scored moves
- **THEN** that status is unchanged and the scores from the heat they left are deleted

#### Scenario: An athlete's two entries are moved into the same destination at the same time
- **WHEN** a promoted athlete's two `athleteheat` entries — one in the phase they were promoted
  from, one in the phase they were promoted to — are moved into the same destination heat and
  phase by two concurrent requests
- **THEN** one move completes and the other observes that athlete's scores as already occupying
  the destination, rather than both proceeding as if it were free

### Requirement: Editing an athlete preserves their previously recorded phase rank
The webapp SHALL load an athlete's existing `last_phase_rank` into the edit dialog, so that
submitting an edit which does not change it leaves it unchanged rather than clearing it.

#### Scenario: A bib correction does not clear a recorded rank
- **WHEN** an operator edits an athlete who has a `last_phase_rank` recorded from an earlier
  promotion, changing only their bib number
- **THEN** their `last_phase_rank` is unchanged after the edit

#### Scenario: An operator can still change the recorded rank
- **WHEN** an operator opens the edit dialog and enters a different value in the "Last Phase
  Rank" field
- **THEN** the athlete's `last_phase_rank` is updated to the value entered

### Requirement: Scored bonuses and run statuses never outlive the moves they describe
Whenever the server deletes an athlete's scored moves as part of a move, it SHALL delete the
bonuses recorded against those moves and that athlete's run statuses for the heat and phase
they left.

#### Scenario: Clearing scores leaves nothing behind
- **WHEN** an athlete's scores are deleted because they moved to a phase with a different
  scoresheet
- **THEN** no scored bonuses referencing those moves and no run statuses for that athlete in
  the heat and phase they left remain in the database
