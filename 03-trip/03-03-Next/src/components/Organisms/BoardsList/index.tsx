"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import useDelete from "@/commons/hooks/useDelete";

import styles from "./styles.module.css";

export default function BoardsListUI({ data, count, current }) {
    const Router = useRouter();

    const onClickDelete: MouseEventHandler = useDelete();

    const postNum = Number(count?.fetchBoardsCount + 10 - current * 10);

    return (
        <>
            <section className={styles.post_list}>
                <div className={styles.label_wrapper}>
                    <div className={styles.idx}>번호</div>
                    <div className={styles.title}>제목</div>
                    <div className={styles.author}>작성자</div>
                    <div className={styles.date}>날짜</div>
                </div>

                {data?.fetchBoards.map((el, idx) => (
                    <div
                        className={styles.post_wrapper}
                        key={el._id}
                        onClick={() => Router.push(`/boards/${el._id}`)}
                    >
                        <div className={styles.idx}>{postNum - idx}</div>
                        <div className={styles.title}>{el.title}</div>
                        <div className={styles.author}>{el.writer}</div>
                        <div className={styles.date}>
                            {el.createdAt.split("T")[0]}
                        </div>
                        <div
                            className={styles.btn}
                            onClick={onClickDelete}
                            id={el._id}
                        ></div>
                    </div>
                ))}
            </section>
        </>
    );
}
