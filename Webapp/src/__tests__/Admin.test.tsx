import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import Admin from "../pages/Admin"
import { setupStore } from "../redux/store"

describe("Admin Page", () => {
	it("renders main components", () => {
		render(
			<Provider store={setupStore()}>
				<Admin />
			</Provider>
		)

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
