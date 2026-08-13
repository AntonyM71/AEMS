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
    display_order: int | None = None

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
        existing_moves = {
            move.id: move
            for move in db.query(AvailableMoves)
            .filter(AvailableMoves.sheet_id == scoresheet_id)
            .all()
        }
        existing_bonuses = {
            bonus.id: bonus
            for bonus in db.query(AvailableBonuses)
            .filter(AvailableBonuses.sheet_id == scoresheet_id)
            .all()
        }

        incoming_move_ids = set()
        for move in scoresheet.moves:
            incoming_move_ids.add(move.id)
            move_data = move.model_dump()
            existing_move = existing_moves.get(move.id)
            if existing_move:
                for key, value in move_data.items():
                    setattr(existing_move, key, value)
            else:
                db.add(AvailableMoves(**move_data))

        incoming_bonus_ids = set()
        for bonus in scoresheet.bonuses:
            incoming_bonus_ids.add(bonus.id)
            bonus_data = bonus.model_dump()
            existing_bonus = existing_bonuses.get(bonus.id)
            if existing_bonus:
                for key, value in bonus_data.items():
                    setattr(existing_bonus, key, value)
            else:
                db.add(AvailableBonuses(**bonus_data))

        for bonus_id, existing_bonus in existing_bonuses.items():
            if bonus_id not in incoming_bonus_ids:
                db.delete(existing_bonus)

        for move_id, existing_move in existing_moves.items():
            if move_id not in incoming_move_ids:
                db.delete(existing_move)
