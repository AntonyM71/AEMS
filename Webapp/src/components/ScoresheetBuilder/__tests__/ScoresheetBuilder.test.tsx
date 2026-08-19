import { configureStore } from "@reduxjs/toolkit"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
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
	display_order?: number
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

const renderScoresheet = (store: ReturnType<typeof createTestStore>) =>
	render(
		<Provider store={store}>
			<Toaster />
			<ScoresheetMoves selectedScoresheet="test-id" />
		</Provider>
	)

const waitForScoresheetToLoad = async (timeout?: number) => {
	await waitFor(() => {
		expect(screen.queryByTestId("loading-skeleton")).not.toBeInTheDocument()
	}, timeout ? { timeout } : undefined)
}

const buildMove = (
	id: string,
	name: string,
	fl_score: number,
	rb_score: number,
	direction: AvailableMoves["direction"]
): AvailableMoves => ({
	id,
	sheet_id: "test-id",
	name,
	fl_score,
	rb_score,
	direction
})

const createTwoMoves = (): AvailableMoves[] => [
	buildMove("1", "First Move", 10, 20, "LR"),
	buildMove("2", "Second Move", 30, 40, "FB")
]

const createThreeMoves = (): AvailableMoves[] => [
	...createTwoMoves(),
	buildMove("3", "Third Move", 50, 60, "FB")
]

const getOrderedMoveNames = () =>
	screen
		.getAllByRole("textbox", {
			name: "Name"
		})
		.map((input) => (input instanceof HTMLInputElement ? input.value : ""))
		.filter((value) => Boolean(value))

const useScoresheetHandlers = ({
	moves = mockMoves,
	bonuses = mockBonuses,
	onSubmit
}: {
	moves?: AvailableMoves[]
	bonuses?: AvailableBonuses[]
	onSubmit?: (body: Record<string, any>) => void | Promise<void>
} = {}) => {
	const handlers = [
		http.get("/api/availablemoves", () => HttpResponse.json(moves)),
		http.get("/api/availablebonuses", () => HttpResponse.json(bonuses))
	]

	if (onSubmit) {
		handlers.push(
			http.post("/api/addUpdateScoresheet/:id", async ({ request }) => {
				await onSubmit((await request.json()) as Record<string, any>)

				return HttpResponse.json({ success: true })
			})
		)
	}

	server.use(...handlers)
}

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

		renderScoresheet(store)

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

		renderScoresheet(store)

		await waitForScoresheetToLoad(1000)

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

		renderScoresheet(store)

		await waitForScoresheetToLoad(1000)

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
			http.get("/api/availablemoves", () => HttpResponse.json(mockMoves)),
			http.get("/api/availablebonuses", () =>
				HttpResponse.json(mockBonuses)
			),
			http.post("/api/addUpdateScoresheet/:id", async ({ request }) => {
				updateCalled = true

				const body = (await request.json()) as Record<string, any>
				expect(body.moves).toEqual([
					{
						...mockMoves[0],
						display_order: 0
					}
				])
				expect(body.bonuses).toEqual([
					{
						...mockBonuses[0],
						display_order: 0
					}
				])

				return HttpResponse.json({ success: true })
			})
		)

		renderScoresheet(store)

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

	it("shows an error toast, and no success toast, when the update fails", async () => {
		server.use(
			http.get("/api/availablemoves", () => HttpResponse.json(mockMoves)),
			http.get("/api/availablebonuses", () =>
				HttpResponse.json(mockBonuses)
			),
			http.post("/api/addUpdateScoresheet/:id", () =>
				HttpResponse.json({ detail: "boom" }, { status: 500 })
			)
		)

		renderScoresheet(store)

		const updateButton = await screen.findByRole("button", {
			name: "Update Scoresheet"
		})
		fireEvent.click(updateButton)

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith(
				"Failed to update scoresheet"
			)
		})
		expect(toast.success).not.toHaveBeenCalled()
	})

	it("updates move display order when a move is reordered", async () => {
		useScoresheetHandlers({ moves: createTwoMoves(), bonuses: [] })

		renderScoresheet(store)
		await waitForScoresheetToLoad()

		const moveDownButtons = screen.getAllByTestId("move-down-button")
		fireEvent.click(moveDownButtons[0])

		expect(getOrderedMoveNames().slice(0, 2)).toEqual([
			"Second Move",
			"First Move"
		])

		expect(screen.getByTestId("move-row-1")).toHaveAttribute(
			"data-highlighted",
			"true"
		)
		expect(screen.getByTestId("move-row-2")).toHaveAttribute(
			"data-highlighted",
			"true"
		)

		await waitFor(
			() => {
				expect(screen.getByTestId("move-row-1")).toHaveAttribute(
					"data-highlighted",
					"false"
				)
			},
			{ timeout: 2000 }
		)
		expect(screen.getByTestId("move-row-2")).toHaveAttribute(
			"data-highlighted",
			"false"
		)
	})

	it("moves a move up and highlights both swapped rows", async () => {
		useScoresheetHandlers({ moves: createTwoMoves(), bonuses: [] })

		renderScoresheet(store)
		await waitForScoresheetToLoad()

		// The first move can't move up, and the last can't move down
		expect(screen.getAllByTestId("move-up-button")[0]).toBeDisabled()
		expect(screen.getAllByTestId("move-down-button")[1]).toBeDisabled()

		const moveUpButtons = screen.getAllByTestId("move-up-button")
		fireEvent.click(moveUpButtons[1])

		expect(getOrderedMoveNames().slice(0, 2)).toEqual([
			"Second Move",
			"First Move"
		])
		expect(screen.getByTestId("move-row-1")).toHaveAttribute(
			"data-highlighted",
			"true"
		)
		expect(screen.getByTestId("move-row-2")).toHaveAttribute(
			"data-highlighted",
			"true"
		)
	})

	it("does not let a stale highlight timer wipe out a second reorder's highlight early", async () => {
		useScoresheetHandlers({ moves: createThreeMoves(), bonuses: [] })

		renderScoresheet(store)
		await waitForScoresheetToLoad()

		// Fake timers only from here: the data-loading wait above needs real
		// timers to work with MSW, but the highlight window itself needs
		// exact, deterministic timing rather than a wall-clock race.
		jest.useFakeTimers()
		try {
			// Swap moves 1 and 2 down (highlights 1 & 2, clearing at t+500ms).
			fireEvent.click(screen.getAllByTestId("move-down-button")[0])

			// Shortly after, swap the (now second) move down again, against
			// move 3, before the first swap's highlight has cleared. This
			// should both replace the highlighted set (1 & 2 -> 1 & 3) and
			// cancel the first swap's pending clear timer, rather than
			// leaving that timer to fire later and wipe out the second
			// swap's highlight early.
			act(() => {
				jest.advanceTimersByTime(100)
			})
			fireEvent.click(screen.getAllByTestId("move-down-button")[1])

			expect(screen.getByTestId("move-row-1")).toHaveAttribute(
				"data-highlighted",
				"true"
			)
			expect(screen.getByTestId("move-row-2")).toHaveAttribute(
				"data-highlighted",
				"false"
			)
			expect(screen.getByTestId("move-row-3")).toHaveAttribute(
				"data-highlighted",
				"true"
			)

			// Advance past the point where the first swap's (uncancelled)
			// timer would have fired - t+500ms after the first click, i.e.
			// 400ms from here - but before the second swap's own timer,
			// which fires 500ms after the second click.
			act(() => {
				jest.advanceTimersByTime(420)
			})

			expect(screen.getByTestId("move-row-1")).toHaveAttribute(
				"data-highlighted",
				"true"
			)
			expect(screen.getByTestId("move-row-3")).toHaveAttribute(
				"data-highlighted",
				"true"
			)

			// Advance past the second swap's own timer
			act(() => {
				jest.advanceTimersByTime(100)
			})

			expect(screen.getByTestId("move-row-1")).toHaveAttribute(
				"data-highlighted",
				"false"
			)
			expect(screen.getByTestId("move-row-3")).toHaveAttribute(
				"data-highlighted",
				"false"
			)
		} finally {
			jest.useRealTimers()
		}
	})

	it("removes a move from the scoresheet on double click, but not on a single click", async () => {
		useScoresheetHandlers({ moves: createTwoMoves(), bonuses: [] })

		renderScoresheet(store)
		await waitForScoresheetToLoad()

		expect(
			await screen.findByDisplayValue("First Move")
		).toBeInTheDocument()
		expect(screen.getByDisplayValue("Second Move")).toBeInTheDocument()

		const deleteButtons = screen.getAllByTestId("delete-button")
		fireEvent.click(deleteButtons[0])

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Double Click to delete")
		})
		// A mis-click alone must not remove the move
		expect(screen.getByDisplayValue("First Move")).toBeInTheDocument()

		fireEvent.doubleClick(deleteButtons[0])

		await waitFor(() => {
			expect(
				screen.queryByDisplayValue("First Move")
			).not.toBeInTheDocument()
		})
		expect(screen.getByDisplayValue("Second Move")).toBeInTheDocument()
	})

	it("deletes a bonus type from all moves", async () => {
		useScoresheetHandlers()

		renderScoresheet(store)
		await waitForScoresheetToLoad()

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
		useScoresheetHandlers()

		renderScoresheet(store)
		await waitForScoresheetToLoad()

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

	it("adds a new move to the scoresheet, keeping existing moves in place", async () => {
		useScoresheetHandlers()

		renderScoresheet(store)
		await waitForScoresheetToLoad()

		// Before adding, only the existing move and the "add move" row itself
		// have a "Test Bonus" score field
		expect(screen.getAllByTestId("test bonus-field")).toHaveLength(2)

		// The "add move" row is the last "Name" field on the page
		const user = userEvent.setup()
		const nameInputsBefore = screen.getAllByLabelText("Name")
		expect(nameInputsBefore).toHaveLength(2)
		await user.type(nameInputsBefore[1], "New Move")

		await user.click(screen.getByRole("button", { name: "Add" }))

		// The existing move is untouched, and the new move now has its own row
		expect(screen.getByDisplayValue("Test Move")).toBeInTheDocument()
		expect(await screen.findByDisplayValue("New Move")).toBeInTheDocument()

		// The add-move row resets back to empty, ready for the next move
		const nameInputsAfter = screen.getAllByLabelText("Name")
		expect(nameInputsAfter).toHaveLength(3)
		expect(nameInputsAfter[2]).toHaveValue("")

		// The new move got its own "Test Bonus" score field, on top of the
		// existing move's and the reset add-move row's
		expect(screen.getAllByTestId("test bonus-field")).toHaveLength(3)
	})

	it("removes a deleted move's bonuses from the submitted scoresheet", async () => {
		const twoMoves = createTwoMoves()
		const bonusesForBothMoves: AvailableBonuses[] = [
			{
				id: "bonus-1",
				sheet_id: "test-id",
				move_id: "1",
				name: "Air",
				score: 5
			},
			{
				id: "bonus-2",
				sheet_id: "test-id",
				move_id: "2",
				name: "Air",
				score: 7
			}
		]

		let submittedBonuses: AvailableBonuses[] = []

		useScoresheetHandlers({
			moves: twoMoves,
			bonuses: bonusesForBothMoves,
			onSubmit: (body) => {
				submittedBonuses = body.bonuses as AvailableBonuses[]
			}
		})

		renderScoresheet(store)
		await waitForScoresheetToLoad()

		expect(
			await screen.findByDisplayValue("First Move")
		).toBeInTheDocument()

		// Double click deletes; a single click alone must not
		const deleteButtons = screen.getAllByTestId("delete-button")
		fireEvent.doubleClick(deleteButtons[0])

		await waitFor(() => {
			expect(
				screen.queryByDisplayValue("First Move")
			).not.toBeInTheDocument()
		})
		expect(screen.getByDisplayValue("Second Move")).toBeInTheDocument()

		fireEvent.click(
			screen.getByRole("button", { name: "Update Scoresheet" })
		)

		await waitFor(() => {
			expect(toast.success).toHaveBeenCalled()
		})

		// Only the remaining move's bonus should be submitted - the deleted
		// move's bonus must not linger in the payload
		expect(submittedBonuses).toHaveLength(1)
		expect(submittedBonuses[0].move_id).toBe("2")
	})
})
