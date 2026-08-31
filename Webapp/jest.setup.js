// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

process.env.NEXT_PUBLIC_API_URL_DEV = "http://localhost/api/"

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import "@testing-library/jest-dom/extend-expect"

// Raise RTL's default findBy/waitFor timeout (1000ms) — several suites render
// heavy component trees and the CI runner blows the 1s window under parallel
// load, producing intermittent failures unrelated to the code under test.
import { configure } from "@testing-library/react"
configure({ asyncUtilTimeout: 2000 })

// Fetch polyfill for tests (jsdom 20 ships no fetch/Request/Response)
import "whatwg-fetch"

class MockWebSocket {
	static CONNECTING = 0
	static OPEN = 1
	static CLOSING = 2
	static CLOSED = 3
	readyState = MockWebSocket.OPEN
	onopen = null
	onmessage = null
	onclose = null
	onerror = null

	/** Mock implementation: no-op */
	send() {}

	close() {
		this.readyState = MockWebSocket.CLOSED
	}

	/** Mock implementation: no-op */
	addEventListener() {}

	/** Mock implementation: no-op */
	removeEventListener() {}
}

global.WebSocket = MockWebSocket
globalThis.WebSocket = MockWebSocket
if (typeof window !== "undefined") {
	window.WebSocket = MockWebSocket
}

// Mock react-hot-toast. The real default export is a callable (`toast("msg")`)
// with `.error`/`.success` attached, so the mock has to be callable too —
// otherwise code paths that call `toast(...)` directly throw under test.
const mockToast = Object.assign(jest.fn(), {
	error: jest.fn(),
	success: jest.fn()
})

jest.mock("react-hot-toast", () => ({
	__esModule: true,
	toast: mockToast,
	Toaster: () => null, // Mock Toaster component to render nothing
	default: mockToast
}))

// Clear mock calls between tests
afterEach(() => {
	mockToast.mockClear()
	mockToast.error.mockClear()
	mockToast.success.mockClear()
})

// Suppress React act() warnings and MSW network errors
const originalError = console.error
console.error = (...args) => {
	if (/Warning.*not wrapped in act/.test(args[0])) {
		return
	}
	originalError.call(console, ...args)
}

// MSW Setup
import { server } from "./src/mocks/server"

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

// Mock MUI DataGrid
const DataGridMock = jest.fn((props) => {
	return (
		<div
			data-testid="mock-data-grid"
			data-grid-props={JSON.stringify(props)}
		/>
	)
})

jest.mock("@mui/x-data-grid", () => ({
	...jest.requireActual("@mui/x-data-grid"),
	DataGrid: DataGridMock
}))

afterEach(() => {
	DataGridMock.mockClear()
})
