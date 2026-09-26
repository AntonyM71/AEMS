import { expect, type APIRequestContext } from "@playwright/test"

const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" }

export const fetchTwoMoves = async (
	request: APIRequestContext,
	backendUrl: string,
	scoresheetId: string
): Promise<{ moveId: string; direction: string }[]> => {
	const response = await request.get(
		`${backendUrl}/availablemoves/?sheet_id____list=${scoresheetId}&limit=20`
	)
	expect(response.status()).toBe(200)
	const moves = (await response.json()) as Array<{
		id: string
		direction: string
	}>
	expect(moves.length).toBeGreaterThanOrEqual(2)

	return moves.slice(0, 2).map((move) => {
		expect(Object.keys(directionMap)).toContain(move.direction)

		return { moveId: move.id, direction: directionMap[move.direction]! }
	})
}
