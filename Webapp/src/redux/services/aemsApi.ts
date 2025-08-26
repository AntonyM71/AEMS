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
		judgeId?: string
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
	/** status 200 Successful Response */ Competition1781B0372B05466B834A05C4353C0Cb4FindManyResponseListModel
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
	joinForeignTable?: TableName824B0Dbf719245C4Ba907E427B68Fdf7[]
}
export type InsertManyCompetitionPostApiResponse =
	/** status 201 Successful Response */ Competition82C18291Be15475BA8EbE9Eac3A420FbUpsertManyResponseListModel
export type InsertManyCompetitionPostApiArg = {
	insert: Competition8907B4A4D1064C63B4Df867057Fa142BCreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ CompetitionIdEventIdcf63F47AC013462CB459B6E32Ddedc1CFindManyResponseListModel
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamef3949346557F4C4F813583B1364B723F[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ Competition4A5349EcF1024Fce8B12831B5352C789PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	name: string
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ Event1Ac40849A793448CBe79Df4C7020B113FindManyResponseListModel
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
	joinForeignTable?: TableName4B56B468D9104467Abf39575Fc7Dd5F7[]
}
export type InsertManyEventPostApiResponse =
	/** status 201 Successful Response */ Event6A1E69A4Dd3642C2901018B2F55Bfaa4UpsertManyResponseListModel
export type InsertManyEventPostApiArg = {
	insert: Eventc37E75C14D60426F89Ed84Ec7372559CCreateManyInsertItemRequestModel[]
}
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiResponse =
	/** status 200 Successful Response */ EventIdCompetitionIdde17A29DAc1D468F943D93617Dd320F6FindManyResponseListModel
export type GetManyByPkFromCompetitionEventEventPkIdCompetitionGetApiArg = {
	eventPkId: string
	idListComparisonOperator?: ItemComparisonOperators
	idList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableNamee85961FfB50445E784F5E56Bb960B780[]
}
export type GetOneByPrimaryKeyEventIdGetApiResponse =
	/** status 200 Successful Response */ Event0B36C0Dd17144Ce1B18E88Df8Fcc07EfFindOneResponseListModel
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName420A11D2D4D54FfaB23039De953Aa867[]
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ EventIdPhaseIdf893908BEbba4B14A5EcBa72B084D24FFindManyResponseListModel
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
	joinForeignTable?: TableName68Cd91CeA5D24B90A925D94562Ef94E0[]
}
export type GetOneByPrimaryKeyPhaseIdGetApiResponse =
	/** status 200 Successful Response */ Phaseda63665717E147F59B6AF5Efb3D4C4C9FindOneResponseListModel
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
	joinForeignTable?: TableNameae0F30353Ed84Ab4A3A1Ce6Ee6Dfa05B[]
}
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse =
	/** status 200 Successful Response */ Phase8896B4F0Ee774E8DA51E10Dfc52B1587PatchOneResponseModelWithValidators
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
	/** status 201 Successful Response */ Phasefd3D736111C94E36B54607Ccb742Bf4AUpsertManyResponseListModel
export type InsertManyPhasePostApiArg = {
	insert: Phase8856D5E928Fb403CBbdbF056B7B2D191CreateManyInsertItemRequestModel[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ Heatd474806B2A1647E5Ad613Ddc77Af3D22FindManyResponseListModel
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
	joinForeignTable?: TableName748B5173F791446E961824Cd579A54Af[]
}
export type InsertManyHeatPostApiResponse =
	/** status 201 Successful Response */ Heat15D5Bb5DF1D94A1E9A653D4A44D90A86UpsertManyResponseListModel
export type InsertManyHeatPostApiArg = {
	insert: Heat782856B3A4Ea41EfBfeaF1D4Be9A097ECreateManyInsertItemRequestModel[]
}
export type GetOneByPrimaryKeyHeatIdGetApiResponse =
	/** status 200 Successful Response */ Heata566A97BF1854310AbfdE9C3C2Dcc36FFindOneResponseListModel
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdListComparisonOperator?: ItemComparisonOperators
	competitionIdList?: string[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName96C6913085304175B3723B48D3Dc60Ac[]
}
export type InsertManyAthletePostApiResponse =
	/** status 201 Successful Response */ Athlete632Dd407797C443DAd4AB855E4092020UpsertManyResponseListModel
export type InsertManyAthletePostApiArg = {
	insert: Athlete8A8C471CE0854974B7A38565Bf562938CreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse =
	/** status 200 Successful Response */ Athlete5433C4C7D722421D9811D2C73Dd8Ccf9PatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ ScoreSheet69Bfa5D7129E4A1185734D9D084D6E81FindManyResponseListModel
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
	/** status 201 Successful Response */ ScoreSheetd096181ADef446A095B04256Bdc70744UpsertManyResponseListModel
export type InsertManyScoresheetPostApiArg = {
	insert: ScoreSheet278C6E656D084Dd9A93CC6D84E4E6FddCreateManyInsertItemRequestModel[]
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMovesc30D4061B8E4400D9D6C110D1458Abb4FindManyResponseListModel
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
	/** status 200 Successful Response */ AvailableBonuses578C4C347C4145Cc9B02C4985E4EabffFindManyResponseListModel
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
	joinForeignTable?: TableName30Aec9A658B64173A5C75A3D5768D3F6[]
}
export type DeleteManyByQueryScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ ScoredMovesdf5D4F505Bcc4B408D377B5368F28E88DeleteManyResponseListModel
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
	/** status 201 Successful Response */ Athleteheatf29F90A7F3D6486AAa8211C1E69A8Ad7UpsertManyResponseListModel
export type InsertManyAthleteheatPostApiArg = {
	insert: Athleteheatfa10E74517B74F978Dc273B98830E973CreateManyInsertItemRequestModel[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ Athleteheat5B4B875518B54362B57D9Ef8C28F3AddPatchOneResponseModelWithValidators
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
	/** status 200 Successful Response */ RunStatus3E7Ca3FdC531463BAc490F67302968A4FindManyResponseListModel
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
	joinForeignTable?: TableName2Fa9647C953A4F359Ab100A23E0C699C[]
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
export type ForeignEventb1Edea8CF6Ab49F28Dfb37Cfb8Ddb6BdFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent5814Db8DB9Bb48B8A5113Cf0Fcc84F86GetManyResponseForeignModel =
	ForeignEventb1Edea8CF6Ab49F28Dfb37Cfb8Ddb6BdFindManyResponseItemModelWithValidators[]
export type Competition0610E7B46D704528A10FC7C3Bcfd9E33FindManyResponseItemModelWithValidators =
	{
		event_foreign?: ForeignEvent5814Db8DB9Bb48B8A5113Cf0Fcc84F86GetManyResponseForeignModel
		id?: string
		name?: string
	}
export type Competition1781B0372B05466B834A05C4353C0Cb4FindManyResponseListModel =

		| Competition0610E7B46D704528A10FC7C3Bcfd9E33FindManyResponseItemModelWithValidators[]

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
export type TableName824B0Dbf719245C4Ba907E427B68Fdf7 = "event"
export type Competitionae91E4Db29Ec483787A331A34739A8F1UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type Competition82C18291Be15475BA8EbE9Eac3A420FbUpsertManyResponseListModel =
	Competitionae91E4Db29Ec483787A331A34739A8F1UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Competition8907B4A4D1064C63B4Df867057Fa142BCreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type ForeignCompetition473964Ee12Ff490FAe33Bc105B205E09FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionf55C767ED2324B8B88C564Fa3858A9EbGetManyResponseForeignModel =
	ForeignCompetition473964Ee12Ff490FAe33Bc105B205E09FindManyResponseItemModelWithValidators[]
export type ForeignPhase441C9C82Ec9F496EA166658Ffd7D4E2FFindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase99627337F74C48C69464288Af2A926B8GetManyResponseForeignModel =
	ForeignPhase441C9C82Ec9F496EA166658Ffd7D4E2FFindManyResponseItemModelWithValidators[]
export type CompetitionIdEventId02A2E0171A684B6BB60037917318F481FindOneResponseModelWithValidators =
	{
		id?: string
		competition_id: string
		name: string
		competition_foreign?: ForeignCompetitionf55C767ED2324B8B88C564Fa3858A9EbGetManyResponseForeignModel
		phase_foreign?: ForeignPhase99627337F74C48C69464288Af2A926B8GetManyResponseForeignModel
	}
export type CompetitionIdEventIdcf63F47AC013462CB459B6E32Ddedc1CFindManyResponseListModel =

		| CompetitionIdEventId02A2E0171A684B6BB60037917318F481FindOneResponseModelWithValidators[]

export type TableNamef3949346557F4C4F813583B1364B723F = "competition" | "phase"
export type Competition4A5349EcF1024Fce8B12831B5352C789PatchOneResponseModelWithValidators =
	{
		id?: string
		name: string
	}
export type ForeignCompetition8Aa6F13A45Ed48CbA048Ff2E69320De5FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetition0Bb679B09F2E4F0BA65308A384021418GetManyResponseForeignModel =
	ForeignCompetition8Aa6F13A45Ed48CbA048Ff2E69320De5FindManyResponseItemModelWithValidators[]
export type ForeignPhasedc2Be9157Ef541AdAc24A9C76Cbcc7C2FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhaseed9870C5Efaf4Fc8933D9B16D3045456GetManyResponseForeignModel =
	ForeignPhasedc2Be9157Ef541AdAc24A9C76Cbcc7C2FindManyResponseItemModelWithValidators[]
export type Event36E13D0514334Da1AfdcE64Ad8353F40FindManyResponseItemModelWithValidators =
	{
		competition_foreign?: ForeignCompetition0Bb679B09F2E4F0BA65308A384021418GetManyResponseForeignModel
		phase_foreign?: ForeignPhaseed9870C5Efaf4Fc8933D9B16D3045456GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Event1Ac40849A793448CBe79Df4C7020B113FindManyResponseListModel =
	| Event36E13D0514334Da1AfdcE64Ad8353F40FindManyResponseItemModelWithValidators[]

export type TableName4B56B468D9104467Abf39575Fc7Dd5F7 = "competition" | "phase"
export type Event9F1A7E92E59540Ca99D8100966C189F2UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Event6A1E69A4Dd3642C2901018B2F55Bfaa4UpsertManyResponseListModel =
	Event9F1A7E92E59540Ca99D8100966C189F2UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Eventc37E75C14D60426F89Ed84Ec7372559CCreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type ForeignEvent7F9Dc050Bcd94F25B75850B9A4Fb3A92FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent6204245D138E4AedAd23927A93C268B4GetManyResponseForeignModel =
	ForeignEvent7F9Dc050Bcd94F25B75850B9A4Fb3A92FindManyResponseItemModelWithValidators[]
export type EventIdCompetitionId6C4E18BfA1614815B39F2Daf9E85251DFindOneResponseModelWithValidators =
	{
		id?: string
		name: string
		event_foreign?: ForeignEvent6204245D138E4AedAd23927A93C268B4GetManyResponseForeignModel
	}
export type EventIdCompetitionIdde17A29DAc1D468F943D93617Dd320F6FindManyResponseListModel =

		| EventIdCompetitionId6C4E18BfA1614815B39F2Daf9E85251DFindOneResponseModelWithValidators[]

export type TableNamee85961FfB50445E784F5E56Bb960B780 = "event"
export type ForeignCompetitionba923A9C8De7493199Ee09322A278DffFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignCompetitionf826Aa0FAbe941Ef89C4Fa57165F080EGetManyResponseForeignModel =
	ForeignCompetitionba923A9C8De7493199Ee09322A278DffFindManyResponseItemModelWithValidators[]
export type ForeignPhase67F0A1B943A141AdA25018A19768E984FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase279A293768A74E9BB01C3D51Ff992F97GetManyResponseForeignModel =
	ForeignPhase67F0A1B943A141AdA25018A19768E984FindManyResponseItemModelWithValidators[]
export type Event8600Cb8BBaa142008A6FCc9A0Dafd76AFindOneResponseModelWithValidators =
	{
		competition_foreign?: ForeignCompetitionf826Aa0FAbe941Ef89C4Fa57165F080EGetManyResponseForeignModel
		phase_foreign?: ForeignPhase279A293768A74E9BB01C3D51Ff992F97GetManyResponseForeignModel
		id?: string
		competition_id: string
		name: string
	}
export type Event0B36C0Dd17144Ce1B18E88Df8Fcc07EfFindOneResponseListModel =
	Event8600Cb8BBaa142008A6FCc9A0Dafd76AFindOneResponseModelWithValidators
export type TableName420A11D2D4D54FfaB23039De953Aa867 = "competition" | "phase"
export type ForeignEvent676Dfcb35D0D468F95E0226139766F10FindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent5B978C9ECffe45D1A20CE82E585Df222GetManyResponseForeignModel =
	ForeignEvent676Dfcb35D0D468F95E0226139766F10FindManyResponseItemModelWithValidators[]
export type ForeignAthleteheatdc5D0037A2B04Dba8040199630C2F413FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheatd97905D3235F458589F8D00366578139GetManyResponseForeignModel =
	ForeignAthleteheatdc5D0037A2B04Dba8040199630C2F413FindManyResponseItemModelWithValidators[]
export type EventIdPhaseId9E104E58F37741859E0A06Ed2C1B865DFindOneResponseModelWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
		event_foreign?: ForeignEvent5B978C9ECffe45D1A20CE82E585Df222GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheatd97905D3235F458589F8D00366578139GetManyResponseForeignModel
	}
export type EventIdPhaseIdf893908BEbba4B14A5EcBa72B084D24FFindManyResponseListModel =

		| EventIdPhaseId9E104E58F37741859E0A06Ed2C1B865DFindOneResponseModelWithValidators[]

export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
export type TableName68Cd91CeA5D24B90A925D94562Ef94E0 = "event" | "athleteheat"
export type ForeignEvent4B42CbbdA4384B7789FfB1687B9F054CFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignEvent231C6D248E544Bb09Ad3Fa87A6Ecc3D5GetManyResponseForeignModel =
	ForeignEvent4B42CbbdA4384B7789FfB1687B9F054CFindManyResponseItemModelWithValidators[]
export type ForeignAthleteheat35B444Ef71334Ebc9D601D409Fb751C0FindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat234E00BcB7Aa43B8A07975Ad7572F578GetManyResponseForeignModel =
	ForeignAthleteheat35B444Ef71334Ebc9D601D409Fb751C0FindManyResponseItemModelWithValidators[]
export type Phase9F41B9Dc2B144E46B4B9A97E7D5Fe9D4FindOneResponseModelWithValidators =
	{
		event_foreign?: ForeignEvent231C6D248E544Bb09Ad3Fa87A6Ecc3D5GetManyResponseForeignModel
		athleteheat_foreign?: ForeignAthleteheat234E00BcB7Aa43B8A07975Ad7572F578GetManyResponseForeignModel
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phaseda63665717E147F59B6AF5Efb3D4C4C9FindOneResponseListModel =
	Phase9F41B9Dc2B144E46B4B9A97E7D5Fe9D4FindOneResponseModelWithValidators
export type TableNameae0F30353Ed84Ab4A3A1Ce6Ee6Dfa05B = "event" | "athleteheat"
export type Phase8896B4F0Ee774E8DA51E10Dfc52B1587PatchOneResponseModelWithValidators =
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
export type Phase03Da04792Ac845519DdbA5338C368Ce4UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type Phasefd3D736111C94E36B54607Ccb742Bf4AUpsertManyResponseListModel =
	Phase03Da04792Ac845519DdbA5338C368Ce4UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Phase8856D5E928Fb403CBbdbF056B7B2D191CreateManyInsertItemRequestModel =
	{
		id?: string
		event_id: string
		name: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet: string
	}
export type ForeignAthleteheatf387509E7172402997A13652C611161DFindManyResponseItemModelWithValidators =
	{
		id?: string
		heat_id?: string
		athlete_id?: string
		phase_id?: string
		last_phase_rank?: number
	}
export type ForeignAthleteheat5514D04DF56F4Dbb8CdeDf077Ab9F4C7GetManyResponseForeignModel =
	ForeignAthleteheatf387509E7172402997A13652C611161DFindManyResponseItemModelWithValidators[]
export type Heat09Bbc6DdB41D464597Aa1C6484030913FindManyResponseItemModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat5514D04DF56F4Dbb8CdeDf077Ab9F4C7GetManyResponseForeignModel
		id?: string
		competition_id?: string
		name?: string
	}
export type Heatd474806B2A1647E5Ad613Ddc77Af3D22FindManyResponseListModel =
	| Heat09Bbc6DdB41D464597Aa1C6484030913FindManyResponseItemModelWithValidators[]

export type TableName748B5173F791446E961824Cd579A54Af = "athleteheat"
export type Heatcf60598D94954BdfB21FF8Ab6E09F9D2UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heat15D5Bb5DF1D94A1E9A653D4A44D90A86UpsertManyResponseListModel =
	Heatcf60598D94954BdfB21FF8Ab6E09F9D2UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Heat782856B3A4Ea41EfBfeaF1D4Be9A097ECreateManyInsertItemRequestModel =
	{
		id?: string
		competition_id: string
		name: string
	}
export type Heat62Ea5Ba0Fa0B452BB3306F736E189A29FindOneResponseModelWithValidators =
	{
		athleteheat_foreign?: ForeignAthleteheat5514D04DF56F4Dbb8CdeDf077Ab9F4C7GetManyResponseForeignModel
		id?: string
		competition_id: string
		name: string
	}
export type Heata566A97BF1854310AbfdE9C3C2Dcc36FFindOneResponseListModel =
	Heat62Ea5Ba0Fa0B452BB3306F736E189A29FindOneResponseModelWithValidators
export type TableName96C6913085304175B3723B48D3Dc60Ac = "athleteheat"
export type Athlete0Fe82Ed536Ad4A2787486B516E0D9154UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athlete632Dd407797C443DAd4AB855E4092020UpsertManyResponseListModel =
	Athlete0Fe82Ed536Ad4A2787486B516E0D9154UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athlete8A8C471CE0854974B7A38565Bf562938CreateManyInsertItemRequestModel =
	{
		id?: string
		first_name: string
		last_name: string
		affiliation?: string
		bib: string
	}
export type Athlete5433C4C7D722421D9811D2C73Dd8Ccf9PatchOneResponseModelWithValidators =
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
export type ScoreSheetec0Cc65FC62B4C46889D7C12Da4C1158FindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ScoreSheet69Bfa5D7129E4A1185734D9D084D6E81FindManyResponseListModel =

		| ScoreSheetec0Cc65FC62B4C46889D7C12Da4C1158FindManyResponseItemModelWithValidators[]

export type ScoreSheet58Ba03DcB5524B849FfeB9Ad63Bf340CUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		name: string
	}
export type ScoreSheetd096181ADef446A095B04256Bdc70744UpsertManyResponseListModel =
	ScoreSheet58Ba03DcB5524B849FfeB9Ad63Bf340CUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ScoreSheet278C6E656D084Dd9A93CC6D84E4E6FddCreateManyInsertItemRequestModel =
	{
		id?: string
		name: string
	}
export type AvailableMovesa566Cd83F7E042B4B86721A95691B261FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type AvailableMovesc30D4061B8E4400D9D6C110D1458Abb4FindManyResponseListModel =

		| AvailableMovesa566Cd83F7E042B4B86721A95691B261FindManyResponseItemModelWithValidators[]

export type ForeignScoreSheet32330Fe9F52A442897C30D973C40C49BFindManyResponseItemModelWithValidators =
	{
		id?: string
		name?: string
	}
export type ForeignScoreSheet5B3Ec0Ce896A4F0DAb91B21C2E6A636DGetManyResponseForeignModel =
	ForeignScoreSheet32330Fe9F52A442897C30D973C40C49BFindManyResponseItemModelWithValidators[]
export type ForeignAvailableMovesa71F9B4287Be46D9A289C9Cadba2E5D0FindManyResponseItemModelWithValidators =
	{
		id?: string
		sheet_id?: string
		name?: string
		fl_score?: number
		rb_score?: number
		direction?: string
	}
export type ForeignAvailableMoves828Cdb4A80F34C7FBdfdBd82Bedd396BGetManyResponseForeignModel =
	ForeignAvailableMovesa71F9B4287Be46D9A289C9Cadba2E5D0FindManyResponseItemModelWithValidators[]
export type AvailableBonusesb3667Dca77B347B4A6Cf42B566326Ea3FindManyResponseItemModelWithValidators =
	{
		scoreSheet_foreign?: ForeignScoreSheet5B3Ec0Ce896A4F0DAb91B21C2E6A636DGetManyResponseForeignModel
		availableMoves_foreign?: ForeignAvailableMoves828Cdb4A80F34C7FBdfdBd82Bedd396BGetManyResponseForeignModel
		id?: string
		sheet_id?: string
		move_id?: string
		name?: string
		score?: number
		display_order?: number
	}
export type AvailableBonuses578C4C347C4145Cc9B02C4985E4EabffFindManyResponseListModel =

		| AvailableBonusesb3667Dca77B347B4A6Cf42B566326Ea3FindManyResponseItemModelWithValidators[]

export type TableName30Aec9A658B64173A5C75A3D5768D3F6 =
	| "scoreSheet"
	| "availableMoves"
export type ScoredMovesa1Bdf93202De4De6940D32C90F324458DeleteManyResponseModelWithValidators =
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
export type ScoredMovesdf5D4F505Bcc4B408D377B5368F28E88DeleteManyResponseListModel =
	ScoredMovesa1Bdf93202De4De6940D32C90F324458DeleteManyResponseModelWithValidators[]
export type Athleteheatf1D742B3B126402C849895A62903D178UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheatf29F90A7F3D6486AAa8211C1E69A8Ad7UpsertManyResponseListModel =
	Athleteheatf1D742B3B126402C849895A62903D178UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type Athleteheatfa10E74517B74F978Dc273B98830E973CreateManyInsertItemRequestModel =
	{
		id?: string
		heat_id: string
		athlete_id: string
		phase_id: string
		last_phase_rank?: number
	}
export type Athleteheat5B4B875518B54362B57D9Ef8C28F3AddPatchOneResponseModelWithValidators =
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
export type ForeignHeat51B83Fb95040407EA2698403Abc75EaeFindManyResponseItemModelWithValidators =
	{
		id?: string
		competition_id?: string
		name?: string
	}
export type ForeignHeat38Dd7A66A7954145Aa4ED9131B0Ab842GetManyResponseForeignModel =
	ForeignHeat51B83Fb95040407EA2698403Abc75EaeFindManyResponseItemModelWithValidators[]
export type ForeignPhase891584B4218F48C5A01426Bb5D626926FindManyResponseItemModelWithValidators =
	{
		id?: string
		event_id?: string
		name?: string
		number_of_runs?: number
		number_of_runs_for_score?: number
		number_of_judges?: number
		scoresheet?: string
	}
export type ForeignPhase0C8E997575E24E14B40C459A6C461F0CGetManyResponseForeignModel =
	ForeignPhase891584B4218F48C5A01426Bb5D626926FindManyResponseItemModelWithValidators[]
export type ForeignAthletead5E1Cf1E3124E76927F3A6E558C03C9FindManyResponseItemModelWithValidators =
	{
		id?: string
		first_name?: string
		last_name?: string
		affiliation?: string
		bib?: string
	}
export type ForeignAthlete3237B750A01C4Ac286D7E46D9B499AafGetManyResponseForeignModel =
	ForeignAthletead5E1Cf1E3124E76927F3A6E558C03C9FindManyResponseItemModelWithValidators[]
export type RunStatusfcc421E40E794Fa6Bffc7Af8B804Cbc6FindManyResponseItemModelWithValidators =
	{
		heat_foreign?: ForeignHeat38Dd7A66A7954145Aa4ED9131B0Ab842GetManyResponseForeignModel
		phase_foreign?: ForeignPhase0C8E997575E24E14B40C459A6C461F0CGetManyResponseForeignModel
		athlete_foreign?: ForeignAthlete3237B750A01C4Ac286D7E46D9B499AafGetManyResponseForeignModel
		id?: string
		heat_id?: string
		run_number?: number
		phase_id?: string
		athlete_id?: string
		locked?: boolean
		did_not_start?: boolean
	}
export type RunStatus3E7Ca3FdC531463BAc490F67302968A4FindManyResponseListModel =

		| RunStatusfcc421E40E794Fa6Bffc7Af8B804Cbc6FindManyResponseItemModelWithValidators[]

export type TableName2Fa9647C953A4F359Ab100A23E0C699C =
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
