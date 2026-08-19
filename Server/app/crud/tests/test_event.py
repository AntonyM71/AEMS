"""
Unit tests for event CRUD endpoints.
Tests use FastAPI TestClient and mock SQLAlchemy calls.
"""

from typing import Any
from unittest.mock import MagicMock
from uuid import UUID

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from db.models import Event


@pytest.fixture
def mock_event_data() -> dict[str, Any]:
    """Create mock event data"""
    return {
        "id": UUID("11111111-1111-1111-1111-111111111111"),
        "competition_id": UUID("22222222-2222-2222-2222-222222222222"),
        "name": "Test Event",
    }


@pytest.fixture
def mock_event(mock_event_data: dict[str, Any]) -> Event:
    """Create a mock Event database object"""
    event = MagicMock(spec=Event)
    for key, value in mock_event_data.items():
        setattr(event, key, value)
    event.competition = None
    event.phases = []
    return event


def test_get_many_events_no_filters(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ without filters returns all events"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/event/")

    # Verify exact response
    assert response.status_code == 200

    # Verify SQLAlchemy call
    assert mock_db_session.execute.called
    assert mock_db_session.execute.call_count == 1

    # Verify no WHERE clause for no filters
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    assert query.whereclause is None


def test_get_many_events_with_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with id filter
    filter_id = str(mock_event.id)
    response = test_client.get(f"/event/?id____list={filter_id}")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called

    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]

    # Verify the whereclause properties without compiling
    whereclause = query.whereclause

    # Assert we're filtering on the correct column
    assert str(whereclause.left).endswith(".id"), (
        f"Expected filtering on .id column, got {whereclause.left}"
    )

    # Assert we're using the correct operator (in_op for IN filters)
    assert whereclause.operator.__name__ == "in_op", (
        f"Expected in_op operator, got {whereclause.operator.__name__}"
    )

    # Assert the actual filter value matches what we sent in the request
    filter_values = whereclause.right.value
    assert any(str(val) == filter_id for val in filter_values), (
        f"Expected {filter_id} in filter values, got {filter_values}"
    )


def test_get_many_events_with_competition_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with competition_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with competition_id filter
    filter_competition_id = str(mock_event.competition_id)
    response = test_client.get(
        f"/event/?competition_id____list={filter_competition_id}"
    )

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called

    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]

    # Verify the whereclause properties without compiling
    whereclause = query.whereclause

    # Assert we're filtering on the correct column
    assert str(whereclause.left).endswith(".competition_id"), (
        f"Expected filtering on .competition_id column, got {whereclause.left}"
    )

    # Assert we're using the correct operator (in_op for IN filters)
    assert whereclause.operator.__name__ == "in_op", (
        f"Expected in_op operator, got {whereclause.operator.__name__}"
    )

    # Assert the actual filter value matches what we sent in the request
    filter_values = whereclause.right.value
    assert any(str(val) == filter_competition_id for val in filter_values), (
        f"Expected {filter_competition_id} in filter values, got {filter_values}"
    )


def test_get_many_events_with_name_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with name filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with name filter
    response = test_client.get("/event/?name____str=Test Event")

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called

    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]

    # Verify the whereclause properties without compiling
    whereclause = query.whereclause

    # Assert we're filtering on the correct column
    assert str(whereclause.left).endswith(".name"), (
        f"Expected filtering on .name column, got {whereclause.left}"
    )

    # Assert we're using the correct operator (eq for == filters)
    assert whereclause.operator.__name__ == "eq", (
        f"Expected eq operator, got {whereclause.operator.__name__}"
    )

    # Assert the actual filter value matches what we sent in the request
    filter_name = "Test Event"
    assert whereclause.right.value == filter_name, (
        f"Expected {filter_name} in filter value, got {whereclause.right.value}"
    )


def test_get_many_events_with_name_case_insensitive_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with a case-insensitive name pattern filter"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    response = test_client.get(
        "/event/?name____str=test&name____str_____matching_pattern=case_insensitive"
    )

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause

    assert str(whereclause.left).endswith(".name")
    assert whereclause.operator.__name__ == "ilike_op"
    assert whereclause.right.value == "%test%"


def test_get_many_events_with_name_case_sensitive_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with a case-sensitive name pattern filter"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    response = test_client.get(
        "/event/?name____str=Test&name____str_____matching_pattern=case_sensitive"
    )

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause

    assert str(whereclause.left).endswith(".name")
    assert whereclause.operator.__name__ == "like_op"
    assert whereclause.right.value == "%Test%"


def test_get_many_events_with_name_list_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with a name list filter"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    response = test_client.get("/event/?name____list=Test Event&name____list=Other")

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause

    assert str(whereclause.left).endswith(".name")
    assert whereclause.operator.__name__ == "in_op"
    assert [str(v) for v in whereclause.right.value] == ["Test Event", "Other"]


def test_get_many_events_with_join_foreign_table_phase(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with join_foreign_table=phase returns phase_foreign"""
    mock_phase = MagicMock()
    mock_phase.id = UUID("44444444-4444-4444-4444-444444444444")
    mock_phase.event_id = mock_event.id
    mock_phase.name = "Phase 1"
    mock_phase.number_of_runs = 3
    mock_phase.number_of_runs_for_score = 2
    mock_phase.number_of_judges = 3
    mock_phase.scoresheet = UUID("55555555-5555-5555-5555-555555555555")
    mock_event.phases = [mock_phase]

    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    mock_competition = MagicMock()
    mock_competition.id = mock_event.competition_id
    mock_competition.name = "Test Competition"
    mock_event.competition = mock_competition

    response = test_client.get(
        "/event/?join_foreign_table=phase&join_foreign_table=competition"
    )

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["phase_foreign"][0]["id"] == str(mock_phase.id)
    assert data[0]["phase_foreign"][0]["name"] == "Phase 1"
    assert data[0]["competition_foreign"][0]["name"] == "Test Competition"


def test_get_many_events_with_pagination(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ with pagination"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with pagination
    response = test_client.get("/event/?limit=10&offset=5")

    # Verify response
    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    assert query._limit == 10
    assert query._offset == 5


@pytest.mark.parametrize(
    ("order_by_columns", "expected_column", "expected_direction"),
    [
        ("name_asc", "name", "asc"),
        ("name_desc", "name", "desc"),
        ("competition_id_asc", "competition_id", "asc"),
        ("competition_id_desc", "competition_id", "desc"),
    ],
)
def test_get_many_events_with_ordering(
    test_client: TestClient,
    mock_db_session: Session,
    mock_event: Event,
    order_by_columns: str,
    expected_column: str,
    expected_direction: str,
) -> None:
    """Test GET /event/ orders by the requested column and direction"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request with ordering
    response = test_client.get(f"/event/?order_by_columns={order_by_columns}")

    # Verify response
    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    order_by_clauses = query._order_by_clauses
    assert len(order_by_clauses) == 1
    clause = order_by_clauses[0]
    assert str(clause.element).endswith(f".{expected_column}")
    assert clause.modifier.__name__ == expected_direction + "_op"


def test_get_many_events_with_unknown_order_column_ignored(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/ ignores unrecognised order_by_columns values"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    response = test_client.get("/event/?order_by_columns=unknown_column")

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    assert len(query._order_by_clauses) == 0


def test_get_many_events_empty_result(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /event/ returns empty list when no data"""
    # Mock empty result
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/event/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert data == []

    assert mock_db_session.execute.called


def test_get_one_event_by_id(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{id} returns specific event"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_event
    mock_db_session.execute.return_value = mock_result

    # Make request
    event_id = str(mock_event.id)
    response = test_client.get(f"/event/{event_id}")

    # Verify exact response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called

    # Verify query filters by ID
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause
    assert whereclause is not None
    assert str(whereclause.left).endswith(".id")
    assert whereclause.operator.__name__ == "eq"


def test_get_one_event_not_found(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test GET /event/{id} returns 404 when event not found"""
    # Mock the database query to return None
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    mock_db_session.execute.return_value = mock_result

    # Make request
    event_id = "99999999-9999-9999-9999-999999999999"
    response = test_client.get(f"/event/{event_id}")

    # Verify exact response
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Event not found"

    assert mock_db_session.execute.called


def test_get_one_event_with_competition_id_filter(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{id} with competition_id filter"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_event
    mock_db_session.execute.return_value = mock_result

    # Make request with filter
    event_id = str(mock_event.id)
    response = test_client.get(
        f"/event/{event_id}?competition_id____list={mock_event.competition_id!s}"
    )

    # Verify response
    assert response.status_code == 200

    # Verify database calls
    assert mock_db_session.execute.called

    # Assert on the query object's properties directly
    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]

    # Verify the whereclause properties without compiling
    whereclause = query.whereclause

    # For get_one with filters, we have compound clauses (id AND competition_id)
    # whereclause is a BooleanClauseList containing multiple filter clauses
    filter_competition_id = str(mock_event.competition_id)

    # Find the competition_id filter in the compound clause
    found_competition_id_filter = False
    for clause in whereclause.clauses:
        if str(clause.left).endswith(".competition_id"):
            found_competition_id_filter = True
            # Assert we're using the correct operator (in_op for IN filters)
            assert clause.operator.__name__ == "in_op", (
                f"Expected in_op operator, got {clause.operator.__name__}"
            )
            # Assert the actual filter value matches what we sent in the request
            filter_values = clause.right.value
            assert any(str(val) == filter_competition_id for val in filter_values), (
                f"Expected {filter_competition_id} in filter values, got {filter_values}"
            )
            break

    assert found_competition_id_filter, (
        "Expected to find competition_id filter in compound WHERE clause"
    )


def test_get_one_event_with_name_filters(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{id} with name____str and name____list filters"""
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_event
    mock_db_session.execute.return_value = mock_result

    event_id = str(mock_event.id)
    response = test_client.get(
        f"/event/{event_id}?name____str=Test Event&name____list=Test Event"
    )

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    clauses = list(query.whereclause.clauses)

    assert any(
        str(c.left).endswith(".name") and c.operator.__name__ == "eq" for c in clauses
    )
    assert any(
        str(c.left).endswith(".name") and c.operator.__name__ == "in_op"
        for c in clauses
    )


def test_get_one_event_with_join_foreign_table(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{id} with join_foreign_table returns phase and competition"""
    mock_phase = MagicMock()
    mock_phase.id = UUID("44444444-4444-4444-4444-444444444444")
    mock_phase.event_id = mock_event.id
    mock_phase.name = "Phase 1"
    mock_phase.number_of_runs = 3
    mock_phase.number_of_runs_for_score = 2
    mock_phase.number_of_judges = 3
    mock_phase.scoresheet = UUID("55555555-5555-5555-5555-555555555555")
    mock_event.phases = [mock_phase]

    mock_competition = MagicMock()
    mock_competition.id = mock_event.competition_id
    mock_competition.name = "Test Competition"
    mock_event.competition = mock_competition

    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = mock_event
    mock_db_session.execute.return_value = mock_result

    event_id = str(mock_event.id)
    response = test_client.get(
        f"/event/{event_id}?join_foreign_table=phase&join_foreign_table=competition"
    )

    assert response.status_code == 200
    data = response.json()
    assert data["phase_foreign"][0]["name"] == "Phase 1"
    assert data["competition_foreign"][0]["name"] == "Test Competition"


def test_get_many_with_foreign_tree(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/get_many_with_foreign_tree/"""
    mock_competition = MagicMock()
    mock_competition.id = mock_event.competition_id
    mock_competition.name = "Test Competition"
    mock_event.competition = mock_competition

    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    # Make request
    response = test_client.get("/event/get_many_with_foreign_tree/")

    # Verify response
    assert response.status_code == 200
    data = response.json()
    assert data[0]["competition_foreign"][0]["name"] == "Test Competition"


def test_get_many_with_foreign_tree_applies_filters_ordering_and_pagination(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/get_many_with_foreign_tree/ applies query params"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    response = test_client.get(
        "/event/get_many_with_foreign_tree/"
        "?name____str=Test&order_by_columns=name_desc&limit=5&offset=1"
    )

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    assert query._limit == 5
    assert query._offset == 1
    assert len(query._order_by_clauses) == 1
    assert str(query._order_by_clauses[0].element).endswith(".name")


def test_get_many_with_foreign_tree_applies_id_and_competition_id_filters(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/get_many_with_foreign_tree/ applies id/competition_id filters"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_event]
    mock_db_session.execute.return_value = mock_result

    filter_id = str(mock_event.id)
    filter_competition_id = str(mock_event.competition_id)
    response = test_client.get(
        "/event/get_many_with_foreign_tree/"
        f"?id____list={filter_id}&competition_id____list={filter_competition_id}"
    )

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    clauses = list(query.whereclause.clauses)

    assert any(
        str(c.left).endswith(".id") and c.operator.__name__ == "in_op" for c in clauses
    )
    assert any(
        str(c.left).endswith(".competition_id") and c.operator.__name__ == "in_op"
        for c in clauses
    )


def test_get_event_phases(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{event_pk_id}/phase"""
    # Mock the database query execution
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    # Make request
    event_id = str(mock_event.id)
    response = test_client.get(f"/event/{event_id}/phase")

    # Verify response
    assert response.status_code == 200

    # Verify execute was called
    assert mock_db_session.execute.called


def test_get_event_phases_with_range_and_list_filters(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{event_pk_id}/phase applies numeric range and list filters"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    event_id = str(mock_event.id)
    phase_id = "77777777-7777-7777-7777-777777777777"
    response = test_client.get(
        f"/event/{event_id}/phase"
        f"?id____list={phase_id}"
        "&number_of_runs____from=1&number_of_runs____to=5"
        "&number_of_runs_for_score____list=2&number_of_judges____from=3"
        "&name____list=Final"
    )

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    whereclause = query.whereclause
    clauses = list(whereclause.clauses)

    def find_clause(suffix: str, operator: str) -> bool:
        return any(
            str(c.left).endswith(suffix) and c.operator.__name__ == operator
            for c in clauses
        )

    assert find_clause(".event_id", "eq")
    assert find_clause(".id", "in_op")
    assert find_clause(".number_of_runs", "ge")
    assert find_clause(".number_of_runs", "le")
    assert find_clause(".number_of_runs_for_score", "in_op")
    assert find_clause(".number_of_judges", "ge")
    assert find_clause(".name", "in_op")


def test_get_event_phases_with_join_foreign_table_event(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{event_pk_id}/phase returns event_foreign when requested"""
    mock_phase = MagicMock()
    mock_phase.id = UUID("44444444-4444-4444-4444-444444444444")
    mock_phase.event_id = mock_event.id
    mock_phase.name = "Phase 1"
    mock_phase.number_of_runs = 3
    mock_phase.number_of_runs_for_score = 2
    mock_phase.number_of_judges = 3
    mock_phase.scoresheet = UUID("55555555-5555-5555-5555-555555555555")
    mock_phase.event = mock_event

    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = [mock_phase]
    mock_db_session.execute.return_value = mock_result

    event_id = str(mock_event.id)
    response = test_client.get(f"/event/{event_id}/phase?join_foreign_table=event")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["event_foreign"][0]["name"] == mock_event.name
    assert data[0]["event_foreign"][0]["id"] == str(mock_event.id)


def test_get_event_phases_with_name_str_and_scoresheet_filters(
    test_client: TestClient, mock_db_session: Session, mock_event: Event
) -> None:
    """Test GET /event/{event_pk_id}/phase applies name____str and scoresheet filters"""
    mock_result = MagicMock()
    mock_result.scalars.return_value.all.return_value = []
    mock_db_session.execute.return_value = mock_result

    scoresheet_id = "66666666-6666-6666-6666-666666666666"
    event_id = str(mock_event.id)
    response = test_client.get(
        f"/event/{event_id}/phase?name____str=Final&scoresheet____list={scoresheet_id}"
    )

    assert response.status_code == 200

    call_args = mock_db_session.execute.call_args
    query = call_args[0][0]
    clauses = list(query.whereclause.clauses)

    assert any(
        str(c.left).endswith(".name") and c.operator.__name__ == "eq" for c in clauses
    )
    assert any(
        str(c.left).endswith(".scoresheet") and c.operator.__name__ == "in_op"
        for c in clauses
    )


def test_post_insert_many_events(
    test_client: TestClient, mock_db_session: Session
) -> None:
    """Test POST /event/ to insert many events"""

    # Mock ID generation
    def mock_add(event):  # noqa: ANN202, ANN001
        event.id = UUID("33333333-3333-3333-3333-333333333333")
        return None

    # Mock the database operations
    mock_db_session.add.side_effect = mock_add
    mock_db_session.commit.return_value = None
    mock_db_session.refresh.return_value = None

    # Make request
    event_data = [
        {
            "competition_id": "22222222-2222-2222-2222-222222222222",
            "name": "New Event",
        }
    ]
    response = test_client.post("/event/", json=event_data)

    # Verify exact response
    assert response.status_code == 201

    # Verify database operations
    assert mock_db_session.add.called
    assert mock_db_session.add.call_count == 1
    assert mock_db_session.commit.called
    assert mock_db_session.commit.call_count == 1

    # Verify the add() was called with Event object with ALL correct attributes
    add_call_args = mock_db_session.add.call_args
    added_event = add_call_args[0][0]
    assert added_event.name == "New Event"
    assert str(added_event.competition_id) == "22222222-2222-2222-2222-222222222222"
