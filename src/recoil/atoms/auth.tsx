/* eslint-disable camelcase */
import { atom, AtomEffect } from "recoil"

const localStorageEffect = (key: string): AtomEffect<string | number> => ({
	setSelf,
	onSet
}) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null) {
		setSelf(JSON.parse(savedValue))
	}

	onSet((newValue) => {
		const newString = JSON.stringify(newValue)
		if (newString !== "{}") {
			localStorage.setItem(key, newString)
		} else {
			localStorage.removeItem(key)
		}
	})
}

export const currentToken = atom({
	key: "currentToken", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffect("currentToken")]
})
export const refreshToken = atom({
	key: "refreshToken", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffect("refreshToken")]
})
export const currentTokenExpiry = atom({
	key: "currentTokenExpiry", // unique ID (with respect to other atoms/selectors)
	default: 0 as number, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffect("currentTokenExpiry")]
})
export const currentUser = atom({
	key: "currentUser", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffect("currentuser")]
})
export const currentUserInitials = atom({
	key: "currentUserInitials", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffect("currentUserInitials")]
})

// https://recoiljs.org/docs/guides/atom-effects
