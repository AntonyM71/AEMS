import { Socket } from "socket.io-client"
import {
	defaultOverlayControllerState,
	OverlayControlState
} from "../../components/Interfaces"
import {
	RunStatus,
	ScoredMovesAndBonusesWithMetadata
} from "../../components/roles/headJudge/RunStatus"
import {
	connectBroadcastControlSocket,
	connectCurrentScoreStatusSocket,
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
} = {
	run_status: null,
	broadcast_control: null
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
// temporary socket. Shared by the run_status and broadcast_control mutations.
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

export const streamingApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		timerStream: build.query<number, void>({
			queryFn: () => ({ data: 0 }),
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved }
			) {
				const socketRef: { current: Socket | null } = {
					current: null
				}
				socketRef.current = connectTimerSocket()
				socketRef.current.on(
					"timer",
					(data: { time_remaining: number }) => {
						if (data?.time_remaining !== undefined) {
							updateCachedData(
								() => data.time_remaining
							)
						}
					}
				)
				await cacheEntryRemoved
				socketRef.current?.disconnect()
				socketRef.current = null
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
					socketRef.current.on(
						"run_status",
						(data: RunStatus) => {
							if (
								data?.run_number === runNumber &&
								data?.athlete_id === athleteId &&
								data?.heat_id === heatId
							) {
								updateCachedData(() => data)
							}
						}
					)
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
											(m) =>
												m.judge_id !==
												judgeIdStr
										) ?? []),
										...(data.movesAndBonuses
											.moves ?? [])
									]
									draft.bonuses = [
										...(draft.bonuses?.filter(
											(b) =>
												b.judge_id !==
												judgeIdStr
										) ?? []),
										...(data.movesAndBonuses
											.bonuses ?? [])
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
		})
	}),
	overrideExisting: false
})

export const {
	useTimerStreamQuery,
	useRunStatusStreamQuery,
	useAthleteMovesAndBonusesStreamQuery,
	useBroadcastControlStreamQuery,
	useEmitRunStatusMutation,
	useEmitBroadcastControlMutation
} = streamingApi
