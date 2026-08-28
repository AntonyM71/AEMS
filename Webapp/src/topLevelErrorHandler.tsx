/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { toast } from "react-hot-toast"

export const registerRejectedPromise = () => {
	window.onunhandledrejection = (err: any) => {
		handleErrors(err)
	}
}

const extractErrorMessage = (error: any): string => {
	if (typeof error === "string") {
		return error
	}
	return (
		error?.statusText ??
		error?.message ??
		error?.reason?.message ??
		error?.reason ??
		error?.data?.detail ??
		error?.payload?.error ??
		error?.payload?.data?.detail ??
		error?.error?.message ??
		"Undefined Error"
	)
}

export const handleErrors = (e: any) => {
	const isDevelopment = process.env.NODE_ENV === "development"
	if (isDevelopment) {
		const message = extractErrorMessage(e)
		toast.error(JSON.stringify(message))
	} else {
		toast.error("Something Went Wrong :(")
	}
}
