import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://main-practice.codebootcamp.co.kr/graphql",
  documents: ["src/**/*.tsx", "src/queries/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};
export default config;
