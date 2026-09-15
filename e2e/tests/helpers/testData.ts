import { expect, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "crypto"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export interface TestData {
	competitionName: string
	heatName: string
	heatId: string
	athleteId: string
	phaseId: string
	scoresheetId: string
}

/**
 * Creates the minimal set of entities needed for websocket E2E tests:
 * competition -> event -> phase (with seeded icf_2025 scoresheet) -> athlete -> heat -> athlete-heat
 *
 * Each test calls this independently so tests are fully isolated and a run
 * locked in one test cannot affect another.
 *
 * Returns names (for UI navigation) and IDs (for direct REST API calls).
 */
export async function setupTestData(
	request: APIRequestContext
): Promise<TestData> {
	const competitionId = randomUUID()
	const competitionName = `E2E WS Competition ${Date.now()}`

	const compResponse = await request.post(`${BACKEND_URL}/competition/`, {
		data: [{ id: competitionId, name: competitionName }]
	})
	expect(compResponse.status()).toBe(201)

	// Use the seeded icf_2025 scoresheet (pre-loaded by the CI seed step via
	// `python -m scripts.seed_scoresheets`) so available moves exist without
	// additional setup.
	const scoresheetResponse = await request.get(
		`${BACKEND_URL}/scoresheet/?name____list=icf_2025`
	)
	expect(scoresheetResponse.status()).toBe(200)
	const scoresheets = (await scoresheetResponse.json()) as Array<{ id: string }>
	expect(scoresheets.length).toBeGreaterThan(0)
	const scoresheetId = scoresheets[0].id

	const eventId = randomUUID()
	const eventResponse = await request.post(`${BACKEND_URL}/event/`, {
		data: [{ id: eventId, competition_id: competitionId, name: "E2E Event" }]
	})
	expect(eventResponse.status()).toBe(201)

	const phaseId = randomUUID()
	const phaseResponse = await request.post(`${BACKEND_URL}/phase/`, {
		data: [
			{
				id: phaseId,
				event_id: eventId,
				name: "E2E Phase",
				number_of_runs: 1,
				number_of_runs_for_score: 1,
				number_of_judges: 1,
				scoresheet: scoresheetId
			}
		]
	})
	expect(phaseResponse.status()).toBe(201)

	const athleteId = randomUUID()
	const athleteResponse = await request.post(`${BACKEND_URL}/athlete/`, {
		data: [
			{
				id: athleteId,
				first_name: "Test",
				last_name: "Athlete",
				bib: "1"
			}
		]
	})
	expect(athleteResponse.status()).toBe(201)

	const heatId = randomUUID()
	const heatName = `E2E Heat ${Date.now()}`
	const heatResponse = await request.post(`${BACKEND_URL}/heat/`, {
		data: [{ id: heatId, competition_id: competitionId, name: heatName }]
	})
	expect(heatResponse.status()).toBe(201)

	const athleteHeatId = randomUUID()
	const athleteHeatResponse = await request.post(
		`${BACKEND_URL}/athleteheat/`,
		{
			data: [{ id: athleteHeatId, athlete_id: athleteId, heat_id: heatId, phase_id: phaseId }]
		}
	)
	expect(athleteHeatResponse.status()).toBe(201)

	return { competitionName, heatName, heatId, athleteId, phaseId, scoresheetId }
}
