import Image from "next/image";
import styles from "./styles.module.css";
import { Rate } from "antd";
import useCommentsWrite from "./hook";

export default function CommentWrite() {
  
  const {
    onClickSignup,
    onChangeContent,
    onChangePw,
    onChangeWriter,
    disabledBtn,
    value,
    setValue,
    writer,
    pw,
    content,
  } = useCommentsWrite();
  return (
    <>
      <div className={styles.commentAllContainer}>
        <div className={styles.commentContainer}>
          <div className={styles.commentTitle}>
            <Image src="/images/comment.png" alt="comment-icon" width={0} height={0} className={styles.commentIcon} />
            <p>댓글</p>
          </div>
          <div className={styles.starArea}>
            <Rate onChange={setValue} value={value} />
          </div>
          <div className={styles.writerInfoArea}>
            <div className={styles.upInfo}>
              <div className={styles.writer}>
                <p>
                  작성자<span>*</span>
                </p>
                <input type="text" placeholder="작성자 명을 입력해 주세요." onChange={onChangeWriter} value={writer} />
              </div>
              <div className={styles.pw}>
                <p>
                  비밀번호<span>*</span>
                </p>
                <input type="password" placeholder="비밀번호를 입력해 주세요." onChange={onChangePw} value={pw} />
              </div>
            </div>
            <div className={styles.downInfo}>
              <textarea placeholder="댓글을 입력해 주세요." onChange={onChangeContent} value={content} />
            </div>
            <div className={styles.btnArea}>
              <button onClick={onClickSignup}>댓글 등록</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
