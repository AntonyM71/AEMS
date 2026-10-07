# Spec Delta

## ADDED Requirements

### Requirement: Wrapped overlay content starts afresh each time it is shown
Each time a `PixiFrameSequenceOverlay` shows its wrapped content, or its fallback content, after it was hidden, that content SHALL start afresh: a table that rotates through pages SHALL open on its first page, whatever page it reached while hidden or while the intro played. Hiding the content SHALL NOT restart it, so it keeps its current page while it leaves the screen, including during a fallback overlay's exit hold.

#### Scenario: Shown again after being hidden
- **WHEN** a multi-page table inside an overlay has advanced to page 2, the overlay is hidden for longer than the page interval, and the overlay is then shown again
- **THEN** the table shows page 1

#### Scenario: Intro longer than the page interval
- **WHEN** an overlay with a multi-page table becomes visible and its intro plays for longer than the page interval
- **THEN** the table shows page 1 when the content appears at the hold frame

#### Scenario: Being hidden
- **WHEN** an overlay showing page 2 of a multi-page table is hidden
- **THEN** the table keeps showing page 2 while the content leaves the screen

#### Scenario: Hidden and shown again in fallback mode
- **WHEN** an overlay in fallback mode shows page 2 of a multi-page table and is hidden
- **THEN** the table keeps showing page 2 until the fallback exit time has passed, and shows page 1 when the overlay is next shown
