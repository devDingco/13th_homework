'use client';

import styles from './styles.module.css';
import { Rate } from 'antd';

import BoardsComponentComment from '../comments-write';
import useHookCommentListItem from './hook';

export default function CommentItem(props) {
    const { commentData } = props;

    const { isEdit, setIsEdit, value, setValue, onClickEdit, finishEdit } =
        useHookCommentListItem();
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
