import { http, HttpResponse } from "msw"

const echoPost = (path: string) =>
	http.post(path, async ({ request }) =>
		HttpResponse.json(await request.json())
	)

const lockedRun = (
	didNotStart: boolean,
	meanRunScore: number,
	judgeScores: number[]
) => ({
	locked: true,
	did_not_start: didNotStart,
	mean_run_score: meanRunScore,
	judge_scores: judgeScores.map((score, index) => ({
		judge_id: String(index + 1),
		score_info: { score }
	}))
})

export const handlers = [
	http.get("/api/phase/:id", ({ params }) =>
		HttpResponse.json({
			id: params.id,
			name: "Test Phase",
			number_of_runs: 2
		})
	),
	http.get("/api/getPhaseScores/:phaseId", () =>
		HttpResponse.json({
			scores: [
				{
					bib_number: "123",
					first_name: "John",
					last_name: "Doe",
					ranking: 1,
					total_score: 85.5,
					run_scores: [
						lockedRun(false, 85.5, [85, 86]),
						lockedRun(false, 85.5, [85, 86])
					]
				}
			]
		})
	),
	http.get(
		"/api/phase_pdf/:phaseId",
		() =>
			new HttpResponse("mock pdf content", {
				headers: { "Content-Type": "application/pdf" }
			})
	),
	http.get("/api/scoresheet", () =>
		HttpResponse.json([
			{ id: "1", name: "Scoresheet 1" },
			{ id: "2", name: "Scoresheet 2" }
		])
	),
	echoPost("/api/scoresheet"),
	http.get("/api/availablemoves", ({ request }) => {
		const url = new URL(request.url)
		const idList = url.searchParams.get("idList")?.split(",")

		if (idList?.includes("test-move-1")) {
			return HttpResponse.json([
				{
					id: "test-move-1",
					name: "Test Move",
					fl_score: 10,
					rb_score: 20,
					direction: "LR",
					sheet_id: "test-id"
				}
			])
		}

		return HttpResponse.json([])
	}),
	http.get("/api/availablebonuses", ({ request }) => {
		const url = new URL(request.url, "http://localhost")
		const moveIdList = url.searchParams.get("moveIdList")?.split(",")

		if (moveIdList?.includes("test-move-1")) {
			return HttpResponse.json([
				{
					id: "available-bonus-1",
					move_id: "test-move-1",
					name: "Test Bonus",
					score: 5
				}
			])
		}

		return HttpResponse.json([])
	}),
	http.get("/api/competition", () =>
		HttpResponse.json([
			{ id: "1", name: "Competition 1" },
			{ id: "2", name: "Competition 2" }
		])
	),
	echoPost("/api/competition"),
	http.get("/api/competition/:competitionPkId/event", ({ params }) => {
		const { competitionPkId } = params

		return HttpResponse.json([
			{
				id: "event-1",
				name: "Event 1",
				competition_id: competitionPkId
			},
			{
				id: "event-2",
				name: "Event 2",
				competition_id: competitionPkId
			}
		])
	}),
	http.get("/api/event", ({ request }) => {
		const url = new URL(request.url, "http://localhost")
		const competitionIdList = url.searchParams.get("competitionIdList[]")
		const joinForeignTable = url.searchParams.get("joinForeignTable[]")

		if (competitionIdList === "1" && joinForeignTable === "phase") {
			return HttpResponse.json([
				{
					id: "1",
					name: "Test Event",
					phase_foreign: [
						{
							id: "1",
							name: "Test Phase"
						}
					]
				}
			])
		}

		return new HttpResponse(null, { status: 404 })
	}),
	http.get("/api/event/:id", ({ params }) =>
		HttpResponse.json({
			id: params.id,
			name: "Test Event",
			competition_id: "1"
		})
	),
	echoPost("/api/event"),
	http.get("/api/heat", ({ request }) => {
		const url = new URL(request.url, "http://localhost")
		const competitionIdList = url.searchParams.get("competitionIdList")

		if (!competitionIdList) {
			return HttpResponse.json([])
		}

		// For test cases that expect no heats
		if (competitionIdList === "comp1") {
			return HttpResponse.json(null)
		}

		// For test cases that expect heats
		if (competitionIdList === "1") {
			return HttpResponse.json([
				{
					id: "heat-1",
					name: "Heat 1",
					competition_id: competitionIdList,
					number_of_runs: 2
				},
				{
					id: "heat-2",
					name: "Heat 2",
					competition_id: competitionIdList,
					number_of_runs: 2
				}
			])
		}

		return HttpResponse.json([])
	}),
	echoPost("/api/heat"),
	http.get("/api/heat/:id", ({ params }) => {
		const { id } = params

		return HttpResponse.json({
			id,
			name: "Test Heat",
			competition_id: "1",
			number_of_runs: 2
		})
	}),
	http.get("/api/getHeatScores/:heatId", () =>
		HttpResponse.json({
			scores: [
				{
					bib_number: "123",
					first_name: "John",
					last_name: "Doe",
					run_scores: [
						lockedRun(false, 85.5, [85, 86]),
						lockedRun(true, 0, [0, 0])
					]
				}
			]
		})
	),
	http.post(
		"/api/addUpdateScoresheet/:scoresheetId",
		async ({ params, request }) => {
			const { scoresheetId } = params
			interface RequestBody {
				addUpdateScoresheetRequest: {
					moves: {
						id: string
						sheet_id: string
						name: string
						fl_score: number
						rb_score: number
						direction: string
					}[]
					bonuses: {
						id: string
						sheet_id: string
						move_id: string
						name: string
						score: number
					}[]
				}
			}

			const rawBody: unknown = await request.json()
			const body = rawBody as RequestBody

			if (
				!body?.addUpdateScoresheetRequest?.moves ||
				!Array.isArray(body.addUpdateScoresheetRequest.moves) ||
				!body?.addUpdateScoresheetRequest?.bonuses ||
				!Array.isArray(body.addUpdateScoresheetRequest.bonuses)
			) {
				return HttpResponse.json(
					{ message: "Invalid request format" },
					{ status: 400 }
				)
			}

			return HttpResponse.json({
				success: true,
				scoresheetId,
				...body.addUpdateScoresheetRequest
			})
		}
	),
	http.get("/api/getHeatInfo/:heatId/phase", () =>
		HttpResponse.json([
			{
				id: "phase-1",
				event_id: "event-1",
				name: "Test Phase",
				number_of_runs: 3,
				number_of_runs_for_score: 2,
				number_of_judges: 3,
				scoresheet: "sheet-1"
			}
		])
	),
	http.get("/api/getHeatInfo/:heatId", ({ params }) =>
		HttpResponse.json([
			{
				athlete_heat_id: "ah-1",
				heat_id: params.heatId,
				athlete_id: "athlete-1",
				phase_id: "phase-1",
				number_of_runs: 3,
				number_of_runs_for_score: 2,
				scoresheet: "sheet-1",
				first_name: "John",
				last_name: "Smith",
				affiliation: "GBR",
				bib: "42",
				event_name: "Test Event"
			}
		])
	),
	http.get(
		"/api/getAthleteMovesAndBonuses/:heatId/:athleteId/:runNumber",
		() => HttpResponse.json({ moves: [], bonuses: [] })
	),
	http.get("/api/run_status/", () => HttpResponse.json([]))
]
