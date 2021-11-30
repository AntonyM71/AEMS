/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AddToast } from "react-toast-notifications"
import conf from "./config"
export const registerRejectedPromise = (addToast: AddToast) => {
	window.onunhandledrejection = (err: any) => {
		handleErrors(err, addToast)
	}
}

export const handleErrors = (e: any, addToast: AddToast) => {
	// eslint-disable-next-line no-constant-condition
	if (env === "development" || "staging") {
		const message = e.statusText
			? e.statusText
			: e.message
			? e.message
			: e.reason && e.reason.message
			? e.reason.message
			: e.reason
			? e.reason
			: "Undefined Error"
		console.log(e)
		console.log(message)
		addToast(message, { appearance: "error", autoDismiss: true })
	} else {
		addToast("Something Went Wrong :(")
	}
}
const env = conf.get("env")
