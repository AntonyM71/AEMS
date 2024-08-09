// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
	baseQuery: retry(
		fetchBaseQuery({
			baseUrl: process.env.NEXT_PUBLIC_API_URL_DEV || "/api/"
		}),
		{ maxRetries: 5 }
	),
	endpoints: () => ({})
})
