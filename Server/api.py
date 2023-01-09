from db.models import Competition, Event, Heat, Phase, Run
from fastapi import FastAPI
from fastapi_quickcrud.crud_router import (SqlType,
                                           generic_sql_crud_router_builder)
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://pi:kayak1@192.168.0.28/aems")
# TODO: Update to use dotenv
session = sessionmaker(engine)


def get_transaction_session():
    try:
        db = session()
        yield db
    finally:
        db.close()


crud_route_competition = generic_sql_crud_router_builder(
    db_model=Competition,
    prefix="/competition",
    tags=["competition"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Event]
)

crud_route_event = generic_sql_crud_router_builder(
    db_model=Event,
    prefix="/event",
    tags=["event"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Phase]
)

crud_route_phase = generic_sql_crud_router_builder(
    db_model=Phase,
    prefix="/phase",
    tags=["phase"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Heat]
)

crud_route_heat = generic_sql_crud_router_builder(
    db_model=Heat,
    prefix="/heat",
    tags=["heat"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Run]
)
crud_route_run = generic_sql_crud_router_builder(
    db_model=Run,
    prefix="/run",
    tags=["run"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)
app = FastAPI()
[app.include_router(i) for i in [crud_route_competition, crud_route_event, crud_route_phase, crud_route_heat, crud_route_run]]


@app.get("/")
async def root():
    return {"message": "Go to /docs to see the swagger documentation"}


import uvicorn


async def run_server():
    config = uvicorn.Config(app, host="0.0.0.0", port=8002, debug=False)
    server = uvicorn.Server(config)
    await server.serve()