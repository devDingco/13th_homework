import React from "react";
import styles from "../styles.module.css";
import ErrorMsg from "./error";

interface IContentInput {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: string;
}

const ContentInput: React.FC<IContentInput> = ({ onChange, value, error }) => {
  return (
    <div className={styles.input_group}>
      <label className={styles.input_label}>
        내용<span className={styles.require}> *</span>
      </label>
      <textarea
        className={styles.content_input_box}
        name="content"
        placeholder="내용을 입력해 주세요."
        onChange={onChange}
        value={value}
      ></textarea>
      {error && <ErrorMsg errorMessage={error} />}
    </div>
  );
};

export default ContentInput;
