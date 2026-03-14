import { io, Socket } from "socket.io-client"

const socketConfig = () => {
	const isProd = process.env.NEXT_PUBLIC_ENV === "prod"
	const path = isProd ? "/api/socket.io/" : "/socket.io/"
	const origin = isProd
		? window.location.origin
		: `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT ?? "8000"}`

	return { origin, path }
}

export const connectWebRunStatusSocket = (): Socket => {
	const { origin, path } = socketConfig()

	return io(`${origin}/run_status`, { path, reconnection: true })
}

export const connectTimerSocket = (): Socket => {
	const { origin, path } = socketConfig()

	return io(`${origin}/timer`, { path, reconnection: true })
}

export const connectCurrentScoreStatusSocket = (): Socket => {
	const { origin, path } = socketConfig()

	return io(`${origin}/current_scores`, { path, reconnection: true })
}

export const connectBroadcastControlSocket = (): Socket => {
	const { origin, path } = socketConfig()

	return io(`${origin}/broadcast_control`, { path, reconnection: true })
}
