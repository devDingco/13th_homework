/** @format */
'use client';

import { useParams } from 'next/navigation';

import { boardObject } from '@/app/boardObject';
import BoardHeader from './_components/BoardHeader';
import BoardArticle from './_components/BoardArticle';
import BoardFooter from './_components/BoardFooter';
import BoardIcon from './_components/BoardIcon';
import BoardImages from './_components/BoardImages';
import BoardVideo from './_components/BoardVideo';
import BoardLikeHate from './_components/BoardLikeHate';

export default function Detail() {
    const param = useParams();

    const boardInfor = boardObject.find(
        (board) => board.boardId === +param.boardId
    );

    return (
        <div className="flex flex-col gap-4">
            <BoardHeader infor={boardInfor} />
            <BoardIcon />
            <BoardImages infor={boardInfor} />
            <BoardArticle infor={boardInfor} />
            <BoardVideo infor={boardInfor} />
            <BoardLikeHate infor={boardInfor} />
            <BoardFooter />
        </div>
    );
}
