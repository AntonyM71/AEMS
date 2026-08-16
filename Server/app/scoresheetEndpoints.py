from typing import Any, Literal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy.orm import InstrumentedAttribute, Session

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


def _ids_to_remove(existing_ids: set[UUID], incoming_ids: set[UUID]) -> list[UUID]:
    return [id_ for id_ in existing_ids if id_ not in incoming_ids]


def _referenced_ids(
    db: Session, column: InstrumentedAttribute, ids: list[UUID]
) -> set[UUID]:
    if not ids:
        return set()
    return {row_id for (row_id,) in db.query(column).filter(column.in_(ids)).all()}


def _validate_immutable_fields(
    existing: dict[UUID, Any],
    items: list[BaseModel],
    immutable_fields: tuple[str, ...],
    entity_name: str,
) -> None:
    for item in items:
        existing_item = existing.get(item.id)
        if existing_item is None:
            continue

        data = item.model_dump()
        for field in immutable_fields:
            if getattr(existing_item, field) != data[field]:
                raise HTTPException(
                    status_code=409,
                    detail=f"Cannot move existing {entity_name} definitions to a different parent.",
                )


def _validate_referenced_updates(
    existing: dict[UUID, Any],
    items: list[BaseModel],
    referenced_ids: set[UUID],
    allowed_fields: tuple[str, ...],
) -> None:
    for item in items:
        if item.id not in referenced_ids:
            continue

        existing_item = existing.get(item.id)
        if existing_item is None:
            continue

        data = item.model_dump()
        for field, value in data.items():
            if field == "id" or field in allowed_fields:
                continue
            if getattr(existing_item, field) != value:
                raise HTTPException(
                    status_code=409,
                    detail=(
                        "Referenced moves and bonuses can only update display order."
                    ),
                )


def _upsert(
    db: Session,
    model: type,
    existing: dict,
    items: list[BaseModel],
    editable_fields: tuple[str, ...],
) -> None:
    for item in items:
        data = item.model_dump()
        existing_item = existing.get(item.id)
        if existing_item:
            for key in editable_fields:
                setattr(existing_item, key, data[key])
        else:
            db.add(model(**data))


def _delete_removed(db: Session, existing: dict, ids_to_remove: list[UUID]) -> None:
    for id_ in ids_to_remove:
        db.delete(existing[id_])


@scoresheet_router.post(
    "/addUpdateScoresheet/{scoresheet_id}",
    responses={
        409: {
            "description": (
                "Cannot delete moves or bonuses that are used in scored runs."
            )
        }
    },
)
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

        move_ids_to_remove = _ids_to_remove(
            set(existing_moves), {move.id for move in scoresheet.moves}
        )
        bonus_ids_to_remove = _ids_to_remove(
            set(existing_bonuses), {bonus.id for bonus in scoresheet.bonuses}
        )
        scored_move_ids = _referenced_ids(
            db, ScoredMoves.move_id, move_ids_to_remove
        )
        scored_bonus_ids = _referenced_ids(
            db, ScoredBonuses.bonus_id, bonus_ids_to_remove
        )
        referenced_move_ids = _referenced_ids(
            db,
            ScoredMoves.move_id,
            [move.id for move in scoresheet.moves if move.id in existing_moves],
        )
        referenced_bonus_ids = _referenced_ids(
            db,
            ScoredBonuses.bonus_id,
            [bonus.id for bonus in scoresheet.bonuses if bonus.id in existing_bonuses],
        )

        if scored_move_ids or scored_bonus_ids:
            raise HTTPException(
                status_code=409,
                detail=(
                    "Cannot delete moves or bonuses that are used in scored runs. "
                    "Update the scoresheet without removing referenced items."
                ),
            )

        _validate_immutable_fields(
            existing_moves, scoresheet.moves, ("sheet_id",), "move"
        )
        _validate_immutable_fields(
            existing_bonuses, scoresheet.bonuses, ("sheet_id", "move_id"), "bonus"
        )
        _validate_referenced_updates(
            existing_moves,
            scoresheet.moves,
            referenced_move_ids,
            ("display_order",),
        )
        _validate_referenced_updates(
            existing_bonuses,
            scoresheet.bonuses,
            referenced_bonus_ids,
            ("display_order",),
        )

        _upsert(
            db,
            AvailableMoves,
            existing_moves,
            scoresheet.moves,
            ("name", "fl_score", "rb_score", "direction", "display_order"),
        )
        _upsert(
            db,
            AvailableBonuses,
            existing_bonuses,
            scoresheet.bonuses,
            ("name", "score", "display_order"),
        )
        _delete_removed(db, existing_bonuses, bonus_ids_to_remove)
        _delete_removed(db, existing_moves, move_ids_to_remove)
