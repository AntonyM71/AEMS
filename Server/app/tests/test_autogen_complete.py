"""Simple tests focusing on route existence."""
import uuid

from app.autogenEndpoints import (
    crud_route_athlete,
    crud_route_athleteheat,
    crud_route_availablebonuses,
    crud_route_availablemoves,
    crud_route_competition,
    crud_route_event,
    crud_route_heat,
    crud_route_phase,
    crud_route_run_status,
    crud_route_scoredmoves,
    crud_route_scoresheet,
)


def test_crud_routes_exist():
    """Test that CRUD routes exist."""
    assert crud_route_competition is not None
    assert crud_route_event is not None
    assert crud_route_phase is not None
    assert crud_route_heat is not None
    assert crud_route_athlete is not None
    assert crud_route_athleteheat is not None
    assert crud_route_run_status is not None
    assert crud_route_scoredmoves is not None
    assert crud_route_availablemoves is not None
    assert crud_route_availablebonuses is not None
    assert crud_route_scoresheet is not None


def test_routes_have_expected_prefix():
    """Test routes have the expected prefix."""
    assert crud_route_competition.prefix == "/competition"
    assert crud_route_event.prefix == "/event"
    assert crud_route_phase.prefix == "/phase"
    assert crud_route_heat.prefix == "/heat"
    assert crud_route_athlete.prefix == "/athlete"
    assert crud_route_athleteheat.prefix == "/athleteheat"
    assert crud_route_run_status.prefix == "/run_status"
    assert crud_route_scoredmoves.prefix == "/scoredmoves"
    assert crud_route_availablemoves.prefix == "/availablemoves"
    assert crud_route_availablebonuses.prefix == "/availablebonuses"
    assert crud_route_scoresheet.prefix == "/scoresheet"


def test_uuid_generation():
    """Test UUID generation for use with SQLite compatibility."""
    test_uuid = uuid.uuid4()
    assert isinstance(test_uuid, uuid.UUID)
    assert len(str(test_uuid)) == 36  # Standard UUID string length
