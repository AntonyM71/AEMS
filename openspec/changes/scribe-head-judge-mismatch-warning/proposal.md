# Proposal

## Why

A scribe who is on a different athlete, run or heat from the head judge scores the wrong run
without noticing. Nothing on the scribe screen says the head judge has moved on (#504).

## What Changes

- The scribe screen listens to the head judge's published position and shows a warning alert
  above the move cards when the scribe's heat, athlete or run differs from it.
- The alert names where the head judge is and where the scribe is, and offers one button that
  moves the scribe there. When the heat differs the button switches competition and heat first.

## Capabilities

### Modified Capabilities

- `judging-workflow`: adds a requirement that the scribe screen warns on a mismatch with the
  head judge's position and lets the scribe correct it in one tap.

## Impact

- **Webapp**: a new `HeadJudgeMismatchBanner` in `components/roles/scribe/`, rendered by `Scribe.tsx`.
- **Server / API contract**: none. It reuses the existing `head_judge_selection` channel.
