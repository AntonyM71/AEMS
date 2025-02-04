// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import "@testing-library/jest-dom/extend-expect"

// Fetch polyfill for tests
import "whatwg-fetch"

// Mock react-hot-toast
const mockToast = {
	error: jest.fn(),
	success: jest.fn()
}

jest.mock("react-hot-toast", () => ({
	__esModule: true,
	toast: mockToast,
	Toaster: () => null, // Mock Toaster component to render nothing
	default: {
		...mockToast,
		error: mockToast.error,
		success: mockToast.success
	}
}))

// Clear mock calls between tests
afterEach(() => {
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
