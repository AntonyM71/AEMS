import { fireEvent, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../../../mocks/server"
import { renderWithProviders } from "../../../../testUtils"
import { InfoBar } from "../InfoBar"

describe("InfoBar", () => {
	const mockPaddlerInfo = {
		id: "1",
		first_name: "John",
		last_name: "Doe",
		bib: "123",
		scoresheet: "sheet1"
	}

	const renderInfoBar = (isFetchingScoredMoves = false) =>
		renderWithProviders(
			<InfoBar
				paddlerInfo={mockPaddlerInfo}
				availableMoves={[]}
				isFetchingScoredMoves={isFetchingScoredMoves}
			/>
		)

	beforeEach(() => {
		server.use(
			http.get("/api/availablebonuses", () => HttpResponse.json([]))
		)
	})

	it("renders basic info with minimal props", () => {
		renderInfoBar()

		// Check if basic paddler info is displayed
		expect(screen.getByText("John")).toBeInTheDocument()
		expect(screen.getByText("DOE")).toBeInTheDocument()
		expect(screen.getByText("123")).toBeInTheDocument()
	})

	it("shows loading skeleton when isFetchingScoredMoves is true", () => {
		renderInfoBar(true)

		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()
	})

	it("opens and closes Heat Scores modal", () => {
		renderInfoBar()

		// Open modal
		const heatScoresButton = screen.getByText("Heat Scores")
		fireEvent.click(heatScoresButton)

		// Check if modal is open
		expect(screen.getByRole("presentation")).toBeInTheDocument()

		// Close modal by clicking escape key
		fireEvent.keyDown(screen.getByRole("presentation"), {
			key: "Escape",
			code: "Escape"
		})

		// Wait for modal to close
		expect(screen.queryByRole("presentation")).not.toBeInTheDocument()
	})

	it("displays current score", () => {
		renderInfoBar()

		expect(screen.getByText("Score:")).toBeInTheDocument()
		expect(screen.getByText("0")).toBeInTheDocument() // Initial score should be 0
	})
})
