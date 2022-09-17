/* eslint-disable camelcase */
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios, { AxiosResponse } from "axios"
import { BrowserRouter } from "react-router-dom"
import { currentUser } from "../../recoil/atoms/auth"

const mockSuccessfulLoginResponse = {
	status: 201,
	data: {
		user: {
			passwordExpired: false,
			lastLogin: "1234",
			dflg: true,
			_id: "string",
			firstName: "Corran",
			lastName: "Addison",
			emailAddress: "Corran.addison@soulwaterman.com",
			permissionLevel: 111,
			lupt: "string",
			lupu: "string",
			crtt: "string",
			crtu: "string",
			__v: 111,
			fullName: "Corran Addison",
			initials: "CA",
			crttDisplay: "string",
			luptDisplay: "string",
			id: "string"
		},
		access_token: "abc123",
		refresh_token: "def456",
		expires_in: 50
	}
} as AxiosResponse
const onChange = jest.fn()
const navigateToLoginPage = async () => {
	// Helper function to navigate to the login page and assert the default elements are there
	cleanup()
	jest.resetModules()
	render(
		<RecoilRoot>
			<BrowserRouter>
				<RecoilObserver node={currentUser} onChange={onChange} />
				<App />
			</BrowserRouter>
		</RecoilRoot>
	)

	const loginPageLink = await screen.findByText("Log In", {
		exact: false
	})
	// Assert link exists to the login page
	expect(loginPageLink).toBeInTheDocument()

	// Navigate to Login Page
	userEvent.click(loginPageLink)

	// Assert login page has an email box and password box and submit button
	expect(await screen.findByTestId("input-login-email")).toBeInTheDocument()
	expect(
		await screen.findByTestId("input-login-password")
	).toBeInTheDocument()
	expect(await screen.findByTestId("input-login-submit")).toBeInTheDocument()
}

describe("Login Page", () => {
	beforeEach(() => {
		localStorage.clear()
	})
	test("the user can navigate to the login page from the home page, and the submit button is disabled", async () => {
		await navigateToLoginPage()
		expect(await screen.findByTestId("input-login-submit")).toBeDisabled()
	})
	test("the submit button is disabled if there is no password", async () => {
		await navigateToLoginPage()

		// enter an email in the email input
		const inputEmail = (await screen.findByTestId(
			"input-login-email"
		)) as HTMLInputElement
		userEvent.type(inputEmail, "corran.addison@soulwaterman.com")

		// assert value change
		expect(inputEmail.value).toBe("corran.addison@soulwaterman.com")
		// assert submit button disabled
		const submitButton = await screen.findByTestId("input-login-submit")
		expect(submitButton).toBeInTheDocument()
		expect(submitButton).toBeDisabled()
	})
	test("activates the submit button when both fields are populated", async () => {
		await navigateToLoginPage()
		const inputEmail = await screen.findByTestId("input-login-email")
		userEvent.type(inputEmail, "corran.addison@soulwaterman.com")
		// set password
		const inputPassword = await screen.findByTestId("input-login-password")
		userEvent.type(inputPassword, "RiotDisco123")
		// Assert button is enabled
		// console.log((await screen.findByTestId("input-login-submit")).debug())
		await waitFor(async () => {
			expect(
				await screen.findByTestId("input-login-submit")
			).toBeEnabled()
		})
	})
	const axiosMock = jest.spyOn(axios, "post").mockImplementation(jest.fn())

	test("it allows the user to log in", async () => {
		await navigateToLoginPage()

		axiosMock.mockImplementation(
			// @ts-ignore
			() => mockSuccessfulLoginResponse
		)
		// set email
		const inputEmail = await screen.findByTestId("input-login-email")
		userEvent.type(inputEmail, "corran.addison@soulwaterman.com")
		// set password
		const inputPassword = await screen.findByTestId("input-login-password")
		userEvent.type(inputPassword, "RiotDisco123")
		// Assert button is enabled

		await waitFor(async () => {
			expect(
				await screen.findByTestId("input-login-submit")
			).toBeEnabled()
		})
		// Submit login request
		userEvent.click(screen.getByTestId("input-login-submit"))

		// Assert
		expect(await screen.findByText("Corran Addison")).toBeInTheDocument()
		expect(await screen.findByText("Log Out")).toBeInTheDocument()
	})

	test("userinfo is rehydrated from the local storage", async () => {
		await navigateToLoginPage()

		axiosMock.mockImplementation(
			// @ts-ignore
			() => mockSuccessfulLoginResponse
		)
		// set email
		const inputEmail = await screen.findByTestId("input-login-email")
		userEvent.type(inputEmail, "corran.addison@soulwaterman.com")
		// set password
		const inputPassword = await screen.findByTestId("input-login-password")
		userEvent.type(inputPassword, "RiotDisco123")
		// Assert button is enabled

		await waitFor(async () => {
			expect(
				await screen.findByTestId("input-login-submit")
			).toBeEnabled()
		})
		// Submit login request
		userEvent.click(screen.getByTestId("input-login-submit"))

		// Assert
		expect(await screen.findByText("Corran Addison")).toBeInTheDocument()
		expect(await screen.findByText("Log Out")).toBeInTheDocument()

		window.location.reload()

		// Assert
		expect(await screen.findByText("Corran Addison")).toBeInTheDocument()
		expect(await screen.findByText("Log Out")).toBeInTheDocument()
	})
	test("the user can log in and log out", async () => {
		localStorage.clear()
		await navigateToLoginPage()

		axiosMock.mockImplementation(
			// @ts-ignore
			() => mockSuccessfulLoginResponse
		)
		// set email
		const inputEmail = await screen.findByTestId("input-login-email")
		userEvent.type(inputEmail, "corran.addison@soulwaterman.com")
		// set password
		const inputPassword = await screen.findByTestId("input-login-password")
		userEvent.type(inputPassword, "RiotDisco123")
		// Assert button is enabled

		await waitFor(async () => {
			expect(
				await screen.findByTestId("input-login-submit")
			).toBeEnabled()
		})
		// Submit login request
		userEvent.click(screen.getByTestId("input-login-submit"))

		// Assert
		expect(await screen.findByText("Corran Addison")).toBeInTheDocument()
		expect(await screen.findByText("Log Out")).toBeInTheDocument()

		// Log Out
		userEvent.click(screen.getByText("Log Out"))

		// Assert
		expect(screen.queryByText("Corran Addison")).not.toBeInTheDocument()
		expect(screen.queryByText("Log Out")).not.toBeInTheDocument()
	})
})
