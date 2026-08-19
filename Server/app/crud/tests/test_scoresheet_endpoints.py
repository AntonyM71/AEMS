from unittest.mock import MagicMock
from uuid import UUID

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import AvailableBonuses, AvailableMoves


def _build_query_mock(return_value):  # noqa: ANN001, ANN202
    query = MagicMock()
    query.filter.return_value.all.return_value = return_value
    return query


def _create_move_mock(  # noqa: ANN001, ANN201
    move_id: UUID,
    sheet_id: UUID,
    name: str,
    fl_score: int,
    rb_score: int,
    direction: str,
    display_order: int,
) -> MagicMock:
    move = MagicMock(spec=AvailableMoves)
    move.id = move_id
    move.sheet_id = sheet_id
    move.name = name
    move.fl_score = fl_score
    move.rb_score = rb_score
    move.direction = direction
    move.display_order = display_order
    return move


def _create_bonus_mock(  # noqa: ANN001, ANN201
    bonus_id: UUID,
    sheet_id: UUID,
    move_id: UUID,
    name: str,
    score: int,
    display_order: int,
) -> MagicMock:
    bonus = MagicMock(spec=AvailableBonuses)
    bonus.id = bonus_id
    bonus.sheet_id = sheet_id
    bonus.move_id = move_id
    bonus.name = name
    bonus.score = score
    bonus.display_order = display_order
    return bonus


def _move_to_request_dict(move, display_order=None):  # noqa: ANN001, ANN202
    return {
        "id": str(move.id),
        "sheet_id": str(move.sheet_id),
        "name": move.name,
        "fl_score": move.fl_score,
        "rb_score": move.rb_score,
        "direction": move.direction,
        "display_order": move.display_order if display_order is None else display_order,
    }


def _bonus_to_request_dict(bonus, display_order=None):  # noqa: ANN001, ANN202
    return {
        "id": str(bonus.id),
        "sheet_id": str(bonus.sheet_id),
        "move_id": str(bonus.move_id),
        "name": bonus.name,
        "score": bonus.score,
        "display_order": bonus.display_order if display_order is None else display_order,
    }


def test_add_update_scoresheet_returns_409_for_referenced_removals(
    test_client: TestClient, mock_db_session: Session
) -> None:
    sheet_id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")
    move_kept = _create_move_mock(
        UUID("11111111-1111-1111-1111-111111111111"),
        sheet_id,
        "Kept Move",
        10,
        20,
        "LR",
        0,
    )
    move_removed = _create_move_mock(
        UUID("22222222-2222-2222-2222-222222222222"),
        sheet_id,
        "Removed Move",
        30,
        40,
        "FB",
        1,
    )
    bonus_kept = _create_bonus_mock(
        UUID("33333333-3333-3333-3333-333333333333"),
        sheet_id,
        move_kept.id,
        "Kept Bonus",
        5,
        0,
    )
    bonus_removed = _create_bonus_mock(
        UUID("44444444-4444-4444-4444-444444444444"),
        sheet_id,
        move_removed.id,
        "Removed Bonus",
        7,
        1,
    )

    mock_db_session.query.side_effect = [
        _build_query_mock([move_kept, move_removed]),
        _build_query_mock([bonus_kept, bonus_removed]),
        _build_query_mock([(move_removed.id,)]),
        _build_query_mock([(bonus_removed.id,)]),
        _build_query_mock([]),
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

    move_existing = _create_move_mock(
        UUID("11111111-1111-1111-1111-111111111111"),
        sheet_id,
        "Original Name",
        10,
        20,
        "LR",
        0,
    )
    move_to_delete = _create_move_mock(
        UUID("22222222-2222-2222-2222-222222222222"),
        sheet_id,
        "Delete Me",
        30,
        40,
        "FB",
        1,
    )
    bonus_existing = _create_bonus_mock(
        UUID("33333333-3333-3333-3333-333333333333"),
        sheet_id,
        move_existing.id,
        "Original Bonus",
        5,
        0,
    )
    bonus_to_delete = _create_bonus_mock(
        UUID("44444444-4444-4444-4444-444444444444"),
        sheet_id,
        move_to_delete.id,
        "Delete Bonus",
        7,
        1,
    )

    mock_db_session.query.side_effect = [
        _build_query_mock([move_existing, move_to_delete]),
        _build_query_mock([bonus_existing, bonus_to_delete]),
        _build_query_mock([]),
        _build_query_mock([]),
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


def test_add_update_scoresheet_returns_409_for_referenced_definition_changes(
    test_client: TestClient, mock_db_session: Session
) -> None:
    sheet_id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")

    move_existing = AvailableMoves(
        id=UUID("11111111-1111-1111-1111-111111111111"),
        sheet_id=sheet_id,
        name="Original Name",
        fl_score=10,
        rb_score=20,
        direction="LR",
        display_order=0,
    )

    bonus_existing = AvailableBonuses(
        id=UUID("33333333-3333-3333-3333-333333333333"),
        sheet_id=sheet_id,
        move_id=move_existing.id,
        name="Original Bonus",
        score=5,
        display_order=0,
    )

    mock_db_session.query.side_effect = [
        _build_query_mock([move_existing]),
        _build_query_mock([bonus_existing]),
        _build_query_mock([(move_existing.id,)]),
        _build_query_mock([(bonus_existing.id,)]),
    ]

    move_request = _move_to_request_dict(move_existing)
    move_request["name"] = "Updated Name"
    move_request["display_order"] = 1

    bonus_request = _bonus_to_request_dict(bonus_existing)
    bonus_request["name"] = "Updated Bonus"
    bonus_request["display_order"] = 1

    response = test_client.post(
        f"/addUpdateScoresheet/{sheet_id}",
        json={"moves": [move_request], "bonuses": [bonus_request]},
    )

    assert response.status_code == 409
    assert response.json()["detail"] == (
        "Referenced moves and bonuses can only update display order."
    )
    assert move_existing.name == "Original Name"
    assert bonus_existing.name == "Original Bonus"
    assert mock_db_session.add.call_count == 0
    assert mock_db_session.delete.call_count == 0


def test_add_update_scoresheet_allows_display_order_updates_for_referenced_items(
    test_client: TestClient, mock_db_session: Session
) -> None:
    sheet_id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa")

    move_existing = AvailableMoves(
        id=UUID("11111111-1111-1111-1111-111111111111"),
        sheet_id=sheet_id,
        name="Original Name",
        fl_score=10,
        rb_score=20,
        direction="LR",
        display_order=0,
    )

    bonus_existing = AvailableBonuses(
        id=UUID("33333333-3333-3333-3333-333333333333"),
        sheet_id=sheet_id,
        move_id=move_existing.id,
        name="Original Bonus",
        score=5,
        display_order=0,
    )

    mock_db_session.query.side_effect = [
        _build_query_mock([move_existing]),
        _build_query_mock([bonus_existing]),
        _build_query_mock([(move_existing.id,)]),
        _build_query_mock([(bonus_existing.id,)]),
    ]

    move_request = _move_to_request_dict(move_existing, display_order=1)
    bonus_request = _bonus_to_request_dict(bonus_existing, display_order=1)

    response = test_client.post(
        f"/addUpdateScoresheet/{sheet_id}",
        json={"moves": [move_request], "bonuses": [bonus_request]},
    )

    assert response.status_code == 200
    assert move_existing.display_order == 1
    assert bonus_existing.display_order == 1
    assert move_existing.name == "Original Name"
    assert bonus_existing.name == "Original Bonus"
