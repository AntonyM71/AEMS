
export const devSchema: any= {
  title: "Example JsonSchema Form",
  type: "object",
  required: ["title"],
  properties: {
    title: { type: "string", title: "Title", default: "A new task" },
    done: { type: "boolean", title: "Done?", default: false }
  }
};

// I'm hoping that once json-schema-to-typescript supports jsonSchemaV7,
// we might be able to ditch AJV, and automatically generate this type in a .d.ts file
export interface DevType {
  title: string;
  done: boolean;
}
