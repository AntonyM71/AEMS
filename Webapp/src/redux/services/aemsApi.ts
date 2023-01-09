import { emptySplitApi as api } from "./emptyApi"
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getManyCompetitionGet: build.query<
			GetManyCompetitionGetApiResponse,
			GetManyCompetitionGetApiArg
		>({
			query: (queryArg) => ({
				url: `/competition`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryCompetitionPut: build.mutation<
			EntireUpdateManyByQueryCompetitionPutApiResponse,
			EntireUpdateManyByQueryCompetitionPutApiArg
		>({
			query: (queryArg) => ({
				url: `/competition`,
				method: "PUT",
				body: queryArg.body,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		insertManyCompetitionPost: build.mutation<
			InsertManyCompetitionPostApiResponse,
			InsertManyCompetitionPostApiArg
		>({
			query: (queryArg) => ({
				url: `/competition`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryCompetitionDelete: build.mutation<
			DeleteManyByQueryCompetitionDeleteApiResponse,
			DeleteManyByQueryCompetitionDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/competition`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateManyByQueryCompetitionPatch: build.mutation<
			PartialUpdateManyByQueryCompetitionPatchApiResponse,
			PartialUpdateManyByQueryCompetitionPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/competition`,
				method: "PATCH",
				body: queryArg.body,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		getOneByPrimaryKeyCompetitionIdGet: build.query<
			GetOneByPrimaryKeyCompetitionIdGetApiResponse,
			GetOneByPrimaryKeyCompetitionIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/competition/${queryArg.id}`,
				params: {
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyCompetitionIdPut: build.mutation<
			EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse,
			EntireUpdateByPrimaryKeyCompetitionIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/competition/${queryArg.id}`,
				method: "PUT",
				body: queryArg.body,
				params: {
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		deleteOneByPrimaryKeyCompetitionIdDelete: build.mutation<
			DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse,
			DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/competition/${queryArg.id}`,
				method: "DELETE",
				params: {
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyCompetitionIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/competition/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.body,
				params: {
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		getOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGet:
			build.query<
				GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse,
				GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg
			>({
				query: (queryArg) => ({
					url: `/competition/${queryArg.competitionPkId}/event/${queryArg.eventPkId}`,
					params: {
						name____str_____matching_pattern:
							queryArg.nameStrMatchingPattern,
						name____str: queryArg.nameStr,
						name____list_____comparison_operator:
							queryArg.nameListComparisonOperator,
						name____list: queryArg.nameList,
						join_foreign_table: queryArg.joinForeignTable
					}
				})
			}),
		getManyByPkFromEventCompetitionCompetitionPkIdEventGet: build.query<
			GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse,
			GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg
		>({
			query: (queryArg) => ({
				url: `/competition/${queryArg.competitionPkId}/event`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyEventGet: build.query<
			GetManyEventGetApiResponse,
			GetManyEventGetApiArg
		>({
			query: (queryArg) => ({
				url: `/event`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryEventPut: build.mutation<
			EntireUpdateManyByQueryEventPutApiResponse,
			EntireUpdateManyByQueryEventPutApiArg
		>({
			query: (queryArg) => ({
				url: `/event`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryEventPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		insertManyEventPost: build.mutation<
			InsertManyEventPostApiResponse,
			InsertManyEventPostApiArg
		>({
			query: (queryArg) => ({
				url: `/event`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryEventDelete: build.mutation<
			DeleteManyByQueryEventDeleteApiResponse,
			DeleteManyByQueryEventDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/event`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateManyByQueryEventPatch: build.mutation<
			PartialUpdateManyByQueryEventPatchApiResponse,
			PartialUpdateManyByQueryEventPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/event`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryEventPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		getOneByPrimaryKeyEventIdGet: build.query<
			GetOneByPrimaryKeyEventIdGetApiResponse,
			GetOneByPrimaryKeyEventIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.id}`,
				params: {
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyEventIdPut: build.mutation<
			EntireUpdateByPrimaryKeyEventIdPutApiResponse,
			EntireUpdateByPrimaryKeyEventIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyEventIdPut,
				params: {
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		deleteOneByPrimaryKeyEventIdDelete: build.mutation<
			DeleteOneByPrimaryKeyEventIdDeleteApiResponse,
			DeleteOneByPrimaryKeyEventIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.id}`,
				method: "DELETE",
				params: {
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyEventIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyEventIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyEventIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyEventIdPatch,
				params: {
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		getOneByPkFromPhaseEventEventPkIdPhasePhasePkIdGet: build.query<
			GetOneByPkFromPhaseEventEventPkIdPhasePhasePkIdGetApiResponse,
			GetOneByPkFromPhaseEventEventPkIdPhasePhasePkIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.eventPkId}/phase/${queryArg.phasePkId}`,
				params: {
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyByPkFromPhaseEventEventPkIdPhaseGet: build.query<
			GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse,
			GetManyByPkFromPhaseEventEventPkIdPhaseGetApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.eventPkId}/phase`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyPhaseGet: build.query<
			GetManyPhaseGetApiResponse,
			GetManyPhaseGetApiArg
		>({
			query: (queryArg) => ({
				url: `/phase`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryPhasePut: build.mutation<
			EntireUpdateManyByQueryPhasePutApiResponse,
			EntireUpdateManyByQueryPhasePutApiArg
		>({
			query: (queryArg) => ({
				url: `/phase`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryPhasePut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList
				}
			})
		}),
		insertManyPhasePost: build.mutation<
			InsertManyPhasePostApiResponse,
			InsertManyPhasePostApiArg
		>({
			query: (queryArg) => ({
				url: `/phase`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryPhaseDelete: build.mutation<
			DeleteManyByQueryPhaseDeleteApiResponse,
			DeleteManyByQueryPhaseDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/phase`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList
				}
			})
		}),
		partialUpdateManyByQueryPhasePatch: build.mutation<
			PartialUpdateManyByQueryPhasePatchApiResponse,
			PartialUpdateManyByQueryPhasePatchApiArg
		>({
			query: (queryArg) => ({
				url: `/phase`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryPhasePatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList
				}
			})
		}),
		getOneByPrimaryKeyPhaseIdGet: build.query<
			GetOneByPrimaryKeyPhaseIdGetApiResponse,
			GetOneByPrimaryKeyPhaseIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/phase/${queryArg.id}`,
				params: {
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyPhaseIdPut: build.mutation<
			EntireUpdateByPrimaryKeyPhaseIdPutApiResponse,
			EntireUpdateByPrimaryKeyPhaseIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/phase/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyPhaseIdPut,
				params: {
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList
				}
			})
		}),
		deleteOneByPrimaryKeyPhaseIdDelete: build.mutation<
			DeleteOneByPrimaryKeyPhaseIdDeleteApiResponse,
			DeleteOneByPrimaryKeyPhaseIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/phase/${queryArg.id}`,
				method: "DELETE",
				params: {
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyPhaseIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyPhaseIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/phase/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyPhaseIdPatch,
				params: {
					event_id____list_____comparison_operator:
						queryArg.eventIdListComparisonOperator,
					event_id____list: queryArg.eventIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					number_of_runs____from_____comparison_operator:
						queryArg.numberOfRunsFromComparisonOperator,
					number_of_runs____to_____comparison_operator:
						queryArg.numberOfRunsToComparisonOperator,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list_____comparison_operator:
						queryArg.numberOfRunsListComparisonOperator,
					number_of_runs____list: queryArg.numberOfRunsList
				}
			})
		}),
		getOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGet: build.query<
			GetOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGetApiResponse,
			GetOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/phase/${queryArg.phasePkId}/heat/${queryArg.heatPkId}`,
				params: {
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyByPkFromHeatPhasePhasePkIdHeatGet: build.query<
			GetManyByPkFromHeatPhasePhasePkIdHeatGetApiResponse,
			GetManyByPkFromHeatPhasePhasePkIdHeatGetApiArg
		>({
			query: (queryArg) => ({
				url: `/phase/${queryArg.phasePkId}/heat`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyHeatGet: build.query<
			GetManyHeatGetApiResponse,
			GetManyHeatGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryHeatPut: build.mutation<
			EntireUpdateManyByQueryHeatPutApiResponse,
			EntireUpdateManyByQueryHeatPutApiArg
		>({
			query: (queryArg) => ({
				url: `/heat`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryHeatPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		insertManyHeatPost: build.mutation<
			InsertManyHeatPostApiResponse,
			InsertManyHeatPostApiArg
		>({
			query: (queryArg) => ({
				url: `/heat`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryHeatDelete: build.mutation<
			DeleteManyByQueryHeatDeleteApiResponse,
			DeleteManyByQueryHeatDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/heat`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateManyByQueryHeatPatch: build.mutation<
			PartialUpdateManyByQueryHeatPatchApiResponse,
			PartialUpdateManyByQueryHeatPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/heat`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryHeatPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		getOneByPrimaryKeyHeatIdGet: build.query<
			GetOneByPrimaryKeyHeatIdGetApiResponse,
			GetOneByPrimaryKeyHeatIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
				params: {
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyHeatIdPut: build.mutation<
			EntireUpdateByPrimaryKeyHeatIdPutApiResponse,
			EntireUpdateByPrimaryKeyHeatIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyHeatIdPut,
				params: {
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		deleteOneByPrimaryKeyHeatIdDelete: build.mutation<
			DeleteOneByPrimaryKeyHeatIdDeleteApiResponse,
			DeleteOneByPrimaryKeyHeatIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
				method: "DELETE",
				params: {
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyHeatIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyHeatIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyHeatIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyHeatIdPatch,
				params: {
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		getOneByPkFromRunHeatHeatPkIdRunRunPkIdGet: build.query<
			GetOneByPkFromRunHeatHeatPkIdRunRunPkIdGetApiResponse,
			GetOneByPkFromRunHeatHeatPkIdRunRunPkIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.heatPkId}/run/${queryArg.runPkId}`,
				params: {
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyByPkFromRunHeatHeatPkIdRunGet: build.query<
			GetManyByPkFromRunHeatHeatPkIdRunGetApiResponse,
			GetManyByPkFromRunHeatHeatPkIdRunGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.heatPkId}/run`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyRunGet: build.query<
			GetManyRunGetApiResponse,
			GetManyRunGetApiArg
		>({
			query: (queryArg) => ({
				url: `/run`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryRunPut: build.mutation<
			EntireUpdateManyByQueryRunPutApiResponse,
			EntireUpdateManyByQueryRunPutApiArg
		>({
			query: (queryArg) => ({
				url: `/run`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryRunPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		insertManyRunPost: build.mutation<
			InsertManyRunPostApiResponse,
			InsertManyRunPostApiArg
		>({
			query: (queryArg) => ({
				url: `/run`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryRunDelete: build.mutation<
			DeleteManyByQueryRunDeleteApiResponse,
			DeleteManyByQueryRunDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/run`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateManyByQueryRunPatch: build.mutation<
			PartialUpdateManyByQueryRunPatchApiResponse,
			PartialUpdateManyByQueryRunPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/run`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryRunPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		getOneByPrimaryKeyRunIdGet: build.query<
			GetOneByPrimaryKeyRunIdGetApiResponse,
			GetOneByPrimaryKeyRunIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/run/${queryArg.id}`,
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyRunIdPut: build.mutation<
			EntireUpdateByPrimaryKeyRunIdPutApiResponse,
			EntireUpdateByPrimaryKeyRunIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/run/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyRunIdPut,
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		deleteOneByPrimaryKeyRunIdDelete: build.mutation<
			DeleteOneByPrimaryKeyRunIdDeleteApiResponse,
			DeleteOneByPrimaryKeyRunIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/run/${queryArg.id}`,
				method: "DELETE",
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyRunIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyRunIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyRunIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/run/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyRunIdPatch,
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList
				}
			})
		}),
		rootGet: build.query<RootGetApiResponse, RootGetApiArg>({
			query: () => ({ url: `/` })
		})
	}),
	overrideExisting: false
})
export { injectedRtkApi as aemsApi }
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competitionae964Ad5Eaaa40558839939Af10Faa74FindManyResponseListModel
export type GetManyCompetitionGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'name'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName5932E65FDe2A4E688Ec67E3060Df5990[]
}
export type EntireUpdateManyByQueryCompetitionPutApiResponse =
	/** status 200 Successful Response */ Competition8B9C7B0183A543De9502Ddb78E61B8AdUpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryCompetitionPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type InsertManyCompetitionPostApiResponse =
	/** status 201 Successful Response */ Competitiondc6E575F0A2541D1Bd910B9Eb9Da946AUpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	body: Competitiond5629537D5604Fa4B06F0Eade56Bdb7ACreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryCompetitionDeleteApiResponse =
	/** status 200 Successful Response */ Competition80C143EfDf5A42E49Cc50219D4B88380DeleteManyResponseListModel
export type DeleteManyByQueryCompetitionDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryCompetitionPatchApiResponse =
	/** status 200 Successful Response */ Competitionb030280375Dc46359AdaEc61Aa91807BPatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryCompetitionPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPrimaryKeyCompetitionIdGetApiResponse =
	/** status 200 Successful Response */ Competition5475B6328C5F4Aa7Ac954020B1968Aa3FindOneResponseListModel
export type GetOneByPrimaryKeyCompetitionIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName136Aa2C1Ffb14C69A5C40Ddc5Fc3F5A5[]
}
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse =
	/** status 200 Successful Response */ Competitionaf289Dd547D64Ba2Bf4DB18E954A07CeUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse =
	/** status 200 Successful Response */ Competition0D38C0B1F16443058Bf65E11E6E8C872DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competitionb1C30B2BAa404EefBe17268064Ca87FaPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIda4Fdb485782341C7A57A4883Fb524261FindOneResponseListModel
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg =
	{
		competitionPkId: string
		eventPkId: string
		nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
		nameStr?: string[]
		nameListComparisonOperator?: ItemComparisonOperators
		nameList?: string[]
		joinForeignTable?: TableNamefc7D55Eb1Daf46CbB51C86D62C1D660F[]
	}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIdb3C24E39C8E948B9B89B09419Ec31B52FindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNameec724Be736Ca4F648E3B9E05064D6B74[]
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Eventc3C22Bab5781493CA52EF4522D2B51C5FindManyResponseListModel
export type GetManyEventGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'competition_id', 'name'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNamed3F52E819C684386A873688Bafa819E3[]
}
export type EntireUpdateManyByQueryEventPutApiResponse =
	/** status 200 Successful Response */ Eventd258C7Ce5B6049F99Ae5B2F2F72F3A6CUpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryEventPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateManyByQueryEventPut: BodyEntireUpdateManyByQueryEventPut
}
export type InsertManyEventPostApiResponse =
	/** status 201 Successful Response */ Event638109654E614Bb4Aecf43Aaa34E1CecUpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	body: Eventb53158Da18F4458891C4C6D3Bc1D72F9CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryEventDeleteApiResponse =
	/** status 200 Successful Response */ Eventd072119A7712470E859CD7De81Fc5CfbDeleteManyResponseListModel
export type DeleteManyByQueryEventDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryEventPatchApiResponse =
	/** status 200 Successful Response */ Eventa57Daed223284A698F210C62Cf77741BPatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryEventPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateManyByQueryEventPatch: BodyPartialUpdateManyByQueryEventPatch
}
export type GetOneByPrimaryKeyEventIdGetApiResponse =
	/** status 200 Successful Response */ Eventf4D448814E4A443F97A8269A9Ffe9Aa8FindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNameaeffb3982Ed34C9E83957352D31F1Fd6[]
}
export type EntireUpdateByPrimaryKeyEventIdPutApiResponse =
	/** status 200 Successful Response */ Eventc0B9B0F0Da6044488Ce4Bdc7Ee3A7766UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyEventIdPutApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateByPrimaryKeyEventIdPut: BodyEntireUpdateByPrimaryKeyEventIdPut
}
export type DeleteOneByPrimaryKeyEventIdDeleteApiResponse =
	/** status 200 Successful Response */ Eventa1B36Cf04Ac246A085B068Ee23D20FbaDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyEventIdDeleteApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyEventIdPatchApiResponse =
	/** status 200 Successful Response */ Event6D807E7ACcfc4481843E5656690Ea6FdPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyEventIdPatchApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateOneByPrimaryKeyEventIdPatch: BodyPartialUpdateOneByPrimaryKeyEventIdPatch
}
export type GetOneByPkFromPhaseEventEventPkIdPhasePhasePkIdGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseId4637225DEbbf42AdAc674F8B4D52F803FindOneResponseListModel
export type GetOneByPkFromPhaseEventEventPkIdPhasePhasePkIdGetApiArg = {
	eventPkId: string
	phasePkId: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	joinForeignTable?: TableName0A38D78C5Eda4A6E9Ad88Ede2217582B[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseId860F39F3523D4E5ABd41A609Fb29D00FFindManyResponseListModel
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiArg = {
	eventPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	joinForeignTable?: TableName83D2926A421B484CA391213A16Caf770[]
}
export type GetManyPhaseGetApiResponse =
	/** status 200 Successful Response */ Phasebbbd4F990Df5466AAae2474Eee8B179AFindManyResponseListModel
export type GetManyPhaseGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'event_id', 'name', 'number_of_runs'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNamead3Ce8DeE966426C8Bcf152A5027F9Ff[]
}
export type EntireUpdateManyByQueryPhasePutApiResponse =
	/** status 200 Successful Response */ Phasebe7A8E25782348F2994B143A325Bd7B1UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryPhasePutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	bodyEntireUpdateManyByQueryPhasePut: BodyEntireUpdateManyByQueryPhasePut
}
export type InsertManyPhasePostApiResponse =
	/** status 201 Successful Response */ Phase9355846A53664Be6A10FD91D06673B06UpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	body: Phase2D8A3291C2C54114B4BfC1Fd5E9F440ECreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryPhaseDeleteApiResponse =
	/** status 200 Successful Response */ Phase753A4780331242808C6AB56Bd60Cd071DeleteManyResponseListModel
export type DeleteManyByQueryPhaseDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
}
export type PartialUpdateManyByQueryPhasePatchApiResponse =
	/** status 200 Successful Response */ Phase9486B4D8Bd8B42A697Ce6F73B40B6Be0PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryPhasePatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	bodyPartialUpdateManyByQueryPhasePatch: BodyPartialUpdateManyByQueryPhasePatch
}
export type GetOneByPrimaryKeyPhaseIdGetApiResponse =
	/** status 200 Successful Response */ Phase609B4DffBf30413A9E9C7454210Ab6BbFindOneResponseListModel
export type GetOneByPrimaryKeyPhaseIdGetApiArg = {
	id: string
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	joinForeignTable?: TableName8F54A352A18046E2B412Aaa1B18E6658[]
}
export type EntireUpdateByPrimaryKeyPhaseIdPutApiResponse =
	/** status 200 Successful Response */ Phasef77D4B145A1144089711Db13Fe367500UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyPhaseIdPutApiArg = {
	id: string
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	bodyEntireUpdateByPrimaryKeyPhaseIdPut: BodyEntireUpdateByPrimaryKeyPhaseIdPut
}
export type DeleteOneByPrimaryKeyPhaseIdDeleteApiResponse =
	/** status 200 Successful Response */ Phasee47A4B362159429486C5Bd49D676D9EfDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyPhaseIdDeleteApiArg = {
	id: string
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
}
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse =
	/** status 200 Successful Response */ Phase84907B6B46Ff4358A314Bac14420Bb02PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiArg = {
	id: string
	eventIdListComparisonOperator?: ItemComparisonOperators
	eventIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	numberOfRunsFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsFrom?: number
	numberOfRunsTo?: number
	numberOfRunsListComparisonOperator?: ItemComparisonOperators
	numberOfRunsList?: number[]
	bodyPartialUpdateOneByPrimaryKeyPhaseIdPatch: BodyPartialUpdateOneByPrimaryKeyPhaseIdPatch
}
export type GetOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGetApiResponse =
	/** status 200 Successful Response */ PhaseIdHeatId74F549A1014E4Bc896D1683C4C05E706FindOneResponseListModel
export type GetOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGetApiArg = {
	phasePkId: string
	heatPkId: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName05F507399A214E41Adb192E305B0372C[]
}
export type GetManyByPkFromHeatPhasePhasePkIdHeatGetApiResponse =
	/** status 200 Successful Response */ PhaseIdHeatIdeb94803402444536B5187Dd0Fb2F5E78FindManyResponseListModel
export type GetManyByPkFromHeatPhasePhasePkIdHeatGetApiArg = {
	phasePkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamef4141716004B45B6B249C7Fae151A447[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heat4Db0B05513E043308A0798A68Bb51Ff1FindManyResponseListModel
export type GetManyHeatGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'phase_id', 'name'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNameb613462415E1478AB97133E5Bf597A78[]
}
export type EntireUpdateManyByQueryHeatPutApiResponse =
	/** status 200 Successful Response */ Heat18640C5116904B8191270C783C783807UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryHeatPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateManyByQueryHeatPut: BodyEntireUpdateManyByQueryHeatPut
}
export type InsertManyHeatPostApiResponse =
	/** status 201 Successful Response */ Heat552A9F1443F64De6B4Cc1Ccb4Ebce008UpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	body: Heat2A83501B273846E688C803359Aa5B203CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryHeatDeleteApiResponse =
	/** status 200 Successful Response */ Heat1822751290304C44B87228Fc3856Df3EDeleteManyResponseListModel
export type DeleteManyByQueryHeatDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryHeatPatchApiResponse =
	/** status 200 Successful Response */ Heatd62B633D1Ee647C1A3A549F1Cacb6C28PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryHeatPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateManyByQueryHeatPatch: BodyPartialUpdateManyByQueryHeatPatch
}
export type GetOneByPrimaryKeyHeatIdGetApiResponse =
	/** status 200 Successful Response */ Heatc0977Aa96B6D47CbB3E6Ffb015E32Fa5FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName6364Cdf677D749Db872ED3A606C5636B[]
}
export type EntireUpdateByPrimaryKeyHeatIdPutApiResponse =
	/** status 200 Successful Response */ Heat9A5B69940F7C4Dfe8A78Fe88Cfc4B036UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyHeatIdPutApiArg = {
	id: string
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateByPrimaryKeyHeatIdPut: BodyEntireUpdateByPrimaryKeyHeatIdPut
}
export type DeleteOneByPrimaryKeyHeatIdDeleteApiResponse =
	/** status 200 Successful Response */ Heat57B38F35707549098D97367322Dd8139DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyHeatIdDeleteApiArg = {
	id: string
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyHeatIdPatchApiResponse =
	/** status 200 Successful Response */ Heatae0293B2A66C4D0799AfCfba8982B2D3PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyHeatIdPatchApiArg = {
	id: string
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateOneByPrimaryKeyHeatIdPatch: BodyPartialUpdateOneByPrimaryKeyHeatIdPatch
}
export type GetOneByPkFromRunHeatHeatPkIdRunRunPkIdGetApiResponse =
	/** status 200 Successful Response */ HeatIdRunId5104Fab35F704DdaAc6CE83B639A9F59FindOneResponseListModel
export type GetOneByPkFromRunHeatHeatPkIdRunRunPkIdGetApiArg = {
	heatPkId: string
	runPkId: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName7F778584E1A14E3596FbEa24B8Bb6617[]
}
export type GetManyByPkFromRunHeatHeatPkIdRunGetApiResponse =
	/** status 200 Successful Response */ HeatIdRunId5Eb2154CA8464C0EB1DfAe471B9F4455FindManyResponseListModel
export type GetManyByPkFromRunHeatHeatPkIdRunGetApiArg = {
	heatPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName0809Cfac0B824Bc6B8D5643Ad5B319E1[]
}
export type GetManyRunGetApiResponse =
	/** status 200 Successful Response */ Runefd884FfC28A4E139220Fddc2F4C2C0DFindManyResponseListModel
export type GetManyRunGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'heat_id', 'name'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName129494D863E74582Add3443F14Fcf767[]
}
export type EntireUpdateManyByQueryRunPutApiResponse =
	/** status 200 Successful Response */ Runf374178767C744Ae85A0Adabf71Fdd4EUpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryRunPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateManyByQueryRunPut: BodyEntireUpdateManyByQueryRunPut
}
export type InsertManyRunPostApiResponse =
	/** status 201 Successful Response */ Run75061311F8Fb487185B3086E80B730A7UpsertManyResponseListModel
export type InsertManyRunPostApiArg = {
	body: Run8E89Dcee3B69443D8Ea253E07B19D0E4CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryRunDeleteApiResponse =
	/** status 200 Successful Response */ Rune12Ddfbb94Bc43D38C77B29C02D7FceeDeleteManyResponseListModel
export type DeleteManyByQueryRunDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryRunPatchApiResponse =
	/** status 200 Successful Response */ Run839560470B7D4197A0E26F0F25D40622PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryRunPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateManyByQueryRunPatch: BodyPartialUpdateManyByQueryRunPatch
}
export type GetOneByPrimaryKeyRunIdGetApiResponse =
	/** status 200 Successful Response */ Run14B47455D1D84276B78C3E3Ec19Df0EdFindOneResponseListModel
export type GetOneByPrimaryKeyRunIdGetApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNameda2B980B0Dec4Be99B9BC026B4A5Fcdc[]
}
export type EntireUpdateByPrimaryKeyRunIdPutApiResponse =
	/** status 200 Successful Response */ Run8B7855E059Fa484CB5A3562C38B96F14UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyRunIdPutApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateByPrimaryKeyRunIdPut: BodyEntireUpdateByPrimaryKeyRunIdPut
}
export type DeleteOneByPrimaryKeyRunIdDeleteApiResponse =
	/** status 200 Successful Response */ Runb85809D9E9B74C93811A532074692070DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyRunIdDeleteApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyRunIdPatchApiResponse =
	/** status 200 Successful Response */ Run6082D34DDe334DfcA728Cd53485Eb4D0PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyRunIdPatchApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateOneByPrimaryKeyRunIdPatch: BodyPartialUpdateOneByPrimaryKeyRunIdPatch
}
export type RootGetApiResponse = /** status 200 Successful Response */ any
export type RootGetApiArg = void
export type ForeignEventd373Fbc759434D5EAd8EBf10Ae7B7892FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventee69E1A455Ba4A5B868BE06Fee358EadGetManyResponseForeignModel =
	ForeignEventd373Fbc759434D5EAd8EBf10Ae7B7892FindManyResponseItemModelWithValidators[]
export type Competitionba70A6E33E8947D5B93C020349Dd8D9FFindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEventee69E1A455Ba4A5B868BE06Fee358EadGetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competitionae964Ad5Eaaa40558839939Af10Faa74FindManyResponseListModel =

		| Competitionba70A6E33E8947D5B93C020349Dd8D9FFindManyResponseItemModelWithValidators[]
		| any
export type ValidationError = {
	loc: string[]
	msg: string
	type: string
}
export type HttpValidationError = {
	detail?: ValidationError[]
}
export type ItemComparisonOperators = "Equal" | "Not_equal" | "In" | "Not_in"
export type PgsqlMatchingPatternInString =
	| "case_insensitive"
	| "case_sensitive"
	| "not_case_insensitive"
	| "not_case_sensitive"
	| "contains"
	| "match_regex_with_case_sensitive"
	| "match_regex_with_case_insensitive"
	| "does_not_match_regex_with_case_sensitive"
	| "does_not_match_regex_with_case_insensitive"
	| "similar_to"
	| "not_similar_to"
export type TableName5932E65FDe2A4E688Ec67E3060Df5990 = "event"
export type Competitionc0Ee064E88A14Bd4A541963A2169Ba95UpdateManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competition8B9C7B0183A543De9502Ddb78E61B8AdUpdateManyResponseListModelWithValidators =
	Competitionc0Ee064E88A14Bd4A541963A2169Ba95UpdateManyResponseModelWithValidators[]
export type Competitionf0271007D73B4F5BAb81E1B38Ddd3833UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name?: string
	}
export type Competitiondc6E575F0A2541D1Bd910B9Eb9Da946AUpsertManyResponseListModel =
	Competitionf0271007D73B4F5BAb81E1B38Ddd3833UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competitiond5629537D5604Fa4B06F0Eade56Bdb7ACreateManyInsertItemRequestModel =
	{
		id: string
		name?: string
	}
export type Competitionb7B1D7F810684BabB90B296C816B1628DeleteManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competition80C143EfDf5A42E49Cc50219D4B88380DeleteManyResponseListModel =
	Competitionb7B1D7F810684BabB90B296C816B1628DeleteManyResponseModelWithValidators[]
export type Competition76C81784F74249E68E1B075D5926E13APatchManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competitionb030280375Dc46359AdaEc61Aa91807BPatchManyResponseListModelWithValidators =
	Competition76C81784F74249E68E1B075D5926E13APatchManyResponseModelWithValidators[]
export type Competitionf6C2Ac7A35E6408DAac4032A2Fb77850FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEventee69E1A455Ba4A5B868BE06Fee358EadGetManyResponseForeignModel
		id: string
		name?: string
	}
export type Competition5475B6328C5F4Aa7Ac954020B1968Aa3FindOneResponseListModel =
	Competitionf6C2Ac7A35E6408DAac4032A2Fb77850FindOneResponseModelWithValidators
export type TableName136Aa2C1Ffb14C69A5C40Ddc5Fc3F5A5 = "event"
export type Competitionaf289Dd547D64Ba2Bf4DB18E954A07CeUpdateOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competition0D38C0B1F16443058Bf65E11E6E8C872DeleteOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competitionb1C30B2BAa404EefBe17268064Ca87FaPatchOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ForeignCompetition3867776C198347368173E8156189F026FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitioneb233Cbd5F9D40FcAaa40Bd7E4D4A6CaGetManyResponseForeignModel =
	ForeignCompetition3867776C198347368173E8156189F026FindManyResponseItemModelWithValidators[]
export type ForeignPhased0Cc099F2B4B4196Bf152F0749Dcb581FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase2E56319B64574015B389484105E96F6EGetManyResponseForeignModel =
	ForeignPhased0Cc099F2B4B4196Bf152F0749Dcb581FindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId4Cde270240654A08B8Ed9463Db6954FfFindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
		competition_foreign?: ForeignCompetitioneb233Cbd5F9D40FcAaa40Bd7E4D4A6CaGetManyResponseForeignModel
		phase_foreign?: ForeignPhase2E56319B64574015B389484105E96F6EGetManyResponseForeignModel
	}
export type CompetitionIdEventIda4Fdb485782341C7A57A4883Fb524261FindOneResponseListModel =
	CompetitionIdEventId4Cde270240654A08B8Ed9463Db6954FfFindOneResponseModelWithValidators
export type TableNamefc7D55Eb1Daf46CbB51C86D62C1D660F = "competition" | "phase"
export type ForeignCompetition6D52Eb8A905246C4829FAe11E2Ba7117FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition48301108070440E8B9E061Fc0B347148GetManyResponseForeignModel =
	ForeignCompetition6D52Eb8A905246C4829FAe11E2Ba7117FindManyResponseItemModelWithValidators[]
export type ForeignPhase6Cc24A6FF7C34A2090875A8Ea189F188FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhaseff03Ec00107B4DabA84FF12D796Df949GetManyResponseForeignModel =
	ForeignPhase6Cc24A6FF7C34A2090875A8Ea189F188FindManyResponseItemModelWithValidators[]
export type CompetitionIdEventIdf564910D0B674Aa0A4F6F6913773A31DFindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
		competition_foreign?: ForeignCompetition48301108070440E8B9E061Fc0B347148GetManyResponseForeignModel
		phase_foreign?: ForeignPhaseff03Ec00107B4DabA84FF12D796Df949GetManyResponseForeignModel
	}
export type CompetitionIdEventIdb3C24E39C8E948B9B89B09419Ec31B52FindManyResponseListModel =

		| CompetitionIdEventIdf564910D0B674Aa0A4F6F6913773A31DFindOneResponseModelWithValidators[]
		| any
export type TableNameec724Be736Ca4F648E3B9E05064D6B74 = "competition" | "phase"
export type ForeignCompetitionc5Fcdc6E25B2407A885DCdd4D273B887FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionacdd6A18E0514D46B460D1Cfe71C671DGetManyResponseForeignModel =
	ForeignCompetitionc5Fcdc6E25B2407A885DCdd4D273B887FindManyResponseItemModelWithValidators[]
export type ForeignPhaseef1Fa8C9540B415E902C62E882051A63FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase1E120A20569A4F04B13B874Eeb0C7629GetManyResponseForeignModel =
	ForeignPhaseef1Fa8C9540B415E902C62E882051A63FindManyResponseItemModelWithValidators[]
export type Event0F3Ef8157Add4D3481CbF43B4Bf004BdFindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionacdd6A18E0514D46B460D1Cfe71C671DGetManyResponseForeignModel
		phase_foreign?: ForeignPhase1E120A20569A4F04B13B874Eeb0C7629GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Eventc3C22Bab5781493CA52EF4522D2B51C5FindManyResponseListModel =
	| Event0F3Ef8157Add4D3481CbF43B4Bf004BdFindManyResponseItemModelWithValidators[]
	| any
export type TableNamed3F52E819C684386A873688Bafa819E3 = "competition" | "phase"
export type Event62E65C975D654Eb09A62B0E48624AacbUpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Eventd258C7Ce5B6049F99Ae5B2F2F72F3A6CUpdateManyResponseListModelWithValidators =
	Event62E65C975D654Eb09A62B0E48624AacbUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryEventPut = {
	competition_id: string
	name: string
}
export type Eventeffea1F21A4B4F03Ac1642D156Fc0470UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Event638109654E614Bb4Aecf43Aaa34E1CecUpsertManyResponseListModel =
	Eventeffea1F21A4B4F03Ac1642D156Fc0470UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Eventb53158Da18F4458891C4C6D3Bc1D72F9CreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Event6825E5Af00Be4D94Aa5C69F6D4Ce8880DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Eventd072119A7712470E859CD7De81Fc5CfbDeleteManyResponseListModel =
	Event6825E5Af00Be4D94Aa5C69F6D4Ce8880DeleteManyResponseModelWithValidators[]
export type Eventaa969639Eed14010Acba3220Fe919AfdPatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Eventa57Daed223284A698F210C62Cf77741BPatchManyResponseListModelWithValidators =
	Eventaa969639Eed14010Acba3220Fe919AfdPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryEventPatch = {
	competition_id?: string
	name?: string
}
export type Event38E5Ef339Bfc4EfeB772F3999Ba6361EFindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionacdd6A18E0514D46B460D1Cfe71C671DGetManyResponseForeignModel
		phase_foreign?: ForeignPhase1E120A20569A4F04B13B874Eeb0C7629GetManyResponseForeignModel
		id: string
		competition_id: string
		name?: string
	}
export type Eventf4D448814E4A443F97A8269A9Ffe9Aa8FindOneResponseListModel =
	Event38E5Ef339Bfc4EfeB772F3999Ba6361EFindOneResponseModelWithValidators
export type TableNameaeffb3982Ed34C9E83957352D31F1Fd6 = "competition" | "phase"
export type Eventc0B9B0F0Da6044488Ce4Bdc7Ee3A7766UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type BodyEntireUpdateByPrimaryKeyEventIdPut = {
	competition_id: string
	name: string
}
export type Eventa1B36Cf04Ac246A085B068Ee23D20FbaDeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Event6D807E7ACcfc4481843E5656690Ea6FdPatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyEventIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignEvent93D367E8Dd8445Ae8Bd34D219Aca1FbfFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventb296185A4Bdc412F9F0E001Ec561C536GetManyResponseForeignModel =
	ForeignEvent93D367E8Dd8445Ae8Bd34D219Aca1FbfFindManyResponseItemModelWithValidators[]
export type ForeignHeat825A8B0C222E41FbA6763A002F553E2FFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeate30Fe3DcE69E48588A9163Dec6B18BffGetManyResponseForeignModel =
	ForeignHeat825A8B0C222E41FbA6763A002F553E2FFindManyResponseItemModelWithValidators[]
export type EventIdPhaseId5C8Fc6B362A245Cf8121661B50D66Ba1FindOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
		event_foreign?: ForeignEventb296185A4Bdc412F9F0E001Ec561C536GetManyResponseForeignModel
		heat_foreign?: ForeignHeate30Fe3DcE69E48588A9163Dec6B18BffGetManyResponseForeignModel
	}
export type EventIdPhaseId4637225DEbbf42AdAc674F8B4D52F803FindOneResponseListModel =
	EventIdPhaseId5C8Fc6B362A245Cf8121661B50D66Ba1FindOneResponseModelWithValidators
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableName0A38D78C5Eda4A6E9Ad88Ede2217582B = "event" | "heat"
export type ForeignEvent9B3036A0D92A4C4DB06CDc6F8C573940FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent26B0Cf28F456407AA04EA82Faa8B749DGetManyResponseForeignModel =
	ForeignEvent9B3036A0D92A4C4DB06CDc6F8C573940FindManyResponseItemModelWithValidators[]
export type ForeignHeat6Eb4103730A049B0B723468Be1Ab6638FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatf1D9175D9Ae549B3A1A41D12707Ae6CbGetManyResponseForeignModel =
	ForeignHeat6Eb4103730A049B0B723468Be1Ab6638FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId6103828DB6E245219284502F68AafafeFindOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
		event_foreign?: ForeignEvent26B0Cf28F456407AA04EA82Faa8B749DGetManyResponseForeignModel
		heat_foreign?: ForeignHeatf1D9175D9Ae549B3A1A41D12707Ae6CbGetManyResponseForeignModel
	}
export type EventIdPhaseId860F39F3523D4E5ABd41A609Fb29D00FFindManyResponseListModel =

		| EventIdPhaseId6103828DB6E245219284502F68AafafeFindOneResponseModelWithValidators[]
		| any
export type TableName83D2926A421B484CA391213A16Caf770 = "event" | "heat"
export type ForeignEventfad3406BDd12449AAf85Ff06F1394F0CFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventadafb38FDfb64BdeA57F9F7F3F30B07DGetManyResponseForeignModel =
	ForeignEventfad3406BDd12449AAf85Ff06F1394F0CFindManyResponseItemModelWithValidators[]
export type ForeignHeat59E4Fa11D7664D1F96156B37Dfa347E0FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat0431D5256Fd94210Ad87B1660C987084GetManyResponseForeignModel =
	ForeignHeat59E4Fa11D7664D1F96156B37Dfa347E0FindManyResponseItemModelWithValidators[]
export type Phasedca0A373Ff5247BbAdddF202E917F26DFindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEventadafb38FDfb64BdeA57F9F7F3F30B07DGetManyResponseForeignModel
		heat_foreign?: ForeignHeat0431D5256Fd94210Ad87B1660C987084GetManyResponseForeignModel
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phasebbbd4F990Df5466AAae2474Eee8B179AFindManyResponseListModel =
	| Phasedca0A373Ff5247BbAdddF202E917F26DFindManyResponseItemModelWithValidators[]
	| any
export type TableNamead3Ce8DeE966426C8Bcf152A5027F9Ff = "event" | "heat"
export type Phase6B7C19Af03D24449974ABf4B8Cd6B114UpdateManyResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phasebe7A8E25782348F2994B143A325Bd7B1UpdateManyResponseListModelWithValidators =
	Phase6B7C19Af03D24449974ABf4B8Cd6B114UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryPhasePut = {
	event_id: string
	name: string
	number_of_runs: number
}
export type Phase8Ff1De2F640D4704B60E2Bdcb6B6B490UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase9355846A53664Be6A10FD91D06673B06UpsertManyResponseListModel =
	Phase8Ff1De2F640D4704B60E2Bdcb6B6B490UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase2D8A3291C2C54114B4BfC1Fd5E9F440ECreateManyInsertItemRequestModel =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase8959E14E7B9C486F821515Da4F6Bbdf0DeleteManyResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase753A4780331242808C6AB56Bd60Cd071DeleteManyResponseListModel =
	Phase8959E14E7B9C486F821515Da4F6Bbdf0DeleteManyResponseModelWithValidators[]
export type Phase6Ce4Dc5FFe3E4C47A519F256E8Cbb4E8PatchManyResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase9486B4D8Bd8B42A697Ce6F73B40B6Be0PatchManyResponseListModelWithValidators =
	Phase6Ce4Dc5FFe3E4C47A519F256E8Cbb4E8PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryPhasePatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
}
export type Phaseb40D4Cf27B184Ad7Ad881Ad9F9Df6B53FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEventadafb38FDfb64BdeA57F9F7F3F30B07DGetManyResponseForeignModel
		heat_foreign?: ForeignHeat0431D5256Fd94210Ad87B1660C987084GetManyResponseForeignModel
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase609B4DffBf30413A9E9C7454210Ab6BbFindOneResponseListModel =
	Phaseb40D4Cf27B184Ad7Ad881Ad9F9Df6B53FindOneResponseModelWithValidators
export type TableName8F54A352A18046E2B412Aaa1B18E6658 = "event" | "heat"
export type Phasef77D4B145A1144089711Db13Fe367500UpdateOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type BodyEntireUpdateByPrimaryKeyPhaseIdPut = {
	event_id: string
	name: string
	number_of_runs: number
}
export type Phasee47A4B362159429486C5Bd49D676D9EfDeleteOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase84907B6B46Ff4358A314Bac14420Bb02PatchOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type BodyPartialUpdateOneByPrimaryKeyPhaseIdPatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
}
export type ForeignPhase050A7A9CA63B4249A10C0Da777219690FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhaseb1A85B34B9A34B269362790284Fb09EcGetManyResponseForeignModel =
	ForeignPhase050A7A9CA63B4249A10C0Da777219690FindManyResponseItemModelWithValidators[]
export type ForeignRun1260424BEb4B4DafA37A52A8C8543F99FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		name?: string
	}
export type ForeignRun1C0747530F5E4Be4B0A652993Ca68E75GetManyResponseForeignModel =
	ForeignRun1260424BEb4B4DafA37A52A8C8543F99FindManyResponseItemModelWithValidators[]
export type PhaseIdHeatIdcf312Ddf1525480890E26F9Ac6Ee2F49FindOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
		phase_foreign?: ForeignPhaseb1A85B34B9A34B269362790284Fb09EcGetManyResponseForeignModel
		run_foreign?: ForeignRun1C0747530F5E4Be4B0A652993Ca68E75GetManyResponseForeignModel
	}
export type PhaseIdHeatId74F549A1014E4Bc896D1683C4C05E706FindOneResponseListModel =
	PhaseIdHeatIdcf312Ddf1525480890E26F9Ac6Ee2F49FindOneResponseModelWithValidators
export type TableName05F507399A214E41Adb192E305B0372C = "phase" | "run"
export type ForeignPhasec19E70Ec29F34Dd7A0550Df6790Fd958FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhasebad287AcBdad4E659828F598072E949AGetManyResponseForeignModel =
	ForeignPhasec19E70Ec29F34Dd7A0550Df6790Fd958FindManyResponseItemModelWithValidators[]
export type ForeignRun5Eb1366ECbda4FcbBaf85C819085Ed4BFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		name?: string
	}
export type ForeignRun77796706755A4D6D81F0B80Ca607Bf6FGetManyResponseForeignModel =
	ForeignRun5Eb1366ECbda4FcbBaf85C819085Ed4BFindManyResponseItemModelWithValidators[]
export type PhaseIdHeatId3Afbe017F3984C3598DcB9Ece168018EFindOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
		phase_foreign?: ForeignPhasebad287AcBdad4E659828F598072E949AGetManyResponseForeignModel
		run_foreign?: ForeignRun77796706755A4D6D81F0B80Ca607Bf6FGetManyResponseForeignModel
	}
export type PhaseIdHeatIdeb94803402444536B5187Dd0Fb2F5E78FindManyResponseListModel =

		| PhaseIdHeatId3Afbe017F3984C3598DcB9Ece168018EFindOneResponseModelWithValidators[]
		| any
export type TableNamef4141716004B45B6B249C7Fae151A447 = "phase" | "run"
export type ForeignPhase61900D6B06Cd4E3BB4652Eeab3A027A3FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhaseb7087Af5D2Ae445DA6C52E13397Ef29AGetManyResponseForeignModel =
	ForeignPhase61900D6B06Cd4E3BB4652Eeab3A027A3FindManyResponseItemModelWithValidators[]
export type ForeignRun92Bb9Ea6D64642C0A6613026C08C7F07FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		name?: string
	}
export type ForeignRun05642E96B82748889Aa5C1C8Addfa06EGetManyResponseForeignModel =
	ForeignRun92Bb9Ea6D64642C0A6613026C08C7F07FindManyResponseItemModelWithValidators[]
export type Heat3De4Ecc6B7B54463A1323E31972E1353FindManyResponseItemModelWithValidators =
	{
		phase_foreign?: ForeignPhaseb7087Af5D2Ae445DA6C52E13397Ef29AGetManyResponseForeignModel
		run_foreign?: ForeignRun05642E96B82748889Aa5C1C8Addfa06EGetManyResponseForeignModel
		id?: string
		phase_id?: string
		name?: string
	}
export type Heat4Db0B05513E043308A0798A68Bb51Ff1FindManyResponseListModel =
	| Heat3De4Ecc6B7B54463A1323E31972E1353FindManyResponseItemModelWithValidators[]
	| any
export type TableNameb613462415E1478AB97133E5Bf597A78 = "phase" | "run"
export type Heat76F7Bc891B3547Cb8492D44160Ed8154UpdateManyResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heat18640C5116904B8191270C783C783807UpdateManyResponseListModelWithValidators =
	Heat76F7Bc891B3547Cb8492D44160Ed8154UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryHeatPut = {
	phase_id: string
	name: string
}
export type Heatd0506Ddb5Bec4E408Db7Cb4Cc4381143UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heat552A9F1443F64De6B4Cc1Ccb4Ebce008UpsertManyResponseListModel =
	Heatd0506Ddb5Bec4E408Db7Cb4Cc4381143UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat2A83501B273846E688C803359Aa5B203CreateManyInsertItemRequestModel =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heatfb0F7D9DD64C4101A60946802578A5B4DeleteManyResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heat1822751290304C44B87228Fc3856Df3EDeleteManyResponseListModel =
	Heatfb0F7D9DD64C4101A60946802578A5B4DeleteManyResponseModelWithValidators[]
export type Heat5464B0A0147248Ff88E3A74624B0B811PatchManyResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heatd62B633D1Ee647C1A3A549F1Cacb6C28PatchManyResponseListModelWithValidators =
	Heat5464B0A0147248Ff88E3A74624B0B811PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryHeatPatch = {
	phase_id?: string
	name?: string
}
export type Heat5Fcef8A5426747E6AbaaA7057219369AFindOneResponseModelWithValidators =
	{
		phase_foreign?: ForeignPhaseb7087Af5D2Ae445DA6C52E13397Ef29AGetManyResponseForeignModel
		run_foreign?: ForeignRun05642E96B82748889Aa5C1C8Addfa06EGetManyResponseForeignModel
		id: string
		phase_id?: string
		name?: string
	}
export type Heatc0977Aa96B6D47CbB3E6Ffb015E32Fa5FindOneResponseListModel =
	Heat5Fcef8A5426747E6AbaaA7057219369AFindOneResponseModelWithValidators
export type TableName6364Cdf677D749Db872ED3A606C5636B = "phase" | "run"
export type Heat9A5B69940F7C4Dfe8A78Fe88Cfc4B036UpdateOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type BodyEntireUpdateByPrimaryKeyHeatIdPut = {
	phase_id: string
	name: string
}
export type Heat57B38F35707549098D97367322Dd8139DeleteOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heatae0293B2A66C4D0799AfCfba8982B2D3PatchOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyHeatIdPatch = {
	phase_id?: string
	name?: string
}
export type ForeignHeat3A971Bc95Dce4356Ae71D022B4Bbd49EFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatfcc2Adb73D484C2B8Da06420649Fc130GetManyResponseForeignModel =
	ForeignHeat3A971Bc95Dce4356Ae71D022B4Bbd49EFindManyResponseItemModelWithValidators[]
export type HeatIdRunId4F43Bb828C6347CdA5Da7B9506835A56FindOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
		heat_foreign?: ForeignHeatfcc2Adb73D484C2B8Da06420649Fc130GetManyResponseForeignModel
	}
export type HeatIdRunId5104Fab35F704DdaAc6CE83B639A9F59FindOneResponseListModel =
	HeatIdRunId4F43Bb828C6347CdA5Da7B9506835A56FindOneResponseModelWithValidators
export type TableName7F778584E1A14E3596FbEa24B8Bb6617 = "heat"
export type ForeignHeateed58BcdA2E34Cc5B1F52509Daaaed76FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatf668482636794478Bee8F3963Ce8D70CGetManyResponseForeignModel =
	ForeignHeateed58BcdA2E34Cc5B1F52509Daaaed76FindManyResponseItemModelWithValidators[]
export type HeatIdRunId8B33Af54D09345DaA753D11C313Df0E7FindOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
		heat_foreign?: ForeignHeatf668482636794478Bee8F3963Ce8D70CGetManyResponseForeignModel
	}
export type HeatIdRunId5Eb2154CA8464C0EB1DfAe471B9F4455FindManyResponseListModel =

		| HeatIdRunId8B33Af54D09345DaA753D11C313Df0E7FindOneResponseModelWithValidators[]
		| any
export type TableName0809Cfac0B824Bc6B8D5643Ad5B319E1 = "heat"
export type ForeignHeat72Fcf04DA0214Df58F1CB817Fa42A278FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatbd77Ea9332Ce4Ad8A62B8010062A0Bd9GetManyResponseForeignModel =
	ForeignHeat72Fcf04DA0214Df58F1CB817Fa42A278FindManyResponseItemModelWithValidators[]
export type Run6C4Fec4F3713454A9E8F21996Fb9910CFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeatbd77Ea9332Ce4Ad8A62B8010062A0Bd9GetManyResponseForeignModel
		id?: string
		heat_id?: string
		name?: string
	}
export type Runefd884FfC28A4E139220Fddc2F4C2C0DFindManyResponseListModel =
	| Run6C4Fec4F3713454A9E8F21996Fb9910CFindManyResponseItemModelWithValidators[]
	| any
export type TableName129494D863E74582Add3443F14Fcf767 = "heat"
export type Run1F7Cca2A6E9040799185073Ee9Dafa39UpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Runf374178767C744Ae85A0Adabf71Fdd4EUpdateManyResponseListModelWithValidators =
	Run1F7Cca2A6E9040799185073Ee9Dafa39UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryRunPut = {
	heat_id: string
	name: string
}
export type Run0710E94676624A31Ab650Cdcc37Cb3A7UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run75061311F8Fb487185B3086E80B730A7UpsertManyResponseListModel =
	Run0710E94676624A31Ab650Cdcc37Cb3A7UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Run8E89Dcee3B69443D8Ea253E07B19D0E4CreateManyInsertItemRequestModel =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run874359Bb46Ca4Bd0Af68282A5E5773CbDeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Rune12Ddfbb94Bc43D38C77B29C02D7FceeDeleteManyResponseListModel =
	Run874359Bb46Ca4Bd0Af68282A5E5773CbDeleteManyResponseModelWithValidators[]
export type Run6B8Ab5535B32411699762Da1889F821BPatchManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run839560470B7D4197A0E26F0F25D40622PatchManyResponseListModelWithValidators =
	Run6B8Ab5535B32411699762Da1889F821BPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryRunPatch = {
	heat_id?: string
	name?: string
}
export type Run9257C98ED88A415086EcFdda88Ac00E1FindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeatbd77Ea9332Ce4Ad8A62B8010062A0Bd9GetManyResponseForeignModel
		id: string
		heat_id?: string
		name?: string
	}
export type Run14B47455D1D84276B78C3E3Ec19Df0EdFindOneResponseListModel =
	Run9257C98ED88A415086EcFdda88Ac00E1FindOneResponseModelWithValidators
export type TableNameda2B980B0Dec4Be99B9BC026B4A5Fcdc = "heat"
export type Run8B7855E059Fa484CB5A3562C38B96F14UpdateOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type BodyEntireUpdateByPrimaryKeyRunIdPut = {
	heat_id: string
	name: string
}
export type Runb85809D9E9B74C93811A532074692070DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run6082D34DDe334DfcA728Cd53485Eb4D0PatchOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyRunIdPatch = {
	heat_id?: string
	name?: string
}
export const {
	useGetManyCompetitionGetQuery,
	useEntireUpdateManyByQueryCompetitionPutMutation,
	useInsertManyCompetitionPostMutation,
	useDeleteManyByQueryCompetitionDeleteMutation,
	usePartialUpdateManyByQueryCompetitionPatchMutation,
	useGetOneByPrimaryKeyCompetitionIdGetQuery,
	useEntireUpdateByPrimaryKeyCompetitionIdPutMutation,
	useDeleteOneByPrimaryKeyCompetitionIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyCompetitionIdPatchMutation,
	useGetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetQuery,
	useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery,
	useGetManyEventGetQuery,
	useEntireUpdateManyByQueryEventPutMutation,
	useInsertManyEventPostMutation,
	useDeleteManyByQueryEventDeleteMutation,
	usePartialUpdateManyByQueryEventPatchMutation,
	useGetOneByPrimaryKeyEventIdGetQuery,
	useEntireUpdateByPrimaryKeyEventIdPutMutation,
	useDeleteOneByPrimaryKeyEventIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyEventIdPatchMutation,
	useGetOneByPkFromPhaseEventEventPkIdPhasePhasePkIdGetQuery,
	useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery,
	useGetManyPhaseGetQuery,
	useEntireUpdateManyByQueryPhasePutMutation,
	useInsertManyPhasePostMutation,
	useDeleteManyByQueryPhaseDeleteMutation,
	usePartialUpdateManyByQueryPhasePatchMutation,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	useEntireUpdateByPrimaryKeyPhaseIdPutMutation,
	useDeleteOneByPrimaryKeyPhaseIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyPhaseIdPatchMutation,
	useGetOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGetQuery,
	useGetManyByPkFromHeatPhasePhasePkIdHeatGetQuery,
	useGetManyHeatGetQuery,
	useEntireUpdateManyByQueryHeatPutMutation,
	useInsertManyHeatPostMutation,
	useDeleteManyByQueryHeatDeleteMutation,
	usePartialUpdateManyByQueryHeatPatchMutation,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	useEntireUpdateByPrimaryKeyHeatIdPutMutation,
	useDeleteOneByPrimaryKeyHeatIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyHeatIdPatchMutation,
	useGetOneByPkFromRunHeatHeatPkIdRunRunPkIdGetQuery,
	useGetManyByPkFromRunHeatHeatPkIdRunGetQuery,
	useGetManyRunGetQuery,
	useEntireUpdateManyByQueryRunPutMutation,
	useInsertManyRunPostMutation,
	useDeleteManyByQueryRunDeleteMutation,
	usePartialUpdateManyByQueryRunPatchMutation,
	useGetOneByPrimaryKeyRunIdGetQuery,
	useEntireUpdateByPrimaryKeyRunIdPutMutation,
	useDeleteOneByPrimaryKeyRunIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyRunIdPatchMutation,
	useRootGetQuery
} = injectedRtkApi
