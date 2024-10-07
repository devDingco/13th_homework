/** @format */

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:8080/graphql',
	documents: 'src/graphql/**/*.graphql',
	generates: {
		'src/graphql/generated/graphql.ts': {
			plugins: ['typescript', 'typescript-operations'],
			config: {
				withHooks: true,
				withComponent: false,
				withHOC: false,
			},
		},
	},
};

export default config;
