import { AddToast } from "react-toast-notifications"
import conf from "./config"
export const registerRejectedPromise = (addToast: AddToast) => {
	window.onunhandledrejection = (err: any) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		handleErrors(err, addToast)
	}
}

export const handleErrors = (e: any, addToast: AddToast) => {
	// eslint-disable-next-line no-constant-condition
	if (env === "development" || "staging") {
		addToast(
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			e.message ? e.message : e.reason ? e.reason : "Undefined Error",
			{ appearance: "error", autoDismiss: true }
		)
	} else {
		addToast("Something Went Wrong :(")
	}
}
const env = conf.get("env")
