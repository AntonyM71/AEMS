import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { Toaster, toast } from "react-hot-toast"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import CompetitionSelector from "../CompetitionSelector"

interface Competition {
	id: string
	name: string
}

interface RootState {
	competitions: {
		selectedCompetition: string
		selectedPhase: string
		selectedHeat: string
		numberOfRuns: number
		selectedEvent: string
	}
	[aemsApi.reducerPath]: ReturnType<typeof aemsApi.reducer>
}

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

describe("CompetitionSelector", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
		jest.clearAllMocks()
	})

	afterEach(() => {
		jest.resetAllMocks()
	})

	it("shows loading state", () => {
		// Use MSW to delay the response to show loading state
		server.use(
			rest.get("/api/competition", (req, res, ctx) =>
				res(ctx.delay(100), ctx.json([]))
			)
		)

		render(
			<Provider store={store}>
				<Toaster />
				<CompetitionSelector />
			</Provider>
		)

		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()
	})

	it("shows competition list when data is loaded", async () => {
		const mockCompetitions = [
			{ id: "1", name: "Competition 1" },
			{ id: "2", name: "Competition 2" }
		]

		// Use MSW to return mock data
		server.use(
			rest.get("/api/competition", (req, res, ctx) =>
				res(ctx.json(mockCompetitions))
			)
		)

		render(
			<Provider store={store}>
				<CompetitionSelector />
			</Provider>
		)

		// Wait for loading state to disappear
		await waitFor(() => !screen.queryByTestId("loading-skeleton"))

		const selectElement = await screen.findByRole("combobox")

		// Open the select dropdown
		fireEvent.mouseDown(selectElement)

		// Wait for options to be rendered
		await screen.findByText("Competition 1")
		await screen.findByText("Competition 2")
	})

	it("updates selected competition when user selects an option", async () => {
		const mockCompetitions = [
			{ id: "1", name: "Competition 1" },
			{ id: "2", name: "Competition 2" }
		]

		// Use MSW to return mock data
		server.use(
			rest.get("/api/competition", (req, res, ctx) =>
				res(ctx.json(mockCompetitions))
			)
		)

		render(
			<Provider store={store}>
				<CompetitionSelector />
			</Provider>
		)

		// Wait for loading state to disappear
		await waitFor(() => !screen.queryByTestId("loading-skeleton"))

		const selectElement = await screen.findByRole("combobox")

		// Open the select dropdown
		fireEvent.mouseDown(selectElement)

		// Wait for first competition to be available and click it
		const option = await screen.findByText("Competition 1")
		fireEvent.click(option)

		// Verify the redux state was updated
		await waitFor(() => {
			const state = store.getState()
			expect(state.competitions.selectedCompetition).toBe("1")
		})
	})

	it("shows detailed view when showDetailed prop is true", async () => {
		const mockCompetitions = [{ id: "1", name: "Competition 1" }]

		server.use(
			rest.get("/api/competition", (req, res, ctx) =>
				res(ctx.json(mockCompetitions))
			)
		)

		render(
			<Provider store={store}>
				<CompetitionSelector showDetailed={true} />
			</Provider>
		)

		await waitFor(() => !screen.queryByTestId("loading-skeleton"))

		await screen.findByText(/select a competition/i)
		expect(screen.getByText("Add New Competition")).toBeInTheDocument()
	})

	it("shows 'No Competitions' state when data is empty", async () => {
		server.use(
			rest.get("/api/competition", (req, res, ctx) => res(ctx.json([])))
		)

		render(
			<Provider store={store}>
				<CompetitionSelector />
			</Provider>
		)

		// Wait for loading state to disappear
		await waitFor(
			() => {
				expect(
					screen.queryByTestId("loading-skeleton")
				).not.toBeInTheDocument()
			},
			{ timeout: 3000 }
		)

		// Find the No Competitions text
		const noCompText = await screen.findByText("No Competitions")
		expect(noCompText).toBeInTheDocument()
		expect(noCompText.tagName).toBe("H4")
	})

	describe("AddCompetition", () => {
		it("shows error toast when submitting empty competition name", async () => {
			server.use(
				rest.get("/api/competition", (req, res, ctx) =>
					res(ctx.json([]))
				)
			)

			render(
				<Provider store={store}>
					<Toaster />
					<CompetitionSelector showDetailed={true} />
				</Provider>
			)

			await waitFor(() => !screen.queryByTestId("loading-skeleton"))

			// Try submitting with empty name
			const input = await screen.findByLabelText("New Competition")
			fireEvent.keyUp(input, { key: "Enter" })

			// Verify error toast was called
			expect(toast.error).toHaveBeenCalledWith(
				"Please add a name before submitting a new competition"
			)

			// Verify input remains empty
			expect(input).toHaveValue("")
		})

		it("submits new competition and refetches list", async () => {
			let postCalled = false
			let refetchCalled = false
			const mockCompetitions = [{ id: "1", name: "Existing Competition" }]

			server.use(
				rest.get("/api/competition", (req, res, ctx) => {
					if (!refetchCalled) {
						refetchCalled = true

						return res(ctx.json(mockCompetitions))
					}

					return res(
						ctx.json([
							...mockCompetitions,
							{ id: "2", name: "Test Competition" }
						])
					)
				}),
				rest.post("/api/competition", async (req, res, ctx) => {
					postCalled = true
					const postedCompetition = await req.json()
					expect(postedCompetition[0].name).toBe("Test Competition")
					expect(postedCompetition[0].id).toBeTruthy()

					return res(ctx.json(postedCompetition))
				})
			)

			render(
				<Provider store={store}>
					<Toaster />
					<CompetitionSelector showDetailed={true} />
				</Provider>
			)

			await waitFor(() => !screen.queryByTestId("loading-skeleton"))

			// Submit new competition
			const input = await screen.findByLabelText("New Competition")
			fireEvent.change(input, { target: { value: "Test Competition" } })
			fireEvent.keyUp(input, { key: "Enter" })

			// Verify post was called and wait for refetch
			await waitFor(() => expect(postCalled).toBe(true))

			// Open the select to check the new options
			const selectElement = await screen.findByRole("combobox")
			fireEvent.mouseDown(selectElement)

			// Wait for and verify the new competition is shown
			await screen.findByText("Existing Competition")
			await screen.findByText("Test Competition")

			// Verify input was cleared
			await waitFor(() => {
				expect(input).toHaveValue("")
			})
		})
	})
})
