/** @format */
// TODO 좀더 깔끔하게 리팩토링해보기

import { IBoardReaderResource, IBoardResponse } from '@/models/boardReaderResponse';

import BoardHeader from './BoardHeader';
import BoardIcon from './BoardIcon';
import BoardImages from './BoardImages';
import BoardYoutube from './BoardYoutube';

export default function BoardIdContainer({ resource }: IBoardReaderResource) {
	const boardInfor: IBoardResponse = resource.read();

	return (
		<>
			{boardInfor && typeof boardInfor === 'object' && 'boardId' in boardInfor && (
				<>
					<BoardHeader infor={boardInfor} />
					<BoardIcon address={boardInfor?.detailAddress} />
					{boardInfor.imageUrl && <BoardImages infor={boardInfor} />}
					<div className="prose-r_16_24">{boardInfor.content}</div>
					<BoardYoutube />
				</>
			)}
		</>
	);
}
