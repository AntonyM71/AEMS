import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { toast } from "react-hot-toast"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { setupStore } from "../../../redux/store"
import {
	AddAthletesToHeat,
	EditAthleteDialog,
	HeatAthleteTable,
	HeatSummaryTable
} from "../HeatSummaryTable"

describe("HeatSummaryTable", () => {
	beforeEach(() => {
		// Mock URL.createObjectURL
		global.URL.createObjectURL = jest.fn(() => "mock-url")
		server.use(
			// Mock for event API
			rest.get("/api/event", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "1",
							name: "Test Event",
							phase_foreign: [
								{
									id: "1",
									name: "Test Phase"
								}
							]
						}
					])
				)
			),
			// Mock for getting heat details
			rest.get("/api/heat/:id", (req, res, ctx) => {
				const { id } = req.params

				return res(
					ctx.json({
						id,
						name: "Test Heat",
						competition_id: "1"
					})
				)
			}),
			// Mock for getting heat info (athletes)
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(
					ctx.json([
						{
							athlete_heat_id: "1",
							athlete_id: "1",
							first_name: "John",
							last_name: "Doe",
							bib: 123,
							event_name: "Freestyle",
							phase_id: "1"
						}
					])
				)
			),
			// Mock for PDF downloads
			rest.get("/api/heat_results_pdf", (req, res, ctx) =>
				res(ctx.body(new Blob(["test"], { type: "application/pdf" })))
			),
			rest.get("/api/heat_pdf", (req, res, ctx) =>
				res(ctx.body(new Blob(["test"], { type: "application/pdf" })))
			)
		)
	})

	it("shows loading skeleton when data is being fetched", () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatSummaryTable />
			</Provider>
		)

		expect(screen.getByTestId("skeleton")).toBeInTheDocument()
	})

	it("displays heat data and athlete table when loaded", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatSummaryTable />
			</Provider>
		)

		// Wait for heat name to appear
		expect(await screen.findByText("Heat: Test Heat")).toBeInTheDocument()

		// Check for PDF buttons
		expect(screen.getByText("Heat Results PDF")).toBeInTheDocument()
		expect(screen.getByText("Heat Summary PDF")).toBeInTheDocument()

		// Check athlete table
		const grid = await screen.findByTestId("mock-data-grid")
		expect(grid).toBeInTheDocument()

		// Get the grid props
		const gridProps = JSON.parse(
			grid.getAttribute("data-grid-props") ?? "{}"
		) as {
			columns: { field: string; headerName: string }[]
			rows: {
				id: string
				first_name: string
				last_name: string
				bib: number
				event_name: string
			}[]
		}

		// Verify columns
		expect(gridProps.columns).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					field: "first_name",
					headerName: "First Name"
				}),
				expect.objectContaining({
					field: "last_name",
					headerName: "Last Name"
				}),
				expect.objectContaining({
					field: "bib",
					headerName: "Bib Number"
				}),
				expect.objectContaining({
					field: "event_name",
					headerName: "Event Name"
				})
			])
		)

		// Verify athlete data
		expect(gridProps.rows).toEqual([
			expect.objectContaining({
				first_name: "John",
				last_name: "Doe",
				bib: 123,
				event_name: "Freestyle"
			})
		])
	})

	it("shows add athletes section when showAddAthletes is true", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatSummaryTable showAddAthletes={true} />
			</Provider>
		)

		// Wait for heat name to appear
		await screen.findByText("Heat: Test Heat")

		// Check for add athletes section
		expect(
			screen.getByText("Add Athlete to Current Heat")
		).toBeInTheDocument()
	})

	it("creates URLs for PDF downloads", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		// Mock URL.createObjectURL and window.open
		const mockCreateObjectURL = jest.fn(() => "mock-url")
		global.URL.createObjectURL = mockCreateObjectURL
		const mockWindowOpen = jest.fn()
		window.open = mockWindowOpen

		render(
			<Provider store={store}>
				<HeatSummaryTable />
			</Provider>
		)

		// Mock window.open to return an object with location
		const mockWindow = { location: { href: "" } }
		mockWindowOpen.mockReturnValue(mockWindow)

		// Wait for buttons to appear
		const resultsButton = await screen.findByText("Heat Results PDF")
		const summaryButton = await screen.findByText("Heat Summary PDF")

		// Click results button and verify
		resultsButton.click()
		await new Promise((resolve) => setTimeout(resolve, 100))
		expect(mockWindowOpen).toHaveBeenCalled()
		expect(mockWindow.location.href).toBe("mock-url")

		// Click summary button and verify
		summaryButton.click()
		await new Promise((resolve) => setTimeout(resolve, 100))
		expect(mockWindowOpen).toHaveBeenCalled()
		expect(mockWindow.location.href).toBe("mock-url")

		// Verify both buttons were clicked
		expect(mockWindowOpen).toHaveBeenCalledTimes(2)
	})
})

describe("HeatAthleteTable", () => {
	beforeEach(() => {
		server.use(
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(
					ctx.json([
						{
							athlete_heat_id: "1",
							athlete_id: "1",
							first_name: "John",
							last_name: "Doe",
							bib: 123,
							event_name: "Freestyle",
							phase_id: "1"
						}
					])
				)
			)
		)
	})

	it("shows admin column in grid when showAdmin is true", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<HeatAthleteTable showAdmin={true} />
			</Provider>
		)

		// Wait for data to load
		const grid = await screen.findByTestId("mock-data-grid")
		expect(grid).toBeInTheDocument()

		// Get the grid props
		const gridProps = JSON.parse(
			grid.getAttribute("data-grid-props") ?? "{}"
		) as {
			columns: { field: string; headerName: string }[]
		}

		// Verify admin column exists
		const adminColumn = gridProps.columns.find(
			(col) => col.field === "action"
		)
		expect(adminColumn).toBeDefined()
		expect(adminColumn?.headerName).toBe("Admin")
	})

	it("edit dialog shows athlete info correctly", async () => {
		// Mock event and heat data for the dialog
		server.use(
			rest.get("/api/event", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "1",
							name: "Test Event",
							phase_foreign: [
								{
									id: "1",
									name: "Test Phase"
								}
							]
						}
					])
				)
			),
			rest.get("/api/heat", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "1",
							name: "Test Heat"
						}
					])
				)
			)
		)

		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<EditAthleteDialog
					open={true}
					handleClose={jest.fn()}
					athlete_id="1"
					first_name="John"
					last_name="Doe"
					bib={123}
					phase_id="1"
					athlete_heat_id="1"
				/>
			</Provider>
		)

		// Check dialog content
		expect(screen.getByText("Edit Athlete")).toBeInTheDocument()
		expect(await screen.findByDisplayValue("John")).toBeInTheDocument()
		expect(await screen.findByDisplayValue("Doe")).toBeInTheDocument()
		expect(await screen.findByDisplayValue("123")).toBeInTheDocument()
	})

	it.skip("shows warning and deletes moves when moving athlete to different heat", async () => {
		// Mock endpoints
		server.use(
			rest.get("/api/heat", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "1",
							name: "Test Heat"
						},
						{
							id: "2",
							name: "Another Heat"
						}
					])
				)
			),
			rest.get("/api/event", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "1",
							name: "Test Event",
							phase_foreign: [
								{
									id: "1",
									name: "Test Phase"
								}
							]
						}
					])
				)
			),
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(ctx.json([]))
			),
			rest.patch("/api/athlete/:id", (req, res, ctx) =>
				res(ctx.json({ data: [{ id: "1" }] }))
			),
			rest.patch("/api/athleteheat/:id", (req, res, ctx) =>
				res(ctx.json({ data: [{ id: "1" }] }))
			),
			rest.delete("/api/scoredmoves", (req, res, ctx) =>
				res(ctx.json({ message: "Success" }))
			)
		)

		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<EditAthleteDialog
					open={true}
					handleClose={jest.fn()}
					athlete_id="1"
					first_name="John"
					last_name="Doe"
					bib={123}
					phase_id="1"
					athlete_heat_id="1"
				/>
			</Provider>
		)

		// Wait for dialog to load and check warning is shown
		await screen.findByText("Edit Athlete")
		expect(await screen.findByText(/Warning:/)).toBeInTheDocument()
		expect(
			screen.getByText(
				/Moving an athlete between heats or phases will delete any previously scored moves/
			)
		).toBeInTheDocument()

		// Change heat
		const heatSelect = screen.getByTestId("heat-select")
		fireEvent.mouseDown(heatSelect)

		// Wait for menu items to appear in the portal
		await new Promise((resolve) => setTimeout(resolve, 500))
		const heatOption = await screen.findByText(
			"Another Heat",
			{},
			{ timeout: 2000 }
		)
		fireEvent.click(heatOption)

		// Submit form
		const editButton = screen.getByText("Edit Athlete")
		fireEvent.click(editButton)

		// Wait for async operations
		await new Promise((resolve) => setTimeout(resolve, 100))

		// Verify success toast
		expect(toast.success).toHaveBeenCalledWith("Updated Athlete")
		expect(toast.success).toHaveBeenCalledWith(
			"Updated Athlete Competition Information"
		)
	})
})

describe("AddAthletesToHeat", () => {
	beforeEach(() => {
		server.use(
			rest.get("/api/event", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "1",
							name: "Test Event",
							phase_foreign: [
								{
									id: "1",
									name: "Test Phase"
								}
							]
						}
					])
				)
			),
			rest.get("/api/heat", (req, res, ctx) =>
				res(
					ctx.json([
						{
							id: "1",
							name: "Test Heat"
						}
					])
				)
			),
			rest.get("/api/getHeatInfo/:heatId", (req, res, ctx) =>
				res(ctx.json([]))
			),
			rest.post("/api/athlete", (req, res, ctx) =>
				res(ctx.json({ message: "Success" }))
			),
			rest.post("/api/athleteheat", (req, res, ctx) =>
				res(ctx.json({ message: "Success" }))
			)
		)
	})

	beforeEach(() => {
		// Reset env variable between tests
		process.env.NEXT_PUBLIC_ALLOW_SET_LAST_PHASE_RANK = "false"
	})

	it("validates required fields", async () => {
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<AddAthletesToHeat />
			</Provider>
		)

		// Wait for the form to load
		const firstNameInput = await screen.findByLabelText("First Name")
		expect(firstNameInput).toBeInTheDocument()

		// Try to submit without filling required fields
		const addButton = screen.getByText("Add Athlete")
		fireEvent.click(addButton)

		// Verify error toast was called
		expect(toast.error).toHaveBeenCalledWith(
			"Please fill in all the fields"
		)
	})

	it("shows last phase rank field when enabled", async () => {
		process.env.NEXT_PUBLIC_ALLOW_SET_LAST_PHASE_RANK = "true"

		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<AddAthletesToHeat />
			</Provider>
		)

		// Wait for the form to load
		const firstNameInput = await screen.findByLabelText("First Name")
		expect(firstNameInput).toBeInTheDocument()

		// Verify last phase rank field is visible
		expect(screen.getByLabelText("Last Phase Rank")).toBeInTheDocument()
	})

	it("hides last phase rank field when disabled", async () => {
		process.env.NEXT_PUBLIC_ALLOW_SET_LAST_PHASE_RANK = "false"

		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<AddAthletesToHeat />
			</Provider>
		)

		// Wait for the form to load
		const firstNameInput = await screen.findByLabelText("First Name")
		expect(firstNameInput).toBeInTheDocument()

		// Verify last phase rank field is not visible
		expect(
			screen.queryByLabelText("Last Phase Rank")
		).not.toBeInTheDocument()
	})

	it("creates a new athlete successfully", async () => {
		// Mock mutation endpoints
		server.use(
			rest.post("/api/athlete", (req, res, ctx) =>
				res(ctx.json({ data: [{ id: "1" }] }))
			),
			rest.post("/api/athleteheat", (req, res, ctx) =>
				res(ctx.json({ data: [{ id: "1" }] }))
			)
		)
		const store = setupStore({
			competitions: {
				selectedHeat: "1",
				selectedCompetition: "1",
				selectedPhase: "1",
				selectedEvent: "1",
				numberOfRuns: 2
			}
		})

		render(
			<Provider store={store}>
				<AddAthletesToHeat />
			</Provider>
		)

		// Wait for form to load
		const firstNameInput = await screen.findByLabelText("First Name")
		const lastNameInput = screen.getByLabelText("Last Name")
		const bibInput = screen.getByLabelText("Bib Number")
		const phaseSelect = screen.getByRole("combobox")
		const addButton = screen.getByText("Add Athlete")

		// Fill in form
		fireEvent.change(firstNameInput, { target: { value: "John" } })
		fireEvent.change(lastNameInput, { target: { value: "Doe" } })
		fireEvent.change(bibInput, { target: { value: "123" } })
		fireEvent.mouseDown(phaseSelect)
		const phaseOption = screen.getByText("Test Event - Test Phase")
		fireEvent.click(phaseOption)

		// Submit form
		fireEvent.click(addButton)

		// Verify success toast
		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith("Created Athlete")
		})
		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith("Added Athlete to Heat")
		})
	})
})
