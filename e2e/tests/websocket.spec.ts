import {
	test,
	expect,
	type Page,
	type APIRequestContext,
	type BrowserContext
} from "@playwright/test"
import { randomUUID } from "crypto"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const BACKEND_WS_URL = BACKEND_URL.replace(/^http/, "ws")
const MISCONFIGURED_DEV_API_PORT = "8001"

interface TestData {
	competitionId: string
	competitionName: string
	heatId: string
	heatName: string
	athleteId: string
	phaseId: string
}

/**
 * Creates the minimal set of entities needed for websocket E2E tests:
 * competition → event → phase (with seeded scoresheet) → athlete → heat → athlete-heat
 */
async function setupTestData(
	request: APIRequestContext
): Promise<TestData> {
	const competitionId = randomUUID()
	const competitionName = `E2E WS Competition ${Date.now()}`

	// Create competition
	const compResponse = await request.post(`${BACKEND_URL}/competition/`, {
		data: [{ id: competitionId, name: competitionName }]
	})
	expect(compResponse.status()).toBe(201)

	// Use a seeded scoresheet so available moves exist
	const scoresheetResponse = await request.get(
		`${BACKEND_URL}/scoresheet/?name____list=icf_2025`
	)
	expect(scoresheetResponse.status()).toBe(200)
	const scoresheets = (await scoresheetResponse.json()) as Array<{
		id: string
	}>
	expect(scoresheets.length).toBeGreaterThan(0)
	const scoresheetId = scoresheets[0].id

	// Create event (required by Phase)
	const eventId = randomUUID()
	const eventResponse = await request.post(`${BACKEND_URL}/event/`, {
		data: [
			{ id: eventId, competition_id: competitionId, name: "E2E Event" }
		]
	})
	expect(eventResponse.status()).toBe(201)

	// Create phase (links event to scoresheet)
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

	// Create athlete
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

	// Create heat (directly under competition, as the selector queries by competition_id)
	const heatId = randomUUID()
	const heatName = `E2E Heat ${Date.now()}`
	const heatResponse = await request.post(`${BACKEND_URL}/heat/`, {
		data: [{ id: heatId, competition_id: competitionId, name: heatName }]
	})
	expect(heatResponse.status()).toBe(201)

	// Create athlete-heat (links athlete to heat via phase)
	const athleteHeatResponse = await request.post(
		`${BACKEND_URL}/athleteheat/`,
		{
			data: [
				{ athlete_id: athleteId, heat_id: heatId, phase_id: phaseId }
			]
		}
	)
	expect(athleteHeatResponse.status()).toBe(201)

	return { competitionId, competitionName, heatId, heatName, athleteId, phaseId }
}

/**
 * Intercepts frontend /api/ calls (when not using NEXT_PUBLIC_API_URL_DEV)
 * and forwards them to the real backend. Mirrors the helper in crud.spec.ts.
 */
const proxyFrontendAPIToBackend = async (page: Page) => {
	await page.route("**/*", async (route) => {
		const request = route.request()
		const requestUrl = new URL(request.url())
		const isFrontendApiPath = requestUrl.pathname.startsWith("/api/")
		const isMisconfiguredDevApiPort =
			requestUrl.hostname === "localhost" &&
			requestUrl.port === MISCONFIGURED_DEV_API_PORT
		if (!isFrontendApiPath && !isMisconfiguredDevApiPort) {
			await route.continue()
			return
		}
		const backendPath = isFrontendApiPath
			? requestUrl.pathname.replace(/^\/api/, "")
			: requestUrl.pathname
		const backendUrl = `${BACKEND_URL}${backendPath}${requestUrl.search}`
		try {
			const response = await route.fetch({ url: backendUrl })
			await route.fulfill({ response })
		} catch (error) {
			if (
				String(error).includes(
					"Target page, context or browser has been closed"
				)
			) {
				return
			}
			throw error
		}
	})
}

/**
 * Selects a competition and then a heat using the MUI Select dropdowns.
 * Both the head-judge page and the scribe page show only these two selectors.
 */
async function selectCompetitionAndHeat(
	page: Page,
	competitionName: string,
	heatName: string
) {
	// Open the competition dropdown (MUI Select with label "Select Competition")
	await page.getByLabel("Select Competition").click()
	await page.getByRole("option", { name: competitionName }).click()

	// Wait for the heat dropdown to populate, then select
	await page
		.getByLabel("Select Heat")
		.click({ timeout: 10000 })
	await page.getByRole("option", { name: heatName }).click()
}

test.describe("WebSocket Streaming Updates", () => {
	test("locking a run on the head judge page updates the judge page via websocket", async ({
		browser
	}) => {
		// Use a dedicated browser context so both pages share the same origin
		const context: BrowserContext = await browser.newContext()
		const headJudgePage = await context.newPage()
		const scribePage = await context.newPage()

		try {
			const { competitionName, heatId, heatName, athleteId, phaseId } =
				await setupTestData(context.request)

			// Set up API proxy for both pages
			await proxyFrontendAPIToBackend(headJudgePage)
			await proxyFrontendAPIToBackend(scribePage)

			// Navigate both pages to the same heat so both subscribe to the
			// run_status websocket channel with matching heat/athlete context.

			// Open the judge (scribe) page first so it is already subscribed
			// when the head judge sends the lock message.
			await scribePage.goto("/scribe/1")
			await selectCompetitionAndHeat(
				scribePage,
				competitionName,
				heatName
			)
			// Wait for the scribe page to finish loading athlete data
			await expect(
				scribePage.getByTestId("scribe-grid")
			).toBeVisible({ timeout: 15000 })

			// Open the head judge page and navigate to the same heat
			await headJudgePage.goto("/HeadJudge")
			await selectCompetitionAndHeat(
				headJudgePage,
				competitionName,
				heatName
			)
			await expect(
				headJudgePage.getByTestId("head-judge-page")
			).toBeVisible({ timeout: 15000 })

			// Simulate the head judge locking the run by sending a run_status
			// WebSocket message from the head judge page's browser context.
			// This exercises the same code path as clicking the "Lock Run" button.
			await headJudgePage.evaluate(
				({ wsUrl, heatId, athleteId, phaseId }) => {
					return new Promise<void>((resolve, reject) => {
						const ws = new WebSocket(`${wsUrl}/run_status`)
						ws.onopen = () => {
							ws.send(
								JSON.stringify({
									id: crypto.randomUUID(),
									heat_id: heatId,
									athlete_id: athleteId,
									phase_id: phaseId,
									run_number: 0,
									locked: true,
									did_not_start: false
								})
							)
							// Give the server a moment to process before closing
							setTimeout(() => {
								ws.close()
								resolve()
							}, 200)
						}
						ws.onerror = () =>
							reject(new Error("WebSocket error on lock send"))
					})
				},
				{ wsUrl: BACKEND_WS_URL, heatId, athleteId, phaseId }
			)

			// The run_status channel broadcasts the message to all subscribers,
			// including the scribe page. Verify the locked alert appears.
			await expect(
				scribePage.getByText("Run has been locked by head judge")
			).toBeVisible({ timeout: 10000 })
		} finally {
			await context.close()
		}
	})

	test("a judge submitting a move updates the head judge page via websocket", async ({
		browser
	}) => {
		const context: BrowserContext = await browser.newContext()
		const headJudgePage = await context.newPage()

		try {
			const {
				competitionName,
				heatId,
				heatName,
				athleteId,
				phaseId
			} = await setupTestData(context.request)

			// Fetch a move from the seeded scoresheet for this phase so we can
			// submit a real score via the REST API
			const phasesResponse = await context.request.get(
				`${BACKEND_URL}/getHeatInfo/${heatId}/phase`
			)
			expect(phasesResponse.status()).toBe(200)
			const phases = (await phasesResponse.json()) as Array<{
				scoresheet: string
			}>
			const scoresheetId = phases[0].scoresheet

			const movesResponse = await context.request.get(
				`${BACKEND_URL}/availablemoves/?sheet_id____list=${scoresheetId}&limit=1`
			)
			expect(movesResponse.status()).toBe(200)
			const moves = (await movesResponse.json()) as Array<{
				id: string
				direction: string
			}>
			expect(moves.length).toBeGreaterThan(0)
			const move = moves[0]
			// Map the available-move direction ("LR" | "FB" | "S") to a valid
			// scored direction ("L" | "R" | "F" | "B" | "S")
			const directionMap: Record<string, string> = {
				LR: "L",
				FB: "F",
				S: "S"
			}
			const scoredDirection = directionMap[move.direction] ?? "S"

			// Set up API proxy and navigate the head judge page to the heat
			await proxyFrontendAPIToBackend(headJudgePage)
			await headJudgePage.goto("/HeadJudge")
			await selectCompetitionAndHeat(
				headJudgePage,
				competitionName,
				heatName
			)

			// Wait for the head judge page to fully load the athlete and judge cards
			await expect(
				headJudgePage.getByTestId("head-judge-page")
			).toBeVisible({ timeout: 15000 })
			await expect(
				headJudgePage.getByText("Judge: 1")
			).toBeVisible({ timeout: 10000 })

			// At this point the head judge page has subscribed to the
			// current_scores websocket channel for this athlete/heat/run.

			// Submit a scored move via the REST API (this is what the scribe
			// page does when a judge records a move).
			const scoreResponse = await context.request.post(
				`${BACKEND_URL}/addUpdateAthleteScore/${heatId}/${athleteId}/0/1?phase_id=${phaseId}`,
				{
					data: {
						moves: [
							{
								id: randomUUID(),
								move_id: move.id,
								direction: scoredDirection
							}
						],
						bonuses: []
					}
				}
			)
			expect(scoreResponse.status()).toBe(200)

			// The backend publishes an update on the current_scores channel.
			// The head judge page receives it via websocket and re-renders the
			// judge card with the new score (non-zero for any ICF 2025 move).
			await expect(
				headJudgePage.getByTestId("final-score-value")
			).not.toHaveText("0.00", { timeout: 10000 })
		} finally {
			await context.close()
		}
	})
})
