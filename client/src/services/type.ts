/** @format */
export enum EProtocol {
	REST = 'rest',
	GRAPHQL = 'graphql',
}

interface RestOptions {
	protocol: EProtocol.REST;
	data: object;
	endpoint: string;
}

interface GraphQLOptions {
	protocol: EProtocol.GRAPHQL;
	variables?: object;
}

export type ProtocolOptions = RestOptions | GraphQLOptions;
