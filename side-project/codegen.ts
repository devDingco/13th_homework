import type { CodegenConfig } from '@graphql-codegen/cli';

// 환경 변수 불러오기

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://main-practice.codebootcamp.co.kr/graphql',
  generates: {
    './src/graphql/types.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          DateTime: 'Date',
          Upload: 'File',
        },
      },
    },
    './src/graphql': {
      documents: ['src/graphql/mutations/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        scalars: {
          DateTime: 'Date',
          Upload: 'File',
        },
      },
    },
    './src/graphql/queries': {
      documents: ['src/graphql/queries/**/*.graphql'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        scalars: {
          DateTime: 'Date',
          Upload: 'File',
        },
      },
    },
  },
};

export default config;
