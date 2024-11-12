import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://main-practice.codebootcamp.co.kr/graphql",
  documents: ["src/app/queries/*.ts"],
  generates: {
    "./src/commons/graphql/": {
      preset: "client",
    },
  },
};

export default config;
