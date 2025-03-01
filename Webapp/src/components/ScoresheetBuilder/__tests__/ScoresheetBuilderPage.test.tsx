import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import { ScoresheetBuilder } from "../ScoresheetBuilderPage"

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

describe("ScoresheetBuilderPage", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
	})

	it("shows initial empty state message when no scoresheet is selected", () => {
		render(
			<Provider store={store}>
				<ScoresheetBuilder />
			</Provider>
		)

		expect(
			screen.getByText(
				"Select an existing scoresheet or make a new one to start building!"
			)
		).toBeInTheDocument()
	})

	it("renders ScoresheetMoves when a scoresheet is selected", async () => {
		// Mock the scoresheets API response
		server.use(
			rest.get("/api/scoresheet", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "test-id",
							name: "Test Scoresheet"
						}
					])
				)
			)
		)

		render(
			<Provider store={store}>
				<ScoresheetBuilder />
			</Provider>
		)

		// Wait for the Autocomplete to be loaded
		const combobox = await screen.findByRole("combobox")

		// Click the combobox to open options
		const user = userEvent.setup()
		await user.click(combobox)

		// Click the option
		const option = await screen.findByText("Test Scoresheet")
		await user.click(option)

		// Verify ScoresheetMoves is rendered
		expect(
			screen.queryByText(
				"Select an existing scoresheet or make a new one to start building!"
			)
		).not.toBeInTheDocument()
	})

	it("updates selected scoresheet when a new scoresheet is added", async () => {
		// Mock API responses
		const mockScoresheet = {
			id: "test-id",
			name: "Test Scoresheet"
		}

		let isCreated = false

		server.use(
			rest.get("/api/scoresheet", (req, res, ctx) =>
				res(ctx.json(isCreated ? [mockScoresheet] : []))
			),
			rest.post("/api/scoresheet", async (req, res, ctx) => {
				isCreated = true

				return res(ctx.json({ success: true }))
			})
		)

		render(
			<Provider store={store}>
				<ScoresheetBuilder />
			</Provider>
		)

		// Find the textfield and enter a new scoresheet name
		const textField = screen.getByRole("textbox", {
			name: "New Scoresheet"
		})
		const user = userEvent.setup()
		await user.type(textField, "Test Scoresheet{enter}")

		// Wait for the scoresheet to be created and loaded
		await screen.findByRole("combobox")

		// Wait for ScoresheetMoves to be rendered
		await screen.findByLabelText("Add New Bonus")
	})
})
