export const MEDAL_PLACES = 3
export const TOWER_MAX_ROWS = 18
// Rows the athletes below the bubble keep even when the qualifiers above it
// would fill the tower, so viewers still see who is chasing the line.
const ROWS_KEPT_BELOW_BUBBLE = 3

/** Indices into the standings, and how many rows they get on screen. A
 * section with fewer rows than places rotates through them. */
export interface TowerSection {
	places: number[]
	rows: number
}

export interface TowerLayoutOptions {
	placesThrough: number | null
	/** Most rows for the qualifiers between the medals and the bubble; null
	 * gives them every row that fits. */
	qualifierRows: number | null
}

const range = (from: number, to: number) =>
	Array.from({ length: Math.max(0, to - from) }, (_, i) => from + i)

/** Pins the medal places and the bubble around the cut line, and shares what
 * is left of the tower between the athletes above and below the bubble. */
export const towerLayout = (
	count: number,
	{ placesThrough, qualifierRows }: TowerLayoutOptions
): TowerSection[] => {
	const capsQualifiers = placesThrough !== null && qualifierRows !== null
	if (count <= TOWER_MAX_ROWS && !capsQualifiers) {
		return [{ places: range(0, count), rows: count }]
	}
	const medals = range(0, Math.min(MEDAL_PLACES, count))
	const bubble = placesThrough
		? range(
				Math.max(MEDAL_PLACES, placesThrough - 2),
				Math.min(count, placesThrough + 2)
		  )
		: []
	const between = range(MEDAL_PLACES, bubble[0] ?? count)
	const below = range(
		bubble.length ? bubble[bubble.length - 1] + 1 : count,
		count
	)
	const spare = TOWER_MAX_ROWS - medals.length - bubble.length
	const betweenRows = Math.min(
		between.length,
		capsQualifiers ? qualifierRows : Infinity,
		spare - Math.min(below.length, ROWS_KEPT_BELOW_BUBBLE)
	)
	const belowRows = Math.min(below.length, spare - betweenRows)

	return [
		{ places: medals, rows: medals.length },
		{ places: between, rows: betweenRows },
		{ places: bubble, rows: bubble.length },
		{ places: below, rows: belowRows }
	].filter((section) => section.places.length > 0 && section.rows > 0)
}
