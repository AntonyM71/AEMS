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
		phasePdfPhasePdfPhaseIdGet: build.query<
			PhasePdfPhasePdfPhaseIdGetApiResponse,
			PhasePdfPhasePdfPhaseIdGetApiArg
		>({
			query: (queryArg) => ({ url: `/phase_pdf/${queryArg.phaseId}` })
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
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList,
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
					phase_id____list: queryArg.phaseIdList,
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList
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
					phase_id____list: queryArg.phaseIdList,
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList
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
					phase_id____list: queryArg.phaseIdList,
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList
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
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList,
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
					phase_id____list: queryArg.phaseIdList,
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList
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
					phase_id____list: queryArg.phaseIdList,
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList
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
					phase_id____list: queryArg.phaseIdList,
					last_phase_rank____from_____comparison_operator:
						queryArg.lastPhaseRankFromComparisonOperator,
					last_phase_rank____to_____comparison_operator:
						queryArg.lastPhaseRankToComparisonOperator,
					last_phase_rank____from: queryArg.lastPhaseRankFrom,
					last_phase_rank____to: queryArg.lastPhaseRankTo,
					last_phase_rank____list_____comparison_operator:
						queryArg.lastPhaseRankListComparisonOperator,
					last_phase_rank____list: queryArg.lastPhaseRankList
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
export type PhasePdfPhasePdfPhaseIdGetApiResponse =
	/** status 200 Successful Response */ any
export type PhasePdfPhasePdfPhaseIdGetApiArg = {
	phaseId: string
}
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competitionb338F7Ba3E184670Bebd8F617Be140C2FindManyResponseListModel
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
	joinForeignTable?: TableName71Aa19Ab5D2B4Ed0B571Bec71864B819[]
}
export type EntireUpdateManyByQueryCompetitionPutApiResponse =
	/** status 200 Successful Response */ Competition6Ba3E12A11Aa4Eb3A3569440Fe06Df29UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Competition46Ec4Eb850204774B612Bd49557Edf3CUpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	body: Competition87E057Cc2227488282Ed87B94Eb5Add5CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryCompetitionDeleteApiResponse =
	/** status 200 Successful Response */ Competitionc4B77765F1C84B81A78FEa0F70C793FeDeleteManyResponseListModel
export type DeleteManyByQueryCompetitionDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryCompetitionPatchApiResponse =
	/** status 200 Successful Response */ Competitiond119F50EB79B4C2598Ad560Bada2582FPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Competitionda692Ba2A5954E8588FfCde43Dd09D89FindOneResponseListModel
export type GetOneByPrimaryKeyCompetitionIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName7Ac5976B8D344Ff88Aa4F9Dc7910A631[]
}
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse =
	/** status 200 Successful Response */ Competition3E2C8C04518945D0Bc6142Cd06E7B8A9UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse =
	/** status 200 Successful Response */ Competitionb7C9814ED1Bf4525Ae295876A7075710DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competition325Af67DC13C4EfbA85D477C548A02C7PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIdb80Df2E2C7Ae4395B2C687E8D3Dc3E67FindOneResponseListModel
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg =
	{
		competitionPkId: string
		eventPkId: string
		nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
		nameStr?: string[]
		nameListComparisonOperator?: ItemComparisonOperators
		nameList?: string[]
		joinForeignTable?: TableName36799Cea31E545E3B745C2Dedc06B9Cc[]
	}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId44Ca2Be48A2F4C26981E0Aaea2981889FindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamef2A262E03Fbc47BeBaf7Fa402Fbc650F[]
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Eventc50D938602714596814974Ced475E301FindManyResponseListModel
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
	joinForeignTable?: TableNamedbbd230095144E4386CbAa316A5Ccaf7[]
}
export type EntireUpdateManyByQueryEventPutApiResponse =
	/** status 200 Successful Response */ Eventf2171E457634410E84941F2B8322B87BUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Eventea46938408014A21Ac4910C50Bd8Fe28UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	body: Event040Eb16D53Af4135B24A26969Cc83Ad8CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryEventDeleteApiResponse =
	/** status 200 Successful Response */ Event9543Da552C2D4C3AA1EbD6419Ea9Eeb9DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Event8E65Bee2F56E4Ae68C96409A87D56147PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Event33D3523EC7E843EeA18BB933325C0033FindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName20B4A128Cb1C426CB5A424441874Ca6E[]
}
export type EntireUpdateByPrimaryKeyEventIdPutApiResponse =
	/** status 200 Successful Response */ Event5C934563157341859D24Eccaf9Ae4Fa5UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Eventbb71C1FfE387496F89E0308E0744D9CbDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Eventba51629131A64Ec9A3560C4449225E50PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ EventIdPhaseIdc46075488079455BA5731D7Fad7549C7FindOneResponseListModel
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
	joinForeignTable?: TableNameb1297811E5A14C80B51755D0207C1C74[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseId0Eeb922A597E43B38D1DBb211F27Ff25FindManyResponseListModel
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
	joinForeignTable?: TableNamec07Eb482Ea1045A494B5C8E683C5B6Df[]
}
export type GetManyPhaseGetApiResponse =
	/** status 200 Successful Response */ Phaseea9BcecfDd7A43D1B83DDab7E83D45C6FindManyResponseListModel
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
	joinForeignTable?: TableName6A8F1Ca5D68142D48879D67E0Eee579D[]
}
export type EntireUpdateManyByQueryPhasePutApiResponse =
	/** status 200 Successful Response */ Phase56F2D82FDe88498CB6A3B96De834948AUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Phase81Fdae2FD5Bf4F44A7426A706223D686UpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	body: Phase008248B4B09E4265Bd4EA320C999D683CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryPhaseDeleteApiResponse =
	/** status 200 Successful Response */ Phase16A66Ef0C0Fc4D9DA15F31Dea5443D6EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Phasea72C5332C55448B78451780435A66BcdPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Phasecf563E97Bc4649Bb893D41907B555Dd5FindOneResponseListModel
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
	joinForeignTable?: TableName00F5402FC2Cf4Bc68216Ecc080F8B1D0[]
}
export type EntireUpdateByPrimaryKeyPhaseIdPutApiResponse =
	/** status 200 Successful Response */ Phasec58C44551C144E0F92BfF72999B25476UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phase86Daebad68E54B768235B3Facb6Ed6DaDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phasee66429Fe5A6F491EB6FdEc129Eb877DcPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat40Fab8Dd9Ffa4E6BB1365F49B0Df9804FindManyResponseListModel
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
	joinForeignTable?: TableName8E9B6047473C4280A6D2348F6E1Efd75[]
}
export type EntireUpdateManyByQueryHeatPutApiResponse =
	/** status 200 Successful Response */ Heatc4Bc2752Edd94060Be7216Cbe7E83E1FUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Heat5A5696EeFd7C4Ff7A117988A4493Bee6UpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	body: Heat127Cbe5B9C5C4D78Bf65A6Ed6Fe06352CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryHeatDeleteApiResponse =
	/** status 200 Successful Response */ Heat0Dbe74646E534C6B966E0Bace55Bb32EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Heat19C6Bc59358D453B80350007144619B1PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Heat6B096Aa9Bdf141Aa9Fe3Ed8E933C59F5FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName74Af1B2BE8C2432991F92A7D0A2D1024[]
}
export type EntireUpdateByPrimaryKeyHeatIdPutApiResponse =
	/** status 200 Successful Response */ Heatcd535098Fa8F433E85B32Af6B956F7FeUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat10F960302B1648Bd946139D9Cb199458DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat31C4769BB9374D4E94BbAd8Beb439E17PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athlete2D2C69E18C434C3BB205A8C1Fe1Aa64CFindManyResponseListModel
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
	joinForeignTable?: TableNamee9F3Ae872E884Cb4B90BEebab2A0215E[]
}
export type EntireUpdateManyByQueryAthletePutApiResponse =
	/** status 200 Successful Response */ Athlete35Bc0E760D5347D78327E952F64692E8UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Athlete7A1691EfC80C43E19B1D9Eb0Eb31C1DdUpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	body: Athleteaf166779Ac5A44C6Ac08Ed88B9695164CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteDeleteApiResponse =
	/** status 200 Successful Response */ Athlete381D03D21F694D63B9554317F4D8Bd3FDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Athlete8Dc0Cab4371343F4Bada1E208374A14BPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Athletec6D964CcD17047E3BeffE90A91F4E7C0FindOneResponseListModel
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
	joinForeignTable?: TableNameb719158E2593416CAf1DDd40F6C68Dc3[]
}
export type EntireUpdateByPrimaryKeyAthleteIdPutApiResponse =
	/** status 200 Successful Response */ Athleteac1Ea8E1456B4F9DA0D78Ca5B07E264BUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athletedec93A960239496193A6680D0F8Ad5D1DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athletea14D8D5F2Cd34Bd09B481A4Fefb2186EPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheet5Fc2A4330Bc34E05A26F4B7E6942B85CFindManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheet01Beca44921B4255A91A06Afa2D9A39DUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoreSheet66820273452F48F88Ca592B69Bfe0804UpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	body: ScoreSheet1161F3A6Fcff460DAaa74Af2F5B387A2CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoresheetDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheetd4F3A2A4F5Ce48FbBd54F8Bf9997A122DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheetfe4A455EE836451F9F73Cdb92E19F6A0PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheet918Fc45A43Fb4469B6B08Db1D4C54E90FindOneResponseListModel
export type GetOneByPrimaryKeyScoresheetIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiResponse =
	/** status 200 Successful Response */ ScoreSheet6C4Db48AB7Fb4F2F9Cf8F29288Dd671EUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheeta71543A2459C42B0Bcc73A5D39B58482DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiResponse =
	/** status 200 Successful Response */ ScoreSheet2Df1A49FF6Ec46A89Be6849423E9Fd5EPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMovese8E48Ef6C1C94453A5163B4Fb02Bc5B1FindManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves53125C19C18341Cd88D0104Ff419Ff67UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableMovesb185Aae9A7Ce4227Bdd492C6092D5F7DUpsertManyResponseListModel
export type InsertManyAvailablemovesPostApiArg = {
	body: AvailableMoves2C585B7AF50D458CA8D44Cbc9026251BCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablemovesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMoves639145B7Ea8146089F5A511938De092EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves1F4189De18F04Ae3A03F9Dce634E5572PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableMoves0Ab9Fba2E11F415DB094881955Ae6D46FindOneResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves00Cbf240247D4A678707C321Fee31C36UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMovesb4F7246D429A40E28F98747C2Ebf3Cf6DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMovesd0Bffb23E71349919Ab48111Bde33068PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses5053Fa021B9248Af9Ee648122888Ded3FindManyResponseListModel
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
	joinForeignTable?: TableNamef4Cb7Cce81D8494DA26A0171E16A901C[]
}
export type EntireUpdateManyByQueryAvailablebonusesPutApiResponse =
	/** status 200 Successful Response */ AvailableBonusesbc4F5B4C9Be547169F9AC91Afdb7A9B2UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableBonuses1Ce28A4A1A934326A1E69D16D26F802FUpsertManyResponseListModel
export type InsertManyAvailablebonusesPostApiArg = {
	body: AvailableBonusesf01F86F18Adc4674A841106D9584Eea6CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablebonusesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableBonusesf6603D44A650469CA56B77Dae1135E0EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonusesb9Eede9C909E4441B793067080061733PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses559Ba51C82Be4D9C920DF81Ef0Fb6B82FindOneResponseListModel
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
	joinForeignTable?: TableNamed652A552803D48A8B24D133Cbdc650F2[]
}
export type EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableBonuses66E14162Fa414Fa9922FDd4Db62Ecc5FUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses33Bfc87AF6A94Fb09045984E17648B5FDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses2E17828BE27E4Ec692791096D3Ff046DPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves23Fd834BBed446F69B1C3Fac8F528F9CFindManyResponseListModel
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
	joinForeignTable?: TableNamed2735985F40440D2974E39927817E7A4[]
}
export type EntireUpdateManyByQueryScoredmovesPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves82C46D9CD8C64Ede81724F47F1A03E4AUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredMoves257545547E5F4Da8Accc57E573551Fb5UpsertManyResponseListModel
export type InsertManyScoredmovesPostApiArg = {
	body: ScoredMovesb154Bf4188A14401Bdc4B65C4586E271CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMovesd37866534E134406Ab40A16970038E3CDeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredMoves9Da761D572064Be5839E30512223881EPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves33E60Ed09B5A44229Afc7627Bae19Db9FindOneResponseListModel
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
	joinForeignTable?: TableName09E59100A6B1490F9Db937120666010E[]
}
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves108Fea0718064827Ac80175C042933D6UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoveseaa8B0E1357F4E4688A7Afdd388Cdd8CDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves6Eb533Fc34F3492F9D38273E8F6Efb57PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonusesbd95622E0Cd64Aa0913E9291D69Bbae2FindManyResponseListModel
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
	joinForeignTable?: TableName31A9F7053813424DA6Bd8E38D448Fe3C[]
}
export type EntireUpdateManyByQueryScoredbonusesPutApiResponse =
	/** status 200 Successful Response */ ScoredBonusesbdf7A297975F4Dc3B11D270Ffdadec47UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredBonuses199525Eb280540799233C317A5E7E0EaUpsertManyResponseListModel
export type InsertManyScoredbonusesPostApiArg = {
	body: ScoredBonuses27F0F58B88C54A4EA982Db9F9C8E508ACreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredbonusesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredBonuses80A03273B5764E69Aa7C3Bd2Bf3D1711DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredBonusese5269F09621B4F7B9D0AFb51Eb2De019PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses55413519050A4F3F92Be8Dbb19F20D2EFindOneResponseListModel
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
	joinForeignTable?: TableName4Ac414Cf68E94A59BacfE5Eb7Ca1C62A[]
}
export type EntireUpdateByPrimaryKeyScoredbonusesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses77E295B0Eb0D4B42B022F1Cca8C83F4BUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses765A7A2F696042CdB73AE0614852Da77DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses959F3Fd9A2B44D80Bcef298D0936E010PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat62570E01B44B43549142C7E6092B48B1FindManyResponseListModel
export type GetManyAthleteheatGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'heat_id', 'athlete_id', 'phase_id', 'last_phase_rank'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableNamee8257874D50C4D0D8F5628A6D73Ca22B[]
}
export type EntireUpdateManyByQueryAthleteheatPutApiResponse =
	/** status 200 Successful Response */ Athleteheate395F22E8E674Dfe9E2BF36Fe8Ea45A8UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryAthleteheatPutApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
	bodyEntireUpdateManyByQueryAthleteheatPut: BodyEntireUpdateManyByQueryAthleteheatPut
}
export type InsertManyAthleteheatPostApiResponse =
	/** status 201 Successful Response */ Athleteheat360Caacf8664434D80B8664E1Db3F112UpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	body: Athleteheatcce13A7DFd8E4B13910AE3B5B3A8483ECreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteheatDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheate90Def12Ff194Ef9Af1DC79Fc662C602DeleteManyResponseListModel
export type DeleteManyByQueryAthleteheatDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
}
export type PartialUpdateManyByQueryAthleteheatPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat7C6971Cc065741Fe842C2E4Bc89C8C6FPatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryAthleteheatPatchApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
	bodyPartialUpdateManyByQueryAthleteheatPatch: BodyPartialUpdateManyByQueryAthleteheatPatch
}
export type GetOneByPrimaryKeyAthleteheatIdGetApiResponse =
	/** status 200 Successful Response */ Athleteheat8641Dd58Afbe4F3BBa3491Ac807Da2D6FindOneResponseListModel
export type GetOneByPrimaryKeyAthleteheatIdGetApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
	joinForeignTable?: TableNamed5786Dfc3Ffb47069714F095Dc78D2Eb[]
}
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiResponse =
	/** status 200 Successful Response */ Athleteheat87709A0A4B404883Aabd17Eb074F1Ca0UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
	bodyEntireUpdateByPrimaryKeyAthleteheatIdPut: BodyEntireUpdateByPrimaryKeyAthleteheatIdPut
}
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheatd784686B89434851Ab9C4F85C69428A9DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyAthleteheatIdDeleteApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat59B14306A1D3483385E3D115E6D184E6PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiArg = {
	id: string
	heatIdListComparisonOperator?: ItemComparisonOperators
	heatIdList?: string[]
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	phaseIdListComparisonOperator?: ItemComparisonOperators
	phaseIdList?: string[]
	lastPhaseRankFromComparisonOperator?: RangeFromComparisonOperators
	lastPhaseRankToComparisonOperator?: RangeToComparisonOperators
	lastPhaseRankFrom?: number
	lastPhaseRankTo?: number
	lastPhaseRankListComparisonOperator?: ItemComparisonOperators
	lastPhaseRankList?: number[]
	bodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch: BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch
}
export type RootGetApiResponse = /** status 200 Successful Response */ any
export type RootGetApiArg = void
export type HeatInfoResponse = {
	athlete_heat_id: string
	heat_id: string
	athlete_id: string
	phase_id: string
	number_of_runs: number
	number_of_runs_for_score: number
	scoresheet: string
	first_name: string
	last_name: string
	bib: string
	last_phase_rank?: number
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
	direction: "L" | "R" | "F" | "B" | "S"
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
	last_phase_rank?: number
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
	direction: "LR" | "FB" | "S"
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
export type ForeignEventd4Ed487F0Ca64A018A480Ab92Bd1Ea59FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent5E7C5A3364004CabB6273C2361B68D11GetManyResponseForeignModel =
	ForeignEventd4Ed487F0Ca64A018A480Ab92Bd1Ea59FindManyResponseItemModelWithValidators[]
export type Competition5A4A51329C62461C87187Ae80862E39DFindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent5E7C5A3364004CabB6273C2361B68D11GetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competitionb338F7Ba3E184670Bebd8F617Be140C2FindManyResponseListModel =

		| Competition5A4A51329C62461C87187Ae80862E39DFindManyResponseItemModelWithValidators[]

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
export type TableName71Aa19Ab5D2B4Ed0B571Bec71864B819 = "event"
export type Competitionc6E03418967D4B53B2000A495109B5B8UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition6Ba3E12A11Aa4Eb3A3569440Fe06Df29UpdateManyResponseListModelWithValidators =
	Competitionc6E03418967D4B53B2000A495109B5B8UpdateManyResponseModelWithValidators[]
export type Competitioncee63D3FA6C44Be1Ab69Da4A30F1843FUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type Competition46Ec4Eb850204774B612Bd49557Edf3CUpsertManyResponseListModel =
	Competitioncee63D3FA6C44Be1Ab69Da4A30F1843FUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition87E057Cc2227488282Ed87B94Eb5Add5CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type Competition1Cbd55F544B54C3DA6B2667Ff6Ac8040DeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitionc4B77765F1C84B81A78FEa0F70C793FeDeleteManyResponseListModel =
	Competition1Cbd55F544B54C3DA6B2667Ff6Ac8040DeleteManyResponseModelWithValidators[]
export type Competition3Ce4Ed7136C3457ABa34A0E85D894653PatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitiond119F50EB79B4C2598Ad560Bada2582FPatchManyResponseListModelWithValidators =
	Competition3Ce4Ed7136C3457ABa34A0E85D894653PatchManyResponseModelWithValidators[]
export type Competitionba4Fccc14Fb843509D7E4Fc24Fdcd195FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent5E7C5A3364004CabB6273C2361B68D11GetManyResponseForeignModel
		id: string
		name: string
	}
export type Competitionda692Ba2A5954E8588FfCde43Dd09D89FindOneResponseListModel =
	Competitionba4Fccc14Fb843509D7E4Fc24Fdcd195FindOneResponseModelWithValidators
export type TableName7Ac5976B8D344Ff88Aa4F9Dc7910A631 = "event"
export type Competition3E2C8C04518945D0Bc6142Cd06E7B8A9UpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitionb7C9814ED1Bf4525Ae295876A7075710DeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition325Af67DC13C4EfbA85D477C548A02C7PatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ForeignCompetition665FcadcE57E45229DabFc924Ed9E3D3FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionccf9401466F54Df49B46B24Eb10CefffGetManyResponseForeignModel =
	ForeignCompetition665FcadcE57E45229DabFc924Ed9E3D3FindManyResponseItemModelWithValidators[]
export type ForeignPhasecabc13D5Cac744D6A8Bc94941Dee085BFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhasee85405234Afa4A468E9F86301625Cb61GetManyResponseForeignModel =
	ForeignPhasecabc13D5Cac744D6A8Bc94941Dee085BFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventIdc00E1E0D4481497184812E95Ccb5Cf3EFindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetitionccf9401466F54Df49B46B24Eb10CefffGetManyResponseForeignModel
		phase_foreign?: ForeignPhasee85405234Afa4A468E9F86301625Cb61GetManyResponseForeignModel
	}
export type CompetitionIdEventIdb80Df2E2C7Ae4395B2C687E8D3Dc3E67FindOneResponseListModel =
	CompetitionIdEventIdc00E1E0D4481497184812E95Ccb5Cf3EFindOneResponseModelWithValidators
export type TableName36799Cea31E545E3B745C2Dedc06B9Cc = "competition" | "phase"
export type ForeignCompetitionb6690B3772114648B22A2C552E7E2076FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition41Fe9E39E2Bb4111A571C985E8Bfcb39GetManyResponseForeignModel =
	ForeignCompetitionb6690B3772114648B22A2C552E7E2076FindManyResponseItemModelWithValidators[]
export type ForeignPhase4Bfec3016Bf449118Edb62566Dcf95A3FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase7F57002148F7456EBe830F94E4E2Ed0CGetManyResponseForeignModel =
	ForeignPhase4Bfec3016Bf449118Edb62566Dcf95A3FindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId8Aef07Fc62D5436DAad54117D260Ceb4FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition41Fe9E39E2Bb4111A571C985E8Bfcb39GetManyResponseForeignModel
		phase_foreign?: ForeignPhase7F57002148F7456EBe830F94E4E2Ed0CGetManyResponseForeignModel
	}
export type CompetitionIdEventId44Ca2Be48A2F4C26981E0Aaea2981889FindManyResponseListModel =

		| CompetitionIdEventId8Aef07Fc62D5436DAad54117D260Ceb4FindOneResponseModelWithValidators[]

export type TableNamef2A262E03Fbc47BeBaf7Fa402Fbc650F = "competition" | "phase"
export type ForeignCompetitione785B73D69Bb4475A4F3437E30525Ce2FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionfe2932CdB6F8445192107F601Fbe398DGetManyResponseForeignModel =
	ForeignCompetitione785B73D69Bb4475A4F3437E30525Ce2FindManyResponseItemModelWithValidators[]
export type ForeignPhasea2C69B8992E243F59012Ff6152081757FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase3613Ae57946B4C17B3975B67A3Ce9BccGetManyResponseForeignModel =
	ForeignPhasea2C69B8992E243F59012Ff6152081757FindManyResponseItemModelWithValidators[]
export type Eventc226560DE9Ce4E0BA57AA284F19F6126FindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionfe2932CdB6F8445192107F601Fbe398DGetManyResponseForeignModel
		phase_foreign?: ForeignPhase3613Ae57946B4C17B3975B67A3Ce9BccGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Eventc50D938602714596814974Ced475E301FindManyResponseListModel =
	| Eventc226560DE9Ce4E0BA57AA284F19F6126FindManyResponseItemModelWithValidators[]

export type TableNamedbbd230095144E4386CbAa316A5Ccaf7 = "competition" | "phase"
export type Event3B18C30AC33D44Fb9Af7Fc6566C2A960UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventf2171E457634410E84941F2B8322B87BUpdateManyResponseListModelWithValidators =
	Event3B18C30AC33D44Fb9Af7Fc6566C2A960UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryEventPut = {
	competition_id: string
	name: string
}
export type Event2D66869B7A8A4898Acd8133787589F4BUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventea46938408014A21Ac4910C50Bd8Fe28UpsertManyResponseListModel =
	Event2D66869B7A8A4898Acd8133787589F4BUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Event040Eb16D53Af4135B24A26969Cc83Ad8CreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event9B8Acac0A9284Fdf88Ba7607074Bb9E9DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event9543Da552C2D4C3AA1EbD6419Ea9Eeb9DeleteManyResponseListModel =
	Event9B8Acac0A9284Fdf88Ba7607074Bb9E9DeleteManyResponseModelWithValidators[]
export type Eventb8E455D871144217Ad291Fb740554534PatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event8E65Bee2F56E4Ae68C96409A87D56147PatchManyResponseListModelWithValidators =
	Eventb8E455D871144217Ad291Fb740554534PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryEventPatch = {
	competition_id?: string
	name?: string
}
export type Event52Dca6120B3449C4B60FA2E38F128923FindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionfe2932CdB6F8445192107F601Fbe398DGetManyResponseForeignModel
		phase_foreign?: ForeignPhase3613Ae57946B4C17B3975B67A3Ce9BccGetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Event33D3523EC7E843EeA18BB933325C0033FindOneResponseListModel =
	Event52Dca6120B3449C4B60FA2E38F128923FindOneResponseModelWithValidators
export type TableName20B4A128Cb1C426CB5A424441874Ca6E = "competition" | "phase"
export type Event5C934563157341859D24Eccaf9Ae4Fa5UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyEventIdPut = {
	competition_id: string
	name: string
}
export type Eventbb71C1FfE387496F89E0308E0744D9CbDeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventba51629131A64Ec9A3560C4449225E50PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyEventIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignEvent729Fc2F6D97949F6B99322Fdd2D5Ad71FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent67B0D1D369F442D4998E765B3Fedce11GetManyResponseForeignModel =
	ForeignEvent729Fc2F6D97949F6B99322Fdd2D5Ad71FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatbc06C8F326694Bfd9Ac5F0Da42941Fd3FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat3E25A1C68379474D8400Ca9Be5D7D717GetManyResponseForeignModel =
	ForeignAthleteheatbc06C8F326694Bfd9Ac5F0Da42941Fd3FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId52A022429Da947Cb9Ec8197Cbeeae62CFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEvent67B0D1D369F442D4998E765B3Fedce11GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat3E25A1C68379474D8400Ca9Be5D7D717GetManyResponseForeignModel
	}
export type EventIdPhaseIdc46075488079455BA5731D7Fad7549C7FindOneResponseListModel =
	EventIdPhaseId52A022429Da947Cb9Ec8197Cbeeae62CFindOneResponseModelWithValidators
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableNameb1297811E5A14C80B51755D0207C1C74 = "event" | "athleteheat"
export type ForeignEvent20B085F1B0C94B0CA1B526925E8Cf568FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventbf1A4F7DF71C42B5938B092F1Afc8114GetManyResponseForeignModel =
	ForeignEvent20B085F1B0C94B0CA1B526925E8Cf568FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat53D1C8419B844Fa2937C0408Cdbb46DcFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat16042E6AB6244B3C919F16Bdcf4B1C27GetManyResponseForeignModel =
	ForeignAthleteheat53D1C8419B844Fa2937C0408Cdbb46DcFindManyResponseItemModelWithValidators[]
export type EventIdPhaseId798C59BeF9944Ef2912468E9A01B48CaFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEventbf1A4F7DF71C42B5938B092F1Afc8114GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat16042E6AB6244B3C919F16Bdcf4B1C27GetManyResponseForeignModel
	}
export type EventIdPhaseId0Eeb922A597E43B38D1DBb211F27Ff25FindManyResponseListModel =

		| EventIdPhaseId798C59BeF9944Ef2912468E9A01B48CaFindOneResponseModelWithValidators[]

export type TableNamec07Eb482Ea1045A494B5C8E683C5B6Df = "event" | "athleteheat"
export type ForeignEventd24A2Ef9D6D24A949A2D3367C9908F50FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent47F7571901Fb403B9Ac9Af0F35Cc07EaGetManyResponseForeignModel =
	ForeignEventd24A2Ef9D6D24A949A2D3367C9908F50FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatd319A1B87A954B6AB0B795Ab485D2BacFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatbe84009F142B4D79983A31Ab350B3E4EGetManyResponseForeignModel =
	ForeignAthleteheatd319A1B87A954B6AB0B795Ab485D2BacFindManyResponseItemModelWithValidators[]
export type Phase5C99B8B0D4464588B1EcD94Ba6998098FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent47F7571901Fb403B9Ac9Af0F35Cc07EaGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatbe84009F142B4D79983A31Ab350B3E4EGetManyResponseForeignModel
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type Phaseea9BcecfDd7A43D1B83DDab7E83D45C6FindManyResponseListModel =
	| Phase5C99B8B0D4464588B1EcD94Ba6998098FindManyResponseItemModelWithValidators[]

export type TableName6A8F1Ca5D68142D48879D67E0Eee579D = "event" | "athleteheat"
export type Phaseeb1338C770Ec487F8817A07510466484UpdateManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase56F2D82FDe88498CB6A3B96De834948AUpdateManyResponseListModelWithValidators =
	Phaseeb1338C770Ec487F8817A07510466484UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryPhasePut = {
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
}
export type Phase053Dd597Bf8D4C99Bf938Dee61Aa13DeUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase81Fdae2FD5Bf4F44A7426A706223D686UpsertManyResponseListModel =
	Phase053Dd597Bf8D4C99Bf938Dee61Aa13DeUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase008248B4B09E4265Bd4EA320C999D683CreateManyInsertItemRequestModel =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase0Df092Df494E4752A69E7Be3D5044363DeleteManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase16A66Ef0C0Fc4D9DA15F31Dea5443D6EDeleteManyResponseListModel =
	Phase0Df092Df494E4752A69E7Be3D5044363DeleteManyResponseModelWithValidators[]
export type Phase467Df4B33F534829A399C1E6F836009CPatchManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasea72C5332C55448B78451780435A66BcdPatchManyResponseListModelWithValidators =
	Phase467Df4B33F534829A399C1E6F836009CPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryPhasePatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	number_of_judges?: number
	scoresheet?: string
}
export type Phase0277481653824476933B80Ade1Addc31FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent47F7571901Fb403B9Ac9Af0F35Cc07EaGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatbe84009F142B4D79983A31Ab350B3E4EGetManyResponseForeignModel
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasecf563E97Bc4649Bb893D41907B555Dd5FindOneResponseListModel =
	Phase0277481653824476933B80Ade1Addc31FindOneResponseModelWithValidators
export type TableName00F5402FC2Cf4Bc68216Ecc080F8B1D0 = "event" | "athleteheat"
export type Phasec58C44551C144E0F92BfF72999B25476UpdateOneResponseModelWithValidators =
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
export type Phase86Daebad68E54B768235B3Facb6Ed6DaDeleteOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasee66429Fe5A6F491EB6FdEc129Eb877DcPatchOneResponseModelWithValidators =
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
export type ForeignAthleteheat6F21B851771A49BbB8A0D3Eef396Dbf4FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat790C615BDaa74Ad8B2B0093768E2732AGetManyResponseForeignModel =
	ForeignAthleteheat6F21B851771A49BbB8A0D3Eef396Dbf4FindManyResponseItemModelWithValidators[]
export type Heat97Efa8CcF2954Dc7Af47C0D7D149Af9AFindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat790C615BDaa74Ad8B2B0093768E2732AGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heat40Fab8Dd9Ffa4E6BB1365F49B0Df9804FindManyResponseListModel =
	| Heat97Efa8CcF2954Dc7Af47C0D7D149Af9AFindManyResponseItemModelWithValidators[]

export type TableName8E9B6047473C4280A6D2348F6E1Efd75 = "athleteheat"
export type Heat9176403ADc394454B90C254C28C65007UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heatc4Bc2752Edd94060Be7216Cbe7E83E1FUpdateManyResponseListModelWithValidators =
	Heat9176403ADc394454B90C254C28C65007UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryHeatPut = {
	competition_id: string
	name: string
}
export type Heatd8Dc3E2D28E34284B22728793292B71DUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat5A5696EeFd7C4Ff7A117988A4493Bee6UpsertManyResponseListModel =
	Heatd8Dc3E2D28E34284B22728793292B71DUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat127Cbe5B9C5C4D78Bf65A6Ed6Fe06352CreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat8C6359C9F158418DBdd05679C914F626DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat0Dbe74646E534C6B966E0Bace55Bb32EDeleteManyResponseListModel =
	Heat8C6359C9F158418DBdd05679C914F626DeleteManyResponseModelWithValidators[]
export type Heat52C368Ea116945D7B4B08C5Fc84Ca16EPatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat19C6Bc59358D453B80350007144619B1PatchManyResponseListModelWithValidators =
	Heat52C368Ea116945D7B4B08C5Fc84Ca16EPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryHeatPatch = {
	competition_id?: string
	name?: string
}
export type Heat2Ff6849DC8434C7494B6824F2Bf36387FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat790C615BDaa74Ad8B2B0093768E2732AGetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Heat6B096Aa9Bdf141Aa9Fe3Ed8E933C59F5FindOneResponseListModel =
	Heat2Ff6849DC8434C7494B6824F2Bf36387FindOneResponseModelWithValidators
export type TableName74Af1B2BE8C2432991F92A7D0A2D1024 = "athleteheat"
export type Heatcd535098Fa8F433E85B32Af6B956F7FeUpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyHeatIdPut = {
	competition_id: string
	name: string
}
export type Heat10F960302B1648Bd946139D9Cb199458DeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat31C4769BB9374D4E94BbAd8Beb439E17PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyHeatIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignAthleteheatf70D2841D472415181C9767Baa327B4CFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat8E4569D9Ea1C4F74B450Fdd55626417CGetManyResponseForeignModel =
	ForeignAthleteheatf70D2841D472415181C9767Baa327B4CFindManyResponseItemModelWithValidators[]
export type Athlete71Cd49Be91E44E66Abb421B95759406EFindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat8E4569D9Ea1C4F74B450Fdd55626417CGetManyResponseForeignModel
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type Athlete2D2C69E18C434C3BB205A8C1Fe1Aa64CFindManyResponseListModel =
	| Athlete71Cd49Be91E44E66Abb421B95759406EFindManyResponseItemModelWithValidators[]

export type TableNamee9F3Ae872E884Cb4B90BEebab2A0215E = "athleteheat"
export type Athlete75Cb4D67D9F84Ae286EaAdf5Addce6C6UpdateManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete35Bc0E760D5347D78327E952F64692E8UpdateManyResponseListModelWithValidators =
	Athlete75Cb4D67D9F84Ae286EaAdf5Addce6C6UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthletePut = {
	first_name: string
	last_name: string
	bib: string
}
export type Athlete07341Dc5C83B46838A6076Ba1A59Ea46UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete7A1691EfC80C43E19B1D9Eb0Eb31C1DdUpsertManyResponseListModel =
	Athlete07341Dc5C83B46838A6076Ba1A59Ea46UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteaf166779Ac5A44C6Ac08Ed88B9695164CreateManyInsertItemRequestModel =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete9C10Ceb8E6Dc449D997664Baee95B331DeleteManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete381D03D21F694D63B9554317F4D8Bd3FDeleteManyResponseListModel =
	Athlete9C10Ceb8E6Dc449D997664Baee95B331DeleteManyResponseModelWithValidators[]
export type Athleteeddddac1Dc844B98B6Ff294024617573PatchManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete8Dc0Cab4371343F4Bada1E208374A14BPatchManyResponseListModelWithValidators =
	Athleteeddddac1Dc844B98B6Ff294024617573PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthletePatch = {
	first_name?: string
	last_name?: string
	bib?: string
}
export type Athlete619C642088B84Cb8A1Ad6438Fbb3695FFindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat8E4569D9Ea1C4F74B450Fdd55626417CGetManyResponseForeignModel
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athletec6D964CcD17047E3BeffE90A91F4E7C0FindOneResponseListModel =
	Athlete619C642088B84Cb8A1Ad6438Fbb3695FFindOneResponseModelWithValidators
export type TableNameb719158E2593416CAf1DDd40F6C68Dc3 = "athleteheat"
export type Athleteac1Ea8E1456B4F9DA0D78Ca5B07E264BUpdateOneResponseModelWithValidators =
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
export type Athletedec93A960239496193A6680D0F8Ad5D1DeleteOneResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athletea14D8D5F2Cd34Bd09B481A4Fefb2186EPatchOneResponseModelWithValidators =
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
export type ScoreSheet2353D67752584174Add647Fe99053626FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheet5Fc2A4330Bc34E05A26F4B7E6942B85CFindManyResponseListModel =

		| ScoreSheet2353D67752584174Add647Fe99053626FindManyResponseItemModelWithValidators[]

export type ScoreSheet0A4F76F6B5534901Baa09F629A45D72FUpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet01Beca44921B4255A91A06Afa2D9A39DUpdateManyResponseListModelWithValidators =
	ScoreSheet0A4F76F6B5534901Baa09F629A45D72FUpdateManyResponseModelWithValidators[]
export type ScoreSheetac66E53C914B4D91960E38927A7E0847UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet66820273452F48F88Ca592B69Bfe0804UpsertManyResponseListModel =
	ScoreSheetac66E53C914B4D91960E38927A7E0847UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheet1161F3A6Fcff460DAaa74Af2F5B387A2CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type ScoreSheet8Ceb211CBfb841479Fb25F4D3Ca73Fc4DeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetd4F3A2A4F5Ce48FbBd54F8Bf9997A122DeleteManyResponseListModel =
	ScoreSheet8Ceb211CBfb841479Fb25F4D3Ca73Fc4DeleteManyResponseModelWithValidators[]
export type ScoreSheetb8A8D7842005465F8Fdd79535905358DPatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetfe4A455EE836451F9F73Cdb92E19F6A0PatchManyResponseListModelWithValidators =
	ScoreSheetb8A8D7842005465F8Fdd79535905358DPatchManyResponseModelWithValidators[]
export type ScoreSheetb5B16A917Bd94Ce9A7Bd7Bad74Ff3C3DFindOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet918Fc45A43Fb4469B6B08Db1D4C54E90FindOneResponseListModel =
	ScoreSheetb5B16A917Bd94Ce9A7Bd7Bad74Ff3C3DFindOneResponseModelWithValidators
export type ScoreSheet6C4Db48AB7Fb4F2F9Cf8F29288Dd671EUpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheeta71543A2459C42B0Bcc73A5D39B58482DeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet2Df1A49FF6Ec46A89Be6849423E9Fd5EPatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type AvailableMovesc5810E075F6946B5AddcF7Df7D0AaadaFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMovese8E48Ef6C1C94453A5163B4Fb02Bc5B1FindManyResponseListModel =

		| AvailableMovesc5810E075F6946B5AddcF7Df7D0AaadaFindManyResponseItemModelWithValidators[]

export type AvailableMovese6044E79Aa644816Af41593B8243FceeUpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves53125C19C18341Cd88D0104Ff419Ff67UpdateManyResponseListModelWithValidators =
	AvailableMovese6044E79Aa644816Af41593B8243FceeUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablemovesPut = {
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: string
}
export type AvailableMoves2D3958Be89264Dae8Eba4319A1A390FbUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesb185Aae9A7Ce4227Bdd492C6092D5F7DUpsertManyResponseListModel =
	AvailableMoves2D3958Be89264Dae8Eba4319A1A390FbUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableMoves2C585B7AF50D458CA8D44Cbc9026251BCreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves43C05Aad7266480993Bc0246470F711DDeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves639145B7Ea8146089F5A511938De092EDeleteManyResponseListModel =
	AvailableMoves43C05Aad7266480993Bc0246470F711DDeleteManyResponseModelWithValidators[]
export type AvailableMovesbe1903F4D33145F3Ade4885B7950A5F7PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves1F4189De18F04Ae3A03F9Dce634E5572PatchManyResponseListModelWithValidators =
	AvailableMovesbe1903F4D33145F3Ade4885B7950A5F7PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablemovesPatch = {
	sheet_id?: string
	name?: string
	fl_score?: number
	rb_score?: number
	direction?: string
}
export type AvailableMovese78D7889Ded74243Acb64779C42B2E33FindOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves0Ab9Fba2E11F415DB094881955Ae6D46FindOneResponseListModel =
	AvailableMovese78D7889Ded74243Acb64779C42B2E33FindOneResponseModelWithValidators
export type AvailableMoves00Cbf240247D4A678707C321Fee31C36UpdateOneResponseModelWithValidators =
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
export type AvailableMovesb4F7246D429A40E28F98747C2Ebf3Cf6DeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesd0Bffb23E71349919Ab48111Bde33068PatchOneResponseModelWithValidators =
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
export type ForeignScoreSheet2879Aa9DF8A04649959F8A5C420D91E4FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheet75C5103142F3404CBb433C7Fbb013760GetManyResponseForeignModel =
	ForeignScoreSheet2879Aa9DF8A04649959F8A5C420D91E4FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves13D5890F490D4Ff19C819C361742Ec63FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMovesabad7FaeD811442F9D2D586B1E5B77B5GetManyResponseForeignModel =
	ForeignAvailableMoves13D5890F490D4Ff19C819C361742Ec63FindManyResponseItemModelWithValidators[]
export type AvailableBonuses0A5Fd10E566B4D61A7E54Fd06Ccea764FindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet75C5103142F3404CBb433C7Fbb013760GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovesabad7FaeD811442F9D2D586B1E5B77B5GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses5053Fa021B9248Af9Ee648122888Ded3FindManyResponseListModel =

		| AvailableBonuses0A5Fd10E566B4D61A7E54Fd06Ccea764FindManyResponseItemModelWithValidators[]

export type TableNamef4Cb7Cce81D8494DA26A0171E16A901C =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses35D9Cd20D56B4205B7BfC440C4B93E54UpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesbc4F5B4C9Be547169F9AC91Afdb7A9B2UpdateManyResponseListModelWithValidators =
	AvailableBonuses35D9Cd20D56B4205B7BfC440C4B93E54UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablebonusesPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonuses56513Ab46Fb44Ec9893F488Ff905B442UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses1Ce28A4A1A934326A1E69D16D26F802FUpsertManyResponseListModel =
	AvailableBonuses56513Ab46Fb44Ec9893F488Ff905B442UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableBonusesf01F86F18Adc4674A841106D9584Eea6CreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses812C81CeB6C14F7C9Aad337C9247D317DeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesf6603D44A650469CA56B77Dae1135E0EDeleteManyResponseListModel =
	AvailableBonuses812C81CeB6C14F7C9Aad337C9247D317DeleteManyResponseModelWithValidators[]
export type AvailableBonuses434B4B62A37F4B62Af426949B9A978AfPatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesb9Eede9C909E4441B793067080061733PatchManyResponseListModelWithValidators =
	AvailableBonuses434B4B62A37F4B62Af426949B9A978AfPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablebonusesPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type AvailableBonusesc3F2754AF4Cf4B69Aac2E2A60Ca0433AFindOneResponseModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet75C5103142F3404CBb433C7Fbb013760GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovesabad7FaeD811442F9D2D586B1E5B77B5GetManyResponseForeignModel
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses559Ba51C82Be4D9C920DF81Ef0Fb6B82FindOneResponseListModel =
	AvailableBonusesc3F2754AF4Cf4B69Aac2E2A60Ca0433AFindOneResponseModelWithValidators
export type TableNamed652A552803D48A8B24D133Cbdc650F2 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses66E14162Fa414Fa9922FDd4Db62Ecc5FUpdateOneResponseModelWithValidators =
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
export type AvailableBonuses33Bfc87AF6A94Fb09045984E17648B5FDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses2E17828BE27E4Ec692791096D3Ff046DPatchOneResponseModelWithValidators =
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
export type ForeignHeat084Ce02B624A41D4A4277B1Ffa0E1C8CFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat290Fabfe79Ac44079Cfa657C0Ef335F0GetManyResponseForeignModel =
	ForeignHeat084Ce02B624A41D4A4277B1Ffa0E1C8CFindManyResponseItemModelWithValidators[]
export type ForeignPhase1677A535D9Fe4A058C768D5Aebe75815FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase043D82501009484F88E39D28592E353AGetManyResponseForeignModel =
	ForeignPhase1677A535D9Fe4A058C768D5Aebe75815FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves47E85Fb1B6C14B5A987591Ac3D901B53FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves018D99Fd28D34C569Ea5Bf7B52B3174BGetManyResponseForeignModel =
	ForeignAvailableMoves47E85Fb1B6C14B5A987591Ac3D901B53FindManyResponseItemModelWithValidators[]
export type ForeignAthlete6A41227F5853479D8420A493A367B267FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthletebb387D41B54B4Dd6804DA57247475B4BGetManyResponseForeignModel =
	ForeignAthlete6A41227F5853479D8420A493A367B267FindManyResponseItemModelWithValidators[]
export type ScoredMoves31988E115E844F57B4D876Eb7Aa95E47FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat290Fabfe79Ac44079Cfa657C0Ef335F0GetManyResponseForeignModel
		phase_foreign?: ForeignPhase043D82501009484F88E39D28592E353AGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves018D99Fd28D34C569Ea5Bf7B52B3174BGetManyResponseForeignModel
		athlete_foreign?: ForeignAthletebb387D41B54B4Dd6804DA57247475B4BGetManyResponseForeignModel
		id?: string
		move_id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		judge_id?: string
		athlete_id?: string
		direction?: string
	}
export type ScoredMoves23Fd834BBed446F69B1C3Fac8F528F9CFindManyResponseListModel =

		| ScoredMoves31988E115E844F57B4D876Eb7Aa95E47FindManyResponseItemModelWithValidators[]

export type TableNamed2735985F40440D2974E39927817E7A4 =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMovesbcb9Ded03Df4494BAf1956321Dd4Fd0DUpdateManyResponseModelWithValidators =
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
export type ScoredMoves82C46D9CD8C64Ede81724F47F1A03E4AUpdateManyResponseListModelWithValidators =
	ScoredMovesbcb9Ded03Df4494BAf1956321Dd4Fd0DUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredmovesPut = {
	move_id: string
	heat_id: string
	run_number: number
	phase_id: string
	judge_id: string
	athlete_id: string
	direction: string
}
export type ScoredMoves0Ec5242F95234Ec0AaefE43829F690A4UpsertManyResponseItemModelRequireButDefaultWithValidators =
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
export type ScoredMoves257545547E5F4Da8Accc57E573551Fb5UpsertManyResponseListModel =
	ScoredMoves0Ec5242F95234Ec0AaefE43829F690A4UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredMovesb154Bf4188A14401Bdc4B65C4586E271CreateManyInsertItemRequestModel =
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
export type ScoredMoves62Dd7B232564447894B6F300F3D6CeeaDeleteManyResponseModelWithValidators =
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
export type ScoredMovesd37866534E134406Ab40A16970038E3CDeleteManyResponseListModel =
	ScoredMoves62Dd7B232564447894B6F300F3D6CeeaDeleteManyResponseModelWithValidators[]
export type ScoredMoves2B52Cf9152B643Ed83E4Ec443D76D903PatchManyResponseModelWithValidators =
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
export type ScoredMoves9Da761D572064Be5839E30512223881EPatchManyResponseListModelWithValidators =
	ScoredMoves2B52Cf9152B643Ed83E4Ec443D76D903PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredmovesPatch = {
	move_id?: string
	heat_id?: string
	run_number?: number
	phase_id?: string
	judge_id?: string
	athlete_id?: string
	direction?: string
}
export type ScoredMoves6Eafa540168E4953Ad357Fa122C450E6FindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat290Fabfe79Ac44079Cfa657C0Ef335F0GetManyResponseForeignModel
		phase_foreign?: ForeignPhase043D82501009484F88E39D28592E353AGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves018D99Fd28D34C569Ea5Bf7B52B3174BGetManyResponseForeignModel
		athlete_foreign?: ForeignAthletebb387D41B54B4Dd6804DA57247475B4BGetManyResponseForeignModel
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMoves33E60Ed09B5A44229Afc7627Bae19Db9FindOneResponseListModel =
	ScoredMoves6Eafa540168E4953Ad357Fa122C450E6FindOneResponseModelWithValidators
export type TableName09E59100A6B1490F9Db937120666010E =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMoves108Fea0718064827Ac80175C042933D6UpdateOneResponseModelWithValidators =
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
export type ScoredMoveseaa8B0E1357F4E4688A7Afdd388Cdd8CDeleteOneResponseModelWithValidators =
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
export type ScoredMoves6Eb533Fc34F3492F9D38273E8F6Efb57PatchOneResponseModelWithValidators =
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
export type ForeignAvailableBonuses90A33579Ce6247568Ad4E03C182B7264FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableBonusesb6C10159E7914D169Ed2Fca35Af06451GetManyResponseForeignModel =
	ForeignAvailableBonuses90A33579Ce6247568Ad4E03C182B7264FindManyResponseItemModelWithValidators[]
export type ForeignScoredMovesc0Fb02B03Fb94Fa7B9360Dc057F3A394FindManyResponseItemModelWithValidators =
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
export type ForeignScoredMoves8Ecd7Fd4Cab44Ce2813D3694E834D384GetManyResponseForeignModel =
	ForeignScoredMovesc0Fb02B03Fb94Fa7B9360Dc057F3A394FindManyResponseItemModelWithValidators[]
export type ScoredBonuses11D80Dd799F341Dc94F84Aa8Dec10Bf6FindManyResponseItemModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesb6C10159E7914D169Ed2Fca35Af06451GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves8Ecd7Fd4Cab44Ce2813D3694E834D384GetManyResponseForeignModel
		id?: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonusesbd95622E0Cd64Aa0913E9291D69Bbae2FindManyResponseListModel =

		| ScoredBonuses11D80Dd799F341Dc94F84Aa8Dec10Bf6FindManyResponseItemModelWithValidators[]

export type TableName31A9F7053813424DA6Bd8E38D448Fe3C =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonusesf6531Ea600A5480299A70Fef46C31A02UpdateManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesbdf7A297975F4Dc3B11D270Ffdadec47UpdateManyResponseListModelWithValidators =
	ScoredBonusesf6531Ea600A5480299A70Fef46C31A02UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredbonusesPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonuses8Fe9Ed0B666F40AdBf3BEdc9522B89C5UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses199525Eb280540799233C317A5E7E0EaUpsertManyResponseListModel =
	ScoredBonuses8Fe9Ed0B666F40AdBf3BEdc9522B89C5UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredBonuses27F0F58B88C54A4EA982Db9F9C8E508ACreateManyInsertItemRequestModel =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesb7A0Cdd99B894Ad6A386Efb1F88F51C2DeleteManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses80A03273B5764E69Aa7C3Bd2Bf3D1711DeleteManyResponseListModel =
	ScoredBonusesb7A0Cdd99B894Ad6A386Efb1F88F51C2DeleteManyResponseModelWithValidators[]
export type ScoredBonuses0D64E09468484584B7Ed907Da3Dcfcb0PatchManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusese5269F09621B4F7B9D0AFb51Eb2De019PatchManyResponseListModelWithValidators =
	ScoredBonuses0D64E09468484584B7Ed907Da3Dcfcb0PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredbonusesPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ScoredBonuses7Ad17526544A49EaB9Da747D0B6680C3FindOneResponseModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesb6C10159E7914D169Ed2Fca35Af06451GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves8Ecd7Fd4Cab44Ce2813D3694E834D384GetManyResponseForeignModel
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses55413519050A4F3F92Be8Dbb19F20D2EFindOneResponseListModel =
	ScoredBonuses7Ad17526544A49EaB9Da747D0B6680C3FindOneResponseModelWithValidators
export type TableName4Ac414Cf68E94A59BacfE5Eb7Ca1C62A =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses77E295B0Eb0D4B42B022F1Cca8C83F4BUpdateOneResponseModelWithValidators =
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
export type ScoredBonuses765A7A2F696042CdB73AE0614852Da77DeleteOneResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses959F3Fd9A2B44D80Bcef298D0936E010PatchOneResponseModelWithValidators =
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
export type ForeignHeat3477Fdc7A4364B6F884DD2Edffffe433FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat9E02E78256124F2FBe3852C5E37E60B7GetManyResponseForeignModel =
	ForeignHeat3477Fdc7A4364B6F884DD2Edffffe433FindManyResponseItemModelWithValidators[]
export type ForeignAthletef6E71Bb317C74Dd683589D5D6461Ff19FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthleted24B07142B5F4Dd98B2B658875449D2BGetManyResponseForeignModel =
	ForeignAthletef6E71Bb317C74Dd683589D5D6461Ff19FindManyResponseItemModelWithValidators[]
export type ForeignPhase46A483Dd7Db043498Df868Aa4B8Ddef1FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase9102301F7D4C459B8D9E11Afbf28441DGetManyResponseForeignModel =
	ForeignPhase46A483Dd7Db043498Df868Aa4B8Ddef1FindManyResponseItemModelWithValidators[]
export type Athleteheat0698Ae51132D4B4180FcD9Eefcf43A06FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat9E02E78256124F2FBe3852C5E37E60B7GetManyResponseForeignModel
		athlete_foreign?: ForeignAthleted24B07142B5F4Dd98B2B658875449D2BGetManyResponseForeignModel
		phase_foreign?: ForeignPhase9102301F7D4C459B8D9E11Afbf28441DGetManyResponseForeignModel
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type Athleteheat62570E01B44B43549142C7E6092B48B1FindManyResponseListModel =

		| Athleteheat0698Ae51132D4B4180FcD9Eefcf43A06FindManyResponseItemModelWithValidators[]

export type TableNamee8257874D50C4D0D8F5628A6D73Ca22B =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat27A00021539E4B55B37004Ce6A9Cd89EUpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheate395F22E8E674Dfe9E2BF36Fe8Ea45A8UpdateManyResponseListModelWithValidators =
	Athleteheat27A00021539E4B55B37004Ce6A9Cd89EUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthleteheatPut = {
	heat_id: string
	athlete_id: string
	phase_id: string
	last_phase_rank: number
}
export type Athleteheatca4B75Cd38414Ef5B3F113Fdecd34FdeUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat360Caacf8664434D80B8664E1Db3F112UpsertManyResponseListModel =
	Athleteheatca4B75Cd38414Ef5B3F113Fdecd34FdeUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheatcce13A7DFd8E4B13910AE3B5B3A8483ECreateManyInsertItemRequestModel =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheate1359F024Beb43E29Ea9B6745Ed436C5DeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheate90Def12Ff194Ef9Af1DC79Fc662C602DeleteManyResponseListModel =
	Athleteheate1359F024Beb43E29Ea9B6745Ed436C5DeleteManyResponseModelWithValidators[]
export type Athleteheat85450CecE5884313Acd61A30B040D635PatchManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat7C6971Cc065741Fe842C2E4Bc89C8C6FPatchManyResponseListModelWithValidators =
	Athleteheat85450CecE5884313Acd61A30B040D635PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthleteheatPatch = {
	heat_id?: string
	athlete_id?: string
	phase_id?: string
	last_phase_rank?: number
}
export type Athleteheat6C239C9A111D4Fba8C48833316B5F594FindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat9E02E78256124F2FBe3852C5E37E60B7GetManyResponseForeignModel
		athlete_foreign?: ForeignAthleted24B07142B5F4Dd98B2B658875449D2BGetManyResponseForeignModel
		phase_foreign?: ForeignPhase9102301F7D4C459B8D9E11Afbf28441DGetManyResponseForeignModel
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat8641Dd58Afbe4F3BBa3491Ac807Da2D6FindOneResponseListModel =
	Athleteheat6C239C9A111D4Fba8C48833316B5F594FindOneResponseModelWithValidators
export type TableNamed5786Dfc3Ffb47069714F095Dc78D2Eb =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat87709A0A4B404883Aabd17Eb074F1Ca0UpdateOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type BodyEntireUpdateByPrimaryKeyAthleteheatIdPut = {
	heat_id: string
	athlete_id: string
	phase_id: string
	last_phase_rank: number
}
export type Athleteheatd784686B89434851Ab9C4F85C69428A9DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat59B14306A1D3483385E3D115E6D184E6PatchOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type BodyPartialUpdateOneByPrimaryKeyAthleteheatIdPatch = {
	heat_id?: string
	athlete_id?: string
	phase_id?: string
	last_phase_rank?: number
}
export const {
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation,
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatScoresGetHeatScoresHeatIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery,
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation,
	usePhasePdfPhasePdfPhaseIdGetQuery,
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
