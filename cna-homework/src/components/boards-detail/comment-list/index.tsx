import { Rate } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";
import { useCommentList } from "./hook";

export default function CommentList() {
  const { data } = useCommentList();
  // console.log("comment:", data?.fetchBoardComments);

  return (
    <div className={styles.commentAllListContainer}>
      {data?.fetchBoardComments.length === 0 ? (
        <div className={styles.noComment}>등록된 댓글이 없습니다.</div>
      ) : (
        data?.fetchBoardComments.map((el) => (
          <div className={styles.commentContainer} key={el._id}>
            <div className={styles.oneCommentList}>
              <div className={styles.commentListUp}>
                <div className={styles.writerInfo}>
                  <div className={styles.userIconArea}>
                    <Image src="/images/profile.png" alt="user" width={0} height={0} className={styles.userIcon} />
                  </div>
                  <p>{el.writer}</p>
                  <Rate disabled value={el.rating} />
                </div>
                <div className={styles.iconsArea}>
                  <Image src="/images/edit.png" alt="edit" width={0} height={0} className={styles.editIcon} />
                  <Image
                    src="/images/comment-delete-icon.png"
                    alt="delete"
                    width={0}
                    height={0}
                    className={styles.deleteIcon}
                  />
                </div>
              </div>
              <div className={styles.commentContent}>{el.contents}</div>
              <div className={styles.commentDate}>{el.createdAt.slice(0, 10)}</div>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
