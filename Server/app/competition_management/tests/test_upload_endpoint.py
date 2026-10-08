"""Contract tests for POST /competition_management/upload's run-count validation.

The endpoint builds Phase rows directly via process_competitors_df, bypassing
PhaseCreate/PhaseUpdate, so it never got the number_of_runs > 0 and
number_of_runs_for_score <= number_of_runs checks added there.
"""

from io import BytesIO
from unittest.mock import patch

from fastapi.testclient import TestClient
from httpx import Response

from app.competition_management.tests.test_paddleuk_start_list import (
    HEADER,
    entry,
    paddleuk_csv,
)
from main import app

client = TestClient(app)

VALID_CSV = (
    b"first_name,last_name,bib,Event,Heat\nJames,Wilkinson,1,Senior Elite C1M,1\n"
)

NO_HEAT_CSV = b"first_name,last_name,bib,Event\nJames,Wilkinson,1,Senior Elite C1M\n"

VALID_FORM = {
    "competition_name": "Test Comp",
    "scoresheet_name": "icf",
    "number_of_runs": "2",
    "number_of_runs_for_score": "1",
    "number_of_judges": "2",
    "random_heats": "false",
    "number_of_random_heats": "0",
}


def _post(
    form: dict, csv: bytes = VALID_CSV, filename: str = "competitors.csv"
) -> Response:
    return client.post(
        "/competition_management/upload",
        data=form,
        files={"file": (filename, BytesIO(csv), "text/csv")},
    )


def _assert_upload_accepted_without_heat_column(response: Response) -> None:
    """201 confirms validation ran with random_heats=True; with False it would
    422 for requiring a missing Heat column.
    """
    assert response.status_code == 201


def test_number_of_runs_of_zero_is_rejected() -> None:
    response = _post({**VALID_FORM, "number_of_runs": "0"})

    assert response.status_code == 422


def test_number_of_runs_for_score_of_zero_is_rejected() -> None:
    response = _post({**VALID_FORM, "number_of_runs_for_score": "0"})

    assert response.status_code == 422


def test_number_of_runs_for_score_exceeding_number_of_runs_is_rejected() -> None:
    response = _post(
        {**VALID_FORM, "number_of_runs": "1", "number_of_runs_for_score": "2"}
    )

    assert response.status_code == 422


@patch("app.competition_management.competition_management.process_competitors_df")
def test_a_valid_upload_succeeds(mock_process_competitors_df) -> None:  # noqa: ANN001
    mock_process_competitors_df.return_value = (1, [])

    response = _post(VALID_FORM)

    assert response.status_code == 201
    assert mock_process_competitors_df.call_args.kwargs["number_of_runs"] == 2
    assert mock_process_competitors_df.call_args.kwargs["number_of_runs_for_score"] == 1


@patch("app.competition_management.competition_management.process_competitors_df")
def test_random_heats_upload_without_heat_column_succeeds(
    mock_process_competitors_df,  # noqa: ANN001
) -> None:
    mock_process_competitors_df.return_value = (1, [])

    response = _post(
        {**VALID_FORM, "random_heats": "true", "number_of_random_heats": "2"},
        csv=NO_HEAT_CSV,
    )

    _assert_upload_accepted_without_heat_column(response)


@patch("app.competition_management.competition_management.process_competitors_df")
def test_rows_skipped_for_an_unresolved_event_or_heat_are_returned_in_the_response(
    mock_process_competitors_df,  # noqa: ANN001
) -> None:
    skipped_rows = [
        {
            "first_name": "James",
            "last_name": "Wilkinson",
            "bib": "1",
            "reason": "Event 'Unknown Event' not found",
        }
    ]
    mock_process_competitors_df.return_value = (0, skipped_rows)

    response = _post(VALID_FORM)

    assert response.status_code == 201
    assert response.json()["skipped_rows"] == skipped_rows


@patch("app.competition_management.competition_management.process_competitors_df")
def test_an_excel_windows_1252_csv_uploads_with_accented_names_intact(
    mock_process_competitors_df,  # noqa: ANN001
) -> None:
    mock_process_competitors_df.return_value = (1, [])
    excel_csv = "first_name,last_name,bib,Event,Heat\r\nJosé,Smith,1,K1M,1\r\n,,,,\r\n"

    response = _post(VALID_FORM, csv=excel_csv.encode("cp1252"))

    assert response.status_code == 201
    competitors_df = mock_process_competitors_df.call_args.kwargs["competitors_df"]
    assert competitors_df["first_name"].tolist() == ["José"]


def test_a_start_list_missing_a_column_is_rejected_naming_the_column() -> None:
    response = _post(VALID_FORM, csv=b"last_name,bib,Event,Heat\nWilkinson,1,C1M,1\n")

    assert response.status_code == 422
    assert response.json()["detail"] == "Column 'first_name' is missing from the file"


def test_a_whitespace_only_event_is_rejected_naming_the_column() -> None:
    csv = b"first_name,last_name,bib,Event,Heat\nJames,Wilkinson,1, ,1\n"

    response = _post(VALID_FORM, csv=csv)

    assert response.status_code == 422
    assert response.json()["detail"] == "Column 'Event' has a blank value"


def test_a_file_that_is_not_csv_or_xlsx_is_rejected_naming_the_accepted_types() -> None:
    response = _post(VALID_FORM, filename="competitors.txt")

    assert response.status_code == 422
    assert "'.xlsx' or '.csv'" in response.json()["detail"]


@patch("app.competition_management.competition_management.process_competitors_df")
def test_a_paddleuk_export_uploads_with_conversion_skips_in_the_response(
    mock_process_competitors_df,  # noqa: ANN001
) -> None:
    mock_process_competitors_df.return_value = (1, [])
    csv = paddleuk_csv(
        entry("Carl", "Brook", "6", {"K1 Men (Senior)", "Squirt Men"}, ["SQH2", "10"]),
        entry("Ned", "Cole", "5", set(), []),
    )

    response = _post(VALID_FORM, csv=csv)

    assert response.status_code == 201
    assert response.json()["skipped_rows"] == [
        {
            "first_name": "Ned",
            "last_name": "Cole",
            "bib": "5",
            "reason": "Not entered in any event",
        }
    ]
    competitors_df = mock_process_competitors_df.call_args.kwargs["competitors_df"]
    assert competitors_df[["Event", "Heat", "athlete_key"]].to_dict("records") == [
        {"Event": "K1 Men (Senior)", "Heat": "10", "athlete_key": 0},
        {"Event": "Squirt Men", "Heat": "SQH2", "athlete_key": 0},
    ]


def test_a_paddleuk_export_without_a_bib_column_is_rejected_naming_it() -> None:
    bib_index = HEADER.index("Bib number")
    row = entry("Carl", "Brook", "6", {"Squirt Men"}, ["SQH2"])
    csv = paddleuk_csv(
        row[:bib_index] + row[bib_index + 1 :],
        header=HEADER[:bib_index] + HEADER[bib_index + 1 :],
    )

    response = _post(VALID_FORM, csv=csv)

    assert response.status_code == 422
    assert response.json()["detail"] == "Column 'Bib number' is missing from the file"


@patch("app.competition_management.competition_management.process_competitors_df")
def test_a_paddleuk_export_with_random_heats_needs_no_heat_cells(
    mock_process_competitors_df,  # noqa: ANN001
) -> None:
    mock_process_competitors_df.return_value = (1, [])
    csv = paddleuk_csv(
        entry("Carl", "Brook", "6", {"K1 Men (Senior)", "Squirt Men"}, []),
    )

    response = _post(
        {**VALID_FORM, "random_heats": "true", "number_of_random_heats": "2"},
        csv=csv,
    )

    assert response.status_code == 201
    assert response.json()["skipped_rows"] == []
    competitors_df = mock_process_competitors_df.call_args.kwargs["competitors_df"]
    assert competitors_df["Event"].tolist() == ["K1 Men (Senior)", "Squirt Men"]
