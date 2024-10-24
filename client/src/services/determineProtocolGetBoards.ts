/** @format */

import { EProtocol, ProtocolOptions } from './type';

import commonGet from '@/apis/commonGet';
import { useGetBoardsQuery } from '@/graphql/queries/getBoards/getBoards.generated';

export default async function determineProtocolGetBoards(options: ProtocolOptions) {
	if (options.protocol === EProtocol.REST) {
		const { endpoint } = options;

		return await commonGet(endpoint);
	} else if (options.protocol === EProtocol.GRAPHQL) {
		const { variables } = options;
		const { data } = useGetBoardsQuery({
			variables,
		});
		return data?.getBoards;
	}
}
