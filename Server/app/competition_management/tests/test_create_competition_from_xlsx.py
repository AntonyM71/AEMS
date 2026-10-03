import uuid
from collections.abc import Iterator
from types import SimpleNamespace
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

MODULE = "app.competition_management.create_competition_from_xlsx"
SCORESHEET_ID = "6766bbc3-cab2-4efd-adf6-a7b453f0a37a"
ADAPTER_NAMES = [
    "post_competition",
    "get_scoresheets",
    "post_event",
    "post_phase",
    "post_heat",
    "post_athlete",
    "post_athlete_heat",
]

TEST_UUIDS_COUNT = 0


def mock_uuid() -> uuid.UUID:
    global TEST_UUIDS_COUNT
    TEST_UUIDS_COUNT += 1
    return uuid.UUID(int=TEST_UUIDS_COUNT)


def uid(n: int) -> str:
    return str(uuid.UUID(int=n))


# Reset before each test
@pytest.fixture(autouse=True)
def reset_test_uuids_count() -> None:
    global TEST_UUIDS_COUNT
    TEST_UUIDS_COUNT = 0


@pytest.fixture
def test_df() -> pd.DataFrame:
    return pd.DataFrame(
        columns=["first_name", "last_name", "bib", "Event", "Heat", "affiliation"],
        data=[
            ["James", "Wilkinson", 1, "Senior Elite C1M", 1, "England"],
            ["John", "Hutchinson", 126, "Senior Intermediate K1M", 1, "England"],
            ["Elizabeth", "Taylor", 110, "Junior Elite K1W", 1, "England"],
            ["Connor", "Keegan", 91, "Senior Intermediate K1M", 1, "Scotland"],
            ["James", "Blunt", 99, "Senior Intermediate K1M", 1, "Wales"],
        ],
    )


@pytest.fixture
def adapters() -> Iterator[SimpleNamespace]:
    mocks = {}
    patchers = [patch(f"{MODULE}.{name}") for name in ADAPTER_NAMES]
    manager = patch(f"{MODULE}.transaction_session_context_manager")
    uuid_patcher = patch.object(uuid, "uuid4", side_effect=mock_uuid)
    for name, patcher in zip(ADAPTER_NAMES, patchers, strict=True):
        mocks[name] = patcher.start()
    manager.start().return_value.__enter__.return_value = MagicMock()
    uuid_patcher.start()
    mocks["get_scoresheets"].return_value = [{"name": "icf", "id": SCORESHEET_ID}]
    yield SimpleNamespace(**mocks)
    patch.stopall()


def single(item: dict) -> object:
    return call([item], db=ANY)


def assert_competition_events_and_phases(adapters: SimpleNamespace) -> None:
    adapters.post_competition.assert_called_once_with(
        [{"name": "test_comp", "id": uid(1)}], db=ANY
    )
    assert adapters.get_scoresheets.call_count == 1
    events = [(2, "Senior Elite C1M"), (4, "Senior Intermediate K1M")]
    events.append((6, "Junior Elite K1W"))
    for event_id, name in events:
        assert (
            single({"name": name, "id": uid(event_id), "competition_id": uid(1)})
            in adapters.post_event.call_args_list
        )
    adapters.post_phase.assert_has_calls(
        [
            single(
                {
                    "name": "Prelim",
                    "id": uid(phase_id),
                    "event_id": uid(phase_id - 1),
                    "number_of_runs": 1,
                    "number_of_runs_for_score": 1,
                    "scoresheet": SCORESHEET_ID,
                    "number_of_judges": 2,
                }
            )
            for phase_id in (3, 5, 7)
        ],
        any_order=True,
    )


ATHLETES = [
    # (id, first_name, last_name, bib, affiliation)
    (9, "James", "Wilkinson", "1", "England"),
    (11, "John", "Hutchinson", "126", "England"),
    (13, "Elizabeth", "Taylor", "110", "England"),
    (15, "Connor", "Keegan", "91", "Scotland"),
    (17, "James", "Blunt", "99", "Wales"),
]
ATHLETE_PHASES = [3, 5, 7, 5, 5]


def assert_athletes_and_heats(
    adapters: SimpleNamespace,
    *,
    affiliated: bool = True,
    last_phase_ranks: list[int | None] | None = None,
) -> None:
    ranks = last_phase_ranks or [None] * len(ATHLETES)
    adapters.post_heat.assert_called_with(
        [{"name": "Heat 1", "id": ANY, "competition_id": ANY}], db=ANY
    )
    adapters.post_athlete.assert_has_calls(
        [
            single(
                {
                    "id": uid(athlete_id),
                    "first_name": first,
                    "last_name": last,
                    "bib": bib,
                    "affiliation": affiliation if affiliated else None,
                }
            )
            for athlete_id, first, last, bib, affiliation in ATHLETES
        ],
        any_order=True,
    )
    assert adapters.post_athlete_heat.call_count == len(ATHLETES)
    adapters.post_athlete_heat.assert_has_calls(
        [
            single(
                {
                    "id": uid(athlete_id + 1),
                    "heat_id": uid(8),
                    "athlete_id": uid(athlete_id),
                    "phase_id": uid(phase_id),
                    "last_phase_rank": rank,
                }
            )
            for (athlete_id, *_), phase_id, rank in zip(
                ATHLETES, ATHLETE_PHASES, ranks, strict=True
            )
        ],
        any_order=True,
    )


class TestScoring:
    def test_it_raises_an_error_if_the_scoresheet_does_not_exist(
        self,
        adapters: SimpleNamespace,
        test_df: pd.DataFrame,
    ) -> None:
        adapters.get_scoresheets.return_value = [{"name": "other", "id": "x"}]
        with pytest.raises(ScoresheetWithSpecifiedNameDoesNotExistError):
            process_competitors_df(test_df, "test_comp")
        adapters.post_competition.assert_called_once_with(
            [{"name": "test_comp", "id": ANY}], db=ANY
        )
        adapters.get_scoresheets.assert_called_once_with(db=ANY)

    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet(
        self,
        adapters: SimpleNamespace,
        test_df: pd.DataFrame,
    ) -> None:
        process_competitors_df(test_df, "test_comp")
        assert_competition_events_and_phases(adapters)
        assert_athletes_and_heats(adapters)

    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet_without_affiliations(
        self,
        adapters: SimpleNamespace,
        test_df: pd.DataFrame,
    ) -> None:
        process_competitors_df(test_df.drop(columns="affiliation"), "test_comp")
        assert_competition_events_and_phases(adapters)
        assert_athletes_and_heats(adapters, affiliated=False)

    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet_with_last_phase_ranks(
        self,
        adapters: SimpleNamespace,
        test_df: pd.DataFrame,
    ) -> None:
        test_df["last_phase_rank"] = pd.Series([1, 2, 3, 4, 5])
        process_competitors_df(test_df, "test_comp")
        assert_competition_events_and_phases(adapters)
        assert_athletes_and_heats(adapters, last_phase_ranks=[1, 2, 3, 4, 5])

    def test_it_calls_the_database_adapters_correctly_with_a_valid_spreadsheet_and_random_heats(
        self,
        adapters: SimpleNamespace,
        test_df: pd.DataFrame,
    ) -> None:
        process_competitors_df(
            test_df, "test_comp", random_heats=True, number_of_random_heats=3
        )
        assert_competition_events_and_phases(adapters)
        adapters.post_heat.assert_called_with(
            [{"name": ANY, "id": ANY, "competition_id": uid(1)}], db=ANY
        )
        adapters.post_athlete.assert_has_calls(
            [
                single(
                    {
                        "id": ANY,
                        "first_name": first,
                        "last_name": last,
                        "bib": bib,
                        "affiliation": affiliation,
                    }
                )
                for _, first, last, bib, affiliation in ATHLETES
            ],
            any_order=True,
        )
        assert adapters.post_athlete_heat.call_count == len(ATHLETES)
        adapters.post_athlete_heat.assert_has_calls(
            [
                single(
                    {
                        "id": ANY,
                        "heat_id": ANY,
                        "athlete_id": ANY,
                        "phase_id": uid(phase_id),
                        "last_phase_rank": None,
                    }
                )
                for phase_id in (5, 7, 5)
            ],
            any_order=True,
        )

    def test_it_skips_a_row_whose_event_does_not_resolve_without_creating_an_orphaned_athlete(
        self,
        adapters: SimpleNamespace,
    ) -> None:
        # Trailing whitespace on the Event value means event_phase_map's key
        # (built from the raw column) never matches the stripped lookup.
        mismatched_event_df = pd.DataFrame(
            columns=["first_name", "last_name", "bib", "Event", "Heat"],
            data=[["James", "Wilkinson", 1, "Senior Elite C1M ", 1]],
        )

        paddler_count, skipped_rows = process_competitors_df(
            mismatched_event_df, "test_comp"
        )

        assert paddler_count == 0
        assert skipped_rows == [
            {
                "first_name": "James",
                "last_name": "Wilkinson",
                "bib": "1",
                "reason": "Event 'Senior Elite C1M ' not found",
            }
        ]
        adapters.post_athlete.assert_not_called()
        adapters.post_athlete_heat.assert_not_called()


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
        assert str(excinfo.value) == f"Column '{column}' is missing from the file"

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
        validate_columns_and_data_types(competition_df=test_df, random_heats=False)


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
