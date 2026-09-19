import json
import os
from pathlib import Path
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, ConfigDict
from sqlalchemy.orm import Session

from db.client import transaction_session_context_manager
from db.models import AvailableBonuses, AvailableMoves, ScoreSheet

BONUS_ORDER = {"air": 0, "huge": 1, "clean": 2, "superclean": 3, "link": 4}


class SeedMoveData(BaseModel):
    Move: str
    Value: int
    ReverseValue: int | None = None
    Direction: Literal["LR", "FB", "S"]

    model_config = ConfigDict(from_attributes=True, extra="allow")


def seed_scoresheet(db: Session, scoresheet_name: str, moves_json: str) -> None:
    """Insert `scoresheet_name` with its moves/bonuses parsed from `moves_json`.

    No-ops if a scoresheet with that name already exists.
    """
    if (
        db.query(ScoreSheet).filter(ScoreSheet.name == scoresheet_name)
    ).one_or_none():
        print("Scoresheet Already Exists")
        return

    print("Making Scoresheet")
    scoresheet_id = uuid4()
    db.bulk_save_objects([ScoreSheet(id=scoresheet_id, name=scoresheet_name)])

    pydantic_moves = [SeedMoveData(**move) for move in json.loads(moves_json)]
    move_order = {
        name: index
        for index, name in enumerate(
            sorted((m.Move for m in pydantic_moves), key=str.lower)
        )
    }

    for pydantic_move in pydantic_moves:
        move_id = uuid4()
        db.bulk_save_objects(
            [
                AvailableMoves(
                    id=move_id,
                    sheet_id=scoresheet_id,
                    name=pydantic_move.Move,
                    direction=pydantic_move.Direction,
                    fl_score=pydantic_move.Value,
                    rb_score=pydantic_move.ReverseValue
                    if pydantic_move.ReverseValue
                    else pydantic_move.Value,
                    display_order=move_order[pydantic_move.Move],
                )
            ]
        )

        extra_fields = pydantic_move.model_extra or {}
        bonuses = [
            AvailableBonuses(
                id=uuid4(),
                sheet_id=scoresheet_id,
                move_id=move_id,
                name=bonus_name,
                score=score,
                display_order=BONUS_ORDER.get(bonus_name.lower(), None),
            )
            for bonus_name, score in extra_fields.items()
        ]

        db.bulk_save_objects(bonuses)

    db.commit()


def seed_all_scoresheets() -> None:
    data_dir = Path("data")
    for file in os.listdir(path=data_dir):
        scoresheet_name = file.split(".")[0] or ""
        with (
            transaction_session_context_manager() as db,
            open(data_dir / file) as json_file,
        ):
            seed_scoresheet(db, scoresheet_name, json_file.read())


if __name__ == "__main__":
    seed_all_scoresheets()
