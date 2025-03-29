"""Simplified test for competition endpoint."""

from app.autogenEndpoints import crud_route_competition


def test_competition_route_config():
    """Test basic configuration of the competition route."""
    # Check prefix
    assert crud_route_competition.prefix == "/competition"

    # Check tags
    assert "competition" in crud_route_competition.tags

    # Check that routes are defined
    assert crud_route_competition.routes is not None
    assert len(crud_route_competition.routes) > 0

    # Check that it includes basic CRUD methods
    methods = set()
    for route in crud_route_competition.routes:
        if route.methods:
            methods.update(route.methods)

    # Should at least have GET method
    assert "GET" in methods
