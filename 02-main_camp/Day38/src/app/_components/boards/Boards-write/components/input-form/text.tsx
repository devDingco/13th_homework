import styles from "./styles.module.css";
import { IBoardsWriteContentsInput, IBoardsWriteInput } from "./types";

export const BoardsWriteInputForm = (props: IBoardsWriteInput) => {
  return (
    <div className={styles.inputFormContainer}>
      <div className={styles.inputFormTitle}>
        {props.title}
        {props.isRequired && <span className={styles.requiredMark}>*</span>}
      </div>
      <input
        disabled={props.disabled}
        className={styles.inputFormText}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
      {props.isRequired && (
        <p className={styles.requiredInputError}>{props.errorMessage}</p>
      )}
    </div>
  );
};

export const ContentsInputForm = (props: IBoardsWriteContentsInput) => {
  return (
    <div className={styles.inputFormContainer}>
      <div className={styles.inputFormTitle}>
        {props.title}
        <span className={styles.requiredMark}>*</span>
      </div>
      <textarea
        className={styles.inputTextArea}
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
      <p className={styles.requiredInputError}>{props.errorMessage}</p>
    </div>
  );
};
