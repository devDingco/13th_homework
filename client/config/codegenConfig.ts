/** @format */
import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.NEXT_PUBLIC_BACK_GRAPHQL_URL,
	generates: {
		'./src/graphql/types.ts': {
			plugins: ['typescript'],
			config: {
				scalars: {
					DateTime: 'Date',
				},
			},
		},
		'./src/graphql/': {
			documents: ['src/graphql/queries/**/*.graphql', 'src/graphql/mutations/**/*.graphql'],
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
				strictScalars: true,
				scalars: {
					DateTime: 'Date',
				},
			},
		},
		'./src/graphql/zodSchema.ts': {
			plugins: ['typescript-validation-schema'],
			config: {
				schema: 'zod',
				importFrom: './types',
			},
		},
	},
};

export default config;
