/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { toast } from "react-hot-toast"
import conf from "./config"
export const registerRejectedPromise = () => {
	window.onunhandledrejection = (err: any) => {
		handleErrors(err)
	}
}

export const handleErrors = (e: any) => {
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
		toast.error(message)
	} else {
		toast.error("Something Went Wrong :(")
	}
}
const env = conf.get("env")
