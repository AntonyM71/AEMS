import { test, expect } from "@playwright/test"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

test.describe("Database Read/Write", () => {
	test("can create a competition via the backend and read it back", async ({
		request
	}) => {
		const competitionName = `E2E Competition ${Date.now()}`

		// Write: create a competition directly via the API
		const createResponse = await request.post(
			`${BACKEND_URL}/competition/`,
			{
				data: [{ name: competitionName }]
			}
		)
		expect(createResponse.status()).toBe(201)
		const created = await createResponse.json()
		expect(created[0].name).toBe(competitionName)
		expect(created[0].id).toBeTruthy()

		// Read: verify it was persisted by fetching it back
		const getResponse = await request.get(
			`${BACKEND_URL}/competition/?name____list=${encodeURIComponent(competitionName)}`
		)
		expect(getResponse.status()).toBe(200)
		const competitions = await getResponse.json()
		expect(competitions).toHaveLength(1)
		expect(competitions[0].name).toBe(competitionName)
	})

	test("can create a competition via the frontend UI and verify via API", async ({
		page,
		request
	}) => {
		const competitionName = `E2E UI Competition ${Date.now()}`

		// Navigate to Admin page
		await page.goto("/Admin")

		// Expand the "Manage Competition Structure" accordion
		await page.getByText("Manage Competition Structure").click()

		// Fill in the "New Competition" input and submit
		const newCompInput = page.getByLabel("New Competition")
		await newCompInput.fill(competitionName)
		await newCompInput.press("Enter")

		// Verify the competition now appears in the selector
		await expect(page.getByText(competitionName)).toBeVisible({
			timeout: 10000
		})

		// Also verify via API that it was persisted to the database
		const getResponse = await request.get(
			`${BACKEND_URL}/competition/?name____list=${encodeURIComponent(competitionName)}`
		)
		expect(getResponse.status()).toBe(200)
		const competitions = await getResponse.json()
		expect(competitions).toHaveLength(1)
		expect(competitions[0].name).toBe(competitionName)
	})
})
