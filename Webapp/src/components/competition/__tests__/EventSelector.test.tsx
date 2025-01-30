import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import {
	competitionsReducer,
	updateSelectedCompetition
} from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import EventSelector from "../EventSelector"

// Need to ensure MSW intercepts requests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createTestStore = () =>
	configureStore({
		reducer: {
			[aemsApi.reducerPath]: aemsApi.reducer,
			competitions: competitionsReducer
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(aemsApi.middleware)
	})

describe("EventSelector", () => {
	let store: ReturnType<typeof createTestStore>

	beforeEach(() => {
		store = createTestStore()
	})

	it("renders nothing when no competition is selected", () => {
		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		expect(screen.queryByLabelText("Select Event")).not.toBeInTheDocument()
		expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
	})

	it("shows loading state when fetching events", () => {
		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		expect(screen.getByTestId("skeleton")).toBeInTheDocument()
	})

	it("shows events when they are loaded", async () => {
		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		// First wait for loading state to appear
		expect(screen.getByTestId("skeleton")).toBeInTheDocument()

		// Wait for loading to finish
		await waitFor(() => {
			expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument()
		})

		// Get and click the select
		const select = screen.getByRole("combobox")
		await userEvent.click(select)

		// Verify options
		const listbox = screen.getByRole("listbox")
		const options = within(listbox).getAllByRole("option")
		expect(options).toHaveLength(2)
		expect(options[0]).toHaveTextContent("Event 1")
		expect(options[1]).toHaveTextContent("Event 2")
	})

	it("shows no events message when competition has no events", async () => {
		server.use(
			rest.get("/api/competition/:id/event", (req, res, ctx) =>
				res(ctx.json([]))
			)
		)

		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		// First wait for loading state to appear
		expect(screen.getByTestId("skeleton")).toBeInTheDocument()

		// Wait for loading to finish
		await waitFor(() => {
			expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument()
		})

		// Then check for no events message
		expect(
			await screen.findByText(/No Events in competition/i)
		).toBeInTheDocument()
	})

	it("allows selecting an event", async () => {
		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		// First wait for loading state to appear
		expect(screen.getByTestId("skeleton")).toBeInTheDocument()

		// Wait for loading to finish
		await waitFor(() => {
			expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument()
		})

		// Get and click the select
		const select = screen.getByRole("combobox")
		await userEvent.click(select)

		// Click the first option
		const listbox = screen.getByRole("listbox")
		const option = within(listbox).getByText("Event 1")
		await userEvent.click(option)

		// Verify selection
		expect(store.getState().competitions.selectedEvent).toBe("event-1")
	})
})
