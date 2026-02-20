import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
	testDir: "./tests",
	timeout: 30000,
	retries: 1,
	use: {
		baseURL: process.env.FRONTEND_URL || "http://localhost:81",
		trace: "on-first-retry"
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] }
		}
	],
	reporter: [
		["junit", { outputFile: "playwright-results.xml" }],
		["list"]
	]
})

