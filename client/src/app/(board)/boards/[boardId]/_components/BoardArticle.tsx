/** @format */

import { IBoardProps } from '@/models/boardType';

export default function BoardArticle({ infor }) {
	return <div className="prose-r_16_24">{infor?.content}</div>;
}
