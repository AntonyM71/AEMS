from uuid import UUID

import pytest

from app.scoring.scoring_logic import (
    AthleteMoves,
    AthleteMovesWithJudgeInfo,
    AthleteScoreInfo,
    AthleteScores,
    AvailableBonuses,
    AvailableMoves,
    JudgeMoves,
    JudgeScores,
    MixedUpScoresheetExceptionError,
    PydanticRunStatus,
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
    RunMoves,
    RunScores,
    calculate_heat_scores,
    calculate_rank,
    calculate_run_score,
    organise_moves_by_athlete_run_judge,
)


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
        ),
        AvailableMoves(
            id="17e3baf1-ce39-4a1f-971b-efea37d84aad",
            sheet_id="3e1104be-6a11-4541-a6e2-00445cd94421",
            name="Trophy 1",
            fl_score=9,
            rb_score=0,
            direction="S",
        ),
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
        ),
        AvailableBonuses(
            id="3883d4f2-7592-45a2-b7d4-22ca20d546b2",
            sheet_id="3e1104be-6a11-4541-a6e2-00445cd94421",
            move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
            name="test_bonus_2",
            score=5,
        ),
    ]


class TestScoring:
    def test_it_returns_zero_with_no_moves(self) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = []
        scored_bonuses: list[PydanticScoredBonusesResponse] = []
        available_moves: list[AvailableMoves] = []
        available_bonuses: list[AvailableBonuses] = []

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 0

    def test_it_returns_zero_with_no_moves_and_a_valid_scoresheet(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = []
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 0

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

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 10

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
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 10

    def test_it_returns_9_with_a_duplicated_scored_trophy_move_and_a_valid_scoresheet(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        scored_moves: list[PydanticScoredMovesResponse] = [
            PydanticScoredMovesResponse(
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aad",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="S",
            ),
            PydanticScoredMovesResponse(
                id="e677b594-f4a8-4549-a5a2-642e4c29a33a",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aad",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="S",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 9

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
                direction="B",
            )
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 20

    def test_it_returns_30_with_scored_front_and_back_move_and_a_valid_scoresheet(
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
                direction="F",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 30

    def test_it_returns_25_with_scored_back_move_with_a_bonus_and_a_valid_scoresheet(
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
            )
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = [
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            )
        ]

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 25

    def test_it_returns_35_with_scored_back_and_front_move_with_a_bonus_and_a_valid_scoresheet(
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
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="F",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = [
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            )
        ]

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 35

    def test_it_returns_25_with_scored_back_move_with_a_duplicated_bonus_and_a_valid_scoresheet(
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
            )
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = [
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
        ]

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 25

    def test_it_returns_30_with_two_of_the_same_moves_that_have_different_bonuses_scored(
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
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = [
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b2",
                judge_id="meg",
            ),
        ]

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 30

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
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == 20

    def test_it_returns_the_highest_scoring_move(
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
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="F",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = [
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
        ]

        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.highest_scoring_move == 25

    def test_it_raises_an_error_for_moves_with_different_judges(
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
                judge_id="dave",
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
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []
        with pytest.raises(
            MixedUpScoresheetExceptionError,
            match="Move List contains moves from different judges",
        ):
            calculate_run_score(
                scored_moves,
                scored_bonuses,
                available_bonuses=available_bonuses,
                available_moves=available_moves,
            )

    def test_it_raises_an_error_for_moves_with_different_run_numbers(
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
                run_number="2",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []
        with pytest.raises(
            MixedUpScoresheetExceptionError,
            match="Move List contains moves from different run_numbers",
        ):
            calculate_run_score(
                scored_moves,
                scored_bonuses,
                available_bonuses=available_bonuses,
                available_moves=available_moves,
            )

    def test_it_raises_an_error_for_moves_with_different_athlete_ids(
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
                athlete_id="c7476320-6c48-11ee-b962-0242ac120001",
                direction="B",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []
        with pytest.raises(
            MixedUpScoresheetExceptionError,
            match="Move List contains moves from different athlete_ids",
        ):
            calculate_run_score(
                scored_moves,
                scored_bonuses,
                available_bonuses=available_bonuses,
                available_moves=available_moves,
            )

    def test_it_raises_an_error_for_moves_with_different_heat_ids(
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
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676c",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []
        with pytest.raises(
            MixedUpScoresheetExceptionError,
            match="Move List contains moves from different heat_ids",
        ):
            calculate_run_score(
                scored_moves,
                scored_bonuses,
                available_bonuses=available_bonuses,
                available_moves=available_moves,
            )

    def test_it_raises_an_error_for_moves_with_different_phase_ids(
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
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc6",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = []
        with pytest.raises(
            MixedUpScoresheetExceptionError,
            match="Move List contains moves from different phase_ids",
        ):
            calculate_run_score(
                scored_moves,
                scored_bonuses,
                available_bonuses=available_bonuses,
                available_moves=available_moves,
            )


class TestMoveOrganising:
    def test_it_returns_an_empty_array_with_no_moves(self) -> None:
        got = organise_moves_by_athlete_run_judge([], [])

        want: list[AthleteMoves] = []
        assert got == want

    def test_it_returns_a_pydantic_class_for_one_athlete(self) -> None:
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
            )
        ]
        got = organise_moves_by_athlete_run_judge(
            scored_moves,
            [],
        )

        want: list[AthleteMoves] = [
            AthleteMoves(
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            )
                        ],
                    )
                ],
            )
        ]
        assert got == want

    def test_it_returns_a_pydantic_class_for_one_athlete_with_two_judges(self) -> None:
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
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="1",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="dave",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        got = organise_moves_by_athlete_run_judge(
            scored_moves,
            [],
        )

        want: list[AthleteMoves] = [
            AthleteMoves(
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="dave",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="dave",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            ),
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            ),
                        ],
                    )
                ],
            )
        ]
        assert got == want

    def test_it_returns_a_pydantic_class_for_one_athlete_with_two_runs(self) -> None:
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
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="2",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        got = organise_moves_by_athlete_run_judge(
            scored_moves,
            [],
        )

        want: list[AthleteMoves] = [
            AthleteMoves(
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            )
                        ],
                    ),
                    RunMoves(
                        run=2,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="2",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            )
                        ],
                    ),
                ],
            )
        ]
        assert got == want

    def test_it_returns_a_pydantic_class_for_one_athlete_with_two_runs_and_bonuses(
        self,
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
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="2",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = [
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
        ]
        got = organise_moves_by_athlete_run_judge(
            scored_moves,
            scored_bonuses,
        )

        want: list[AthleteMoves] = [
            AthleteMoves(
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                    RunMoves(
                        run=2,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="2",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                ],
            )
        ]
        assert got == want


class TestAthleteScoreCalculation:
    def test_it_returns_a_scores_object_for_a_set_of_athlete_moves(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        athlete_moves: list[AthleteMovesWithJudgeInfo] = [
            AthleteMovesWithJudgeInfo(
                number_of_judges=3,
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                    RunMoves(
                        run=2,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="2",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            )
                        ],
                    ),
                ],
            )
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120002"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=8.33,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=6.67,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=8.33,
            )
        ]
        got = calculate_heat_scores(
            athlete_moves_list=athlete_moves,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[],
            scoring_runs=1,
        )

        assert got == want

    def test_it_assigns_a_run_as_locked_based_on_its_runstatus(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        athlete_moves: list[AthleteMovesWithJudgeInfo] = [
            AthleteMovesWithJudgeInfo(
                number_of_judges=3,
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                    RunMoves(
                        run=2,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="2",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            )
                        ],
                    ),
                ],
            )
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120002"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=8.33,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=True,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=6.67,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=8.33,
            )
        ]
        got = calculate_heat_scores(
            athlete_moves_list=athlete_moves,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[
                PydanticRunStatus(
                    id="c7476320-6c48-11ee-b962-0242ac120002",
                    athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                    heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                    run_number=1,
                    phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                    locked=True,
                    did_not_start=False,
                )
            ],
            scoring_runs=1,
        )

        assert got == want

    def test_it_assigns_a_run_as_dns_based_on_its_runstatus(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        athlete_moves: list[AthleteMovesWithJudgeInfo] = [
            AthleteMovesWithJudgeInfo(
                number_of_judges=3,
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                    RunMoves(
                        run=2,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="2",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            )
                        ],
                    ),
                ],
            )
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120002"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=8.33,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=True,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=0,
                        highest_scoring_move=0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=8.33,
            )
        ]
        got = calculate_heat_scores(
            athlete_moves_list=athlete_moves,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[
                PydanticRunStatus(
                    id="c7476320-6c48-11ee-b962-0242ac120002",
                    athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                    heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                    run_number=1,
                    phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                    locked=False,
                    did_not_start=True,
                )
            ],
            scoring_runs=1,
        )

        assert got == want

    def test_it_returns_a_pydantic_class_for_one_athlete_with_two_runs_and_bonuses(
        self,
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
                id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                run_number="2",
                phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                judge_id="meg",
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                direction="B",
            ),
        ]
        scored_bonuses: list[PydanticScoredBonusesResponse] = [
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
            PydanticScoredBonusesResponse(
                id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                judge_id="meg",
            ),
        ]
        got = organise_moves_by_athlete_run_judge(
            scored_moves,
            scored_bonuses,
        )

        want: list[AthleteMoves] = [
            AthleteMoves(
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                    RunMoves(
                        run=2,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="2",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                ],
            )
        ]
        assert got == want

    def test_it_handles_too_many_judges_gracefully(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        athlete_moves: list[AthleteMovesWithJudgeInfo] = [
            AthleteMovesWithJudgeInfo(
                number_of_judges=3,
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            ),
                            JudgeMoves(
                                judge_id="josh",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            ),
                            JudgeMoves(
                                judge_id="Ibbo",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            ),
                            JudgeMoves(
                                judge_id="Jon",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            ),
                        ],
                    ),
                ],
            )
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120002"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            ),
                            JudgeScores(
                                judge_id="josh",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            ),
                            JudgeScores(
                                judge_id="Ibbo",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            ),
                            JudgeScores(
                                judge_id="Jon",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            ),
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=25,
            )
        ]
        got = calculate_heat_scores(
            athlete_moves_list=athlete_moves,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[],
            scoring_runs=1,
        )

        assert got == want

    def test_it_calculates_total_scores_for_multiple_runs(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        athlete_moves: list[AthleteMovesWithJudgeInfo] = [
            AthleteMovesWithJudgeInfo(
                athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                number_of_judges=3,
                run_moves=[
                    RunMoves(
                        run=1,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="1",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[
                                    PydanticScoredBonusesResponse(
                                        id="6a6ec3f8-a251-44c6-b7df-93543a7a5dbe",
                                        move_id="e2d65876-01b5-4607-8caf-ad0740f9e3e2",
                                        bonus_id="3883d4f2-7592-45a2-b7d4-22ca20d546b3",
                                        judge_id="meg",
                                    )
                                ],
                            )
                        ],
                    ),
                    RunMoves(
                        run=2,
                        judge_moves=[
                            JudgeMoves(
                                judge_id="meg",
                                scored_moves=[
                                    PydanticScoredMovesResponse(
                                        id="e2d65876-01b5-4607-8caf-ad0740f9e3e1",
                                        move_id="17e3baf1-ce39-4a1f-971b-efea37d84aae",
                                        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
                                        run_number="2",
                                        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
                                        judge_id="meg",
                                        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
                                        direction="B",
                                    )
                                ],
                                scored_bonuses=[],
                            )
                        ],
                    ),
                ],
            )
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120002"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=8.33,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=6.67,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=45 / 3,
            )
        ]
        got = calculate_heat_scores(
            athlete_moves_list=athlete_moves,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[],
            scoring_runs=2,
        )

        assert got == want


class TestAthleteRankCalculation:
    def test_it_returns_simple_ranks_based_on_total_score(
        self,
    ) -> None:
        scores = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=45,
            ),
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=1,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=2,
                total_score=45,
            ),
        ]

        got = calculate_rank(scores)
        assert got == want

    def test_it_doesnt_give_a_rank_to_a_paddler_that_dns_all_rides(
        self,
    ) -> None:
        scores = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=True,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=True,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=45,
            ),
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=True,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=True,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=None,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=1,
                total_score=45,
            ),
        ]

        got = calculate_rank(scores)
        assert got == want

    def test_it_breaks_a_tie_with_highest_scoring_run(
        self,
    ) -> None:
        [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=30, highest_scoring_move=30
                                ),
                            )
                        ],
                        mean_run_score=30.0,
                        highest_scoring_move=30.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=30.0,
                total_score=50,
            ),
        ]

    def test_it_breaks_a_tie_with_dropped_run_run(
        self,
    ) -> None:
        scores = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=5, highest_scoring_move=5
                                ),
                            )
                        ],
                        mean_run_score=5.0,
                        highest_scoring_move=5.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=10, highest_scoring_move=10
                                ),
                            )
                        ],
                        mean_run_score=10.0,
                        highest_scoring_move=10.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
        ]
        want = [
            AthleteScores(
                athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25.0, highest_scoring_move=25.0
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                        locked=False,
                        did_not_start=False,
                    ),
                    RunScores(
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25.0, highest_scoring_move=25.0
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                        locked=False,
                        did_not_start=False,
                    ),
                    RunScores(
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=5.0, highest_scoring_move=5.0
                                ),
                            )
                        ],
                        mean_run_score=5.0,
                        highest_scoring_move=5.0,
                        locked=False,
                        did_not_start=False,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=2,
                reason="TieBreak: Resolved by Tiebreak Engine",
                total_score=50.0,
                last_phase_rank=None,
            ),
            AthleteScores(
                athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25.0, highest_scoring_move=25.0
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                        locked=False,
                        did_not_start=False,
                    ),
                    RunScores(
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25.0, highest_scoring_move=25.0
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                        locked=False,
                        did_not_start=False,
                    ),
                    RunScores(
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=10.0, highest_scoring_move=10.0
                                ),
                            )
                        ],
                        mean_run_score=10.0,
                        highest_scoring_move=10.0,
                        locked=False,
                        did_not_start=False,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=1,
                reason="TieBreak: Resolved by Tiebreak Engine",
                total_score=50.0,
                last_phase_rank=None,
            ),
        ]

        got = calculate_rank(scores)
        assert got == want

    def test_it_breaks_a_tie_with_three_paddlers_using_highest_scoring_run(
        self,
    ) -> None:
        scores = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=30, highest_scoring_move=30
                                ),
                            )
                        ],
                        mean_run_score=30.0,
                        highest_scoring_move=30.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=30.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=35, highest_scoring_move=35
                                ),
                            )
                        ],
                        mean_run_score=35.0,
                        highest_scoring_move=35.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=35.0,
                total_score=50,
            ),
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=3,
                total_score=50,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=30, highest_scoring_move=30
                                ),
                            )
                        ],
                        mean_run_score=30.0,
                        highest_scoring_move=30.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=30.0,
                ranking=2,
                total_score=50,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=35, highest_scoring_move=35
                                ),
                            )
                        ],
                        mean_run_score=35.0,
                        highest_scoring_move=35.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=35.0,
                total_score=50,
                ranking=1,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
        ]

        got = calculate_rank(scores)
        assert got == want

    def test_it_breaks_a_tie_with_three_paddlers_using_highest_scoring_move(
        self,
    ) -> None:
        scores = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=35, highest_scoring_move=35
                                ),
                            )
                        ],
                        mean_run_score=35.0,
                        highest_scoring_move=35.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=35.0,
                total_score=50,
            ),
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=2,
                total_score=50,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=3,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=20, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=20.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=3,
                total_score=50,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=35, highest_scoring_move=35
                                ),
                            )
                        ],
                        mean_run_score=35.0,
                        highest_scoring_move=35.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=35.0,
                total_score=50,
                ranking=1,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
        ]

        got = calculate_rank(scores)
        assert got == want

    def test_it_breaks_a_tie_with_three_paddlers_using_highest_scored_move(
        self,
    ) -> None:
        scores = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=20.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=20.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=35, highest_scoring_move=35
                                ),
                            )
                        ],
                        mean_run_score=35.0,
                        highest_scoring_move=35.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=35.0,
                total_score=50,
            ),
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=20.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=20.0,
                ranking=3,
                total_score=50,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=2,
                total_score=50,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=35, highest_scoring_move=35
                                ),
                            )
                        ],
                        mean_run_score=35.0,
                        highest_scoring_move=35.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=35.0,
                total_score=50,
                ranking=1,
                reason="TieBreak: Resolved by Tiebreak Engine",
            ),
        ]

        got = calculate_rank(scores)
        assert got == want

    def test_it_returns_tied_ranks_for_an_actual_tie(
        self,
    ) -> None:
        scores = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                total_score=50,
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=30, highest_scoring_move=30
                                ),
                            )
                        ],
                        mean_run_score=30.0,
                        highest_scoring_move=30.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=30.0,
                total_score=45,
            ),
        ]

        want = [
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120003"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=20.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=1,
                total_score=50,
                reason="TieBreak: Fully Tied",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120004"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=25
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=25, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=25.0,
                        highest_scoring_move=25.0,
                    ),
                ],
                highest_scoring_move=25.0,
                ranking=1,
                total_score=50,
                reason="TieBreak: Fully Tied",
            ),
            AthleteScores(
                athlete_id=("c7476320-6c48-11ee-b962-0242ac120005"),
                run_scores=[
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=1,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=30, highest_scoring_move=30
                                ),
                            )
                        ],
                        mean_run_score=30.0,
                        highest_scoring_move=30.0,
                    ),
                    RunScores(
                        did_not_start=False,
                        locked=False,
                        run_number=2,
                        judge_scores=[
                            JudgeScores(
                                judge_id="meg",
                                score_info=AthleteScoreInfo(
                                    score=15, highest_scoring_move=20
                                ),
                            )
                        ],
                        mean_run_score=15.0,
                        highest_scoring_move=15.0,
                    ),
                ],
                highest_scoring_move=30.0,
                total_score=45,
                ranking=2,
                reason=None,
            ),
        ]

        got = calculate_rank(scores)
        assert got == want
