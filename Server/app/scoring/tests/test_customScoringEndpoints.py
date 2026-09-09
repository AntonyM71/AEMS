from uuid import UUID

import pytest
from sqlalchemy.orm import Session

from app.scoring.customScoringEndpoints import (
    ScoredMovesAndBonusesResponse,
    assemble_phase_scores,
    check_run_is_locked,
    get_athlete_moves_and_bonuses,
    get_heat_info_logic,
)
from app.scoring.scoring_logic import (
    AthleteScoreInfo,
    AthleteScores,
    JudgeScores,
    RunScores,
)
from db.models import (
    Athlete,
    AthleteHeat,
    Event,
    Phase,
    RunStatus,
    ScoredBonuses,
    ScoredMoves,
)

# Create a type alias to ensure the import is used
ResponseType = ScoredMovesAndBonusesResponse


@pytest.fixture
def mock_athlete() -> Athlete:
    return Athlete(
        id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
        first_name="Test",
        last_name="Athlete",
        bib="123",
    )


@pytest.fixture
def mock_event() -> Event:
    return Event(id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"), name="Test Event")


@pytest.fixture
def mock_phase(mock_event: Event) -> Phase:
    return Phase(
        id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
        event_id=mock_event.id,
        name="Test Phase",
        number_of_runs=2,
        number_of_runs_for_score=1,
        number_of_judges=3,
        scoresheet=UUID("3e1104be-6a11-4541-a6e2-00445cd94421"),
        event=mock_event,
    )


@pytest.fixture
def mock_athlete_heat(mock_athlete: Athlete, mock_phase: Phase) -> AthleteHeat:
    return AthleteHeat(
        id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
        heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
        athlete_id=mock_athlete.id,
        phase_id=mock_phase.id,
        last_phase_rank=1,
        athletes=mock_athlete,
        phases=mock_phase,
    )


def test_get_heat_info_logic(
    mock_db_session: Session,
    mock_athlete_heat: AthleteHeat,
    mock_athlete: Athlete,
    mock_event: Event,
) -> None:
    # Configure mock database response
    mock_db_session.query.return_value.where.return_value.all.return_value = [
        mock_athlete_heat
    ]

    # Call the function
    result = get_heat_info_logic(
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d", db=mock_db_session
    )

    # Verify the result
    assert len(result) == 1
    assert result[0].athlete_heat_id == mock_athlete_heat.id
    assert result[0].heat_id == mock_athlete_heat.heat_id
    assert result[0].athlete_id == mock_athlete_heat.athlete_id
    assert result[0].first_name == mock_athlete.first_name
    assert result[0].last_name == mock_athlete.last_name
    assert result[0].bib == mock_athlete.bib
    assert result[0].event_name == mock_event.name


def test_check_run_is_locked_returns_true_when_locked(mock_db_session: Session) -> None:
    # Configure mock database response
    mock_db_session.query.return_value.filter.return_value.first.return_value = (
        RunStatus(
            id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
            athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
            run_number=1,
            phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
            locked=True,
            did_not_start=False,
        )
    )

    # Call the function
    result = check_run_is_locked(
        db=mock_db_session,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
    )

    # Verify the result
    assert result is True


def test_check_run_is_locked_returns_false_when_not_locked(
    mock_db_session: Session,
) -> None:
    # Configure mock database response
    mock_db_session.query.return_value.filter.return_value.first.return_value = (
        RunStatus(
            id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
            athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
            run_number=1,
            phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
            locked=False,
            did_not_start=False,
        )
    )

    # Call the function
    result = check_run_is_locked(
        db=mock_db_session,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
    )

    # Verify the result
    assert result is False


@pytest.mark.asyncio
async def test_get_athlete_moves_and_bonuses(mock_db_session: Session) -> None:
    # Create mock data for database models
    mock_db_moves = [
        ScoredMoves(
            id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            move_id=UUID("17e3baf1-ce39-4a1f-971b-efea37d84aae"),
            heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
            run_number="1",
            phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
            judge_id="meg",
            athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
            direction="B",
        )
    ]

    mock_db_bonuses = [
        ScoredBonuses(
            id=UUID("6a6ec3f8-a251-44c6-b7df-93543a7a5dbe"),
            move_id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            bonus_id=UUID("3883d4f2-7592-45a2-b7d4-22ca20d546b3"),
            judge_id="meg",
        )
    ]

    # Configure mock database responses for moves
    moves_query = mock_db_session.query.return_value
    moves_query.filter.return_value.filter.return_value.filter.return_value.filter.return_value.all.return_value = mock_db_moves

    # Configure mock database responses for bonuses
    bonuses_query = mock_db_session.query.return_value
    bonuses_query.filter.return_value.all.return_value = mock_db_bonuses

    # Reset query for moves since both queries use the same mock
    mock_db_session.query.reset_mock()

    # Call the function
    result = await get_athlete_moves_and_bonuses(
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        judge_id="meg",
        db=mock_db_session,
    )

    # Verify the result matches the expected response type
    assert isinstance(result, ResponseType)
    assert len(result.moves) == 1
    assert len(result.bonuses) == 1
    assert result.moves[0].id == mock_db_moves[0].id
    assert result.moves[0].move_id == mock_db_moves[0].move_id
    assert result.bonuses[0].id == mock_db_bonuses[0].id
    assert result.bonuses[0].bonus_id == mock_db_bonuses[0].bonus_id


@pytest.mark.asyncio
async def test_get_athlete_moves_and_bonuses_without_judge_id(
    mock_db_session: Session,
) -> None:
    # Create mock data for database models
    mock_db_moves = [
        ScoredMoves(
            id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            move_id=UUID("17e3baf1-ce39-4a1f-971b-efea37d84aae"),
            heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
            run_number="1",
            phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
            judge_id="meg",
            athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
            direction="B",
        ),
        ScoredMoves(
            id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            move_id=UUID("17e3baf1-ce39-4a1f-971b-efea37d84aae"),
            heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
            run_number="1",
            phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
            judge_id="charlie",
            athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
            direction="B",
        ),
    ]

    mock_db_bonuses = [
        ScoredBonuses(
            id=UUID("6a6ec3f8-a251-44c6-b7df-93543a7a5dbe"),
            move_id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            bonus_id=UUID("3883d4f2-7592-45a2-b7d4-22ca20d546b3"),
            judge_id="meg",
        )
    ]

    # Configure mock database responses for moves (without judge_id filter)
    moves_query = mock_db_session.query.return_value
    moves_query.filter.return_value.filter.return_value.filter.return_value.all.return_value = mock_db_moves

    # Configure mock database responses for bonuses
    bonuses_query = mock_db_session.query.return_value
    bonuses_query.filter.return_value.all.return_value = mock_db_bonuses

    # Call the function without judge_id
    result = await get_athlete_moves_and_bonuses(
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        judge_id=None,
        db=mock_db_session,
    )

    # Verify the result matches the expected response type
    assert isinstance(result, ResponseType)
    assert len(result.moves) == 2
    assert len(result.bonuses) == 1
    assert result.moves[0].id == mock_db_moves[0].id
    assert result.moves[0].move_id == mock_db_moves[0].move_id
    assert result.moves[1].id == mock_db_moves[1].id
    assert result.moves[1].move_id == mock_db_moves[1].move_id
    assert result.bonuses[0].id == mock_db_bonuses[0].id


def test_check_run_is_locked_returns_false_when_no_status(
    mock_db_session: Session,
) -> None:
    # Configure mock database response
    mock_db_session.query.return_value.filter.return_value.first.return_value = None

    # Call the function
    result = check_run_is_locked(
        db=mock_db_session,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
    )

    # Verify the result
    assert result is False


PHASE_ID = "942e908e-b074-48b7-926a-59b9dd214dc7"
_A = "c7476320-6c48-11ee-b962-0242ac120001"
_B = "c7476320-6c48-11ee-b962-0242ac120002"
_C = "c7476320-6c48-11ee-b962-0242ac120003"


def _make_athlete(
    athlete_id: str,
    bib: int,
    affiliation: str | None = None,
) -> Athlete:
    return Athlete(
        id=UUID(athlete_id),
        first_name="First",
        last_name="Last",
        affiliation=affiliation,
        bib=str(bib),
    )


def _make_score(
    athlete_id: str,
    ranking: int | None,
    dns_per_run: list[bool],
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
                            score=10.0, highest_scoring_move=10.0
                        ),
                    )
                ],
                mean_run_score=10.0,
                highest_scoring_move=10.0,
                locked=False,
                did_not_start=dns,
            )
            for i, dns in enumerate(dns_per_run)
        ],
        highest_scoring_move=10.0,
        ranking=ranking,
        total_score=50.0,
    )


class TestAssemblePhaseScores:
    def test_a_single_scored_athlete_is_returned_with_its_rank(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [_make_score(_A, ranking=1, dns_per_run=[False])],
            [_make_athlete(_A, bib=1)],
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A)]
        assert got.scores[0].ranking == 1
        assert got.scores[0].bib_number == 1
        assert str(got.phase_id) == PHASE_ID

    def test_a_scored_athlete_sorts_above_one_with_no_moves(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [_make_score(_A, ranking=1, dns_per_run=[False])],
            [_make_athlete(_A, bib=1), _make_athlete(_B, bib=2)],
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A), UUID(_B)]
        assert got.scores[0].ranking == 1
        assert got.scores[1].ranking is None

    def test_scored_then_no_moves_then_dns(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [
                _make_score(_A, ranking=1, dns_per_run=[False]),
                _make_score(_C, ranking=None, dns_per_run=[True]),
            ],
            [
                _make_athlete(_A, bib=1),
                _make_athlete(_B, bib=2),
                _make_athlete(_C, bib=3),
            ],
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A), UUID(_B), UUID(_C)]
        assert [s.ranking for s in got.scores] == [1, None, None]

    def test_two_scored_athletes_then_a_dns(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [
                _make_score(_A, ranking=1, dns_per_run=[False]),
                _make_score(_B, ranking=2, dns_per_run=[False]),
                _make_score(_C, ranking=None, dns_per_run=[True]),
            ],
            [
                _make_athlete(_A, bib=1),
                _make_athlete(_B, bib=2),
                _make_athlete(_C, bib=3),
            ],
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A), UUID(_B), UUID(_C)]
        assert [s.ranking for s in got.scores] == [1, 2, None]

    def test_athletes_with_no_moves_are_ordered_by_bib(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [],
            [
                _make_athlete(_A, bib=3),
                _make_athlete(_B, bib=1),
                _make_athlete(_C, bib=2),
            ],
        )

        assert [s.bib_number for s in got.scores] == [1, 2, 3]
        assert all(s.ranking is None for s in got.scores)

    def test_dns_athletes_are_ordered_by_bib(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [
                _make_score(_A, ranking=None, dns_per_run=[True]),
                _make_score(_B, ranking=None, dns_per_run=[True]),
                _make_score(_C, ranking=None, dns_per_run=[True]),
            ],
            [
                _make_athlete(_A, bib=3),
                _make_athlete(_B, bib=1),
                _make_athlete(_C, bib=2),
            ],
        )

        assert [s.bib_number for s in got.scores] == [1, 2, 3]

    def test_athletes_sharing_a_rank_are_ordered_by_bib(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [
                _make_score(_A, ranking=1, dns_per_run=[False]),
                _make_score(_B, ranking=1, dns_per_run=[False]),
            ],
            [_make_athlete(_A, bib=5), _make_athlete(_B, bib=2)],
        )

        assert [s.bib_number for s in got.scores] == [2, 5]
        assert [s.ranking for s in got.scores] == [1, 1]

    def test_a_shared_rank_keeps_the_gap_to_the_next_make_athlete(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [
                _make_score(_A, ranking=1, dns_per_run=[False]),
                _make_score(_B, ranking=1, dns_per_run=[False]),
                _make_score(_C, ranking=3, dns_per_run=[False]),
            ],
            [
                _make_athlete(_A, bib=1),
                _make_athlete(_B, bib=2),
                _make_athlete(_C, bib=3),
            ],
        )

        assert [s.ranking for s in got.scores] == [1, 1, 3]
        assert [s.bib_number for s in got.scores] == [1, 2, 3]

    def test_an_athlete_missing_from_the_scores_is_synthesised_with_its_bio(
        self,
    ) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [_make_score(_A, ranking=1, dns_per_run=[False])],
            [_make_athlete(_A, bib=1), _make_athlete(_B, bib=2)],
        )

        synthesised = next(s for s in got.scores if s.athlete_id == UUID(_B))
        assert synthesised.ranking is None
        assert synthesised.run_scores == []
        assert synthesised.first_name == "First"
        assert synthesised.bib_number == 2

    def test_a_score_for_an_athlete_not_in_the_phase_is_dropped(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [
                _make_score(_A, ranking=1, dns_per_run=[False]),
                _make_score(_B, ranking=2, dns_per_run=[False]),
            ],
            [_make_athlete(_A, bib=1)],
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A)]

    def test_an_empty_phase_returns_no_scores(self) -> None:
        got = assemble_phase_scores(PHASE_ID, [], [])

        assert got.scores == []
        assert str(got.phase_id) == PHASE_ID

    def test_affiliation_is_carried_into_the_response(self) -> None:
        got = assemble_phase_scores(
            PHASE_ID,
            [_make_score(_A, ranking=1, dns_per_run=[False])],
            [_make_athlete(_A, bib=1, affiliation="Team GB")],
        )

        assert got.scores[0].affiliation == "Team GB"

    def test_an_athlete_who_started_only_some_runs_ranks_above_a_full_dns(
        self,
    ) -> None:
        # _A ran only run 2; _B did not start any run. _A's bib is higher, so
        # if _A were wrongly bucketed as DNS the two would swap (DNS sorts by
        # bib).
        got = assemble_phase_scores(
            PHASE_ID,
            [
                _make_score(_A, ranking=1, dns_per_run=[True, False]),
                _make_score(_B, ranking=None, dns_per_run=[True, True]),
            ],
            [_make_athlete(_A, bib=9), _make_athlete(_B, bib=1)],
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A), UUID(_B)]
        assert [s.ranking for s in got.scores] == [1, None]

    def test_a_dns_entrant_with_no_scored_moves_is_bucketed_as_dns(self) -> None:
        # _B never scored a move, so no AthleteScores reaches assemble - only
        # run statuses, and every one is did_not_start. _B must land in the DNS
        # bucket (after the unscored _C) with did_not_start runs in the payload,
        # not sorted among the unscored competitors by bib.
        run_statuses = [
            RunStatus(
                athlete_id=UUID(_B), run_number=1, locked=True, did_not_start=True
            ),
            RunStatus(
                athlete_id=UUID(_B), run_number=2, locked=False, did_not_start=True
            ),
        ]

        got = assemble_phase_scores(
            PHASE_ID,
            [_make_score(_A, ranking=1, dns_per_run=[False])],
            [
                _make_athlete(_A, bib=1),
                _make_athlete(_B, bib=5),
                _make_athlete(_C, bib=9),
            ],
            run_statuses,
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A), UUID(_C), UUID(_B)]
        dns = got.scores[-1]
        assert dns.ranking is None
        assert [r.did_not_start for r in dns.run_scores] == [True, True]

    def test_an_entrant_with_a_non_dns_run_status_stays_unscored(self) -> None:
        # _B has a run status but it is not a DNS (e.g. a locked run) and there
        # is no score - not a DNS, so _B stays in the unscored bucket.
        run_statuses = [
            RunStatus(
                athlete_id=UUID(_B), run_number=1, locked=True, did_not_start=False
            )
        ]

        got = assemble_phase_scores(
            PHASE_ID,
            [_make_score(_A, ranking=1, dns_per_run=[False])],
            [_make_athlete(_A, bib=1), _make_athlete(_B, bib=5)],
            run_statuses,
        )

        assert [s.athlete_id for s in got.scores] == [UUID(_A), UUID(_B)]
        assert got.scores[-1].ranking is None
        assert got.scores[-1].run_scores == []

    def test_a_full_phase_orders_ranked_then_unscored_then_dns(self) -> None:
        # A realistic field: a tie for 1st, two clear places, a tie for 5th,
        # a paddler who ran only one run, two who recorded nothing, and one
        # who did not start. Bibs are shuffled so every sort matters.
        ids = [f"c7476320-6c48-11ee-b962-0242ac1200{n:02d}" for n in range(10, 19)]
        first_a, first_b, third, fourth, fifth_a, fifth_b, blank_a, dns, blank_b = ids

        athletes = [
            _make_athlete(first_a, bib=4),
            _make_athlete(first_b, bib=2),
            _make_athlete(third, bib=7),
            _make_athlete(fourth, bib=1),
            _make_athlete(fifth_a, bib=9),
            _make_athlete(fifth_b, bib=5),
            _make_athlete(blank_a, bib=3),
            _make_athlete(dns, bib=6),
            _make_athlete(blank_b, bib=8),
        ]
        ranked_scores = [
            _make_score(first_a, ranking=1, dns_per_run=[False, False]),
            _make_score(first_b, ranking=1, dns_per_run=[False, False]),
            _make_score(third, ranking=3, dns_per_run=[False, False]),
            _make_score(fourth, ranking=4, dns_per_run=[True, False]),
            _make_score(fifth_a, ranking=5, dns_per_run=[False, False]),
            _make_score(fifth_b, ranking=5, dns_per_run=[False, False]),
            _make_score(dns, ranking=None, dns_per_run=[True, True]),
        ]

        got = assemble_phase_scores(PHASE_ID, ranked_scores, athletes)

        # ranked (by rank then bib), then no-moves (by bib), then DNS (by bib)
        assert [s.athlete_id for s in got.scores] == [
            UUID(first_b),  # rank 1, bib 2
            UUID(first_a),  # rank 1, bib 4
            UUID(third),  # rank 3
            UUID(fourth),  # rank 4, ran one run - still ranked
            UUID(fifth_b),  # rank 5, bib 5
            UUID(fifth_a),  # rank 5, bib 9
            UUID(blank_a),  # no moves, bib 3
            UUID(blank_b),  # no moves, bib 8
            UUID(dns),  # did not start, bib 6
        ]
        assert [s.ranking for s in got.scores] == [1, 1, 3, 4, 5, 5, None, None, None]
        assert [s.bib_number for s in got.scores[:6]] == [2, 4, 7, 1, 5, 9]
        assert got.scores[6].run_scores == []
        assert got.scores[7].run_scores == []
