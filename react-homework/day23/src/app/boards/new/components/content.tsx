import React from "react";
import styles from "../styles.module.css";
import ErrorMsg from "./error";
import { IContentInput } from "../../types/components";

const ContentInput: React.FC<IContentInput> = ({ onChange, value, error }) => {
  return (
    <div className={styles.input_group}>
      <div className={styles.input_label}>
        내용<span className={styles.require}> *</span>
      </div>
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
