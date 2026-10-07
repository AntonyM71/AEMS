import { act, render, screen } from "@testing-library/react"
import { BasicTable } from "./BasicBroadcastTable"

// next/font's jest mock returns a family name jsdom rejects as invalid CSS.
jest.mock("../../../fonts", () => ({ dataFontFamily: '"DM Mono"' }))

describe("BasicTable", () => {
	const mockData = [
		{ id: 1, name: "Test 1" },
		{ id: 2, name: "Test 2" },
		{ id: 3, name: "Test 3" },
		{ id: 4, name: "Test 4" }
	]

	beforeEach(() => {
		jest.useFakeTimers()
	})

	afterEach(() => {
		jest.clearAllTimers()
		jest.useRealTimers()
	})

	it("renders table with correct data", () => {
		render(<BasicTable data={mockData} pageLimit={2} pageChangeTime={5} />)

		expect(screen.getByText("id")).toBeInTheDocument()
		expect(screen.getByText("name")).toBeInTheDocument()
		expect(screen.getByText("Test 1")).toBeInTheDocument()
		expect(screen.getByText("Test 2")).toBeInTheDocument()
		expect(screen.getByText("Page: 1/2")).toBeInTheDocument()
	})

	it("sets only the score columns in the data font", () => {
		render(
			<BasicTable
				data={[{ Name: "Ada LOVELACE", "Total Score": "88.50" }]}
				dataColumns={["Total Score"]}
				pageChangeTime={5}
			/>
		)

		expect(getComputedStyle(screen.getByText("88.50")).fontFamily).toBe(
			'"DM Mono"'
		)
		expect(
			getComputedStyle(screen.getByText("Ada LOVELACE")).fontFamily
		).not.toBe('"DM Mono"')
	})

	it("changes page automatically after specified time", () => {
		render(<BasicTable data={mockData} pageLimit={2} pageChangeTime={5} />)

		expect(screen.getByText("Test 1")).toBeInTheDocument()
		expect(screen.getByText("Test 2")).toBeInTheDocument()
		expect(screen.queryByText("Test 3")).not.toBeInTheDocument()

		act(() => {
			jest.advanceTimersByTime(5000)
		})

		expect(screen.queryByText("Test 1")).not.toBeInTheDocument()
		expect(screen.getByText("Test 3")).toBeInTheDocument()
		expect(screen.getByText("Test 4")).toBeInTheDocument()
	})

	it("displays correct number of rows based on page limit", () => {
		render(<BasicTable data={mockData} pageLimit={3} pageChangeTime={5} />)

		const rows = screen.getAllByRole("row")
		// Add 2 to account for header and footer rows
		expect(rows.length).toBe(5)
	})

	it("cleans up interval on unmount", () => {
		const { unmount } = render(
			<BasicTable data={mockData} pageLimit={2} pageChangeTime={5} />
		)

		const clearIntervalSpy = jest.spyOn(window, "clearInterval")
		unmount()
		expect(clearIntervalSpy).toHaveBeenCalled()
	})
})
