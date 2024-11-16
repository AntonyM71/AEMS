import uuid
from unittest.mock import ANY, call, patch

import pandas as pd
import pytest

from app.competition_management.create_competition_from_xlsx import (
    ScoresheetWithSpecifiedNameDoesNotExistError,
    process_competitors_df,
)

TEST_UUIDS_COUNT = 0


def mock_uuid() -> uuid.UUID:
    global TEST_UUIDS_COUNT
    TEST_UUIDS_COUNT += 1
    return uuid.UUID(int=TEST_UUIDS_COUNT)


@pytest.fixture
def test_df() -> pd.DataFrame:
    return pd.DataFrame(
        columns=["first_name", "last_name", "bib", "Event", "Heat"],
        data=[
            ["James", "Wilkinson", 1, "Senior Elite C1M", 1],
            ["John", "Hutchinson", 126, "Senior Intermediate K1M", 1],
            ["Elizabeth", "Taylor", 110, "Junior Elite K1W", 1],
            ["Connor", "Keegan", 91, "Senior Intermediate K1M", 1],
            ["James", "Blunt", 99, "Senior Intermediate K1M", 1],
        ],
    )


class TestScoring:
    @patch("app.competition_management.create_competition_from_xlsx.get_scoresheets")
    @patch("app.competition_management.create_competition_from_xlsx.post_competition")
    def test_it_raises_an_error_if_the_scoresheet_does_not_exist(
        self,
        mock_post_competition,  # noqa: ANN001
        mock_get_scoresheets,  # noqa: ANN001
        test_df,  # noqa: ANN001
    ) -> None:
        mock_get_scoresheets.return_value([])
        with pytest.raises(ScoresheetWithSpecifiedNameDoesNotExistError):
            process_competitors_df(test_df, "test_comp")
        mock_post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": ANY}]
        )
        mock_get_scoresheets.assert_called_once_with()

    @patch.object(uuid, "uuid4", side_effect=mock_uuid)
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete")
    @patch("app.competition_management.create_competition_from_xlsx.post_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_phase")
    @patch("app.competition_management.create_competition_from_xlsx.post_event")
    @patch("app.competition_management.create_competition_from_xlsx.get_scoresheets")
    @patch("app.competition_management.create_competition_from_xlsx.post_competition")
    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet(
        self,
        mock_post_competition,  # noqa: ANN001
        mock_get_scoresheets,  # noqa: ANN001
        mock_post_event,  # noqa: ANN001
        mock_post_phase,  # noqa: ANN001
        mock_post_heat,  # noqa: ANN001
        mock_post_athlete,  # noqa: ANN001
        mock_post_athlete_heat,  # noqa: ANN001
        mock_uuid,  # noqa: ANN001
        test_df,  # noqa: ANN001
    ) -> None:
        mock_get_scoresheets.return_value = [
            {"name": "icf", "id": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a"}
        ]

        process_competitors_df(test_df, "test_comp")
        mock_post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": "00000000-0000-0000-0000-000000000001"}]
        )
        assert mock_get_scoresheets.call_count == 1
        assert (
            call(
                [
                    {
                        "name": "Senior Elite C1M",
                        "id": "00000000-0000-0000-0000-000000000002",
                        "competition_id": "00000000-0000-0000-0000-000000000001",
                    }
                ]
            )
            in mock_post_event.call_args_list
        )
        assert (
            call(
                [
                    {
                        "name": "Senior Intermediate K1M",
                        "id": "00000000-0000-0000-0000-000000000004",
                        "competition_id": "00000000-0000-0000-0000-000000000001",
                    }
                ]
            )
            in mock_post_event.call_args_list
        )
        assert (
            call(
                [
                    {
                        "name": "Junior Elite K1W",
                        "id": "00000000-0000-0000-0000-000000000006",
                        "competition_id": "00000000-0000-0000-0000-000000000001",
                    }
                ]
            )
            in mock_post_event.call_args_list
        )

        # mock_post_phase.to()
        mock_post_heat.assert_called_with(
            [{"name": "Heat 1", "id": ANY, "competition_id": ANY}]
        )
        mock_post_phase.assert_has_calls(
            [
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000003",
                            "event_id": "00000000-0000-0000-0000-000000000002",
                            "number_of_runs": "1",
                            "number_of_runs_for_score": "1",
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": "2",
                        }
                    ]
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000005",
                            "event_id": "00000000-0000-0000-0000-000000000004",
                            "number_of_runs": "1",
                            "number_of_runs_for_score": "1",
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": "2",
                        }
                    ]
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000007",
                            "event_id": "00000000-0000-0000-0000-000000000006",
                            "number_of_runs": "1",
                            "number_of_runs_for_score": "1",
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": "2",
                        }
                    ]
                ),
            ],
            any_order=True,
        )
        mock_post_athlete.assert_has_calls(
            [
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000009",
                            "first_name": "James",
                            "last_name": "Wilkinson",
                            "bib": "1",
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000b",
                            "first_name": "John",
                            "last_name": "Hutchinson",
                            "bib": "126",
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000d",
                            "first_name": "Elizabeth",
                            "last_name": "Taylor",
                            "bib": "110",
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000f",
                            "first_name": "Connor",
                            "last_name": "Keegan",
                            "bib": "91",
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000011",
                            "first_name": "James",
                            "last_name": "Blunt",
                            "bib": "99",
                        }
                    ]
                ),
            ],
            any_order=True,
        )
        mock_post_athlete_heat.assert_has_calls(
            [
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000a",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-000000000009",
                            "phase_id": "00000000-0000-0000-0000-000000000003",
                            "last_phase_rank": None,
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000c",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-00000000000b",
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": None,
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000e",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-00000000000d",
                            "phase_id": "00000000-0000-0000-0000-000000000007",
                            "last_phase_rank": None,
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000010",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-00000000000f",
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": None,
                        }
                    ]
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000012",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-000000000011",
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": None,
                        }
                    ]
                ),
            ],
            any_order=True,
        )
