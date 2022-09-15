import type { ConfigFile } from "@rtk-query/codegen-openapi"

const config: ConfigFile = {
	schemaFile: "https://petstore3.swagger.io/api/v3/openapi.json",
	apiFile: "./emptyApi.ts",
	apiImport: "emptySplitApi",
	outputFile: "./src/services/petApi.ts",
	exportName: "petApi",
	hooks: true
}

export default config
