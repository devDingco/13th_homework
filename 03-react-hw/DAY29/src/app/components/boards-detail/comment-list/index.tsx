import Image from "next/image";
import UserProfile from "../../UserProfile";
import styles from "./styles.module.css";
import useCommentList from "./hook";

export default function CommentList() {
  const { data } = useCommentList();

  return (
    <div className={styles.commentsList_gap}>
      {data?.fetchBoardComments.map((el, index, array) => (
        <div
          key={el._id}
          className={`${styles.commentList} ${
            index === array.length - 1 ? "border-b-0" : ""
          }`}
        >
          <div className={styles.comment_US_EC_box}>
            <div className={styles.commentUserStar}>
              <UserProfile writer={el.writer as string} />
              <span>별있음</span>
            </div>
            <div className={styles.commentEditClose}>
              <Image
                src="/images/icons/edit.svg"
                alt="수정하기"
                width={20}
                height={20}
              />
              <Image
                src="/images/icons/close.svg"
                alt="닫기"
                width={20}
                height={20}
              />
            </div>
          </div>
          <div className={styles.comment_contents}>{el.contents}</div>
          <div className={styles.comment_createAt}>
            {new Date(el.createdAt)
              .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\.$/, "")}
          </div>
        </div>
      ))}
    </div>
  );
}
