from fastapi import FastAPI
from fastapi_quickcrud.crud_router import generic_sql_crud_router_builder

from db.models import Child, Parent

crud_route_parent = generic_sql_crud_router_builder(
    db_model=Parent,
    prefix="/parent",
    tags=["parent"],
)

crud_route_child = generic_sql_crud_router_builder(
    db_model=Child,
    prefix="/child",
    tags=["child"]
)

app = FastAPI()
[app.include_router(i) for i in [crud_route_parent, crud_route_child]]

@app.get("/", tags=["child"])
async def root():
    return {"message": "Hello World"}

import uvicorn

uvicorn.run(app, host="0.0.0.0", port=8002, debug=False)
