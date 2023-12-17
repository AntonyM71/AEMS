import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import toast from "react-hot-toast"
import { handleErrors } from "../topLevelErrorHandler"

export const HandlePostResponse = (
	response:
		| {
				data: any
		  }
		| {
				error: FetchBaseQueryError | SerializedError
		  },
	message?: string
) => {
	if ("error" in response) {
		handleErrors(response.error)
	} else {
		toast.success(message ?? "Success")
	}
}
