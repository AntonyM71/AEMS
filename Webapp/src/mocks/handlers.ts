import { rest } from "msw"

export const handlers = [
	rest.get("/api/phase/:id", (req, res, ctx) =>
		res(
			ctx.json({
				id: req.params.id,
				name: "Test Phase",
				number_of_runs: 2
			})
		)
	),
	rest.get("/api/getPhaseScores/:phaseId", (req, res, ctx) =>
		res(
			ctx.json({
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
		)
	),
	rest.get("/api/phase_pdf/:phaseId", (req, res, ctx) =>
		res(
			ctx.set("Content-Type", "application/pdf"),
			ctx.body("mock pdf content")
		)
	),
	rest.get("/api/scoresheet", (req, res, ctx) =>
		res(
			ctx.json([
				{ id: "1", name: "Scoresheet 1" },
				{ id: "2", name: "Scoresheet 2" }
			])
		)
	),
	rest.post("/api/scoresheet", async (req, res, ctx) => {
		const body = await req.json()

		return res(ctx.json(body))
	}),
	// Existing handlers
	rest.get("/api/availablemoves", (req, res, ctx) => {
		const idList = req.url.searchParams.get("idList")?.split(",")
		const idListComparisonOperator = req.url.searchParams.get(
			"idListComparisonOperator"
		)

		if (
			idListComparisonOperator === "Equal" &&
			idList?.includes("test-move-1")
		) {
			return res(
				ctx.json([
					{
						id: "test-move-1",
						name: "Test Move",
						fl_score: 10,
						rb_score: 20,
						direction: "LR",
						sheet_id: "test-id"
					}
				])
			)
		}

		return res(ctx.json([]))
	}),
	rest.get("/api/availablebonuses", (req, res, ctx) => {
		const moveIdList = req.url.searchParams.get("moveIdList")?.split(",")
		const moveIdListComparisonOperator = req.url.searchParams.get(
			"moveIdListComparisonOperator"
		)

		if (
			moveIdListComparisonOperator === "Equal" &&
			moveIdList?.includes("test-move-1")
		) {
			return res(
				ctx.json([
					{
						id: "available-bonus-1",
						move_id: "test-move-1",
						name: "Test Bonus",
						score: 5
					}
				])
			)
		}

		return res(ctx.json([]))
	}),
	rest.get("/api/competition", (req, res, ctx) =>
		res(
			ctx.json([
				{ id: "1", name: "Competition 1" },
				{ id: "2", name: "Competition 2" }
			])
		)
	),
	rest.post("/api/competition", async (req, res, ctx) => {
		const body = await req.json()

		return res(ctx.json(body))
	}),
	rest.get("/api/competition/:competitionPkId/event", (req, res, ctx) => {
		const { competitionPkId } = req.params

		return res(
			ctx.json([
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
		)
	}),
	rest.get("/api/event", (req, res, ctx) => {
		const params = req.url.searchParams
		const competitionIdList = params.get("competitionIdList[]")
		const competitionIdListComparisonOperator = params.get(
			"competitionIdListComparisonOperator"
		)
		const joinForeignTable = params.get("joinForeignTable[]")

		if (
			competitionIdList === "1" &&
			competitionIdListComparisonOperator === "Equal" &&
			joinForeignTable === "phase"
		) {
			return res(
				ctx.json([
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
			)
		}

		return res(ctx.status(404))
	}),
	rest.post("/api/event", async (req, res, ctx) => {
		const body = await req.json()

		return res(ctx.json(body))
	}),
	rest.get("/api/heat", (req, res, ctx) => {
		const competitionIdList = req.url.searchParams.get("competitionIdList")
		const competitionIdListComparisonOperator = req.url.searchParams.get(
			"competitionIdListComparisonOperator"
		)

		if (!competitionIdList || !competitionIdListComparisonOperator) {
			return res(ctx.json([]))
		}

		// For test cases that expect no heats
		if (competitionIdList === "comp1") {
			return res(ctx.json(null))
		}

		// For test cases that expect heats
		if (competitionIdList === "1") {
			return res(
				ctx.json([
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
			)
		}

		// For test cases that expect errors
		if (
			competitionIdList?.includes("2") &&
			competitionIdListComparisonOperator === "Equal"
		) {
			return res(
				ctx.status(500),
				ctx.json({ message: "Internal server error" })
			)
		}

		return res(ctx.json([]))
	}),
	rest.post("/api/heat", async (req, res, ctx) => {
		const body = await req.json()

		return res(ctx.json(body))
	}),
	rest.get("/api/heat/:id", (req, res, ctx) => {
		const { id } = req.params

		return res(
			ctx.json({
				id,
				name: "Test Heat",
				competition_id: "1",
				number_of_runs: 2
			})
		)
	}),
	rest.get("/api/getHeatScores/:heatId", (req, res, ctx) => {
		const { heatId } = req.params

		return res(
			ctx.json({
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
		)
	}),
	rest.post(
		"/api/addUpdateScoresheet/:scoresheetId",
		async (req, res, ctx) => {
			const { scoresheetId } = req.params
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

			const rawBody: unknown = await req.json()
			const body = rawBody as RequestBody

			if (
				!body?.addUpdateScoresheetRequest?.moves ||
				!Array.isArray(body.addUpdateScoresheetRequest.moves) ||
				!body?.addUpdateScoresheetRequest?.bonuses ||
				!Array.isArray(body.addUpdateScoresheetRequest.bonuses)
			) {
				return res(
					ctx.status(400),
					ctx.json({ message: "Invalid request format" })
				)
			}

			return res(
				ctx.json({
					success: true,
					scoresheetId,
					...body.addUpdateScoresheetRequest
				})
			)
		}
	)
]
