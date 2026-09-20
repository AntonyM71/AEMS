import { test, expect, type Page } from "@playwright/test"
import { randomUUID } from "node:crypto"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const MISCONFIGURED_DEV_API_PORT = "8001"

/**
 * Intercepts frontend /api/ calls and forwards them to the real backend.
 * Mirrors the helper in crud.spec.ts / websocket.spec.ts.
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

interface AvailableMove {
	id: string
	direction: "LR" | "FB" | "S"
	fl_score: number
}

interface HeatInfoEntry {
	athlete_id: string
	last_phase_rank: number | null
	number_of_runs: number
	number_of_runs_for_score: number
	scoresheet: string
}

interface PhaseInfo {
	event_id: string
	name: string
	number_of_judges: number
	scoresheet: string
}

test.describe("Promote Phase", () => {
	test("promoting via the UI creates a new phase and heat with the top-ranked athletes carrying their prior rank", async ({
		page,
		request
	}) => {
		await proxyFrontendAPIToBackend(page)

		const competitionId = randomUUID()
		const competitionName = `E2E Promote Competition ${Date.now()}`
		const compResponse = await request.post(`${BACKEND_URL}/competition/`, {
			data: [{ id: competitionId, name: competitionName }]
		})
		expect(compResponse.status()).toBe(201)

		// Use the seeded icf_2025 scoresheet so available moves exist without
		// additional setup (mirrors helpers/testData.ts).
		const scoresheetResponse = await request.get(
			`${BACKEND_URL}/scoresheet/?name____list=icf_2025`
		)
		expect(scoresheetResponse.status()).toBe(200)
		const scoresheets = (await scoresheetResponse.json()) as Array<{
			id: string
		}>
		expect(scoresheets.length).toBeGreaterThan(0)
		const scoresheetId = scoresheets[0].id

		const eventId = randomUUID()
		const eventResponse = await request.post(`${BACKEND_URL}/event/`, {
			data: [
				{ id: eventId, competition_id: competitionId, name: "E2E Event" }
			]
		})
		expect(eventResponse.status()).toBe(201)

		const sourcePhaseId = randomUUID()
		const sourcePhaseName = `E2E Source Phase ${Date.now()}`
		const phaseResponse = await request.post(`${BACKEND_URL}/phase/`, {
			data: [
				{
					id: sourcePhaseId,
					event_id: eventId,
					name: sourcePhaseName,
					number_of_runs: 1,
					number_of_runs_for_score: 1,
					number_of_judges: 1,
					scoresheet: scoresheetId
				}
			]
		})
		expect(phaseResponse.status()).toBe(201)

		const sourceHeatId = randomUUID()
		const heatResponse = await request.post(`${BACKEND_URL}/heat/`, {
			data: [
				{
					id: sourceHeatId,
					competition_id: competitionId,
					name: "Source Heat"
				}
			]
		})
		expect(heatResponse.status()).toBe(201)

		const topAthleteId = randomUUID()
		const otherAthleteId = randomUUID()
		const athletesResponse = await request.post(`${BACKEND_URL}/athlete/`, {
			data: [
				{
					id: topAthleteId,
					first_name: "Top",
					last_name: "Scorer",
					bib: "1"
				},
				{
					id: otherAthleteId,
					first_name: "Lower",
					last_name: "Scorer",
					bib: "2"
				}
			]
		})
		expect(athletesResponse.status()).toBe(201)

		const athleteHeatResponse = await request.post(
			`${BACKEND_URL}/athleteheat/`,
			{
				data: [
					{
						id: randomUUID(),
						athlete_id: topAthleteId,
						heat_id: sourceHeatId,
						phase_id: sourcePhaseId
					},
					{
						id: randomUUID(),
						athlete_id: otherAthleteId,
						heat_id: sourceHeatId,
						phase_id: sourcePhaseId
					}
				]
			}
		)
		expect(athleteHeatResponse.status()).toBe(201)

		// Score the two athletes with two different-valued moves so they end up
		// with distinct, non-tied ranks. Scoring always uses the "forward"
		// direction (L/F/S), which scores on fl_score.
		const movesResponse = await request.get(
			`${BACKEND_URL}/availablemoves/?sheet_id____list=${scoresheetId}&limit=20`
		)
		expect(movesResponse.status()).toBe(200)
		const moves = (await movesResponse.json()) as AvailableMove[]
		const sortedByScore = [...moves].sort((a, b) => b.fl_score - a.fl_score)
		const highScoreMove = sortedByScore[0]
		const lowScoreMove = sortedByScore.find(
			(m) => m.fl_score < highScoreMove.fl_score
		)
		expect(lowScoreMove).toBeTruthy()
		const forwardDirection: Record<AvailableMove["direction"], string> = {
			LR: "L",
			FB: "F",
			S: "S"
		}

		for (const [athleteId, move] of [
			[topAthleteId, highScoreMove],
			[otherAthleteId, lowScoreMove!]
		] as const) {
			const scoreResponse = await request.post(
				`${BACKEND_URL}/addUpdateAthleteScore/${sourceHeatId}/${athleteId}/0/1?phase_id=${sourcePhaseId}`,
				{
					data: {
						moves: [
							{
								id: randomUUID(),
								move_id: move.id,
								direction: forwardDirection[move.direction]
							}
						],
						bonuses: []
					}
				}
			)
			expect(scoreResponse.status()).toBe(200)
		}

		// Drive the actual promote flow through the Admin UI.
		await page.goto("/Admin")
		const promoteAccordion = page
			.locator(".MuiAccordion-root")
			.filter({ hasText: "Promote top Athletes to next Phase" })
		await promoteAccordion
			.getByRole("button", { name: "Promote top Athletes to next Phase" })
			.click()

		// Competition and Event selectors have no aria-label and are the only
		// comboboxes rendered within this accordion at each stage (Phase's
		// selector only appears once an Event is chosen).
		await promoteAccordion.getByRole("combobox").first().click()
		await page.getByRole("option", { name: competitionName }).click()

		await promoteAccordion
			.getByRole("combobox")
			.nth(1)
			.click({ timeout: 15000 })
		await page.getByRole("option", { name: "E2E Event" }).click()

		await promoteAccordion
			.getByRole("combobox", { name: "Select Phase" })
			.click({ timeout: 15000 })
		await page.getByRole("option", { name: sourcePhaseName }).click()

		const newPhaseName = `E2E Promoted Phase ${Date.now()}`
		await promoteAccordion
			.getByRole("textbox", { name: "New Phase Name" })
			.fill(newPhaseName)

		const newHeatName = `E2E Final Heat ${Date.now()}`
		const newHeatNameInput = promoteAccordion.getByRole("textbox", {
			name: "New Heat Name"
		})
		await newHeatNameInput.fill(newHeatName)
		await newHeatNameInput.press("Enter")

		const promoteResponsePromise = page.waitForResponse(
			(resp) =>
				resp.url().includes("/competition_management/promote_phase") &&
				resp.request().method() === "POST"
		)
		await promoteAccordion
			.getByRole("button", { name: "Create Phase" })
			.click()
		const promoteResponse = await promoteResponsePromise
		expect(promoteResponse.status()).toBe(201)

		// Verify via the API that promotion actually persisted correctly:
		// the new heat belongs to the source competition, both athletes (the
		// default "Number of Athletes to Promote" of 3 admits both of our two
		// ranked athletes) landed in it with their prior-phase rank recorded,
		// and the new phase carries the scoresheet from the source phase plus
		// whatever run/judge config the form submitted.
		const newHeatsResponse = await request.get(
			`${BACKEND_URL}/heat/?competition_id____list=${competitionId}&name____list=${encodeURIComponent(newHeatName)}`
		)
		expect(newHeatsResponse.status()).toBe(200)
		const newHeats = (await newHeatsResponse.json()) as Array<{ id: string }>
		expect(newHeats).toHaveLength(1)
		const newHeatId = newHeats[0].id

		const heatInfoResponse = await request.get(
			`${BACKEND_URL}/getHeatInfo/${newHeatId}`
		)
		expect(heatInfoResponse.status()).toBe(200)
		const heatInfo = (await heatInfoResponse.json()) as HeatInfoEntry[]
		expect(heatInfo).toHaveLength(2)
		const rankByAthlete = Object.fromEntries(
			heatInfo.map((h) => [h.athlete_id, h.last_phase_rank])
		)
		expect(rankByAthlete[topAthleteId]).toBe(1)
		expect(rankByAthlete[otherAthleteId]).toBe(2)
		expect(heatInfo[0].number_of_runs).toBe(3)
		expect(heatInfo[0].number_of_runs_for_score).toBe(2)
		expect(heatInfo[0].scoresheet).toBe(scoresheetId)

		const newPhasesResponse = await request.get(
			`${BACKEND_URL}/getHeatInfo/${newHeatId}/phase`
		)
		expect(newPhasesResponse.status()).toBe(200)
		const newPhases = (await newPhasesResponse.json()) as PhaseInfo[]
		expect(newPhases).toHaveLength(1)
		expect(newPhases[0].name).toBe(newPhaseName)
		expect(newPhases[0].event_id).toBe(eventId)
		expect(newPhases[0].number_of_judges).toBe(3)
		expect(newPhases[0].scoresheet).toBe(scoresheetId)
	})
})
