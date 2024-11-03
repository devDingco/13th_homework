/** @format */

import { EProtocol, ProtocolOptions } from '../models/protocol.type';

import commonGet from '@/apis/commonGet';
import { useGetBoardsQuery } from '@/graphql/queries/getBoards/getBoards.generated';

export default async function determineProtocolGetBoards(options: ProtocolOptions) {
	if (options.protocol === EProtocol.REST) {
		const { endpoint } = options;

		return await commonGet(endpoint);
	} else if (options.protocol === EProtocol.GRAPHQL) {
		const { variables } = options;
		// tlqkf 끝까지 custom hook ㅈ같이 하네

		const { data } = useGetBoardsQuery({
			variables,
		});
		return data?.getBoards;
	}
}
