import uuid

import pandas as pd
import requests

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


def post_competition(competition_data: list[dict]) -> dict | None:
    response = requests.post(competition_url, json=competition_data)
    if response.status_code == 201:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            print("Failed to decode competition response as JSON")
            print(response.text)
            return None
    else:
        print(f"Failed to add competition: {competition_data}")
        print(f"Response status code: {response.status_code}")
        print(response.text)
        return None


def get_scoresheets() -> dict | None:
    response = requests.get(scoresheet_url)
    if response.status_code == 200:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            print("Failed to decode scoresheets response as JSON")
            print(response.text)
            return None
    else:
        print("Failed to retrieve scoresheets")
        print(f"Response status code: {response.status_code}")
        print(response.text)
        return None


# Function to select the scoresheet by name


def select_scoresheet_by_name(scoresheets: dict, name: str) -> dict | None:
    for scoresheet in scoresheets:
        if scoresheet["name"].lower() == name.lower():
            return scoresheet["id"]
    return None


# Function to post event data


def post_event(event_data: list[dict]) -> dict | None:
    response = requests.post(event_url, json=event_data)
    if response.status_code == 201:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            print("Failed to decode event response as JSON")
            print(response.text)
            return None
    else:
        print(f"Failed to add event: {event_data}")
        print(f"Response status code: {response.status_code}")
        print(response.text)
        return None


# Function to post phase data


def post_phase(phase_data: list[dict]) -> dict | None:
    response = requests.post(phase_url, json=phase_data)
    if response.status_code == 201:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            print("Failed to decode phase response as JSON")
            print(response.text)
            return None
    else:
        print(f"Failed to add phase: {phase_data}")
        print(f"Response status code: {response.status_code}")
        print(response.text)
        return None


def post_heat(heat_data: list[dict]) -> dict | None:
    response = requests.post(heat_url, json=heat_data)
    if response.status_code == 201:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            print("Failed to decode heat response as JSON")
            print(response.text)
            return None
    else:
        print(f"Failed to add heat: {heat_data}")
        print(f"Response status code: {response.status_code}")
        print(response.text)
        return None


def post_athlete(athlete_data: list[dict]) -> dict | None:
    response = requests.post(athlete_url, json=athlete_data)
    if response.status_code == 201:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            print("Failed to decode athlete response as JSON")
            print(response.text)
            return None
    else:
        print(f"Failed to add athlete: {athlete_data}")
        print(f"Response status code: {response.status_code}")
        print(response.text)
        return None


def post_athlete_heat(athlete_heat_data: list[dict]) -> dict | None:
    response = requests.post(athlete_heat_url, json=athlete_heat_data)
    if response.status_code == 201:
        try:
            return response.json()
        except requests.exceptions.JSONDecodeError:
            print("Failed to decode athlete heat response as JSON")
            print(response.text)
            return None
    else:
        print(f"Failed to add athlete heat: {athlete_heat_data}")
        print(f"Response status code: {response.status_code}")
        print(response.text)
        return None


def process_competitors_df(competitors_df: pd.DataFrame, competition_name: str) -> None:
    event_count = 0
    phase_count = 0
    heat_count = 0
    paddler_count = 0
    competition_id = generate_uuid()

    competition_data = [{"name": competition_name, "id": competition_id}]

    competition_response = post_competition(competition_data)

    if competition_response:
        print(f"Competition '{competition_name}' created with ID {competition_id}")
    else:
        print("Failed to create competition")
        msg = "Could not create competition"
        raise ConnectionError(msg)

    scoresheets = get_scoresheets()

    if scoresheets:
        scoresheet_id = select_scoresheet_by_name(scoresheets, scoresheet_name)

        if scoresheet_id:
            print(f"Selected scoresheet '{scoresheet_name}' with ID {scoresheet_id}")
        else:
            msg = f"Could not find scoresheet with name: {scoresheet_name}"
            raise (ScoresheetWithSpecifiedNameDoesNotExistError(msg))
    else:
        print("Failed to retrieve scoresheets")
        msg = "Could not read scoresheets from server"
        raise ConnectionError(msg)
    unique_events = competitors_df["Event"].unique()
    unique_heats = competitors_df["Heat"].unique()
    print("VVVVVVV")
    print(unique_events)
    event_phase_map = {}
    heat_map = {}

    for event_name in unique_events:
        event_id = generate_uuid()
        event_data = [
            {"name": event_name, "id": event_id, "competition_id": competition_id}
        ]

        event_response = post_event(event_data)

        if event_response:
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

            phase_response = post_phase(phase_data)

            if phase_response:
                phase_count += 1
                event_phase_map[event_name] = phase_id
            else:
                print(f"Failed to create phase for event {event_name}")
        else:
            print(f"Failed to create event {event_name}")

    for heat_number in unique_heats:
        heat_id = generate_uuid()
        heat_data = [
            {
                "name": f"Heat {heat_number}",
                "id": heat_id,
                "competition_id": competition_id,
            }
        ]

        heat_response = post_heat(heat_data)

        if heat_response:
            heat_count += 1
            heat_map[heat_number] = heat_id
        else:
            print(f"Failed to create heat {heat_number}")

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

        if post_athlete(athlete_data):
            paddler_count += 1
            athlete_heat_id = generate_uuid()

            phase_id = event_phase_map.get(row["Event"].strip(), None)

            if phase_id is None:
                print(f"Event '{row['Event']}' not found in event_phase_map.")
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

            post_athlete_heat(athlete_heat_data)

    print("\n--- Final Report ---")
    print(f"Total Events Added: {event_count}")
    print(f"Total Phases Added: {phase_count}")
    print(f"Total Heats Added: {heat_count}")
    print(f"Total Paddlers Added: {paddler_count}")


# competitors_df = pd.read_excel(spreadsheet_path, sheet_name=sheet_name)
