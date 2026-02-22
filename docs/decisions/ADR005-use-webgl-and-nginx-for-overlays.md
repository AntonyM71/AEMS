# Architectural Decision Record: Using WebGL With PNG Frame Sequences Served via Nginx for Broadcast Overlays

## Context:

Our amateur sports league requires a browser‑based graphics overlay system for live broadcasts. The original plan relied on simple HTML/CSS transitions within a React application. After receiving a graphics pack consisting of PNG animation sequences, we need a rendering approach capable of smooth frame‑based animation, transparency, and reliable performance inside OBS browser sources.

The solution must remain low‑cost, integrate cleanly with React, and keep licensed graphics assets separate from the open‑source scoring system.

## Options Considered:

### 1. Pure HTML/CSS Animations
- Simple and lightweight  
- Cannot support frame‑based PNG animations  
- Not suitable for broadcast‑style motion graphics  

### 2. Video Conversion (WebM with Alpha)
- Smooth playback and small file sizes  
- Limited alpha‑video support across browsers  
- Requires a conversion workflow and additional tooling  

### 3. Sprite Sheets
- Reduces network requests  
- Requires manual frame mapping and tooling  
- Less flexible for large or numerous animations  

### 4. Canvas 2D API
- Simple to implement  
- Adequate for small animations  
- Lower performance for large or frequent frame updates  

### 5. Raw WebGL Rendering (Chosen Option)
- High‑performance GPU‑accelerated rendering  
- Full control over frame timing and compositing  
- Works reliably in OBS browser sources  
- No dependency on external libraries  

## Decision:

We have decided to serve PNG animation frames from a dedicated Nginx server and render them in the React overlay using a custom WebGL renderer that uploads each frame as a texture and draws it to a canvas at a controlled frame rate.

## Rationale:

### Efficient Static Asset Delivery:

Nginx provides fast, low‑cost static file hosting with strong caching support. PNG frames can be delivered predictably and efficiently without bundling them into the React application. This allows graphics packs to be updated independently of the overlay codebase.

### High‑Performance Rendering With WebGL:

WebGL enables GPU‑accelerated texture uploads and rendering, ensuring smooth playback of frame‑based animations even on modest hardware. This is particularly important for broadcast overlays where timing and visual smoothness matter.

### Clean Separation of Open‑Source Code and Proprietary Assets:

By hosting PNG frames externally, we avoid embedding licensed graphics in the open‑source scoring system. This separation simplifies licensing concerns and allows private asset management without affecting the public codebase.

### Predictable Integration With OBS Browser Sources:

OBS uses a Chromium‑based browser source that supports WebGL reliably. This ensures consistent behaviour across streaming setups and avoids compatibility issues associated with alpha‑video formats.

## Consequences:

### Positive:
- Smooth, GPU‑accelerated playback of PNG animation sequences  
- Low‑cost, efficient static asset hosting via Nginx  
- Clear separation between open‑source logic and proprietary graphics  
- Full control over animation timing and compositing  
- Easy to update or replace graphics packs without redeploying the overlay  

### Negative:
- Requires loading many individual PNG files, which may increase initial load time  
- WebGL implementation introduces some development complexity  
- Additional operational responsibility for maintaining the Nginx asset server  
- Higher memory usage when preloading large sequences  

## Implementation:

We will:

1. Host PNG animation frames on an Nginx server with long‑term caching enabled.  
2. Organize frames into predictable directory structures (e.g., `/gfx/scorebug_in/frame_0001.png`).  
3. Dynamically generate frame URLs in the React overlay based on base paths and frame counts.  
4. Preload frames in JavaScript and upload them to WebGL textures for rendering.  
5. Draw frames to a WebGL canvas at a controlled frame rate, triggered by overlay state.  
6. Load only the sequences required for the active overlay to manage memory usage.

Security measures (e.g., signed URLs, authentication) will be addressed in a separate ADR.

## Review:

This decision will be revisited after initial deployment or if performance issues arise during live broadcasts. Feedback from operators and developers will guide future improvements, including potential migration to video‑based animations or hybrid rendering approaches if requirements evolve.
