const websocketURL = () => {
	const isProd = process.env.NEXT_PUBLIC_ENV === "prod"

	const url = new URL(isProd ? "/api/" : "/", location.href)
	url.protocol = url.protocol.replace("http", "ws")

	if (!isProd) {
		url.port = process.env.NEXT_PUBLIC_SERVER_PORT ?? "8000"
	}

	return url
}

export const connectWebRunStatusSocket = (): WebSocket =>
	new WebSocket(`${websocketURL().toString()}run_status`)
export const connectTimerSocket = (): WebSocket =>
	new WebSocket(`${websocketURL().toString()}broadcast/timer`)
export const connectCurrentScoreStatusSocket = (): WebSocket =>
	new WebSocket(`${websocketURL().toString()}current_scores`)
