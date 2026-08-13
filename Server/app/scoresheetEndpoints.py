from typing import Literal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import Session

from db.client import get_transaction_session
from db.models import AvailableBonuses, AvailableMoves, ScoredBonuses, ScoredMoves

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
    moves: list[PydanticAvailableMoves] = Field(default_factory=list)
    bonuses: list[PydanticAvailableBonuses] = Field(default_factory=list)

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
        incoming_move_ids = {move.id for move in scoresheet.moves}
        incoming_bonus_ids = {bonus.id for bonus in scoresheet.bonuses}

        bonus_ids_to_remove = [
            bonus_id
            for bonus_id in existing_bonuses
            if bonus_id not in incoming_bonus_ids
        ]
        scored_bonus_ids = (
            {
                scored_bonus_id
                for (scored_bonus_id,) in db.query(ScoredBonuses.bonus_id)
                .filter(ScoredBonuses.bonus_id.in_(bonus_ids_to_remove))
                .all()
            }
            if bonus_ids_to_remove
            else set()
        )
        move_ids_to_remove = [
            move_id for move_id in existing_moves if move_id not in incoming_move_ids
        ]
        scored_move_ids = (
            {
                scored_move_id
                for (scored_move_id,) in db.query(ScoredMoves.move_id)
                .filter(ScoredMoves.move_id.in_(move_ids_to_remove))
                .all()
            }
            if move_ids_to_remove
            else set()
        )
        moves_to_delete = [
            existing_moves[move_id] for move_id in move_ids_to_remove
        ]

        if scored_bonus_ids or scored_move_ids:
            raise HTTPException(
                status_code=409,
                detail=(
                    "Cannot delete moves or bonuses that are used in scored runs. "
                    "Update the scoresheet without removing referenced items."
                ),
            )

        for move in scoresheet.moves:
            move_data = move.model_dump()
            existing_move = existing_moves.get(move.id)
            if existing_move:
                for key, value in move_data.items():
                    setattr(existing_move, key, value)
            else:
                db.add(AvailableMoves(**move_data))

        for bonus in scoresheet.bonuses:
            bonus_data = bonus.model_dump()
            existing_bonus = existing_bonuses.get(bonus.id)
            if existing_bonus:
                for key, value in bonus_data.items():
                    setattr(existing_bonus, key, value)
            else:
                db.add(AvailableBonuses(**bonus_data))

        bonuses_to_delete = [
            existing_bonuses[bonus_id] for bonus_id in bonus_ids_to_remove
        ]
        for bonus in bonuses_to_delete:
            db.delete(bonus)

        for move in moves_to_delete:
            db.delete(move)
