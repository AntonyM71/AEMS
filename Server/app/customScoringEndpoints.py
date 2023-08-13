from typing import List, Literal
from uuid import UUID

from api import app
from fastapi import Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from Server.api import get_transaction_session
from Server.db.models import ScoredBonuses, ScoredMoves


class PydanticScoredMoves(BaseModel):
    id: UUID
    move_id: UUID
    direction: Literal["LR", "FB", "LRFB"]


class PydanticScoredBonuses(BaseModel):
    id: UUID
    bonus_id: UUID
    move_id: UUID


class AddUpdateScoredMovesRequest(BaseModel):
    moves: List[PydanticScoredMoves] = []
    bonuses: List[PydanticScoredBonuses] = []

    class Config:
        orm_mode = True


@app.post("/updateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}")
async def updateAthleteScore(
    heat_id,
    athlete_id,
    run_number,
    judge_id,
    scoredMovesList: AddUpdateScoredMovesRequest,
    db: Session = Depends(get_transaction_session),
):
    with db.begin():
        scoredMoves = (
            db.query(ScoredMoves.id)
            .filter(ScoredMoves.heat_id == heat_id)
            .filter(ScoredMoves.athlete_id == athlete_id)
            .filter(ScoredMoves.run_number == run_number)
            .filter(ScoredMoves.judge_id == judge_id)
        )
        db.delete(ScoredBonuses).where(ScoredBonuses.move_id.in_(scoredMoves))
        db.delete(scoredMoves)

        db.bulk_save_objects(
            [ScoredMoves(**move.dict()) for move in scoredMovesList.moves]
        )
        db.bulk_save_objects(
            [ScoredBonuses(**bonus.dict()) for bonus in scoredMovesList.bonuses]
        )

        db.commit()
