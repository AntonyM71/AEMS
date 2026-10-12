import { configureStore } from "@reduxjs/toolkit"
import { waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { server } from "../../mocks/server"
import { rootReducer } from "../store"
import { aemsApi } from "./aemsApi"

describe("heat info cache invalidation", () => {
	it("refreshes the destination heat after an athlete is moved into it", async () => {
		const heatInfoCalls: string[] = []
		server.use(
			http.get("/api/getHeatInfo/:heatId", ({ params }) => {
				heatInfoCalls.push(String(params.heatId))

				return HttpResponse.json([])
			}),
			http.patch("/api/athleteheat/:id", () =>
				HttpResponse.json({ scores_preserved: true })
			)
		)
		const store = configureStore({
			reducer: rootReducer,
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware().concat(aemsApi.middleware)
		})
		const subscribe = (heatId: string) =>
			store.dispatch(
				aemsApi.endpoints.getHeatInfoGetHeatInfoHeatIdGet.initiate({
					heatId
				})
			)
		await subscribe("source")
		await subscribe("destination")
		expect(heatInfoCalls).toEqual(["source", "destination"])

		await store.dispatch(
			aemsApi.endpoints.partialUpdateOneByPrimaryKeyAthleteheatIdPatch.initiate(
				{
					id: "ah1",
					athleteHeatUpdate: { heat_id: "destination" }
				}
			)
		)

		await waitFor(() => {
			expect(
				heatInfoCalls.filter((h) => h === "destination")
			).toHaveLength(2)
		})
	})
})
