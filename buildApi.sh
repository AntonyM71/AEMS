cd Server
conda activate aems_server
python buildOpenApiJson.py
cd ../Webapp
npx @rtk-query/codegen-openapi src/redux/services/example_api.json