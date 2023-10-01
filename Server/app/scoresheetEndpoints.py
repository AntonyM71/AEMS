from typing import Literal
from uuid import UUID

from db.client import get_transaction_session
from db.models import AvailableBonuses, AvailableMoves
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

scoresheet_router = APIRouter()


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
    moves: list[PydanticAvailableMoves] = []
    bonuses: list[PydanticAvailableBonuses] = []

    class Config:
        orm_mode = True


@scoresheet_router.post("/addUpdateScoresheet/{scoresheet_id}")
async def addUpdateScoresheet(
    scoresheet_id: str,
    scoresheet: AddUpdateScoresheetRequest,
    db: Session = Depends(get_transaction_session),
):
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
