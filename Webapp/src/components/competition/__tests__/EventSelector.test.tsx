import { configureStore } from "@reduxjs/toolkit"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
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

	it("shows loading state when fetching events", async () => {
		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		// Wait for the loading state to be rendered
		const skeleton = await screen.findByTestId("skeleton")
		expect(skeleton).toBeInTheDocument()
	})

	it("shows events when they are loaded", async () => {
		const user = userEvent.setup()
		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		// Wait for loading state to finish and component to be ready
		await screen.findByText("Select Event")

		// Find and click the select element by its class
		const selectElement = screen.getByRole("combobox")
		await user.click(selectElement)

		// Wait for and verify options
		const listbox = await screen.findByRole("listbox")
		const options = within(listbox).getAllByRole("option")

		expect(options).toHaveLength(2)
		expect(options[0]).toHaveTextContent("Event 1")
		expect(options[1]).toHaveTextContent("Event 2")
	})

	it("shows no events message when competition has no events", async () => {
		server.use(
			http.get("/api/competition/:id/event", () =>
				HttpResponse.json([])
			)
		)

		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		// Wait for loading to finish and check for no events message
		expect(
			await screen.findByText(/No Events in competition/i)
		).toBeInTheDocument()
	})

	it("allows selecting an event", async () => {
		const user = userEvent.setup()
		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		// Wait for loading state to finish and component to be ready
		await screen.findByText("Select Event")

		// Find and click the select element
		const selectElement = screen.getByRole("combobox")
		await user.click(selectElement)

		// Find and click the first option
		const listbox = await screen.findByRole("listbox")
		const option = within(listbox).getByText("Event 1")
		await user.click(option)

		// Verify the Redux store was updated
		expect(store.getState().competitions.selectedEvent).toBe("event-1")
	})
})
