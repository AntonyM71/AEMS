import { configureStore } from "@reduxjs/toolkit"
import { render, screen, waitFor, within } from "@testing-library/react"
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

interface EventPostBody {
	name: string
	id: string
	competition_id: string
}

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
			http.get("/api/competition/:id/event", () => HttpResponse.json([]))
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

	it("adds a new event and shows it in the selector", async () => {
		const user = userEvent.setup()
		const events = [
			{ id: "event-1", name: "Event 1", competition_id: "1" },
			{ id: "event-2", name: "Event 2", competition_id: "1" }
		]
		let postedBody: EventPostBody[] | undefined
		server.use(
			http.get("/api/competition/:competitionPkId/event", () =>
				HttpResponse.json(events)
			),
			http.post("/api/event/", async ({ request }) => {
				postedBody = (await request.json()) as EventPostBody[]
				events.push(postedBody[0])

				return HttpResponse.json(postedBody, { status: 201 })
			})
		)

		store.dispatch(updateSelectedCompetition("1"))

		render(
			<Provider store={store}>
				<EventSelector showDetailed={true} />
			</Provider>
		)

		await screen.findByText("Add New Event")

		await user.type(
			screen.getByRole("textbox", { name: "New event" }),
			"Freestyle Finals"
		)

		const addButton = screen.getByRole("button", { name: "Add Event" })
		await waitFor(() => expect(addButton).toBeEnabled())
		await user.click(addButton)

		await waitFor(() => expect(events).toHaveLength(3))
		expect(postedBody).toEqual([
			expect.objectContaining({
				name: "Freestyle Finals",
				competition_id: "1"
			})
		])
		const selectElement = screen
			.getAllByRole("combobox")
			.find((el) => el.getAttribute("aria-haspopup") === "listbox")
		if (!selectElement) {
			throw new Error("Select Event combobox not found")
		}
		await user.click(selectElement)
		expect(
			await screen.findByRole("option", { name: "Freestyle Finals" })
		).toBeInTheDocument()
	})
})
