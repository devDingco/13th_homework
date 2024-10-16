import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://main-practice.codebootcamp.co.kr/graphql", // 사용하는 api 주소로 변경하기
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/commons/graphql/": {
      // 만들고 싶은 폴더 위치 정하기
      preset: "client",
    },
  },
};
export default config;
