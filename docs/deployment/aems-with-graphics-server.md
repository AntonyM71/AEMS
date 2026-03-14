# Running AEMS With the Graphics Server

This guide covers the local deployment setup for running the main AEMS stack and the separate graphics server stack together.

The graphics server hosts broadcast overlay manifests under `/componentInfo/` and frame assets under `/assets/`. The main AEMS Nginx container proxies those paths so the web application can load overlay configs and animation frames from the same origin.

## Prerequisites

- Docker Engine with Docker Compose
- A checked out AEMS repository
- A graphics pack folder containing:
  - `components/`
  - `assets/`
- An external Docker network named `aems_shared`

## 1. Create the Shared Docker Network

The AEMS stack and the graphics server run from separate compose files, so they need a shared external network to talk to each other.

Run this once on the host machine:

```bash
docker network create aems_shared
```

If the network already exists, Docker will report that it is already present.

## 2. Choose the Graphics Pack

Set `GRAPHICS_PACK_DIR` to the absolute path of the pack you want to serve.

Example:

```bash
export GRAPHICS_PACK_DIR=/home/aems/graphics-packs/icf-2021-kayak-cross-master
```

The selected pack must contain:

- `components/eventTitle.json` and any other overlay config manifests
- `assets/...` PNG frame folders referenced by those manifests

The container also needs read and traverse access to the host path. If the pack is stored under a locked-down home directory, Nginx inside Docker can fail with `Permission denied` even when the files exist.

For example, this can happen when a parent directory is `750` or the pack directory is `700`.

## 3. Start the Graphics Server

From the AEMS repository root:

```bash
docker compose -f docker-compose.graphics.yaml up --build
```

This starts the static graphics server on port `82`.

Useful checks:

```bash
curl http://localhost:82/healthz
curl http://localhost:82/componentInfo/eventTitle
```

## 4. Start AEMS

In a second terminal, from the same repository root:

```bash
docker compose -f docker-compose.yaml up --build
```

This starts:

- the backend API
- the frontend
- the main AEMS Nginx proxy on port `81`
- Postgres

## 5. Verify the Combined Setup

Open AEMS through the main Nginx entrypoint:

```text
http://localhost:81
```

Then verify that the proxy routes are working through the AEMS origin:

```bash
curl http://localhost:81/componentInfo/eventTitle
curl -I http://localhost:81/assets/CSLX_001/CSLX_001_event_title00.png
```

Expected behavior:

- `/componentInfo/...` is proxied from AEMS Nginx to the graphics server
- `/assets/...` is proxied from AEMS Nginx to the graphics server
- broadcast overlay components such as `EventTitleModal` can load their animation configs without needing a hard-coded `configEndpointBase`

## How the Routing Works

The current setup relies on three pieces:

1. `docker-compose.graphics.yaml` attaches the `graphics_server` service to the external `aems_shared` network.
2. `docker-compose.yaml` attaches the main AEMS `nginx` service to the same `aems_shared` network.
3. `nginx.conf` in the AEMS stack proxies:
   - `/componentInfo/` -> `http://graphics_server:82/componentInfo/`
   - `/assets/` -> `http://graphics_server:82/assets/`

This keeps the browser on a single origin while still hosting graphics packs separately from the main application.

## Stopping the Stacks

To stop AEMS:

```bash
docker compose -f docker-compose.yaml down
```

To stop the graphics server:

```bash
docker compose -f docker-compose.graphics.yaml down
```

## Troubleshooting

### `Set GRAPHICS_PACK_DIR to your host graphics pack folder`

The graphics compose file requires `GRAPHICS_PACK_DIR` to be set before startup.

Verify with:

```bash
echo "$GRAPHICS_PACK_DIR"
```

### `/componentInfo/eventTitle` returns `404`

Check that:

- the selected graphics pack has `components/eventTitle.json`
- the graphics server is running
- the AEMS Nginx container can reach `graphics_server` on the shared network

If the graphics server logs show `Permission denied` for a file under `/usr/share/nginx/html/pack`, the problem is host filesystem permissions rather than a missing file.

You can inspect the host path with:

```bash
namei -l "$GRAPHICS_PACK_DIR/components/eventTitle.json"
```

The container must be able to traverse every parent directory and read the files. One working fix is:

```bash
chmod o+x /home/aems
find "$GRAPHICS_PACK_DIR" -type d -exec chmod o+rx {} +
find "$GRAPHICS_PACK_DIR" -type f -exec chmod o+r {} +
```

After fixing permissions, retry:

```bash
curl http://localhost:82/componentInfo/eventTitle
```

### `/assets/...` returns `404`

Check that:

- the pack uses an `assets/` directory, not `CSLX_PNG/`
- the paths inside `components/*.json` match the files on disk

### AEMS starts but overlay animations do not appear

Check the browser developer tools network tab for failed requests to:

- `/componentInfo/...`
- `/assets/...`

Also confirm that the overlay component is visible in UI state and that the selected pack contains the required frames.