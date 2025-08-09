import uuid

import numpy as np
import pandas as pd
import pandas.api.types as ptypes
from numpy import ndarray
from sqlalchemy.orm import Session

from db.client import transaction_session_context_manager
from db.models import Athlete, AthleteHeat, Competition, Event, Heat, Phase, ScoreSheet

# Set API endpoint URLs
base_url = "http://localhost:8000/"
competition_url = base_url + "competition"
scoresheet_url = base_url + "scoresheet"
athlete_url = base_url + "athlete"
athlete_heat_url = base_url + "athleteheat"
event_url = base_url + "event"
phase_url = base_url + "phase"
heat_url = base_url + "heat"

# Constants for the competition
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


def generate_uuid() -> str:
    return str(uuid.uuid4())


def post_competition(competition_data: list[dict], db: Session) -> None:
    db.bulk_save_objects([Competition(**c) for c in competition_data])


def get_scoresheets(db: Session) -> list[dict] | None:
    query_response = db.query(ScoreSheet).all()
    return [qr.to_dict() for qr in query_response]


# Function to select the scoresheet by name


def select_scoresheet_by_name(scoresheets: list[dict], name: str) -> str | None:
    for scoresheet in scoresheets:
        if scoresheet["name"].lower() == name.lower():
            return scoresheet["id"]
    return None


# Function to post event data


def post_event(event_data: list[dict], db: Session) -> None:
    db.bulk_save_objects([Event(**c) for c in event_data])


# Function to post phase data


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
            print(
                f"Selected scoresheet '{scoresheet_name}' with ID {scoresheet_id}")
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
) -> int:
    event_count = 0
    phase_count = 0

    paddler_count = 0
    competition_id = generate_uuid()

    with transaction_session_context_manager() as db:
        competition_data = [{"name": competition_name, "id": competition_id}]

        post_competition(competition_data, db=db)

        scoresheet_id = check_scoresheet_exists(
            scoresheet_name=scoresheet_name, db=db)

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

            event_count += 1
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

            phase_count += 1
            event_phase_map[event_name] = phase_id

        heat_map = create_heats(
            heat_list=unique_heats, competition_id=competition_id, db=db
        )
        heat_list = list(heat_map.values())

        if random_heats:
            competitors_df = competitors_df.sample(frac=1)
        for i, (_index, row) in enumerate(competitors_df.iterrows()):
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
            athlete_heat_id = generate_uuid()

            phase_id = event_phase_map.get(row["Event"].strip(), None)

            if phase_id is None:
                print(f"Event '{row['Event']}' not found in event_phase_map.")
                continue
            if random_heats:
                heat_id = heat_list[int(i) % number_of_random_heats]
            else:
                heat_id = heat_map.get(row["Heat"], None)

            if heat_id is None:
                print(f"Heat '{row['Heat']}' not found in heat_map.")
                continue

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
        return paddler_count


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

    if not random_heats and not ptypes.is_integer_dtype(competition_df["Heat"]):
        msg = f"Column 'Heat' is not of type '{ptypes.is_integer_dtype}', instead it is of type '{competition_df['Heat'].dtype}'"
        raise ColumnTypeError(msg)

    expected_dtypes = {
        "first_name": ptypes.is_string_dtype,
        "last_name": ptypes.is_string_dtype,
        "Event": ptypes.is_string_dtype,
        "bib": ptypes.is_integer_dtype,
    }

    for column, check_dtype in expected_dtypes.items():
        actual_dtype = competition_df[column].dtype
        if not check_dtype(competition_df[column]):
            msg = f"Column '{column}' is not of type '{check_dtype}', instead it is of type '{actual_dtype}'"
            raise ColumnTypeError(msg)
