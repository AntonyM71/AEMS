import { atom } from "recoil"
import { heatsType } from "../competitiondata/Competitions"
import { scoredMovesType } from "../components/judging/sheets/Float/Interfaces"
import { testHeat } from "../components/judging/sheets/Float/tests/TestData"

const isTest = process.env.NODE_ENV === "test" ? true : false

export const preferDarkState = atom({
	key: "preferDarkState", // unique ID (with respect to other atoms/selectors)
	default: false as boolean // default value (aka initial value)
})

export const selectedCompetitionState = atom({
	key: "selectedCompetition", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})

export const selectedEventState = atom({
	key: "selectedEvent", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const selectedPaddlerState = atom({
	key: "selectedPaddler", // unique ID (with respect to other atoms/selectors)
	default: 0 as number // default value (aka initial value)
})
export const selectedRunState = atom({
	key: "selectedRun", // unique ID (with respect to other atoms/selectors)
	default: 0 as number // default value (aka initial value)
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
export const currentMoveState = atom({
	key: "currentMove", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const selectedPhaseState = atom({
	key: "selectedPhase", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const scoredMovesState = atom({
	key: "scoredMovesState", // unique ID (with respect to other atoms/selectors)
	default: [] as scoredMovesType[] // default value (aka initial value)
})
