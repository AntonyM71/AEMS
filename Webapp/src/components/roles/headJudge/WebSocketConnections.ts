export const connectWebRunStatusSocket = (): WebSocket =>
	new WebSocket(
		`ws://localhost:${
			process.env.NEXT_PUBLIC_SERVER_PORT ?? 8000
		}/api/runstatus`
	)

export const connectCurrentScoreStatusSocket = (): WebSocket =>
	new WebSocket(
		`ws://localhost:${
			process.env.NEXT_PUBLIC_SERVER_PORT ?? 8000
		}/api/current_scores`
	)
