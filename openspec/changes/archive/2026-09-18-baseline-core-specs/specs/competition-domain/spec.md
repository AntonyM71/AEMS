# Spec Delta

## Purpose

Defines the structural hierarchy (Competition -> Event -> Phase -> Heat -> Athlete) and per-phase configuration that scoring and every other capability operates on.

## ADDED Requirements

### Requirement: Competitions contain events
An Event SHALL belong to exactly one Competition.

#### Scenario: Event created
- **WHEN** an Event is created
- **THEN** it references exactly one Competition

### Requirement: Events contain phases
A Phase SHALL belong to exactly one Event.

#### Scenario: Phase created
- **WHEN** a Phase is created
- **THEN** it references exactly one Event

### Requirement: A phase configures its own run, judge, and scoring rules
A Phase SHALL declare its number of runs, how many of those runs count toward an athlete's score, its number of judges, and the scoresheet used to score it. Without explicit values, a Phase defaults to 3 runs, the best 2 counting, and 3 judges.

#### Scenario: Defaults applied
- **WHEN** a Phase is created without explicit run/judge counts
- **THEN** it defaults to 3 runs, counting the best 2, judged by 3 judges

### Requirement: Athletes are placed into heats per phase
An AthleteHeat record SHALL link one Athlete to one Heat within one Phase, so the same athlete can be placed in different heats across different phases of an event.

#### Scenario: Athlete competes in a phase
- **WHEN** an athlete is entered into a phase
- **THEN** an AthleteHeat record links that athlete to a heat within that phase

### Requirement: An athlete's prior-phase rank is recorded for seeding
An AthleteHeat record SHALL be able to store the athlete's rank from the phase that seeded it into the current phase.

#### Scenario: Athlete advances to a later phase
- **WHEN** an athlete advances into a later phase based on their result in an earlier phase
- **THEN** their earlier-phase rank is recorded on their AthleteHeat entry for the later phase

### Requirement: Run status is recorded per athlete per run, and defaults to unlocked and started
A RunStatus record, when present, SHALL record whether a specific athlete's specific run in a specific heat/phase is locked and whether it is a did-not-start. When no RunStatus record exists for a run, that run SHALL be treated as unlocked and not did-not-start.

#### Scenario: No run status recorded
- **WHEN** no RunStatus record exists for a given athlete's run
- **THEN** that run is treated as unlocked and not did-not-start
