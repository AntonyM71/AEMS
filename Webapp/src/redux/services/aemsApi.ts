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
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList,
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
					last_name____list: queryArg.lastNameList,
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList
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
					last_name____list: queryArg.lastNameList,
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList
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
					last_name____list: queryArg.lastNameList,
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList
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
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList,
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
					last_name____list: queryArg.lastNameList,
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList
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
					last_name____list: queryArg.lastNameList,
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList
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
					last_name____list: queryArg.lastNameList,
					bib____str_____matching_pattern:
						queryArg.bibStrMatchingPattern,
					bib____str: queryArg.bibStr,
					bib____list_____comparison_operator:
						queryArg.bibListComparisonOperator,
					bib____list: queryArg.bibList
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList,
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					fl_score____from_____comparison_operator:
						queryArg.flScoreFromComparisonOperator,
					fl_score____to_____comparison_operator:
						queryArg.flScoreToComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					fl_score____list: queryArg.flScoreList,
					rb_score____from_____comparison_operator:
						queryArg.rbScoreFromComparisonOperator,
					rb_score____to_____comparison_operator:
						queryArg.rbScoreToComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					rb_score____list: queryArg.rbScoreList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList,
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
					athlete_id____list: queryArg.athleteIdList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					athlete_id____list: queryArg.athleteIdList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					athlete_id____list: queryArg.athleteIdList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList,
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
					athlete_id____list: queryArg.athleteIdList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					athlete_id____list: queryArg.athleteIdList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					athlete_id____list: queryArg.athleteIdList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
				}
			})
		}),
		rootGet: build.query<RootGetApiResponse, RootGetApiArg>({
			query: () => ({ url: `/` })
		}),
		addUpdateScoresheetAddUpdateScoresheetScoresheetIdPost: build.mutation<
			AddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostApiResponse,
			AddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostApiArg
		>({
			query: (queryArg) => ({
				url: `/addUpdateScoresheet/${queryArg.scoresheetId}`,
				method: "POST",
				body: queryArg.addUpdateScoresheetRequest
			})
		})
	}),
	overrideExisting: false
})
export { injectedRtkApi as aemsApi }
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competitionf997010B88F64Ae3Bf920C77999B12F2FindManyResponseListModel
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
	joinForeignTable?: TableNamea613A142D98E437AB7B656Aba34C2B32[]
}
export type EntireUpdateManyByQueryCompetitionPutApiResponse =
	/** status 200 Successful Response */ Competitiona37Cd5644E704676A9A60Fed4B5A0BecUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Competition1F9D7Fd371Be4402Ba309A867557Fcf6UpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	body: Competition959533E403C94027Ba0BF03941879574CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryCompetitionDeleteApiResponse =
	/** status 200 Successful Response */ Competition07Dc527104E8449288571605Facbb29DDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Competition71Eb443B2A704Ae69Ba67E18580B3B47PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Competition7590E1Dc7A444D8A81BdCaf30147E0E5FindOneResponseListModel
export type GetOneByPrimaryKeyCompetitionIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamed31363E19Eec4F77B322Ba55E17B6Ba7[]
}
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse =
	/** status 200 Successful Response */ Competitionc303D512724247Bf92754D8Ccc85Df2CUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse =
	/** status 200 Successful Response */ Competitionefc1Ac49A6Af4D93Ae67730C2Fa5De68DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competitionef97016C1A1145Dd85CfE8Fd2C0965F1PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIda40058E350Bb4Eed902C02Ece89314F9FindOneResponseListModel
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg =
	{
		competitionPkId: string
		eventPkId: string
		nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
		nameStr?: string[]
		nameListComparisonOperator?: ItemComparisonOperators
		nameList?: string[]
		joinForeignTable?: TableName6492F45E857C45A5A211827A0D3C7Ba9[]
	}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId0B28Ec5073B640CfB08D79Bd4A9Ddd0EFindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName1Cb5Bf71Fb974201Bd4F42390047644B[]
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event3Bdac5Cc358643Bc8C37F154C9Dc1D19FindManyResponseListModel
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
	joinForeignTable?: TableNameca8653F8B9F441Ad92C95983Fa245362[]
}
export type EntireUpdateManyByQueryEventPutApiResponse =
	/** status 200 Successful Response */ Event690Db4B2D05845E6808B57641A82318DUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Event33A2722EF4A34Ff8B96BF79677B815AfUpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	body: Eventa6722Be96F9D409FB79D3119B37C14A3CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryEventDeleteApiResponse =
	/** status 200 Successful Response */ Eventbe3E1373Cf3444D59769Ea82D2B0796EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Eventfec09454742645FdAaccDf3F2095E0D7PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Event98E8A74A7D664Bb1A22F732E9Ad76Fe1FindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName971541949A654D3A9C9FC9F883Cd118D[]
}
export type EntireUpdateByPrimaryKeyEventIdPutApiResponse =
	/** status 200 Successful Response */ Event4428Cbf2836A4Ae78406878C7616Af79UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event363778BaCc334Cca825E5D84A75B3Cf0DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event38F12883A321442B8813B85B69C850A6PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ EventIdPhaseId0E21A9E96346452B89Cc1135Bfa23A74FindOneResponseListModel
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
	joinForeignTable?: TableName88836001C5Dc4Cfd8A5A4158E8C293B4[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseId2A922E1D874841D3943F607Ce35Eee8AFindManyResponseListModel
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
	joinForeignTable?: TableName22D560970F7D4C9FA9A60Ecca66C6B73[]
}
export type GetManyPhaseGetApiResponse =
	/** status 200 Successful Response */ Phasef08D80AdDc544B749Cfd786776463F46FindManyResponseListModel
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
	joinForeignTable?: TableNamef728B2Ae1C584F35B1745Cabf8956083[]
}
export type EntireUpdateManyByQueryPhasePutApiResponse =
	/** status 200 Successful Response */ Phaseab6Ea518E250448BB4Da845Fe717Ff12UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Phasef09535B8Bc9B46769A5029Ddb1B83F6BUpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	body: Phaseccffd912Baac4E6D9Ae3C2603E22222BCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryPhaseDeleteApiResponse =
	/** status 200 Successful Response */ Phase2415B5868C2D4E058E5535A647Fe3A06DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Phasec6959A111B8F41689E2774Ef2C4Ec0A1PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Phasee7778C9F19E64Db6A1E81Ef2Cf6A3Ed5FindOneResponseListModel
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
	joinForeignTable?: TableName78B092Ad3E2B4Bc6Aa6CF89E384992D9[]
}
export type EntireUpdateByPrimaryKeyPhaseIdPutApiResponse =
	/** status 200 Successful Response */ Phase67B0791063Ae4Be999A4E003A28Fcb7DUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phasea707Da82F6Bf46Ee97737E36F0034F3BDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phase66724Abb3C1442D3919D89Bd500A66FbPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ PhaseIdHeatId2862Af075F92408792316127Fc75Bc04FindOneResponseListModel
export type GetOneByPkFromHeatPhasePhasePkIdHeatHeatPkIdGetApiArg = {
	phasePkId: string
	heatPkId: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName7982E1C7E3Ae491981540B8B18E984D0[]
}
export type GetManyByPkFromHeatPhasePhasePkIdHeatGetApiResponse =
	/** status 200 Successful Response */ PhaseIdHeatIdbb2B035CCf9F4150888C4E5737F0E178FindManyResponseListModel
export type GetManyByPkFromHeatPhasePhasePkIdHeatGetApiArg = {
	phasePkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamed0D7Aed6446A42A2Ad55C2Bc29952Dd7[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heat246B88813656453A8159630A965E0FbdFindManyResponseListModel
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
	joinForeignTable?: TableNamea1Cce7Ce52Bf4345845518Ea9030C502[]
}
export type EntireUpdateManyByQueryHeatPutApiResponse =
	/** status 200 Successful Response */ Heat08E70812F61E483B84D6E996A68481BfUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Heatb4294501209647F097651A0Df8Edbe2CUpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	body: Heat7C039C61E98B472ABfb6A8F6A8D780FfCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryHeatDeleteApiResponse =
	/** status 200 Successful Response */ Heatc5A1B632B06B41868436596A08F7364EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Heat5Ee8Ab94973045Dc9Ffe0Fdad1799E3EPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Heatc3E4F80CFd484Ad3B724Fbcbc1A4C234FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName3D83D392F6Ac4B73Ad20503730278F27[]
}
export type EntireUpdateByPrimaryKeyHeatIdPutApiResponse =
	/** status 200 Successful Response */ Heat61Ce1Fc20B6E41B2B313Ccf6Df77Cd3DUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat701C5CbbDc934F95Aa0FF44259203Ed2DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat37E98C1998E94B2A83B159Ec6D93E1D2PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ HeatIdRunId61E1B136074E45Ce95E67014072Ef09CFindOneResponseListModel
export type GetOneByPkFromRunHeatHeatPkIdRunRunPkIdGetApiArg = {
	heatPkId: string
	runPkId: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamed9De321078A6487CB12A00E92D7080F7[]
}
export type GetManyByPkFromRunHeatHeatPkIdRunGetApiResponse =
	/** status 200 Successful Response */ HeatIdRunIdaa849B1415F342Bb9A3619A08716A3D1FindManyResponseListModel
export type GetManyByPkFromRunHeatHeatPkIdRunGetApiArg = {
	heatPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamee1262A281F634Db3Adde828026495Ca7[]
}
export type GetManyRunGetApiResponse =
	/** status 200 Successful Response */ Run36B0D794Cef74C6884EcE06Eea72644BFindManyResponseListModel
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
	joinForeignTable?: TableNameedfd1180Fef24607Abdb3B898362B153[]
}
export type EntireUpdateManyByQueryRunPutApiResponse =
	/** status 200 Successful Response */ Run69Ce039803A8450EB1D4A9636Fb35219UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Run144E73E5Fdb04533900D77Da7Df1E0AbUpsertManyResponseListModel
export type InsertManyRunPostApiArg = {
	body: Run91F96B6228Bd4B2D8A02C070878C080ACreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryRunDeleteApiResponse =
	/** status 200 Successful Response */ Runf358B79C3A8D4F72Bd104361D3E8B381DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Runef9C7E6631B54A028C5867827Ecaf0FaPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Run62E312A4D7324B23848DBf28Dbb7A2B8FindOneResponseListModel
export type GetOneByPrimaryKeyRunIdGetApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName105F8E28425C4C9CA8066C0D91930C4A[]
}
export type EntireUpdateByPrimaryKeyRunIdPutApiResponse =
	/** status 200 Successful Response */ Run1031B239Ffe44739Aa59F913E7185B24UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Rund33322F606004D06A852E9042449C734DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Run0B58Dc7BC54247F093Bb81E1A5B37B93PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athletede51416C856D412EBa2F656D91436024FindManyResponseListModel
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'first_name', 'last_name', 'bib'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName91B9D98DB8314959B9923A70046D1Acb[]
}
export type EntireUpdateManyByQueryAthletePutApiResponse =
	/** status 200 Successful Response */ Athleteda1C2608991F42D7B87E5Dc59Ada5A46UpdateManyResponseListModelWithValidators
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
	bodyEntireUpdateManyByQueryAthletePut: BodyEntireUpdateManyByQueryAthletePut
}
export type InsertManyAthletePostApiResponse =
	/** status 201 Successful Response */ Athlete543B9B7BCf0D458DBc34Dfddfddb306AUpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	body: Athlete3368C360A573409FA1F666Cb8E3993A6CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteDeleteApiResponse =
	/** status 200 Successful Response */ Athletea8E29Ff7Dc214001A89178305098Abc9DeleteManyResponseListModel
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
}
export type PartialUpdateManyByQueryAthletePatchApiResponse =
	/** status 200 Successful Response */ Athlete0C47623D83E24DfeB2F9600E74515F23PatchManyResponseListModelWithValidators
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
	bodyPartialUpdateManyByQueryAthletePatch: BodyPartialUpdateManyByQueryAthletePatch
}
export type GetOneByPrimaryKeyAthleteIdGetApiResponse =
	/** status 200 Successful Response */ Athlete370Dc2467Ae348C79499B2A635A2Dd81FindOneResponseListModel
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
	joinForeignTable?: TableName9C42497D59614Da68B774B870Af1744F[]
}
export type EntireUpdateByPrimaryKeyAthleteIdPutApiResponse =
	/** status 200 Successful Response */ Athletef9C9C3C6F7D6479798C6C08A5E0809C8UpdateOneResponseModelWithValidators
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
	bodyEntireUpdateByPrimaryKeyAthleteIdPut: BodyEntireUpdateByPrimaryKeyAthleteIdPut
}
export type DeleteOneByPrimaryKeyAthleteIdDeleteApiResponse =
	/** status 200 Successful Response */ Athlete390387Fc93844D7B840D1Cf8Fafe5A02DeleteOneResponseModelWithValidators
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
}
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse =
	/** status 200 Successful Response */ Athletedc2842B917F74Ce58Dd357A6A3E885FfPatchOneResponseModelWithValidators
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
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
	bodyPartialUpdateOneByPrimaryKeyAthleteIdPatch: BodyPartialUpdateOneByPrimaryKeyAthleteIdPatch
}
export type GetManyScoresheetGetApiResponse =
	/** status 200 Successful Response */ ScoreSheetd509F56453D945F6B895F6Cdc71275E6FindManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheet753F837CC2074910Acf0Aab09734Ed5EUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoreSheet85235A83053F44F483EdC3179545118BUpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	body: ScoreSheet3580Fa9DC6914F5892B2Ec6235F5Dfe9CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoresheetDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheet8Eb38374Ccec450387C29Fc70945453EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheet1F5F8Bd80Aa5415DAa0136A142161A55PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheetbbf0Afc7B8044118B50D4E884Dee4C2DFindOneResponseListModel
export type GetOneByPrimaryKeyScoresheetIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiResponse =
	/** status 200 Successful Response */ ScoreSheet1F4Cfb1F61F14B06Afb46Dae490F49C4UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheet119274B399414C20A4F4B1Dc39C8100EDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiResponse =
	/** status 200 Successful Response */ ScoreSheet5A543947751645439B9E710Dd0C31Be5PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMovesd5E8Ca03F322424CBa4F972Ddd039F64FindManyResponseListModel
export type GetManyAvailablemovesGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'sheet_id', 'name', 'fl_score', 'rb_score', 'direction'] <hr><br> support ordering:
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
	/** status 200 Successful Response */ AvailableMoves42B540F83Ca945E4Ad02Cc73D0C1Dd20UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAvailablemovesPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyEntireUpdateManyByQueryAvailablemovesPut: BodyEntireUpdateManyByQueryAvailablemovesPut
}
export type InsertManyAvailablemovesPostApiResponse =
	/** status 201 Successful Response */ AvailableMoves0Eb43E277645454DAebc5F1A6B293889UpsertManyResponseListModel
export type InsertManyAvailablemovesPostApiArg = {
	body: AvailableMoves70701C2C9F1248A49B39Bf696Ba71111CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablemovesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMovesbb3B0E11A32E4F7F9A9B23C0B8915A9CDeleteManyResponseListModel
export type DeleteManyByQueryAvailablemovesDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
}
export type PartialUpdateManyByQueryAvailablemovesPatchApiResponse =
	/** status 200 Successful Response */ AvailableMoves161465F0731F4F61999E7421C80F4Ac4PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAvailablemovesPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyPartialUpdateManyByQueryAvailablemovesPatch: BodyPartialUpdateManyByQueryAvailablemovesPatch
}
export type GetOneByPrimaryKeyAvailablemovesIdGetApiResponse =
	/** status 200 Successful Response */ AvailableMoves193Cba5CF25F4B0C82E3C3Ac85Ba8B1DFindOneResponseListModel
export type GetOneByPrimaryKeyAvailablemovesIdGetApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
}
export type EntireUpdateByPrimaryKeyAvailablemovesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableMoves02880C2159A74E9ABfe9371F36252245UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAvailablemovesIdPutApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyEntireUpdateByPrimaryKeyAvailablemovesIdPut: BodyEntireUpdateByPrimaryKeyAvailablemovesIdPut
}
export type DeleteOneByPrimaryKeyAvailablemovesIdDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMoves9114C0Cf852E486FAd8AB79A9C752D5EDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAvailablemovesIdDeleteApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
}
export type PartialUpdateOneByPrimaryKeyAvailablemovesIdPatchApiResponse =
	/** status 200 Successful Response */ AvailableMoves9164A4282Ac845B5B6FcC444212Fe4AaPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAvailablemovesIdPatchApiArg = {
	id: string
	sheetIdListComparisonOperator?: ItemComparisonOperators
	sheetIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	flScoreFromComparisonOperator?: RangeFromComparisonOperators
	flScoreToComparisonOperator?: RangeToComparisonOperators
	flScoreFrom?: number
	flScoreTo?: number
	flScoreListComparisonOperator?: ItemComparisonOperators
	flScoreList?: number[]
	rbScoreFromComparisonOperator?: RangeFromComparisonOperators
	rbScoreToComparisonOperator?: RangeToComparisonOperators
	rbScoreFrom?: number
	rbScoreTo?: number
	rbScoreListComparisonOperator?: ItemComparisonOperators
	rbScoreList?: number[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyPartialUpdateOneByPrimaryKeyAvailablemovesIdPatch: BodyPartialUpdateOneByPrimaryKeyAvailablemovesIdPatch
}
export type GetManyAvailablebonusesGetApiResponse =
	/** status 200 Successful Response */ AvailableBonuses32B8C0E570224F409C6AEd5142835948FindManyResponseListModel
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
	joinForeignTable?: TableNameadae606385B74D3387C11E5A91083180[]
}
export type EntireUpdateManyByQueryAvailablebonusesPutApiResponse =
	/** status 200 Successful Response */ AvailableBonusese48A48F4Bf6A482A94D58A8C55B99627UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableBonuses5C91A16CC8D641078E7F8Bc400Ff4052UpsertManyResponseListModel
export type InsertManyAvailablebonusesPostApiArg = {
	body: AvailableBonuses642797000A4242D5B19BAe542Eceb463CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablebonusesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableBonuses5E0Aa743C4704AbcB4538A069A60986CDeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonuses63D5Cfdd3Bbf4A86Acde92De2Ad0E225PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses1A78B88C0E794Aa78F556Cfed1Dde591FindOneResponseListModel
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
	joinForeignTable?: TableName2E322C614A6F47Ec8F268281Ba579760[]
}
export type EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableBonusesd4E2Ad8DA808441891D6E7B7B50Ce3DaUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesfef969B611A74Ee0A0947A0143E430E2DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses6481E188492A4384B4E3C2246A630C6EPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves5288D307E6Ba41358626Ce4F6Dcc9Ee3FindManyResponseListModel
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
	joinForeignTable?: TableName170D687D54464162Aac33529Be707Bf0[]
}
export type EntireUpdateManyByQueryScoredmovesPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves16E1904E2F7D40578E3DDa6E382F616CUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredMovesee3Fe30E8455436DB0Ce0B7E0D706589UpsertManyResponseListModel
export type InsertManyScoredmovesPostApiArg = {
	body: ScoredMovesffe21B0323514F6DB1FeCc3A286De063CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMoves2F151B92316B4A66Aba0Cfc27383C7E3DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredMovesb6Cdb53B86Fe4B249606Dc7689B6E27EPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredMovesf6F87Cd8602B46788D87D2315Dc2075BFindOneResponseListModel
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
	joinForeignTable?: TableName28725654303E43Da904A71Db74359C8D[]
}
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves47C26954E5004385A497E19Bf342B8F1UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves3794Dad611804F3AA36FDdfc32Aa7D74DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMovesd56Dab4FFb214881938F847D95E39177PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonusesa288460336Cf4C8EB8B42F466B49Cf93FindManyResponseListModel
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
	joinForeignTable?: TableName8059191A009241A7B1E627654968234E[]
}
export type EntireUpdateManyByQueryScoredbonusesPutApiResponse =
	/** status 200 Successful Response */ ScoredBonusesbe2Ca729E40A4797928D85E7Ff9F02CbUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredBonusesd0426F7412E14479A800C675Fde6A2E5UpsertManyResponseListModel
export type InsertManyScoredbonusesPostApiArg = {
	body: ScoredBonuses4Ac943296Dc04E9C83763243D29A5453CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredbonusesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredBonuses2F12Aa3F0C09477192A6D9E8934B9A6ADeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredBonuses7B7A6C0274C744168A545Bb79Ff162B5PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses4D01996E54E44168968D32C3790E2CfaFindOneResponseListModel
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
	joinForeignTable?: TableName2Ef0515615534C0F9645Ba6987Dbcaba[]
}
export type EntireUpdateByPrimaryKeyScoredbonusesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses13366896F8384Ac1B182F7Ae89B0E085UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses5790704FE4324F17836D267A1C57032CDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonusesf1856804347145D59150Dedc99B19Cc1PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat27C2B5746Cbb469EAefc34A7Ca217896FindManyResponseListModel
export type GetManyAthleteheatGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'heat_id', 'athlete_id', 'scoresheet'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName16747B54E849425094143Ef997905Ceb[]
}
export type EntireUpdateManyByQueryAthleteheatPutApiResponse =
	/** status 200 Successful Response */ Athleteheat9Dfbf93D5Db04367A43AB0539356F942UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAthleteheatPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyEntireUpdateManyByQueryAthleteheatPut: BodyEntireUpdateManyByQueryAthleteheatPut
}
export type InsertManyAthleteheatPostApiResponse =
	/** status 201 Successful Response */ Athleteheataef186A38Ec441De9Fb6362Ed54A45C1UpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	body: Athleteheat791D1173Be714518Aa7A45Fcda0F4F50CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteheatDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheat38B306A5E0674B0DAdb9132D316Cd994DeleteManyResponseListModel
export type DeleteManyByQueryAthleteheatDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
}
export type PartialUpdateManyByQueryAthleteheatPatchApiResponse =
	/** status 200 Successful Response */ Athleteheatb30E1Df0C6424EfdBa571005A78Fd89BPatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAthleteheatPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyPartialUpdateManyByQueryAthleteheatPatch: BodyPartialUpdateManyByQueryAthleteheatPatch
}
export type GetOneByPrimaryKeyAthleteheatIdGetApiResponse =
	/** status 200 Successful Response */ Athleteheatde91888AE5064C2D9C69931638Da5341FindOneResponseListModel
export type GetOneByPrimaryKeyAthleteheatIdGetApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	joinForeignTable?: TableName9F28Ab2B028241Cb9E879B1924620331[]
}
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiResponse =
	/** status 200 Successful Response */ Athleteheat573E16A0Ca164D02Bcff154F3Bd54E20UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyEntireUpdateByPrimaryKeyAthleteheatIdPut: BodyEntireUpdateByPrimaryKeyAthleteheatIdPut
}
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheat6Fdb7E5C98234663A19B304Bc5847772DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat0D43Dfe78E2A4B6E85D912813F1C849CPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch: BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch
}
export type RootGetApiResponse = /** status 200 Successful Response */ any
export type RootGetApiArg = void
export type AddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostApiResponse =
	/** status 200 Successful Response */ any
export type AddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostApiArg = {
	scoresheetId: any
	addUpdateScoresheetRequest: AddUpdateScoresheetRequest
}
export type ForeignEvente18D1Cb581834Df59D770Ac5Eb330978FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventf9Bc1Db1C70C442D804D6D3919698753GetManyResponseForeignModel =
	ForeignEvente18D1Cb581834Df59D770Ac5Eb330978FindManyResponseItemModelWithValidators[]
export type Competition493E4211Af4B4B20B4B07B6A9Db179A8FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEventf9Bc1Db1C70C442D804D6D3919698753GetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competitionf997010B88F64Ae3Bf920C77999B12F2FindManyResponseListModel =

		| Competition493E4211Af4B4B20B4B07B6A9Db179A8FindManyResponseItemModelWithValidators[]
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
export type TableNamea613A142D98E437AB7B656Aba34C2B32 = "event"
export type Competition0B9A3888E7B34A7BA2863E9C52F77D64UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitiona37Cd5644E704676A9A60Fed4B5A0BecUpdateManyResponseListModelWithValidators =
	Competition0B9A3888E7B34A7BA2863E9C52F77D64UpdateManyResponseModelWithValidators[]
export type Competition83898E0B0C4D4102A8059Cbcf16698A4UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type Competition1F9D7Fd371Be4402Ba309A867557Fcf6UpsertManyResponseListModel =
	Competition83898E0B0C4D4102A8059Cbcf16698A4UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition959533E403C94027Ba0BF03941879574CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type Competition5197Ef1CE8634Df09325F377372Bdca6DeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition07Dc527104E8449288571605Facbb29DDeleteManyResponseListModel =
	Competition5197Ef1CE8634Df09325F377372Bdca6DeleteManyResponseModelWithValidators[]
export type Competitionec849698C45E41DcA18A4734B3A2DacdPatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition71Eb443B2A704Ae69Ba67E18580B3B47PatchManyResponseListModelWithValidators =
	Competitionec849698C45E41DcA18A4734B3A2DacdPatchManyResponseModelWithValidators[]
export type Competition75923A36A05244B6A177338001Ffe0B0FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEventf9Bc1Db1C70C442D804D6D3919698753GetManyResponseForeignModel
		id: string
		name: string
	}
export type Competition7590E1Dc7A444D8A81BdCaf30147E0E5FindOneResponseListModel =
	Competition75923A36A05244B6A177338001Ffe0B0FindOneResponseModelWithValidators
export type TableNamed31363E19Eec4F77B322Ba55E17B6Ba7 = "event"
export type Competitionc303D512724247Bf92754D8Ccc85Df2CUpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitionefc1Ac49A6Af4D93Ae67730C2Fa5De68DeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitionef97016C1A1145Dd85CfE8Fd2C0965F1PatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ForeignCompetitionab554Bef3Aa84D3092D5Ad34F0E11B76FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionb9A32E4266B2468EBdf5A7Df51Be302EGetManyResponseForeignModel =
	ForeignCompetitionab554Bef3Aa84D3092D5Ad34F0E11B76FindManyResponseItemModelWithValidators[]
export type ForeignPhase9C6A7F3B38B14B5A90Ed94865D16Da5EFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhased1167533Da5C4E17Bfa7Fff8955B8364GetManyResponseForeignModel =
	ForeignPhase9C6A7F3B38B14B5A90Ed94865D16Da5EFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId8Ce0618D9Fe8424D89C2F7854161Bfd4FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetitionb9A32E4266B2468EBdf5A7Df51Be302EGetManyResponseForeignModel
		phase_foreign?: ForeignPhased1167533Da5C4E17Bfa7Fff8955B8364GetManyResponseForeignModel
	}
export type CompetitionIdEventIda40058E350Bb4Eed902C02Ece89314F9FindOneResponseListModel =
	CompetitionIdEventId8Ce0618D9Fe8424D89C2F7854161Bfd4FindOneResponseModelWithValidators
export type TableName6492F45E857C45A5A211827A0D3C7Ba9 = "competition" | "phase"
export type ForeignCompetitiond58823D4565B4A5FA1DaEc81A326Acc7FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition5E9C975737A643BdBc72C68050121Bd6GetManyResponseForeignModel =
	ForeignCompetitiond58823D4565B4A5FA1DaEc81A326Acc7FindManyResponseItemModelWithValidators[]
export type ForeignPhase8E9B8E2C5C30420FB607B01110915B1EFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhasecf04Ad26Bccf4Cd3Bc870060523847CdGetManyResponseForeignModel =
	ForeignPhase8E9B8E2C5C30420FB607B01110915B1EFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId44F98F859B87497C969DE0Ad7C53541AFindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition5E9C975737A643BdBc72C68050121Bd6GetManyResponseForeignModel
		phase_foreign?: ForeignPhasecf04Ad26Bccf4Cd3Bc870060523847CdGetManyResponseForeignModel
	}
export type CompetitionIdEventId0B28Ec5073B640CfB08D79Bd4A9Ddd0EFindManyResponseListModel =

		| CompetitionIdEventId44F98F859B87497C969DE0Ad7C53541AFindOneResponseModelWithValidators[]
		| undefined
export type TableName1Cb5Bf71Fb974201Bd4F42390047644B = "competition" | "phase"
export type ForeignCompetition744F6638Cd544Bf2Bcf67C1C6Fc4A4C6FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionb3D26150A5De471BA6A7D0254D1D1DebGetManyResponseForeignModel =
	ForeignCompetition744F6638Cd544Bf2Bcf67C1C6Fc4A4C6FindManyResponseItemModelWithValidators[]
export type ForeignPhasea89C2D86B4A3412490F6E020Acc2296CFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhased6795D5D519D4Ecc8Ac03C96F4E4A04AGetManyResponseForeignModel =
	ForeignPhasea89C2D86B4A3412490F6E020Acc2296CFindManyResponseItemModelWithValidators[]
export type Event4C498055504441C79Ff6770A3Ec6A09BFindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionb3D26150A5De471BA6A7D0254D1D1DebGetManyResponseForeignModel
		phase_foreign?: ForeignPhased6795D5D519D4Ecc8Ac03C96F4E4A04AGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event3Bdac5Cc358643Bc8C37F154C9Dc1D19FindManyResponseListModel =
	| Event4C498055504441C79Ff6770A3Ec6A09BFindManyResponseItemModelWithValidators[]
	| undefined
export type TableNameca8653F8B9F441Ad92C95983Fa245362 = "competition" | "phase"
export type Event69C2Df8FFd454B00Ab2C7135Aad4E8D3UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event690Db4B2D05845E6808B57641A82318DUpdateManyResponseListModelWithValidators =
	Event69C2Df8FFd454B00Ab2C7135Aad4E8D3UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryEventPut = {
	competition_id: string
	name: string
}
export type Eventeddc166FE10448A9B3F8C9B103D13D30UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event33A2722EF4A34Ff8B96BF79677B815AfUpsertManyResponseListModel =
	Eventeddc166FE10448A9B3F8C9B103D13D30UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Eventa6722Be96F9D409FB79D3119B37C14A3CreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event9Fcb8D8FB5414F61Ba917496Afce7Cb6DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventbe3E1373Cf3444D59769Ea82D2B0796EDeleteManyResponseListModel =
	Event9Fcb8D8FB5414F61Ba917496Afce7Cb6DeleteManyResponseModelWithValidators[]
export type Event5377F1Ac02Dd40D987Ea1146278A48C7PatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventfec09454742645FdAaccDf3F2095E0D7PatchManyResponseListModelWithValidators =
	Event5377F1Ac02Dd40D987Ea1146278A48C7PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryEventPatch = {
	competition_id?: string
	name?: string
}
export type Event6Ecc76Ee9A124673B083179894937546FindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionb3D26150A5De471BA6A7D0254D1D1DebGetManyResponseForeignModel
		phase_foreign?: ForeignPhased6795D5D519D4Ecc8Ac03C96F4E4A04AGetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Event98E8A74A7D664Bb1A22F732E9Ad76Fe1FindOneResponseListModel =
	Event6Ecc76Ee9A124673B083179894937546FindOneResponseModelWithValidators
export type TableName971541949A654D3A9C9FC9F883Cd118D = "competition" | "phase"
export type Event4428Cbf2836A4Ae78406878C7616Af79UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyEventIdPut = {
	competition_id: string
	name: string
}
export type Event363778BaCc334Cca825E5D84A75B3Cf0DeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event38F12883A321442B8813B85B69C850A6PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyEventIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignEvent8Cb7278CF32042C69Da0E6C7936F4171FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent0003A4C87A884750A8854Fbc00459695GetManyResponseForeignModel =
	ForeignEvent8Cb7278CF32042C69Da0E6C7936F4171FindManyResponseItemModelWithValidators[]
export type ForeignHeat74E47167953445EaB025E5331Ba7C5BaFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatd90D5A6132A5411CAf0E2D44Df5A710FGetManyResponseForeignModel =
	ForeignHeat74E47167953445EaB025E5331Ba7C5BaFindManyResponseItemModelWithValidators[]
export type EventIdPhaseId338Dcaa618Cc4Ff2Ac82F3Bdef2C5E6CFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
		event_foreign?: ForeignEvent0003A4C87A884750A8854Fbc00459695GetManyResponseForeignModel
		heat_foreign?: ForeignHeatd90D5A6132A5411CAf0E2D44Df5A710FGetManyResponseForeignModel
	}
export type EventIdPhaseId0E21A9E96346452B89Cc1135Bfa23A74FindOneResponseListModel =
	EventIdPhaseId338Dcaa618Cc4Ff2Ac82F3Bdef2C5E6CFindOneResponseModelWithValidators
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableName88836001C5Dc4Cfd8A5A4158E8C293B4 = "event" | "heat"
export type ForeignEventb983D6C0B624420A9Db71Fbc479B040EFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent76372136780649599Aec7C4C10Dbecc0GetManyResponseForeignModel =
	ForeignEventb983D6C0B624420A9Db71Fbc479B040EFindManyResponseItemModelWithValidators[]
export type ForeignHeat27E3C6B6622944849D2745A543B236DaFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeatb9B4839FB21A46328C8933642A05E867GetManyResponseForeignModel =
	ForeignHeat27E3C6B6622944849D2745A543B236DaFindManyResponseItemModelWithValidators[]
export type EventIdPhaseIded30Ad36C52B4559B5Fd16B47Defcc6EFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
		event_foreign?: ForeignEvent76372136780649599Aec7C4C10Dbecc0GetManyResponseForeignModel
		heat_foreign?: ForeignHeatb9B4839FB21A46328C8933642A05E867GetManyResponseForeignModel
	}
export type EventIdPhaseId2A922E1D874841D3943F607Ce35Eee8AFindManyResponseListModel =

		| EventIdPhaseIded30Ad36C52B4559B5Fd16B47Defcc6EFindOneResponseModelWithValidators[]
		| undefined
export type TableName22D560970F7D4C9FA9A60Ecca66C6B73 = "event" | "heat"
export type ForeignEventd64Ffe244C7349A6B2378B0De3D6F7BbFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent08EbbadbFb5840B189Ca8E05C013B073GetManyResponseForeignModel =
	ForeignEventd64Ffe244C7349A6B2378B0De3D6F7BbFindManyResponseItemModelWithValidators[]
export type ForeignHeat323C7Bd3E72949Cd8Af32933592F58E2FindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat2Dea287CCee844A4B3Ce99Bd177F6DfaGetManyResponseForeignModel =
	ForeignHeat323C7Bd3E72949Cd8Af32933592F58E2FindManyResponseItemModelWithValidators[]
export type Phase1A1A997228734Bc594Ee66A9Bf76B688FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent08EbbadbFb5840B189Ca8E05C013B073GetManyResponseForeignModel
		heat_foreign?: ForeignHeat2Dea287CCee844A4B3Ce99Bd177F6DfaGetManyResponseForeignModel
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type Phasef08D80AdDc544B749Cfd786776463F46FindManyResponseListModel =
	| Phase1A1A997228734Bc594Ee66A9Bf76B688FindManyResponseItemModelWithValidators[]
	| undefined
export type TableNamef728B2Ae1C584F35B1745Cabf8956083 = "event" | "heat"
export type Phase9Df78A2199984E3BA76D25Cc97E857CeUpdateManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type Phaseab6Ea518E250448BB4Da845Fe717Ff12UpdateManyResponseListModelWithValidators =
	Phase9Df78A2199984E3BA76D25Cc97E857CeUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryPhasePut = {
	event_id: string
	name: string
	number_of_runs: number
}
export type Phase20Dee5D0D9Fd4679Bb57Dc067052547FUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type Phasef09535B8Bc9B46769A5029Ddb1B83F6BUpsertManyResponseListModel =
	Phase20Dee5D0D9Fd4679Bb57Dc067052547FUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phaseccffd912Baac4E6D9Ae3C2603E22222BCreateManyInsertItemRequestModel =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type Phase6C918365204D4D5D9E53F5B29C2366C6DeleteManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type Phase2415B5868C2D4E058E5535A647Fe3A06DeleteManyResponseListModel =
	Phase6C918365204D4D5D9E53F5B29C2366C6DeleteManyResponseModelWithValidators[]
export type Phasea619Ca6003Bb42De83D64E51F9D411A7PatchManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type Phasec6959A111B8F41689E2774Ef2C4Ec0A1PatchManyResponseListModelWithValidators =
	Phasea619Ca6003Bb42De83D64E51F9D411A7PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryPhasePatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
}
export type Phase2E62B458C01D4EdcB7FcFcd940C42B10FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent08EbbadbFb5840B189Ca8E05C013B073GetManyResponseForeignModel
		heat_foreign?: ForeignHeat2Dea287CCee844A4B3Ce99Bd177F6DfaGetManyResponseForeignModel
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type Phasee7778C9F19E64Db6A1E81Ef2Cf6A3Ed5FindOneResponseListModel =
	Phase2E62B458C01D4EdcB7FcFcd940C42B10FindOneResponseModelWithValidators
export type TableName78B092Ad3E2B4Bc6Aa6CF89E384992D9 = "event" | "heat"
export type Phase67B0791063Ae4Be999A4E003A28Fcb7DUpdateOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type BodyEntireUpdateByPrimaryKeyPhaseIdPut = {
	event_id: string
	name: string
	number_of_runs: number
}
export type Phasea707Da82F6Bf46Ee97737E36F0034F3BDeleteOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type Phase66724Abb3C1442D3919D89Bd500A66FbPatchOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs: number
	}
export type BodyPartialUpdateOneByPrimaryKeyPhaseIdPatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
}
export type ForeignPhase0E83762076C54Bab99AfC45F4F1C5D01FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase734A55Be17C14558B0F67B9F948D1344GetManyResponseForeignModel =
	ForeignPhase0E83762076C54Bab99AfC45F4F1C5D01FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat103BabcfF476473098818C2B7303CeefFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		scoresheet?: string
	}
export type ForeignAthleteheat90323B3C1167458A88CcF266336E0C8BGetManyResponseForeignModel =
	ForeignAthleteheat103BabcfF476473098818C2B7303CeefFindManyResponseItemModelWithValidators[]
export type PhaseIdHeatId0E1Da1D94Ffa47BfB5B56846240F5783FindOneResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
		phase_foreign?: ForeignPhase734A55Be17C14558B0F67B9F948D1344GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat90323B3C1167458A88CcF266336E0C8BGetManyResponseForeignModel
	}
export type PhaseIdHeatId2862Af075F92408792316127Fc75Bc04FindOneResponseListModel =
	PhaseIdHeatId0E1Da1D94Ffa47BfB5B56846240F5783FindOneResponseModelWithValidators
export type TableName7982E1C7E3Ae491981540B8B18E984D0 =
	| "phase"
	| "run"
	| "athleteheat"
export type ForeignPhase50Ee642CDeb64A22Bd8CA40B332F8D44FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhase53Aebd400C424258Ada0272Cd172A7C7GetManyResponseForeignModel =
	ForeignPhase50Ee642CDeb64A22Bd8CA40B332F8D44FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatd2A99D7E75234075Bb567F90556Afbd9FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		scoresheet?: string
	}
export type ForeignAthleteheat9Abe2E3CF1Bf45C897124512F4780559GetManyResponseForeignModel =
	ForeignAthleteheatd2A99D7E75234075Bb567F90556Afbd9FindManyResponseItemModelWithValidators[]
export type PhaseIdHeatIdb44464C707094310A77B734E7Fe428B1FindOneResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
		phase_foreign?: ForeignPhase53Aebd400C424258Ada0272Cd172A7C7GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat9Abe2E3CF1Bf45C897124512F4780559GetManyResponseForeignModel
	}
export type PhaseIdHeatIdbb2B035CCf9F4150888C4E5737F0E178FindManyResponseListModel =

		| PhaseIdHeatIdb44464C707094310A77B734E7Fe428B1FindOneResponseModelWithValidators[]
		| undefined
export type TableNamed0D7Aed6446A42A2Ad55C2Bc29952Dd7 =
	| "phase"
	| "run"
	| "athleteheat"
export type ForeignPhasea66E2542099F46A0Bc9AD38Cdf75A375FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
	}
export type ForeignPhasea4B0Bad54Bc947F3A34A66Be45095Ca6GetManyResponseForeignModel =
	ForeignPhasea66E2542099F46A0Bc9AD38Cdf75A375FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat355079C9D19E42A08929B747294C62D3FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		scoresheet?: string
	}
export type ForeignAthleteheat79Bb84Ac897446Ee854635514D579233GetManyResponseForeignModel =
	ForeignAthleteheat355079C9D19E42A08929B747294C62D3FindManyResponseItemModelWithValidators[]
export type Heat8Fc4B05B46804Ff7A41798786Ebd0925FindManyResponseItemModelWithValidators =
	{
		phase_foreign?: ForeignPhasea4B0Bad54Bc947F3A34A66Be45095Ca6GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat79Bb84Ac897446Ee854635514D579233GetManyResponseForeignModel
		id?: string
		phase_id?: string
		name?: string
	}
export type Heat246B88813656453A8159630A965E0FbdFindManyResponseListModel =
	| Heat8Fc4B05B46804Ff7A41798786Ebd0925FindManyResponseItemModelWithValidators[]
	| undefined
export type TableNamea1Cce7Ce52Bf4345845518Ea9030C502 =
	| "phase"
	| "run"
	| "athleteheat"
export type Heat77E9Ed7071E44F10Bccb33Fc0Ecf98C3UpdateManyResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
	}
export type Heat08E70812F61E483B84D6E996A68481BfUpdateManyResponseListModelWithValidators =
	Heat77E9Ed7071E44F10Bccb33Fc0Ecf98C3UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryHeatPut = {
	phase_id: string
	name: string
}
export type Heat291F8E218Fbe4Ef09FdeBd3022017Be0UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		phase_id: string
		name: string
	}
export type Heatb4294501209647F097651A0Df8Edbe2CUpsertManyResponseListModel =
	Heat291F8E218Fbe4Ef09FdeBd3022017Be0UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat7C039C61E98B472ABfb6A8F6A8D780FfCreateManyInsertItemRequestModel =
	{
		id: string
		phase_id: string
		name: string
	}
export type Heata61E04A83115451A8Cfe15727C99Cd40DeleteManyResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
	}
export type Heatc5A1B632B06B41868436596A08F7364EDeleteManyResponseListModel =
	Heata61E04A83115451A8Cfe15727C99Cd40DeleteManyResponseModelWithValidators[]
export type Heatc4B89Fc3A5D84E6B9C56De13346E457FPatchManyResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
	}
export type Heat5Ee8Ab94973045Dc9Ffe0Fdad1799E3EPatchManyResponseListModelWithValidators =
	Heatc4B89Fc3A5D84E6B9C56De13346E457FPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryHeatPatch = {
	phase_id?: string
	name?: string
}
export type Heataf388E910Ec844C6807761Efd28F97DdFindOneResponseModelWithValidators =
	{
		phase_foreign?: ForeignPhasea4B0Bad54Bc947F3A34A66Be45095Ca6GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat79Bb84Ac897446Ee854635514D579233GetManyResponseForeignModel
		id: string
		phase_id: string
		name: string
	}
export type Heatc3E4F80CFd484Ad3B724Fbcbc1A4C234FindOneResponseListModel =
	Heataf388E910Ec844C6807761Efd28F97DdFindOneResponseModelWithValidators
export type TableName3D83D392F6Ac4B73Ad20503730278F27 =
	| "phase"
	| "run"
	| "athleteheat"
export type Heat61Ce1Fc20B6E41B2B313Ccf6Df77Cd3DUpdateOneResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyHeatIdPut = {
	phase_id: string
	name: string
}
export type Heat701C5CbbDc934F95Aa0FF44259203Ed2DeleteOneResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
	}
export type Heat37E98C1998E94B2A83B159Ec6D93E1D2PatchOneResponseModelWithValidators =
	{
		id: string
		phase_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyHeatIdPatch = {
	phase_id?: string
	name?: string
}
export type ForeignHeatc293263C2Dd1448898D4A4200D59945FFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat59B90E9F1E8342A9A01D479F997D3436GetManyResponseForeignModel =
	ForeignHeatc293263C2Dd1448898D4A4200D59945FFindManyResponseItemModelWithValidators[]
export type HeatIdRunId62E5497F11494A0FB63E4259404E3756FindOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
		heat_foreign?: ForeignHeat59B90E9F1E8342A9A01D479F997D3436GetManyResponseForeignModel
	}
export type HeatIdRunId61E1B136074E45Ce95E67014072Ef09CFindOneResponseListModel =
	HeatIdRunId62E5497F11494A0FB63E4259404E3756FindOneResponseModelWithValidators
export type TableNamed9De321078A6487CB12A00E92D7080F7 = "heat"
export type ForeignHeatfa06Cd5E379749C092D5Ab9039Adb04EFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat3Ff72E90Bc7548859C11E14600936Bc0GetManyResponseForeignModel =
	ForeignHeatfa06Cd5E379749C092D5Ab9039Adb04EFindManyResponseItemModelWithValidators[]
export type HeatIdRunIdd97F95E74E6349A4Bd7598Da416F0B70FindOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
		heat_foreign?: ForeignHeat3Ff72E90Bc7548859C11E14600936Bc0GetManyResponseForeignModel
	}
export type HeatIdRunIdaa849B1415F342Bb9A3619A08716A3D1FindManyResponseListModel =

		| HeatIdRunIdd97F95E74E6349A4Bd7598Da416F0B70FindOneResponseModelWithValidators[]
		| undefined
export type TableNamee1262A281F634Db3Adde828026495Ca7 = "heat"
export type ForeignHeat49Cd7Da86A9F4526A714E419F9A4F54BFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat720Ab4A7Dc614De38F1F25Ffe6Fe429BGetManyResponseForeignModel =
	ForeignHeat49Cd7Da86A9F4526A714E419F9A4F54BFindManyResponseItemModelWithValidators[]
export type Runbc8A7C8DA99149B587AaEfbc8E05949DFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat720Ab4A7Dc614De38F1F25Ffe6Fe429BGetManyResponseForeignModel
		id?: string
		heat_id?: string
		name?: string
	}
export type Run36B0D794Cef74C6884EcE06Eea72644BFindManyResponseListModel =
	| Runbc8A7C8DA99149B587AaEfbc8E05949DFindManyResponseItemModelWithValidators[]
	| undefined
export type TableNameedfd1180Fef24607Abdb3B898362B153 = "heat"
export type Runde5Fab0446344F5687E65957D9242Eb3UpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
	}
export type Run69Ce039803A8450EB1D4A9636Fb35219UpdateManyResponseListModelWithValidators =
	Runde5Fab0446344F5687E65957D9242Eb3UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryRunPut = {
	heat_id: string
	name: string
}
export type Runb7Ae5Eca29C34A11A131F5026D3E4268UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id: string
		name: string
	}
export type Run144E73E5Fdb04533900D77Da7Df1E0AbUpsertManyResponseListModel =
	Runb7Ae5Eca29C34A11A131F5026D3E4268UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Run91F96B6228Bd4B2D8A02C070878C080ACreateManyInsertItemRequestModel =
	{
		id: string
		heat_id: string
		name: string
	}
export type Rune8692755E12247478416D4392Fadf748DeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
	}
export type Runf358B79C3A8D4F72Bd104361D3E8B381DeleteManyResponseListModel =
	Rune8692755E12247478416D4392Fadf748DeleteManyResponseModelWithValidators[]
export type Run6Da4Ef30470B4D80Ba54Df6Aeb21B55BPatchManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
	}
export type Runef9C7E6631B54A028C5867827Ecaf0FaPatchManyResponseListModelWithValidators =
	Run6Da4Ef30470B4D80Ba54Df6Aeb21B55BPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryRunPatch = {
	heat_id?: string
	name?: string
}
export type Runb05B07C59A1C4E39980C3C3F2B6D0BcaFindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat720Ab4A7Dc614De38F1F25Ffe6Fe429BGetManyResponseForeignModel
		id: string
		heat_id: string
		name: string
	}
export type Run62E312A4D7324B23848DBf28Dbb7A2B8FindOneResponseListModel =
	Runb05B07C59A1C4E39980C3C3F2B6D0BcaFindOneResponseModelWithValidators
export type TableName105F8E28425C4C9CA8066C0D91930C4A = "heat"
export type Run1031B239Ffe44739Aa59F913E7185B24UpdateOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyRunIdPut = {
	heat_id: string
	name: string
}
export type Rund33322F606004D06A852E9042449C734DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
	}
export type Run0B58Dc7BC54247F093Bb81E1A5B37B93PatchOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyRunIdPatch = {
	heat_id?: string
	name?: string
}
export type ForeignAthleteheat5A160D3104Ce4654Ae42865F97093147FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		scoresheet?: string
	}
export type ForeignAthleteheat83Bfe0F09F064C83Ac8EEd5385483F1BGetManyResponseForeignModel =
	ForeignAthleteheat5A160D3104Ce4654Ae42865F97093147FindManyResponseItemModelWithValidators[]
export type Athletedb18C2344A0647E981079905F3B5B609FindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat83Bfe0F09F064C83Ac8EEd5385483F1BGetManyResponseForeignModel
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type Athletede51416C856D412EBa2F656D91436024FindManyResponseListModel =
	| Athletedb18C2344A0647E981079905F3B5B609FindManyResponseItemModelWithValidators[]
	| undefined
export type TableName91B9D98DB8314959B9923A70046D1Acb = "athleteheat"
export type Athlete311F52A8Eac8468682268Cd02De18CabUpdateManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athleteda1C2608991F42D7B87E5Dc59Ada5A46UpdateManyResponseListModelWithValidators =
	Athlete311F52A8Eac8468682268Cd02De18CabUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthletePut = {
	first_name: string
	last_name: string
	bib: string
}
export type Athletecff8E232353D477DB1Bb187A4A0Bdbf5UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete543B9B7BCf0D458DBc34Dfddfddb306AUpsertManyResponseListModel =
	Athletecff8E232353D477DB1Bb187A4A0Bdbf5UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athlete3368C360A573409FA1F666Cb8E3993A6CreateManyInsertItemRequestModel =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete53A37C708D4A465886C1674Ba1Fbe902DeleteManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athletea8E29Ff7Dc214001A89178305098Abc9DeleteManyResponseListModel =
	Athlete53A37C708D4A465886C1674Ba1Fbe902DeleteManyResponseModelWithValidators[]
export type Athlete3Efe8BcdF7D14Df58Ad073D9C43D3572PatchManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete0C47623D83E24DfeB2F9600E74515F23PatchManyResponseListModelWithValidators =
	Athlete3Efe8BcdF7D14Df58Ad073D9C43D3572PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthletePatch = {
	first_name?: string
	last_name?: string
	bib?: string
}
export type Athlete0E316F42A5E24274Bad2364164D51Cb7FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat83Bfe0F09F064C83Ac8EEd5385483F1BGetManyResponseForeignModel
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete370Dc2467Ae348C79499B2A635A2Dd81FindOneResponseListModel =
	Athlete0E316F42A5E24274Bad2364164D51Cb7FindOneResponseModelWithValidators
export type TableName9C42497D59614Da68B774B870Af1744F = "athleteheat"
export type Athletef9C9C3C6F7D6479798C6C08A5E0809C8UpdateOneResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type BodyEntireUpdateByPrimaryKeyAthleteIdPut = {
	first_name: string
	last_name: string
	bib: string
}
export type Athlete390387Fc93844D7B840D1Cf8Fafe5A02DeleteOneResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athletedc2842B917F74Ce58Dd357A6A3E885FfPatchOneResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type BodyPartialUpdateOneByPrimaryKeyAthleteIdPatch = {
	first_name?: string
	last_name?: string
	bib?: string
}
export type ScoreSheet95E38052D37A4784B1Ee6817B9B26774FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheetd509F56453D945F6B895F6Cdc71275E6FindManyResponseListModel =

		| ScoreSheet95E38052D37A4784B1Ee6817B9B26774FindManyResponseItemModelWithValidators[]
		| undefined
export type ScoreSheet8Aadc60D2B29443A9D4F7A737C26Bce9UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet753F837CC2074910Acf0Aab09734Ed5EUpdateManyResponseListModelWithValidators =
	ScoreSheet8Aadc60D2B29443A9D4F7A737C26Bce9UpdateManyResponseModelWithValidators[]
export type ScoreSheetc01Cfde3Ade5435885F89Bca5118Cd63UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet85235A83053F44F483EdC3179545118BUpsertManyResponseListModel =
	ScoreSheetc01Cfde3Ade5435885F89Bca5118Cd63UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheet3580Fa9DC6914F5892B2Ec6235F5Dfe9CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type ScoreSheetf5Ecaaf914334Ad8Bb98Bc82E32B3011DeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet8Eb38374Ccec450387C29Fc70945453EDeleteManyResponseListModel =
	ScoreSheetf5Ecaaf914334Ad8Bb98Bc82E32B3011DeleteManyResponseModelWithValidators[]
export type ScoreSheet41C75B1472954A49B73CE70Aa688Cb6DPatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet1F5F8Bd80Aa5415DAa0136A142161A55PatchManyResponseListModelWithValidators =
	ScoreSheet41C75B1472954A49B73CE70Aa688Cb6DPatchManyResponseModelWithValidators[]
export type ScoreSheet298E3030126146379F0C47B2Cc83Eeb8FindOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetbbf0Afc7B8044118B50D4E884Dee4C2DFindOneResponseListModel =
	ScoreSheet298E3030126146379F0C47B2Cc83Eeb8FindOneResponseModelWithValidators
export type ScoreSheet1F4Cfb1F61F14B06Afb46Dae490F49C4UpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet119274B399414C20A4F4B1Dc39C8100EDeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet5A543947751645439B9E710Dd0C31Be5PatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type AvailableMoves3221A52F176E4949Beb59F742C4631C3FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMovesd5E8Ca03F322424CBa4F972Ddd039F64FindManyResponseListModel =

		| AvailableMoves3221A52F176E4949Beb59F742C4631C3FindManyResponseItemModelWithValidators[]
		| undefined
export type AvailableMoves30E162EcE3B14Fe3Beaa531F4Ac6CfbcUpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves42B540F83Ca945E4Ad02Cc73D0C1Dd20UpdateManyResponseListModelWithValidators =
	AvailableMoves30E162EcE3B14Fe3Beaa531F4Ac6CfbcUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablemovesPut = {
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: string
}
export type AvailableMoves9C8D93D4Ebce437DBe0DB09199221969UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves0Eb43E277645454DAebc5F1A6B293889UpsertManyResponseListModel =
	AvailableMoves9C8D93D4Ebce437DBe0DB09199221969UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableMoves70701C2C9F1248A49B39Bf696Ba71111CreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovescbe0F88D943245479C0F106540970D06DeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesbb3B0E11A32E4F7F9A9B23C0B8915A9CDeleteManyResponseListModel =
	AvailableMovescbe0F88D943245479C0F106540970D06DeleteManyResponseModelWithValidators[]
export type AvailableMovesbf923B9830Cd4A9188266Fa2C5858537PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves161465F0731F4F61999E7421C80F4Ac4PatchManyResponseListModelWithValidators =
	AvailableMovesbf923B9830Cd4A9188266Fa2C5858537PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablemovesPatch = {
	sheet_id?: string
	name?: string
	fl_score?: number
	rb_score?: number
	direction?: string
}
export type AvailableMoves59Cb6Ac911474936B9A369948Add433EFindOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves193Cba5CF25F4B0C82E3C3Ac85Ba8B1DFindOneResponseListModel =
	AvailableMoves59Cb6Ac911474936B9A369948Add433EFindOneResponseModelWithValidators
export type AvailableMoves02880C2159A74E9ABfe9371F36252245UpdateOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type BodyEntireUpdateByPrimaryKeyAvailablemovesIdPut = {
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: string
}
export type AvailableMoves9114C0Cf852E486FAd8AB79A9C752D5EDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves9164A4282Ac845B5B6FcC444212Fe4AaPatchOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type BodyPartialUpdateOneByPrimaryKeyAvailablemovesIdPatch = {
	sheet_id?: string
	name?: string
	fl_score?: number
	rb_score?: number
	direction?: string
}
export type ForeignScoreSheet35712832Ed1E47D695B733709E9B5023FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheetdedc0E9077124554994B2624428B975EGetManyResponseForeignModel =
	ForeignScoreSheet35712832Ed1E47D695B733709E9B5023FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesc1Cf8F9ED44A4317904B1D27F85E0F3AFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves0D0Ce4C6250F4F4492Ad04Bbae33F164GetManyResponseForeignModel =
	ForeignAvailableMovesc1Cf8F9ED44A4317904B1D27F85E0F3AFindManyResponseItemModelWithValidators[]
export type AvailableBonuses917Dcdc562Bd426581Cd53Bf2597E9C7FindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheetdedc0E9077124554994B2624428B975EGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves0D0Ce4C6250F4F4492Ad04Bbae33F164GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses32B8C0E570224F409C6AEd5142835948FindManyResponseListModel =

		| AvailableBonuses917Dcdc562Bd426581Cd53Bf2597E9C7FindManyResponseItemModelWithValidators[]
		| undefined
export type TableNameadae606385B74D3387C11E5A91083180 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses34Bf154982Eb4472A12B7A732D251E17UpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusese48A48F4Bf6A482A94D58A8C55B99627UpdateManyResponseListModelWithValidators =
	AvailableBonuses34Bf154982Eb4472A12B7A732D251E17UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablebonusesPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonuses345Bc8A4E9E745459Cf46Bfab9C3B4B1UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses5C91A16CC8D641078E7F8Bc400Ff4052UpsertManyResponseListModel =
	AvailableBonuses345Bc8A4E9E745459Cf46Bfab9C3B4B1UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableBonuses642797000A4242D5B19BAe542Eceb463CreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses5D052Eaa4Aa144Ff94EaC9B7D295Eba2DeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses5E0Aa743C4704AbcB4538A069A60986CDeleteManyResponseListModel =
	AvailableBonuses5D052Eaa4Aa144Ff94EaC9B7D295Eba2DeleteManyResponseModelWithValidators[]
export type AvailableBonuses9E4E45Cc1Bc44A4E8683Fa61E85232A9PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses63D5Cfdd3Bbf4A86Acde92De2Ad0E225PatchManyResponseListModelWithValidators =
	AvailableBonuses9E4E45Cc1Bc44A4E8683Fa61E85232A9PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablebonusesPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type AvailableBonusesf0A205De283F450CAd9E68B6Faa74081FindOneResponseModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheetdedc0E9077124554994B2624428B975EGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves0D0Ce4C6250F4F4492Ad04Bbae33F164GetManyResponseForeignModel
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses1A78B88C0E794Aa78F556Cfed1Dde591FindOneResponseListModel =
	AvailableBonusesf0A205De283F450CAd9E68B6Faa74081FindOneResponseModelWithValidators
export type TableName2E322C614A6F47Ec8F268281Ba579760 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonusesd4E2Ad8DA808441891D6E7B7B50Ce3DaUpdateOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type BodyEntireUpdateByPrimaryKeyAvailablebonusesIdPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonusesfef969B611A74Ee0A0947A0143E430E2DeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses6481E188492A4384B4E3C2246A630C6EPatchOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type BodyPartialUpdateOneByPrimaryKeyAvailablebonusesIdPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type ForeignRunc0B014A7Ec5B45DcAda48B9A27D77De4FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		name?: string
	}
export type ForeignRun93856FdeEce9451EB6Da55F3929A28B8GetManyResponseForeignModel =
	ForeignRunc0B014A7Ec5B45DcAda48B9A27D77De4FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesc32D2D8127Ab4Ceb8F1A721E4F305554FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMovesd33E25D4C5B34E63A4B1170Ee3D03F5AGetManyResponseForeignModel =
	ForeignAvailableMovesc32D2D8127Ab4Ceb8F1A721E4F305554FindManyResponseItemModelWithValidators[]
export type ScoredMoves7Fe50A6E08904D45B2903E3E8Ef16067FindManyResponseItemModelWithValidators =
	{
		run_foreign?: ForeignRun93856FdeEce9451EB6Da55F3929A28B8GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovesd33E25D4C5B34E63A4B1170Ee3D03F5AGetManyResponseForeignModel
		id?: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ScoredMoves5288D307E6Ba41358626Ce4F6Dcc9Ee3FindManyResponseListModel =

		| ScoredMoves7Fe50A6E08904D45B2903E3E8Ef16067FindManyResponseItemModelWithValidators[]
		| undefined
export type TableName170D687D54464162Aac33529Be707Bf0 = "run" | "availableMoves"
export type ScoredMovesa218393C6F7F4D0EAb7F0Ad68A6Bc0F6UpdateManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type ScoredMoves16E1904E2F7D40578E3DDa6E382F616CUpdateManyResponseListModelWithValidators =
	ScoredMovesa218393C6F7F4D0EAb7F0Ad68A6Bc0F6UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredmovesPut = {
	move_id: string
	run_id: string
	judge_id: string
}
export type ScoredMovesefef9311265840D89528A79Ac9Eef88AUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type ScoredMovesee3Fe30E8455436DB0Ce0B7E0D706589UpsertManyResponseListModel =
	ScoredMovesefef9311265840D89528A79Ac9Eef88AUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredMovesffe21B0323514F6DB1FeCc3A286De063CreateManyInsertItemRequestModel =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type ScoredMoves433118D81A8848768Cba471852E70Fe1DeleteManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type ScoredMoves2F151B92316B4A66Aba0Cfc27383C7E3DeleteManyResponseListModel =
	ScoredMoves433118D81A8848768Cba471852E70Fe1DeleteManyResponseModelWithValidators[]
export type ScoredMoves5E668977067540DbB04D576Ccf70473EPatchManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type ScoredMovesb6Cdb53B86Fe4B249606Dc7689B6E27EPatchManyResponseListModelWithValidators =
	ScoredMoves5E668977067540DbB04D576Ccf70473EPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredmovesPatch = {
	move_id?: string
	run_id?: string
	judge_id?: string
}
export type ScoredMoves58Be19C1B39D41329028Dccf3Dbd9EfdFindOneResponseModelWithValidators =
	{
		run_foreign?: ForeignRun93856FdeEce9451EB6Da55F3929A28B8GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovesd33E25D4C5B34E63A4B1170Ee3D03F5AGetManyResponseForeignModel
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type ScoredMovesf6F87Cd8602B46788D87D2315Dc2075BFindOneResponseListModel =
	ScoredMoves58Be19C1B39D41329028Dccf3Dbd9EfdFindOneResponseModelWithValidators
export type TableName28725654303E43Da904A71Db74359C8D = "run" | "availableMoves"
export type ScoredMoves47C26954E5004385A497E19Bf342B8F1UpdateOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type BodyEntireUpdateByPrimaryKeyScoredmovesIdPut = {
	move_id: string
	run_id: string
	judge_id: string
}
export type ScoredMoves3794Dad611804F3AA36FDdfc32Aa7D74DeleteOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type ScoredMovesd56Dab4FFb214881938F847D95E39177PatchOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		run_id?: string
		judge_id: string
	}
export type BodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch = {
	move_id?: string
	run_id?: string
	judge_id?: string
}
export type ForeignAvailableBonuses1113F1Ca9E9541A2B7276E8E0Bcada9CFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableBonusese5D6798884294A69869EC880B71717A8GetManyResponseForeignModel =
	ForeignAvailableBonuses1113F1Ca9E9541A2B7276E8E0Bcada9CFindManyResponseItemModelWithValidators[]
export type ForeignScoredMoves7Bd0E303758B4629898A89Dfb680043BFindManyResponseItemModelWithValidators =
	{
		id?: string
		move_id?: string
		run_id?: string
		judge_id?: string
	}
export type ForeignScoredMovesfa88B8Fc8Dde4A46919E9074461D5911GetManyResponseForeignModel =
	ForeignScoredMoves7Bd0E303758B4629898A89Dfb680043BFindManyResponseItemModelWithValidators[]
export type ScoredBonuses28A14E09523542659Bd644Def087833AFindManyResponseItemModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusese5D6798884294A69869EC880B71717A8GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMovesfa88B8Fc8Dde4A46919E9074461D5911GetManyResponseForeignModel
		id?: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonusesa288460336Cf4C8EB8B42F466B49Cf93FindManyResponseListModel =

		| ScoredBonuses28A14E09523542659Bd644Def087833AFindManyResponseItemModelWithValidators[]
		| undefined
export type TableName8059191A009241A7B1E627654968234E =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses07470544A283452FB637B8A61Be02C70UpdateManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesbe2Ca729E40A4797928D85E7Ff9F02CbUpdateManyResponseListModelWithValidators =
	ScoredBonuses07470544A283452FB637B8A61Be02C70UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredbonusesPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonusesf6Ecdc284358418B9E9F236A6F870238UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesd0426F7412E14479A800C675Fde6A2E5UpsertManyResponseListModel =
	ScoredBonusesf6Ecdc284358418B9E9F236A6F870238UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredBonuses4Ac943296Dc04E9C83763243D29A5453CreateManyInsertItemRequestModel =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesa8208Dbb77F149E5942CAd6098F7901ADeleteManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses2F12Aa3F0C09477192A6D9E8934B9A6ADeleteManyResponseListModel =
	ScoredBonusesa8208Dbb77F149E5942CAd6098F7901ADeleteManyResponseModelWithValidators[]
export type ScoredBonusesa36E4Fd6F9024B3C8E592E065Db6B5CaPatchManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses7B7A6C0274C744168A545Bb79Ff162B5PatchManyResponseListModelWithValidators =
	ScoredBonusesa36E4Fd6F9024B3C8E592E065Db6B5CaPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredbonusesPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ScoredBonusesb98De51DC62D4Fc0A6Ae400Efe0D8Dc3FindOneResponseModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusese5D6798884294A69869EC880B71717A8GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMovesfa88B8Fc8Dde4A46919E9074461D5911GetManyResponseForeignModel
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses4D01996E54E44168968D32C3790E2CfaFindOneResponseListModel =
	ScoredBonusesb98De51DC62D4Fc0A6Ae400Efe0D8Dc3FindOneResponseModelWithValidators
export type TableName2Ef0515615534C0F9645Ba6987Dbcaba =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses13366896F8384Ac1B182F7Ae89B0E085UpdateOneResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type BodyEntireUpdateByPrimaryKeyScoredbonusesIdPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonuses5790704FE4324F17836D267A1C57032CDeleteOneResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesf1856804347145D59150Dedc99B19Cc1PatchOneResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type BodyPartialUpdateOneByPrimaryKeyScoredbonusesIdPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ForeignHeat8044E517D4B444E586C9Aa5A6B1585DfFindManyResponseItemModelWithValidators =
	{
		id?: string
		phase_id?: string
		name?: string
	}
export type ForeignHeat5E5Ae0Bb10024942833D82D4F7Acdb34GetManyResponseForeignModel =
	ForeignHeat8044E517D4B444E586C9Aa5A6B1585DfFindManyResponseItemModelWithValidators[]
export type ForeignAthleteb9B1C270B42941A3B84B515B06Efcb35FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthletee7569087A9Dc48D2Bc8097F2Cd4Ba9C5GetManyResponseForeignModel =
	ForeignAthleteb9B1C270B42941A3B84B515B06Efcb35FindManyResponseItemModelWithValidators[]
export type Athleteheatd7281542147C41129Dbb93Df4Ff3C09EFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat5E5Ae0Bb10024942833D82D4F7Acdb34GetManyResponseForeignModel
		athlete_foreign?: ForeignAthletee7569087A9Dc48D2Bc8097F2Cd4Ba9C5GetManyResponseForeignModel
		id?: string
		heat_id?: string
		athlete_id?: string
		scoresheet?: string
	}
export type Athleteheat27C2B5746Cbb469EAefc34A7Ca217896FindManyResponseListModel =

		| Athleteheatd7281542147C41129Dbb93Df4Ff3C09EFindManyResponseItemModelWithValidators[]
		| undefined
export type TableName16747B54E849425094143Ef997905Ceb = "heat" | "athlete"
export type Athleteheat0249E41BCa974F51Bbeb551Bc216711AUpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type Athleteheat9Dfbf93D5Db04367A43AB0539356F942UpdateManyResponseListModelWithValidators =
	Athleteheat0249E41BCa974F51Bbeb551Bc216711AUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthleteheatPut = {
	heat_id: string
	athlete_id: string
	scoresheet: string
}
export type Athleteheat85Aafac9F9Bb4AecAd199D77De1A8C4DUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type Athleteheataef186A38Ec441De9Fb6362Ed54A45C1UpsertManyResponseListModel =
	Athleteheat85Aafac9F9Bb4AecAd199D77De1A8C4DUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheat791D1173Be714518Aa7A45Fcda0F4F50CreateManyInsertItemRequestModel =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type Athleteheatc738D785Ebcc4C09Ae3350Adc40667C0DeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type Athleteheat38B306A5E0674B0DAdb9132D316Cd994DeleteManyResponseListModel =
	Athleteheatc738D785Ebcc4C09Ae3350Adc40667C0DeleteManyResponseModelWithValidators[]
export type Athleteheat3Ead0Aef42924966B9Ee6896D487Bd0APatchManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type Athleteheatb30E1Df0C6424EfdBa571005A78Fd89BPatchManyResponseListModelWithValidators =
	Athleteheat3Ead0Aef42924966B9Ee6896D487Bd0APatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthleteheatPatch = {
	heat_id?: string
	athlete_id?: string
	scoresheet?: string
}
export type Athleteheat7413C8251F774648949E53Da683D271CFindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat5E5Ae0Bb10024942833D82D4F7Acdb34GetManyResponseForeignModel
		athlete_foreign?: ForeignAthletee7569087A9Dc48D2Bc8097F2Cd4Ba9C5GetManyResponseForeignModel
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type Athleteheatde91888AE5064C2D9C69931638Da5341FindOneResponseListModel =
	Athleteheat7413C8251F774648949E53Da683D271CFindOneResponseModelWithValidators
export type TableName9F28Ab2B028241Cb9E879B1924620331 = "heat" | "athlete"
export type Athleteheat573E16A0Ca164D02Bcff154F3Bd54E20UpdateOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type BodyEntireUpdateByPrimaryKeyAthleteheatIdPut = {
	heat_id: string
	athlete_id: string
	scoresheet: string
}
export type Athleteheat6Fdb7E5C98234663A19B304Bc5847772DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type Athleteheat0D43Dfe78E2A4B6E85D912813F1C849CPatchOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		scoresheet: string
	}
export type BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch = {
	heat_id?: string
	athlete_id?: string
	scoresheet?: string
}
export type PydanticAvailableMoves = {
	id: string
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: "LR" | "FB" | "LRFB"
}
export type PydanticAvailableBonuses = {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AddUpdateScoresheetRequest = {
	moves?: PydanticAvailableMoves[]
	bonuses?: PydanticAvailableBonuses[]
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
	useRootGetQuery,
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation
} = injectedRtkApi
