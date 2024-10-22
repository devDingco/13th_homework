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
                'typescript',
                'typescript-operations',
                'typescript-resolvers',
            ],
        },
    },
};

export default config;
