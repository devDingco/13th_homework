"use client"
import { gql, useMutation, useQuery } from "@apollo/client"
import styles from "./css/styles.module.css"
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

const FETCH_BOARDS = gql`
    query {
        fetchBoards {
            _id
            writer
            title
            contents
            youtubeUrl
            likeCount
            dislikeCount
            images
            createdAt
            updatedAt
            deletedAt
        }
    }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardsList() {
    const { data } = useQuery(FETCH_BOARDS);
    console.log(data);
    const router = useRouter();

    const [deleteBoard] = useMutation(DELETE_BOARD)

    const onClickDetail = async (event :MouseEvent<HTMLLIElement>, id: string) => {
        event.stopPropagation();
        router.push(`/boards/${id}`)
    }

    const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        try{
            const response = await deleteBoard({
                refetchQueries: [{ query: FETCH_BOARDS}],
            });
            console.log("성공", response.data.deleteBoard);
        }catch{
            console.error("실패")
        }
    };

    return (
        <div className={styles.listForm}>
            {data?.fetchBoards.map((el, index) => (
                <div key={el.number} className={styles.listBg}>
                    <ul className={styles.listTop}>
                        <li>번호</li>
                        <li>제목</li>
                        <li>작성자</li>
                        <li>날짜</li>
                    </ul>
                    <ul className={styles.listContent}>
                        <li>{data.fetchBoards.length - index}</li>
                        <li onClick={onClickDetail}>{el.title}</li>
                        <li>{el.writer}</li>
                        <li>
                            {el.createdAt.split("T")[0].replace(/-/g, ".")}
                            <button id={el.number} onClick={onClickDelete}></button>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
}