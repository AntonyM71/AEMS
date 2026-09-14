"""Contract tests for the /promote_phase endpoint.

Regression guard for issue #399: a malformed body used to be accepted as
``None`` (the param had a ``= None`` default) and the handler then blew up with
``AttributeError: 'NoneType' object has no attribute 'number_of_paddlers'`` --
a 500 instead of a validation error.
"""

from fastapi.testclient import TestClient

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


def test_unwrapped_body_is_rejected_as_validation_error() -> None:
    """The stale generated client posted the phase info without the
    ``request_body`` wrapper that ``Body(embed=True)`` requires."""
    response = client.post(
        "/competition_management/promote_phase", json=VALID_PHASE_INFO
    )

    assert response.status_code == 422
