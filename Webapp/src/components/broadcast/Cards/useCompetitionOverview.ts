import {
	useGetManyCompetitionGetQuery,
	useGetManyEventGetQuery,
	useGetManyHeatGetQuery
} from "../../../redux/services/aemsApi"
import { OverlayControlState } from "../../Interfaces"

const WINDOW_SIZE = 8

/** Name order with numbers compared as numbers, so "Heat 2" precedes
 * "Heat 10". Events and heats have no running-order field to sort by. */
export const sortByName = <T extends { name: string }>(items: T[]): T[] =>
	[...items].sort((a, b) =>
		a.name.localeCompare(b.name, undefined, {
			numeric: true,
			sensitivity: "base"
		})
	)

/** `[start, end)` of a `size`-long window that keeps `currentIndex` fourth,
 * clamped to the list's ends. A `currentIndex` of -1 starts at the top. */
export const windowAround = (
	count: number,
	currentIndex: number,
	size = WINDOW_SIZE
): [number, number] => {
	if (count <= size) {
		return [0, count]
	}
	const start = Math.min(Math.max(currentIndex - 3, 0), count - size)

	return [start, start + size]
}

export interface CompetitionOverviewStep {
	id: string
	name: string
	isCurrent: boolean
	isPast: boolean
}

/** The competition's events or heats (per `competitionOverviewList`), in
 * name order and windowed around the selected one. */
export const useCompetitionOverview = (
	overlayControlState: OverlayControlState
) => {
	const {
		selectedCompetition,
		selectedEvent,
		selectedHeat,
		competitionOverviewList
	} = overlayControlState
	const listsEvents = competitionOverviewList === "events"
	const { data: competitions } = useGetManyCompetitionGetQuery(
		{ idList: [selectedCompetition] },
		{ skip: !selectedCompetition }
	)
	const { data: events } = useGetManyEventGetQuery(
		{ competitionIdList: [selectedCompetition] },
		{ skip: !selectedCompetition || !listsEvents }
	)
	const { data: heats } = useGetManyHeatGetQuery(
		{ competitionIdList: [selectedCompetition] },
		{ skip: !selectedCompetition || listsEvents }
	)

	const entries = sortByName((listsEvents ? events : heats) ?? [])
	const currentId = listsEvents ? selectedEvent : selectedHeat
	const currentIndex = entries.findIndex((entry) => entry.id === currentId)
	const [start, end] = windowAround(entries.length, currentIndex)

	return {
		competitionName: competitions?.[0]?.name,
		heading: listsEvents ? "Events" : "Heats",
		steps: entries.slice(start, end).map(
			(entry, offset): CompetitionOverviewStep => ({
				id: entry.id,
				name: entry.name,
				isCurrent: start + offset === currentIndex,
				isPast: currentIndex >= 0 && start + offset < currentIndex
			})
		),
		windowNote:
			entries.length > WINDOW_SIZE
				? `${start + 1}–${end} of ${entries.length}`
				: undefined
	}
}
