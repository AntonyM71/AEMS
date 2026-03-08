import { test, expect, type Page, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "crypto"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const MISCONFIGURED_DEV_API_PORT = "8001"

interface TestData {
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
async function setupTestData(request: APIRequestContext): Promise<TestData> {
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

/**
 * Intercepts frontend /api/ calls and forwards them to the real backend.
 * Mirrors the helper in crud.spec.ts.
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
 * Selects a competition then a heat via the MUI Select dropdowns present on
 * both the head-judge and scribe pages before a heat is chosen.
 *
 * Uses `getByRole("combobox", { name: "..." })` rather than `getByLabel`
 * because MUI Select renders its clickable target as a div with role="combobox"
 * and aria-labelledby pointing to the InputLabel, which is what Playwright
 * matches against the accessible name. `getByLabel` can resolve to the
 * hidden inner input instead of the visible combobox.
 */
async function selectCompetitionAndHeat(
	page: Page,
	competitionName: string,
	heatName: string
) {
	await page.getByRole("combobox", { name: "Select Competition" }).click()
	await page.getByRole("option", { name: competitionName }).click()

	// The heat dropdown is replaced by a Skeleton while heats are loading after
	// competition selection; wait for the combobox to appear before clicking.
	await page
		.getByRole("combobox", { name: "Select Heat" })
		.click({ timeout: 15000 })
	await page.getByRole("option", { name: heatName }).click()
}

test.describe("WebSocket Streaming Updates", () => {
	test("a judge submitting a move updates the head judge page via websocket", async ({
		browser,
		request
	}) => {
		const {
			competitionName,
			heatName,
			heatId,
			athleteId,
			phaseId,
			scoresheetId
		} = await setupTestData(request)

		// Fetch one available move from the scoresheet so we can submit a score
		// via the REST API -- the same endpoint the Scribe UI calls.
		const movesResponse = await request.get(
			`${BACKEND_URL}/availablemoves/?sheet_id____list=${scoresheetId}&limit=1`
		)
		expect(movesResponse.status()).toBe(200)
		const moves = (await movesResponse.json()) as Array<{
			id: string
			direction: string
		}>
		expect(moves.length).toBeGreaterThan(0)
		const move = moves[0]
		// Map the available-move direction ("LR" | "FB" | "S") to a scored direction.
		const validDirections = ["LR", "FB", "S"]
		expect(validDirections).toContain(move.direction)
		const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" }
		const scoredDirection = directionMap[move.direction]!

		const context = await browser.newContext()
		const headJudgePage = await context.newPage()
		const scribePage = await context.newPage()

		try {
			await proxyFrontendAPIToBackend(headJudgePage)
			await proxyFrontendAPIToBackend(scribePage)

			// Open the head judge page first so it subscribes to the
			// current_scores WebSocket before the score is submitted.
			await headJudgePage.goto("/HeadJudge")
			await selectCompetitionAndHeat(
				headJudgePage,
				competitionName,
				heatName
			)
			// head-judge-page renders once selectedAthlete and phase data are loaded.
			await expect(
				headJudgePage.getByTestId("head-judge-page")
			).toBeVisible({ timeout: 20000 })
			// "Judge: 1" appears once the JudgeCard has available moves and bonuses,
			// confirming the page is fully ready and the current_scores WebSocket is
			// connected.
			await expect(
				headJudgePage.getByText("Judge: 1")
			).toBeVisible({ timeout: 15000 })
			// Confirm the initial score is zero before any moves are submitted.
			await expect(
				headJudgePage.getByTestId("final-score-value")
			).toHaveText("0.00", { timeout: 10000 })

			// Open the scribe page and navigate to the same heat.
			await scribePage.goto("/scribe/1")
			await selectCompetitionAndHeat(
				scribePage,
				competitionName,
				heatName
			)
			await expect(
				scribePage.getByTestId("scribe-grid")
			).toBeVisible({ timeout: 15000 })

			// Submit a scored move via the REST API -- the same endpoint the Scribe
			// UI calls when a judge records a move. The backend then publishes an
			// event on the current_scores WebSocket channel.
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

			// The head judge page receives the current_scores WebSocket broadcast
			// and re-renders the judge card with the new non-zero score.
			await expect(
				headJudgePage.getByTestId("final-score-value")
			).not.toHaveText("0.00", { timeout: 15000 })
		} finally {
			await context.close()
		}
	})

	test("locking a run on the head judge page updates the judge page via websocket", async ({
		browser,
		request
	}) => {
		const { competitionName, heatName } = await setupTestData(request)

		const context = await browser.newContext()
		const headJudgePage = await context.newPage()
		const scribePage = await context.newPage()

		try {
			await proxyFrontendAPIToBackend(headJudgePage)
			await proxyFrontendAPIToBackend(scribePage)

			// Open the scribe page first so it is already subscribed to the
			// run_status WebSocket before the head judge triggers the lock.
			await scribePage.goto("/scribe/1")
			await selectCompetitionAndHeat(
				scribePage,
				competitionName,
				heatName
			)
			await expect(
				scribePage.getByTestId("scribe-grid")
			).toBeVisible({ timeout: 15000 })
			// Wait for move buttons to be visible -- this proves athleteData has loaded
			// inside the Scribe component. The run_status onmessage handler filters by
			// athlete_id, so the lock message would be silently discarded if
			// athleteData hasn't loaded yet.
			await expect(
				scribePage.locator('[data-testid^="button-"]:not([disabled])').first()
			).toBeVisible({ timeout: 20000 })

			// Open the head judge page and navigate to the same heat.
			// The lock button is rendered when NEXT_PUBLIC_SHOW_LOCK_RUN=true.
			await headJudgePage.goto("/HeadJudge")
			await selectCompetitionAndHeat(
				headJudgePage,
				competitionName,
				heatName
			)
			await expect(
				headJudgePage.getByTestId("lock-run-button")
			).toBeVisible({ timeout: 20000 })

			// Click the Lock Run button. The head judge page sends a run_status
			// WebSocket message to the backend which broadcasts it to all subscribers.
			await headJudgePage.getByTestId("lock-run-button").click()

			// Wait for the head judge page to confirm the round-trip: the button
			// switches to "Unlock Run" once the broadcast is received.
			await expect(
				headJudgePage.getByTestId("lock-run-button")
			).toHaveText("Unlock Run", { timeout: 15000 })

			// The same broadcast reaches the scribe page. Verify the locked
			// alert is shown there too.
			await expect(
				scribePage.getByText("Run has been locked by head judge")
			).toBeVisible({ timeout: 10000 })
		} finally {
			await context.close()
		}
	})
})
