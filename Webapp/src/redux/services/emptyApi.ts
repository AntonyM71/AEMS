// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { serverClock } from "../../utils/serverClock"

const rawBaseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API_URL_DEV ?? "/api/"
})

const baseQueryWithServerClock: typeof rawBaseQuery = async (
	args,
	api,
	extraOptions
) => {
	const result = await rawBaseQuery(args, api, extraOptions)
	serverClock.calibrateFromFirstDateHeader(
		result.meta?.response?.headers.get("date")
	)

	return result
}

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
	reducerPath: "aemsApi",
	baseQuery: retry(baseQueryWithServerClock, {
		maxRetries: process.env.NEXT_PUBLIC_ENV === "prod" ? 5 : 0
	}),
	endpoints: () => ({})
})
