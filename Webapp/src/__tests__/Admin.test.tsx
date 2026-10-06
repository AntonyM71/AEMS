import { screen } from "@testing-library/react"
import Admin from "../pages/Admin"
import { renderWithProviders } from "../testUtils"

describe("Admin Page", () => {
	it("renders main components", () => {
		renderWithProviders(<Admin />)

		// Check for main accordion sections
		expect(
			screen.getByText("Manage Competition Structure")
		).toBeInTheDocument()
		expect(screen.getByText("Manage Paddlers in Heat")).toBeInTheDocument()
		expect(
			screen.getByText("Promote top Athletes to next Phase")
		).toBeInTheDocument()
		expect(screen.getByText("Create Many Heat PDFs")).toBeInTheDocument()
		expect(screen.getByText("Create Phase Result PDFs")).toBeInTheDocument()
	})
})
