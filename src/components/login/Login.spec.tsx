import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import App from "../../App"
import { currentUser } from "../../recoil/atoms/auth"
import { RecoilObserver } from "../../RecoilObserver"

const navigateToLoginPage = async () => {
	// Helper function to navigate to the login page and assert the default elements are there
	const onChange = jest.fn()
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
	test("the user can navigate to the login page from the home page, and the submit button is disabled", async () => {
		await navigateToLoginPage()
		expect(await screen.findByTestId("input-login-submit")).toBeDisabled()
	})
	test("it the submit button is disabled if there is no password", async () => {
		await navigateToLoginPage()

		// enter an email in the email input
		const inputEmail = await screen.findByTestId("input-login-email")
		userEvent.type(inputEmail, "corran.addison@soulwaterman.com")

		// assert submit button disabled
		const submitButton = await screen.findByTestId("input-login-submit")
		expect(submitButton).toBeInTheDocument()
		expect(submitButton).toBeDisabled()
	})
})
