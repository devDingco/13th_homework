import useCommentEditForm from "../../../commons/hooks/useCommentEditForm";
import { ICommentData } from "../../../types/components.type";
import Button from "../Button/Button";
import Input from "../Input/Input";
import StarRating from "../StarRating/StarRating";
import TextArea from "../TextArea/TextArea";
import styles from "./styles.module.css";

export default function CommentEditForm(commentData: ICommentData) {
  const { handleSubmitEdit, handleInputChange, disabledButton } =
    useCommentEditForm(commentData);

  return (
    <form className={styles.form} onSubmit={handleSubmitEdit}>
      <div className={styles.input_wrapper}>
        <div className={styles.input_box}>
          <Input
            id="writer"
            required={true}
            onChange={handleInputChange}
            defaultValue={commentData.commentData.writer}
          />
          <Input
            id="password"
            required={true}
            onChange={handleInputChange}
            value={commentData.commentData.password}
          />
        </div>
        <div className={styles.rating_stars}>
          <StarRating defaultValue={commentData.commentData.rating} />
        </div>
      </div>
      <div className={styles.contents_layout}>
        <div className={styles.textarea_wrapper}>
          <TextArea
            id="contents"
            onChange={handleInputChange}
            defaultValue={commentData.commentData.contents}
          />
        </div>
        <div className={styles.button_wrapper}>
          <Button id="cancel" color="white" />
          <Button
            id="commit_submit"
            disabled={disabledButton}
            color={disabledButton ? "gray" : "blue"}
          />
        </div>
      </div>
    </form>
  );
}
