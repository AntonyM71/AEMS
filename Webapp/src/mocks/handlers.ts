import { rest } from "msw"

export const handlers = [
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
