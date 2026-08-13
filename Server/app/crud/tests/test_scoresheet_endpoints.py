from unittest.mock import MagicMock
from uuid import UUID

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import AvailableBonuses, AvailableMoves


def _build_query_mock(return_value):  # noqa: ANN001, ANN202
    query = MagicMock()
    query.filter.return_value.all.return_value = return_value
    return query


def test_add_update_scoresheet_returns_409_for_referenced_removals(
    test_client: TestClient, mock_db_session: Session
) -> None:
    move_kept = MagicMock(spec=AvailableMoves)
    move_kept.id = UUID("11111111-1111-1111-1111-111111111111")
    move_kept.sheet_id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
    move_kept.name = "Kept Move"
    move_kept.fl_score = 10
    move_kept.rb_score = 20
    move_kept.direction = "LR"
    move_kept.display_order = 0

    move_removed = MagicMock(spec=AvailableMoves)
    move_removed.id = UUID("22222222-2222-2222-2222-222222222222")
    move_removed.sheet_id = move_kept.sheet_id
    move_removed.name = "Removed Move"
    move_removed.fl_score = 30
    move_removed.rb_score = 40
    move_removed.direction = "FB"
    move_removed.display_order = 1

    bonus_kept = MagicMock(spec=AvailableBonuses)
    bonus_kept.id = UUID("33333333-3333-3333-3333-333333333333")
    bonus_kept.sheet_id = move_kept.sheet_id
    bonus_kept.move_id = move_kept.id
    bonus_kept.name = "Kept Bonus"
    bonus_kept.score = 5
    bonus_kept.display_order = 0

    bonus_removed = MagicMock(spec=AvailableBonuses)
    bonus_removed.id = UUID("44444444-4444-4444-4444-444444444444")
    bonus_removed.sheet_id = move_kept.sheet_id
    bonus_removed.move_id = move_removed.id
    bonus_removed.name = "Removed Bonus"
    bonus_removed.score = 7
    bonus_removed.display_order = 1

    mock_db_session.query.side_effect = [
        _build_query_mock([move_kept, move_removed]),
        _build_query_mock([bonus_kept, bonus_removed]),
        _build_query_mock([(bonus_removed.id,)]),
        _build_query_mock([]),
    ]

    response = test_client.post(
        f"/addUpdateScoresheet/{move_kept.sheet_id}",
        json={
            "moves": [
                {
                    "id": str(move_kept.id),
                    "sheet_id": str(move_kept.sheet_id),
                    "name": move_kept.name,
                    "fl_score": move_kept.fl_score,
                    "rb_score": move_kept.rb_score,
                    "direction": move_kept.direction,
                    "display_order": 0,
                }
            ],
            "bonuses": [
                {
                    "id": str(bonus_kept.id),
                    "sheet_id": str(bonus_kept.sheet_id),
                    "move_id": str(bonus_kept.move_id),
                    "name": bonus_kept.name,
                    "score": bonus_kept.score,
                    "display_order": 0,
                }
            ],
        },
    )

    assert response.status_code == 409
    assert response.json()["detail"] == (
        "Cannot delete moves or bonuses that are used in scored runs. "
        "Update the scoresheet without removing referenced items."
    )
    assert mock_db_session.delete.call_count == 0


def test_add_update_scoresheet_upserts_and_deletes_unreferenced_items(
    test_client: TestClient, mock_db_session: Session
) -> None:
    sheet_id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")

    move_existing = MagicMock(spec=AvailableMoves)
    move_existing.id = UUID("11111111-1111-1111-1111-111111111111")
    move_existing.sheet_id = sheet_id
    move_existing.name = "Original Name"
    move_existing.fl_score = 10
    move_existing.rb_score = 20
    move_existing.direction = "LR"
    move_existing.display_order = 0

    move_to_delete = MagicMock(spec=AvailableMoves)
    move_to_delete.id = UUID("22222222-2222-2222-2222-222222222222")
    move_to_delete.sheet_id = sheet_id
    move_to_delete.name = "Delete Me"
    move_to_delete.fl_score = 30
    move_to_delete.rb_score = 40
    move_to_delete.direction = "FB"
    move_to_delete.display_order = 1

    bonus_existing = MagicMock(spec=AvailableBonuses)
    bonus_existing.id = UUID("33333333-3333-3333-3333-333333333333")
    bonus_existing.sheet_id = sheet_id
    bonus_existing.move_id = move_existing.id
    bonus_existing.name = "Original Bonus"
    bonus_existing.score = 5
    bonus_existing.display_order = 0

    bonus_to_delete = MagicMock(spec=AvailableBonuses)
    bonus_to_delete.id = UUID("44444444-4444-4444-4444-444444444444")
    bonus_to_delete.sheet_id = sheet_id
    bonus_to_delete.move_id = move_to_delete.id
    bonus_to_delete.name = "Delete Bonus"
    bonus_to_delete.score = 7
    bonus_to_delete.display_order = 1

    mock_db_session.query.side_effect = [
        _build_query_mock([move_existing, move_to_delete]),
        _build_query_mock([bonus_existing, bonus_to_delete]),
        _build_query_mock([]),
        _build_query_mock([]),
    ]

    new_move_id = UUID("55555555-5555-5555-5555-555555555555")
    new_bonus_id = UUID("66666666-6666-6666-6666-666666666666")

    response = test_client.post(
        f"/addUpdateScoresheet/{sheet_id}",
        json={
            "moves": [
                {
                    "id": str(move_existing.id),
                    "sheet_id": str(sheet_id),
                    "name": "Updated Name",
                    "fl_score": 11,
                    "rb_score": 22,
                    "direction": "FB",
                    "display_order": 0,
                },
                {
                    "id": str(new_move_id),
                    "sheet_id": str(sheet_id),
                    "name": "New Move",
                    "fl_score": 99,
                    "rb_score": 88,
                    "direction": "S",
                    "display_order": 1,
                },
            ],
            "bonuses": [
                {
                    "id": str(bonus_existing.id),
                    "sheet_id": str(sheet_id),
                    "move_id": str(move_existing.id),
                    "name": "Updated Bonus",
                    "score": 8,
                    "display_order": 0,
                },
                {
                    "id": str(new_bonus_id),
                    "sheet_id": str(sheet_id),
                    "move_id": str(new_move_id),
                    "name": "New Bonus",
                    "score": 3,
                    "display_order": 1,
                },
            ],
        },
    )

    assert response.status_code == 200
    assert move_existing.name == "Updated Name"
    assert move_existing.fl_score == 11
    assert move_existing.rb_score == 22
    assert move_existing.direction == "FB"
    assert bonus_existing.name == "Updated Bonus"
    assert bonus_existing.score == 8

    added_records = [call.args[0] for call in mock_db_session.add.call_args_list]
    assert any(
        isinstance(record, AvailableMoves) and record.id == new_move_id
        for record in added_records
    )
    assert any(
        isinstance(record, AvailableBonuses) and record.id == new_bonus_id
        for record in added_records
    )

    deleted_records = [call.args[0] for call in mock_db_session.delete.call_args_list]
    assert move_to_delete in deleted_records
    assert bonus_to_delete in deleted_records
