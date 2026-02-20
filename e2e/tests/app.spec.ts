import { test, expect } from "@playwright/test"

test.describe("App Pages", () => {
	test("home page renders gotchas content", async ({ page }) => {
		await page.goto("/")
		await expect(page.getByText("Gotchas:")).toBeVisible()
	})

	test("admin page renders competition management sections", async ({
		page
	}) => {
		await page.goto("/Admin")
		await expect(
			page.getByText("Manage Competition Structure")
		).toBeVisible()
		await expect(
			page.getByText("Manage Paddlers in Heat")
		).toBeVisible()
		await expect(
			page.getByText("Promote top Athletes to next Phase")
		).toBeVisible()
	})

	test("navigation links route to correct pages", async ({ page }) => {
		await page.goto("/")
		await page.getByRole("link", { name: "Admin" }).click()
		await expect(page).toHaveURL(/\/Admin/)
		await expect(
			page.getByText("Manage Competition Structure")
		).toBeVisible()
	})
})
