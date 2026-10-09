import { expect, test } from "@playwright/test"
import { randomUUID } from "node:crypto"
import { BACKEND_URL, proxyFrontendAPIToBackend } from "./helpers/apiProxy"
import { fetchTwoMoves } from "./helpers/moves"
import { setRunStatusOnce } from "./helpers/runStatus"
import { setupTestData } from "./helpers/testData"
import { nextUuid7 } from "./helpers/uuid7"

test("a locked run puts the athlete on the leaderboard tower", async ({
	browser,
	request
}) => {
	const data = await setupTestData(request)
	const [move] = await fetchTwoMoves(request, BACKEND_URL, data.scoresheetId)
	const scoreResponse = await request.post(
		`${BACKEND_URL}/addUpdateAthleteScore/${data.heatId}/${data.athleteId}/0/1?phase_id=${data.phaseId}`,
		{
			data: {
				moves: [
					{ id: randomUUID(), move_id: move.moveId, direction: move.direction }
				],
				bonuses: [],
				request_id: nextUuid7()
			}
		}
	)
	expect(scoreResponse.status()).toBe(200)

	const context = await browser.newContext()
	try {
		const [controller, overlay] = await Promise.all([
			context.newPage(),
			context.newPage()
		])
		await Promise.all([controller, overlay].map(proxyFrontendAPIToBackend))

		await controller.goto("/Broadcast/Controller")
		// The competition and event comboboxes have no accessible name, and
		// the tower's settings below them are comboboxes too.
		const pickers = controller.locator(
			':not([aria-label="Broadcast screen"] *)[role="combobox"]'
		)
		await pickers.first().click({ timeout: 15000 })
		await controller
			.getByRole("option", { name: data.competitionName })
			.click()
		await pickers.nth(1).click({ timeout: 15000 })
		await controller.getByRole("option", { name: "E2E Event" }).click()
		await controller
			.getByRole("combobox", { name: "Select Phase" })
			.click({ timeout: 15000 })
		await controller.getByRole("option", { name: "E2E Phase" }).click()
		await controller
			.getByRole("combobox", { name: "Select Heat" })
			.click({ timeout: 15000 })
		await controller
			.getByRole("option", { name: data.heatName, exact: true })
			.click()

		await overlay.setViewportSize({ width: 1920, height: 1080 })
		await overlay.goto("/Broadcast/Overlay")
		await controller
			.getByRole("button", { name: "Leaderboard tower" })
			.click()
		await controller.getByRole("button", { name: "Live run score" }).click()

		const tower = overlay.locator(".AemsTower-root")
		// The run is scored but not locked, so nobody is on the board yet.
		await expect(tower.locator(".AemsTower-count")).toHaveText("0/1", {
			timeout: 15000
		})
		await expect(tower.locator(".AemsTower-row")).toHaveCount(0)

		await setRunStatusOnce(
			BACKEND_URL,
			{
				heatId: data.heatId,
				phaseId: data.phaseId,
				athleteId: data.athleteId,
				runNumber: 0
			},
			{ locked: true, did_not_start: false }
		)

		const row = tower.locator(".AemsTower-row")
		await expect(row).toHaveCount(1, { timeout: 15000 })
		await expect(row.locator(".AemsTower-place")).toHaveText("1")
		await expect(row.locator(".AemsTower-name")).toHaveText("ATHLETE")
		await expect(row.locator(".AemsTower-gap")).toHaveText("Leader")
		await expect(tower.locator(".AemsTower-count")).toHaveText("1/1")

		// The run corner moves inwards so the two never overlap.
		const runCorner = overlay.locator(".AemsRunCorner-root")
		await expect(runCorner).toBeVisible({ timeout: 15000 })
		await expect
			.poll(async () => {
				const [towerBox, cornerBox] = await Promise.all([
					tower.boundingBox(),
					runCorner.boundingBox()
				])

				return towerBox && cornerBox
					? cornerBox.x + cornerBox.width <= towerBox.x
					: false
			})
			.toBe(true)
	} finally {
		await context.close()
	}
})
