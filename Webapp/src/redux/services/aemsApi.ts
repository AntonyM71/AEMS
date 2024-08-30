import { emptySplitApi as api } from "./emptyApi"
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		uploadCompetitionManagementUploadPost: build.mutation<
			UploadCompetitionManagementUploadPostApiResponse,
			UploadCompetitionManagementUploadPostApiArg
		>({
			query: (queryArg) => ({
				url: `/competition_management/upload`,
				method: "POST",
				body: queryArg.bodyUploadCompetitionManagementUploadPost
			})
		}),
		promotePhaseCompetitionManagementPromotePhasePost: build.mutation<
			PromotePhaseCompetitionManagementPromotePhasePostApiResponse,
			PromotePhaseCompetitionManagementPromotePhasePostApiArg
		>({
			query: (queryArg) => ({
				url: `/competition_management/promote_phase`,
				method: "POST",
				body: queryArg.newPhaseInfo
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
		heatPdfHeatPdfGet: build.query<
			HeatPdfHeatPdfGetApiResponse,
			HeatPdfHeatPdfGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat_pdf`,
				params: { heat_ids: queryArg.heatIds }
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
export type UploadCompetitionManagementUploadPostApiResponse =
	/** status 200 Successful Response */ any
export type UploadCompetitionManagementUploadPostApiArg = {
	bodyUploadCompetitionManagementUploadPost: BodyUploadCompetitionManagementUploadPost
}
export type PromotePhaseCompetitionManagementPromotePhasePostApiResponse =
	/** status 200 Successful Response */ any
export type PromotePhaseCompetitionManagementPromotePhasePostApiArg = {
	newPhaseInfo: NewPhaseInfo
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
export type HeatPdfHeatPdfGetApiResponse =
	/** status 200 Successful Response */ any
export type HeatPdfHeatPdfGetApiArg = {
	heatIds?: string[]
}
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competitionf61Acee84C244F76A75A6781D6C69A3DFindManyResponseListModel
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
	joinForeignTable?: TableName5Ecdd794593A4Fdf99054649585504Ae[]
}
export type EntireUpdateManyByQueryCompetitionPutApiResponse =
	/** status 200 Successful Response */ Competition4398E451F91F4A0E975AEc5Caa2753DbUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Competitionb4B79Ffb2E524Ab286E8Fc5B71827Bd6UpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	body: Competition0B087Ad36A774211849268F4625Da928CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryCompetitionDeleteApiResponse =
	/** status 200 Successful Response */ Competitioncf07C51EEbb54BfcB4F28395Deb26104DeleteManyResponseListModel
export type DeleteManyByQueryCompetitionDeleteApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryCompetitionPatchApiResponse =
	/** status 200 Successful Response */ Competition42C710DdE4Ae4C00B1940250D4Faf331PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Competition60Ae807725214E248De799E73511D891FindOneResponseListModel
export type GetOneByPrimaryKeyCompetitionIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName2F2C205930924438A4250F2Ec1412094[]
}
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiResponse =
	/** status 200 Successful Response */ Competition7Fd19Df09E404B87859807D79A8Bd54FUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyCompetitionIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiResponse =
	/** status 200 Successful Response */ Competition649B484D267241EcB4E9964C3E8C64EfDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyCompetitionIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competitiond64672D926454D3C98F6F653Edf71236PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIdfb3019A1608B4B8B9008F931A0F01C75FindOneResponseListModel
export type GetOneByPkFromEventCompetitionCompetitionPkIdEventEventPkIdGetApiArg =
	{
		competitionPkId: string
		eventPkId: string
		nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
		nameStr?: string[]
		nameListComparisonOperator?: ItemComparisonOperators
		nameList?: string[]
		joinForeignTable?: TableName82FcdabeFa77410DA3B73208F1Ce6D5E[]
	}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId55B81429Cfff4D0A924DB74888B52C42FindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName22193406Bc504E56A931E107Dad43Fb0[]
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Eventf811F7D4De694E609643413E6Eb10Ac0FindManyResponseListModel
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
	joinForeignTable?: TableNamef5B8Fad8Fc504944A31F5Db0Ba0F1Ba8[]
}
export type EntireUpdateManyByQueryEventPutApiResponse =
	/** status 200 Successful Response */ Event08296Fc8C86944E4Ba7860B9Da8E1997UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Evente7994C72E60A4Dd4B0A5D3611E3B6E19UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	body: Event45Ca0Daf69Ea4Dea96DeA146E2C97BdaCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryEventDeleteApiResponse =
	/** status 200 Successful Response */ Eventd857C27F81Ca495B8Fd46970A07B74DbDeleteManyResponseListModel
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
	/** status 200 Successful Response */ Event1241D7F7F2704Bfb948E09C1791541FfPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Event366A1D385B1F4Db0B5Fe2763Ad54Ba09FindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName2C9E0Ea25Fb14Bfc9D25Deefc36Fc02A[]
}
export type EntireUpdateByPrimaryKeyEventIdPutApiResponse =
	/** status 200 Successful Response */ Eventcf862387474E433BA50613Eee2620195UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Event7Fabdb634B444A4EB98FD058B4C865AcDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Eventccadd1285B1E4B6F8035D85038D31840PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ EventIdPhaseIddd38F88CAaa842A9A8232A812Cfca6C5FindOneResponseListModel
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
	joinForeignTable?: TableNamed33496E8C24C4284B0Aa17F339Ed2Bd2[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseIdcad803213A3447C49333A3Abd672D90CFindManyResponseListModel
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
	joinForeignTable?: TableName548E3Ff673944750A988F6Dbbd7062Eb[]
}
export type GetManyPhaseGetApiResponse =
	/** status 200 Successful Response */ Phase849E86FeC738494FB2EbFb14046603B7FindManyResponseListModel
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
	joinForeignTable?: TableName78C775D54A1C4026805236D101592Bb4[]
}
export type EntireUpdateManyByQueryPhasePutApiResponse =
	/** status 200 Successful Response */ Phaseee0De073Dd5A4Ce98A3A151F4F641790UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Phase0833233F2E884590B04717D4761536BbUpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	body: Phase8A005231B18A4Fd9Af53502B385E9Ee3CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryPhaseDeleteApiResponse =
	/** status 200 Successful Response */ Phase81Cf106BFced47258303B34A4D4F1877DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Phase8256A8D1646B440FBc1FDccd023F0F6CPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Phasecc168997444B4562Ac1F5A65D249D240FindOneResponseListModel
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
	joinForeignTable?: TableNamea7Bcea76Ab0A4524A9A92D167A32Dfec[]
}
export type EntireUpdateByPrimaryKeyPhaseIdPutApiResponse =
	/** status 200 Successful Response */ Phase095Fdcfe08B7457194D54Fb8865564BbUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phasea1416B2956A640Af87250Dd005720D10DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Phase6893C3E3E9834210Aa44Ff235F1Da9D0PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat83D9Dec7Ec424Cfe9136D1C0133Ee4FdFindManyResponseListModel
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
	joinForeignTable?: TableName7C9Ea58B63E349C0939081C5Ca6Fa494[]
}
export type EntireUpdateManyByQueryHeatPutApiResponse =
	/** status 200 Successful Response */ Heat8199Cb2B5Bfb4B0BAdda3E526E998597UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Heat361F8Ed84Da14F9B96102D557C941B20UpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	body: Heat0E919BfbFd4B4A9B9348Fef16127B995CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryHeatDeleteApiResponse =
	/** status 200 Successful Response */ Heat7C1890E8311A41F8B29FD2Dfff7634C5DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Heatccc4526CAa404E43A3D9174248B64AecPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Heatc6C86C6650C84Ac9957A4276C5BacaaeFindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName9F33F26036Fa48718C2028Ab0Afd6Cd2[]
}
export type EntireUpdateByPrimaryKeyHeatIdPutApiResponse =
	/** status 200 Successful Response */ Heat98Fe34B71C044A5882Ce48Fe80Ec0F46UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heatbb4E71Ca4A9E47E49D9314Af8E9D9642DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Heat8Ab6Dcbb379E446982A905022E8A53C5PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athlete03Bf1B0C42E346EbBea698B875E6478AFindManyResponseListModel
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
	joinForeignTable?: TableName33960F4463A24711845D5D5606814Fd7[]
}
export type EntireUpdateManyByQueryAthletePutApiResponse =
	/** status 200 Successful Response */ Athlete941F8D332Eb0495A81B6F24Ef6B68D46UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Athlete4E766A70C4Dc42A893EaA4086Ff011C9UpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	body: Athlete67B42D7284884A75B6A833Cf5Da32612CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteDeleteApiResponse =
	/** status 200 Successful Response */ Athleteff664E0F09Aa4Ed3B3D523C17Dd77267DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Athlete72E78Adc6A5245928F73509460A906CcPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Athlete0Fde6055C52A47A7Af6EE8C9Fe65F85EFindOneResponseListModel
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
	joinForeignTable?: TableName1Ea124Ac2Afd4023Bfd967Ed881Fed89[]
}
export type EntireUpdateByPrimaryKeyAthleteIdPutApiResponse =
	/** status 200 Successful Response */ Athlete5006Db71Ede245089519Da0C3F8C002AUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athlete2D42816C96E64Cad9Cf9E4156Aed480DDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteac6Adf21202F4C7CB17A23Fc46439A74PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheete13C6B9AE24D46859F1D98226Ae12F73FindManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheet8E40DfbeAecf40B38Da3F7B17A7E8919UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoreSheetf5624B2145E849D88Fb63B6Ef37D42B6UpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	body: ScoreSheet43991E03Fc644994A82C23D9Deb5C286CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoresheetDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheet7861D15890Ba4B3490A011Cbf187Ce40DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoreSheet3Dc3Ec55D0394A8293Cc8101C8A9581FPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheet46Ae3Fa9232E433CAd648E494C636EfcFindOneResponseListModel
export type GetOneByPrimaryKeyScoresheetIdGetApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiResponse =
	/** status 200 Successful Response */ ScoreSheet3Ae931907347483CAd6D962Ef97C52D0UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyScoresheetIdPutApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiResponse =
	/** status 200 Successful Response */ ScoreSheete5B320C96B3842A3A2635752694Fb35BDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyScoresheetIdDeleteApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiResponse =
	/** status 200 Successful Response */ ScoreSheeta90954Ee37634A748F6F92037F9Ce284PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyScoresheetIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMoves0564Cab615824A2B8D453C02656D4127FindManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves438Cf30FEb8A4B01Bdd50E6A9E1Cfc54UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableMoves4C3E0E573C4B4E13903E12Da03559710UpsertManyResponseListModel
export type InsertManyAvailablemovesPostApiArg = {
	body: AvailableMovese28814Ce931645679Fe20B2E62F15851CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablemovesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableMovesbfa7C4Dd2Da44049827D63253D173430DeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableMovesf5F24B9BCcd04Ef1A4021440C27Fd2CfPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableMoves3797Ad1C24F947Aa9964Fde6Ac292A33FindOneResponseListModel
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
	/** status 200 Successful Response */ AvailableMoves1872E9B35Eea4029B757F5E459471Fa3UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMoves9C3423FcCdbc4Ea18E2A3239B77Cfd4BDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableMovesae92Bfb46Bd34607B786D765E1Bb7Bb6PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesc264D2179C704688B0505Dda5465Edd7FindManyResponseListModel
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
	joinForeignTable?: TableNamef902A27DB7144Dc38A71Db44D6F1Af7A[]
}
export type EntireUpdateManyByQueryAvailablebonusesPutApiResponse =
	/** status 200 Successful Response */ AvailableBonusesa48B881A010B4Cc89F8CD400891Ac5BbUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ AvailableBonusesbea5Dd1A737E4DacB76E359A2742945BUpsertManyResponseListModel
export type InsertManyAvailablebonusesPostApiArg = {
	body: AvailableBonusesb0884454E93E4D75Afad268F8C32476DCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAvailablebonusesDeleteApiResponse =
	/** status 200 Successful Response */ AvailableBonusesa9D30DcbC9B14AfaAdc323B0F4275Dc0DeleteManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonuses20Cb0C00551746A0BeebF9F5C2C2C806PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonuses0679E3DcA18847768Cad66D86Be55C54FindOneResponseListModel
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
	joinForeignTable?: TableName2Aa51E09Cbd94614B7Da3B3C7E5C7C22[]
}
export type EntireUpdateByPrimaryKeyAvailablebonusesIdPutApiResponse =
	/** status 200 Successful Response */ AvailableBonuses5C55649FFd2740358720840Bbccb3Ec8UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesbcfb42F9C579452CA97EBfe46447B7BdDeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ AvailableBonusesdb7528E4Dbb84F068C11E0C03394987FPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves4659821AC4A44Ee7A9E6D8E9A73909CcFindManyResponseListModel
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
	joinForeignTable?: TableNamed23D956045284366Ade178D4B80F2F66[]
}
export type EntireUpdateManyByQueryScoredmovesPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves4Cab4Db9Ac9E40B08576A30148E8Dd3EUpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredMoves2A7C72000D374Dbc905A28C25786Cea5UpsertManyResponseListModel
export type InsertManyScoredmovesPostApiArg = {
	body: ScoredMoves6F2Fa0D5C3614604943D573359D7A8D3CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMoves35F019Ca54914251Aac0Beffa4188D82DeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredMoves7Eb75Da198A64083A6A7A10645805E7APatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves1Db09A91Ceb4429385266F1276Aad290FindOneResponseListModel
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
	joinForeignTable?: TableName8441F57E4A3E4E4BAc56B1F4B77375Fb[]
}
export type EntireUpdateByPrimaryKeyScoredmovesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredMoves07E7183E9A084A9084714F5C7E3F45FcUpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves418384E4A92B476696B18Be7Fd0B80B4DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredMoves9Aff1C29A20E43F0951140B9846Cc9B2PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonusesd68Dc15AE89747E5Adc9A8Cc3E1Eff80FindManyResponseListModel
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
	joinForeignTable?: TableNameb754C0A3E5504658Ace8089Cdb011783[]
}
export type EntireUpdateManyByQueryScoredbonusesPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses1Cc4E7Af668D472D8B5CD4Efb50813A4UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ ScoredBonuses22574Fe0Ddf14C22829DD547A6084F3CUpsertManyResponseListModel
export type InsertManyScoredbonusesPostApiArg = {
	body: ScoredBonuses7B372Cd5F8544Dd99B2F6A236363FaedCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryScoredbonusesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredBonusese9F189Cb034F4B8096C02Cba166Ef5EfDeleteManyResponseListModel
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
	/** status 200 Successful Response */ ScoredBonusesb32Eb20FF4A5489A80AcE5B08Bdba04EPatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses2097Ac9D8F1749F79A3128Ac27Bc01B1FindOneResponseListModel
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
	joinForeignTable?: TableName7273F33CEbb747A1A296825D69626841[]
}
export type EntireUpdateByPrimaryKeyScoredbonusesIdPutApiResponse =
	/** status 200 Successful Response */ ScoredBonuses44Ac105926594Cc58Db452821305E133UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonuses8Dfa9E234F69427187CaD1807E88C542DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoredBonusese0817F91Adac445BAb2AD6Aa37A4A686PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat3B94628C6Be14Bd2Ab5E14Afeb7756F9FindManyResponseListModel
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
	joinForeignTable?: TableName68B7D9AcA6Cf4298B337B2A26C0Afed0[]
}
export type EntireUpdateManyByQueryAthleteheatPutApiResponse =
	/** status 200 Successful Response */ Athleteheat65Da9Dd512984918B54FF2C06F280614UpdateManyResponseListModelWithValidators
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
	/** status 201 Successful Response */ Athleteheateb6Ee52734F342578645Be66B38906EcUpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	body: Athleteheata9A9F8E299644B1EBedbA0Ec6501F97DCreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryAthleteheatDeleteApiResponse =
	/** status 200 Successful Response */ Athleteheat4051012918F94120997B08F9925Ad5D5DeleteManyResponseListModel
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
	/** status 200 Successful Response */ Athleteheat00094Fe4E8874852BabcEaca3Cf1F238PatchManyResponseListModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat71Abf340C0Cb4402930CB01B6B140Bb1FindOneResponseListModel
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
	joinForeignTable?: TableName33425082Fa394F2191A8F9Df7Ff70189[]
}
export type EntireUpdateByPrimaryKeyAthleteheatIdPutApiResponse =
	/** status 200 Successful Response */ Athleteheat582Ebcad031A4C09B7D1F9C4832E7Ac7UpdateOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheatd58Fa3434C374146B5C865F30C3Cba23DeleteOneResponseModelWithValidators
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
	/** status 200 Successful Response */ Athleteheat92Fe70B32Eae419EBf9056586De75024PatchOneResponseModelWithValidators
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
export type BodyUploadCompetitionManagementUploadPost = {
	competition_name: string
	file: Blob
}
export type NewPhaseInfo = {
	new_heat_names: string[]
	phase_id: string
	new_phase_name: string
	number_of_paddlers: number
	number_of_runs?: number
	number_of_runs_for_score?: number
	number_of_judges?: number
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
	event_name: string
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
export type ForeignEvent34Fe22980C0F47BbBec111Dd3Aadd4BfFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventfd998E16E9A1481FB455034B9B62D191GetManyResponseForeignModel =
	ForeignEvent34Fe22980C0F47BbBec111Dd3Aadd4BfFindManyResponseItemModelWithValidators[]
export type Competition3164899CAf6A43E8A2A37Eecc0862666FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEventfd998E16E9A1481FB455034B9B62D191GetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competitionf61Acee84C244F76A75A6781D6C69A3DFindManyResponseListModel =

		| Competition3164899CAf6A43E8A2A37Eecc0862666FindManyResponseItemModelWithValidators[]

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
export type TableName5Ecdd794593A4Fdf99054649585504Ae = "event"
export type Competition34713C849E1746C69Dd5B6C08C72Ad80UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition4398E451F91F4A0E975AEc5Caa2753DbUpdateManyResponseListModelWithValidators =
	Competition34713C849E1746C69Dd5B6C08C72Ad80UpdateManyResponseModelWithValidators[]
export type Competition5D1D908E5C4049E9B20BFecee8Dbaef8UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type Competitionb4B79Ffb2E524Ab286E8Fc5B71827Bd6UpsertManyResponseListModel =
	Competition5D1D908E5C4049E9B20BFecee8Dbaef8UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition0B087Ad36A774211849268F4625Da928CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type Competition663Bb1Cd659D4CfcBd8F237B5D51Ea8FDeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitioncf07C51EEbb54BfcB4F28395Deb26104DeleteManyResponseListModel =
	Competition663Bb1Cd659D4CfcBd8F237B5D51Ea8FDeleteManyResponseModelWithValidators[]
export type Competitionfd67Bff6D0384FcfAea3Dd90F5Ad2Be0PatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition42C710DdE4Ae4C00B1940250D4Faf331PatchManyResponseListModelWithValidators =
	Competitionfd67Bff6D0384FcfAea3Dd90F5Ad2Be0PatchManyResponseModelWithValidators[]
export type Competitiondfe5Ff95709A416CA3428A8Fa68A8030FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEventfd998E16E9A1481FB455034B9B62D191GetManyResponseForeignModel
		id: string
		name: string
	}
export type Competition60Ae807725214E248De799E73511D891FindOneResponseListModel =
	Competitiondfe5Ff95709A416CA3428A8Fa68A8030FindOneResponseModelWithValidators
export type TableName2F2C205930924438A4250F2Ec1412094 = "event"
export type Competition7Fd19Df09E404B87859807D79A8Bd54FUpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competition649B484D267241EcB4E9964C3E8C64EfDeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type Competitiond64672D926454D3C98F6F653Edf71236PatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ForeignCompetitioned761B4D54Bd4Cfb8B2DB2F46F4253B8FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition2Ecde458039C4B10Be738B0Cacb52D13GetManyResponseForeignModel =
	ForeignCompetitioned761B4D54Bd4Cfb8B2DB2F46F4253B8FindManyResponseItemModelWithValidators[]
export type ForeignPhase7Ed28E354F114F6EAbfdA72A2C8DeeeeFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase57Bc2458D4Cb403D921DDdc062F47B64GetManyResponseForeignModel =
	ForeignPhase7Ed28E354F114F6EAbfdA72A2C8DeeeeFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId1D5744B5D89640E1Acaa58Dddc23E965FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition2Ecde458039C4B10Be738B0Cacb52D13GetManyResponseForeignModel
		phase_foreign?: ForeignPhase57Bc2458D4Cb403D921DDdc062F47B64GetManyResponseForeignModel
	}
export type CompetitionIdEventIdfb3019A1608B4B8B9008F931A0F01C75FindOneResponseListModel =
	CompetitionIdEventId1D5744B5D89640E1Acaa58Dddc23E965FindOneResponseModelWithValidators
export type TableName82FcdabeFa77410DA3B73208F1Ce6D5E = "competition" | "phase"
export type ForeignCompetitionc160E105Be064920883AA91Eaf19Ea76FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionfc78B645Fef647F797C5Ecf9Fff143EdGetManyResponseForeignModel =
	ForeignCompetitionc160E105Be064920883AA91Eaf19Ea76FindManyResponseItemModelWithValidators[]
export type ForeignPhasea61C5F41A3Bd445781300100Ba0BccbfFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhaseacdc4672Ae944B909Eb717Cfe6Cc6D3FGetManyResponseForeignModel =
	ForeignPhasea61C5F41A3Bd445781300100Ba0BccbfFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventIdf1A9109454A64Ca0Bfe62A45E942Cb79FindOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetitionfc78B645Fef647F797C5Ecf9Fff143EdGetManyResponseForeignModel
		phase_foreign?: ForeignPhaseacdc4672Ae944B909Eb717Cfe6Cc6D3FGetManyResponseForeignModel
	}
export type CompetitionIdEventId55B81429Cfff4D0A924DB74888B52C42FindManyResponseListModel =

		| CompetitionIdEventIdf1A9109454A64Ca0Bfe62A45E942Cb79FindOneResponseModelWithValidators[]

export type TableName22193406Bc504E56A931E107Dad43Fb0 = "competition" | "phase"
export type ForeignCompetition695095B3Cf1B47589695144A1B9F84BdFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition4Af0986DF3F94854861C21943D3D7Be2GetManyResponseForeignModel =
	ForeignCompetition695095B3Cf1B47589695144A1B9F84BdFindManyResponseItemModelWithValidators[]
export type ForeignPhase43Ae2052E0334E038Be85627E8A9A314FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase206B31579Ca24CaaBb78Da8C2525229AGetManyResponseForeignModel =
	ForeignPhase43Ae2052E0334E038Be85627E8A9A314FindManyResponseItemModelWithValidators[]
export type Event707F77FaB7Cc4B5EAd8BBe00Dbd40661FindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetition4Af0986DF3F94854861C21943D3D7Be2GetManyResponseForeignModel
		phase_foreign?: ForeignPhase206B31579Ca24CaaBb78Da8C2525229AGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Eventf811F7D4De694E609643413E6Eb10Ac0FindManyResponseListModel =
	| Event707F77FaB7Cc4B5EAd8BBe00Dbd40661FindManyResponseItemModelWithValidators[]

export type TableNamef5B8Fad8Fc504944A31F5Db0Ba0F1Ba8 = "competition" | "phase"
export type Event8113C1C52C924B1DA29A3F42Dc7F14CbUpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event08296Fc8C86944E4Ba7860B9Da8E1997UpdateManyResponseListModelWithValidators =
	Event8113C1C52C924B1DA29A3F42Dc7F14CbUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryEventPut = {
	competition_id: string
	name: string
}
export type Event23705E8F92E3462CA518D9B3Bc4E93FbUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Evente7994C72E60A4Dd4B0A5D3611E3B6E19UpsertManyResponseListModel =
	Event23705E8F92E3462CA518D9B3Bc4E93FbUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Event45Ca0Daf69Ea4Dea96DeA146E2C97BdaCreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventc33590D36E2F42D5B5858562D39Ffae4DeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventd857C27F81Ca495B8Fd46970A07B74DbDeleteManyResponseListModel =
	Eventc33590D36E2F42D5B5858562D39Ffae4DeleteManyResponseModelWithValidators[]
export type Event2Feb34Bf84284C959565Dabddf9A5654PatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Event1241D7F7F2704Bfb948E09C1791541FfPatchManyResponseListModelWithValidators =
	Event2Feb34Bf84284C959565Dabddf9A5654PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryEventPatch = {
	competition_id?: string
	name?: string
}
export type Event40Dc0587B0Ff480C8F948Bc51070173AFindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetition4Af0986DF3F94854861C21943D3D7Be2GetManyResponseForeignModel
		phase_foreign?: ForeignPhase206B31579Ca24CaaBb78Da8C2525229AGetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Event366A1D385B1F4Db0B5Fe2763Ad54Ba09FindOneResponseListModel =
	Event40Dc0587B0Ff480C8F948Bc51070173AFindOneResponseModelWithValidators
export type TableName2C9E0Ea25Fb14Bfc9D25Deefc36Fc02A = "competition" | "phase"
export type Eventcf862387474E433BA50613Eee2620195UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyEventIdPut = {
	competition_id: string
	name: string
}
export type Event7Fabdb634B444A4EB98FD058B4C865AcDeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Eventccadd1285B1E4B6F8035D85038D31840PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyEventIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignEvent3E206E22Bf884C8EA3F6C58E3D451F80FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent7D5Adf1EC13542D3A99D2D18Afe718C3GetManyResponseForeignModel =
	ForeignEvent3E206E22Bf884C8EA3F6C58E3D451F80FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatc34501Db0A754Ae1A6B72Fde45B01154FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat3Fcb4Fa28Df64864Beb45Bf685D5F342GetManyResponseForeignModel =
	ForeignAthleteheatc34501Db0A754Ae1A6B72Fde45B01154FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId0Bd03C34E5C94327Ae33B81E46Cd2D5FFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEvent7D5Adf1EC13542D3A99D2D18Afe718C3GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat3Fcb4Fa28Df64864Beb45Bf685D5F342GetManyResponseForeignModel
	}
export type EventIdPhaseIddd38F88CAaa842A9A8232A812Cfca6C5FindOneResponseListModel =
	EventIdPhaseId0Bd03C34E5C94327Ae33B81E46Cd2D5FFindOneResponseModelWithValidators
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableNamed33496E8C24C4284B0Aa17F339Ed2Bd2 = "event" | "athleteheat"
export type ForeignEvent1Ea4Cc16F1D04Daa854B59Ed08A134B9FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventf0C307325965429CA5A0E2Bd86Ab2001GetManyResponseForeignModel =
	ForeignEvent1Ea4Cc16F1D04Daa854B59Ed08A134B9FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat23Bc727FC6134B2CB3A0948A1F72916AFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat5531A92DCb084Ce1Bd274929Bf457Aa5GetManyResponseForeignModel =
	ForeignAthleteheat23Bc727FC6134B2CB3A0948A1F72916AFindManyResponseItemModelWithValidators[]
export type EventIdPhaseId5Df07E047C884Cc7B864003D2B84490EFindOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEventf0C307325965429CA5A0E2Bd86Ab2001GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat5531A92DCb084Ce1Bd274929Bf457Aa5GetManyResponseForeignModel
	}
export type EventIdPhaseIdcad803213A3447C49333A3Abd672D90CFindManyResponseListModel =

		| EventIdPhaseId5Df07E047C884Cc7B864003D2B84490EFindOneResponseModelWithValidators[]

export type TableName548E3Ff673944750A988F6Dbbd7062Eb = "event" | "athleteheat"
export type ForeignEvent7E239B9D42004Ad3B7946E84B7B1F6F5FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent70472984226B48B98F197Fd1F71D5895GetManyResponseForeignModel =
	ForeignEvent7E239B9D42004Ad3B7946E84B7B1F6F5FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheate8Bc9C8E7Ee0444DAbab752Df1473B96FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatbdcc152953784Fd3864BDf23201A6D8DGetManyResponseForeignModel =
	ForeignAthleteheate8Bc9C8E7Ee0444DAbab752Df1473B96FindManyResponseItemModelWithValidators[]
export type Phasedfd84B9AA58E479A99794D0194E5E27DFindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent70472984226B48B98F197Fd1F71D5895GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatbdcc152953784Fd3864BDf23201A6D8DGetManyResponseForeignModel
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type Phase849E86FeC738494FB2EbFb14046603B7FindManyResponseListModel =
	| Phasedfd84B9AA58E479A99794D0194E5E27DFindManyResponseItemModelWithValidators[]

export type TableName78C775D54A1C4026805236D101592Bb4 = "event" | "athleteheat"
export type Phase41Cd6E1E056641458516Bb5A5D3Ef0CfUpdateManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phaseee0De073Dd5A4Ce98A3A151F4F641790UpdateManyResponseListModelWithValidators =
	Phase41Cd6E1E056641458516Bb5A5D3Ef0CfUpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryPhasePut = {
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
}
export type Phase345F0139D10E4D3E92AfD8A69De793DeUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase0833233F2E884590B04717D4761536BbUpsertManyResponseListModel =
	Phase345F0139D10E4D3E92AfD8A69De793DeUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase8A005231B18A4Fd9Af53502B385E9Ee3CreateManyInsertItemRequestModel =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phaseabfa88458Eb64A009Efe3E2Ff0E2E74BDeleteManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase81Cf106BFced47258303B34A4D4F1877DeleteManyResponseListModel =
	Phaseabfa88458Eb64A009Efe3E2Ff0E2E74BDeleteManyResponseModelWithValidators[]
export type Phase0243D1Ed4F5943D0A6943Fd845227DdbPatchManyResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase8256A8D1646B440FBc1FDccd023F0F6CPatchManyResponseListModelWithValidators =
	Phase0243D1Ed4F5943D0A6943Fd845227DdbPatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryPhasePatch = {
	event_id?: string
	name?: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	number_of_judges?: number
	scoresheet?: string
}
export type Phasece5Ab15DD5Dd4B8EA4160701Eff2C2C4FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent70472984226B48B98F197Fd1F71D5895GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatbdcc152953784Fd3864BDf23201A6D8DGetManyResponseForeignModel
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasecc168997444B4562Ac1F5A65D249D240FindOneResponseListModel =
	Phasece5Ab15DD5Dd4B8EA4160701Eff2C2C4FindOneResponseModelWithValidators
export type TableNamea7Bcea76Ab0A4524A9A92D167A32Dfec = "event" | "athleteheat"
export type Phase095Fdcfe08B7457194D54Fb8865564BbUpdateOneResponseModelWithValidators =
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
export type Phasea1416B2956A640Af87250Dd005720D10DeleteOneResponseModelWithValidators =
	{
		id: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase6893C3E3E9834210Aa44Ff235F1Da9D0PatchOneResponseModelWithValidators =
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
export type ForeignAthleteheat053A2713E6Cf4797948959Aa0590875FFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatc55A8Cc2Acbd4Bc0Bcc72863Ca9Ea5F2GetManyResponseForeignModel =
	ForeignAthleteheat053A2713E6Cf4797948959Aa0590875FFindManyResponseItemModelWithValidators[]
export type Heat8Ab667Eb73E04Bfe9B97D4Fc9C6E8E7CFindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatc55A8Cc2Acbd4Bc0Bcc72863Ca9Ea5F2GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heat83D9Dec7Ec424Cfe9136D1C0133Ee4FdFindManyResponseListModel =
	| Heat8Ab667Eb73E04Bfe9B97D4Fc9C6E8E7CFindManyResponseItemModelWithValidators[]

export type TableName7C9Ea58B63E349C0939081C5Ca6Fa494 = "athleteheat"
export type Heatbaa11Ae4231E4AcfB4766B6E8E5C6Aa0UpdateManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat8199Cb2B5Bfb4B0BAdda3E526E998597UpdateManyResponseListModelWithValidators =
	Heatbaa11Ae4231E4AcfB4766B6E8E5C6Aa0UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryHeatPut = {
	competition_id: string
	name: string
}
export type Heat00B53Bb125404Ea8907B2682E0E20Fd6UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat361F8Ed84Da14F9B96102D557C941B20UpsertManyResponseListModel =
	Heat00B53Bb125404Ea8907B2682E0E20Fd6UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat0E919BfbFd4B4A9B9348Fef16127B995CreateManyInsertItemRequestModel =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat0F49Afd0F6054660842652602E80E51DDeleteManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat7C1890E8311A41F8B29FD2Dfff7634C5DeleteManyResponseListModel =
	Heat0F49Afd0F6054660842652602E80E51DDeleteManyResponseModelWithValidators[]
export type Heata7270319B5744E9BA522Ddf8E1A57673PatchManyResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heatccc4526CAa404E43A3D9174248B64AecPatchManyResponseListModelWithValidators =
	Heata7270319B5744E9BA522Ddf8E1A57673PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryHeatPatch = {
	competition_id?: string
	name?: string
}
export type Heat0018067A36F14Af290640F6D6E6Dcfb8FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatc55A8Cc2Acbd4Bc0Bcc72863Ca9Ea5F2GetManyResponseForeignModel
		id: string
		competition_id: string
		name: string
	}
export type Heatc6C86C6650C84Ac9957A4276C5BacaaeFindOneResponseListModel =
	Heat0018067A36F14Af290640F6D6E6Dcfb8FindOneResponseModelWithValidators
export type TableName9F33F26036Fa48718C2028Ab0Afd6Cd2 = "athleteheat"
export type Heat98Fe34B71C044A5882Ce48Fe80Ec0F46UpdateOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyEntireUpdateByPrimaryKeyHeatIdPut = {
	competition_id: string
	name: string
}
export type Heatbb4E71Ca4A9E47E49D9314Af8E9D9642DeleteOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type Heat8Ab6Dcbb379E446982A905022E8A53C5PatchOneResponseModelWithValidators =
	{
		id: string
		competition_id: string
		name: string
	}
export type BodyPartialUpdateOneByPrimaryKeyHeatIdPatch = {
	competition_id?: string
	name?: string
}
export type ForeignAthleteheatb67F3Cf31E7F418D99F45788Aa1Bd837FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatf79E924042C14BccB69FC00D077Dccd9GetManyResponseForeignModel =
	ForeignAthleteheatb67F3Cf31E7F418D99F45788Aa1Bd837FindManyResponseItemModelWithValidators[]
export type Athletedab1788979294A718Bb62Bebb76D3A6BFindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatf79E924042C14BccB69FC00D077Dccd9GetManyResponseForeignModel
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type Athlete03Bf1B0C42E346EbBea698B875E6478AFindManyResponseListModel =
	| Athletedab1788979294A718Bb62Bebb76D3A6BFindManyResponseItemModelWithValidators[]

export type TableName33960F4463A24711845D5D5606814Fd7 = "athleteheat"
export type Athletedfe1178DA89847E78Fa09D062361E623UpdateManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete941F8D332Eb0495A81B6F24Ef6B68D46UpdateManyResponseListModelWithValidators =
	Athletedfe1178DA89847E78Fa09D062361E623UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthletePut = {
	first_name: string
	last_name: string
	bib: string
}
export type Athlete8B3Ddac704514Fe3997FC01C60A425FcUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete4E766A70C4Dc42A893EaA4086Ff011C9UpsertManyResponseListModel =
	Athlete8B3Ddac704514Fe3997FC01C60A425FcUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athlete67B42D7284884A75B6A833Cf5Da32612CreateManyInsertItemRequestModel =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete3F1F7D331D5049348C4013B73233E9C8DeleteManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athleteff664E0F09Aa4Ed3B3D523C17Dd77267DeleteManyResponseListModel =
	Athlete3F1F7D331D5049348C4013B73233E9C8DeleteManyResponseModelWithValidators[]
export type Athlete4B36Ea34D8Db462ABaee313150809Bf5PatchManyResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete72E78Adc6A5245928F73509460A906CcPatchManyResponseListModelWithValidators =
	Athlete4B36Ea34D8Db462ABaee313150809Bf5PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthletePatch = {
	first_name?: string
	last_name?: string
	bib?: string
}
export type Athleted2A42E11B7574277A15159Df33C824BeFindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatf79E924042C14BccB69FC00D077Dccd9GetManyResponseForeignModel
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athlete0Fde6055C52A47A7Af6EE8C9Fe65F85EFindOneResponseListModel =
	Athleted2A42E11B7574277A15159Df33C824BeFindOneResponseModelWithValidators
export type TableName1Ea124Ac2Afd4023Bfd967Ed881Fed89 = "athleteheat"
export type Athlete5006Db71Ede245089519Da0C3F8C002AUpdateOneResponseModelWithValidators =
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
export type Athlete2D42816C96E64Cad9Cf9E4156Aed480DDeleteOneResponseModelWithValidators =
	{
		id: string
		first_name: string
		last_name: string
		bib: string
	}
export type Athleteac6Adf21202F4C7CB17A23Fc46439A74PatchOneResponseModelWithValidators =
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
export type ScoreSheet0F803EcaD0Da4506912B208B317192E9FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheete13C6B9AE24D46859F1D98226Ae12F73FindManyResponseListModel =

		| ScoreSheet0F803EcaD0Da4506912B208B317192E9FindManyResponseItemModelWithValidators[]

export type ScoreSheet0A039A082807485D8F8B8Aaccb93C3A3UpdateManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet8E40DfbeAecf40B38Da3F7B17A7E8919UpdateManyResponseListModelWithValidators =
	ScoreSheet0A039A082807485D8F8B8Aaccb93C3A3UpdateManyResponseModelWithValidators[]
export type ScoreSheeta2453114F6Af4440A530Ad528E83D4C1UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheetf5624B2145E849D88Fb63B6Ef37D42B6UpsertManyResponseListModel =
	ScoreSheeta2453114F6Af4440A530Ad528E83D4C1UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheet43991E03Fc644994A82C23D9Deb5C286CreateManyInsertItemRequestModel =
	{
		id: string
		name: string
	}
export type ScoreSheet6Eda3627Ea844Df687807Dfb52656CbfDeleteManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet7861D15890Ba4B3490A011Cbf187Ce40DeleteManyResponseListModel =
	ScoreSheet6Eda3627Ea844Df687807Dfb52656CbfDeleteManyResponseModelWithValidators[]
export type ScoreSheet640C757D64C34531B0852Be5A3D27Ad2PatchManyResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet3Dc3Ec55D0394A8293Cc8101C8A9581FPatchManyResponseListModelWithValidators =
	ScoreSheet640C757D64C34531B0852Be5A3D27Ad2PatchManyResponseModelWithValidators[]
export type ScoreSheet855F2Fcf3B834Ad78232Cf41D4592B67FindOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheet46Ae3Fa9232E433CAd648E494C636EfcFindOneResponseListModel =
	ScoreSheet855F2Fcf3B834Ad78232Cf41D4592B67FindOneResponseModelWithValidators
export type ScoreSheet3Ae931907347483CAd6D962Ef97C52D0UpdateOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheete5B320C96B3842A3A2635752694Fb35BDeleteOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type ScoreSheeta90954Ee37634A748F6F92037F9Ce284PatchOneResponseModelWithValidators =
	{
		id: string
		name: string
	}
export type AvailableMoves52F71A5D830147Ab8A8C6Eb9F38333D4FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMoves0564Cab615824A2B8D453C02656D4127FindManyResponseListModel =

		| AvailableMoves52F71A5D830147Ab8A8C6Eb9F38333D4FindManyResponseItemModelWithValidators[]

export type AvailableMoves1Db370C7D3F34524Ba250F8Cdc20Cc14UpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves438Cf30FEb8A4B01Bdd50E6A9E1Cfc54UpdateManyResponseListModelWithValidators =
	AvailableMoves1Db370C7D3F34524Ba250F8Cdc20Cc14UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablemovesPut = {
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: string
}
export type AvailableMovesab83480E457946A1B59B3Bb5De9E9B3EUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves4C3E0E573C4B4E13903E12Da03559710UpsertManyResponseListModel =
	AvailableMovesab83480E457946A1B59B3Bb5De9E9B3EUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableMovese28814Ce931645679Fe20B2E62F15851CreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesa13Ada1250884179Be0B77739B1594BfDeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesbfa7C4Dd2Da44049827D63253D173430DeleteManyResponseListModel =
	AvailableMovesa13Ada1250884179Be0B77739B1594BfDeleteManyResponseModelWithValidators[]
export type AvailableMoves81631E2CBf9E4B3AA297E44B9D64A484PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesf5F24B9BCcd04Ef1A4021440C27Fd2CfPatchManyResponseListModelWithValidators =
	AvailableMoves81631E2CBf9E4B3AA297E44B9D64A484PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablemovesPatch = {
	sheet_id?: string
	name?: string
	fl_score?: number
	rb_score?: number
	direction?: string
}
export type AvailableMoves8878E63C9C2A49A1Bf76Ca096Ec649AeFindOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMoves3797Ad1C24F947Aa9964Fde6Ac292A33FindOneResponseListModel =
	AvailableMoves8878E63C9C2A49A1Bf76Ca096Ec649AeFindOneResponseModelWithValidators
export type AvailableMoves1872E9B35Eea4029B757F5E459471Fa3UpdateOneResponseModelWithValidators =
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
export type AvailableMoves9C3423FcCdbc4Ea18E2A3239B77Cfd4BDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		name: string
		fl_score: number
		rb_score: number
		direction: string
	}
export type AvailableMovesae92Bfb46Bd34607B786D765E1Bb7Bb6PatchOneResponseModelWithValidators =
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
export type ForeignScoreSheet92C4Fba0D6F34846Bd0B1E470Dc13Dc7FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheet3A5Ae933E73547359B59E18875E47B7BGetManyResponseForeignModel =
	ForeignScoreSheet92C4Fba0D6F34846Bd0B1E470Dc13Dc7FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves2002Ba4E33Fa4Bfb8A1F7E58A6537391FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves80Fa17D36765441C82A7A72B0Fa1E405GetManyResponseForeignModel =
	ForeignAvailableMoves2002Ba4E33Fa4Bfb8A1F7E58A6537391FindManyResponseItemModelWithValidators[]
export type AvailableBonusesd53F013C340348D2907CBbaf48Ed8D73FindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet3A5Ae933E73547359B59E18875E47B7BGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves80Fa17D36765441C82A7A72B0Fa1E405GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonusesc264D2179C704688B0505Dda5465Edd7FindManyResponseListModel =

		| AvailableBonusesd53F013C340348D2907CBbaf48Ed8D73FindManyResponseItemModelWithValidators[]

export type TableNamef902A27DB7144Dc38A71Db44D6F1Af7A =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses9Bd0A0A622744A24Be1B664E02Cc41F3UpdateManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesa48B881A010B4Cc89F8CD400891Ac5BbUpdateManyResponseListModelWithValidators =
	AvailableBonuses9Bd0A0A622744A24Be1B664E02Cc41F3UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAvailablebonusesPut = {
	sheet_id: string
	move_id: string
	name: string
	score: number
}
export type AvailableBonusesd1E1234F039D47BaBc4861F6560606E5UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesbea5Dd1A737E4DacB76E359A2742945BUpsertManyResponseListModel =
	AvailableBonusesd1E1234F039D47BaBc4861F6560606E5UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type AvailableBonusesb0884454E93E4D75Afad268F8C32476DCreateManyInsertItemRequestModel =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses517252E4575A44C5B52C3Ed03F4E7Dc2DeleteManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesa9D30DcbC9B14AfaAdc323B0F4275Dc0DeleteManyResponseListModel =
	AvailableBonuses517252E4575A44C5B52C3Ed03F4E7Dc2DeleteManyResponseModelWithValidators[]
export type AvailableBonusesbe5053F35Cd74158Ad43B57Ccdcb2438PatchManyResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses20Cb0C00551746A0BeebF9F5C2C2C806PatchManyResponseListModelWithValidators =
	AvailableBonusesbe5053F35Cd74158Ad43B57Ccdcb2438PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAvailablebonusesPatch = {
	sheet_id?: string
	move_id?: string
	name?: string
	score?: number
}
export type AvailableBonuses4Dd414A1Fde34Fa196B7D8A8A88C4878FindOneResponseModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet3A5Ae933E73547359B59E18875E47B7BGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves80Fa17D36765441C82A7A72B0Fa1E405GetManyResponseForeignModel
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonuses0679E3DcA18847768Cad66D86Be55C54FindOneResponseListModel =
	AvailableBonuses4Dd414A1Fde34Fa196B7D8A8A88C4878FindOneResponseModelWithValidators
export type TableName2Aa51E09Cbd94614B7Da3B3C7E5C7C22 =
	| "scoreSheet"
	| "availableMoves"
export type AvailableBonuses5C55649FFd2740358720840Bbccb3Ec8UpdateOneResponseModelWithValidators =
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
export type AvailableBonusesbcfb42F9C579452CA97EBfe46447B7BdDeleteOneResponseModelWithValidators =
	{
		id: string
		sheet_id: string
		move_id: string
		name: string
		score: number
	}
export type AvailableBonusesdb7528E4Dbb84F068C11E0C03394987FPatchOneResponseModelWithValidators =
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
export type ForeignHeatbcc88F2F10Cf4CebBd0B389E5F500E6FFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat2D020609Dd8B4B3BAebd1B351D50379BGetManyResponseForeignModel =
	ForeignHeatbcc88F2F10Cf4CebBd0B389E5F500E6FFindManyResponseItemModelWithValidators[]
export type ForeignPhase94D855Fa144A4Df3B4A26E297Fab1309FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase97251B1C449C42EfB23D8B15C6D6D029GetManyResponseForeignModel =
	ForeignPhase94D855Fa144A4Df3B4A26E297Fab1309FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesf2136B57Af154Dba88529C704Ec8F5C1FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMovescc6E50Fd7A43408E9B412B9Bed3Da936GetManyResponseForeignModel =
	ForeignAvailableMovesf2136B57Af154Dba88529C704Ec8F5C1FindManyResponseItemModelWithValidators[]
export type ForeignAthletea4Efe0Fc0Eb841B38481Fdadb1Bc97E3FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthlete637AbebbC64641599303E6F4D215552EGetManyResponseForeignModel =
	ForeignAthletea4Efe0Fc0Eb841B38481Fdadb1Bc97E3FindManyResponseItemModelWithValidators[]
export type ScoredMoves18494041C09E4E37896AFfc4D8188557FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat2D020609Dd8B4B3BAebd1B351D50379BGetManyResponseForeignModel
		phase_foreign?: ForeignPhase97251B1C449C42EfB23D8B15C6D6D029GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovescc6E50Fd7A43408E9B412B9Bed3Da936GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete637AbebbC64641599303E6F4D215552EGetManyResponseForeignModel
		id?: string
		move_id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		judge_id?: string
		athlete_id?: string
		direction?: string
	}
export type ScoredMoves4659821AC4A44Ee7A9E6D8E9A73909CcFindManyResponseListModel =

		| ScoredMoves18494041C09E4E37896AFfc4D8188557FindManyResponseItemModelWithValidators[]

export type TableNamed23D956045284366Ade178D4B80F2F66 =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMoves0F236E72693544329112959173790C84UpdateManyResponseModelWithValidators =
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
export type ScoredMoves4Cab4Db9Ac9E40B08576A30148E8Dd3EUpdateManyResponseListModelWithValidators =
	ScoredMoves0F236E72693544329112959173790C84UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredmovesPut = {
	move_id: string
	heat_id: string
	run_number: number
	phase_id: string
	judge_id: string
	athlete_id: string
	direction: string
}
export type ScoredMovesbef9329D32934Ae6A6791522E18F2D3DUpsertManyResponseItemModelRequireButDefaultWithValidators =
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
export type ScoredMoves2A7C72000D374Dbc905A28C25786Cea5UpsertManyResponseListModel =
	ScoredMovesbef9329D32934Ae6A6791522E18F2D3DUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredMoves6F2Fa0D5C3614604943D573359D7A8D3CreateManyInsertItemRequestModel =
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
export type ScoredMovesf189693213104698A97B8565Aa0A3C6DDeleteManyResponseModelWithValidators =
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
export type ScoredMoves35F019Ca54914251Aac0Beffa4188D82DeleteManyResponseListModel =
	ScoredMovesf189693213104698A97B8565Aa0A3C6DDeleteManyResponseModelWithValidators[]
export type ScoredMoves50Ac8Ca91076454A9E444Bf396D129A6PatchManyResponseModelWithValidators =
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
export type ScoredMoves7Eb75Da198A64083A6A7A10645805E7APatchManyResponseListModelWithValidators =
	ScoredMoves50Ac8Ca91076454A9E444Bf396D129A6PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredmovesPatch = {
	move_id?: string
	heat_id?: string
	run_number?: number
	phase_id?: string
	judge_id?: string
	athlete_id?: string
	direction?: string
}
export type ScoredMovesa18F2888678C438BB68015792403Fe85FindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeat2D020609Dd8B4B3BAebd1B351D50379BGetManyResponseForeignModel
		phase_foreign?: ForeignPhase97251B1C449C42EfB23D8B15C6D6D029GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovescc6E50Fd7A43408E9B412B9Bed3Da936GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete637AbebbC64641599303E6F4D215552EGetManyResponseForeignModel
		id: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMoves1Db09A91Ceb4429385266F1276Aad290FindOneResponseListModel =
	ScoredMovesa18F2888678C438BB68015792403Fe85FindOneResponseModelWithValidators
export type TableName8441F57E4A3E4E4BAc56B1F4B77375Fb =
	| "heat"
	| "phase"
	| "availableMoves"
	| "athlete"
export type ScoredMoves07E7183E9A084A9084714F5C7E3F45FcUpdateOneResponseModelWithValidators =
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
export type ScoredMoves418384E4A92B476696B18Be7Fd0B80B4DeleteOneResponseModelWithValidators =
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
export type ScoredMoves9Aff1C29A20E43F0951140B9846Cc9B2PatchOneResponseModelWithValidators =
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
export type ForeignAvailableBonuses38E793C98Dcd451B9494F72Bca56Dfc9FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type ForeignAvailableBonuses60C2E3514Ee3410296764Ab17Eb0A947GetManyResponseForeignModel =
	ForeignAvailableBonuses38E793C98Dcd451B9494F72Bca56Dfc9FindManyResponseItemModelWithValidators[]
export type ForeignScoredMovesc57Dea225F83493AAd1EE98F139C75DbFindManyResponseItemModelWithValidators =
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
export type ForeignScoredMoves1C91Dc012718497F8Eca2E217A7F5Df8GetManyResponseForeignModel =
	ForeignScoredMovesc57Dea225F83493AAd1EE98F139C75DbFindManyResponseItemModelWithValidators[]
export type ScoredBonuses6487052978624E468504C26E66B0489CFindManyResponseItemModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonuses60C2E3514Ee3410296764Ab17Eb0A947GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves1C91Dc012718497F8Eca2E217A7F5Df8GetManyResponseForeignModel
		id?: string
		bonus_id?: string
		move_id?: string
		judge_id?: string
	}
export type ScoredBonusesd68Dc15AE89747E5Adc9A8Cc3E1Eff80FindManyResponseListModel =

		| ScoredBonuses6487052978624E468504C26E66B0489CFindManyResponseItemModelWithValidators[]

export type TableNameb754C0A3E5504658Ace8089Cdb011783 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses7D45562EC7244D98B28FF72C154D1647UpdateManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses1Cc4E7Af668D472D8B5CD4Efb50813A4UpdateManyResponseListModelWithValidators =
	ScoredBonuses7D45562EC7244D98B28FF72C154D1647UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryScoredbonusesPut = {
	bonus_id: string
	move_id: string
	judge_id: string
}
export type ScoredBonuses8428D1C3147F492D8E657427520Ab861UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses22574Fe0Ddf14C22829DD547A6084F3CUpsertManyResponseListModel =
	ScoredBonuses8428D1C3147F492D8E657427520Ab861UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoredBonuses7B372Cd5F8544Dd99B2F6A236363FaedCreateManyInsertItemRequestModel =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses652613DfFf30436987535D614Abb51E7DeleteManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusese9F189Cb034F4B8096C02Cba166Ef5EfDeleteManyResponseListModel =
	ScoredBonuses652613DfFf30436987535D614Abb51E7DeleteManyResponseModelWithValidators[]
export type ScoredBonuses8A246E120C904D7B937DA5F95C4169BePatchManyResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusesb32Eb20FF4A5489A80AcE5B08Bdba04EPatchManyResponseListModelWithValidators =
	ScoredBonuses8A246E120C904D7B937DA5F95C4169BePatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryScoredbonusesPatch = {
	bonus_id?: string
	move_id?: string
	judge_id?: string
}
export type ScoredBonuses5Bd27C64Eb214D56B429Cc4966Abb285FindOneResponseModelWithValidators =
	{
		availableBonuses_foreign?: ForeignAvailableBonuses60C2E3514Ee3410296764Ab17Eb0A947GetManyResponseForeignModel
		scoredMoves_foreign?: ForeignScoredMoves1C91Dc012718497F8Eca2E217A7F5Df8GetManyResponseForeignModel
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonuses2097Ac9D8F1749F79A3128Ac27Bc01B1FindOneResponseListModel =
	ScoredBonuses5Bd27C64Eb214D56B429Cc4966Abb285FindOneResponseModelWithValidators
export type TableName7273F33CEbb747A1A296825D69626841 =
	| "availableBonuses"
	| "scoredMoves"
export type ScoredBonuses44Ac105926594Cc58Db452821305E133UpdateOneResponseModelWithValidators =
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
export type ScoredBonuses8Dfa9E234F69427187CaD1807E88C542DeleteOneResponseModelWithValidators =
	{
		id: string
		bonus_id: string
		move_id: string
		judge_id: string
	}
export type ScoredBonusese0817F91Adac445BAb2AD6Aa37A4A686PatchOneResponseModelWithValidators =
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
export type ForeignHeat3B1B947530Bb4Fb98D9DBb6F1Ea589F8FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeata6B06E52C98C4132937BCcc48E412F98GetManyResponseForeignModel =
	ForeignHeat3B1B947530Bb4Fb98D9DBb6F1Ea589F8FindManyResponseItemModelWithValidators[]
export type ForeignAthletecc3E730614434A1389769Fe168937E0EFindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		bib?: string
	}
export type ForeignAthlete296C2619218440Cb85C3F41B945EdadaGetManyResponseForeignModel =
	ForeignAthletecc3E730614434A1389769Fe168937E0EFindManyResponseItemModelWithValidators[]
export type ForeignPhase05C8Fcae79De4840Ab51F12A9F861336FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase555185016A434609867A4F9E66114162GetManyResponseForeignModel =
	ForeignPhase05C8Fcae79De4840Ab51F12A9F861336FindManyResponseItemModelWithValidators[]
export type Athleteheat48467Be2B322446BA4A234E285E41107FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeata6B06E52C98C4132937BCcc48E412F98GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete296C2619218440Cb85C3F41B945EdadaGetManyResponseForeignModel
		phase_foreign?: ForeignPhase555185016A434609867A4F9E66114162GetManyResponseForeignModel
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type Athleteheat3B94628C6Be14Bd2Ab5E14Afeb7756F9FindManyResponseListModel =

		| Athleteheat48467Be2B322446BA4A234E285E41107FindManyResponseItemModelWithValidators[]

export type TableName68B7D9AcA6Cf4298B337B2A26C0Afed0 =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat37A98544Aebc47EaB8080E8Bab0B52E3UpdateManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat65Da9Dd512984918B54FF2C06F280614UpdateManyResponseListModelWithValidators =
	Athleteheat37A98544Aebc47EaB8080E8Bab0B52E3UpdateManyResponseModelWithValidators[]
export type BodyEntireUpdateManyByQueryAthleteheatPut = {
	heat_id: string
	athlete_id: string
	phase_id: string
	last_phase_rank: number
}
export type Athleteheat847F7F23Edf44D1983CcCdff252Fca79UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheateb6Ee52734F342578645Be66B38906EcUpsertManyResponseListModel =
	Athleteheat847F7F23Edf44D1983CcCdff252Fca79UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheata9A9F8E299644B1EBedbA0Ec6501F97DCreateManyInsertItemRequestModel =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat294275AfA92F45A3AaddCb8Cf51057A5DeleteManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat4051012918F94120997B08F9925Ad5D5DeleteManyResponseListModel =
	Athleteheat294275AfA92F45A3AaddCb8Cf51057A5DeleteManyResponseModelWithValidators[]
export type Athleteheatcc01Bf565E5842C39E879137A12F0E07PatchManyResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat00094Fe4E8874852BabcEaca3Cf1F238PatchManyResponseListModelWithValidators =
	Athleteheatcc01Bf565E5842C39E879137A12F0E07PatchManyResponseModelWithValidators[]
export type BodyPartialUpdateManyByQueryAthleteheatPatch = {
	heat_id?: string
	athlete_id?: string
	phase_id?: string
	last_phase_rank?: number
}
export type Athleteheat1B82899DE20343968FadAd1Dce7Cc31AFindOneResponseModelWithValidators =
	{
		heat_foreign?: ForeignHeata6B06E52C98C4132937BCcc48E412F98GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete296C2619218440Cb85C3F41B945EdadaGetManyResponseForeignModel
		phase_foreign?: ForeignPhase555185016A434609867A4F9E66114162GetManyResponseForeignModel
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat71Abf340C0Cb4402930CB01B6B140Bb1FindOneResponseListModel =
	Athleteheat1B82899DE20343968FadAd1Dce7Cc31AFindOneResponseModelWithValidators
export type TableName33425082Fa394F2191A8F9Df7Ff70189 =
	| "heat"
	| "athlete"
	| "phase"
export type Athleteheat582Ebcad031A4C09B7D1F9C4832E7Ac7UpdateOneResponseModelWithValidators =
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
export type Athleteheatd58Fa3434C374146B5C865F30C3Cba23DeleteOneResponseModelWithValidators =
	{
		id: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat92Fe70B32Eae419EBf9056586De75024PatchOneResponseModelWithValidators =
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
	useUploadCompetitionManagementUploadPostMutation,
	usePromotePhaseCompetitionManagementPromotePhasePostMutation,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation,
	useGetAthleteMovesAndBonnusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberJudgeIdGetQuery,
	useGetHeatScoresGetHeatScoresHeatIdGetQuery,
	useGetPhaseScoresGetPhaseScoresPhaseIdGetQuery,
	useAddUpdateScoresheetAddUpdateScoresheetScoresheetIdPostMutation,
	usePhasePdfPhasePdfPhaseIdGetQuery,
	useHeatPdfHeatPdfGetQuery,
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
