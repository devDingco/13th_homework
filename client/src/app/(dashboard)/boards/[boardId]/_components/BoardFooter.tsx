/** @format */

import { EBoardButton } from '@/models/boardButton';
import BoardButton from './BoardButton';

export default function BoardFooter() {
    return (
        <div className="w-full flex justify-center items-center gap-6">
            <BoardButton content={EBoardButton.list} />
            <BoardButton content={EBoardButton.update} />
        </div>
    );
}
