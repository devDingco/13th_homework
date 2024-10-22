'use client';
import useBoardListCommnetList from './hook';
import styles from './styles.module.css';
import { Rate } from 'antd';

export default function BoardsComponentCommentList() {
    const { data, setValue } = useBoardListCommnetList();

    return (
        <>
            {data?.fetchBoardComments && data?.fetchBoardComments.length > 0 ? (
                data.fetchBoardComments.map((el: any, index: any) => (
                    <div className={styles.commentListBox}>
                        <div className={styles.commentListBoxHeader}>
                            <div className={styles.commentListBoxHeaderLeft}>
                                <div>{el.writer}</div>
                                <Rate onChange={setValue} value={0} />
                            </div>
                            <div className={styles.commentListBoxHeaderRight}>
                                <div>수정</div>
                                <div>삭제</div>
                            </div>
                        </div>
                        <div className="commentListBoxHeaderContent">
                            {el.contents}
                        </div>
                        <div className="commentListBoxHeaderTime">
                            {el.createdAt}
                        </div>
                    </div>
                ))
            ) : (
                <div>이거슨 데이터가 없을 때</div>
            )}
        </>
    );
}
