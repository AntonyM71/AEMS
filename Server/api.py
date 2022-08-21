from fastapi import FastAPI
from fastapi_quickcrud import crud_router_builder

from db.models import Bug

crud_route_1 = crud_router_builder(
    db_model=Bug,
    prefix="/bug",
    tags=["Bug"],
    async_mode=True

    )


app = FastAPI()
app.include_router(crud_route_1)
