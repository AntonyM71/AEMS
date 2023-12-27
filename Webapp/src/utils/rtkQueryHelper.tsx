import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit"
import { SerializedError, isRejectedWithValue } from "@reduxjs/toolkit"
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

export const rtkQueryErrorLogger: Middleware =
	(api: MiddlewareAPI) => (next) => (action) => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			console.log(action)
			handleErrors(action)
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return next(action)
	}
