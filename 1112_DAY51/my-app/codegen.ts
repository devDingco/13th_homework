import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://main-practice.codebootcamp.co.kr/graphql", // api주소 여기에 설정 
  documents: ["src/**/*.tsx", "src/**/*.ts"], // 해당 경로에 ~~파일은 문서를 만들어준다.
  generates: {
    "./src/commons/graphql/": { // 생성된 파일 저장되는 위치
      preset: "client",
    },
  },
};
export default config;