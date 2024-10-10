import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://main-practice.codebootcamp.co.kr/graphql',
  documents: ['src/**/*.graphql', 'src/**/*.tsx', 'src/**/*.ts'],
  overwrite: true,
  generates: {
    './src/commons/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
  },
};

export default config;
