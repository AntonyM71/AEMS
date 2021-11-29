import { atom } from "recoil"
import { heatsType } from "../../competitiondata/Competitions"
import { testHeat } from "../../components/judging/sheets/Float/tests/TestData"
import { isTest } from "./scoring"

export const selectedCompetitionState = atom({
	key: "selectedCompetition", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})

export const selectedEventState = atom({
	key: "selectedEvent", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const numberOfRunsInHeatState = atom({
	key: "numberOfRuns", // unique ID (with respect to other atoms/selectors)
	default: 3 as number // default value (aka initial value)
})
export const selectedHeatState = atom({
	key: "selectedHeat", // unique ID (with respect to other atoms/selectors)
	default: isTest ? testHeat : ({} as heatsType) // default value (aka initial value)
})
export const heatsListState = atom({
	key: "heatsList", // unique ID (with respect to other atoms/selectors)
	default: [] as heatsType[] // default value (aka initial value)
})
export const selectedPhaseState = atom({
	key: "selectedPhase", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
