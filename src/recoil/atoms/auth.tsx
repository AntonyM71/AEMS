import { atom } from "recoil"

export const currentToken = atom({
	key: "currentToken", // unique ID (with respect to other atoms/selectors)
	default: localStorage.getItem("userAccessToken") || ("" as string) // default value (aka initial value)
})
export const refreshToken = atom({
	key: "refreshToken", // unique ID (with respect to other atoms/selectors)
	default: localStorage.getItem("userRefreshToken") || ("" as string) // default value (aka initial value)
})
export const currentTokenExpiry = atom({
	key: "currentTokenExpiry", // unique ID (with respect to other atoms/selectors)
	default: localStorage.getItem("userAccessTokenExpiry") || (0 as number) // default value (aka initial value)
})
export const currentUser = atom({
	key: "currentUser", // unique ID (with respect to other atoms/selectors)
	default: localStorage.getItem("userName") || ("" as string) // default value (aka initial value)
})
export const currentUserInitials = atom({
	key: "currentUserInitials", // unique ID (with respect to other atoms/selectors)
	default: localStorage.getItem("userInitial") || ("" as string) // default value (aka initial value)
})
