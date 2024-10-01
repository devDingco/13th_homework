// import './BoardsDetail.css'
"use client"
import { gql, useQuery } from "@apollo/client"
import styles from "./styles.module.css"
import { useParams } from "next/navigation"

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
        id
        writer
        title
        contents
        createdAt
    }
  }
`;

const BoardsDetail = () => {
    
    const params = useParams();
    
    const { data } = useQuery(FETCH_BOARD, {
        variables: { boardId: params.boardId },
    });
    console.log(data);
    return (
        <div className={styles.content}>
            <h1>{data?.fetchBoard.title}</h1>
            <div className={styles.profile}>
                <div className={styles.profileLeft}>
                    <p className={styles.profile_icon}></p>
                    <p>{data?.fetchBoard.writer}</p>
                </div>
                <div className={styles.createDate}>
                    <p>2024.11.11</p>
                </div>
            </div>
            <div className={styles.subject}>
                <div className={styles.subjectIcon}>
                    <p className={styles.clip}></p>
                    <p className={styles.mapIcon}></p>
                </div>
                <p className={styles.subjectImg}></p>
                <p>{data?.fetchBoard.contents}</p>
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
                <button></button>
            </div>
        </div>
    )

}


export default BoardsDetail