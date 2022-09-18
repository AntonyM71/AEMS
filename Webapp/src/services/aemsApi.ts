import { emptySplitApi as api } from "./emptyApi"
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getManyParentGet: build.query<
			GetManyParentGetApiResponse,
			GetManyParentGetApiArg
		>({
			query: (queryArg) => ({
				url: `/parent`,
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
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
		entireUpdateManyByQueryParentPut: build.mutation<
			EntireUpdateManyByQueryParentPutApiResponse,
			EntireUpdateManyByQueryParentPutApiArg
		>({
			query: (queryArg) => ({
				url: `/parent`,
				method: "PUT",
				body: queryArg.body,
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
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
		insertManyParentPost: build.mutation<
			InsertManyParentPostApiResponse,
			InsertManyParentPostApiArg
		>({
			query: (queryArg) => ({
				url: `/parent`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryParentDelete: build.mutation<
			DeleteManyByQueryParentDeleteApiResponse,
			DeleteManyByQueryParentDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/parent`,
				method: "DELETE",
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
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
		partialUpdateManyByQueryParentPatch: build.mutation<
			PartialUpdateManyByQueryParentPatchApiResponse,
			PartialUpdateManyByQueryParentPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/parent`,
				method: "PATCH",
				body: queryArg.body,
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
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
		getOneByPrimaryKeyParentIdGet: build.query<
			GetOneByPrimaryKeyParentIdGetApiResponse,
			GetOneByPrimaryKeyParentIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/parent/${queryArg.id}`,
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
		entireUpdateByPrimaryKeyParentIdPut: build.mutation<
			EntireUpdateByPrimaryKeyParentIdPutApiResponse,
			EntireUpdateByPrimaryKeyParentIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/parent/${queryArg.id}`,
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
		deleteOneByPrimaryKeyParentIdDelete: build.mutation<
			DeleteOneByPrimaryKeyParentIdDeleteApiResponse,
			DeleteOneByPrimaryKeyParentIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/parent/${queryArg.id}`,
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
		partialUpdateOneByPrimaryKeyParentIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyParentIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyParentIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/parent/${queryArg.id}`,
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
		getManyChildGet: build.query<
			GetManyChildGetApiResponse,
			GetManyChildGetApiArg
		>({
			query: (queryArg) => ({
				url: `/child`,
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList,
					limit: queryArg.limit,
					offset: queryArg.offset,
					order_by_columns: queryArg.orderByColumns,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateManyByQueryChildPut: build.mutation<
			EntireUpdateManyByQueryChildPutApiResponse,
			EntireUpdateManyByQueryChildPutApiArg
		>({
			query: (queryArg) => ({
				url: `/child`,
				method: "PUT",
				body: queryArg.body,
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList
				}
			})
		}),
		insertManyChildPost: build.mutation<
			InsertManyChildPostApiResponse,
			InsertManyChildPostApiArg
		>({
			query: (queryArg) => ({
				url: `/child`,
				method: "POST",
				body: queryArg.body
			})
		}),
		deleteManyByQueryChildDelete: build.mutation<
			DeleteManyByQueryChildDeleteApiResponse,
			DeleteManyByQueryChildDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/child`,
				method: "DELETE",
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList
				}
			})
		}),
		partialUpdateManyByQueryChildPatch: build.mutation<
			PartialUpdateManyByQueryChildPatchApiResponse,
			PartialUpdateManyByQueryChildPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/child`,
				method: "PATCH",
				body: queryArg.body,
				params: {
					id____from_____comparison_operator:
						queryArg.idFromComparisonOperator,
					id____to_____comparison_operator:
						queryArg.idToComparisonOperator,
					id____from: queryArg.idFrom,
					id____to: queryArg.idTo,
					id____list_____comparison_operator:
						queryArg.idListComparisonOperator,
					id____list: queryArg.idList,
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList
				}
			})
		}),
		getOneByPrimaryKeyChildIdGet: build.query<
			GetOneByPrimaryKeyChildIdGetApiResponse,
			GetOneByPrimaryKeyChildIdGetApiArg
		>({
			query: (queryArg) => ({
				url: `/child/${queryArg.id}`,
				params: {
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList,
					join_foreign_table: queryArg.joinForeignTable
				}
			})
		}),
		entireUpdateByPrimaryKeyChildIdPut: build.mutation<
			EntireUpdateByPrimaryKeyChildIdPutApiResponse,
			EntireUpdateByPrimaryKeyChildIdPutApiArg
		>({
			query: (queryArg) => ({
				url: `/child/${queryArg.id}`,
				method: "PUT",
				body: queryArg.body,
				params: {
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList
				}
			})
		}),
		deleteOneByPrimaryKeyChildIdDelete: build.mutation<
			DeleteOneByPrimaryKeyChildIdDeleteApiResponse,
			DeleteOneByPrimaryKeyChildIdDeleteApiArg
		>({
			query: (queryArg) => ({
				url: `/child/${queryArg.id}`,
				method: "DELETE",
				params: {
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList
				}
			})
		}),
		partialUpdateOneByPrimaryKeyChildIdPatch: build.mutation<
			PartialUpdateOneByPrimaryKeyChildIdPatchApiResponse,
			PartialUpdateOneByPrimaryKeyChildIdPatchApiArg
		>({
			query: (queryArg) => ({
				url: `/child/${queryArg.id}`,
				method: "PATCH",
				body: queryArg.body,
				params: {
					parent_id____from_____comparison_operator:
						queryArg.parentIdFromComparisonOperator,
					parent_id____to_____comparison_operator:
						queryArg.parentIdToComparisonOperator,
					parent_id____from: queryArg.parentIdFrom,
					parent_id____to: queryArg.parentIdTo,
					parent_id____list_____comparison_operator:
						queryArg.parentIdListComparisonOperator,
					parent_id____list: queryArg.parentIdList
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
export type GetManyParentGetApiResponse =
	/** status 200 Successful Response */ ParentO2O217E76Aa183A4Bb78E85450009B8A4D4FindManyResponseListModel
export type GetManyParentGetApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** test-test-test */
	idFrom?: number
	/** test-test-test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** test-test-test */
	idList?: number[]
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
	joinForeignTable?: TableNameb7A8Da9EAb4144979140D6796Cf2Be90[]
}
export type EntireUpdateManyByQueryParentPutApiResponse =
	/** status 200 Successful Response */ ParentO2O8F3Dde5952794Af3B72F2574B7432E82UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryParentPutApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** test-test-test */
	idFrom?: number
	/** test-test-test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** test-test-test */
	idList?: number[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type InsertManyParentPostApiResponse =
	/** status 201 Successful Response */ ParentO2Oaf3B151D772B40059Fd1F1D5Ce9D2784UpsertManyResponseListModel
export type InsertManyParentPostApiArg = {
	body: ParentO2O902Dcd2FAeaf48E8B2Cb05200Fc11171CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryParentDeleteApiResponse =
	/** status 200 Successful Response */ ParentO2O8E28Ca6971B94C1CA539A6F17148D366DeleteManyResponseListModel
export type DeleteManyByQueryParentDeleteApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** test-test-test */
	idFrom?: number
	/** test-test-test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** test-test-test */
	idList?: number[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateManyByQueryParentPatchApiResponse =
	/** status 200 Successful Response */ ParentO2Ob36Da5B3Db9543E788E3Fb62Ab467D05PatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryParentPatchApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** test-test-test */
	idFrom?: number
	/** test-test-test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** test-test-test */
	idList?: number[]
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetOneByPrimaryKeyParentIdGetApiResponse =
	/** status 200 Successful Response */ ParentO2O66E58464Dfba4F679D8744Bd761Be1F6FindOneResponseListModel
export type GetOneByPrimaryKeyParentIdGetApiArg = {
	id: number
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	joinForeignTable?: TableName6A5E63CdC6Ce4D1D8Dbf1Fab622A8502[]
}
export type EntireUpdateByPrimaryKeyParentIdPutApiResponse =
	/** status 200 Successful Response */ ParentO2O9Ce1C6D22A4B4D959Abb07C10B578C61UpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyParentIdPutApiArg = {
	id: number
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type DeleteOneByPrimaryKeyParentIdDeleteApiResponse =
	/** status 200 Successful Response */ ParentO2Ob990E5C2Ab0645Bd97Bb1Bc637BadeccDeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyParentIdDeleteApiArg = {
	id: number
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
}
export type PartialUpdateOneByPrimaryKeyParentIdPatchApiResponse =
	/** status 200 Successful Response */ ParentO2O98E28Afd954341E1B6Cc2F3A8Cc9F317PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyParentIdPatchApiArg = {
	id: number
	nameStrMatchingPattern?: PgsqlMatchingPatternInString[]
	nameStr?: string[]
	nameListComparisonOperator?: ItemComparisonOperators
	nameList?: string[]
	body: string
}
export type GetManyChildGetApiResponse =
	/** status 200 Successful Response */ ChildO2O7B14Cd9045B44F68Aae8E58817A83425FindManyResponseListModel
export type GetManyChildGetApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** child_pk_test */
	idFrom?: number
	/** child_pk_test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** child_pk_test */
	idList?: number[]
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
	limit?: number
	offset?: number
	/** <br> support column:
                <br> ['id', 'parent_id'] <hr><br> support ordering:
                <br> ['DESC', 'ASC']
                <hr>
                <br />example:
                <br />&emsp;&emsp;any name of column:ASC
                <br />&emsp;&emsp;any name of column: DESC
                <br />&emsp;&emsp;any name of column    :    DESC
                <br />&emsp;&emsp;any name of column (default sort by ASC) */
	orderByColumns?: string[]
	joinForeignTable?: TableName17890B2C07004C61Af6E2Edcae32B37C[]
}
export type EntireUpdateManyByQueryChildPutApiResponse =
	/** status 200 Successful Response */ ChildO2O98F0Df6BD5Ef42FcAf9E4547Ebc15D05UpdateManyResponseListModelWithValidators
export type EntireUpdateManyByQueryChildPutApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** child_pk_test */
	idFrom?: number
	/** child_pk_test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** child_pk_test */
	idList?: number[]
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
	body: number
}
export type InsertManyChildPostApiResponse =
	/** status 201 Successful Response */ ChildO2Of4BabbbcA05445258E64Da257C7A8A28UpsertManyResponseListModel
export type InsertManyChildPostApiArg = {
	body: ChildO2Obbabe437Ba6C453F9Aa686261A814613CreateManyInsertItemRequestModel[]
}
export type DeleteManyByQueryChildDeleteApiResponse =
	/** status 200 Successful Response */ ChildO2Oc505Ce9F41Cb42A985472A1361307EebDeleteManyResponseListModel
export type DeleteManyByQueryChildDeleteApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** child_pk_test */
	idFrom?: number
	/** child_pk_test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** child_pk_test */
	idList?: number[]
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
}
export type PartialUpdateManyByQueryChildPatchApiResponse =
	/** status 200 Successful Response */ ChildO2O5F4898A55B534823B1F0F42C75C0578FPatchManyResponseListModelWithValidators
export type PartialUpdateManyByQueryChildPatchApiArg = {
	idFromComparisonOperator?: RangeFromComparisonOperators
	idToComparisonOperator?: RangeToComparisonOperators
	/** child_pk_test */
	idFrom?: number
	/** child_pk_test */
	idTo?: number
	idListComparisonOperator?: ItemComparisonOperators
	/** child_pk_test */
	idList?: number[]
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
	body: number
}
export type GetOneByPrimaryKeyChildIdGetApiResponse =
	/** status 200 Successful Response */ ChildO2O52D04945D5Bc43859A92E447A3Beb551FindOneResponseListModel
export type GetOneByPrimaryKeyChildIdGetApiArg = {
	id: number
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
	joinForeignTable?: TableNamede2E6Be3Fdb2428A8Ab1Dde9293504F7[]
}
export type EntireUpdateByPrimaryKeyChildIdPutApiResponse =
	/** status 200 Successful Response */ ChildO2O0493D68152B548A19E2A9386180428FeUpdateOneResponseModelWithValidators
export type EntireUpdateByPrimaryKeyChildIdPutApiArg = {
	id: number
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
	body: number
}
export type DeleteOneByPrimaryKeyChildIdDeleteApiResponse =
	/** status 200 Successful Response */ ChildO2O9B70892090Aa494BAfc7F03C5Ad3C706DeleteOneResponseModelWithValidators
export type DeleteOneByPrimaryKeyChildIdDeleteApiArg = {
	id: number
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
}
export type PartialUpdateOneByPrimaryKeyChildIdPatchApiResponse =
	/** status 200 Successful Response */ ChildO2Oecf2F8E9Eae645C4A3281A7Db3E1Fde7PatchOneResponseModelWithValidators
export type PartialUpdateOneByPrimaryKeyChildIdPatchApiArg = {
	id: number
	parentIdFromComparisonOperator?: RangeFromComparisonOperators
	parentIdToComparisonOperator?: RangeToComparisonOperators
	parentIdFrom?: number
	parentIdTo?: number
	parentIdListComparisonOperator?: ItemComparisonOperators
	parentIdList?: number[]
	body: number
}
export type RootGetApiResponse = /** status 200 Successful Response */ any
export type RootGetApiArg = void
export type ForeignChildO2Oa723F240A4Fc4022B638Cf267Fff2A07FindManyResponseItemModelWithValidators =
	{
		id?: number
		parent_id?: number
	}
export type ForeignChildO2O8871B402Caf047B09Fb93Ff45F7192F6GetManyResponseForeignModel =
	ForeignChildO2Oa723F240A4Fc4022B638Cf267Fff2A07FindManyResponseItemModelWithValidators[]
export type ParentO2Ob322135D74B04A0382F672F3A6096D00FindManyResponseItemModelWithValidators =
	{
		child_o2o_foreign?: ForeignChildO2O8871B402Caf047B09Fb93Ff45F7192F6GetManyResponseForeignModel
		id?: number
		name?: string
	}
export type ParentO2O217E76Aa183A4Bb78E85450009B8A4D4FindManyResponseListModel =

		| ParentO2Ob322135D74B04A0382F672F3A6096D00FindManyResponseItemModelWithValidators[]
		| any
export type ValidationError = {
	loc: string[]
	msg: string
	type: string
}
export type HttpValidationError = {
	detail?: ValidationError[]
}
export type RangeFromComparisonOperators =
	| "Greater_than"
	| "Greater_than_or_equal_to"
export type RangeToComparisonOperators = "Less_than" | "Less_than_or_equal_to"
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
export type TableNameb7A8Da9EAb4144979140D6796Cf2Be90 = "child_o2o"
export type ParentO2Ob0B7A80A04714DcdAdc17C98B0931C01UpdateManyResponseModelWithValidators =
	{
		id: number
		name?: string
	}
export type ParentO2O8F3Dde5952794Af3B72F2574B7432E82UpdateManyResponseListModelWithValidators =
	ParentO2Ob0B7A80A04714DcdAdc17C98B0931C01UpdateManyResponseModelWithValidators[]
export type ParentO2Oe8332376Aedc40A88E92B7C0Cd2D6247UpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: number
		name?: string
	}
export type ParentO2Oaf3B151D772B40059Fd1F1D5Ce9D2784UpsertManyResponseListModel =
	ParentO2Oe8332376Aedc40A88E92B7C0Cd2D6247UpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ParentO2O902Dcd2FAeaf48E8B2Cb05200Fc11171CreateManyInsertItemRequestModel =
	{
		id: number
		name?: string
	}
export type ParentO2O5Cca75Fe895141AcAb170416B3Fb85E0DeleteManyResponseModelWithValidators =
	{
		id: number
		name?: string
	}
export type ParentO2O8E28Ca6971B94C1CA539A6F17148D366DeleteManyResponseListModel =
	ParentO2O5Cca75Fe895141AcAb170416B3Fb85E0DeleteManyResponseModelWithValidators[]
export type ParentO2O28Db421F82Ba42D49971D2E4F6A51B05PatchManyResponseModelWithValidators =
	{
		id: number
		name?: string
	}
export type ParentO2Ob36Da5B3Db9543E788E3Fb62Ab467D05PatchManyResponseListModelWithValidators =
	ParentO2O28Db421F82Ba42D49971D2E4F6A51B05PatchManyResponseModelWithValidators[]
export type ParentO2O8C4643B616484F00B45B998F6Ee05004FindOneResponseModelWithValidators =
	{
		child_o2o_foreign?: ForeignChildO2O8871B402Caf047B09Fb93Ff45F7192F6GetManyResponseForeignModel
		id: number
		name?: string
	}
export type ParentO2O66E58464Dfba4F679D8744Bd761Be1F6FindOneResponseListModel =
	ParentO2O8C4643B616484F00B45B998F6Ee05004FindOneResponseModelWithValidators
export type TableName6A5E63CdC6Ce4D1D8Dbf1Fab622A8502 = "child_o2o"
export type ParentO2O9Ce1C6D22A4B4D959Abb07C10B578C61UpdateOneResponseModelWithValidators =
	{
		id: number
		name?: string
	}
export type ParentO2Ob990E5C2Ab0645Bd97Bb1Bc637BadeccDeleteOneResponseModelWithValidators =
	{
		id: number
		name?: string
	}
export type ParentO2O98E28Afd954341E1B6Cc2F3A8Cc9F317PatchOneResponseModelWithValidators =
	{
		id: number
		name?: string
	}
export type ForeignParentO2O8E75F207Cdc24C908DcdE520944Df82EFindManyResponseItemModelWithValidators =
	{
		id?: number
		name?: string
	}
export type ForeignParentO2O28482108B2854F809B6707D97D74Fc84GetManyResponseForeignModel =
	ForeignParentO2O8E75F207Cdc24C908DcdE520944Df82EFindManyResponseItemModelWithValidators[]
export type ChildO2Oc8294B39B7934D21Bd71C04774A03D0BFindManyResponseItemModelWithValidators =
	{
		parent_o2o_foreign?: ForeignParentO2O28482108B2854F809B6707D97D74Fc84GetManyResponseForeignModel
		id?: number
		parent_id?: number
	}
export type ChildO2O7B14Cd9045B44F68Aae8E58817A83425FindManyResponseListModel =
	| ChildO2Oc8294B39B7934D21Bd71C04774A03D0BFindManyResponseItemModelWithValidators[]
	| any
export type TableName17890B2C07004C61Af6E2Edcae32B37C = "parent_o2o"
export type ChildO2Obcda6045A44B430DBe36A096737Ee549UpdateManyResponseModelWithValidators =
	{
		id: number
		parent_id?: number
	}
export type ChildO2O98F0Df6BD5Ef42FcAf9E4547Ebc15D05UpdateManyResponseListModelWithValidators =
	ChildO2Obcda6045A44B430DBe36A096737Ee549UpdateManyResponseModelWithValidators[]
export type ChildO2O6047Af574C8A4C0AA35E5Ee8566241AfUpsertManyResponseItemModelRequireButDefaultWithValidators =
	{
		id: number
		parent_id?: number
	}
export type ChildO2Of4BabbbcA05445258E64Da257C7A8A28UpsertManyResponseListModel =
	ChildO2O6047Af574C8A4C0AA35E5Ee8566241AfUpsertManyResponseItemModelRequireButDefaultWithValidators[]
export type ChildO2Obbabe437Ba6C453F9Aa686261A814613CreateManyInsertItemRequestModel =
	{
		id: number
		parent_id?: number
	}
export type ChildO2Oc038B710862441F7Ba988F0814192D35DeleteManyResponseModelWithValidators =
	{
		id: number
		parent_id?: number
	}
export type ChildO2Oc505Ce9F41Cb42A985472A1361307EebDeleteManyResponseListModel =
	ChildO2Oc038B710862441F7Ba988F0814192D35DeleteManyResponseModelWithValidators[]
export type ChildO2O15F01D2E15Ea4D6F93A7Dc7A2B9D2E1DPatchManyResponseModelWithValidators =
	{
		id: number
		parent_id?: number
	}
export type ChildO2O5F4898A55B534823B1F0F42C75C0578FPatchManyResponseListModelWithValidators =
	ChildO2O15F01D2E15Ea4D6F93A7Dc7A2B9D2E1DPatchManyResponseModelWithValidators[]
export type ChildO2O8C944F0735D94Aa7B17F4Df90E0C90D5FindOneResponseModelWithValidators =
	{
		parent_o2o_foreign?: ForeignParentO2O28482108B2854F809B6707D97D74Fc84GetManyResponseForeignModel
		id: number
		parent_id?: number
	}
export type ChildO2O52D04945D5Bc43859A92E447A3Beb551FindOneResponseListModel =
	ChildO2O8C944F0735D94Aa7B17F4Df90E0C90D5FindOneResponseModelWithValidators
export type TableNamede2E6Be3Fdb2428A8Ab1Dde9293504F7 = "parent_o2o"
export type ChildO2O0493D68152B548A19E2A9386180428FeUpdateOneResponseModelWithValidators =
	{
		id: number
		parent_id?: number
	}
export type ChildO2O9B70892090Aa494BAfc7F03C5Ad3C706DeleteOneResponseModelWithValidators =
	{
		id: number
		parent_id?: number
	}
export type ChildO2Oecf2F8E9Eae645C4A3281A7Db3E1Fde7PatchOneResponseModelWithValidators =
	{
		id: number
		parent_id?: number
	}
export const {
	useGetManyParentGetQuery,
	useEntireUpdateManyByQueryParentPutMutation,
	useInsertManyParentPostMutation,
	useDeleteManyByQueryParentDeleteMutation,
	usePartialUpdateManyByQueryParentPatchMutation,
	useGetOneByPrimaryKeyParentIdGetQuery,
	useEntireUpdateByPrimaryKeyParentIdPutMutation,
	useDeleteOneByPrimaryKeyParentIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyParentIdPatchMutation,
	useGetManyChildGetQuery,
	useEntireUpdateManyByQueryChildPutMutation,
	useInsertManyChildPostMutation,
	useDeleteManyByQueryChildDeleteMutation,
	usePartialUpdateManyByQueryChildPatchMutation,
	useGetOneByPrimaryKeyChildIdGetQuery,
	useEntireUpdateByPrimaryKeyChildIdPutMutation,
	useDeleteOneByPrimaryKeyChildIdDeleteMutation,
	usePartialUpdateOneByPrimaryKeyChildIdPatchMutation,
	useRootGetQuery
} = injectedRtkApi
