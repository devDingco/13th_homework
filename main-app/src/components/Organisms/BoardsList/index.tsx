"use client";

import { useRouter } from "next/navigation";
import useDelete from "@/common/hooks/useDelete";

import styles from "./styles.module.css";
import { IBoardListProps } from "@/common/types/types";

export default function BoardsListUI(props: IBoardListProps) {
    const { data, count, current, keyword } = props;
    const Router = useRouter();

    const onClickDelete = useDelete();

    const postNum = Number((count?.fetchBoardsCount ?? 0) + 10 - current * 10);

    return (
        <>
            <section className={styles.post_list}>
                <div className={styles.label_wrapper}>
                    <div className={styles.idx}>번호</div>
                    <div className={styles.title}>제목</div>
                    <div className={styles.author}>작성자</div>
                    <div className={styles.date}>날짜</div>
                </div>

                {data?.fetchBoards.length === 0 ? (
                    <div>검색 결과가 없습니다.</div>
                ) : (
                    data?.fetchBoards.map((el, idx) => (
                        <div
                            className={styles.post_wrapper}
                            key={el._id}
                            onClick={() => Router.push(`/boards/${el._id}`)}
                        >
                            <div className={styles.idx}>{postNum - idx}</div>
                            <div className={styles.title}>
                                {el.title
                                    .replaceAll(keyword, `@_¡¡${keyword}@_¡¡`)
                                    .split("@_¡¡")
                                    .map((el, idx) => (
                                        <span
                                            key={`${el}_${idx}`}
                                            style={{
                                                color: el === keyword ? "#f55" : "#222",
                                            }}
                                        >
                                            {el}
                                        </span>
                                    ))}
                            </div>
                            <div className={styles.author}>{el.writer}</div>
                            <div className={styles.date}>{el.createdAt.split("T")[0]}</div>
                            <div className={styles.btn} onClick={onClickDelete} id={el._id}></div>
                        </div>
                    ))
                )}
            </section>
        </>
    );
}
