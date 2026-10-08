import uuid
from io import BytesIO, StringIO

import numpy as np
import pandas as pd
import pandas.api.types as ptypes
from numpy import ndarray
from sqlalchemy.orm import Session

from db.client import transaction_session_context_manager
from db.models import Athlete, AthleteHeat, Competition, Event, Heat, Phase, ScoreSheet

base_url = "http://localhost:8000/"
competition_url = base_url + "competition"
scoresheet_url = base_url + "scoresheet"
athlete_url = base_url + "athlete"
athlete_heat_url = base_url + "athleteheat"
event_url = base_url + "event"
phase_url = base_url + "phase"
heat_url = base_url + "heat"

scoresheet_name = "icf"

number_of_runs = "1"
number_of_runs_for_score = "1"
number_of_judges = "2"


class ScoresheetWithSpecifiedNameDoesNotExistError(Exception):
    pass


class MissingColumnError(Exception):
    pass


class ColumnTypeError(Exception):
    pass


class InvalidFileTypeError(Exception):
    pass


def read_start_list(filename: str, data: bytes) -> pd.DataFrame:
    """Reads CSVs as Excel saves them: UTF-8 or Windows-1252, comma or semicolon."""
    lowered_filename = filename.lower()
    if lowered_filename.endswith(".xlsx"):
        sheets = pd.read_excel(BytesIO(data), sheet_name=None)
        competitors_df = pd.concat(sheets.values(), ignore_index=True)
    elif lowered_filename.endswith(".csv"):
        competitors_df = _read_excel_csv(data)
    else:
        msg = f"File: {filename} must have suffix '.xlsx' or '.csv'"
        raise InvalidFileTypeError(msg)
    return _drop_blank_rows(competitors_df)


def _read_excel_csv(data: bytes) -> pd.DataFrame:
    try:
        text = data.decode("utf-8-sig")
    except UnicodeDecodeError:
        text = data.decode("cp1252")
    header = next(iter(text.splitlines()), "")
    # Comma-decimal locales make Excel separate fields with ';'.
    is_semicolon_separated = ";" in header and "," not in header
    return pd.read_csv(StringIO(text), sep=";" if is_semicolon_separated else ",")


def _drop_blank_rows(competitors_df: pd.DataFrame) -> pd.DataFrame:
    competitors_df = competitors_df.replace(r"^\s*$", np.nan, regex=True).dropna(
        how="all"
    )
    # Blank rows force these columns to float while they are read; downcast
    # restores int only when no value is missing or fractional.
    for column in ("bib", "Heat"):
        if column in competitors_df and ptypes.is_float_dtype(competitors_df[column]):
            competitors_df[column] = pd.to_numeric(
                competitors_df[column], downcast="integer"
            )
    return competitors_df


PADDLEUK_MARKER_COLUMN = "heat number cat 1"
PADDLEUK_BOAT_TYPES_IN_RUNNING_ORDER = ("Squirt", "C1", "OC1", "K1")
PADDLEUK_HEAT_PREFIX_BOAT_TYPES = {
    "K1H": "K1",
    "C1H": "C1",
    "SQH": "Squirt",
    "OCH": "OC1",
}


def _normalised_header(column: object) -> str:
    return str(column).strip().lower()


def is_paddleuk_export(competitors_df: pd.DataFrame) -> bool:
    return PADDLEUK_MARKER_COLUMN in map(_normalised_header, competitors_df.columns)


def paddleuk_to_start_list(
    competitors_df: pd.DataFrame, *, random_heats: bool
) -> tuple[pd.DataFrame, list[dict[str, str]]]:
    """Converts a Paddle UK entry export to the AEMS start-list layout.

    Returns one row per athlete-event, keyed by `athlete_key` so each source
    row stays one athlete, plus the entries that could not be paired to a heat.
    """
    first_name_column, last_name_column, bib_column = (
        _paddleuk_column(competitors_df, name)
        for name in ("First Name", "Last Name", "Bib number")
    )
    for column in (first_name_column, last_name_column):
        if competitors_df[column].isna().any():
            msg = f"Column '{column}' has a blank value"
            raise ColumnTypeError(msg)
    bibs = _paddleuk_bibs(competitors_df[bib_column])
    event_boat_types = {
        column: boat_type
        for column in competitors_df.columns
        if (boat_type := _event_boat_type(column))
    }
    heat_columns = [
        column
        for column in competitors_df.columns
        if _normalised_header(column).startswith("heat")
    ]

    entries: list[dict] = []
    skipped_rows: list[dict[str, str]] = []
    for athlete_key, (index, row) in enumerate(competitors_df.iterrows()):
        athlete = {
            "first_name": row[first_name_column],
            "last_name": row[last_name_column],
            "bib": bibs[index],
        }
        entered = [column for column in event_boat_types if _is_yes(row[column])]
        if random_heats:
            pairs = dict.fromkeys(entered)
            reasons = []
        else:
            heats = [
                name for column in heat_columns if (name := _heat_name(row[column]))
            ]
            pairs, reasons = _pair_heats_to_events(
                {column: event_boat_types[column] for column in entered}, heats
            )
        if not entered:
            reasons = ["Not entered in any event"]
        skipped_rows += [
            {
                "first_name": athlete["first_name"],
                "last_name": athlete["last_name"],
                "bib": str(athlete["bib"]),
                "reason": reason,
            }
            for reason in reasons
        ]
        entries += [
            {
                **athlete,
                "Event": str(event).strip(),
                "Heat": pairs[event],
                "athlete_key": athlete_key,
            }
            for event in entered
            if event in pairs
        ]

    columns = ["first_name", "last_name", "bib", "Event", "Heat", "athlete_key"]
    start_list = pd.DataFrame(entries, columns=columns)
    if random_heats:
        start_list = start_list.drop(columns="Heat")
    return start_list, skipped_rows


def _paddleuk_column(competitors_df: pd.DataFrame, name: str) -> str:
    for column in competitors_df.columns:
        if _normalised_header(column) == name.lower():
            return column
    msg = f"Column '{name}' is missing from the file"
    raise MissingColumnError(msg)


def _paddleuk_bibs(bib_cells: pd.Series) -> pd.Series:
    if bib_cells.isna().any():
        msg = f"Column '{bib_cells.name}' has a blank value"
        raise ColumnTypeError(msg)
    bibs = pd.to_numeric(bib_cells, errors="coerce")
    if bibs.isna().any() or (bibs % 1 != 0).any():
        msg = f"Column '{bib_cells.name}' must contain only whole numbers"
        raise ColumnTypeError(msg)
    return bibs.astype(int)


def _event_boat_type(column: object) -> str | None:
    header = _normalised_header(column)
    return next(
        (
            boat_type
            for boat_type in PADDLEUK_BOAT_TYPES_IN_RUNNING_ORDER
            if header.startswith(boat_type.lower())
        ),
        None,
    )


def _heat_boat_type(heat: str) -> str | None:
    return next(
        (
            boat_type
            for prefix, boat_type in PADDLEUK_HEAT_PREFIX_BOAT_TYPES.items()
            if heat.upper().startswith(prefix)
        ),
        None,
    )


def _is_yes(cell: object) -> bool:
    return isinstance(cell, str) and cell.strip().upper() == "YES"


def _heat_name(cell: object) -> str | None:
    if pd.isna(cell):
        return None
    # A heat column holding only numbers and blanks is read as float.
    if isinstance(cell, float) and cell.is_integer():
        return str(int(cell))
    return str(cell).strip()


def _pair_heats_to_events(
    event_boat_types: dict[str, str], heats: list[str]
) -> tuple[dict[str, str], list[str]]:
    """The heat columns list an athlete's events in running order, so once each
    prefixed heat claims its boat type's event, unprefixed heats take the
    remaining events in that order. Returns event→heat pairs and skip reasons.
    """
    unpaired_events = sorted(
        event_boat_types,
        key=lambda event: PADDLEUK_BOAT_TYPES_IN_RUNNING_ORDER.index(
            event_boat_types[event]
        ),
    )
    pairs: dict[str, str] = {}
    reasons: list[str] = []
    prefixed_heats = [heat for heat in heats if _heat_boat_type(heat)]
    unprefixed_heats = [heat for heat in heats if not _heat_boat_type(heat)]
    for heat in prefixed_heats + unprefixed_heats:
        boat_type = _heat_boat_type(heat)
        event = next(
            (
                event
                for event in unpaired_events
                if boat_type in (None, event_boat_types[event])
            ),
            None,
        )
        if event is None:
            reasons.append(
                f"Heat '{heat}' has no matching {boat_type or 'remaining'} event"
            )
            continue
        pairs[event] = heat
        unpaired_events.remove(event)
    reasons += [
        f"No heat for event '{str(event).strip()}'" for event in unpaired_events
    ]
    return pairs, reasons


def generate_uuid() -> str:
    return str(uuid.uuid4())


def post_competition(competition_data: list[dict], db: Session) -> None:
    db.bulk_save_objects([Competition(**c) for c in competition_data])


def get_scoresheets(db: Session) -> list[dict] | None:
    query_response = db.query(ScoreSheet).all()
    return [qr.to_dict() for qr in query_response]


def select_scoresheet_by_name(scoresheets: list[dict], name: str) -> str | None:
    for scoresheet in scoresheets:
        if scoresheet["name"].lower() == name.lower():
            return scoresheet["id"]
    return None


def post_event(event_data: list[dict], db: Session) -> None:
    db.bulk_save_objects([Event(**c) for c in event_data])


def post_phase(phase_data: list[dict], db: Session) -> None:
    db.bulk_save_objects([Phase(**p) for p in phase_data])


def post_heat(heat_data: list[dict], db: Session) -> dict | None:
    db.bulk_save_objects([Heat(**h) for h in heat_data])


def post_athlete(athlete_data: list[dict], db: Session) -> dict | None:
    db.bulk_save_objects([Athlete(**a) for a in athlete_data])


def post_athlete_heat(athlete_heat_data: list[dict], db: Session) -> dict | None:
    db.bulk_save_objects([AthleteHeat(**ah) for ah in athlete_heat_data])


def check_scoresheet_exists(scoresheet_name: str, db: Session) -> str:
    scoresheets = get_scoresheets(db=db)
    if scoresheets:
        scoresheet_id = select_scoresheet_by_name(scoresheets, scoresheet_name)

        if scoresheet_id:
            print(f"Selected scoresheet '{scoresheet_name}' with ID {scoresheet_id}")
            return scoresheet_id
        else:
            msg = f"Could not find scoresheet with name: {scoresheet_name}"
            raise (ScoresheetWithSpecifiedNameDoesNotExistError(msg))
    else:
        print("Failed to retrieve scoresheets")
        msg = "Could not read scoresheets from server"
        raise ConnectionError(msg)


def create_heats(heat_list: ndarray, competition_id: str, db: Session) -> dict:
    heat_map = {}

    for heat_number in heat_list:
        heat_id = generate_uuid()
        heat_data = [
            {
                "name": f"Heat {heat_number}",
                "id": heat_id,
                "competition_id": competition_id,
            }
        ]

        post_heat(heat_data, db=db)

        heat_map[heat_number] = heat_id

    return heat_map


def make_random_heats(number_of_heats: int) -> list[str]:
    heat_list: list[str] = []
    for i in range(1, number_of_heats + 1):
        heat_list.append(f"{i}")
    return heat_list


def process_competitors_df(
    competitors_df: pd.DataFrame,
    competition_name: str,
    scoresheet_name: str = "icf",
    number_of_runs: int = 1,
    number_of_runs_for_score: int = 1,
    number_of_judges: int = 2,
    number_of_random_heats: int = 5,
    *,
    random_heats: bool = False,
) -> tuple[int, list[dict[str, str]]]:
    paddler_count = 0
    skipped_rows: list[dict[str, str]] = []
    competition_id = generate_uuid()

    with transaction_session_context_manager() as db:
        competition_data = [{"name": competition_name, "id": competition_id}]

        post_competition(competition_data, db=db)

        scoresheet_id = check_scoresheet_exists(scoresheet_name=scoresheet_name, db=db)

        unique_events = competitors_df["Event"].unique()
        if random_heats:
            unique_heats = np.array(
                make_random_heats(number_of_heats=number_of_random_heats)
            )
        else:
            unique_heats = competitors_df["Heat"].unique()

        event_phase_map = {}

        for event_name in unique_events:
            event_id = generate_uuid()
            event_data = [
                {
                    "name": event_name,
                    "id": str(event_id),
                    "competition_id": competition_id,
                }
            ]

            post_event(event_data, db=db)

            phase_id = generate_uuid()
            phase_data = [
                {
                    "name": "Prelim",
                    "id": phase_id,
                    "event_id": event_id,
                    "number_of_runs": number_of_runs,
                    "number_of_runs_for_score": number_of_runs_for_score,
                    "scoresheet": scoresheet_id,
                    "number_of_judges": number_of_judges,
                }
            ]

            post_phase(phase_data, db=db)

            event_phase_map[event_name] = phase_id

        heat_map = create_heats(
            heat_list=unique_heats, competition_id=competition_id, db=db
        )
        heat_list = list(heat_map.values())

        if random_heats:
            competitors_df = competitors_df.sample(frac=1)
        athlete_ids: dict[object, str] = {}
        for i, (index, row) in enumerate(competitors_df.iterrows()):
            phase_id = event_phase_map.get(row["Event"].strip(), None)

            if phase_id is None:
                skipped_rows.append(
                    {
                        "first_name": row["first_name"],
                        "last_name": row["last_name"],
                        "bib": str(row["bib"]),
                        "reason": f"Event '{row['Event']}' not found",
                    }
                )
                continue

            if random_heats:
                heat_id = heat_list[int(i) % number_of_random_heats]
            else:
                heat_id = heat_map.get(row["Heat"], None)

            if heat_id is None:
                skipped_rows.append(
                    {
                        "first_name": row["first_name"],
                        "last_name": row["last_name"],
                        "bib": str(row["bib"]),
                        "reason": f"Heat '{row['Heat']}' not found",
                    }
                )
                continue

            athlete_key = row.get("athlete_key", default=index)
            athlete_id = athlete_ids.get(athlete_key)
            if athlete_id is None:
                athlete_id = generate_uuid()
                athlete_data = [
                    {
                        "id": athlete_id,
                        "first_name": row["first_name"],
                        "last_name": row["last_name"],
                        "affiliation": row.get("affiliation", default=None),
                        "bib": str(row["bib"]),
                    }
                ]

                post_athlete(athlete_data, db=db)
                paddler_count += 1
                athlete_ids[athlete_key] = athlete_id

            athlete_heat_id = generate_uuid()
            athlete_heat_data = [
                {
                    "id": athlete_heat_id,
                    "heat_id": heat_id,
                    "athlete_id": athlete_id,
                    "phase_id": phase_id,
                    "last_phase_rank": row.get("last_phase_rank", default=None),
                }
            ]

            post_athlete_heat(athlete_heat_data, db=db)

        db.commit()
        return paddler_count, skipped_rows


class NoHeatInfoForNonRandomHeatError(Exception):
    pass


def validate_columns_and_data_types(
    competition_df: pd.DataFrame, *, random_heats: bool
) -> None:
    mandatory_columns = ["first_name", "last_name", "bib", "Event"]

    got_columns = competition_df.columns
    for e in mandatory_columns:
        if e not in got_columns:
            msg = f"Column '{e}' is missing from the file"
            raise MissingColumnError(msg)

    if not random_heats and "Heat" not in got_columns:
        msg = "No heat information provided, and random heat allocation is disabled"
        raise (NoHeatInfoForNonRandomHeatError(msg))

    expected_contents = {
        "first_name": (ptypes.is_string_dtype, "text"),
        "last_name": (ptypes.is_string_dtype, "text"),
        "Event": (ptypes.is_string_dtype, "text"),
        "bib": (ptypes.is_integer_dtype, "whole numbers"),
    }
    if not random_heats:
        expected_contents["Heat"] = (ptypes.is_integer_dtype, "whole numbers")

    for column, (holds_expected_type, contents) in expected_contents.items():
        if competition_df[column].isna().any():
            msg = f"Column '{column}' has a blank value"
            raise ColumnTypeError(msg)
        if not holds_expected_type(competition_df[column]):
            msg = f"Column '{column}' must contain only {contents}"
            raise ColumnTypeError(msg)
