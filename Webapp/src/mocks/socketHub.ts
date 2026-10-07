// Test double for the Socket.IO layer. streamingApi.ts is the only consumer of
// the connect*Socket factories in components/roles/headJudge/WebSocketConnections,
// so a manual mock of that module (see its __mocks__ folder) wired to this hub
// lets a test push inbound events through the real streamingApi code and assert
// on what the UI renders.

export type SocketChannel =
	| "timer"
	| "run_status"
	| "current_scores"
	| "broadcast_control"
	| "head_judge_selection"

export interface MockSocket {
	on: jest.Mock
	once: jest.Mock
	off: jest.Mock
	emit: jest.Mock<void, [string, ...unknown[]]>
	disconnect: jest.Mock
	connected: boolean
	active: boolean
	trigger: (event: string, ...args: unknown[]) => void
}

class SocketHub {
	private sockets: Record<SocketChannel, MockSocket[]> = {
		timer: [],
		run_status: [],
		current_scores: [],
		broadcast_control: [],
		head_judge_selection: []
	}

	private readonly echoing = new Set<SocketChannel>()

	private readonly refusing = new Set<SocketChannel>()

	public connect(channel: SocketChannel): MockSocket {
		const listeners: Record<string, ((...args: unknown[]) => void)[]> = {}
		const socket: MockSocket = {
			on: jest.fn(
				(event: string, handler: (...args: unknown[]) => void) => {
					listeners[event] = [...(listeners[event] ?? []), handler]
				}
			),
			once: jest.fn(
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
			disconnect: jest.fn(() => {
				socket.connected = false
				socket.active = false
			}),
			connected: !this.refusing.has(channel),
			active: true,
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

	/**
	 * Model an unreachable server: new sockets on this channel start
	 * disconnected, so an emit waits for a `connect_error` the test triggers.
	 */
	public refuseConnections(channel: SocketChannel): void {
		this.refusing.add(channel)
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
			// streamingApi's emit registry can still hold a previous test's
			// socket; marking it dead makes the next emit open a tracked one.
			this.sockets[channel].forEach((socket) => {
				socket.connected = false
				socket.active = false
			})
			this.sockets[channel] = []
		})
		this.echoing.clear()
		this.refusing.clear()
	}
}

export const socketHub = new SocketHub()
