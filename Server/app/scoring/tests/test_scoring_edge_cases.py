"""Pins scoring behaviour that test_scoring_logic.py leaves implicit.

Covers grouping order, bonus scoping, run-status matching, and the full
organise -> score -> rank pipeline, so the grouping and lookup internals can be
restructured without changing a result.
"""

from uuid import UUID

import pytest

from app.scoring.scoring_logic import (
    AthleteMoves,
    AthleteMovesWithJudgeInfo,
    AthleteScores,
    AvailableBonuses,
    AvailableMoves,
    PydanticRunStatus,
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
    calculate_heat_scores,
    calculate_rank,
    calculate_run_score,
    organise_moves_by_athlete_run_judge,
)
from app.scoring.tests.test_scoring_logic import (
    ATHLETE_ID,
    BACK_A,
    BACK_B,
    BACK_C,
    BONUS_1,
    BONUS_2,
    FRONT_A,
    ID_3,
    ID_4,
    MOVE_1,
    SCORED_A,
    SCORED_B,
    SCORED_BONUS_ID,
    SCORED_C,
    TROPHY,
    _bonus,
    _bonus_on,
    _judge_moves,
    _judge_score,
    _move,
    _run_moves,
    _run_scores,
)

SHEET_ID = "3e1104be-6a11-4541-a6e2-00445cd94421"


@pytest.fixture
def available_moves() -> list[AvailableMoves]:
    return [
        AvailableMoves(
            id=MOVE_1,
            sheet_id=SHEET_ID,
            name="test_1",
            fl_score=10,
            rb_score=20,
            direction="fb",
        ),
        AvailableMoves(
            id=TROPHY,
            sheet_id=SHEET_ID,
            name="Trophy 1",
            fl_score=9,
            rb_score=0,
            direction="S",
        ),
    ]


@pytest.fixture
def available_bonuses() -> list[AvailableBonuses]:
    return [
        AvailableBonuses(
            id=bonus_id,
            sheet_id=SHEET_ID,
            move_id=MOVE_1,
            name=f"bonus_{bonus_id[-1]}",
            score=5,
        )
        for bonus_id in (BONUS_1, BONUS_2)
    ]


def _run_status(
    athlete_id: str,
    run_number: int,
    *,
    locked: bool = False,
    did_not_start: bool = False,
) -> PydanticRunStatus:
    return PydanticRunStatus(
        id=SCORED_BONUS_ID,
        athlete_id=athlete_id,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        run_number=run_number,
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
        locked=locked,
        did_not_start=did_not_start,
    )


class TestMoveOrganisingEdgeCases:
    def test_athletes_come_back_in_athlete_id_order_whatever_the_input_order(
        self,
    ) -> None:
        later = _move(SCORED_B, MOVE_1, "F", athlete_id=ID_4)
        earlier = _move(SCORED_C, MOVE_1, "F", athlete_id=ID_3)

        got = organise_moves_by_athlete_run_judge([later, earlier], [])

        assert [a.athlete_id for a in got] == [UUID(ID_3), UUID(ID_4)]

    def test_runs_and_judges_are_sorted_and_moves_keep_their_input_order(
        self,
    ) -> None:
        run_2_zed = _move(SCORED_A, MOVE_1, "F", run_number="2", judge_id="zed")
        run_1_zed_second = _move(SCORED_C, MOVE_1, "B", judge_id="zed")
        run_1_amy = _move(SCORED_B, MOVE_1, "F", judge_id="amy")
        run_1_zed_first = _move(SCORED_A, TROPHY, "S", judge_id="zed")

        got = organise_moves_by_athlete_run_judge(
            [run_2_zed, run_1_zed_first, run_1_zed_second, run_1_amy], []
        )

        assert got == [
            AthleteMoves(
                athlete_id=ATHLETE_ID,
                run_moves=[
                    _run_moves(
                        1,
                        [
                            _judge_moves("amy", [run_1_amy], []),
                            _judge_moves(
                                "zed", [run_1_zed_first, run_1_zed_second], []
                            ),
                        ],
                    ),
                    _run_moves(2, [_judge_moves("zed", [run_2_zed], [])]),
                ],
            )
        ]

    def test_each_judges_bonuses_stay_with_that_judges_moves(self) -> None:
        megs_move = _move(SCORED_A, MOVE_1, "B", judge_id="meg")
        daves_move = _move(SCORED_B, MOVE_1, "B", judge_id="dave")
        megs_bonus = _bonus_on(SCORED_A)
        daves_bonus = _bonus(
            id=SCORED_C, move_id=SCORED_B, bonus_id=BONUS_1, judge_id="dave"
        )

        got = organise_moves_by_athlete_run_judge(
            [megs_move, daves_move], [megs_bonus, daves_bonus]
        )

        assert got[0].run_moves[0].judge_moves == [
            _judge_moves("dave", [daves_move], [daves_bonus]),
            _judge_moves("meg", [megs_move], [megs_bonus]),
        ]

    def test_bonuses_keep_their_input_order(self) -> None:
        first = _bonus(id=SCORED_B, move_id=SCORED_A, bonus_id=BONUS_2)
        second = _bonus(id=SCORED_C, move_id=SCORED_A, bonus_id=BONUS_1)

        got = organise_moves_by_athlete_run_judge([BACK_A], [first, second])

        assert got[0].run_moves[0].judge_moves[0].scored_bonuses == [first, second]

    def test_a_fixed_run_count_pads_unridden_runs_and_drops_runs_beyond_it(
        self,
    ) -> None:
        run_1 = _move(SCORED_A, MOVE_1, "F", run_number="1")
        run_3 = _move(SCORED_B, MOVE_1, "F", run_number="3")

        got = organise_moves_by_athlete_run_judge([run_1, run_3], [], number_of_runs=3)

        assert got == [
            AthleteMoves(
                athlete_id=ATHLETE_ID,
                run_moves=[
                    _run_moves(0, []),
                    _run_moves(1, [_judge_moves("meg", [run_1], [])]),
                    _run_moves(2, []),
                ],
            )
        ]


class TestRunScoreEdgeCases:
    @pytest.mark.parametrize(
        ("scored_moves", "scored_bonuses", "want"),
        [
            pytest.param(
                [BACK_A, BACK_C],
                [_bonus_on(SCORED_C)],
                25,
                id="bonus_on_the_second_copy_of_a_duplicated_move",
            ),
            pytest.param(
                [BACK_A, BACK_C],
                [_bonus_on(SCORED_A), _bonus_on(SCORED_C)],
                25,
                id="same_bonus_on_both_copies_counts_once",
            ),
            pytest.param(
                [BACK_A, BACK_C],
                [_bonus_on(SCORED_A), _bonus_on(SCORED_C, BONUS_2)],
                30,
                id="different_bonuses_on_each_copy_both_count",
            ),
            pytest.param(
                [BACK_A],
                [_bonus_on(SCORED_B)],
                20,
                id="bonus_on_a_move_not_in_the_run_is_ignored",
            ),
            pytest.param(
                [FRONT_A, BACK_B],
                [_bonus_on(SCORED_A)],
                35,
                id="a_bonus_follows_only_its_own_direction_of_the_move",
            ),
        ],
    )
    def test_it_scores_the_run(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
        scored_moves: list[PydanticScoredMovesResponse],
        scored_bonuses: list[PydanticScoredBonusesResponse],
        want: float,
    ) -> None:
        got = calculate_run_score(
            scored_moves,
            scored_bonuses,
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.score == want

    def test_the_highest_scoring_move_includes_its_bonuses(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        got = calculate_run_score(
            [FRONT_A, BACK_B],
            [_bonus_on(SCORED_A)],
            available_bonuses=available_bonuses,
            available_moves=available_moves,
        )

        assert got.highest_scoring_move == 20


def _one_athlete_two_runs() -> list[AthleteMovesWithJudgeInfo]:
    run_2_move = _move(SCORED_B, MOVE_1, "B", run_number="2")
    return [
        AthleteMovesWithJudgeInfo(
            number_of_judges=1,
            athlete_id=ATHLETE_ID,
            run_moves=[
                _run_moves(1, [_judge_moves("meg", [BACK_A], [])]),
                _run_moves(2, [_judge_moves("meg", [run_2_move], [])]),
            ],
        )
    ]


class TestHeatScoreEdgeCases:
    def test_a_run_status_applies_only_to_its_own_athlete_and_run(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        got = calculate_heat_scores(
            athlete_moves_list=_one_athlete_two_runs(),
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[
                _run_status(ID_3, 1, did_not_start=True),
                _run_status(ATHLETE_ID, 2, did_not_start=True),
            ],
            scoring_runs=2,
        )

        assert got == [
            AthleteScores(
                athlete_id=ATHLETE_ID,
                run_scores=[
                    _run_scores(1, [_judge_score("meg", 20, 20)], 20.0, 20.0),
                    _run_scores(
                        2, [_judge_score("meg", 20, 20)], 0, 0, did_not_start=True
                    ),
                ],
                highest_scoring_move=20.0,
                total_score=20.0,
            )
        ]

    def test_the_first_of_two_statuses_for_the_same_run_wins(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        got = calculate_heat_scores(
            athlete_moves_list=_one_athlete_two_runs(),
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[
                _run_status(ATHLETE_ID, 1, locked=True),
                _run_status(ATHLETE_ID, 1, did_not_start=True),
            ],
            scoring_runs=2,
        )

        assert got[0].run_scores[0] == _run_scores(
            1, [_judge_score("meg", 20, 20)], 20.0, 20.0, locked=True
        )

    def test_without_a_scoring_run_count_the_total_is_zero(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        got = calculate_heat_scores(
            athlete_moves_list=_one_athlete_two_runs(),
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[],
        )

        assert got[0].total_score == 0

    def test_an_unridden_run_scores_zero_and_only_the_best_runs_count(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        got = calculate_heat_scores(
            athlete_moves_list=[
                AthleteMovesWithJudgeInfo(
                    number_of_judges=2,
                    athlete_id=ATHLETE_ID,
                    run_moves=[
                        _run_moves(0, []),
                        _run_moves(1, [_judge_moves("meg", [BACK_A], [])]),
                    ],
                )
            ],
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[],
            scoring_runs=1,
        )

        assert got[0].run_scores == [
            _run_scores(0, [], 0, 0),
            _run_scores(1, [_judge_score("meg", 20, 20)], 10.0, 20.0),
        ]
        assert got[0].total_score == 10.0


class TestPhasePipeline:
    def test_two_athletes_are_scored_and_ranked_from_raw_moves_and_bonuses(
        self,
        available_moves: list[AvailableMoves],
        available_bonuses: list[AvailableBonuses],
    ) -> None:
        moves = [
            _move(SCORED_A, MOVE_1, "B", run_number="0"),
            _move(SCORED_B, MOVE_1, "F", run_number="1"),
            _move(SCORED_C, MOVE_1, "F", run_number="0", athlete_id=ID_3),
        ]
        bonuses = [_bonus_on(SCORED_A)]

        organised = organise_moves_by_athlete_run_judge(
            moves, bonuses, number_of_runs=2
        )
        scores = calculate_heat_scores(
            athlete_moves_list=[
                AthleteMovesWithJudgeInfo(**a.model_dump(), number_of_judges=1)
                for a in organised
            ],
            available_bonuses=available_bonuses,
            available_moves=available_moves,
            run_statuses=[],
            scoring_runs=1,
        )
        ranked = calculate_rank(scores)

        assert [(str(a.athlete_id), a.total_score, a.ranking) for a in ranked] == [
            (ATHLETE_ID, 25.0, 1),
            (ID_3, 10.0, 2),
        ]
        assert [r.mean_run_score for r in ranked[1].run_scores] == [10.0, 0]
