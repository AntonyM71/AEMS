import { expect, test, type APIRequestContext } from "@playwright/test"
import { randomUUID } from "node:crypto"
import { setupTestData, type TestData } from "./helpers/testData"
import { nextUuid7 } from "./helpers/uuid7"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

const JUDGE_ID = "1"
const RUN_NUMBER = 0

interface AvailableMove {
	id: string
	name: string
	direction: string
}

interface ScoredMove {
	id: string
	move_id: string
	direction: string
}

const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" }

/** Two available moves from the seeded scoresheet, with a valid scored direction each. */
const fetchTwoMoves = async (
	request: APIRequestContext,
	scoresheetId: string
): Promise<{ moveId: string; direction: string }[]> => {
	const response = await request.get(
		`${BACKEND_URL}/availablemoves/?sheet_id____list=${scoresheetId}&limit=20`
	)
	expect(response.status()).toBe(200)
	const moves = (await response.json()) as AvailableMove[]
	expect(moves.length).toBeGreaterThanOrEqual(2)

	return moves.slice(0, 2).map((move) => {
		expect(Object.keys(directionMap)).toContain(move.direction)

		return { moveId: move.id, direction: directionMap[move.direction]! }
	})
}

const submitScore = async (
	request: APIRequestContext,
	data: TestData,
	moves: { id: string; move_id: string; direction: string }[]
): Promise<void> => {
	const response = await request.post(
		`${BACKEND_URL}/addUpdateAthleteScore/${data.heatId}/${data.athleteId}/${RUN_NUMBER}/${JUDGE_ID}?phase_id=${data.phaseId}`,
		{ data: { moves, bonuses: [], request_id: nextUuid7() } }
	)
	expect(response.status()).toBe(200)
}

const readBackMoves = async (
	request: APIRequestContext,
	data: TestData
): Promise<ScoredMove[]> => {
	const response = await request.get(
		`${BACKEND_URL}/getAthleteMovesAndBonuses/${data.heatId}/${data.athleteId}/${RUN_NUMBER}?judge_id=${JUDGE_ID}`
	)
	expect(response.status()).toBe(200)
	const body = (await response.json()) as { moves: ScoredMove[] }

	return body.moves
}

const identify = (moves: ScoredMove[]) =>
	moves
		.map((m) => `${m.move_id}:${m.direction}`)
		.sort()

test.describe("score submission", () => {
	// The scribe posts its whole move list on every edit, and the server
	// replaces what it holds with that list. A second submission must therefore
	// end up with exactly its own moves — appending would double-count the
	// first, and dropping them would erase the judge's earlier work.
	test("a later submission replaces the judge's earlier one", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const [first, second] = await fetchTwoMoves(request, data.scoresheetId)

		const firstMove = {
			id: randomUUID(),
			move_id: first.moveId,
			direction: first.direction
		}
		await submitScore(request, data, [firstMove])

		expect(identify(await readBackMoves(request, data))).toEqual(
			identify([firstMove as ScoredMove])
		)

		const secondMove = {
			id: randomUUID(),
			move_id: second.moveId,
			direction: second.direction
		}
		await submitScore(request, data, [firstMove, secondMove])

		const afterSecond = await readBackMoves(request, data)
		expect(afterSecond).toHaveLength(2)
		expect(identify(afterSecond)).toEqual(
			identify([firstMove, secondMove] as ScoredMove[])
		)
	})

	// Clearing every move is an ordinary submission carrying an empty list.
	test("submitting an empty list clears the judge's moves", async ({
		request
	}) => {
		const data = await setupTestData(request)
		const [first] = await fetchTwoMoves(request, data.scoresheetId)

		await submitScore(request, data, [
			{
				id: randomUUID(),
				move_id: first.moveId,
				direction: first.direction
			}
		])
		expect(await readBackMoves(request, data)).toHaveLength(1)

		await submitScore(request, data, [])
		expect(await readBackMoves(request, data)).toHaveLength(0)
	})
})
