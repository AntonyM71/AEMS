import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { rest } from "msw"
import toast from "react-hot-toast"
import { Provider } from "react-redux"
import { server } from "../../../mocks/server"
import { setupStore } from "../../../redux/store"
import { AddScoresheet } from "../AddScoresheet"

const store = setupStore()

describe("AddScoresheet", () => {
	const mockSetSelectedScoresheet = jest.fn()

	const renderComponent = () =>
		render(
			<Provider store={store}>
				<AddScoresheet
					setSelectedScoresheet={mockSetSelectedScoresheet}
				/>
			</Provider>
		)

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("renders the component", () => {
		renderComponent()
		expect(screen.getByText("Add New Scoresheet")).toBeInTheDocument()
		expect(screen.getByLabelText("New Scoresheet")).toBeInTheDocument()
	})

	it("shows error toast when submitting empty name", () => {
		renderComponent()
		const input = screen.getByLabelText("New Scoresheet")
		fireEvent.keyUp(input, { key: "Enter" })
		expect(toast.error).toHaveBeenCalledWith(
			"Please add a name before submitting a new Scoresheet"
		)
	})

	it("creates new scoresheet when submitting valid name", async () => {
		const newScoresheetName = "Test Scoresheet"

		// Mock successful POST response
		server.use(
			rest.post("/api/scoresheet", async (req, res, ctx) => {
				const body = await req.json()

				return res(ctx.json(body))
			})
		)

		renderComponent()
		const input = screen.getByLabelText("New Scoresheet")
		fireEvent.change(input, { target: { value: newScoresheetName } })
		fireEvent.keyUp(input, { key: "Enter" })

		// Wait for API calls to complete
		await waitFor(() => {
			expect(input).toHaveValue("")
		})
		expect(mockSetSelectedScoresheet).toHaveBeenCalled()
	})
})
