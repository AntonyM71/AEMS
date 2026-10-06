import { expect, test, type Browser, type Page } from "@playwright/test"
import { selectCompetitionAndHeat } from "../tests/helpers/selection"

// The local date, not UTC, so the name matches the day the operator sees.
const localDate = (date: Date) =>
	[
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, "0"),
		String(date.getDate()).padStart(2, "0")
	].join("-")
const COMPETITION_NAME = `ZZ Smoke Test ${localDate(new Date())}`
const CLEANUP_COMMAND = `docker exec -i aems-db-1 psql -U postgres -v name='${COMPETITION_NAME}' < e2e/smoke/cleanup.sql`
const START_LIST = [
	"first_name,last_name,bib,Event,Heat",
	"Smoke,Alpha,901,Smoke K1,1",
	"Smoke,Bravo,902,Smoke K1,1",
	"Smoke,Charlie,903,Smoke K1,2"
].join("\r\n")

interface HeatAthlete {
	athlete_heat_id: string
	athlete_id: string
	phase_id: string
	last_name: string
}

// The graphics server is optional at a venue; without it the overlay falls
// back to plain graphics and these requests 502.
const isOptionalGraphicsRequest = (url: string) =>
	new URL(url).pathname.startsWith("/componentInfo/")

test("a deployed AEMS server runs a competition end to end", async ({
	browser,
	page,
	baseURL
}) => {
	const api = `${baseURL}/api`
	const getJson = async <T>(path: string): Promise<T> => {
		const response = await fetch(`${api}${path}`)
		expect(response.status, path).toBe(200)

		return (await response.json()) as T
	}
	const problems: string[] = []
	const watch = (label: string, watched: Page) => {
		watched.on("pageerror", (error) =>
			problems.push(`[${label}] page error: ${error.message}`)
		)
		watched.on("response", (response) => {
			if (
				response.status() >= 500 &&
				!isOptionalGraphicsRequest(response.url())
			) {
				problems.push(
					`[${label}] ${response.status()} ${response.url()}`
				)
			}
		})
	}
	const openPage = async (b: Browser, label: string) => {
		const opened = await (await b.newContext()).newPage()
		watch(label, opened)

		return opened
	}
	const openRole = async (label: string, roleButtonTestId: string) => {
		const rolePage = await openPage(browser, label)
		await rolePage.goto("/Judging")
		await selectCompetitionAndHeat(rolePage, COMPETITION_NAME, "Heat 1")
		await rolePage.getByTestId(roleButtonTestId).click({ timeout: 15000 })

		return rolePage
	}
	watch("admin", page)

	await test.step("no smoke competition is left over from an earlier run", async () => {
		const competitions = await getJson<{ name: string }[]>("/competition/")
		expect(
			competitions.map((c) => c.name),
			`delete the earlier smoke competition first: ${CLEANUP_COMMAND}`
		).not.toContain(COMPETITION_NAME)
	})

	await test.step("admin imports a start list", async () => {
		await page.goto("/Admin")
		await page.getByText("Upload Paddlers from CSV").click()
		const form = page.locator(".MuiAccordion-root", {
			hasText: "Upload Paddlers from CSV"
		})
		await form.getByLabel("Choose CSV or XLSX file").setInputFiles({
			name: "smoke-start-list.csv",
			mimeType: "text/csv",
			buffer: Buffer.from(START_LIST)
		})
		await form.getByLabel("Competition Name").fill(COMPETITION_NAME)
		await form.getByLabel("Scoresheet").click()
		await page.getByRole("option", { name: "icf_2025" }).click()
		await form.getByLabel("Number of Runs", { exact: true }).fill("2")
		await form.getByLabel("Number of Scoring Runs").fill("1")
		await form.getByLabel("Number of Judges").fill("2")
		await form.getByRole("button", { name: "Submit" }).click()
		await expect(page.getByText("Competition uploaded")).toBeVisible({
			timeout: 60000
		})
		// Printed as soon as the competition exists, so a later failure still
		// says how to remove it.
		console.log(
			`Remove the smoke competition afterwards with:\n  ${CLEANUP_COMMAND}`
		)
	})

	const competition = (
		await getJson<{ id: string; name: string }[]>("/competition/")
	).find((c) => c.name === COMPETITION_NAME)!
	const heats = (
		await getJson<{ id: string; name: string; competition_id: string }[]>(
			"/heat/"
		)
	).filter((h) => h.competition_id === competition.id)
	const heat1 = heats.find((h) => h.name === "Heat 1")!
	const heat2 = heats.find((h) => h.name === "Heat 2")!
	const heat1Athletes = await getJson<HeatAthlete[]>(
		`/getHeatInfo/${heat1.id}`
	)
	expect(heat1Athletes).toHaveLength(2)
	const phaseId = heat1Athletes[0].phase_id

	const scribe1 = await openRole("scribe 1", "scribe-button-1")
	const scribe2 = await openRole("scribe 2", "scribe-button-2")
	const headJudge = await openRole("head judge", "head-judge-button")
	const shownName = await scribe1
		.getByTestId("display-paddler-name")
		.innerText()
	const athlete = heat1Athletes.find((a) =>
		shownName.toUpperCase().includes(a.last_name.toUpperCase())
	)!
	const savedMoveCount = async (heatId: string, judgeId: string) =>
		(
			await getJson<{ moves: unknown[] }>(
				`/getAthleteMovesAndBonuses/${heatId}/${athlete.athlete_id}/0?judge_id=${judgeId}`
			)
		).moves.length

	await test.step("two scribes score a run and the head judge sees the average", async () => {
		await scribe1.getByLabel("button1").nth(0).click()
		await expect.poll(() => savedMoveCount(heat1.id, "1")).toBe(1)
		await scribe1.getByLabel("button1").nth(1).click()
		await scribe2.getByLabel("button1").nth(0).click()
		await expect.poll(() => savedMoveCount(heat1.id, "1")).toBe(2)
		await expect.poll(() => savedMoveCount(heat1.id, "2")).toBe(1)

		const results = await getJson<{
			scores: {
				athlete_id: string
				run_scores: { run_number: number; mean_run_score: number }[]
			}[]
		}>(`/getPhaseScores/${phaseId}`)
		const runMean = results.scores
			.find((s) => s.athlete_id === athlete.athlete_id)!
			.run_scores.find((r) => r.run_number === 0)!.mean_run_score
		expect(runMean).toBeGreaterThan(0)
		await expect(headJudge.getByTestId("final-score-value")).toHaveText(
			runMean.toFixed(2),
			{ timeout: 10000 }
		)
	})

	await test.step("locking a run reaches every scribe live and blocks scoring", async () => {
		await headJudge.getByTestId("lock-run-button").click()
		await Promise.all(
			[scribe1, scribe2].map(async (scribe) => {
				await expect(
					scribe.getByText("Run has been locked by head judge")
				).toBeVisible({ timeout: 10000 })
				await expect(
					scribe.getByLabel("button1").first()
				).toBeDisabled()
			})
		)
		await headJudge.getByTestId("lock-run-button").click()
		await expect(scribe1.getByLabel("button1").first()).toBeEnabled({
			timeout: 10000
		})
	})

	await test.step("results PDFs generate", async () => {
		await Promise.all(
			[
				`/phase_pdf/${phaseId}`,
				`/heat_results_pdf?heat_id=${heat1.id}`
			].map(async (path) => {
				const response = await fetch(`${api}${path}`)
				expect(response.headers.get("content-type"), path).toContain(
					"application/pdf"
				)
			})
		)
	})

	await test.step("moving a scored athlete to another heat keeps their scores", async () => {
		const response = await fetch(
			`${api}/athleteheat/${athlete.athlete_heat_id}`,
			{
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ heat_id: heat2.id })
			}
		)
		expect((await response.json()).scores_preserved).toBe(true)
		expect(await savedMoveCount(heat2.id, "1")).toBe(2)
	})

	await test.step("display pages load", async () => {
		// Read-only: the broadcast controller is left alone, since changing it
		// would change what real arena and overlay screens show.
		await Promise.all(
			["/Arena", "/Broadcast/Overlay", "/Commentator", "/Score"].map(
				async (path) => {
					const display = await openPage(browser, path)
					await display.goto(path)
					await display.waitForLoadState("networkidle")
				}
			)
		)
	})

	expect(problems, "page errors or server 5xx responses").toEqual([])
})
