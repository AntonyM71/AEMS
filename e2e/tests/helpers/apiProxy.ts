import type { Page } from "@playwright/test"

export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const MISCONFIGURED_DEV_API_PORT = "8001"
const SAFE_TO_REPEAT = new Set(["GET", "HEAD"])

// The backend drops idle keep-alive connections, so a pooled connection can be
// reset just as it is reused. Only repeat requests that change nothing.
const fetchWithRetryOnReset = async <T>(
	fetchOnce: () => Promise<T>,
	method: string
): Promise<T> => {
	try {
		return await fetchOnce()
	} catch (error) {
		const isConnectionReset = String(error).includes("socket hang up")
		if (isConnectionReset && SAFE_TO_REPEAT.has(method)) {
			return fetchOnce()
		}
		throw error
	}
}

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
			const response = await fetchWithRetryOnReset(
				() => route.fetch({ url: backendUrl }),
				request.method()
			)
			await route.fulfill({ response })
		} catch (error) {
			// The page closed or navigated away while this request was in
			// flight, so nothing is waiting for the response.
			const isAbandonedByPage = [
				"Target page, context or browser has been closed",
				"Fetch response has been disposed"
			].some((message) => String(error).includes(message))
			if (isAbandonedByPage) {
				return
			}
			throw error
		}
	})
}
