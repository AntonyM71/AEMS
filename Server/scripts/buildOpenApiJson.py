import json
import os

from fastapi.openapi.utils import get_openapi
from starlette.routing import WebSocketRoute

# main -> app.common.socket_manager builds its Redis client manager at import
# time, so REDIS_URL must be set before `from main import app` runs. This
# script only reads app.routes for the OpenAPI schema, so the in-memory
# sentinel (also used by Server/conftest.py for the same reason) is correct
# even when no Redis is running.
os.environ.setdefault("REDIS_URL", "memory")

from main import app

print(f"Total Routes: {len(app.routes)}")
http_routes = [r for r in app.routes if not isinstance(r, WebSocketRoute)]
print(f"HTTP Routes: {len(http_routes)}")


openapi_schema = get_openapi(
    title=app.title,
    version=app.version,
    openapi_version=app.openapi_version,
    description=app.description,
    routes=http_routes,
)


with open("../Common/openapi.json", "w") as f:
    json.dump(
        openapi_schema,
        f,
    )
