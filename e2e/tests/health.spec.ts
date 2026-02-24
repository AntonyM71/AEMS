import { test, expect } from "@playwright/test"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

test.describe("Health Checks", () => {
	test("backend health endpoint returns healthy", async ({ request }) => {
		const response = await request.get(`${BACKEND_URL}/health`)
		expect(response.status()).toBe(200)
		const body = await response.json()
		expect(body.status).toBe("healthy")
	})

	test("frontend loads and renders navigation", async ({ page }) => {
		await page.goto("/")
		await expect(
			page.getByRole("link", { name: "Judging" })
		).toBeVisible()
		await expect(
			page.getByRole("link", { name: "Admin" })
		).toBeVisible()
	})
})
