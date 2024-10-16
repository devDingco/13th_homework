import Image from "next/image";
import { Rate } from "antd";
import styles from "./styles.module.css";
import { useState } from "react";
import CommentWrite from "../comment-write";
import { UseCommentListItemProps } from "./types";



export default function UseCommentListItem(props:UseCommentListItemProps) {
  const [isEditComment, setIsEditComment] = useState(false);
  const onClickEdit = () => {
    setIsEditComment(true);
  };
  return (
    <div className={styles.commentContainer} key={props.el._id}>
      {isEditComment ? (
        <>
          <CommentWrite isEditComment={isEditComment} setIsEditComment={setIsEditComment} index={props.index} />
          <hr />
        </>
      ) : (
        <>
          <div className={styles.oneCommentList}>
            <div className={styles.commentListUp}>
              <div className={styles.writerInfo}>
                <div className={styles.userIconArea}>
                  <Image src="/images/profile.png" alt="user" width={0} height={0} className={styles.userIcon} />
                </div>
                <p>{props.el.writer}</p>
                <Rate disabled value={props.el.rating} />
              </div>
              <div className={styles.iconsArea}>
                <Image
                  onClick={onClickEdit}
                  src="/images/edit.png"
                  alt="edit"
                  width={0}
                  height={0}
                  className={styles.editIcon}
                />
                <Image
                  src="/images/comment-delete-icon.png"
                  alt="delete"
                  width={0}
                  height={0}
                  className={styles.deleteIcon}
                />
              </div>
            </div>
            <div className={styles.commentContent}>{props.el.contents}</div>
            <div className={styles.commentDate}>{props.el.createdAt.slice(0, 10)}</div>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}
