cd Server
python -m scripts.buildOpenApiJson
cd ../Webapp
pwd
npx @rtk-query/codegen-openapi src/redux/services/example_api.json

if sed --version 2>/dev/null | grep -q GNU; then
    SED_CMD="sed -i"
else
    SED_CMD = "sed -i ''"
fi
$SED_CMD 's/| any//g' src/redux/services/aemsApi.ts

npx prettier src/redux/services/aemsApi.ts -w