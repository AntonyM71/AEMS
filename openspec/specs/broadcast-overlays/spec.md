# broadcast-overlays Specification

## Purpose

Lets an operator select what to show and drive a shared control state that the fullscreen broadcast overlay (Pixi-composited over animated frame-sequence backgrounds) and the arena venue screen both render from, over a common Socket.IO channel.

## Requirements

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
A client subscribing to the broadcast control stream before any `broadcast_control` message has arrived SHALL receive a default state (`showImageCard` true, every other visibility flag false, `followHeadJudge` false, all selections empty, `selectedRun` 0) rather than an empty or undefined value.

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
A `PixiFrameSequenceOverlay`'s child content SHALL be hidden while its frame sequence is loading, playing its intro, or playing its outro, and shown only once the sequence is visible and holding. An overlay in fallback mode has no frame sequence to wait for, so it SHALL show its child content whenever `isVisible` is true. An overlay given no frame source at all (no `configName`, `basePath`/`frameCount`, or `frameUrls`) SHALL also show its child content whenever `isVisible` is true, without entering fallback mode.

#### Scenario: Intro still playing
- **WHEN** the frame sequence is in its intro phase
- **THEN** the wrapped children are not shown

#### Scenario: No frame source configured
- **WHEN** an overlay is given no `configName`, `basePath`/`frameCount`, or `frameUrls`, and `isVisible` is true
- **THEN** the wrapped children are shown and the overlay is not in fallback mode

### Requirement: Frame sources resolve from a named config, with local props as fallback
When given a `configName`, a `PixiFrameSequenceOverlay` SHALL fetch frame metadata from `{configEndpointBase}/{configName}` (default base `/componentInfo`, matching the GraphicsServer's `/componentInfo/{name}` contract) and resolve its frame URLs from that response's `path` or `frameUrls`; without a `configName`, it SHALL fall back to locally supplied `basePath`/`frameCount`/`frameUrls` props.

#### Scenario: Config-driven frame source
- **WHEN** a `configName` is provided
- **THEN** frame URLs are resolved from the JSON fetched at `{configEndpointBase}/{configName}`

#### Scenario: Local fallback frame source
- **WHEN** no `configName` is provided but `basePath` and `frameCount` are
- **THEN** frame URLs are built locally as `{basePath}/{fileNamePrefix}{paddedIndex}.{fileExtension}`

### Requirement: Overlays enter fallback mode when graphics are unavailable
A `PixiFrameSequenceOverlay` SHALL enter fallback mode when its graphics cannot be loaded. That covers three cases: its config request fails or returns a non-success status, any frame in its sequence fails to load, or the Pixi renderer fails to initialise. In fallback mode it SHALL NOT play a frame sequence. It SHALL instead show its wrapped content while `isVisible` is true and hide it while `isVisible` is false.

#### Scenario: Graphics server unreachable
- **WHEN** the request to `{configEndpointBase}/{configName}` fails or returns a non-success status and `isVisible` is true
- **THEN** the overlay is in fallback mode and its wrapped content is shown

#### Scenario: A frame fails to load
- **WHEN** the config loads but at least one of its frame URLs fails to load
- **THEN** the overlay enters fallback mode instead of playing the frame sequence

#### Scenario: Renderer fails to initialise
- **WHEN** the Pixi renderer fails to initialise
- **THEN** the overlay enters fallback mode and shows its wrapped content while `isVisible` is true

#### Scenario: Hidden in fallback mode
- **WHEN** `isVisible` changes from true to false while the overlay is in fallback mode
- **THEN** the wrapped content is hidden

### Requirement: Fullscreen overlays draw ICF-coloured fallback backdrops that contrast with their text
In fallback mode, the fullscreen broadcast overlays (event title, heat summary, phase results) SHALL draw their own backdrops with plain page styling and no external assets. The backdrops SHALL use ICF colours with simple gradients. White heading and footer text SHALL sit on a dark ICF-blue panel, and dark-blue table rows and run counts SHALL sit on a light panel, so every line of overlay text contrasts with the colour behind it over any live video.

#### Scenario: Scoreboard overlay in fallback mode
- **WHEN** the heat summary or phase results overlay is visible in fallback mode
- **THEN** its heading and page footer are drawn on a dark ICF-blue panel and its table header and rows on a light panel

#### Scenario: Event title in fallback mode
- **WHEN** the event title overlay is visible in fallback mode
- **THEN** the competition, event and phase names are drawn on a dark ICF-blue band and the run counts on a light band

### Requirement: Fallback backdrops transition in and out
A fullscreen overlay in fallback mode SHALL reveal its backdrop with an animated transition and then fade its text in when `isVisible` becomes true. When `isVisible` becomes false, it SHALL fade its text out and then remove its backdrop with an animated transition. When the viewer's system asks for reduced motion, both transitions SHALL be plain fades.

#### Scenario: Shown in fallback mode
- **WHEN** `isVisible` changes from false to true in fallback mode
- **THEN** the backdrop is revealed by an animated transition and the text fades in after it

#### Scenario: Hidden in fallback mode
- **WHEN** `isVisible` changes from true to false in fallback mode
- **THEN** the text fades out first and the backdrop then leaves by an animated transition

#### Scenario: Reduced motion
- **WHEN** the viewer's system asks for reduced motion
- **THEN** the backdrop and text appear and disappear with fades only

### Requirement: A fallback overlay reports exit completion
A `PixiFrameSequenceOverlay` in fallback mode SHALL call `onExitComplete` once its hide transition finishes after `isVisible` changes from true to false.

#### Scenario: Fallback overlay hidden
- **WHEN** `isVisible` changes from true to false while the overlay is in fallback mode
- **THEN** `onExitComplete` is called after the hide transition finishes

### Requirement: A fallback overlay retries its graphics on each show
A `PixiFrameSequenceOverlay` in fallback mode with a `configName` SHALL re-request its config each time `isVisible` changes from false to true. When the config and every frame then load successfully, it SHALL leave fallback mode and play its frame sequence on that and later shows.

#### Scenario: Graphics server comes back mid-event
- **WHEN** an overlay entered fallback mode because its config request failed, the graphics server then becomes reachable, and `isVisible` changes from false to true
- **THEN** the overlay re-requests its config and, once the config and frames load, leaves fallback mode and plays its frame sequence

#### Scenario: Graphics server still down
- **WHEN** a retried config request fails again
- **THEN** the overlay stays in fallback mode and shows its wrapped content

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

### Requirement: The controller offers a Follow head judge mode
The overlay controller SHALL offer a switch between Manual mode and Follow head judge mode, with Manual as the default, and SHALL carry the chosen mode in the emitted broadcast_control state as `followHeadJudge`.

In Follow head judge mode, the controller SHALL:
- disable its competition, heat, paddler, and run pickers, leaving the event and phase pickers usable;
- show an info message saying those pickers are disabled because the displays are following the head judge, naming the head judge's current athlete and run once known.

Switching mode SHALL NOT change any visibility flag.

#### Scenario: Switching to Follow
- **WHEN** the operator switches the controller to Follow head judge mode
- **THEN** the controller emits a broadcast_control state with `followHeadJudge` true and its visibility flags unchanged, and the competition, heat, paddler, and run pickers cannot be used while the event and phase pickers can

#### Scenario: The info message names the followed athlete
- **WHEN** the controller is in Follow head judge mode and the head judge is on an athlete's second run
- **THEN** the info message names that athlete and run 2

#### Scenario: Switching back to Manual
- **WHEN** the operator switches the controller from Follow head judge mode back to Manual
- **THEN** the controller emits a broadcast_control state with `followHeadJudge` false, the info message disappears, and every picker is usable again

### Requirement: Display pages follow the head judge's position when told to
When the most recent broadcast_control state has `followHeadJudge` true, the arena and broadcast overlay pages SHALL take the competition, heat, athlete, and run they display from the most recent position published on `/head_judge_selection`. They SHALL take everything else, including the event, phase, and visibility flags, from the broadcast_control state.

Until a head judge position has been received, they SHALL use the broadcast_control state's own selection. When `followHeadJudge` is false, they SHALL ignore the head judge's position entirely.

On entering follow, a display page SHALL request the head judge's current position, so that it does not wait for the head judge's next change.

#### Scenario: Head judge steps to the next paddler while followed
- **WHEN** `followHeadJudge` is true and the head judge steps to the next paddler
- **THEN** the arena page shows that paddler's surname, without the controller emitting anything

#### Scenario: Heat summary follows the head judge's heat
- **WHEN** `followHeadJudge` is true, `showHeatSummary` is true, and the head judge moves to a different heat
- **THEN** the arena's heat summary shows the head judge's new heat

#### Scenario: Phase results stay with the operator
- **WHEN** `followHeadJudge` is true and `showPhaseResults` is true
- **THEN** the arena's phase results show the phase selected on the controller, regardless of the head judge's selection

#### Scenario: Head judge changes paddler while in Manual mode
- **WHEN** `followHeadJudge` is false and the head judge steps to a different paddler
- **THEN** the arena page keeps showing the athlete from the broadcast_control state

#### Scenario: Follow switched on with no head judge position yet
- **WHEN** `followHeadJudge` becomes true and no head judge screen is open
- **THEN** the arena page keeps showing the broadcast_control state's athlete

#### Scenario: Follow switched on while a head judge is already on an athlete
- **WHEN** a head judge screen is open on an athlete and `followHeadJudge` becomes true
- **THEN** the arena page requests the head judge's position and shows that athlete, without the head judge changing anything

### Requirement: Display pages recover the current control state on connect
Every client that subscribes to the broadcast control stream SHALL request the current control state each time its `/broadcast_control` connection is established, including after a reconnect. An open overlay controller SHALL answer each request by emitting its current broadcast_control state again. With no controller open, the requester SHALL keep the default control state.

#### Scenario: Arena page reloads while the controller sits idle in Follow mode
- **WHEN** the controller is idle in Follow head judge mode, a head judge screen is on an athlete, and the arena page is reloaded
- **THEN** the arena page recovers `followHeadJudge` from the controller, requests the head judge's position, and shows the head judge's athlete

#### Scenario: Arena page reloads while the controller sits idle in Manual mode
- **WHEN** the controller has an athlete selected in Manual mode and is idle, and the arena page is reloaded
- **THEN** the arena page shows that athlete once it reconnects, without anyone touching the controller

#### Scenario: No controller is open
- **WHEN** a display page connects and requests the control state, and no controller is open
- **THEN** the display page keeps showing the default control state
