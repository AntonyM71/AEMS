# Architectural Decision Record: Update WebSockets to Socket.IO

## Context:

AEMS uses real-time bidirectional communication between the backend server, the Raspberry Pi timer, and the React web application. Originally this was implemented using raw WebSocket connections — the browser's native `WebSocket` API on the frontend and FastAPI's built-in WebSocket support combined with the `broadcaster` pub/sub library on the backend.

The system is designed to run on tablet devices that are frequently put to sleep and woken up. When a device wakes from sleep, its network connection is interrupted and any open WebSocket connection is silently dropped. The previous implementation handled this by manually setting a one-second `setTimeout` reconnect loop in every component, but this added boilerplate to each consumer and still produced noticeable periods where the UI was stale following a wake event.

## Options Considered:

### 1. Keep raw WebSockets with improved reconnection logic

Continue using native WebSocket on the frontend and FastAPI WebSocket routes on the backend, but centralise the reconnection logic into a shared helper.

- Reconnection must still be manually coded and maintained
- No improvement to connection reliability semantics
- Heartbeat/ping-pong must be implemented manually to detect silent drops
- Low change risk

### 2. Migrate to Socket.IO (Chosen Option)

Replace raw WebSocket usage with `python-socketio` on the server and `socket.io-client` on the browser and timer.

- Automatic reconnection with configurable backoff is built into the client library
- Built-in heartbeat / ping-pong keeps connections alive through NAT and proxies
- Namespace support cleanly maps each data channel (`timer`, `run_status`, `current_scores`, `broadcast_control`) to an isolated Socket.IO namespace
- Removes the bespoke `broadcaster` pub/sub library; the server emits directly to connected namespaces
- The frontend no longer needs manual `onclose` / `setTimeout` reconnection loops in every component

### 3. Server-Sent Events (SSE) for server-to-client streams

Use SSE for read-only streams and keep WebSocket only for bidirectional channels.

- SSE is unidirectional; channels that require client-to-server messages (e.g. `run_status`, `broadcast_control`) would still need separate WebSocket or HTTP endpoints
- Does not address reconnection for bidirectional channels
- Increases architectural complexity with two different real-time transports

## Decision:

Migrate all real-time connections to Socket.IO using `python-socketio` on the server and timer, and `socket.io-client` on the browser.

Each logical data channel becomes a Socket.IO namespace:

| Channel | Namespace | Direction |
|---|---|---|
| Timer updates | `/timer` | Timer → Server → Browsers |
| Run status | `/run_status` | Head Judge ↔ Server → All |
| Scored moves | `/current_scores` | HTTP endpoint → Server → Browsers |
| Broadcast control | `/broadcast_control` | Controller ↔ Server → Arena |

## Rationale:

### Automatic Reconnection:

Socket.IO clients reconnect automatically when the connection is lost. This is the primary motivation for this change and directly addresses the tablet sleep/wake use case without requiring bespoke reconnection loops in every React component.

### Built-in Heartbeats:

Socket.IO performs periodic ping/pong exchanges that detect silently dropped connections far earlier than the TCP timeout, ensuring the client reconnects promptly after a network interruption.

### Cleaner Component Code:

Removing manual `onclose` / `onerror` / `setTimeout(connect, 1000)` patterns from every streaming component reduces boilerplate and the surface area for reconnection bugs.

### Namespace Isolation:

Socket.IO namespaces allow each data channel to have its own event scope. Clients only receive events for the namespaces they have joined, which avoids unnecessary message processing.

### Simplified Server Architecture:

Replacing the `broadcaster` pub/sub library with direct Socket.IO namespace emissions removes a dependency and simplifies the data flow: HTTP endpoints and Socket.IO event handlers call `sio.emit(event, data, namespace=...)` directly rather than going through an intermediate broadcast bus.

## Consequences:

### Positive:

- Tablet devices recover from sleep without operator intervention
- Reconnection logic is centralised in the Socket.IO client library and is no longer duplicated across components
- Removal of the `broadcaster[postgres]` dependency simplifies the dependency graph
- Timer, server, and browser all use the same Socket.IO abstraction layer

### Negative:

- Socket.IO is not a pure WebSocket protocol; it uses its own framing on top of WebSocket (or HTTP long-polling as a fallback). Any non-Socket.IO WebSocket client connecting to the `/socket.io/` endpoint will not work.
- The Timer hardware client (`timer.py`) must be updated alongside the server; running a mixed old/new deployment is not supported.
- `socket.io-client` adds a runtime dependency (~45 KB gzipped) to the browser bundle.

## Implementation:

1. Add `python-socketio` to `Server/pyproject.toml` and `Timer/pyproject.toml`; remove `broadcaster[postgres]` from `Server/pyproject.toml`.
2. Create `Server/app/common/socket_manager.py` with a singleton `AsyncServer` instance.
3. Register Socket.IO event handlers for each namespace in `broadcastEndpoints.py` and `customScoringEndpoints.py`, replacing the FastAPI WebSocket route handlers.
4. Wrap the FastAPI ASGI app with `socketio.ASGIApp` in `main.py` so that `/socket.io/` traffic is handled by Socket.IO and all other requests pass through to FastAPI.
5. Add `socket.io-client` to `Webapp/package.json`.
6. Update `WebSocketConnections.ts` to return `Socket` instances (one per namespace) instead of `WebSocket` instances.
7. Update `streamingApi.ts` and all components that previously used `WebSocket` to use the `Socket` API (`socket.on(event, handler)`, `socket.emit(event, data)`, `socket.disconnect()`).
8. Update `Timer/src/timer.py` and `Timer/src/fake_timer.py` to use `socketio.SimpleClient`.

The nginx reverse proxy strips the `/api` prefix when forwarding requests: a browser request to `/api/socket.io/` is passed to the backend as `/socket.io/` (because `location /api/ { proxy_pass http://server/; }` removes the matched prefix). No nginx configuration changes are required beyond what was already in place.

## Review:

This decision will be revisited if Socket.IO's protocol overhead becomes a bottleneck for high-frequency timer updates, or if a future requirement to support non-browser clients makes the Socket.IO framing a compatibility concern.
