from fastapi import FastAPI
from fastapi_quickcrud.crud_router import (SqlType,
                                           generic_sql_crud_router_builder)
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from db.models import Child, Parent

engine = create_engine("postgresql://pi:kayak1@192.168.0.28/aems")

session = sessionmaker(engine)


def get_transaction_session():
    try:
        db = session()
        yield db
    finally:
        db.close()

crud_route_parent = generic_sql_crud_router_builder(
    db_model=Parent,
    prefix="/parent",
    tags=["parent"],

    db_session= get_transaction_session,
    sql_type=SqlType("postgresql"),
)

crud_route_child = generic_sql_crud_router_builder(
    db_model=Child,
    prefix="/child",
    tags=["child"],

    db_session= get_transaction_session,
    sql_type=SqlType("postgresql"),
)


app = FastAPI()
[app.include_router(i) for i in [crud_route_parent, crud_route_child]]


@app.get("/", tags=["child"])
async def root():
    return {"message": "Go to /docs to see the swagger documentation"}


import uvicorn

uvicorn.run(app, host="0.0.0.0", port=8002, debug=False)
