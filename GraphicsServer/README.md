# Graphics Server (Static Nginx)

This service hosts overlay manifests and frame image assets using Nginx only (no Python API).

## Endpoints

- `GET /healthz` -> health check
- `GET /componentInfo/{name}` -> returns `/components/{name}.json`
  - Example: `GET /componentInfo/athleteInfo`
- `GET /assets/...` -> static frame files

## Local Run

From repo root:

```bash
export GRAPHICS_PACK_DIR=/absolute/path/to/your/active-pack
docker compose -f docker-compose.graphics.yaml up --build
```

Server listens on `http://localhost:82`.

## Folder Layout

- Host folder mounted into the container as `/usr/share/nginx/html/pack`
- `components/` -> one JSON file per component
- `assets/` -> frame image folders and files

This service runs in single-pack mode. To switch packs, point `GRAPHICS_PACK_DIR` to a different host folder.

Example expected frame files:

- `/assets/athlete_info/frame_0001.png`
- `/assets/athlete_info/frame_0002.png`
- ...

Example config lookup:

- `http://localhost:82/componentInfo/athleteInfo`

## Notes

- Component manifests are cached for 60 seconds.
- Frame assets are cached with long-lived immutable headers.
- The active pack directory is mounted read-only in compose for easy swapping from the host filesystem.
