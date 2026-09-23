# Spec Delta

## ADDED Requirements

### Requirement: Score submissions carry an ordering identifier
Every score submission SHALL carry a v7 UUID identifier that orders it in time against other
submissions for the same heat/athlete/phase/run/judge. A retry SHALL resend the identifier its
submission was created with, not a new one. The server SHALL reject a submission that is
missing this identifier, or that carries one that is not a v7 UUID, with `422 Unprocessable
Entity`.

#### Scenario: A submission is retried after a later edit
- **WHEN** a submission fails and retries after the scribe has made a further edit
- **THEN** the retry carries its original identifier, which orders before the identifier of
  the submission the later edit created

#### Scenario: A submission arrives without an identifier
- **WHEN** a score submission arrives carrying no identifier
- **THEN** the server answers `422 Unprocessable Entity` and applies nothing

#### Scenario: A submission carries an identifier that is not a v7 UUID
- **WHEN** a score submission arrives carrying an identifier that is not a v7 UUID
- **THEN** the server answers `422 Unprocessable Entity` and applies nothing

### Requirement: The server rejects out-of-order score submissions
The server SHALL apply a score submission when its identifier orders after, or is identical
to, the most recent submission already applied for that heat/athlete/phase/run/judge. The
server SHALL answer `409 Conflict` to a submission whose identifier orders before that one,
leave the stored moves and bonuses untouched, and broadcast nothing.

#### Scenario: A stale retry arrives after a newer submission succeeded
- **WHEN** a submission carrying an older identifier reaches the server after one carrying a
  newer identifier has been applied for the same heat, athlete, run and judge
- **THEN** the server answers `409 Conflict`, the stored moves and bonuses remain those of the
  newer submission, and no `/current_scores` broadcast goes out

#### Scenario: A retry carries the same identifier as the submission already applied
- **WHEN** a retry reaches the server carrying the identical identifier of the submission most
  recently applied for that heat, athlete, run and judge — because the original request's
  response was lost before the client saw it
- **THEN** the server applies it and answers success, rather than `409 Conflict`, since a retry
  resends the identifier its submission was created with and this is that same submission
  landing again

#### Scenario: Editing continues after a rejection
- **WHEN** the scribe makes a further edit after the server rejected a stale retry
- **THEN** that edit's submission orders after the most recent applied submission, and the
  server applies it

### Requirement: Ordering ignores the scoring device's clock
Submission identifiers SHALL derive from the server's clock, so that a scribe device whose own
clock is wrong keeps submitting successfully and blocks no other device.

#### Scenario: A scribe device's clock is wrong
- **WHEN** a scribe device whose clock differs from the server's submits a score
- **THEN** the server applies that submission and every submission that device sends after it

#### Scenario: A replacement device takes over a judge slot
- **WHEN** a second device, whose clock differs from the first's, takes over a judge slot
  mid-heat and submits a score
- **THEN** the server applies that submission without waiting for the second device's clock to
  pass the first's

### Requirement: Concurrent submissions for one judge's run never interleave
The server SHALL apply two overlapping score submissions for one heat/athlete/phase/run/judge
one at a time, so the stored moves and bonuses always come from exactly one submission.
Submissions for different judges on the same run SHALL proceed concurrently.

#### Scenario: Two submissions for one judge overlap
- **WHEN** two score submissions for the same heat, athlete, run and judge are in flight
  together
- **THEN** the stored moves and bonuses match one submission exactly, holding nothing from the
  other

#### Scenario: Two judges submit for one run together
- **WHEN** two judges submit scores for the same heat, athlete and run at the same time
- **THEN** the server applies both, and each judge's stored moves and bonuses match what that
  judge submitted

### Requirement: A run has one stored status
The server SHALL store at most one run status per heat/phase/athlete/run, so lock and
did-not-start checks have a single answer. Repeated or concurrent run status messages for one
run SHALL update that status rather than add another.

#### Scenario: Concurrent run status messages for one run
- **WHEN** two run status messages for the same heat, phase, athlete and run are processed
  together
- **THEN** one stored status remains for that run, holding the values of one of the messages

#### Scenario: A run's status changes more than once
- **WHEN** a run's status is updated repeatedly
- **THEN** reading that run's status returns the most recently applied values from a single
  stored status

## MODIFIED Requirements

### Requirement: A locked run's score submissions are rejected by the server
The server SHALL reject a score submission for a heat/athlete/run whose run status is locked,
independent of any client-side restriction. The server SHALL report that rejection as
`409 Conflict`, so clients treat it as final rather than retrying it as a transient failure.

#### Scenario: Submission targets a locked run
- **WHEN** a score submission targets a heat/athlete/run whose run status is locked
- **THEN** the server persists none of the submitted moves or bonuses and answers
  `409 Conflict`
