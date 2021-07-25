
export const devSchema: any= {
  title: "Example JsonSchema Form",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false }
  }
};

// this isn't as nice as I'd like, I'm working on it.
export const extendedDevSchema: any = {
  ...devSchema,
  properties: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...devSchema.properties,
    bar: { type: "integer" },
    baz: { type: "boolean" }
  },
  title: "extended schema example"
}


// I'm hoping that once json-schema-to-typescript supports jsonSchemaV7,
// we might be able to ditch AJV, and automatically generate this type in a .d.ts file
export interface DevType {
  title: string;
  done: boolean;
}
