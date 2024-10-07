import { Divider } from "../../Boards-write";
import BoardDetailProfile from "../Profile";
import styles from "./styles.module.css";

const CommentList = () => {
  return (
    <div className={styles.boardCommentContainer}>
      <div className={styles.headerContainer}>
        <BoardDetailProfile writer="애슐리" />
        <div className={styles.starsContainer}>
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
          <img src="/assets/star.png" alt="별 그림" />
        </div>
      </div>
      <div className="contentsContainer">
        <p>살겠노라 살겠노라. 청산에 살겠노라.</p>
        <p>머루랑 다래를 먹고 청산에 살겠노라.</p>
        <p>얄리얄리 얄량셩 얄라리 얄라</p>
      </div>
      <div className={styles.dateContainer}>2024.04.01</div>
      <Divider />
    </div>
  );
};

export default CommentList;
