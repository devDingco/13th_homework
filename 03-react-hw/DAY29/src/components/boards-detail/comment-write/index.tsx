import Image from "next/image";
import styles from "./styles.module.css";
import useCommentWriter from "./hook";
import { Rating } from "@mui/material";
import FormField from "@/components/FormField";
import Input from "@/components/input";
import Textarea from "@/components/textarea";

interface ICommentWriteProps {
  isEdit?: boolean;
  defaultValue?: {
    contents: string;
    rating: number;
    _id: string;
    writer: string;
  };
  onCancel?: () => void;
}

export default function CommentWrite(props: ICommentWriteProps) {
  const { commentData, handleSubmit, onChange } = useCommentWriter({
    isEdit: props.isEdit,
    defaultValue: props.defaultValue,
    onCancel: props.onCancel,
  });

  return (
    <form className={styles.commentBox} onSubmit={handleSubmit}>
      <div className={styles.댓글상자}>
        <Image src="/images/icons/chat.svg" width={24} height={24} alt="chat" />
        <span>{props.isEdit ? "댓글 수정" : "댓글"}</span>
      </div>
      <Rating
        name="rating"
        value={commentData.rating}
        precision={0.5}
        onChange={onChange}
      />
      <div className={styles.commentBox_commentInputs}>
        <div className={styles.commentBox_commentInputs_writerpwBox}>
          <FormField label="작성자" required>
            <Input
              name="writer"
              value={
                props.isEdit ? props.defaultValue?.writer : commentData.writer
              }
              onChange={onChange}
              disabled={props.isEdit}
              placeholder={props.isEdit ? "" : "작성자 명을 입력해 주세요"}
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
        <Textarea
          name="contents"
          placeholder="댓글을 입력해주세요"
          className={styles.commentBox_comment}
          onChange={onChange}
          value={commentData.contents}
        />
        <span>{`${commentData.contents.length}/100`}</span>
        <div className={styles.commentBox_button_justifyEnd}>
          {props.isEdit && (
            <button
              className={styles.commentBox_button}
              type="button"
              onClick={props.onCancel}
              style={{ marginRight: "12px" }}
            >
              취소
            </button>
          )}
          <button className={styles.commentBox_button} type="submit">
            {props.isEdit ? "수정하기" : "댓글등록"}
          </button>
        </div>
      </div>
    </form>
  );
}
