# Spec Delta

## Purpose

Turns judges' scored moves and bonuses into a run score, a competition total, and an explainable rank for each athlete in a phase.

## ADDED Requirements

### Requirement: Move scoring by direction
A scored move's point value SHALL be looked up from its scoresheet entry's `fl_score` when scored with direction F, L, or S, or its `rb_score` when scored with direction R or B.

#### Scenario: Front-direction move
- **WHEN** a judge scores a move with direction F
- **THEN** the move's score is the scoresheet's `fl_score` for that move

#### Scenario: Back-direction move
- **WHEN** a judge scores a move with direction B
- **THEN** the move's score is the scoresheet's `rb_score` for that move

### Requirement: Duplicate moves count once per run
When a judge scores the same move in the same direction more than once within one athlete's run, only one instance SHALL count toward that run's score.

#### Scenario: Same move scored twice
- **WHEN** a judge scores the same move and direction twice in one run
- **THEN** the run score counts that move only once

### Requirement: Bonuses are deduplicated per move
A bonus scored on a move SHALL add the bonus's point value to that move's score. If the same bonus is scored on the same move more than once, it SHALL be counted once.

#### Scenario: Bonus applied once
- **WHEN** a judge scores a bonus on a scored move
- **THEN** the bonus's score is added to that move's score

#### Scenario: Bonus scored twice on the same move
- **WHEN** a judge scores the same bonus on the same move twice
- **THEN** the bonus's score is added only once

### Requirement: A run's score is the mean across judges
When multiple judges score the same athlete's run, the run's score SHALL be the mean of the judges' individual totals for that run.

#### Scenario: Two judges score a run
- **WHEN** two judges each score the same athlete's run
- **THEN** the run's score is the mean of the two judges' totals

### Requirement: Only an explicit did-not-start status marks a run as DNS
A run SHALL be treated as did-not-start only when a run status record exists for that athlete/run and marks it `did_not_start`. A missing run status record SHALL NOT be treated as DNS.

#### Scenario: No run status recorded
- **WHEN** an athlete has no run status record for a run
- **THEN** that run is not treated as did-not-start

#### Scenario: Explicit DNS
- **WHEN** a run status record marks a run as `did_not_start`
- **THEN** that run's score and highest-scoring-move are both zero

### Requirement: Athletes who did not start any run receive no rank
An athlete whose runs are all marked did-not-start SHALL NOT be assigned a rank.

#### Scenario: All runs DNS
- **WHEN** every one of an athlete's runs is marked did-not-start
- **THEN** that athlete is excluded from ranking against other athletes

### Requirement: Only the phase's own scoresheet moves and bonuses are scoreable
The moves and bonuses available for scoring a heat SHALL be limited to those defined on the scoresheet assigned to that heat's phase.

#### Scenario: Scoring a heat
- **WHEN** scores are calculated for a heat
- **THEN** only the moves and bonuses on that heat's phase's scoresheet are considered

### Requirement: Total score is the sum of the phase's best-N run scores
Each phase configures how many of an athlete's run scores count toward their total. An athlete's total score SHALL be the sum of their N highest run scores, where N is the phase's configured scoring-run count.

#### Scenario: More runs than count toward score
- **WHEN** an athlete has more runs than the phase's scoring-run count
- **THEN** only the highest-scoring runs, up to that count, are summed into the total score

### Requirement: Ranking orders by total score, highest first
Athletes SHALL be ranked by total score, highest first.

#### Scenario: Distinct totals
- **WHEN** athletes have different total scores
- **THEN** the athlete with the higher total is ranked above the athlete with the lower total

### Requirement: Tied totals are broken by successive run scores, then highest move
When athletes tie on total score, the tie SHALL be broken first by comparing each athlete's highest-scoring run, then their next-highest run, and so on, and finally by each athlete's single highest-scoring move. Athletes who remain equal on every criterion SHALL share the same rank.

#### Scenario: Tie broken by best run
- **WHEN** two athletes have equal total scores but different highest single-run scores
- **THEN** the athlete with the higher single best run is ranked above the other

#### Scenario: Tie fully unresolved
- **WHEN** tied athletes match on every tie-break criterion
- **THEN** they share the same rank

### Requirement: Resolved ties report a human-readable reason
When a tie between athletes is resolved by a tie-break criterion, the result SHALL include a reason naming the deciding criterion and the compared scores.

#### Scenario: Tie resolved by a run
- **WHEN** a tie is resolved because one athlete's highest scoring run beats the other's
- **THEN** the reported reason names "highest scoring run" and shows both athletes' scores for it
