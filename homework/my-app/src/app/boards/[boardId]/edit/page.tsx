'use client'

import BoardsWrite from "@/components/boards-write";
import { useParams } from 'next/navigation';

export default function BoardsEdit() {
    const { boardId } = useParams(); // useParams로 boardId 가져오기


    return <BoardsWrite isEdit={true} boardId={boardId} />;
}
