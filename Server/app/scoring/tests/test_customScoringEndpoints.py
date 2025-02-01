from db.models import (
    Athlete,
    AthleteHeat,
    Event,
    Phase,
    RunStatus,
    ScoredBonuses,
    ScoredMoves,
)
from app.scoring.scoring_logic import (
    PydanticScoredBonusesResponse,
    PydanticScoredMovesResponse,
)
from uuid import UUID

import pytest
from sqlalchemy.orm import Session

from app.scoring.customScoringEndpoints import (
    ScoredMovesAndBonusesResponse,
    check_run_is_locked,
    get_athlete_moves_and_bonnuses,
    get_heat_info_logic,
)

# Create a type alias to ensure the import is used
ResponseType = ScoredMovesAndBonusesResponse


@pytest.fixture
def mock_athlete():
    return Athlete(
        id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
        first_name="Test",
        last_name="Athlete",
        bib="123"
    )


@pytest.fixture
def mock_event():
    return Event(
        id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
        name="Test Event"
    )


@pytest.fixture
def mock_phase(mock_event):
    return Phase(
        id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
        event_id=mock_event.id,
        name="Test Phase",
        number_of_runs=2,
        number_of_runs_for_score=1,
        number_of_judges=3,
        scoresheet=UUID("3e1104be-6a11-4541-a6e2-00445cd94421"),
        event=mock_event
    )


@pytest.fixture
def mock_athlete_heat(mock_athlete, mock_phase):
    return AthleteHeat(
        id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
        heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
        athlete_id=mock_athlete.id,
        phase_id=mock_phase.id,
        last_phase_rank=1,
        athletes=mock_athlete,
        phases=mock_phase
    )


def test_get_heat_info_logic(monkeypatch, mock_athlete_heat, mock_athlete, mock_event):
    # Create a mock session with the minimum required functionality
    mock_session = Session()

    def mock_query(*args):
        class QueryResult:
            def where(self, *args):
                return self

            def all(self):
                return [mock_athlete_heat]
        return QueryResult()

    monkeypatch.setattr(mock_session, "query", mock_query)

    # Call the function
    result = get_heat_info_logic(
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        db=mock_session
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


def test_check_run_is_locked_returns_true_when_locked(monkeypatch):
    # Create a mock session with the minimum required functionality
    mock_session = Session()

    def mock_query(*args):
        class QueryResult:
            def filter(self, *args):
                return self

            def first(self):
                return RunStatus(
                    id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
                    heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
                    athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
                    run_number=1,
                    phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
                    locked=True,
                    did_not_start=False
                )
        return QueryResult()

    monkeypatch.setattr(mock_session, "query", mock_query)

    # Call the function
    result = check_run_is_locked(
        db=mock_session,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7"
    )

    # Verify the result
    assert result is True


def test_check_run_is_locked_returns_false_when_not_locked(monkeypatch):
    # Create a mock session with the minimum required functionality
    mock_session = Session()

    def mock_query(*args):
        class QueryResult:
            def filter(self, *args):
                return self

            def first(self):
                return RunStatus(
                    id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
                    heat_id=UUID("8fa0fe12-12e3-4020-892a-ffffe96f676d"),
                    athlete_id=UUID("c7476320-6c48-11ee-b962-0242ac120002"),
                    run_number=1,
                    phase_id=UUID("942e908e-b074-48b7-926a-59b9dd214dc7"),
                    locked=False,
                    did_not_start=False
                )
        return QueryResult()

    monkeypatch.setattr(mock_session, "query", mock_query)

    # Call the function
    result = check_run_is_locked(
        db=mock_session,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7"
    )

    # Verify the result
    assert result is False


@pytest.mark.asyncio
async def test_get_athlete_moves_and_bonnuses(monkeypatch):
    # Create mock data
    mock_moves = [
        PydanticScoredMovesResponse(
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

    mock_bonuses = [
        PydanticScoredBonusesResponse(
            id=UUID("6a6ec3f8-a251-44c6-b7df-93543a7a5dbe"),
            move_id=UUID("e2d65876-01b5-4607-8caf-ad0740f9e3e2"),
            bonus_id=UUID("3883d4f2-7592-45a2-b7d4-22ca20d546b3"),
            judge_id="meg",
        )
    ]

    # Create a mock session with the minimum required functionality
    mock_session = Session()

    def mock_query(*args):
        class QueryResult:
            def filter(self, *args):
                return self

            def all(self):
                # Return moves for ScoredMoves query
                if len(args) > 0 and args[0] == ScoredMoves:
                    return mock_moves
                # Return bonuses for the bonus query
                if len(args) > 0 and args[0] == ScoredBonuses:
                    return mock_bonuses
                return []
        return QueryResult()

    monkeypatch.setattr(mock_session, "query", mock_query)

    # Call the function
    result = await get_athlete_moves_and_bonnuses(
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        judge_id="meg",
        db=mock_session
    )

    # Verify the result matches the expected response type
    assert isinstance(result, ResponseType)
    assert len(result.moves) == 1
    assert len(result.bonuses) == 1
    assert result.moves[0].id == mock_moves[0].id
    assert result.moves[0].move_id == mock_moves[0].move_id
    assert result.bonuses[0].id == mock_bonuses[0].id
    assert result.bonuses[0].bonus_id == mock_bonuses[0].bonus_id


def test_check_run_is_locked_returns_false_when_no_status(monkeypatch):
    # Create a mock session with the minimum required functionality
    mock_session = Session()

    def mock_query(*args):
        class QueryResult:
            def filter(self, *args):
                return self

            def first(self):
                return None
        return QueryResult()

    monkeypatch.setattr(mock_session, "query", mock_query)

    # Call the function
    result = check_run_is_locked(
        db=mock_session,
        heat_id="8fa0fe12-12e3-4020-892a-ffffe96f676d",
        athlete_id="c7476320-6c48-11ee-b962-0242ac120002",
        run_number="1",
        phase_id="942e908e-b074-48b7-926a-59b9dd214dc7"
    )

    # Verify the result
    assert result is False
