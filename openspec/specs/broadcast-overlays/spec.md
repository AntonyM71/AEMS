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
The control state SHALL carry independent boolean flags (`showImageCard`, `showEventTitle`, `showHeatSummary`, `showPhaseResults`, `showLiveRunScore`, `showAthleteOverview`, `showCompetitionOverview`) that the operator can flip one at a time without affecting the others.

#### Scenario: Operator toggles a flag
- **WHEN** the operator clicks a visibility toggle button on the controller
- **THEN** only that flag's value is inverted in the emitted control state

### Requirement: Some toggles require a prerequisite selection
Toggling `showEventTitle`, `showHeatSummary`, or `showPhaseResults` on SHALL require, respectively, a selected event, heat, or phase. Toggling `showLiveRunScore` or `showAthleteOverview` on SHALL require a selected athlete. Toggling `showCompetitionOverview` on SHALL require a selected competition. When the required selection is missing, the controller SHALL show an error message instead of changing the flag. Turning a flag that is already on off SHALL NOT require a selection.

#### Scenario: Toggling heat summary without a selected heat
- **WHEN** the operator clicks "Show Heat Summary Modal" with no heat selected
- **THEN** the controller shows an error message and `showHeatSummary` is not changed

#### Scenario: Toggling the athlete overview without a selected athlete
- **WHEN** the operator clicks "Show Athlete Overview" with no athlete selected
- **THEN** the controller shows an error message and `showAthleteOverview` is not changed

#### Scenario: Toggling the competition overview without a selected competition
- **WHEN** the operator clicks "Show Competition Overview" with no competition selected
- **THEN** the controller shows an error message and `showCompetitionOverview` is not changed

#### Scenario: Turning a graphic off without its selection
- **WHEN** a graphic is on and its required selection is no longer present
- **THEN** clicking its toggle turns it off without an error message

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

### Requirement: Fullscreen overlays draw Paddle Worldwide-coloured fallback backdrops that contrast with their text
In fallback mode, the fullscreen broadcast overlays (event title, heat summary, phase results, athlete overview, run corner, competition overview) SHALL draw their own backdrops with plain page styling and no external assets. The backdrops SHALL use the Paddle Worldwide primary colours, orange and black, with simple gradients and the brand's tints. The alternate colour SHALL be Paddle Worldwide orange. Every line of overlay text SHALL sit on a panel it contrasts with over any live video: white text on a black panel, and black text on a light panel or on a box in the alternate colour.

#### Scenario: Scoreboard overlay in fallback mode
- **WHEN** the heat summary or phase results overlay is visible in fallback mode
- **THEN** its heading is drawn on a black band, its page count (when it has more than one page) on a black panel, and each athlete's name on a light panel unless they are the athlete on the water

#### Scenario: Heat summary in fallback mode
- **WHEN** the heat summary overlay is visible in fallback mode
- **THEN** the heat name is drawn on a black band and the event and phase names on a light band beside it; each athlete's bib is drawn in a tile of the alternate colour, and their name and affiliation on a light band, or on a black band for the athlete on the water

#### Scenario: Phase results in fallback mode
- **WHEN** the phase results overlay is visible in fallback mode
- **THEN** the event name is drawn on a black band, the phase name in a tile of the alternate colour and the run format on a light band; each row's rank is drawn on a black tile, its name, affiliation and run scores on a light panel, and its total in a box of the alternate colour

#### Scenario: Event title in fallback mode
- **WHEN** the event title overlay is visible in fallback mode
- **THEN** the competition name is drawn on a dark strip, the event name on a black band, the phase name in a tile of the alternate colour, and the run format on a light band

#### Scenario: Lower third in fallback mode
- **WHEN** the athlete overview or run corner is visible in fallback mode
- **THEN** its name and event rows are drawn on a black panel, its run or clock row on a light panel, and its bib tile and score box in the alternate colour

#### Scenario: Competition overview in fallback mode
- **WHEN** the competition overview is visible in fallback mode
- **THEN** the competition name is drawn on a black band, the rail of events or heats on a light band, and the current entry in the alternate colour

#### Scenario: Text on the alternate colour
- **WHEN** a bib tile, phase tile, total or live-score box is drawn in the alternate colour
- **THEN** its text is black, not white

### Requirement: Fallback layouts apply only in fallback mode
The event title, heat summary and phase results SHALL use the fallback layouts described in this spec only while their overlay is in fallback mode. When the overlay plays its graphics-pack frame sequence, and on the arena, they SHALL keep their existing layout and text.

#### Scenario: Graphics pack available
- **WHEN** the heat summary overlay is shown and its graphics-pack frames load
- **THEN** the heat's athletes are shown in the existing table registered to the artwork

#### Scenario: Arena
- **WHEN** the arena shows the phase results
- **THEN** they are shown in the existing table

#### Scenario: Graphics server returns mid-event
- **WHEN** an overlay that was in fallback mode leaves it on a later show because its graphics now load
- **THEN** it shows its existing layout over the frame sequence

### Requirement: Fallback text states the run format as a sentence
In fallback mode, the event title and phase results SHALL describe the phase's run format as one sentence built from its number of runs and number of scoring runs, with no "Runs :" or "Scoring runs :" labels:
- when every run counts: "<runs> runs, all count toward the total";
- when one run counts: "<runs> runs, the best one counts toward the total";
- otherwise: "<runs> runs, best <scoring runs> count toward the total".

A phase with a single run SHALL use "1 run" in place of "<runs> runs".

#### Scenario: Best two of three
- **WHEN** a phase has 3 runs and 2 scoring runs
- **THEN** the run format reads "3 runs, best 2 count toward the total"

#### Scenario: Every run counts
- **WHEN** a phase has 2 runs and 2 scoring runs
- **THEN** the run format reads "2 runs, all count toward the total"

#### Scenario: Best single run
- **WHEN** a phase has 3 runs and 1 scoring run
- **THEN** the run format reads "3 runs, the best one counts toward the total"

### Requirement: The fallback event title and competition overview stack down the left edge
In fallback mode, the competition overview and the event title SHALL be placed down the left edge of the frame, on the same left edge as the athlete overview lower third: the competition overview below the space reserved for the ICF logo, and the event title slate below the competition overview. None of the three, nor the lower third, SHALL overlap another.

From top to bottom, the slate SHALL show the competition name in a small strip; the event name as the largest text, with the phase name in a tile beside it; and the run-format sentence. It SHALL NOT show "Event :" or "Phase :" labels.

#### Scenario: Selected event and phase
- **WHEN** the event title is visible in fallback mode for the K1 Men semi-final of a 3-run phase with 2 scoring runs
- **THEN** it shows the competition name, "K1 Men" with "Semi-final" in the tile beside it, and "3 runs, best 2 count toward the total"

#### Scenario: Overview and title shown together
- **WHEN** the competition overview and the event title are both visible in fallback mode
- **THEN** the competition overview sits above the event title on the same left edge and neither overlaps the other

### Requirement: The fallback heat summary lists the heat's athletes in two columns
In fallback mode, the heat summary SHALL show a header with the heat name, and the event and phase names of the heat's own phase. Below it, the heat's athletes SHALL be shown as tiles in two columns, in the same bib order the heat list uses, filling the first column top to bottom before the second. Each tile SHALL show the athlete's bib, first name, upper-cased last name and affiliation. A page SHALL hold up to 10 athletes; a heat with more SHALL rotate through pages on the same interval as the broadcast table and show the current page and page count.

#### Scenario: Heat of eight
- **WHEN** the heat summary is visible in fallback mode for a heat of 8 athletes
- **THEN** the first column shows the 1st to 4th athletes, the second column the 5th to 8th, and no page count is shown

#### Scenario: Heat of twelve
- **WHEN** the heat summary is visible in fallback mode for a heat of 12 athletes
- **THEN** the first page shows the first 10 athletes with "Page 1/2", and after the page interval the last 2 with "Page 2/2"

### Requirement: The fallback heat summary marks the athlete on the water
In fallback mode, when the overlay's selected athlete is in the heat being shown, the heat summary SHALL draw that athlete's tile on a black band labelled "On the water", with the label in Paddle Worldwide Bright Blue. No other tile SHALL carry the label.

#### Scenario: Selected athlete in this heat
- **WHEN** the selected athlete is in the heat and the heat summary is visible in fallback mode
- **THEN** only that athlete's tile is drawn on a black band and labelled "On the water" in Bright Blue

#### Scenario: No athlete selected
- **WHEN** no athlete is selected, or the selected athlete is in another heat
- **THEN** no tile is labelled "On the water"

### Requirement: Phase results show "-" for a run nobody has scored
The phase results table SHALL show, for each run in the phase, the run's score to two decimal places, "DNS" for a did-not-start run, or "-" for a run with no score yet. A run has no score yet when the phase scores list it with no judge scores and it is not locked, even though they give it a score of 0. A locked run with no judge scores was ridden without a scored move, so it SHALL show its score.

#### Scenario: Unridden third run
- **WHEN** a phase has 3 runs and an athlete has judge scores for runs 1 and 2 only
- **THEN** the athlete's run 3 cell shows "-", not "0.00"

#### Scenario: Ridden run that scored nothing
- **WHEN** the judges scored an athlete's run and its mean score is 0
- **THEN** that run's cell shows "0.00"

#### Scenario: Locked run with no scored moves
- **WHEN** the head judge locks an athlete's run that no judge recorded a move for
- **THEN** that run's cell shows "0.00"

### Requirement: The fallback phase results are a leaderboard that marks counting runs
In fallback mode, the phase results SHALL show a header with the event name, the phase name in a tile, and the run-format sentence, then one row per athlete in the order the phase scores return. Each row SHALL show the athlete's rank, first name, upper-cased last name and affiliation, one cell per run in the phase in run order, and the phase total. It SHALL NOT show the bib.

A run cell SHALL show the run's score to two decimal places, "DNS" for a did-not-start run, or "-" for a run with no score yet, as the phase results table does. The scored runs that count toward the total, the phase's number of scoring runs with the highest scores, SHALL be shown in bold. Every other run cell, including "DNS" and "-", SHALL be shown in a muted colour. When two runs tie for the last counting place, the earlier run SHALL count.

A page SHALL hold up to 8 rows; a phase with more athletes SHALL rotate through pages on the same interval as the broadcast table and show the current page and page count.

#### Scenario: Best two of three
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete scored 812.50, 1040.00 and 986.25
- **THEN** 1040.00 and 986.25 are bold, 812.50 is muted, and the total shows 2026.25

#### Scenario: A did-not-start run
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete scored 890.00 and 905.50 and did not start their third run
- **THEN** both scored runs are bold and "DNS" is muted

#### Scenario: Run not yet scored
- **WHEN** a phase has 3 runs and 2 scoring runs, and an athlete has judge scores for their first run only
- **THEN** their second and third run cells each show a muted "-", and only the first run is bold

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

### Requirement: The competition overview shows the competition's events or heats with the current one marked
The broadcast overlay SHALL show a competition overview while `showCompetitionOverview` is true. It SHALL show the selected competition's name with "Events" or "Heats" beneath it, matching `competitionOverviewList`. Below that, it SHALL show a rail of that competition's events or heats as a single row of named steps, in name order with numbers compared numerically, so "Heat 2" comes before "Heat 10". The step for the selected event or heat SHALL be bold and in the alternate colour, and steps before it SHALL be muted. When no event or heat in the list is selected, no step SHALL be marked.

#### Scenario: Listing events
- **WHEN** `competitionOverviewList` is "events" and the competition has the events "Men's K1", "Women's K1" and "Men's C1", with "Women's K1" selected
- **THEN** the overview shows the competition name, "Events", and the rail "Men's C1", "Men's K1", "Women's K1", with "Women's K1" marked as current and the two before it muted

#### Scenario: Listing heats in number order
- **WHEN** `competitionOverviewList` is "heats" and the competition has heats "Heat 1", "Heat 2" and "Heat 10", with "Heat 2" selected
- **THEN** the rail shows "Heat 1", "Heat 2", "Heat 10" in that order, with "Heat 2" marked as current

### Requirement: Long competition overview lists show a window around the current entry
When the competition overview's list has more than 8 entries, the rail SHALL show 8 consecutive entries chosen to keep the current entry in view with entries either side of it where the list allows, and SHALL end with a note giving the range shown and the total, such as "4–11 of 12". With 8 or fewer entries, it SHALL show them all and no note.

#### Scenario: Current heat in the middle of a long list
- **WHEN** the list has 12 heats and "Heat 7" is selected
- **THEN** the rail shows "Heat 4" to "Heat 11" and the note "4–11 of 12"

#### Scenario: Current heat near the end
- **WHEN** the list has 12 heats and "Heat 12" is selected
- **THEN** the rail shows "Heat 5" to "Heat 12" and the note "5–12 of 12"

### Requirement: The competition overview uses frame-sequence graphics with a fallback backdrop
The competition overview SHALL be presented through a fullscreen frame-sequence overlay with the graphics-pack config `competitionOverview`, and in fallback mode SHALL draw its own Paddle Worldwide-coloured backdrop with no external assets.

#### Scenario: No graphics pack for the competition overview
- **WHEN** the graphics server has no `competitionOverview` config and the operator shows the competition overview
- **THEN** the overview is shown over its fallback backdrop

### Requirement: The operator chooses what the competition overview lists
The control state SHALL carry `competitionOverviewList`, either "events" or "heats", defaulting to "events". The controller SHALL let the operator switch it, and SHALL relay the choice with the rest of the control state.

#### Scenario: Switching to heats
- **WHEN** the operator chooses "Heats" for the competition overview in the controller
- **THEN** the emitted control state carries `competitionOverviewList` "heats" and the overlay's rail lists the competition's heats

### Requirement: The athlete overview lower third shows the athlete's runs and total
The broadcast overlay SHALL show an athlete overview lower third while `showAthleteOverview` is true. It SHALL be laid out as follows:
- the selected athlete's bib in a tile spanning both rows;
- a first row with the athlete's first name, upper-cased last name and affiliation as text;
- a second row with one cell for every run in the athlete's phase, in run order, each labelled "Run n" above its score, so the graphic keeps one width as runs are scored;
- the athlete's total, labelled "Total", at the end of the second row in a box of the alternate colour.

A run is final once the head judge locks it or marks it did-not-start. A run that is not final SHALL show "-" instead of its score, so a partly judged score never goes to air. A did-not-start run SHALL show "DNS" in a muted colour. The total SHALL be the sum of the athlete's best final run scores, up to the phase's number of scoring runs, with a did-not-start run counting as zero. Once every run in the athlete's phase is marked did-not-start, the total SHALL show "DNS" instead.

#### Scenario: Athlete with two locked runs
- **WHEN** the operator shows the athlete overview for an athlete in a phase with two scoring runs, whose locked runs scored 340.00 and 512.50
- **THEN** the lower third shows the athlete's bib, name and affiliation, a "Run 1" cell with 340.00 and a "Run 2" cell with 512.50, and 852.50 in the highlighted "Total" box

#### Scenario: A run still being judged
- **WHEN** one of the athlete's runs has scores but is not yet locked
- **THEN** that run's cell shows "-" and the run does not count towards the total

#### Scenario: Before any run is final
- **WHEN** the operator shows the athlete overview for an athlete in a three-run phase with no final runs
- **THEN** the lower third shows "Run 1", "Run 2" and "Run 3" cells, each with "-"

#### Scenario: A locked run that scored nothing
- **WHEN** the head judge locks an athlete's run that has no scored moves
- **THEN** that run's cell shows "0.00", not "-" or "DNS", and the run counts as zero towards the total

#### Scenario: A did-not-start run
- **WHEN** one of the athlete's runs is marked did-not-start
- **THEN** that run's cell shows "DNS"

#### Scenario: Every run did-not-start
- **WHEN** every run in the athlete's three-run phase is marked did-not-start
- **THEN** each run's cell and the "Total" box show "DNS", not "0.00"

#### Scenario: Did-not-start runs with a run still to ride
- **WHEN** an athlete in a three-run phase has runs 1 and 2 marked did-not-start and run 3 not yet final
- **THEN** runs 1 and 2 show "DNS", run 3 shows "-", and the total shows "0.00", because run 3 may still be ridden

#### Scenario: A newly locked run appears without a reload
- **WHEN** the head judge locks a run, or marks it did-not-start, while the athlete overview is visible
- **THEN** the run's score or "DNS" replaces its "-", and the updated total appears, as soon as the lock is broadcast, without the operator reloading or re-showing it

### Requirement: The run corner shows who is running, the time left and the live score
The broadcast overlay SHALL show a run corner in the lower right of the screen while `showLiveRunScore` is true. It SHALL have three rows:
1. the selected athlete's affiliation as text, then their name;
2. the seconds remaining in the run, a bar showing the fraction of the run left, and the live run score labelled "Live" in a box of the alternate colour;
3. the selected event's name, the selected heat's name, and the run counter as "Run x/y".

The time remaining, the bar and the live run score SHALL update as the timer and judges' scores change. The live run score SHALL show "DNS" for a did-not-start run. The bar SHALL measure the run against its full length: 60 seconds when more than 45 seconds remain at any point, otherwise 45 seconds, matching the Timer's two modes. The seconds and the bar SHALL turn the warning colour once 10 seconds or fewer remain, matching the Timer's 10-second warning buzz.

#### Scenario: Athlete mid-run
- **WHEN** the operator shows the live run score for an athlete on run 2 of 3 in "Heat 2" of "Men's K1" with 36 seconds left and a live score of 90.00
- **THEN** the run corner shows the athlete's affiliation and name, "36" with the bar at 36/45 full, "90.00" in the "Live" box, and "Men's K1", "Heat 2" and "Run 2/3"

#### Scenario: Timer counts down
- **WHEN** the timer stream reports a lower time remaining
- **THEN** the run corner's seconds and bar update to the new value

#### Scenario: Squirt-mode run
- **WHEN** the timer stream reports 52 seconds remaining
- **THEN** the bar measures the run against 60 seconds

#### Scenario: Final ten seconds
- **WHEN** 10 or fewer seconds remain
- **THEN** the seconds and the bar are drawn in the warning colour

### Requirement: The athlete overview and run corner use frame-sequence graphics with fallback backdrops
The athlete overview and run corner SHALL each be presented through a fullscreen frame-sequence overlay, with graphics-pack configs named `athleteOverview` and `runCorner` respectively. In fallback mode, each SHALL draw Paddle Worldwide-coloured backdrops with no external assets: the name rows and the run corner's event row on a black panel, the overview's run row and the corner's clock row on a light panel, and the bib tile and the total and live-score boxes in the alternate colour.

#### Scenario: No graphics pack for the athlete overview
- **WHEN** the graphics server has no `athleteOverview` config and the operator shows the athlete overview
- **THEN** the lower third is shown over its fallback backdrop
