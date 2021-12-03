
import fs from "fs"
import { compileFromFile } from 'json-schema-to-typescript'
// compile from file
compileFromFile('../src/components/formSpecs/jsonschemas/test.json')
  .then(ts => fs.writeFileSync('../src/components/formSpecs/typescript/test.d.ts', ts))

