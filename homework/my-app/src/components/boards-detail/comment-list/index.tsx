import Image from "next/image";
import styles from "./style.module.css";
import useCommentListPage from "./hooks";
import { ICommentListPageprops } from "./types";
import { Rate } from "antd";

export default function CommentListPage(props: ICommentListPageprops) {
  const { data } = useCommentListPage();
  return (
    <div className={styles.container}>
      <div className={styles.commentContainer}>
        {data?.fetchBoardComments.length === 0 && (
          <div className={styles.noComments}>등록된 댓글이 없습니다.</div>
        )}

        {data?.fetchBoardComments.map((el) => (
          <div key={el._id} className={styles.commentList}>
            <div className={styles.profileContainer}>
              <Image
                src={el.user?.picture || "/image/profile.png"}
                className={styles.profilebasic}
                alt="프로필기본이미지"
                width={24}
                height={24}
                sizes="100vw"
              />
              <div className={styles.authorName}>{el.writer}</div>
              <div className={styles.rating}>
                <Rate disabled defaultValue={el.rating} />
              </div>
            </div>
            <div>{el.contents}</div>
            <div className={styles.date}>
              {new Date(el.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
