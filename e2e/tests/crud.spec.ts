import { test, expect } from "@playwright/test"
import { randomUUID } from "crypto"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

test.describe("Database Read/Write", () => {
	test("can create a competition via the backend and read it back", async ({
		request
	}) => {
		const competitionName = `E2E Competition ${Date.now()}`
		const competitionId = randomUUID()

		// Write: create a competition directly via the API
		const createResponse = await request.post(
			`${BACKEND_URL}/competition/`,
			{
				data: [{ id: competitionId, name: competitionName }]
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
		await page
			.getByRole("button", { name: "Manage Competition Structure" })
			.click()

		// Wait for the competition data to load (selector becomes interactive)
		const newCompInput = page
			.getByRole("textbox", { name: "New Competition" })
			.first()
		await expect(newCompInput).toBeVisible({ timeout: 10000 })

		// Intercept the POST request and fill+submit the form
		const responsePromise = page.waitForResponse(
			(resp) =>
				resp.url().includes("/competition/") &&
				resp.request().method() === "POST",
			{ timeout: 10000 }
		)
		await newCompInput.fill(competitionName)
		await newCompInput.press("Enter")

		// Wait for the creation response and verify it succeeded
		const createResponse = await responsePromise
		expect(createResponse.status()).toBe(201)

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
