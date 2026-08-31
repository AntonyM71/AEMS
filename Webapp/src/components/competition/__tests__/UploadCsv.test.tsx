import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import { renderWithProviders } from "../../../testUtils"
import UploadCsv from "../UploadCsv"

// UploadCsv posts multipart form data with raw axios. Under jsdom 20 + the
// whatwg-fetch polyfill, MSW's XHR interceptor throws on a FormData request
// body, so the network boundary is checked with a spy here rather than a real
// handler. See docs/webapp-test-known-issues.md #5.
describe("UploadCsv", () => {
	it("keeps the submit button disabled until the form is complete", async () => {
		renderWithProviders(<UploadCsv />)

		const submit = screen.getByRole("button", { name: "Submit" })
		expect(submit).toBeDisabled()

		await userEvent.type(
			screen.getByRole("textbox", { name: "Competition Name" }),
			"Spring Slalom"
		)
		// Still incomplete — no scoresheet, no file.
		expect(submit).toBeDisabled()
	})

	it("uploads the file and competition details when the form is submitted", async () => {
		const post = jest
			.spyOn(axios, "post")
			.mockResolvedValue({ data: { competition_id: "new-comp" } })
		const user = userEvent.setup({ delay: null })
		renderWithProviders(<UploadCsv />)

		await user.type(
			screen.getByRole("textbox", { name: "Competition Name" }),
			"Spring Slalom"
		)

		const scoresheet = screen.getByRole("combobox", { name: "Scoresheet" })
		await user.click(scoresheet)
		await user.click(
			await screen.findByRole("option", { name: "Scoresheet 1" })
		)

		await user.upload(
			screen.getByLabelText("Choose CSV or XLSX file"),
			new File(["first_name,last_name\nA,B"], "athletes.csv", {
				type: "text/csv"
			})
		)

		const submit = screen.getByRole("button", { name: "Submit" })
		await waitFor(() => expect(submit).toBeEnabled())
		await user.click(submit)

		await waitFor(() => expect(post).toHaveBeenCalledTimes(1))
		const [url, body] = post.mock.calls[0]
		expect(url).toContain("competition_management/upload")
		const sent = body as FormData
		expect(sent.get("competition_name")).toBe("Spring Slalom")
		expect(sent.get("scoresheet_name")).toBe("Scoresheet 1")
		expect((sent.get("file") as File).name).toBe("athletes.csv")

		post.mockRestore()
	})
})
