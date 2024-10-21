import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './src/graphql/schema.gql',
    documents: [
        './src/graphql/mutations/*.graphql',
        './src/graphql/queries/*.graphql',
    ],
    generates: {
        './src/generated/graphql.ts': {
            plugins: [
                'typescript', // TypeScript 타입 생성
                'typescript-operations', // 쿼리 및 뮤테이션에 대한 타입 생성
                'typescript-resolvers', // 리졸버 타입 생성
            ],
        },
    },
};

export default config;
