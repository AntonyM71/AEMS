import pandas as pd
import pytest

from app.competition_management.create_competition_from_xlsx import (
    ColumnTypeError,
    MissingColumnError,
    is_paddleuk_export,
    paddleuk_to_start_list,
    read_start_list,
)

EVENT_COLUMNS = [
    "K1 Men (Senior)",
    "K1 Women (Senior)",
    "C1 Men",
    "C1 Women",
    "K1 Men (Junior)",
    "K1 Women (Junior)",
    "Squirt Men",
    "Squirt Women",
    "OC1",
]
HEADER = [
    "First Name",
    "Last Name",
    "Ticket Type",
    "Date of Birth",
    "Age",
    "Gender",
    "Age Category",
    *EVENT_COLUMNS,
    "DOB",
    "Bib number",
    "Heat number Cat 1",
    "Heat Cat 2",
    "Heat Cat 3",
    "Heat Cat 4",
]


def entry(
    first_name: str,
    last_name: str,
    bib: str,
    events: set[str],
    heats: list[str],
) -> list[str]:
    yes_no = ["YES" if event in events else "NO" for event in EVENT_COLUMNS]
    heat_cells = (heats + [""] * 4)[:4]
    personal = ["EntryOne category", "01/01/2000", "26", "Male", "Senior"]
    return [first_name, last_name, *personal, *yes_no, "01/01/2000", bib, *heat_cells]


def paddleuk_csv(*rows: list[str], header: list[str] = HEADER) -> bytes:
    lines = [",".join(header), *(",".join(row) for row in rows)]
    return ("\n".join(lines) + "\n").encode()


def read(*rows: list[str], header: list[str] = HEADER) -> pd.DataFrame:
    return read_start_list("entries.csv", paddleuk_csv(*rows, header=header))


def convert(
    *rows: list[str], random_heats: bool = False
) -> tuple[list[dict], list[dict[str, str]]]:
    start_list, skipped = paddleuk_to_start_list(read(*rows), random_heats=random_heats)
    return start_list.to_dict("records"), skipped


def placement(record: dict) -> tuple[str, str]:
    return record["Event"], record["Heat"]


class TestDetection:
    def test_a_paddleuk_export_is_detected(self) -> None:
        assert is_paddleuk_export(read(entry("Ann", "Lee", "1", {"OC1"}, ["OCH1"])))

    def test_headers_are_matched_ignoring_case_and_surrounding_whitespace(
        self,
    ) -> None:
        header = [
            {
                "Bib number": " BIB NUMBER ",
                "Heat number Cat 1": "heat number cat 1",
            }.get(column, column)
            for column in HEADER
        ]
        start_list = read(entry("Ann", "Lee", "1", {"OC1"}, ["OCH1"]), header=header)
        assert is_paddleuk_export(start_list)

    def test_an_aems_start_list_is_not_detected(self) -> None:
        aems = read_start_list(
            "competitors.csv",
            b"first_name,last_name,bib,Event,Heat\nJames,Wilkinson,1,C1M,1\n",
        )
        assert not is_paddleuk_export(aems)


class TestPairing:
    def test_a_single_event_athlete_goes_into_their_heat(self) -> None:
        start_list, skipped = convert(
            entry("Gail", "Barnes", "2", {"K1 Men (Senior)"}, ["9"])
        )
        assert start_list == [
            {
                "first_name": "Gail",
                "last_name": "Barnes",
                "bib": 2,
                "Event": "K1 Men (Senior)",
                "Heat": "9",
                "athlete_key": 0,
            }
        ]
        assert skipped == []

    def test_a_multi_event_athlete_pairs_prefixed_and_unprefixed_heats(self) -> None:
        start_list, skipped = convert(
            entry(
                "Carl", "Brook", "6", {"K1 Men (Senior)", "Squirt Men"}, ["SQH2", "10"]
            )
        )
        assert sorted(map(placement, start_list)) == [
            ("K1 Men (Senior)", "10"),
            ("Squirt Men", "SQH2"),
        ]
        assert {record["athlete_key"] for record in start_list} == {0}
        assert skipped == []

    def test_prefixed_heats_pair_regardless_of_column_order(self) -> None:
        start_list, _ = convert(
            entry("Cy", "Moss", "3", {"C1 Men", "Squirt Men"}, ["SQH1", "C1H3"])
        )
        assert sorted(map(placement, start_list)) == [
            ("C1 Men", "C1H3"),
            ("Squirt Men", "SQH1"),
        ]

    def test_unprefixed_heats_follow_the_running_order_not_column_order(
        self,
    ) -> None:
        start_list, skipped = convert(
            entry(
                "Jay",
                "Fant",
                "11",
                {"K1 Women (Senior)", "C1 Women", "OC1"},
                ["1", "5", "14"],
            )
        )
        assert sorted(map(placement, start_list)) == [
            ("C1 Women", "1"),
            ("K1 Women (Senior)", "14"),
            ("OC1", "5"),
        ]
        assert skipped == []

    def test_squirt_comes_first_in_the_running_order(self) -> None:
        start_list, _ = convert(
            entry("Carl", "Brook", "6", {"K1 Men (Senior)", "Squirt Men"}, ["2", "10"])
        )
        assert sorted(map(placement, start_list)) == [
            ("K1 Men (Senior)", "10"),
            ("Squirt Men", "2"),
        ]

    def test_unprefixed_heats_fill_the_events_a_prefixed_heat_left(self) -> None:
        start_list, _ = convert(
            entry("Cy", "Moss", "3", {"K1 Men (Senior)", "C1 Men"}, ["K1H11", "3"])
        )
        assert sorted(map(placement, start_list)) == [
            ("C1 Men", "3"),
            ("K1 Men (Senior)", "K1H11"),
        ]

    def test_prefixes_are_matched_case_insensitively(self) -> None:
        start_list, _ = convert(entry("Sue", "Ray", "4", {"Squirt Women"}, ["sqh1"]))
        assert list(map(placement, start_list)) == [("Squirt Women", "sqh1")]

    def test_each_athlete_gets_their_own_key(self) -> None:
        start_list, _ = convert(
            entry("Ann", "Lee", "1", {"OC1"}, ["OCH1"]),
            entry("Bo", "Ng", "2", {"OC1"}, ["OCH1"]),
        )
        assert [record["athlete_key"] for record in start_list] == [0, 1]

    def test_an_all_numeric_heat_column_with_blanks_keeps_whole_heat_names(
        self,
    ) -> None:
        start_list, _ = convert(
            entry(
                "Carl", "Brook", "6", {"K1 Men (Senior)", "Squirt Men"}, ["SQH2", "10"]
            ),
            entry("Gail", "Barnes", "2", {"K1 Men (Senior)"}, ["9"]),
        )
        assert sorted(record["Heat"] for record in start_list) == ["10", "9", "SQH2"]


class TestSkippedEntries:
    def test_a_prefixed_heat_with_no_matching_event_is_skipped(self) -> None:
        start_list, skipped = convert(
            entry("Jo", "Best", "4", {"K1 Men (Senior)"}, ["SQH2"])
        )
        assert start_list == []
        assert [row["reason"] for row in skipped] == [
            "Heat 'SQH2' has no matching Squirt event",
            "No heat for event 'K1 Men (Senior)'",
        ]
        assert skipped[0] == {
            "first_name": "Jo",
            "last_name": "Best",
            "bib": "4",
            "reason": "Heat 'SQH2' has no matching Squirt event",
        }

    def test_a_heat_left_after_every_event_is_paired_is_skipped(self) -> None:
        start_list, skipped = convert(entry("Ola", "Fenn", "9", {"OC1"}, ["5", "8"]))
        assert list(map(placement, start_list)) == [("OC1", "5")]
        assert [row["reason"] for row in skipped] == [
            "Heat '8' has no matching remaining event"
        ]

    def test_an_event_left_without_a_heat_is_the_last_in_running_order(
        self,
    ) -> None:
        start_list, skipped = convert(
            entry("Hal", "Price", "7", {"K1 Men (Senior)", "C1 Men"}, ["3"])
        )
        assert list(map(placement, start_list)) == [("C1 Men", "3")]
        assert [row["reason"] for row in skipped] == [
            "No heat for event 'K1 Men (Senior)'"
        ]

    def test_an_entered_event_with_no_heat_is_skipped(self) -> None:
        start_list, skipped = convert(entry("Ola", "Fenn", "9", {"OC1"}, []))
        assert start_list == []
        assert [row["reason"] for row in skipped] == ["No heat for event 'OC1'"]

    def test_an_athlete_with_no_entered_events_is_skipped(self) -> None:
        start_list, skipped = convert(entry("Ned", "Cole", "5", set(), ["9"]))
        assert start_list == []
        assert [row["reason"] for row in skipped] == ["Not entered in any event"]


class TestValidation:
    @pytest.mark.parametrize("column", ["First Name", "Last Name", "Bib number"])
    def test_a_missing_required_column_is_rejected_naming_it(self, column: str) -> None:
        start_list = read(entry("Ann", "Lee", "1", {"OC1"}, ["OCH1"])).drop(
            columns=column
        )
        assert is_paddleuk_export(start_list)
        with pytest.raises(MissingColumnError, match=column):
            paddleuk_to_start_list(start_list, random_heats=False)

    @pytest.mark.parametrize("bib", ["", "A7"])
    def test_a_blank_or_non_numeric_bib_is_rejected_naming_the_column(
        self, bib: str
    ) -> None:
        start_list = read(
            entry("Ann", "Lee", "1", {"OC1"}, ["OCH1"]),
            entry("Bo", "Ng", bib, {"OC1"}, ["OCH1"]),
        )
        with pytest.raises(ColumnTypeError, match="Bib number"):
            paddleuk_to_start_list(start_list, random_heats=False)

    def test_a_blank_name_is_rejected_naming_the_column(self) -> None:
        start_list = read(entry("", "Lee", "1", {"OC1"}, ["OCH1"]))
        with pytest.raises(ColumnTypeError, match="First Name"):
            paddleuk_to_start_list(start_list, random_heats=False)


class TestRandomHeats:
    def test_every_entered_event_is_listed_without_heats(self) -> None:
        start_list, skipped = convert(
            entry("Carl", "Brook", "6", {"K1 Men (Senior)", "Squirt Men"}, []),
            random_heats=True,
        )
        assert sorted(record["Event"] for record in start_list) == [
            "K1 Men (Senior)",
            "Squirt Men",
        ]
        assert all("Heat" not in record for record in start_list)
        assert skipped == []
