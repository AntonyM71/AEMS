import { Socket } from "socket.io-client"
import {
	defaultOverlayControllerState,
	HeadJudgePosition,
	OverlayControlState
} from "../../components/Interfaces"
import {
	RunStatus,
	ScoredMovesAndBonusesWithMetadata
} from "../../components/roles/headJudge/RunStatus"
import {
	connectBroadcastControlSocket,
	connectCurrentScoreStatusSocket,
	connectHeadJudgeSelectionSocket,
	connectTimerSocket,
	connectWebRunStatusSocket
} from "../../components/roles/headJudge/WebSocketConnections"
import { ScoredMovesAndBonusesResponse } from "./aemsApi"
import { emptySplitApi } from "./emptyApi"

// Registry of active sockets maintained by streaming queries.
// Mutations check this registry first so they can reuse an existing connection
// rather than creating a short-lived socket for every emit call.
const emitSockets: {
	run_status: Socket | null
	broadcast_control: Socket | null
	head_judge_selection: Socket | null
} = {
	run_status: null,
	broadcast_control: null,
	head_judge_selection: null
}

// Track all active run_status sockets so we can reuse any live connection and
// only clear the registry when the last subscriber disconnects.
const runStatusSockets = new Set<Socket>()

type EmitQueryResult =
	| { data: null }
	| { error: { status: "CUSTOM_ERROR"; error: string } }

// Emit `event` on a short-lived socket opened only for this call and
// disconnected as soon as the payload is sent (or the connection fails).
const emitViaTemporarySocket = (
	connect: () => Socket,
	event: string,
	payload: unknown
): Promise<void> =>
	new Promise<void>((resolve, reject) => {
		const socket = connect()
		function doEmit() {
			socket.off("connect_error", onConnectError)
			socket.emit(event, payload)
			socket.disconnect()
			resolve()
		}
		function onConnectError(err: Error) {
			socket.off("connect", doEmit)
			socket.disconnect()
			reject(err)
		}
		if (socket.connected) {
			doEmit()
		} else {
			socket.once("connect", doEmit)
			socket.once("connect_error", onConnectError)
		}
	})

// Reuse activeSocket while it is still connected, otherwise fall back to a
// temporary socket.
const emitWithSocketReuse = async (
	activeSocket: Socket | null,
	connect: () => Socket,
	event: string,
	payload: unknown
): Promise<EmitQueryResult> => {
	if (activeSocket?.connected) {
		activeSocket.emit(event, payload)

		return { data: null }
	}

	try {
		await emitViaTemporarySocket(connect, event, payload)

		return { data: null }
	} catch (error) {
		return {
			error: {
				status: "CUSTOM_ERROR" as const,
				error: String(error)
			}
		}
	}
}

// Counts incoming `requestEvent`s so a component can list the count in an
// effect's dependencies and re-send its state whenever someone asks for it.
const countRequests = async (
	connect: () => Socket,
	requestEvent: string,
	{
		updateCachedData,
		cacheEntryRemoved
	}: {
		updateCachedData: (recipe: (draft: number) => number) => void
		cacheEntryRemoved: Promise<void>
	},
	emitSocketKey?: "head_judge_selection"
): Promise<void> => {
	const socket = connect()
	if (emitSocketKey) {
		emitSockets[emitSocketKey] ??= socket
	}
	const countOne = () => {
		updateCachedData((count) => count + 1)
	}
	socket.on(requestEvent, countOne)
	// A display's request is lost if it lands before this socket reconnects,
	// so treat our own (re)connect as a request too.
	socket.on("connect", countOne)
	await cacheEntryRemoved
	if (emitSocketKey && emitSockets[emitSocketKey] === socket) {
		emitSockets[emitSocketKey] = null
	}
	socket.disconnect()
}

export interface TimerStreamData {
	time_remaining: number
	status: "running" | "finished" | "cancelled"
}

export const streamingApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		timerStream: build.query<TimerStreamData, void>({
			queryFn: () => ({
				data: { time_remaining: 0, status: "running" }
			}),
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved }
			) {
				const socketRef: { current: Socket | null } = {
					current: null
				}
				socketRef.current = connectTimerSocket()
				socketRef.current.on("timer", (data: TimerStreamData) => {
					if (data?.time_remaining !== undefined) {
						updateCachedData(() => data)
					}
				})
				await cacheEntryRemoved
				socketRef.current?.disconnect()
				socketRef.current = null
			}
		}),

		/** The latest run-status message (lock or DNS) for any of one athlete's
		 * runs in a heat, or null until one arrives. Listen-only: unlike
		 * runStatusStream it never becomes the socket emitRunStatus reuses. */
		athleteRunStatusStream: build.query<
			RunStatus | null,
			{ heatId: string; athleteId: string }
		>({
			queryFn: () => ({ data: null }),
			async onCacheEntryAdded(
				{ heatId, athleteId },
				{ updateCachedData, cacheEntryRemoved }
			) {
				const socket = connectWebRunStatusSocket()
				socket.on("run_status", (data: RunStatus) => {
					if (
						data?.athlete_id === athleteId &&
						data?.heat_id === heatId
					) {
						updateCachedData(() => data)
					}
				})
				await cacheEntryRemoved
				socket.disconnect()
			}
		}),
		runStatusStream: build.query<
			RunStatus | undefined,
			{ heatId: string; athleteId: string; runNumber: number }
		>({
			query: ({ heatId, athleteId, runNumber }) => ({
				url: `/run_status/`,
				params: {
					heat_id____list: [heatId],
					heat_id____list_____comparison_operator: "Equal",
					athlete_id____list: [athleteId],
					athlete_id____list_____comparison_operator: "Equal",
					run_number____list: [runNumber],
					run_number____list_____comparison_operator: "Equal"
				}
			}),
			transformResponse: (response: RunStatus[]) => response?.[0],
			async onCacheEntryAdded(
				{ heatId, athleteId, runNumber },
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const socketRef: { current: Socket | null } = {
					current: null
				}
				try {
					await cacheDataLoaded
					socketRef.current = connectWebRunStatusSocket()
					// Register for reuse by emitRunStatus mutation.
					// Track all active sockets and prefer the most recently
					// created one, but keep any live socket available for reuse.
					if (socketRef.current) {
						runStatusSockets.add(socketRef.current)
						emitSockets.run_status = socketRef.current
					}
					socketRef.current.on("run_status", (data: RunStatus) => {
						if (
							data?.run_number === runNumber &&
							data?.athlete_id === athleteId &&
							data?.heat_id === heatId
						) {
							updateCachedData(() => data)
						}
					})
				} catch {
					// no-op if cacheEntryRemoved resolves before cacheDataLoaded
				}
				await cacheEntryRemoved
				if (socketRef.current) {
					runStatusSockets.delete(socketRef.current)
				}
				// Pick any remaining active socket for reuse, or clear if none remain.
				const nextSocket =
					runStatusSockets.size > 0
						? runStatusSockets.values().next().value ?? null
						: null
				emitSockets.run_status = nextSocket
				socketRef.current?.disconnect()
				socketRef.current = null
			}
		}),

		athleteMovesAndBonusesStream: build.query<
			ScoredMovesAndBonusesResponse,
			{ heatId: string; athleteId: string; runNumber: number }
		>({
			query: ({ heatId, athleteId, runNumber }) => ({
				url: `/getAthleteMovesAndBonuses/${heatId}/${athleteId}/${runNumber}`
			}),
			async onCacheEntryAdded(
				{ heatId, athleteId, runNumber },
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const socketRef: { current: Socket | null } = {
					current: null
				}
				try {
					await cacheDataLoaded
					socketRef.current = connectCurrentScoreStatusSocket()
					socketRef.current.on(
						"current_scores",
						(data: ScoredMovesAndBonusesWithMetadata) => {
							if (
								data?.run_number === runNumber &&
								data?.athlete_id === athleteId &&
								data?.heat_id === heatId
							) {
								const judgeIdStr = String(data.judge_id)
								updateCachedData((draft) => {
									draft.moves = [
										...(draft.moves?.filter(
											(m) => m.judge_id !== judgeIdStr
										) ?? []),
										...(data.movesAndBonuses.moves ?? [])
									]
									draft.bonuses = [
										...(draft.bonuses?.filter(
											(b) => b.judge_id !== judgeIdStr
										) ?? []),
										...(data.movesAndBonuses.bonuses ?? [])
									]
								})
							}
						}
					)
				} catch {
					// no-op if cacheEntryRemoved resolves before cacheDataLoaded
				}
				await cacheEntryRemoved
				socketRef.current?.disconnect()
				socketRef.current = null
			}
		}),

		broadcastControlStream: build.query<OverlayControlState, void>({
			queryFn: () => ({ data: defaultOverlayControllerState }),
			keepUnusedDataFor: 0,
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved }
			) {
				const socketRef: { current: Socket | null } = {
					current: null
				}
				socketRef.current = connectBroadcastControlSocket()
				// Register for reuse by emitBroadcastControl mutation.
				emitSockets.broadcast_control = socketRef.current
				// Fires again on every reconnect, so a display that dropped
				// out also asks the open controller for its current state.
				socketRef.current.on("connect", () => {
					socketRef.current?.emit("request_broadcast_control")
				})
				socketRef.current.on(
					"broadcast_control",
					(data: OverlayControlState) => {
						updateCachedData(() => data)
					}
				)
				await cacheEntryRemoved
				if (emitSockets.broadcast_control === socketRef.current) {
					emitSockets.broadcast_control = null
				}
				socketRef.current?.disconnect()
				socketRef.current = null
			}
		}),

		broadcastControlRequestStream: build.query<number, void>({
			queryFn: () => ({ data: 0 }),
			keepUnusedDataFor: 0,
			onCacheEntryAdded: (_, lifecycle) =>
				countRequests(
					connectBroadcastControlSocket,
					"request_broadcast_control",
					lifecycle
				)
		}),

		headJudgeSelectionRequestStream: build.query<number, void>({
			queryFn: () => ({ data: 0 }),
			keepUnusedDataFor: 0,
			onCacheEntryAdded: (_, lifecycle) =>
				countRequests(
					connectHeadJudgeSelectionSocket,
					"request_head_judge_selection",
					lifecycle,
					"head_judge_selection"
				)
		}),

		headJudgePositionStream: build.query<HeadJudgePosition | null, void>({
			queryFn: () => ({ data: null }),
			keepUnusedDataFor: 0,
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved }
			) {
				const socket = connectHeadJudgeSelectionSocket()
				socket.on("connect", () => {
					socket.emit("request_head_judge_selection")
				})
				socket.on(
					"head_judge_selection",
					(position: HeadJudgePosition) => {
						updateCachedData(() => position)
					}
				)
				await cacheEntryRemoved
				socket.disconnect()
			}
		}),

		emitRunStatus: build.mutation<null, RunStatus>({
			queryFn: (runStatusData) =>
				emitWithSocketReuse(
					emitSockets.run_status,
					connectWebRunStatusSocket,
					"run_status",
					runStatusData
				)
		}),

		emitBroadcastControl: build.mutation<null, OverlayControlState>({
			queryFn: (overlayControlState) =>
				emitWithSocketReuse(
					emitSockets.broadcast_control,
					connectBroadcastControlSocket,
					"broadcast_control",
					overlayControlState
				)
		}),

		emitHeadJudgePosition: build.mutation<null, HeadJudgePosition>({
			queryFn: (position) =>
				emitWithSocketReuse(
					emitSockets.head_judge_selection,
					connectHeadJudgeSelectionSocket,
					"head_judge_selection",
					position
				)
		})
	}),
	overrideExisting: false
})

export const {
	useTimerStreamQuery,
	useRunStatusStreamQuery,
	useAthleteRunStatusStreamQuery,
	useAthleteMovesAndBonusesStreamQuery,
	useBroadcastControlStreamQuery,
	useBroadcastControlRequestStreamQuery,
	useHeadJudgeSelectionRequestStreamQuery,
	useHeadJudgePositionStreamQuery,
	useEmitRunStatusMutation,
	useEmitBroadcastControlMutation,
	useEmitHeadJudgePositionMutation
} = streamingApi
