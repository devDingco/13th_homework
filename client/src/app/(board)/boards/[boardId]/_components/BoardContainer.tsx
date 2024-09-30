/** @format */

import { IBoardReaderResource, IBoardResponse } from '@/models/boardReaderResponse';

import BoardHeader from './BoardHeader';
import BoardIcon from './BoardIcon';
import BoardImages from './BoardImages';

export default function BoardContainer({ resource }: IBoardReaderResource) {
	const boardInfor: IBoardResponse = resource.read();

	return (
		<>
			{boardInfor && typeof boardInfor === 'object' && 'boardId' in boardInfor && (
				<>
					<BoardHeader infor={boardInfor} />
					<BoardIcon />
					<BoardImages infor={boardInfor} />
					<div className="prose-r_16_24">{boardInfor.content}</div>
					<div className="flex w-full items-center justify-center bg-gray-100 py-4">
						<iframe
							width="560"
							height="315"
							src={`https://www.youtube.com/embed/${boardInfor.youtubeUrl}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</>
			)}
		</>
	);
}
