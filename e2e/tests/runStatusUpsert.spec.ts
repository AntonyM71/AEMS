import { test, expect, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "node:crypto"
import { io, type Socket } from "socket.io-client"
import { setupTestData, type TestData } from "./helpers/testData"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const RUN_NUMBER = 0

const sendRunStatus = (
	socket: Socket,
	data: TestData,
	fields: { locked: boolean; did_not_start: boolean }
): Promise<void> =>
	new Promise((resolve, reject) => {
		const timer = setTimeout(
			() => reject(new Error("no run_status echo within 10s")),
			10000
		)
		socket.once("run_status", () => {
			clearTimeout(timer)
			resolve()
		})
		socket.emit("run_status", {
			id: randomUUID(),
			heat_id: data.heatId,
			athlete_id: data.athleteId,
			phase_id: data.phaseId,
			run_number: RUN_NUMBER,
			...fields
		})
	})

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
		const socket = io(`${BACKEND_URL}/run_status`, {
			path: "/socket.io/",
			transports: ["websocket"],
			reconnection: false
		})

		try {
			await new Promise<void>((resolve, reject) => {
				socket.once("connect", () => resolve())
				socket.once("connect_error", reject)
			})

			await sendRunStatus(socket, data, {
				locked: false,
				did_not_start: true
			})
			await sendRunStatus(socket, data, {
				locked: true,
				did_not_start: false
			})

			const statuses = await readRunStatuses(request, data)
			expect(statuses).toHaveLength(1)
			expect(statuses[0].locked).toBe(true)
			expect(statuses[0].did_not_start).toBe(false)
		} finally {
			socket.close()
		}
	})
})
