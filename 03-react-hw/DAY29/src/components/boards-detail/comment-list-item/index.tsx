import Image from "next/image";
import { Rating } from "@mui/material";
import styles from "../comment-list/styles.module.css";
import UserProfile from "@/components/UserProfile";
import CommentWrite from "../comment-write";

interface ICommentListItemProps {
  _id: string;
  writer: string;
  rating: number;
  contents: string;
  createdAt: string;
  isLast: boolean;
  onDelete: () => void;
  isEdit: boolean;
  onEdit: () => void;
  onSuccess?: () => void;
}

export default function CommentListItem(props: ICommentListItemProps) {
  return !props.isEdit ? (
    <div
      className={`${styles.commentList} ${props.isLast ? "border-b-0" : ""}`}
    >
      <div className={styles.comment_US_EC_box}>
        <div className={styles.commentUserStar}>
          <UserProfile writer={props.writer} />
          <Rating value={props.rating} precision={0.5} readOnly />
        </div>
        <div className={styles.commentEditClose}>
          <Image
            src="/images/icons/edit.svg"
            alt="수정하기"
            width={20}
            height={20}
            onClick={props.onEdit}
          />
          <Image
            src="/images/icons/close.svg"
            alt="삭제"
            width={20}
            height={20}
            onClick={props.onDelete}
          />
        </div>
      </div>
      <div className={styles.comment_contents}>{props.contents}</div>
      <div className={styles.comment_createAt}>
        {new Date(props.createdAt)
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\.$/, "")}
      </div>
    </div>
  ) : (
    <CommentWrite
      isEdit={true}
      defaultValue={{
        contents: props.contents,
        rating: props.rating,
        _id: props._id,
        writer: props.writer,
      }}
      onCancel={props.onEdit}
      onSuccess={props.onSuccess}
    />
  );
}
