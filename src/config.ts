
import convict from "convict";

// Define a schema

const conf = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "staging", "test"],
    default: "development",
    env: "NODE_ENV"
  }
});

conf.validate();

export default conf;
