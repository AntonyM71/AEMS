import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { competitionInitialState } from "../../../redux/atoms/competitions"
import { renderWithProviders } from "../../../testUtils"
import { MakeHeatPDFs } from "../MakeHeatPDFs"

const renderMakeHeatPDFs = () =>
	renderWithProviders(<MakeHeatPDFs />, {
		preloadedState: {
			competitions: {
				...competitionInitialState,
				selectedCompetition: "1"
			}
		}
	})

describe("MakeHeatPDFs", () => {
	let requestedHeatIds: string[]

	beforeEach(() => {
		requestedHeatIds = []
		global.URL.createObjectURL = jest.fn(() => "mock-url")
		window.open = jest.fn(() => ({ location: { href: "" } }) as Window)
		server.use(
			http.get("/api/heat", () =>
				HttpResponse.json([
					{ id: "heat-1", name: "Heat 1", competition_id: "1" },
					{ id: "heat-2", name: "Heat 2", competition_id: "1" }
				])
			),
			http.get("/api/heat_pdf", ({ request }) => {
				const url = new URL(request.url)
				requestedHeatIds = url.searchParams.getAll("heat_ids")

				return new HttpResponse(
					new Blob(["test"], { type: "application/pdf" })
				)
			})
		)
	})

	it("disables the download button until a heat is selected", async () => {
		renderMakeHeatPDFs()

		const button = await screen.findByRole("button", {
			name: "Create Summary PDF for selected Heats"
		})
		expect(button).toBeDisabled()
		expect(
			screen.getByText(
				"Please select at least one Heat to make a PDF for."
			)
		).toBeInTheDocument()
	})

	it("lists a checkbox for each heat in the selected competition", async () => {
		renderMakeHeatPDFs()

		expect(await screen.findByText("Heat 1")).toBeInTheDocument()
		expect(screen.getByText("Heat 2")).toBeInTheDocument()
		expect(screen.getAllByRole("checkbox")).toHaveLength(2)
	})

	it("downloads a PDF for only the selected heats", async () => {
		const user = userEvent.setup({ delay: null })
		renderMakeHeatPDFs()

		await screen.findByText("Heat 1")
		const [heat1Checkbox] = screen.getAllByRole("checkbox")
		await user.click(heat1Checkbox)

		const button = screen.getByRole("button", {
			name: "Create Summary PDF for selected Heats"
		})
		expect(button).toBeEnabled()
		await user.click(button)

		await waitFor(() => expect(requestedHeatIds).toEqual(["heat-1"]))
	})

	it("downloads a PDF for every selected heat", async () => {
		const user = userEvent.setup({ delay: null })
		renderMakeHeatPDFs()

		await screen.findByText("Heat 1")
		const [heat1Checkbox, heat2Checkbox] = screen.getAllByRole("checkbox")
		await user.click(heat1Checkbox)
		await user.click(heat2Checkbox)

		const button = screen.getByRole("button", {
			name: "Create Summary PDF for selected Heats"
		})
		await user.click(button)

		await waitFor(() =>
			expect(requestedHeatIds).toEqual(["heat-1", "heat-2"])
		)
	})
})
