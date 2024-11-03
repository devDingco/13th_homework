"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
//# sourceMappingURL=codegen.config.js.map