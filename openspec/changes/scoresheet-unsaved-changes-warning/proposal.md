# Proposal

## Why

Scoresheet builder edits live only in the page until the operator presses "Update Scoresheet". Nothing signals that the edits are still pending, so an operator can leave the page, switch scoresheets, or reload and lose work without noticing (issue #370).

## What Changes

- Show a visible "unsaved changes" warning in the scoresheet builder whenever its moves and bonuses differ from the saved scoresheet. Undoing an edit by hand clears the warning, and so does a successful save. A failed save leaves it showing.
- While edits are unsaved, ask the operator to confirm before they leave the scoresheet. That covers reloading or closing the page, navigating elsewhere in the app, and switching to or creating another scoresheet.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `scoresheet-builder`: adds requirements for flagging unsaved edits and for confirming before the operator leaves a scoresheet with unsaved edits.

## Impact

- Webapp only: the scoresheet builder component, its page component, and their tests. No API, schema, or server changes.
