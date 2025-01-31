import { rest } from "msw"

export const handlers = [
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

		return res(
			ctx.json(
				idList?.map((id) => ({
					id,
					name:
						id === "1"
							? "Single Test"
							: id === "2"
							? "LR Test"
							: "FB Test",
					direction: id === "1" ? "S" : id === "2" ? "LR" : "FB"
				})) || []
			)
		)
	}),
	rest.get("/api/availablebonuses", (req, res, ctx) => {
		const moveIdList = req.url.searchParams.get("moveIdList")?.split(",")

		return res(
			ctx.json(
				moveIdList?.map((moveId) => ({
					id: `bonus-${moveId}`,
					moveId,
					name: `Bonus for move ${moveId}`,
					value: 10
				})) || []
			)
		)
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
	rest.post(
		"/api/addUpdateScoresheet/:scoresheetId",
		async (req, res, ctx) => {
			const { scoresheetId } = req.params
			const body = await req.json()

			// Validate request structure
			if (
				!body.addUpdateScoresheetRequest ||
				!Array.isArray(body.addUpdateScoresheetRequest.moves) ||
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
