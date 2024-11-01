'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import { Rate } from 'antd';
import BoardsComponentComment from '../comments-write';
import { useParams } from 'next/navigation';

export default function CommentItem(props) {
    const { commentData } = props;

    const [isEdit, setIsEdit] = useState(false);
    const [value, setValue] = useState(3);
    const { boardId } = useParams();

    const onClickEdit = () => {
        setIsEdit(true);
        console.log(commentData._id); // 선택한 댓글 id
    };

    // 댓글수정종료 함수
    const finishEdit = () => {
        setIsEdit(!isEdit);
    };

    return (
        <div>
            {isEdit !== true ? (
                <div key={commentData._id} className={styles.commentListBox}>
                    <div className={styles.commentListBoxHeader}>
                        <div className={styles.commentListBoxHeaderLeft}>
                            <div>{commentData.writer}</div>
                            <Rate onChange={setValue} value={0} />
                        </div>
                        <div className={styles.commentListBoxHeaderRight}>
                            <button onClick={onClickEdit}>수정</button>
                            <button>삭제</button>
                        </div>
                    </div>
                    <div className="commentListBoxHeaderContent">
                        {commentData.contents}
                    </div>
                    <div className="commentListBoxHeaderTime">
                        {commentData.createdAt.split('T')[0]}
                    </div>
                </div>
            ) : (
                <BoardsComponentComment
                    isEdit={isEdit}
                    commentData={commentData}
                    finishEdit={finishEdit}
                />
            )}
        </div>
    );
}
