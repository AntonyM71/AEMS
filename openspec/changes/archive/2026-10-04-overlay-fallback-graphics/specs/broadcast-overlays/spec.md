# Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Wrapped content is hidden while the frame sequence is animating
A `PixiFrameSequenceOverlay`'s child content SHALL be hidden while its frame sequence is loading, playing its intro, or playing its outro, and shown only once the sequence is visible and holding. An overlay in fallback mode has no frame sequence to wait for, so it SHALL show its child content whenever `isVisible` is true. An overlay given no frame source at all (no `configName`, `basePath`/`frameCount`, or `frameUrls`) SHALL also show its child content whenever `isVisible` is true, without entering fallback mode.

#### Scenario: Intro still playing
- **WHEN** the frame sequence is in its intro phase
- **THEN** the wrapped children are not shown

#### Scenario: No frame source configured
- **WHEN** an overlay is given no `configName`, `basePath`/`frameCount`, or `frameUrls`, and `isVisible` is true
- **THEN** the wrapped children are shown and the overlay is not in fallback mode
