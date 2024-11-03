/** @format */

export enum EProtocol {
	REST = 'rest',
	GRAPHQL = 'graphql',
}

export interface RestOptions {
	protocol: EProtocol.REST;
	endpoint: string;
}

export interface GraphQLOptions<TVariables = Record<string, unknown>> {
	protocol: EProtocol.GRAPHQL;
	variables?: TVariables;
}

export type ProtocolOptions = RestOptions | GraphQLOptions;
