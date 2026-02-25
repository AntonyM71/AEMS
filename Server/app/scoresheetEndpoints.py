from typing import Literal
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import BaseModel, ConfigDict
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

    model_config = ConfigDict(from_attributes=True)


class PydanticAvailableBonuses(BaseModel):
    id: UUID
    sheet_id: UUID
    move_id: UUID
    name: str
    score: int
    display_order: int | None = None

    model_config = ConfigDict(from_attributes=True)


class AddUpdateScoresheetRequest(BaseModel):
    moves: list[PydanticAvailableMoves] = []
    bonuses: list[PydanticAvailableBonuses] = []

    model_config = ConfigDict(from_attributes=True)


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
            [AvailableMoves(**move.model_dump()) for move in scoresheet.moves]
        )
        db.bulk_save_objects(
            [AvailableBonuses(**bonus.model_dump()) for bonus in scoresheet.bonuses]
        )

        db.commit()
