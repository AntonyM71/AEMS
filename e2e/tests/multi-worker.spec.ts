import { test, expect, type APIRequestContext } from "@playwright/test"
import { io, type Socket } from "socket.io-client"
import { setupTestData, type TestData } from "./helpers/testData"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const SECOND_BACKEND_URL =
	process.env.SECOND_BACKEND_URL || "http://localhost:8001"

const CLIENT_COUNT = 6
const DELIVERY_TIMEOUT_MS = 15000

const connectToCurrentScores = async (
	origin: string,
	sockets: Socket[]
): Promise<Socket> => {
	const socket = io(`${origin}/current_scores`, {
		path: "/socket.io/",
		transports: ["websocket"],
		reconnection: false
	})
	sockets.push(socket)
	await new Promise<void>((resolve, reject) => {
		socket.once("connect", () => resolve())
		socket.once("connect_error", reject)
	})

	return socket
}

const nextCurrentScores = (socket: Socket, data: TestData): Promise<void> =>
	new Promise((resolve, reject) => {
		const onScore = (payload: { heat_id: string; athlete_id: string }) => {
			if (
				payload.heat_id !== data.heatId ||
				payload.athlete_id !== data.athleteId
			) {
				return
			}
			clearTimeout(timer)
			socket.off("current_scores", onScore)
			resolve()
		}
		const timer = setTimeout(() => {
			socket.off("current_scores", onScore)
			reject(new Error(`no current_scores within ${DELIVERY_TIMEOUT_MS}ms`))
		}, DELIVERY_TIMEOUT_MS)
		socket.on("current_scores", onScore)
	})

/**
 * Posts an empty score, which the webapp does when a judge clears all their moves.
 * The endpoint emits current_scores regardless, and these tests assert on delivery.
 */
const postEmptyScore = async (
	request: APIRequestContext,
	data: TestData
): Promise<void> => {
	const response = await request.post(
		`${BACKEND_URL}/addUpdateAthleteScore/${data.heatId}/${data.athleteId}/0/1?phase_id=${data.phaseId}`,
		{ data: { moves: [], bonuses: [] } }
	)
	expect(response.status()).toBe(200)
}

test.describe("cross-worker broadcast", () => {
	test("a score posted to one server reaches a client on another process", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const sockets: Socket[] = []
		try {
			await connectToCurrentScores(BACKEND_URL, sockets)
			const onSecondary = await connectToCurrentScores(
				SECOND_BACKEND_URL,
				sockets
			)
			const delivered = nextCurrentScores(onSecondary, data)
			await postEmptyScore(request, data)
			await delivered
		} finally {
			sockets.forEach((socket) => socket.close())
		}
	})

	test("a score reaches every client across all workers", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const sockets: Socket[] = []
		try {
			await Promise.all(
				Array.from({ length: CLIENT_COUNT }, () =>
					connectToCurrentScores(BACKEND_URL, sockets)
				)
			)
			const delivered = sockets.map((socket) =>
				nextCurrentScores(socket, data)
			)
			await postEmptyScore(request, data)
			await Promise.all(delivered)
		} finally {
			sockets.forEach((socket) => socket.close())
		}
	})
})
