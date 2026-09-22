import { test, expect, type Page } from "@playwright/test"
import { randomUUID } from "node:crypto"
import { BACKEND_URL, proxyFrontendAPIToBackend } from "./helpers/apiProxy"
import { setupTestData } from "./helpers/testData"
import { makeUuid7, nextUuid7 } from "./helpers/uuid7"

/**
 * Selects a competition then a heat via the MUI Select dropdowns present on
 * both the head-judge and scribe pages before a heat is chosen.
 *
 * The competition combobox does not have an aria-label or aria-labelledby
 * attribute (MUI FormControl without explicit labelId), so we use `.first()`
 * to target it — it is the only combobox visible before a competition is
 * chosen.  The heat combobox uses `inputProps={{ "aria-label": "Select Heat" }}`
 * in HeatSelector.tsx so it can be matched by accessible name.
 */
async function selectCompetitionAndHeat(
	page: Page,
	competitionName: string,
	heatName: string
) {
	// Competition selector has no aria-label; it is the only combobox before
	// a competition is picked.
	await page.getByRole("combobox").first().click()
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
			name: string
			direction: string
			fl_score: number
			rb_score: number
		}>
		expect(moves.length).toBeGreaterThan(0)
		const move = moves[0]
		// Map the available-move direction ("LR" | "FB" | "S") to a scored direction.
		const validDirections = ["LR", "FB", "S"]
		expect(validDirections).toContain(move.direction)
		const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" }
		const scoredDirection = directionMap[move.direction]!
		// Calculate the expected final score: fl_score for F/L/S, rb_score for R/B.
		const expectedScore = ["F", "L", "S"].includes(scoredDirection)
			? move.fl_score
			: move.rb_score
		const expectedScoreText = expectedScore.toFixed(2)

		const context = await browser.newContext()
		const headJudgePage = await context.newPage()

		try {
			await proxyFrontendAPIToBackend(headJudgePage)

			// Open the head judge page and navigate to the test heat.
			await headJudgePage.goto("/HeadJudge")
			await selectCompetitionAndHeat(
				headJudgePage,
				competitionName,
				heatName
			)

			// INITIAL CHECK: Wait for the page to fully load and verify the
			// correct initial content is present before any WebSocket updates.
			// head-judge-page renders once selectedAthlete and phase data are loaded.
			await expect(
				headJudgePage.getByTestId("head-judge-page")
			).toBeVisible({ timeout: 20000 })
			// "Judge: 1" confirms the JudgeCard is rendered with phase data.
			await expect(
				headJudgePage.getByText("Judge: 1")
			).toBeVisible({ timeout: 15000 })
			// Verify the initial score is zero — this is the baseline state before
			// any moves are submitted.
			await expect(
				headJudgePage.getByTestId("final-score-value")
			).toHaveText("0.00", { timeout: 10000 })

			// Trigger a WebSocket update: submit a scored move via the REST API.
			// The backend publishes the result on the current_scores WebSocket channel,
			// which the head judge page is already subscribed to.
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
						bonuses: [],
						request_id: nextUuid7()
					}
				}
			)
			expect(scoreResponse.status()).toBe(200)

			// UPDATE CHECK: The head judge page receives the current_scores WebSocket
			// broadcast and updates the score from "0.00" to the expected value.
			await expect(
				headJudgePage.getByTestId("final-score-value")
			).toHaveText(expectedScoreText, { timeout: 20000 })

			// The submitted move name also appears in a scored move card on the
			// head judge page (rendered by the JudgeCard → ScoredMove component).
			await expect(
				headJudgePage.getByText(move.name)
			).toBeVisible({ timeout: 10000 })
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

			// INITIAL CHECK: Wait for the scribe page to fully load and confirm
			// the run is NOT locked before the head judge sends the lock message.
			// Wait for move buttons — this proves athleteData has loaded inside
			// the Scribe component (the run_status WebSocket filter uses athlete_id).
			await expect(
				scribePage.locator('[data-testid^="button-"]:not([disabled])').first()
			).toBeVisible({ timeout: 20000 })
			// Confirm there is no lock alert in the initial state.
			await expect(
				scribePage.getByText("Run has been locked by head judge")
			).not.toBeVisible()

			// Open the head judge page and navigate to the same heat.
			// The lock button is rendered when NEXT_PUBLIC_SHOW_LOCK_RUN=true (set at build).
			await headJudgePage.goto("/HeadJudge")
			await selectCompetitionAndHeat(
				headJudgePage,
				competitionName,
				heatName
			)
			await expect(
				headJudgePage.getByTestId("lock-run-button")
			).toBeVisible({ timeout: 20000 })
			// Confirm the button shows "Lock Run" initially (not yet locked).
			await expect(
				headJudgePage.getByTestId("lock-run-button")
			).toHaveText("Lock Run", { timeout: 10000 })

			// Trigger the WebSocket update: click Lock Run on the head judge page.
			// This sends a run_status WebSocket message which the backend broadcasts
			// to all subscribers including the scribe page.
			await headJudgePage.getByTestId("lock-run-button").click()

			// UPDATE CHECK: The head judge page button switches to "Unlock Run"
			// confirming the round-trip WebSocket broadcast was received.
			await expect(
				headJudgePage.getByTestId("lock-run-button")
			).toHaveText("Unlock Run", { timeout: 15000 })

			// The scribe page also receives the same broadcast and shows the
			// lock alert.
			await expect(
				scribePage.getByText("Run has been locked by head judge")
			).toBeVisible({ timeout: 15000 })
		} finally {
			await context.close()
		}
	})

	test("a submission carrying an older identifier than one already applied is rejected", async ({
		request
	}) => {
		const { heatId, athleteId, phaseId, scoresheetId } =
			await setupTestData(request)

		const movesResponse = await request.get(
			`${BACKEND_URL}/availablemoves/?sheet_id____list=${scoresheetId}&limit=2`
		)
		expect(movesResponse.status()).toBe(200)
		const moves = (await movesResponse.json()) as Array<{
			id: string
			direction: "LR" | "FB" | "S"
		}>
		expect(moves.length).toBeGreaterThanOrEqual(2)
		const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" }
		const [newerMove, olderMove] = moves

		const now = Date.now()
		const newerRequestId = makeUuid7(now + 10_000)
		const olderRequestId = makeUuid7(now)

		const newerResponse = await request.post(
			`${BACKEND_URL}/addUpdateAthleteScore/${heatId}/${athleteId}/0/1?phase_id=${phaseId}`,
			{
				data: {
					moves: [
						{
							id: randomUUID(),
							move_id: newerMove.id,
							direction: directionMap[newerMove.direction]
						}
					],
					bonuses: [],
					request_id: newerRequestId
				}
			}
		)
		expect(newerResponse.status()).toBe(200)

		const staleResponse = await request.post(
			`${BACKEND_URL}/addUpdateAthleteScore/${heatId}/${athleteId}/0/1?phase_id=${phaseId}`,
			{
				data: {
					moves: [
						{
							id: randomUUID(),
							move_id: olderMove.id,
							direction: directionMap[olderMove.direction]
						}
					],
					bonuses: [],
					request_id: olderRequestId
				}
			}
		)
		expect(staleResponse.status()).toBe(409)

		const readBack = await request.get(
			`${BACKEND_URL}/getAthleteMovesAndBonuses/${heatId}/${athleteId}/0?judge_id=1`
		)
		expect(readBack.status()).toBe(200)
		const { moves: storedMoves } = (await readBack.json()) as {
			moves: Array<{ move_id: string }>
		}
		expect(storedMoves.map((m) => m.move_id)).toEqual([newerMove.id])
	})

	test("two concurrent submissions for one judge's run never interleave, and the newer one always wins", async ({
		request
	}) => {
		const { heatId, athleteId, phaseId, scoresheetId } =
			await setupTestData(request)

		const movesResponse = await request.get(
			`${BACKEND_URL}/availablemoves/?sheet_id____list=${scoresheetId}&limit=2`
		)
		expect(movesResponse.status()).toBe(200)
		const moves = (await movesResponse.json()) as Array<{
			id: string
			direction: "LR" | "FB" | "S"
		}>
		expect(moves.length).toBeGreaterThanOrEqual(2)
		const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" }
		const [smallerMove, largerMove] = moves

		const now = Date.now()
		const smallerRequestId = makeUuid7(now)
		const largerRequestId = makeUuid7(now + 10_000)

		const scoreUrl = `${BACKEND_URL}/addUpdateAthleteScore/${heatId}/${athleteId}/0/1?phase_id=${phaseId}`
		const submit = (moveId: string, direction: string, requestId: string) =>
			request.post(scoreUrl, {
				data: {
					moves: [
						{ id: randomUUID(), move_id: moveId, direction }
					],
					bonuses: [],
					request_id: requestId
				}
			})

		const [possiblyStaleResponse, alwaysWinningResponse] = await Promise.all([
			submit(
				smallerMove.id,
				directionMap[smallerMove.direction],
				smallerRequestId
			),
			submit(
				largerMove.id,
				directionMap[largerMove.direction],
				largerRequestId
			)
		])

		expect(alwaysWinningResponse.status()).toBe(200)
		expect([200, 409]).toContain(possiblyStaleResponse.status())

		const readBack = await request.get(
			`${BACKEND_URL}/getAthleteMovesAndBonuses/${heatId}/${athleteId}/0?judge_id=1`
		)
		expect(readBack.status()).toBe(200)
		const { moves: storedMoves } = (await readBack.json()) as {
			moves: Array<{ move_id: string }>
		}
		expect(storedMoves.map((m) => m.move_id)).toEqual([largerMove.id])
	})
})
