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
		getAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGet:
			build.query<
				GetAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetApiResponse,
				GetAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetApiArg
			>({
				query: (queryArg) => ({
					url: `/getAthleteMovesAndBonuses/${queryArg.heatId}/${queryArg.athleteId}/${queryArg.runNumber}`,
					params: { judge_id: queryArg.judgeId }
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
export type GetAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetApiResponse =
	/** status 200 Successful Response */ ScoredMovesAndBonusesResponse
export type GetAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetApiArg =
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
	/** status 200 Successful Response */ Competition2E2A6AffAe4446A79F162Bd5E8E2Ca6AFindManyResponseListModel
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
	joinForeignTable?: TableName0Ec5Be7A1255456989492C706874Ec4D[]
}
export type InsertManyCompetitionPostApiResponse =
	/** status 201 Successful Response */ Competitione1Da13D3Ce4749389D3A637F59A5D573UpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	insert: Competitionf23Daa621609472FAbbcCa639Ff16E67CreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventId014B72Fd49Fe48Ac9026B55699A8A23BFindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNameaad808629D824Aef93F523013530B6F7[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competitionbd1Bd2F4320E453FA2869C5C1C476Ef7PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	name: string
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event813Dd9C8Bf9742FcBd5E897Fda86Da4EFindManyResponseListModel
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
	joinForeignTable?: TableName69E15Bf07E4E4Ff19Fab56E7Fd357E11[]
}
export type InsertManyEventPostApiResponse =
	/** status 201 Successful Response */ Event9Ffec9F5C97648Fa898816Dbdfb528C5UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	insert: Eventb224596F3Abe47D5B0B3Ed34A59658A3CreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiResponse =
	/** status 200 Successful Response */ EventIdCompetitionId0F4A89BaEa1845A891F260F0Fbc72DccFindManyResponseListModel
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiArg = {
	eventPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName878F79674E0D4F9BA720D0Da7Cf92124[]
}
export type GetOneByPrimaryKeyEventIdGetApiResponse =
	/** status 200 Successful Response */ Eventc57841A34D8041A2A95771E228472153FindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamed6Ea74B692Ab4Fb6Aa01E78F1700C9F9[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseId74E78B4994Fc4B8081C58788F41Fcdb2FindManyResponseListModel
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
	joinForeignTable?: TableNameb82Edec0B69A402785D27F9B17023Bc3[]
}
export type GetOneByPrimaryKeyPhaseIdGetApiResponse =
	/** status 200 Successful Response */ Phase761F0A20Bf8B40BaBaf78Cdbd92C55D1FindOneResponseListModel
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
	joinForeignTable?: TableNamec60711599B974B42B233A2624743D64E[]
}
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse =
	/** status 200 Successful Response */ Phase4Fd0F64958Ab4A018E46339B96Fc57B8PatchOneResponseModelWithValidators
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
	/** status 201 Successful Response */ Phase684E35D0Ec084A6A9Aff6E61C909Ba09UpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	insert: Phase89Dc2C038Bc5434F9Cff39734752A4BdCreateManyInsertItemRequestModel[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heatb7Ab30813Eb74A9FAb82Af7Ff109Ce56FindManyResponseListModel
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
	joinForeignTable?: TableName21517Ba16Dd6449A844E1Da449015Cf9[]
}
export type InsertManyHeatPostApiResponse =
	/** status 201 Successful Response */ Heatee8Cca10D7394F21B87972A4Ddf14895UpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	insert: Heat813A5B95D36D48A5888E3737F8Dc2206CreateManyInsertItemRequestModel[]
}
export type GetOneByPrimaryKeyHeatIdGetApiResponse =
	/** status 200 Successful Response */ Heata880948E79A744178B5B8F6D428C5267FindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName1C04A44A579B49Ef9B4DF3Bb5659D2Eb[]
}
export type InsertManyAthletePostApiResponse =
	/** status 201 Successful Response */ Athletef1C54E0980D5461B97A344B4E00A1934UpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	insert: Athletecc592242A47C42Dd97F601Cf83989280CreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse =
	/** status 200 Successful Response */ Athletec3C6Dcad6E1D47D093568F2F501B93B6PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheetd9D2Ed09533043Ad9127F12Ffecb0D4EFindManyResponseListModel
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
	/** status 201 Successful Response */ ScoreSheetd5478Ee333A140E487Fb79C957D83078UpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	insert: ScoreSheet3C8488835A794848A268551E56776815CreateManyInsertItemRequestModel[]
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMoves90B7990893A74B028553515E6D6E5EceFindManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonusesa521653B6Ffb46AcAe3AE2A414F4Fcf6FindManyResponseListModel
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
	joinForeignTable?: TableName8E17Df2CC14C417D9Fbb68Ffe3417355[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMovesca3A45F2696F48738Ae3E06Fd6710A29DeleteManyResponseListModel
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
	/** status 201 Successful Response */ Athleteheat1C5236D781D246Da97E1Cabec669Aea8UpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	insert: Athleteheatac58A9C5033B4Ce894305F6D02F278B8CreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheatd60Fbccc4F8C4C678Ef9109F6A723057PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ RunStatus0C3Ef6847B304D19Aa6555C6Dd07Ff76FindManyResponseListModel
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
	joinForeignTable?: TableName59088A4CD73B417AAc973D585Eb1393B[]
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
export type ForeignEvent3Af8Fe0748364243Ab2F3Ab4Dc9A6127FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent4Ad7C084Ca7F438F948F32Cd7E500DceGetManyResponseForeignModel =
	ForeignEvent3Af8Fe0748364243Ab2F3Ab4Dc9A6127FindManyResponseItemModelWithValidators[]
export type Competition1Ea872DaAbd3426185004B5Ac1E04607FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent4Ad7C084Ca7F438F948F32Cd7E500DceGetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competition2E2A6AffAe4446A79F162Bd5E8E2Ca6AFindManyResponseListModel =

		| Competition1Ea872DaAbd3426185004B5Ac1E04607FindManyResponseItemModelWithValidators[]

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
export type TableName0Ec5Be7A1255456989492C706874Ec4D = "event"
export type Competition35Ac7A5864A44434A72B510F4155Be47UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type Competitione1Da13D3Ce4749389D3A637F59A5D573UpsertManyResponseListModel =
	Competition35Ac7A5864A44434A72B510F4155Be47UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competitionf23Daa621609472FAbbcCa639Ff16E67CreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type ForeignCompetitiona34849Cb54B249989D72C5609E2630B1FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition206Fd8C78F504865Aa0C9303A678Eb95GetManyResponseForeignModel =
	ForeignCompetitiona34849Cb54B249989D72C5609E2630B1FindManyResponseItemModelWithValidators[]
export type ForeignPhase2F32Fe20C7F14Fdc8AeaC8C246C882D9FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase9B3C3Eb0Be02463B8B418F7Db5F73CecGetManyResponseForeignModel =
	ForeignPhase2F32Fe20C7F14Fdc8AeaC8C246C882D9FindManyResponseItemModelWithValidators[]
export type CompetitionIdEventIda53C860D4B284E4EBf4E396387403298FindOneResponseModelWithValidators =
	{
		id?: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetition206Fd8C78F504865Aa0C9303A678Eb95GetManyResponseForeignModel
		phase_foreign?: ForeignPhase9B3C3Eb0Be02463B8B418F7Db5F73CecGetManyResponseForeignModel
	}
export type CompetitionIdEventId014B72Fd49Fe48Ac9026B55699A8A23BFindManyResponseListModel =

		| CompetitionIdEventIda53C860D4B284E4EBf4E396387403298FindOneResponseModelWithValidators[]

export type TableNameaad808629D824Aef93F523013530B6F7 = "competition" | "phase"
export type Competitionbd1Bd2F4320E453FA2869C5C1C476Ef7PatchOneResponseModelWithValidators =
	{
		id?: string
		name: string
	}
export type ForeignCompetitiona3017D37694847929Bf80764Bcf40Ff9FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition41934587Af784A17A11F8B4D2Be4C05CGetManyResponseForeignModel =
	ForeignCompetitiona3017D37694847929Bf80764Bcf40Ff9FindManyResponseItemModelWithValidators[]
export type ForeignPhase9806A97584074390Ae146199E8B026E6FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase94A6D844043541228F812411081654A9GetManyResponseForeignModel =
	ForeignPhase9806A97584074390Ae146199E8B026E6FindManyResponseItemModelWithValidators[]
export type Event12A12B75Ef474B80978E3D33894Ab5B0FindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetition41934587Af784A17A11F8B4D2Be4C05CGetManyResponseForeignModel
		phase_foreign?: ForeignPhase94A6D844043541228F812411081654A9GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event813Dd9C8Bf9742FcBd5E897Fda86Da4EFindManyResponseListModel =
	| Event12A12B75Ef474B80978E3D33894Ab5B0FindManyResponseItemModelWithValidators[]

export type TableName69E15Bf07E4E4Ff19Fab56E7Fd357E11 = "competition" | "phase"
export type Eventa353532FC97D4890Aa3F5607Df23E101UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Event9Ffec9F5C97648Fa898816Dbdfb528C5UpsertManyResponseListModel =
	Eventa353532FC97D4890Aa3F5607Df23E101UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Eventb224596F3Abe47D5B0B3Ed34A59658A3CreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type ForeignEvent5D2Fb2Ad41E6409A8F7A3837A57Cab38FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEventaca4E499D08E4Bd4A4A75F4045D9A452GetManyResponseForeignModel =
	ForeignEvent5D2Fb2Ad41E6409A8F7A3837A57Cab38FindManyResponseItemModelWithValidators[]
export type EventIdCompetitionIde8Cfe2A7Eb604263B58BE7101Edfdf9CFindOneResponseModelWithValidators =
	{
		id?: string
		name: string
		event_foreign?: ForeignEventaca4E499D08E4Bd4A4A75F4045D9A452GetManyResponseForeignModel
	}
export type EventIdCompetitionId0F4A89BaEa1845A891F260F0Fbc72DccFindManyResponseListModel =

		| EventIdCompetitionIde8Cfe2A7Eb604263B58BE7101Edfdf9CFindOneResponseModelWithValidators[]

export type TableName878F79674E0D4F9BA720D0Da7Cf92124 = "event"
export type ForeignCompetition72B9Ace258Ce4D2DB51C54B9E9D16C27FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitiona8F8219223Cd42918F19403390Be1CdfGetManyResponseForeignModel =
	ForeignCompetition72B9Ace258Ce4D2DB51C54B9E9D16C27FindManyResponseItemModelWithValidators[]
export type ForeignPhased6Ee9Fc94B2246F3Ad5BC5C8Ecc4B9A4FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase610006Bd857742FeAfac7C73Fb80764BGetManyResponseForeignModel =
	ForeignPhased6Ee9Fc94B2246F3Ad5BC5C8Ecc4B9A4FindManyResponseItemModelWithValidators[]
export type Event3D0Bb4A1Ff21448B9F3C9Bc8D2568F1BFindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetitiona8F8219223Cd42918F19403390Be1CdfGetManyResponseForeignModel
		phase_foreign?: ForeignPhase610006Bd857742FeAfac7C73Fb80764BGetManyResponseForeignModel
		id?: string
		competition_id: string
		name: string
	}
export type Eventc57841A34D8041A2A95771E228472153FindOneResponseListModel =
	Event3D0Bb4A1Ff21448B9F3C9Bc8D2568F1BFindOneResponseModelWithValidators
export type TableNamed6Ea74B692Ab4Fb6Aa01E78F1700C9F9 = "competition" | "phase"
export type ForeignEvent3604B903B9714Fc89D541Ece84Cb7Cf6FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent54C9Fe1221Ae4E28Bb67Df20De1C7Fc8GetManyResponseForeignModel =
	ForeignEvent3604B903B9714Fc89D541Ece84Cb7Cf6FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat2597792A6Cb849BaA6076Cb5F375A339FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat12469Dd0E76547A1A0Ea6Ae87E5B9642GetManyResponseForeignModel =
	ForeignAthleteheat2597792A6Cb849BaA6076Cb5F375A339FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId48Cb633C98E44868901D56300C7F5E09FindOneResponseModelWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEvent54C9Fe1221Ae4E28Bb67Df20De1C7Fc8GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat12469Dd0E76547A1A0Ea6Ae87E5B9642GetManyResponseForeignModel
	}
export type EventIdPhaseId74E78B4994Fc4B8081C58788F41Fcdb2FindManyResponseListModel =

		| EventIdPhaseId48Cb633C98E44868901D56300C7F5E09FindOneResponseModelWithValidators[]

export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableNameb82Edec0B69A402785D27F9B17023Bc3 = "event" | "athleteheat"
export type ForeignEvent41915189Fbd644709D5387A5Ef8D9628FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent9F0Ce928274045C1B7B3Bfdf16B38D37GetManyResponseForeignModel =
	ForeignEvent41915189Fbd644709D5387A5Ef8D9628FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat5C5081Eb060C410CBb79Fc2A317Ee704FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat69A536F77D6C4Bda9369C556Dd4426C6GetManyResponseForeignModel =
	ForeignAthleteheat5C5081Eb060C410CBb79Fc2A317Ee704FindManyResponseItemModelWithValidators[]
export type Phase6Fbc1F96B72341518F7C0193D6D0828FFindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent9F0Ce928274045C1B7B3Bfdf16B38D37GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat69A536F77D6C4Bda9369C556Dd4426C6GetManyResponseForeignModel
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase761F0A20Bf8B40BaBaf78Cdbd92C55D1FindOneResponseListModel =
	Phase6Fbc1F96B72341518F7C0193D6D0828FFindOneResponseModelWithValidators
export type TableNamec60711599B974B42B233A2624743D64E = "event" | "athleteheat"
export type Phase4Fd0F64958Ab4A018E46339B96Fc57B8PatchOneResponseModelWithValidators =
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
export type Phase580F1F7AE28041D8B40D9E9Bee808352UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phase684E35D0Ec084A6A9Aff6E61C909Ba09UpsertManyResponseListModel =
	Phase580F1F7AE28041D8B40D9E9Bee808352UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase89Dc2C038Bc5434F9Cff39734752A4BdCreateManyInsertItemRequestModel =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type ForeignAthleteheat8D8Cdfb03Db74780Ab3599C2631A2B35FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat158F4959Fe46435C81723775Ecee40BeGetManyResponseForeignModel =
	ForeignAthleteheat8D8Cdfb03Db74780Ab3599C2631A2B35FindManyResponseItemModelWithValidators[]
export type Heat7A9463A0F4934A39B3B0Ab9A7D9695E0FindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat158F4959Fe46435C81723775Ecee40BeGetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heatb7Ab30813Eb74A9FAb82Af7Ff109Ce56FindManyResponseListModel =
	| Heat7A9463A0F4934A39B3B0Ab9A7D9695E0FindManyResponseItemModelWithValidators[]

export type TableName21517Ba16Dd6449A844E1Da449015Cf9 = "athleteheat"
export type Heat69Ad54448Fd446Dc9804A4Fc1828B5F9UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heatee8Cca10D7394F21B87972A4Ddf14895UpsertManyResponseListModel =
	Heat69Ad54448Fd446Dc9804A4Fc1828B5F9UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat813A5B95D36D48A5888E3737F8Dc2206CreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heat26F0C2Dc961D44E3A7619A0B60Edd4A3FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat158F4959Fe46435C81723775Ecee40BeGetManyResponseForeignModel
		id?: string
		competition_id: string
		name: string
	}
export type Heata880948E79A744178B5B8F6D428C5267FindOneResponseListModel =
	Heat26F0C2Dc961D44E3A7619A0B60Edd4A3FindOneResponseModelWithValidators
export type TableName1C04A44A579B49Ef9B4DF3Bb5659D2Eb = "athleteheat"
export type Athletec0C5F6D5110842E79Dcd5E04Fc71F614UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athletef1C54E0980D5461B97A344B4E00A1934UpsertManyResponseListModel =
	Athletec0C5F6D5110842E79Dcd5E04Fc71F614UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athletecc592242A47C42Dd97F601Cf83989280CreateManyInsertItemRequestModel =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athletec3C6Dcad6E1D47D093568F2F501B93B6PatchOneResponseModelWithValidators =
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
export type ScoreSheetf3Cd55B5889A4514996435B08E6A55BcFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheetd9D2Ed09533043Ad9127F12Ffecb0D4EFindManyResponseListModel =

		| ScoreSheetf3Cd55B5889A4514996435B08E6A55BcFindManyResponseItemModelWithValidators[]

export type ScoreSheet0B2538F767E34E2ABa96F74F971F343FUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type ScoreSheetd5478Ee333A140E487Fb79C957D83078UpsertManyResponseListModel =
	ScoreSheet0B2538F767E34E2ABa96F74F971F343FUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheet3C8488835A794848A268551E56776815CreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type AvailableMovesa8E82411958B47BaAdbeF718376260C6FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMoves90B7990893A74B028553515E6D6E5EceFindManyResponseListModel =

		| AvailableMovesa8E82411958B47BaAdbeF718376260C6FindManyResponseItemModelWithValidators[]

export type ForeignScoreSheet1Beef8D2664E444C9Ebf96De73975554FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheet02Afa0E6Ce0C4Fdf97Db648E8Cd6E6F4GetManyResponseForeignModel =
	ForeignScoreSheet1Beef8D2664E444C9Ebf96De73975554FindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesc5Ad68Cb09D342A2B8F31D19Affce219FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves3Dca0421Fd4F4Df2Adcd6C23741C0130GetManyResponseForeignModel =
	ForeignAvailableMovesc5Ad68Cb09D342A2B8F31D19Affce219FindManyResponseItemModelWithValidators[]
export type AvailableBonuses872A2Ad4593445B2Bd43B819Aba4A97FFindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet02Afa0E6Ce0C4Fdf97Db648E8Cd6E6F4GetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves3Dca0421Fd4F4Df2Adcd6C23741C0130GetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
		display_order?: number
	}
export type AvailableBonusesa521653B6Ffb46AcAe3AE2A414F4Fcf6FindManyResponseListModel =

		| AvailableBonuses872A2Ad4593445B2Bd43B819Aba4A97FFindManyResponseItemModelWithValidators[]

export type TableName8E17Df2CC14C417D9Fbb68Ffe3417355 =
	| "scoreSheet"
	| "availableMoves"
export type ScoredMovesf301F072F35E43A8B1411E88B9A0957FDeleteManyResponseModelWithValidators =
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
export type ScoredMovesca3A45F2696F48738Ae3E06Fd6710A29DeleteManyResponseListModel =
	ScoredMovesf301F072F35E43A8B1411E88B9A0957FDeleteManyResponseModelWithValidators[]
export type Athleteheateceb667C59874A6DBaed5Ea4906Dd939UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat1C5236D781D246Da97E1Cabec669Aea8UpsertManyResponseListModel =
	Athleteheateceb667C59874A6DBaed5Ea4906Dd939UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheatac58A9C5033B4Ce894305F6D02F278B8CreateManyInsertItemRequestModel =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheatd60Fbccc4F8C4C678Ef9109F6A723057PatchOneResponseModelWithValidators =
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
export type ForeignHeat4Ccb6557D63B44D498D2A82A65F02318FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat36Ca4F8F40F4460CA41BA4A2F1B980A7GetManyResponseForeignModel =
	ForeignHeat4Ccb6557D63B44D498D2A82A65F02318FindManyResponseItemModelWithValidators[]
export type ForeignPhasede458C6CB7D94B7EAe7D8Eb75Fb70EbbFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase5Cb13E3B628B4695A31CA2A02Fb5Dbc9GetManyResponseForeignModel =
	ForeignPhasede458C6CB7D94B7EAe7D8Eb75Fb70EbbFindManyResponseItemModelWithValidators[]
export type ForeignAthlete2Fd964CcCab64A1CA5936973B2D408BdFindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		affiliation?: string
		bib?: string
	}
export type ForeignAthleteb7C05487Ab354C74Aa3F23Cfcf289427GetManyResponseForeignModel =
	ForeignAthlete2Fd964CcCab64A1CA5936973B2D408BdFindManyResponseItemModelWithValidators[]
export type RunStatus1D90Ffb7929A46849A4AD58F81E4E414FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat36Ca4F8F40F4460CA41BA4A2F1B980A7GetManyResponseForeignModel
		phase_foreign?: ForeignPhase5Cb13E3B628B4695A31CA2A02Fb5Dbc9GetManyResponseForeignModel
		athlete_foreign?: ForeignAthleteb7C05487Ab354C74Aa3F23Cfcf289427GetManyResponseForeignModel
		id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		athlete_id?: string
		locked?: boolean
		did_not_start?: boolean
	}
export type RunStatus0C3Ef6847B304D19Aa6555C6Dd07Ff76FindManyResponseListModel =

		| RunStatus1D90Ffb7929A46849A4AD58F81E4E414FindManyResponseItemModelWithValidators[]

export type TableName59088A4CD73B417AAc973D585Eb1393B =
	| "heat"
	| "phase"
	| "athlete"
export const {
	useUploadCompetitionManagementUploadPostMutation,
	usePromotePhaseCompetitionManagementPromotePhasePostMutation,
	useGetHeatInfoGetHeatInfoHeatIdGetQuery,
	useGetHeatPhasesGetHeatInfoHeatIdPhaseGetQuery,
	useUpdateAthleteScoreAddUpdateAthleteScoreHeatIdAthleteIdRunNumberJudgeIdPostMutation,
	useGetAthleteMovesAndBonusesGetAthleteMovesAndBonusesHeatIdAthleteIdRunNumberGetQuery,
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
