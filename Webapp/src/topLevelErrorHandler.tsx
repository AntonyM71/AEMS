/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { toast } from "react-hot-toast"
export const registerRejectedPromise = () => {
	window.onunhandledrejection = (err: any) => {
		handleErrors(err)
	}
}

export const handleErrors = (e: any) => {
	// eslint-disable-next-line no-constant-condition
	if (env === "development" || "staging") {
		// eslint-disable-next-line no-console
		console.log(e)
		const message = e.statusText
			? e.statusText
			: e.message
			? e.message
			: e.reason && e.reason.message
			? e.reason.message
			: e.reason
			? e.reason
			: e.data?.detail
			? e.data.detail
			: "Undefined Error"
		toast.error(JSON.stringify(message))
	} else {
		toast.error("Something Went Wrong :(")
	}
}
const env = "development"
