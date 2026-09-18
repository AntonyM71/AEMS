# Spec Delta

## MODIFIED Requirements

### Requirement: Resolved ties report a human-readable reason
When a tie between athletes is resolved by a tie-break criterion, the result SHALL include a reason naming the deciding criterion and the scores of every athlete who was still tied going into that criterion — not only the two athletes immediately adjacent in finish order. Athletes named in the reason SHALL be listed in their true finish order, even when two or more of them share the same value at the deciding criterion and are only separated by a later criterion.

#### Scenario: Tie resolved by a run
- **WHEN** a tie is resolved because one athlete's highest scoring run beats the others'
- **THEN** the reported reason names "highest scoring run" and shows every still-tied athlete's score for it, including any who were pairwise distinct from each other but shared no earlier separation

#### Scenario: A wider field shares the deciding value
- **WHEN** three or more athletes are tied and two of them share the same value at the deciding criterion while a third has a different value
- **THEN** the reported reason names all of them, not just the athlete and its nearest rival in finish order

#### Scenario: Named athletes sharing a value are still in finish order
- **WHEN** two athletes share the same value at the deciding criterion but are ultimately separated by a later criterion
- **THEN** the reported reason lists the better-placed of the two before the worse-placed one, regardless of the order they were supplied in
