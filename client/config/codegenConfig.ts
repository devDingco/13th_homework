/** @format */

import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.NEXT_PUBLIC_BACK_GRAPHQL_URL,
	generates: {
		'./src/types.ts': {
			plugins: ['typescript'],
		},
		'./src/': {
			documents: ['src/graphql/queries/*.graphql', 'src/graphql/mutations/*.graphql'],
			preset: 'near-operation-file',
			presetConfig: {
				extension: '.generated.ts',
				baseTypesPath: 'types.ts',
			},
			plugins: ['typescript-operations', 'typescript-react-apollo'],
			config: {
				withHooks: true,
			},
		},
	},
};

export default config;
