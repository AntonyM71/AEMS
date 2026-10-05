import type { Page } from "@playwright/test"

/**
 * Picks a competition then a heat on any page showing the heat selectors
 * (judging, scribe, head judge).
 */
export async function selectCompetitionAndHeat(
	page: Page,
	competitionName: string,
	heatName: string
) {
	// The competition combobox has no accessible name; it is the only one
	// shown before a competition is picked.
	await page.getByRole("combobox").first().click()
	await page.getByRole("option", { name: competitionName }).click()

	// The heat combobox is a Skeleton until the competition's heats load.
	await page
		.getByRole("combobox", { name: "Select Heat" })
		.click({ timeout: 15000 })
	await page.getByRole("option", { name: heatName, exact: true }).click()
}
