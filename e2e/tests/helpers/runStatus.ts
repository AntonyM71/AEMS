import { randomUUID } from "node:crypto"
import { io, type Socket } from "socket.io-client"

export interface RunStatusFields {
	locked: boolean
	did_not_start: boolean
}

export interface RunStatusKey {
	heatId: string
	phaseId: string
	athleteId: string
	runNumber: number
}

export const connectRunStatusSocket = (backendUrl: string): Promise<Socket> => {
	const socket = io(`${backendUrl}/run_status`, {
		path: "/socket.io/",
		transports: ["websocket"],
		reconnection: false
	})

	return new Promise((resolve, reject) => {
		socket.once("connect", () => resolve(socket))
		socket.once("connect_error", reject)
	})
}

export const sendRunStatus = (
	socket: Socket,
	key: RunStatusKey,
	fields: RunStatusFields
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
			heat_id: key.heatId,
			athlete_id: key.athleteId,
			phase_id: key.phaseId,
			run_number: key.runNumber,
			...fields
		})
	})

export const setRunStatusOnce = async (
	backendUrl: string,
	key: RunStatusKey,
	fields: RunStatusFields
): Promise<void> => {
	const socket = await connectRunStatusSocket(backendUrl)
	try {
		await sendRunStatus(socket, key, fields)
	} finally {
		socket.close()
	}
}
