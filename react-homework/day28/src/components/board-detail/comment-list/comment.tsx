import styles from "./styles.module.css";
import Image from "next/image";
import { CommentProps } from "./type";
import { Rate } from "antd";
import { formDate } from "@/utils/date";

const Comment = ({ comments }: CommentProps) => {
  console.log("comment list: ", comments);
  return (
    <>
      {comments.map((comment) => (
        <div key={comment._id} className={styles.comment_box}>
          <div className={styles.comment_box_header}>
            <div className={styles.user_info}>
              <div className={styles.user}>
                <Image
                  src="/images/profile.png"
                  width={24}
                  height={24}
                  alt="프로필이미지"
                />
                <div>{comment.writer}</div>
              </div>
              {/* 별점 */}
              <Rate disabled defaultValue={comment.rating} />
            </div>
            <div className={styles.btn_box}>
              <Image
                src="/images/comment-edit.png"
                width={24}
                height={24}
                alt="수정버튼"
              />
              <Image
                src="/images/close.png"
                width={24}
                height={24}
                alt="삭제버튼"
              />
            </div>
          </div>
          <div className={styles.contents_box}>{comment.contents}</div>
          <div className={styles.date_box}>{formDate(comment.createdAt)}</div>
        </div>
      ))}
    </>
  );
};

export default Comment;
