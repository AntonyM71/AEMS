import { waitFor } from "@testing-library/react"
import { aemsApi } from "../../../../redux/services/aemsApi"

// Waits for the heat-info query (used by PaddlerSelector/RunSelector) to
// resolve with the given number of athletes, so navigation math in tests
// isn't racing the query.
export const waitForHeatInfoData = async (
	store: { getState: () => Record<string, unknown> },
	expectedLength: number
) => {
	await waitFor(() => {
		const apiState = store.getState()[aemsApi.reducerPath] as {
			queries: Record<string, { data?: unknown[] }>
		}
		const heatInfoKey = Object.keys(apiState.queries).find((key) =>
			key.startsWith("getHeatInfo")
		)
		expect(heatInfoKey && apiState.queries[heatInfoKey].data).toHaveLength(
			expectedLength
		)
	})
}
