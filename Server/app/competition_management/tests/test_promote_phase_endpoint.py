"""Contract tests for the /promote_phase endpoint.

Regression guard for issue #399: a malformed body used to be accepted as
``None`` (the param had a ``= None`` default) and the handler then blew up with
``AttributeError: 'NoneType' object has no attribute 'number_of_paddlers'`` --
a 500 instead of a validation error.
"""

from unittest.mock import MagicMock, patch
from uuid import uuid4

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.scoring.customScoringEndpoints import PhaseScoresResponse
from app.scoring.scoring_logic import AthleteScoresWithAthleteInfo
from db.client import get_transaction_session
from db.models import AthleteHeat, Heat, Phase
from main import app

client = TestClient(app, raise_server_exceptions=False)

VALID_PHASE_INFO = {
    "new_heat_names": ["Heat A"],
    "phase_id": "00000000-0000-0000-0000-000000000000",
    "new_phase_name": "Final",
    "number_of_paddlers": 3,
}


def test_missing_body_is_rejected_as_validation_error() -> None:
    response = client.post("/competition_management/promote_phase")

    assert response.status_code == 422
    assert response.json()["detail"] == [
        {
            "type": "missing",
            "loc": ["body", "request_body"],
            "msg": "Field required",
            "input": None,
        }
    ]


def test_unwrapped_body_is_rejected_as_validation_error() -> None:
    """The stale generated client posted the phase info without the
    ``request_body`` wrapper that ``Body(embed=True)`` requires."""
    response = client.post(
        "/competition_management/promote_phase", json=VALID_PHASE_INFO
    )

    assert response.status_code == 422
    assert response.json()["detail"] == [
        {
            "type": "missing",
            "loc": ["body", "request_body"],
            "msg": "Field required",
            "input": None,
        }
    ]


SOURCE_PHASE_ID = "11111111-1111-1111-1111-111111111111"
SOURCE_EVENT_ID = uuid4()
SOURCE_COMPETITION_ID = uuid4()
SOURCE_SCORESHEET_ID = uuid4()
RANK_1_ATHLETE_ID = uuid4()
RANK_2_ATHLETE_ID = uuid4()


def _two_ranked_athletes() -> PhaseScoresResponse:
    """A phase-scores result for two athletes who both started and have a
    distinct, non-tied rank -- enough for get_top_n_paddlers_for_phase to
    select both without exercising the tie-break path."""
    return PhaseScoresResponse(
        phase_id=SOURCE_PHASE_ID,
        scores=[
            AthleteScoresWithAthleteInfo(
                athlete_id=RANK_1_ATHLETE_ID,
                first_name="Alice",
                last_name="A",
                bib_number="1",
                run_scores=[],
                highest_scoring_move=0,
                ranking=1,
            ),
            AthleteScoresWithAthleteInfo(
                athlete_id=RANK_2_ATHLETE_ID,
                first_name="Bob",
                last_name="B",
                bib_number="2",
                run_scores=[],
                highest_scoring_move=0,
                ranking=2,
            ),
        ],
    )


@pytest.fixture
def mock_db() -> MagicMock:
    """A mocked session whose only configured query returns a source Phase
    with a known event/competition/scoresheet, for the endpoint's single
    ``db.query(Phase)...one_or_none()`` lookup."""
    db = MagicMock(spec=Session)
    source_phase = MagicMock(spec=Phase)
    source_phase.event_id = SOURCE_EVENT_ID
    source_phase.number_of_runs = 1
    source_phase.number_of_runs_for_score = 1
    source_phase.number_of_judges = 1
    source_phase.scoresheet = SOURCE_SCORESHEET_ID
    source_phase.event.competition_id = SOURCE_COMPETITION_ID
    db.query.return_value.filter.return_value.one_or_none.return_value = source_phase
    return db


def _added_object(db: MagicMock, cls: type) -> object:
    return next(c.args[0] for c in db.add.call_args_list if isinstance(c.args[0], cls))


def _saved_objects(db: MagicMock, cls: type) -> list:
    return next(
        c.args[0]
        for c in db.bulk_save_objects.call_args_list
        if c.args[0] and isinstance(c.args[0][0], cls)
    )


def _promote(mock_db: MagicMock, **overrides: object) -> object:
    app.dependency_overrides[get_transaction_session] = lambda: mock_db
    try:
        return client.post(
            "/competition_management/promote_phase",
            json={
                "request_body": {
                    "new_heat_names": ["Final A", "Final B"],
                    "phase_id": SOURCE_PHASE_ID,
                    "new_phase_name": "Final",
                    "number_of_paddlers": 2,
                    **overrides,
                }
            },
        )
    finally:
        app.dependency_overrides.clear()


@patch("app.competition_management.competition_management.calculate_phase_scores")
def test_promote_phase_wires_new_phase_heats_and_athlete_ranks_together(
    mock_calculate_phase_scores: MagicMock, mock_db: MagicMock
) -> None:
    mock_calculate_phase_scores.return_value = _two_ranked_athletes()

    response = _promote(mock_db)

    assert response.status_code == 201

    new_phase = _added_object(mock_db, Phase)
    assert new_phase.event_id == SOURCE_EVENT_ID
    assert new_phase.number_of_runs == 1
    assert new_phase.number_of_runs_for_score == 1
    assert new_phase.number_of_judges == 1
    assert new_phase.scoresheet == SOURCE_SCORESHEET_ID

    heats = _saved_objects(mock_db, Heat)
    assert {h.name for h in heats} == {"Final A", "Final B"}
    assert all(h.competition_id == SOURCE_COMPETITION_ID for h in heats)
    # assign_paddlers_to_heat keys its result by the stringified heat id.
    heat_name_by_id = {str(h.id): h.name for h in heats}

    athlete_heats = _saved_objects(mock_db, AthleteHeat)
    assert len(athlete_heats) == 2
    assert all(ah.phase_id == new_phase.id for ah in athlete_heats)
    rank_by_athlete = {ah.athlete_id: ah.last_phase_rank for ah in athlete_heats}
    assert rank_by_athlete == {RANK_1_ATHLETE_ID: 1, RANK_2_ATHLETE_ID: 2}

    # Non-random allocation sorts by descending rank, so the lower-ranked
    # athlete (rank 2) lands in the first new heat and the top-ranked athlete
    # in the second.
    heat_by_athlete = {
        ah.athlete_id: heat_name_by_id[str(ah.heat_id)] for ah in athlete_heats
    }
    assert heat_by_athlete[RANK_2_ATHLETE_ID] == "Final A"
    assert heat_by_athlete[RANK_1_ATHLETE_ID] == "Final B"


@patch("app.competition_management.competition_management.calculate_phase_scores")
def test_promote_phase_overrides_take_precedence_over_source_phase_config(
    mock_calculate_phase_scores: MagicMock, mock_db: MagicMock
) -> None:
    mock_calculate_phase_scores.return_value = _two_ranked_athletes()

    response = _promote(
        mock_db,
        number_of_runs=5,
        number_of_runs_for_score=3,
        number_of_judges=4,
    )

    assert response.status_code == 201
    new_phase = _added_object(mock_db, Phase)
    assert new_phase.number_of_runs == 5
    assert new_phase.number_of_runs_for_score == 3
    assert new_phase.number_of_judges == 4
