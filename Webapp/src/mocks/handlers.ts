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
	})
]
