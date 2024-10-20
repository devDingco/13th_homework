import Image from "next/image";
import styles from "./styles.module.css";
import FormField from "../../FormField";
import Input from "../../input";
import Textarea from "../../textarea";
import useCommentWriter from "./hook";
import { Rating } from "@mui/material";

export default function CommentWrite() {
  const { commentData, handleSubmit, onChange } = useCommentWriter();
  return (
    <form className={styles.commentBox} onSubmit={handleSubmit}>
      <div className={styles.댓글상자}>
        <Image src="/images/icons/chat.svg" width={24} height={24} alt="chat" />
        <span>댓글</span>
      </div>
      <Rating
        name="rating"
        value={commentData.rating}
        precision={0.5}
        onChange={onChange}
      />
      <div className={styles.commentBox_commentInputs}>
        {/* 작성자, 비밀번호 상자 */}
        <div className={styles.commentBox_commentInputs_writerpwBox}>
          <FormField label="작성자" required>
            <Input
              name="writer"
              placeholder="작성자 명을 입력해 주세요"
              onChange={onChange}
              value={commentData.writer}
            />
          </FormField>
          <FormField label="비밀번호" required>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={onChange}
              value={commentData.password}
            />
          </FormField>
        </div>
        {/* 댓글 입력 창 */}
        <Textarea
          name="contents"
          placeholder="댓글을 입력해주세요"
          className={styles.commentBox_comment}
          onChange={onChange}
          value={commentData.contents}
        />
        <span>{`${commentData.contents.length}/100`}</span>
        <div className={styles.commentBox_button_justifyEnd}>
          <button className={styles.commentBox_button} type="submit">
            댓글등록
          </button>
        </div>
      </div>
    </form>
  );
}

 