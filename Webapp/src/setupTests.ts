/* eslint-disable @typescript-eslint/no-empty-function */
import "@testing-library/jest-dom"

// From @react-md/utils: desktop / large-desktop breakpoints in px.
const DEFAULT_DESKTOP_MIN_WIDTH = 1024
const DEFAULT_DESKTOP_LARGE_MIN_WIDTH = 1280

if (typeof window.matchMedia !== "function") {
	window.matchMedia = (query) => ({
		media: query,
		matches:
			query.includes(`${DEFAULT_DESKTOP_MIN_WIDTH}`) ||
			query.includes(`${DEFAULT_DESKTOP_LARGE_MIN_WIDTH}`),
		onchange: () => {},
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false
	})
}
