import uuid
from unittest.mock import ANY, MagicMock, call, patch

import pandas as pd
import pytest

from app.competition_management.create_competition_from_xlsx import (
    ColumnTypeError,
    MissingColumnError,
    NoHeatInfoForNonRandomHeatError,
    ScoresheetWithSpecifiedNameDoesNotExistError,
    make_random_heats,
    process_competitors_df,
    validate_columns_and_data_types,
)

TEST_UUIDS_COUNT = 0


def mock_uuid() -> uuid.UUID:
    global TEST_UUIDS_COUNT
    TEST_UUIDS_COUNT += 1
    return uuid.UUID(int=TEST_UUIDS_COUNT)


# Reset before each test
@pytest.fixture(autouse=True)
def reset_test_uuids_count() -> None:
    global TEST_UUIDS_COUNT
    TEST_UUIDS_COUNT = 0


@pytest.fixture
def test_df() -> pd.DataFrame:
    return pd.DataFrame(
        columns=["first_name", "last_name", "bib",
                 "Event", "Heat", "affiliation"],
        data=[
            ["James", "Wilkinson", 1, "Senior Elite C1M", 1, "England"],
            ["John", "Hutchinson", 126, "Senior Intermediate K1M", 1, "England"],
            ["Elizabeth", "Taylor", 110, "Junior Elite K1W", 1, "England"],
            ["Connor", "Keegan", 91, "Senior Intermediate K1M", 1, "Scotland"],
            ["James", "Blunt", 99, "Senior Intermediate K1M", 1, "Wales"],
        ],
    )


class TestScoring:
    @patch("app.competition_management.create_competition_from_xlsx.get_scoresheets")
    @patch("app.competition_management.create_competition_from_xlsx.post_competition")
    @patch(
        "app.competition_management.create_competition_from_xlsx.transaction_session_context_manager"
    )
    def test_it_raises_an_error_if_the_scoresheet_does_not_exist(
        self,
        mock_transaction_manager,  # noqa: ANN001
        mock_post_competition,  # noqa: ANN001
        mock_get_scoresheets,  # noqa: ANN001
        test_df,  # noqa: ANN001
    ) -> None:
        # Set up the mock context manager
        mock_session = MagicMock()
        mock_transaction_manager.return_value.__enter__.return_value = mock_session

        mock_get_scoresheets.return_value([])
        with pytest.raises(ScoresheetWithSpecifiedNameDoesNotExistError):
            process_competitors_df(test_df, "test_comp")
        mock_post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": ANY}], db=ANY
        )
        mock_get_scoresheets.assert_called_once_with(db=ANY)

    @patch.object(uuid, "uuid4", side_effect=mock_uuid)
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete")
    @patch("app.competition_management.create_competition_from_xlsx.post_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_phase")
    @patch("app.competition_management.create_competition_from_xlsx.post_event")
    @patch("app.competition_management.create_competition_from_xlsx.get_scoresheets")
    @patch("app.competition_management.create_competition_from_xlsx.post_competition")
    @patch(
        "app.competition_management.create_competition_from_xlsx.transaction_session_context_manager"
    )
    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet(
        self,
        mock_transaction_manager,  # noqa: ANN001
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
        # Set up the mock context manager
        mock_session = MagicMock()
        mock_transaction_manager.return_value.__enter__.return_value = mock_session
        mock_get_scoresheets.return_value = [
            {"name": "icf", "id": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a"}
        ]

        process_competitors_df(test_df, "test_comp")
        mock_post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": "00000000-0000-0000-0000-000000000001"}],
            db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
            )
            in mock_post_event.call_args_list
        )
        mock_post_heat.assert_called_with(
            [{"name": "Heat 1", "id": ANY, "competition_id": ANY}], db=ANY
        )
        mock_post_phase.assert_has_calls(
            [
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000003",
                            "event_id": "00000000-0000-0000-0000-000000000002",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000005",
                            "event_id": "00000000-0000-0000-0000-000000000004",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000007",
                            "event_id": "00000000-0000-0000-0000-000000000006",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
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
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000b",
                            "first_name": "John",
                            "last_name": "Hutchinson",
                            "bib": "126",
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000d",
                            "first_name": "Elizabeth",
                            "last_name": "Taylor",
                            "bib": "110",
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000f",
                            "first_name": "Connor",
                            "last_name": "Keegan",
                            "bib": "91",
                            "affiliation": "Scotland",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000011",
                            "first_name": "James",
                            "last_name": "Blunt",
                            "bib": "99",
                            "affiliation": "Wales",
                        }
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )
        assert mock_post_athlete_heat.call_count == 5
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )

    @patch.object(uuid, "uuid4", side_effect=mock_uuid)
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete")
    @patch("app.competition_management.create_competition_from_xlsx.post_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_phase")
    @patch("app.competition_management.create_competition_from_xlsx.post_event")
    @patch("app.competition_management.create_competition_from_xlsx.get_scoresheets")
    @patch("app.competition_management.create_competition_from_xlsx.post_competition")
    @patch(
        "app.competition_management.create_competition_from_xlsx.transaction_session_context_manager"
    )
    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet_without_affiliations(
        self,
        mock_transaction_manager,  # noqa: ANN001
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
        # Set up the mock context manager
        mock_session = MagicMock()
        mock_transaction_manager.return_value.__enter__.return_value = mock_session

        mock_get_scoresheets.return_value = [
            {"name": "icf", "id": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a"}
        ]

        no_affiliation_test_df = test_df.drop(columns="affiliation")
        process_competitors_df(no_affiliation_test_df, "test_comp")
        mock_post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": "00000000-0000-0000-0000-000000000001"}],
            db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
            )
            in mock_post_event.call_args_list
        )
        mock_post_heat.assert_called_with(
            [{"name": "Heat 1", "id": ANY, "competition_id": ANY}], db=ANY
        )
        mock_post_phase.assert_has_calls(
            [
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000003",
                            "event_id": "00000000-0000-0000-0000-000000000002",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000005",
                            "event_id": "00000000-0000-0000-0000-000000000004",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000007",
                            "event_id": "00000000-0000-0000-0000-000000000006",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
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
                            "affiliation": None,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000b",
                            "first_name": "John",
                            "last_name": "Hutchinson",
                            "bib": "126",
                            "affiliation": None,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000d",
                            "first_name": "Elizabeth",
                            "last_name": "Taylor",
                            "bib": "110",
                            "affiliation": None,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000f",
                            "first_name": "Connor",
                            "last_name": "Keegan",
                            "bib": "91",
                            "affiliation": None,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000011",
                            "first_name": "James",
                            "last_name": "Blunt",
                            "bib": "99",
                            "affiliation": None,
                        }
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )
        assert mock_post_athlete_heat.call_count == 5
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
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
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )

    @patch.object(uuid, "uuid4", side_effect=mock_uuid)
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete")
    @patch("app.competition_management.create_competition_from_xlsx.post_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_phase")
    @patch("app.competition_management.create_competition_from_xlsx.post_event")
    @patch("app.competition_management.create_competition_from_xlsx.get_scoresheets")
    @patch("app.competition_management.create_competition_from_xlsx.post_competition")
    @patch(
        "app.competition_management.create_competition_from_xlsx.transaction_session_context_manager"
    )
    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet_with_last_phase_ranks(
        self,
        mock_transaction_manager,  # noqa: ANN001
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
        # Set up the mock context manager
        mock_session = MagicMock()
        mock_transaction_manager.return_value.__enter__.return_value = mock_session
        mock_get_scoresheets.return_value = [
            {"name": "icf", "id": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a"}
        ]

        test_df["last_phase_rank"] = pd.Series([1, 2, 3, 4, 5])
        process_competitors_df(test_df, "test_comp")
        mock_post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": "00000000-0000-0000-0000-000000000001"}],
            db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
            )
            in mock_post_event.call_args_list
        )
        mock_post_heat.assert_called_with(
            [{"name": "Heat 1", "id": ANY, "competition_id": ANY}], db=ANY
        )
        mock_post_phase.assert_has_calls(
            [
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000003",
                            "event_id": "00000000-0000-0000-0000-000000000002",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000005",
                            "event_id": "00000000-0000-0000-0000-000000000004",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000007",
                            "event_id": "00000000-0000-0000-0000-000000000006",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
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
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000b",
                            "first_name": "John",
                            "last_name": "Hutchinson",
                            "bib": "126",
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000d",
                            "first_name": "Elizabeth",
                            "last_name": "Taylor",
                            "bib": "110",
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000f",
                            "first_name": "Connor",
                            "last_name": "Keegan",
                            "bib": "91",
                            "affiliation": "Scotland",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000011",
                            "first_name": "James",
                            "last_name": "Blunt",
                            "bib": "99",
                            "affiliation": "Wales",
                        }
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )
        assert mock_post_athlete_heat.call_count == 5
        mock_post_athlete_heat.assert_has_calls(
            [
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000a",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-000000000009",
                            "phase_id": "00000000-0000-0000-0000-000000000003",
                            "last_phase_rank": 1,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000c",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-00000000000b",
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-00000000000e",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-00000000000d",
                            "phase_id": "00000000-0000-0000-0000-000000000007",
                            "last_phase_rank": 3,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000010",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-00000000000f",
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": 4,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": "00000000-0000-0000-0000-000000000012",
                            "heat_id": "00000000-0000-0000-0000-000000000008",
                            "athlete_id": "00000000-0000-0000-0000-000000000011",
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": 5,
                        }
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )

    @patch.object(uuid, "uuid4", side_effect=mock_uuid)
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_athlete")
    @patch("app.competition_management.create_competition_from_xlsx.post_heat")
    @patch("app.competition_management.create_competition_from_xlsx.post_phase")
    @patch("app.competition_management.create_competition_from_xlsx.post_event")
    @patch("app.competition_management.create_competition_from_xlsx.get_scoresheets")
    @patch("app.competition_management.create_competition_from_xlsx.post_competition")
    @patch(
        "app.competition_management.create_competition_from_xlsx.transaction_session_context_manager"
    )
    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet_and_random_heats(
        self,
        mock_transaction_manager,  # noqa: ANN001
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
        # Set up the mock context manager
        mock_session = MagicMock()
        mock_transaction_manager.return_value.__enter__.return_value = mock_session
        mock_get_scoresheets.return_value = [
            {"name": "icf", "id": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a"}
        ]
        process_competitors_df(
            test_df, "test_comp", random_heats=True, number_of_random_heats=3
        )
        mock_post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": "00000000-0000-0000-0000-000000000001"}],
            db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
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
                ],
                db=ANY,
            )
            in mock_post_event.call_args_list
        )
        mock_post_heat.assert_called_with(
            [
                {
                    "name": ANY,
                    "id": ANY,
                    "competition_id": "00000000-0000-0000-0000-000000000001",
                }
            ],
            db=ANY,
        )
        mock_post_phase.assert_has_calls(
            [
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000003",
                            "event_id": "00000000-0000-0000-0000-000000000002",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000005",
                            "event_id": "00000000-0000-0000-0000-000000000004",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "name": "Prelim",
                            "id": "00000000-0000-0000-0000-000000000007",
                            "event_id": "00000000-0000-0000-0000-000000000006",
                            "number_of_runs": 1,
                            "number_of_runs_for_score": 1,
                            "scoresheet": "6766bbc3-cab2-4efd-adf6-a7b453f0a37a",
                            "number_of_judges": 2,
                        }
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )
        mock_post_athlete.assert_has_calls(
            [
                call(
                    [
                        {
                            "id": ANY,
                            "first_name": "James",
                            "last_name": "Blunt",
                            "bib": "99",
                            "affiliation": "Wales",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": ANY,
                            "first_name": "Elizabeth",
                            "last_name": "Taylor",
                            "bib": "110",
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": ANY,
                            "first_name": "Connor",
                            "last_name": "Keegan",
                            "bib": "91",
                            "affiliation": "Scotland",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": ANY,
                            "first_name": "James",
                            "last_name": "Wilkinson",
                            "bib": "1",
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": ANY,
                            "first_name": "John",
                            "last_name": "Hutchinson",
                            "bib": "126",
                            "affiliation": "England",
                        }
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )
        assert mock_post_athlete_heat.call_count == 5
        mock_post_athlete_heat.assert_has_calls(
            [
                call(
                    [
                        {
                            "id": ANY,
                            "heat_id": ANY,
                            "athlete_id": ANY,
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": None,
                        }
                    ],
                    db=ANY,
                ),
                call(
                    [
                        {
                            "id": ANY,
                            "heat_id": ANY,
                            "athlete_id": ANY,
                            "phase_id": "00000000-0000-0000-0000-000000000007",
                            "last_phase_rank": None,
                        }
                    ],
                    db=ANY,
                ),
                # call(
                #     [
                #         {
                #             "id": ANY,
                #             "heat_id": ANY,
                #             "athlete_id": ANY,
                #             "phase_id": "00000000-0000-0000-0000-000000000003",
                #             "last_phase_rank": None,
                #         }
                #     ],
                #     ANY,
                # ),
                call(
                    [
                        {
                            "id": ANY,
                            "heat_id": ANY,
                            "athlete_id": ANY,
                            "phase_id": "00000000-0000-0000-0000-000000000005",
                            "last_phase_rank": None,
                        }
                    ],
                    db=ANY,
                ),
            ],
            any_order=True,
        )


MANDATORY_COLUMNS = ["first_name", "last_name", "bib", "Event"]


class TestValidateColumnsAndDataTypes:
    def test_it_passes_when_mandatory_columns_are_there(
        self, test_df: pd.DataFrame
    ) -> None:
        validate_columns_and_data_types(
            competition_df=test_df,
            random_heats=False,
        )

    @pytest.mark.parametrize("column", MANDATORY_COLUMNS)
    def test_it_raises_an_error_when_mandatory_columns_not_there(
        self, column: str, test_df: pd.DataFrame
    ) -> None:
        modified_test_df = test_df.drop([column], axis=1)
        with pytest.raises(MissingColumnError) as excinfo:
            validate_columns_and_data_types(
                competition_df=modified_test_df, random_heats=False
            )
        assert str(
            excinfo.value) == f"Column '{column}' is missing from the file"

    def test_it_passes_no_heats_are_provided_if_random_heats_is_true(
        self, test_df: pd.DataFrame
    ) -> None:
        modified_test_df = test_df.drop(["Heat"], axis=1)

        validate_columns_and_data_types(
            competition_df=modified_test_df, random_heats=True
        )

    def test_it_raises_an_error_no_heats_are_provided_if_random_heats_is_false(
        self, test_df: pd.DataFrame
    ) -> None:
        modified_test_df = test_df.drop(["Heat"], axis=1)
        with pytest.raises(NoHeatInfoForNonRandomHeatError) as excinfo:
            validate_columns_and_data_types(
                competition_df=modified_test_df, random_heats=False
            )
        assert (
            str(excinfo.value)
            == "No heat information provided, and random heat allocation is disabled"
        )

    def test_it_passes_when_columns_are_there_and_dtypes_are_correct(
        self, test_df: pd.DataFrame
    ) -> None:
        validate_columns_and_data_types(
            competition_df=test_df, random_heats=False)


@pytest.mark.parametrize(
    "column, incorrect_value",
    [
        ("first_name", 123),  # Incorrect type (int instead of string)
        ("last_name", 456),  # Incorrect type (int instead of string)
        ("Event", 789),  # Incorrect type (int instead of string)
        # Incorrect type (string instead of int)
        ("Heat", "one"),
        # Incorrect type (string instead of int)
        ("bib", "two"),
    ],
)
def test_incorrect_dtype_raises_error(
    column: str, incorrect_value: str | int, test_df: pd.DataFrame
) -> None:
    test_df.loc[0, column] = incorrect_value
    with pytest.raises(
        ColumnTypeError, match=f"Column '{column}' is not of type '<function is_[^']+'"
    ):
        validate_columns_and_data_types(test_df, random_heats=False)


# Import the function to be tested


class TestMakeRandomHeats:
    def test_make_random_heats_zero(self) -> None:
        result = make_random_heats(0)
        assert result == []

    def test_make_random_heats_one(self) -> None:
        result = make_random_heats(1)
        assert result == ["1"]

    def test_make_random_heats_multiple(self) -> None:
        result = make_random_heats(5)
        assert result == ["1", "2", "3", "4", "5"]

    def test_make_random_heats_large_number(self) -> None:
        result = make_random_heats(100)
        expected = [f"{i}" for i in range(1, 101)]
        assert result == expected
