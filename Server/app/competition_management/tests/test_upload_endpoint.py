"""Contract tests for POST /competition_management/upload's run-count validation.

The endpoint builds Phase rows directly via process_competitors_df, bypassing
PhaseCreate/PhaseUpdate, so it never got the number_of_runs > 0 and
number_of_runs_for_score <= number_of_runs checks added there.
"""

from io import BytesIO
from unittest.mock import patch

from fastapi.testclient import TestClient
from httpx import Response

from main import app

client = TestClient(app)

VALID_CSV = (
    b"first_name,last_name,bib,Event,Heat\n"
    b"James,Wilkinson,1,Senior Elite C1M,1\n"
)

VALID_FORM = {
    "competition_name": "Test Comp",
    "scoresheet_name": "icf",
    "number_of_runs": "2",
    "number_of_runs_for_score": "1",
    "number_of_judges": "2",
    "random_heats": "false",
    "number_of_random_heats": "0",
}


def _post(form: dict) -> Response:
    return client.post(
        "/competition_management/upload",
        data=form,
        files={"file": ("competitors.csv", BytesIO(VALID_CSV), "text/csv")},
    )


def test_number_of_runs_of_zero_is_rejected() -> None:
    response = _post({**VALID_FORM, "number_of_runs": "0"})

    assert response.status_code == 422


def test_number_of_runs_for_score_exceeding_number_of_runs_is_rejected() -> None:
    response = _post(
        {**VALID_FORM, "number_of_runs": "1", "number_of_runs_for_score": "2"}
    )

    assert response.status_code == 422


@patch("app.competition_management.competition_management.process_competitors_df")
def test_a_valid_upload_succeeds(mock_process_competitors_df) -> None:  # noqa: ANN001
    mock_process_competitors_df.return_value = 1

    response = _post(VALID_FORM)

    assert response.status_code == 201
    assert mock_process_competitors_df.call_args.kwargs["number_of_runs"] == 2
    assert mock_process_competitors_df.call_args.kwargs["number_of_runs_for_score"] == 1
