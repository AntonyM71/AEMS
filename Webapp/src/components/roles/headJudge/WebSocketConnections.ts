import {
	io,
	Socket,
	type ManagerOptions,
	type SocketOptions
} from "socket.io-client"

const socketConfig = (): {
	origin: string
	options: Partial<ManagerOptions & SocketOptions>
} => {
	const isProd = process.env.NEXT_PUBLIC_ENV === "prod"
	const path = isProd ? "/api/socket.io/" : "/socket.io/"
	const origin = isProd
		? window.location.origin
		: `http://localhost:${process.env.NEXT_PUBLIC_SERVER_PORT ?? "8000"}`

	// Workers don't share Engine.IO session state, so polling handshakes
	// send follow-up requests to workers that never saw the session.
	return {
		origin,
		options: { path, reconnection: true, transports: ["websocket"] }
	}
}

export const connectWebRunStatusSocket = (): Socket => {
	const { origin, options } = socketConfig()

	return io(`${origin}/run_status`, options)
}

export const connectTimerSocket = (): Socket => {
	const { origin, options } = socketConfig()

	return io(`${origin}/timer`, options)
}

export const connectCurrentScoreStatusSocket = (): Socket => {
	const { origin, options } = socketConfig()

	return io(`${origin}/current_scores`, options)
}

export const connectBroadcastControlSocket = (): Socket => {
	const { origin, options } = socketConfig()

	return io(`${origin}/broadcast_control`, options)
}
