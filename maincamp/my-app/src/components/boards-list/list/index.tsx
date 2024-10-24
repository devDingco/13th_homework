"use client"
import ListPagination from "../pagination";
import useBoardsList from "./hook";
import styles from "./styles.module.css"
import { IListProps } from "./types";

export default function BoardsList(props:IListProps){
    const {data, refetch, lastPage, onClickDetail, onClickDelete} = useBoardsList();
    return (
        <>
            <div className={styles.listForm}>
                {data?.fetchBoards.map((el, index) => (
                    <div key={el._id} className={styles.listBg}>
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
                {/* <ListPagination refetch={refetch} lastPage={lastPage} /> */}
            </div>
        </>
    );
}