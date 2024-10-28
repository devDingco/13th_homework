'use client';

import Image from 'next/image';
import useBoardList from './hooks';
import styles from './styles.module.css';

export default function BoardsComponentList() {
    const { data, onClickMoveToDetailPage, onClickDelete } = useBoardList();

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.titleBox}>
                    <div className={styles.titleBoxNumber}>번호</div>
                    <div className={styles.titleBoxTitle}>제목</div>
                    <div className={styles.titleBoxWrite}>작성자</div>
                    <div className={styles.titleBoxDate}>날짜</div>
                </div>

                {data?.fetchBoards.length > 0 ? (
                    data.fetchBoards.map((el: any, index: any) => (
                        <button
                            className={styles.boardListBox}
                            key={el._id}
                            id={el._id}
                            onClick={onClickMoveToDetailPage}
                        >
                            <div className={styles.boardListBoxNumber}>
                                {index + 1}
                            </div>
                            <div className={styles.boardListBoxTitle}>
                                {el.title}
                            </div>
                            <div className={styles.boardListBoxWrite}>
                                {el.writer}
                            </div>
                            {/* <div>{ el.creactAt}</div> */}
                            <button
                                className={styles.BoardListBoxDelete}
                                onClick={onClickDelete}
                            >
                                <Image
                                    src="/images/delete.png"
                                    alt="deleteImage"
                                    width={24}
                                    height={24}
                                    id={el._id}
                                    onClick={onClickDelete}
                                ></Image>
                            </button>
                        </button>
                    ))
                ) : (
                    <div>!게시글이 없당!</div>
                )}
            </div>
        </>
    );
}
