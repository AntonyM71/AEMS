import { configureStore } from "@reduxjs/toolkit"
import { render, screen } from "@testing-library/react"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import EventSelector from "../EventSelector"

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

		expect(screen.queryByText("Select Event")).not.toBeInTheDocument()
		expect(screen.queryByRole("combobox")).not.toBeInTheDocument()
	})

	it("shows loading state when fetching events", () => {
		// Set a selected competition in the store
		store.dispatch({
			type: "competitions/updateSelectedCompetition",
			payload: "comp-1"
		})

		// Use MSW to delay the response
		server.use(
			rest.get("/api/event/competition/:id/event", (req, res, ctx) =>
				res(ctx.delay(100), ctx.json([]))
			)
		)

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument()
	})

	it("shows 'No Events' message when competition has no events", async () => {
		// Set a selected competition in the store
		store.dispatch({
			type: "competitions/updateSelectedCompetition",
			payload: "comp-1"
		})

		// Mock empty events response
		server.use(
			rest.get("/api/event/competition/:id/event", (req, res, ctx) =>
				res(ctx.json([]))
			)
		)

		render(
			<Provider store={store}>
				<EventSelector />
			</Provider>
		)

		const noEventsText = await screen.findByRole("heading", {
			name: /no events in competition/i
		})
		expect(noEventsText).toBeInTheDocument()
	})
})
