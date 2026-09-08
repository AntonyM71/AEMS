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
    build_tie_break_reason,
    calculate_heat_scores,
    calculate_rank,
    calculate_run_score,
    organise_moves_by_athlete_run_judge,
)


def _tied_athlete(
    athlete_id: str,
    run_means: list[float],
    highest_move: float,
    total_score: float = 50.0,
) -> AthleteScores:
    return AthleteScores(
        athlete_id=UUID(athlete_id),
        run_scores=[
            RunScores(
                run_number=i + 1,
                judge_scores=[
                    JudgeScores(
                        judge_id="j",
                        score_info=AthleteScoreInfo(
                            score=mean, highest_scoring_move=mean
                        ),
                    )
                ],
                mean_run_score=mean,
                highest_scoring_move=mean,
                locked=False,
                did_not_start=False,
            )
            for i, mean in enumerate(run_means)
        ],
        highest_scoring_move=highest_move,
        total_score=total_score,
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
                        locked=True,
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
                        mean_run_score=0,
                        highest_scoring_move=0,
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
                highest_scoring_move=20.0,
                total_score=6.67,
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
        aid = "c7476320-6c48-11ee-b962-0242ac120003"
        scores = [
            _tied_athlete(aid, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(aid, [25.0, 20.0], highest_move=25.0, total_score=45.0),
        ]

        want = [
            _tied_athlete(aid, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(aid, [25.0, 20.0], highest_move=25.0, total_score=45.0),
        ]
        want[0].ranking = 1
        want[1].ranking = 2

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
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        scores = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_4, [30.0, 20.0], highest_move=25.0),
        ]

        reason = "Tie resolved by highest scoring run: #4 (30.00), #3 (25.00)"
        want = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_4, [30.0, 20.0], highest_move=25.0),
        ]
        want[0].ranking = 2
        want[0].reason = reason
        want[1].ranking = 1
        want[1].reason = reason

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4"},
        )
        assert got == want

    def test_it_breaks_a_tie_with_dropped_run_run(
        self,
    ) -> None:
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        scores = [
            _tied_athlete(id_3, [25.0, 25.0, 5.0], highest_move=25.0),
            _tied_athlete(id_4, [25.0, 25.0, 10.0], highest_move=25.0),
        ]

        reason = "Tie resolved by 3rd highest scoring run: #4 (10.00), #3 (5.00)"
        want = [
            _tied_athlete(id_3, [25.0, 25.0, 5.0], highest_move=25.0),
            _tied_athlete(id_4, [25.0, 25.0, 10.0], highest_move=25.0),
        ]
        want[0].ranking = 2
        want[0].reason = reason
        want[1].ranking = 1
        want[1].reason = reason

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4"},
        )
        assert got == want

    def test_it_breaks_a_tie_with_three_paddlers_using_highest_scoring_run(
        self,
    ) -> None:
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        id_5 = "c7476320-6c48-11ee-b962-0242ac120005"
        scores = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_4, [30.0, 20.0], highest_move=30.0),
            _tied_athlete(id_5, [35.0, 15.0], highest_move=35.0),
        ]

        top_reason = "Tie resolved by highest scoring run: #5 (35.00), #4 (30.00)"
        want = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_4, [30.0, 20.0], highest_move=30.0),
            _tied_athlete(id_5, [35.0, 15.0], highest_move=35.0),
        ]
        want[0].ranking = 3
        want[0].reason = "Tie resolved by highest scoring run: #4 (30.00), #3 (25.00)"
        want[1].ranking = 2
        want[1].reason = top_reason
        want[2].ranking = 1
        want[2].reason = top_reason

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4", UUID(id_5): "5"},
        )
        assert got == want

    def test_it_breaks_a_three_way_tie_by_third_run_then_highest_move(
        self,
    ) -> None:
        # #5 clears the field on the 3rd run; #3 and #4 tie on every run and
        # are split only by the highest scoring move.
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        id_5 = "c7476320-6c48-11ee-b962-0242ac120005"
        # deliberately not in finishing order
        scores = [
            _tied_athlete(id_4, [30.0, 30.0, 10.0], highest_move=20.0),
            _tied_athlete(id_3, [30.0, 30.0, 10.0], highest_move=25.0),
            _tied_athlete(id_5, [30.0, 30.0, 20.0], highest_move=15.0),
        ]

        run_reason = "Tie resolved by 3rd highest scoring run: #5 (20.00), #3 (10.00)"
        want = [
            _tied_athlete(id_4, [30.0, 30.0, 10.0], highest_move=20.0),
            _tied_athlete(id_3, [30.0, 30.0, 10.0], highest_move=25.0),
            _tied_athlete(id_5, [30.0, 30.0, 20.0], highest_move=15.0),
        ]
        want[0].ranking = 3
        want[0].reason = "Tie resolved by highest scoring move: #3 (25.00), #4 (20.00)"
        want[1].ranking = 2
        want[1].reason = run_reason
        want[2].ranking = 1
        want[2].reason = run_reason

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4", UUID(id_5): "5"},
        )
        assert got == want

    def test_it_breaks_a_three_way_tie_across_successive_runs(
        self,
    ) -> None:
        # highest run peels off #3, second-highest run splits #4 from #5.
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        id_5 = "c7476320-6c48-11ee-b962-0242ac120005"
        scores = [
            _tied_athlete(id_5, [30.0, 25.0, 10.0], highest_move=10.0),
            _tied_athlete(id_4, [30.0, 30.0, 10.0], highest_move=10.0),
            _tied_athlete(id_3, [40.0, 30.0, 10.0], highest_move=10.0),
        ]

        top_reason = "Tie resolved by highest scoring run: #3 (40.00), #4 (30.00)"
        want = [
            _tied_athlete(id_5, [30.0, 25.0, 10.0], highest_move=10.0),
            _tied_athlete(id_4, [30.0, 30.0, 10.0], highest_move=10.0),
            _tied_athlete(id_3, [40.0, 30.0, 10.0], highest_move=10.0),
        ]
        want[0].ranking = 3
        want[
            0
        ].reason = "Tie resolved by 2nd highest scoring run: #4 (30.00), #5 (25.00)"
        want[1].ranking = 2
        want[1].reason = top_reason
        want[2].ranking = 1
        want[2].reason = top_reason

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4", UUID(id_5): "5"},
        )
        assert got == want

    def test_it_breaks_a_three_way_tie_entirely_on_the_highest_move(
        self,
    ) -> None:
        # identical on every run; only the highest scoring move separates them.
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        id_5 = "c7476320-6c48-11ee-b962-0242ac120005"
        scores = [
            _tied_athlete(id_5, [30.0, 30.0], highest_move=10.0),
            _tied_athlete(id_4, [30.0, 30.0], highest_move=20.0),
            _tied_athlete(id_3, [30.0, 30.0], highest_move=30.0),
        ]

        top_reason = "Tie resolved by highest scoring move: #3 (30.00), #4 (20.00)"
        want = [
            _tied_athlete(id_5, [30.0, 30.0], highest_move=10.0),
            _tied_athlete(id_4, [30.0, 30.0], highest_move=20.0),
            _tied_athlete(id_3, [30.0, 30.0], highest_move=30.0),
        ]
        want[0].ranking = 3
        want[0].reason = "Tie resolved by highest scoring move: #4 (20.00), #5 (10.00)"
        want[1].ranking = 2
        want[1].reason = top_reason
        want[2].ranking = 1
        want[2].reason = top_reason

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4", UUID(id_5): "5"},
        )
        assert got == want

    def test_it_breaks_a_tie_with_three_paddlers_using_highest_scored_move(
        self,
    ) -> None:
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        id_5 = "c7476320-6c48-11ee-b962-0242ac120005"
        scores = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=20.0),
            _tied_athlete(id_4, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_5, [35.0, 15.0], highest_move=35.0),
        ]

        top_reason = "Tie resolved by highest scoring run: #5 (35.00), #4 (25.00)"
        want = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=20.0),
            _tied_athlete(id_4, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_5, [35.0, 15.0], highest_move=35.0),
        ]
        want[0].ranking = 3
        want[0].reason = "Tie resolved by highest scoring move: #4 (25.00), #3 (20.00)"
        want[1].ranking = 2
        want[1].reason = top_reason
        want[2].ranking = 1
        want[2].reason = top_reason

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4", UUID(id_5): "5"},
        )
        assert got == want

    def test_it_returns_tied_ranks_for_an_actual_tie(
        self,
    ) -> None:
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        id_5 = "c7476320-6c48-11ee-b962-0242ac120005"
        scores = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_4, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_5, [30.0, 15.0], highest_move=30.0, total_score=45.0),
        ]

        unresolved = "Tie unresolved - athletes remain tied: #3, #4"
        want = [
            _tied_athlete(id_3, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_4, [25.0, 25.0], highest_move=25.0),
            _tied_athlete(id_5, [30.0, 15.0], highest_move=30.0, total_score=45.0),
        ]
        want[0].ranking = 1
        want[0].reason = unresolved
        want[1].ranking = 1
        want[1].reason = unresolved
        # #3 and #4 are tied for 1st, so the next athlete is 3rd (gap after the tie).
        want[2].ranking = 3

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4", UUID(id_5): "5"},
        )
        assert got == want

    def test_it_does_not_crash_on_a_mixed_run_count_tie(
        self,
    ) -> None:
        # supported but discouraged: #3 ran once, #4 ran twice, and the two
        # draw on every criterion once the missing run counts as 0.
        id_3 = "c7476320-6c48-11ee-b962-0242ac120003"
        id_4 = "c7476320-6c48-11ee-b962-0242ac120004"
        scores = [
            _tied_athlete(id_3, [10.0], highest_move=5.0, total_score=10.0),
            _tied_athlete(id_4, [10.0, 0.0], highest_move=5.0, total_score=10.0),
        ]

        got = calculate_rank(
            scores,
            bib_numbers={UUID(id_3): "3", UUID(id_4): "4"},
        )

        reasons = {a.athlete_id: a.reason for a in got}
        assert reasons[UUID(id_3)] == "Tie unresolved - athletes remain tied: #3, #4"
        assert reasons[UUID(id_4)] == "Tie unresolved - athletes remain tied: #3, #4"

    def test_it_ranks_a_resolved_pair_above_a_lower_scoring_tied_pair(
        self,
    ) -> None:
        # Issue #410: Freddie & Paul (215.0, separated by their best run) must
        # sit at 1 and 2, and Brian & Ringo (200.0, fully tied) at 3 and 3 -
        # not above the higher-scoring pair as the stale rank counter did.
        freddie = "c7476320-6c48-11ee-b962-0242ac120001"
        paul = "c7476320-6c48-11ee-b962-0242ac120002"
        brian = "c7476320-6c48-11ee-b962-0242ac120003"
        ringo = "c7476320-6c48-11ee-b962-0242ac120004"
        scores = [
            _tied_athlete(freddie, [30.0, 10.0], highest_move=9.0, total_score=50.0),
            _tied_athlete(paul, [20.0, 20.0], highest_move=8.0, total_score=50.0),
            _tied_athlete(brian, [20.0], highest_move=7.0, total_score=40.0),
            _tied_athlete(ringo, [20.0], highest_move=7.0, total_score=40.0),
        ]
        bibs = {
            UUID(freddie): "1",
            UUID(paul): "2",
            UUID(brian): "3",
            UUID(ringo): "4",
        }

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert got[UUID(freddie)].ranking == 1
        assert got[UUID(paul)].ranking == 2
        assert got[UUID(brian)].ranking == 3
        assert got[UUID(ringo)].ranking == 3
        assert got[UUID(freddie)].reason == (
            "Tie resolved by highest scoring run: #1 (30.00), #2 (20.00)"
        )
        assert got[UUID(brian)].reason == (
            "Tie unresolved - athletes remain tied: #3, #4"
        )

    def test_two_adjacent_fully_tied_pairs_each_get_a_gap(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {
            a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)
        }

        assert [ranks[UUID(u)] for u in ids] == [1, 1, 3, 3]

    def test_a_tied_pair_above_a_resolved_pair(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [30.0, 10.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {
            a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)
        }

        assert [ranks[UUID(u)] for u in ids] == [1, 1, 3, 4]

    def test_two_adjacent_resolved_pairs_number_sequentially(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [30.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [20.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [30.0, 10.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {
            a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)
        }

        assert [ranks[UUID(u)] for u in ids] == [1, 2, 3, 4]

    def test_three_adjacent_tied_groups(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 7)]
        scores = [
            _tied_athlete(ids[0], [30.0, 30.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(ids[1], [30.0, 30.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(ids[2], [40.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[4], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[5], [20.0, 20.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {
            a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)
        }

        assert [ranks[UUID(u)] for u in ids] == [1, 1, 3, 4, 5, 5]

    def test_a_solo_athlete_below_two_adjacent_tied_groups(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 6)]
        scores = [
            _tied_athlete(ids[0], [30.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[1], [20.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[3], [20.0, 20.0], highest_move=10.0, total_score=40.0),
            _tied_athlete(ids[4], [30.0, 0.0], highest_move=10.0, total_score=30.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {
            a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)
        }

        assert [ranks[UUID(u)] for u in ids] == [1, 2, 3, 3, 5]

    def test_a_gap_follows_an_unresolved_tie_that_is_not_for_first(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 5)]
        scores = [
            _tied_athlete(ids[0], [30.0, 0.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(ids[1], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[2], [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(ids[3], [20.0, 0.0], highest_move=10.0, total_score=40.0),
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        ranks = {
            a.athlete_id: a.ranking for a in calculate_rank(scores, bib_numbers=bibs)
        }

        assert [ranks[UUID(u)] for u in ids] == [1, 2, 2, 4]

    def test_a_whole_field_that_stays_fully_tied_all_gets_rank_one(self) -> None:
        ids = [f"c7476320-6c48-11ee-b962-0242ac12000{n}" for n in range(1, 4)]
        scores = [
            _tied_athlete(u, [25.0, 25.0], highest_move=10.0, total_score=50.0)
            for u in ids
        ]
        bibs = {UUID(u): str(i + 1) for i, u in enumerate(ids)}

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert [got[UUID(u)].ranking for u in ids] == [1, 1, 1]
        assert got[UUID(ids[0])].reason == (
            "Tie unresolved - athletes remain tied: #1, #2, #3"
        )

    def test_a_partially_resolved_group_of_three_below_a_solo(self) -> None:
        solo = "c7476320-6c48-11ee-b962-0242ac120001"
        clear = "c7476320-6c48-11ee-b962-0242ac120002"
        tied_a = "c7476320-6c48-11ee-b962-0242ac120003"
        tied_b = "c7476320-6c48-11ee-b962-0242ac120004"
        scores = [
            _tied_athlete(solo, [30.0, 0.0], highest_move=10.0, total_score=60.0),
            _tied_athlete(clear, [40.0, 10.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(tied_a, [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(tied_b, [25.0, 25.0], highest_move=10.0, total_score=50.0),
        ]
        bibs = {
            UUID(solo): "1",
            UUID(clear): "2",
            UUID(tied_a): "3",
            UUID(tied_b): "4",
        }

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert got[UUID(solo)].ranking == 1
        assert got[UUID(clear)].ranking == 2
        assert got[UUID(tied_a)].ranking == 3
        assert got[UUID(tied_b)].ranking == 3
        assert got[UUID(clear)].reason == (
            "Tie resolved by highest scoring run: #2 (40.00), #3 (25.00)"
        )
        assert got[UUID(tied_a)].reason == (
            "Tie unresolved - athletes remain tied: #3, #4"
        )

    def test_a_non_starter_with_the_top_score_does_not_push_down_a_tie(self) -> None:
        non_starter_id = "c7476320-6c48-11ee-b962-0242ac120009"
        id_1 = "c7476320-6c48-11ee-b962-0242ac120001"
        id_2 = "c7476320-6c48-11ee-b962-0242ac120002"
        non_starter = AthleteScores(
            athlete_id=UUID(non_starter_id),
            run_scores=[
                RunScores(
                    run_number=1,
                    judge_scores=[
                        JudgeScores(
                            judge_id="j",
                            score_info=AthleteScoreInfo(
                                score=99.0, highest_scoring_move=99.0
                            ),
                        )
                    ],
                    mean_run_score=99.0,
                    highest_scoring_move=99.0,
                    locked=False,
                    did_not_start=True,
                )
            ],
            highest_scoring_move=99.0,
            total_score=99.0,
        )
        scores = [
            non_starter,
            _tied_athlete(id_1, [25.0, 25.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(id_2, [25.0, 25.0], highest_move=10.0, total_score=50.0),
        ]
        bibs = {UUID(non_starter_id): "9", UUID(id_1): "1", UUID(id_2): "2"}

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=bibs)}

        assert got[UUID(non_starter_id)].ranking is None
        assert got[UUID(id_1)].ranking == 1
        assert got[UUID(id_2)].ranking == 1

    def test_the_reason_falls_back_to_athlete_id_when_no_bibs_are_given(self) -> None:
        id_1 = "c7476320-6c48-11ee-b962-0242ac120001"
        id_2 = "c7476320-6c48-11ee-b962-0242ac120002"
        scores = [
            _tied_athlete(id_1, [30.0, 20.0], highest_move=10.0, total_score=50.0),
            _tied_athlete(id_2, [25.0, 25.0], highest_move=10.0, total_score=50.0),
        ]

        got = {a.athlete_id: a for a in calculate_rank(scores, bib_numbers=None)}

        assert got[UUID(id_1)].ranking == 1
        assert got[UUID(id_2)].ranking == 2
        assert got[UUID(id_1)].reason == (
            f"Tie resolved by highest scoring run: athlete {UUID(id_1)} (30.00), "
            f"athlete {UUID(id_2)} (25.00)"
        )


A = "c7476320-6c48-11ee-b962-0242ac120001"
B = "c7476320-6c48-11ee-b962-0242ac120002"
C = "c7476320-6c48-11ee-b962-0242ac120003"


class TestBuildTieBreakReason:
    def test_it_names_the_highest_scoring_run(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=10.0),
            _tied_athlete(B, [25.0, 25.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by highest scoring run: #7 (30.00), #12 (25.00)"
        )

    def test_it_names_the_second_highest_scoring_run(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0, 10.0], highest_move=10.0),
            _tied_athlete(B, [30.0, 18.0, 12.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by 2nd highest scoring run: #7 (20.00), #12 (18.00)"
        )

    def test_it_names_the_third_highest_scoring_run(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0, 10.0], highest_move=10.0),
            _tied_athlete(B, [30.0, 20.0, 8.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by 3rd highest scoring run: #7 (10.00), #12 (8.00)"
        )

    def test_it_names_the_highest_scoring_move(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=25.0),
            _tied_athlete(B, [30.0, 20.0], highest_move=15.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie resolved by highest scoring move: #7 (25.00), #12 (15.00)"
        )

    def test_it_reports_an_unresolved_tie(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=10.0),
            _tied_athlete(B, [30.0, 20.0], highest_move=10.0),
        ]
        bibs = {UUID(A): "7", UUID(B): "12"}

        assert build_tie_break_reason(UUID(A), tied, bibs) == (
            "Tie unresolved - athletes remain tied: #7, #12"
        )

    def test_it_falls_back_to_athlete_id_when_no_bib(self) -> None:
        tied = [
            _tied_athlete(A, [30.0, 20.0], highest_move=10.0),
            _tied_athlete(B, [25.0, 25.0], highest_move=10.0),
        ]

        assert build_tie_break_reason(UUID(A), tied, None) == (
            f"Tie resolved by highest scoring run: athlete {UUID(A)} (30.00), "
            f"athlete {UUID(B)} (25.00)"
        )

    def test_it_compares_each_athlete_against_its_adjacent_rival(self) -> None:
        tied = [
            _tied_athlete(
                "c7476320-6c48-11ee-b962-0242ac120005",
                [35.0, 15.0],
                highest_move=10.0,
            ),
            _tied_athlete(A, [25.0, 25.0], highest_move=20.0),
            _tied_athlete(C, [25.0, 25.0], highest_move=12.0),
        ]
        bibs = {
            UUID("c7476320-6c48-11ee-b962-0242ac120005"): "5",
            UUID(A): "4",
            UUID(C): "3",
        }
        reasons = {
            aid: build_tie_break_reason(aid, tied, bibs)
            for aid in (
                UUID("c7476320-6c48-11ee-b962-0242ac120005"),
                UUID(A),
                UUID(C),
            )
        }
        assert reasons[UUID("c7476320-6c48-11ee-b962-0242ac120005")] == (
            "Tie resolved by highest scoring run: #5 (35.00), #4 (25.00)"
        )
        assert reasons[UUID(A)] == (
            "Tie resolved by highest scoring run: #5 (35.00), #4 (25.00)"
        )
        assert reasons[UUID(C)] == (
            "Tie resolved by highest scoring move: #4 (20.00), #3 (12.00)"
        )

    def test_fully_tied_pair_below_a_cleared_athlete_is_told_it_is_unresolved(
        self,
    ) -> None:
        cleared_id = "c7476320-6c48-11ee-b962-0242ac120005"
        tied = [
            _tied_athlete(
                cleared_id, [35.0, 15.0], highest_move=10.0, total_score=50.0
            ),
            _tied_athlete(A, [25.0, 25.0], highest_move=20.0, total_score=50.0),
            _tied_athlete(B, [25.0, 25.0], highest_move=20.0, total_score=50.0),
        ]
        bibs = {UUID(cleared_id): "5", UUID(A): "4", UUID(B): "3"}

        unresolved = "Tie unresolved - athletes remain tied: #4, #3"
        assert build_tie_break_reason(UUID(A), tied, bibs) == unresolved
        assert build_tie_break_reason(UUID(B), tied, bibs) == unresolved
        assert build_tie_break_reason(UUID(cleared_id), tied, bibs) == (
            "Tie resolved by highest scoring run: #5 (35.00), #4 (25.00)"
        )
