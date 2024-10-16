import Image from "next/image";
import { ICommentList } from "../../../types/components.type";
import styles from "./styles.module.css";
import useComment from "../../../commons/hooks/useComment";
import StarRating from "../StarRating/StarRating";
import CommentEditForm from "../CommentEditForm/CommentEditForm";

export default function Comment(props: ICommentList) {
  const { onClickEditComment, onClickDeleteComment, commentData, isEdit } =
    useComment(props);

  return (
    <li className={styles.comment_layout}>
      {!isEdit ? (
        <div>
          <div className={styles.action_container}>
            <div>
              <div className={styles.profile}>
                <Image
                  src="/svgs/profileIcon.svg"
                  alt="profile"
                  width={24}
                  height={24}
                />
                <span>{commentData.writer}</span>
              </div>
              <div className={styles.rating_stars}>
                <StarRating defaultValue={commentData.rating} />
              </div>
            </div>
            <div>
              <button onClick={onClickEditComment}>
                <Image
                  src="/svgs/comment-edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                />
              </button>
              <button onClick={onClickDeleteComment}>
                <Image
                  src="/svgs/close.svg"
                  alt="close"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div>{commentData.contents}</div>
          <span className={styles.date}>
            {commentData.createdAt.slice(0, 10).replaceAll("-", ".")}
          </span>
        </div>
      ) : (
        <div>
          <CommentEditForm commentData={commentData} />
        </div>
      )}
    </li>
  );
}
