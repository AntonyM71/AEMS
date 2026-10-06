import { expect, test, type Browser, type Page } from "@playwright/test"
import { BACKEND_URL, proxyFrontendAPIToBackend } from "./helpers/apiProxy"
import { selectCompetitionAndHeat } from "./helpers/selection"

interface HeatAthlete {
	athlete_id: string
	first_name: string
	last_name: string
}

interface PhaseScores {
	scores: {
		athlete_id: string
		ranking: number | null
		total_score: number
		run_scores: { run_number: number; mean_run_score: number }[]
	}[]
}

const START_LIST = [
	"first_name,last_name,bib,Event,Heat",
	"Happy,Alpha,1,Happy K1,1",
	"Happy,Bravo,2,Happy K1,1",
	"Happy,Charlie,3,Happy K1,2"
].join("\r\n")

const uploadStartList = async (page: Page, competitionName: string) => {
	await page.goto("/Admin")
	await page.getByText("Upload Paddlers from CSV").click()
	// Other Admin forms also have a "Number of Runs" field, so stay inside
	// the upload section.
	const form = page.locator(".MuiAccordion-root", {
		hasText: "Upload Paddlers from CSV"
	})
	await form.getByLabel("Choose CSV or XLSX file").setInputFiles({
		name: "start-list.csv",
		mimeType: "text/csv",
		buffer: Buffer.from(START_LIST)
	})
	await form.getByLabel("Competition Name").fill(competitionName)
	await form.getByLabel("Scoresheet").click()
	await page.getByRole("option", { name: "icf_2025" }).click()
	await form.getByLabel("Number of Runs", { exact: true }).fill("2")
	await form.getByLabel("Number of Scoring Runs").fill("1")
	await form.getByLabel("Number of Judges").fill("2")
	await form.getByRole("button", { name: "Submit" }).click()
	await expect(page.getByText("Competition uploaded")).toBeVisible({
		timeout: 60000
	})
}

const openRolePage = async (
	browser: Browser,
	competitionName: string,
	roleButtonTestId: string
): Promise<Page> => {
	const page = await (await browser.newContext()).newPage()
	await proxyFrontendAPIToBackend(page)
	await page.goto("/Judging")
	await selectCompetitionAndHeat(page, competitionName, "Heat 1")
	await page.getByTestId(roleButtonTestId).click({ timeout: 15000 })

	return page
}

const getJson = async <T>(path: string): Promise<T> => {
	const response = await fetch(`${BACKEND_URL}${path}`)
	expect(response.status, path).toBe(200)

	return (await response.json()) as T
}

const countSavedMoves = async (
	heatId: string,
	athleteId: string,
	judgeId: string
) =>
	(
		await getJson<{ moves: unknown[] }>(
			`/getAthleteMovesAndBonuses/${heatId}/${athleteId}/0?judge_id=${judgeId}`
		)
	).moves.length

// One pass through a competition as the venue runs it: import a start list,
// two scribes score a run, the head judge sees the combined score, and the
// results and PDF reflect it.
test("an uploaded competition can be judged by two scribes and produces results", async ({
	browser,
	page
}) => {
	test.setTimeout(120000)
	const competitionName = `E2E Happy Path ${Date.now()}`

	await proxyFrontendAPIToBackend(page)
	await uploadStartList(page, competitionName)

	const competition = (
		await getJson<{ id: string; name: string }[]>("/competition/")
	).find((c) => c.name === competitionName)
	expect(competition).toBeDefined()
	const heats = (
		await getJson<{ id: string; name: string; competition_id: string }[]>(
			"/heat/"
		)
	).filter((h) => h.competition_id === competition!.id)
	expect(heats.map((h) => h.name).sort()).toEqual(["Heat 1", "Heat 2"])
	const heat1 = heats.find((h) => h.name === "Heat 1")!
	const heat1Athletes = await getJson<HeatAthlete[]>(
		`/getHeatInfo/${heat1.id}`
	)
	expect(heat1Athletes.map((a) => a.last_name).sort()).toEqual([
		"Alpha",
		"Bravo"
	])

	const scribe1 = await openRolePage(
		browser,
		competitionName,
		"scribe-button-1"
	)
	const scribe2 = await openRolePage(
		browser,
		competitionName,
		"scribe-button-2"
	)
	const headJudge = await openRolePage(
		browser,
		competitionName,
		"head-judge-button"
	)

	const shownName = await scribe1
		.getByTestId("display-paddler-name")
		.innerText()
	const athlete = heat1Athletes.find((a) =>
		shownName.toUpperCase().includes(a.last_name.toUpperCase())
	)!

	// Each tap submits the scribe's whole move list, so wait for a move to
	// land before tapping the next.
	await scribe1.getByLabel("button1").nth(0).click()
	await expect
		.poll(() => countSavedMoves(heat1.id, athlete.athlete_id, "1"))
		.toBe(1)
	await scribe1.getByLabel("button1").nth(1).click()
	await scribe2.getByLabel("button1").nth(0).click()
	await expect
		.poll(() => countSavedMoves(heat1.id, athlete.athlete_id, "1"))
		.toBe(2)
	await expect
		.poll(() => countSavedMoves(heat1.id, athlete.athlete_id, "2"))
		.toBe(1)

	const phaseId = (
		await getJson<{ phase_id: string }[]>(`/getHeatInfo/${heat1.id}`)
	)[0].phase_id
	const results = await getJson<PhaseScores>(`/getPhaseScores/${phaseId}`)
	const scored = results.scores.find(
		(s) => s.athlete_id === athlete.athlete_id
	)!
	const runMean = scored.run_scores.find(
		(r) => r.run_number === 0
	)!.mean_run_score
	expect(runMean).toBeGreaterThan(0)
	expect(scored.ranking).toBe(1)
	expect(scored.total_score).toBe(runMean)

	await expect(headJudge.getByTestId("final-score-value")).toHaveText(
		runMean.toFixed(2),
		{ timeout: 10000 }
	)

	const pdf = await fetch(`${BACKEND_URL}/phase_pdf/${phaseId}`)
	expect(pdf.headers.get("content-type")).toContain("application/pdf")
	expect(
		Buffer.from(await pdf.arrayBuffer())
			.subarray(0, 4)
			.toString()
	).toBe("%PDF")
})
