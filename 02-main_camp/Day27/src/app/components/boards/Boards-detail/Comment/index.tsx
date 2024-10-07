import { Divider } from "../../Boards-write";
import BoardDetailProfile from "../Profile";
import styles from "./styles.module.css";

interface ICommentInput {
  writer: string;
  contents: string;
}

const Comment = (props: ICommentInput) => {
  return (
    <>
      <div className={styles.headerContainer}>
        <BoardDetailProfile writer={props.writer} />
        <div className={styles.starsContainer}>
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
        </div>
      </div>
      <div className="contentsContainer">{props.contents}</div>
      <div className={styles.dateContainer}>2024.04.01</div>
      <Divider />
    </>
  );
};

export default Comment;
