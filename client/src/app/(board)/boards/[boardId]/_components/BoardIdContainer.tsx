/** @format */
// TODO 좀더 깔끔하게 리팩토링해보기

import BoardHeader from './BoardHeader';
import BoardIcon from './BoardIcon';
import BoardImages from './BoardImages';
import { IBoardEditProps } from '@/models/board.type';

// import BoardYoutube from './BoardYoutube';

export default function BoardIdContainer({ data }: IBoardEditProps) {
	return (
		<>
			<BoardHeader infor={data} />
			<BoardIcon address={data?.detailAddress} />
			{data.imageUrl && <BoardImages infor={data} />}
			<div className="prose-r_16_24">{data.content}</div>
			{/* <BoardYoutube /> */}
		</>
	);
}
