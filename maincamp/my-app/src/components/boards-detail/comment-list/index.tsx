"use client"
import { Rate } from "antd";
import useBoardCommentList from "./hook"
import styles from "./styles.module.css"

export default function BoardCommentList() {
    const { data, onChangeStar } = useBoardCommentList();
    return(
        <div className={styles.comment_list_wrap}>
            {data?.fetchBoardComments.map((comment, index) => (
                <div key={comment?._id} className={styles.comment_list_container}>
                    <div className={styles.profile}>
                        <div className={styles.d_flex}>
                            <p className={styles.profileIcon}></p>
                            <p className={styles.writer}>{comment?.writer}</p>
                            <Rate 
                                className={styles.rateStar}
                                onChange={(event) => onChangeStar(event)}  
                            />
                        </div>
                        <div>
                            <button className={styles.editIcon}></button>
                            <button className={styles.closeIcon}></button>
                        </div>
                    </div>
                    <div className={styles.comment_text}>
                        {comment?.contents} 
                    </div>
                    <div className={styles.comment_date}>
                        {comment?.createdAt.split("T")[0].replace(/-/g, ".")}
                    </div>
                </div>
            ))}
        </div>
    )
}