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
				const wsRef: { current: WebSocket | null } = {
					current: null
				}
				let stopped = false
				const connect = () => {
					if (stopped) {
						return
					}
					wsRef.current = connectTimerSocket()
					wsRef.current.onmessage = (event) => {
						const jsonData = JSON.parse(
							event.data as string
						) as { time_remaining: number }
						if (jsonData?.time_remaining !== undefined) {
							updateCachedData(
								() => jsonData.time_remaining
							)
						}
					}
					wsRef.current.onclose = () => {
						if (!stopped) {
							setTimeout(connect, 1000)
						}
					}
					wsRef.current.onerror = () => {
						wsRef.current?.close()
					}
				}
				connect()
				await cacheEntryRemoved
				stopped = true
				wsRef.current?.close()
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
				const wsRef: { current: WebSocket | null } = {
					current: null
				}
				let stopped = false
				const connect = () => {
					if (stopped) {
						return
					}
					wsRef.current = connectWebRunStatusSocket()
					wsRef.current.onmessage = (event) => {
						const jsonData = JSON.parse(
							event.data as string
						) as RunStatus
						if (
							jsonData?.run_number === runNumber &&
							jsonData?.athlete_id === athleteId &&
							jsonData?.heat_id === heatId
						) {
							updateCachedData(() => jsonData)
						}
					}
					wsRef.current.onclose = () => {
						if (!stopped) {
							setTimeout(connect, 1000)
						}
					}
					wsRef.current.onerror = () => {
						wsRef.current?.close()
					}
				}
				try {
					await cacheDataLoaded
					connect()
				} catch {
					// no-op if cacheEntryRemoved resolves before cacheDataLoaded
				}
				await cacheEntryRemoved
				stopped = true
				wsRef.current?.close()
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
				const wsRef: { current: WebSocket | null } = {
					current: null
				}
				let stopped = false
				const connect = () => {
					if (stopped) {
						return
					}
					wsRef.current = connectCurrentScoreStatusSocket()
					wsRef.current.onmessage = (event) => {
						const jsonData = JSON.parse(
							event.data as string
						) as ScoredMovesAndBonusesWithMetadata
						if (
							jsonData?.run_number === runNumber &&
							jsonData?.athlete_id === athleteId &&
							jsonData?.heat_id === heatId
						) {
							const judgeIdStr = String(jsonData.judge_id)
							updateCachedData((draft) => {
								draft.moves = [
									...(draft.moves?.filter(
										(m) => m.judge_id !== judgeIdStr
									) ?? []),
									...(jsonData.movesAndBonuses.moves ??
										[])
								]
								draft.bonuses = [
									...(draft.bonuses?.filter(
										(b) => b.judge_id !== judgeIdStr
									) ?? []),
									...(jsonData.movesAndBonuses.bonuses ??
										[])
								]
							})
						}
					}
					wsRef.current.onclose = () => {
						if (!stopped) {
							setTimeout(connect, 1000)
						}
					}
					wsRef.current.onerror = () => {
						wsRef.current?.close()
					}
				}
				try {
					await cacheDataLoaded
					connect()
				} catch {
					// no-op if cacheEntryRemoved resolves before cacheDataLoaded
				}
				await cacheEntryRemoved
				stopped = true
				wsRef.current?.close()
			}
		}),

		broadcastControlStream: build.query<OverlayControlState, void>({
			queryFn: () => ({ data: defaultOverlayControllerState }),
			async onCacheEntryAdded(
				_,
				{ updateCachedData, cacheEntryRemoved }
			) {
				const wsRef: { current: WebSocket | null } = {
					current: null
				}
				let stopped = false
				const connect = () => {
					if (stopped) {
						return
					}
					wsRef.current = connectBroadcastControlSocket()
					wsRef.current.onmessage = (event) => {
						const jsonData = JSON.parse(
							event.data as string
						) as OverlayControlState
						updateCachedData(() => jsonData)
					}
					wsRef.current.onclose = () => {
						if (!stopped) {
							setTimeout(connect, 1000)
						}
					}
					wsRef.current.onerror = (error) => {
						console.error("WebSocket error:", error)
						wsRef.current?.close()
					}
				}
				connect()
				await cacheEntryRemoved
				stopped = true
				wsRef.current?.close()
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
