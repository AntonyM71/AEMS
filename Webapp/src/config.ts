
import convict from "convict";

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
