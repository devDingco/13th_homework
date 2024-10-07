import { BasicInputForm, Divider } from "../../Boards-write";

import styles from "./styles.module.css";

const CommentWrite = () => {
  const commentsDescription = "댓글을 입력해 주세요.";

  return (
    <div className={styles.BoardCommentsContainer}>
      <Divider />
      <div className={styles.titleContainer}>
        <img src="/assets/chat.png" alt="댓글 그림" />
        댓글
      </div>
      <div className={styles.starsContainer}>
        <img src="/assets/star.png" alt="별 그림" />
        <img src="/assets/star.png" alt="별 그림" />
        <img src="/assets/star.png" alt="별 그림" />
        <img src="/assets/star.png" alt="별 그림" />
        <img src="/assets/star.png" alt="별 그림" />
      </div>
      <div className={styles.textInputContainer}>
        <BasicInputForm
          isRequired={true}
          title="작성자"
          placeholder="작성자 명을 입력해 주세요."
        />
        <BasicInputForm
          isRequired={true}
          title="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
        />
      </div>
      <textarea
        className={styles.commentsInput}
        placeholder={commentsDescription}
      ></textarea>
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton}>댓글 등록</button>
      </div>
    </div>
  );
};

export default CommentWrite;
