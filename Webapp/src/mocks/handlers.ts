import { rest } from "msw"

export const handlers = [
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
	})
]
