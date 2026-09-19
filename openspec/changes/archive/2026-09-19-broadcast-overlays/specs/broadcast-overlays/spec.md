# Spec Delta

## Purpose

Lets an operator select what to show and drive a shared control state that the fullscreen broadcast overlay (Pixi-composited over animated frame-sequence backgrounds) and the arena venue screen both render from, over a common Socket.IO channel.

## ADDED Requirements

### Requirement: Operator selection drives what the overlay can show
The controller SHALL derive its broadcast selection fields (competition, event, phase, heat, athlete, run) from the operator's existing competition/scoring selection, and SHALL re-derive them whenever that selection changes.

#### Scenario: Pre-selected competition, event, and heat
- **WHEN** the operator already has a competition, event, and heat selected before the controller mounts
- **THEN** the first broadcast_control emission includes those selections

### Requirement: Independent visibility toggles
The control state SHALL carry independent boolean flags (`showImageCard`, `showEventTitle`, `showHeatSummary`, `showPhaseResults`, `showLiveRunScore`, `showTimer`) that the operator can flip one at a time without affecting the others.

#### Scenario: Operator toggles a flag
- **WHEN** the operator clicks a visibility toggle button on the controller
- **THEN** only that flag's value is inverted in the emitted control state

### Requirement: Some toggles require a prerequisite selection
Toggling `showEventTitle`, `showHeatSummary`, or `showPhaseResults` on SHALL require, respectively, a selected event, heat, or phase; when that selection is missing, the controller SHALL show an error message instead of changing the flag.

#### Scenario: Toggling heat summary without a selected heat
- **WHEN** the operator clicks "Show Heat Summary Modal" with no heat selected
- **THEN** the controller shows an error message and `showHeatSummary` is not changed

### Requirement: Control state is relayed to every connected client, including the sender
The server SHALL re-broadcast a `broadcast_control` Socket.IO message, on the `/broadcast_control` namespace, to every connected client on that namespace, without excluding the client that sent it.

#### Scenario: Server relays a control message
- **WHEN** a client emits a `broadcast_control` message
- **THEN** every client connected to the `/broadcast_control` namespace, including the sender, receives that message

### Requirement: New subscribers see a default control state before the first broadcast
A client subscribing to the broadcast control stream before any `broadcast_control` message has arrived SHALL receive a default state (`showImageCard` true, every other visibility flag false, all selections empty, `selectedRun` 0) rather than an empty or undefined value.

#### Scenario: Subscribing before any operator action
- **WHEN** a client subscribes to the broadcast control stream and no message has yet been relayed
- **THEN** it reads the default overlay control state

### Requirement: The controller closes its broadcast socket on unmount
The `OverlayController` component SHALL disconnect its `broadcast_control` socket connection when it unmounts.

#### Scenario: Controller unmounts
- **WHEN** the `OverlayController` component unmounts
- **THEN** its `broadcast_control` socket connection is disconnected

### Requirement: The overlay and the arena both gate the same modals from the same relayed state
The fullscreen broadcast overlay page and the arena venue-screen page SHALL each show or hide their heat-summary, phase-results, and event-title displays according to the `showHeatSummary`, `showPhaseResults`, and `showEventTitle` flags of the same control state relayed from the server, independent of which page the operator's controller instance is paired with.

#### Scenario: Operator toggles heat summary on the controller
- **WHEN** the operator selects a heat and turns on "Show Heat Summary Modal"
- **THEN** the arena page, subscribed to the same broadcast_control stream, displays that heat's summary

#### Scenario: Operator toggles heat summary off
- **WHEN** the operator turns "Show Heat Summary Modal" back off
- **THEN** the heat summary is no longer displayed on the arena page

### Requirement: Relayed selections sync into local state without clearing unset fields
`useSyncOverlaySelectionState` SHALL dispatch a relayed selection field (competition, event, phase, heat) into local Redux state only when that field is non-empty, and SHALL always dispatch the relayed run number.

#### Scenario: An empty relayed field does not overwrite local state
- **WHEN** the relayed control state has an empty `selectedCompetition`
- **THEN** the local Redux `selectedCompetition` is left unchanged

### Requirement: The arena always displays the selected athlete, run, and live score
The arena page SHALL render the current athlete's info, run number, and live run score once a heat and athlete are selected in the relayed control state, without requiring a separate visibility toggle for those cards.

#### Scenario: Operator pushes an athlete and heat to the arena
- **WHEN** the broadcast control state carries a selected heat and athlete
- **THEN** the arena page shows that athlete's surname and the heat's summary content once requested

### Requirement: The live score card shows DNS for a did-not-start run
The live run score display SHALL show "DNS" instead of a numeric score when the run status for the displayed athlete's run is marked `did_not_start`.

#### Scenario: Head judge marks the run as did-not-start
- **WHEN** a run-status update for the currently displayed athlete's run sets `did_not_start` true
- **THEN** the live score display changes from a numeric value to "DNS"

### Requirement: Pixi frame-sequence overlays play an intro, hold, and outro
A `PixiFrameSequenceOverlay` SHALL preload every frame of its sequence, then play frames from the first frame to its configured hold frame when `isVisible` becomes true, hold on that frame, and play from the hold frame to the last frame when `isVisible` becomes false, calling `onExitComplete` once the outro finishes.

#### Scenario: Becoming visible
- **WHEN** `isVisible` changes from false to true
- **THEN** the sequence plays from its first frame up to the configured hold frame and then holds there

#### Scenario: Becoming hidden while holding
- **WHEN** `isVisible` changes from true to false while the sequence is holding
- **THEN** the sequence plays from the frame after the hold frame to the last frame and then calls `onExitComplete`

#### Scenario: Becoming hidden mid-intro
- **WHEN** `isVisible` changes from true to false before the intro reaches the hold frame
- **THEN** the intro finishes reaching the hold frame before the outro begins

### Requirement: Wrapped content is hidden while the frame sequence is animating
A `PixiFrameSequenceOverlay`'s child content SHALL be hidden while its frame sequence is loading, playing its intro, or playing its outro, and shown only once the sequence is visible and holding.

#### Scenario: Intro still playing
- **WHEN** the frame sequence is in its intro phase
- **THEN** the wrapped children are not shown

### Requirement: Frame sources resolve from a named config, with local props as fallback
When given a `configName`, a `PixiFrameSequenceOverlay` SHALL fetch frame metadata from `{configEndpointBase}/{configName}` (default base `/componentInfo`, matching the GraphicsServer's `/componentInfo/{name}` contract) and resolve its frame URLs from that response's `path` or `frameUrls`; without a `configName`, it SHALL fall back to locally supplied `basePath`/`frameCount`/`frameUrls` props.

#### Scenario: Config-driven frame source
- **WHEN** a `configName` is provided
- **THEN** frame URLs are resolved from the JSON fetched at `{configEndpointBase}/{configName}`

#### Scenario: Local fallback frame source
- **WHEN** no `configName` is provided but `basePath` and `frameCount` are
- **THEN** frame URLs are built locally as `{basePath}/{fileNamePrefix}{paddedIndex}.{fileExtension}`

### Requirement: Card layout geometry is supplied by the active theme
Shared broadcast Card components (`AemsBasicTable`, `AemsHeatSummary`, `AemsPhaseResults`, `AemsEventTitle`) SHALL read their layout geometry — table page size, empty-row padding, title alignment, artwork-clearance spacing, heading position and type scale — from theme component `defaultProps`, so the same component renders frame-registered layout under the overlay's theme and content-flow layout under the arena's theme without branching in the component.

#### Scenario: Same component, different theme
- **WHEN** `HeatSummaryTable` is rendered under the overlay theme versus the arena theme
- **THEN** its title alignment and artwork-clearance spacing differ according to each theme's `AemsHeatSummary` defaultProps

### Requirement: The broadcast table paginates and auto-rotates
`BasicTable` SHALL split its rows into pages of its configured page limit and automatically advance to the next page on a fixed interval, clearing that interval when it unmounts.

#### Scenario: More rows than the page limit
- **WHEN** the table has more rows than its page limit
- **THEN** only the current page's rows are shown, and the footer reports the current page and total page count

#### Scenario: Interval elapses
- **WHEN** the configured page-change time elapses
- **THEN** the table advances to the next page, wrapping back to the first page after the last

### Requirement: Sliding containers mount children only while shown
`SlidingModal` and `SlidingWrapper` SHALL render their children only while their `show` prop is true, removing them from the document when `show` is false.

#### Scenario: Shown
- **WHEN** `show` is true
- **THEN** the children are present in the document

#### Scenario: Hidden
- **WHEN** `show` is false
- **THEN** the children are not present in the document
