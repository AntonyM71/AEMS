from typing import Literal
from uuid import UUID

from db.client import get_transaction_session
from db.models import ScoredBonuses, ScoredMoves
from fastapi import Depends
from fastapi.responses import ORJSONResponse
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session


class PydanticScoredMoves(BaseModel):
    id: UUID
    move_id: UUID
    direction: Literal["L", "R", "F", "B", "LF", "RB"]


class PydanticScoredBonuses(BaseModel):
    id: UUID
    bonus_id: UUID
    move_id: UUID


class AddUpdateScoredMovesRequest(BaseModel):
    moves: list[PydanticScoredMoves] = []
    bonuses: list[PydanticScoredBonuses] = []

    class Config:
        orm_mode = True


from fastapi import APIRouter

scoring_router = APIRouter()


@scoring_router.post(
    "/addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}"
)
async def update_athlete_score(
    heat_id: str,
    athlete_id: str,
    run_number: str,
    judge_id: str,
    phase_id: str,
    scored_moves_list: AddUpdateScoredMovesRequest,
    db: Session = Depends(get_transaction_session),
):
    with db.begin():
        scored_moves = (
            db.query(ScoredMoves.id)
            .filter(ScoredMoves.heat_id == heat_id)
            .filter(ScoredMoves.athlete_id == athlete_id)
            .filter(ScoredMoves.run_number == run_number)
            .filter(ScoredMoves.judge_id == judge_id)
        )

        delete_scored_bonuses_statement = ScoredBonuses.__table__.delete().where(
            ScoredBonuses.move_id.in_(scored_moves)
        )
        db.execute(delete_scored_bonuses_statement)
        delete_scored_moves_statement = ScoredMoves.__table__.delete().where(
            ScoredMoves.id.in_(scored_moves)
        )
        db.execute(delete_scored_moves_statement)

        db.bulk_save_objects(
            [
                ScoredMoves(
                    **move.dict(),
                    judge_id=judge_id,
                    heat_id=heat_id,
                    phase_id=phase_id,
                    athlete_id=athlete_id,
                    run_number=run_number,
                )
                for move in scored_moves_list.moves
            ]
        )
        db.bulk_save_objects(
            [
                ScoredBonuses(
                    **bonus.dict(),
                    judge_id=judge_id,
                )
                for bonus in scored_moves_list.bonuses
            ]
        )

        db.commit()




# class ScoredMovesAndBonusesResponse(BaseModel):
#     moves: ScoredMoves
#     bonuses: ScoredBonuses
#     class Config:
#         orm_mode = True


class PydanticScoredMovesResponse(BaseModel):
    id : UUID
    move_id : UUID
    heat_id : UUID
    run_number :str
    phase_id: UUID
    judge_id :str
    athlete_id:str
    direction :str
    class Config:
        orm_mode = True

class PydanticScoredBonusesResponse(BaseModel):
    id : UUID
    move_id : UUID
    bonus_id : UUID
    judge_id :str

    class Config:
        orm_mode = True

class AvailableMoves(BaseModel):
    id :UUID
    sheet_id : UUID
    name : str
    fl_score: int
    rb_score : int
    direction : str

class AvailableBonuses(BaseModel):
    id: UUID
    sheet_id :UUID
    move_id : UUID
    name : str
    score: int


@scoring_router.get(
    "/getAthleteMovesAndBonuses/{heat_id}/{athlete_id}/{run_number}/{judge_id}",response_class=ORJSONResponse
)
async def get_athlete_moves_and_bonnuses(
    heat_id: str,
    athlete_id: str,
    run_number: str,
    judge_id: str,
    db: Session = Depends(get_transaction_session),
):

    scored_moves = select(ScoredMoves)
    # .filter(ScoredMoves.heat_id == heat_id).filter(ScoredMoves.athlete_id == athlete_id).filter(ScoredMoves.run_number == run_number).filter(ScoredMoves.judge_id == judge_id)
    moves = db.execute(scored_moves).fetchall()
    print("moves are:")
    print(moves[0].keys())
    # moves_dict = PydanticScoredMovesResponse.from_orm(moves)

    # print(moves_dict)

    # scored_bonuses = db.query(ScoredBonuses).filter(
    #     ScoredBonuses.move_id.in_(m.id for m in scored_moves)
    # )

    # return ORJSONResponse({
    #     "scored_moves" : moves.json(),
    #     # "scored_bonuses": scored_bonuses
    # })