# Proposal

## Why

`docs/superpowers/specs/2026-09-07-explainable-tiebreak-messages-design.md` (being retired along with the rest of `docs/superpowers/`, now that OpenSpec owns specs) recorded a domain assumption that isn't yet in `openspec/specs/scoring/spec.md`: a phase's configured run count implicitly encodes its ICF feature type, and the tie-break engine's precedence order relies on that encoding rather than modeling feature type explicitly. This is worth keeping — it explains why the tie-break walk is correct for 2- and 3-run phases and flags that 4+ runs is uncharted territory relative to the ICF rules.

## What Changes

- Add a requirement to the `scoring` capability documenting that tie-break precedence walks every run position the phase has, in order, before falling back to highest scoring move — and that this is a deliberate substitute for modeling ICF feature type explicitly, verified correct for 2- and 3-run phases (the only ones freestyle kayaking currently uses).

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `scoring`: adds a requirement on how run count stands in for ICF feature type in tie-break precedence.

## Impact

Documentation only. No code changes.
