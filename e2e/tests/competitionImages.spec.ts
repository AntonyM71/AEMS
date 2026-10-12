import { test, expect, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "node:crypto"
import { BACKEND_URL, proxyFrontendAPIToBackend } from "./helpers/apiProxy"

// Two different images: fpdf2 embeds identical images once, which would hide
// the signature behind the logo when counting image objects.
const LOGO_PNG = Buffer.from(
	"iVBORw0KGgoAAAANSUhEUgAAAB4AAAAKCAIAAAAsFXl4AAAAGklEQVR4nGNkYGhgoA1gopG5o0aPGj1MjQYA7KkAlLUxHckAAAAASUVORK5CYII=",
	"base64"
)
const SIGNATURE_PNG = Buffer.from(
	"iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAIAAAB2/0i6AAAADklEQVR4nGNgGAUjAQAAAegAARD7gP0AAAAASUVORK5CYII=",
	"base64"
)

const countImages = (pdf: Buffer) =>
	pdf.toString("latin1").split("/Subtype /Image").length - 1

const createCompetitionWithPhase = async (request: APIRequestContext) => {
	const competitionId = randomUUID()
	const competitionName = `E2E Images Competition ${Date.now()}`
	expect(
		(
			await request.post(`${BACKEND_URL}/competition/`, {
				data: [{ id: competitionId, name: competitionName }]
			})
		).status()
	).toBe(201)
	const scoresheets = (await (
		await request.get(`${BACKEND_URL}/scoresheet/?name____list=icf_2025`)
	).json()) as Array<{ id: string }>
	const eventId = randomUUID()
	expect(
		(
			await request.post(`${BACKEND_URL}/event/`, {
				data: [
					{
						id: eventId,
						competition_id: competitionId,
						name: "E2E Event"
					}
				]
			})
		).status()
	).toBe(201)
	const phaseId = randomUUID()
	const phaseName = `E2E Phase ${Date.now()}`
	expect(
		(
			await request.post(`${BACKEND_URL}/phase/`, {
				data: [
					{
						id: phaseId,
						event_id: eventId,
						name: phaseName,
						number_of_runs: 1,
						number_of_runs_for_score: 1,
						number_of_judges: 1,
						scoresheet: scoresheets[0].id
					}
				]
			})
		).status()
	).toBe(201)

	return { competitionId, competitionName, phaseId, phaseName }
}

test.describe("Competition logo and head judge signature", () => {
	test("uploaded images appear on a signed phase PDF and can be deleted", async ({
		page,
		request
	}) => {
		await proxyFrontendAPIToBackend(page)
		const { competitionId, competitionName, phaseId, phaseName } =
			await createCompetitionWithPhase(request)

		await page.goto("/Admin")
		const imagesAccordion = page
			.locator(".MuiAccordion-root")
			.filter({ hasText: "Competition Logo and Signature" })
		await imagesAccordion
			.getByRole("button", { name: "Competition Logo and Signature" })
			.click()
		await imagesAccordion.getByRole("combobox").first().click()
		await page.getByRole("option", { name: competitionName }).click()

		await imagesAccordion.getByLabel("Upload Logo").setInputFiles({
			name: "logo.png",
			mimeType: "image/png",
			buffer: LOGO_PNG
		})
		await imagesAccordion
			.getByLabel("Upload Head Judge Signature")
			.setInputFiles({
				name: "signature.png",
				mimeType: "image/png",
				buffer: SIGNATURE_PNG
			})
		await expect(imagesAccordion.getByAltText("Logo")).toBeVisible()
		await expect(
			imagesAccordion.getByAltText("Head Judge Signature")
		).toBeVisible()

		const pdfAccordion = page
			.locator(".MuiAccordion-root")
			.filter({ hasText: "Create Phase Result PDFs" })
		await pdfAccordion
			.getByRole("button", { name: "Create Phase Result PDFs" })
			.click()
		await pdfAccordion.getByRole("combobox").nth(1).click({ timeout: 15000 })
		await page.getByRole("option", { name: "E2E Event" }).click()
		await pdfAccordion
			.getByRole("combobox", { name: "Select Phase" })
			.click({ timeout: 15000 })
		await page.getByRole("option", { name: phaseName }).click()
		await pdfAccordion
			.getByRole("checkbox", { name: "Signed by head judge" })
			.check()
		const pdfRequest = page.waitForRequest((sent) =>
			sent.url().includes(`phase_pdf/${phaseId}`)
		)
		await pdfAccordion.getByTestId("download-pdf-button").click()
		expect(new URL((await pdfRequest).url()).searchParams.get("signed")).toBe(
			"true"
		)

		const signedPdf = await request.get(
			`${BACKEND_URL}/phase_pdf/${phaseId}?signed=true`
		)
		const unsignedPdf = await request.get(
			`${BACKEND_URL}/phase_pdf/${phaseId}`
		)
		expect(signedPdf.headers()["content-type"]).toBe("application/pdf")
		expect(countImages(await signedPdf.body())).toBe(2)
		expect(countImages(await unsignedPdf.body())).toBe(1)

		await imagesAccordion
			.getByRole("button", { name: "Delete Head Judge Signature" })
			.click()
		await expect(
			imagesAccordion.getByAltText("Head Judge Signature")
		).toHaveCount(0)
		const signatureAfterDelete = await request.get(
			`${BACKEND_URL}/competition_management/competition/${competitionId}/image/signature`
		)
		expect(signatureAfterDelete.status()).toBe(404)
	})
})
