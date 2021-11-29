import { atom } from "recoil"

export const currentJwt = atom({
	key: "currrentJwt", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const currentToken = atom({
	key: "currentToken", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const currentTokenExpiry = atom({
	key: "currentTokenExpiry", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const currentUser = atom({
	key: "currentUser", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
