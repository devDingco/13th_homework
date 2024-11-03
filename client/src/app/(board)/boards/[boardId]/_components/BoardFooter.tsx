/** @format */

import BoardButton from './BoardButton';
import { EBoardButton } from '@/models/button.type';

export default function BoardFooter() {
	return (
		<div className="flex w-full items-center justify-center gap-6">
			<BoardButton content={EBoardButton.list} />
			<BoardButton content={EBoardButton.update} />
		</div>
	);
}
