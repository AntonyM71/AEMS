import {
	Middleware,
	MiddlewareAPI,
	SerializedError,
	isRejectedWithValue
} from "@reduxjs/toolkit"
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(api: MiddlewareAPI) => (next) => (action) => {
		// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
		if (isRejectedWithValue(action)) {
			handleErrors(action)
		}

		return next(action)
	}
