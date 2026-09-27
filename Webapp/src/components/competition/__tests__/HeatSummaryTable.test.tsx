import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { toast } from "react-hot-toast"
import { server } from "../../../mocks/server"
import { renderWithProviders } from "../../../testUtils"
import {
	AddAthletesToHeat,
	EditAthleteDialog,
	HeatAthleteTable,
	HeatSummaryTable
} from "../HeatSummaryTable"

const defaultCompetitionsState = {
	selectedHeat: "1",
	selectedCompetition: "1",
	selectedPhase: "1",
	selectedEvent: "1",
	numberOfRuns: 2
}

const renderWithHeatSelected = (
	ui: React.ReactElement
): ReturnType<typeof renderWithProviders> =>
	renderWithProviders(ui, {
		preloadedState: { competitions: defaultCompetitionsState }
	})

// Mocks the endpoints an athlete-heat edit submission hits: the heat and
// (single-phase) event lists the dialog loads, and the athlete/athleteheat
// PATCH pair, whose response and captured request body the caller controls.
const mockEditAthleteHeatSubmit = (options: {
	heats: { id: string; name: string }[]
	response: {
		heat_id: string
		phase_id: string
		scores_preserved: boolean | null
	}
}): { body: unknown } => {
	const captured: { body: unknown } = { body: undefined }
	server.use(
		http.get("/api/heat", () => HttpResponse.json(options.heats)),
		http.get("/api/event", () =>
			HttpResponse.json([
				{
					id: "1",
					name: "Test Event",
					phase_foreign: [
						{ id: "1", name: "Test Phase", scoresheet: "sheet-1" }
					]
				}
			])
		),
		http.get("/api/getHeatInfo/:heatId", () => HttpResponse.json([])),
		http.patch("/api/athlete/:id", () => HttpResponse.json({ id: "1" })),
		http.patch("/api/athleteheat/:id", async ({ request }) => {
			captured.body = await request.json()

			return HttpResponse.json({
				id: "1",
				athlete_id: "1",
				...options.response
			})
		})
	)

	return captured
}

describe("HeatSummaryTable", () => {
	beforeEach(() => {
		// Mock URL.createObjectURL
		global.URL.createObjectURL = jest.fn(() => "mock-url")
		server.use(
			// Mock for event API
			http.get("/api/event", () =>
				HttpResponse.json([
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
			),
			// Mock for getting heat details
			http.get("/api/heat/:id", ({ params }) => {
				const { id } = params

				return HttpResponse.json({
					id,
					name: "Test Heat",
					competition_id: "1"
				})
			}),
			// Mock for getting heat info (athletes)
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([
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
			),
			// Mock for PDF downloads
			http.get(
				"/api/heat_results_pdf",
				() =>
					new HttpResponse(
						new Blob(["test"], { type: "application/pdf" })
					)
			),
			http.get(
				"/api/heat_pdf",
				() =>
					new HttpResponse(
						new Blob(["test"], { type: "application/pdf" })
					)
			)
		)
	})

	it("shows loading skeleton when data is being fetched", () => {
		renderWithHeatSelected(<HeatSummaryTable />)

		expect(screen.getByTestId("skeleton")).toBeInTheDocument()
	})

	it("displays heat data and athlete table when loaded", async () => {
		renderWithHeatSelected(<HeatSummaryTable />)

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
		renderWithHeatSelected(<HeatSummaryTable showAddAthletes={true} />)

		// Wait for heat name to appear
		await screen.findByText("Heat: Test Heat")

		// Check for add athletes section
		expect(
			screen.getByText("Add Athlete to Current Heat")
		).toBeInTheDocument()
	})

	it("creates URLs for PDF downloads", async () => {
		// Mock URL.createObjectURL and window.open
		const mockCreateObjectURL = jest.fn(() => "mock-url")
		global.URL.createObjectURL = mockCreateObjectURL
		const mockWindowOpen = jest.fn()
		window.open = mockWindowOpen

		renderWithHeatSelected(<HeatSummaryTable />)

		// Mock window.open to return an object with location
		const mockWindow = { location: { href: "" } }
		mockWindowOpen.mockReturnValue(mockWindow)

		// Wait for buttons to appear
		const resultsButton = await screen.findByText("Heat Results PDF")
		const summaryButton = await screen.findByText("Heat Summary PDF")

		const user = userEvent.setup()

		// Click results button and verify
		await user.click(resultsButton)
		await new Promise((resolve) => setTimeout(resolve, 100))
		expect(mockWindowOpen).toHaveBeenCalled()
		expect(mockWindow.location.href).toBe("mock-url")

		// Click summary button and verify
		await user.click(summaryButton)
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
			http.get("/api/getHeatInfo/:heatId", () =>
				HttpResponse.json([
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
	})

	it("shows admin column in grid when showAdmin is true", async () => {
		renderWithHeatSelected(<HeatAthleteTable showAdmin={true} />)

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
			http.get("/api/event", () =>
				HttpResponse.json([
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
			),
			http.get("/api/heat", () =>
				HttpResponse.json([
					{
						id: "1",
						name: "Test Heat"
					}
				])
			)
		)

		renderWithHeatSelected(
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
		)

		// Check dialog content
		expect(screen.getByText("Edit Athlete")).toBeInTheDocument()
		expect(await screen.findByDisplayValue("John")).toBeInTheDocument()
		expect(await screen.findByDisplayValue("Doe")).toBeInTheDocument()
		expect(await screen.findByDisplayValue("123")).toBeInTheDocument()
	})

	it("shows an info message and reports preserved scores when moving to a heat in the same phase", async () => {
		const athleteHeatUpdate = mockEditAthleteHeatSubmit({
			heats: [
				{ id: "1", name: "Test Heat" },
				{ id: "2", name: "Another Heat" }
			],
			response: { heat_id: "2", phase_id: "1", scores_preserved: true }
		})

		renderWithHeatSelected(
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
		)

		// "Edit Athlete" is ambiguous once the form loads - it's also the
		// submit button's label - so query the dialog heading specifically.
		await screen.findByRole("heading", { name: "Edit Athlete" })

		// No phase change has been made yet, so the phase-only comparison
		// that drives this message reports the move as scores-preserving by
		// default - a heat-only move never changes the scoresheet.
		expect(
			await screen.findByText(/will keep their previously scored moves/)
		).toBeInTheDocument()

		// `data-testid="heat-select"` lands on MUI's outer MuiInputBase-root
		// wrapper, not the inner role="combobox" div that actually opens the
		// menu on click - query within it for that div.
		const heatSelect = screen.getByTestId("heat-select")
		const user = userEvent.setup()
		await user.click(within(heatSelect).getByRole("combobox"))
		await user.click(
			await screen.findByRole("option", { name: "Another Heat" })
		)

		const editButton = screen.getByRole("button", { name: "Edit Athlete" })
		await user.click(editButton)

		await waitFor(() =>
			expect(toast.success).toHaveBeenCalledWith("Updated Athlete")
		)
		expect(toast.success).toHaveBeenCalledWith(
			"Updated Athlete Competition Information - scores preserved"
		)
		expect(athleteHeatUpdate.body).toEqual(
			expect.objectContaining({ heat_id: "2", phase_id: "1" })
		)
	})

	it("shows a warning when the selected phase uses a different scoresheet", async () => {
		server.use(
			http.get("/api/heat", () =>
				HttpResponse.json([{ id: "1", name: "Test Heat" }])
			),
			http.get("/api/event", () =>
				HttpResponse.json([
					{
						id: "1",
						name: "Test Event",
						phase_foreign: [
							{
								id: "1",
								name: "Test Phase",
								scoresheet: "sheet-1"
							},
							{
								id: "2",
								name: "Other Phase",
								scoresheet: "sheet-2"
							}
						]
					}
				])
			),
			http.get("/api/getHeatInfo/:heatId", () => HttpResponse.json([]))
		)

		renderWithHeatSelected(
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
		)

		await screen.findByRole("heading", { name: "Edit Athlete" })
		expect(
			await screen.findByText(/will keep their previously scored moves/)
		).toBeInTheDocument()

		const phaseSelect = screen.getAllByRole("combobox")[0]
		const user = userEvent.setup()
		await user.click(phaseSelect)
		await user.click(
			await screen.findByRole("option", {
				name: "Test Event - Other Phase"
			})
		)

		expect(await screen.findByText(/Warning:/)).toBeInTheDocument()
		expect(
			screen.getByText(
				/will delete their previously scored moves, since it uses a different scoresheet/
			)
		).toBeInTheDocument()
	})

	it("preserves an athlete's last_phase_rank when editing only their bib number", async () => {
		const athleteHeatUpdate = mockEditAthleteHeatSubmit({
			heats: [{ id: "1", name: "Test Heat" }],
			response: { heat_id: "1", phase_id: "1", scores_preserved: null }
		})

		renderWithHeatSelected(
			<EditAthleteDialog
				open={true}
				handleClose={jest.fn()}
				athlete_id="1"
				first_name="John"
				last_name="Doe"
				bib={123}
				phase_id="1"
				athlete_heat_id="1"
				last_phase_rank={3}
			/>
		)

		await screen.findByRole("heading", { name: "Edit Athlete" })
		const bibInput = await screen.findByLabelText("Bib Number")
		const user = userEvent.setup()
		await user.clear(bibInput)
		await user.type(bibInput, "456")

		await user.click(screen.getByRole("button", { name: "Edit Athlete" }))

		await waitFor(() =>
			expect(toast.success).toHaveBeenCalledWith("Updated Athlete")
		)
		expect(athleteHeatUpdate.body).toEqual(
			expect.objectContaining({ last_phase_rank: 3 })
		)
	})
})

describe("AddAthletesToHeat", () => {
	beforeEach(() => {
		server.use(
			http.get("/api/event", () =>
				HttpResponse.json([
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
			),
			http.get("/api/heat", () =>
				HttpResponse.json([
					{
						id: "1",
						name: "Test Heat"
					}
				])
			),
			http.get("/api/getHeatInfo/:heatId", () => HttpResponse.json([])),
			http.post("/api/athlete", () =>
				HttpResponse.json({ message: "Success" })
			),
			http.post("/api/athleteheat", () =>
				HttpResponse.json({ message: "Success" })
			)
		)
	})

	beforeEach(() => {
		// Reset env variable between tests
		process.env.NEXT_PUBLIC_ALLOW_SET_LAST_PHASE_RANK = "false"
	})

	it("validates required fields", async () => {
		renderWithHeatSelected(<AddAthletesToHeat />)

		// Wait for the form to load
		const firstNameInput = await screen.findByLabelText("First Name")
		expect(firstNameInput).toBeInTheDocument()

		// Try to submit without filling required fields
		const addButton = screen.getByText("Add Athlete")
		const user = userEvent.setup()
		await user.click(addButton)

		// Verify error toast was called
		expect(toast.error).toHaveBeenCalledWith(
			"Please fill in all the fields"
		)
	})

	it("shows last phase rank field when enabled", async () => {
		process.env.NEXT_PUBLIC_ALLOW_SET_LAST_PHASE_RANK = "true"

		renderWithHeatSelected(<AddAthletesToHeat />)

		// Wait for the form to load
		const firstNameInput = await screen.findByLabelText("First Name")
		expect(firstNameInput).toBeInTheDocument()

		// Verify last phase rank field is visible
		expect(screen.getByLabelText("Last Phase Rank")).toBeInTheDocument()
	})

	it("hides last phase rank field when disabled", async () => {
		process.env.NEXT_PUBLIC_ALLOW_SET_LAST_PHASE_RANK = "false"

		renderWithHeatSelected(<AddAthletesToHeat />)

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
			http.post("/api/athlete", () =>
				HttpResponse.json({ data: [{ id: "1" }] })
			),
			http.post("/api/athleteheat", () =>
				HttpResponse.json({ data: [{ id: "1" }] })
			)
		)

		renderWithHeatSelected(<AddAthletesToHeat />)

		// Wait for form to load
		const firstNameInput = await screen.findByLabelText("First Name")
		const lastNameInput = screen.getByLabelText("Last Name")
		const bibInput = screen.getByLabelText("Bib Number")
		const phaseSelect = screen.getByRole("combobox")
		const addButton = screen.getByText("Add Athlete")

		// Fill in form
		const user = userEvent.setup()
		await user.type(firstNameInput, "John")
		await user.type(lastNameInput, "Doe")
		await user.type(bibInput, "123")
		await user.click(phaseSelect)
		const phaseOption = screen.getByText("Test Event - Test Phase")
		await user.click(phaseOption)

		// Submit form
		await user.click(addButton)

		// Verify success toast
		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith("Created Athlete")
		})
		await waitFor(() => {
			expect(toast.success).toHaveBeenCalledWith("Added Athlete to Heat")
		})
	})
})
