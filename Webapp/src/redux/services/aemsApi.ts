import { emptySplitApi as api } from "./emptyApi"
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		promotePhaseCompetitionManagementPromotePhasePost: build.mutation<
			PromotePhaseCompetitionManagementPromotePhasePostApiResponse,
			PromotePhaseCompetitionManagementPromotePhasePostApiArg
		>({
			query: (queryArg) => ({
				url: `/competition_management/promote_phase`,
				method: "POST",
				body: queryArg.bodyPromotePhaseCompetitionManagementPromotePhasePost
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
				url: `/competition/`,
				params: {
					id____list: queryArg.idList,
					name____str: queryArg.nameStr,
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
				url: `/competition/`,
				method: "POST",
				body: queryArg.competitions
			})
		}),
		partialUpdateOneByPrimaryKeyCompetitionIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/competition/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.competitionUpdate,
				params: {
					name____str: queryArg.nameStr,
					name____list: queryArg.nameList
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
					id____list: queryArg.idList,
					name____str: queryArg.nameStr,
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
				url: `/event/`,
				params: {
					id____list: queryArg.idList,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					name____list: queryArg.nameList,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____str: queryArg.nameStr,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
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
				url: `/event/`,
				method: "POST",
				body: queryArg.events
			})
		}),
		getOneByPrimaryKeyEventIdGet: build.query<
			GetOneByPrimaryKeyEventIdGetApiResponse,
			GetOneByPrimaryKeyEventIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/event/${queryArg.id}`,
				params: {
					competition_id____list: queryArg.competitionIdList,
					name____str: queryArg.nameStr,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		getManyWithForeignTreeEventGetManyWithForeignTreeGet: build.query<
			GetManyWithForeignTreeEventGetManyWithForeignTreeGetApiResponse,
			GetManyWithForeignTreeEventGetManyWithForeignTreeGetApiArg
		>({
			query: (queryArg) => ({
				url: `/event/get_many_with_foreign_tree/`,
				params: {
					id____list: queryArg.idList,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					competition_id____list: queryArg.competitionIdList,
					competition_id____list_____comparison_operator:
						queryArg.competitionIdListComparisonOperator,
					name____list: queryArg.nameList,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					name____str: queryArg.nameStr,
					name____str_____matching_pattern:
						queryArg.nameStrMatchingPattern,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns
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
					id____list: queryArg.idList,
					name____str: queryArg.nameStr,
					name____list: queryArg.nameList,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list: queryArg.numberOfJudgesList,
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
					event_id____list: queryArg.eventIdList,
					name____str: queryArg.nameStr,
					name____list: queryArg.nameList,
					number_of_runs____from: queryArg.numberOfRunsFrom,
					number_of_runs____to: queryArg.numberOfRunsTo,
					number_of_runs____list: queryArg.numberOfRunsList,
					number_of_runs_for_score____from:
						queryArg.numberOfRunsForScoreFrom,
					number_of_runs_for_score____to:
						queryArg.numberOfRunsForScoreTo,
					number_of_runs_for_score____list:
						queryArg.numberOfRunsForScoreList,
					number_of_judges____from: queryArg.numberOfJudgesFrom,
					number_of_judges____to: queryArg.numberOfJudgesTo,
					number_of_judges____list: queryArg.numberOfJudgesList,
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
				body: queryArg.phaseUpdate
			})
		}),
		insertManyPhasePost: build.mutation<
			InsertManyPhasePostApiResponse,
			InsertManyPhasePostApiArg
		>({
			query: (queryArg) => ({
				url: `/phase/`,
				method: "POST",
				body: queryArg.phases
			})
		}),
		getManyHeatGet: build.query<
			GetManyHeatGetApiResponse,
			GetManyHeatGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/`,
				params: {
					id____list: queryArg.idList,
					competition_id____list: queryArg.competitionIdList,
					name____str: queryArg.nameStr,
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
				url: `/heat/`,
				method: "POST",
				body: queryArg.heats
			})
		}),
		getOneByPrimaryKeyHeatIdGet: build.query<
			GetOneByPrimaryKeyHeatIdGetApiResponse,
			GetOneByPrimaryKeyHeatIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/heat/${queryArg.id}`,
				params: {
					competition_id____list: queryArg.competitionIdList,
					name____str: queryArg.nameStr,
					name____list: queryArg.nameList,
					join_foreign_table: queryArg.joinForeignTable
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
				body: queryArg.heatUpdate
			})
		}),
		insertManyAthletePost: build.mutation<
			InsertManyAthletePostApiResponse,
			InsertManyAthletePostApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete/`,
				method: "POST",
				body: queryArg.athletes
			})
		}),
		partialUpdateOneByPrimaryKeyAthleteIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyAthleteIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/athlete/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.athleteUpdate,
				params: {
					first_name____str: queryArg.firstNameStr,
					first_name____list: queryArg.firstNameList,
					last_name____str: queryArg.lastNameStr,
					last_name____list: queryArg.lastNameList,
					affiliation____str: queryArg.affiliationStr,
					affiliation____list: queryArg.affiliationList,
					bib____str: queryArg.bibStr,
					bib____list: queryArg.bibList
				}
			})
		}),
		getManyScoresheetGet: build.query<
			GetManyScoresheetGetApiResponse,
			GetManyScoresheetGetApiArg
		>({
			query: (queryArg) => ({
				url: `/scoresheet/`,
				params: {
					id____list: queryArg.idList,
					name____str: queryArg.nameStr,
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
				url: `/scoresheet/`,
				method: "POST",
				body: queryArg.scoresheets
			})
		}),
		getManyAvailablemovesGet: build.query<
			GetManyAvailablemovesGetApiResponse,
			GetManyAvailablemovesGetApiArg
		>({
			query: (queryArg) => ({
				url: `/availablemoves/`,
				params: {
					id____list: queryArg.idList,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					name____str: queryArg.nameStr,
					name____str_____comparison_operator:
						queryArg.nameStrComparisonOperator,
					name____list: queryArg.nameList,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					fl_score____from: queryArg.flScoreFrom,
					fl_score____to: queryArg.flScoreTo,
					fl_score____list: queryArg.flScoreList,
					fl_score____list_____comparison_operator:
						queryArg.flScoreListComparisonOperator,
					rb_score____from: queryArg.rbScoreFrom,
					rb_score____to: queryArg.rbScoreTo,
					rb_score____list: queryArg.rbScoreList,
					rb_score____list_____comparison_operator:
						queryArg.rbScoreListComparisonOperator,
					display_order____from: queryArg.displayOrderFrom,
					display_order____to: queryArg.displayOrderTo,
					display_order____list: queryArg.displayOrderList,
					display_order____list_____comparison_operator:
						queryArg.displayOrderListComparisonOperator,
					direction____str: queryArg.directionStr,
					direction____str_____comparison_operator:
						queryArg.directionStrComparisonOperator,
					direction____list: queryArg.directionList,
					direction____list_____comparison_operator:
						queryArg.directionListComparisonOperator,
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
				url: `/availablebonuses/`,
				params: {
					id____list: queryArg.idList,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					sheet_id____list: queryArg.sheetIdList,
					sheet_id____list_____comparison_operator:
						queryArg.sheetIdListComparisonOperator,
					move_id____list: queryArg.moveIdList,
					move_id____list_____comparison_operator:
						queryArg.moveIdListComparisonOperator,
					name____str: queryArg.nameStr,
					name____str_____comparison_operator:
						queryArg.nameStrComparisonOperator,
					name____list: queryArg.nameList,
					name____list_____comparison_operator:
						queryArg.nameListComparisonOperator,
					score____from: queryArg.scoreFrom,
					score____to: queryArg.scoreTo,
					score____list: queryArg.scoreList,
					score____list_____comparison_operator:
						queryArg.scoreListComparisonOperator,
					display_order____from: queryArg.displayOrderFrom,
					display_order____to: queryArg.displayOrderTo,
					display_order____list: queryArg.displayOrderList,
					display_order____list_____comparison_operator:
						queryArg.displayOrderListComparisonOperator,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns
				}
			})
		}),
		deleteManyScoredmovesDelete: build.mutation<
			DeleteManyScoredmovesDeleteApiResponse,
			DeleteManyScoredmovesDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/scoredmoves/`,
				method: "DELETE",
				params: {
					heat_id____list: queryArg.heatIdList,
					athlete_id____list: queryArg.athleteIdList
				}
			})
		}),
		insertManyAthleteheatPost: build.mutation<
			InsertManyAthleteheatPostApiResponse,
			InsertManyAthleteheatPostApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat/`,
				method: "POST",
				body: queryArg.athleteHeats
			})
		}),
		partialUpdateOneByPrimaryKeyAthleteheatIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/athleteheat/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.athleteHeatUpdate,
				params: {
					athlete_id____list: queryArg.athleteIdList,
					heat_id____list: queryArg.heatIdList,
					phase_id____list: queryArg.phaseIdList
				}
			})
		}),
		getManyRunStatusGet: build.query<
			GetManyRunStatusGetApiResponse,
			GetManyRunStatusGetApiArg
		>({
			query: (queryArg) => ({
				url: `/run_status/`,
				params: {
					id____list: queryArg.idList,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					heat_id____list: queryArg.heatIdList,
					heat_id____list_____comparison_operator:
						queryArg.heatIdListComparisonOperator,
					run_number____from: queryArg.runNumberFrom,
					run_number____to: queryArg.runNumberTo,
					run_number____list: queryArg.runNumberList,
					run_number____list_____comparison_operator:
						queryArg.runNumberListComparisonOperator,
					phase_id____list: queryArg.phaseIdList,
					phase_id____list_____comparison_operator:
						queryArg.phaseIdListComparisonOperator,
					athlete_id____list: queryArg.athleteIdList,
					athlete_id____list_____comparison_operator:
						queryArg.athleteIdListComparisonOperator,
					locked____list: queryArg.lockedList,
					locked____list_____comparison_operator:
						queryArg.lockedListComparisonOperator,
					did_not_start____list: queryArg.didNotStartList,
					did_not_start____list_____comparison_operator:
						queryArg.didNotStartListComparisonOperator,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns
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
export type PromotePhaseCompetitionManagementPromotePhasePostApiResponse =
	/** status 200 Successful Response */ any
export type PromotePhaseCompetitionManagementPromotePhasePostApiArg = {
	bodyPromotePhaseCompetitionManagementPromotePhasePost: BodyPromotePhaseCompetitionManagementPromotePhasePost
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
		runNumber: number
		judgeId?: string | null
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
	/** status 200 Successful Response */ CompetitionResponse[]
export type GetManyCompetitionGetApiArg = {
	idList?: string[] | null
	nameStr?: string[] | null
	nameList?: string[] | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
	joinForeignTable?: string[] | null
}
export type InsertManyCompetitionPostApiResponse =
	/** status 201 Successful Response */ CompetitionResponse[]
export type InsertManyCompetitionPostApiArg = {
	competitions: CompetitionCreate[]
}
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiResponse =
	/** status 200 Successful Response */ CompetitionResponse
export type PartialUpdateOneByPrimaryKeyCompetitionIdPatchApiArg = {
	id: string
	nameStr?: string[] | null
	nameList?: string[] | null
	competitionUpdate: CompetitionUpdate
}
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiResponse =
	/** status 200 Successful Response */ EventResponse[]
export type GetManyByPkFromEventCompetitionCompetitionPkIdEventGetApiArg = {
	competitionPkId: string
	idList?: string[] | null
	nameStr?: string[] | null
	nameList?: string[] | null
	joinForeignTable?: string[] | null
}
export type GetManyEventGetApiResponse =
	/** status 200 Successful Response */ EventResponse[]
export type GetManyEventGetApiArg = {
	idList?: string[] | null
	idListComparisonOperator?: string | null
	competitionIdList?: string[] | null
	competitionIdListComparisonOperator?: string | null
	nameList?: string[] | null
	nameListComparisonOperator?: string | null
	nameStr?: string | null
	nameStrMatchingPattern?: string | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
	joinForeignTable?: string[] | null
}
export type InsertManyEventPostApiResponse =
	/** status 201 Successful Response */ EventResponse[]
export type InsertManyEventPostApiArg = {
	events: EventCreateRequest[]
}
export type GetOneByPrimaryKeyEventIdGetApiResponse =
	/** status 200 Successful Response */ EventResponse
export type GetOneByPrimaryKeyEventIdGetApiArg = {
	id: string
	competitionIdList?: string[] | null
	nameStr?: string | null
	nameList?: string[] | null
	joinForeignTable?: string[] | null
}
export type GetManyWithForeignTreeEventGetManyWithForeignTreeGetApiResponse =
	/** status 200 Successful Response */ EventResponse[]
export type GetManyWithForeignTreeEventGetManyWithForeignTreeGetApiArg = {
	idList?: string[] | null
	idListComparisonOperator?: string | null
	competitionIdList?: string[] | null
	competitionIdListComparisonOperator?: string | null
	nameList?: string[] | null
	nameListComparisonOperator?: string | null
	nameStr?: string | null
	nameStrMatchingPattern?: string | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
}
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiResponse =
	/** status 200 Successful Response */ PhaseResponse2[]
export type GetManyByPkFromPhaseEventEventPkIdPhaseGetApiArg = {
	eventPkId: string
	idList?: string[] | null
	nameStr?: string | null
	nameList?: string[] | null
	numberOfRunsFrom?: number | null
	numberOfRunsTo?: number | null
	numberOfRunsList?: number[] | null
	numberOfRunsForScoreFrom?: number | null
	numberOfRunsForScoreTo?: number | null
	numberOfRunsForScoreList?: number[] | null
	numberOfJudgesFrom?: number | null
	numberOfJudgesTo?: number | null
	numberOfJudgesList?: number[] | null
	scoresheetList?: string[] | null
	joinForeignTable?: string[] | null
}
export type GetOneByPrimaryKeyPhaseIdGetApiResponse =
	/** status 200 Successful Response */ PhaseResponse2
export type GetOneByPrimaryKeyPhaseIdGetApiArg = {
	id: string
	eventIdList?: string[] | null
	nameStr?: string[] | null
	nameList?: string[] | null
	numberOfRunsFrom?: number | null
	numberOfRunsTo?: number | null
	numberOfRunsList?: number[] | null
	numberOfRunsForScoreFrom?: number | null
	numberOfRunsForScoreTo?: number | null
	numberOfRunsForScoreList?: number[] | null
	numberOfJudgesFrom?: number | null
	numberOfJudgesTo?: number | null
	numberOfJudgesList?: number[] | null
	scoresheetList?: string[] | null
	joinForeignTable?: string[] | null
}
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiResponse =
	/** status 200 Successful Response */ PhaseResponse2
export type PartialUpdateOneByPrimaryKeyPhaseIdPatchApiArg = {
	id: string
	phaseUpdate: PhaseUpdate
}
export type InsertManyPhasePostApiResponse =
	/** status 201 Successful Response */ PhaseResponse2[]
export type InsertManyPhasePostApiArg = {
	phases: PhaseCreate[]
}
export type GetManyHeatGetApiResponse =
	/** status 200 Successful Response */ HeatResponse[]
export type GetManyHeatGetApiArg = {
	idList?: string[] | null
	competitionIdList?: string[] | null
	nameStr?: string[] | null
	nameList?: string[] | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
	joinForeignTable?: string[] | null
}
export type InsertManyHeatPostApiResponse =
	/** status 201 Successful Response */ HeatResponse[]
export type InsertManyHeatPostApiArg = {
	heats: HeatCreate[]
}
export type GetOneByPrimaryKeyHeatIdGetApiResponse =
	/** status 200 Successful Response */ HeatResponse
export type GetOneByPrimaryKeyHeatIdGetApiArg = {
	id: string
	competitionIdList?: string[] | null
	nameStr?: string[] | null
	nameList?: string[] | null
	joinForeignTable?: string[] | null
}
export type PartialUpdateOneByPrimaryKeyHeatIdPatchApiResponse =
	/** status 200 Successful Response */ HeatResponse
export type PartialUpdateOneByPrimaryKeyHeatIdPatchApiArg = {
	id: string
	heatUpdate: HeatUpdate
}
export type InsertManyAthletePostApiResponse =
	/** status 201 Successful Response */ AthleteResponse[]
export type InsertManyAthletePostApiArg = {
	athletes: AthleteCreate[]
}
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiResponse =
	/** status 200 Successful Response */ AthleteResponse
export type PartialUpdateOneByPrimaryKeyAthleteIdPatchApiArg = {
	id: string
	firstNameStr?: string[] | null
	firstNameList?: string[] | null
	lastNameStr?: string[] | null
	lastNameList?: string[] | null
	affiliationStr?: string[] | null
	affiliationList?: string[] | null
	bibStr?: string[] | null
	bibList?: string[] | null
	athleteUpdate: AthleteUpdate
}
export type GetManyScoresheetGetApiResponse =
	/** status 200 Successful Response */ ScoreSheetResponse[]
export type GetManyScoresheetGetApiArg = {
	idList?: string[] | null
	nameStr?: string[] | null
	nameList?: string[] | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
}
export type InsertManyScoresheetPostApiResponse =
	/** status 201 Successful Response */ ScoreSheetResponse[]
export type InsertManyScoresheetPostApiArg = {
	scoresheets: ScoreSheetCreate[]
}
export type GetManyAvailablemovesGetApiResponse =
	/** status 200 Successful Response */ AvailableMovesResponse[]
export type GetManyAvailablemovesGetApiArg = {
	idList?: string[] | null
	idListComparisonOperator?: string | null
	sheetIdList?: string[] | null
	sheetIdListComparisonOperator?: string | null
	nameStr?: string[] | null
	nameStrComparisonOperator?: string | null
	nameList?: string[] | null
	nameListComparisonOperator?: string | null
	flScoreFrom?: number | null
	flScoreTo?: number | null
	flScoreList?: number[] | null
	flScoreListComparisonOperator?: string | null
	rbScoreFrom?: number | null
	rbScoreTo?: number | null
	rbScoreList?: number[] | null
	rbScoreListComparisonOperator?: string | null
	displayOrderFrom?: number | null
	displayOrderTo?: number | null
	displayOrderList?: number[] | null
	displayOrderListComparisonOperator?: string | null
	directionStr?: string[] | null
	directionStrComparisonOperator?: string | null
	directionList?: string[] | null
	directionListComparisonOperator?: string | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
}
export type GetManyAvailablebonusesGetApiResponse =
	/** status 200 Successful Response */ AvailableBonusesResponse[]
export type GetManyAvailablebonusesGetApiArg = {
	idList?: string[] | null
	idListComparisonOperator?: string | null
	sheetIdList?: string[] | null
	sheetIdListComparisonOperator?: string | null
	moveIdList?: string[] | null
	moveIdListComparisonOperator?: string | null
	nameStr?: string[] | null
	nameStrComparisonOperator?: string | null
	nameList?: string[] | null
	nameListComparisonOperator?: string | null
	scoreFrom?: number | null
	scoreTo?: number | null
	scoreList?: number[] | null
	scoreListComparisonOperator?: string | null
	displayOrderFrom?: number | null
	displayOrderTo?: number | null
	displayOrderList?: number[] | null
	displayOrderListComparisonOperator?: string | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
}
export type DeleteManyScoredmovesDeleteApiResponse =
	/** status 200 Successful Response */ {
		[key: string]: any
	}
export type DeleteManyScoredmovesDeleteApiArg = {
	heatIdList?: string[] | null
	athleteIdList?: string[] | null
}
export type InsertManyAthleteheatPostApiResponse =
	/** status 201 Successful Response */ AthleteHeatResponse[]
export type InsertManyAthleteheatPostApiArg = {
	athleteHeats: AthleteHeatCreate[]
}
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiResponse =
	/** status 200 Successful Response */ AthleteHeatResponse
export type PartialUpdateOneByPrimaryKeyAthleteheatIdPatchApiArg = {
	id: string
	athleteIdList?: string[] | null
	heatIdList?: string[] | null
	phaseIdList?: string[] | null
	athleteHeatUpdate: AthleteHeatUpdate
}
export type GetManyRunStatusGetApiResponse =
	/** status 200 Successful Response */ RunStatusResponse[]
export type GetManyRunStatusGetApiArg = {
	idList?: string[] | null
	idListComparisonOperator?: string | null
	heatIdList?: string[] | null
	heatIdListComparisonOperator?: string | null
	runNumberFrom?: number | null
	runNumberTo?: number | null
	runNumberList?: number[] | null
	runNumberListComparisonOperator?: string | null
	phaseIdList?: string[] | null
	phaseIdListComparisonOperator?: string | null
	athleteIdList?: string[] | null
	athleteIdListComparisonOperator?: string | null
	lockedList?: boolean[] | null
	lockedListComparisonOperator?: string | null
	didNotStartList?: boolean[] | null
	didNotStartListComparisonOperator?: string | null
	limit?: number | null
	offset?: number | null
	orderByColumns?: string[] | null
}
export type RootGetApiResponse = /** status 200 Successful Response */ {
	[key: string]: string
}
export type RootGetApiArg = void
export type HealthCheckHealthGetApiResponse =
	/** status 200 Successful Response */ {
		[key: string]: any
	}
export type HealthCheckHealthGetApiArg = void
export type ValidationError = {
	loc: (string | number)[]
	msg: string
	type: string
	input?: any
	ctx?: object
}
export type HttpValidationError = {
	detail?: ValidationError[]
}
export type NewPhaseInfo = {
	new_heat_names: string[]
	phase_id: string
	new_phase_name: string
	number_of_paddlers: number
	number_of_runs?: number | null
	number_of_runs_for_score?: number | null
	number_of_judges?: number | null
}
export type BodyPromotePhaseCompetitionManagementPromotePhasePost = {
	request_body: NewPhaseInfo
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
	affiliation?: string | null
	bib: string
	last_phase_rank?: number | null
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
	ranking?: number | null
	reason?: string | null
	total_score?: number | null
	last_phase_rank?: number | null
	first_name: string
	last_name: string
	affiliation?: string | null
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
	display_order?: number | null
}
export type PydanticAvailableBonuses = {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
	display_order?: number | null
}
export type AddUpdateScoresheetRequest = {
	moves?: PydanticAvailableMoves[]
	bonuses?: PydanticAvailableBonuses[]
}
export type EventNested = {
	id: string
	competition_id: string
	name: string
}
export type CompetitionResponse = {
	id: string
	name: string
	event_foreign?: EventNested[] | null
}
export type CompetitionCreate = {
	id?: string | null
	name: string
}
export type CompetitionUpdate = {
	name?: string | null
}
export type CompetitionNested = {
	id: string
	name: string
}
export type PhaseNested = {
	id: string
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
}
export type EventResponse = {
	id: string
	competition_id: string
	name: string
	competition_foreign?: CompetitionNested[] | null
	phase_foreign?: PhaseNested[] | null
}
export type EventCreateRequest = {
	id?: string | null
	competition_id: string
	name: string
}
export type PhaseResponse2 = {
	id: string
	event_id: string
	name: string
	number_of_runs: number
	number_of_runs_for_score: number
	number_of_judges: number
	scoresheet: string
	event_foreign?: EventNested[] | null
}
export type PhaseUpdate = {
	event_id?: string | null
	name?: string | null
	number_of_runs?: number | null
	number_of_runs_for_score?: number | null
	number_of_judges?: number | null
	scoresheet?: string | null
}
export type PhaseCreate = {
	id?: string | null
	event_id: string
	name: string
	number_of_runs?: number
	number_of_runs_for_score?: number
	number_of_judges?: number
	scoresheet: string
}
export type AthleteHeatNested = {
	id: string
	athlete_id: string
	heat_id: string
}
export type HeatResponse = {
	id: string
	competition_id: string
	name: string
	competition_foreign?: CompetitionNested[] | null
	athleteheat_foreign?: AthleteHeatNested[] | null
}
export type HeatCreate = {
	id?: string | null
	competition_id: string
	name: string
}
export type HeatUpdate = {
	competition_id?: string | null
	name?: string | null
}
export type AthleteResponse = {
	id: string
	first_name: string
	last_name: string
	affiliation?: string | null
	bib: string
}
export type AthleteCreate = {
	id?: string | null
	first_name: string
	last_name: string
	affiliation?: string | null
	bib: string
}
export type AthleteUpdate = {
	first_name?: string | null
	last_name?: string | null
	affiliation?: string | null
	bib?: string | null
}
export type ScoreSheetResponse = {
	id: string
	name: string
}
export type ScoreSheetCreate = {
	id?: string | null
	name: string
}
export type AvailableMovesResponse = {
	id: string
	sheet_id: string
	name: string
	fl_score: number
	rb_score: number
	direction: string
	display_order?: number | null
}
export type AvailableBonusesResponse = {
	id: string
	sheet_id: string
	move_id: string
	name: string
	score: number
	display_order?: number | null
}
export type AthleteHeatResponse = {
	id: string
	athlete_id: string
	heat_id: string
	phase_id: string
}
export type AthleteHeatCreate = {
	id?: string | null
	athlete_id: string
	heat_id: string
	phase_id: string
	last_phase_rank?: number | null
}
export type AthleteHeatUpdate = {
	athlete_id?: string | null
	heat_id?: string | null
	phase_id?: string | null
	last_phase_rank?: number | null
}
export type RunStatusResponse = {
	id: string
	heat_id?: string | null
	run_number: number
	phase_id: string
	athlete_id: string
	locked: boolean
	did_not_start: boolean
}
export const {
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
	usePartialUpdateOneByPrimaryKeyCompetitionIdPatchMutation,
	useGetManyByPkFromEventCompetitionCompetitionPkIdEventGetQuery,
	useGetManyEventGetQuery,
	useInsertManyEventPostMutation,
	useGetOneByPrimaryKeyEventIdGetQuery,
	useGetManyWithForeignTreeEventGetManyWithForeignTreeGetQuery,
	useGetManyByPkFromPhaseEventEventPkIdPhaseGetQuery,
	useGetOneByPrimaryKeyPhaseIdGetQuery,
	usePartialUpdateOneByPrimaryKeyPhaseIdPatchMutation,
	useInsertManyPhasePostMutation,
	useGetManyHeatGetQuery,
	useInsertManyHeatPostMutation,
	useGetOneByPrimaryKeyHeatIdGetQuery,
	usePartialUpdateOneByPrimaryKeyHeatIdPatchMutation,
	useInsertManyAthletePostMutation,
	usePartialUpdateOneByPrimaryKeyAthleteIdPatchMutation,
	useGetManyScoresheetGetQuery,
	useInsertManyScoresheetPostMutation,
	useGetManyAvailablemovesGetQuery,
	useGetManyAvailablebonusesGetQuery,
	useDeleteManyScoredmovesDeleteMutation,
	useInsertManyAthleteheatPostMutation,
	usePartialUpdateOneByPrimaryKeyAthleteheatIdPatchMutation,
	useGetManyRunStatusGetQuery,
	useRootGetQuery,
	useHealthCheckHealthGetQuery
} = injectedRtkApi
