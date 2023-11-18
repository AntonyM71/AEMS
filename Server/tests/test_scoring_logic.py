import pytest
from app.customScoringEndpoints import (
    AvailableBonuses,
    AvailableMoves,
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
)
from app.scoring_logic import calculate_run_score


@pytest.fixture
def available_moves() -> list[AvailableMoves]:
    return [
        AvailableMoves(
            id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
            sheet_id="3e1104be-6a11-4541-a6e2-00445cd94421",
            name="test_1",
            fl_score=10,
            rb_score=20,
            direction="fb",
        )
    ]


@pytest.fixture()
def available_bonuses() -> list[AvailableBonuses]:
    return [
        AvailableBonuses(
            id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
            sheet_id="3e1104be-6a11-4541-a6e2-00445cd94421",
            move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
            name="test_bonus_1",
            score=5,
        )
    ]


class TestScoring:
    def test_it_returns_zero_with_no_moves(self) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = []
        scored_bonuses: list[PydanticScoredBonusesResponse] = []
        available_moves: list[AvailableMoves] = []
        available_bonuses: list[AvailableBonuses] = []

        score = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert score == 0

    def test_it_returns_zero_with_no_moves_and_a_valid_scoresheet(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = []
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        score = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert score == 0

    def test_it_returns_10_with_scored_front_move_and_a_valid_scoresheet(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = [
            PydanticScoredMovesResponse(
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="F",
            )
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        score = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert score == 10

    def test_it_returns_10_with_a_duplicated_scored_front_move_and_a_valid_scoresheet(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = [
            PydanticScoredMovesResponse(
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="F",
            ),
            PydanticScoredMovesResponse(
                id="e677b594-f4a8-4549-a5a2-642e4c29a33a",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="F",
            )
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        score = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert score == 10

    def test_it_returns_20_with_scored_back_move_and_a_valid_scoresheet(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = [
            PydanticScoredMovesResponse(
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="F",
            )
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        score = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert score == 20

    def test_it_returns_20_with_a_duplicated_scored_back_move_and_a_valid_scoresheet(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = [
            PydanticScoredMovesResponse(
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
            PydanticScoredMovesResponse(
                id="e677b594-f4a8-4549-a5a2-642e4c29a33a",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            )
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        score = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert score == 20
