import { test, expect, type Page } from "@playwright/test"
import { randomUUID } from "node:crypto"
import { BACKEND_URL, proxyFrontendAPIToBackend } from "./helpers/apiProxy"
import { setupTestData } from "./helpers/testData"

async function selectCompetitionAndHeat(
	page: Page,
	competitionName: string,
	heatName: string
) {
	// The competition combobox has no accessible name; it is the only one
	// shown before a competition is picked.
	await page.getByRole("combobox").first().click()
	await page.getByRole("option", { name: competitionName }).click()
	await page
		.getByRole("combobox", { name: "Select Heat" })
		.click({ timeout: 15000 })
	await page.getByRole("option", { name: heatName }).click()
}

test("the arena follows the head judge, including after a reload", async ({
	browser,
	request
}) => {
	const { competitionName, heatName, heatId, phaseId } =
		await setupTestData(request)
	const secondSurname = `Follow${Date.now()}`
	const secondAthleteId = randomUUID()
	expect(
		(
			await request.post(`${BACKEND_URL}/athlete/`, {
				data: [
					{
						id: secondAthleteId,
						first_name: "Second",
						last_name: secondSurname,
						bib: "2"
					}
				]
			})
		).status()
	).toBe(201)
	expect(
		(
			await request.post(`${BACKEND_URL}/athleteheat/`, {
				data: [
					{
						id: randomUUID(),
						athlete_id: secondAthleteId,
						heat_id: heatId,
						phase_id: phaseId
					}
				]
			})
		).status()
	).toBe(201)

	const context = await browser.newContext()
	try {
		const [controller, headJudge, arena] = await Promise.all([
			context.newPage(),
			context.newPage(),
			context.newPage()
		])
		await Promise.all(
			[controller, headJudge, arena].map(proxyFrontendAPIToBackend)
		)

		await controller.goto("/Broadcast/Controller")
		await controller
			.getByRole("button", { name: "Follow head judge" })
			.click()

		await headJudge.goto("/HeadJudge")
		await selectCompetitionAndHeat(headJudge, competitionName, heatName)
		await expect(headJudge.getByTestId("head-judge-page")).toBeVisible({
			timeout: 20000
		})

		await arena.goto("/Arena")

		// Step the head judge onto the second athlete, whichever position
		// the heat lists it in.
		const paddlerName = headJudge.getByTestId("display-paddler-name")
		if (!(await paddlerName.innerText()).includes(secondSurname.toUpperCase())) {
			await headJudge.getByTestId("button-next-paddler").click()
		}
		await expect(paddlerName).toContainText(secondSurname.toUpperCase())

		await expect(arena.getByText(secondSurname.toUpperCase())).toBeVisible({
			timeout: 15000
		})

		await arena.reload()
		await expect(arena.getByText(secondSurname.toUpperCase())).toBeVisible({
			timeout: 15000
		})
	} finally {
		await context.close()
	}
})
