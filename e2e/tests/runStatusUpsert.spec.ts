import { test, expect, type APIRequestContext } from "@playwright/test"
import { connectRunStatusSocket, sendRunStatus } from "./helpers/runStatus"
import { setupTestData, type TestData } from "./helpers/testData"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const RUN_NUMBER = 0

const readRunStatuses = async (
	request: APIRequestContext,
	data: TestData
): Promise<Array<{ locked: boolean; did_not_start: boolean }>> => {
	const response = await request.get(
		`${BACKEND_URL}/run_status/?heat_id____list=${data.heatId}` +
			`&phase_id____list=${data.phaseId}&athlete_id____list=${data.athleteId}` +
			`&run_number____list=${RUN_NUMBER}`
	)
	expect(response.status()).toBe(200)

	return response.json()
}

test.describe("run status upsert", () => {
	test("a second run-status message for one run updates rather than inserts", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const socket = await connectRunStatusSocket(BACKEND_URL)
		const key = {
			heatId: data.heatId,
			phaseId: data.phaseId,
			athleteId: data.athleteId,
			runNumber: RUN_NUMBER
		}

		try {
			await sendRunStatus(socket, key, { locked: false, did_not_start: true })
			await sendRunStatus(socket, key, { locked: true, did_not_start: false })

			const statuses = await readRunStatuses(request, data)
			expect(statuses).toHaveLength(1)
			expect(statuses[0].locked).toBe(true)
			expect(statuses[0].did_not_start).toBe(false)
		} finally {
			socket.close()
		}
	})
})
