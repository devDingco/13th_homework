"use client"
import { gql, useQuery } from "@apollo/client"
import styles from "./css/styles.module.css"

const FETCH_BOARDS = gql`
    query {
        fetchBoards {
            title
            writer
            createdAt
        }
    }
`;

export default function BoardsList() {
    const { data } = useQuery(FETCH_BOARDS);
    console.log(data);
    const onClickDetail = () => {

        console.log("@222")
    }

    return (
        <div className={styles.listForm}>
            {data?.fetchBoards.map((el) => (
                <div key={el.number} className={styles.listBg}>
                    <ul className={styles.listTop}>
                        <li>번호</li>
                        <li>제목</li>
                        <li>작성자</li>
                        <li>날짜</li>
                    </ul>
                    <ul className={styles.listContent}>
                        <li>{}</li>
                        <li onClick={onClickDetail}>{el.title}</li>
                        <li>{el.writer}</li>
                        <li>
                            2024.09.09
                        {/* {el.createdAt} */}
                            <span></span>
                        </li>
                    </ul>
                </div>
            ))}
        </div> 
    );
}