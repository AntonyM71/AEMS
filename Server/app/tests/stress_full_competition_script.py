"""
Stress test script for AEMS backend (preproduction server):
- Creates a competition, event, phase, heat, athletes
- Links athletes to heats and phases
- Adds/removes moves
- Subscribes to move updates via WebSocket

Configure SERVER_URL below.
"""
import asyncio
import uuid

import requests
import websockets

SERVER_BASE = "192.168.0.28"

# Change to your preproduction server URL
SERVER_URL = f"http://{SERVER_BASE}:81/api"
WS_URL = f"ws://{SERVER_BASE}:81/api"        # Change to ws:// for your server

ICF2025_MOVES = [
    "Loop", "Space Godzilla", "McNasty", "Lunar Orbit", "Phonics Monkey",
    "Tricky Woo", "Back Loop", "Split Wheel", "Cartwheel", "Air Screw"
]

SCORESHEET_ID = None  # Set to a valid scoresheet ID or fetch from API if available


async def stress_test() -> None:
    # 1. Create competition
    comp_id = str(uuid.uuid4())
    comp_data = {
        "id": comp_id,
        "name": "StressTestComp2"
    }
    resp = requests.post(f"{SERVER_URL}/competition", json=[comp_data])
    if resp.status_code not in [200, 201]:
        print("\n--- ERROR creating competition ---")
        print(f"URL: {SERVER_URL}/competition")
        print(f"Payload: {[comp_data]}")
        print(f"Status Code: {resp.status_code}")
        try:
            print("Response JSON:", resp.json())
        except Exception:
            print("Response Text:", resp.text)
        print("--- END ERROR ---\n")
        raise Exception("Failed to create competition")
    comp_id = resp.json()[0]["id"]
    print(f"Created competition {comp_id}")

    # 2. Create event
    event_id = str(uuid.uuid4())
    event_data = {
        "id": event_id,
        "competition_id": comp_id,
        "name": "Main Event"
    }
    resp = requests.post(f"{SERVER_URL}/event", json=[event_data])
    if resp.status_code not in [200, 201]:
        print("\n--- ERROR creating event ---")
        print(f"URL: {SERVER_URL}/event")
        print(f"Payload: {[event_data]}")
        print(f"Status Code: {resp.status_code}")
        try:
            print("Response JSON:", resp.json())
        except Exception:
            print("Response Text:", resp.text)
        print("--- END ERROR ---\n")
        raise Exception("Failed to create event")
    event_id = resp.json()[0]["id"]
    print(f"Created event {event_id}")

    # 3. Fetch scoresheets and select the one closest to 'icf2025'
    scoresheets_resp = requests.get(f"{SERVER_URL}/scoresheet")
    scoresheets_resp.raise_for_status()
    scoresheets = scoresheets_resp.json()
    # Find scoresheet with name closest to 'icf2025' (case-insensitive substring match)
    scoresheet_id = None
    for sheet in scoresheets:
        if "icf2025" in sheet.get("name", "").lower():
            scoresheet_id = sheet["id"]
            break
    if not scoresheet_id:
        # fallback: use first scoresheet if available
        if scoresheets:
            scoresheet_id = scoresheets[0]["id"]
            print(
                f"Warning: No scoresheet matching 'icf2025', using first: {scoresheets[0]['name']}")
        else:
            raise Exception("No scoresheets available in the system!")
    phase_id = str(uuid.uuid4())
    phase_data = {
        "id": phase_id,
        "event_id": event_id,
        "name": "Qualification",
        "number_of_runs": 3,
        "number_of_runs_for_score": 2,
        "number_of_judges": 3,
        "scoresheet": scoresheet_id
    }
    resp = requests.post(f"{SERVER_URL}/phase", json=[phase_data])
    if resp.status_code not in [200, 201]:
        print("\n--- ERROR creating phase ---")
        print(f"URL: {SERVER_URL}/phase")
        print(f"Payload: {[phase_data]}")
        print(f"Status Code: {resp.status_code}")
        try:
            print("Response JSON:", resp.json())
        except Exception:
            print("Response Text:", resp.text)
        print("--- END ERROR ---\n")
        raise Exception("Failed to create phase")
    phase_id = resp.json()[0]["id"]
    print(f"Created phase {phase_id}")

    # 4. Create heat
    heat_id = str(uuid.uuid4())
    heat_data = {
        "id": heat_id,
        "competition_id": comp_id,
        "name": "Heat 1"
    }
    resp = requests.post(f"{SERVER_URL}/heat", json=[heat_data])
    if resp.status_code not in [200, 201]:
        print("\n--- ERROR creating heat ---")
        print(f"URL: {SERVER_URL}/heat")
        print(f"Payload: {[heat_data]}")
        print(f"Status Code: {resp.status_code}")
        try:
            print("Response JSON:", resp.json())
        except Exception:
            print("Response Text:", resp.text)
        print("--- END ERROR ---\n")
        raise Exception("Failed to create heat")
    heat_id = resp.json()[0]["id"]
    print(f"Created heat {heat_id}")

    # 5. Create athletes
    athletes = [
        {
            "id": str(uuid.uuid4()),
            "first_name": f"Competitor{i}",
            "last_name": "Test",
            "affiliation": "Testland",
            "bib": str(100+i)
        }
        for i in range(3)
    ]
    resp = requests.post(f"{SERVER_URL}/athlete", json=athletes)
    if resp.status_code not in [200, 201]:
        print("\n--- ERROR creating athletes ---")
        print(f"URL: {SERVER_URL}/athlete")
        print(f"Payload: {athletes}")
        print(f"Status Code: {resp.status_code}")
        try:
            print("Response JSON:", resp.json())
        except Exception:
            print("Response Text:", resp.text)
        print("--- END ERROR ---\n")
        raise Exception("Failed to create athletes")
    athlete_ids = [a["id"] for a in resp.json()]
    print(f"Added athletes: {athlete_ids}")

    # 6. Link athletes to heat and phase via AthleteHeat
    athleteheat_data = [
        {
            "id": str(uuid.uuid4()),
            "heat_id": heat_id,
            "athlete_id": athlete_id,
            "phase_id": phase_id
        }
        for athlete_id in athlete_ids
    ]
    resp = requests.post(f"{SERVER_URL}/athleteheat", json=athleteheat_data)
    if resp.status_code not in [200, 201]:
        print("\n--- ERROR linking athletes to heat/phase ---")
        print(f"URL: {SERVER_URL}/athleteheat")
        print(f"Payload: {athleteheat_data}")
        print(f"Status Code: {resp.status_code}")
        try:
            print("Response JSON:", resp.json())
        except Exception:
            print("Response Text:", resp.text)
        print("--- END ERROR ---\n")
        raise Exception("Failed to link athletes to heat/phase")
    print("Linked athletes to heat and phase.")

    # 7. Fetch available moves for scoresheet
    moves_resp = requests.get(
        f"{SERVER_URL}/availablemoves?sheet_id={scoresheet_id}")
    moves_resp.raise_for_status()
    available_moves = moves_resp.json()
    if not available_moves:
        raise Exception("No available moves found for scoresheet.")

    # 8. WebSocket subscribe to moves (endpoint may need update)
    ws_url = f"{WS_URL}/scoredmoves/ws?competition_id={comp_id}"
    async with websockets.connect(ws_url) as ws:
        print("WebSocket connected.")
        # 9. Add moves using correct endpoint and payload
        for i in range(100):
            move_obj = available_moves[i % len(available_moves)]
            athlete_id = athlete_ids[i % 3]
            run_number = (i % 3) + 1
            judge_id = "stress-test-judge"
            # Directions must be one of "L", "R", "F", "B", "S"
            direction = "L" if i % 2 == 0 else "R"
            move_payload = {
                "moves": [
                    {
                        "id": str(uuid.uuid4()),
                        "move_id": move_obj["id"],
                        "direction": direction
                    }
                ],
                "bonuses": []
            }
            resp = requests.post(
                f"{SERVER_URL}/addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}?phase_id={phase_id}",
                json=move_payload
            )
            if resp.status_code not in [200, 201]:
                print("\n--- ERROR adding move ---")
                print(
                    f"URL: {SERVER_URL}/addUpdateAthleteScore/{heat_id}/{athlete_id}/{run_number}/{judge_id}?phase_id={phase_id}")
                print(f"Payload: {move_payload}")
                print(f"Status Code: {resp.status_code}")
                try:
                    print("Response JSON:", resp.json())
                except Exception:
                    print("Response Text:", resp.text)
                print("--- END ERROR ---\n")
                raise Exception("Failed to add move")
            data = await ws.recv()
            print(f"Move added: {data}")

        # Remove moves: not supported via bulk delete, so just demonstrate cleanup by deleting competition
    r = requests.delete(f"{SERVER_URL}/competition/{comp_id}")
    if r.status_code not in [200, 201, 204]:
        print("\n--- ERROR deleting competition ---")
        print(f"URL: {SERVER_URL}/competition/{comp_id}")
        print(f"Status Code: {r.status_code}")
        try:
            print("Response JSON:", r.json())
        except Exception:
            print("Response Text:", r.text)
        print("--- END ERROR ---\n")
        raise Exception("Failed to delete competition")
    print(f"Deleted competition {comp_id}")

if __name__ == "__main__":
    asyncio.run(stress_test())
