export const groupBy = <T>(
	items: T[],
	keyOf: (item: T) => string
): Record<string, T[]> => {
	const groups: Record<string, T[]> = {}
	for (const item of items) {
		const key = keyOf(item)
		;(groups[key] ??= []).push(item)
	}

	return groups
}

// Keeps the first item seen for each distinct value of `key`.
export const uniqBy = <T>(items: T[], key: keyof T): T[] => {
	const seen = new Set<unknown>()

	return items.filter((item) => {
		if (seen.has(item[key])) {
			return false
		}
		seen.add(item[key])

		return true
	})
}
