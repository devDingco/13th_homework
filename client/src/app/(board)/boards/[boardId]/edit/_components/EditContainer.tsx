/** @format */

import { IBoardReaderResource, IBoardResponse } from '@/models/boardReaderResponse';

import { IApiResponseData } from '@/models/apiResponse';
import NewForm from '../../../new/_components/NewForm';

export default function EditContainer({ resource }: IBoardReaderResource) {
	const boardInfor: IBoardResponse = resource.read();

	return (
		<>
			{boardInfor && typeof boardInfor === 'object' && (
				<NewForm boardInfor={boardInfor as IApiResponseData} />
			)}
		</>
	);
}
