import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentList } from "./hook";

function CommentList() {
  const { data } = useCommentList();
  const stars = Array(5).fill(0);

  return (
    <div>
      {data?.fetchBoardComments.map((el) => (
        <div className={styles.comment_box} key={el._id}>
          <div className={styles.comment_header}>
            <div className={styles.comment_header_left}>
              <Image
                src="/img/profile.png"
                alt="profileImg"
                width={24}
                height={24}
              />
              <div className="writer">{el.writer}</div>
              {stars.map((el, index) => (
                <Image
                  key={index}
                  src="/img/vector.svg"
                  alt="starImg"
                  width={24}
                  height={24}
                />
              ))}
            </div>
            <div className={styles.comment_header_right}>
              <Image
                src="/img/edit.svg"
                alt="editImg"
                width={24}
                height={24}
                className="img"
              />
              <Image
                src="/img/delete.svg"
                alt="deleteImg"
                width={24}
                height={24}
                className="img"
              />
            </div>
          </div>
          <div className={styles.comment_main}>{el.contents}</div>
          <div className={styles.date}>
            {el.createdAt.split("T")[0].replace(/-/g, ".")}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
