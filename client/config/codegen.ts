/** @format */

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: `${process.env.NEXT_PUBLIC_BACK_URL}/graphql`,
	documents: ['src/graphql/queries/*.graphql', 'src/graphql/mutations/*.graphql'],
	generates: {
		'./src/graphql/generated/': {
			preset: 'client',
			config: {
				withHooks: true,
				withComponent: false,
				withHOC: false,
			},
		},
	},
};

export default config;
