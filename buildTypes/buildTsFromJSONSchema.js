// Generare typescript definitions from all files in the jsonschemas folder.
// run from AEMS Client Directory (where you run `npm start` from), using `node buildTypes/buildTsFromJSONSchema.js`
import fs from "fs"
import { compileFromFile } from 'json-schema-to-typescript'

const files = fs.readdirSync("./src/components/formSpecs/jsonschemas")

console.log("Building Schemas for " + files)
files.map((file) => {

  const fileStub = file.split(".")[0]
compileFromFile('./src/components/formSpecs/jsonschemas/' + file)
  .then(ts => {
    fs.writeFileSync(`./src/components/formSpecs/typescript/${fileStub}.d.ts`, ts)
  })

})
console.log("Successfully built schemas for " + files)