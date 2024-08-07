// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
	baseQuery: retry(
		fetchBaseQuery({
			baseUrl: `http://localhost:${
				process.env.NEXT_PUBLIC_SERVER_PORT || 8900
			}`
		}),
		{ maxRetries: 5 }
	),
	endpoints: () => ({})
})
