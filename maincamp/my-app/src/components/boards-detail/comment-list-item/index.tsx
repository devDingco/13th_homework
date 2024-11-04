"use client"

import { useState } from "react";
import styles from "./styles.module.css"
import { IcommentList } from "./types"
import { Rate } from "antd";
import BoardCommentWrite from "../comment-write";

export default function CommentListItem({comment, index, length}: IcommentList){
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const onClickEditButton = () => {
        setIsEdit(true);
    }
 
    return(
        <div key={comment?._id} className={styles.comment_list_container}>
            {isEdit ? (
                <BoardCommentWrite 
                    comment={comment}
                    commentEdit={isEdit}
                    setCommentEdit={setIsEdit}
                />
            ) : (
                <div>
                    <div className={styles.profile}>
                        <div className={styles.d_flex}>
                            <p className={styles.profileIcon}></p>
                            <p className={styles.writer}>{comment?.writer}</p>
                            <Rate 
                                className={styles.rateStar}
                                // onChange={(event) => onChangeStar(event)}  
                            />
                        </div>
                        <div>
                            <button onClick={onClickEditButton} className={styles.editIcon}></button>
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
            )}
        </div>
    )
}
