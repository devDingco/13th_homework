/** @format */
// TODO 좀더 깔끔하게 리팩토링해보기

import BoardHeader from './BoardHeader';
import BoardIcon from './BoardIcon';
import BoardImages from './BoardImages';
import { IBoardResponse } from '@/models/boardReaderResponse';
import { IboardId } from '@/models/children.type';

// import BoardYoutube from './BoardYoutube';

export default function BoardIdContainer({ boardId }: IboardId) {
	// const resource
	const boardInfor: IBoardResponse = resource.read();

	return (
		<>
			{boardInfor && typeof boardInfor === 'object' && 'boardId' in boardInfor && (
				<>
					<BoardHeader infor={boardInfor} />
					<BoardIcon address={boardInfor?.detailAddress} />
					{boardInfor.imageUrl && <BoardImages infor={boardInfor} />}
					<div className="prose-r_16_24">{boardInfor.content}</div>
					{/* <BoardYoutube /> */}
				</>
			)}
		</>
	);
}
