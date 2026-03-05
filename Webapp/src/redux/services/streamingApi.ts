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
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved }
			) {
				const socketRef: { current: Socket | null } = {
					current: null
				}
				socketRef.current = connectBroadcastControlSocket()
				socketRef.current.on(
					"broadcast_control",
					(data: OverlayControlState) => {
						updateCachedData(() => data)
					}
				)
				await cacheEntryRemoved
				socketRef.current?.disconnect()
				socketRef.current = null
			}
		})
	}),
	overrideExisting: false
})

export const {
	useTimerStreamQuery,
	useRunStatusStreamQuery,
	useAthleteMovesAndBonusesStreamQuery,
	useBroadcastControlStreamQuery
} = streamingApi
