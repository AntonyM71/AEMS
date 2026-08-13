# Architectural Decision Record: Using a Pixi React Frame-Sequence Wrapper for Overlay Composition

## Context:

We need a reusable broadcast animation wrapper that can render a PNG frame sequence at 30 FPS as the background for existing React overlay components. The wrapper must support three phases:

1. Play an intro sequence (fade-in style) up to a configured hold frame.
2. Hold on that frame while an overlay component remains visible.
3. Play the remaining frames as an outro (fade-out style) when the overlay is dismissed.

The wrapper should accept a file path based source for now, support rendering child React components above the animated background, and preload frames into memory to avoid per-frame network fetch jitter during playback.

This decision also needs to align with ADR005, which already selected WebGL and Nginx-hosted PNG sequences for broadcast overlays.

## Options Considered:

### 1. Continue With CSS/DOM-Only Transitions

- Very simple to build and maintain
- Cannot reliably deliver frame-accurate PNG sequence playback
- Not suitable for hold-frame based intro/hold/outro workflows

### 2. Use Custom Raw WebGL in Each Overlay Component

- Maximum rendering control
- Repeats boilerplate logic across overlays
- Harder to maintain and test for multiple graphics packages

### 3. Use Pixi.js Wrapper With React Composition (Chosen Option)

- GPU-accelerated rendering through Pixi/WebGL
- Reusable API for frame sequence playback state and hold behavior
- Enables clean React composition by rendering children above the animation layer

## Decision:

We have decided to implement a reusable Pixi.js-based React wrapper component for frame-sequence overlays. The component will preload all sequence frames into memory, play up to a configured `holdImage` frame during entry, keep that frame displayed while the wrapped overlay content is active, and then play the remaining frames during exit.

The initial source input will be a local or static file path convention. Future integration will allow the same component contract to consume frame URLs produced by an Nginx-backed API and cache policy.

## Rationale:

### Reusable Animation Contract for Broadcast Components:

A single wrapper with explicit props (file path, hold frame, children) avoids reimplementing timing logic in each overlay card. This keeps behavior consistent across different broadcast components.

### Stable 30 FPS Playback:

Preloading frames into memory before playback reduces frame drops and timing drift caused by runtime image fetches, which is critical for live production overlays.

### Clean Layering of Graphics and Data:

Rendering child React components above the Pixi background allows existing UI components (athlete cards, run cards, timers) to be reused without redesigning data presentation logic.

### Forward Compatibility With Nginx Asset Delivery:

The component API is designed so frame URL generation can move from local paths to Nginx API-provided paths without changing calling components.

## Consequences:

### Positive:

- Consistent intro/hold/outro animation behavior across overlays
- Smoother playback due to preloaded frame textures
- Better separation between animation rendering and data UI composition
- Easier future migration from local file paths to Nginx-based frame delivery

### Negative:

- Increased memory usage when preloading large frame sets
- Additional implementation complexity in lifecycle/state management
- Need for loading and fallback handling when frame assets are missing or delayed

## Implementation:

We will:

1. Add a reusable broadcast wrapper component in `Webapp/src/components/broadcast/` using Pixi React bindings.
2. Define a component contract with:
   - A base file path (or frame list source)
   - A `holdImage` frame key/index
   - Child content rendered above the animation canvas
3. Preload all required frames before animation playback begins.
4. Implement deterministic playback phases: intro to hold frame, hold while active, outro from next frame to end.
5. Expose playback control via props/state so existing overlay visibility controls can trigger enter/exit.
6. Add fallback behavior for missing frames (log + safe no-op or static fallback frame).
7. Preserve compatibility with future frame URL strategies (for example, Nginx API + cache headers) without changing consumer props.

## Review:

This decision will be revisited after first production usage of the wrapper. Review criteria include memory footprint, frame timing stability at 30 FPS, ease of integration with existing broadcast cards, and readiness for migration to Nginx API-driven asset paths.
