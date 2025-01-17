import json

from fastapi.openapi.utils import get_openapi
from starlette.routing import WebSocketRoute

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
