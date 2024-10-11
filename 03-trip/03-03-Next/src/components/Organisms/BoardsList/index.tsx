"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { MouseEventHandler } from "react";
import useDelete from "@/commons/hooks/useDelete";

import styles from "./styles.module.css";
import Btn from "@/components/Atoms/_Btn";

export default function BoardsListUI() {
    const Router = useRouter();
    const { data } = useQuery(FetchBoardsDocument, {
        variables: { number: 1 },
    });
    const onClickDelete: MouseEventHandler = useDelete();

    return (
        <>
            <Btn
                className="btn__submit"
                value="등록하기"
                onClick={(e) => {
                    e.preventDefault();
                    Router.push(`/boards/new`);
                }}
            />

            <div className={styles.post_list}>
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
                        <div className={styles.idx}>
                            {data?.fetchBoards.length - idx}
                        </div>
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
            </div>
        </>
    );
}
