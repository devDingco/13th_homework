/** @format */

import { IBoardReaderResource, IBoardResponse } from '@/models/boardReaderResponse';

import BoardHeader from './BoardHeader';
import BoardIcon from './BoardIcon';
import BoardImages from './BoardImages';

export default function BoardIdContainer({ resource }: IBoardReaderResource) {
	const boardInfor: IBoardResponse = resource.read();

	return (
		<>
			{boardInfor && typeof boardInfor === 'object' && 'boardId' in boardInfor && (
				<>
					<BoardHeader infor={boardInfor} />
					<BoardIcon />
					{boardInfor.imageUrl && <BoardImages infor={boardInfor} />}
					<div className="prose-r_16_24">{boardInfor.content}</div>
					{/* 나중에 youtubeComponent로 변경할 예정 */}
					<div className="flex h-64 w-full items-center justify-center bg-gray-100 py-4"></div>
				</>
			)}
		</>
	);
}
