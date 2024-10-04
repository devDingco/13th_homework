import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://main-practice.codebootcamp.co.kr/graphql",
  documents: [
    "src/**/*.{ts,tsx}",
    "src/**/**/*.{ts,tsx}",
    "src/**/**/**/*.{ts,tsx}",
  ],
  generates: {
    "./src/commons/graphql/": {
      preset: "client",
    },
  },
};
export default config;
