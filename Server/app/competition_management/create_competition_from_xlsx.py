import uuid

import pandas as pd
from numpy import ndarray
from sqlalchemy.orm import Session

from db.client import get_transaction_session
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


def generate_uuid() -> str:
    return str(uuid.uuid4())


def post_competition(competition_data: list[dict], db: Session) -> None:
    db.bulk_save_objects([Competition(**c) for c in competition_data])


def get_scoresheets(db: Session) -> list[dict] | None:

    query_response = db.query(ScoreSheet).all()
    return [qr.to_dict() for qr in query_response]


# Function to select the scoresheet by name


def select_scoresheet_by_name(scoresheets: dict, name: str) -> str | None:
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


def create_heats(heat_list: ndarray, competition_id: str, db: Session):
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


def process_competitors_df(competitors_df: pd.DataFrame, competition_name: str, scoresheet_name: str = "icf",
                           number_of_runs: int = 1,
                           number_of_runs_for_score: int = 1,
                           number_of_judges: int = 2,
                           ) -> None:
    event_count = 0
    phase_count = 0

    paddler_count = 0
    competition_id = generate_uuid()

    session_generator = get_transaction_session()
    db = next(session_generator)
    with db.begin():
        competition_data = [{"name": competition_name, "id": competition_id}]

        post_competition(competition_data, db=db)

        scoresheet_id = check_scoresheet_exists(
            scoresheet_name=scoresheet_name, db=db)

        unique_events = competitors_df["Event"].unique()
        unique_heats = competitors_df["Heat"].unique()

        event_phase_map = {}

        for event_name in unique_events:
            event_id = generate_uuid()
            event_data = [
                {"name": event_name, "id": str(event_id),
                    "competition_id": competition_id}
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

        heat_map = create_heats(heat_list=unique_heats,
                                competition_id=competition_id, db=db)

        for _index, row in competitors_df.iterrows():
            athlete_id = generate_uuid()

            athlete_data = [
                {
                    "id": athlete_id,
                    "first_name": row["first_name"],
                    "last_name": row["last_name"],
                    "bib": str(row["bib"]),
                }
            ]

            post_athlete(athlete_data, db=db)
            paddler_count += 1
            athlete_heat_id = generate_uuid()

            phase_id = event_phase_map.get(row["Event"].strip(), None)

            if phase_id is None:
                print(
                    f"Event '{row['Event']}' not found in event_phase_map.")
                continue

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
                    "last_phase_rank": None,
                }
            ]

            post_athlete_heat(athlete_heat_data, db=db)

        db.commit()
        print("\n--- Final Report ---")
        print(f"Total Events Added: {event_count}")
        print(f"Total Phases Added: {phase_count}")
        print(f"Total Heats Added: {len(heat_map)}")
        print(f"Total Paddlers Added: {paddler_count}")


# competitors_df = pd.read_excel(spreadsheet_path, sheet_name=sheet_name)
