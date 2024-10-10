/** @format */

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://172.16.2.165:8080/graphql',
	documents: ['src/graphql/queries/*.graphql', 'src/graphql/mutations/*.graphql'],
	generates: {
		'./src/graphql/generated/': {
			preset: 'client-preset',
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				withHooks: true,
				withComponent: false,
				withHOC: false,
			},
		},
	},
};

export default config;
