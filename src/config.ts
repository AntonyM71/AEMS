
import convict from "convict";
import json5 from "json5";

// Use this only if you have a .json configuration file in JSON5 format
// (i.e. with comments, etc.).
convict.addParser({ extension: "json", parse: json5.parse })


// Define a schema

const conf = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "staging", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  apiBaseURL: {
    doc: "The base URL for the API",
    default: "https://aems.eu.ngrok.io/v5/"
  }
});


conf.validate();

export default conf;
