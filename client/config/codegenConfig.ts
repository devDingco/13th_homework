/** @format */

import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_BACK_GRAPHQL_URL,
	documents: ['src/graphql/queries/*.graphql', 'src/graphql/mutations/*.graphql'],
	generates: {
		'./src/graphql/generated/': {
			preset: 'client',
		},
	},
};
export default config;
