import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { setupStore } from "../../../redux/store"
import HeatSelector from "../HeatSelector"

describe("HeatSelector", () => {
	// Temporarily commenting out other tests to focus on fixing the error test
	it("shows nothing when no competition is selected", () => {
		const store = setupStore({
			competitions: {
				selectedCompetition: "",
				selectedEvent: "",
				selectedPhase: "",
				selectedHeat: "",
				numberOfRuns: 2
			}
		})
		render(
			<Provider store={store}>
				<HeatSelector />
			</Provider>
		)
		// The component should render an empty fragment
		expect(document.body).toHaveTextContent("")
	})
	it("shows loading skeleton when loading heats", async () => {
		// Override the default handler to delay response
		server.use(
			rest.get("/api/heat", (req, res, ctx) =>
				res(ctx.delay(100), ctx.json([]))
			)
		)
		const store = setupStore({
			competitions: {
				selectedCompetition: "1",
				selectedEvent: "",
				selectedPhase: "",
				selectedHeat: "",
				numberOfRuns: 2
			}
		})
		render(
			<Provider store={store}>
				<HeatSelector />
			</Provider>
		)
		// Wait for the skeleton to appear
		const skeleton = await screen.findByTestId("skeleton")
		expect(skeleton).toBeInTheDocument()
	})

	it("shows no heats message and add heat form when competition has no heats", async () => {
		const user = userEvent.setup()
		// Override handlers to return empty heat list and competition data
		server.use(
			rest.get("/api/heat", (_req, res, ctx) => res(ctx.json(null))),
			rest.get("/api/competition", (_req, res, ctx) =>
				res(
					ctx.json([
						{ id: "comp1", name: "Competition 1" },
						{ id: "comp2", name: "Competition 2" }
					])
				)
			)
		)
		const store = setupStore({
			competitions: {
				selectedCompetition: "comp1",
				selectedEvent: "",
				selectedPhase: "",
				selectedHeat: "",
				numberOfRuns: 2
			}
		})
		render(
			<Provider store={store}>
				<HeatSelector showDetailed={true} />
			</Provider>
		)
		// Check for "No Heats" message
		expect(
			await screen.findByText("No Heats in Competition")
		).toBeInTheDocument()
		// Check for Add Heat form elements
		expect(await screen.findByText("Add New Heat")).toBeInTheDocument()
		expect(await screen.findByTestId("new-heat-input")).toBeInTheDocument()
		expect(
			await screen.findByTestId("competition-input")
		).toBeInTheDocument()
		// Add Heat button should be disabled initially
		const addButton = screen.getByTestId("add-heat-button")
		expect(addButton).toBeDisabled()
		// Get the input element and trigger change
		const input = screen.getByRole("textbox", { name: /new heat/i })
		expect(input).toBeInTheDocument()

		// Trigger the change event directly
		await user.clear(input)
		await user.type(input, "Test Heat")

		// Wait for button to be enabled
		await waitFor(() => {
			expect(screen.getByTestId("add-heat-button")).toBeEnabled()
		})
	})
	it("displays heats in select dropdown and allows selection", async () => {
		const user = userEvent.setup()
		// Mock the heat data
		server.use(
			rest.get("/api/heat", (_req, res, ctx) =>
				res(
					ctx.json([
						{ id: "heat-1", name: "Heat 1" },
						{ id: "heat-2", name: "Heat 2" }
					])
				)
			)
		)
		const store = setupStore({
			competitions: {
				selectedCompetition: "1",
				selectedEvent: "",
				selectedPhase: "",
				selectedHeat: "",
				numberOfRuns: 2
			},
			score: {
				selectedPaddler: 1,
				selectedRun: 1,
				scoredMoves: [],
				scoredBonuses: [],
				currentMove: "",
				userRole: ""
			}
		})
		render(
			<Provider store={store}>
				<HeatSelector />
			</Provider>
		)
		// Wait for select component to be loaded
		const select = await screen.findByRole("combobox", {
			name: /select heat/i
		})
		expect(select).toBeInTheDocument()

		// Open the select dropdown
		await user.click(select)

		// Wait for and click Heat 2 option
		const heat2Option = await screen.findByText("Heat 2")
		await user.click(heat2Option)
		// Verify store updates
		await waitFor(() => {
			expect(store.getState().competitions.selectedHeat).toBe("heat-2")
		})
		await waitFor(() => {
			expect(store.getState().score.selectedPaddler).toBe(0)
		})
		await waitFor(() => {
			expect(store.getState().score.selectedRun).toBe(0)
		})
	})
	it("successfully adds a new heat", async () => {
		const user = userEvent.setup()
		let postRequestReceived = false
		let refetchCalled = false
		// Mock the GET and POST endpoints
		server.use(
			rest.get("/api/heat", (_req, res, ctx) => {
				refetchCalled = true

				return res(ctx.json(null))
			}),
			rest.get("/api/competition", (_req, res, ctx) =>
				res(
					ctx.json([
						{ id: "comp1", name: "Competition 1" },
						{ id: "comp2", name: "Competition 2" }
					])
				)
			),
			rest.post("/api/heat", async (_req, res, ctx) => {
				const body = await _req.json()
				if (!Array.isArray(body) || !body.length) {
					return res(ctx.status(400))
				}
				postRequestReceived = true
				expect(body[0]).toMatchObject({
					name: "Test Heat",
					id: expect.any(String),
					competition_id: "comp1"
				})

				return res(ctx.json(body))
			})
		)
		const store = setupStore({
			competitions: {
				selectedCompetition: "comp1",
				selectedEvent: "",
				selectedPhase: "",
				selectedHeat: "",
				numberOfRuns: 2
			}
		})
		render(
			<Provider store={store}>
				<HeatSelector showDetailed={true} />
			</Provider>
		)
		// Wait for form to load and get input element
		const input = await screen.findByRole("textbox", { name: /new heat/i })
		expect(input).toBeInTheDocument()

		// Enter heat name
		await user.clear(input)
		await user.type(input, "Test Heat")

		// Wait for and click submit button
		await waitFor(() => {
			expect(screen.getByTestId("add-heat-button")).toBeEnabled()
		})
		const addButton = screen.getByTestId("add-heat-button")
		await user.click(addButton)

		// Verify the POST request was made and input was cleared
		await waitFor(() => {
			expect(postRequestReceived).toBe(true)
		})
		await waitFor(() => {
			expect(input).toHaveValue("")
		})
		await waitFor(() => {
			expect(refetchCalled).toBe(true)
		})
	})

	it("allows editing an existing heat name", async () => {
		const user = userEvent.setup()
		let patchRequestReceived = false

		const mockHeats = [
			{ id: "heat-1", name: "Heat 1", competition_id: "comp1" },
			{ id: "heat-2", name: "Heat 2", competition_id: "comp1" }
		]

		// Mock the GET and PATCH endpoints
		server.use(
			rest.get("/api/heat", (_req, res, ctx) =>
				res(ctx.json(mockHeats))
			),
			rest.get("/api/heat/:id", (req, res, ctx) =>
				res(ctx.json(mockHeats.find((h) => h.id === req.params.id)))
			),
			rest.get("/api/competition", (_req, res, ctx) =>
				res(
					ctx.json([
						{ id: "comp1", name: "Competition 1" },
						{ id: "comp2", name: "Competition 2" }
					])
				)
			),
			rest.patch("/api/heat/:id", async (req, res, ctx) => {
				const body = await req.json()
				patchRequestReceived = true
				expect(body).toMatchObject({
					name: "Updated Heat 1"
				})

				return res(
					ctx.json({
						id: req.params.id,
						name: body.name,
						competition_id: body.competition_id || "comp1"
					})
				)
			})
		)

		const store = setupStore({
			competitions: {
				selectedCompetition: "comp1",
				selectedEvent: "",
				selectedPhase: "",
				selectedHeat: "heat-1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatSelector showDetailed={true} />
			</Provider>
		)

		// Wait for component to load
		await screen.findByText("Select a Heat")

		// Click edit button
		const editButton = screen.getByLabelText("edit heat")
		await user.click(editButton)

		// Wait for dialog to open and load heat data
		const dialog = await screen.findByRole("dialog")
		expect(dialog).toBeInTheDocument()
		expect(
			within(dialog).getByTestId("edit-heat-dialog-title")
		).toHaveTextContent("Edit Heat")

		// Verify existing heat data is loaded
		const nameInput = within(dialog).getByRole("textbox", {
			name: /new heat/i
		})
		expect(nameInput).toHaveValue("Heat 1")

		// Edit heat name
		await user.clear(nameInput)
		await user.type(nameInput, "Updated Heat 1")

		// Submit changes
		const submitButton = within(dialog).getByTestId("add-heat-button")
		expect(submitButton).toHaveTextContent("Update Heat")
		await user.click(submitButton)

		// Verify the PATCH request was made
		await waitFor(() => {
			expect(patchRequestReceived).toBe(true)
		})
	})
})
