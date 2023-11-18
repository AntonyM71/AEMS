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
    ScoredBonuses,
    ScoredMoves,
    ScoreSheet,
)
from fastapi_quickcrud.crud_router import SqlType, generic_sql_crud_router_builder

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
)

crud_route_scoresheet = generic_sql_crud_router_builder(
    db_model=ScoreSheet,
    prefix="/scoresheet",
    tags=["scoresheet"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
)
crud_route_availablemoves = generic_sql_crud_router_builder(
    db_model=AvailableMoves,
    prefix="/availablemoves",
    tags=["availablemoves"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
)
crud_route_availablebonuses = generic_sql_crud_router_builder(
    db_model=AvailableBonuses,
    prefix="/availablebonuses",
    tags=["availablebonuses"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
)

crud_route_scoredmoves = generic_sql_crud_router_builder(
    db_model=ScoredMoves,
    prefix="/scoredmoves",
    tags=["scoredmoves"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
)
crud_route_scoredbonuses = generic_sql_crud_router_builder(
    db_model=ScoredBonuses,
    prefix="/scoredbonuses",
    tags=["scoredbonuses"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
)
crud_route_athleteheat = generic_sql_crud_router_builder(
    db_model=AthleteHeat,
    prefix="/athleteheat",
    tags=["athleteheat"],
    db_session=get_transaction_session,
    sql_type=SqlType("postgresql"),
)
