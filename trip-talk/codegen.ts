import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://main-practice.codebootcamp.co.kr/graphql', // 해당 end-point 작성
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/app/_commons/graphql/': {
      preset: 'client',
    },
  },
};
export default config;
