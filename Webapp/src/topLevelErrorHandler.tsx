/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { toast } from "react-hot-toast"

export const registerRejectedPromise = () => {
	window.onunhandledrejection = (err: any) => {
		handleErrors(err)
	}
}

const ERROR_MESSAGE_PATHS = [
	["statusText"],
	["message"],
	["reason", "message"],
	["reason"],
	["data", "detail"],
	["payload", "error"],
	["payload", "data", "detail"],
	["error", "message"]
]

const valueAtPath = (error: any, path: string[]): any =>
	path.reduce((value, key) => value?.[key], error)

const extractErrorMessage = (error: any): string => {
	if (typeof error === "string") {
		return error
	}

	return (
		ERROR_MESSAGE_PATHS.map((path) => valueAtPath(error, path)).find(
			(value) => value !== undefined && value !== null
		) ?? "Undefined Error"
	)
}

export const handleErrors = (e: any) => {
	// A route change cancelled on purpose (e.g. by an unsaved-changes guard)
	// can only be aborted by throwing, so it arrives here but is not a failure.
	if (e?.reason?.cancelled) {
		return
	}
	const isDevelopment = process.env.NODE_ENV === "development"
	if (isDevelopment) {
		const message = extractErrorMessage(e)
		toast.error(JSON.stringify(message))
	} else {
		toast.error("Something Went Wrong :(")
	}
}
