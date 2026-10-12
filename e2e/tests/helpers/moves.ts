import { expect, type APIRequestContext } from "@playwright/test";

const directionMap: Record<string, string> = { LR: "L", FB: "F", S: "S" };

export const fetchMoves = async (
  request: APIRequestContext,
  backendUrl: string,
  scoresheetId: string,
  count: number,
): Promise<{ moveId: string; direction: string }[]> => {
  const response = await request.get(
    `${backendUrl}/availablemoves/?sheet_id____list=${scoresheetId}&limit=20`,
  );
  expect(response.status()).toBe(200);
  const moves = (await response.json()) as Array<{
    id: string;
    direction: string;
  }>;
  expect(moves.length).toBeGreaterThanOrEqual(count);

  return moves.slice(0, count).map((move) => {
    expect(Object.keys(directionMap)).toContain(move.direction);

    return { moveId: move.id, direction: directionMap[move.direction]! };
  });
};

export const fetchTwoMoves = (
  request: APIRequestContext,
  backendUrl: string,
  scoresheetId: string,
) => fetchMoves(request, backendUrl, scoresheetId, 2);
