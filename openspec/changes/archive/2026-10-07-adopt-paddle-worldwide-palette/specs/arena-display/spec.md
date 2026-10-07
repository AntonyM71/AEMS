## MODIFIED Requirements

### Requirement: Arena theme renders self-contained dark panels
The arena display SHALL render its cards as opaque dark grey panels on a solid black background, with white text, distinct from the broadcast overlay's transparent frame that composites the same cards over animated artwork. The arena SHALL use only black, white and greys, with none of the overlay's orange or secondary colours.

#### Scenario: Card renders as an opaque dark panel
- **WHEN** a card (e.g. the heat summary) renders on the arena
- **THEN** it has a solid dark grey background on a black page, rather than a transparent overlay panel

#### Scenario: Layout uses normal in-flow positioning
- **WHEN** a card's heading or divider renders on the arena
- **THEN** it lays out in normal document flow, not the overlay's absolutely-positioned frame chrome

#### Scenario: Tables size to their own content
- **WHEN** a table (e.g. phase results) renders on the arena
- **THEN** it sizes to its own content, without the overlay's fixed frame row heights, border rules, or blank padding rows
