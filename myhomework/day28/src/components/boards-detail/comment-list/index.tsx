"use clinet";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentList } from "./hook";
import { Rate } from "antd";

export default function CommentList() {
  const { data } = useCommentList();

  return (
    <div className={styles.commentListLayout}>
      <div className={styles.commentListBox}>
        {data?.fetchBoardComments.map((comment, index) => (
          <div key={comment?._id} className={styles.listBody}>
            <div className={styles.titleSection}>
              <div className={styles.leftTitle}>
                <div className={styles.writerInfo}>
                  <Image
                    src="/icon/profile_img.png"
                    className={styles.profile}
                    alt="프로필 이미지"
                    width={0}
                    height={0}
                  />
                  <div className={styles.titleText}>{comment?.writer}</div>
                </div>
                <div className={styles.stars}>
                  <Rate disabled defaultValue={comment.rating} />
                </div>
              </div>
              <div>
                <div className={styles.rightTitle}>
                  <Image
                    src="/icon/edit.svg"
                    className={styles.commentEditButton}
                    alt="댓글 수정"
                    width={0}
                    height={0}
                  />
                  <Image
                    src="/icon/close.svg"
                    className={styles.commentDeleteButton}
                    alt="댓글 삭제"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
            </div>
            <div className={styles.commentContents}>{comment?.contents}</div>
            <div className={styles.commentDate}>
              {comment?.createdAt.split("T")[0].split("-").join(".")}
            </div>

            {/* 마지막 댓글 밑에는 border 가 없음 */}
            {index + 1 !== data?.fetchBoardComments.length && (
              <div className={styles.border}> </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
