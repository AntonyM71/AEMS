import { expect, test, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "node:crypto"
import { io, type Socket } from "socket.io-client"
import { fetchTwoMoves } from "./helpers/moves"
import { setupTestData, type TestData } from "./helpers/testData"
import { nextUuid7 } from "./helpers/uuid7"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"
const JUDGE_ID = "1"
const RUN_NUMBER = 0

interface ScoredMove {
	id: string
	move_id: string
	direction: string
}

interface ScoredBonus {
	id: string
	bonus_id: string
	move_id: string
}

interface RunScore {
	run_number: number
	locked: boolean
	did_not_start: boolean
	mean_run_score: number
}

interface AthleteHeatMoveResponse {
	scores_preserved: boolean | null
}

const submitScore = async (
	request: APIRequestContext,
	heatId: string,
	phaseId: string,
	athleteId: string,
	moves: ScoredMove[],
	bonuses: ScoredBonus[] = []
): Promise<void> => {
	const response = await request.post(
		`${BACKEND_URL}/addUpdateAthleteScore/${heatId}/${athleteId}/${RUN_NUMBER}/${JUDGE_ID}?phase_id=${phaseId}`,
		{ data: { moves, bonuses, request_id: nextUuid7() } }
	)
	expect(response.status()).toBe(200)
}

const readBackMoves = async (
	request: APIRequestContext,
	heatId: string,
	athleteId: string
): Promise<ScoredMove[]> => {
	const response = await request.get(
		`${BACKEND_URL}/getAthleteMovesAndBonuses/${heatId}/${athleteId}/${RUN_NUMBER}?judge_id=${JUDGE_ID}`
	)
	expect(response.status()).toBe(200)
	const body = (await response.json()) as { moves: ScoredMove[] }

	return body.moves
}

const readBackBonuses = async (
	request: APIRequestContext,
	heatId: string,
	athleteId: string
): Promise<ScoredBonus[]> => {
	const response = await request.get(
		`${BACKEND_URL}/getAthleteMovesAndBonuses/${heatId}/${athleteId}/${RUN_NUMBER}?judge_id=${JUDGE_ID}`
	)
	expect(response.status()).toBe(200)
	const body = (await response.json()) as { bonuses: ScoredBonus[] }

	return body.bonuses
}

const readRunStatuses = async (
	request: APIRequestContext,
	heatId: string,
	phaseId: string,
	athleteId: string
): Promise<Array<{ locked: boolean; did_not_start: boolean }>> => {
	const response = await request.get(
		`${BACKEND_URL}/run_status/?heat_id____list=${heatId}` +
			`&phase_id____list=${phaseId}&athlete_id____list=${athleteId}` +
			`&run_number____list=${RUN_NUMBER}`
	)
	expect(response.status()).toBe(200)

	return response.json()
}

const setRunStatusViaSocket = async (
	heatId: string,
	phaseId: string,
	athleteId: string,
	fields: { locked: boolean; did_not_start: boolean }
): Promise<void> => {
	const socket: Socket = io(`${BACKEND_URL}/run_status`, {
		path: "/socket.io/",
		transports: ["websocket"],
		reconnection: false
	})
	try {
		await new Promise<void>((resolve, reject) => {
			socket.once("connect", () => resolve())
			socket.once("connect_error", reject)
		})
		await new Promise<void>((resolve, reject) => {
			const timer = setTimeout(
				() => reject(new Error("no run_status echo within 10s")),
				10000
			)
			socket.once("run_status", () => {
				clearTimeout(timer)
				resolve()
			})
			socket.emit("run_status", {
				id: randomUUID(),
				heat_id: heatId,
				athlete_id: athleteId,
				phase_id: phaseId,
				run_number: RUN_NUMBER,
				...fields
			})
		})
	} finally {
		socket.close()
	}
}

const getHeatRunScores = async (
	request: APIRequestContext,
	heatId: string,
	athleteId: string
): Promise<RunScore[]> => {
	const response = await request.get(`${BACKEND_URL}/getHeatScores/${heatId}`)
	expect(response.status()).toBe(200)
	const body = (await response.json()) as {
		scores: Array<{ athlete_id: string; run_scores: RunScore[] }>
	}
	const athleteScores = body.scores.find((s) => s.athlete_id === athleteId)
	expect(athleteScores).toBeTruthy()

	return athleteScores!.run_scores
}

const createHeatInSameCompetition = async (
	request: APIRequestContext,
	data: TestData,
	name: string
): Promise<string> => {
	const heatId = randomUUID()
	const response = await request.post(`${BACKEND_URL}/heat/`, {
		data: [{ id: heatId, competition_id: data.competitionId, name }]
	})
	expect(response.status()).toBe(201)

	return heatId
}

const createPhaseInSameEvent = async (
	request: APIRequestContext,
	data: TestData,
	scoresheetId: string,
	name: string
): Promise<string> => {
	const phaseId = randomUUID()
	const response = await request.post(`${BACKEND_URL}/phase/`, {
		data: [
			{
				id: phaseId,
				event_id: data.eventId,
				name,
				number_of_runs: 1,
				number_of_runs_for_score: 1,
				number_of_judges: 1,
				scoresheet: scoresheetId
			}
		]
	})
	expect(response.status()).toBe(201)

	return phaseId
}

const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" }

const fetchMoveWithBonus = async (
	request: APIRequestContext,
	scoresheetId: string
): Promise<{ moveId: string; direction: string; bonusId: string }> => {
	const bonusResponse = await request.get(
		`${BACKEND_URL}/availablebonuses/?sheet_id____list=${scoresheetId}&limit=1`
	)
	expect(bonusResponse.status()).toBe(200)
	const bonuses = (await bonusResponse.json()) as Array<{
		id: string
		move_id: string
	}>
	expect(bonuses.length).toBeGreaterThan(0)
	const bonus = bonuses[0]

	const moveResponse = await request.get(
		`${BACKEND_URL}/availablemoves/?sheet_id____list=${scoresheetId}&id____list=${bonus.move_id}`
	)
	expect(moveResponse.status()).toBe(200)
	const moves = (await moveResponse.json()) as Array<{
		id: string
		direction: string
	}>
	expect(moves).toHaveLength(1)

	return {
		moveId: moves[0].id,
		direction: directionMap[moves[0].direction]!,
		bonusId: bonus.id
	}
}

const moveAthlete = async (
	request: APIRequestContext,
	athleteHeatId: string,
	body: { heat_id?: string; phase_id?: string }
): Promise<AthleteHeatMoveResponse> => {
	const response = await request.patch(
		`${BACKEND_URL}/athleteheat/${athleteHeatId}`,
		{ data: body }
	)
	expect(response.status()).toBe(200)

	return response.json()
}

test.describe("moving an athlete between heats", () => {
	test("preserves scores when the destination phase uses the same scoresheet", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const [move] = await fetchTwoMoves(request, BACKEND_URL, data.scoresheetId)
		const scoredMove = {
			id: randomUUID(),
			move_id: move.moveId,
			direction: move.direction
		}
		await submitScore(request, data.heatId, data.phaseId, data.athleteId, [
			scoredMove
		])

		const newHeatId = await createHeatInSameCompetition(
			request,
			data,
			`E2E Destination Heat ${Date.now()}`
		)
		const moveResult = await moveAthlete(request, data.athleteHeatId, {
			heat_id: newHeatId
		})

		expect(moveResult.scores_preserved).toBe(true)
		expect(
			await readBackMoves(request, newHeatId, data.athleteId)
		).toHaveLength(1)
		expect(
			await readBackMoves(request, data.heatId, data.athleteId)
		).toHaveLength(0)
	})

	test("clears scores when the destination phase uses a different scoresheet", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const [move] = await fetchTwoMoves(request, BACKEND_URL, data.scoresheetId)
		await submitScore(request, data.heatId, data.phaseId, data.athleteId, [
			{ id: randomUUID(), move_id: move.moveId, direction: move.direction }
		])

		// icf_2026 is a different seeded scoresheet from icf_2025 (used by
		// setupTestData), so this phase scores against genuinely different
		// available moves.
		const otherSheetResponse = await request.get(
			`${BACKEND_URL}/scoresheet/?name____list=icf_2026`
		)
		expect(otherSheetResponse.status()).toBe(200)
		const otherSheets = (await otherSheetResponse.json()) as Array<{
			id: string
		}>
		expect(otherSheets.length).toBeGreaterThan(0)
		const otherScoresheetId = otherSheets[0].id
		expect(otherScoresheetId).not.toBe(data.scoresheetId)

		const newPhaseId = await createPhaseInSameEvent(
			request,
			data,
			otherScoresheetId,
			`E2E Other-Scoresheet Phase ${Date.now()}`
		)
		const moveResult = await moveAthlete(request, data.athleteHeatId, {
			phase_id: newPhaseId
		})

		expect(moveResult.scores_preserved).toBe(false)
		expect(
			await readBackMoves(request, data.heatId, data.athleteId)
		).toHaveLength(0)
	})

	test("keeps a locked run locked, and a did-not-start run did-not-start, after a same-scoresheet move", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const [move] = await fetchTwoMoves(request, BACKEND_URL, data.scoresheetId)
		await submitScore(request, data.heatId, data.phaseId, data.athleteId, [
			{ id: randomUUID(), move_id: move.moveId, direction: move.direction }
		])
		// A locked run keeps the moves the judge scored before it was locked;
		// did-not-start is set independently and here has no moves behind it.
		await setRunStatusViaSocket(data.heatId, data.phaseId, data.athleteId, {
			locked: true,
			did_not_start: false
		})

		const newHeatId = await createHeatInSameCompetition(
			request,
			data,
			`E2E Locked-Run Destination Heat ${Date.now()}`
		)
		const moveResult = await moveAthlete(request, data.athleteHeatId, {
			heat_id: newHeatId
		})
		expect(moveResult.scores_preserved).toBe(true)

		expect(
			await readRunStatuses(request, data.heatId, data.phaseId, data.athleteId)
		).toHaveLength(0)

		const newStatuses = await readRunStatuses(
			request,
			newHeatId,
			data.phaseId,
			data.athleteId
		)
		expect(newStatuses).toHaveLength(1)
		expect(newStatuses[0].locked).toBe(true)
		expect(newStatuses[0].did_not_start).toBe(false)

		const runScores = await getHeatRunScores(request, newHeatId, data.athleteId)
		expect(runScores[0].locked).toBe(true)
		expect(runScores[0].did_not_start).toBe(false)
	})

	// A did-not-start run has no scored moves behind it, so the athlete never
	// appears in getHeatScores at all (its athlete list comes from scoredMoves,
	// a pre-existing characteristic this change doesn't touch) — checked
	// directly against run_status instead.
	test("keeps a did-not-start run did-not-start after a same-scoresheet move", async ({
		request
	}) => {
		const data = await setupTestData(request)
		await setRunStatusViaSocket(data.heatId, data.phaseId, data.athleteId, {
			locked: false,
			did_not_start: true
		})

		const newHeatId = await createHeatInSameCompetition(
			request,
			data,
			`E2E DNS Destination Heat ${Date.now()}`
		)
		const moveResult = await moveAthlete(request, data.athleteHeatId, {
			heat_id: newHeatId
		})
		expect(moveResult.scores_preserved).toBe(true)

		expect(
			await readRunStatuses(request, data.heatId, data.phaseId, data.athleteId)
		).toHaveLength(0)

		const newStatuses = await readRunStatuses(
			request,
			newHeatId,
			data.phaseId,
			data.athleteId
		)
		expect(newStatuses).toHaveLength(1)
		expect(newStatuses[0].locked).toBe(false)
		expect(newStatuses[0].did_not_start).toBe(true)
	})

	// This is the failure move_preserves_scores exists to prevent. It takes two
	// athleteheat rows for the SAME athlete to reach it — which promote_phase
	// creates on purpose, leaving a promoted athlete's prior-phase row and
	// scores in place while giving them a new row in the phase they advanced
	// to. Moving the old row into the new destination must not merge its
	// scores into the ones already there: two judges' scores for the same run
	// would sum into one inflated total.
	test("does not merge scores when the destination already has scores for this athlete", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const [sourceMove, destinationMove] = await fetchTwoMoves(
			request,
			BACKEND_URL,
			data.scoresheetId
		)
		await submitScore(request, data.heatId, data.phaseId, data.athleteId, [
			{
				id: randomUUID(),
				move_id: sourceMove.moveId,
				direction: sourceMove.direction
			}
		])

		// The same athlete already has a second athleteheat entry, with its
		// own scores, in what will become the move's destination.
		const destinationHeatId = await createHeatInSameCompetition(
			request,
			data,
			`E2E Occupied Destination Heat ${Date.now()}`
		)
		const destinationAthleteHeatId = randomUUID()
		const destinationAthleteHeatResponse = await request.post(
			`${BACKEND_URL}/athleteheat/`,
			{
				data: [
					{
						id: destinationAthleteHeatId,
						athlete_id: data.athleteId,
						heat_id: destinationHeatId,
						phase_id: data.phaseId
					}
				]
			}
		)
		expect(destinationAthleteHeatResponse.status()).toBe(201)
		await submitScore(request, destinationHeatId, data.phaseId, data.athleteId, [
			{
				id: randomUUID(),
				move_id: destinationMove.moveId,
				direction: destinationMove.direction
			}
		])

		// Move the source entry into that same, already-occupied heat/phase.
		const moveResult = await moveAthlete(request, data.athleteHeatId, {
			heat_id: destinationHeatId
		})
		expect(moveResult.scores_preserved).toBe(false)

		// The source entry's scores were discarded, not merged in.
		expect(
			await readBackMoves(request, data.heatId, data.athleteId)
		).toHaveLength(0)

		// The destination entry's own scores are untouched — still just the
		// one move, not two.
		const destinationMoves = await readBackMoves(
			request,
			destinationHeatId,
			data.athleteId
		)
		expect(destinationMoves).toHaveLength(1)
		expect(destinationMoves[0].move_id).toBe(destinationMove.moveId)

		const runScores = await getHeatRunScores(
			request,
			destinationHeatId,
			data.athleteId
		)
		expect(runScores).toHaveLength(1)
		expect(runScores[0].mean_run_score).toBeGreaterThan(0)
	})

	test("leaves no orphaned bonuses or run statuses after a discarding move", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const { moveId, direction, bonusId } = await fetchMoveWithBonus(
			request,
			data.scoresheetId
		)
		const scoredMoveId = randomUUID()
		await submitScore(
			request,
			data.heatId,
			data.phaseId,
			data.athleteId,
			[{ id: scoredMoveId, move_id: moveId, direction }],
			[{ id: randomUUID(), bonus_id: bonusId, move_id: scoredMoveId }]
		)
		expect(
			await readBackBonuses(request, data.heatId, data.athleteId)
		).toHaveLength(1)
		await setRunStatusViaSocket(data.heatId, data.phaseId, data.athleteId, {
			locked: true,
			did_not_start: false
		})

		// A phase using a different scoresheet forces the discarding branch.
		const otherSheetResponse = await request.get(
			`${BACKEND_URL}/scoresheet/?name____list=icf_2026`
		)
		expect(otherSheetResponse.status()).toBe(200)
		const otherScoresheetId = (
			(await otherSheetResponse.json()) as Array<{ id: string }>
		)[0].id
		const newPhaseId = await createPhaseInSameEvent(
			request,
			data,
			otherScoresheetId,
			`E2E Orphan-Check Phase ${Date.now()}`
		)

		const moveResult = await moveAthlete(request, data.athleteHeatId, {
			phase_id: newPhaseId
		})
		expect(moveResult.scores_preserved).toBe(false)

		expect(
			await readBackMoves(request, data.heatId, data.athleteId)
		).toHaveLength(0)
		expect(
			await readBackBonuses(request, data.heatId, data.athleteId)
		).toHaveLength(0)
		expect(
			await readRunStatuses(request, data.heatId, data.phaseId, data.athleteId)
		).toHaveLength(0)
	})

	// promote_phase deliberately gives a promoted athlete a second athleteheat
	// entry, leaving their old one (and its scores) in place. Editing both
	// entries into the same empty destination at once is check-then-act on the
	// occupancy check: without the advisory lock in _move_athlete_scores, both
	// requests could read the destination as free and both preserve, leaving
	// two judges' worth of moves for one run summed into one inflated score.
	test("serialises two concurrent moves of the same athlete's two entries into one destination", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const [firstMove, secondMove] = await fetchTwoMoves(
			request,
			BACKEND_URL,
			data.scoresheetId
		)
		await submitScore(request, data.heatId, data.phaseId, data.athleteId, [
			{ id: randomUUID(), move_id: firstMove.moveId, direction: firstMove.direction }
		])

		const newHeatName = `E2E Promoted Heat ${Date.now()}`
		const promoteResponse = await request.post(
			`${BACKEND_URL}/competition_management/promote_phase`,
			{
				data: {
					request_body: {
						new_heat_names: [newHeatName],
						phase_id: data.phaseId,
						new_phase_name: `E2E Promoted Phase ${Date.now()}`,
						number_of_paddlers: 1
					}
				}
			}
		)
		expect(promoteResponse.status()).toBe(201)

		const promotedHeatsResponse = await request.get(
			`${BACKEND_URL}/heat/?competition_id____list=${data.competitionId}` +
				`&name____list=${encodeURIComponent(newHeatName)}`
		)
		expect(promotedHeatsResponse.status()).toBe(200)
		const promotedHeats = (await promotedHeatsResponse.json()) as Array<{
			id: string
		}>
		expect(promotedHeats).toHaveLength(1)
		const promotedHeatId = promotedHeats[0].id

		const promotedHeatInfoResponse = await request.get(
			`${BACKEND_URL}/getHeatInfo/${promotedHeatId}`
		)
		expect(promotedHeatInfoResponse.status()).toBe(200)
		const promotedHeatInfo = (await promotedHeatInfoResponse.json()) as Array<{
			athlete_id: string
			athlete_heat_id: string
			phase_id: string
		}>
		const promotedEntry = promotedHeatInfo.find(
			(h) => h.athlete_id === data.athleteId
		)
		expect(promotedEntry).toBeTruthy()
		const promotedAthleteHeatId = promotedEntry!.athlete_heat_id
		const promotedPhaseId = promotedEntry!.phase_id

		await submitScore(
			request,
			promotedHeatId,
			promotedPhaseId,
			data.athleteId,
			[
				{
					id: randomUUID(),
					move_id: secondMove.moveId,
					direction: secondMove.direction
				}
			]
		)

		const destinationHeatId = await createHeatInSameCompetition(
			request,
			data,
			`E2E Race Destination Heat ${Date.now()}`
		)
		const destinationPhaseId = await createPhaseInSameEvent(
			request,
			data,
			data.scoresheetId,
			`E2E Race Destination Phase ${Date.now()}`
		)

		const [firstResult, secondResult] = await Promise.all([
			moveAthlete(request, data.athleteHeatId, {
				heat_id: destinationHeatId,
				phase_id: destinationPhaseId
			}),
			moveAthlete(request, promotedAthleteHeatId, {
				heat_id: destinationHeatId,
				phase_id: destinationPhaseId
			})
		])

		expect(
			[firstResult.scores_preserved, secondResult.scores_preserved].sort()
		).toEqual([false, true])

		const destinationMoves = await readBackMoves(
			request,
			destinationHeatId,
			data.athleteId
		)
		expect(destinationMoves).toHaveLength(1)
	})
})
