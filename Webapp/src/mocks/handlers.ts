import { http, HttpResponse } from "msw"

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
						{
							locked: true,
							did_not_start: false,
							mean_run_score: 85.5,
							judge_scores: [
								{
									judge_id: "1",
									score_info: { score: 85 }
								},
								{
									judge_id: "2",
									score_info: { score: 86 }
								}
							]
						},
						{
							locked: true,
							did_not_start: false,
							mean_run_score: 85.5,
							judge_scores: [
								{
									judge_id: "1",
									score_info: { score: 85 }
								},
								{
									judge_id: "2",
									score_info: { score: 86 }
								}
							]
						}
					]
				}
			]
		})
	),
	http.get("/api/phase_pdf/:phaseId", () =>
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
	http.post("/api/scoresheet", async ({ request }) => {
		const body = await request.json()

		return HttpResponse.json(body)
	}),
	// Existing handlers
	http.get("/api/availablemoves", ({ request }) => {
		const url = new URL(request.url)
		const idList = url.searchParams.get("idList")?.split(",")
		const idListComparisonOperator = url.searchParams.get(
			"idListComparisonOperator"
		)

		if (
			idListComparisonOperator === "Equal" &&
			idList?.includes("test-move-1")
		) {
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
		const url = new URL(request.url)
		const moveIdList = url.searchParams.get("moveIdList")?.split(",")
		const moveIdListComparisonOperator = url.searchParams.get(
			"moveIdListComparisonOperator"
		)

		if (
			moveIdListComparisonOperator === "Equal" &&
			moveIdList?.includes("test-move-1")
		) {
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
	http.post("/api/competition", async ({ request }) => {
		const body = await request.json()

		return HttpResponse.json(body)
	}),
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
		const url = new URL(request.url)
		const competitionIdList = url.searchParams.get("competitionIdList[]")
		const competitionIdListComparisonOperator = url.searchParams.get(
			"competitionIdListComparisonOperator"
		)
		const joinForeignTable = url.searchParams.get("joinForeignTable[]")

		if (
			competitionIdList === "1" &&
			competitionIdListComparisonOperator === "Equal" &&
			joinForeignTable === "phase"
		) {
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
	http.post("/api/event", async ({ request }) => {
		const body = await request.json()

		return HttpResponse.json(body)
	}),
	http.get("/api/heat", ({ request }) => {
		const url = new URL(request.url)
		const competitionIdList = url.searchParams.get("competitionIdList")
		const competitionIdListComparisonOperator = url.searchParams.get(
			"competitionIdListComparisonOperator"
		)

		if (!competitionIdList || !competitionIdListComparisonOperator) {
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

		// For test cases that expect errors
		if (
			competitionIdList?.includes("2") &&
			competitionIdListComparisonOperator === "Equal"
		) {
			return HttpResponse.json(
				{ message: "Internal server error" },
				{ status: 500 }
			)
		}

		return HttpResponse.json([])
	}),
	http.post("/api/heat", async ({ request }) => {
		const body = await request.json()

		return HttpResponse.json(body)
	}),
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
						{
							locked: true,
							did_not_start: false,
							mean_run_score: 85.5,
							judge_scores: [
								{
									judge_id: "1",
									score_info: { score: 85 }
								},
								{
									judge_id: "2",
									score_info: { score: 86 }
								}
							]
						},
						{
							locked: true,
							did_not_start: true,
							mean_run_score: 0,
							judge_scores: [
								{
									judge_id: "1",
									score_info: { score: 0 }
								},
								{
									judge_id: "2",
									score_info: { score: 0 }
								}
							]
						}
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
	)
]
