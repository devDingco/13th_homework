/** @format */

import { IBoardReaderResource, IBoardResponse } from '@/models/boardReaderResponse';

import BoardArticle from './BoardArticle';
import BoardHeader from './BoardHeader';
import BoardIcon from './BoardIcon';
import BoardImages from './BoardImages';
import BoardVideo from './BoardVideo';

export default function BoardContainer({ resource }: IBoardReaderResource) {
	const boardInfor: IBoardResponse = resource.read();

	console.log(boardInfor);

	return (
		<>
			{boardInfor && typeof boardInfor === 'object' && 'boardId' in boardInfor && (
				<>
					<BoardHeader infor={boardInfor} />
					<BoardIcon />
					<BoardImages infor={boardInfor} />
					<BoardArticle infor={boardInfor} />
					<BoardVideo infor={boardInfor} />
				</>
			)}
		</>
	);
}
