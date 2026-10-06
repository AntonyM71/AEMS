import { defineConfig, devices } from "@playwright/test"

// Deliberately no default URL: this check writes to whichever server it is
// pointed at, so the target must always be named explicitly.
const smokeUrl = process.env.SMOKE_URL
if (!smokeUrl) {
	throw new Error(
		"Set SMOKE_URL to the nginx address, e.g. http://localhost:81"
	)
}

export default defineConfig({
	testDir: ".",
	testMatch: "*.smoke.ts",
	timeout: 180000,
	retries: 0,
	workers: 1,
	use: {
		baseURL: smokeUrl,
		viewport: { width: 1600, height: 1000 },
		screenshot: "on"
	},
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	reporter: [["list"], ["html", { open: "never", outputFolder: "report" }]]
})
