import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios, { AxiosError, AxiosResponse } from "axios"
import { http, HttpResponse } from "msw"
import { server } from "../../../mocks/server"
import { renderWithProviders } from "../../../testUtils"
import { CompetitionImages } from "../CompetitionImages"

// Uploads are multipart, which MSW's XHR interceptor cannot read under jsdom 20
// and whatwg-fetch, so axios.put is spied on instead; see
// docs/webapp-test-known-issues.md #5. Reads and deletes go through MSW.
const IMAGE_URL = "/api/competition_management/competition/:id/image/:kind"

const useImageServer = (stored: Record<string, string>) => {
	server.use(
		http.get(IMAGE_URL, ({ params }) =>
			stored[params.kind as string]
				? new HttpResponse(stored[params.kind as string], {
						headers: { "Content-Type": "image/png" }
				  })
				: HttpResponse.json(
						{ detail: "No image stored" },
						{ status: 404 }
				  )
		),
		http.delete(IMAGE_URL, ({ params }) => {
			delete stored[params.kind as string]

			return new HttpResponse(null, { status: 204 })
		})
	)
	jest.spyOn(axios, "put").mockImplementation((url, body) => {
		const kind = url.split("/").pop() as string
		stored[kind] = ((body as FormData).get("file") as File).name

		return Promise.resolve({ status: 204 })
	})
}

const renderForCompetition = () =>
	renderWithProviders(<CompetitionImages />, {
		preloadedState: { competitions: { selectedCompetition: "comp-1" } }
	})

describe("CompetitionImages", () => {
	afterEach(() => {
		jest.restoreAllMocks()
	})

	beforeEach(() => {
		URL.createObjectURL = jest.fn().mockReturnValue("blob:preview")
		URL.revokeObjectURL = jest.fn()
	})

	it("asks for a competition when none is selected", () => {
		renderWithProviders(<CompetitionImages />)

		expect(
			screen.getByText("Please select a competition")
		).toBeInTheDocument()
	})

	it("uploads a logo and then previews it", async () => {
		const stored: Record<string, string> = {}
		useImageServer(stored)
		renderForCompetition()
		const user = userEvent.setup()

		await user.upload(
			await screen.findByLabelText("Upload Logo"),
			new File(["logo-bytes"], "logo.png", { type: "image/png" })
		)

		expect(await screen.findByAltText("Logo")).toBeInTheDocument()
		expect(stored).toEqual({ logo: "logo.png" })
		expect(
			screen.queryByAltText("Head Judge Signature")
		).not.toBeInTheDocument()
	})

	it("deletes a stored signature and removes its preview", async () => {
		const stored: Record<string, string> = { signature: "signature-bytes" }
		useImageServer(stored)
		renderForCompetition()
		const user = userEvent.setup()
		expect(
			await screen.findByAltText("Head Judge Signature")
		).toBeInTheDocument()

		await user.click(
			screen.getByRole("button", { name: "Delete Head Judge Signature" })
		)

		await waitFor(() => {
			expect(
				screen.queryByAltText("Head Judge Signature")
			).not.toBeInTheDocument()
		})
		expect(stored).toEqual({})
	})

	it("shows the server's reason when an upload is rejected", async () => {
		useImageServer({})
		jest.spyOn(axios, "put").mockRejectedValue(
			new AxiosError(
				"Request failed with status code 415",
				"ERR_BAD_REQUEST",
				undefined,
				undefined,
				{
					status: 415,
					data: { detail: "Images must be PNG or JPEG" }
				} as AxiosResponse
			)
		)
		renderForCompetition()
		const user = userEvent.setup()

		await user.upload(
			await screen.findByLabelText("Upload Logo"),
			new File(["not an image"], "logo.png", { type: "image/png" })
		)

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"Images must be PNG or JPEG"
		)
		expect(screen.queryByAltText("Logo")).not.toBeInTheDocument()
	})
})
