/* eslint-disable camelcase */
import { atom, AtomEffect } from "recoil"

const localStorageEffectString = (key: string): AtomEffect<string> => ({
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

const localStorageEffectNumber = (key: string): AtomEffect<number> => ({
	setSelf,
	onSet
}) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null) {
		setSelf(Number(JSON.parse(savedValue)))
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
export const currentToken = atom<string>({
	key: "currentToken", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffectString("currentToken")]
})
export const refreshToken = atom<string>({
	key: "refreshToken", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffectString("refreshToken")]
})
export const currentTokenExpiry = atom<number>({
	key: "currentTokenExpiry", // unique ID (with respect to other atoms/selectors)
	default: 0, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffectNumber("currentTokenExpiry")]
})
export const currentUser = atom<string>({
	key: "currentUser", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffectString("currentuser")]
})
export const currentUserInitials = atom<string>({
	key: "currentUserInitials", // unique ID (with respect to other atoms/selectors)
	default: "" as string, // default value (aka initial value)
	effects_UNSTABLE: [localStorageEffectString("currentUserInitials")]
})

// https://recoiljs.org/docs/guides/atom-effects
