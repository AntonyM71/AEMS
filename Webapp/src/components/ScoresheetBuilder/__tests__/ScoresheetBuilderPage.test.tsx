import { configureStore } from "@reduxjs/toolkit"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse, delay } from "msw"
import Router from "next/router"
import { server } from "../../../mocks/server"
import { competitionsReducer } from "../../../redux/atoms/competitions"
import { aemsApi } from "../../../redux/services/aemsApi"
import { ScoresheetBuilder } from "../ScoresheetBuilderPage"
import { renderWithProviders } from "../../../testUtils"

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
		renderWithProviders(<ScoresheetBuilder />, { store })

		expect(
			screen.getByText(
				"Select an existing scoresheet or make a new one to start building!"
			)
		).toBeInTheDocument()
	})

	it("renders ScoresheetMoves when a scoresheet is selected", async () => {
		// Mock the scoresheets API response
		server.use(
			http.get("/api/scoresheet", () =>
				HttpResponse.json([
					{
						id: "test-id",
						name: "Test Scoresheet"
					}
				])
			)
		)

		renderWithProviders(<ScoresheetBuilder />, { store })

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
			http.get("/api/scoresheet", () =>
				HttpResponse.json(isCreated ? [mockScoresheet] : [])
			),
			http.post("/api/scoresheet", () => {
				isCreated = true

				return HttpResponse.json({ success: true })
			})
		)

		renderWithProviders(<ScoresheetBuilder />, { store })

		// Find the textfield and enter a new scoresheet name
		const textField = screen.getByRole("textbox", {
			name: "New Scoresheet"
		})
		const user = userEvent.setup()
		await user.type(textField, "Test Scoresheet{enter}")

		// Wait for the scoresheet to be created and loaded
		await screen.findByRole("combobox", { name: "Scoresheet" })

		// Wait for ScoresheetMoves to be rendered
		const addBonusButton = await screen.findByLabelText("Add New Bonus")

		// Assert that the ScoresheetMoves component is rendered
		expect(addBonusButton).toBeInTheDocument()
	})

	describe("with unsaved scoresheet edits", () => {
		const confirmSpy = jest.spyOn(window, "confirm")

		beforeEach(() => {
			confirmSpy.mockReset()
			server.use(
				http.get("/api/scoresheet", () =>
					HttpResponse.json([
						{ id: "sheet-a", name: "Sheet A" },
						{ id: "sheet-b", name: "Sheet B" }
					])
				),
				http.get("/api/availablemoves", () =>
					HttpResponse.json([
						{
							id: "move-1",
							sheet_id: "sheet-a",
							name: "Loop",
							fl_score: 10,
							rb_score: 10,
							direction: "LR"
						}
					])
				),
				http.get("/api/availablebonuses", () => HttpResponse.json([]))
			)
		})

		afterAll(() => confirmSpy.mockRestore())

		const user = userEvent.setup()

		const selectScoresheet = async (name: string) => {
			await user.click(
				screen.getByRole("combobox", { name: "Scoresheet" })
			)
			await user.click(await screen.findByText(name))
		}

		const openSheetA = async (withEdit: boolean) => {
			renderWithProviders(<ScoresheetBuilder />, { store })
			await screen.findByRole("combobox", { name: "Scoresheet" })
			await selectScoresheet("Sheet A")
			const moveName = await screen.findByDisplayValue("Loop")
			if (withEdit) {
				await user.type(moveName, " Edited")
				await screen.findByText(/unsaved changes/i)
			}
		}

		const scoresheetCombobox = () =>
			screen.getByRole("combobox", { name: "Scoresheet" })

		const dispatchBeforeUnload = () => {
			const event = new Event("beforeunload", { cancelable: true })
			window.dispatchEvent(event)

			return event
		}

		it("keeps the current scoresheet and its edits when the switch is cancelled", async () => {
			await openSheetA(true)
			confirmSpy.mockReturnValue(false)

			await selectScoresheet("Sheet B")

			expect(confirmSpy).toHaveBeenCalledTimes(1)
			expect(scoresheetCombobox()).toHaveValue("Sheet A")
			expect(screen.getByDisplayValue("Loop Edited")).toBeInTheDocument()
		})

		it("switches scoresheet when the operator confirms", async () => {
			await openSheetA(true)
			confirmSpy.mockReturnValue(true)

			await selectScoresheet("Sheet B")

			expect(scoresheetCombobox()).toHaveValue("Sheet B")
		})

		it("switches without asking when there are no edits", async () => {
			await openSheetA(false)

			await selectScoresheet("Sheet B")

			expect(confirmSpy).not.toHaveBeenCalled()
			expect(scoresheetCombobox()).toHaveValue("Sheet B")
		})

		it("blocks a page unload only while edits are unsaved", async () => {
			await openSheetA(false)
			expect(dispatchBeforeUnload().defaultPrevented).toBe(false)

			await user.type(screen.getByDisplayValue("Loop"), " Edited")
			await screen.findByText(/unsaved changes/i)

			expect(dispatchBeforeUnload().defaultPrevented).toBe(true)
		})

		it("asks before switching to a new scoresheet when edits were made while it was being created", async () => {
			server.use(
				http.post("/api/scoresheet", async () => {
					await delay(300)

					return HttpResponse.json({ success: true })
				})
			)
			await openSheetA(false)
			confirmSpy.mockReturnValue(false)

			await user.type(
				screen.getByRole("textbox", { name: "New Scoresheet" }),
				"Brand New{enter}"
			)
			await user.type(screen.getByDisplayValue("Loop"), " Edited")
			await screen.findByText(/unsaved changes/i)

			await waitFor(() => expect(confirmSpy).toHaveBeenCalledTimes(1))
			expect(scoresheetCombobox()).toHaveValue("Sheet A")
			expect(screen.getByDisplayValue("Loop Edited")).toBeInTheDocument()
		})

		it("aborts in-app navigation when the operator cancels", async () => {
			await openSheetA(true)
			confirmSpy.mockReturnValue(false)

			expect(() =>
				Router.events.emit("routeChangeStart", "/Judging", {
					shallow: false
				})
			).toThrow(/unsaved scoresheet changes/)
		})

		it("allows in-app navigation when the operator confirms", async () => {
			await openSheetA(true)
			confirmSpy.mockReturnValue(true)

			expect(() =>
				Router.events.emit("routeChangeStart", "/Judging", {
					shallow: false
				})
			).not.toThrow()
		})
	})
})
