export interface ServerClock {
	calibrateFromFirstDateHeader: (dateHeader: string | null | undefined) => void
	correctedNow: () => number
}

export const createServerClock = (): ServerClock => {
	let offsetMs: number | undefined

	const calibrateFromFirstDateHeader = (
		dateHeader: string | null | undefined
	): void => {
		if (offsetMs !== undefined || !dateHeader) {
			return
		}
		const serverMs = Date.parse(dateHeader)
		if (Number.isNaN(serverMs)) {
			return
		}
		offsetMs = serverMs - Date.now()
	}

	const correctedNow = (): number => Date.now() + (offsetMs ?? 0)

	return { calibrateFromFirstDateHeader, correctedNow }
}

export const serverClock = createServerClock()
