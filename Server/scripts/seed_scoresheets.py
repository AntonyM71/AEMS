import json
import os
from pathlib import Path
from typing import Literal, Optional
from uuid import uuid4

from pydantic import BaseModel, Extra

from db.client import get_transaction_session, session
from db.models import AvailableBonuses, AvailableMoves, ScoreSheet

scoresheet_files = os.listdir(path=Path("data"))
print(scoresheet_files)


class SeedMoveData(BaseModel):
    Move: str
    Value: int
    ReverseValue: Optional[int]
    Direction: Literal["LR", "FB", "S"]

    class Config:
        orm_mode = True
        extra = Extra.allow


for file in scoresheet_files:
    scoresheet_name = file.split(".")[0] or ""
    print(scoresheet_name)

    with next(get_transaction_session()) as db:
        if (
            db.query(ScoreSheet).filter(ScoreSheet.name == scoresheet_name)
        ).one_or_none():
            print("Scoresheet Already Exists")

        else:
            print("Making Scoresheet")
            scoresheet_id = uuid4()
            db.bulk_save_objects([ScoreSheet(id=scoresheet_id, name=scoresheet_name)])
            with open(Path("data", file)) as json_file:
                data = json.loads(json_file.read())

                # print(data)

                for move in data:
                    move_id = uuid4()
                    pydantic_move = SeedMoveData(**move)
                    # print(pydantic_move)
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
                            )
                        ]
                    )

                    bonus_names = [
                        field
                        for field in pydantic_move.__dict__.keys()
                        if field not in SeedMoveData.__fields__.keys()
                    ]
                    bonuses = [
                        AvailableBonuses(
                            id=uuid4(),
                            sheet_id=scoresheet_id,
                            move_id=move_id,
                            name=bonus_name,
                            score=pydantic_move.dict()[bonus_name],
                        )
                        for bonus_name in bonus_names
                    ]

                    db.bulk_save_objects(bonuses)

                db.commit()
