/** @format */

import { EProtocol, GraphQLOptions, ProtocolOptions, RestOptions } from '@/models/protocol.type';

interface GraphQLResult<T> {
	data: T;
	loading: boolean;
	error: boolean;
}

type RestApiCall<T> = (url: string) => Promise<T>;
type GraphQLApiCall<T> = (variables?: Record<string, any>) => GraphQLResult<T>;

export function useDetermineProtocol<T>(
	options: ProtocolOptions,
	apiCall: RestApiCall<T> | GraphQLApiCall<T>,
): Promise<T> | GraphQLResult<T> {
	if (options.protocol === EProtocol.REST) {
		const restOptions = options as RestOptions;
		return (apiCall as RestApiCall<T>)(restOptions.endpoint);
	}
	//  else if (options.protocol === EProtocol.GRAPHQL) {
	// 	// GraphQL 프로토콜 처리
	// 	const { variables } = options as GraphQLOptions<T>;
	// 	return (apiCall as GraphQLApiCall<T>)(variables);
	// }

	throw new Error('올바르지 않은 프로토콜입니다.');
}
