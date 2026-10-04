import { setupListeners } from "@reduxjs/toolkit/query"
import { act, fireEvent, screen, waitFor } from "@testing-library/react"
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

	const cartwheel = {
		id: "move-1",
		name: "Cartwheel",
		direction: "LR" as const,
		fl_score: 10,
		rb_score: 20
	}
	const scoredMove = {
		id: "scored-1",
		moveId: "move-1",
		direction: "L" as const
	}
	const huge = {
		id: "bonus-1",
		sheet_id: "sheet1",
		move_id: "move-1",
		name: "Huge",
		score: 50
	}

	const renderInfoBar = (
		isFetchingScoredMoves = false,
		{
			availableMoves = [],
			scoredMoves = []
		}: {
			availableMoves?: (typeof cartwheel)[]
			scoredMoves?: (typeof scoredMove)[]
		} = {}
	) =>
		renderWithProviders(
			<InfoBar
				paddlerInfo={mockPaddlerInfo}
				availableMoves={availableMoves}
				isFetchingScoredMoves={isFetchingScoredMoves}
			/>,
			{ preloadedState: { score: { scoredMoves } } }
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

	it("shows a scored move's name and bonus chip from the scoresheet, with no flash of Unknown", async () => {
		server.use(
			http.get("/api/availablebonuses", () => HttpResponse.json([huge]))
		)

		renderInfoBar(false, {
			availableMoves: [cartwheel],
			scoredMoves: [scoredMove]
		})

		// Bonuses haven't resolved yet: no misleading "Unknown".
		expect(screen.queryByText("Unknown")).not.toBeInTheDocument()

		expect(await screen.findByText("Cartwheel")).toBeInTheDocument()
		expect(
			screen.getByTestId("scored-remove-scored-1-bonus-1")
		).toBeInTheDocument()
	})

	it("shows a placeholder, not Unknown, while the scoresheet's moves are still loading", async () => {
		const { store } = renderWithProviders(
			<InfoBar
				paddlerInfo={mockPaddlerInfo}
				availableMoves={undefined}
				isFetchingScoredMoves={false}
			/>,
			{ preloadedState: { score: { scoredMoves: [scoredMove] } } }
		)

		await waitFor(() =>
			expect(
				Object.values(store.getState().aemsApi.queries).map(
					(q) => q?.status
				)
			).toContain("fulfilled")
		)
		expect(screen.queryByText("Unknown")).not.toBeInTheDocument()
		expect(screen.queryByTestId("scored-move-list")).not.toBeInTheDocument()
	})

	it("recovers the scoresheet's bonuses after a reconnect, without a page refresh", async () => {
		let bonusRequests = 0
		server.use(
			http.get("/api/availablebonuses", () => {
				bonusRequests += 1
				if (bonusRequests === 1) {
					return HttpResponse.error()
				}

				return HttpResponse.json([huge])
			})
		)

		const { store } = renderInfoBar(false, {
			availableMoves: [cartwheel],
			scoredMoves: [scoredMove]
		})
		const unsubscribe = setupListeners(store.dispatch)

		await waitFor(() => expect(bonusRequests).toBeGreaterThan(0))
		expect(
			screen.queryByTestId("scored-remove-scored-1-bonus-1")
		).not.toBeInTheDocument()

		act(() => {
			window.dispatchEvent(new Event("online"))
		})

		expect(
			await screen.findByTestId("scored-remove-scored-1-bonus-1")
		).toBeInTheDocument()

		unsubscribe()
	})
})
