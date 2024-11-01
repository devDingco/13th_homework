'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function useHookCommentListItem() {
    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(3);
    const { boardId } = useParams();

    const onClickEdit = () => {
        setIsEdit(true);
    };

    // 댓글수정종료 함수
    const finishEdit = () => {
        setIsEdit(!isEdit);
    };
    return {
        isEdit,
        setIsEdit,
        value,
        setValue,
        onClickEdit,
        finishEdit,
    };
}
