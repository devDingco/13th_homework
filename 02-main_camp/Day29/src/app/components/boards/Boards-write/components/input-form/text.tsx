import styles from "./styles.module.css";
import { IBoardsWriteContentsInput, IBoardsWriteInput } from "./types";

export const RequiredInputForm = (props: IBoardsWriteInput) => {
  return (
    <div className={styles.inputFormContainer}>
      <div className={styles.inputFormTitle}>
        {props.title}
        <span className={styles.requiredMark}>*</span>
      </div>
      <input
        className={styles.inputFormText}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
      <p className={styles.requiredInputError}>{props.errorMessage}</p>
    </div>
  );
};

export const DefaultInputForm = (props: IBoardsWriteInput) => {
  return (
    <div className={styles.inputFormContainer}>
      <div className={styles.inputFormTitle}>{props.title}</div>
      <input
        className={styles.inputFormText}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      />
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
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      ></textarea>
      <p className={styles.requiredInputError}>{props.errorMessage}</p>
    </div>
  );
};
