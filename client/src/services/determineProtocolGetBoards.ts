/** @format */

import { EProtocol, ProtocolOptions } from './type';

import commonGet from '@/apis/commonGet';

export default async function determineProtocolGetBoards(options: ProtocolOptions) {
	if (options.protocol === EProtocol.REST) {
		const { endpoint } = options;
		console.log(endpoint);
		return await commonGet(endpoint);
	} else {
	}
}
