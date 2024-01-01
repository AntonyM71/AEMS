import { emptySplitApi as api } from "./emptyApi"
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getHeatInfoGetHeatInfoHeatIdGet: build.query<
			GetHeatInfoGetHeatInfoHeatIdGetApiResponse,
			GetHeatInfoGetHeatInfoHeatIdGetApiArg
		>({
			query: (queryArg) => ({ url: `/getHeatInfo/${queryArg.heatId}` })
		}),
		updateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPost:
			build.mutation<
				UpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostApiResponse,
				UpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostApiArg
			>({
				query: (queryArg) => ({
					url: `/addUpdateAthleteScore/${queryArg.heatId}/${queryArg.athleteId}/${queryArg.runNumber}/${queryArg.judgeId}`,
					method: "POST",
					body: queryArg.addUpdateScoredMovesRequest,
					params: { phase_id: queryArg.phaseId }
				})
			}),
		getAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGet:
			build.query<
				GetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetApiResponse,
				GetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetApiArg
			>({
				query: (queryArg) => ({
					url: `/getAthleteMovesAndBonuses/${queryArg.heatId}/${queryArg.athleteId}/${queryArg.runNumber}/${queryArg.judgeId}`
				})
			}),
		getHeatScoresGetHeatScoresHeatIdGet: build.query<
			GetHeatScoresGetHeatScoresHeatIdGetApiResponse,
			GetHeatScoresGetHeatScoresHeatIdGetApiArg
		>({
			query: (queryArg) => ({ url: `/getHeatScores/${queryArg.heatId}` })
		}),
		getPhaseScoresGetPhaseScoresPhaseIdGet: build.query<
			GetPhaseScoresGetPhaseScoresPhaseIdGetApiResponse,
			GetPhaseScoresGetPhaseScoresPhaseIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/getPhaseScores/${queryArg.phaseId}`
			})
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
		}),
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
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList,
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
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList,
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
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
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
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList,
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
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from_____comparison_operator:
						queryArg.numberOfRunsForScoreFromComparisonOperator,
					number_of_runs_for_score____to_____comparison_operator:
						queryArg.numberOfRunsForScoreToComparisonOperator,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list_____comparison_operator:
						queryArg.numberOfRunsForScoreListComparisonOperator,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from_____comparison_operator:
						queryArg.numberOfJudgesFromComparisonOperator,
					number_of_judges____to_____comparison_operator:
						queryArg.numberOfJudgesToComparisonOperator,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list_____comparison_operator:
						queryArg.numberOfJudgesListComparisonOperator,
					number_of_judges____list: queryArg.numberOfJudgesList,
					scoresheet____list_____comparison_operator:
						queryArg.scoresheetListComparisonOperator,
					scoresheet____list: queryArg.scoresheetList
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
		getOneByPrimaryKeyHeatIdGet: build.query<
			GetOneByPrimaryKeyHeatIdGetApiResponse,
			GetOneByPrimaryKeyHeatIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
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
		entireUpdateByPrimaryKeyHeatIdPut: build.mutation<
			EntireUpdateByPrimaryKeyHeatIdPutApiResponse,
			EntireUpdateByPrimaryKeyHeatIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
				method: "PUT",
				body: queryArg.bodyEntireUpdateByPrimaryKeyHeatIdPut,
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
		deleteOneByPrimaryKeyHeatIdDelete: build.mutation<
			DeleteOneByPrimaryKeyHeatIdDeleteApiResponse,
			DeleteOneByPrimaryKeyHeatIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
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
		partialUpdateOneByPrimaryKeyHeatIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyHeatIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyHeatIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.bodyPartialUpdateOneByPrimaryKeyHeatIdPatch,
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList,
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList,
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					run_number____from_____comparison_operator:
						queryArg.runNumberFromComparisonOperator,
					run_number____to_____comparison_operator:
						queryArg.runNumberToComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					run_number____list: queryArg.runNumberList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					judge_id____str_____matching_pattern:
						queryArg.judgeIdStrMatchingPattern,
					judge_id____str: queryArg.judgeIdStr,
					judge_id____list_____comparison_operator:
						queryArg.judgeIdListComparisonOperator,
					judge_id____list: queryArg.judgeIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					direction____str_____matching_pattern:
						queryArg.directionStrMatchingPattern,
					direction____str: queryArg.directionStr,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
					direction____list: queryArg.directionList
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList
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
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					phase_id____list: queryArg.phaseIdList
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
export type GetHeatInfoGetHeatInfoHeatIdGetApiResponse =
	/** status 200 Successful Response */ HeatInfoResponse[]
export type GetHeatInfoGetHeatInfoHeatIdGetApiArg = {
	heatId: string
}
export type UpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostApiResponse =
	/** status 200 Successful Response */ any
export type UpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostApiArg =
	{
		heatId: string
		athleteId: string
		runNumber: string
		judgeId: string
		phaseId: string
		addUpdateScoredMovesRequest: AddUpdateScoredMovesRequest
	}
export type GetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetApiResponse =
	/** status 200 Successful Response */ ScoredMovesAndBonusesResponse
export type GetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetApiArg =
	{
		heatId: string
		athleteId: string
		runNumber: string
		judgeId: string
	}
export type GetHeatScoresGetHeatScoresHeatIdGetApiResponse =
	/** status 200 Successful Response */ HeatScoresResponse
export type GetHeatScoresGetHeatScoresHeatIdGetApiArg = {
	heatId: string
}
export type GetPhaseScoresGetPhaseScoresPhaseIdGetApiResponse =
	/** status 200 Successful Response */ PhaseScoresResponse
export type GetPhaseScoresGetPhaseScoresPhaseIdGetApiArg = {
	phaseId: string
}
export type AddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostApiResponse =
	/** status 200 Successful Response */ any
export type AddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostApiArg = {
	scoresheetId: string
	addUpdateScoresheetRequest: AddUpdateScoresheetRequest
}
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competition3C6Ffb25Ff2C44Ba93111343Ca54495DFindManyResponseListModel
export type GetManyCompetitionGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
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
	joinForeignTable?: TableName2Ea8D0Fb301A4Ef1Bafd7B9389B3Daee[]
}
export type EntireUpdateManyByQueryCompetitionPutApiResponse =
	/** status 200 Successful Response */ Competition9Bb102E563664B03931CB967E9D18A0DUpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryCompetitionPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type InsertManyCompetitionPostApiResponse =
	/** status 201 Successful Response */ Competitionb16678Ce2F1245229C6438433A624D61UpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	body: Competition28Ee4A962410475BBf02F3F87C1Bdef5CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryCompetitionDeleteApiResponse =
	/** status 200 Successful Response */ Competition130Aa99B28314C0F9Bec1B8600Df6E21DeleteManyResponseListModel
export type DeleteManyByQueryCompetitionDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryCompetitionPatchApiResponse =
	/** status 200 Successful Response */ Competition9Cd7F571B67542BaAfb22B71414A9381PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryCompetitionPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPrimaryKeyCompetitionIdGetApiResponse =
	/** status 200 Successful Response */ Competitionacf7Fb58305640A7B81CD0Cbb86D06CcFindOneResponseListModel
export type GetOneByPrimaryKeyCompetitionIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName6Ed1221177244785A4B9E177Eb870033[]
}
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse =
	/** status 200 Successful Response */ Competitiondf443643Cf9F4586B5351Afd2D8588D5UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse =
	/** status 200 Successful Response */ Competition58F4A4A385264E488445Dba94B659C48DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competition09C8Ea82Ee1B45638C70B97D3079Cff2PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIde63D5C87Bd9D48499Ebe2Cb483407488FindOneResponseListModel
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg =
	{
		competitionPkId: string
		eventPkId: string
		nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
		nameStr?: string[]
		nameListComparisonOperator?: ItemComparisonOperators
		nameList?: string[]
		joinForeignTable?: TableName6999C5F29D9D4706841D4F25E3E60E2E[]
	}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId938Ee750514A410793EbCd9885587Dd3FindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName03Be6B8D7A1946Dd9C394F0F2300Feb4[]
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event1F12896D56D34B9AAa17D522Bd4Bb181FindManyResponseListModel
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
	joinForeignTable?: TableName8D7Bea682C084B32A6303B1769C074B7[]
}
export type EntireUpdateManyByQueryEventPutApiResponse =
	/** status 200 Successful Response */ Event0Facac4AC84946Bf95F38Bc1A9B2Ed22UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Eventecd2B8598226454A9B704D32B37D12B9UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	body: Event422A1E8831034629A8Ba0C05366A074ECreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryEventDeleteApiResponse =
	/** status 200 Successful Response */ Event381A6626773D46188937C1C9226A9469DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Event14A479C1F6Ca4Fb892E61Ceaa973A648PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Event18Aa89E18F1543A6A8119678Fa7Efd7CFindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName3E10181B52Ea48Eb897F9Fc85C3Ce974[]
}
export type EntireUpdateByPrimaryKeyEventIdPutApiResponse =
	/** status 200 Successful Response */ Evente3A7A14CDb42422BB5C173Fb7Fb01410UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event00B90Eda9B2C40C49Efc0E3Be412722DDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event25B050048C334E94Bff45649F3157B47PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ EventIdPhaseId553Daeb0Ad924582A46518D418881556FindOneResponseListModel
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	joinForeignTable?: TableName2De3717EA8E541C9Aafd01Db9Ea01409[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseIdf05A13560F5F402E99394A92Ff25E12EFindManyResponseListModel
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	joinForeignTable?: TableNamecc9A156B88884376891380Eea44Eb7D8[]
}
export type GetManyPhaseGetApiResponse =
	/** status 200 Successful Response */ Phase5C65E7342D554Cb3B8771Ec57B220D9EFindManyResponseListModel
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'event_id', 'name', 'number_of_runs', 'number_of_runs_for_score', 'number_of_judges', 'scoresheet'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNamed6Dcaeec5Eb8425A8Fae32679F36A3Cb[]
}
export type EntireUpdateManyByQueryPhasePutApiResponse =
	/** status 200 Successful Response */ Phaseb9A36D4D3Cc64619B69A8B258A89A96DUpdateManyResponseListModelWithValidators
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyEntireUpdateManyByQueryPhasePut: BodyEntireUpdateManyByQueryPhasePut
}
export type InsertManyPhasePostApiResponse =
	/** status 201 Successful Response */ Phase4De03909134C49D7A704B4C09938D4C4UpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	body: Phase02Ca13B750E441AaB7Dd4A61Cad4F8B6CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryPhaseDeleteApiResponse =
	/** status 200 Successful Response */ Phasec9D5Da2D257E49738F22F7Bf41B8546CDeleteManyResponseListModel
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
}
export type PartialUpdateManyByQueryPhasePatchApiResponse =
	/** status 200 Successful Response */ Phasefc8A5240581644E9B472Edb5E2E4Ff52PatchManyResponseListModelWithValidators
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyPartialUpdateManyByQueryPhasePatch: BodyPartialUpdateManyByQueryPhasePatch
}
export type GetOneByPrimaryKeyPhaseIdGetApiResponse =
	/** status 200 Successful Response */ Phaseca79A8Dd454A4E388Bae04Bda815D546FindOneResponseListModel
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	joinForeignTable?: TableName11D642E80A4F4F08Ae8414Dd2Cf10E7E[]
}
export type EntireUpdateByPrimaryKeyPhaseIdPutApiResponse =
	/** status 200 Successful Response */ Phase3487C4FfC1Ec48139203437A16799237UpdateOneResponseModelWithValidators
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyEntireUpdateByPrimaryKeyPhaseIdPut: BodyEntireUpdateByPrimaryKeyPhaseIdPut
}
export type DeleteOneByPrimaryKeyPhaseIdDeleteApiResponse =
	/** status 200 Successful Response */ Phasedcda3Dbf5D4A40BfAd17304Fbd6Ec805DeleteOneResponseModelWithValidators
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
}
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse =
	/** status 200 Successful Response */ Phase0D2F7D73D48B47D7A9989E88F2379A6EPatchOneResponseModelWithValidators
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
	numberOfRunsForScoreFromComparisonOperator?: RangeFromComparisonOperators
	numberOfRunsForScoreToComparisonOperator?: RangeToComparisonOperators
	numberOfRunsForScoreFrom?: number
	numberOfRunsForScoreTo?: number
	numberOfRunsForScoreListComparisonOperator?: ItemComparisonOperators
	numberOfRunsForScoreList?: number[]
	numberOfJudgesFromComparisonOperator?: RangeFromComparisonOperators
	numberOfJudgesToComparisonOperator?: RangeToComparisonOperators
	numberOfJudgesFrom?: number
	numberOfJudgesTo?: number
	numberOfJudgesListComparisonOperator?: ItemComparisonOperators
	numberOfJudgesList?: number[]
	scoresheetListComparisonOperator?: ItemComparisonOperators
	scoresheetList?: string[]
	bodyPartialUpdateOneByPrimaryKeyPhaseIdPatch: BodyPartialUpdateOneByPrimaryKeyPhaseIdPatch
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heat427895097C204622958EC9D7Dad8079AFindManyResponseListModel
export type GetManyHeatGetApiArg = {
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
	joinForeignTable?: TableName3851140AB1734F86A3181Aa421B6D73F[]
}
export type EntireUpdateManyByQueryHeatPutApiResponse =
	/** status 200 Successful Response */ Heat27138Cd6E1884288B6611F9Eb9B2D7A4UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryHeatPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateManyByQueryHeatPut: BodyEntireUpdateManyByQueryHeatPut
}
export type InsertManyHeatPostApiResponse =
	/** status 201 Successful Response */ Heatca441Df6A72F4A638F37033B1485C12BUpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	body: Heatb23720B7B6814213B5C4E2E5E732E3CfCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryHeatDeleteApiResponse =
	/** status 200 Successful Response */ Heat8D37Cf62D5Ea4F1AA9Fa94Af72F31Fd0DeleteManyResponseListModel
export type DeleteManyByQueryHeatDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryHeatPatchApiResponse =
	/** status 200 Successful Response */ Heatf1Ceb75F9D534A1A83Ee2765Fbcd72B5PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryHeatPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateManyByQueryHeatPatch: BodyPartialUpdateManyByQueryHeatPatch
}
export type GetOneByPrimaryKeyHeatIdGetApiResponse =
	/** status 200 Successful Response */ Heat4C192640A50A402F80Ac5858B4E041B6FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName4Da4A43F5Edf42A392C8B84B204E0727[]
}
export type EntireUpdateByPrimaryKeyHeatIdPutApiResponse =
	/** status 200 Successful Response */ Heatf7Bc3B56014D4Bf3Aea4Ed0386509D65UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyHeatIdPutApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyEntireUpdateByPrimaryKeyHeatIdPut: BodyEntireUpdateByPrimaryKeyHeatIdPut
}
export type DeleteOneByPrimaryKeyHeatIdDeleteApiResponse =
	/** status 200 Successful Response */ Heat5Bf5D51F784846Ae990BB52A02Ce08F6DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyHeatIdDeleteApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyHeatIdPatchApiResponse =
	/** status 200 Successful Response */ Heat695F64C0Acea4D4DA021Cf9437Fc1F0CPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyHeatIdPatchApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	bodyPartialUpdateOneByPrimaryKeyHeatIdPatch: BodyPartialUpdateOneByPrimaryKeyHeatIdPatch
}
export type GetManyAthleteGetApiResponse =
	/** status 200 Successful Response */ Athlete461Bc8042Ceb4502A9D9154C22972846FindManyResponseListModel
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
	joinForeignTable?: TableNamec9E1B3F785Cd4F5E9D44B20B4478F675[]
}
export type EntireUpdateManyByQueryAthletePutApiResponse =
	/** status 200 Successful Response */ Athlete54620833A9704868920ECec0A7255D0BUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Athlete566Cd3A648Ed41D192D843Edaff744AcUpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	body: Athlete4524E0Fd599E4431B640Baa70Fd929CaCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteDeleteApiResponse =
	/** status 200 Successful Response */ Athleteb62Be73D9B404657Ada73504E89D448EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Athletee65Fb711Fa924D4988D63F8544262B94PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Athlete9389762CD9C24Ff5Ac9C8A0Ee7D0Ac56FindOneResponseListModel
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
	joinForeignTable?: TableName195Ffbe042Bc43C2Bb04A273Fc6E86F1[]
}
export type EntireUpdateByPrimaryKeyAthleteIdPutApiResponse =
	/** status 200 Successful Response */ Athlete6650B743Aabd42A1Acb5F327Eef4E207UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athletecf105D92Ec9C4277Ae1C75F9E76Efa37DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteab250C54Eeac45A49F1F94Cace0F5D0FPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheet7F013E3CFb1E491BA933A54503Fbe908FindManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheetf5B6Cf086Eee4597B93DA914663B425CUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoreSheet824711E9F5Ca4079A8393Fc9C1B148C1UpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	body: ScoreSheet33F1B57A83Ae4B7BB78A9348D19F7C93CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoresheetDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheetc340F64A4F6B41A28F92Fbb1509734C5DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheet7Cc51488Db194EaaB51B9325Dcd7A928PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheeteecde0D57Ba8496BBbadEcc0605020AdFindOneResponseListModel
export type GetOneByPrimaryKeyScoresheetIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiResponse =
	/** status 200 Successful Response */ ScoreSheetb3D23A9E8Cc24Bd39E16Ddcd51C5C9CaUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheeta9577A5EB7A64C58B7E96542234452B0DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiResponse =
	/** status 200 Successful Response */ ScoreSheet28Aa4A444D514B19A147881A65Bf77A4PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMoves17F6Dfe3E26C4E8587631246F98C1618FindManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves979678Cc7D3F462A800F51D15C2A7Db9UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableMoves8213353105Eb47CcB655Cdaed1B59998UpsertManyResponseListModel
export type InsertManyAvailablemovesPostApiArg = {
	body: AvailableMoves31E93D910378427AA46BD340329095D6CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablemovesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMoves8Ec892C354304105B13FD7A702829E5EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMovese6785919429C494BB92B70Ec97211DbePatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableMoves2E8Da8A2863C44C1Acc81696Aaa794FaFindOneResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves820A928C31B64635989A773974E59B4DUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMoves3629095CB32E4161B85FD05Dc7112E2DDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMovesa00159FdFfe44005Be89F10Dc5A13E47PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses1957E6Cf0Efb4625B0BcBd0B9Ff515CcFindManyResponseListModel
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
	joinForeignTable?: TableName3Ba94A4BAf194Bd39Fe4011Ffb4403C5[]
}
export type EntireUpdateManyByQueryAvailablebonusesPutApiResponse =
	/** status 200 Successful Response */ AvailableBonusese024E15F3F4C4810940B0Ad3Ce1E442CUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableBonuses232Ef37A87624C3BAa85114Dd481991CUpsertManyResponseListModel
export type InsertManyAvailablebonusesPostApiArg = {
	body: AvailableBonuses0D0B7842D50B4E3CA114Ff3Bb7Bf557ACreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablebonusesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableBonusesb435B9B191Fa472EBd421Da50Fdaf04FDeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonuses608Ebcd4221B4De08E61E09C8413C29CPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses0C4D363F1F844256889E1043A0Bc5638FindOneResponseListModel
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
	joinForeignTable?: TableName60182401D79B48F0Aa849Df4Bdcc70Eb[]
}
export type EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableBonuses7896Dcfb57A74E17A81E599416A9EeedUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesceb47D36Ee424B099760D47937F8531FDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesbfdfe64B76584649B05F83A27492E31CPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves523E8B437F0F4C82B1A0273A366E8028FindManyResponseListModel
export type GetManyScoredmovesGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'move_id', 'heat_id', 'run_number', 'phase_id', 'judge_id', 'athlete_id', 'direction'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName07F19Ba21404412281E142A3Cfe90D0B[]
}
export type EntireUpdateManyByQueryScoredmovesPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves99B69E655E09406CB0B863E2699003F6UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryScoredmovesPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyEntireUpdateManyByQueryScoredmovesPut: BodyEntireUpdateManyByQueryScoredmovesPut
}
export type InsertManyScoredmovesPostApiResponse =
	/** status 201 Successful Response */ ScoredMoves5F43Da38Ae5A445C9A9752F59E206A8AUpsertManyResponseListModel
export type InsertManyScoredmovesPostApiArg = {
	body: ScoredMoves6A947514E43E42D1B1B21D2157784A44CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMoves44Dd63D058B54994893980B8861Ca9C7DeleteManyResponseListModel
export type DeleteManyByQueryScoredmovesDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
}
export type PartialUpdateManyByQueryScoredmovesPatchApiResponse =
	/** status 200 Successful Response */ ScoredMovesb49F58Bd7A88411AB4A6C32Ce3023B8DPatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryScoredmovesPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyPartialUpdateManyByQueryScoredmovesPatch: BodyPartialUpdateManyByQueryScoredmovesPatch
}
export type GetOneByPrimaryKeyScoredmovesIdGetApiResponse =
	/** status 200 Successful Response */ ScoredMovesc1F263158Aa745D1A73A918F6E0993E5FindOneResponseListModel
export type GetOneByPrimaryKeyScoredmovesIdGetApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	joinForeignTable?: TableName06Cb00534E754Ec6B87A05Dd0E3Dfc66[]
}
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredMovese21464E31856442080E58379D9E263AcUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyEntireUpdateByPrimaryKeyScoredmovesIdPut: BodyEntireUpdateByPrimaryKeyScoredmovesIdPut
}
export type DeleteOneByPrimaryKeyScoredmovesIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMoves25056Ca0E0C644398B7CEfa16692C2A4DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoredmovesIdDeleteApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoredmovesIdPatchApiResponse =
	/** status 200 Successful Response */ ScoredMoves292155A19867409883116Ee2Abdf2769PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoredmovesIdPatchApiArg = {
	id: string
	moveIdListComparisonOperator?: ItemComparisonOperators
	moveIdList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	runNumberFromComparisonOperator?: RangeFromComparisonOperators
	runNumberToComparisonOperator?: RangeToComparisonOperators
	runNumberFrom?: number
	runNumberTo?: number
	runNumberListComparisonOperator?: ItemComparisonOperators
	runNumberList?: number[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	judgeIdStrMatchingPattern?: PgsqlMatchingPatternInString[]
	judgeIdStr?: string[]
	judgeIdListComparisonOperator?: ItemComparisonOperators
	judgeIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	directionStrMatchingPattern?: PgsqlMatchingPatternInString[]
	directionStr?: string[]
	directionListComparisonOperator?: ItemComparisonOperators
	directionList?: string[]
	bodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch: BodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch
}
export type GetManyScoredbonusesGetApiResponse =
	/** status 200 Successful Response */ ScoredBonuses0Fa5367DAed54068B675Cf5E5822399AFindManyResponseListModel
export type GetManyScoredbonusesGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
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
	joinForeignTable?: TableName90A9Abdd97D54Ed49E74Fb4774A5B1F3[]
}
export type EntireUpdateManyByQueryScoredbonusesPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses5Bd4B66ECbc04D3892F80B7C854A3Af6UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryScoredbonusesPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
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
	/** status 201 Successful Response */ ScoredBonuses0E36987342434C5A97Ab3E6114Fae778UpsertManyResponseListModel
export type InsertManyScoredbonusesPostApiArg = {
	body: ScoredBonusesac2B314FEfa64Fa38Dd9423Ad022635ACreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredbonusesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredBonuses22574D5ACec94615850B7884Ba261191DeleteManyResponseListModel
export type DeleteManyByQueryScoredbonusesDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
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
	/** status 200 Successful Response */ ScoredBonuses4Befbfcd8E344F84A77FF7450C445Cc8PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryScoredbonusesPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
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
	/** status 200 Successful Response */ ScoredBonuses04A4577813F243Ef83F08Bfe58E2BcbfFindOneResponseListModel
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
	joinForeignTable?: TableName557Ce669A66941F99F0F0Bcbf729Ad18[]
}
export type EntireUpdateByPrimaryKeyScoredbonusesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses1B36Cbf2263A4C79Abf142B8172FabfdUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonusesdbc9F9C496C04D639F2403B578Bf7345DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses832C8A5059994Ba792092E638A430E2DPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat063A79610373427E88C5975F1127Cb91FindManyResponseListModel
export type GetManyAthleteheatGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'heat_id', 'athlete_id', 'phase_id'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName45118Fce76A145039F4BC5Cf7C34C082[]
}
export type EntireUpdateManyByQueryAthleteheatPutApiResponse =
	/** status 200 Successful Response */ Athleteheatfea8F1B8Fd364Cc4A520Dfad177E997AUpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAthleteheatPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	bodyEntireUpdateManyByQueryAthleteheatPut: BodyEntireUpdateManyByQueryAthleteheatPut
}
export type InsertManyAthleteheatPostApiResponse =
	/** status 201 Successful Response */ Athleteheat341609393E804F4FAa31B72A454B3Ed0UpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	body: Athleteheatb3B9Af7CA00F4A11853A2C8563Bd6Df1CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteheatDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheat863E4E664F3E433DA0093D6E0548Dad2DeleteManyResponseListModel
export type DeleteManyByQueryAthleteheatDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
}
export type PartialUpdateManyByQueryAthleteheatPatchApiResponse =
	/** status 200 Successful Response */ Athleteheatee476C8B8E9B49Cb81291931B606BdeePatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAthleteheatPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	bodyPartialUpdateManyByQueryAthleteheatPatch: BodyPartialUpdateManyByQueryAthleteheatPatch
}
export type GetOneByPrimaryKeyAthleteheatIdGetApiResponse =
	/** status 200 Successful Response */ Athleteheat57F9DecbC838415E9FfaC42223856D8CFindOneResponseListModel
export type GetOneByPrimaryKeyAthleteheatIdGetApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	joinForeignTable?: TableName61E4149354Df49Da8A50Fe29Ee390658[]
}
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiResponse =
	/** status 200 Successful Response */ Athleteheat947035E6Acee43A8B0AcDe20Cbe72279UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	bodyEntireUpdateByPrimaryKeyAthleteheatIdPut: BodyEntireUpdateByPrimaryKeyAthleteheatIdPut
}
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheat3C602A8F81Cf4027A91CEbb8Ba330605DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat4Bcffa0EAacd486B868534805D6E095DPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	bodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch: BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch
}
export type RootGetApiResponse = /** status 200 Successful Response */ any
export type RootGetApiArg = void
export type HeatInfoResponse = {
	id: string
	heat_id: string
	athlete_id: string
	phase_id: string
	number_of_runs: number
	number_of_runs_for_score: number
	scoresheet: string
	first_name: string
	last_name: string
	bib: string
}
export type ValidationError = {
	loc: string[]
	msg: string
	type: string
}
export type HttpValidationError = {
	detail?: ValidationError[]
}
export type PydanticScoredMoves = {
	id: string
	move_id: string
	direction: "L" | "R" | "F" | "B" | "LF" | "RB"
}
export type PydanticScoredBonuses = {
	id: string
	bonus_id: string
	move_id: string
}
export type AddUpdateScoredMovesRequest = {
	moves?: PydanticScoredMoves[]
	bonuses?: PydanticScoredBonuses[]
}
export type PydanticScoredMovesResponse = {
	id: string
	move_id: string
	heat_id: string
	run_number: number
	phase_id: string
	judge_id: string
	athlete_id: string
	direction: string
}
export type PydanticScoredBonusesResponse = {
	id: string
	move_id: string
	bonus_id: string
	judge_id: string
}
export type ScoredMovesAndBonusesResponse = {
	moves: PydanticScoredMovesResponse[]
	bonuses: PydanticScoredBonusesResponse[]
}
export type AthleteScoreInfo = {
	score: number
	highest_scoring_move: number
}
export type JudgeScores = {
	judge_id: string
	score_info: AthleteScoreInfo
}
export type RunScores = {
	run_number: number
	judge_scores: JudgeScores[]
	mean_run_score: number
	highest_scoring_move: number
}
export type AthleteScoresWithAthleteInfo = {
	athlete_id: string
	run_scores: RunScores[]
	highest_scoring_move: number
	ranking?: number
	reason?: string
	total_score?: number
	first_name: string
	last_name: string
	bib_number: number
}
export type HeatScoresResponse = {
	heat_id: string
	scores: AthleteScoresWithAthleteInfo[]
}
export type PhaseScoresResponse = {
	phase_id: string
	scores: AthleteScoresWithAthleteInfo[]
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
export type ForeignEventd7Bdeb4979034E28A9B969Ef4A82B151FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent63Af5A06A5C44E459Ef2275Fc8Bdb9BbGetManyResponseForeignModel =
	ForeignEventd7Bdeb4979034E28A9B969Ef4A82B151FindManyResponseItemModelWithValidators[]
export type Competition5Dc4654492894Da097Ee27Bfb5E77290FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent63Af5A06A5C44E459Ef2275Fc8Bdb9BbGetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competition3C6Ffb25Ff2C44Ba93111343Ca54495DFindManyResponseListModel =

		| Competition5Dc4654492894Da097Ee27Bfb5E77290FindManyResponseItemModelWithValidators[]

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
export type TableName2Ea8D0Fb301A4Ef1Bafd7B9389B3Daee = "event"
export type Competitioncb899Ba2B5444Eb29403Bba5A8D070A2UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition9Bb102E563664B03931CB967E9D18A0DUpdateManyResponseListModelWithValidators =
	Competitioncb899Ba2B5444Eb29403Bba5A8D070A2UpdateManyResponseModelWithValidators[]
export type Competition73Ebd830Ca07440D84704Bd6A1B3A85BUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type Competitionb16678Ce2F1245229C6438433A624D61UpsertManyResponseListModel =
	Competition73Ebd830Ca07440D84704Bd6A1B3A85BUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition28Ee4A962410475BBf02F3F87C1Bdef5CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type Competitionc03218Ea7Ace47B58A7BDabf172F062ADeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition130Aa99B28314C0F9Bec1B8600Df6E21DeleteManyResponseListModel =
	Competitionc03218Ea7Ace47B58A7BDabf172F062ADeleteManyResponseModelWithValidators[]
export type Competitiona49Fb6CcCf534DccBe0B56A1Edfea4C0PatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition9Cd7F571B67542BaAfb22B71414A9381PatchManyResponseListModelWithValidators =
	Competitiona49Fb6CcCf534DccBe0B56A1Edfea4C0PatchManyResponseModelWithValidators[]
export type Competition4A9F4Ca3D47E42A5A483D67B8372F04FFindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent63Af5A06A5C44E459Ef2275Fc8Bdb9BbGetManyResponseForeignModel
		id: string
		name: string
	}
export type Competitionacf7Fb58305640A7B81CD0Cbb86D06CcFindOneResponseListModel =
	Competition4A9F4Ca3D47E42A5A483D67B8372F04FFindOneResponseModelWithValidators
export type TableName6Ed1221177244785A4B9E177Eb870033 = "event"
export type Competitiondf443643Cf9F4586B5351Afd2D8588D5UpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition58F4A4A385264E488445Dba94B659C48DeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition09C8Ea82Ee1B45638C70B97D3079Cff2PatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ForeignCompetitionf1D3899F87C845869B2A6De7010827FeFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionb2C7B0E015Ca4Ec89B719Fcce3Dad1C6GetManyResponseForeignModel =
	ForeignCompetitionf1D3899F87C845869B2A6De7010827FeFindManyResponseItemModelWithValidators[]
export type ForeignPhase9632E3AfF24045258B78E5B0Afa8F45DFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhased10377F3Db1F4F70B62FEc82B6D91E33GetManyResponseForeignModel =
	ForeignPhase9632E3AfF24045258B78E5B0Afa8F45DFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventIdf0C74415Dca447Af8Aee0C58Dba3D555FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetitionb2C7B0E015Ca4Ec89B719Fcce3Dad1C6GetManyResponseForeignModel
		phase_foreign?: ForeignPhased10377F3Db1F4F70B62FEc82B6D91E33GetManyResponseForeignModel
	}
export type CompetitionIdEventIde63D5C87Bd9D48499Ebe2Cb483407488FindOneResponseListModel =
	CompetitionIdEventIdf0C74415Dca447Af8Aee0C58Dba3D555FindOneResponseModelWithValidators
export type TableName6999C5F29D9D4706841D4F25E3E60E2E = "competition" | "phase"
export type ForeignCompetitionc8C78C55Ca3C4371912F5A2Fd2E36Fe4FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition293B16D86A63440F80981Fb7A86D7E7EGetManyResponseForeignModel =
	ForeignCompetitionc8C78C55Ca3C4371912F5A2Fd2E36Fe4FindManyResponseItemModelWithValidators[]
export type ForeignPhase7D09E7C15Fa445F3Bb582760733B72DdFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhasef43C782094154Cf4Bb6561B02Dd85FfdGetManyResponseForeignModel =
	ForeignPhase7D09E7C15Fa445F3Bb582760733B72DdFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventIdfd8E3963B6504160B09F0D4347257B09FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition293B16D86A63440F80981Fb7A86D7E7EGetManyResponseForeignModel
		phase_foreign?: ForeignPhasef43C782094154Cf4Bb6561B02Dd85FfdGetManyResponseForeignModel
	}
export type CompetitionIdEventId938Ee750514A410793EbCd9885587Dd3FindManyResponseListModel =

		| CompetitionIdEventIdfd8E3963B6504160B09F0D4347257B09FindOneResponseModelWithValidators[]

export type TableName03Be6B8D7A1946Dd9C394F0F2300Feb4 = "competition" | "phase"
export type ForeignCompetitione7D2Ee54B5C5453BB03ACa7Cc9F4907BFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition721E61F3E3F84Da1A24C3D5686E96347GetManyResponseForeignModel =
	ForeignCompetitione7D2Ee54B5C5453BB03ACa7Cc9F4907BFindManyResponseItemModelWithValidators[]
export type ForeignPhase58Fa64D2E4D64521A9BaA2Dc5694771EFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase22B2Dd7CB10047DaB6E5499C9754598CGetManyResponseForeignModel =
	ForeignPhase58Fa64D2E4D64521A9BaA2Dc5694771EFindManyResponseItemModelWithValidators[]
export type Event3Bb2Cf87F62E4C7FAd576F552E2C03F5FindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetition721E61F3E3F84Da1A24C3D5686E96347GetManyResponseForeignModel
		phase_foreign?: ForeignPhase22B2Dd7CB10047DaB6E5499C9754598CGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event1F12896D56D34B9AAa17D522Bd4Bb181FindManyResponseListModel =
	| Event3Bb2Cf87F62E4C7FAd576F552E2C03F5FindManyResponseItemModelWithValidators[]

export type TableName8D7Bea682C084B32A6303B1769C074B7 = "competition" | "phase"
export type Event583653134F4C49528Fd4424727Db9Cf9UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event0Facac4AC84946Bf95F38Bc1A9B2Ed22UpdateManyResponseListModelWithValidators =
	Event583653134F4C49528Fd4424727Db9Cf9UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryEventPut = {
	competition_id: string
	name: string
}
export type Eventeaf239622Fe0400F911798801C322C12UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventecd2B8598226454A9B704D32B37D12B9UpsertManyResponseListModel =
	Eventeaf239622Fe0400F911798801C322C12UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Event422A1E8831034629A8Ba0C05366A074ECreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event08022318Eae5444B87F633Bf4B03Ef75DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event381A6626773D46188937C1C9226A9469DeleteManyResponseListModel =
	Event08022318Eae5444B87F633Bf4B03Ef75DeleteManyResponseModelWithValidators[]
export type Eventd7C59C246Ca14B42Ac9DCf03A65Db026PatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event14A479C1F6Ca4Fb892E61Ceaa973A648PatchManyResponseListModelWithValidators =
	Eventd7C59C246Ca14B42Ac9DCf03A65Db026PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryEventPatch = {
	competition_id?: string
	name?: string
}
export type Eventcf60075D34E444658A4A9D191Ccf53D3FindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetition721E61F3E3F84Da1A24C3D5686E96347GetManyResponseForeignModel
		phase_foreign?: ForeignPhase22B2Dd7CB10047DaB6E5499C9754598CGetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Event18Aa89E18F1543A6A8119678Fa7Efd7CFindOneResponseListModel =
	Eventcf60075D34E444658A4A9D191Ccf53D3FindOneResponseModelWithValidators
export type TableName3E10181B52Ea48Eb897F9Fc85C3Ce974 = "competition" | "phase"
export type Evente3A7A14CDb42422BB5C173Fb7Fb01410UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyEventIdPut = {
	competition_id: string
	name: string
}
export type Event00B90Eda9B2C40C49Efc0E3Be412722DDeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event25B050048C334E94Bff45649F3157B47PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyEventIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignEvent433C41870862467D8EbdA23Edd70Ea23FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent737B606B7D5845888Ddb893086154E62GetManyResponseForeignModel =
	ForeignEvent433C41870862467D8EbdA23Edd70Ea23FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatc2592341D1D4408384A947E01B1B6D1CFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
	}
export type ForeignAthleteheat24Fc0D3E60D0485581098C7421Ceda68GetManyResponseForeignModel =
	ForeignAthleteheatc2592341D1D4408384A947E01B1B6D1CFindManyResponseItemModelWithValidators[]
export type EventIdPhaseIdbc51Adcf1641484EB78698F15318517CFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEvent737B606B7D5845888Ddb893086154E62GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat24Fc0D3E60D0485581098C7421Ceda68GetManyResponseForeignModel
	}
export type EventIdPhaseId553Daeb0Ad924582A46518D418881556FindOneResponseListModel =
	EventIdPhaseIdbc51Adcf1641484EB78698F15318517CFindOneResponseModelWithValidators
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableName2De3717EA8E541C9Aafd01Db9Ea01409 = "event" | "athleteheat"
export type ForeignEvent26Ca95859C8B4C45A43E5B857101F862FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventd450158558Dc4De19367C67Fa9A574E3GetManyResponseForeignModel =
	ForeignEvent26Ca95859C8B4C45A43E5B857101F862FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatbe5D541511194C018426933Ad796D34EFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
	}
export type ForeignAthleteheat8Df513D896Ec4B52A8F02281F621Bbf2GetManyResponseForeignModel =
	ForeignAthleteheatbe5D541511194C018426933Ad796D34EFindManyResponseItemModelWithValidators[]
export type EventIdPhaseId572328414E0E4Cd5B3366B23B3314183FindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEventd450158558Dc4De19367C67Fa9A574E3GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat8Df513D896Ec4B52A8F02281F621Bbf2GetManyResponseForeignModel
	}
export type EventIdPhaseIdf05A13560F5F402E99394A92Ff25E12EFindManyResponseListModel =

		| EventIdPhaseId572328414E0E4Cd5B3366B23B3314183FindOneResponseModelWithValidators[]

export type TableNamecc9A156B88884376891380Eea44Eb7D8 = "event" | "athleteheat"
export type ForeignEventd99C45E080E84546Ae0925D15D6D568EFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent885Ba28848Fc4Bd0Bff4B948A05C1A97GetManyResponseForeignModel =
	ForeignEventd99C45E080E84546Ae0925D15D6D568EFindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat49Ab964432Cc48849D9194Edbe13F751FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
	}
export type ForeignAthleteheatb73Ce11B459446D4A0Bf9805E5Bc8288GetManyResponseForeignModel =
	ForeignAthleteheat49Ab964432Cc48849D9194Edbe13F751FindManyResponseItemModelWithValidators[]
export type Phase7D9645F41B604803964BC4964Afae203FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent885Ba28848Fc4Bd0Bff4B948A05C1A97GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatb73Ce11B459446D4A0Bf9805E5Bc8288GetManyResponseForeignModel
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type Phase5C65E7342D554Cb3B8771Ec57B220D9EFindManyResponseListModel =
	| Phase7D9645F41B604803964BC4964Afae203FindManyResponseItemModelWithValidators[]

export type TableNamed6Dcaeec5Eb8425A8Fae32679F36A3Cb = "event" | "athleteheat"
export type Phasecf7E0B304D914Ae0A42085844C8969C6UpdateManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phaseb9A36D4D3Cc64619B69A8B258A89A96DUpdateManyResponseListModelWithValidators =
	Phasecf7E0B304D914Ae0A42085844C8969C6UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryPhasePut = {
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
}
export type Phase9263223ABa80407F9Ae463B64C020Bf7UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase4De03909134C49D7A704B4C09938D4C4UpsertManyResponseListModel =
	Phase9263223ABa80407F9Ae463B64C020Bf7UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase02Ca13B750E441AaB7Dd4A61Cad4F8B6CreateManyInsertItemRequestModel =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase960A35719D70418DA1CbCaf35B85D37EDeleteManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasec9D5Da2D257E49738F22F7Bf41B8546CDeleteManyResponseListModel =
	Phase960A35719D70418DA1CbCaf35B85D37EDeleteManyResponseModelWithValidators[]
export type Phase0964975A3A694956A51F19B3A2862200PatchManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasefc8A5240581644E9B472Edb5E2E4Ff52PatchManyResponseListModelWithValidators =
	Phase0964975A3A694956A51F19B3A2862200PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryPhasePatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	number_of_judges?: number
	scoresheet?: string
}
export type Phasea3Bc458FB13247888A01Fdac90F23A14FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent885Ba28848Fc4Bd0Bff4B948A05C1A97GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatb73Ce11B459446D4A0Bf9805E5Bc8288GetManyResponseForeignModel
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phaseca79A8Dd454A4E388Bae04Bda815D546FindOneResponseListModel =
	Phasea3Bc458FB13247888A01Fdac90F23A14FindOneResponseModelWithValidators
export type TableName11D642E80A4F4F08Ae8414Dd2Cf10E7E = "event" | "athleteheat"
export type Phase3487C4FfC1Ec48139203437A16799237UpdateOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type BodyEntireUpdateByPrimaryKeyPhaseIdPut = {
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
}
export type Phasedcda3Dbf5D4A40BfAd17304Fbd6Ec805DeleteOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase0D2F7D73D48B47D7A9989E88F2379A6EPatchOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type BodyPartialUpdateOneByPrimaryKeyPhaseIdPatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	number_of_judges?: number
	scoresheet?: string
}
export type ForeignAthleteheat40E3C3E3E1E8497983Af1Fb05Ce91Fa4FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
	}
export type ForeignAthleteheat3Ec3Ae7F62374876A262D26F828A89B9GetManyResponseForeignModel =
	ForeignAthleteheat40E3C3E3E1E8497983Af1Fb05Ce91Fa4FindManyResponseItemModelWithValidators[]
export type Heat56Abda1640894409B4AdB4D7E4A85342FindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat3Ec3Ae7F62374876A262D26F828A89B9GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heat427895097C204622958EC9D7Dad8079AFindManyResponseListModel =
	| Heat56Abda1640894409B4AdB4D7E4A85342FindManyResponseItemModelWithValidators[]

export type TableName3851140AB1734F86A3181Aa421B6D73F = "athleteheat"
export type Heat5044A406566B49138C1F952D8A3444B6UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat27138Cd6E1884288B6611F9Eb9B2D7A4UpdateManyResponseListModelWithValidators =
	Heat5044A406566B49138C1F952D8A3444B6UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryHeatPut = {
	competition_id: string
	name: string
}
export type Heat8A2579Ad8Af04Bf8AffaF80868Ead8E7UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heatca441Df6A72F4A638F37033B1485C12BUpsertManyResponseListModel =
	Heat8A2579Ad8Af04Bf8AffaF80868Ead8E7UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heatb23720B7B6814213B5C4E2E5E732E3CfCreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat8A79E8815179435F88C5D0Ac504C1311DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat8D37Cf62D5Ea4F1AA9Fa94Af72F31Fd0DeleteManyResponseListModel =
	Heat8A79E8815179435F88C5D0Ac504C1311DeleteManyResponseModelWithValidators[]
export type Heatf9389D89Dc9446719C2CBf15Ce994FfePatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heatf1Ceb75F9D534A1A83Ee2765Fbcd72B5PatchManyResponseListModelWithValidators =
	Heatf9389D89Dc9446719C2CBf15Ce994FfePatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryHeatPatch = {
	competition_id?: string
	name?: string
}
export type Heat450489CdE1C8433390D92B48D94B3369FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat3Ec3Ae7F62374876A262D26F828A89B9GetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Heat4C192640A50A402F80Ac5858B4E041B6FindOneResponseListModel =
	Heat450489CdE1C8433390D92B48D94B3369FindOneResponseModelWithValidators
export type TableName4Da4A43F5Edf42A392C8B84B204E0727 = "athleteheat"
export type Heatf7Bc3B56014D4Bf3Aea4Ed0386509D65UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyHeatIdPut = {
	competition_id: string
	name: string
}
export type Heat5Bf5D51F784846Ae990BB52A02Ce08F6DeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat695F64C0Acea4D4DA021Cf9437Fc1F0CPatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyHeatIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignAthleteheat8937F33F8A7F460F97Ee7A78Fd206AabFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
	}
export type ForeignAthleteheat9F3Bd565126E40Ee9626544D6Cc5Aa6AGetManyResponseForeignModel =
	ForeignAthleteheat8937F33F8A7F460F97Ee7A78Fd206AabFindManyResponseItemModelWithValidators[]
export type Athletef6E432B007B7430F9A448F3Be039Dd02FindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat9F3Bd565126E40Ee9626544D6Cc5Aa6AGetManyResponseForeignModel
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type Athlete461Bc8042Ceb4502A9D9154C22972846FindManyResponseListModel =
	| Athletef6E432B007B7430F9A448F3Be039Dd02FindManyResponseItemModelWithValidators[]

export type TableNamec9E1B3F785Cd4F5E9D44B20B4478F675 = "athleteheat"
export type Athlete7Abc35D606Ef4Ee5Ba3043D744F0C0A1UpdateManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete54620833A9704868920ECec0A7255D0BUpdateManyResponseListModelWithValidators =
	Athlete7Abc35D606Ef4Ee5Ba3043D744F0C0A1UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthletePut = {
	first_name: string
	last_name: string
	bib: string
}
export type Athletec4Ece8E549184Dcb998737E0Db6D1060UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete566Cd3A648Ed41D192D843Edaff744AcUpsertManyResponseListModel =
	Athletec4Ece8E549184Dcb998737E0Db6D1060UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athlete4524E0Fd599E4431B640Baa70Fd929CaCreateManyInsertItemRequestModel =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete82E80Dfc2542491991F03A0D1A500B87DeleteManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athleteb62Be73D9B404657Ada73504E89D448EDeleteManyResponseListModel =
	Athlete82E80Dfc2542491991F03A0D1A500B87DeleteManyResponseModelWithValidators[]
export type Athletee85E14DcC7D1433984FfF370Bd193780PatchManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athletee65Fb711Fa924D4988D63F8544262B94PatchManyResponseListModelWithValidators =
	Athletee85E14DcC7D1433984FfF370Bd193780PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthletePatch = {
	first_name?: string
	last_name?: string
	bib?: string
}
export type Athlete49612C46B1504F029943Aaa0D7662E78FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat9F3Bd565126E40Ee9626544D6Cc5Aa6AGetManyResponseForeignModel
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete9389762CD9C24Ff5Ac9C8A0Ee7D0Ac56FindOneResponseListModel =
	Athlete49612C46B1504F029943Aaa0D7662E78FindOneResponseModelWithValidators
export type TableName195Ffbe042Bc43C2Bb04A273Fc6E86F1 = "athleteheat"
export type Athlete6650B743Aabd42A1Acb5F327Eef4E207UpdateOneResponseModelWithValidators =
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
export type Athletecf105D92Ec9C4277Ae1C75F9E76Efa37DeleteOneResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athleteab250C54Eeac45A49F1F94Cace0F5D0FPatchOneResponseModelWithValidators =
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
export type ScoreSheet070D97D2Be7E44C69Dc98Ef27D255B59FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheet7F013E3CFb1E491BA933A54503Fbe908FindManyResponseListModel =

		| ScoreSheet070D97D2Be7E44C69Dc98Ef27D255B59FindManyResponseItemModelWithValidators[]

export type ScoreSheetadf95E96E0Fc41De9E6196066435461DUpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetf5B6Cf086Eee4597B93DA914663B425CUpdateManyResponseListModelWithValidators =
	ScoreSheetadf95E96E0Fc41De9E6196066435461DUpdateManyResponseModelWithValidators[]
export type ScoreSheetbfc19B7632C248398476A412765451B5UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet824711E9F5Ca4079A8393Fc9C1B148C1UpsertManyResponseListModel =
	ScoreSheetbfc19B7632C248398476A412765451B5UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheet33F1B57A83Ae4B7BB78A9348D19F7C93CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type ScoreSheet95Aa675006C146F991A2750460A5F53DDeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetc340F64A4F6B41A28F92Fbb1509734C5DeleteManyResponseListModel =
	ScoreSheet95Aa675006C146F991A2750460A5F53DDeleteManyResponseModelWithValidators[]
export type ScoreSheetd7423C6A560E463084C8229D4987169APatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet7Cc51488Db194EaaB51B9325Dcd7A928PatchManyResponseListModelWithValidators =
	ScoreSheetd7423C6A560E463084C8229D4987169APatchManyResponseModelWithValidators[]
export type ScoreSheet2C7B8252768D435D995652B78592Cdc7FindOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheeteecde0D57Ba8496BBbadEcc0605020AdFindOneResponseListModel =
	ScoreSheet2C7B8252768D435D995652B78592Cdc7FindOneResponseModelWithValidators
export type ScoreSheetb3D23A9E8Cc24Bd39E16Ddcd51C5C9CaUpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheeta9577A5EB7A64C58B7E96542234452B0DeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet28Aa4A444D514B19A147881A65Bf77A4PatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type AvailableMoves626A241DF6D44722B8E7C370Eb940C38FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMoves17F6Dfe3E26C4E8587631246F98C1618FindManyResponseListModel =

		| AvailableMoves626A241DF6D44722B8E7C370Eb940C38FindManyResponseItemModelWithValidators[]

export type AvailableMoves7517212333474A629Ca570Ca101917FdUpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves979678Cc7D3F462A800F51D15C2A7Db9UpdateManyResponseListModelWithValidators =
	AvailableMoves7517212333474A629Ca570Ca101917FdUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablemovesPut = {
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: string
}
export type AvailableMovese670434C2D92469DA3C309A35B4Ed7B3UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves8213353105Eb47CcB655Cdaed1B59998UpsertManyResponseListModel =
	AvailableMovese670434C2D92469DA3C309A35B4Ed7B3UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableMoves31E93D910378427AA46BD340329095D6CreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves7Bbb4E4E1C374697B59BB0D2Fe4A114CDeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves8Ec892C354304105B13FD7A702829E5EDeleteManyResponseListModel =
	AvailableMoves7Bbb4E4E1C374697B59BB0D2Fe4A114CDeleteManyResponseModelWithValidators[]
export type AvailableMoves110Fa7C90Eae48CeA96FC768Dd8E62B7PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovese6785919429C494BB92B70Ec97211DbePatchManyResponseListModelWithValidators =
	AvailableMoves110Fa7C90Eae48CeA96FC768Dd8E62B7PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablemovesPatch = {
	sheet_id?: string
	name?: string
	fl_score?: number
	rb_score?: number
	direction?: string
}
export type AvailableMoves2Ee551562B7B4B9891E5E665A7Ce9F11FindOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves2E8Da8A2863C44C1Acc81696Aaa794FaFindOneResponseListModel =
	AvailableMoves2Ee551562B7B4B9891E5E665A7Ce9F11FindOneResponseModelWithValidators
export type AvailableMoves820A928C31B64635989A773974E59B4DUpdateOneResponseModelWithValidators =
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
export type AvailableMoves3629095CB32E4161B85FD05Dc7112E2DDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesa00159FdFfe44005Be89F10Dc5A13E47PatchOneResponseModelWithValidators =
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
export type ForeignScoreSheet370539D60E784134919D6E0Be079011AFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheet7A3B9Dd19Bfd4Ed88FfbC47E20895A5FGetManyResponseForeignModel =
	ForeignScoreSheet370539D60E784134919D6E0Be079011AFindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves2A33703F97934D6C84Ab699E8A3Bfd90FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves8D707D011D4645B5B26EF2D663837283GetManyResponseForeignModel =
	ForeignAvailableMoves2A33703F97934D6C84Ab699E8A3Bfd90FindManyResponseItemModelWithValidators[]
export type AvailableBonuses439B290257F040Ff806A258Dd7Ab92EeFindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet7A3B9Dd19Bfd4Ed88FfbC47E20895A5FGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves8D707D011D4645B5B26EF2D663837283GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses1957E6Cf0Efb4625B0BcBd0B9Ff515CcFindManyResponseListModel =

		| AvailableBonuses439B290257F040Ff806A258Dd7Ab92EeFindManyResponseItemModelWithValidators[]

export type TableName3Ba94A4BAf194Bd39Fe4011Ffb4403C5 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonusesc5D62Ea2E46643E7830AC65Dd16136D2UpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusese024E15F3F4C4810940B0Ad3Ce1E442CUpdateManyResponseListModelWithValidators =
	AvailableBonusesc5D62Ea2E46643E7830AC65Dd16136D2UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablebonusesPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonusesb69A80B70Fde4B7489Aa76A6B534Cf5AUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses232Ef37A87624C3BAa85114Dd481991CUpsertManyResponseListModel =
	AvailableBonusesb69A80B70Fde4B7489Aa76A6B534Cf5AUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableBonuses0D0B7842D50B4E3CA114Ff3Bb7Bf557ACreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesefc304BaCffe4E6298D07682E0Ebc1A4DeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesb435B9B191Fa472EBd421Da50Fdaf04FDeleteManyResponseListModel =
	AvailableBonusesefc304BaCffe4E6298D07682E0Ebc1A4DeleteManyResponseModelWithValidators[]
export type AvailableBonuses1C5237B29754409583DaF7F901Cc3Ca4PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses608Ebcd4221B4De08E61E09C8413C29CPatchManyResponseListModelWithValidators =
	AvailableBonuses1C5237B29754409583DaF7F901Cc3Ca4PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablebonusesPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type AvailableBonuses3C2091E60D5045138Ba9Be5126Eab95EFindOneResponseModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet7A3B9Dd19Bfd4Ed88FfbC47E20895A5FGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves8D707D011D4645B5B26EF2D663837283GetManyResponseForeignModel
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses0C4D363F1F844256889E1043A0Bc5638FindOneResponseListModel =
	AvailableBonuses3C2091E60D5045138Ba9Be5126Eab95EFindOneResponseModelWithValidators
export type TableName60182401D79B48F0Aa849Df4Bdcc70Eb =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses7896Dcfb57A74E17A81E599416A9EeedUpdateOneResponseModelWithValidators =
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
export type AvailableBonusesceb47D36Ee424B099760D47937F8531FDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesbfdfe64B76584649B05F83A27492E31CPatchOneResponseModelWithValidators =
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
export type ForeignHeat89E29027C6134A5D98653E80406D4C55FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat25A0Dd057609458485E08447Dbf2DeceGetManyResponseForeignModel =
	ForeignHeat89E29027C6134A5D98653E80406D4C55FindManyResponseItemModelWithValidators[]
export type ForeignPhasee4De84A52C794544862AF0579768B846FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhasec2319B83D808456C96224882Fae5Db30GetManyResponseForeignModel =
	ForeignPhasee4De84A52C794544862AF0579768B846FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves26A90D93D8Cc45A5A2B071E6776361E4FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves575Cce35Feb44BbeA089D57E74B3E082GetManyResponseForeignModel =
	ForeignAvailableMoves26A90D93D8Cc45A5A2B071E6776361E4FindManyResponseItemModelWithValidators[]
export type ForeignAthleteaf9B8F714A7145C48Fd12A8C5E3D2DaeFindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthletef3D731CcC0054E2E94Ae6Ddfaf0F8073GetManyResponseForeignModel =
	ForeignAthleteaf9B8F714A7145C48Fd12A8C5E3D2DaeFindManyResponseItemModelWithValidators[]
export type ScoredMovesd3439A3FDc654Ca28EfeEd0A9105E09AFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat25A0Dd057609458485E08447Dbf2DeceGetManyResponseForeignModel
		phase_foreign?: ForeignPhasec2319B83D808456C96224882Fae5Db30GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves575Cce35Feb44BbeA089D57E74B3E082GetManyResponseForeignModel
		athlete_foreign?: ForeignAthletef3D731CcC0054E2E94Ae6Ddfaf0F8073GetManyResponseForeignModel
		id?: string
		move_id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		judge_id?: string
		athlete_id?: string
		direction?: string
	}
export type ScoredMoves523E8B437F0F4C82B1A0273A366E8028FindManyResponseListModel =

		| ScoredMovesd3439A3FDc654Ca28EfeEd0A9105E09AFindManyResponseItemModelWithValidators[]

export type TableName07F19Ba21404412281E142A3Cfe90D0B =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMovesd44D65D2C0Bd402C884AA04B33D09318UpdateManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMoves99B69E655E09406CB0B863E2699003F6UpdateManyResponseListModelWithValidators =
	ScoredMovesd44D65D2C0Bd402C884AA04B33D09318UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredmovesPut = {
	move_id: string
	heat_id: string
	run_number: number
	phase_id: string
	judge_id: string
	athlete_id: string
	direction: string
}
export type ScoredMovesed128Da317Bf425C90F6Cd9Bb4E9974FUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMoves5F43Da38Ae5A445C9A9752F59E206A8AUpsertManyResponseListModel =
	ScoredMovesed128Da317Bf425C90F6Cd9Bb4E9974FUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredMoves6A947514E43E42D1B1B21D2157784A44CreateManyInsertItemRequestModel =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMovesc0C35073Fc054C63B686200D12F340CdDeleteManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMoves44Dd63D058B54994893980B8861Ca9C7DeleteManyResponseListModel =
	ScoredMovesc0C35073Fc054C63B686200D12F340CdDeleteManyResponseModelWithValidators[]
export type ScoredMoves6A0Ce192C65F42D3Ad7932D4Fcbe5B0DPatchManyResponseModelWithValidators =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMovesb49F58Bd7A88411AB4A6C32Ce3023B8DPatchManyResponseListModelWithValidators =
	ScoredMoves6A0Ce192C65F42D3Ad7932D4Fcbe5B0DPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredmovesPatch = {
	move_id?: string
	heat_id?: string
	run_number?: number
	phase_id?: string
	judge_id?: string
	athlete_id?: string
	direction?: string
}
export type ScoredMoves1279152F414D4E7B8180167Bea0DecdfFindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat25A0Dd057609458485E08447Dbf2DeceGetManyResponseForeignModel
		phase_foreign?: ForeignPhasec2319B83D808456C96224882Fae5Db30GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves575Cce35Feb44BbeA089D57E74B3E082GetManyResponseForeignModel
		athlete_foreign?: ForeignAthletef3D731CcC0054E2E94Ae6Ddfaf0F8073GetManyResponseForeignModel
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMovesc1F263158Aa745D1A73A918F6E0993E5FindOneResponseListModel =
	ScoredMoves1279152F414D4E7B8180167Bea0DecdfFindOneResponseModelWithValidators
export type TableName06Cb00534E754Ec6B87A05Dd0E3Dfc66 =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMovese21464E31856442080E58379D9E263AcUpdateOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type BodyEntireUpdateByPrimaryKeyScoredmovesIdPut = {
	move_id: string
	heat_id: string
	run_number: number
	phase_id: string
	judge_id: string
	athlete_id: string
	direction: string
}
export type ScoredMoves25056Ca0E0C644398B7CEfa16692C2A4DeleteOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMoves292155A19867409883116Ee2Abdf2769PatchOneResponseModelWithValidators =
	{
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type BodyPartialUpdateOneByPrimaryKeyScoredmovesIdPatch = {
	move_id?: string
	heat_id?: string
	run_number?: number
	phase_id?: string
	judge_id?: string
	athlete_id?: string
	direction?: string
}
export type ForeignAvailableBonuses635043D6Ed6245F2A90F3Ca06D9E58C3FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableBonusesd06Dea5514C74E4EB08A9Cc03E4286F0GetManyResponseForeignModel =
	ForeignAvailableBonuses635043D6Ed6245F2A90F3Ca06D9E58C3FindManyResponseItemModelWithValidators[]
export type ForeignScoredMovese6D624A47Edd4B609Ef7D6F76Cfedd87FindManyResponseItemModelWithValidators =
	{
		id?: string
		move_id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		judge_id?: string
		athlete_id?: string
		direction?: string
	}
export type ForeignScoredMoves207D4D079115456482C841D097C8D4C5GetManyResponseForeignModel =
	ForeignScoredMovese6D624A47Edd4B609Ef7D6F76Cfedd87FindManyResponseItemModelWithValidators[]
export type ScoredBonusesfd2Ebcf6602D442D8C1C0Cf8669B45C4FindManyResponseItemModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesd06Dea5514C74E4EB08A9Cc03E4286F0GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves207D4D079115456482C841D097C8D4C5GetManyResponseForeignModel
		id?: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonuses0Fa5367DAed54068B675Cf5E5822399AFindManyResponseListModel =

		| ScoredBonusesfd2Ebcf6602D442D8C1C0Cf8669B45C4FindManyResponseItemModelWithValidators[]

export type TableName90A9Abdd97D54Ed49E74Fb4774A5B1F3 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonusescffd5D6D333A4666A1A7463Bb50Ae776UpdateManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses5Bd4B66ECbc04D3892F80B7C854A3Af6UpdateManyResponseListModelWithValidators =
	ScoredBonusescffd5D6D333A4666A1A7463Bb50Ae776UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredbonusesPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonuses636623Bc0F3147Cb923308835E1D22D7UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses0E36987342434C5A97Ab3E6114Fae778UpsertManyResponseListModel =
	ScoredBonuses636623Bc0F3147Cb923308835E1D22D7UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredBonusesac2B314FEfa64Fa38Dd9423Ad022635ACreateManyInsertItemRequestModel =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses3Ea8Eec9C15D4941999FEbf0Adbb7F04DeleteManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses22574D5ACec94615850B7884Ba261191DeleteManyResponseListModel =
	ScoredBonuses3Ea8Eec9C15D4941999FEbf0Adbb7F04DeleteManyResponseModelWithValidators[]
export type ScoredBonuses8A8Bb47381304D1D93C5909858307215PatchManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses4Befbfcd8E344F84A77FF7450C445Cc8PatchManyResponseListModelWithValidators =
	ScoredBonuses8A8Bb47381304D1D93C5909858307215PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredbonusesPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ScoredBonusesca40E2CdAe424941B1D01Fb9Ac06D1BfFindOneResponseModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesd06Dea5514C74E4EB08A9Cc03E4286F0GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves207D4D079115456482C841D097C8D4C5GetManyResponseForeignModel
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses04A4577813F243Ef83F08Bfe58E2BcbfFindOneResponseListModel =
	ScoredBonusesca40E2CdAe424941B1D01Fb9Ac06D1BfFindOneResponseModelWithValidators
export type TableName557Ce669A66941F99F0F0Bcbf729Ad18 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses1B36Cbf2263A4C79Abf142B8172FabfdUpdateOneResponseModelWithValidators =
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
export type ScoredBonusesdbc9F9C496C04D639F2403B578Bf7345DeleteOneResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses832C8A5059994Ba792092E638A430E2DPatchOneResponseModelWithValidators =
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
export type ForeignHeat1Bf28C970Dbb4Ab3Bd77Ac67C833F1BdFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat40B331B68Fdd4Bc3A368347A0124Aa54GetManyResponseForeignModel =
	ForeignHeat1Bf28C970Dbb4Ab3Bd77Ac67C833F1BdFindManyResponseItemModelWithValidators[]
export type ForeignAthlete0F8057EcD81C47929F5B008F7454Eb66FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthlete0Fa2E1976Bfd461EB1631E56A7E90565GetManyResponseForeignModel =
	ForeignAthlete0F8057EcD81C47929F5B008F7454Eb66FindManyResponseItemModelWithValidators[]
export type ForeignPhase8D3843A7799444Ad825BF74396386173FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase81502D8D2F9B4535A98BA5F17916A69DGetManyResponseForeignModel =
	ForeignPhase8D3843A7799444Ad825BF74396386173FindManyResponseItemModelWithValidators[]
export type Athleteheatf4Ab2A26A2584F19938D6Edcbc1F1532FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat40B331B68Fdd4Bc3A368347A0124Aa54GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete0Fa2E1976Bfd461EB1631E56A7E90565GetManyResponseForeignModel
		phase_foreign?: ForeignPhase81502D8D2F9B4535A98BA5F17916A69DGetManyResponseForeignModel
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
	}
export type Athleteheat063A79610373427E88C5975F1127Cb91FindManyResponseListModel =

		| Athleteheatf4Ab2A26A2584F19938D6Edcbc1F1532FindManyResponseItemModelWithValidators[]

export type TableName45118Fce76A145039F4BC5Cf7C34C082 =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat267Abd19Df394B36Bbf55A5A8A0397A1UpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type Athleteheatfea8F1B8Fd364Cc4A520Dfad177E997AUpdateManyResponseListModelWithValidators =
	Athleteheat267Abd19Df394B36Bbf55A5A8A0397A1UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthleteheatPut = {
	heat_id: string
	athlete_id: string
	phase_id: string
}
export type Athleteheat36346892Bf2B4912955876493D3AadcaUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type Athleteheat341609393E804F4FAa31B72A454B3Ed0UpsertManyResponseListModel =
	Athleteheat36346892Bf2B4912955876493D3AadcaUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheatb3B9Af7CA00F4A11853A2C8563Bd6Df1CreateManyInsertItemRequestModel =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type Athleteheatb6667Ec7D7144A5CA0Df2B74B2Ee2979DeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type Athleteheat863E4E664F3E433DA0093D6E0548Dad2DeleteManyResponseListModel =
	Athleteheatb6667Ec7D7144A5CA0Df2B74B2Ee2979DeleteManyResponseModelWithValidators[]
export type Athleteheat292Fd50D834A4Ab8Aff1Cae9A741Ee81PatchManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type Athleteheatee476C8B8E9B49Cb81291931B606BdeePatchManyResponseListModelWithValidators =
	Athleteheat292Fd50D834A4Ab8Aff1Cae9A741Ee81PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthleteheatPatch = {
	heat_id?: string
	athlete_id?: string
	phase_id?: string
}
export type Athleteheatc7A5Ee4043B2430683847518Ec359CedFindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat40B331B68Fdd4Bc3A368347A0124Aa54GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete0Fa2E1976Bfd461EB1631E56A7E90565GetManyResponseForeignModel
		phase_foreign?: ForeignPhase81502D8D2F9B4535A98BA5F17916A69DGetManyResponseForeignModel
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type Athleteheat57F9DecbC838415E9FfaC42223856D8CFindOneResponseListModel =
	Athleteheatc7A5Ee4043B2430683847518Ec359CedFindOneResponseModelWithValidators
export type TableName61E4149354Df49Da8A50Fe29Ee390658 =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat947035E6Acee43A8B0AcDe20Cbe72279UpdateOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type BodyEntireUpdateByPrimaryKeyAthleteheatIdPut = {
	heat_id: string
	athlete_id: string
	phase_id: string
}
export type Athleteheat3C602A8F81Cf4027A91CEbb8Ba330605DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type Athleteheat4Bcffa0EAacd486B868534805D6E095DPatchOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
	}
export type BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch = {
	heat_id?: string
	athlete_id?: string
	phase_id?: string
}
export const {
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation,
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatScoresGetHeatScoresHeatIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery,
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation,
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
	useGetManyHeatGetQuery,
	useEntireUpdateManyByQueryHeatPutMutation,
	useInsertManyHeatPostMutation,
	useDeleteManyByQueryHeatDeleteMutation,
	usePartialUpdateManyByQueryHeatPatchMutation,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	useEntireUpdateByPrimaryKeyHeatIdPutMutation,
	useDeleteOneByPrimaryKeyHeatIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyHeatIdPatchMutation,
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
	useRootGetQuery
} = injectedRtkApi
