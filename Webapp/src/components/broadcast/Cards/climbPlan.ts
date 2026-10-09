export interface ClimbPlan {
	athleteId: string
	/** Index the climb starts from: the old place, or one past the end of the
	 * old standings for an athlete new to the board. */
	from: number
	to: number
	/** The athlete the climb pushes below the cut line, if it crosses it. */
	pushedOutId?: string
}

/** How an athlete's row climbs from the old standings to the new, given as
 * athlete ids best first. Null when the athlete hasn't moved up. */
export const climbPlan = (
	before: string[],
	after: string[],
	athleteId: string,
	placesThrough: number | null
): ClimbPlan | null => {
	const to = after.indexOf(athleteId)
	const oldIndex = before.indexOf(athleteId)
	// Kept within the new standings: someone may have left the board in the
	// same reload.
	const from = Math.min(
		oldIndex === -1 ? before.length : oldIndex,
		after.length - 1
	)
	if (to === -1 || to >= from) {
		return null
	}
	const crossesCut =
		placesThrough !== null && from >= placesThrough && to < placesThrough

	return {
		athleteId,
		from,
		to,
		pushedOutId: crossesCut ? after[placesThrough] : undefined
	}
}
