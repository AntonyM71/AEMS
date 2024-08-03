import { emptySplitApi as api } from "./emptyApi"
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		uploadUploadPost: build.mutation<
			UploadUploadPostApiResponse,
			UploadUploadPostApiArg
		>({
			query: (queryArg) => ({
				url: `/upload`,
				method: "POST",
				body: queryArg.bodyUploadUploadPost
			})
		}),
		getHeatInfoGetHeatInfoHeatIdGet: build.query<
			GetHeatInfoGetHeatInfoHeatIdGetApiResponse,
			GetHeatInfoGetHeatInfoHeatIdGetApiArg
		>({
			query: (queryArg) => ({ url: `/getHeatInfo/${queryArg.heatId}` })
		}),
		getHeatPhasesGetHeatInfoHeatIdPhaseGet: build.query<
			GetHeatPhasesGetHeatInfoHeatIdPhaseGetApiResponse,
			GetHeatPhasesGetHeatInfoHeatIdPhaseGetApiArg
		>({
			query: (queryArg) => ({
				url: `/getHeatInfo/${queryArg.heatId}/phase`
			})
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
		heatPdfHeatPdfPost: build.mutation<
			HeatPdfHeatPdfPostApiResponse,
			HeatPdfHeatPdfPostApiArg
		>({
			query: (queryArg) => ({
				url: `/heat_pdf`,
				method: "POST",
				body: queryArg.body
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
export type UploadUploadPostApiResponse =
	/** status 200 Successful Response */ any
export type UploadUploadPostApiArg = {
	bodyUploadUploadPost: BodyUploadUploadPost
}
export type GetHeatInfoGetHeatInfoHeatIdGetApiResponse =
	/** status 200 Successful Response */ HeatInfoResponse[]
export type GetHeatInfoGetHeatInfoHeatIdGetApiArg = {
	heatId: string
}
export type GetHeatPhasesGetHeatInfoHeatIdPhaseGetApiResponse =
	/** status 200 Successful Response */ PhaseResponse[]
export type GetHeatPhasesGetHeatInfoHeatIdPhaseGetApiArg = {
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
export type HeatPdfHeatPdfPostApiResponse =
	/** status 200 Successful Response */ any
export type HeatPdfHeatPdfPostApiArg = {
	body: string[]
}
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competition6Da473Ae74Bb482B9F63Ce48F1197509FindManyResponseListModel
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
	joinForeignTable?: TableName003Be10FAb0146DaBb97B0B647B0E9C3[]
}
export type EntireUpdateManyByQueryCompetitionPutApiResponse =
	/** status 200 Successful Response */ Competitionaf697B0EF85242C098Bc988460790F44UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Competition575C83D4F5C4411E8C9B68D7D416Ca84UpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	body: Competitionb8Dc87A934Fd42D387Fe9945Ac48Ac0ACreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryCompetitionDeleteApiResponse =
	/** status 200 Successful Response */ Competitione3166361350D412C9Ae05Fd8151383FbDeleteManyResponseListModel
export type DeleteManyByQueryCompetitionDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryCompetitionPatchApiResponse =
	/** status 200 Successful Response */ Competition2C23F0A71C4E41A5A4E22D5F342Ba7B9PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Competitionbdf59A3AF9Ac4767A3881B01B1Ae7Cd4FindOneResponseListModel
export type GetOneByPrimaryKeyCompetitionIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName466Aa53AD2954Ba9951C6106C7Ff2B3F[]
}
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse =
	/** status 200 Successful Response */ Competitiond47A8054Ddd745A0Bcaf0B7115Bd13B2UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse =
	/** status 200 Successful Response */ Competitiond0F79Bd5027E40FdB49F57F6De7D50B0DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competitionecea423D326940C5A694958D4F48BfecPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIde59566Cb5A7F496D93E03E42B5034F91FindOneResponseListModel
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg =
	{
		competitionPkId: string
		eventPkId: string
		nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
		nameStr?: string[]
		nameListComparisonOperator?: ItemComparisonOperators
		nameList?: string[]
		joinForeignTable?: TableName27A074558Fd34668A8BfF0D9Bcc5A58D[]
	}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId7E57244529814Fe6A64F95713776D8DdFindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName50Cbc9B79B004B259D0A31Ee31A7C9E5[]
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event737C6C28F7904A2089E80Db278A813C2FindManyResponseListModel
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
	joinForeignTable?: TableNamebf2B270A84464E3CAe377849A619351A[]
}
export type EntireUpdateManyByQueryEventPutApiResponse =
	/** status 200 Successful Response */ Evente5A14Aa2219D4206Bfd4Cad148Bf6E04UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Eventc72Eb84EF6014B4AB3757617Ca801811UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	body: Event7B60Ddc7B70A43B78335F337F87D05A5CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryEventDeleteApiResponse =
	/** status 200 Successful Response */ Event18560A4A7Ec24Af9A9E250Dda74E2Bb9DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Eventb7A53726Dba14Bad996D5D97366E7418PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Eventc794852882D54663A8F1Df25E319C2CdFindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName22Ae14BfB2Db4967A879C8E6909Afddb[]
}
export type EntireUpdateByPrimaryKeyEventIdPutApiResponse =
	/** status 200 Successful Response */ Event9Be4Fc80315249Fd80Af4Fc2855C53D6UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event8Aa564072C9C4761B2922De25474D20ADeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event780Ba89403E14461A973Ac4A809786E2PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ EventIdPhaseId0F0791CfAa204440942B4Db0296271D5FindOneResponseListModel
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
	joinForeignTable?: TableName73Abadd8E5D341D1B67C912893D77008[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseIde18082747Cc9439B8Ecd51D8Dfe2Aa16FindManyResponseListModel
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
	joinForeignTable?: TableName5FfbcddaA3Be473E889F7F64661078D9[]
}
export type GetManyPhaseGetApiResponse =
	/** status 200 Successful Response */ Phase3E54D3Ab41Fb4D4C8224909796841808FindManyResponseListModel
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
	joinForeignTable?: TableName4794Aeec91D14Aeb99591E3Fbb794F5C[]
}
export type EntireUpdateManyByQueryPhasePutApiResponse =
	/** status 200 Successful Response */ Phasefee6D86F79C0481F9792E72Ee67647AaUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Phase94Ea1646D3D14Dd2Ad77Defa8Ae09EfdUpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	body: Phase72Fce9727B3D464E880C60E39D6A545ECreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryPhaseDeleteApiResponse =
	/** status 200 Successful Response */ Phase7Cfd2908Bbc74Dc38D888A0Dab827Bd2DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Phase72Ef0F177614457B8037127Afbff3509PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Phase0997241B0E8A4C9A8255D21B836633BfFindOneResponseListModel
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
	joinForeignTable?: TableName1A21751F981C48D5B4F69Fb6880Eb1E4[]
}
export type EntireUpdateByPrimaryKeyPhaseIdPutApiResponse =
	/** status 200 Successful Response */ Phase9F5Aa5EeEaf142Ae8A099F00Df5F5C0CUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phase1E9621490876473781DbAa3A6Ac66035DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phasecdb9De8BF92E409FB4D7D1Bc74C5F843PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat41B028Ef5Acf46C884E0Db2Ae4D8D543FindManyResponseListModel
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
	joinForeignTable?: TableName96Bbcb6706Ae4E5D9138F5B31A2B3Bf6[]
}
export type EntireUpdateManyByQueryHeatPutApiResponse =
	/** status 200 Successful Response */ Heat4Ef7Dcc527A04Cca83Ab5C5E04078F3CUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Heat552B673776A5471FB16B1252Afb4657CUpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	body: Heat674E575468Ad44FdBa0CDa6F128C828DCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryHeatDeleteApiResponse =
	/** status 200 Successful Response */ Heatce14E5F5Ac9941Cd8F3AAbd1C3A98C5EDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Heatb6D71Ab67A004DedAcdb4C2C0971Db5FPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Heate18298D4839447B0Adc4D7Ebf102B300FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName9Cb7032D364F489BAd9F099A7Ede5142[]
}
export type EntireUpdateByPrimaryKeyHeatIdPutApiResponse =
	/** status 200 Successful Response */ Heatc0E4Aee7C15A41448C574640Ba76F7FbUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat18F31A85Ea9841FdBfa5892D74033F2EDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat6Ac0B432B5C1459E9C6459E6Bbebb825PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athlete475Dc234B52C4D6CAdb75C6351C30Ef1FindManyResponseListModel
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
	joinForeignTable?: TableName63A2290BCa96462FAe92562D0Bcea65D[]
}
export type EntireUpdateManyByQueryAthletePutApiResponse =
	/** status 200 Successful Response */ Athleted5848439F1Fb4C94A5A8E14E5C126D33UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Athlete2F26Cc56B35C460799337773B19B5F8AUpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	body: Athlete5513Ea0FC5F646Ff971739076C298Fe0CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteDeleteApiResponse =
	/** status 200 Successful Response */ Athlete73A3B220856C470C9De77785126C4152DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Athlete5D48794F6C3A4531B2F5F1B3F0A1C382PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Athlete05D6Da91C9Af4Cd690D4D415C45E35C6FindOneResponseListModel
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
	joinForeignTable?: TableName568Ae27A01624191Bbda97Fa5972Dde0[]
}
export type EntireUpdateByPrimaryKeyAthleteIdPutApiResponse =
	/** status 200 Successful Response */ Athlete802B684E962C406F8272B410912Fe575UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athlete9A531C4468Df4B39A85E819C5A2A1F31DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athlete720Cb12E1B1A41E9860DEa7B364D5185PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheet3Cb3637A5C334F02Ae31A87Bd352Ad46FindManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheetce1Ccef1Cbb845C480B9Deb3Fc590C8DUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoreSheet434Fb9585Bbe4A2EA509D0Fd7Def5E5CUpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	body: ScoreSheetaedddf72E51C46D68A50De90251Afe83CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoresheetDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheetc8F01F69627C424988EeD3E795565785DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheet88E6F702A9C14F8894641295852F5Cd5PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheete4Ae4Eb92F7347D1A8D32C47387Bade0FindOneResponseListModel
export type GetOneByPrimaryKeyScoresheetIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiResponse =
	/** status 200 Successful Response */ ScoreSheet3F779D6E220C4B0BA27D210Ef536F195UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheet948054E207A945A9Bd78541205F05D04DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiResponse =
	/** status 200 Successful Response */ ScoreSheetd01B7985734E45Fe9450A8B5B74Bb2DaPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMoves900Fd928D1974150Ae7BF7D6A83C7155FindManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves4Fbcf9C3D44C4057A62F986E610A84B8UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableMovesd26Be7Cd67504C4FAaeaDc442B861EbaUpsertManyResponseListModel
export type InsertManyAvailablemovesPostApiArg = {
	body: AvailableMovesd273D78618Ea48Fe8B06Ecdda686D587CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablemovesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMoves2440592744554F6B8Ab74E183198Ce5ADeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves7776F9CfAdcb4829A35F95A5674E3B65PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableMovesd2E9A8Ad9F0A410D801F049252F3D3A2FindOneResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves205Bae7FD1154801B911Efc4Ab46C9CcUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMoves9724F1608431462B8Bf56E8Ff4595D8CDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMovesbf39Cbf2Da704D9E91Ca35Bc614B8Fd6PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses6F24684A46034209B5816Ef01216A673FindManyResponseListModel
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
	joinForeignTable?: TableNamee413F0D9C94C4277B9D71Ee012Abc8E5[]
}
export type EntireUpdateManyByQueryAvailablebonusesPutApiResponse =
	/** status 200 Successful Response */ AvailableBonuses5841689620F2406ABde424033614EfbeUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableBonuses5A3Cb784C46C400881B3Aa8B9D2B9A5EUpsertManyResponseListModel
export type InsertManyAvailablebonusesPostApiArg = {
	body: AvailableBonuses06Be7D4529F14B838990D4Efecd1C2AcCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablebonusesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableBonuses1726Fb9B96D64B8381B293Bf66B4C217DeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonusesdbee4A59A9F74Aa9B68F933Efee679F2PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesd1Ce11F37Ed4430AB194C156Aee0EacaFindOneResponseListModel
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
	joinForeignTable?: TableName776C67614F614178Bda1B0261Ae1Ee35[]
}
export type EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableBonusese0Ba923AD36D40Dc81171472D31396FfUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesddfd1802440C4189B67C0B240Edeeb43DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses820Db40D47504796B14FF3Cef13Bd07EPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves83D16D1E63C6420DB15BD776D6435Ed9FindManyResponseListModel
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
	joinForeignTable?: TableName66Ad992B5D524B96Bf8BD86B80C3068F[]
}
export type EntireUpdateManyByQueryScoredmovesPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves5A9655E5Eb734700B6550F9E2E33693FUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredMovese72Fc14820654260B3Ea0859A3443203UpsertManyResponseListModel
export type InsertManyScoredmovesPostApiArg = {
	body: ScoredMovese3Adb03FD0Fa42F18C974Bc42002AabbCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMoves80B953208A694Db2B29CA54073B12C49DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredMovesd12D32De755D4309862C1A7B2251Be66PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves5B830Ee146C145FfAbc29Ef089E5FaaaFindOneResponseListModel
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
	joinForeignTable?: TableName2153Bede75F2478CA2E3A2133D2B1F10[]
}
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves4A109B3A8E1F45E4B96B956039Ccb3AeUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMovesabd203Be76F04270B08B73C028A7A3C2DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMovesa4A1Aff939Dd4F80Ad3637B5365B0035PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses2F899146117340Bf97A29C953Bdc4374FindManyResponseListModel
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
	joinForeignTable?: TableNamefc2444C99Ea744Bf8B571C9E4Dbfa752[]
}
export type EntireUpdateManyByQueryScoredbonusesPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses806Cb894A3B141E6907CCfbb0269AadcUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredBonuses8240E590A52A40F0A7521Fd8929438FaUpsertManyResponseListModel
export type InsertManyScoredbonusesPostApiArg = {
	body: ScoredBonusesdf4Bc8F963C546F288240Ade7716288CCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredbonusesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredBonusese440A9DaFf5345D3963774B9B3De20EcDeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredBonuses8Db54123037041A99E382Fc3E837993CPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses4422C7383A134Af0Bc4CBd4C0Ab20796FindOneResponseListModel
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
	joinForeignTable?: TableName922C94AdB87443FaB6253Ff0079737F0[]
}
export type EntireUpdateByPrimaryKeyScoredbonusesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredBonusesd5Dcf61C00E64E31Bf4AE733F966Ed57UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonusesce9Ab08FBca3480DB195362434B9C31FDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses57D877B9Ccda4E7DA3Ab81596640Fce6PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheata44C4F33D9F3429D941C3586459368CfFindManyResponseListModel
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
	joinForeignTable?: TableName45C32Ea3Ae7D412784F4079F78Bb6D7C[]
}
export type EntireUpdateManyByQueryAthleteheatPutApiResponse =
	/** status 200 Successful Response */ Athleteheat35262F4670A34165Aec359C31D2656C9UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Athleteheat6780F0F030C4420197A8D903Ee2509D0UpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	body: Athleteheatb01452A9Bedf4B1D8A5D7F4E14D1C15ECreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteheatDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheat6E5720Fd0Fcc4A28813A5E8462D406DfDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Athleteheateca5Fe6173744D7095D4Be18Da384F7EPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat20A67Cf629C3474989A821Ee26037813FindOneResponseListModel
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
	joinForeignTable?: TableNamea8F4A1EbF45B418D895570Fd16C54969[]
}
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiResponse =
	/** status 200 Successful Response */ Athleteheat698A1E4E83Fc44F4BafaB67Cef4942C7UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat8A17C63A509D4Aac9E1C46Bb766B5Cd4DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheate638890791814D7B92Bc428Ef0C2563APatchOneResponseModelWithValidators
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
export type ValidationError = {
	loc: string[]
	msg: string
	type: string
}
export type HttpValidationError = {
	detail?: ValidationError[]
}
export type BodyUploadUploadPost = {
	competition_name: string
	file: Blob
}
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
export type PhaseResponse = {
	id: string
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
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
export type ForeignEvent69Aeee24Afdd4C9F8A8EA36Ded7D909CFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent3C79B56CBb734311B758Dcef30B138AdGetManyResponseForeignModel =
	ForeignEvent69Aeee24Afdd4C9F8A8EA36Ded7D909CFindManyResponseItemModelWithValidators[]
export type Competition7E36Fa629849448BA0Db7347Ff6937BdFindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent3C79B56CBb734311B758Dcef30B138AdGetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competition6Da473Ae74Bb482B9F63Ce48F1197509FindManyResponseListModel =

		| Competition7E36Fa629849448BA0Db7347Ff6937BdFindManyResponseItemModelWithValidators[]

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
export type TableName003Be10FAb0146DaBb97B0B647B0E9C3 = "event"
export type Competition6Dbcdd2DFe80485182Bb14F26967B760UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitionaf697B0EF85242C098Bc988460790F44UpdateManyResponseListModelWithValidators =
	Competition6Dbcdd2DFe80485182Bb14F26967B760UpdateManyResponseModelWithValidators[]
export type Competitiona9Af5Cf60779415FB514A2Cee5A4F567UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type Competition575C83D4F5C4411E8C9B68D7D416Ca84UpsertManyResponseListModel =
	Competitiona9Af5Cf60779415FB514A2Cee5A4F567UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competitionb8Dc87A934Fd42D387Fe9945Ac48Ac0ACreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type Competition19548C9D1D6043389Ed1417817B68Fc6DeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitione3166361350D412C9Ae05Fd8151383FbDeleteManyResponseListModel =
	Competition19548C9D1D6043389Ed1417817B68Fc6DeleteManyResponseModelWithValidators[]
export type Competitionda587C537C9F42138Bc82739A9Ce030DPatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition2C23F0A71C4E41A5A4E22D5F342Ba7B9PatchManyResponseListModelWithValidators =
	Competitionda587C537C9F42138Bc82739A9Ce030DPatchManyResponseModelWithValidators[]
export type Competitione6328Ec027Ab44C0Ae29425Ec6E56927FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent3C79B56CBb734311B758Dcef30B138AdGetManyResponseForeignModel
		id: string
		name: string
	}
export type Competitionbdf59A3AF9Ac4767A3881B01B1Ae7Cd4FindOneResponseListModel =
	Competitione6328Ec027Ab44C0Ae29425Ec6E56927FindOneResponseModelWithValidators
export type TableName466Aa53AD2954Ba9951C6106C7Ff2B3F = "event"
export type Competitiond47A8054Ddd745A0Bcaf0B7115Bd13B2UpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitiond0F79Bd5027E40FdB49F57F6De7D50B0DeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitionecea423D326940C5A694958D4F48BfecPatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ForeignCompetition747F30F6470A496B96B02E63B019708DFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition6Cb192263D494C8881A5B2Ac6B96D472GetManyResponseForeignModel =
	ForeignCompetition747F30F6470A496B96B02E63B019708DFindManyResponseItemModelWithValidators[]
export type ForeignPhase7Ceeb22139F842D4B62C04731Abad8C9FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase4F67645B30F14395971695D97675017DGetManyResponseForeignModel =
	ForeignPhase7Ceeb22139F842D4B62C04731Abad8C9FindManyResponseItemModelWithValidators[]
export type CompetitionIdEventIde96Fc0E77E1F4740882806513E94D5C4FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition6Cb192263D494C8881A5B2Ac6B96D472GetManyResponseForeignModel
		phase_foreign?: ForeignPhase4F67645B30F14395971695D97675017DGetManyResponseForeignModel
	}
export type CompetitionIdEventIde59566Cb5A7F496D93E03E42B5034F91FindOneResponseListModel =
	CompetitionIdEventIde96Fc0E77E1F4740882806513E94D5C4FindOneResponseModelWithValidators
export type TableName27A074558Fd34668A8BfF0D9Bcc5A58D = "competition" | "phase"
export type ForeignCompetition690D7484Bc8F4Cb1B5BcC7A9A6A4C24EFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition3B90Ee6C4C5B44C5B701A33E87C72994GetManyResponseForeignModel =
	ForeignCompetition690D7484Bc8F4Cb1B5BcC7A9A6A4C24EFindManyResponseItemModelWithValidators[]
export type ForeignPhaseb55Eb391194545D88C66375Dd122E085FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase1E406699Cf254A7E927B31A70994544BGetManyResponseForeignModel =
	ForeignPhaseb55Eb391194545D88C66375Dd122E085FindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId84B101773E5A4A81904508Cd17E362E0FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition3B90Ee6C4C5B44C5B701A33E87C72994GetManyResponseForeignModel
		phase_foreign?: ForeignPhase1E406699Cf254A7E927B31A70994544BGetManyResponseForeignModel
	}
export type CompetitionIdEventId7E57244529814Fe6A64F95713776D8DdFindManyResponseListModel =

		| CompetitionIdEventId84B101773E5A4A81904508Cd17E362E0FindOneResponseModelWithValidators[]

export type TableName50Cbc9B79B004B259D0A31Ee31A7C9E5 = "competition" | "phase"
export type ForeignCompetitionafbbe2Ad87C34011Aeca07D917B8D831FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition0D1F9150Faea43709E5C14Ea5Fc587C0GetManyResponseForeignModel =
	ForeignCompetitionafbbe2Ad87C34011Aeca07D917B8D831FindManyResponseItemModelWithValidators[]
export type ForeignPhase37Fd98F12Fc340E19Ca2625De53725CdFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase199E7A6B9B9D4EbcA9962Fb8Fe908103GetManyResponseForeignModel =
	ForeignPhase37Fd98F12Fc340E19Ca2625De53725CdFindManyResponseItemModelWithValidators[]
export type Event870F2FfbB19F4Ab0A0107E4Bfedf7240FindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetition0D1F9150Faea43709E5C14Ea5Fc587C0GetManyResponseForeignModel
		phase_foreign?: ForeignPhase199E7A6B9B9D4EbcA9962Fb8Fe908103GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event737C6C28F7904A2089E80Db278A813C2FindManyResponseListModel =
	| Event870F2FfbB19F4Ab0A0107E4Bfedf7240FindManyResponseItemModelWithValidators[]

export type TableNamebf2B270A84464E3CAe377849A619351A = "competition" | "phase"
export type Event3B43Dcda4D0C49009F260Da1A39925E2UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Evente5A14Aa2219D4206Bfd4Cad148Bf6E04UpdateManyResponseListModelWithValidators =
	Event3B43Dcda4D0C49009F260Da1A39925E2UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryEventPut = {
	competition_id: string
	name: string
}
export type Event68167123Aa6141C8Ba544B241E190D86UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventc72Eb84EF6014B4AB3757617Ca801811UpsertManyResponseListModel =
	Event68167123Aa6141C8Ba544B241E190D86UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Event7B60Ddc7B70A43B78335F337F87D05A5CreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event06779Dfd750240B9857AF92E708D1529DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event18560A4A7Ec24Af9A9E250Dda74E2Bb9DeleteManyResponseListModel =
	Event06779Dfd750240B9857AF92E708D1529DeleteManyResponseModelWithValidators[]
export type Eventfcbba6Eb43F74506Afad0Ed4C6D7196EPatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventb7A53726Dba14Bad996D5D97366E7418PatchManyResponseListModelWithValidators =
	Eventfcbba6Eb43F74506Afad0Ed4C6D7196EPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryEventPatch = {
	competition_id?: string
	name?: string
}
export type Event1C983Ce6B5514C728D03Ba12A6C2B0CbFindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetition0D1F9150Faea43709E5C14Ea5Fc587C0GetManyResponseForeignModel
		phase_foreign?: ForeignPhase199E7A6B9B9D4EbcA9962Fb8Fe908103GetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Eventc794852882D54663A8F1Df25E319C2CdFindOneResponseListModel =
	Event1C983Ce6B5514C728D03Ba12A6C2B0CbFindOneResponseModelWithValidators
export type TableName22Ae14BfB2Db4967A879C8E6909Afddb = "competition" | "phase"
export type Event9Be4Fc80315249Fd80Af4Fc2855C53D6UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyEventIdPut = {
	competition_id: string
	name: string
}
export type Event8Aa564072C9C4761B2922De25474D20ADeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event780Ba89403E14461A973Ac4A809786E2PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyEventIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignEvente01872B9E65C43129F8617Dff9964E62FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventd7D9C77BAa584Ff88Acb8D8D3Da0148EGetManyResponseForeignModel =
	ForeignEvente01872B9E65C43129F8617Dff9964E62FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat18220F28210E4E7F8398878615Be9847FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat88E7560D5Ccf460597378F13Ff7B1C88GetManyResponseForeignModel =
	ForeignAthleteheat18220F28210E4E7F8398878615Be9847FindManyResponseItemModelWithValidators[]
export type EventIdPhaseIdca3Bfe620Baf4D28B7675Cdeaffdcf9BFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEventd7D9C77BAa584Ff88Acb8D8D3Da0148EGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat88E7560D5Ccf460597378F13Ff7B1C88GetManyResponseForeignModel
	}
export type EventIdPhaseId0F0791CfAa204440942B4Db0296271D5FindOneResponseListModel =
	EventIdPhaseIdca3Bfe620Baf4D28B7675Cdeaffdcf9BFindOneResponseModelWithValidators
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableName73Abadd8E5D341D1B67C912893D77008 = "event" | "athleteheat"
export type ForeignEvent1E7Eedeb86E6446FA228Fa0540165F12FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventef289Df8533541538825219Dcfd96Eb5GetManyResponseForeignModel =
	ForeignEvent1E7Eedeb86E6446FA228Fa0540165F12FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheata3Cc2729790143A2Bc355A2D995Df021FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat75Ffefe5484643Fb93D8A6E500Ebc72BGetManyResponseForeignModel =
	ForeignAthleteheata3Cc2729790143A2Bc355A2D995Df021FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId7Cbe94A243304749873FBc15Eb73Bdc9FindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEventef289Df8533541538825219Dcfd96Eb5GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat75Ffefe5484643Fb93D8A6E500Ebc72BGetManyResponseForeignModel
	}
export type EventIdPhaseIde18082747Cc9439B8Ecd51D8Dfe2Aa16FindManyResponseListModel =

		| EventIdPhaseId7Cbe94A243304749873FBc15Eb73Bdc9FindOneResponseModelWithValidators[]

export type TableName5FfbcddaA3Be473E889F7F64661078D9 = "event" | "athleteheat"
export type ForeignEvent7Cdb9C29187443E7Ad210A167746Abb4FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventaf6603164D8A4F06A2C6559F0D48B776GetManyResponseForeignModel =
	ForeignEvent7Cdb9C29187443E7Ad210A167746Abb4FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat308083886864433082A7A25F5Ed1D9F8FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatb6Fe6E339D764A139904F1737A900A54GetManyResponseForeignModel =
	ForeignAthleteheat308083886864433082A7A25F5Ed1D9F8FindManyResponseItemModelWithValidators[]
export type Phaseb34555F4Dab74Cf488C6A83B5A58Fbb4FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEventaf6603164D8A4F06A2C6559F0D48B776GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatb6Fe6E339D764A139904F1737A900A54GetManyResponseForeignModel
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type Phase3E54D3Ab41Fb4D4C8224909796841808FindManyResponseListModel =
	| Phaseb34555F4Dab74Cf488C6A83B5A58Fbb4FindManyResponseItemModelWithValidators[]

export type TableName4794Aeec91D14Aeb99591E3Fbb794F5C = "event" | "athleteheat"
export type Phase9F0D56F6B4F049Cd893C06B04Fd8E373UpdateManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasefee6D86F79C0481F9792E72Ee67647AaUpdateManyResponseListModelWithValidators =
	Phase9F0D56F6B4F049Cd893C06B04Fd8E373UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryPhasePut = {
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
}
export type Phaseab5Ad54DB1B8457982494C74701Dd617UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase94Ea1646D3D14Dd2Ad77Defa8Ae09EfdUpsertManyResponseListModel =
	Phaseab5Ad54DB1B8457982494C74701Dd617UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase72Fce9727B3D464E880C60E39D6A545ECreateManyInsertItemRequestModel =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phaseff49F197075A42AaA3489273B485A5B8DeleteManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase7Cfd2908Bbc74Dc38D888A0Dab827Bd2DeleteManyResponseListModel =
	Phaseff49F197075A42AaA3489273B485A5B8DeleteManyResponseModelWithValidators[]
export type Phase5F0983Fd67F94584B60C925D92076Fa2PatchManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase72Ef0F177614457B8037127Afbff3509PatchManyResponseListModelWithValidators =
	Phase5F0983Fd67F94584B60C925D92076Fa2PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryPhasePatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	number_of_judges?: number
	scoresheet?: string
}
export type Phase11A13F84Ef2D481B9A580Cf96F433A4FFindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEventaf6603164D8A4F06A2C6559F0D48B776GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatb6Fe6E339D764A139904F1737A900A54GetManyResponseForeignModel
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase0997241B0E8A4C9A8255D21B836633BfFindOneResponseListModel =
	Phase11A13F84Ef2D481B9A580Cf96F433A4FFindOneResponseModelWithValidators
export type TableName1A21751F981C48D5B4F69Fb6880Eb1E4 = "event" | "athleteheat"
export type Phase9F5Aa5EeEaf142Ae8A099F00Df5F5C0CUpdateOneResponseModelWithValidators =
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
export type Phase1E9621490876473781DbAa3A6Ac66035DeleteOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasecdb9De8BF92E409FB4D7D1Bc74C5F843PatchOneResponseModelWithValidators =
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
export type ForeignAthleteheat5450426E9Ae74Cd7Bbac517825B93973FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatdc5613F17D124D7DA30D834Ac998Cd81GetManyResponseForeignModel =
	ForeignAthleteheat5450426E9Ae74Cd7Bbac517825B93973FindManyResponseItemModelWithValidators[]
export type Heated70E00467C34Dc1A0E29E4Bbfd63D98FindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatdc5613F17D124D7DA30D834Ac998Cd81GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heat41B028Ef5Acf46C884E0Db2Ae4D8D543FindManyResponseListModel =
	| Heated70E00467C34Dc1A0E29E4Bbfd63D98FindManyResponseItemModelWithValidators[]

export type TableName96Bbcb6706Ae4E5D9138F5B31A2B3Bf6 = "athleteheat"
export type Heat78Cef6Ee8F8041D8B190D98345051CdcUpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat4Ef7Dcc527A04Cca83Ab5C5E04078F3CUpdateManyResponseListModelWithValidators =
	Heat78Cef6Ee8F8041D8B190D98345051CdcUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryHeatPut = {
	competition_id: string
	name: string
}
export type Heata4B66Bf166Fd4Fc9B431Eefe9Bd81B32UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat552B673776A5471FB16B1252Afb4657CUpsertManyResponseListModel =
	Heata4B66Bf166Fd4Fc9B431Eefe9Bd81B32UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat674E575468Ad44FdBa0CDa6F128C828DCreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heata4Ea9A10312F4E7883Cf3Cf1714Ad7FcDeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heatce14E5F5Ac9941Cd8F3AAbd1C3A98C5EDeleteManyResponseListModel =
	Heata4Ea9A10312F4E7883Cf3Cf1714Ad7FcDeleteManyResponseModelWithValidators[]
export type Heat81A600FaA0424261Bf8E3E79Cedcf52DPatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heatb6D71Ab67A004DedAcdb4C2C0971Db5FPatchManyResponseListModelWithValidators =
	Heat81A600FaA0424261Bf8E3E79Cedcf52DPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryHeatPatch = {
	competition_id?: string
	name?: string
}
export type Heat32E245E886C746909FeaDbfe530F4347FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatdc5613F17D124D7DA30D834Ac998Cd81GetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Heate18298D4839447B0Adc4D7Ebf102B300FindOneResponseListModel =
	Heat32E245E886C746909FeaDbfe530F4347FindOneResponseModelWithValidators
export type TableName9Cb7032D364F489BAd9F099A7Ede5142 = "athleteheat"
export type Heatc0E4Aee7C15A41448C574640Ba76F7FbUpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyHeatIdPut = {
	competition_id: string
	name: string
}
export type Heat18F31A85Ea9841FdBfa5892D74033F2EDeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat6Ac0B432B5C1459E9C6459E6Bbebb825PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyHeatIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignAthleteheat0B9C797B4F40483A900B5350709Aee61FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat5358A91E89Ae44B5A73699965332Be8DGetManyResponseForeignModel =
	ForeignAthleteheat0B9C797B4F40483A900B5350709Aee61FindManyResponseItemModelWithValidators[]
export type Athlete571D132A8743423288De64A5407873FcFindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat5358A91E89Ae44B5A73699965332Be8DGetManyResponseForeignModel
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type Athlete475Dc234B52C4D6CAdb75C6351C30Ef1FindManyResponseListModel =
	| Athlete571D132A8743423288De64A5407873FcFindManyResponseItemModelWithValidators[]

export type TableName63A2290BCa96462FAe92562D0Bcea65D = "athleteheat"
export type Athletefd942F977Eb149A8B7941304Efe297DdUpdateManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athleted5848439F1Fb4C94A5A8E14E5C126D33UpdateManyResponseListModelWithValidators =
	Athletefd942F977Eb149A8B7941304Efe297DdUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthletePut = {
	first_name: string
	last_name: string
	bib: string
}
export type Athletec379B7C27A3641D8BeefC881A11B608FUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete2F26Cc56B35C460799337773B19B5F8AUpsertManyResponseListModel =
	Athletec379B7C27A3641D8BeefC881A11B608FUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athlete5513Ea0FC5F646Ff971739076C298Fe0CreateManyInsertItemRequestModel =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athletea0B441D440374032A7Ba4C480Cee3F72DeleteManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete73A3B220856C470C9De77785126C4152DeleteManyResponseListModel =
	Athletea0B441D440374032A7Ba4C480Cee3F72DeleteManyResponseModelWithValidators[]
export type Athlete58A211B67Bad4Fc3805FC94Fd980849FPatchManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete5D48794F6C3A4531B2F5F1B3F0A1C382PatchManyResponseListModelWithValidators =
	Athlete58A211B67Bad4Fc3805FC94Fd980849FPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthletePatch = {
	first_name?: string
	last_name?: string
	bib?: string
}
export type Athletee9Cceae3A60F4Be0Af6A445138C6812CFindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat5358A91E89Ae44B5A73699965332Be8DGetManyResponseForeignModel
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete05D6Da91C9Af4Cd690D4D415C45E35C6FindOneResponseListModel =
	Athletee9Cceae3A60F4Be0Af6A445138C6812CFindOneResponseModelWithValidators
export type TableName568Ae27A01624191Bbda97Fa5972Dde0 = "athleteheat"
export type Athlete802B684E962C406F8272B410912Fe575UpdateOneResponseModelWithValidators =
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
export type Athlete9A531C4468Df4B39A85E819C5A2A1F31DeleteOneResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete720Cb12E1B1A41E9860DEa7B364D5185PatchOneResponseModelWithValidators =
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
export type ScoreSheet8C88CefeD79547Eb93B36511C4E28Ec2FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheet3Cb3637A5C334F02Ae31A87Bd352Ad46FindManyResponseListModel =

		| ScoreSheet8C88CefeD79547Eb93B36511C4E28Ec2FindManyResponseItemModelWithValidators[]

export type ScoreSheet672E11Bb6Cd84Cc2867B876099C56271UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetce1Ccef1Cbb845C480B9Deb3Fc590C8DUpdateManyResponseListModelWithValidators =
	ScoreSheet672E11Bb6Cd84Cc2867B876099C56271UpdateManyResponseModelWithValidators[]
export type ScoreSheet26E6Cd746E14467694616872933Eb1CeUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet434Fb9585Bbe4A2EA509D0Fd7Def5E5CUpsertManyResponseListModel =
	ScoreSheet26E6Cd746E14467694616872933Eb1CeUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheetaedddf72E51C46D68A50De90251Afe83CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type ScoreSheet33F43C3ADbc3469A9203Ea013B5Bcc86DeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetc8F01F69627C424988EeD3E795565785DeleteManyResponseListModel =
	ScoreSheet33F43C3ADbc3469A9203Ea013B5Bcc86DeleteManyResponseModelWithValidators[]
export type ScoreSheet5Fac4B9E1A334AfcBf1D0228C2Cca104PatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet88E6F702A9C14F8894641295852F5Cd5PatchManyResponseListModelWithValidators =
	ScoreSheet5Fac4B9E1A334AfcBf1D0228C2Cca104PatchManyResponseModelWithValidators[]
export type ScoreSheetb7Ff84997Fbb47F3A6D46Ca78523D1E5FindOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheete4Ae4Eb92F7347D1A8D32C47387Bade0FindOneResponseListModel =
	ScoreSheetb7Ff84997Fbb47F3A6D46Ca78523D1E5FindOneResponseModelWithValidators
export type ScoreSheet3F779D6E220C4B0BA27D210Ef536F195UpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet948054E207A945A9Bd78541205F05D04DeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetd01B7985734E45Fe9450A8B5B74Bb2DaPatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type AvailableMoves1079F6F44D8744Bf985759C0C7C9F3DbFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMoves900Fd928D1974150Ae7BF7D6A83C7155FindManyResponseListModel =

		| AvailableMoves1079F6F44D8744Bf985759C0C7C9F3DbFindManyResponseItemModelWithValidators[]

export type AvailableMovesa2C3E0EaCc654A33A5B01Ab24Ab9F0CdUpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves4Fbcf9C3D44C4057A62F986E610A84B8UpdateManyResponseListModelWithValidators =
	AvailableMovesa2C3E0EaCc654A33A5B01Ab24Ab9F0CdUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablemovesPut = {
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: string
}
export type AvailableMoves17E42B3EF21041F58D2705B2A9C7D067UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesd26Be7Cd67504C4FAaeaDc442B861EbaUpsertManyResponseListModel =
	AvailableMoves17E42B3EF21041F58D2705B2A9C7D067UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableMovesd273D78618Ea48Fe8B06Ecdda686D587CreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves35A7136110Bb45F9A5860568B6A0F20BDeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves2440592744554F6B8Ab74E183198Ce5ADeleteManyResponseListModel =
	AvailableMoves35A7136110Bb45F9A5860568B6A0F20BDeleteManyResponseModelWithValidators[]
export type AvailableMovesb934254F607E4Bc781EfB9Ee48Fb2609PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves7776F9CfAdcb4829A35F95A5674E3B65PatchManyResponseListModelWithValidators =
	AvailableMovesb934254F607E4Bc781EfB9Ee48Fb2609PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablemovesPatch = {
	sheet_id?: string
	name?: string
	fl_score?: number
	rb_score?: number
	direction?: string
}
export type AvailableMovesf42301Cf76E742B08D28Abfe4Fe379DeFindOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesd2E9A8Ad9F0A410D801F049252F3D3A2FindOneResponseListModel =
	AvailableMovesf42301Cf76E742B08D28Abfe4Fe379DeFindOneResponseModelWithValidators
export type AvailableMoves205Bae7FD1154801B911Efc4Ab46C9CcUpdateOneResponseModelWithValidators =
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
export type AvailableMoves9724F1608431462B8Bf56E8Ff4595D8CDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesbf39Cbf2Da704D9E91Ca35Bc614B8Fd6PatchOneResponseModelWithValidators =
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
export type ForeignScoreSheet84Cd26A451Ee4B989Ba44607C32Db908FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheet5Ba2E145A17244029F18A392189Fe6DaGetManyResponseForeignModel =
	ForeignScoreSheet84Cd26A451Ee4B989Ba44607C32Db908FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesddcb42BaB4Dc46E7Adcd170Ebbecd444FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves2B771487F5574E78B8Cd29149E2303AaGetManyResponseForeignModel =
	ForeignAvailableMovesddcb42BaB4Dc46E7Adcd170Ebbecd444FindManyResponseItemModelWithValidators[]
export type AvailableBonuses3Bff932944E34E20A65A68C8C94Cb88AFindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet5Ba2E145A17244029F18A392189Fe6DaGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves2B771487F5574E78B8Cd29149E2303AaGetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses6F24684A46034209B5816Ef01216A673FindManyResponseListModel =

		| AvailableBonuses3Bff932944E34E20A65A68C8C94Cb88AFindManyResponseItemModelWithValidators[]

export type TableNamee413F0D9C94C4277B9D71Ee012Abc8E5 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses1561D0147F6F41D0B8F82A20Dede7565UpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses5841689620F2406ABde424033614EfbeUpdateManyResponseListModelWithValidators =
	AvailableBonuses1561D0147F6F41D0B8F82A20Dede7565UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablebonusesPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonuses90267E78B5Ef406999B40Bad605Cff53UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses5A3Cb784C46C400881B3Aa8B9D2B9A5EUpsertManyResponseListModel =
	AvailableBonuses90267E78B5Ef406999B40Bad605Cff53UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableBonuses06Be7D4529F14B838990D4Efecd1C2AcCreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesc726302EA6864Eb9Be7E3243C45Fe3FdDeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses1726Fb9B96D64B8381B293Bf66B4C217DeleteManyResponseListModel =
	AvailableBonusesc726302EA6864Eb9Be7E3243C45Fe3FdDeleteManyResponseModelWithValidators[]
export type AvailableBonuses79E7B9E1D4Fe4Fd2A9C4Ef4D3Fe016AfPatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesdbee4A59A9F74Aa9B68F933Efee679F2PatchManyResponseListModelWithValidators =
	AvailableBonuses79E7B9E1D4Fe4Fd2A9C4Ef4D3Fe016AfPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablebonusesPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type AvailableBonuses6Af2A9B4A022459CAa1FD3D9319217C1FindOneResponseModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet5Ba2E145A17244029F18A392189Fe6DaGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves2B771487F5574E78B8Cd29149E2303AaGetManyResponseForeignModel
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesd1Ce11F37Ed4430AB194C156Aee0EacaFindOneResponseListModel =
	AvailableBonuses6Af2A9B4A022459CAa1FD3D9319217C1FindOneResponseModelWithValidators
export type TableName776C67614F614178Bda1B0261Ae1Ee35 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonusese0Ba923AD36D40Dc81171472D31396FfUpdateOneResponseModelWithValidators =
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
export type AvailableBonusesddfd1802440C4189B67C0B240Edeeb43DeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses820Db40D47504796B14FF3Cef13Bd07EPatchOneResponseModelWithValidators =
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
export type ForeignHeatac9D89BcA2D24A05A3D39Bde44A3984CFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeata853A10ECc8B46E4AbbdFda091C49B4AGetManyResponseForeignModel =
	ForeignHeatac9D89BcA2D24A05A3D39Bde44A3984CFindManyResponseItemModelWithValidators[]
export type ForeignPhasea74115BbE6954Da296C6E91602E67897FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase5Fa1Bc34C3974741AafcFdae45Ad04AeGetManyResponseForeignModel =
	ForeignPhasea74115BbE6954Da296C6E91602E67897FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesbef8B23F74A54Ff2B486E7Eabed8F45BFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves5Ce8006C328F4B47A54E7E8219891D4AGetManyResponseForeignModel =
	ForeignAvailableMovesbef8B23F74A54Ff2B486E7Eabed8F45BFindManyResponseItemModelWithValidators[]
export type ForeignAthlete8465005D938044B18Dfa855B25F506E6FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthlete1Dd9A56D61784906A223D5A1993E4Bb8GetManyResponseForeignModel =
	ForeignAthlete8465005D938044B18Dfa855B25F506E6FindManyResponseItemModelWithValidators[]
export type ScoredMovesd817184667B647F798F798219A0E0A7FFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeata853A10ECc8B46E4AbbdFda091C49B4AGetManyResponseForeignModel
		phase_foreign?: ForeignPhase5Fa1Bc34C3974741AafcFdae45Ad04AeGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves5Ce8006C328F4B47A54E7E8219891D4AGetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete1Dd9A56D61784906A223D5A1993E4Bb8GetManyResponseForeignModel
		id?: string
		move_id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		judge_id?: string
		athlete_id?: string
		direction?: string
	}
export type ScoredMoves83D16D1E63C6420DB15BD776D6435Ed9FindManyResponseListModel =

		| ScoredMovesd817184667B647F798F798219A0E0A7FFindManyResponseItemModelWithValidators[]

export type TableName66Ad992B5D524B96Bf8BD86B80C3068F =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMoves4Be7F70241D14E2A98E000903Ebd3872UpdateManyResponseModelWithValidators =
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
export type ScoredMoves5A9655E5Eb734700B6550F9E2E33693FUpdateManyResponseListModelWithValidators =
	ScoredMoves4Be7F70241D14E2A98E000903Ebd3872UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredmovesPut = {
	move_id: string
	heat_id: string
	run_number: number
	phase_id: string
	judge_id: string
	athlete_id: string
	direction: string
}
export type ScoredMoves29084C0E88394638A92B3547Bb7Ed302UpsertManyResponseItemModelRequireButDefaultWithValidators =
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
export type ScoredMovese72Fc14820654260B3Ea0859A3443203UpsertManyResponseListModel =
	ScoredMoves29084C0E88394638A92B3547Bb7Ed302UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredMovese3Adb03FD0Fa42F18C974Bc42002AabbCreateManyInsertItemRequestModel =
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
export type ScoredMoves75D2CdcbCc2F4Ffc9C1EB9D811Ecb3F1DeleteManyResponseModelWithValidators =
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
export type ScoredMoves80B953208A694Db2B29CA54073B12C49DeleteManyResponseListModel =
	ScoredMoves75D2CdcbCc2F4Ffc9C1EB9D811Ecb3F1DeleteManyResponseModelWithValidators[]
export type ScoredMoves18Ab6356Ef9D47B8A7C31153917A7F7FPatchManyResponseModelWithValidators =
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
export type ScoredMovesd12D32De755D4309862C1A7B2251Be66PatchManyResponseListModelWithValidators =
	ScoredMoves18Ab6356Ef9D47B8A7C31153917A7F7FPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredmovesPatch = {
	move_id?: string
	heat_id?: string
	run_number?: number
	phase_id?: string
	judge_id?: string
	athlete_id?: string
	direction?: string
}
export type ScoredMovesf30C04E96A7B4A08A8596826969D77A8FindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeata853A10ECc8B46E4AbbdFda091C49B4AGetManyResponseForeignModel
		phase_foreign?: ForeignPhase5Fa1Bc34C3974741AafcFdae45Ad04AeGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves5Ce8006C328F4B47A54E7E8219891D4AGetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete1Dd9A56D61784906A223D5A1993E4Bb8GetManyResponseForeignModel
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMoves5B830Ee146C145FfAbc29Ef089E5FaaaFindOneResponseListModel =
	ScoredMovesf30C04E96A7B4A08A8596826969D77A8FindOneResponseModelWithValidators
export type TableName2153Bede75F2478CA2E3A2133D2B1F10 =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMoves4A109B3A8E1F45E4B96B956039Ccb3AeUpdateOneResponseModelWithValidators =
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
export type ScoredMovesabd203Be76F04270B08B73C028A7A3C2DeleteOneResponseModelWithValidators =
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
export type ScoredMovesa4A1Aff939Dd4F80Ad3637B5365B0035PatchOneResponseModelWithValidators =
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
export type ForeignAvailableBonuses34Eac09A539840EaB6DbC351016C74AeFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableBonusesaae9F64D9Caa4F77939999Dda24Ba1D6GetManyResponseForeignModel =
	ForeignAvailableBonuses34Eac09A539840EaB6DbC351016C74AeFindManyResponseItemModelWithValidators[]
export type ForeignScoredMoves8A669D3FE746499E999F93Cda4855B2DFindManyResponseItemModelWithValidators =
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
export type ForeignScoredMovesab3780D0B8134740Bf5C9Ac5Cf1228EeGetManyResponseForeignModel =
	ForeignScoredMoves8A669D3FE746499E999F93Cda4855B2DFindManyResponseItemModelWithValidators[]
export type ScoredBonusesf4617C306A204F26B9F9Fee9583461BdFindManyResponseItemModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesaae9F64D9Caa4F77939999Dda24Ba1D6GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMovesab3780D0B8134740Bf5C9Ac5Cf1228EeGetManyResponseForeignModel
		id?: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonuses2F899146117340Bf97A29C953Bdc4374FindManyResponseListModel =

		| ScoredBonusesf4617C306A204F26B9F9Fee9583461BdFindManyResponseItemModelWithValidators[]

export type TableNamefc2444C99Ea744Bf8B571C9E4Dbfa752 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses5Dd15BffD5864C10Aa55B09067Fc7CcdUpdateManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses806Cb894A3B141E6907CCfbb0269AadcUpdateManyResponseListModelWithValidators =
	ScoredBonuses5Dd15BffD5864C10Aa55B09067Fc7CcdUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredbonusesPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonuses0A0875Ae5C4D46388Ec09063C809A34EUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses8240E590A52A40F0A7521Fd8929438FaUpsertManyResponseListModel =
	ScoredBonuses0A0875Ae5C4D46388Ec09063C809A34EUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredBonusesdf4Bc8F963C546F288240Ade7716288CCreateManyInsertItemRequestModel =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesd3675D0AB96F4C569122600F3Db383AaDeleteManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusese440A9DaFf5345D3963774B9B3De20EcDeleteManyResponseListModel =
	ScoredBonusesd3675D0AB96F4C569122600F3Db383AaDeleteManyResponseModelWithValidators[]
export type ScoredBonuses1249969E733D40F0A5C5Eba36A64Fba0PatchManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses8Db54123037041A99E382Fc3E837993CPatchManyResponseListModelWithValidators =
	ScoredBonuses1249969E733D40F0A5C5Eba36A64Fba0PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredbonusesPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ScoredBonuses9423Cf3B4F844A57B1F209B073Fbd996FindOneResponseModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonusesaae9F64D9Caa4F77939999Dda24Ba1D6GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMovesab3780D0B8134740Bf5C9Ac5Cf1228EeGetManyResponseForeignModel
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses4422C7383A134Af0Bc4CBd4C0Ab20796FindOneResponseListModel =
	ScoredBonuses9423Cf3B4F844A57B1F209B073Fbd996FindOneResponseModelWithValidators
export type TableName922C94AdB87443FaB6253Ff0079737F0 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonusesd5Dcf61C00E64E31Bf4AE733F966Ed57UpdateOneResponseModelWithValidators =
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
export type ScoredBonusesce9Ab08FBca3480DB195362434B9C31FDeleteOneResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses57D877B9Ccda4E7DA3Ab81596640Fce6PatchOneResponseModelWithValidators =
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
export type ForeignHeat0D5Dec1625Ae4D3486Ae12Da7Ac3D093FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat8E3Aefbd0B1D4C77A7Fc4Ed16Fd57656GetManyResponseForeignModel =
	ForeignHeat0D5Dec1625Ae4D3486Ae12Da7Ac3D093FindManyResponseItemModelWithValidators[]
export type ForeignAthlete10C867Ab6Ec44A348C443C1E5C6Ae75EFindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthlete33Dc90A71Ad8412EA5D939C0B3888FeeGetManyResponseForeignModel =
	ForeignAthlete10C867Ab6Ec44A348C443C1E5C6Ae75EFindManyResponseItemModelWithValidators[]
export type ForeignPhase0B8072Ce609C4237989DB2B0C1Ce8Bc0FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhasea80Da7A7Ea5747C18708Af36Ed8CefdaGetManyResponseForeignModel =
	ForeignPhase0B8072Ce609C4237989DB2B0C1Ce8Bc0FindManyResponseItemModelWithValidators[]
export type Athleteheat88D0440A2Ac844569AceEb2C9579E9F6FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat8E3Aefbd0B1D4C77A7Fc4Ed16Fd57656GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete33Dc90A71Ad8412EA5D939C0B3888FeeGetManyResponseForeignModel
		phase_foreign?: ForeignPhasea80Da7A7Ea5747C18708Af36Ed8CefdaGetManyResponseForeignModel
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type Athleteheata44C4F33D9F3429D941C3586459368CfFindManyResponseListModel =

		| Athleteheat88D0440A2Ac844569AceEb2C9579E9F6FindManyResponseItemModelWithValidators[]

export type TableName45C32Ea3Ae7D412784F4079F78Bb6D7C =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat419D612EDd9E41Bb86C954A09Bcd6F43UpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat35262F4670A34165Aec359C31D2656C9UpdateManyResponseListModelWithValidators =
	Athleteheat419D612EDd9E41Bb86C954A09Bcd6F43UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthleteheatPut = {
	heat_id: string
	athlete_id: string
	phase_id: string
	last_phase_rank: number
}
export type Athleteheat190A0780540541F0939D9Ce8A3451DaeUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat6780F0F030C4420197A8D903Ee2509D0UpsertManyResponseListModel =
	Athleteheat190A0780540541F0939D9Ce8A3451DaeUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheatb01452A9Bedf4B1D8A5D7F4E14D1C15ECreateManyInsertItemRequestModel =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheatd25D7C9789D0438DAb18982C9A62E3CeDeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat6E5720Fd0Fcc4A28813A5E8462D406DfDeleteManyResponseListModel =
	Athleteheatd25D7C9789D0438DAb18982C9A62E3CeDeleteManyResponseModelWithValidators[]
export type Athleteheat368383F87D3E474289Cc2F88C184E669PatchManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheateca5Fe6173744D7095D4Be18Da384F7EPatchManyResponseListModelWithValidators =
	Athleteheat368383F87D3E474289Cc2F88C184E669PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthleteheatPatch = {
	heat_id?: string
	athlete_id?: string
	phase_id?: string
	last_phase_rank?: number
}
export type Athleteheat9A0C9C30154749278F028D8E85B79Bc9FindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat8E3Aefbd0B1D4C77A7Fc4Ed16Fd57656GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete33Dc90A71Ad8412EA5D939C0B3888FeeGetManyResponseForeignModel
		phase_foreign?: ForeignPhasea80Da7A7Ea5747C18708Af36Ed8CefdaGetManyResponseForeignModel
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat20A67Cf629C3474989A821Ee26037813FindOneResponseListModel =
	Athleteheat9A0C9C30154749278F028D8E85B79Bc9FindOneResponseModelWithValidators
export type TableNamea8F4A1EbF45B418D895570Fd16C54969 =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat698A1E4E83Fc44F4BafaB67Cef4942C7UpdateOneResponseModelWithValidators =
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
export type Athleteheat8A17C63A509D4Aac9E1C46Bb766B5Cd4DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheate638890791814D7B92Bc428Ef0C2563APatchOneResponseModelWithValidators =
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
	useUploadUploadPostMutation,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation,
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatScoresGetHeatScoresHeatIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery,
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation,
	usePhasePdfPhasePdfPhaseIdGetQuery,
	useHeatPdfHeatPdfPostMutation,
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
