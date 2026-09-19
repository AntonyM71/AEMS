"""Unit tests for scripts/seed_scoresheets.py.

This script seeds the default scoresheets on every deployment
(docker-compose's server entrypoint) and in CI, and the scoresheet-builder
capability's "default scoresheets available without manual setup" behavior
depends on it. Uses a mocked db session, like the rest of the suite.
"""

import json
from pathlib import Path
from unittest.mock import MagicMock

from sqlalchemy.orm import Session

from db.models import AvailableBonuses, AvailableMoves, ScoreSheet
from scripts.seed_scoresheets import seed_scoresheet

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"


def _saved(mock_db: MagicMock, model: type) -> list:
    saved = []
    for call in mock_db.bulk_save_objects.call_args_list:
        saved.extend(obj for obj in call.args[0] if isinstance(obj, model))
    return saved


def test_seed_scoresheet_skips_when_already_exists() -> None:
    mock_db = MagicMock(spec=Session)
    mock_db.query.return_value.filter.return_value.one_or_none.return_value = (
        ScoreSheet(name="icf_2026")
    )

    seed_scoresheet(mock_db, "icf_2026", "[]")

    mock_db.bulk_save_objects.assert_not_called()
    mock_db.commit.assert_not_called()


def test_seed_scoresheet_creates_expected_moves_and_bonuses() -> None:
    for data_file in DATA_DIR.glob("*.json"):
        expected_moves = json.loads(data_file.read_text())
        mock_db = MagicMock(spec=Session)
        mock_db.query.return_value.filter.return_value.one_or_none.return_value = None

        seed_scoresheet(mock_db, data_file.stem, data_file.read_text())

        scoresheets = _saved(mock_db, ScoreSheet)
        assert [s.name for s in scoresheets] == [data_file.stem]

        moves = _saved(mock_db, AvailableMoves)
        assert {m.name for m in moves} == {mv["Move"] for mv in expected_moves}

        bonuses_by_move_id = {}
        for bonus in _saved(mock_db, AvailableBonuses):
            bonuses_by_move_id.setdefault(bonus.move_id, {})[bonus.name] = bonus.score

        for move in moves:
            expected = next(mv for mv in expected_moves if mv["Move"] == move.name)
            assert move.fl_score == expected["Value"]
            assert move.rb_score == (expected.get("ReverseValue") or expected["Value"])
            assert move.direction == expected["Direction"]

            expected_bonuses = {
                key: value
                for key, value in expected.items()
                if key not in {"Move", "Value", "ReverseValue", "Direction"}
            }
            assert bonuses_by_move_id.get(move.id, {}) == expected_bonuses

        mock_db.commit.assert_called_once()
