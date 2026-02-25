from typing import Literal
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import AvailableBonuses, AvailableMoves

scoresheet_router = APIRouter(tags=["scoresheet"])


class PydanticAvailableMoves(BaseModel):
    id: UUID
    sheet_id: UUID
    name: str
    fl_score: int
    rb_score: int
    direction: Literal["LR", "FB", "S"]

    class Config:
        orm_mode = True


class PydanticAvailableBonuses(BaseModel):
    id: UUID
    sheet_id: UUID
    move_id: UUID
    name: str
    score: int
    display_order: int | None

    class Config:
        orm_mode = True


class AddUpdateScoresheetRequest(BaseModel):
    moves: list[PydanticAvailableMoves] = []
    bonuses: list[PydanticAvailableBonuses] = []

    class Config:
        orm_mode = True


@scoresheet_router.post("/addUpdateScoresheet/{scoresheet_id}")
async def add_update_scoresheet(
    scoresheet_id: str,
    scoresheet: AddUpdateScoresheetRequest,
    db: Session = Depends(get_transaction_session),
) -> None:
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
