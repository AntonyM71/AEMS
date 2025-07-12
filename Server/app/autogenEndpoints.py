from fastapi_quickcrud import CrudMethods
from fastapi_quickcrud.crud_router import SqlType, generic_sql_crud_router_builder

from db.client import get_transaction_session
from db.models import (
    Athlete,
    AthleteHeat,
    AvailableBonuses,
    AvailableMoves,
    Competition,
    Event,
    Heat,
    Phase,
    RunStatus,
    ScoredMoves,
    ScoreSheet,
)

# Only generate endpoints that are actually used in aemsApi.ts and aems_endpoints.md

# Competition: GET, POST only
crud_route_competition = generic_sql_crud_router_builder(
    db_model=Competition,
    prefix="/competition",
    tags=["competition"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Event],
    crud_methods=[
        CrudMethods.FIND_MANY,  # GET /competition
        CrudMethods.PATCH_ONE,
        CrudMethods.CREATE_MANY,  # POST /competition
        CrudMethods.FIND_MANY_WITH_FOREIGN_TREE,
    ],
)

# Event: GET, POST, GET by competition_id
crud_route_event = generic_sql_crud_router_builder(
    db_model=Event,
    prefix="/event",
    tags=["event"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Competition],
    crud_methods=[
        CrudMethods.FIND_MANY,  # GET /event
        CrudMethods.CREATE_MANY,  # POST /event
        CrudMethods.FIND_MANY_WITH_FOREIGN_TREE,
    ],
)
crud_route_event_by_phase = generic_sql_crud_router_builder(
    db_model=Event,
    prefix="/event",
    tags=["event"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Phase],
    crud_methods=[CrudMethods.FIND_ONE, CrudMethods.FIND_MANY_WITH_FOREIGN_TREE],
)
# Phase: GET by event_id, GET by id, POST, PATCH
crud_route_phase = generic_sql_crud_router_builder(
    db_model=Phase,
    prefix="/phase",
    tags=["phase"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    foreign_include=[Heat],
    crud_methods=[
        CrudMethods.FIND_ONE,  # GET /phase/{id}
        CrudMethods.CREATE_MANY,  # POST /phase
        CrudMethods.PATCH_ONE,  # PATCH /phase/{id}
        CrudMethods.FIND_MANY_WITH_FOREIGN_TREE,
    ],
)

# Heat: GET, GET by id, POST
crud_route_heat = generic_sql_crud_router_builder(
    db_model=Heat,
    prefix="/heat",
    tags=["heat"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.FIND_MANY,  # GET /heat
        CrudMethods.FIND_ONE,  # GET /heat/{id}
        CrudMethods.CREATE_MANY,  # POST /heat
    ],
)

# Athlete: POST, PATCH
crud_route_athlete = generic_sql_crud_router_builder(
    db_model=Athlete,
    prefix="/athlete",
    tags=["athlete"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.CREATE_MANY,  # POST /athlete
        CrudMethods.PATCH_ONE,  # PATCH /athlete/{id}
    ],
)

# AthleteHeat: POST, PATCH
crud_route_athleteheat = generic_sql_crud_router_builder(
    db_model=AthleteHeat,
    prefix="/athleteheat",
    tags=["athleteheat"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.CREATE_MANY,  # POST /athleteheat
        CrudMethods.PATCH_ONE,  # PATCH /athleteheat/{id}
    ],
)

# RunStatus: GET
crud_route_run_status = generic_sql_crud_router_builder(
    db_model=RunStatus,
    prefix="/run_status",
    tags=["run_status"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.FIND_MANY,  # GET /run_status
    ],
)

# ScoredMoves: DELETE
crud_route_scoredmoves = generic_sql_crud_router_builder(
    db_model=ScoredMoves,
    prefix="/scoredmoves",
    tags=["scoredmoves"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.DELETE_MANY,  # DELETE /scoredmoves
    ],
)

# AvailableMoves: GET
crud_route_availablemoves = generic_sql_crud_router_builder(
    db_model=AvailableMoves,
    prefix="/availablemoves",
    tags=["availablemoves"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.FIND_MANY,  # GET /availablemoves
    ],
)

# AvailableBonuses: GET
crud_route_availablebonuses = generic_sql_crud_router_builder(
    db_model=AvailableBonuses,
    prefix="/availablebonuses",
    tags=["availablebonuses"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.FIND_MANY,  # GET /availablebonuses
    ],
)

# Scoresheet: GET, POST
crud_route_scoresheet = generic_sql_crud_router_builder(
    db_model=ScoreSheet,
    prefix="/scoresheet",
    tags=["scoresheet"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
    crud_methods=[
        CrudMethods.FIND_MANY,  # GET /scoresheet
        CrudMethods.CREATE_MANY,  # POST /scoresheet
    ],
)
