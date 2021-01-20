import { atom } from "recoil"

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
export const selectedPhaseState = atom({
	key: "selectedPhase", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
