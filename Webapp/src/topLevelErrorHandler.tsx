/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { toast } from "react-hot-toast"
export const registerRejectedPromise = () => {
	window.onunhandledrejection = (err: any) => {
		handleErrors(err)
	}
}

// eslint-disable-next-line complexity
export const handleErrors = (e: any) => {
	// eslint-disable-next-line no-constant-condition
	if (process.env.NODE_ENV === "development" || "test") {

		const message =
			typeof e == "string"
				? e
				: e.statusText
				? e.statusText
				: e.message
				? e.message
				: e.reason && e.reason.message
				? e.reason.message
				: e.reason
				? e.reason
				: e.data?.detail
				? e.data.detail
				: e.payload?.error
				? e.payload.error
				: e.payload?.data?.detail
				? e.payload.data.detail
				: e.error?.message
				? e.error.message
				: "Undefined Error"
		toast.error(JSON.stringify(message))
	} else {
		toast.error("Something Went Wrong :(")
	}
}
