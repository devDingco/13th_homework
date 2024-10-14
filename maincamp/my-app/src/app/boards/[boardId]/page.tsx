"use client"
import { gql, useQuery } from "@apollo/client"
import styles from "./styles.module.css"
import { useParams, useRouter } from "next/navigation"
import { FETCH_BOARD } from "@/components/queries"

// const FETCH_BOARD = gql`
//   query fetchBoard($boardId: ID!) {
//     fetchBoard(boardId: $boardId) {
//         _id
//         writer
//         title
//         contents
//         createdAt
//         youtubeUrl
//         images
//         boardAddress{
//             zipcode
//             address
//             addressDetail
//         }
//         createdAt
//         updatedAt
//         deletedAt
//     }
//   }
// `;

const BoardsDetail = () => {
    
    const params = useParams();
    const router = useRouter();
    const id = params.boardId;
    // console.log(id);
    
    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId: id },
    });
    console.log(data);

    const onClickEdit = () => {
        router.push(`${id}/edit`)
    }

    return (
        <div className={styles.content}>
            <h1>{data?.fetchBoard?.title}</h1>
            <div className={styles.profile}>
                <div className={styles.profileLeft}>
                    <p className={styles.profile_icon}></p>
                    <p>{data?.fetchBoard?.writer}</p>
                </div>
                <div className={styles.createDate}>
                    <p>{data?.fetchBoard?.createdAt.split("T")[0].replace(/-/g, ".")}</p>
                </div>
            </div>
            <div className={styles.subject}>
                <div className={styles.subjectIcon}>
                    <p className={styles.clip}></p>
                    <p className={styles.mapIcon}></p>
                </div>
                <p className={styles.subjectImg}></p>
                <p>{data?.fetchBoard?.contents}</p>
            </div>
            <div className={styles.videoBg}>
                <div className={styles.video}></div>
            </div>
            <div className={styles.emotion}>
                <div className={styles.bad}>
                    <div className={styles.badIcon}></div>
                    <p>24</p>
                </div>
                <div className={styles.good}>
                    <div className={styles.goodIcon}></div>
                    <p>12</p>
                </div>
            </div>
            <div className={styles.bottomBtn}>
                <button></button>
                <button onClick={onClickEdit}></button>
            </div>
        </div>
    )
}


export default BoardsDetail