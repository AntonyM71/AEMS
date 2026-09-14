/** Config for @rtk-query/codegen-openapi. Consumed by buildApi.sh. */
module.exports = {
	schemaFile: "../../../../Common/openapi.json",
	apiFile: "./emptyApi.ts",
	apiImport: "emptySplitApi",
	outputFile: "./aemsApi.ts",
	exportName: "aemsApi",
	hooks: true,
	unionUndefined: false,
	// The multipart upload endpoint can't be modelled by the codegen: it emits
	// `file: string` with a plain-object body and no FormData, so the generated
	// hook is unusable. UploadCsv.tsx posts to it with raw axios instead.
	filterEndpoints: (name) => name !== "uploadCompetitionManagementUploadPost",
}
