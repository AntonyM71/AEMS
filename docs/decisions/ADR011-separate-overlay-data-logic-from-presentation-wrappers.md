# Architectural Decision Record: Separating Overlay Data Logic From Presentation Wrappers

## Context:

The same competition data appears on several screens that look nothing alike: the broadcast overlay (animated artwork keyed over video), the arena venue screen (large, opaque, high-contrast panels), the head judge view, and a CSS fallback that the overlay draws when the graphics server is unavailable. An athlete's name, the live run score, the run counter, the timer, the heat start list and the phase results are each needed on two or more of these.

Each of those pieces has non-trivial data behaviour: queries keyed on the current selection, Socket.IO subscriptions, averaging scores across judges, locked and did-not-start states. The screens differ only in how that data is framed: animation, surface, size, position, and colours.

Over the last few changes a consistent way of handling this has emerged in the code, without being written down. New overlay work, starting with the athlete lower thirds, needs a rule to follow rather than a pattern to reverse-engineer.

## Options Considered:

### 1. One Component Per Screen

- Each screen fetches and renders its own copy of the data
- Free to diverge visually
- Duplicates subscriptions and scoring rules, which then drift. A fix to how a did-not-start run is shown has to be made in every copy.

### 2. One Component With Per-Screen Branches

- A single component takes a "variant" flag and switches layout, size and styling
- Keeps the data logic in one place
- Every new screen adds branches to every shared component, and a visual change for one screen risks another

### 3. Data Logic Components Wrapped by Presentation (Chosen Option)

- Logic components own data: they query, subscribe and compute, and render the result with minimal, unopinionated markup
- Presentation wrappers own framing: visibility, entry and exit animation, surface, position and backdrop. They contain no data access.
- Per-screen geometry and type scale come from the active theme, so a shared component reads its layout from the screen it is rendered on, without branching

## Decision:

We will build broadcast and venue-screen features as data logic components composed inside presentation wrappers.

- A logic component is responsible for one piece of data and its rules, such as the live run score or the time remaining. It takes the selection it needs as input and renders plain text, and has no opinion about where or how it appears.
- Where two screens need the same data in different markup, the data logic is extracted into a hook that both components call, rather than one screen reusing the other's markup.
- A presentation wrapper decides when and how content appears: the overlay's animated frame-sequence wrapper and its CSS fallback, the arena's sliding modals, or a simple container. Wrappers never fetch or compute competition data.
- Layout values that differ between screens, such as alignment, spacing, positions and type scale, are supplied through the theme each screen provides, not through props or branches in the shared component.

## Rationale:

### Data Rules Live in Exactly One Place:

Scoring and status rules (averaging across judges, locked runs, did-not-start) are the part most likely to be wrong and most costly to get wrong on air. Keeping them in one logic component or hook means a fix applies to every screen at once.

### Screens Can Change Without Touching Data:

The broadcast artwork is licensed separately and changes per event. Swapping a graphics pack, adding a fallback look, or re-laying out the arena only touches wrappers and themes, so data behaviour and its tests are unaffected.

### Tests Stay Focused:

Logic components and hooks can be tested against mocked API and socket data without rendering animations, and wrappers can be tested for visibility and timing without real data.

## Consequences:

### Positive:

- New screens and new overlay cards are assembled from existing logic components rather than rewritten
- The arena, the overlay and its fallback stay consistent in what they show
- Visual work and data work can proceed independently

### Negative:

- More, smaller components and hooks to find and name
- Some reshaping is needed when a logic component was written with presentation inside it, for example a score that renders its own labelled panel
- Theme-supplied geometry is less discoverable than inline props; readers must look at the screen's theme to see why a component is laid out as it is

## Review:

Revisit if a screen needs data behaviour that genuinely differs from the others (not just different framing), or if the number of theme-supplied layout settings grows to the point that a shared component's appearance can no longer be understood without reading every theme.
