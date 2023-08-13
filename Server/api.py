from typing import List, Literal
from uuid import UUID

from db.models import (
    Athlete,
    AthleteHeat,
    AvailableBonuses,
    AvailableMoves,
    Competition,
    Event,
    Heat,
    Phase,
    ScoredBonuses,
    ScoredMoves,
    ScoreSheet,
)
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_quickcrud.crud_router import SqlType, generic_sql_crud_router_builder
from pydantic import BaseModel
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

database_address = "postgresql://pi:kayak1@192.168.0.28/aems"
frontend_url = "http://localhost:3000"
engine = create_engine(database_address)
# TODO: Update to use dotenv
session = sessionmaker(engine)
request_origins = [frontend_url]


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
    foreign_include=[Event],
)

crud_route_event = generic_sql_crud_router_builder(
    db_model=Event,
    prefix="/event",
    tags=["event"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Phase],
)

crud_route_phase = generic_sql_crud_router_builder(
    db_model=Phase,
    prefix="/phase",
    tags=["phase"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Heat],
)

crud_route_heat = generic_sql_crud_router_builder(
    db_model=Heat,
    prefix="/heat",
    tags=["heat"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
)

crud_route_athlete = generic_sql_crud_router_builder(
    db_model=Athlete,
    prefix="/athlete",
    tags=["athlete"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)

crud_route_scoresheet = generic_sql_crud_router_builder(
    db_model=ScoreSheet,
    prefix="/scoresheet",
    tags=["scoresheet"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)
crud_route_availablemoves = generic_sql_crud_router_builder(
    db_model=AvailableMoves,
    prefix="/availablemoves",
    tags=["availablemoves"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)
crud_route_availablebonuses = generic_sql_crud_router_builder(
    db_model=AvailableBonuses,
    prefix="/availablebonuses",
    tags=["availablebonuses"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)

crud_route_scoredmoves = generic_sql_crud_router_builder(
    db_model=ScoredMoves,
    prefix="/scoredmoves",
    tags=["scoredmoves"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)
crud_route_scoredbonuses = generic_sql_crud_router_builder(
    db_model=ScoredBonuses,
    prefix="/scoredbonuses",
    tags=["scoredbonuses"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)
crud_route_athleteheat = generic_sql_crud_router_builder(
    db_model=AthleteHeat,
    prefix="/athleteheat",
    tags=["athleteheat"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    # foreign_include=[Run]
)
app = FastAPI()
[
    app.include_router(i)
    for i in [
        crud_route_competition,
        crud_route_event,
        crud_route_phase,
        crud_route_heat,
        crud_route_athlete,
        crud_route_scoresheet,
        crud_route_availablemoves,
        crud_route_availablebonuses,
        crud_route_scoredmoves,
        crud_route_scoredbonuses,
        crud_route_athleteheat,
    ]
]


@app.get("/")
async def root():
    return {"message": "Go to /docs to see the swagger documentation"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=request_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PydanticAvailableMoves(BaseModel):
    id: UUID
    sheet_id: UUID
    name: str
    fl_score: int
    rb_score: int
    direction: Literal["LR", "FB", "LRFB"]


class PydanticAvailableBonuses(BaseModel):
    id: UUID
    sheet_id: UUID
    move_id: UUID
    name: str
    score: int


class AddUpdateScoresheetRequest(BaseModel):
    moves: List[PydanticAvailableMoves] = []
    bonuses: List[PydanticAvailableBonuses] = []

    class Config:
        orm_mode = True


@app.post("/addUpdateScoresheet/{scoresheet_id}")
async def addUpdateScoresheet(
    scoresheet_id,
    scoresheet: AddUpdateScoresheetRequest,
    db: Session = Depends(get_transaction_session),
):
    print([bonus.sheet_id for bonus in scoresheet.bonuses])
    with db.begin():
        db.query(AvailableBonuses).filter(
            AvailableBonuses.sheet_id == scoresheet_id
        ).delete()
        db.query(AvailableMoves).filter(
            AvailableMoves.sheet_id == scoresheet_id
        ).delete()

        db.bulk_save_objects(
            [AvailableMoves(**move.dict()) for move in scoresheet.moves]
        )
        db.bulk_save_objects(
            [AvailableBonuses(**bonus.dict()) for bonus in scoresheet.bonuses]
        )

        db.commit()


import uvicorn


async def run_server():
    config = uvicorn.Config(app, host="0.0.0.0", port=8002, debug=False)
    server = uvicorn.Server(config)
    await server.serve()
