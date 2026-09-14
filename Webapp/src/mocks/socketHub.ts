// Test double for the Socket.IO layer. streamingApi.ts is the only consumer of
// the four connect*Socket factories in components/roles/headJudge/WebSocketConnections,
// so a manual mock of that module (see its __mocks__ folder) wired to this hub
// lets a test push inbound events through the real streamingApi code and assert
// on what the UI renders.

export type SocketChannel =
	| "timer"
	| "run_status"
	| "current_scores"
	| "broadcast_control"

export interface MockSocket {
	on: jest.Mock
	off: jest.Mock
	emit: jest.Mock<void, [string, ...unknown[]]>
	disconnect: jest.Mock
	connected: boolean
	trigger: (event: string, ...args: unknown[]) => void
}

class SocketHub {
	private sockets: Record<SocketChannel, MockSocket[]> = {
		timer: [],
		run_status: [],
		current_scores: [],
		broadcast_control: []
	}

	private readonly echoing = new Set<SocketChannel>()

	public connect(channel: SocketChannel): MockSocket {
		const listeners: Record<string, ((...args: unknown[]) => void)[]> = {}
		const socket: MockSocket = {
			on: jest.fn(
				(event: string, handler: (...args: unknown[]) => void) => {
					listeners[event] = [...(listeners[event] ?? []), handler]
				}
			),
			off: jest.fn(),
			emit: jest.fn((event: string, ...args: unknown[]) => {
				if (this.echoing.has(channel)) {
					this.emit(channel, event, ...args)
				}
			}),
			disconnect: jest.fn(),
			connected: true,
			trigger: (event, ...args) =>
				(listeners[event] ?? []).forEach((handler) => handler(...args))
		}
		this.sockets[channel].push(socket)

		return socket
	}

	/**
	 * Model the real server: an outbound emit on this channel is broadcast back
	 * to every subscriber. Opt-in, because most tests assert the client does
	 * NOT act on its own emit until a separate inbound event arrives.
	 */
	public enableEcho(channel: SocketChannel): void {
		this.echoing.add(channel)
	}

	/** Push an inbound event to every open socket on a channel. */
	public emit(
		channel: SocketChannel,
		event: string,
		...args: unknown[]
	): void {
		const open = this.sockets[channel]
		if (open.length === 0) {
			throw new Error(
				`No open "${channel}" socket to emit "${event}" to — ` +
					"the component never subscribed (a failed seeding query?)."
			)
		}
		open.forEach((socket) => socket.trigger(event, ...args))
	}

	public openCount(channel: SocketChannel): number {
		return this.sockets[channel].length
	}

	public disconnectedCount(channel: SocketChannel): number {
		return this.sockets[channel].filter(
			(socket) => socket.disconnect.mock.calls.length > 0
		).length
	}

	/**
	 * Every outbound emit made on this channel, across all its sockets, as the
	 * raw argument lists (e.g. ["run_status", { locked: true, … }]). Lets a test
	 * assert what the client sent without pinning which socket instance sent it.
	 */
	public emittedOn(channel: SocketChannel): unknown[][] {
		return this.sockets[channel].flatMap((socket) => socket.emit.mock.calls)
	}

	public reset(): void {
		;(Object.keys(this.sockets) as SocketChannel[]).forEach((channel) => {
			this.sockets[channel] = []
		})
		this.echoing.clear()
	}
}

export const socketHub = new SocketHub()
