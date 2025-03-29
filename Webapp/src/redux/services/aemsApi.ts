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
		heatResultsPdfHeatResultsPdfGet: build.query<
			HeatResultsPdfHeatResultsPdfGetApiResponse,
			HeatResultsPdfHeatResultsPdfGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat_results_pdf`,
				params: { heat_id: queryArg.heatId }
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
		insertManyCompetitionPost: build.mutation<
			InsertManyCompetitionPostApiResponse,
			InsertManyCompetitionPostApiArg
		>({
			query: (queryArg) => ({
				url: `/competition`,
				method: "POST",
				body: queryArg.insert
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
		partialUpdateOneByPrimaryKeyCompetitionIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/competition/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.name,
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
		insertManyEventPost: build.mutation<
			InsertManyEventPostApiResponse,
			InsertManyEventPostApiArg
		>({
			query: (queryArg) => ({
				url: `/event`,
				method: "POST",
				body: queryArg.insert
			})
		}),
		getManyByPkFromCompetitionEventEventPkIdCompetitionGet: build.query<
			GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiResponse,
			GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.eventPkId}/competition`,
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
		insertManyPhasePost: build.mutation<
			InsertManyPhasePostApiResponse,
			InsertManyPhasePostApiArg
		>({
			query: (queryArg) => ({
				url: `/phase`,
				method: "POST",
				body: queryArg.insert
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
		insertManyHeatPost: build.mutation<
			InsertManyHeatPostApiResponse,
			InsertManyHeatPostApiArg
		>({
			query: (queryArg) => ({
				url: `/heat`,
				method: "POST",
				body: queryArg.insert
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
		insertManyAthletePost: build.mutation<
			InsertManyAthletePostApiResponse,
			InsertManyAthletePostApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete`,
				method: "POST",
				body: queryArg.insert
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
					affiliation____str_____matching_pattern:
						queryArg.affiliationStrMatchingPattern,
					affiliation____str: queryArg.affiliationStr,
					affiliation____list_____comparison_operator:
						queryArg.affiliationListComparisonOperator,
					affiliation____list: queryArg.affiliationList,
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
		insertManyScoresheetPost: build.mutation<
			InsertManyScoresheetPostApiResponse,
			InsertManyScoresheetPostApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet`,
				method: "POST",
				body: queryArg.insert
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
		insertManyAthleteheatPost: build.mutation<
			InsertManyAthleteheatPostApiResponse,
			InsertManyAthleteheatPostApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat`,
				method: "POST",
				body: queryArg.insert
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
		getManyRunStatusGet: build.query<
			GetManyRunStatusGetApiResponse,
			GetManyRunStatusGetApiArg
		>({
			query: (queryArg) => ({
				url: `/run_status`,
				params: {
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
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
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					locked____list_____comparison_operator:
						queryArg.lockedListComparisonOperator,
					locked____list: queryArg.lockedList,
					did_not_start____list_____comparison_operator:
						queryArg.didNotStartListComparisonOperator,
					did_not_start____list: queryArg.didNotStartList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		rootGet: build.query<RootGetApiResponse, RootGetApiArg>({
			query: () => ({ url: `/` })
		}),
		healthCheckHealthGet: build.query<
			HealthCheckHealthGetApiResponse,
			HealthCheckHealthGetApiArg
		>({
			query: () => ({ url: `/health` })
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
export type HeatResultsPdfHeatResultsPdfGetApiResponse =
	/** status 200 Successful Response */ any
export type HeatResultsPdfHeatResultsPdfGetApiArg = {
	heatId?: string
}
export type GetManyCompetitionGetApiResponse =
	/** status 200 Successful Response */ Competitionae56199B87A3465DBc48E09Db807Ba8DFindManyResponseListModel
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
	joinForeignTable?: TableNamefb9173D8Aa894Bd9Be2BA8Badade0F48[]
}
export type InsertManyCompetitionPostApiResponse =
	/** status 201 Successful Response */ Competition619B88A7Eb1F4621B1C500E9490D357CUpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	insert: Competition196683Cb9502451894736D3893C35Ef3CreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId6E6A924CE63E4Db9B527Ac5B6C401C8EFindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName4C02Fe2600704241Ad62A012D45Cdd9C[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competition92377DaeF1C7425897A410753E7560BaPatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	name: string
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event03Bb11Cd97Bb471EBcd48586Bdf79D4DFindManyResponseListModel
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
	joinForeignTable?: TableNamef1Aa3BcfBc6A46FdA7E0102C1873Aeab[]
}
export type InsertManyEventPostApiResponse =
	/** status 201 Successful Response */ Event6Ab47033E7474D69B4Ce2681Eb31Ce68UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	insert: Event1B707B1C77Cd4Fd79De77D59351D90E8CreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiResponse =
	/** status 200 Successful Response */ EventIdCompetitionIdaffd8F83D95145B092Dd263408806394FindManyResponseListModel
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiArg = {
	eventPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName63F4D9872Bb144F5B6Bd6Aa7A6Bbe6F0[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseId0Daee080982A4B1CBcdf7Ec73A600045FindManyResponseListModel
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
	joinForeignTable?: TableName5E3D8015938941F2A92B6F5Ec2469Ed8[]
}
export type GetOneByPrimaryKeyPhaseIdGetApiResponse =
	/** status 200 Successful Response */ Phase41F46431598B451C86F7C2Caec679541FindOneResponseListModel
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
	joinForeignTable?: TableNamec446Eb5EC10F4Eab99409A3E8Edf4E0F[]
}
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse =
	/** status 200 Successful Response */ Phase8E5Ed1Ef3B2448D9B4C3B0C1Ecf2F7D2PatchOneResponseModelWithValidators
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
export type InsertManyPhasePostApiResponse =
	/** status 201 Successful Response */ Phase51F890D646Cc4C2E83B0Aadf0C18Da28UpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	insert: Phasef53C131977144F6FA64F43A9Df2Ce7CbCreateManyInsertItemRequestModel[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heatfeedf5078Ba843C6Bed6C94Bb6B7D7BfFindManyResponseListModel
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
	joinForeignTable?: TableNamea1Fc8Fe3351E435E9248F54925D83034[]
}
export type InsertManyHeatPostApiResponse =
	/** status 201 Successful Response */ Heat2B2Ceab42Fc84A80833ACc8C3187082AUpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	insert: Heat916B2Bc8613C4C12AfdcB31874Ebd617CreateManyInsertItemRequestModel[]
}
export type GetOneByPrimaryKeyHeatIdGetApiResponse =
	/** status 200 Successful Response */ Heat80C598A6C8564Ce2B92A0A10Ec9B013DFindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName733D60644Be94A2397007451Df2D56Bd[]
}
export type InsertManyAthletePostApiResponse =
	/** status 201 Successful Response */ Athletee9E07Fbe938E404197900F74Ce820F36UpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	insert: Athlete62Ff4D4335F54Ef1Af37131F81E44FbdCreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse =
	/** status 200 Successful Response */ Athletec33F46Fa904948C397C7C9A9E94D7260PatchOneResponseModelWithValidators
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
	affiliationStrMatchingPattern?: PgsqlMatchingPatternInString[]
	affiliationStr?: string[]
	affiliationListComparisonOperator?: ItemComparisonOperators
	affiliationList?: string[]
	bibStrMatchingPattern?: PgsqlMatchingPatternInString[]
	bibStr?: string[]
	bibListComparisonOperator?: ItemComparisonOperators
	bibList?: string[]
	bodyPartialUpdateOneByPrimaryKeyAthleteIdPatch: BodyPartialUpdateOneByPrimaryKeyAthleteIdPatch
}
export type GetManyScoresheetGetApiResponse =
	/** status 200 Successful Response */ ScoreSheete88B80A1420843489C88C9758873B037FindManyResponseListModel
export type GetManyScoresheetGetApiArg = {
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
}
export type InsertManyScoresheetPostApiResponse =
	/** status 201 Successful Response */ ScoreSheet4E365D6725034C7A88FaF58Ce40B0B2CUpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	insert: ScoreSheeta37Bf246441B41Bc9917A8272F269EccCreateManyInsertItemRequestModel[]
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMovesc23F55883Cc04035B361D53Ccd6E37CfFindManyResponseListModel
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
export type GetManyAvailablebonusesGetApiResponse =
	/** status 200 Successful Response */ AvailableBonuses3F2Dc1EeF4Ea4E1F9Fdb5657Ca0D4Ed1FindManyResponseListModel
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
	joinForeignTable?: TableNamefae5960FDc7B40D2Af2586Aaed4F7C4D[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMovesfe6A4Bd9Ef0143349921441Ef85Be848DeleteManyResponseListModel
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
export type InsertManyAthleteheatPostApiResponse =
	/** status 201 Successful Response */ Athleteheat12Ad712C7C3D4Bd1B289C5E9990C8090UpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	insert: Athleteheate319A150F37D4240A5484C32510C8402CreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat394169A5C7Ec4E1EAb5C19905Aec6B58PatchOneResponseModelWithValidators
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
export type GetManyRunStatusGetApiResponse =
	/** status 200 Successful Response */ RunStatusa8363B1E1F17445E85F5E679E1Ad7A96FindManyResponseListModel
export type GetManyRunStatusGetApiArg = {
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
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
	athleteIdListComparisonOperator?: ItemComparisonOperators
	athleteIdList?: string[]
	lockedListComparisonOperator?: ItemComparisonOperators
	lockedList?: boolean[]
	didNotStartListComparisonOperator?: ItemComparisonOperators
	didNotStartList?: boolean[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'heat_id', 'run_number', 'phase_id', 'athlete_id', 'locked', 'did_not_start'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName7D761Cd6C6724BebB9164C0A06F67722[]
}
export type RootGetApiResponse = /** status 200 Successful Response */ any
export type RootGetApiArg = void
export type HealthCheckHealthGetApiResponse =
	/** status 200 Successful Response */ any
export type HealthCheckHealthGetApiArg = void
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
	scoresheet_name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	random_heats: boolean
	number_of_random_heats: number
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
	affiliation?: string
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
	locked: boolean
	did_not_start: boolean
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
	affiliation?: string
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
export type ForeignEvent8D9E4838E57441C3A7E96C8E018Fc5F9FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent152080Ba08934A7282655Ae6546Aaa4CGetManyResponseForeignModel =
	ForeignEvent8D9E4838E57441C3A7E96C8E018Fc5F9FindManyResponseItemModelWithValidators[]
export type Competition6Fb0F09CBaf04612Ba0E13583B59151DFindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent152080Ba08934A7282655Ae6546Aaa4CGetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competitionae56199B87A3465DBc48E09Db807Ba8DFindManyResponseListModel =

		| Competition6Fb0F09CBaf04612Ba0E13583B59151DFindManyResponseItemModelWithValidators[]

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
export type TableNamefb9173D8Aa894Bd9Be2BA8Badade0F48 = "event"
export type Competition039F70Fa1Cd34B8E869E01B585C94D40UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type Competition619B88A7Eb1F4621B1C500E9490D357CUpsertManyResponseListModel =
	Competition039F70Fa1Cd34B8E869E01B585C94D40UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition196683Cb9502451894736D3893C35Ef3CreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type ForeignCompetition38Cd23C5E40B48D698F141E846D4D9AfFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionbd94B0DeCf88479297157F474B823D95GetManyResponseForeignModel =
	ForeignCompetition38Cd23C5E40B48D698F141E846D4D9AfFindManyResponseItemModelWithValidators[]
export type ForeignPhase20Bb801DDa06409088DaF1295F0Ec30BFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase2D218619Aab3457080B7Bf3833B3C0BeGetManyResponseForeignModel =
	ForeignPhase20Bb801DDa06409088DaF1295F0Ec30BFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId51A92B51E03348759C51Aa703644Bc1BFindOneResponseModelWithValidators =
	{
		id?: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetitionbd94B0DeCf88479297157F474B823D95GetManyResponseForeignModel
		phase_foreign?: ForeignPhase2D218619Aab3457080B7Bf3833B3C0BeGetManyResponseForeignModel
	}
export type CompetitionIdEventId6E6A924CE63E4Db9B527Ac5B6C401C8EFindManyResponseListModel =

		| CompetitionIdEventId51A92B51E03348759C51Aa703644Bc1BFindOneResponseModelWithValidators[]

export type TableName4C02Fe2600704241Ad62A012D45Cdd9C = "competition" | "phase"
export type Competition92377DaeF1C7425897A410753E7560BaPatchOneResponseModelWithValidators =
	{
		id?: string
		name: string
	}
export type ForeignCompetitioncb6D8Edc35B84B09919166Aeb1Cbca39FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionb2C51278Adac4F0E848BF4Ff100Bb4E3GetManyResponseForeignModel =
	ForeignCompetitioncb6D8Edc35B84B09919166Aeb1Cbca39FindManyResponseItemModelWithValidators[]
export type ForeignPhase49Ae8079509140AcB2225D925Bf4Fe0AFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhased4095E60Ce33486AA8B1Ee129Cfb8C8EGetManyResponseForeignModel =
	ForeignPhase49Ae8079509140AcB2225D925Bf4Fe0AFindManyResponseItemModelWithValidators[]
export type Eventd63Fd8237B254Cde9D38A3571Eebf02FFindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionb2C51278Adac4F0E848BF4Ff100Bb4E3GetManyResponseForeignModel
		phase_foreign?: ForeignPhased4095E60Ce33486AA8B1Ee129Cfb8C8EGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event03Bb11Cd97Bb471EBcd48586Bdf79D4DFindManyResponseListModel =
	| Eventd63Fd8237B254Cde9D38A3571Eebf02FFindManyResponseItemModelWithValidators[]

export type TableNamef1Aa3BcfBc6A46FdA7E0102C1873Aeab = "competition" | "phase"
export type Eventd3C7C172A5Ab46E883Ad71C2170Bbdc8UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Event6Ab47033E7474D69B4Ce2681Eb31Ce68UpsertManyResponseListModel =
	Eventd3C7C172A5Ab46E883Ad71C2170Bbdc8UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Event1B707B1C77Cd4Fd79De77D59351D90E8CreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type ForeignEventd312Fa6EC7D5453797E37A61Dab3A1B5FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent59835C97Ad1F4Ebb9F275546C44F74D6GetManyResponseForeignModel =
	ForeignEventd312Fa6EC7D5453797E37A61Dab3A1B5FindManyResponseItemModelWithValidators[]
export type EventIdCompetitionId28C868Fd816E484785905623Ed4D2192FindOneResponseModelWithValidators =
	{
		id?: string
		name: string
		event_foreign?: ForeignEvent59835C97Ad1F4Ebb9F275546C44F74D6GetManyResponseForeignModel
	}
export type EventIdCompetitionIdaffd8F83D95145B092Dd263408806394FindManyResponseListModel =

		| EventIdCompetitionId28C868Fd816E484785905623Ed4D2192FindOneResponseModelWithValidators[]

export type TableName63F4D9872Bb144F5B6Bd6Aa7A6Bbe6F0 = "event"
export type ForeignEventc56Ebba173C24F448Be77B7B367F5037FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent901C0Ec69A0144EeA0B7E2Af1F7Fe350GetManyResponseForeignModel =
	ForeignEventc56Ebba173C24F448Be77B7B367F5037FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat4E1Ae4Aa94Ab47379D96Dac1A8Fb043AFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat957C813B0Cac460488C6520C7238Ef1BGetManyResponseForeignModel =
	ForeignAthleteheat4E1Ae4Aa94Ab47379D96Dac1A8Fb043AFindManyResponseItemModelWithValidators[]
export type EventIdPhaseId8D74Dae3Dc8D4Ce8Abb43B8D47Ff9652FindOneResponseModelWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEvent901C0Ec69A0144EeA0B7E2Af1F7Fe350GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat957C813B0Cac460488C6520C7238Ef1BGetManyResponseForeignModel
	}
export type EventIdPhaseId0Daee080982A4B1CBcdf7Ec73A600045FindManyResponseListModel =

		| EventIdPhaseId8D74Dae3Dc8D4Ce8Abb43B8D47Ff9652FindOneResponseModelWithValidators[]

export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableName5E3D8015938941F2A92B6F5Ec2469Ed8 = "event" | "athleteheat"
export type ForeignEventb3B3702F4760406CBb18619Dcf2D4E0DFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventeda44Bd44172434282F33B9A2522497BGetManyResponseForeignModel =
	ForeignEventb3B3702F4760406CBb18619Dcf2D4E0DFindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat57D6B42A135445De9315075C4Ec0E1EbFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatad9739Ab3Bd84474Bdc1619D57272Ba0GetManyResponseForeignModel =
	ForeignAthleteheat57D6B42A135445De9315075C4Ec0E1EbFindManyResponseItemModelWithValidators[]
export type Phased4Da34F815964650848F7E837Fc8A382FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEventeda44Bd44172434282F33B9A2522497BGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatad9739Ab3Bd84474Bdc1619D57272Ba0GetManyResponseForeignModel
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase41F46431598B451C86F7C2Caec679541FindOneResponseListModel =
	Phased4Da34F815964650848F7E837Fc8A382FindOneResponseModelWithValidators
export type TableNamec446Eb5EC10F4Eab99409A3E8Edf4E0F = "event" | "athleteheat"
export type Phase8E5Ed1Ef3B2448D9B4C3B0C1Ecf2F7D2PatchOneResponseModelWithValidators =
	{
		id?: string
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
export type Phase46853133399F477F96E5Ba6F6B1Ed6DdUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase51F890D646Cc4C2E83B0Aadf0C18Da28UpsertManyResponseListModel =
	Phase46853133399F477F96E5Ba6F6B1Ed6DdUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phasef53C131977144F6FA64F43A9Df2Ce7CbCreateManyInsertItemRequestModel =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type ForeignAthleteheat6121258BCb1745808D45Faf9511D801EFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat507D7E0F6D954F59A2797B46Aa26Dd07GetManyResponseForeignModel =
	ForeignAthleteheat6121258BCb1745808D45Faf9511D801EFindManyResponseItemModelWithValidators[]
export type Heat1527F5A6838D499B91DcC6Cb1051C4FdFindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat507D7E0F6D954F59A2797B46Aa26Dd07GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heatfeedf5078Ba843C6Bed6C94Bb6B7D7BfFindManyResponseListModel =
	| Heat1527F5A6838D499B91DcC6Cb1051C4FdFindManyResponseItemModelWithValidators[]

export type TableNamea1Fc8Fe3351E435E9248F54925D83034 = "athleteheat"
export type Heatc5De48CbA2E74C75972353D4Dbca8EadUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heat2B2Ceab42Fc84A80833ACc8C3187082AUpsertManyResponseListModel =
	Heatc5De48CbA2E74C75972353D4Dbca8EadUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat916B2Bc8613C4C12AfdcB31874Ebd617CreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heat57216Fe2Dad043A68Dfb9284F533B977FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat507D7E0F6D954F59A2797B46Aa26Dd07GetManyResponseForeignModel
		id?: string
		competition_id: string
		name: string
	}
export type Heat80C598A6C8564Ce2B92A0A10Ec9B013DFindOneResponseListModel =
	Heat57216Fe2Dad043A68Dfb9284F533B977FindOneResponseModelWithValidators
export type TableName733D60644Be94A2397007451Df2D56Bd = "athleteheat"
export type Athlete477382E05C65457886C7640B0E1D9Eb5UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athletee9E07Fbe938E404197900F74Ce820F36UpsertManyResponseListModel =
	Athlete477382E05C65457886C7640B0E1D9Eb5UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athlete62Ff4D4335F54Ef1Af37131F81E44FbdCreateManyInsertItemRequestModel =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athletec33F46Fa904948C397C7C9A9E94D7260PatchOneResponseModelWithValidators =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type BodyPartialUpdateOneByPrimaryKeyAthleteIdPatch = {
	first_name?: string
	last_name?: string
	affiliation?: string
	bib?: string
}
export type ScoreSheet22C57C482584431DB9E0Ca4148Cb1534FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheete88B80A1420843489C88C9758873B037FindManyResponseListModel =

		| ScoreSheet22C57C482584431DB9E0Ca4148Cb1534FindManyResponseItemModelWithValidators[]

export type ScoreSheet812811C959434C8C8380Cb068F9535D6UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type ScoreSheet4E365D6725034C7A88FaF58Ce40B0B2CUpsertManyResponseListModel =
	ScoreSheet812811C959434C8C8380Cb068F9535D6UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheeta37Bf246441B41Bc9917A8272F269EccCreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type AvailableMovese900D6A6B7Cf404FA1Dc754E1Cbba0CdFindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMovesc23F55883Cc04035B361D53Ccd6E37CfFindManyResponseListModel =

		| AvailableMovese900D6A6B7Cf404FA1Dc754E1Cbba0CdFindManyResponseItemModelWithValidators[]

export type ForeignScoreSheet8C64D0Bc57B146BfBbf275F08F24992DFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheetb4Ca668B16D84C9BB0949A0C17F01473GetManyResponseForeignModel =
	ForeignScoreSheet8C64D0Bc57B146BfBbf275F08F24992DFindManyResponseItemModelWithValidators[]
export type ForeignAvailableMoves38012BcaD5E24B4F82219888471F2792FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves7207679DC78E4F44A474E2F155D6B269GetManyResponseForeignModel =
	ForeignAvailableMoves38012BcaD5E24B4F82219888471F2792FindManyResponseItemModelWithValidators[]
export type AvailableBonuses6F79D5C46F0649BfB089D13Aab8B9684FindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheetb4Ca668B16D84C9BB0949A0C17F01473GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves7207679DC78E4F44A474E2F155D6B269GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
	}
export type AvailableBonuses3F2Dc1EeF4Ea4E1F9Fdb5657Ca0D4Ed1FindManyResponseListModel =

		| AvailableBonuses6F79D5C46F0649BfB089D13Aab8B9684FindManyResponseItemModelWithValidators[]

export type TableNamefae5960FDc7B40D2Af2586Aaed4F7C4D =
	| "scoreSheet"
	| "availableMoves"
export type ScoredMovese98B1B15Bc78403FBa2D98B0Db46A6D1DeleteManyResponseModelWithValidators =
	{
		id?: string
		move_id?: string
		heat_id?: string
		run_number: number
		phase_id: string
		judge_id: string
		athlete_id: string
		direction: string
	}
export type ScoredMovesfe6A4Bd9Ef0143349921441Ef85Be848DeleteManyResponseListModel =
	ScoredMovese98B1B15Bc78403FBa2D98B0Db46A6D1DeleteManyResponseModelWithValidators[]
export type Athleteheat68F48D7B0C334715B097B3Dacc08D086UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat12Ad712C7C3D4Bd1B289C5E9990C8090UpsertManyResponseListModel =
	Athleteheat68F48D7B0C334715B097B3Dacc08D086UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheate319A150F37D4240A5484C32510C8402CreateManyInsertItemRequestModel =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat394169A5C7Ec4E1EAb5C19905Aec6B58PatchOneResponseModelWithValidators =
	{
		id?: string
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
export type ForeignHeat02F0325A511A45D082555D15Dfe4B726FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat6308E34524Fa40469846596F544B2978GetManyResponseForeignModel =
	ForeignHeat02F0325A511A45D082555D15Dfe4B726FindManyResponseItemModelWithValidators[]
export type ForeignPhasecf52964F6Afd488D944372Baf02D7DbcFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhasea7A1780646444C6D99E655F66E57B1F0GetManyResponseForeignModel =
	ForeignPhasecf52964F6Afd488D944372Baf02D7DbcFindManyResponseItemModelWithValidators[]
export type ForeignAthlete4C1Db454Dd364Bc49707Cf316725Cdf0FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		affiliation?: string
		bib?: string
	}
export type ForeignAthlete434D3B59E04E4Ffd98F9Bead06Bcfac9GetManyResponseForeignModel =
	ForeignAthlete4C1Db454Dd364Bc49707Cf316725Cdf0FindManyResponseItemModelWithValidators[]
export type RunStatuse897F9407Dde4439A42530C5873F18D0FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat6308E34524Fa40469846596F544B2978GetManyResponseForeignModel
		phase_foreign?: ForeignPhasea7A1780646444C6D99E655F66E57B1F0GetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete434D3B59E04E4Ffd98F9Bead06Bcfac9GetManyResponseForeignModel
		id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		athlete_id?: string
		locked?: boolean
		did_not_start?: boolean
	}
export type RunStatusa8363B1E1F17445E85F5E679E1Ad7A96FindManyResponseListModel =

		| RunStatuse897F9407Dde4439A42530C5873F18D0FindManyResponseItemModelWithValidators[]

export type TableName7D761Cd6C6724BebB9164C0A06F67722 =
	| "heat"
	| "phase"
	| "athlete"
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
	useHeatResultsPdfHeatResultsPdfGetQuery,
	useGetManyCompetitionGetQuery,
	useInsertManyCompetitionPostMutation,
	useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery,
	usePartialUpdateOneByPrimaryKeyCompetitionIdPatchMutation,
	useGetManyEventGetQuery,
	useInsertManyEventPostMutation,
	useGetManyByPkFromCompetitionEventEventPkIdCompetitionGetQuery,
	useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	usePartialUpdateOneByPrimaryKeyPhaseIdPatchMutation,
	useInsertManyPhasePostMutation,
	useGetManyHeatGetQuery,
	useInsertManyHeatPostMutation,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	useInsertManyAthletePostMutation,
	usePartialUpdateOneByPrimaryKeyAthleteIdPatchMutation,
	useGetManyScoresheetGetQuery,
	useInsertManyScoresheetPostMutation,
	useGetManyAvailablemovesGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useDeleteManyByQueryScoredmovesDeleteMutation,
	useInsertManyAthleteheatPostMutation,
	usePartialUpdateOneByPrimaryKeyAthleteheatIdPatchMutation,
	useGetManyRunStatusGetQuery,
	useRootGetQuery,
	useHealthCheckHealthGetQuery
} = injectedRtkApi
