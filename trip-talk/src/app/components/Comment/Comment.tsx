import Image from "next/image";
import { ICommentList } from "../../../types/components.type";
import UseComment from "../../../commons/hooks/UseComment";
import styles from "./styles.module.css";

export default function Comment(props: ICommentList) {
  const {
    onClickEditComment,
    onClickDeleteComment,
    writer,
    contents,
    createdAt,
  } = UseComment(props);

  return (
    <>
      <li className={styles.comment_layout}>
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
                <span>{writer}</span>
              </div>
              <div className={styles.rating_stars}>
                <Image
                  src="/svgs/star-empty.svg"
                  alt="starEmpty"
                  width={24}
                  height={24}
                />
                <Image
                  src="/svgs/star-empty.svg"
                  alt="starEmpty"
                  width={24}
                  height={24}
                />
                <Image
                  src="/svgs/star-empty.svg"
                  alt="starEmpty"
                  width={24}
                  height={24}
                />
                <Image
                  src="/svgs/star-empty.svg"
                  alt="starEmpty"
                  width={24}
                  height={24}
                />
                <Image
                  src="/svgs/star-empty.svg"
                  alt="starEmpty"
                  width={24}
                  height={24}
                />
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
          <div>{contents}</div>
          <span className={styles.date}>
            {createdAt.slice(0, 10).replaceAll("-", ".")}
          </span>
        </div>
      </li>
    </>
  );
}
