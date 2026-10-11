import { aemsApi } from "./aemsApi"

// aemsApi.ts is generated and carries no cache tags, so they are attached here.
// Invalidating every heat is deliberate: a move changes both the source and the
// destination heat, and the update response only knows the destination.
aemsApi.enhanceEndpoints({
	endpoints: {
		getHeatInfoGetHeatInfoHeatIdGet: { providesTags: ["HeatInfo"] },
		insertManyAthletePost: { invalidatesTags: ["HeatInfo"] },
		partialUpdateOneByPrimaryKeyAthleteIdPatch: {
			invalidatesTags: ["HeatInfo"]
		},
		insertManyAthleteheatPost: { invalidatesTags: ["HeatInfo"] },
		partialUpdateOneByPrimaryKeyAthleteheatIdPatch: {
			invalidatesTags: ["HeatInfo"]
		},
		promotePhaseCompetitionManagementPromotePhasePost: {
			invalidatesTags: ["HeatInfo"]
		}
	}
})
