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
		getManyAthleteGet: build.query<
			GetManyAthleteGetApiResponse,
			GetManyAthleteGetApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryAthletePut: build.mutation<
			EntireUpdateManyByQueryAthletePutApiResponse,
			EntireUpdateManyByQueryAthletePutApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryAthletePut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList
				}
			})
		}),
		insertManyAthletePost: build.mutation<
			InsertManyAthletePostApiResponse,
			InsertManyAthletePostApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryAthleteDelete: build.mutation<
			DeleteManyByQueryAthleteDeleteApiResponse,
			DeleteManyByQueryAthleteDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList
				}
			})
		}),
		partialUpdateManyByQueryAthletePatch: build.mutation<
			PartialUpdateManyByQueryAthletePatchApiResponse,
			PartialUpdateManyByQueryAthletePatchApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryAthletePatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList
				}
			})
		}),
		getOneByPrimaryKeyAthleteIdGet: build.query<
			GetOneByPrimaryKeyAthleteIdGetApiResponse,
			GetOneByPrimaryKeyAthleteIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete/${queryArg.id}`,
				params: {
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyAthleteIdPut: build.mutation<
			EntireUpdateByPrimaryKeyAthleteIdPutApiResponse,
			EntireUpdateByPrimaryKeyAthleteIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyAthleteIdPut,
				params: {
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList
				}
			})
		}),
		deleteOneByPrimaryKeyAthleteIdDelete: build.mutation<
			DeleteOneByPrimaryKeyAthleteIdDeleteApiResponse,
			DeleteOneByPrimaryKeyAthleteIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete/${queryArg.id}`,
				method: "DELETE",
				params: {
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyAthleteIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyAthleteIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyAthleteIdPatch,
				params: {
					first_name____str_____matching_pattern:
						queryArg.firstNameStrMatchingPattern,
					first_name____str: queryArg.firstNameStr,
					first_name____list_____comparison_operator:
						queryArg.firstNameListComparisonOperator,
					first_name____list: queryArg.firstNameList,
					last_name____str_____matching_pattern:
						queryArg.lastNameStrMatchingPattern,
					last_name____str: queryArg.lastNameStr,
					last_name____list_____comparison_operator:
						queryArg.lastNameListComparisonOperator,
					last_name____list: queryArg.lastNameList
				}
			})
		}),
		getManyScoresheetGet: build.query<
			GetManyScoresheetGetApiResponse,
			GetManyScoresheetGetApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet`,
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
					order_by_columns: queryArg.orderByColumns
				}
			})
		}),
		entireUpdateManyByQueryScoresheetPut: build.mutation<
			EntireUpdateManyByQueryScoresheetPutApiResponse,
			EntireUpdateManyByQueryScoresheetPutApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet`,
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
		insertManyScoresheetPost: build.mutation<
			InsertManyScoresheetPostApiResponse,
			InsertManyScoresheetPostApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryScoresheetDelete: build.mutation<
			DeleteManyByQueryScoresheetDeleteApiResponse,
			DeleteManyByQueryScoresheetDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet`,
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
		partialUpdateManyByQueryScoresheetPatch: build.mutation<
			PartialUpdateManyByQueryScoresheetPatchApiResponse,
			PartialUpdateManyByQueryScoresheetPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet`,
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
		getOneByPrimaryKeyScoresheetIdGet: build.query<
			GetOneByPrimaryKeyScoresheetIdGetApiResponse,
			GetOneByPrimaryKeyScoresheetIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet/${queryArg.id}`,
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
		entireUpdateByPrimaryKeyScoresheetIdPut: build.mutation<
			EntireUpdateByPrimaryKeyScoresheetIdPutApiResponse,
			EntireUpdateByPrimaryKeyScoresheetIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet/${queryArg.id}`,
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
		deleteOneByPrimaryKeyScoresheetIdDelete: build.mutation<
			DeleteOneByPrimaryKeyScoresheetIdDeleteApiResponse,
			DeleteOneByPrimaryKeyScoresheetIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet/${queryArg.id}`,
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
		partialUpdateOneByPrimaryKeyScoresheetIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet/${queryArg.id}`,
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
		getManyAvailablemovesGet: build.query<
			GetManyAvailablemovesGetApiResponse,
			GetManyAvailablemovesGetApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns
				}
			})
		}),
		entireUpdateManyByQueryAvailablemovesPut: build.mutation<
			EntireUpdateManyByQueryAvailablemovesPutApiResponse,
			EntireUpdateManyByQueryAvailablemovesPutApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryAvailablemovesPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		insertManyAvailablemovesPost: build.mutation<
			InsertManyAvailablemovesPostApiResponse,
			InsertManyAvailablemovesPostApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryAvailablemovesDelete: build.mutation<
			DeleteManyByQueryAvailablemovesDeleteApiResponse,
			DeleteManyByQueryAvailablemovesDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		partialUpdateManyByQueryAvailablemovesPatch: build.mutation<
			PartialUpdateManyByQueryAvailablemovesPatchApiResponse,
			PartialUpdateManyByQueryAvailablemovesPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryAvailablemovesPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		getOneByPrimaryKeyAvailablemovesIdGet: build.query<
			GetOneByPrimaryKeyAvailablemovesIdGetApiResponse,
			GetOneByPrimaryKeyAvailablemovesIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves/${queryArg.id}`,
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		entireUpdateByPrimaryKeyAvailablemovesIdPut: build.mutation<
			EntireUpdateByPrimaryKeyAvailablemovesIdPutApiResponse,
			EntireUpdateByPrimaryKeyAvailablemovesIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyAvailablemovesIdPut,
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		deleteOneByPrimaryKeyAvailablemovesIdDelete: build.mutation<
			DeleteOneByPrimaryKeyAvailablemovesIdDeleteApiResponse,
			DeleteOneByPrimaryKeyAvailablemovesIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves/${queryArg.id}`,
				method: "DELETE",
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyAvailablemovesIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyAvailablemovesIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyAvailablemovesIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyAvailablemovesIdPatch,
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		getManyAvailablebonusesGet: build.query<
			GetManyAvailablebonusesGetApiResponse,
			GetManyAvailablebonusesGetApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryAvailablebonusesPut: build.mutation<
			EntireUpdateManyByQueryAvailablebonusesPutApiResponse,
			EntireUpdateManyByQueryAvailablebonusesPutApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryAvailablebonusesPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		insertManyAvailablebonusesPost: build.mutation<
			InsertManyAvailablebonusesPostApiResponse,
			InsertManyAvailablebonusesPostApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryAvailablebonusesDelete: build.mutation<
			DeleteManyByQueryAvailablebonusesDeleteApiResponse,
			DeleteManyByQueryAvailablebonusesDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		partialUpdateManyByQueryAvailablebonusesPatch: build.mutation<
			PartialUpdateManyByQueryAvailablebonusesPatchApiResponse,
			PartialUpdateManyByQueryAvailablebonusesPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryAvailablebonusesPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		getOneByPrimaryKeyAvailablebonusesIdGet: build.query<
			GetOneByPrimaryKeyAvailablebonusesIdGetApiResponse,
			GetOneByPrimaryKeyAvailablebonusesIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses/${queryArg.id}`,
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyAvailablebonusesIdPut: build.mutation<
			EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiResponse,
			EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyAvailablebonusesIdPut,
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		deleteOneByPrimaryKeyAvailablebonusesIdDelete: build.mutation<
			DeleteOneByPrimaryKeyAvailablebonusesIdDeleteApiResponse,
			DeleteOneByPrimaryKeyAvailablebonusesIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses/${queryArg.id}`,
				method: "DELETE",
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyAvailablebonusesIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyAvailablebonusesIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyAvailablebonusesIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/availablebonuses/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyAvailablebonusesIdPatch,
				params: {
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					name____str: queryArg.nameStr,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____list: queryArg.nameList,
					score____from_____comparison_operator:
						queryArg.scoreFromComparisonOperator,
					score____to_____comparison_operator:
						queryArg.scoreToComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					score____list: queryArg.scoreList
				}
			})
		}),
		getManyScoredmovesGet: build.query<
			GetManyScoredmovesGetApiResponse,
			GetManyScoredmovesGetApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryScoredmovesPut: build.mutation<
			EntireUpdateManyByQueryScoredmovesPutApiResponse,
			EntireUpdateManyByQueryScoredmovesPutApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryScoredmovesPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		insertManyScoredmovesPost: build.mutation<
			InsertManyScoredmovesPostApiResponse,
			InsertManyScoredmovesPostApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryScoredmovesDelete: build.mutation<
			DeleteManyByQueryScoredmovesDeleteApiResponse,
			DeleteManyByQueryScoredmovesDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		partialUpdateManyByQueryScoredmovesPatch: build.mutation<
			PartialUpdateManyByQueryScoredmovesPatchApiResponse,
			PartialUpdateManyByQueryScoredmovesPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryScoredmovesPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		getOneByPrimaryKeyScoredmovesIdGet: build.query<
			GetOneByPrimaryKeyScoredmovesIdGetApiResponse,
			GetOneByPrimaryKeyScoredmovesIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves/${queryArg.id}`,
				params: {
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyScoredmovesIdPut: build.mutation<
			EntireUpdateByPrimaryKeyScoredmovesIdPutApiResponse,
			EntireUpdateByPrimaryKeyScoredmovesIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyScoredmovesIdPut,
				params: {
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		deleteOneByPrimaryKeyScoredmovesIdDelete: build.mutation<
			DeleteOneByPrimaryKeyScoredmovesIdDeleteApiResponse,
			DeleteOneByPrimaryKeyScoredmovesIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves/${queryArg.id}`,
				method: "DELETE",
				params: {
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyScoredmovesIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyScoredmovesIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyScoredmovesIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch,
				params: {
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					run_id____list_____comparison_operator:
						queryArg.runIdListComparisonOperator,
					run_id____list: queryArg.runIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		getManyScoredbonusesGet: build.query<
			GetManyScoredbonusesGetApiResponse,
			GetManyScoredbonusesGetApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryScoredbonusesPut: build.mutation<
			EntireUpdateManyByQueryScoredbonusesPutApiResponse,
			EntireUpdateManyByQueryScoredbonusesPutApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryScoredbonusesPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		insertManyScoredbonusesPost: build.mutation<
			InsertManyScoredbonusesPostApiResponse,
			InsertManyScoredbonusesPostApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryScoredbonusesDelete: build.mutation<
			DeleteManyByQueryScoredbonusesDeleteApiResponse,
			DeleteManyByQueryScoredbonusesDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		partialUpdateManyByQueryScoredbonusesPatch: build.mutation<
			PartialUpdateManyByQueryScoredbonusesPatchApiResponse,
			PartialUpdateManyByQueryScoredbonusesPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryScoredbonusesPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		getOneByPrimaryKeyScoredbonusesIdGet: build.query<
			GetOneByPrimaryKeyScoredbonusesIdGetApiResponse,
			GetOneByPrimaryKeyScoredbonusesIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses/${queryArg.id}`,
				params: {
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyScoredbonusesIdPut: build.mutation<
			EntireUpdateByPrimaryKeyScoredbonusesIdPutApiResponse,
			EntireUpdateByPrimaryKeyScoredbonusesIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyScoredbonusesIdPut,
				params: {
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		deleteOneByPrimaryKeyScoredbonusesIdDelete: build.mutation<
			DeleteOneByPrimaryKeyScoredbonusesIdDeleteApiResponse,
			DeleteOneByPrimaryKeyScoredbonusesIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses/${queryArg.id}`,
				method: "DELETE",
				params: {
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyScoredbonusesIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyScoredbonusesIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyScoredbonusesIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredbonuses/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyScoredbonusesIdPatch,
				params: {
					bonus_id____list_____comparison_operator:
						queryArg.bonusIdListComparisonOperator,
					bonus_id____list: queryArg.bonusIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList
				}
			})
		}),
		getManyAthleteheatGet: build.query<
			GetManyAthleteheatGetApiResponse,
			GetManyAthleteheatGetApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryAthleteheatPut: build.mutation<
			EntireUpdateManyByQueryAthleteheatPutApiResponse,
			EntireUpdateManyByQueryAthleteheatPutApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateManyByQueryAthleteheatPut,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList
				}
			})
		}),
		insertManyAthleteheatPost: build.mutation<
			InsertManyAthleteheatPostApiResponse,
			InsertManyAthleteheatPostApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryAthleteheatDelete: build.mutation<
			DeleteManyByQueryAthleteheatDeleteApiResponse,
			DeleteManyByQueryAthleteheatDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat`,
				method: "DELETE",
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList
				}
			})
		}),
		partialUpdateManyByQueryAthleteheatPatch: build.mutation<
			PartialUpdateManyByQueryAthleteheatPatchApiResponse,
			PartialUpdateManyByQueryAthleteheatPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateManyByQueryAthleteheatPatch,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList
				}
			})
		}),
		getOneByPrimaryKeyAthleteheatIdGet: build.query<
			GetOneByPrimaryKeyAthleteheatIdGetApiResponse,
			GetOneByPrimaryKeyAthleteheatIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat/${queryArg.id}`,
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyAthleteheatIdPut: build.mutation<
			EntireUpdateByPrimaryKeyAthleteheatIdPutApiResponse,
			EntireUpdateByPrimaryKeyAthleteheatIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyAthleteheatIdPut,
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList
				}
			})
		}),
		deleteOneByPrimaryKeyAthleteheatIdDelete: build.mutation<
			DeleteOneByPrimaryKeyAthleteheatIdDeleteApiResponse,
			DeleteOneByPrimaryKeyAthleteheatIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat/${queryArg.id}`,
				method: "DELETE",
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyAthleteheatIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch,
				params: {
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList
				}
			})
		}),
		getAthleteHeatsByAthleteIdGet: build.query<
			GetAthleteHeatsByAthleteIdGetApiResponse,
			GetAthleteHeatsByAthleteIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/`,
				params: { athlete_id: queryArg.athleteId }
			})
		}),
		getAthleteHeatsByAthleteIdAthleteheatAthleteAthleteIdGet: build.query<
			GetAthleteHeatsByAthleteIdAthleteheatAthleteAthleteIdGetApiResponse,
			GetAthleteHeatsByAthleteIdAthleteheatAthleteAthleteIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat/athlete/${queryArg.athleteId}`
			})
		})
	}),
	overrideExisting: false
})
export { injectedRtkApi as aemsApi }
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competitionc52949863F2D4Ed995A9C6D0927Df765FindManyResponseListModel
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
	joinForeignTable?: TableName0D0995A552B640Dd99C77C9E1815930E[]
}
export type EntireUpdateManyByQueryCompetitionPutApiResponse =
	/** status 200 Successful Response */ Competition69Aa761E5Ce141AdB2F912823Afabe3FUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Competitione00Fb5A76Bd04Dc6A13B64B3003Edd57UpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	body: Competition855B89E6Cdcf44289819491867Fa19DdCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryCompetitionDeleteApiResponse =
	/** status 200 Successful Response */ Competitionbd47924F775A44Bf9C8FCa5Cbf26Ee0EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Competition54496620C16041D48E40C70Ce2E3D081PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Competition2E5C8516Bb584Ad7Bf3347Cb775D37D0FindOneResponseListModel
export type GetOneByPrimaryKeyCompetitionIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNameea77910503B548Ab91DfEc39Ba8F0D21[]
}
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse =
	/** status 200 Successful Response */ Competitionf9Bd01A34A49451386729617Aca6A069UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse =
	/** status 200 Successful Response */ Competitiond87D245C33654Df88591B82Ab1E37617DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competition11Ad367743E24488Aa2035Bd321Ec9AfPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIdc72488657Cdd41D4Aee0486527B1F1F9FindOneResponseListModel
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg =
	{
		competitionPkId: string
		eventPkId: string
		nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
		nameStr?: string[]
		nameListComparisonOperator?: ItemComparisonOperators
		nameList?: string[]
		joinForeignTable?: TableNamea009A796Ca8A47CbB03E2D700Da0A72A[]
	}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIdb85E255635B8433188D48Be64D180C47FindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamebbeefc11Dca04802B992B1C2E76Dc9B3[]
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event92521E88Fc1F4029B340420987A70283FindManyResponseListModel
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
	joinForeignTable?: TableName891Ca8Ef6Deb4Bca83309Faa8D2A6897[]
}
export type EntireUpdateManyByQueryEventPutApiResponse =
	/** status 200 Successful Response */ Eventd8486F7FEdeb49EfA0E8022Be80Fec31UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Event0399F586188046F3B10236312478Ef35UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	body: Event1B7Bdeb3F2214D2D95AbCcbce4Ad7178CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryEventDeleteApiResponse =
	/** status 200 Successful Response */ Event42A5B75301464C829E7DE69Bea7663E0DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Eventdec41E698Baa4C8A8F2BEdf02Bd7C9FfPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Event08988F541E0F4B6B8Adf51262960D6EaFindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNameab4Ddf6FF8Ca409ABe5CC7B942A125Be[]
}
export type EntireUpdateByPrimaryKeyEventIdPutApiResponse =
	/** status 200 Successful Response */ Event3B46B3346B954B4D90C25B5A0B2E34D1UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event90Cdbe81230E4B9484E970B893A9Ed70DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event14Ec72041A884B30B363E1Dfd6164E82PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ EventIdPhaseId19744A589D0F4F5FAde1C70534Fdaee6FindOneResponseListModel
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
	joinForeignTable?: TableName753B9D81D0Ae48CfA43F3Ebfcb366476[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseIdd8612401E3C94A2688B23669538D4666FindManyResponseListModel
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
	joinForeignTable?: TableNameafeb88Ae348B491B8C41C01Bdfa44450[]
}
export type GetManyPhaseGetApiResponse =
	/** status 200 Successful Response */ Phase647Efd4D2Ffe4Fe78Ef6733E28C845DeFindManyResponseListModel
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
	joinForeignTable?: TableName4Ad50CaeB74646F1856D411Fb1F64338[]
}
export type EntireUpdateManyByQueryPhasePutApiResponse =
	/** status 200 Successful Response */ Phase5F2B1B50657F476F9D7865935A36937CUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Phase4013Ce4D4Ba44C6990A5Faa2A5034Ff3UpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	body: Phasea1149F0CF4B248A59688B4Ff19C7733CCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryPhaseDeleteApiResponse =
	/** status 200 Successful Response */ Phase5F67Eac040234Ab1A0Cf2F0Ec158EdafDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Phase8Bfa3Baf86Ac4Ba0Ab9768200Ab9A5DdPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Phaseceeb8F8FD9A34822B6D572Bb8Ae4Ad7BFindOneResponseListModel
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
	joinForeignTable?: TableName794Fb31109E84B03B1E3E0B498A5Ace6[]
}
export type EntireUpdateByPrimaryKeyPhaseIdPutApiResponse =
	/** status 200 Successful Response */ Phase7245F49607544Df29Cd5F9Bea9D4C017UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phase0A7608Ed6Fe14F34Bac8A3Dbfe3679BaDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phase4C83Df282Fd34F889Ce6E6B442Dd351BPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ PhaseIdHeatId5Cf4D25F4F1D46A6945CDc88Faf28B82FindOneResponseListModel
export type GetOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGetApiArg = {
	phasePkId: string
	heatPkId: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName21345D3EEca9423288EeEecb3Cb7D1B2[]
}
export type GetManyByPkFromHeatPhasePhasePkIdHeatGetApiResponse =
	/** status 200 Successful Response */ PhaseIdHeatId8B0584619A8B4C75924B0D12A8F8C95BFindManyResponseListModel
export type GetManyByPkFromHeatPhasePhasePkIdHeatGetApiArg = {
	phasePkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamee5F78963C2C3412D9B69B63D7455C92E[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heat95F47844Ce8F4C65A765Bd43212F5D96FindManyResponseListModel
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
	joinForeignTable?: TableName4470B466Ec1E4Bb38A28183Fbb84Eabb[]
}
export type EntireUpdateManyByQueryHeatPutApiResponse =
	/** status 200 Successful Response */ Heat7F0Fa363E8Aa45A7A053Cc321E6178CeUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Heatc340Fcc890384Eb9Aae83B48979131C0UpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	body: Heat5A881D216Adf44Ec96F9E1Ecc20AebeeCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryHeatDeleteApiResponse =
	/** status 200 Successful Response */ Heat8355D435Cd1148D6Af86417703Dc3971DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Heat52Ecac683F8140D6Acbf13B59146D6C3PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Heateeaf718356F5459CBa6ABc8Bf530E600FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName8Bf3269703A7433482B17E7F30Ede2B1[]
}
export type EntireUpdateByPrimaryKeyHeatIdPutApiResponse =
	/** status 200 Successful Response */ Heat8Aee1233262943438A113Acdb121A401UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat880D2922708D4Cfd993DD7E53B96C109DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat9695D15D37524B8D94Cc276Cd6D69C97PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ HeatIdRunId5164Ecaa88B44665911DA2A5E733C948FindOneResponseListModel
export type GetOneByPkFromRunHeatHeatPkIdRunRunPkIdGetApiArg = {
	heatPkId: string
	runPkId: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNameca1E2Fef562A4728Ac4F1E478B57Ac65[]
}
export type GetManyByPkFromRunHeatHeatPkIdRunGetApiResponse =
	/** status 200 Successful Response */ HeatIdRunIdb032469432B44513Bc70F8F3879Fade9FindManyResponseListModel
export type GetManyByPkFromRunHeatHeatPkIdRunGetApiArg = {
	heatPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName47C2Bf1F649A4F00966E66Aa4D9D1204[]
}
export type GetManyRunGetApiResponse =
	/** status 200 Successful Response */ Rune48172C2059C4A18B2C8E65021Bb2173FindManyResponseListModel
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
	joinForeignTable?: TableName109B76Cf62Ca45A9Be074A2B1F4D5736[]
}
export type EntireUpdateManyByQueryRunPutApiResponse =
	/** status 200 Successful Response */ Run5682836F30Bb497FB068B3Cd544542AcUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Run01A565EeA9F24276A8E79B6B12D670A8UpsertManyResponseListModel
export type InsertManyRunPostApiArg = {
	body: Runbffc7E40Eb74446FAef343C977C553FaCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryRunDeleteApiResponse =
	/** status 200 Successful Response */ Run8793F57FB62F4161949C763D3Fc1B4E1DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Run486E28A3B0024778B9E044365A1600DdPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Run6F314A45Fe7D4D3B96315Ebe02C9B546FindOneResponseListModel
export type GetOneByPrimaryKeyRunIdGetApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName430C85Fd3F1A4D299E7FFee4Fe2E3109[]
}
export type EntireUpdateByPrimaryKeyRunIdPutApiResponse =
	/** status 200 Successful Response */ Runbf6075F0A107448384470834809F4C8CUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Runc8833A0A760D489A9Ce66Fefb5369Db4DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Runb7C058398C2947EeB423Adf4F77E25F9PatchOneResponseModelWithValidators
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
export type GetManyAthleteGetApiResponse =
	/** status 200 Successful Response */ Athletefcce2206C7Cb4093A4Cf9Febe9096B0EFindManyResponseListModel
export type GetManyAthleteGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'first_name', 'last_name'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNamea3D3557630154795A5B8A63B700F71C1[]
}
export type EntireUpdateManyByQueryAthletePutApiResponse =
	/** status 200 Successful Response */ Athlete0Da5123207B544F097388E681A1119B6UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAthletePutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
	bodyEntireUpdateManyByQueryAthletePut: BodyEntireUpdateManyByQueryAthletePut
}
export type InsertManyAthletePostApiResponse =
	/** status 201 Successful Response */ Athleted8F65Af753A54Fbf9D38Af7667D50E71UpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	body: Athleteba7F697179F847D682A79633783C2172CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteDeleteApiResponse =
	/** status 200 Successful Response */ Athlete7E52D3D8780B4D0B8Fb20F1Feb7A7204DeleteManyResponseListModel
export type DeleteManyByQueryAthleteDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
}
export type PartialUpdateManyByQueryAthletePatchApiResponse =
	/** status 200 Successful Response */ Athleted4Cc217D533C4Ee6Ad089E582Ed901A3PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAthletePatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
	bodyPartialUpdateManyByQueryAthletePatch: BodyPartialUpdateManyByQueryAthletePatch
}
export type GetOneByPrimaryKeyAthleteIdGetApiResponse =
	/** status 200 Successful Response */ Athlete990Da38541C647968Df456520A51B59CFindOneResponseListModel
export type GetOneByPrimaryKeyAthleteIdGetApiArg = {
	id: string
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
	joinForeignTable?: TableNameee3027FfD4174B70852F9F50756B2867[]
}
export type EntireUpdateByPrimaryKeyAthleteIdPutApiResponse =
	/** status 200 Successful Response */ Athlete4A73Ccb742E8455E805F4D3C3C95B114UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAthleteIdPutApiArg = {
	id: string
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
	bodyEntireUpdateByPrimaryKeyAthleteIdPut: BodyEntireUpdateByPrimaryKeyAthleteIdPut
}
export type DeleteOneByPrimaryKeyAthleteIdDeleteApiResponse =
	/** status 200 Successful Response */ Athletea4E48863C5B847BbBdb776E3Bf2949B5DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAthleteIdDeleteApiArg = {
	id: string
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse =
	/** status 200 Successful Response */ Athlete0F33524897094A4780E3F979693F9007PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiArg = {
	id: string
	firstNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	firstNameStr?: string[]
	firstNameListComparisonOperator?: ItemComparisonOperators
	firstNameList?: string[]
	lastNameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	lastNameStr?: string[]
	lastNameListComparisonOperator?: ItemComparisonOperators
	lastNameList?: string[]
	bodyPartialUpdateOneByPrimaryKeyAthleteIdPatch: BodyPartialUpdateOneByPrimaryKeyAthleteIdPatch
}
export type GetManyScoresheetGetApiResponse =
	/** status 200 Successful Response */ ScoreSheete8A1A818949D4321B982B220E4Eeca06FindManyResponseListModel
export type GetManyScoresheetGetApiArg = {
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
}
export type EntireUpdateManyByQueryScoresheetPutApiResponse =
	/** status 200 Successful Response */ ScoreSheet0D061C5904E94378838ED78531720Ec6UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryScoresheetPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type InsertManyScoresheetPostApiResponse =
	/** status 201 Successful Response */ ScoreSheet63507638839D4722894B75844Ee6D41FUpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	body: ScoreSheeta0A6D960D9Ad4115B2BbC3Ff18E0C4E0CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoresheetDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheetfa8D5261Ab5548B4994828E86Dbe22A6DeleteManyResponseListModel
export type DeleteManyByQueryScoresheetDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryScoresheetPatchApiResponse =
	/** status 200 Successful Response */ ScoreSheet5Df52Bfb562A4C34Af234D86263Bf222PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryScoresheetPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPrimaryKeyScoresheetIdGetApiResponse =
	/** status 200 Successful Response */ ScoreSheet68639F056A8A40FeAb92874F94Be125BFindOneResponseListModel
export type GetOneByPrimaryKeyScoresheetIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiResponse =
	/** status 200 Successful Response */ ScoreSheetd03D549279F04E209D1346D7Caafb096UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheet392Db57844A24939Aac2F964239A1Ba0DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiResponse =
	/** status 200 Successful Response */ ScoreSheet66Db01428Bc645068816Fce8188Ba456PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMoves6E47B6E1Acc74Fc4B7Fa4Bbf6Fe1F45DFindManyResponseListModel
export type GetManyAvailablemovesGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'sheet_id', 'name', 'score'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
}
export type EntireUpdateManyByQueryAvailablemovesPutApiResponse =
	/** status 200 Successful Response */ AvailableMoves2Deb31C3Cf5640E2A13F1506B73A3591UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAvailablemovesPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyEntireUpdateManyByQueryAvailablemovesPut: BodyEntireUpdateManyByQueryAvailablemovesPut
}
export type InsertManyAvailablemovesPostApiResponse =
	/** status 201 Successful Response */ AvailableMoves903D893E927C4C299D10545Ad7Ef2807UpsertManyResponseListModel
export type InsertManyAvailablemovesPostApiArg = {
	body: AvailableMoves54950Dea977D40D9Aa8BD738290C1C8BCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablemovesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMoves9Cc123F25B6546408308445Cf15D163CDeleteManyResponseListModel
export type DeleteManyByQueryAvailablemovesDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
}
export type PartialUpdateManyByQueryAvailablemovesPatchApiResponse =
	/** status 200 Successful Response */ AvailableMovesf14Fb20210474C7F8D5BDd41Dfb63Ba4PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAvailablemovesPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyPartialUpdateManyByQueryAvailablemovesPatch: BodyPartialUpdateManyByQueryAvailablemovesPatch
}
export type GetOneByPrimaryKeyAvailablemovesIdGetApiResponse =
	/** status 200 Successful Response */ AvailableMovesb484625E678D45E2975233951E91C656FindOneResponseListModel
export type GetOneByPrimaryKeyAvailablemovesIdGetApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
}
export type EntireUpdateByPrimaryKeyAvailablemovesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableMovese78967511F854055998A6Ae75Cd7E99CUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAvailablemovesIdPutApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyEntireUpdateByPrimaryKeyAvailablemovesIdPut: BodyEntireUpdateByPrimaryKeyAvailablemovesIdPut
}
export type DeleteOneByPrimaryKeyAvailablemovesIdDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMovesbcf63E2EE8B147E3B9C18Fd7F93271A3DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAvailablemovesIdDeleteApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
}
export type PartialUpdateOneByPrimaryKeyAvailablemovesIdPatchApiResponse =
	/** status 200 Successful Response */ AvailableMovesc49E9Fb5315E4Ad0B9A1F247A7F01F3BPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAvailablemovesIdPatchApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyPartialUpdateOneByPrimaryKeyAvailablemovesIdPatch: BodyPartialUpdateOneByPrimaryKeyAvailablemovesIdPatch
}
export type GetManyAvailablebonusesGetApiResponse =
	/** status 200 Successful Response */ AvailableBonusesf5Fe1090074C48A99429Afff1D20730BFindManyResponseListModel
export type GetManyAvailablebonusesGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'sheet_id', 'move_id', 'name', 'score'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNamefda8122BC14849Fa9Cb0Ef7E963E91F0[]
}
export type EntireUpdateManyByQueryAvailablebonusesPutApiResponse =
	/** status 200 Successful Response */ AvailableBonusesd2Fbf7071Cd6412B91D6D57Dab064984UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAvailablebonusesPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyEntireUpdateManyByQueryAvailablebonusesPut: BodyEntireUpdateManyByQueryAvailablebonusesPut
}
export type InsertManyAvailablebonusesPostApiResponse =
	/** status 201 Successful Response */ AvailableBonusese8F6Bc59Fedc42D1A24D101D275931BcUpsertManyResponseListModel
export type InsertManyAvailablebonusesPostApiArg = {
	body: AvailableBonuses1438Db3B471243C8B4A38De316332839CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablebonusesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableBonuses53Ea6Bae6Eff48918BfdD97Afaabe357DeleteManyResponseListModel
export type DeleteManyByQueryAvailablebonusesDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
}
export type PartialUpdateManyByQueryAvailablebonusesPatchApiResponse =
	/** status 200 Successful Response */ AvailableBonusesd607146852Ad4413Bc0AFfa951C66F7DPatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAvailablebonusesPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyPartialUpdateManyByQueryAvailablebonusesPatch: BodyPartialUpdateManyByQueryAvailablebonusesPatch
}
export type GetOneByPrimaryKeyAvailablebonusesIdGetApiResponse =
	/** status 200 Successful Response */ AvailableBonuses5Cc056E12Ac44C01811641511Fb6Cb30FindOneResponseListModel
export type GetOneByPrimaryKeyAvailablebonusesIdGetApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	joinForeignTable?: TableNameb93Dbff0D4Aa4Ba695274151945Fc710[]
}
export type EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableBonuses86D8584BB4504537Bf76A7Ce800F4Aa1UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyEntireUpdateByPrimaryKeyAvailablebonusesIdPut: BodyEntireUpdateByPrimaryKeyAvailablebonusesIdPut
}
export type DeleteOneByPrimaryKeyAvailablebonusesIdDeleteApiResponse =
	/** status 200 Successful Response */ AvailableBonusese9Fb5F3BE2F844649374A8E88B9Dc30EDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAvailablebonusesIdDeleteApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
}
export type PartialUpdateOneByPrimaryKeyAvailablebonusesIdPatchApiResponse =
	/** status 200 Successful Response */ AvailableBonusesd93B165DC5Ea4Ac48A798A63C33F8FcfPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAvailablebonusesIdPatchApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	scoreFromComparisonOperator?: RangeFromComparisonOperators
	scoreToComparisonOperator?: RangeToComparisonOperators
	scoreFrom?: number
	scoreTo?: number
	scoreListComparisonOperator?: ItemComparisonOperators
	scoreList?: number[]
	bodyPartialUpdateOneByPrimaryKeyAvailablebonusesIdPatch: BodyPartialUpdateOneByPrimaryKeyAvailablebonusesIdPatch
}
export type GetManyScoredmovesGetApiResponse =
	/** status 200 Successful Response */ ScoredMovesd90E7C1D353F46A6A27EE9Aacf9Ec2D6FindManyResponseListModel
export type GetManyScoredmovesGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'move_id', 'run_id', 'judge_id'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNameade73986B6554Bd89803Da5909Caf6B3[]
}
export type EntireUpdateManyByQueryScoredmovesPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves869A0D2837D941A2Ab2AFb4222691Ce1UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryScoredmovesPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyEntireUpdateManyByQueryScoredmovesPut: BodyEntireUpdateManyByQueryScoredmovesPut
}
export type InsertManyScoredmovesPostApiResponse =
	/** status 201 Successful Response */ ScoredMovesbeac6A7FB4B142E2Ad87Ca96F9Ec8Ac4UpsertManyResponseListModel
export type InsertManyScoredmovesPostApiArg = {
	body: ScoredMovesdbad0E3FAa8647C687C79896F33Da0F2CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMovesa4A246Ea55084198B2Ed02A2829Ffd96DeleteManyResponseListModel
export type DeleteManyByQueryScoredmovesDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
}
export type PartialUpdateManyByQueryScoredmovesPatchApiResponse =
	/** status 200 Successful Response */ ScoredMoves54C1395584A448D4B1FdF74Ba90C2Ff6PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryScoredmovesPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyPartialUpdateManyByQueryScoredmovesPatch: BodyPartialUpdateManyByQueryScoredmovesPatch
}
export type GetOneByPrimaryKeyScoredmovesIdGetApiResponse =
	/** status 200 Successful Response */ ScoredMoves6A4F36A2E7D44431B18FF6877C211B0DFindOneResponseListModel
export type GetOneByPrimaryKeyScoredmovesIdGetApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	joinForeignTable?: TableName8F5911DeEc2D4496Bdf6812D6167Cad8[]
}
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves7Fd824DaF6F94C35B79C851B971B421AUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyEntireUpdateByPrimaryKeyScoredmovesIdPut: BodyEntireUpdateByPrimaryKeyScoredmovesIdPut
}
export type DeleteOneByPrimaryKeyScoredmovesIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMoves8Cc61A253D6D468CB501B5862B3B1Bc4DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoredmovesIdDeleteApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoredmovesIdPatchApiResponse =
	/** status 200 Successful Response */ ScoredMovesb9B4Dd5796354724Ac0AF0Cb54714D4BPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoredmovesIdPatchApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	runIdListComparisonOperator?: ItemComparisonOperators
	runIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch: BodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch
}
export type GetManyScoredbonusesGetApiResponse =
	/** status 200 Successful Response */ ScoredBonusesbe75662A132047FbB06C1152D49C01E2FindManyResponseListModel
export type GetManyScoredbonusesGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'bonus_id', 'move_id', 'judge_id'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNamef484B6185F2F4BeaBc159A56De5D5F19[]
}
export type EntireUpdateManyByQueryScoredbonusesPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses11B6536CA10D45D59A4FCedd85A06951UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryScoredbonusesPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyEntireUpdateManyByQueryScoredbonusesPut: BodyEntireUpdateManyByQueryScoredbonusesPut
}
export type InsertManyScoredbonusesPostApiResponse =
	/** status 201 Successful Response */ ScoredBonuses7C4AaafeDaa54A4D8B9E88B712681B8DUpsertManyResponseListModel
export type InsertManyScoredbonusesPostApiArg = {
	body: ScoredBonusesef79Fa3CE4984D9A9Cf1D8F1Fb2Efc35CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredbonusesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredBonusesafbc9A1C73F54011932CB69F30014E72DeleteManyResponseListModel
export type DeleteManyByQueryScoredbonusesDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
}
export type PartialUpdateManyByQueryScoredbonusesPatchApiResponse =
	/** status 200 Successful Response */ ScoredBonuses4288526D492C45C18824950Ed7Bd066APatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryScoredbonusesPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	/** Competition ID */
	idList?: string[]
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyPartialUpdateManyByQueryScoredbonusesPatch: BodyPartialUpdateManyByQueryScoredbonusesPatch
}
export type GetOneByPrimaryKeyScoredbonusesIdGetApiResponse =
	/** status 200 Successful Response */ ScoredBonusescfcf786B0761433CA918905F7Bf94715FindOneResponseListModel
export type GetOneByPrimaryKeyScoredbonusesIdGetApiArg = {
	id: string
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	joinForeignTable?: TableNamea441Ff81Cd0840809EbcDe40D88F0383[]
}
export type EntireUpdateByPrimaryKeyScoredbonusesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses206996Ef659A4A19Bf39131Be6B3Cb8CUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoredbonusesIdPutApiArg = {
	id: string
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyEntireUpdateByPrimaryKeyScoredbonusesIdPut: BodyEntireUpdateByPrimaryKeyScoredbonusesIdPut
}
export type DeleteOneByPrimaryKeyScoredbonusesIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoredBonusesaa26B8Fa36034069Be887Dedd483B325DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoredbonusesIdDeleteApiArg = {
	id: string
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoredbonusesIdPatchApiResponse =
	/** status 200 Successful Response */ ScoredBonuses19B8089960384B24B5AdAc444893Fb18PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoredbonusesIdPatchApiArg = {
	id: string
	bonusIdListComparisonOperator?: ItemComparisonOperators
	bonusIdList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	bodyPartialUpdateOneByPrimaryKeyScoredbonusesIdPatch: BodyPartialUpdateOneByPrimaryKeyScoredbonusesIdPatch
}
export type GetManyAthleteheatGetApiResponse =
	/** status 200 Successful Response */ Athleteheat9D65Dc558D054F228C716Dec25D8Eee8FindManyResponseListModel
export type GetManyAthleteheatGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'heat_id', 'athlete_id'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNameca17631A5Deb4D4986F34315516543Df[]
}
export type EntireUpdateManyByQueryAthleteheatPutApiResponse =
	/** status 200 Successful Response */ Athleteheataa19B1A565F94CfaBafcE6Db7E2Ec066UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAthleteheatPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	bodyEntireUpdateManyByQueryAthleteheatPut: BodyEntireUpdateManyByQueryAthleteheatPut
}
export type InsertManyAthleteheatPostApiResponse =
	/** status 201 Successful Response */ Athleteheat3C474D9203874F14A2619F4442Cd7F5CUpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	body: Athleteheat36A04A561Ee141F4Ae535Edc8Be901E7CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteheatDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheate12Cd20C6E294663913539C6E778E485DeleteManyResponseListModel
export type DeleteManyByQueryAthleteheatDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
}
export type PartialUpdateManyByQueryAthleteheatPatchApiResponse =
	/** status 200 Successful Response */ Athleteheatbac9B9D59Eab455E8131D29Da8313866PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAthleteheatPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	bodyPartialUpdateManyByQueryAthleteheatPatch: BodyPartialUpdateManyByQueryAthleteheatPatch
}
export type GetOneByPrimaryKeyAthleteheatIdGetApiResponse =
	/** status 200 Successful Response */ Athleteheat555E33B12E5A4C94B07CE3Df3D9E76A5FindOneResponseListModel
export type GetOneByPrimaryKeyAthleteheatIdGetApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	joinForeignTable?: TableName8Bb23276527C4D0D9Db311E990Ef00Ec[]
}
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiResponse =
	/** status 200 Successful Response */ Athleteheat88644D62540E4Cb7B8F11Cc9F2F7D143UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	bodyEntireUpdateByPrimaryKeyAthleteheatIdPut: BodyEntireUpdateByPrimaryKeyAthleteheatIdPut
}
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheatd16B1E2657004Bde8A430De08Af7F0CeDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat1F90F99D073845F08Af6F14F9B174252PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	bodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch: BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch
}
export type GetAthleteHeatsByAthleteIdGetApiResponse =
	/** status 200 Successful Response */ any
export type GetAthleteHeatsByAthleteIdGetApiArg = {
	athleteId: string
}
export type GetAthleteHeatsByAthleteIdAthleteheatAthleteAthleteIdGetApiResponse =
	/** status 200 Successful Response */ any
export type GetAthleteHeatsByAthleteIdAthleteheatAthleteAthleteIdGetApiArg = {
	athleteId: string
}
export type ForeignEvent5Bbd33Fb2Ddd4808A0E9Db9353Ff78EeFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent1C90426DD52E44Ee8E27027Ec240D62EGetManyResponseForeignModel =
	ForeignEvent5Bbd33Fb2Ddd4808A0E9Db9353Ff78EeFindManyResponseItemModelWithValidators[]
export type Competition4B43C858C1764F7AAd2BF2C2C4Abec54FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent1C90426DD52E44Ee8E27027Ec240D62EGetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competitionc52949863F2D4Ed995A9C6D0927Df765FindManyResponseListModel =

		| Competition4B43C858C1764F7AAd2BF2C2C4Abec54FindManyResponseItemModelWithValidators[]
		| undefined
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
export type TableName0D0995A552B640Dd99C77C9E1815930E = "event"
export type Competitionbd70637DCf75440794313023E69B6346UpdateManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competition69Aa761E5Ce141AdB2F912823Afabe3FUpdateManyResponseListModelWithValidators =
	Competitionbd70637DCf75440794313023E69B6346UpdateManyResponseModelWithValidators[]
export type Competitionbfbd553C392348A39FbeE03A3Bfbf019UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name?: string
	}
export type Competitione00Fb5A76Bd04Dc6A13B64B3003Edd57UpsertManyResponseListModel =
	Competitionbfbd553C392348A39FbeE03A3Bfbf019UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition855B89E6Cdcf44289819491867Fa19DdCreateManyInsertItemRequestModel =
	{
		id: string
		name?: string
	}
export type Competition90E1435876184Ead806A8Edca460BeabDeleteManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competitionbd47924F775A44Bf9C8FCa5Cbf26Ee0EDeleteManyResponseListModel =
	Competition90E1435876184Ead806A8Edca460BeabDeleteManyResponseModelWithValidators[]
export type Competition3F8464Fb5Ab741Cb8504D491762249F3PatchManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competition54496620C16041D48E40C70Ce2E3D081PatchManyResponseListModelWithValidators =
	Competition3F8464Fb5Ab741Cb8504D491762249F3PatchManyResponseModelWithValidators[]
export type Competition4D03Bb4A69B64Ae19De5F7D5C61E5E7EFindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent1C90426DD52E44Ee8E27027Ec240D62EGetManyResponseForeignModel
		id: string
		name?: string
	}
export type Competition2E5C8516Bb584Ad7Bf3347Cb775D37D0FindOneResponseListModel =
	Competition4D03Bb4A69B64Ae19De5F7D5C61E5E7EFindOneResponseModelWithValidators
export type TableNameea77910503B548Ab91DfEc39Ba8F0D21 = "event"
export type Competitionf9Bd01A34A49451386729617Aca6A069UpdateOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competitiond87D245C33654Df88591B82Ab1E37617DeleteOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type Competition11Ad367743E24488Aa2035Bd321Ec9AfPatchOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ForeignCompetition4Af6974D1C7F41CeAc4F77230D5B9F8DFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition90Fcffbf421B44F49Cbf0Db66128Bf26GetManyResponseForeignModel =
	ForeignCompetition4Af6974D1C7F41CeAc4F77230D5B9F8DFindManyResponseItemModelWithValidators[]
export type ForeignPhase4Ca52398F7D049199E12Fd9Dd82A0B3AFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhasea901B13625Ab4231B7889E4A44D7570BGetManyResponseForeignModel =
	ForeignPhase4Ca52398F7D049199E12Fd9Dd82A0B3AFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId7Ab1B132F2404E59B6A0449E969Bb914FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
		competition_foreign?: ForeignCompetition90Fcffbf421B44F49Cbf0Db66128Bf26GetManyResponseForeignModel
		phase_foreign?: ForeignPhasea901B13625Ab4231B7889E4A44D7570BGetManyResponseForeignModel
	}
export type CompetitionIdEventIdc72488657Cdd41D4Aee0486527B1F1F9FindOneResponseListModel =
	CompetitionIdEventId7Ab1B132F2404E59B6A0449E969Bb914FindOneResponseModelWithValidators
export type TableNamea009A796Ca8A47CbB03E2D700Da0A72A = "competition" | "phase"
export type ForeignCompetitionc620A85F7B364106850CB1929C3F9A74FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitioncf2E2537D648492EAcc29F76Bf2B954EGetManyResponseForeignModel =
	ForeignCompetitionc620A85F7B364106850CB1929C3F9A74FindManyResponseItemModelWithValidators[]
export type ForeignPhase15D0D53A40484514A66DC6356Fdcaa5FFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase9805B3312C0C4605B47E83327725A68AGetManyResponseForeignModel =
	ForeignPhase15D0D53A40484514A66DC6356Fdcaa5FFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId70A159C175F94FeaBf78167A3E3A803BFindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
		competition_foreign?: ForeignCompetitioncf2E2537D648492EAcc29F76Bf2B954EGetManyResponseForeignModel
		phase_foreign?: ForeignPhase9805B3312C0C4605B47E83327725A68AGetManyResponseForeignModel
	}
export type CompetitionIdEventIdb85E255635B8433188D48Be64D180C47FindManyResponseListModel =

		| CompetitionIdEventId70A159C175F94FeaBf78167A3E3A803BFindOneResponseModelWithValidators[]
		| undefined
export type TableNamebbeefc11Dca04802B992B1C2E76Dc9B3 = "competition" | "phase"
export type ForeignCompetitiondd911D1022984C94B95006E3A83Fd112FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition3Cf07A68498045078176A6E34Ff5Aed6GetManyResponseForeignModel =
	ForeignCompetitiondd911D1022984C94B95006E3A83Fd112FindManyResponseItemModelWithValidators[]
export type ForeignPhasecba4Dc19E2B44Aa9B0852687734F9703FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase19Ec72968C49463288F7Bbfa60Ff85D3GetManyResponseForeignModel =
	ForeignPhasecba4Dc19E2B44Aa9B0852687734F9703FindManyResponseItemModelWithValidators[]
export type Event6D8589B7C35E4099A1EcF527A3Da70AeFindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetition3Cf07A68498045078176A6E34Ff5Aed6GetManyResponseForeignModel
		phase_foreign?: ForeignPhase19Ec72968C49463288F7Bbfa60Ff85D3GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event92521E88Fc1F4029B340420987A70283FindManyResponseListModel =
	| Event6D8589B7C35E4099A1EcF527A3Da70AeFindManyResponseItemModelWithValidators[]
	| undefined
export type TableName891Ca8Ef6Deb4Bca83309Faa8D2A6897 = "competition" | "phase"
export type Event8F0C97Bf2Ab54F1EB810C1F23A2Fa455UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Eventd8486F7FEdeb49EfA0E8022Be80Fec31UpdateManyResponseListModelWithValidators =
	Event8F0C97Bf2Ab54F1EB810C1F23A2Fa455UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryEventPut = {
	competition_id: string
	name: string
}
export type Eventba614Ce4A8F24729Aa69D71A7015030DUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Event0399F586188046F3B10236312478Ef35UpsertManyResponseListModel =
	Eventba614Ce4A8F24729Aa69D71A7015030DUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Event1B7Bdeb3F2214D2D95AbCcbce4Ad7178CreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Event1152C1Cc832548B5A212A7F51Dffe923DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Event42A5B75301464C829E7DE69Bea7663E0DeleteManyResponseListModel =
	Event1152C1Cc832548B5A212A7F51Dffe923DeleteManyResponseModelWithValidators[]
export type Eventa593D384477749B6B44A702B064Dd41EPatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Eventdec41E698Baa4C8A8F2BEdf02Bd7C9FfPatchManyResponseListModelWithValidators =
	Eventa593D384477749B6B44A702B064Dd41EPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryEventPatch = {
	competition_id?: string
	name?: string
}
export type Event46565D76Dd5C4B94B24F4490C95D677BFindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetition3Cf07A68498045078176A6E34Ff5Aed6GetManyResponseForeignModel
		phase_foreign?: ForeignPhase19Ec72968C49463288F7Bbfa60Ff85D3GetManyResponseForeignModel
		id: string
		competition_id: string
		name?: string
	}
export type Event08988F541E0F4B6B8Adf51262960D6EaFindOneResponseListModel =
	Event46565D76Dd5C4B94B24F4490C95D677BFindOneResponseModelWithValidators
export type TableNameab4Ddf6FF8Ca409ABe5CC7B942A125Be = "competition" | "phase"
export type Event3B46B3346B954B4D90C25B5A0B2E34D1UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type BodyEntireUpdateByPrimaryKeyEventIdPut = {
	competition_id: string
	name: string
}
export type Event90Cdbe81230E4B9484E970B893A9Ed70DeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type Event14Ec72041A884B30B363E1Dfd6164E82PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyEventIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignEvent4Dc9B8C80Dae47F1A24381C4C5Fbde1FFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent2Ad3692258Bc492EA874002768766F78GetManyResponseForeignModel =
	ForeignEvent4Dc9B8C80Dae47F1A24381C4C5Fbde1FFindManyResponseItemModelWithValidators[]
export type ForeignHeat19115A2E6B6D4C8CA209571E1Df7Aa42FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat4E72C95E20D048E38F851E44Fdfc52CfGetManyResponseForeignModel =
	ForeignHeat19115A2E6B6D4C8CA209571E1Df7Aa42FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId7D1F6A9585944832A5C77717E91Ef2A7FindOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
		event_foreign?: ForeignEvent2Ad3692258Bc492EA874002768766F78GetManyResponseForeignModel
		heat_foreign?: ForeignHeat4E72C95E20D048E38F851E44Fdfc52CfGetManyResponseForeignModel
	}
export type EventIdPhaseId19744A589D0F4F5FAde1C70534Fdaee6FindOneResponseListModel =
	EventIdPhaseId7D1F6A9585944832A5C77717E91Ef2A7FindOneResponseModelWithValidators
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableName753B9D81D0Ae48CfA43F3Ebfcb366476 = "event" | "heat"
export type ForeignEvent581E55167714435581Dd5A998E6Ea5CbFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventdf12D8F255E14F85Afa2002A5328012FGetManyResponseForeignModel =
	ForeignEvent581E55167714435581Dd5A998E6Ea5CbFindManyResponseItemModelWithValidators[]
export type ForeignHeat2Bf002E2D2F444Cd91Bb3B59Bdf8E6D1FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat63F7Dc67F34A4932B35920B96F146Cf5GetManyResponseForeignModel =
	ForeignHeat2Bf002E2D2F444Cd91Bb3B59Bdf8E6D1FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId827A01EbBe1A4153Ab82A5A11E85880FFindOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
		event_foreign?: ForeignEventdf12D8F255E14F85Afa2002A5328012FGetManyResponseForeignModel
		heat_foreign?: ForeignHeat63F7Dc67F34A4932B35920B96F146Cf5GetManyResponseForeignModel
	}
export type EventIdPhaseIdd8612401E3C94A2688B23669538D4666FindManyResponseListModel =

		| EventIdPhaseId827A01EbBe1A4153Ab82A5A11E85880FFindOneResponseModelWithValidators[]
		| undefined
export type TableNameafeb88Ae348B491B8C41C01Bdfa44450 = "event" | "heat"
export type ForeignEventb9D2536287E94194Ba84043876A25980FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventff4E0Dc1556E45D390196A0Bae9Dc113GetManyResponseForeignModel =
	ForeignEventb9D2536287E94194Ba84043876A25980FindManyResponseItemModelWithValidators[]
export type ForeignHeatf4C4Da9B5Fac406E9B8AEf54D70Fbd4DFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat5Bed2Da86Cc441299D88Ce4D7Ad2627DGetManyResponseForeignModel =
	ForeignHeatf4C4Da9B5Fac406E9B8AEf54D70Fbd4DFindManyResponseItemModelWithValidators[]
export type Phasee8Bdf485C2E44E99Bfc4978Dd0F19888FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEventff4E0Dc1556E45D390196A0Bae9Dc113GetManyResponseForeignModel
		heat_foreign?: ForeignHeat5Bed2Da86Cc441299D88Ce4D7Ad2627DGetManyResponseForeignModel
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase647Efd4D2Ffe4Fe78Ef6733E28C845DeFindManyResponseListModel =
	| Phasee8Bdf485C2E44E99Bfc4978Dd0F19888FindManyResponseItemModelWithValidators[]
	| undefined
export type TableName4Ad50CaeB74646F1856D411Fb1F64338 = "event" | "heat"
export type Phase33624Cb96D3F4D47Bf06Dbcacd1Cc39CUpdateManyResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase5F2B1B50657F476F9D7865935A36937CUpdateManyResponseListModelWithValidators =
	Phase33624Cb96D3F4D47Bf06Dbcacd1Cc39CUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryPhasePut = {
	event_id: string
	name: string
	number_of_runs: number
}
export type Phase8B8F551A09944A5C9A4393678997Ae1DUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase4013Ce4D4Ba44C6990A5Faa2A5034Ff3UpsertManyResponseListModel =
	Phase8B8F551A09944A5C9A4393678997Ae1DUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phasea1149F0CF4B248A59688B4Ff19C7733CCreateManyInsertItemRequestModel =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase7Fa7379EF27E4Fa2Be3E3Bf70C661C7ADeleteManyResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase5F67Eac040234Ab1A0Cf2F0Ec158EdafDeleteManyResponseListModel =
	Phase7Fa7379EF27E4Fa2Be3E3Bf70C661C7ADeleteManyResponseModelWithValidators[]
export type Phase2Cf46E28C73B4Eb6Ad51E5B08D3Ffe7BPatchManyResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase8Bfa3Baf86Ac4Ba0Ab9768200Ab9A5DdPatchManyResponseListModelWithValidators =
	Phase2Cf46E28C73B4Eb6Ad51E5B08D3Ffe7BPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryPhasePatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
}
export type Phased81Ad4569D1B4020Bcba583D3B537423FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEventff4E0Dc1556E45D390196A0Bae9Dc113GetManyResponseForeignModel
		heat_foreign?: ForeignHeat5Bed2Da86Cc441299D88Ce4D7Ad2627DGetManyResponseForeignModel
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phaseceeb8F8FD9A34822B6D572Bb8Ae4Ad7BFindOneResponseListModel =
	Phased81Ad4569D1B4020Bcba583D3B537423FindOneResponseModelWithValidators
export type TableName794Fb31109E84B03B1E3E0B498A5Ace6 = "event" | "heat"
export type Phase7245F49607544Df29Cd5F9Bea9D4C017UpdateOneResponseModelWithValidators =
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
export type Phase0A7608Ed6Fe14F34Bac8A3Dbfe3679BaDeleteOneResponseModelWithValidators =
	{
		id: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phase4C83Df282Fd34F889Ce6E6B442Dd351BPatchOneResponseModelWithValidators =
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
export type ForeignPhase4E809B4F823C4737B1906122F97384D9FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhasec4Cbed6F59Af4E3EAb15Af34735B2C19GetManyResponseForeignModel =
	ForeignPhase4E809B4F823C4737B1906122F97384D9FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat4E3E1A12Ce6341A2B5826D3277Ae874FFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
	}
export type ForeignAthleteheat50Ca92Ab45B94009Bba5D7Fa0E23985CGetManyResponseForeignModel =
	ForeignAthleteheat4E3E1A12Ce6341A2B5826D3277Ae874FFindManyResponseItemModelWithValidators[]
export type PhaseIdHeatId7C939A586Fdf430B8DcbAfe6C551801CFindOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
		phase_foreign?: ForeignPhasec4Cbed6F59Af4E3EAb15Af34735B2C19GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat50Ca92Ab45B94009Bba5D7Fa0E23985CGetManyResponseForeignModel
	}
export type PhaseIdHeatId5Cf4D25F4F1D46A6945CDc88Faf28B82FindOneResponseListModel =
	PhaseIdHeatId7C939A586Fdf430B8DcbAfe6C551801CFindOneResponseModelWithValidators
export type TableName21345D3EEca9423288EeEecb3Cb7D1B2 =
	| "phase"
	| "run"
	| "athleteheat"
export type ForeignPhaseca19Add929624145B0407B9F70484025FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase6Fc9545BE22340A28989B2E069A8BcaeGetManyResponseForeignModel =
	ForeignPhaseca19Add929624145B0407B9F70484025FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatd66E69FcF2Ba4884B558D6459Ae0934FFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
	}
export type ForeignAthleteheat50D1232A663A45A09F86B12175E81C99GetManyResponseForeignModel =
	ForeignAthleteheatd66E69FcF2Ba4884B558D6459Ae0934FFindManyResponseItemModelWithValidators[]
export type PhaseIdHeatId26A33C48063A4C9088C2F8E0678D2A59FindOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
		phase_foreign?: ForeignPhase6Fc9545BE22340A28989B2E069A8BcaeGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat50D1232A663A45A09F86B12175E81C99GetManyResponseForeignModel
	}
export type PhaseIdHeatId8B0584619A8B4C75924B0D12A8F8C95BFindManyResponseListModel =

		| PhaseIdHeatId26A33C48063A4C9088C2F8E0678D2A59FindOneResponseModelWithValidators[]
		| undefined
export type TableNamee5F78963C2C3412D9B69B63D7455C92E =
	| "phase"
	| "run"
	| "athleteheat"
export type ForeignPhasea2863425838D4Cd1878302617E0C3Ec7FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase9Ff841A69Ff649B9BfecB03De3EecccfGetManyResponseForeignModel =
	ForeignPhasea2863425838D4Cd1878302617E0C3Ec7FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatc9A142A3817948AcAb0B27651303A4DfFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
	}
export type ForeignAthleteheatbdee721A717E4247Bfd6237287D3A698GetManyResponseForeignModel =
	ForeignAthleteheatc9A142A3817948AcAb0B27651303A4DfFindManyResponseItemModelWithValidators[]
export type Heatcf5Dc804B2264B708902A7E78B8E5Fe9FindManyResponseItemModelWithValidators =
	{
		phase_foreign?: ForeignPhase9Ff841A69Ff649B9BfecB03De3EecccfGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatbdee721A717E4247Bfd6237287D3A698GetManyResponseForeignModel
		id?: string
		phase_id?: string
		name?: string
	}
export type Heat95F47844Ce8F4C65A765Bd43212F5D96FindManyResponseListModel =
	| Heatcf5Dc804B2264B708902A7E78B8E5Fe9FindManyResponseItemModelWithValidators[]
	| undefined
export type TableName4470B466Ec1E4Bb38A28183Fbb84Eabb =
	| "phase"
	| "run"
	| "athleteheat"
export type Heat3E960157D96C4D82933C81B1E31519DaUpdateManyResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heat7F0Fa363E8Aa45A7A053Cc321E6178CeUpdateManyResponseListModelWithValidators =
	Heat3E960157D96C4D82933C81B1E31519DaUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryHeatPut = {
	phase_id: string
	name: string
}
export type Heat0C40Ab33C2B945A7Adea326Fdc964058UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heatc340Fcc890384Eb9Aae83B48979131C0UpsertManyResponseListModel =
	Heat0C40Ab33C2B945A7Adea326Fdc964058UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat5A881D216Adf44Ec96F9E1Ecc20AebeeCreateManyInsertItemRequestModel =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heatd40997Cd3D014A43Bd03F388A87E9B88DeleteManyResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heat8355D435Cd1148D6Af86417703Dc3971DeleteManyResponseListModel =
	Heatd40997Cd3D014A43Bd03F388A87E9B88DeleteManyResponseModelWithValidators[]
export type Heatc96Cfef84C464Ad69C0859B7B682Fdd4PatchManyResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heat52Ecac683F8140D6Acbf13B59146D6C3PatchManyResponseListModelWithValidators =
	Heatc96Cfef84C464Ad69C0859B7B682Fdd4PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryHeatPatch = {
	phase_id?: string
	name?: string
}
export type Heat5Cb0F14AB8514Aec9FeaE038De3522D1FindOneResponseModelWithValidators =
	{
		phase_foreign?: ForeignPhase9Ff841A69Ff649B9BfecB03De3EecccfGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatbdee721A717E4247Bfd6237287D3A698GetManyResponseForeignModel
		id: string
		phase_id?: string
		name?: string
	}
export type Heateeaf718356F5459CBa6ABc8Bf530E600FindOneResponseListModel =
	Heat5Cb0F14AB8514Aec9FeaE038De3522D1FindOneResponseModelWithValidators
export type TableName8Bf3269703A7433482B17E7F30Ede2B1 =
	| "phase"
	| "run"
	| "athleteheat"
export type Heat8Aee1233262943438A113Acdb121A401UpdateOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type BodyEntireUpdateByPrimaryKeyHeatIdPut = {
	phase_id: string
	name: string
}
export type Heat880D2922708D4Cfd993DD7E53B96C109DeleteOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type Heat9695D15D37524B8D94Cc276Cd6D69C97PatchOneResponseModelWithValidators =
	{
		id: string
		phase_id?: string
		name?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyHeatIdPatch = {
	phase_id?: string
	name?: string
}
export type ForeignHeat8E5677Cb42834Aed9F5FA38C975486BeFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatc9Cfd0D3C2Eb4B66B1088Bcb11F72A51GetManyResponseForeignModel =
	ForeignHeat8E5677Cb42834Aed9F5FA38C975486BeFindManyResponseItemModelWithValidators[]
export type HeatIdRunIde62Ad01CF897468CA861762632Ed0C27FindOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
		heat_foreign?: ForeignHeatc9Cfd0D3C2Eb4B66B1088Bcb11F72A51GetManyResponseForeignModel
	}
export type HeatIdRunId5164Ecaa88B44665911DA2A5E733C948FindOneResponseListModel =
	HeatIdRunIde62Ad01CF897468CA861762632Ed0C27FindOneResponseModelWithValidators
export type TableNameca1E2Fef562A4728Ac4F1E478B57Ac65 = "heat"
export type ForeignHeatbff0D87043C94Cd2A27A464D864Ab320FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeate9Ab3E9BB2D24B1CA5C474151660A9DbGetManyResponseForeignModel =
	ForeignHeatbff0D87043C94Cd2A27A464D864Ab320FindManyResponseItemModelWithValidators[]
export type HeatIdRunId57976E8F75B947C99A30547F3B1F0FdcFindOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
		heat_foreign?: ForeignHeate9Ab3E9BB2D24B1CA5C474151660A9DbGetManyResponseForeignModel
	}
export type HeatIdRunIdb032469432B44513Bc70F8F3879Fade9FindManyResponseListModel =

		| HeatIdRunId57976E8F75B947C99A30547F3B1F0FdcFindOneResponseModelWithValidators[]
		| undefined
export type TableName47C2Bf1F649A4F00966E66Aa4D9D1204 = "heat"
export type ForeignHeat4E2C74FaC2554F1390267E6743Ba206DFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatef4Ab1CaD9C84711Ae3DC14C1307A577GetManyResponseForeignModel =
	ForeignHeat4E2C74FaC2554F1390267E6743Ba206DFindManyResponseItemModelWithValidators[]
export type Runca1E99FaCe21412781AeFf8C0B4386DbFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeatef4Ab1CaD9C84711Ae3DC14C1307A577GetManyResponseForeignModel
		id?: string
		heat_id?: string
		name?: string
	}
export type Rune48172C2059C4A18B2C8E65021Bb2173FindManyResponseListModel =
	| Runca1E99FaCe21412781AeFf8C0B4386DbFindManyResponseItemModelWithValidators[]
	| undefined
export type TableName109B76Cf62Ca45A9Be074A2B1F4D5736 = "heat"
export type Rund056Aad3Fe7B4C46A950E54A5Bd4873CUpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run5682836F30Bb497FB068B3Cd544542AcUpdateManyResponseListModelWithValidators =
	Rund056Aad3Fe7B4C46A950E54A5Bd4873CUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryRunPut = {
	heat_id: string
	name: string
}
export type Run486Fdde66Df648FcB3A8Ddf9C8Ca2226UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run01A565EeA9F24276A8E79B6B12D670A8UpsertManyResponseListModel =
	Run486Fdde66Df648FcB3A8Ddf9C8Ca2226UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Runbffc7E40Eb74446FAef343C977C553FaCreateManyInsertItemRequestModel =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Runde0304Db3E3D46238Fac26Cdaf25Ef1ADeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run8793F57FB62F4161949C763D3Fc1B4E1DeleteManyResponseListModel =
	Runde0304Db3E3D46238Fac26Cdaf25Ef1ADeleteManyResponseModelWithValidators[]
export type Run7B650Cbf85734873Bf4C450Df459D0F7PatchManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Run486E28A3B0024778B9E044365A1600DdPatchManyResponseListModelWithValidators =
	Run7B650Cbf85734873Bf4C450Df459D0F7PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryRunPatch = {
	heat_id?: string
	name?: string
}
export type Run5Df49A2C520D419FA67379465047607FFindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeatef4Ab1CaD9C84711Ae3DC14C1307A577GetManyResponseForeignModel
		id: string
		heat_id?: string
		name?: string
	}
export type Run6F314A45Fe7D4D3B96315Ebe02C9B546FindOneResponseListModel =
	Run5Df49A2C520D419FA67379465047607FFindOneResponseModelWithValidators
export type TableName430C85Fd3F1A4D299E7FFee4Fe2E3109 = "heat"
export type Runbf6075F0A107448384470834809F4C8CUpdateOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type BodyEntireUpdateByPrimaryKeyRunIdPut = {
	heat_id: string
	name: string
}
export type Runc8833A0A760D489A9Ce66Fefb5369Db4DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type Runb7C058398C2947EeB423Adf4F77E25F9PatchOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		name?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyRunIdPatch = {
	heat_id?: string
	name?: string
}
export type ForeignAthleteheatec046EbcE74641Ea96F4102Aa5C8Ad6EFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
	}
export type ForeignAthleteheatd05F88315A2C4Ae6Af823454A307AedaGetManyResponseForeignModel =
	ForeignAthleteheatec046EbcE74641Ea96F4102Aa5C8Ad6EFindManyResponseItemModelWithValidators[]
export type Athlete33C9Ae5D6Cd2484A930D0Ec79C994194FindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatd05F88315A2C4Ae6Af823454A307AedaGetManyResponseForeignModel
		id?: string
		first_name?: string
		last_name?: string
	}
export type Athletefcce2206C7Cb4093A4Cf9Febe9096B0EFindManyResponseListModel =
	| Athlete33C9Ae5D6Cd2484A930D0Ec79C994194FindManyResponseItemModelWithValidators[]
	| undefined
export type TableNamea3D3557630154795A5B8A63B700F71C1 = "athleteheat"
export type Athlete17Cbc6D99F1E4C53823637E1698Fd779UpdateManyResponseModelWithValidators =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type Athlete0Da5123207B544F097388E681A1119B6UpdateManyResponseListModelWithValidators =
	Athlete17Cbc6D99F1E4C53823637E1698Fd779UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthletePut = {
	first_name: string
	last_name: string
}
export type Athletec760F1196Cea4BefA890728C8F04C8C1UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type Athleted8F65Af753A54Fbf9D38Af7667D50E71UpsertManyResponseListModel =
	Athletec760F1196Cea4BefA890728C8F04C8C1UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteba7F697179F847D682A79633783C2172CreateManyInsertItemRequestModel =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type Athleted3Aa5846D0304215850F954Fcc640730DeleteManyResponseModelWithValidators =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type Athlete7E52D3D8780B4D0B8Fb20F1Feb7A7204DeleteManyResponseListModel =
	Athleted3Aa5846D0304215850F954Fcc640730DeleteManyResponseModelWithValidators[]
export type Athlete2F45C843Fb2C489CBf4C8F1369025738PatchManyResponseModelWithValidators =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type Athleted4Cc217D533C4Ee6Ad089E582Ed901A3PatchManyResponseListModelWithValidators =
	Athlete2F45C843Fb2C489CBf4C8F1369025738PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthletePatch = {
	first_name?: string
	last_name?: string
}
export type Athlete0E3Ef5A2Aa1141288Ad82Deb59B5D076FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatd05F88315A2C4Ae6Af823454A307AedaGetManyResponseForeignModel
		id: string
		first_name?: string
		last_name?: string
	}
export type Athlete990Da38541C647968Df456520A51B59CFindOneResponseListModel =
	Athlete0E3Ef5A2Aa1141288Ad82Deb59B5D076FindOneResponseModelWithValidators
export type TableNameee3027FfD4174B70852F9F50756B2867 = "athleteheat"
export type Athlete4A73Ccb742E8455E805F4D3C3C95B114UpdateOneResponseModelWithValidators =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type BodyEntireUpdateByPrimaryKeyAthleteIdPut = {
	first_name: string
	last_name: string
}
export type Athletea4E48863C5B847BbBdb776E3Bf2949B5DeleteOneResponseModelWithValidators =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type Athlete0F33524897094A4780E3F979693F9007PatchOneResponseModelWithValidators =
	{
		id: string
		first_name?: string
		last_name?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyAthleteIdPatch = {
	first_name?: string
	last_name?: string
}
export type ScoreSheetbe5Ddc7FB6694844B0845Bfc21C44D32FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheete8A1A818949D4321B982B220E4Eeca06FindManyResponseListModel =

		| ScoreSheetbe5Ddc7FB6694844B0845Bfc21C44D32FindManyResponseItemModelWithValidators[]
		| undefined
export type ScoreSheeteb22045B6D6F4Dd4Add045053099Cf86UpdateManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ScoreSheet0D061C5904E94378838ED78531720Ec6UpdateManyResponseListModelWithValidators =
	ScoreSheeteb22045B6D6F4Dd4Add045053099Cf86UpdateManyResponseModelWithValidators[]
export type ScoreSheet4D985871254E461FB442Bc70959233CeUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name?: string
	}
export type ScoreSheet63507638839D4722894B75844Ee6D41FUpsertManyResponseListModel =
	ScoreSheet4D985871254E461FB442Bc70959233CeUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheeta0A6D960D9Ad4115B2BbC3Ff18E0C4E0CreateManyInsertItemRequestModel =
	{
		id: string
		name?: string
	}
export type ScoreSheetbe2B27Cc4C28441085124Cd58593A389DeleteManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ScoreSheetfa8D5261Ab5548B4994828E86Dbe22A6DeleteManyResponseListModel =
	ScoreSheetbe2B27Cc4C28441085124Cd58593A389DeleteManyResponseModelWithValidators[]
export type ScoreSheet6Ebb19Ff348D4Ee3Af73D9964A56C245PatchManyResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ScoreSheet5Df52Bfb562A4C34Af234D86263Bf222PatchManyResponseListModelWithValidators =
	ScoreSheet6Ebb19Ff348D4Ee3Af73D9964A56C245PatchManyResponseModelWithValidators[]
export type ScoreSheet4Dc9F9301589400497B09Ea516E258C6FindOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ScoreSheet68639F056A8A40FeAb92874F94Be125BFindOneResponseListModel =
	ScoreSheet4Dc9F9301589400497B09Ea516E258C6FindOneResponseModelWithValidators
export type ScoreSheetd03D549279F04E209D1346D7Caafb096UpdateOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ScoreSheet392Db57844A24939Aac2F964239A1Ba0DeleteOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type ScoreSheet66Db01428Bc645068816Fce8188Ba456PatchOneResponseModelWithValidators =
	{
		id: string
		name?: string
	}
export type AvailableMovese425E0820F284E8781F8299007B22102FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMoves6E47B6E1Acc74Fc4B7Fa4Bbf6Fe1F45DFindManyResponseListModel =

		| AvailableMovese425E0820F284E8781F8299007B22102FindManyResponseItemModelWithValidators[]
		| undefined
export type AvailableMoves94Ea5F53076A4E5CB116003F6D1E3E98UpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMoves2Deb31C3Cf5640E2A13F1506B73A3591UpdateManyResponseListModelWithValidators =
	AvailableMoves94Ea5F53076A4E5CB116003F6D1E3E98UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablemovesPut = {
	sheet_id: string
	name: string
	score: number
}
export type AvailableMovesc47575C2036F4321A34E338C47E48CdaUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMoves903D893E927C4C299D10545Ad7Ef2807UpsertManyResponseListModel =
	AvailableMovesc47575C2036F4321A34E338C47E48CdaUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableMoves54950Dea977D40D9Aa8BD738290C1C8BCreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMovesaa134D27A47D47F78A4E208C13C2D140DeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMoves9Cc123F25B6546408308445Cf15D163CDeleteManyResponseListModel =
	AvailableMovesaa134D27A47D47F78A4E208C13C2D140DeleteManyResponseModelWithValidators[]
export type AvailableMoves463A5653F9Ed4E32B32D606Bafbc3Fa3PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMovesf14Fb20210474C7F8D5BDd41Dfb63Ba4PatchManyResponseListModelWithValidators =
	AvailableMoves463A5653F9Ed4E32B32D606Bafbc3Fa3PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablemovesPatch = {
	sheet_id?: string
	name?: string
	score?: number
}
export type AvailableMoves051E670DE0C54Fa888E810Dcf47B4Ae5FindOneResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMovesb484625E678D45E2975233951E91C656FindOneResponseListModel =
	AvailableMoves051E670DE0C54Fa888E810Dcf47B4Ae5FindOneResponseModelWithValidators
export type AvailableMovese78967511F854055998A6Ae75Cd7E99CUpdateOneResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type BodyEntireUpdateByPrimaryKeyAvailablemovesIdPut = {
	sheet_id: string
	name: string
	score: number
}
export type AvailableMovesbcf63E2EE8B147E3B9C18Fd7F93271A3DeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type AvailableMovesc49E9Fb5315E4Ad0B9A1F247A7F01F3BPatchOneResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type BodyPartialUpdateOneByPrimaryKeyAvailablemovesIdPatch = {
	sheet_id?: string
	name?: string
	score?: number
}
export type ForeignScoreSheet2E558915C36E4946827AE26C040Ff27FFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheet48D07A067452478F80A89A8B45Afa2B9GetManyResponseForeignModel =
	ForeignScoreSheet2E558915C36E4946827AE26C040Ff27FFindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves13654Beb4Bff463A9Cc7093680273Cf1FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableMoves5B336Cba99034480A413035Da51Fe888GetManyResponseForeignModel =
	ForeignAvailableMoves13654Beb4Bff463A9Cc7093680273Cf1FindManyResponseItemModelWithValidators[]
export type AvailableBonusesb30E2354A1Bc442E8467A827795B24CfFindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet48D07A067452478F80A89A8B45Afa2B9GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves5B336Cba99034480A413035Da51Fe888GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonusesf5Fe1090074C48A99429Afff1D20730BFindManyResponseListModel =

		| AvailableBonusesb30E2354A1Bc442E8467A827795B24CfFindManyResponseItemModelWithValidators[]
		| undefined
export type TableNamefda8122BC14849Fa9Cb0Ef7E963E91F0 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses408500468Bea4Da48Fa9Cee1A6Fba82CUpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonusesd2Fbf7071Cd6412B91D6D57Dab064984UpdateManyResponseListModelWithValidators =
	AvailableBonuses408500468Bea4Da48Fa9Cee1A6Fba82CUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablebonusesPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonuses1C2437De349F4Bae9Fb7746696893C15UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonusese8F6Bc59Fedc42D1A24D101D275931BcUpsertManyResponseListModel =
	AvailableBonuses1C2437De349F4Bae9Fb7746696893C15UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableBonuses1438Db3B471243C8B4A38De316332839CreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses43A907A0Ae1C420588884D4Ead43F805DeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses53Ea6Bae6Eff48918BfdD97Afaabe357DeleteManyResponseListModel =
	AvailableBonuses43A907A0Ae1C420588884D4Ead43F805DeleteManyResponseModelWithValidators[]
export type AvailableBonusesbaf6D485Eb25401587Fd5C84C36795D9PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonusesd607146852Ad4413Bc0AFfa951C66F7DPatchManyResponseListModelWithValidators =
	AvailableBonusesbaf6D485Eb25401587Fd5C84C36795D9PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablebonusesPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type AvailableBonuses47E159C172974D769Ff6A6Eb2054F3A3FindOneResponseModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet48D07A067452478F80A89A8B45Afa2B9GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves5B336Cba99034480A413035Da51Fe888GetManyResponseForeignModel
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses5Cc056E12Ac44C01811641511Fb6Cb30FindOneResponseListModel =
	AvailableBonuses47E159C172974D769Ff6A6Eb2054F3A3FindOneResponseModelWithValidators
export type TableNameb93Dbff0D4Aa4Ba695274151945Fc710 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses86D8584BB4504537Bf76A7Ce800F4Aa1UpdateOneResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type BodyEntireUpdateByPrimaryKeyAvailablebonusesIdPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonusese9Fb5F3BE2F844649374A8E88B9Dc30EDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonusesd93B165DC5Ea4Ac48A798A63C33F8FcfPatchOneResponseModelWithValidators =
	{
		id: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type BodyPartialUpdateOneByPrimaryKeyAvailablebonusesIdPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type ForeignRun0D13Bb6B43A248Bf99Cc95C6B50B67CcFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		name?: string
	}
export type ForeignRun7863Da80744040F882D90768A15755A1GetManyResponseForeignModel =
	ForeignRun0D13Bb6B43A248Bf99Cc95C6B50B67CcFindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves3C461B0DF6Cb43E5B20801B53F28F30BFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableMovesa196Dd786C284C44944E495Cae2C0Ce8GetManyResponseForeignModel =
	ForeignAvailableMoves3C461B0DF6Cb43E5B20801B53F28F30BFindManyResponseItemModelWithValidators[]
export type ScoredMoves715763DaD8024533A7E5Ff16A41Ed54DFindManyResponseItemModelWithValidators =
	{
		run_foreign?: ForeignRun7863Da80744040F882D90768A15755A1GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovesa196Dd786C284C44944E495Cae2C0Ce8GetManyResponseForeignModel
		id?: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMovesd90E7C1D353F46A6A27EE9Aacf9Ec2D6FindManyResponseListModel =

		| ScoredMoves715763DaD8024533A7E5Ff16A41Ed54DFindManyResponseItemModelWithValidators[]
		| undefined
export type TableNameade73986B6554Bd89803Da5909Caf6B3 = "run" | "availableMoves"
export type ScoredMovesd6F8B33916474Ba6B6Ad6B87E361De57UpdateManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMoves869A0D2837D941A2Ab2AFb4222691Ce1UpdateManyResponseListModelWithValidators =
	ScoredMovesd6F8B33916474Ba6B6Ad6B87E361De57UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredmovesPut = {
	move_id: string
	run_id: string
	judge_id: string
}
export type ScoredMoves7B1Ea975F97D463CBe955F805Bea1883UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMovesbeac6A7FB4B142E2Ad87Ca96F9Ec8Ac4UpsertManyResponseListModel =
	ScoredMoves7B1Ea975F97D463CBe955F805Bea1883UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredMovesdbad0E3FAa8647C687C79896F33Da0F2CreateManyInsertItemRequestModel =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMoves0149003EEfe64CffB57753Fea5482177DeleteManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMovesa4A246Ea55084198B2Ed02A2829Ffd96DeleteManyResponseListModel =
	ScoredMoves0149003EEfe64CffB57753Fea5482177DeleteManyResponseModelWithValidators[]
export type ScoredMoves10165A48D38C4E4FB1E140Aa9Db5E301PatchManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMoves54C1395584A448D4B1FdF74Ba90C2Ff6PatchManyResponseListModelWithValidators =
	ScoredMoves10165A48D38C4E4FB1E140Aa9Db5E301PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredmovesPatch = {
	move_id?: string
	run_id?: string
	judge_id?: string
}
export type ScoredMovese275C56CD5B54E758D590475Ade0Cff2FindOneResponseModelWithValidators =
	{
		run_foreign?: ForeignRun7863Da80744040F882D90768A15755A1GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovesa196Dd786C284C44944E495Cae2C0Ce8GetManyResponseForeignModel
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMoves6A4F36A2E7D44431B18FF6877C211B0DFindOneResponseListModel =
	ScoredMovese275C56CD5B54E758D590475Ade0Cff2FindOneResponseModelWithValidators
export type TableName8F5911DeEc2D4496Bdf6812D6167Cad8 = "run" | "availableMoves"
export type ScoredMoves7Fd824DaF6F94C35B79C851B971B421AUpdateOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type BodyEntireUpdateByPrimaryKeyScoredmovesIdPut = {
	move_id: string
	run_id: string
	judge_id: string
}
export type ScoredMoves8Cc61A253D6D468CB501B5862B3B1Bc4DeleteOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMovesb9B4Dd5796354724Ac0AF0Cb54714D4BPatchOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch = {
	move_id?: string
	run_id?: string
	judge_id?: string
}
export type ForeignAvailableBonusese00Ec1Ce12C94D0E973E46De6010924EFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableBonusesd7018B3AD1924215A88E886E17Fc1C38GetManyResponseForeignModel =
	ForeignAvailableBonusese00Ec1Ce12C94D0E973E46De6010924EFindManyResponseItemModelWithValidators[]
export type ForeignScoredMovesabe7552FF7B34D8B922980Fdff56C759FindManyResponseItemModelWithValidators =
	{
		id?: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ForeignScoredMoves7C0E0918764F49E3Acf702Df7C968DcdGetManyResponseForeignModel =
	ForeignScoredMovesabe7552FF7B34D8B922980Fdff56C759FindManyResponseItemModelWithValidators[]
export type ScoredBonuses8080E7CdA0944Abe909A6711Ee064B0AFindManyResponseItemModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesd7018B3AD1924215A88E886E17Fc1C38GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves7C0E0918764F49E3Acf702Df7C968DcdGetManyResponseForeignModel
		id?: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonusesbe75662A132047FbB06C1152D49C01E2FindManyResponseListModel =

		| ScoredBonuses8080E7CdA0944Abe909A6711Ee064B0AFindManyResponseItemModelWithValidators[]
		| undefined
export type TableNamef484B6185F2F4BeaBc159A56De5D5F19 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses90539F19C2214Cf6B96DB59513F38De1UpdateManyResponseModelWithValidators =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonuses11B6536CA10D45D59A4FCedd85A06951UpdateManyResponseListModelWithValidators =
	ScoredBonuses90539F19C2214Cf6B96DB59513F38De1UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredbonusesPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonuses3215AccaFb4F46Ad81Ed236E3F35C146UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonuses7C4AaafeDaa54A4D8B9E88B712681B8DUpsertManyResponseListModel =
	ScoredBonuses3215AccaFb4F46Ad81Ed236E3F35C146UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredBonusesef79Fa3CE4984D9A9Cf1D8F1Fb2Efc35CreateManyInsertItemRequestModel =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonuses0D19Ee7D182C4C4897414Ef7F142E8F6DeleteManyResponseModelWithValidators =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonusesafbc9A1C73F54011932CB69F30014E72DeleteManyResponseListModel =
	ScoredBonuses0D19Ee7D182C4C4897414Ef7F142E8F6DeleteManyResponseModelWithValidators[]
export type ScoredBonusesec0623D5Ce874C008308F9C41258D1F9PatchManyResponseModelWithValidators =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonuses4288526D492C45C18824950Ed7Bd066APatchManyResponseListModelWithValidators =
	ScoredBonusesec0623D5Ce874C008308F9C41258D1F9PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredbonusesPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ScoredBonusese5Bedf4E51064D958Cf34De67F6Ef743FindOneResponseModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesd7018B3AD1924215A88E886E17Fc1C38GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves7C0E0918764F49E3Acf702Df7C968DcdGetManyResponseForeignModel
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonusescfcf786B0761433CA918905F7Bf94715FindOneResponseListModel =
	ScoredBonusese5Bedf4E51064D958Cf34De67F6Ef743FindOneResponseModelWithValidators
export type TableNamea441Ff81Cd0840809EbcDe40D88F0383 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses206996Ef659A4A19Bf39131Be6B3Cb8CUpdateOneResponseModelWithValidators =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type BodyEntireUpdateByPrimaryKeyScoredbonusesIdPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonusesaa26B8Fa36034069Be887Dedd483B325DeleteOneResponseModelWithValidators =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonuses19B8089960384B24B5AdAc444893Fb18PatchOneResponseModelWithValidators =
	{
		id: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyScoredbonusesIdPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ForeignHeat41Bfcf746Cb1449E827515D4Bda54900FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeata10915CdB40B48Be9991Bbb0483F8600GetManyResponseForeignModel =
	ForeignHeat41Bfcf746Cb1449E827515D4Bda54900FindManyResponseItemModelWithValidators[]
export type ForeignAthlete1AdebdedEbbd474698Df7F84045A72F9FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
	}
export type ForeignAthletea567713EF3634928A47B62F935494783GetManyResponseForeignModel =
	ForeignAthlete1AdebdedEbbd474698Df7F84045A72F9FindManyResponseItemModelWithValidators[]
export type Athleteheatc6131A0CFed04E36A57A5Aa3Dbcef54FFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeata10915CdB40B48Be9991Bbb0483F8600GetManyResponseForeignModel
		athlete_foreign?: ForeignAthletea567713EF3634928A47B62F935494783GetManyResponseForeignModel
		id?: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheat9D65Dc558D054F228C716Dec25D8Eee8FindManyResponseListModel =

		| Athleteheatc6131A0CFed04E36A57A5Aa3Dbcef54FFindManyResponseItemModelWithValidators[]
		| undefined
export type TableNameca17631A5Deb4D4986F34315516543Df = "heat" | "athlete"
export type Athleteheatf9F9E294Ce94454F966B3A213E192Bf0UpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheataa19B1A565F94CfaBafcE6Db7E2Ec066UpdateManyResponseListModelWithValidators =
	Athleteheatf9F9E294Ce94454F966B3A213E192Bf0UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthleteheatPut = {
	heat_id: string
	athlete_id: string
}
export type Athleteheat0B8Bbdcc9Ddd4D11B216Bc23Fc5F1143UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheat3C474D9203874F14A2619F4442Cd7F5CUpsertManyResponseListModel =
	Athleteheat0B8Bbdcc9Ddd4D11B216Bc23Fc5F1143UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheat36A04A561Ee141F4Ae535Edc8Be901E7CreateManyInsertItemRequestModel =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheate96076322A1145C18006Fd3F713F7Fb7DeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheate12Cd20C6E294663913539C6E778E485DeleteManyResponseListModel =
	Athleteheate96076322A1145C18006Fd3F713F7Fb7DeleteManyResponseModelWithValidators[]
export type Athleteheat1E9D87C8Be3D49B4B5De565C65Ba293CPatchManyResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheatbac9B9D59Eab455E8131D29Da8313866PatchManyResponseListModelWithValidators =
	Athleteheat1E9D87C8Be3D49B4B5De565C65Ba293CPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthleteheatPatch = {
	heat_id?: string
	athlete_id?: string
}
export type Athleteheatc06E7C3C10Aa4Deb9F974100356E70E3FindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeata10915CdB40B48Be9991Bbb0483F8600GetManyResponseForeignModel
		athlete_foreign?: ForeignAthletea567713EF3634928A47B62F935494783GetManyResponseForeignModel
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheat555E33B12E5A4C94B07CE3Df3D9E76A5FindOneResponseListModel =
	Athleteheatc06E7C3C10Aa4Deb9F974100356E70E3FindOneResponseModelWithValidators
export type TableName8Bb23276527C4D0D9Db311E990Ef00Ec = "heat" | "athlete"
export type Athleteheat88644D62540E4Cb7B8F11Cc9F2F7D143UpdateOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type BodyEntireUpdateByPrimaryKeyAthleteheatIdPut = {
	heat_id: string
	athlete_id: string
}
export type Athleteheatd16B1E2657004Bde8A430De08Af7F0CeDeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type Athleteheat1F90F99D073845F08Af6F14F9B174252PatchOneResponseModelWithValidators =
	{
		id: string
		heat_id?: string
		athlete_id?: string
	}
export type BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch = {
	heat_id?: string
	athlete_id?: string
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
	useGetManyAthleteGetQuery,
	useEntireUpdateManyByQueryAthletePutMutation,
	useInsertManyAthletePostMutation,
	useDeleteManyByQueryAthleteDeleteMutation,
	usePartialUpdateManyByQueryAthletePatchMutation,
	useGetOneByPrimaryKeyAthleteIdGetQuery,
	useEntireUpdateByPrimaryKeyAthleteIdPutMutation,
	useDeleteOneByPrimaryKeyAthleteIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyAthleteIdPatchMutation,
	useGetManyScoresheetGetQuery,
	useEntireUpdateManyByQueryScoresheetPutMutation,
	useInsertManyScoresheetPostMutation,
	useDeleteManyByQueryScoresheetDeleteMutation,
	usePartialUpdateManyByQueryScoresheetPatchMutation,
	useGetOneByPrimaryKeyScoresheetIdGetQuery,
	useEntireUpdateByPrimaryKeyScoresheetIdPutMutation,
	useDeleteOneByPrimaryKeyScoresheetIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyScoresheetIdPatchMutation,
	useGetManyAvailablemovesGetQuery,
	useEntireUpdateManyByQueryAvailablemovesPutMutation,
	useInsertManyAvailablemovesPostMutation,
	useDeleteManyByQueryAvailablemovesDeleteMutation,
	usePartialUpdateManyByQueryAvailablemovesPatchMutation,
	useGetOneByPrimaryKeyAvailablemovesIdGetQuery,
	useEntireUpdateByPrimaryKeyAvailablemovesIdPutMutation,
	useDeleteOneByPrimaryKeyAvailablemovesIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyAvailablemovesIdPatchMutation,
	useGetManyAvailablebonusesGetQuery,
	useEntireUpdateManyByQueryAvailablebonusesPutMutation,
	useInsertManyAvailablebonusesPostMutation,
	useDeleteManyByQueryAvailablebonusesDeleteMutation,
	usePartialUpdateManyByQueryAvailablebonusesPatchMutation,
	useGetOneByPrimaryKeyAvailablebonusesIdGetQuery,
	useEntireUpdateByPrimaryKeyAvailablebonusesIdPutMutation,
	useDeleteOneByPrimaryKeyAvailablebonusesIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyAvailablebonusesIdPatchMutation,
	useGetManyScoredmovesGetQuery,
	useEntireUpdateManyByQueryScoredmovesPutMutation,
	useInsertManyScoredmovesPostMutation,
	useDeleteManyByQueryScoredmovesDeleteMutation,
	usePartialUpdateManyByQueryScoredmovesPatchMutation,
	useGetOneByPrimaryKeyScoredmovesIdGetQuery,
	useEntireUpdateByPrimaryKeyScoredmovesIdPutMutation,
	useDeleteOneByPrimaryKeyScoredmovesIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyScoredmovesIdPatchMutation,
	useGetManyScoredbonusesGetQuery,
	useEntireUpdateManyByQueryScoredbonusesPutMutation,
	useInsertManyScoredbonusesPostMutation,
	useDeleteManyByQueryScoredbonusesDeleteMutation,
	usePartialUpdateManyByQueryScoredbonusesPatchMutation,
	useGetOneByPrimaryKeyScoredbonusesIdGetQuery,
	useEntireUpdateByPrimaryKeyScoredbonusesIdPutMutation,
	useDeleteOneByPrimaryKeyScoredbonusesIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyScoredbonusesIdPatchMutation,
	useGetManyAthleteheatGetQuery,
	useEntireUpdateManyByQueryAthleteheatPutMutation,
	useInsertManyAthleteheatPostMutation,
	useDeleteManyByQueryAthleteheatDeleteMutation,
	usePartialUpdateManyByQueryAthleteheatPatchMutation,
	useGetOneByPrimaryKeyAthleteheatIdGetQuery,
	useEntireUpdateByPrimaryKeyAthleteheatIdPutMutation,
	useDeleteOneByPrimaryKeyAthleteheatIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyAthleteheatIdPatchMutation,
	useGetAthleteHeatsByAthleteIdGetQuery,
	useGetAthleteHeatsByAthleteIdAthleteheatAthleteAthleteIdGetQuery
} = injectedRtkApi
