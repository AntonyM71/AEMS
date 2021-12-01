import { atom } from "recoil"

export const currentToken = atom({
	key: "currentToken", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const refreshToken = atom({
	key: "refreshToken", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const currentTokenExpiry = atom({
	key: "currentTokenExpiry", // unique ID (with respect to other atoms/selectors)
	default: 0 as number // default value (aka initial value)
})
export const currentUser = atom({
	key: "currentUser", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})
export const currentUserInitials = atom({
	key: "currentUserInitials", // unique ID (with respect to other atoms/selectors)
	default: "" as string // default value (aka initial value)
})

const localStorageEffect = (key: string): AtomEffect => ({
	setSelf,
	onSet
}) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		setSelf(JSON.parse(savedValue))
	}

	onSet((newValue, _, isReset) => {
		isReset
			? localStorage.removeItem(key)
			: localStorage.setItem(key, JSON.stringify(newValue))
	})
}
// https://recoiljs.org/docs/guides/atom-effects
