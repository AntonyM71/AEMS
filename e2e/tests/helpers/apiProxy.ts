import type { Page } from "@playwright/test"

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const MISCONFIGURED_DEV_API_PORT = "8001"

/**
 * Intercepts frontend /api/ calls (and calls to the misconfigured dev API
 * port) and forwards them to the real backend.
 */
export const proxyFrontendAPIToBackend = async (page: Page) => {
	await page.route("**/*", async (route) => {
		const request = route.request()
		const requestUrl = new URL(request.url())
		const isFrontendApiPath = requestUrl.pathname.startsWith("/api/")
		const isMisconfiguredDevApiPort =
			requestUrl.hostname === "localhost" &&
			requestUrl.port === MISCONFIGURED_DEV_API_PORT
		if (!isFrontendApiPath && !isMisconfiguredDevApiPort) {
			await route.continue()
			return
		}
		const backendPath = isFrontendApiPath
			? requestUrl.pathname.replace(/^\/api/, "")
			: requestUrl.pathname
		const backendUrl = `${BACKEND_URL}${backendPath}${requestUrl.search}`
		try {
			const response = await route.fetch({ url: backendUrl })
			await route.fulfill({ response })
		} catch (error) {
			if (
				String(error).includes(
					"Target page, context or browser has been closed"
				)
			) {
				return
			}
			throw error
		}
	})
}
