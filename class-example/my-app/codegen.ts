import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://main-example.codebootcamp.co.kr/graphql", // 해당 end-point 작성
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/commons/graphql/": { // 해당 폴더 경로 설정
      preset: "client",
    },
  },
};
export default config;
