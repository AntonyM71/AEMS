from typing import Any
from uuid import UUID

import pytest
from sqlalchemy.orm import Session

from app.scoring.customScoringEndpoints import (
    ScoredMovesAndBonusesResponse,
    check_run_is_locked,
    get_athlete_moves_and_bonnuses,
    get_heat_info_logic,
)
from app.scoring.scoring_logic import (
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
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
    mock_db_setup: Session,
    mock_athlete_heat: AthleteHeat,
    mock_athlete: Athlete,
    mock_event: Event,
) -> None:
    # Configure mock database response
    mock_db_setup.query.return_value.where.return_value.all.return_value = [mock_athlete_heat]

    # Call the function
    result = get_heat_info_logic(
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d", db=mock_db_setup
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


def test_check_run_is_locked_returns_true_when_locked(mock_db_setup: Session) -> None:
    # Configure mock database response
    mock_db_setup.query.return_value.filter.return_value.first.return_value = RunStatus(
        id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
        heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
        athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
        run_number=1,
        phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
        locked=True,
        did_not_start=False,
    )

    # Call the function
    result = check_run_is_locked(
        db=mock_db_setup,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
    )

    # Verify the result
    assert result is True


def test_check_run_is_locked_returns_false_when_not_locked(mock_db_setup: Session) -> None:
    # Configure mock database response
    mock_db_setup.query.return_value.filter.return_value.first.return_value = RunStatus(
        id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
        heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
        athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
        run_number=1,
        phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
        locked=False,
        did_not_start=False,
    )

    # Call the function
    result = check_run_is_locked(
        db=mock_db_setup,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
    )

    # Verify the result
    assert result is False


@pytest.mark.asyncio
async def test_get_athlete_moves_and_bonnuses(mock_db_setup: Session) -> None:
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
    moves_query = mock_db_setup.query.return_value
    moves_query.filter.return_value.filter.return_value.filter.return_value.filter.return_value.all.return_value = mock_db_moves

    # Configure mock database responses for bonuses
    bonuses_query = mock_db_setup.query.return_value
    bonuses_query.filter.return_value.all.return_value = mock_db_bonuses

    # Reset query for moves since both queries use the same mock
    mock_db_setup.query.reset_mock()

    # Call the function
    result = await get_athlete_moves_and_bonnuses(
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        judge_id="meg",
        db=mock_db_setup,
    )

    # Verify the result matches the expected response type
    assert isinstance(result, ResponseType)
    assert len(result.moves) == 1
    assert len(result.bonuses) == 1
    assert result.moves[0].id == mock_db_moves[0].id
    assert result.moves[0].move_id == mock_db_moves[0].move_id
    assert result.bonuses[0].id == mock_db_bonuses[0].id
    assert result.bonuses[0].bonus_id == mock_db_bonuses[0].bonus_id


def test_check_run_is_locked_returns_false_when_no_status(mock_db_setup: Session) -> None:
    # Configure mock database response
    mock_db_setup.query.return_value.filter.return_value.first.return_value = None

    # Call the function
    result = check_run_is_locked(
        db=mock_db_setup,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7",
    )

    # Verify the result
    assert result is False
