# Spec Delta

## Purpose

Advances a phase's top-ranked athletes into a newly-created phase and set of heats.

## ADDED Requirements

### Requirement: Promotion requires a positive paddler count
Promoting a phase SHALL require a positive number of paddlers to promote. A request for zero paddlers SHALL be rejected before any phase, heat, or athlete-heat records are created.

#### Scenario: Zero paddlers requested
- **WHEN** a phase promotion is requested for zero paddlers
- **THEN** the request is rejected and no records are created

### Requirement: Promotion requires the source phase to have scored entries
Promoting a phase SHALL require its source phase to have at least one scored entry. A source phase with no scored entries SHALL cause the promotion to be rejected.

#### Scenario: Source phase has no scored entries
- **WHEN** a phase promotion is requested for a source phase with no scored entries
- **THEN** the request is rejected and no records are created

### Requirement: Only athletes ranked at or within the requested count are promoted
An athlete SHALL be promoted only if they have a rank and that rank is at or within the requested paddler count. An athlete with no rank SHALL NOT be promoted.

#### Scenario: An athlete has no rank
- **WHEN** an athlete in the source phase has no rank
- **THEN** that athlete is not promoted, regardless of the requested paddler count

#### Scenario: An athlete's rank is within the requested count
- **WHEN** an athlete's rank in the source phase is at or within the requested paddler count
- **THEN** that athlete is promoted

### Requirement: A tie at the cutoff rank promotes every tied athlete
When more than one athlete shares the rank at the requested paddler count's cutoff, every athlete sharing that rank SHALL be promoted, even if that means more athletes are promoted than the requested count.

#### Scenario: Two athletes tie at the cutoff rank
- **WHEN** two athletes share the rank at the requested paddler count's cutoff
- **THEN** both athletes are promoted

### Requirement: Promoted athletes are distributed into the new heats by rank
Promoted athletes SHALL be split as evenly as possible across the requested new heats, ordered by rank so that the heat listed first receives the lowest-ranked group of promoted athletes and the heat listed last receives the highest-ranked group.

#### Scenario: More promoted athletes than heats
- **WHEN** more athletes are promoted than there are new heats
- **THEN** athletes are split as evenly as possible across the heats, with the first-listed heat receiving the lowest-ranked group

### Requirement: The new phase inherits configuration from the source phase unless overridden
The new phase's run count, scoring-run count, and judge count SHALL each use the value given in the promotion request when one is given, and otherwise use the source phase's value. The new phase's scoresheet SHALL always be the source phase's scoresheet.

#### Scenario: No overrides given
- **WHEN** a phase promotion request gives no run count, scoring-run count, or judge count
- **THEN** the new phase uses the source phase's run count, scoring-run count, judge count, and scoresheet

#### Scenario: An override is given
- **WHEN** a phase promotion request gives a run count, scoring-run count, or judge count
- **THEN** the new phase uses the given value instead of the source phase's

### Requirement: New heats belong to the source phase's competition
Every heat created by a phase promotion SHALL belong to the same competition as the source phase.

#### Scenario: Heats are created during promotion
- **WHEN** a phase promotion creates new heats
- **THEN** those heats belong to the source phase's competition

### Requirement: The promotion request body must be wrapped under a request_body key
A phase promotion request SHALL wrap its phase, heat, and paddler-count details under a `request_body` key. A request missing this wrapper SHALL be rejected as a validation error.

#### Scenario: The wrapper is missing
- **WHEN** a phase promotion request's body is not wrapped under a `request_body` key
- **THEN** the request is rejected as a validation error
