"use client"
import { gql, useMutation, useQuery } from "@apollo/client"
import styles from "./css/styles.module.css"
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { DELETE_BOARD, FETCH_BOARDS } from "@/components/queries";

// const FETCH_BOARDS = gql`
//     query {
//         fetchBoards {
//             _id
//             writer
//             title
//             contents
//             youtubeUrl
//             likeCount
//             dislikeCount
//             images
//             createdAt
//             updatedAt
//             deletedAt
//         }
//     }
// `;

// const DELETE_BOARD = gql`
//   mutation deleteBoard($boardId: ID!) {
//     deleteBoard(boardId: $boardId)
//   }
// `;

export default function BoardsList() {
    const { data } = useQuery(FETCH_BOARDS);
    console.log(data);
    const router = useRouter();

    const [deleteBoard] = useMutation(DELETE_BOARD)

    const onClickDetail = (id:string) => {
        // event.stopPropagation();
        console.log('id', id) // id를 잘 받아오는지 
        router.push(`/boards/${id}`)
    }

    const onClickDelete = async (id) => {
        try{
            const response = await deleteBoard({
                variables: {boardId: id},
                refetchQueries: [{ query: FETCH_BOARDS}],
            });
            console.log("성공", response.data.deleteBoard);
        }catch(err){
            console.error(err)
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
                        <li onClick={()=>onClickDetail(el._id)}>{el.title}</li>
                        {/* id값을 인자로 받아오기 위해 ()=>(el._id)를 사용함 */}
                        <li>{el.writer}</li>
                        <li>
                            {el.createdAt.split("T")[0].replace(/-/g, ".")}
                            <button onClick={()=>onClickDelete(el._id)}></button>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
}