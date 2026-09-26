import { expect, test, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "node:crypto"
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

const submitScore = async (
	request: APIRequestContext,
	heatId: string,
	phaseId: string,
	athleteId: string,
	moves: { id: string; move_id: string; direction: string }[]
): Promise<void> => {
	const response = await request.post(
		`${BACKEND_URL}/addUpdateAthleteScore/${heatId}/${athleteId}/${RUN_NUMBER}/${JUDGE_ID}?phase_id=${phaseId}`,
		{ data: { moves, bonuses: [], request_id: nextUuid7() } }
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

test.describe("moving an athlete between heats (today's behaviour)", () => {
	// PATCH /athleteheat/{id} only ever touches the athleteheat row itself.
	// Nothing in the server today re-points or deletes scoredMoves when an
	// athlete moves, so a move via the API alone leaves the athlete's scores
	// orphaned against the heat they left, invisible in the heat they joined.
	// This pins that behaviour before the change that fixes it; see 6.1 for
	// the same scenario asserting the new, fixed behaviour.
	test("moving an athlete to a new heat leaves their scores behind", async ({
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
		expect(
			await readBackMoves(request, data.heatId, data.athleteId)
		).toHaveLength(1)

		const newHeatId = await createHeatInSameCompetition(
			request,
			data,
			`E2E Destination Heat ${Date.now()}`
		)
		const moveResponse = await request.patch(
			`${BACKEND_URL}/athleteheat/${data.athleteHeatId}`,
			{ data: { heat_id: newHeatId } }
		)
		expect(moveResponse.status()).toBe(200)

		expect(
			await readBackMoves(request, data.heatId, data.athleteId)
		).toHaveLength(1)
		expect(
			await readBackMoves(request, newHeatId, data.athleteId)
		).toHaveLength(0)
	})
})
