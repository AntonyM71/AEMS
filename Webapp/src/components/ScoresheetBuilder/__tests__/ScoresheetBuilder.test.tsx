import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse, delay } from "msw"
import { Toaster, toast } from "react-hot-toast"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import { ScoresheetMoves } from "../ScoresheetBuilder"

interface AvailableMoves {
	id: string
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: "LR" | "FB" | "S"
}

interface AvailableBonuses {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
}

const mockMoves: AvailableMoves[] = [
	{
		id: "1",
		sheet_id: "test-id",
		name: "Test Move",
		fl_score: 10,
		rb_score: 20,
		direction: "LR"
	}
]

const mockBonuses: AvailableBonuses[] = [
	{
		id: "1",
		sheet_id: "test-id",
		move_id: "1",
		name: "Test Bonus",
		score: 5
	}
]

// Create a test store
const createTestStore = () =>
	configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(aemsApi.middleware)
	})

describe("ScoresheetMoves", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	it("shows loading state when data is being fetched", async () => {
		// Use MSW to delay the responses
		server.use(
			http.get("/api/availablemoves", async () => {
					await delay(100)
					return HttpResponse.json([])
				}),
			http.get("/api/availablebonuses", async () => {
					await delay(100)
					return HttpResponse.json([])
				})
		)

		render(
			<Provider store={store}>
				<Toaster />
				<ScoresheetMoves selectedScoresheet="test-id" />
			</Provider>
		)

		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()

		// Wait for loading state to disappear
		await waitFor(() => !screen.queryByTestId("loading-skeleton"))
	})

	it("shows empty state with just header and add move when no moves exist", async () => {
		// Use MSW to return empty arrays
		server.use(
			http.get("/api/availablemoves", async () => {
					await delay(10)
					return HttpResponse.json([])
				}),
			http.get("/api/availablebonuses", async () => {
					await delay(10)
					return HttpResponse.json([])
				})
		)

		render(
			<Provider store={store}>
				<Toaster />
				<ScoresheetMoves selectedScoresheet="test-id" />
			</Provider>
		)

		// Wait for loading state to disappear and verify it's gone
		await waitFor(
			() => {
				expect(
					screen.queryByTestId("loading-skeleton")
				).not.toBeInTheDocument()
			},
			{ timeout: 1000 }
		)

		// Should show header with column names
		const headers = screen.getAllByText(
			(content, element) =>
				// Only match Typography elements to avoid matching input labels
				element?.tagName.toLowerCase() === "p" &&
				["Name", "Direction", "F/R Score", "L/B Score"].includes(
					content
				)
		)
		expect(headers).toHaveLength(4)

		// Should show add move button but no edit/delete move components
		expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument()
		expect(screen.queryByTestId("edit-delete-move")).not.toBeInTheDocument()

		// Should show update scoresheet button
		expect(
			screen.getByRole("button", { name: "Update Scoresheet" })
		).toBeInTheDocument()
	})

	it("displays existing moves and bonuses", async () => {
		server.use(
			http.get("/api/availablemoves", async () => {
					await delay(10)
					return HttpResponse.json(mockMoves)
				}),
			http.get("/api/availablebonuses", async () => {
					await delay(10)
					return HttpResponse.json(mockBonuses)
				})
		)

		render(
			<Provider store={store}>
				<ScoresheetMoves selectedScoresheet="test-id" />
			</Provider>
		)

		// Wait for loading state to disappear and verify it's gone
		await waitFor(
			() => {
				expect(
					screen.queryByTestId("loading-skeleton")
				).not.toBeInTheDocument()
			},
			{ timeout: 1000 }
		)

		// Check move data is displayed
		const moveNameInput = await screen.findByDisplayValue("Test Move")
		expect(moveNameInput).toBeInTheDocument()

		// Check score inputs
		const moveFlInput = screen.getByDisplayValue("10")
		expect(moveFlInput).toBeInTheDocument()

		// Check direction select
		const directionSelect = screen.getAllByRole("combobox")[0]
		expect(directionSelect).toHaveTextContent("L/R")

		// Verify we can change direction
		const user = userEvent.setup()
		await user.click(directionSelect)
		const fbOption = screen.getByRole("option", { name: "F/B" })
		await user.click(fbOption)
		expect(directionSelect).toHaveTextContent("F/B")

		// Check bonus data is displayed
		const bonusHeaders = screen.getByText(
			(content, element) =>
				element?.tagName.toLowerCase() === "p" &&
				content === "Test Bonus"
		)
		expect(bonusHeaders).toBeInTheDocument()

		const bonusScoreInput = screen.getByDisplayValue("5")
		expect(bonusScoreInput).toBeInTheDocument()
	})

	it("successfully updates scoresheet", async () => {
		let updateCalled = false

		server.use(
			http.get("/api/availablemoves", () =>
				HttpResponse.json(mockMoves)
				),
			http.get("/api/availablebonuses", () =>
				HttpResponse.json(mockBonuses)
				),
			http.post("/api/addUpdateScoresheet/:id", async (req, res, ctx) => {
				updateCalled = true

				const body = await req.json()
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				expect(body.addUpdateScoresheetRequest.moves).toEqual(mockMoves)
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				expect(body.addUpdateScoresheetRequest.bonuses).toEqual(
					mockBonuses
				)

				return HttpResponse.json({ success: true })
			})
		)

		render(
			<Provider store={store}>
				<Toaster />
				<ScoresheetMoves selectedScoresheet="test-id" />
			</Provider>
		)

		// Wait for loading to finish and update button to appear
		const updateButton = await screen.findByRole("button", {
			name: "Update Scoresheet"
		})
		fireEvent.click(updateButton)

		// Verify update was called
		await waitFor(() => {
			expect(updateCalled).toBe(true)
		})

		// Check success toast was shown
		await waitFor(() => {
			expect(toast.success).toHaveBeenCalled()
		})
	})

	it("deletes a bonus type from all moves", async () => {
		server.use(
			http.get("/api/availablemoves", () =>
				HttpResponse.json(mockMoves)
				),
			http.get("/api/availablebonuses", () =>
				HttpResponse.json(mockBonuses)
				)
		)

		render(
			<Provider store={store}>
				<Toaster />
				<ScoresheetMoves selectedScoresheet="test-id" />
			</Provider>
		)

		// Wait for loading state to disappear
		await waitFor(() => {
			expect(
				screen.queryByTestId("loading-skeleton")
			).not.toBeInTheDocument()
		})

		// Wait for Test Bonus to appear
		const testBonusText = await screen.findByText(
			(content, element) =>
				element?.tagName.toLowerCase() === "p" &&
				content === "Test Bonus"
		)
		expect(testBonusText).toBeInTheDocument()

		// Find and click the delete button next to Test Bonus
		const deleteButton = screen.getByTestId("delete-bonus-Test Bonus")
		expect(deleteButton).toBeInTheDocument()

		const user = userEvent.setup()
		await user.click(deleteButton)

		// Verify the bonus is removed from the header
		expect(screen.queryByText("Test Bonus")).not.toBeInTheDocument()

		// Verify the bonus input field is removed
		expect(screen.queryByDisplayValue("5")).not.toBeInTheDocument()
	})

	it("adds a new bonus type to all moves", async () => {
		server.use(
			http.get("/api/availablemoves", () =>
				HttpResponse.json(mockMoves)
				),
			http.get("/api/availablebonuses", () =>
				HttpResponse.json(mockBonuses)
				)
		)

		render(
			<Provider store={store}>
				<ScoresheetMoves selectedScoresheet="test-id" />
			</Provider>
		)

		// Wait for loading state to disappear
		await waitFor(() => {
			expect(
				screen.queryByTestId("loading-skeleton")
			).not.toBeInTheDocument()
		})

		// Add a new bonus type
		const bonusInput = screen.getByLabelText("Add New Bonus")
		const user = userEvent.setup()
		await user.type(bonusInput, "New Bonus{enter}")

		// Verify the new bonus appears in the header
		const newBonusText = screen.getByText(
			(content, element) =>
				element?.tagName.toLowerCase() === "p" &&
				content === "New Bonus"
		)
		expect(newBonusText).toBeInTheDocument()

		// Verify a new bonus input field appears for the existing move with default score of 0
		const newBonusInputs = screen.getAllByDisplayValue("0")
		// The last input should be our new bonus input
		const newBonusInput = newBonusInputs[newBonusInputs.length - 1]
		expect(newBonusInput).toBeInTheDocument()

		// Verify error toast is shown if we try to add the same bonus again
		await user.type(bonusInput, "New Bonus{enter}")
		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Bonus already exists")
		})
	})
})
