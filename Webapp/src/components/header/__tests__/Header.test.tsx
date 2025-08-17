import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { updatePreferDark } from "../../../redux/atoms/utilities"
import Header, { DarkModeButton } from "../Header"

// Mock next/image since it's not available in test environment

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
		const { alt, ...rest } = props

		// eslint-disable-next-line @next/next/no-img-element
		return <img alt={alt ?? ""} {...rest} />
	}
}))

const mockStore = configureStore([])

describe("Header Component", () => {
	let store: any

	beforeEach(() => {
		store = mockStore({
			score: {
				userRole: "Judge"
			},
			utilities: {
				preferDark: false
			}
		})
	})

	it("renders the logo", () => {
		render(
			<Provider store={store}>
				<Header />
			</Provider>
		)
		const logo = screen.getByAltText("Hurley Foundation Events Logo")
		expect(logo).toBeInTheDocument()
		expect(logo).toHaveAttribute("src", "/images/icon.png")
	})

	it("displays the user role", () => {
		render(
			<Provider store={store}>
				<Header />
			</Provider>
		)
		expect(screen.getByText("Judge")).toBeInTheDocument()
	})

	it("renders all navigation links with correct hrefs", () => {
		render(
			<Provider store={store}>
				<Header />
			</Provider>
		)

		const links = [
			{ text: "Judging", href: "/Judging" },
			{ text: "Results", href: "/Score" },
			{ text: "Scoresheet Builder", href: "/ScoresheetBuilder" },
			{ text: "Admin", href: "/Admin" }
		]

		links.forEach(({ text, href }) => {
			const link = screen.getByRole("link", { name: text })

			expect(link).toBeInTheDocument()
			expect(link).toHaveAttribute("href", href)
		})
	})
})

describe("DarkModeButton Component", () => {
	let store = mockStore({})

	beforeEach(() => {
		store = mockStore({
			utilities: {
				preferDark: false
			}
		})
	})

	it("renders the dark mode button", () => {
		render(
			<Provider store={store}>
				<DarkModeButton />
			</Provider>
		)
		expect(screen.getByTestId("darkModeButton")).toBeInTheDocument()
	})

	it("dispatches updatePreferDark action when clicked", async () => {
		render(
			<Provider store={store}>
				<DarkModeButton />
			</Provider>
		)

		const button = screen.getByTestId("darkModeButton")
		const user = userEvent.setup()
		await user.click(button)

		const actions = store.getActions()
		expect(actions).toHaveLength(1)
		expect(actions[0]).toEqual(updatePreferDark(true))
	})
})
