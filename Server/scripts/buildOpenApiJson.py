import json
import os

from fastapi.openapi.utils import get_openapi
from starlette.routing import WebSocketRoute

# main -> app.config builds a Settings object at import time requiring both
# REDIS_URL and CONNECTION_STRING, so these must be set before `from main
# import app` runs. This script only reads app.routes for the OpenAPI schema,
# so the same dummy values Server/conftest.py uses are correct here too, even
# with no Redis or database running.
os.environ.setdefault("REDIS_URL", "memory")
os.environ.setdefault("CONNECTION_STRING", "postgresql://test:test@localhost/test")

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
