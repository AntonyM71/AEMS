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
					display_order____from_____comparison_operator:
						queryArg.displayOrderFromComparisonOperator,
					display_order____to_____comparison_operator:
						queryArg.displayOrderToComparisonOperator,
					display_order____from: queryArg.displayOrderFrom,
					display_order____to: queryArg.displayOrderTo,
					display_order____list_____comparison_operator:
						queryArg.displayOrderListComparisonOperator,
					display_order____list: queryArg.displayOrderList,
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
	/** status 200 Successful Response */ Competition6554E4373442470FA19DE03E7073D493FindManyResponseListModel
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
	joinForeignTable?: TableName52450F14F0E9434CB04BB6A2E8C9Bc24[]
}
export type InsertManyCompetitionPostApiResponse =
	/** status 201 Successful Response */ Competitionbb555Af49A214FbcA1A961B8Ccaf1A00UpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	insert: Competition92E54676Dd3A4B8A84Ad267Bfb6F5E17CreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId9709A03658Fb426A966D8B6E6Ea5D69BFindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName8Aaf397B8A4D4D40A08F91Dfc3B9738A[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competition89F834D28Bea4Fe7A6EbCcac9A4Ed487PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	name: string
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event8A7601D0780F41B8Bc3B7B0C4849CcecFindManyResponseListModel
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
	joinForeignTable?: TableName7A9E3Dc0263C4429Bb5E3C0A543Efaf9[]
}
export type InsertManyEventPostApiResponse =
	/** status 201 Successful Response */ Event93Afef50531F4244A81E84Cc3994B257UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	insert: Event941E02D31Eda426A80B7Bb80585Ca02DCreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiResponse =
	/** status 200 Successful Response */ EventIdCompetitionIdd2E4A8D2Bbc04C42Aa7A18620C1De5A2FindManyResponseListModel
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiArg = {
	eventPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName3B8Be17DBafa4DefB1288Eb16Aac9Ef0[]
}
export type GetOneByPrimaryKeyEventIdGetApiResponse =
	/** status 200 Successful Response */ Event07Eadef854734D628A7D1D05E2E4B8DfFindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName0E456Ba6Ee5D48B5995A916945Bf2B8E[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseId7D4Ab0BcD5554C54B48D9741D7BfbaeaFindManyResponseListModel
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
	joinForeignTable?: TableNameda97Df88C0F548A69261F7198987Da34[]
}
export type GetOneByPrimaryKeyPhaseIdGetApiResponse =
	/** status 200 Successful Response */ Phaseca95683BA27349FcBc41E965A977A978FindOneResponseListModel
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
	joinForeignTable?: TableNamed06Db182924B4D039C7FA0Cf3622C4A4[]
}
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse =
	/** status 200 Successful Response */ Phase9Ffa821990Ef4931Acb627E902A4418CPatchOneResponseModelWithValidators
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
	/** status 201 Successful Response */ Phase9D927775775E481D86Ac2De23FceadadUpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	insert: Phase915C05Fd178E4001A8B0F1B32459E9B4CreateManyInsertItemRequestModel[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heatd7De701F6820482E94E6Cda0A14D21FbFindManyResponseListModel
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
	joinForeignTable?: TableNamedef621A046F742BaAa08D83E4Db55Ede[]
}
export type InsertManyHeatPostApiResponse =
	/** status 201 Successful Response */ Heat6117472277564F098Cf5514D3250E0F3UpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	insert: Heatf17E645042514B608011084E0D2D0Ae0CreateManyInsertItemRequestModel[]
}
export type GetOneByPrimaryKeyHeatIdGetApiResponse =
	/** status 200 Successful Response */ Heat2D0D4Ebe0Fa242DcA5A406F478Dcc761FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamea8E61D24A5864B058E9374Ef98F089Bc[]
}
export type InsertManyAthletePostApiResponse =
	/** status 201 Successful Response */ Athlete4Fad34D3C06549A2Ab1024Db163Ee815UpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	insert: Athlete8B71246D12E14D8CA8A2507F470B77D7CreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse =
	/** status 200 Successful Response */ Athletef5F8755891964Cee944297A6932D16AePatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheet19496869F50D4E6A89Dd91E4E173F313FindManyResponseListModel
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
	/** status 201 Successful Response */ ScoreSheete17F55Cc15B24F009E7BE67Bdf8Baeb7UpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	insert: ScoreSheet8946431167Fa4D419548Dd62374E0A9FCreateManyInsertItemRequestModel[]
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMoves44E9Cac4B1574E35A8AaE7E754Bd4104FindManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonusesccb5E8D4120E43BdA8862E722Ec28275FindManyResponseListModel
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
	displayOrderFromComparisonOperator?: RangeFromComparisonOperators
	displayOrderToComparisonOperator?: RangeToComparisonOperators
	displayOrderFrom?: number
	displayOrderTo?: number
	displayOrderListComparisonOperator?: ItemComparisonOperators
	displayOrderList?: number[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'sheet_id', 'move_id', 'name', 'score', 'display_order'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName9E5Be63684C44D93A733D60C1C6E52Cd[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMoves851E5E4F54A44Db1B870904Dcdd7A8AbDeleteManyResponseListModel
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
	/** status 201 Successful Response */ Athleteheatedb3C6A234D04B86A1BfE79F6331FbcaUpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	insert: Athleteheat2195E5FbF2234B9C8842B9648Bd265DbCreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat1568149804A54957977479F8Fe049305PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ RunStatus2Bea795220B144D593761B0Bed950AdfFindManyResponseListModel
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
	joinForeignTable?: TableNamec10301B214854A0E98B4Fcc3819D8620[]
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
	display_order?: number
}
export type AddUpdateScoresheetRequest = {
	moves?: PydanticAvailableMoves[]
	bonuses?: PydanticAvailableBonuses[]
}
export type ForeignEvent04Bbcc8EFe234Ccf9E8B4F032B8C344EFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent2Cf1C2681D884Dc193D09F2164165658GetManyResponseForeignModel =
	ForeignEvent04Bbcc8EFe234Ccf9E8B4F032B8C344EFindManyResponseItemModelWithValidators[]
export type Competitionc420C75C266F43Df81396D18A648A3EaFindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent2Cf1C2681D884Dc193D09F2164165658GetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competition6554E4373442470FA19DE03E7073D493FindManyResponseListModel =

		| Competitionc420C75C266F43Df81396D18A648A3EaFindManyResponseItemModelWithValidators[]

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
export type TableName52450F14F0E9434CB04BB6A2E8C9Bc24 = "event"
export type Competitionb7864Ce610744816B60298199Dbc2658UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type Competitionbb555Af49A214FbcA1A961B8Ccaf1A00UpsertManyResponseListModel =
	Competitionb7864Ce610744816B60298199Dbc2658UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition92E54676Dd3A4B8A84Ad267Bfb6F5E17CreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type ForeignCompetitionb5E6843671E140C9A7F4322933Eb3Cc5FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition9881D2C136B74339Af64C72A8D984Cb9GetManyResponseForeignModel =
	ForeignCompetitionb5E6843671E140C9A7F4322933Eb3Cc5FindManyResponseItemModelWithValidators[]
export type ForeignPhased51F9229F9Dd4D1BB40C46B192F12CcaFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase79D1E50858C44D7D85A05685D4C4499EGetManyResponseForeignModel =
	ForeignPhased51F9229F9Dd4D1BB40C46B192F12CcaFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId655A72B746D34EfcB6E7831Fc17Cc26DFindOneResponseModelWithValidators =
	{
		id?: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition9881D2C136B74339Af64C72A8D984Cb9GetManyResponseForeignModel
		phase_foreign?: ForeignPhase79D1E50858C44D7D85A05685D4C4499EGetManyResponseForeignModel
	}
export type CompetitionIdEventId9709A03658Fb426A966D8B6E6Ea5D69BFindManyResponseListModel =

		| CompetitionIdEventId655A72B746D34EfcB6E7831Fc17Cc26DFindOneResponseModelWithValidators[]

export type TableName8Aaf397B8A4D4D40A08F91Dfc3B9738A = "competition" | "phase"
export type Competition89F834D28Bea4Fe7A6EbCcac9A4Ed487PatchOneResponseModelWithValidators =
	{
		id?: string
		name: string
	}
export type ForeignCompetition72Bf91F9157D4279Ac8EA5Cbc3Ed5365FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionfacee9F18Eeb4604B3F670D94582C901GetManyResponseForeignModel =
	ForeignCompetition72Bf91F9157D4279Ac8EA5Cbc3Ed5365FindManyResponseItemModelWithValidators[]
export type ForeignPhase2D2Df638B09E48CeB7Be5843Bd024B48FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhasea4F8Ff2D762943Fc84343642F16Ddec6GetManyResponseForeignModel =
	ForeignPhase2D2Df638B09E48CeB7Be5843Bd024B48FindManyResponseItemModelWithValidators[]
export type Event8013Fad6B766449FA5B851181E6Bdad4FindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionfacee9F18Eeb4604B3F670D94582C901GetManyResponseForeignModel
		phase_foreign?: ForeignPhasea4F8Ff2D762943Fc84343642F16Ddec6GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event8A7601D0780F41B8Bc3B7B0C4849CcecFindManyResponseListModel =
	| Event8013Fad6B766449FA5B851181E6Bdad4FindManyResponseItemModelWithValidators[]

export type TableName7A9E3Dc0263C4429Bb5E3C0A543Efaf9 = "competition" | "phase"
export type Event6D0691AaD73C45D1B092B66F428C8Eb2UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Event93Afef50531F4244A81E84Cc3994B257UpsertManyResponseListModel =
	Event6D0691AaD73C45D1B092B66F428C8Eb2UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Event941E02D31Eda426A80B7Bb80585Ca02DCreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type ForeignEvent2192Ebb9516A452482A1F03703655D05FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventababe3767Dc24C3483860694F4571B65GetManyResponseForeignModel =
	ForeignEvent2192Ebb9516A452482A1F03703655D05FindManyResponseItemModelWithValidators[]
export type EventIdCompetitionIdfd0092374C194B6E95927C27B7F1140BFindOneResponseModelWithValidators =
	{
		id?: string
		name: string
		event_foreign?: ForeignEventababe3767Dc24C3483860694F4571B65GetManyResponseForeignModel
	}
export type EventIdCompetitionIdd2E4A8D2Bbc04C42Aa7A18620C1De5A2FindManyResponseListModel =

		| EventIdCompetitionIdfd0092374C194B6E95927C27B7F1140BFindOneResponseModelWithValidators[]

export type TableName3B8Be17DBafa4DefB1288Eb16Aac9Ef0 = "event"
export type ForeignCompetition693De1E9408A449FA7Fc0C45095E8D25FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionfe071Fcf13794Df29A6E6E55474Da09FGetManyResponseForeignModel =
	ForeignCompetition693De1E9408A449FA7Fc0C45095E8D25FindManyResponseItemModelWithValidators[]
export type ForeignPhase74F6B6C08Fe04E7B9A726C912177Ba51FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase33Fef4Ce8542406999F9B19F221B3E91GetManyResponseForeignModel =
	ForeignPhase74F6B6C08Fe04E7B9A726C912177Ba51FindManyResponseItemModelWithValidators[]
export type Eventc396Ae19Fe064D469Ca30D5Aae3Bbc96FindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionfe071Fcf13794Df29A6E6E55474Da09FGetManyResponseForeignModel
		phase_foreign?: ForeignPhase33Fef4Ce8542406999F9B19F221B3E91GetManyResponseForeignModel
		id?: string
		competition_id: string
		name: string
	}
export type Event07Eadef854734D628A7D1D05E2E4B8DfFindOneResponseListModel =
	Eventc396Ae19Fe064D469Ca30D5Aae3Bbc96FindOneResponseModelWithValidators
export type TableName0E456Ba6Ee5D48B5995A916945Bf2B8E = "competition" | "phase"
export type ForeignEventd2E4Cefb8D324696A185C3F7594B8E43FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventa31Acf4CF2614222B45AEb7151F08F3FGetManyResponseForeignModel =
	ForeignEventd2E4Cefb8D324696A185C3F7594B8E43FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat9A317200A0D54C09A5De740D9Cc0B910FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatc6C57693A5954412Be9DDc11282430BfGetManyResponseForeignModel =
	ForeignAthleteheat9A317200A0D54C09A5De740D9Cc0B910FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId7E28Eb1DD15244Ee9986Fc13866Ac879FindOneResponseModelWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEventa31Acf4CF2614222B45AEb7151F08F3FGetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatc6C57693A5954412Be9DDc11282430BfGetManyResponseForeignModel
	}
export type EventIdPhaseId7D4Ab0BcD5554C54B48D9741D7BfbaeaFindManyResponseListModel =

		| EventIdPhaseId7E28Eb1DD15244Ee9986Fc13866Ac879FindOneResponseModelWithValidators[]

export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableNameda97Df88C0F548A69261F7198987Da34 = "event" | "athleteheat"
export type ForeignEvent68A6Af2E0D8544CbBdf7Fb9Dcd0Cb7CcFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent84B908A7E3C447949B5E389C33C2B095GetManyResponseForeignModel =
	ForeignEvent68A6Af2E0D8544CbBdf7Fb9Dcd0Cb7CcFindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat4C177Ae856Fa40FbB73973Ead6553F07FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat519Df993C11A4Aa9A16C2De796201420GetManyResponseForeignModel =
	ForeignAthleteheat4C177Ae856Fa40FbB73973Ead6553F07FindManyResponseItemModelWithValidators[]
export type Phasebb80Fe762Fde482E95C4F158327391A5FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent84B908A7E3C447949B5E389C33C2B095GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat519Df993C11A4Aa9A16C2De796201420GetManyResponseForeignModel
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phaseca95683BA27349FcBc41E965A977A978FindOneResponseListModel =
	Phasebb80Fe762Fde482E95C4F158327391A5FindOneResponseModelWithValidators
export type TableNamed06Db182924B4D039C7FA0Cf3622C4A4 = "event" | "athleteheat"
export type Phase9Ffa821990Ef4931Acb627E902A4418CPatchOneResponseModelWithValidators =
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
export type Phasedeed692935854Ee59E87F06Ba31D0F0AUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase9D927775775E481D86Ac2De23FceadadUpsertManyResponseListModel =
	Phasedeed692935854Ee59E87F06Ba31D0F0AUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase915C05Fd178E4001A8B0F1B32459E9B4CreateManyInsertItemRequestModel =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type ForeignAthleteheat7D473C7D17Fa4236B84E111E7Fed2Ff1FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatab8D3Fb137E54Bf8Bd561Fedd77Dde5FGetManyResponseForeignModel =
	ForeignAthleteheat7D473C7D17Fa4236B84E111E7Fed2Ff1FindManyResponseItemModelWithValidators[]
export type Heatb228E81C312545B9Bdef37Ac8537857CFindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatab8D3Fb137E54Bf8Bd561Fedd77Dde5FGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heatd7De701F6820482E94E6Cda0A14D21FbFindManyResponseListModel =
	| Heatb228E81C312545B9Bdef37Ac8537857CFindManyResponseItemModelWithValidators[]

export type TableNamedef621A046F742BaAa08D83E4Db55Ede = "athleteheat"
export type Heat9C2C62Ae19244EafAf8DC00Eeedfb241UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heat6117472277564F098Cf5514D3250E0F3UpsertManyResponseListModel =
	Heat9C2C62Ae19244EafAf8DC00Eeedfb241UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heatf17E645042514B608011084E0D2D0Ae0CreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heat64E918Cc906B4908A66674059009Fb06FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheatab8D3Fb137E54Bf8Bd561Fedd77Dde5FGetManyResponseForeignModel
		id?: string
		competition_id: string
		name: string
	}
export type Heat2D0D4Ebe0Fa242DcA5A406F478Dcc761FindOneResponseListModel =
	Heat64E918Cc906B4908A66674059009Fb06FindOneResponseModelWithValidators
export type TableNamea8E61D24A5864B058E9374Ef98F089Bc = "athleteheat"
export type Athlete0577B0691C414Ba6982F2Da08D886A60UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athlete4Fad34D3C06549A2Ab1024Db163Ee815UpsertManyResponseListModel =
	Athlete0577B0691C414Ba6982F2Da08D886A60UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athlete8B71246D12E14D8CA8A2507F470B77D7CreateManyInsertItemRequestModel =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athletef5F8755891964Cee944297A6932D16AePatchOneResponseModelWithValidators =
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
export type ScoreSheetd9D971Fb6Bc54B07B4CbC14Fb3Bf651EFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheet19496869F50D4E6A89Dd91E4E173F313FindManyResponseListModel =

		| ScoreSheetd9D971Fb6Bc54B07B4CbC14Fb3Bf651EFindManyResponseItemModelWithValidators[]

export type ScoreSheeta09503Da25944B16Bd0D9A049D117Fd3UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type ScoreSheete17F55Cc15B24F009E7BE67Bdf8Baeb7UpsertManyResponseListModel =
	ScoreSheeta09503Da25944B16Bd0D9A049D117Fd3UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheet8946431167Fa4D419548Dd62374E0A9FCreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type AvailableMovesbfc53Aa2427D45D690B8B4C77384C5E3FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMoves44E9Cac4B1574E35A8AaE7E754Bd4104FindManyResponseListModel =

		| AvailableMovesbfc53Aa2427D45D690B8B4C77384C5E3FindManyResponseItemModelWithValidators[]

export type ForeignScoreSheet49D1Feee76574AfdA716A13Cf93F4A62FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheetffa3222425Cc471E80Fe1175C2F2F952GetManyResponseForeignModel =
	ForeignScoreSheet49D1Feee76574AfdA716A13Cf93F4A62FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesea640B2B5F3F4787Aac13C089397A283FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMovesc25C0Fcd9B2A441F8437F503Aee931D5GetManyResponseForeignModel =
	ForeignAvailableMovesea640B2B5F3F4787Aac13C089397A283FindManyResponseItemModelWithValidators[]
export type AvailableBonusesaa7C5100E6Bc470ABe97D1Fbc8Bc1B94FindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheetffa3222425Cc471E80Fe1175C2F2F952GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMovesc25C0Fcd9B2A441F8437F503Aee931D5GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
		display_order?: number
	}
export type AvailableBonusesccb5E8D4120E43BdA8862E722Ec28275FindManyResponseListModel =

		| AvailableBonusesaa7C5100E6Bc470ABe97D1Fbc8Bc1B94FindManyResponseItemModelWithValidators[]

export type TableName9E5Be63684C44D93A733D60C1C6E52Cd =
	| "scoreSheet"
	| "availableMoves"
export type ScoredMovesd236376F552B49F094CdF7C25C177860DeleteManyResponseModelWithValidators =
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
export type ScoredMoves851E5E4F54A44Db1B870904Dcdd7A8AbDeleteManyResponseListModel =
	ScoredMovesd236376F552B49F094CdF7C25C177860DeleteManyResponseModelWithValidators[]
export type Athleteheat9Af11Db7830F4036Ab4148Eec388A1DdUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheatedb3C6A234D04B86A1BfE79F6331FbcaUpsertManyResponseListModel =
	Athleteheat9Af11Db7830F4036Ab4148Eec388A1DdUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheat2195E5FbF2234B9C8842B9648Bd265DbCreateManyInsertItemRequestModel =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat1568149804A54957977479F8Fe049305PatchOneResponseModelWithValidators =
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
export type ForeignHeat728Aa7C949Ee42E5A06CD834E186EfcdFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat9F61Cac408A54C3B952EEc12D053A2FbGetManyResponseForeignModel =
	ForeignHeat728Aa7C949Ee42E5A06CD834E186EfcdFindManyResponseItemModelWithValidators[]
export type ForeignPhase6B40269C7Dfa429E944132385410D77AFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhasee3D7Fa3EB7Cb4C1C83A05Efb5D9D4E19GetManyResponseForeignModel =
	ForeignPhase6B40269C7Dfa429E944132385410D77AFindManyResponseItemModelWithValidators[]
export type ForeignAthlete57E21C47A77D4A168795Dbe49Dd5F336FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		affiliation?: string
		bib?: string
	}
export type ForeignAthletea7Da9816C8404900Bbb71Ec8898A7F5FGetManyResponseForeignModel =
	ForeignAthlete57E21C47A77D4A168795Dbe49Dd5F336FindManyResponseItemModelWithValidators[]
export type RunStatus102Ea1801B8F4F24B5B5847499Ebbd7FFindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat9F61Cac408A54C3B952EEc12D053A2FbGetManyResponseForeignModel
		phase_foreign?: ForeignPhasee3D7Fa3EB7Cb4C1C83A05Efb5D9D4E19GetManyResponseForeignModel
		athlete_foreign?: ForeignAthletea7Da9816C8404900Bbb71Ec8898A7F5FGetManyResponseForeignModel
		id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		athlete_id?: string
		locked?: boolean
		did_not_start?: boolean
	}
export type RunStatus2Bea795220B144D593761B0Bed950AdfFindManyResponseListModel =

		| RunStatus102Ea1801B8F4F24B5B5847499Ebbd7FFindManyResponseItemModelWithValidators[]

export type TableNamec10301B214854A0E98B4Fcc3819D8620 =
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
	useGetOneByPrimaryKeyEventIdGetQuery,
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
